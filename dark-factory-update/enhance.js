/**
 * LAISA Agent OS — Build + Enhanced Design Deploy
 * Run: node enhance.js
 */
const fs = require('fs');
const path = require('path');

const OUT   = '/workspace/dark-factory-update/out';
const LAISA = '/workspace/laisa-demo-deploy';

const pages = [
  'charlie.html','dashboard-demo.html','email-triage-demo.html',
  'whatsapp-bot-demo.html','social-sdk.html','safesight-website.html',
  'safesight-agent-os.html','laisa-website.html','laisa-crm.html',
  'contact.html','CTO-STUDY-PATH.html',
];
pages.forEach(p => {
  const s = path.join(LAISA, p), d = path.join(OUT, p);
  if (fs.existsSync(s)) { fs.copyFileSync(s, d); console.log('✅', p); }
  else console.log('⚠️ missing:', p);
});

// ── Editorial CSS ─────────────────────────────────────────────────────────────
const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400;1,600&family=JetBrains+Mono:wght@400;500;700&display=swap');

:root {
  --black:#0A0A0A; --ink:#111; --coal:#1A1A1A; --graphite:#2A2A2A;
  --ash:#5A5A5A; --silver:#9A9A9A; --chrome:#C8C8C0; --cream:#F0EDE6;
  --gold:#C9A84C; --gold-dim:#A08838; --gold-pale:#E8D5A0;
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{font-size:16px;scroll-behavior:smooth}
body{
  background:var(--black);color:var(--cream);
  font-family:'JetBrains Mono','Courier New',monospace;
  font-size:0.875rem;line-height:1.75;-webkit-font-smoothing:antialiased;
}
h1,h2,h3{font-family:'Cormorant Garamond','Georgia',serif;font-weight:400;line-height:1.1}
h1{font-size:clamp(3rem,8vw,6rem);font-weight:300}
h2{font-size:clamp(2rem,4vw,3rem)}
a{color:inherit;text-decoration:none}
a:hover{color:var(--gold)}

.container{max-width:1100px;margin:0 auto;padding:0 40px}

.label{
  font-family:'JetBrains Mono',monospace;font-size:0.65rem;
  letter-spacing:0.25em;text-transform:uppercase;color:var(--gold);
}

/* Nav */
nav{
  position:fixed;top:0;left:0;right:0;z-index:100;
  background:rgba(10,10,10,0.92);backdrop-filter:blur(20px);
  border-bottom:1px solid var(--graphite);padding:0 40px;
}
.nav-inner{
  max-width:1100px;margin:0 auto;
  display:flex;align-items:center;justify-content:space-between;height:64px;
}
.nav-brand{
  font-family:'JetBrains Mono',monospace;font-size:0.75rem;font-weight:700;
  letter-spacing:0.2em;text-transform:uppercase;color:var(--gold);
}
.nav-links{display:flex;gap:40px}
.nav-links a{
  font-size:0.75rem;letter-spacing:0.1em;text-transform:uppercase;
  color:var(--silver);transition:color 0.2s;
}
.nav-links a:hover{color:var(--cream)}

/* Hero */
.hero{
  min-height:100vh;display:flex;flex-direction:column;justify-content:flex-end;
  padding:0 40px 80px;position:relative;background:var(--black);overflow:hidden;
}
.hero::before{
  content:'';position:absolute;inset:0;pointer-events:none;
  background:radial-gradient(ellipse 80% 60% at 70% 50%,rgba(201,168,76,0.07) 0%,transparent 70%),
              radial-gradient(ellipse 40% 40% at 20% 80%,rgba(201,168,76,0.03) 0%,transparent 60%);
}
.hero-content{max-width:1100px;margin:0 auto;width:100%;position:relative;z-index:1}
.hero-eyebrow{
  font-family:'JetBrains Mono',monospace;font-size:0.65rem;
  letter-spacing:0.3em;text-transform:uppercase;color:var(--gold);
  margin-bottom:24px;display:flex;align-items:center;gap:12px;
}
.hero-eyebrow::before{content:'';width:32px;height:1px;background:var(--gold)}
.hero h1{color:var(--cream);margin-bottom:32px}
.hero h1 em{font-style:italic;color:var(--gold)}
.hero-sub{
  font-size:1rem;color:var(--silver);max-width:48ch;
  line-height:1.8;margin-bottom:48px;
}
.hero-actions{display:flex;gap:24px;align-items:center;flex-wrap:wrap}
.btn-primary{
  font-family:'JetBrains Mono',monospace;font-size:0.75rem;
  letter-spacing:0.15em;text-transform:uppercase;
  background:var(--gold);color:var(--black);padding:14px 32px;
  border:none;cursor:pointer;display:inline-block;transition:all 0.25s;
}
.btn-primary:hover{background:var(--gold-pale);color:var(--black);transform:translateY(-1px)}
.btn-ghost{
  font-family:'JetBrains Mono',monospace;font-size:0.75rem;
  letter-spacing:0.15em;text-transform:uppercase;
  color:var(--silver);border:1px solid var(--graphite);
  padding:14px 32px;display:inline-block;transition:all 0.25s;
}
.btn-ghost:hover{border-color:var(--gold);color:var(--gold)}
.hero-scroll{
  position:absolute;bottom:40px;right:40px;
  font-size:0.65rem;letter-spacing:0.2em;text-transform:uppercase;
  color:var(--ash);writing-mode:vertical-rl;
}

/* Stats */
.stats-bar{border-top:1px solid var(--graphite);border-bottom:1px solid var(--graphite);padding:40px 0;background:var(--ink)}
.stats-grid{max-width:1100px;margin:0 auto;padding:0 40px;display:grid;grid-template-columns:repeat(4,1fr)}
.stat-item{padding:0 40px 0 0;border-right:1px solid var(--graphite)}
.stat-item:last-child{border-right:none}
.stat-number{font-family:'Cormorant Garamond',serif;font-size:3rem;font-weight:300;color:var(--gold);line-height:1;display:block}
.stat-label{font-size:0.65rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--ash);margin-top:8px}

