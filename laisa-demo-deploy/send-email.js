/**
 * OGRE Computer — Email System
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
 *   node send-email.js evening          ← Evening digest
 *   node send-email.js midnight         ← Midnight build report
 *   node send-email.js research         ← 9-country research
 *   node send-email.js test             ← Test send to self
 *   node send-email.js send <email>     ← Send to specific address
 *
 * Templates:
 *   email-templates/
 *     ogre-intelligence-brief.html   ← Morning brief (new OGRE branded)
 *     ogre-evening-digest.html       ← Evening digest (new OGRE branded)
 *     ogre-midnight-build.html       ← Midnight build report
 *     ogre-research-brief.html        ← 9-country research
 *
 * Setup:
 *   1. Create Gmail App Password: myaccount.google.com → Security → App Passwords
 *   2. Set env var: GMAIL_USER=info@studexmeat.com  GMAIL_APP_PASSWORD=xxxx
 *      Or update the credentials below.
 * ─────────────────────────────────────────────
 */

const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');

dayjs.extend(utc);
dayjs.extend(timezone);

const TEMPLATE_DIR = path.join(__dirname, 'email-templates');
const TEMPLATES = {
  morning:  'ogre-intelligence-brief.html',
  evening:  'ogre-evening-digest.html',
  midnight: 'ogre-midnight-build.html',
  research: 'ogre-research-brief.html',
};

// ── Email credentials ──────────────────────────────────────────────────────────
const GMAIL_USER    = process.env.GMAIL_USER    || 'info@studexmeat.com';
const GMAIL_APP_PWD = process.env.GMAIL_APP_PASSWORD || 'YOUR_APP_PASSWORD_HERE';
const TO_EMAIL      = process.env.TO_EMAIL || 'info@studexmeat.com';

// ── Transporter ────────────────────────────────────────────────────────────────
function createTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_APP_PWD,
    },
  });
}

// ── Date helpers ───────────────────────────────────────────────────────────────
function formatDate() {
  return dayjs().tz('Africa/Johannesburg').format('dddd, D MMMM YYYY');
}
function formatDateShort() {
  return dayjs().tz('Africa/Johannesburg').format('D MMM YYYY');
}
function formatTime() {
  return dayjs().tz('Africa/Johannesburg').format('HH:mm');
}
function formatVolume() {
  // Days since 21 June 2026
  return dayjs().diff(dayjs('2026-06-21'), 'day') + 1;
}
function formatYesterday() {
  return dayjs().subtract(1, 'day').tz('Africa/Johannesburg').format('D MMM YYYY');
}

// ── Load + fill template ───────────────────────────────────────────────────────
function fillTemplate(templateName, vars = {}) {
  const filePath = path.join(TEMPLATE_DIR, templateName);
  if (!fs.existsSync(filePath)) {
    console.error(`Template not found: ${filePath}`);
    return null;
  }
  let html = fs.readFileSync(filePath, 'utf8');

  const defaults = {
    date:         formatDateShort(),
    date_long:    formatDate(),
    time_sa:      formatTime(),
    volume:       String(formatVolume()).padStart(2, '0'),
    year:         dayjs().year(),
    yesterday:    formatYesterday(),
    verdict:     'The AI revolution is no longer a US-China duopoly. Brazil, India, Nigeria, Ghana, and South Africa are building sovereign AI with local context, local data, and local capital. OGRE has a 12–18 month window to establish first-mover advantage in African AI infrastructure.',
    live_count:  '47',
    ship_1:      'Global AI research brief — 9 countries, 21 action items',
    ship_2:      'OGRE Briefing page deployed',
    ship_3:      'Dark Factory v4 client website rebuilt',
    ...vars,
  };

  for (const [key, val] of Object.entries(defaults)) {
    html = html.replace(new RegExp(`{{${key}}}`, 'g'), val);
  }

  return html;
}

