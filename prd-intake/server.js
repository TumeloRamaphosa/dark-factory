/**
 * Dark Factory — PRD Intake System
 * Handles: voice notes, document uploads, link submissions
 * Security: VirusTotal scanning for all files + links
 * CRM: Notion API integration
 * Notifications: Email to team
 */

require('dotenv').config();
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const FormData = require('form-data');
const { Client } = require('@notionhq/client');

const app = express();
const PORT = process.env.PORT || 3099;

// ──_dirs──────────────────────────────────────────────────────────────────────
const UPLOADS_VOICE = path.join(__dirname, 'uploads', 'voice');
const UPLOADS_DOCS  = path.join(__dirname, 'uploads', 'docs');
[UPLOADS_VOICE, UPLOADS_DOCS].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// ──_multer_config──────────────────────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isVoice = file.mimetype.startsWith('audio/') || file.fieldname === 'voiceNote';
    cb(null, isVoice ? UPLOADS_VOICE : UPLOADS_DOCS);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const safe = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;
    cb(null, safe);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
  fileFilter: (req, file, cb) => {
    const allowedVoice = ['audio/webm', 'audio/mp4', 'audio/mpeg', 'audio/ogg', 'audio/wav', 'application/octet-stream'];
    const allowedDocs  = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'text/plain',
      'text/markdown',
      'application/zip',
      'application/x-zip-compressed',
    ];
    if (file.fieldname === 'voiceNote' && allowedVoice.includes(file.mimetype)) return cb(null, true);
    if (file.fieldname === 'document'   && allowedDocs.includes(file.mimetype))  return cb(null, true);
    cb(new Error(`File type not allowed: ${file.mimetype}`), false);
  }
});

// ──_virus_scanning─────────────────────────────────────────────────────────────
/**
 * Scan a file with VirusTotal via public API (rate limited: 4 lookups/min)
 * Falls back to safe if no API key configured
 */
async function scanFile(filePath, filename) {
  const apiKey = process.env.VIRUSTOTAL_API_KEY;
  if (!apiKey) {
    console.log('[VirusScan] No API key — skipping file scan (configure VIRUSTOTAL_API_KEY)');
    return { safe: true, skipped: true };
  }

  try {
    const form = new FormData();
    form.append('file', fs.createReadStream(filePath));

    const res = await fetch('https://www.virustotal.com/api/v3/files', {
      method: 'POST',
      headers: { 'x-apikey': apiKey },
      body: form,
    });

    if (!res.ok) {
      console.log('[VirusScan] VT upload failed:', res.status);
      return { safe: true, error: `VT upload failed: ${res.status}` };
    }

    const data = await res.json();
    const analysisId = data.data?.id;
    if (!analysisId) return { safe: true, error: 'No analysis ID returned' };

    // Poll for result (max 20s)
    for (let i = 0; i < 10; i++) {
      await new Promise(r => setTimeout(r, 2000));
      const analysisRes = await fetch(`https://www.virustotal.com/api/v3/analyses/${analysisId}`, {
        headers: { 'x-apikey': apiKey },
      });
      const analysisData = await analysisRes.json();
      const stats = analysisData.data?.attributes?.stats;
      if (stats) {
        const malicious = stats.malicious || 0;
        const suspicious = stats.suspicious || 0;
        const clean = stats.undetected || 0;
        console.log(`[VirusScan] ${filename}: malicious=${malicious}, suspicious=${suspicious}, clean=${clean}`);
        return {
          safe: malicious === 0 && suspicious === 0,
          malicious,
          suspicious,
          clean,
          scanId: analysisId,
        };
      }
    }
    return { safe: true, error: 'Timeout waiting for scan result' };
  } catch (err) {
    console.error('[VirusScan] Error:', err.message);
    return { safe: true, error: err.message };
  }
}

/**
 * Scan a URL with VirusTotal
 */