/* Sections */
.section{padding:120px 0;border-top:1px solid var(--graphite)}
.section-header{margin-bottom:64px}
.section-header .label{margin-bottom:16px;display:block}
.section-header p{color:var(--ash);font-size:0.9rem;margin-top:12px}

/* Demo Grid */
.demos-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--graphite);border:1px solid var(--graphite)}
.demo-card{background:var(--ink);padding:40px 36px;transition:background 0.25s;display:block}
.demo-card:hover{background:var(--coal)}
.demo-card:hover .demo-arrow{color:var(--gold);transform:translateX(4px)}
.demo-num{font-family:'JetBrains Mono',monospace;font-size:0.65rem;color:var(--ash);letter-spacing:0.15em;margin-bottom:20px;display:block}
.demo-title{font-family:'Cormorant Garamond',serif;font-size:1.5rem;font-weight:500;color:var(--cream);margin-bottom:12px}
.demo-desc{color:var(--ash);font-size:0.8rem;line-height:1.7;margin-bottom:24px}
.demo-link{font-family:'JetBrains Mono',monospace;font-size:0.65rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--silver);display:flex;align-items:center;gap:8px}
.demo-arrow{transition:all 0.2s;color:var(--ash);font-size:0.8rem}

/* Agent Grid */
.agents-section{background:var(--ink);padding:120px 0;border-top:1px solid var(--graphite)}
.agents-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1px;background:var(--graphite);border:1px solid var(--graphite);margin-top:64px}
.agent-item{background:var(--ink);padding:32px 36px;display:flex;gap:24px;align-items:flex-start;transition:background 0.2s}
.agent-item:hover{background:var(--coal)}
.agent-meta{flex:1}
.agent-name{font-family:'Cormorant Garamond',serif;font-size:1.3rem;color:var(--cream);margin-bottom:4px}
.agent-role{font-family:'JetBrains Mono',monospace;font-size:0.65rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--gold);margin-bottom:12px}
.agent-desc{color:var(--ash);font-size:0.8rem;line-height:1.6}
.agent-id{font-family:'JetBrains Mono',monospace;font-size:1.5rem;color:var(--graphite);font-weight:700;line-height:1;transition:color 0.2s}
.agent-item:hover .agent-id{color:var(--gold-dim)}

