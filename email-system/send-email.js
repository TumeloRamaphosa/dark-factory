/**
 * OGRE Computer — Email System (Dark Factory)
 * Studex Group AI Infrastructure Division
 * ─────────────────────────────────────────────
 * Sends branded HTML emails for:
 *   - Morning Intelligence Brief  (06:00 SA)
 *   - Evening Digest             (18:00 SA)
 *   - Midnight Build Report       (22:00 SA)
 *   - Global AI Research Brief    (03:00 SA)
 *
 * Usage:
 *   node send-email.js morning           ← Morning brief
 *   node send-email.js evening           ← Evening digest
 *   node send-email.js midnight          ← Midnight build report
 *   node send-email.js research          ← 9-country research
 *   node send-email.js test              ← Test send to self
 *   node send-email.js send <email>      ← Send to specific address
 *
 * Setup:
 *   1. Create Gmail App Password: myaccount.google.com → Security → App Passwords
 *      See: /workspace/email-system/SETUP-GMAIL.md (full walkthrough)
 *   2. Copy .env.example to .env and fill in your credentials:
 *      cp /workspace/email-system/.env.example /workspace/email-system/.env
 *   3. Edit /workspace/email-system/.env — set EMAIL_PASS to your 16-char App Password
 *   4. Test: node /workspace/email-system/test-email.js
 * ─────────────────────────────────────────────
 */

const nodemailer  = require('nodemailer');
const fs         = require('fs');
const path       = require('path');
const dayjs      = require('dayjs');
const utc        = require('dayjs/plugin/utc');
const timezone   = require('dayjs/plugin/timezone');
const { execSync } = require('child_process');

dayjs.extend(utc);
dayjs.extend(timezone);

// ── Env ───────────────────────────────────────────────────────────────────────
const {
  EMAIL_HOST   = 'smtp.gmail.com',
  EMAIL_PORT   = '587',
  EMAIL_USER   = process.env.GMAIL_USER || 'info@studexmeat.com',
  EMAIL_PASS   = process.env.GMAIL_APP_PASSWORD || '',
  EMAIL_FROM   = process.env.EMAIL_FROM || `"OGRE Computer" <${EMAIL_USER}>`,
  EMAIL_TO     = process.env.EMAIL_TO || 'info@studexmeat.com',
  EMAIL_TO_TUMELO = process.env.EMAIL_TO_TUMELO || 'tumelo@studexmeat.com',
} = process.env;

const LOG_FILE  = path.join(__dirname, 'email.log');
const QUEUE_DIR = process.env.EMAIL_QUEUE_DIR || '/workspace/email-queue';

// ── Logging ───────────────────────────────────────────────────────────────────
function log(level, ...args) {
  const ts = dayjs().tz('Africa/Johannesburg').format('YYYY-MM-DD HH:mm:ss');
  const line = `[${ts}] [${level}] ${args.join(' ')}`;
  console.log(line);
  fs.appendFileSync(LOG_FILE, line + '\n');
}

function logInfo(...args) { log('INFO', ...args); }
function logWarn(...args) { log('WARN', ...args); }
function logError(...args) { log('ERROR', ...args); }

// ── Credential check ──────────────────────────────────────────────────────────
function hasCredentials() {
  return !!(EMAIL_USER && EMAIL_PASS && EMAIL_PASS !== 'YOUR_APP_PASSWORD_HERE');
}

// ── Transporter ────────────────────────────────────────────────────────────────
function createTransporter() {
  return nodemailer.createTransport({
    host:   EMAIL_HOST,
    port:   parseInt(EMAIL_PORT, 10),
    secure: false,             // true for 465, false for 587 (STARTTLS)
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });
}

// ── Date helpers (SA timezone) ────────────────────────────────────────────────
function sa(str) {
  return dayjs().tz('Africa/Johannesburg').format(str);
}
function dateFull()      { return sa('dddd, D MMMM YYYY'); }
function dateShort()     { return sa('D MMM YYYY'); }
function timeSA()        { return sa('HH:mm'); }
function dateYesterday()  { return dayjs().subtract(1, 'day').tz('Africa/Johannesburg').format('D MMM YYYY'); }

// OGRE volume: days since 21 June 2026
function volume() {
  return String(dayjs().diff(dayjs('2026-06-21'), 'day') + 1).padStart(2, '0');
}

// ── Queue file helpers ────────────────────────────────────────────────────────
function readQueueFile(type) {
  const today    = dayjs().tz('Africa/Johannesburg').format('YYYY-MM-DD');
  const yesterday = dayjs().subtract(1, 'day').tz('Africa/Johannesburg').format('YYYY-MM-DD');
  for (const datestamp of [today, yesterday]) {
    const filePath = path.join(QUEUE_DIR, `${type}-${datestamp}.txt`);
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath, 'utf8').trim();
    }
  }
  return null;
}

