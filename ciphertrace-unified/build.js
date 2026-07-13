// builder.js — generates the full CipherTrace site
const fs = require('fs');

const CLIENTS = [
  { id:'laisa', name:'LAISA Aesthetic Clinic', vmName:'LAISA-VM-01', live:true, agents:6, uptime:'99.7%', since:'June 2026', tagline:'Phase A — Agent OS + WhatsApp CRM + Booking', metrics:'R350K build + R55K/month · 247 beds', color:'#22c55e', bg:'#f0fdf4', border:'#bbf7d0', icon:'🏥', agent:'Dr. Musa + 6 AI Agents' },
  { id:'safesight', name:'SafeSight Aesthetic Clinic', vmName:'SAFE-VM-01', live:false, agents:3, uptime:'Demo', since:'June 2026', tagline:'Primary demo client — Agent OS showcase', metrics:'R1,499/month · Proposal pending', color:'#ec4899', bg:'#fdf2f8', border:'#fce7f3', icon:'🛡️', agent:'Demo Agent OS' },
  { id:'pharma', name:'Pharmasyntez Russia', vmName:'PHARMA-VM-GLOBAL', live:true, agents:4, uptime:'98.2%', since:'Jan 2026', tagline:'Anti-TB, HIV, oncology distribution across Africa', metrics:'R2.99M Y1 pipeline · SAHPRA licensed', color:'#8b5cf6', bg:'#f5f3ff', border:'#ddd6fe', icon:'💊', agent:'Studex Global Markets Agent' },
  { id:'redteam', name:'Red Team Agent', vmName:'RT-VM-SENTINEL', live:true, agents:16, uptime:'24/7', since:'July 2026', tagline:'Autonomous pen testing + AI Trust Monitor', metrics:'R45K/month · 16 specialist agents', color:'#ef4444', bg:'#fef2f2', border:'#fecaca', icon:'🔴', agent:'16 Cybersecurity AI Agents' },
];

const PRODUCTS = [
  { id:'laisa', name:'LAISA Agent OS', tagline:'AI Agent OS for Aesthetic Clinics', price:'R350K + R55K/mo', color:'#22c55e', bg:'#f0fdf4', border:'#bbf7d0', icon:'🏥',
    features:['WhatsApp CRM + Booking','6 specialist AI agents','Dashboard + reporting','Email + social automation','Notion CRM integration','VoiceBox AI'] },
  { id:'df', name:'Dark Factory', tagline:'Build Me A Dashboard — R29/product', price:'R29 per product', color:'#22c55e', bg:'#f0fdf4', border:'#bbf7d0', icon:'🏭',
    features:['Voice note to PRD pipeline','CodeRabbit review on every PR','Auto-deploy to Vercel','Multi-agent build team','48hr delivery SLA','Dark Factory VM included'] },
  { id:'rt', name:'Red Team Agent', tagline:'Cybersecurity AI VM', price:'From R25K/month', color:'#ec4899', bg:'#fdf2f8', border:'#fce7f3', icon:'🛡️',
    features:['16 specialist AI agents','Autonomous pen testing','AI Trust Monitor','Purple Team loop','POPIA compliance','MITRE ATT\u0026CK mapped'] },
];

const METRICS = [
  { v:'8', l:'VMs Active', s:'OGRE GPU cluster, 24/7' },
  { v:'60+', l:'AI Agents', s:'Research, build, comms, security' },
  { v:'9', l:'Countries', s:'SA, Nigeria, Kenya, Ghana, Russia, Egypt' },
  { v:'R4.2M', l:'Pipeline', s:'Active proposals + contracts' },
];

const TIMELINE = [
  { y:'2009', e:"Started at McDonald's SA — batch cooker at age 18" },
  { y:'2011', e:'Founded Studex Meat at age 20' },
  { y:'2017', e:'Founded StudEx Enterprise + StudEx Wild Life' },
  { y:'2018', e:'ICO vs VC panel, Sheppard Mullin, Palo Alto' },
  { y:'2019', e:'AWS + Google Cloud partnerships signed' },
  { y:'2019', e:'IBM + Cardano wildlife blockchain confirmed' },
  { y:'2020', e:'ITWeb: "SA\'s First Son looks to cut cloud costs"' },
  { y:'2026', e:'Dark Factory + CipherTrace CEO fully operational' },
];