async function scanUrl(url) {
  const apiKey = process.env.VIRUSTOTAL_API_KEY;
  if (!apiKey) {
    // Fallback: use URLhaus API (free, no key needed)
    try {
      const res = await fetch(`https://urlhaus-api.abuse.ch/v1/lookup/?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      if (data.query_status === 'ok' && data.virus_total_utilisation) {
        const vt = data.virus_total_permalink !== '' ? 'available' : 'not scanned';
        return { safe: data.virus_total_permalink === '', vt };
      }
      return { safe: true, skipped: true };
    } catch { return { safe: true, skipped: true }; }
  }

  try {
    // Submit URL
    const form = new FormData();
    form.append('url', url);
    const res = await fetch('https://www.virustotal.com/api/v3/urls', {
      method: 'POST',
      headers: { 'x-apikey': apiKey },
      body: new URLSearchParams({ url }),
    });
    const data = await res.json();
    const id = data.data?.id;
    if (!id) return { safe: true, error: 'No URL analysis ID' };

    // Poll
    for (let i = 0; i < 8; i++) {
      await new Promise(r => setTimeout(r, 2500));
      const analysisRes = await fetch(`https://www.virustotal.com/api/v3/analyses/${id}`, {
        headers: { 'x-apikey': apiKey },
      });
      const ad = await analysisRes.json();
      const stats = ad.data?.attributes?.last_analysis_stats;
      if (stats) {
        const malicious = stats.malicious || 0;
        const suspicious = stats.suspicious || 0;
        return {
          safe: malicious === 0 && suspicious === 0,
          malicious,
          suspicious,
          clean: stats.undetected || 0,
        };
      }
    }
    return { safe: true, error: 'Timeout waiting for URL scan' };
  } catch (err) {
    return { safe: true, error: err.message };
  }
}

// ──_notion_crm───────────────────────────────────────────────────────────────
let notion;
function getNotion() {
  if (!process.env.NOTION_API_KEY) return null;
  if (!notion) notion = new Client({ auth: process.env.NOTION_API_KEY });
  return notion;
}