// ── HTML email template ────────────────────────────────────────────────────────
function wrapInTemplate({ title, subtitle, bodyContent, footerNote }) {
  const vol  = volume();
  const date = dateFull();
  const yr   = dayjs().year();
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Arial, sans-serif; background: #0a0a0f; color: #e8e8f0; }
    .wrap { max-width: 680px; margin: 0 auto; background: #0f0f1a; border-radius: 12px; overflow: hidden; }
    .header { background: linear-gradient(135deg, #00ff88 0%, #00cc6a 100%); padding: 32px 40px; }
    .header .vol { font-size: 11px; letter-spacing: 3px; color: #0a0a0f; opacity: 0.7; text-transform: uppercase; font-weight: 600; }
    .header h1 { font-size: 24px; font-weight: 700; color: #0a0a0f; margin: 6px 0; }
    .header .subtitle { font-size: 13px; color: #0a0a0f; opacity: 0.8; }
    .meta { background: #1a1a2e; padding: 14px 40px; border-bottom: 1px solid #2a2a3e; }
    .meta span { font-size: 12px; color: #888; margin-right: 24px; }
    .meta strong { color: #00ff88; }
    .body { padding: 36px 40px; }
    .body h2 { font-size: 16px; color: #00ff88; text-transform: uppercase; letter-spacing: 1.5px; margin: 28px 0 12px; border-bottom: 1px solid #2a2a3e; padding-bottom: 8px; }
    .body h2:first-child { margin-top: 0; }
    .body p { font-size: 14px; line-height: 1.75; color: #c8c8d8; margin-bottom: 14px; }
    .body ul { list-style: none; padding: 0; margin-bottom: 20px; }
    .body li { font-size: 13.5px; line-height: 1.65; color: #c8c8d8; padding: 6px 0 6px 20px; border-left: 2px solid #00ff88; margin-bottom: 4px; }
    .body li strong { color: #ffd700; }
    .body pre { background: #16162a; border: 1px solid #2a2a3e; border-radius: 6px; padding: 16px; font-size: 12px; color: #a0a0c0; line-height: 1.6; overflow-x: auto; margin-bottom: 20px; }
    .verdict-box { background: #1a2e1a; border: 1px solid #00ff88; border-radius: 8px; padding: 18px 22px; margin: 20px 0; }
    .verdict-box .label { font-size: 10px; letter-spacing: 2px; color: #00ff88; text-transform: uppercase; margin-bottom: 8px; font-weight: 700; }
    .verdict-box p { color: #c8e8c8; font-size: 13.5px; line-height: 1.7; margin: 0; }
    .action-box { background: #1e1e0a; border: 1px solid #ffd700; border-radius: 8px; padding: 18px 22px; margin: 20px 0; }
    .action-box .label { font-size: 10px; letter-spacing: 2px; color: #ffd700; text-transform: uppercase; margin-bottom: 8px; font-weight: 700; }
    .action-box p { color: #e8e0c0; font-size: 13.5px; line-height: 1.7; margin: 0; }
    .footer { background: #0a0a14; padding: 24px 40px; border-top: 1px solid #2a2a3e; }
    .footer .logo { font-size: 18px; font-weight: 700; color: #00ff88; margin-bottom: 4px; }
    .footer .sub { font-size: 11px; color: #555; letter-spacing: 1px; text-transform: uppercase; }
    .footer .note { font-size: 11px; color: #444; margin-top: 12px; line-height: 1.5; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="header">
      <div class="vol">VOL. ${vol} &nbsp;·&nbsp; OGRE COMPUTER</div>
      <h1>${title}</h1>
      <div class="subtitle">${subtitle}</div>
    </div>
    <div class="meta">
      <span><strong>📅</strong> ${date}</span>
      <span><strong>🌍</strong> SA ${timeSA()} UTC+2</span>
    </div>
    <div class="body">
      ${bodyContent}
    </div>
    <div class="footer">
      <div class="logo">🏭 Dark Factory</div>
      <div class="sub">OGRE Computer · Studex Group · AI Infrastructure Division</div>
      ${footerNote ? `<div class="note">${footerNote}</div>` : ''}
    </div>
  </div>
</body>
</html>`;
}

// ── Queue file → HTML ─────────────────────────────────────────────────────────
function renderQueueToHTML(content, type) {
  if (!content) return null;

  const lines = content.split('\n');
  let body = '';
  let section = '';
  let buffer = [];

  function flushSection() {
    if (!section) return;
    const items = buffer.filter(l => l.trim());
    if (items.length === 0) return;
    body += `<h2>${section}</h2><ul>${items.map(l => `<li>${l}</li>`).join('')}</ul>`;
    buffer = [];
  }

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) { flushSection(); continue; }
    // Section header: "=====" or "##" style
    if (/^=+/.test(line) || /^#{1,3}\s/.test(line)) {
      flushSection();
      section = line.replace(/^[=#]+\s*/, '').replace(/\s*[=#]+$/, '').trim();
      continue;
    }
    // Bullet items
    if (/^[-*]\s/.test(line) || /^\d+[\.\)]\s/.test(line) || /^→\s/.test(line)) {
      buffer.push(line.replace(/^[-*\d\.→\)\s]+/, '').trim());
    } else {
      buffer.push(line);
    }
  }
  flushSection();

  const labels = {
    morning:  { title: '🎯 Morning Intelligence Brief', sub: '9-Country AI Scan · Top Priorities · Action Matrix' },
    evening:   { title: '🌙 Evening Digest',             sub: 'What We Shipped Today · Opportunities · Next Actions' },
    midnight:  { title: '⚡ Midnight Build Report',      sub: 'Built While You Slept · Global AI Pulse' },
    research:  { title: '🌍 Global AI Research Brief',   sub: '9 Countries · Sovereign AI · Action Items' },
  };
  const { title: t, sub } = labels[type] || { title: type.toUpperCase(), sub: '' };

  return wrapInTemplate({
    title,
    subtitle: sub,
    bodyContent: body || '<p>No content available.</p>',
    footerNote: `Generated by OGRE Computer · Dark Factory · ${dateFull()}`,
  });
}

// ── Subject lines ──────────────────────────────────────────────────────────────
function subjectLine(type) {
  const d = dateShort();
  const map = {
    morning:  `🎯 OGRE Morning Brief — ${d} | 9 Countries`,
    evening:   `🌙 OGRE Evening Digest — ${d}`,
    midnight:  `⚡ OGRE Midnight Build — ${d}`,
    research:  `🌍 OGRE Global Research — ${d} | 9-Country AI Scan`,
  };
  return map[type] || `OGRE ${type} — ${d}`;
}

// ── Core send ─────────────────────────────────────────────────────────────────
async function sendEmail({ to = EMAIL_TO, subject, html, text }) {
  if (!hasCredentials()) {
    logWarn('No Gmail credentials configured. Set EMAIL_PASS in /workspace/email-system/.env');
    return { skipped: true, reason: 'no_credentials' };
  }

  try {
    const transporter = createTransporter();
    const info = await transporter.sendMail({
      from:    EMAIL_FROM,
      to,
      subject,
      text,
      html,
    });
    logInfo(`✅ Sent: "${subject}" → ${to} | MessageID: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (err) {
    logError(`Failed to send email: ${err.message}`);
    return { success: false, error: err.message };
  }
}

// ── Named send functions ───────────────────────────────────────────────────────
async function sendMorningBrief({ to = EMAIL_TO_TUMELO } = {}) {
  logInfo('Building Morning Brief...');
  const content = readQueueFile('morning-brief');
  const html    = renderQueueToHTML(content, 'morning');
  if (!html) {
    logWarn('No morning-brief queue file found. Skipping.');
    return { skipped: true, reason: 'no_queue_file' };
  }
  return sendEmail({ to, subject: subjectLine('morning'), html, text: 'OGRE Morning Brief' });
}

async function sendEveningDigest({ to = EMAIL_TO } = {}) {
  logInfo('Building Evening Digest...');
  const content = readQueueFile('evening-digest');
  const html    = renderQueueToHTML(content, 'evening');
  if (!html) {
    logWarn('No evening-digest queue file found. Skipping.');
    return { skipped: true, reason: 'no_queue_file' };
  }
  return sendEmail({ to, subject: subjectLine('evening'), html, text: 'OGRE Evening Digest' });
}

async function sendResearchBrief({ to = EMAIL_TO_TUMELO } = {}) {
  logInfo('Building Global Research Brief...');
  const content = readQueueFile('research-brief');
  const html    = renderQueueToHTML(content, 'research');
  if (!html) {
    logWarn('No research-brief queue file found. Skipping.');
    return { skipped: true, reason: 'no_queue_file' };
  }
  return sendEmail({ to, subject: subjectLine('research'), html, text: 'OGRE Research Brief' });
}

async function sendTestEmail({ to = EMAIL_TO } = {}) {
  const d = dateShort();
  const testHtml = wrapInTemplate({
    title:    '🧪 OGRE Email System — Test',
    subtitle: 'All systems nominal · Dark Factory · Email pipeline verified',
    bodyContent: `
      <h2>✅ System Status</h2>
      <ul>
        <li><strong>Nodemailer:</strong> Connected and operational</li>
        <li><strong>Gmail SMTP:</strong> ${EMAIL_HOST}:${EMAIL_PORT}</li>
        <li><strong>Sender:</strong> ${EMAIL_USER}</li>
        <li><strong>Recipient:</strong> ${to}</li>
        <li><strong>Queue dir:</strong> ${QUEUE_DIR}</li>
        <li><strong>OGRE Volume:</strong> Day ${volume()} since 21 June 2026</li>
      </ul>
      <div class="verdict-box">
        <div class="label">Verdict</div>
        <p>Email system is live. If you're reading this, the pipeline is working correctly.</p>
      </div>
      <h2>Next Steps</h2>
      <ul>
        <li>Configure your Gmail App Password → see SETUP-GMAIL.md</li>
        <li>Run: <strong>node /workspace/email-system/test-email.js</strong> to verify</li>
        <li>Add cron jobs for 06:00 SA (morning), 18:00 SA (evening), 03:00 SA (research)</li>
      </ul>
    `,
    footerNote: `Test sent by OGRE Computer · Dark Factory · ${d} ${timeSA()} SA`,
  });
  return sendEmail({ to, subject: `🧪 OGRE Email Test — ${d}`, html: testHtml, text: 'OGRE Computer test email — all systems nominal.' });
}

// ── CLI ───────────────────────────────────────────────────────────────────────
const [, , command, arg] = process.argv;

async function main() {
  const now = sa('YYYY-MM-DD HH:mm:ss');
  console.log(`\n🏭 OGRE Email System — ${now} SA\n`);
  logInfo(`OGRE Email CLI started — command: ${command || 'help'}`);

  if (!hasCredentials()) {
    console.warn('⚠️  Gmail credentials not configured.');
    console.warn(`   Set EMAIL_PASS in /workspace/email-system/.env`);
    console.warn(`   See /workspace/email-system/SETUP-GMAIL.md for setup steps.`);
  }

  switch (command) {
    case 'morning': {
      const result = await sendMorningBrief();
      console.log(JSON.stringify(result));
      break;
    }
    case 'evening': {
      const result = await sendEveningDigest();
      console.log(JSON.stringify(result));
      break;
    }
    case 'research': {
      const result = await sendResearchBrief();
      console.log(JSON.stringify(result));
      break;
    }
    case 'test': {
      const result = await sendTestEmail();
      console.log(JSON.stringify(result));
      break;
    }
    case 'send': {
      if (!arg) {
        console.error('Usage: node send-email.js send <email@address.com>');
        process.exit(1);
      }
      const result = await sendEmail({
        to: arg,
        subject: subjectLine('morning'),
        html: wrapInTemplate({
          title:    '📬 OGRE Brief',
          subtitle: `Sent to ${arg}`,
          bodyContent: '<p>No queue content. Configure queue files in /workspace/email-queue/</p>',
        }),
        text: 'OGRE Brief',
      });
      console.log(JSON.stringify(result));
      break;
    }
    default:
      console.log(`
🏭 OGRE Email CLI — Dark Factory
───────────────────────────────────────────
Usage:
  node send-email.js morning   ← Morning brief → Tumelo
  node send-email.js evening   ← Evening digest → info@
  node send-email.js research   ← 9-country research → Tumelo
  node send-email.js test       ← Test email → self
  node send-email.js send <email> ← Ad-hoc send

Environment (set in .env or .env.guide):
  EMAIL_HOST=smtp.gmail.com
  EMAIL_PORT=587
  EMAIL_USER=info@studexmeat.com
  EMAIL_PASS=<16-char App Password>  ← REQUIRED
  EMAIL_FROM="OGRE Computer" <info@...>
  EMAIL_TO=info@studexmeat.com
  EMAIL_TO_TUMELO=tumelo@studexmeat.com

Setup guide: /workspace/email-system/SETUP-GMAIL.md
Log file:    /workspace/email-system/email.log
───────────────────────────────────────────
`);
      process.exit(0);
  }
}

main().catch(err => {
  logError(`Uncaught error: ${err.message}`);
  console.error('❌ Error:', err.message);
  process.exit(1);
});

module.exports = { sendEmail, sendMorningBrief, sendEveningDigest, sendResearchBrief, sendTestEmail };