function clientsHTML() {
  return CLIENTS.map(c => `
    <div class="vm-card" style="border-color:${c.border}">
      <div class="vm-top" style="height:4px;background:${c.color}"></div>
      <div class="vm-body">
        <div class="vm-header">
          <div class="vm-info">
            <div class="vm-icon" style="background:${c.bg}">${c.icon}</div>
            <div>
              <div class="vm-name">${c.name}</div>
              <div class="vm-vm" style="color:${c.color}">${c.vmName}</div>
            </div>
          </div>
          <div class="vm-status ${c.live ? 'live' : 'demo'}">${c.live ? 'LIVE' : 'DEMO'}</div>
        </div>
        <p class="vm-tagline">${c.tagline}</p>
        <div class="vm-stats" style="background:${c.bg}">
          <div class="vm-stats-grid">
            <div><div class="vm-stat-num" style="color:${c.color}">${c.agents}</div><div class="vm-stat-lbl">Agents</div></div>
            <div><div class="vm-stat-num" style="color:${c.color}">${c.uptime}</div><div class="vm-stat-lbl">Uptime</div></div>
            <div><div class="vm-stat-num" style="color:${c.color}">${c.since}</div><div class="vm-stat-lbl">Since</div></div>
          </div>
        </div>
        <div class="vm-agent">${c.agent}</div>
      </div>
      <div class="vm-footer" style="border-color:${c.border};background:${c.bg}">${c.metrics}</div>
    </div>
  `).join('');
}

function productsHTML() {
  return PRODUCTS.map(p => `
    <div class="prod-card" style="border-color:${p.border}">
      <div class="prod-top" style="height:4px;background:${p.color}"></div>
      <div class="prod-body">
        <div class="prod-header">
          <div class="prod-icon" style="background:${p.bg}">${p.icon}</div>
          <div class="prod-live" style="background:${p.bg};border:1px solid ${p.border};color:${p.color}">LIVE</div>
        </div>
        <div class="prod-name">${p.name}</div>
        <div class="prod-tagline">${p.tagline}</div>
        <div class="prod-price" style="color:${p.color}">${p.price}</div>
        <ul class="prod-features">
          ${p.features.map(f => `<li><span class="prod-check">✓</span> ${f}</li>`).join('')}
        </ul>
        <button class="prod-btn" onclick="openPRD()" style="background:${p.color}">Get Started →</button>
      </div>
    </div>
  `).join('');
}

function metricsHTML() {
  return METRICS.map(m => `
    <div class="metric-card">
      <div class="metric-num">${m.v}</div>
      <div class="metric-lbl">${m.l}</div>
      <div class="metric-sub">${m.s}</div>
    </div>
  `).join('');
}