/* VM */
.vm-section{padding:80px 0;border-top:1px solid var(--graphite)}
.vm-inner{display:flex;align-items:center;gap:16px;flex-wrap:wrap;margin-top:32px}
.vm-pill{font-family:'JetBrains Mono',monospace;font-size:0.7rem;letter-spacing:0.1em;color:var(--silver);border:1px solid var(--graphite);padding:8px 20px;transition:all 0.2s}
.vm-pill:hover{border-color:var(--gold);color:var(--gold)}
.vm-status{font-size:0.65rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--ash);margin-left:auto}
.vm-dot{display:inline-block;width:6px;height:6px;border-radius:50%;background:#4ADE80;margin-right:6px;box-shadow:0 0 8px rgba(74,222,128,0.5);animation:pulse 2s infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}

/* Pricing */
.pricing-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--graphite);border:1px solid var(--graphite);margin-top:64px}
.price-card{background:var(--ink);padding:48px 36px;transition:background 0.25s}
.price-card:hover{background:var(--coal)}
.price-card.featured{background:var(--coal);border-left:2px solid var(--gold);border-right:2px solid var(--gold)}
.price-tier{font-family:'JetBrains Mono',monospace;font-size:0.65rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--ash);margin-bottom:16px}
.price-amount{font-family:'Cormorant Garamond',serif;font-size:3.5rem;font-weight:300;color:var(--gold);line-height:1;margin-bottom:8px}
.price-amount span{font-size:1rem;color:var(--ash);font-family:'JetBrains Mono',monospace}
.price-per{font-size:0.75rem;color:var(--ash);margin-bottom:32px}
.price-features{list-style:none;margin-bottom:32px}
.price-features li{font-size:0.8rem;color:var(--silver);padding:8px 0;border-bottom:1px solid var(--graphite);display:flex;align-items:center;gap:10px}
.price-features li::before{content:'';width:16px;height:1px;background:var(--gold);flex-shrink:0}
.price-btn{display:block;text-align:center;font-family:'JetBrains Mono',monospace;font-size:0.7rem;letter-spacing:0.2em;text-transform:uppercase;padding:14px;border:1px solid var(--graphite);color:var(--silver);transition:all 0.25s}
.price-btn:hover{border-color:var(--gold);color:var(--gold)}
.price-card.featured .price-btn{background:var(--gold);color:var(--black);border-color:var(--gold)}
.price-card.featured .price-btn:hover{background:var(--gold-pale);color:var(--black)}

/* ROI */
.roi-banner{background:var(--coal);border:1px solid var(--graphite);padding:32px 40px;margin-top:80px;display:flex;align-items:center;gap:40px;flex-wrap:wrap}
.roi-stat{flex:1;min-width:200px}
.roi-stat strong{color:var(--gold);font-family:'Cormorant Garamond',serif;font-size:1.5rem}
.roi-stat span{color:var(--ash);font-size:0.8rem;display:block}
.roi-note{font-size:0.8rem;color:var(--ash);max-width:500px;border-left:1px solid var(--graphite);padding-left:40px}

/* CTA */
.cta-section{padding:160px 0;text-align:center;background:var(--black);position:relative;overflow:hidden}
.cta-section::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 60% 60% at 50% 50%,rgba(201,168,76,0.07) 0%,transparent 70%);pointer-events:none}
.cta-section h2{margin-bottom:20px;position:relative}
.cta-section p{color:var(--ash);margin:0 auto 48px;position:relative}
.cta-email{font-family:'Cormorant Garamond',serif;font-size:1.5rem;font-style:italic;color:var(--gold);border-bottom:1px solid var(--gold-dim);padding-bottom:4px}

