/**
 * OGRE Computer — AgentMail Setup
 * Email inbox API for AI Agents
 * 
 * SETUP: npm install agentmail
 * 
 * GET YOUR API KEY:
 * 1. Go to https://www.agentmail.to
 * 2. Sign up (free tier — no credit card)
 * 3. Copy your API key from the dashboard
 * 4. Replace YOUR_AGENTMAIL_API_KEY below
 * 
 * THEN RUN: node setup-agentmail.js
 */

const { AgentMail } = require('agentmail');

// ============================================================
// YOUR API KEY — get from https://www.agentmail.to
// ============================================================
const CLIENT = new AgentMail({
  apiKey: process.env.AGENTMAIL_API_KEY || 'YOUR_AGENTMAIL_API_KEY'
});

// ============================================================
// CREATE AGENT INBOXES
// Run once to set up inboxes for each OGRE agent
// ============================================================

async function createInboxes() {
  console.log('\n=== OGRE Computer — AgentMail Inbox Setup ===\n');

  const agents = [
    { username: 'denchclaw',   name: 'DenchClaw — AI Doctor',       desc: 'Patient intake and medical enquiries' },
    { username: 'cashclaw',    name: 'CashClaw — Billing Agent',    desc: 'Invoices, payments, medical aid claims' },
    { username: 'charlie',     name: 'Charlie — Voice Agent',       desc: 'Voice notes and transcription' },
    { username: 'chatterclaw', name: 'ChatterClaw — Social Agent',  desc: 'Social media and WhatsApp' },
    { username: 'inboxclaw',   name: 'InboxClaw — Email Agent',      desc: 'Email triage and routing' },
    { username: 'auditclaw',   name: 'AuditClaw — Compliance',      desc: 'POPIA audit and compliance' },
    { username: 'laisa',       name: 'LAISA — Main Intake',         desc: 'General enquiries and lead routing' },
    { username: 'agent',       name: 'OGRE Computer — Main',        desc: 'General OGRE Computer enquiries' },
  ];

  for (const agent of agents) {
    try {
      const inbox = await CLIENT.inboxes.create({
        username: agent.username,
        domain: 'agentmail.to',
        displayName: agent.name,
        description: agent.desc,
        // Auto-reply setting — agent reads and responds
        autoReply: false,
        // Forward all to a master inbox
        forwardTo: ['agent@stud.exchange'],
      });
      console.log(`✅ ${agent.username}@agentmail.to — created`);
      console.log(`   Inbox ID: ${inbox.id}`);
    } catch(err) {
      if (err.message && err.message.includes('already exists')) {
        console.log(`⚠️  ${agent.username}@agentmail.to — already exists`);
      } else {
        console.error(`❌ ${agent.username}@agentmail.to — error: ${err.message}`);
      }
    }
  }

  console.log('\n=== Setup Complete ===');
  console.log('\nNEXT STEPS:');
  console.log('1. Go to https://www.agentmail.to → Dashboard');
  console.log('2. Verify each inbox created above');
  console.log('3. Set up email forwarding to your existing inbox (info@studexmeat.com)');
  console.log('4. Add AGENTMAIL_API_KEY to your .env file');
  console.log('5. Integrate into LAISA OS: see /workspace/OGRE-Midnight-Build/agentmail-integration.js');
}

// ============================================================
// TEST: Send a test email from an agent inbox
// ============================================================
async function sendTestEmail() {
  const client = new AgentMail({ apiKey: process.env.AGENTMAIL_API_KEY });
  
  // List all inboxes
  const inboxes = await client.inboxes.list();
  console.log('\nYour AgentMail inboxes:');
  for (const inbox of inboxes) {
    console.log(`  ${inbox.username}@${inbox.domain} — ID: ${inbox.id}`);
    
    // Fetch recent messages
    const messages = await client.messages.list({ inboxId: inbox.id, limit: 3 });
    console.log(`  Recent messages: ${messages.length}`);
    for (const msg of messages) {
      console.log(`    - ${msg.from} | ${msg.subject} | ${msg.date}`);
    }
  }
}

// ============================================================
// AI AGENT EMAIL WORKFLOW
// Example: LAISA reads and responds to patient enquiry
// ============================================================
async function laisaEmailWorkflow(enquiry) {
  /**
   * This function simulates how an AI agent handles email:
   * 
   * 1. Patient sends email to laisa@agentmail.to
   * 2. LAISA (here) reads the email via AgentMail API
   * 3. AI processes the content, routes or responds
   * 4. AuditClaw logs the interaction (POPIA)
   * 5. CashClaw sends invoice if it's a paid service
   */
  
  // Read latest messages from LAISA inbox
  const messages = await CLIENT.messages.list({
    inboxId: 'laisa', // or use inbox ID
    limit: 10,
    unread: true,
  });

  console.log(`\n📬 LAISA has ${messages.length} unread messages`);
  
  for (const msg of messages) {
    console.log(`\nFrom: ${msg.from}`);
    console.log(`Subject: ${msg.subject}`);
    console.log(`Body preview: ${msg.body?.substring(0, 100)}...`);
    
    // AI would process this here:
    const response = await simulateAIResponse(msg);
    
    // Send reply
    if (response.shouldReply) {
      await CLIENT.messages.send({
        to: msg.from,
        subject: `Re: ${msg.subject}`,
        body: response.reply,
        from: 'laisa@agentmail.to',
      });
      console.log(`✅ Reply sent to ${msg.from}`);
    }
    
    // Mark as read
    await CLIENT.messages.markRead({ messageId: msg.id });
  }
}

// Simulate AI processing (replace with actual LLM call)
async function simulateAIResponse(msg) {
  // In production: call Claude/GPT here with the email content
  return {
    shouldReply: true,
    reply: 'Thank you for contacting LAISA. We have received your enquiry and will respond within 2 hours. — LAISA Agent OS, OGRE Computer',
    intent: 'general_enquiry',
    priority: 'normal',
    routeTo: 'laisa@agentmail.to',
  };
}

// Run
(async () => {
  const args = process.argv.slice(2);
  if (args[0] === 'create') {
    await createInboxes();
  } else if (args[0] === 'test') {
    await sendTestEmail();
  } else if (args[0] === 'laisa') {
    await laisaEmailWorkflow();
  } else {
    console.log('\nUsage:');
    console.log('  node setup-agentmail.js create   # Create all agent inboxes');
    console.log('  node setup-agentmail.js test     # Test — list all inboxes + messages');
    console.log('  node setup-agentmail.js laisa    # Run LAISA email workflow');
    console.log('\nFirst time: edit AGENTMAIL_API_KEY above, then run:');
    console.log('  node setup-agentmail.js create');
  }
})();

module.exports = { createInboxes, sendTestEmail, laisaEmailWorkflow, CLIENT };
