// LAISA Agent OS — Demo Email Sender
// Configure your Gmail App Password here (NOT your login password)
// Then run: node send-email.js

require('dotenv').config();
const nodemailer = require('nodemailer');

// ===== CONFIGURATION =====
const CONFIG = {
  smtp: {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER || 'info@studexmeat.com',
      pass: process.env.SMTP_PASS, // App Password, NOT login password
    },
  },
  from: {
    name: 'Studex Group — LAISA Agent OS',
    email: 'info@studexmeat.com',
  },
};

// Demo email content
const DEMO_EMAILS = [
  {
    to: 'client@example.com',
    subject: 'LAISA Agent OS — Live Demo Access | Studex Group',
    body: `
Hi there,

Your LAISA Agent OS demo is ready. Here's everything you need:

🌐 LIVE DEMO PAGES
→ https://wpkuimu7y7gy.space.minimax.io
  (Click any of the 9 pages to explore)

📋 FULL PROPOSAL
→ https://78jccbd42jnj.space.minimax.io
  (Print to PDF — R599/month VM + AI agents)

📊 30-DAY STRATEGIC PLAN
→ https://e5r9t2qmhbay.space.minimax.io
  (The complete roadmap)

---

WHAT YOU'RE LOOKING AT:
• 6 AI agents working 24/7 on a dedicated cloud VM
• Real-time dashboard: patients, revenue, social, appointments
• Voice agent (Charlie) for booking calls
• WhatsApp + Email AI triage
• From R599/month — no agency fees

⏰ NEXT STEPS:
1. Explore the demo links above
2. Reply to this email with your questions
3. We'll schedule a 30-minute walkthrough call

Looking forward to connecting!

Best regards,
Tumelo Ramaphosa
Studex Group (Pty) Ltd
Johannesburg, South Africa
info@studexgroup.co.za
    `,
  },
];

// ===== EMAIL SENDER =====
async function sendEmail({ to, subject, body }) {
  const transporter = nodemailer.createTransport({
    host: CONFIG.smtp.host,
    port: CONFIG.smtp.port,
    secure: CONFIG.smtp.secure,
    auth: {
      user: CONFIG.smtp.user,
      pass: CONFIG.smtp.pass,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: `"${CONFIG.from.name}" <${CONFIG.from.email}>`,
      to,
      subject,
      text: body.trim(),
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #0a0a0a; color: #f5f0e8; padding: 32px; border-radius: 16px; border: 1px solid #333;">
            <div style="border-bottom: 1px solid #333; padding-bottom: 16px; margin-bottom: 24px;">
              <h1 style="color: #c9a84c; font-size: 24px; margin: 0;">🤖 LAISA Agent OS</h1>
              <p style="color: #888; font-size: 12px; margin: 4px 0 0;">Studex Group — VM-Powered AI for SA Clinics</p>
            </div>
            <div style="color: #ccc; line-height: 1.7; font-size: 14px;">
              ${body.trim().split('\n').filter(l => !l.startsWith('---')).join('<br>')}
            </div>
            <div style="border-top: 1px solid #333; padding-top: 16px; margin-top: 24px; color: #666; font-size: 12px;">
              <p style="margin: 0;">Studex Group (Pty) Ltd · Johannesburg, South Africa<br>
              Partner Director: Tumelo Ramaphosa<br>
              info@studexgroup.co.za</p>
            </div>
          </div>
        </div>
      `,
    });
    console.log(`✅ Email sent to ${to}: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(`❌ Failed to send to ${to}:`, error.message);
    return { success: false, error: error.message };
  }
}

// ===== BATCH SEND =====
async function sendToClients(clients) {
  console.log(`\n📤 Sending demo emails to ${clients.length} clients...\n`);
  const results = [];
  for (const client of clients) {
    const result = await sendEmail({
      to: client.email,
      subject: `LAISA Agent OS — Live Demo for ${client.name}`,
      body: `
Hi ${client.name},

Your LAISA Agent OS demo is ready.

🌐 LIVE DEMO: https://wpkuimu7y7gy.space.minimax.io
📋 PROPOSAL: https://78jccbd42jnj.space.minimax.io
📊 30-DAY PLAN: https://e5r9t2qmhbay.space.minimax.io

6 AI agents working 24/7. From R599/month.
No agency fees. No 9-5 limitations.

Explore the demo and reply to schedule a walkthrough.

Best,
Tumelo Ramaphosa
Studex Group
      `.trim(),
    });
    results.push({ client: client.name, ...result });
    // Delay between sends to avoid rate limiting
    await new Promise(r => setTimeout(r, 2000));
  }

  console.log('\n📊 Results:');
  results.forEach(r => {
    console.log(`  ${r.success ? '✅' : '❌'} ${r.client}: ${r.success ? 'Sent' : r.error}`);
  });
  return results;
}

// ===== CLI =====
const args = process.argv.slice(2);

if (args[0] === 'test') {
  // Send test email to self
  sendEmail({
    to: 'info@studexmeat.com',
    subject: '✅ LAISA Agent OS — Email Test Successful',
    body: 'This is a test email from the LAISA Agent OS demo system. If you receive this, the email configuration is working correctly.',
  });
} else if (args[0] === 'send' && args.length >= 2) {
  // Send to specific email
  const email = args[1];
  sendEmail({
    to: email,
    subject: 'LAISA Agent OS — Live Demo Access',
    body: DEMO_EMAILS[0].body,
  });
} else if (args[0] === 'batch' && args.length >= 2) {
  // Send to multiple clients (JSON array)
  try {
    const clients = JSON.parse(args[1]);
    sendToClients(clients);
  } catch (e) {
    console.error('Invalid JSON. Usage: node send-email.js batch \'[{"name":"X","email":"y@z.com"}]\'');
  }
} else {
  console.log(`
📧 LAISA Agent OS — Email Sender

Usage:
  node send-email.js test                    Send test email to info@studexmeat.com
  node send-email.js send user@example.com  Send demo to one person
  node send-email.js batch '[{"name":"X","email":"y@z.com"}]'  Send to multiple

Setup:
  1. Create a .env file with: SMTP_PASS=your_gmail_app_password
  2. DO NOT use your login password — use an App Password (myaccount.google.com → App Passwords)
  3. Make sure 2-Step Verification is enabled on the Gmail account first
  `);
}

module.exports = { sendEmail, sendToClients };