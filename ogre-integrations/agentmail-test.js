/**
 * OGRE AgentMail Integration Test
 * API Key: am_us_1c4205d60fe9a4a98e02ca4bf0c8261dfe3195e643b63e7d3191e604ffe9bc89
 */

require('dotenv').config({ path: __dirname + '/.env' });

const AGENTMAIL_API_KEY = process.env.AGENTMAIL_API_KEY;
const WEBHOOK_URL = process.env.AGENTMAIL_WEBHOOK_URL || 'https://agent.studexmeat.com/webhook';

/**
 * Send email via AgentMail API
 */
async function sendEmail(to, subject, body, fromName = 'OGRE Computer') {
  const response = await fetch('https://api.agentmail.com/v1/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${AGENTMAIL_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `${fromName} <noreply@agent.studexmeat.com>`,
      to,
      subject,
      body,
      track: true,
      webhook: WEBHOOK_URL,
    }),
  });
  return response.json();
}

/**
 * Send tender alert to SA partner
 */
async function sendTenderAlert(partnerEmail, companyName) {
  const subject = '🏥 NDoH-11 EMR Tender — OGRE AI Partnership Opportunity';
  const body = `
Dear ${companyName},

OGRE Computer (Studex Group) would like to propose a strategic partnership on the following live tender:

TENDER: NDoH-11/2026-2027 — National Department of Health EMR Rollout
VALUE: R871M (estimated)
CLOSING: Monday, 13 July 2026 at 11:00 AM
DOCUMENTS: https://www.etenders.gov.za

WHAT WE PROPOSE:
OGRE Computer provides the AI agent technology stack for this engagement.
Your company provides B-BBEE certification, local registration, and billing.
Commission structure: 10% of contract value paid to OGRE.

OUR AI CAPABILITY:
• Ptah Builder™ — EMR system deployment automation
• Seshat Mind™ — Training content generation  
• Anpu Scout™ — Real-time issue tracking
• Sobek Trade™ — Financial reporting and invoicing

This is a R87M+ opportunity for your company at 10% commission.

Are you available for a 15-minute call today?

Best regards,
Cipher Tr@ce
OGRE Computer | Dark Factory
info@studexmeat.com
  `.trim();
  
  return sendEmail(partnerEmail, subject, body);
}

/**
 * Test AgentMail API connection
 */
async function testConnection() {
  console.log('🔍 Testing AgentMail connection...');
  console.log('API Key configured:', AGENTMAIL_API_KEY ? '✅' : '❌');
  
  try {
    const response = await fetch('https://api.agentmail.com/v1/status', {
      headers: { 'Authorization': `Bearer ${AGENTMAIL_API_KEY}` },
    });
    const data = await response.json();
    console.log('AgentMail status:', data);
    return data;
  } catch (err) {
    console.error('AgentMail connection error:', err.message);
    return { status: 'error', message: err.message };
  }
}

if (require.main === module) {
  const [,, action, ...args] = process.argv;
  
  if (action === 'test') {
    testConnection().then(console.log);
  } else if (action === 'alert') {
    const [email, company] = args;
    if (!email || !company) {
      console.log('Usage: node agentmail-test.js alert <email> <company-name>');
      process.exit(1);
    }
    sendTenderAlert(email, company).then(console.log);
  } else {
    console.log('Usage:');
    console.log('  node agentmail-test.js test              — Test API connection');
    console.log('  node agentmail-test.js alert <email> <name>  — Send tender alert');
  }
}

module.exports = { sendEmail, sendTenderAlert, testConnection };

console.log('OGRE AgentMail Integration Ready');