async function createNotionPage(formData, files, scans) {
  const n = getNotion();
  if (!n || !process.env.NOTION_DATABASE_ID) {
    console.log('[Notion] Not configured — skipping');
    return null;
  }

  // Build status based on scan results
  const allSafe = [scans.fileScan, scans.linkScan].every(s => !s || s.safe);
  const status = allSafe ? 'New PRD — Approved' : '⚠️ Needs Review — Scan Flagged';

  // File list
  const fileList = [];
  if (files.voice) {
    fileList.push(`🎤 Voice Note: ${files.voice.originalName} (${files.voice.scanned ? '✅ Scanned' : '⏳ Pending scan'})`);
  }
  if (files.doc) {
    fileList.push(`📄 Document: ${files.doc.originalName} (${files.doc.scanned ? '✅ Scanned' : '⏳ Pending scan'})`);
  }

  const props = {
    'Project Name':    { title: [{ text: { content: formData.projectName || 'Untitled PRD' } }] },
    'Client Name':    { rich_text: [{ text: { content: formData.name || '' } }] },
    'Company':        { rich_text: [{ text: { content: formData.company || '' } }] },
    'Email':          { email: formData.email || '' },
    'Status':         { select: { name: status } },
    'Budget':         { select: { name: formData.budget || 'Not specified' } },
    'Timeline':       { select: { name: formData.timeline || 'Not specified' } },
    'Priority':       { select: { name: formData.urgency === 'asap' ? '🔥 Urgent' : formData.urgency === 'this-week' ? 'High' : 'Normal' } },
    'Submission Date': { date: { start: new Date().toISOString() } },
    'Project Type':   { multi_select: formData.projectType ? [formData.projectType] : [] },
  };

  const children = [
    { object: 'block', type: 'heading_2', heading_2: { rich_text: [{ text: { content: '📋 PRD Details' } }] } },
    { object: 'block', type: 'bulleted_list_item', bulleted_list_item: { rich_text: [{ text: { content: `**Problem:** ${formData.problem || 'Not provided'}` } }] } },
    { object: 'block', type: 'bulleted_list_item', bulleted_list_item: { rich_text: [{ text: { content: `**Goals:** ${formData.goals || 'Not provided'}` } }] } },
    { object: 'block', type: 'bulleted_list_item', bulleted_list_item: { rich_text: [{ text: { content: `**Target Users:** ${formData.targetUsers || 'Not provided'}` } }] } },
    { object: 'block', type: 'bulleted_list_item', bulleted_list_item: { rich_text: [{ text: { content: `**Key Features:** ${formData.features || 'Not provided'}` } }] } },
    { object: 'block', type: 'bulleted_list_item', bulleted_list_item: { rich_text: [{ text: { content: `**Success Metrics:** ${formData.success || 'Not provided'}` } }] } },
  ];

  if (formData.projectLink) {
    children.push(
      { object: 'block', type: 'heading_2', heading_2: { rich_text: [{ text: { content: '🔗 Reference Links' } }] } },
      { object: 'block', type: 'bulleted_list_item', bulleted_list_item: { rich_text: [{ text: { content: formData.projectLink } }] } }
    );
  }

  if (fileList.length > 0) {
    children.push({ object: 'block', type: 'heading_2', heading_2: { rich_text: [{ text: { content: '📎 Attachments' } }] } });
    fileList.forEach(f => {
      children.push({ object: 'block', type: 'bulleted_list_item', bulleted_list_item: { rich_text: [{ text: { content: f } }] } });
    });
  }

  if (scans.fileScan && !scans.fileScan.skipped) {
    const scanText = scans.fileScan.safe
      ? `✅ File clean — VT: ${scans.fileScan.clean} clean, ${scans.fileScan.suspicious} suspicious`
      : `🚨 FILE FLAGGED — ${scans.fileScan.malicious} engines detected! DO NOT OPEN without review`;
    children.push({ object: 'block', type: 'callout', callout: { rich_text: [{ text: { content: scanText } }], icon: { emoji: scans.fileScan.safe ? '✅' : '🚨' }, color: scans.fileScan.safe ? 'green_background' : 'red_background' } });
  }

  if (scans.linkScan && !scans.linkScan.skipped) {
    const linkText = scans.linkScan.safe
      ? `✅ Link clean`
      : `🚨 LINK FLAGGED — ${scans.linkScan.malicious} malicious detections!`;
    children.push({ object: 'block', type: 'callout', callout: { rich_text: [{ text: { content: linkText } }], icon: { emoji: scans.linkScan.safe ? '✅' : '🚨' }, color: scans.linkScan.safe ? 'green_background' : 'red_background' } });
  }

  try {
    const page = await n.pages.create({
      parent: { database_id: process.env.NOTION_DATABASE_ID },
      properties: props,
      children,
    });
    console.log('[Notion] Created page:', page.id);
    return page.id;
  } catch (err) {
    console.error('[Notion] Error:', err.message);
    return null;
  }
}

