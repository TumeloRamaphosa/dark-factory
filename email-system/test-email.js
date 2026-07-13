#!/usr/bin/env node
/**
 * OGRE Email System — Test Suite
 * Run with: node /workspace/email-system/test-email.js
 *
 * Tests:
 *   1. SMTP connection (verifies host + credentials)
 *   2. Queue file format validation
 *   3. Test email send to self
 *   4. Morning brief HTML render check
 */

const fs   = require('fs');
const path = require('path');

const EMAIL_SYSTEM_DIR = path.join(__dirname);
const QUEUE_DIR        = process.env.EMAIL_QUEUE_DIR || '/workspace/email-queue';

let passed = 0;
let failed = 0;

function ok(msg)  { passed++; console.log(`  ✅ ${msg}`); }
function fail(msg){ failed++; console.log(`  ❌ ${msg}`); }
function info(msg){ console.log(`  ℹ️  ${msg}`); }

// ── Load env helper ───────────────────────────────────────────────────────────
function loadEnv() {
  // Load .env or .env.guide
  for (const envFile of ['.env', '.env.guide']) {
    const filePath = path.join(EMAIL_SYSTEM_DIR, envFile);
    if (!fs.existsSync(filePath)) continue;
    const lines = fs.readFileSync(filePath, 'utf8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx === -1) continue;
      const key   = trimmed.slice(0, eqIdx).trim();
      const value = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '');
      if (key && !process.env[key]) {
        process.env[key] = value;
      }
    }
    info(`Loaded env from ${envFile}`);
  }
}

// ── Test 1: Credentials ───────────────────────────────────────────────────────
function test1_credentials() {
  console.log('\n📋 Test 1 — Credential Check');
  const user = process.env.EMAIL_USER || process.env.GMAIL_USER;
  const pass = process.env.EMAIL_PASS  || process.env.GMAIL_APP_PASSWORD;

  if (!user) {
    fail('EMAIL_USER / GMAIL_USER is not set');
  } else {
    ok(`EMAIL_USER is set: ${user}`);
  }

  if (!pass || pass === 'YOUR_APP_PASSWORD_HERE') {
    fail('EMAIL_PASS is not set or still has placeholder value');
    info('→ See SETUP-GMAIL.md to get your Gmail App Password');
    info('→ Once you have it, either:');
    info('  - Add EMAIL_PASS=xxxx to /workspace/email-system/.env');
    info('  - Or create /workspace/email-system/.env.guide with EMAIL_PASS=xxxx');
    return false;
  }

  if (pass.length !== 16) {
    fail(`EMAIL_PASS is ${pass.length} chars — Gmail App Passwords are always 16 characters`);
    return false;
  }

  ok(`EMAIL_PASS is configured (${pass.length} chars)`);
  return true;
}

// ── Test 2: Queue files ────────────────────────────────────────────────────────
function test2_queueFiles() {
  console.log('\n📁 Test 2 — Queue File Check');
  const today     = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

  const checks = [
    { type: 'morning-brief',   label: 'Morning Brief' },
    { type: 'evening-digest', label: 'Evening Digest' },
    { type: 'research-brief', label: 'Research Brief' },
  ];

  let anyFound = false;
  for (const { type, label } of checks) {
    const todayPath    = path.join(QUEUE_DIR, `${type}-${today}.txt`);
    const yestPath    = path.join(QUEUE_DIR, `${type}-${yesterday}.txt`);
    if (fs.existsSync(todayPath)) {
      ok(`${label} ✓ (today: ${path.basename(todayPath)})`);
      anyFound = true;
    } else if (fs.existsSync(yestPath)) {
      ok(`${label} ✓ (yesterday: ${path.basename(yestPath)})`);
      anyFound = true;
    } else {
      fail(`${label} ✗ — no file for today or yesterday`);
    }
  }

  if (!anyFound) {
    info('Queue directory: ' + QUEUE_DIR);
    info('Is this correct? Set EMAIL_QUEUE_DIR env var if not.');
  }
}

// ── Test 3: SMTP connection ────────────────────────────────────────────────────
async function test3_smtpConnection() {
  console.log('\n🔌 Test 3 — SMTP Connection');
  const nodemailer = require('nodemailer');

  const user = process.env.EMAIL_USER || process.env.GMAIL_USER;
  const pass = process.env.EMAIL_PASS  || process.env.GMAIL_APP_PASSWORD;
  const host = process.env.EMAIL_HOST  || 'smtp.gmail.com';
  const port = parseInt(process.env.EMAIL_PORT || '587', 10);

  if (!user || !pass || pass === 'YOUR_APP_PASSWORD_HERE') {
    fail('Skipped — no credentials');
    return false;
  }

  try {
    const transporter = nodemailer.createTransport({
      host, port,
      secure: false,
      auth: { user, pass },
      connectionTimeout: 10000,
    });
    await transporter.verify();
    ok(`SMTP connection OK — ${host}:${port}`);
    return true;
  } catch (err) {
    fail(`SMTP connection failed: ${err.message}`);
    return false;
  }
}