function timelineHTML() {
  return TIMELINE.map(t => `
    <div class="tl-item">
      <div class="tl-dot"></div>
      <div class="tl-year">${t.y}</div>
      <div class="tl-text">${t.e}</div>
    </div>
  `).join('');
}

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>CipherTrace — Dark Factory | Automated Software Environment</title>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet"/>
<style>
:root{--a:#22c55e;--a2:#16a34a;--p:#ec4899;--bg:#f8fafc;--w:#fff;--t:#0f172a;--t2:#475569;--t3:#94a3b8;--b:#e2e8f0}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'Plus Jakarta Sans',sans-serif;background:var(--bg);color:var(--t);line-height:1.6;-webkit-font-smoothing:antialiased}
::-webkit-scrollbar{width:5px}
::-webkit-scrollbar-thumb{background:var(--a);border-radius:3px}
/* NAV */
.hdr{position:sticky;top:0;z-index:100;background:rgba(255,255,255,.95);backdrop-filter:blur(20px);border-bottom:1px solid var(--b);height:68px;display:flex;align-items:center;justify-content:space-between;padding:0 2rem;max-width:1200px;margin:0 auto}
.brand{display:flex;align-items:center;gap:12px;cursor:pointer}
.brand-logo{width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,var(--a),var(--a2));display:flex;align-items:center;justify-content:center;box-shadow:0 4px 16px rgba(34,197,94,.3);font-size:1rem}
.brand-name{font-weight:800;font-size:.9rem;color:var(--t)}
.brand-sub{font-size:.6rem;color:var(--t3);font-family:monospace;margin-top:-2px}
.nav{display:flex;gap:4px}
.nav button{padding:.5rem .875rem;border-radius:10px;font-size:.825rem;font-weight:600;border:none;cursor:pointer;background:transparent;color:var(--t2);font-family:inherit;transition:all .15s}
.nav button:hover{color:var(--t);background:rgba(0,0,0,.04)}
.cta-btn{padding:.6rem 1.25rem;border-radius:12px;background:var(--a);color:#fff;border:none;font-weight:700;font-size:.825rem;cursor:pointer;display:flex;align-items:center;gap:6px;box-shadow:0 4px 16px rgba(34,197,94,.3);font-family:inherit;transition:all .2s}
.cta-btn:hover{box-shadow:0 6px 24px rgba(34,197,94,.5);transform:translateY(-1px)}
/* HERO */
#hero{padding:5rem 2rem;max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center}
.hero-badge{display:inline-flex;align-items:center;gap:8px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:100px;padding:.35rem 1rem;margin-bottom:1.5rem}
.hero-badge-dot{width:6px;height:6px;border-radius:50%;background:var(--a);animation:pulse 2s infinite}
.hero-badge-text{font-size:.7rem;font-weight:700;color:var(--a);letter-spacing:.08em;font-family:monospace}
.hero-h1{font-size:clamp(2.2rem,5vw,3.5rem);font-weight:900;line-height:1.05;letter-spacing:-.03em;color:var(--t);margin-bottom:1rem}
.hero-h1 .a{color:var(--a)}
.hero-h1 .p{color:var(--p)}
.hero-p{font-size:1.05rem;color:var(--t2);line-height:1.75;margin-bottom:2rem;max-width:460px}
.hero-actions{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:2.5rem}
.btn-a{padding:.8rem 1.75rem;border-radius:14px;background:var(--a);color:#fff;border:none;font-weight:700;font-size:.9rem;cursor:pointer;display:inline-flex;align-items:center;gap:8px;box-shadow:0 6px 24px rgba(34,197,94,.21);font-family:inherit;transition:all .2s}
.btn-a:hover{box-shadow:0 8px 32px rgba(34,197,94,.4);transform:translateY(-2px)}
.btn-b{padding:.8rem 1.75rem;border-radius:14px;background:#fff;color:var(--t);border:1.5px solid var(--b);font-weight:600;font-size:.9rem;cursor:pointer;display:inline-flex;align-items:center;gap:8px;font-family:inherit;transition:all .15s}
.btn-b:hover{border-color:var(--a);color:var(--a)}
.hero-stats{display:flex;gap:2.5rem;flex-wrap:wrap}
.hero-stat-num{font-size:2rem;font-weight:900;letter-spacing:-.03em;color:var(--a)}
.hero-stat-lbl{font-size:.7rem;color:var(--t3);text-transform:uppercase;letter-spacing:.1em;font-weight:600;font-family:monospace;margin-top:4px}
.canvas-wrap{display:flex;align-items:center;justify-content:center}
canvas{border-radius:24px;max-width:100%;opacity:.85}
/* SECTIONS */
.section{padding:5rem 2rem;max-width:1200px;margin:0 auto}
.section-label{font-size:.7rem;font-weight:700;color:var(--p);letter-spacing:.18em;text-transform:uppercase;margin-bottom:8px;font-family:monospace}
.section-title{font-size:clamp(1.75rem,3.5vw,2.5rem);font-weight:900;letter-spacing:-.025em;color:var(--t);line-height:1.1}
.section-title .a{color:var(--a)}
.section-title .p{color:var(--p)}
.section-header{text-align:center;margin-bottom:3rem}
.section-desc{color:var(--t2);margin-top:12px;line-height:1.7;max-width:520px}
.section-header .section-desc{margin:.75rem auto 0}
/* CLIENTS */
#clients{background:var(--bg);padding:5rem 2rem}
.clients-inner{max-width:1200px;margin:0 auto}
.clients-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1.25rem}
.vm-card{background:#fff;border:1px solid;border-radius:20px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,.06);transition:all .25s;cursor:pointer}
.vm-card:hover{transform:translateY(-4px);box-shadow:0 12px 40px rgba(0,0,0,.12)}
.vm-top{height:4px}
.vm-body{padding:1.25rem}
.vm-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px}
.vm-info{display:flex;align-items:center;gap:10px}
.vm-icon{width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:1.25rem}
.vm-name{font-weight:700;font-size:.875rem;color:var(--t)}
.vm-vm{font-family:monospace;font-size:.65rem;font-weight:600;margin-top:2px}
.vm-status{border-radius:100px;padding:.25rem .625rem;font-size:.6rem;font-weight:700;letter-spacing:.05em;font-family:monospace}
.vm-status.live{background:#f0fdf4;color:var(--a);border:1px solid #bbf7d0}
.vm-status.demo{background:#fff7ed;color:#f97316;border:1px solid #fed7aa}
.vm-tagline{font-size:.825rem;color:var(--t2);line-height:1.6;margin-bottom:12px}
.vm-stats{background:var(--bg);border-radius:10px;padding:.75rem;margin-bottom:12px}
.vm-stats-grid{display:grid;grid-template-columns:1fr 1fr 1fr;text-align:center;gap:8px}
.vm-stat-num{font-weight:800;font-size:1rem}
.vm-stat-lbl{font-size:.6rem;color:var(--t3);text-transform:uppercase;letter-spacing:.05em;font-family:monospace;margin-top:2px}
.vm-agent{font-size:.75rem;color:var(--t3);font-family:monospace}
.vm-footer{padding:.75rem 1.25rem;border-top:1px solid;border-color:inherit;background:var(--bg);font-size:.75rem;font-weight:600;color:var(--t2)}
/* PRODUCTS */
#products{background:#fff;padding:5rem 2rem}
.products-inner{max-width:1200px;margin:0 auto}
.products-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:1.5rem}
.prod-card{background:#fff;border:1px solid;border-radius:24px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.06)}
.prod-top{height:4px}
.prod-body{padding:1.5rem}
.prod-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px}
.prod-icon{width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:1.25rem}
.prod-live{border-radius:100px;padding:.25rem .75rem;font-size:.65rem;font-weight:700;color:var(--a);font-family:monospace}
.prod-name{font-weight:800;font-size:1.05rem;color:var(--t);margin-bottom:4px}
.prod-tagline{font-size:.8rem;color:var(--t3);margin-bottom:12px}
.prod-price{font-weight:900;font-size:1.5rem;color:var(--a);margin-bottom:12px}
.prod-features{list-style:none;margin:0 0 1rem;display:flex;flex-direction:column;gap:6px}
.prod-features li{display:flex;align-items:flex-start;gap:8px;font-size:.825rem;color:var(--t2)}
.prod-check{color:var(--a);flex-shrink:0;font-weight:700}
.prod-btn{width:100%;padding:.7rem;border-radius:12px;color:#fff;border:none;font-weight:700;font-size:.825rem;cursor:pointer;font-family:inherit;display:flex;align-items:center;justify-content:center;gap:8px;transition:all .2s}
.prod-btn:hover{box-shadow:0 6px 24px rgba(0,0,0,.2);transform:translateY(-1px)}
/* SUCCESS */
#success{background:#f0fdf4;padding:5rem 2rem}
.success-inner{max-width:1200px;margin:0 auto}
.metrics-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1.5rem;margin-bottom:3rem}
.metric-card{background:#fff;border-radius:20px;padding:1.75rem;text-align:center;box-shadow:0 4px 16px rgba(34,197,94,.08);border:1px solid #bbf7d0}
.metric-num{font-size:2.5rem;font-weight:900;letter-spacing:-.03em;color:var(--a)}
.metric-lbl{font-weight:700;font-size:.875rem;color:var(--t);margin-top:6px}
.metric-sub{font-size:.775rem;color:var(--t3);margin-top:4px}
.stories-grid{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem}
.story-card{background:#fff;border-radius:24px;padding:2rem;border:1px solid}
.story-card:first-child{border-color:#bbf7d0;box-shadow:0 4px 20px rgba(34,197,94,.08)}
.story-card:last-child{border-color:#ddd6fe;box-shadow:0 4px 20px rgba(139,92,246,.08)}
.story-header{display:flex;align-items:center;gap:12px;margin-bottom:1.25rem}
.story-icon{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:1.5rem}
.story-name{font-weight:800;font-size:1rem;color:var(--t)}
.story-sub{font-size:.775rem;font-weight:600;font-family:monospace}
.story-p{font-size:.9rem;color:var(--t2);line-height:1.8;margin-bottom:1.25rem}
.story-grid2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.story-stat{background:var(--bg);border-radius:10px;padding:.75rem}
.story-stat-k{font-size:.7rem;color:var(--t3);font-family:monospace;margin-bottom:4px}
.story-stat-v{font-weight:800;font-size:.9rem}
/* FOUNDER */
#founder{background:#fff;padding:5rem 2rem}
.founder-inner{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:start}
.ecosystem{background:var(--bg);border-radius:16px;padding:1.25rem;border:1px solid var(--b);margin-top:1.5rem}
.ecosystem-title{font-size:.7rem;font-weight:700;color:var(--t3);letter-spacing:.1em;text-transform:uppercase;margin-bottom:12px;font-family:monospace}
.eco-item{display:flex;align-items:center;gap:10px;padding:.6rem 0;border-bottom:1px solid var(--b)}
.eco-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}
.eco-name{font-weight:700;font-size:.85rem;color:var(--t)}
.eco-desc{font-size:.75rem;color:var(--t3)}
.eco-item:last-child{border-bottom:none}
.timeline{position:relative;padding-left:1.5rem;margin-top:2rem}
.timeline::before{content:'';position:absolute;left:0;top:0;bottom:0;width:1px;background:linear-gradient(to bottom,var(--a),transparent)}
.tl-item{position:relative;padding-bottom:1.25rem;padding-left:1.25rem}
.tl-dot{position:absolute;left:-1.5rem;top:6px;width:8px;height:8px;border-radius:50%;background:var(--a);border:2px solid #fff;box-shadow:0 0 8px rgba(34,197,94,.5)}
.tl-year{font-family:monospace;font-size:.7rem;font-weight:600;color:var(--a);margin-bottom:2px}
.tl-text{font-size:.825rem;color:var(--t2);line-height:1.5}
/* FOOTER */
footer{border-top:1px solid var(--b);padding:2.5rem 2rem;background:#fff}
.footer-inner{max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem}
.footer-brand{display:flex;align-items:center;gap:12px}
.footer-logo{width:32px;height:32px;border-radius:8px;background:linear-gradient(135deg,var(--a),var(--a2);display:flex;align-items:center;justify-content:center}
.footer p{font-size:.825rem;color:var(--t3)}
.footer a{color:var(--a);text-decoration:none}
/* MODAL */
.modal-overlay{position:fixed;inset:0;z-index:999;background:rgba(15,23,42,.7);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:1rem}
.modal-box{background:#fff;border-radius:24px;width:100%;max-width:600px;max-height:90vh;overflow-y:auto;box-shadow:0 25px 80px rgba(0,0,0,.25)}
.modal-hdr{padding:1.5rem 2rem;border-bottom:1px solid var(--b);display:flex;align-items:center;justify-content:space-between}
.modal-hdr-left h2{font-size:1.1rem;font-weight:800;color:var(--t)}
.modal-hdr-left p{font-size:.8rem;color:var(--t3);margin-top:2px}
.modal-close{background:none;border:none;cursor:pointer;color:var(--t3);padding:8px;border-radius:8px;font-size:1rem}
.modal-stepper{padding:1.25rem 2rem;border-bottom:1px solid var(--b);display:flex;gap:4px;align-items:center;overflow-x:auto}
.step-item{display:flex;align-items:center;flex:0 0 auto}
.step-num{width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.7rem;font-weight:700;flex-shrink:0;border:2px solid var(--b);background:var(--bg);color:var(--t3);font-family:monospace;transition:all .2s}
.step-num.active{background:var(--a);border-color:var(--a);color:#fff;box-shadow:0 4px 12px rgba(34,197,94,.3)}
.step-num.done{background:var(--a);border-color:var(--a);color:#fff}
.step-label{font-size:.65rem;font-weight:600;margin-left:6px;color:var(--t3);white-space:nowrap}
.step-label.active{color:var(--a)}
.step-conn{flex:0 0 24px;height:2px;background:var(--b);margin:0 4px}
.step-conn.done{background:var(--a)}
.modal-body{padding:1.5rem 2rem}
.field{margin-bottom:1rem}
.field-label{display:block;font-size:.7rem;font-weight:700;color:var(--t2);text-transform:uppercase;letter-spacing:.08em;margin-bottom:6px;font-family:monospace}
.field-grid{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
.field-input,.field-select,.field-textarea{width:100%;padding:.625rem .875rem;border-radius:10px;border:1px solid var(--b);font-size:.875rem;font-family:inherit;background:#f8fafc;color:var(--t);outline:none;transition:border-color .15s}
.field-input:focus,.field-select:focus,.field-textarea:focus{border-color:var(--a);box-shadow:0 0 0 3px rgba(34,197,94,.1)}
.field-textarea{resize:vertical;line-height:1.6}
.field-pills{display:flex;flex-wrap:wrap;gap:8px;margin-top:8px}
.pill{padding:.4rem .875rem;border-radius:100px;font-size:.775rem;font-weight:600;border:1px solid var(--b);cursor:pointer;background:#fff;color:var(--t2);font-family:inherit;transition:all .15s}
.pill:hover{border-color:var(--a);color:var(--t}
.pill.selected{background:var(--a);border-color:var(--a);color:#fff}
.modal-actions{display:flex;gap:8px;margin-top:1.5rem}
.modal-next{flex:2;padding:.75rem;border-radius:12px;background:var(--a);color:#fff;border:none;font-weight:700;font-size:.875rem;cursor:pointer;font-family:inherit;display:flex;align-items:center;justify-content:center;gap:8px;transition:all .2s}
.modal-next:disabled{opacity:.4;cursor:not-allowed}
.modal-back{flex:1;padding:.75rem;border-radius:12px;background:#fff;border:1px solid var(--b);font-weight:600;font-size:.875rem;cursor:pointer;color:var(--t2);font-family:inherit}
.voice-rec{background:#f8fafc;border:2px dashed var(--b);border-radius:16px;padding:1.5rem;text-align:center;margin-bottom:1rem;cursor:pointer;transition:all .2s}
.voice-rec:hover{border-color:var(--a);background:rgba(34,197,94,.04)}
.voice-rec.recording{border-color:var(--p);background:rgba(236,72,153,.04)}
.voice-btn{width:52px;height:52px;border-radius:50%;background:var(--a);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;margin:0 auto .75rem;box-shadow:0 4px 16px rgba(34,197,94,.3);transition:all .2s}
.voice-btn:hover{box-shadow:0 6px 28px rgba(34,197,94,.5);transform:scale(1.05)}
.voice-btn.recording{background:var(--p);box-shadow:0 4px 16px rgba(236,72,153,.3);animation:vp 1s infinite}
@keyframes vp{0%,100%{box-shadow:0 0 0 0 rgba(236,72,153,.4)}50%{box-shadow:0 0 0 16px rgba(236,72,153,0)}}
.voice-label{font-weight:700;font-size:.875rem;color:var(--t)}
.voice-sub{font-size:.75rem;color:var(--t3);margin-top:4px}
.review-table{background:#f8fafc;border-radius:16px;padding:1rem;margin-bottom:1rem}
.review-row{display:flex;justify-content:space-between;padding:.5rem 0;border-bottom:1px solid var(--b);font-size:.825rem}
.review-row:last-child{border-bottom:none}
.review-key{font-size:.75rem;color:var(--t3);font-weight:600}
.review-val{font-weight:600;color:var(--t);text-align:right}
.success-box{text-align:center;padding:2rem 0}
.success-icon{font-size:4rem;margin-bottom:1.25rem}
.success-title{font-size:1.25rem;font-weight:800;color:var(--t);margin-bottom:8px}
.success-desc{font-size:.875rem;color:var(--t2);line-height:1.7;margin-bottom:1rem}
.success-ref{display:inline-block;background:#f0fdf4;border:1px solid rgba(34,197,94,.3);border-radius:8px;padding:.5rem 1.25rem;font-family:monospace;font-size:.825rem;color:var(--a);margin-bottom:1.5rem}
.success-close{padding:.75rem 2rem;border-radius:12px;background:var(--a);color:#fff;border:none;font-weight:700;font-size:.875rem;cursor:pointer;font-family:inherit}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
@keyframes spin{to{transform:rotate(360deg)}}
@media(max-width:1024px){#hero{grid-template-columns:1fr!important;gap:3rem}.metrics-grid{grid-template-columns:1fr 1fr!important}.stories-grid{grid-template-columns:1fr!important}.founder-inner{grid-template-columns:1fr!important}.products-grid{grid-template-columns:1fr 1fr!important}}
@media(max-width:640px){.nav{display:none}.hero-stats{gap:1.5rem}.clients-grid{grid-template-columns:1fr}.products-grid{grid-template-columns:1fr!important}.metrics-grid{grid-template-columns:1fr!important}.stories-grid{grid-template-columns:1fr!important}.founder-inner{grid-template-columns:1fr!important}.field-grid{grid-template-columns:1fr!important}}
</style>
</head>
<body>
<!-- MODAL -->
<div id="prd-modal" class="modal-overlay" style="display:none" onclick="if(event.target===this)closePRD()">
  <div class="modal-box" onclick="event.stopPropagation()">
    <div class="modal-hdr">
      <div class="modal-hdr-left">
        <h2>Drop a PRD</h2>
        <p>CipherTrace · Dark Factory</p>
      </div>
      <button class="modal-close" onclick="closePRD()">✕</button>
    </div>
    <div class="modal-stepper">
      <div class="step-item"><div class="step-num active" id="s1n">1</div><span class="step-label active" id="s1l">Contact</span></div>
      <div class="step-conn" id="c1"></div>
      <div class="step-item"><div class="step-num" id="s2n">2</div><span class="step-label" id="s2l">Project</span></div>
      <div class="step-conn" id="c2"></div>
      <div class="step-item"><div class="step-num" id="s3n">3</div><span class="step-label" id="s3l">Assets</span></div>
      <div class="step-conn" id="c3"></div>
      <div class="step-item"><div class="step-num" id="s4n">4</div><span class="step-label" id="s4l">Review</span></div>
    </div>
    <div class="modal-body">
      <!-- STEP 1 -->
      <div id="step-1">
        <h3 style="font-weight:800;margin-bottom:4px">Who are you?</h3>
        <p style="font-size:.875rem;color:var(--t2);margin-bottom:1.25rem">Tell us about yourself.</p>
        <div class="field-grid">
          <div class="field"><label class="field-label">Full Name *</label><input id="f-name" class="field-input" placeholder="Tumelo Ramaphosa"/></div>
          <div class="field"><label class="field-label">Company</label><input id="f-company" class="field-input" placeholder="Studex Group"/></div>
        </div>
        <div class="field"><label class="field-label">Email *</label><input id="f-email" type="email" class="field-input" placeholder="you@company.co.za"/></div>
        <div class="modal-actions">
          <button class="modal-next" onclick="goStep(2)" id="step1-next">Project Details →</button>
        </div>
      </div>
      <!-- STEP 2 -->
      <div id="step-2" style="display:none">
        <h3 style="font-weight:800;margin-bottom:4px">What are we building?</h3>
        <p style="font-size:.875rem;color:var(--t