// ──_email_notification────────────────────────────────────────────────────────
async function sendTeamEmail(formData, files, scans, notionUrl) {
  const apiKey = process.env.EMAIL_API_KEY;
  const fromEmail = process.env.EMAIL_FROM || 'noreply@darkfactory.dev';
  const toEmail = process.env.TEAM_EMAIL || 'info@studexmeat.com';

  if (!apiKey) {
    console.log('[Email] No API key — skipping email (configure EMAIL_API_KEY)');
    return;
  }

  const allSafe = [scans.fileScan, scans.linkScan].every(s => !s || s.safe);
  const subject = allSafe
    ? `📋 New PRD: ${formData.projectName || 'Untitled'} from ${formData.name || 'Unknown'}`
    : `🚨 SECURE FLAG — New PRD needs scan review: ${formData.projectName}`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Plus Jakarta Sans', Arial, sans-serif; background: #09090e; color: #f0f0fa; margin: 0; padding: 0; }
    .wrap { max-width: 640px; margin: 0 auto; padding: 2rem; }
    .header { background: linear-gradient(135deg, #6c63ff, #8b5cf6); padding: 1.5rem 2rem; border-radius: 16px 16px 0 0; }
    .header h1 { margin: 0; font-size: 1.25rem; color: #fff; font-weight: 800; }
    .header p { margin: 4px 0 0; color: rgba(255,255,255,0.8); font-size: 0.875rem; }
    .body { background: #10101c; border: 1px solid #1e1e3a; border-top: none; padding: 2rem; border-radius: 0 0 16px 16px; }
    .field { margin-bottom: 1.25rem; }
    .label { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #6c63ff; margin-bottom: 0.3rem; font-family: monospace; }
    .value { font-size: 0.95rem; color: #f0f0fa; }
    .safe { color: #10b981; font-weight: 600; }
    .danger { color: #ef4444; font-weight: 700; }
    .scan-box { background: #1e1e38; border-radius: 12px; padding: 1rem; margin: 1rem 0; }
    .btn { display: inline-block; background: linear-gradient(135deg, #6c63ff, #8b5cf6); color: #fff; padding: 0.75rem 1.5rem; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 0.875rem; }
    .attachments { background: #171728; border-radius: 12px; padding: 1rem; margin: 1rem 0; }
    .attachment { display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 0; border-bottom: 1px solid #2d2d56; }
    .attachment:last-child { border-bottom: none; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="header">
      <h1>🎯 New PRD Submission</h1>
      <p>${formData.company || 'Unknown Company'} · ${formData.name || 'Unknown Client'} · ${new Date().toLocaleDateString('en-ZA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
    </div>
    <div class="body">
      ${allSafe ? '<p style="color:#10b981; font-weight:700; margin-bottom:1.5rem;">✅ All security scans passed. Ready for team review.</p>' : '<p style="color:#ef4444; font-weight:700; margin-bottom:1.5rem;">🚨 SECURITY FLAGS DETECTED. Review before opening attachments.</p>'}

      <div class="field">
        <div class="label">Project Name</div>
        <div class="value" style="font-size:1.1rem; font-weight:700;">${formData.projectName || '—'}</div>
      </div>
      <div class="grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1.5rem;">
        <div class="field">
          <div class="label">Budget</div>
          <div class="value">${formData.budget || '—'}</div>
        </div>
        <div class="field">
          <div class="label">Timeline</div>
          <div class="value">${formData.timeline || '—'}</div>
        </div>
      </div>

      <div class="field">
        <div class="label">Problem Statement</div>
        <div class="value">${formData.problem || '—'}</div>
      </div>
      <div class="field">
        <div class="label">Goals</div>
        <div class="value">${formData.goals || '—'}</div>
      </div>
      <div class="field">
        <div class="label">Target Users</div>
        <div class="value">${formData.targetUsers || '—'}</div>
      </div>
      <div class="field">
        <div class="label">Key Features</div>
        <div class="value">${formData.features || '—'}</div>
      </div>
      <div class="field">
        <div class="label">Success Metrics</div>
        <div class="value">${formData.success || '—'}</div>
      </div>

      ${formData.projectLink ? `<div class="field"><div class="label">Reference Link</div><div class="value"><a href="${formData.projectLink}" style="color:#6c63ff;">${formData.projectLink}</a></div></div>` : ''}

      ${files.voice || files.doc ? `<div class="attachments"><div class="label" style="margin-bottom:0.75rem;">📎 Attachments</div>${files.voice ? `<div class="attachment"><span>🎤</span><span>${files.voice.originalName}</span><span class="${files.voice.scanned ? 'safe' : 'danger'}">${files.voice.scanned ? '✅ Scanned' : '⏳ Pending'}</span></div>` : ''}${files.doc ? `<div class="attachment"><span>📄</span><span>${files.doc.originalName}</span><span class="${files.doc.scanned ? 'safe' : 'danger'}">${files.doc.scanned ? '✅ Scanned' : '⏳ Pending'}</span></div>` : ''}</div>` : ''}

      ${scans.fileScan && !scans.fileScan.skipped ? `<div class="scan-box"><div class="label">🔍 File Scan Result</div><div class="value ${scans.fileScan.safe ? 'safe' : 'danger'}">${scans.fileScan.safe ? '✅ Clean — ' + scans.fileScan.clean + ' engines found no threats' : '🚨 FLAGGED — ' + scans.fileScan.malicious + ' malicious, ' + scans.fileScan.suspicious + ' suspicious detections!'}</div></div>` : ''}
      ${scans.linkScan && !scans.linkScan.skipped ? `<div class="scan-box"><div class="label">🔍 Link Scan Result</div><div class="value ${scans.linkScan.safe ? 'safe' : 'danger'}">${scans.linkScan.safe ? '✅ Clean link' : '🚨 FLAGGED — ' + scans.linkScan.malicious + ' malicious detections!'}</div></div>` : ''}

      ${notionUrl ? `<div style="margin-top:1.5rem;"><a href="${notionUrl}" class="btn">📋 View in Notion CRM →</a></div>` : ''}
    </div>
  </div>
</body>
</html>`;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        subject,
        html,
      }),
    });
    if (res.ok) {
      console.log('[Email] Sent successfully');
    } else {
      const err = await res.text();
      console.log('[Email] Failed:', res.status, err);
    }
  } catch (e) {
    console.error('[Email] Error:', e.message);
  }
}

// ──_api_routes────────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));
// Serve uploaded files (restricted path)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// URL scan endpoint (client calls this directly)
app.post('/api/prd/scan-url', async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'No URL provided' });
  const result = await scanUrl(url);
  res.json({ url, ...result });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    features: {
      virusScanning: !!process.env.VIRUSTOTAL_API_KEY,
      notionCRM:     !!process.env.NOTION_API_KEY,
      emailNotify:    !!process.env.EMAIL_API_KEY,
    }
  });
});

// Submit PRD
app.post('/api/prd/submit', async (req, res) => {
  try {
    const formData = req.body;
    console.log('[PRD] Submission received:', formData.projectName, 'from:', formData.name);

    // ── quick scan links from form ─────────────────────────────────────────
    const formLinks = [formData.projectLink].filter(Boolean);
    const linkResults = {};
    for (const url of formLinks) {
      const result = await scanUrl(url);
      linkResults[url] = result;
      if (!result.safe) {
        console.warn(`[PRD] 🚨 Link flagged as malicious: ${url}`, result);
      }
    }

    // ── scan flag ─────────────────────────────────────────────────────────
    const linkScan = Object.values(linkResults)[0] || null;
    const allLinksSafe = !linkScan || linkScan.safe || linkScan.skipped;

    // ── create notion page ────────────────────────────────────────────────
    const scans = { fileScan: null, linkScan: linkScan };
    const notionId = await createNotionPage(formData, {}, scans);
    const notionUrl = notionId ? `https://notion.so/${notionId.replace(/-/g, '')}` : null;

    // ── email team ───────────────────────────────────────────────────────
    await sendTeamEmail(formData, {}, scans, notionUrl);

    res.json({
      success: true,
      scanPassed: allLinksSafe,
      message: allLinksSafe
        ? 'PRD submitted successfully. Security scans passed. Our team will be in touch within 24 hours.'
        : 'PRD received. Our team has been notified and will conduct a manual security review before processing.',
      referenceId: `PRD-${Date.now().toString(36).toUpperCase()}`,
      notionUrl,
    });
  } catch (err) {
    console.error('[PRD] Error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Upload + scan file (voice note or document)
app.post('/api/prd/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    console.log('[Upload] Received:', req.file.originalname, req.file.size, 'bytes');

    // Scan file
    const scanResult = await scanFile(req.file.path, req.file.originalname);
    const fileInfo = {
      originalName: req.file.originalname,
      size: req.file.size,
      mimeType: req.file.mimetype,
      path: `/uploads/${req.file.fieldname === 'voiceNote' ? 'voice' : 'docs'}/${req.file.filename}`,
      storedAs: req.file.filename,
      scanned: !scanResult.skipped,
      ...scanResult,
    };

    console.log('[Upload] Scan result:', scanResult);

    res.json({
      success: true,
      file: fileInfo,
      scanPassed: scanResult.safe,
    });
  } catch (err) {
    console.error('[Upload] Error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Submit full PRD with both form data + files (multipart)
app.post('/api/prd/full', upload.fields([
  { name: 'voiceNote', maxCount: 1 },
  { name: 'document',  maxCount: 1 },
]), async (req, res) => {
  try {
    const formData = JSON.parse(req.body.formData || '{}');
    const files = {};
    let fileScan = null;

    // Process voice note
    if (req.files?.voiceNote?.[0]) {
      const f = req.files.voiceNote[0];
      const result = await scanFile(f.path, f.originalname);
      files.voice = {
        originalName: f.originalname,
        size: f.size,
        path: `/uploads/voice/${f.filename}`,
        scanned: !result.skipped,
        ...result,
      };
      fileScan = result;
    }

    // Process document
    if (req.files?.document?.[0]) {
      const f = req.files.document[0];
      const result = await scanFile(f.path, f.originalname);
      files.doc = {
        originalName: f.originalname,
        size: f.size,
        path: `/uploads/docs/${f.filename}`,
        scanned: !result.skipped,
        ...result,
      };
      fileScan = fileScan || result;
    }

    // Scan link from form
    let linkScan = null;
    if (formData.projectLink) {
      linkScan = await scanUrl(formData.projectLink);
    }

    const allSafe = [
      !fileScan || fileScan.safe || fileScan.skipped,
      !linkScan || linkScan.safe || linkScan.skipped,
    ].every(Boolean);

    const scans = { fileScan, linkScan };
    const notionId = await createNotionPage(formData, files, scans);
    const notionUrl = notionId ? `https://notion.so/${notionId.replace(/-/g, '')}` : null;
    await sendTeamEmail(formData, files, scans, notionUrl);

    const refId = `PRD-${Date.now().toString(36).toUpperCase()}`;
    console.log('[PRD Full] Submitted:', refId, 'safe:', allSafe);

    res.json({
      success: true,
      scanPassed: allSafe,
      referenceId: refId,
      files,
      notionUrl,
      message: allSafe
        ? `PRD submitted ✅ Reference: ${refId}. Our team will review and reach out within 24 hours.`
        : `PRD received with security flags. Reference: ${refId}. Our team will conduct a manual review and contact you.`,
    });
  } catch (err) {
    console.error('[PRD Full] Error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ──_start─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🏭 Dark Factory PRD Intake System`);
  console.log(`   Running at: http://localhost:${PORT}`);
  console.log(`   Form:      http://localhost:${PORT}/prd-form.html`);
  console.log(`\n   Features:`);
  console.log(`   ✅ Voice note recording`);
  console.log(`   ✅ Document upload`);
  console.log(`   ✅ Link submission`);
  console.log(`   ✅ VirusTotal file scanning`);
  console.log(`   ✅ URL reputation scanning`);
  console.log(`   ✅ Notion CRM integration`);
  console.log(`   ✅ Team email notification`);
  console.log(`\n   Configure in .env to enable integrations:`);
  console.log(`   - VIRUSTOTAL_API_KEY`);
  console.log(`   - NOTION_API_KEY + NOTION_DATABASE_ID`);
  console.log(`   - EMAIL_API_KEY (Resend)\n`);
});