// ── Email subjects ─────────────────────────────────────────────────────────────
const SUBJECTS = {
  morning:  `🎯 OGRE Intelligence Brief — ${formatDateShort()} | 9 Countries`,
  evening:  `🌙 OGRE Evening Digest — ${formatDateShort()} | What We Shipped Today`,
  midnight: `⚡ OGRE Midnight Build — ${formatDateShort()} | Built While You Slept`,
  research: `🌍 OGRE Global Research — ${formatDateShort()} | 9-Country AI Scan`,
};

// ── Send ──────────────────────────────────────────────────────────────────────
async function sendEmail({ to = TO_EMAIL, subject, html, text }) {
  if (GMAIL_APP_PWD === 'YOUR_APP_PASSWORD_HERE') {
    console.warn('⚠️  GMAIL_APP_PASSWORD not set. Skipping send.');
    console.warn('   Set it with:  export GMAIL_APP_PASSWORD=xxxx');
    return { skipped: true, reason: 'no_app_password' };
  }

  const transporter = createTransporter();
  const info = await transporter.sendMail({
    from: `"OGRE Computer" <${GMAIL_USER}>`,
    to,
    subject,
    text,           // plain text fallback
    html,            // rich HTML (used by modern clients)
  });

  console.log(`✅ Sent: ${subject}`);
  console.log(`   Message ID: ${info.messageId}`);
  console.log(`   To: ${to}`);
  return { success: true, messageId: info.messageId };
}

// ── CLI ───────────────────────────────────────────────────────────────────────
const [,, command, arg] = process.argv;

async function main() {
  const now = dayjs().tz('Africa/Johannesburg');
  console.log(`\n⚡ OGRE Email System — ${now.format('YYYY-MM-DD HH:mm:ss')} SA\n`);
  console.log(`   From: ${GMAIL_USER}`);
  console.log(`   Mode: ${command || 'test'}\n`);

  switch (command) {
    case 'morning':
    case 'evening':
    case 'midnight':
    case 'research': {
      const template = TEMPLATES[command];
      if (!template) { console.error('Unknown template'); process.exit(1); }
      const html = fillTemplate(template);
      if (!html)    { console.error('Template load failed'); process.exit(1); }
      await sendEmail({ subject: SUBJECTS[command], html, text: 'OGRE Intelligence Brief — view in HTML email client' });
      break;
    }

    case 'test': {
      const html = fillTemplate('ogre-intelligence-brief.html', {
        verdict: 'TEST: This is a test email from OGRE Computer. The email system is working correctly.',
        live_count: '1',
        ship_1: 'Test email sent successfully',
        ship_2: 'All systems nominal',
        ship_3: 'Gmail App Password verified',
      });
      await sendEmail({
        subject: `🧪 OGRE Email Test — ${formatDateShort()}`,
        html,
        text: 'OGRE Computer test email — all systems nominal.',
      });
      break;
    }

    case 'send': {
      if (!arg) { console.error('Usage: node send-email.js send <email@address.com>'); process.exit(1); }
      const html = fillTemplate('ogre-intelligence-brief.html');
      await sendEmail({
        to: arg,
        subject: SUBJECTS.morning,
        html,
        text: 'OGRE Intelligence Brief — view in HTML email client',
      });
      break;
    }

    default:
      console.log(`
⚡ OGRE Email CLI
───────────────────────────────────────────
Usage:
  node send-email.js morning      ← Morning brief (06:00 SA)
  node send-email.js evening      ← Evening digest (18:00 SA)
  node send-email.js midnight     ← Midnight build (22:00 SA)
  node send-email.js research     ← 9-country research (03:00 SA)
  node send-email.js test        ← Test send to self
  node send-email.js send <email> ← Send to specific address

Templates:
  ${Object.entries(TEMPLATES).map(([k,v]) => `  ${k.padEnd(10)} ${v}`).join('\n  ')}

Environment:
  GMAIL_USER=info@studexmeat.com
  GMAIL_APP_PASSWORD=xxxx    ← REQUIRED
  TO_EMAIL=info@studexmeat.com

Setup guide: myaccount.google.com → Security → App Passwords
───────────────────────────────────────────
`);
      process.exit(0);
  }
}

main().catch(err => { console.error('❌ Error:', err.message); process.exit(1); });