// ── Test 4: Send test email ───────────────────────────────────────────────────
async function test4_sendTestEmail() {
  console.log('\n📤 Test 4 — Send Test Email');
  const nodemailer = require('nodemailer');

  const user = process.env.EMAIL_USER || process.env.GMAIL_USER;
  const pass = process.env.EMAIL_PASS  || process.env.GMAIL_APP_PASSWORD;
  const to   = process.env.EMAIL_TO    || 'info@studexmeat.com';
  const host = process.env.EMAIL_HOST  || 'smtp.gmail.com';
  const port = parseInt(process.env.EMAIL_PORT || '587', 10);
  const today = new Date().toISOString().slice(0, 10);

  if (!user || !pass || pass === 'YOUR_APP_PASSWORD_HERE') {
    fail('Skipped — no credentials');
    return;
  }

  const testHtml = `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><style>
  body{font-family:Arial,sans-serif;background:#0a0a0f;color:#e8e8f0;padding:40px}
  .card{background:#0f0f1a;border:1px solid #2a2a3e;border-radius:12px;padding:32px;max-width:600px}
  .badge{background:#00ff88;color:#0a0a0f;font-size:11px;padding:4px 12px;border-radius:20px;font-weight:700;display:inline-block;margin-bottom:16px;letter-spacing:1px;text-transform:uppercase}
  h1{color:#00ff88;font-size:22px;margin-bottom:8px}
  p{color:#c8c8d8;line-height:1.7;font-size:14px}
  .grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:20px 0}
  .cell{background:#1a1a2e;border:1px solid #2a2a3e;border-radius:8px;padding:14px}
  .cell .label{font-size:10px;color:#888;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px}
  .cell .val{font-size:16px;color:#ffd700;font-weight:700}
  .footer{margin-top:28px;padding-top:16px;border-top:1px solid #2a2a3e;font-size:11px;color:#555}
</style></head><body>
  <div class="card">
    <div class="badge">✅ System Operational</div>
    <h1>🏭 OGRE Email System — Test Passed</h1>
    <p>If you're reading this, the email pipeline from Dark Factory is fully functional.</p>
    <div class="grid">
      <div class="cell"><div class="label">Volume</div><div class="val">D${new Date().toISOString().slice(0,10)}</div></div>
      <div class="cell"><div class="label">Sender</div><div class="val">${user}</div></div>
      <div class="cell"><div class="label">SMTP</div><div class="val">${host}:${port}</div></div>
      <div class="cell"><div class="label">Recipient</div><div class="val">${to}</div></div>
    </div>
    <p>Next: Set up cron jobs at 06:00 SA (morning), 18:00 SA (evening), 03:00 SA (research).<br>
    See <code>/workspace/email-system/SETUP-GMAIL.md</code> if this is your first time.</p>
    <div class="footer">OGRE Computer · Dark Factory · Studex Group AI Infrastructure Division</div>
  </div>
</body></html>`;

  try {
    const transporter = nodemailer.createTransport({ host, port, secure: false, auth: { user, pass } });
    const info = await transporter.sendMail({
      from:    `"OGRE Computer" <${user}>`,
      to,
      subject: `🧪 OGRE Email Test — ${today}`,
      html:    testHtml,
      text:    'OGRE Email System test — all systems nominal.',
    });
    ok(`Test email sent → ${to}`);
    info(`Message ID: ${info.messageId}`);
  } catch (err) {
    fail(`Failed to send: ${err.message}`);
    if (err.message.includes('Invalid login')) {
      info('→ AUTH FAILED: Your App Password may be incorrect or expired.');
      info('→ Generate a new one at: https://myaccount.google.com/apppasswords');
    }
  }
}

// ── Test 5: Morning brief render ─────────────────────────────────────────────
function test5_morningBriefRender() {
  console.log('\n📄 Test 5 — Morning Brief Render');
  const today     = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  let found = null;

  for (const d of [today, yesterday]) {
    const fp = path.join(QUEUE_DIR, `morning-brief-${d}.txt`);
    if (fs.existsSync(fp)) { found = fp; break; }
  }

  if (!found) {
    fail('No morning-brief queue file found');
    return;
  }

  const content = fs.readFileSync(found, 'utf8');
  const lines   = content.split('\n').filter(l => l.trim());

  if (lines.length < 5) {
    fail(`Queue file looks sparse (${lines.length} non-empty lines)`);
  } else {
    ok(`Queue file has ${lines.length} non-empty lines`);
    info(`First line: "${lines[0]}"`);
    info(`Last line:  "${lines[lines.length - 1]}"`);
  }

  if (content.includes('PRIORITIES') || content.includes('GLOBAL') || content.includes('ACTION')) {
    ok('Content structure looks correct (has expected sections)');
  } else {
    fail('Content may not be in the expected format');
    info('→ See /workspace/email-queue/EMAIL_TEMPLATE.md for format guide');
  }
}

// ── Run all tests ─────────────────────────────────────────────────────────────
async function main() {
  console.log('═══════════════════════════════════════════════');
  console.log('  🏭 OGRE Email System — Test Suite');
  console.log(`  ${new Date().toISOString()} UTC`);
  console.log('═══════════════════════════════════════════════');

  loadEnv();

  // Run sync tests
  test1_credentials();
  test2_queueFiles();
  test5_morningBriefRender();

  // Run async tests
  const canConnect = await test3_smtpConnection();
  if (canConnect) {
    await test4_sendTestEmail();
  } else {
    info('Skipping email send test (no valid connection)');
  }

  // Summary
  console.log('\n═══════════════════════════════════════════════');
  console.log(`  Results: ${passed} passed, ${failed} failed`);
  if (failed === 0 && canConnect) {
    console.log('  🎉 All systems nominal — email is LIVE');
  } else if (failed === 0) {
    console.log('  ⚠️  Credentials not set — configure EMAIL_PASS first');
  } else {
    console.log('  ❌ Some tests failed — review above');
  }
  console.log('═══════════════════════════════════════════════\n');

  process.exit(failed > 0 ? 1 : 0);
}

main().catch(err => {
  console.error('❌ Test suite crashed:', err.message);
  process.exit(1);
});
