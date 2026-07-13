/**
 * Command Centre v2 — huashu-design edition
 * Build script: node build.js
 */
const fs = require('fs');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>OGRE COMMAND — Mission Control</title>
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300..700;1,6..72,300..700&family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>
/* ── oklch Design Tokens (perceptually uniform — no magic hex) ── */
:root{
  --bg:      oklch(9% 0.015 255);
  --panel:   oklch(12% 0.015 255);
  --border:  oklch(20% 0.015 255);
  --gold:    oklch(72% 0.16 85);
  --gold-d:  oklch(55% 0.12 85);
  --green:   oklch(70% 0.18 145);
  --red:     oklch(65% 0.22 25);
  --cyan:    oklch(75% 0.14 200);
  --text:    oklch(90% 0.01 240);
  --muted:   oklch(55% 0.01 240);
  --fd:      'Newsreader', Georgia, serif;
  --fm:      'JetBrains Mono', monospace;
  --fb:      'Inter', system-ui, sans-serif;
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html,body{height:100%;overflow:hidden;background:var(--bg);color:var(--text);font-family:var(--fm);font-size:12px;line-height:1.6}
@keyframes sweep{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes pd{0%,100%{opacity:1;box-shadow:0 0 6px currentColor}50%{opacity:0.6}}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
@keyframes tick{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
@keyframes fa{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}
@keyframes glow{0%,100%{text-shadow:0 0 12px var(--gold)}50%{text-shadow:0 0 30px var(--gold),0 0 60px oklch(60% 0.14 85)}}
@keyframes scan{0%,100%{opacity:1}50%{opacity:0.65}}

/* ── Layout — grid-first, no gaps ── */
.mg{
  display:grid;
  grid-template-columns:232px 1fr 272px;
  grid-template-rows:58px 28px 1fr 1fr 152px;
  height:100vh;gap:0;
  background:var(--border);
}
.mg>*{background:var(--panel)}

/* Header */
.hdr{
  grid-column:1/-1;display:flex;align-items:center;gap:16px;
  padding:0 20px;border-bottom:1px solid var(--border);
  background:oklch(10% 0.015 255)!important;position:relative;z-index:10;
}
.hlogo{display:flex;align-items:center;gap:10px;flex-shrink:0}
.hlogo svg{width:28px;height:28px}
.hlogo-n{font-family:var(--fb);font-size:13px;font-weight:700;letter-spacing:.1em;color:var(--gold);text-transform:uppercase}
.hlogo-s{font-size:7px;color:var(--muted);letter-spacing:.2em;display:block;line-height:1.3}
.hdiv{width:1px;height:28px;background:var(--border);flex-shrink:0}
.htitle{font-size:8px;letter-spacing:.22em;text-transform:uppercase;color:var(--muted);flex:1;text-align:center}
.pills{display:flex;gap:8px}
.pill{font-size:8px;letter-spacing:.12em;text-transform:uppercase;padding:4px 10px;border:1px solid;border-radius:2px;display:flex;align-items:center;gap:5px}
.pill.on{border-color:oklch(65% 0.16 145/0.4);color:var(--green);background:oklch(65% 0.16 145/0.06)}
.pill.gd{border-color:oklch(72% 0.16 85/0.4);color:var(--gold);background:oklch(72% 0.16 85/0.06)}
.pill.bl{border-color:oklch(75% 0.14 200/0.35);color:var(--cyan);background:oklch(75% 0.14 200/0.05)}
.pdot{width:5px;height:5px;border-radius:50%;background:currentColor;animation:pd 2s infinite}
.hright{margin-left:auto;display:flex;align-items:center;gap:14px}
.hclk{font-size:15px;font-weight:700;letter-spacing:.08em;color:var(--gold);font-family:var(--fb)}
.hdate{font-size:7px;color:var(--muted);letter-spacing:.15em;text-transform:uppercase;text-align:right;line-height:1.4}

/* Ticker */
.tk{grid-column:1/-1;display:flex;align-items:center;border-bottom:1px solid var(--border);overflow:hidden;background:var(--panel)!important}
.tk-label{background:var(--gold);color:oklch(9% 0.015 255);font-size:7px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;padding:0 12px;height:100%;display:flex;align-items:center;flex-shrink:0}
.tk-track{display:flex;align-items:center;white-space:nowrap;animation:tick 80s linear infinite;padding-left:20px}
.tk-item{display:inline-flex;align-items:center;gap:8px;padding:0 24px 0 0;margin-right:24px;font-size:9px;letter-spacing:.06em;border-right:1px solid var(--border);height:28px}
.tk-sym{font-weight:700;color:var(--text)}
.tk-val{color:var(--green)}

/* Sidebar left */
.sbleft{display:flex;flex-direction:column}

/* Logo */
.lgblk{padding:20px 16px;border-bottom:1px solid var(--border);display:flex;flex-direction:column;align-items:center;gap:8px;text-align:center;background:oklch(11% 0.015 255)!important}
.lgmk{width:52px;height:52px;filter:drop-shadow(0 0 14px oklch(72% 0.16 85/0.25))}
.lgn{font-family:var(--fb);font-size:10px;font-weight:700;letter-spacing:.18em;color:var(--gold);text-transform:uppercase}
.lgs{font-size:7px;color:var(--muted);letter-spacing:.2em;text-transform:uppercase}
.lgt{font-size:7px;color:var(--gold-d)}

/* Nav */
.nav{flex:1;overflow-y:auto;border-bottom:1px solid var(--border)}
.nav::-webkit-scrollbar{width:2px}.nav::-webkit-scrollbar-thumb{background:var(--border)}
.nh{font-size:7px;letter-spacing:.25em;text-transform:uppercase;color:var(--gold);padding:6px 14px 4px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:6px}
.nh::before{content:'';width:4px;height:4px;border-radius:50%;background:var(--gold);box-shadow:0 0 5px var(--gold)}
.ni{display:flex;align-items:center;gap:8px;padding:7px 14px;border-bottom:1px solid oklch(100% 0 0/0.03);cursor:pointer;transition:background .12s}
.ni:hover,.ni.on{background:oklch(72% 0.16 85/0.05)}
.ni.on{border-left:2px solid var(--gold);padding-left:12px}
.nii{font-size:11px;width:18px;text-align:center;color:var(--muted)}
.nil{font-size:8px;letter-spacing:.1em;text-transform:uppercase;color:var(--text);flex:1}
.nis{font-size:7px;color:var(--muted)}
.nis.live{color:var(--green)}

/* Agents */
.arow{display:flex;align-items:center;gap:8px;padding:5px 14px;border-bottom:1px solid oklch(100% 0 0/0.03)}
.adot{width:5px;height:5px;border-radius:50%;flex-shrink:0}
.dg{background:var(--green);box-shadow:0 0 5px var(--green)}
.da{background:var(--gold);box-shadow:0 0 5px var(--gold);animation:scan 3s infinite}
.db{background:var(--cyan)}
.dr{background:var(--red)}
.aname{font-size:8px;color:var(--text);flex:1}
.atask{font-size:7px;color:var(--muted);text-align:right;max-width:72px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}

/* Centre */
.centre{display:flex;flex-direction:column}
.pnl{display:flex;flex-direction:column;overflow:hidden}
.phdr{display:flex;align-items:center;justify-content:space-between;padding:6px 14px 5px;border-bottom:1px solid var(--border);flex-shrink:0}
.ptl{font-size:7px;letter-spacing:.25em;text-transform:uppercase;color:var(--gold);display:flex;align-items:center;gap:6px}
.ptl::before{content:'';width:4px;height:4px;border-radius:50%;background:var(--gold);box-shadow:0 0 5px var(--gold)}
.pid{font-size:7px;color:var(--muted);letter-spacing:.08em}
.pbody{flex:1;overflow-y:auto;padding:8px 14px}
.pbody::-webkit-scrollbar{width:2px}.pbody::-webkit-scrollbar-thumb{background:var(--border)}

/* Feed */
.feed{flex:1;border-bottom:1px solid var(--border)}
.fitem{display:grid;grid-template-columns:48px 40px 1fr;gap:8px;align-items:start;padding:5px 0;border-bottom:1px solid oklch(100% 0 0/0.025);animation:fa .3s ease}
.ft{font-size:8px;color:var(--muted);padding-top:1px}
.fs{font-size:8px;color:var(--gold);text-transform:uppercase;letter-spacing:.08em;font-weight:700}
.fx{font-size:9.5px;color:var(--text);line-height:1.5}
.fx strong{color:var(--cyan)}
.fx .ok{color:var(--green)}.fx .wr{color:var(--gold)}.fx .er{color:var(--red)}

/* Middle */
.mid{display:grid;grid-template-columns:1fr 1fr;gap:0;background:var(--border)}
.midc{background:var(--panel);display:flex;flex-direction:column;overflow:hidden}

/* Radar */
.rwrap{display:flex;flex-direction:column;align-items:center;padding:10px 0 6px}
.radar{position:relative;width:108px;height:108px;flex-shrink:0}
.rr{position:absolute;inset:0;border:1px solid oklch(72% 0.16 85/0.13);border-radius:50%}
.rr2{inset:28%}.rr3{inset:56%}
.rsw{position:absolute;inset:0;border-radius:50%;background:conic-gradient(from 0deg,transparent 0deg,oklch(72% 0.16 85/0.12) 40deg,transparent 80deg);animation:sweep 8s linear infinite;transform-origin:center}
.rc{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center}
.ri{font-size:18px;display:block;line-height:1}
.rl{font-size:5.5px;letter-spacing:.15em;color:var(--gold);text-transform:uppercase;display:block;margin-top:3px}
.caplist{width:100%;padding:0 4px}
.capitem{font-size:7.5px;color:var(--muted);padding:2px 0;display:flex;align-items:center;gap:5px;border-bottom:1px solid oklch(100% 0 0/0.02)}
.capitem::before{content:'▸';color:var(--gold);font-size:6px;flex-shrink:0}

/* Tech */
.tcloud{display:flex;flex-wrap:wrap;gap:3px;margin-bottom:8px}
.tb{font-size:7px;letter-spacing:.04em;padding:2.5px 6px;border:1px solid oklch(75% 0.14 200/0.2);color:var(--cyan);background:oklch(75% 0.14 200/0.04);border-radius:1px}
.tb.h{border-color:oklch(70% 0.18 145/0.3);color:var(--green);background:oklch(70% 0.18 145/0.04)}
.yh{font-size:7px;color:var(--muted);margin:5px 0 3px;letter-spacing:.1em}
.yb{height:5px;background:oklch(100% 0 0/0.05);border-radius:3px;overflow:hidden;margin-bottom:6px}
.yf{height:100%;background:linear-gradient(90deg,var(--green),var(--gold));border-radius:3px;width:0;transition:width 2s ease}
.ytags{display:flex;flex-wrap:wrap;gap:3px}
.yt{font-size:7px;padding:2px 5px;background:oklch(72% 0.16 85/0.05);border:1px solid oklch(72% 0.16 85/0.18);color:var(--gold-d);border-radius:1px}

/* Stats */
.srow{display:grid;grid-template-columns:repeat(4,1fr);height:100%}
.sc{padding:14px 16px;border-right:1px solid var(--border);display:flex;flex-direction:column;justify-content:center;gap:4px}
.sc:last-child{border-right:none}
.sl{font-size:7px;letter-spacing:.2em;text-transform:uppercase;color:var(--muted)}
.sv{font-size:24px;font-weight:700;color:var(--gold);font-family:var(--fb);line-height:1}
.sv span{font-size:10px;color:var(--muted)}
.ss{font-size:7px;color:var(--muted)}
.sb{height:2px;background:oklch(100% 0 0/0.05);border-radius:1px;margin-top:5px;overflow:hidden}
.sf{height:100%;border-radius:1px;width:0;transition:width 1.5s ease}

/* Right sidebar */
.sbright{display:flex;flex-direction:column}
.lgblk2{flex:1;border-bottom:1px solid var(--border);overflow:hidden;display:flex;flex-direction:column}
.litem{display:flex;gap:6px;padding:2px 0;border-bottom:1px solid oklch(100% 0 0/0.02);font-size:8px;color:var(--muted);line-height:1.5}
.lts{color:var(--gold-d);flex-shrink:0;width:40px;font-size:7.5px}
.lt{flex-shrink:0;width:24px;text-transform:uppercase;font-size:7.5px;font-weight:700}
.lt.o{color:var(--green)}.lt.e{color:var(--red)}.lt.w{color:var(--gold)}.lt.i{color:var(--cyan)}
.mrow{display:flex;align-items:center;gap:8px;padding:5px 0;border-bottom:1px solid oklch(100% 0 0/0.03)}
.ml{font-size:7.5px;color:var(--muted);flex:1;text-transform:uppercase;letter-spacing:.08em}
.mb{flex:1;height:4px;background:oklch(100% 0 0/0.05);border-radius:2px;overflow:hidden}
.mf{height:100%;border-radius:2px;width:0;transition:width 1.5s ease}
.mv{font-size:9px;color:var(--text);font-weight:700;width:36px;text-align:right;font-family:var(--fm)}
.bc{padding:14px 14px 10px;border-top:1px solid var(--border);text-align:center;background:oklch(11% 0.015 255)!important}
.bct{font-size:24px;font-weight:700;color:var(--gold);font-family:var(--fb);letter-spacing:.04em;text-shadow:0 0 20px oklch(72% 0.16 85/0.4);animation:glow 4s ease-in-out infinite}
.bcd{font-size:7px;color:var(--muted);letter-spacing:.2em;text-transform:uppercase;margin-top:4px}
.bctz{font-size:6px;color:var(--gold-d);margin-top:2px}
.cp{border-top:1px solid var(--border);padding:10px 14px;background:oklch(72% 0.16 85/0.02)}
.cn{font-size:9px;color:var(--gold);font-weight:700;letter-spacing:.08em;margin-bottom:2px;font-family:var(--fb)}
.cr{font-size:6.5px;color:var(--muted);letter-spacing:.12em;text-transform:uppercase;margin-bottom:7px}
.crow{display:flex;align-items:center;gap:5px;margin-bottom:2px}
.ck{font-size:6.5px;color:var(--muted);width:48px;flex-shrink:0}
.cv{font-size:7.5px;color:var(--text);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.cv.g{color:var(--gold)}

/* Overlays */
.scan{position:fixed;inset:0;pointer-events:none;z-index:999;background:repeating-linear-gradient(0deg,transparent,transparent 3px,oklch(0% 0 0/0.015) 3px,oklch(0% 0 0/0.015) 4px)}
.ctlt{position:fixed;top:68px;left:10px;font-size:6px;color:var(--muted);letter-spacing:.12em;line-height:2;z-index:10;pointer-events:none;font-family:var(--fm)}
.ctlt span{color:var(--gold)}
.cbl{position:fixed;bottom:6px;right:10px;font-size:6px;color:var(--muted);letter-spacing:.08em;z-index:10;pointer-events:none;font-family:var(--fm)}

@media(max-width:900px){.mg{grid-template-columns:1fr}.sbleft,.sbright{display:none}.ctlt,.cbl{display:none}}
</style>
</head>
<body>

<div class="scan"></div>
<div class="ctlt">◈ OGRE COMPUTER — MISSION CONTROL<br>CLASSIFICATION: <span>BUSINESS INTELLIGENCE</span><br>CLEARANCE: <span>STUDEX GROUP</span><br>NETWORK: <span>PRIMARY FEED</span></div>
<div class="cbl">SYS.OGRE v4.2.1 // STUDEX GROUP // 2026</div>

<div class="mg">

  <!-- HEADER -->
  <header class="hdr">
    <div class="hlogo">
      <svg viewBox="0 0 32 32" fill="none"><polygon points="16,2 30,28 2,28" stroke="#C9A84C" stroke-width="1.5" fill="none"/><circle cx="16" cy="20" r="6" stroke="#C9A84C" stroke-width="1.5" fill="none"/><circle cx="16" cy="20" r="2" fill="#C9A84C"/><line x1="16" y1="2" x2="16" y2="14" stroke="#C9A84C" stroke-width="1" opacity=".5"/></svg>
      <div><div class="hlogo-n">OGRE COMPUTER</div><span class="hlogo-s">Mission Control</span></div>
    </div>
    <div class="hdiv"></div>
    <div class="htitle">◈ STUDEX GROUP — LAISA AGENT OS ◈</div>
    <div class="pills">
      <span class="pill on"><span class="pdot"></span>VM Online</span>
      <span class="pill on"><span class="pdot"></span>6 Agents</span>
      <span class="pill gd"><span class="pdot"></span>LAISA OS</span>
      <span class="pill bl"><span class="pdot"></span>Data Live</span>
    </div>
    <div class="hright">
      <div><div class="hclk" id="hc">--:--:--</div><div class="hdate" id="hd">--- -- ----</div></div>
    </div>
  </header>

  <!-- TICKER -->
  <div class="tk"><div class="tk-label">LIVE</div><div class="tk-track" id="ticker"></div></div>

  <!-- LEFT -->
  <div class="sbleft">
    <div class="lgblk">
      <svg class="lgmk" viewBox="0 0 52 52" fill="none"><polygon points="26,4 48,46 4,46" stroke="#C9A84C" stroke-width="1.5" fill="none"/><polygon points="26,13 40,39 12,39" stroke="#C9A84C" stroke-width="1" fill="none" opacity=".3"/><circle cx="26" cy="31" r="9" stroke="#C9A84C" stroke-width="1.5" fill="none"/><circle cx="26" cy="31" r="3" fill="#C9A84C"/><line x1="26" y1="4" x2="26" y2="22" stroke="#C9A84C" stroke-width="1" opacity=".3"/><circle cx="26" cy="4" r="2" fill="#C9A84C"/></svg>
      <div class="lgn">OGRE COMPUTER</div>
      <div class="lgs">Studex Group — South Africa</div>
      <div class="lgt">AI + VM Infrastructure</div>
    </div>
    <div class="nav">
      <div class="nh">Navigation</div>
      <div class="ni on"><span class="nii">◈</span><span class="nil">Mission Control</span><span class="nis live">LIVE</span></div>
      <div class="ni"><span class="nii">▣</span><span class="nil">LAISA Agent OS</span><span class="nis">→</span></div>
      <div class="ni"><span class="nii">◉</span><span class="nil">Dark Factory</span><span class="nis">→</span></div>
      <div class="ni"><span class="nii">◎</span><span class="nil">Client VMs</span><span class="nis">→</span></div>
      <div class="ni"><span class="nii">◻</span><span class="nil">Knowledge Graph</span><span class="nis">→</span></div>
      <div class="ni"><span class="nii">▤</span><span class="nil">Market Intel</span><span class="nis">→</span></div>
      <div class="ni"><span class="nii">⬡</span><span class="nil">Proposal Engine</span><span class="nis">→</span></div>
      <div class="ni"><span class="nii">⚙</span><span class="nil">VM Stack</span><span class="nis">→</span></div>
      <div class="ni"><span class="nii">▥</span><span class="nil">SafeSight CRM</span><span class="nis">→</span></div>
    </div>
    <div class="pnl" style="flex-shrink:0">
      <div class="phdr"><span class="ptl">Agent Fleet</span><span class="pid">AF-001</span></div>
      <div class="pbody">
        <div class="arow"><span class="adot dg"></span><span class="aname">DenchClaw</span><span class="atask">Processing intake</span></div>
        <div class="arow"><span class="adot dg"></span><span class="aname">CashClaw</span><span class="atask">Reconciling R12,400</span></div>
        <div class="arow"><span class="adot da"></span><span class="aname">Charlie</span><span class="atask">Transcribing voice</span></div>
        <div class="arow"><span class="adot dg"></span><span class="aname">ChatterClaw</span><span class="atask">Scheduling posts</span></div>
        <div class="arow"><span class="adot db"></span><span class="aname">InboxClaw</span><span class="atask">Awaiting mail</span></div>
        <div class="arow"><span class="adot dg"></span><span class="aname">AuditClaw</span><span class="atask">POPIA log active</span></div>
      </div>
    </div>
  </div>

  <!-- CENTRE -->
  <div class="centre">
    <div class="pnl feed">
      <div class="phdr"><span class="ptl">Live Operations Feed</span><span class="pid">LOF-001 // REAL-TIME</span></div>
      <div class="pbody" id="feed"></div>
    </div>
    <div class="mid">
      <div class="pnl midc">
        <div class="phdr"><span class="ptl">10 Years Capability</span><span class="pid">CVR-10</span></div>
        <div class="pbody" style="display:flex;flex-direction:column;align-items:center">
          <div class="rwrap">
            <div class="radar"><div class="rr"></div><div class="rr rr2"></div><div class="rr rr3"></div><div class="rsw"></div><div class="rc"><span class="ri">◈</span><span class="rl">10 YRS</span></div></div>
          </div>
          <div class="caplist">
            <div class="capitem">Full-Stack Development</div>
            <div class="capitem">Cloud Architecture — AWS / GCP / Azure</div>
            <div class="capitem">AI / LLM Integration &amp; Agents</div>
            <div class="capitem">DevOps — CI/CD Pipelines</div>
            <div class="capitem">Database Engineering</div>
            <div class="capitem">API Design &amp; Microservices</div>
            <div class="capitem">Security — POPIA / GDPR / OWASP</div>
            <div class="capitem">Mobile — iOS / Android / React Native</div>
            <div class="capitem">Real-time Systems / WebRTC</div>
            <div class="capitem">Blockchain / Web3 / DeFi</div>
            <div class="capitem">SaaS Architecture / Multi-tenancy</div>
            <div class="capitem">Event-Driven / Message Queues</div>
          </div>
        </div>
      </div>
      <div class="pnl midc">
        <div class="phdr"><span class="ptl">Technology Radar</span><span class="pid">TR-001</span></div>
        <div class="pbody">
          <div class="tcloud">
            <span class="tb">Node.js</span><span class="tb">Python</span><span class="tb">TypeScript</span>
            <span class="tb">Rust</span><span class="tb">Go</span><span class="tb">C++</span>
            <span class="tb">React</span><span class="tb">Next.js</span><span class="tb">Vue</span>
            <span class="tb">Swift</span><span class="tb">Kotlin</span>
            <span class="tb h">Docker</span><span class="tb h">Kubernetes</span>
            <span class="tb h">Terraform</span><span class="tb h">PostgreSQL</span>
            <span class="tb">MongoDB</span><span class="tb">Redis</span>
            <span class="tb">GraphQL</span><span class="tb">WebRTC</span>
            <span class="tb h">Supabase</span><span class="tb h">Cloudflare</span>
            <span class="tb h">Vercel</span><span class="tb h">AWS</span>
            <span class="tb">TensorFlow</span><span class="tb h">OpenAI API</span>
            <span class="tb">LangChain</span><span class="tb">LangGraph</span>
            <span class="tb">Twilio</span><span class="tb">Stripe</span>
          </div>
          <div class="yh">10 YEARS — INDUSTRY EXPERIENCE</div>
          <div class="yb"><div class="yf" id="yrBar"></div></div>
          <div class="ytags">
            <span class="yt">SaaS</span><span class="yt">Marketplaces</span><span class="yt">CRM</span>
            <span class="yt">ERP</span><span class="yt">FinTech</span><span class="yt">HealthTech</span>
            <span class="yt">EdTech</span><span class="yt">PropTech</span><span class="yt">Agile</span>
            <span class="yt">TDD</span><span class="yt">Microservices</span><span class="yt">Event-Driven</span>
            <span class="yt">REST</span><span class="yt">GraphQL</span><span class="yt">gRPC</span>
          </div>
        </div>
      </div>
    </div>
    <div class="srow" style="background:var(--border)">
      <div class="sc" style="background:var(--panel)"><div class="sl">VM Uptime</div><div class="sv">99.97<span>%</span></div><div class="ss">D@RK F@C#ORY // orgo.ai</div><div class="sb"><div class="sf" id="bc1" style="background:var(--green)"></div></div></div>
      <div class="sc" style="background:var(--panel)"><div class="sl">Token Savings</div><div class="sv">85<span>%</span></div><div class="ss">headroom // vs standard</div><div class="sb"><div class="sf" id="bc2" style="background:var(--gold)"></div></div></div>
      <div class="sc" style="background:var(--panel)"><div class="sl">Clients on VM</div><div class="sv">3<span>/50</span></div><div class="ss">SafeSight + 2 pilots</div><div class="sb"><div class="sf" id="bc3" style="background:var(--cyan)"></div></div></div>
      <div class="sc" style="background:var(--panel)"><div class="sl">Pipeline Value</div><div class="sv">R187K</div><div class="ss">6 deals in progress</div><div class="sb"><div class="sf" id="bc4" style="background:var(--gold)"></div></div></div>
    </div>
  </div>

  <!-- RIGHT -->
  <div class="sbright">
    <div class="pnl lgblk2">
      <div class="phdr"><span class="ptl">System Log</span><span style="font-size:7px;color:var(--green);animation:blink 1s infinite">● LIVE</span></div>
      <div class="pbody" id="syslog"></div>
    </div>
    <div class="pnl" style="flex-shrink:0">
      <div class="phdr"><span class="ptl">VM Metrics</span><span class="pid">VM-01</span></div>
      <div class="pbody">
        <div class="mrow"><span class="ml">CPU</span><div class="mb"><div class="mf" id="cpu" style="background:var(--green)"></div></div><span class="mv" id="cpuV">23%</span></div>
        <div class="mrow"><span class="ml">Memory</span><div class="mb"><div class="mf" id="mem" style="background:var(--cyan)"></div></div><span class="mv" id="memV">61%</span></div>
        <div class="mrow"><span class="ml">Disk</span><div class="mb"><div class="mf" id="disk" style="background:var(--gold)"></div></div><span class="mv" id="diskV">42%</span></div>
        <div class="mrow"><span class="ml">Network</span><div class="mb"><div class="mf" id="net" style="background:var(--green)"></div></div><span class="mv" id="netV">8 MB/s</span></div>
        <div class="mrow"><span class="ml">Agents</span><div class="mb"><div class="mf" id="agnt" style="background:var(--green)"></div></div><span class="mv" id="agntV">5/6</span></div>
      </div>
    </div>
    <div class="bc">
      <div class="bct" id="bct">--:--:--</div>
      <div class="bcd" id="bcd">--- --, ----</div>
      <div class="bctz">UTC+2 // SOUTH AFRICA</div>
    </div>
    <div class="cp">
      <div class="cn">Tumelo Ramaphosa</div>