/* Footer */
footer{border-top:1px solid var(--graphite);padding:40px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px}
footer p{font-size:0.75rem;color:var(--ash);max-width:none}
.footer-brand{color:var(--gold)}

/* Responsive */
@media(max-width:768px){
  .container,.hero,.stats-grid,.vm-inner{padding-left:24px;padding-right:24px}
  nav{padding:0 24px}.nav-links{display:none}
  h1{font-size:2.8rem}
  .demos-grid,.agents-grid,.pricing-grid{grid-template-columns:1fr}
  .stats-grid{grid-template-columns:repeat(2,1fr);gap:24px}
  .stat-item{border-right:none;padding:0}
  .roi-banner{flex-direction:column}
  .roi-note{border-left:none;padding-left:0;border-top:1px solid var(--graphite);padding-top:24px;width:100%}
}
`;

// ── HTML ─────────────────────────────────────────────────────────────────────
const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>LAISA Agent OS — SafeSight Aesthetic Clinic</title>
<meta name="description" content="6 AI agents, real-time WhatsApp booking, patient CRM, voice notes, and social media automation — all on your private VM.">
<style>${css}</style>
</head>
<body>

<nav>
  <div class="nav-inner">
    <span class="nav-brand">◈ LAISA Agent OS</span>
    <div class="nav-links">
      <a href="#demos">Demos</a>
      <a href="#agents">Agents</a>
      <a href="#vm">VM Stack</a>
      <a href="#pricing">Pricing</a>
    </div>
  </div>
</nav>

<section class="hero">
  <div class="hero-content">
    <span class="hero-eyebrow">SafeSight Aesthetic Clinic — Live Demo</span>
    <h1>The AI-Powered<br><em>Clinic OS</em></h1>
    <p class="hero-sub">
      Six specialist AI agents, real-time WhatsApp booking, patient CRM, 
      voice notes, and social media automation — all running on your private VM.
    </p>
    <div class="hero-actions">
      <a href="#demos" class="btn-primary">Explore Live Demos</a>
      <a href="mailto:t.ramaphosa@stud.exchange" class="btn-ghost">Request Full Demo</a>
    </div>
  </div>
  <span class="hero-scroll">Scroll</span>
</section>

<div class="stats-bar">
  <div class="stats-grid">
    <div class="stat-item"><span class="stat-number">6</span><span class="stat-label">AI Agents</span></div>
    <div class="stat-item"><span class="stat-number">24/7</span><span class="stat-label">Uptime</span></div>
    <div class="stat-item"><span class="stat-number">R599</span><span class="stat-label">Per Month</span></div>
    <div class="stat-item"><span class="stat-number">100%</span><span class="stat-label">POPIA Ready</span></div>
  </div>
</div>

<section id="demos" class="section">
  <div class="container">
    <div class="section-header">
      <span class="label">Live Demos</span>
      <h2>Click any feature<br>to explore</h2>
      <p>Real AI agents running on the SafeSight VM — not screenshots.</p>
    </div>
    <div class="demos-grid">
      <a href="dashboard-demo.html" class="demo-card">
        <span class="demo-num">01</span>
        <div class="demo-title">Unified Dashboard</div>
        <p class="demo-desc">Real-time clinic overview — patients, revenue, agents, and tasks. Live POPIA audit trail.</p>
        <span class="demo-link">View Live <span class="demo-arrow">&#8594;</span></span>
      </a>
      <a href="charlie.html" class="demo-card">
        <span class="demo-num">02</span>
        <div class="demo-title">Charlie — Voice Agent</div>
        <p class="demo-desc">Transcribes voice notes, creates patient records, books appointments automatically.</p>
        <span class="demo-link">Try It <span class="demo-arrow">&#8594;</span></span>
      </a>
      <a href="whatsapp-bot-demo.html" class="demo-card">
        <span class="demo-num">03</span>
        <div class="demo-title">WhatsApp Booking Bot</div>
        <p class="demo-desc">AI receptionist handles bookings, reminders, and FAQs 24/7 in SA languages.</p>
        <span class="demo-link">Chat Now <span class="demo-arrow">&#8594;</span></span>
      </a>
      <a href="laisa-crm.html" class="demo-card">
        <span class="demo-num">04</span>
        <div class="demo-title">Patient CRM</div>
        <p class="demo-desc">Lead scoring, pipeline tracking, automated follow-ups, and treatment history.</p>
        <span class="demo-link">Explore <span class="demo-arrow">&#8594;</span></span>
      </a>
      <a href="email-triage-demo.html" class="demo-card">
        <span class="demo-num">05</span>
        <div class="demo-title">AI Email Triage</div>
        <p class="demo-desc">Auto-categorises patient emails: urgent to doctor, billing to admin, spam to archive.</p>
        <span class="demo-link">See It Work <span class="demo-arrow">&#8594;</span></span>
      </a>
      <a href="social-sdk.html" class="demo-card">
        <span class="demo-num">06</span>
        <div class="demo-title">Social Media SDK</div>
        <p class="demo-desc">AI-generated captions, hashtag strategy, engagement analytics — composio-powered.</p>
        <span class="demo-link">Preview <span class="demo-arrow">&#8594;</span></span>
      </a>
    </div>
    <div style="margin-top:40px;">
      <a href="CTO-STUDY-PATH.html" class="btn-ghost">CTO Study Path — Free for SA Clinic Staff</a>
    </div>
  </div>
</section>

<section id="agents" class="agents-section">
  <div class="container">
    <div class="section-header">
      <span class="label">The Agent Fleet</span>
      <h2>Six agents.<br>One mission.</h2>
      <p>Each agent runs autonomously on the SafeSight VM. No humans needed for routine tasks.</p>
    </div>
    <div class="agents-grid">
      <div class="agent-item"><div class="agent-meta"><div class="agent-name">DenchClaw</div><div class="agent-role">AI Doctor</div><p class="agent-desc">Reads intake forms, flags contra-indications, suggests treatment protocols.</p></div><span class="agent-id">A1</span></div>
      <div class="agent-item"><div class="agent-meta"><div class="agent-name">CashClaw</div><div class="agent-role">Billing Agent</div><p class="agent-desc">Invoices, payment reminders, medical aid claims, receipting, debt collection.</p></div><span class="agent-id">A2</span></div>
      <div class="agent-item"><div class="agent-meta"><div class="agent-name">Charlie</div><div class="agent-role">Voice Agent</div><p class="agent-desc">Transcribes voice notes, updates CRM, books appointments, sends WhatsApp updates.</p></div><span class="agent-id">A3</span></div>
      <div class="agent-item"><div class="agent-meta"><div class="agent-name">ChatterClaw</div><div class="agent-role">Social Media</div><p class="agent-desc">Generates captions, schedules posts, replies to DMs, tracks engagement analytics.</p></div><span class="agent-id">A4</span></div>
      <div class="agent-item"><div class="agent-meta"><div class="agent-name">InboxClaw</div><div class="agent-role">Email Manager</div><p class="agent-desc">Triages patient emails, drafts replies, escalates urgent cases to doctor immediately.</p></div><span class="agent-id">A5</span></div>
      <div class="agent-item"><div class="agent-meta"><div class="agent-name">AuditClaw</div><div class="agent-role">Compliance</div><p class="agent-desc">POPIA audit trail, data retention policies, consent management, breach alerts.</p></div><span class="agent-id">A6</span></div>
    </div>
  </div>
</section>

<section id="vm" class="vm-section">
  <div class="container">
    <span class="label">Infrastructure</span>
    <h2 style="margin-top:16px;margin-bottom:0;">Running on Ogre VM</h2>
    <p style="margin-top:12px;">The SafeSight VM — managed by Studex / Ogre Computer. You see the dashboard. We manage the machine.</p>
    <div class="vm-inner">
      <span class="vm-pill">gstack</span>
      <span class="vm-pill">headroom</span>
      <span class="vm-pill">last30days</span>
      <span class="vm-pill">spec-kit</span>
      <span class="vm-pill">skill-creator</span>
      <span class="vm-pill">obsidian-skills</span>
      <span class="vm-status"><span class="vm-dot"></span>All running</span>
    </div>
  </div>
</section>

<section id="pricing" class="section">
  <div class="container">
    <div class="section-header">
      <span class="label">Pricing</span>
      <h2>Simple. Transparent.<br>ROI-positive.</h2>
    </div>
    <div class="pricing-grid">
      <div class="price-card">
        <div class="price-tier">Essential</div>
        <div class="price-amount">R599<span>/mo</span></div>
        <p class="price-per">per clinic, no setup fee</p>
        <ul class="price-features">
          <li>1 VM (3 agents)</li><li>Patient CRM</li><li>AI Email triage</li>
          <li>WhatsApp Lite</li><li>POPIA compliance</li>
        </ul>
        <a href="mailto:t.ramaphosa@stud.exchange" class="price-btn">Get Started</a>
      </div>
      <div class="price-card featured">
        <div class="price-tier" style="color:var(--gold)">Intelligence — Popular</div>
        <div class="price-amount">R1,499<span>/mo</span></div>
        <p class="price-per">per clinic, no setup fee</p>
        <ul class="price-features">
          <li>1 VM (all 6 agents)</li><li>Full WhatsApp Bot</li>
          <li>Voice notes (Charlie)</li><li>Social media AI</li>
          <li>API access</li><li>Priority support</li>
        </ul>
        <a href="mailto:t.ramaphosa@stud.exchange" class="price-btn">Get Started</a>
      </div>
      <div class="price-card">
        <div class="price-tier">Enterprise</div>
        <div class="price-amount">R3,499<span>/mo</span></div>
        <p class="price-per">3 VMs, white-label, multi-clinic</p>
        <ul class="price-features">
          <li>3 VMs (all agents)</li><li>White-label option</li>
          <li>Multi-clinic dashboard</li><li>Custom integrations</li>
          <li>Dedicated account manager</li>
        </ul>
        <a href="mailto:t.ramaphosa@stud.exchange" class="price-btn">Contact Us</a>
      </div>
    </div>
    <div class="roi-banner">
      <div class="roi-stat"><strong>R4,000+</strong><span>saved monthly at R200/hr</span></div>
      <div class="roi-stat"><strong>R1,499</strong><span>LAISA Intelligence per month</span></div>
      <div class="roi-note">ROI-positive from day one. SafeSight saves 20+ admin hours/month with 6 AI agents handling bookings, billing, emails, and social media automatically.</div>
    </div>
  </div>
</section>

<section class="cta-section">
  <div class="container">
    <span class="label" style="display:block;margin-bottom:24px;">Get Started</span>
    <h2>Ready to power your<br>clinic with AI?</h2>
    <p>Book a live demo. See the agents work in real-time.</p>
    <a href="mailto:t.ramaphosa@stud.exchange" class="cta-email">t.ramaphosa@stud.exchange</a>
  </div>
</section>

<footer>
  <p><span class="footer-brand">&#9670; LAISA Agent OS</span> &mdash; Built on Ogre VM &middot; Studex Group &copy; 2026</p>
  <p>6 Agents &nbsp;&middot;&nbsp; Real-time &nbsp;&middot;&nbsp; POPIA Compliant &nbsp;&middot;&nbsp; South Africa</p>
</footer>

</body>
</html>`;

// Write enhanced index
fs.writeFileSync(path.join(OUT, 'index.html'), html);
console.log('\n✅ index.html rebuilt with editorial design');
console.log('✅ No emojis — clean typographic design');
console.log('✅ Cormorant Garamond + JetBrains Mono');
console.log('✅ Dark obsidian + gold palette');
console.log('\n📦 Ready to deploy!');
