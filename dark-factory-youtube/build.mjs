// Dark Factory — YouTube Pipeline Plan Generator
import { writeFileSync } from 'fs';

const countries = [
  {flag:"🇰🇪",name:"Kenya",region:"East Africa · Pop: 56M · Age: 20",tier:"tier-1",tierLabel:"TIER 1",scores:[
    {label:"AI Ecosystem",w:88,color:"green"},{label:"Payments",w:95,color:"green"},
    {label:"Political",w:70,color:"blue"},{label:"Speed-to-Scale",w:90,color:"green"},
    {label:"Young Pop.",w:85,color:"green"}],grade:"A"},
  {flag:"🇳🇬",name:"Nigeria",region:"West Africa · Pop: 230M · Age: 18",tier:"tier-1",tierLabel:"TIER 1",scores:[
    {label:"AI Ecosystem",w:82,color:"green"},{label:"Payments",w:88,color:"green"},
    {label:"Political",w:55,color:"orange"},{label:"Speed-to-Scale",w:85,color:"green"},
    {label:"Young Pop.",w:92,color:"green"}],grade:"A"},
  {flag:"🇷🇼",name:"Rwanda",region:"East Africa · Pop: 14M · Age: 19",tier:"tier-1",tierLabel:"TIER 1",scores:[
    {label:"AI Ecosystem",w:85,color:"green"},{label:"Payments",w:80,color:"green"},
    {label:"Political",w:88,color:"green"},{label:"Speed-to-Scale",w:82,color:"green"},
    {label:"Young Pop.",w:80,color:"green"}],grade:"A-"},
  {flag:"🇬🇭",name:"Ghana",region:"West Africa · Pop: 34M · Age: 21",tier:"tier-1",tierLabel:"TIER 1",scores:[
    {label:"AI Ecosystem",w:78,color:"blue"},{label:"Payments",w:84,color:"green"},
    {label:"Political",w:75,color:"blue"},{label:"Speed-to-Scale",w:80,color:"green"},
    {label:"Young Pop.",w:78,color:"green"}],grade:"A-"},
  {flag:"🇧🇷",name:"Brazil",region:"Latin America · Pop: 215M · Age: 34",tier:"tier-2",tierLabel:"TIER 2",scores:[
    {label:"AI Ecosystem",w:90,color:"green"},{label:"Payments",w:92,color:"green"},
    {label:"Political",w:60,color:"orange"},{label:"Speed-to-Scale",w:85,color:"green"},
    {label:"Young Pop.",w:60,color:"blue"}],grade:"B+"},
  {flag:"🇹🇭",name:"Thailand",region:"Southeast Asia · Pop: 71M · Age: 40",tier:"tier-2",tierLabel:"TIER 2",scores:[
    {label:"AI Ecosystem",w:84,color:"green"},{label:"Payments",w:88,color:"green"},
    {label:"Political",w:58,color:"orange"},{label:"Speed-to-Scale",w:75,color:"blue"},
    {label:"Young Pop.",w:48,color:"orange"}],grade:"B"},
  {flag:"🇲🇦",name:"Morocco",region:"North Africa · Pop: 37M · Age: 30",tier:"tier-2",tierLabel:"TIER 2",scores:[
    {label:"AI Ecosystem",w:72,color:"blue"},{label:"Payments",w:75,color:"blue"},
    {label:"Political",w:68,color:"blue"},{label:"Speed-to-Scale",w:72,color:"blue"},
    {label:"Young Pop.",w:65,color:"blue"}],grade:"B"},
  {flag:"🇨🇮",name:"Côte d'Ivoire",region:"West Africa · Pop: 31M · Age: 19",tier:"tier-2",tierLabel:"TIER 2",scores:[
    {label:"AI Ecosystem",w:65,color:"blue"},{label:"Payments",w:70,color:"blue"},
    {label:"Political",w:55,color:"orange"},{label:"Speed-to-Scale",w:72,color:"blue"},
    {label:"Young Pop.",w:88,color:"green"}],grade:"B"},
  {flag:"🇹🇳",name:"Tunisia",region:"North Africa · Pop: 12M · Age: 32",tier:"tier-2",tierLabel:"TIER 2",scores:[
    {label:"AI Ecosystem",w:68,color:"blue"},{label:"Payments",w:70,color:"blue"},
    {label:"Political",w:50,color:"orange"},{label:"Speed-to-Scale",w:68,color:"blue"},
    {label:"Young Pop.",w:60,color:"blue"}],grade:"B"},
  {flag:"🇺🇬",name:"Uganda",region:"East Africa · Pop: 49M · Age: 16",tier:"tier-2",tierLabel:"TIER 2",scores:[
    {label:"AI Ecosystem",w:62,color:"blue"},{label:"Payments",w:68,color:"blue"},
    {label:"Political",w:58,color:"orange"},{label:"Speed-to-Scale",w:72,color:"blue"},
    {label:"Young Pop.",w:90,color:"green"}],grade:"B-"},
  {flag:"🇧🇼",name:"Botswana",region:"Southern Africa · Pop: 2.6M · Age: 25",tier:"tier-2",tierLabel:"TIER 2",scores:[
    {label:"AI Ecosystem",w:70,color:"blue"},{label:"Payments",w:80,color:"green"},
    {label:"Political",w:85,color:"green"},{label:"Speed-to-Scale",w:65,color:"blue"},
    {label:"Young Pop.",w:62,color:"blue"}],grade:"B"},
  {flag:"🇹🇿",name:"Tanzania",region:"East Africa · Pop: 68M · Age: 17",tier:"tier-3",tierLabel:"TIER 3",scores:[
    {label:"AI Ecosystem",w:58,color:"blue"},{label:"Payments",w:62,color:"blue"},
    {label:"Political",w:65,color:"blue"},{label:"Speed-to-Scale",w:65,color:"blue"},
    {label:"Young Pop.",w:92,color:"green"}],grade:"C+"},
  {flag:"🇿🇼",name:"Zimbabwe",region:"Southern Africa · Pop: 17M · Age: 18",tier:"tier-3",tierLabel:"TIER 3",scores:[
    {label:"AI Ecosystem",w:52,color:"orange"},{label:"Payments",w:55,color:"orange"},
    {label:"Political",w:38,color:"red"},{label:"Speed-to-Scale",w:55,color:"orange"},
    {label:"Young Pop.",w:85,color:"green"}],grade:"C"},
  {flag:"🇲🇿",name:"Mozambique",region:"Southern Africa · Pop: 33M · Age: 17",tier:"tier-3",tierLabel:"TIER 3",scores:[
    {label:"AI Ecosystem",w:50,color:"orange"},{label:"Payments",w:58,color:"orange"},
    {label:"Political",w:48,color:"orange"},{label:"Speed-to-Scale",w:58,color:"orange"},
    {label:"Young Pop.",w:90,color:"green"}],grade:"C"},
  {flag:"🇸🇿",name:"Eswatini (Swaziland)",region:"Southern Africa · Pop: 1.2M · Age: 20",tier:"tier-3",tierLabel:"TIER 3",scores:[
    {label:"AI Ecosystem",w:52,color:"orange"},{label:"Payments",w:62,color:"blue"},
    {label:"Political",w:58,color:"orange"},{label:"Speed-to-Scale",w:52,color:"orange"},
    {label:"Young Pop.",w:78,color:"green"}],grade:"C"},
  {flag:"🇲🇼",name:"Malawi",region:"Southern Africa · Pop: 21M · Age: 17",tier:"tier-3",tierLabel:"TIER 3",scores:[
    {label:"AI Ecosystem",w:48,color:"orange"},{label:"Payments",w:55,color:"orange"},
    {label:"Political",w:52,color:"orange"},{label:"Speed-to-Scale",w:55,color:"orange"},
    {label:"Young Pop.",w:92,color:"green"}],grade:"C"},
  {flag:"🇸🇩",name:"Sudan",region:"East Africa · Pop: 50M · Age: 18",tier:"tier-4",tierLabel:"TIER 4",scores:[
    {label:"AI Ecosystem",w:42,color:"orange"},{label:"Payments",w:45,color:"orange"},
    {label:"Political",w:25,color:"red"},{label:"Speed-to-Scale",w:42,color:"orange"},
    {label:"Young Pop.",w:88,color:"green"}],grade:"D"},
  {flag:"🇨🇩",name:"DRC",region:"Central Africa · Pop: 105M · Age: 17",tier:"tier-4",tierLabel:"TIER 4",scores:[
    {label:"AI Ecosystem",w:40,color:"orange"},{label:"Payments",w:42,color:"orange"},
    {label:"Political",w:28,color:"red"},{label:"Speed-to-Scale",w:40,color:"orange"},
    {label:"Young Pop.",w:92,color:"green"}],grade:"D"},
  {flag:"🇹🇩",name:"Chad",region:"Central Africa · Pop: 18M · Age: 16",tier:"tier-4",tierLabel:"TIER 4",scores:[
    {label:"AI Ecosystem",w:38,color:"orange"},{label:"Payments",w:40,color:"orange"},
    {label:"Political",w:25,color:"red"},{label:"Speed-to-Scale",w:38,color:"orange"},
    {label:"Young Pop.",w:90,color:"green"}],grade:"D"},
  {flag:"🇬🇳",name:"Guinea",region:"West Africa · Pop: 14M · Age: 18",tier:"tier-3",tierLabel:"TIER 3",scores:[
    {label:"AI Ecosystem",w:50,color:"orange"},{label:"Payments",w:55,color:"orange"},
    {label:"Political",w:48,color:"orange"},{label:"Speed-to-Scale",w:52,color:"orange"},
    {label:"Young Pop.",w:88,color:"green"}],grade:"C"},
  {flag:"🇬🇼",name:"Guinea-Bissau",region:"West Africa · Pop: 2M · Age: 19",tier:"tier-4",tierLabel:"TIER 4",scores:[
    {label:"AI Ecosystem",w:42,color:"orange"},{label:"Payments",w:48,color:"orange"},
    {label:"Political",w:45,color:"orange"},{label:"Speed-to-Scale",w:45,color:"orange"},
    {label:"Young Pop.",w:85,color:"green"}],grade:"D"},
  {flag:"🇨🇫",name:"Cent. Afr. Republic",region:"Central Africa · Pop: 6M · Age: 17",tier:"tier-4",tierLabel:"TIER 4",scores:[
    {label:"AI Ecosystem",w:35,color:"red"},{label:"Payments",w:38,color:"red"},
    {label:"Political",w:18,color:"red"},{label:"Speed-to-Scale",w:35,color:"orange"},
    {label:"Young Pop.",w:88,color:"green"}],grade:"D"},
  {flag:"🇻🇪",name:"Venezuela",region:"South America · Pop: 28M · Age: 28",tier:"tier-4",tierLabel:"TIER 4",scores:[
    {label:"AI Ecosystem",w:40,color:"orange"},{label:"Payments",w:38,color:"red"},
    {label:"Political",w:22,color:"red"},{label:"Speed-to-Scale",w:40,color:"orange"},
    {label:"Young Pop.",w:72,color:"blue"}],grade:"D"},
];

const gradeClass = (g) => g.startsWith("A") ? "s-a" : g.startsWith("B") ? "s-b" : g.startsWith("C") ? "s-c" : "s-d";

const cardsHtml = countries.map(c => `
    <div class="card">
      <div class="tier-badge ${c.tier}">${c.tierLabel}</div>
      <div class="flag">${c.flag}</div><div class="name">${c.name}</div>
      <div class="region">${c.region}</div>
      ${c.scores.map(s => `<div class="score-bar"><span class="label">${s.label}</span><div class="bar"><div class="fill fill-${s.color}" style="width:${s.w}%"></div></div></div>`).join('')}
      <div class="overall-score"><span class="mono" style="font-size:0.7rem;color:var(--muted)">SCORE</span><span class="num ${gradeClass(c.grade)}">${c.grade}</span></div>
    </div>`).join('');

const tiersTable = [
  {tier:"TIER 1 — EASIEST",color:"var(--green)",countries:[
    {flag:"🇰🇪",name:"Kenya",notes:"M-Pesa, 37.9M mobile money users. Flutterwave native. AI startup density highest in Africa."},
    {flag:"🇳🇬",name:"Nigeria",notes:"Flutterwave ($3B val), Interswitch, Opay. 230M people, largest market in Africa."},
    {flag:"🇷🇼",name:"Rwanda",notes:"$250M AI strategy. Government-backed. Most politically stable in Africa."},
    {flag:"🇬🇭",name:"Ghana",notes:"$250M national AI strategy. Strong fintech. Mobile money growing fast."},
  ]},
  {tier:"TIER 2 — FAST MOVE",color:"var(--blue)",countries:[
    {flag:"🇧🇷",name:"Brazil",notes:"869 AI startups, $1B+ funding. Fintech leads LatAm. 14.9% CAGR to 2034."},
    {flag:"🇹🇭",name:"Thailand",notes:"Digital economy $50B target 2025. 2,100+ startups. 7.3% growth."},
    {flag:"🇲🇦",name:"Morocco",notes:"Fastest growing startup ecosystem in North Africa. EU proximity."},
    {flag:"🇨🇮",name:"Côte d'Ivoire",notes:"Largest Francophone fintech hub. Young population. Mobile-first."},
    {flag:"🇹🇳",name:"Tunisia",notes:"Strong STEM education. AI research output growing."},
    {flag:"🇺🇬",name:"Uganda",notes:"Mobile money penetration. Young median age 16. Fast adopter market."},
    {flag:"🇧🇼",name:"Botswana",notes:"High income country. Stable government. Gateway to SADC."},
  ]},
  {tier:"TIER 3 — BUILD PRESENCE",color:"var(--orange)",countries:[
    {flag:"🇹🇿",name:"Tanzania",notes:"Instant Payment System linking Rwanda/Tanzania. DPs in progress."},
    {flag:"🇿🇼",name:"Zimbabwe",notes:"Ecocash dominant. USD hyperinflation. AI = efficiency tool."},
    {flag:"🇲🇿",name:"Mozambique",notes:"Off-grid energy + AI combo. Large youth population."},
    {flag:"🇸🇿",name:"Eswatini",notes:"Small market. Gateway to SACU. Stable."},
    {flag:"🇲🇼",name:"Malawi",notes:"Agriculture AI opportunity. Mobile coverage expanding."},
    {flag:"🇬🇳",name:"Guinea",notes:"Francophone West Africa. Mining sector AI demand."},
  ]},
  {tier:"TIER 4 — MONITOR",color:"var(--red)",countries:[
    {flag:"🇸🇩",name:"Sudan",notes:"Conflict zone. Humanitarian AI use cases. Long-term play only."},
    {flag:"🇨🇩",name:"DRC",notes:"Huge population. Instability. NGO + mining AI use cases."},
    {flag:"🇹🇩",name:"Chad",notes:"Highest youth ratio. Oil + AI opportunity for future."},
    {flag:"🇬🇼",name:"Guinea-Bissau",notes:"Cashew export economy. Very small. Partner via Senegal."},
    {flag:"🇨🇫",name:"Cent. Afr. Republic",notes:"Humanitarian. Diamond/gold mining AI. NGO partnerships."},
    {flag:"🇻🇪",name:"Venezuela",notes:"Crisis market. Crypto adoption high. AI for diaspora."},
  ]},
];

const tiersHtml = tiersTable.map(t => `
    <tr style="border-left:3px solid ${t.color}"><td colspan="5" style="background:var(--bg3);padding:0.6rem 1rem;font-weight:700;font-size:0.78rem;letter-spacing:2px;text-transform:uppercase;color:${t.color}">${t.tier}</td></tr>
    ${t.countries.map(c => `
    <tr>
      <td class="flag-cell">${c.flag}</td>
      <td class="country-cell">${c.name}</td>
      <td style="font-size:0.82rem;color:var(--muted)">${c.notes}</td>
      <td><span class="freq-badge freq-w">Opportunistic</span></td>
      <td class="score-cell" style="color:${t.color}">${t.color === 'var(--green)' ? 'Pilot' : t.color === 'var(--blue)' ? 'Q3 2026' : t.color === 'var(--orange)' ? 'Q4 2026' : '2027+'}</span></td>
    </tr>`).join('')}
  `).join('');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Dark Factory — Global AI YouTube Pipeline | 18-Country Market Plan</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500&display=swap');
:root{--bg:#0a0a0f;--bg2:#0f0f1a;--bg3:#141428;--green:#00ff88;--gold:#ffd700;--red:#ff4455;--orange:#ff8c42;--blue:#4fc3f7;--text:#e8e8f0;--muted:#7a7a9a;--border:#1e1e3a;}
*{margin:0;padding:0;box-sizing:border-box}body{background:var(--bg);color:var(--text);font-family:'Space Grotesk',sans-serif;line-height:1.6}
.mono{font-family:'JetBrains Mono',monospace}
nav{position:sticky;top:0;background:rgba(10,10,15,0.96);backdrop-filter:blur(12px);border-bottom:1px solid var(--border);padding:0 2rem;display:flex;align-items:center;gap:1.5rem;z-index:100;height:56px;overflow-x:auto}
nav .logo{color:var(--green);font-weight:700;font-size:1rem;white-space:nowrap}
nav .logo span{color:var(--gold)}nav a{color:var(--muted);text-decoration:none;font-size:0.82rem;white-space:nowrap;transition:color 0.2s}
nav a:hover{color:var(--green)}nav .badge{background:var(--green);color:var(--bg);font-size:0.65rem;padding:2px 8px;border-radius:10px;font-weight:700;white-space:nowrap}
.hero{text-align:center;padding:5rem 2rem 3rem;position:relative;overflow:hidden}
.hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 60% 50% at 50% 0%,rgba(0,255,136,0.08) 0%,transparent 70%);pointer-events:none}
.hero .tag{color:var(--green);font-size:0.75rem;letter-spacing:3px;text-transform:uppercase;margin-bottom:1rem}
.hero h1{font-size:clamp(1.8rem,5vw,3.2rem);font-weight:700;line-height:1.1;margin-bottom:1rem}
.hero h1 .g{color:var(--green)}.hero h1 .y{color:var(--gold)}
.hero p{color:var(--muted);max-width:680px;margin:0 auto 2rem;font-size:1rem}
.hero .channels{display:flex;gap:0.6rem;justify-content:center;flex-wrap:wrap;margin-top:1.5rem}
.hero .ch{background:var(--bg3);border:1px solid var(--border);padding:0.4rem 0.85rem;border-radius:8px;font-size:0.72rem;color:var(--muted);display:flex;align-items:center;gap:0.4rem}
.hero .ch.active{border-color:var(--green);color:var(--green)}
section{padding:3.5rem 2rem;max-width:1200px;margin:0 auto}
.section-tag{color:var(--gold);font-size:0.72rem;letter-spacing:3px;text-transform:uppercase;margin-bottom:0.5rem}
.section-title{font-size:clamp(1.3rem,3vw,1.8rem);font-weight:700;margin-bottom:0.5rem}
.section-sub{color:var(--muted);margin-bottom:2rem;font-size:0.9rem}
.stats-row{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:2.5rem}
@media(max-width:600px){.stats-row{grid-template-columns:repeat(2,1fr)}}
.stat-box{background:var(--bg2);border:1px solid var(--border);border-radius:12px;padding:1.1rem;text-align:center}
.stat-box .val{font-size:2rem;font-weight:700;color:var(--green)}.stat-box .lab{font-size:0.75rem;color:var(--muted);margin-top:0.2rem}
.notice{background:rgba(255,215,0,0.07);border:1px solid rgba(255,215,0,0.25);border-radius:12px;padding:1.1rem;margin-bottom:2rem;font-size:0.85rem;color:var(--gold)}
.notice strong{color:#fff}
.country-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:1rem}
.card{background:var(--bg2);border:1px solid var(--border);border-radius:12px;padding:1.1rem;position:relative;transition:border-color 0.2s,transform 0.2s}
.card:hover{border-color:var(--green);transform:translateY(-2px)}
.card .flag{font-size:1.6rem;margin-bottom:0.4rem}.card .name{font-weight:600;font-size:0.95rem;margin-bottom:0.15rem}
.card .region{color:var(--muted);font-size:0.72rem;margin-bottom:0.7rem;line-height:1.3}
.card .tier-badge{position:absolute;top:0.75rem;right:0.75rem;font-size:0.6rem;padding:2px 7px;border-radius:8px;font-weight:700;letter-spacing:1px}
.tier-1{background:rgba(0,255,136,0.15);color:var(--green);border:1px solid var(--green)}
.tier-2{background:rgba(79,195,247,0.15);color:var(--blue);border:1px solid var(--blue)}
.tier-3{background:rgba(255,140,66,0.15);color:var(--orange);border:1px solid var(--orange)}
.tier-4{background:rgba(255,68,85,0.15);color:var(--red);border:1px solid var(--red)}
.score-bar{display:flex;align-items:center;gap:0.4rem;margin-bottom:0.35rem;font-size:0.72rem}
.score-bar .label{width:80px;color:var(--muted);flex-shrink:0}.score-bar .bar{flex:1;height:3px;background:var(--bg3);border-radius:2px;overflow:hidden}
.score-bar .fill{height:100%;border-radius:2px}
.fill-green{background:var(--green)}.fill-blue{background:var(--blue)}.fill-orange{background:var(--orange)}.fill-red{background:var(--red)}
.overall-score{margin-top:0.6rem;padding-top:0.6rem;border-top:1px solid var(--border);display:flex;align-items:center;justify-content:space-between}
.overall-score .num{font-size:1.3rem;font-weight:700}
.s-a{color:var(--green)}.s-b{color:var(--blue)}.s-c{color:var(--orange)}.s-d{color:var(--red)}
.canvas-wrap{background:var(--bg2);border:1px solid var(--border);border-radius:16px;padding:1.25rem;margin-top:2rem}
canvas{width:100%;display:block;max-height:420px}
.tier-table{width:100%;border-collapse:collapse;font-size:0.85rem}
.tier-table th{text-align:left;padding:0.7rem 1rem;color:var(--muted);font-size:0.68rem;letter-spacing:2px;text-transform:uppercase;border-bottom:1px solid var(--border)}
.tier-table td{padding:0.75rem 1rem;border-bottom:1px solid rgba(30,30,58,0.5);vertical-align:top}
.tier-table tr:hover td{background:rgba(0,255,136,0.03)}.tier-table .flag-cell{font-size:1.2rem}
.tier-table .country-cell{font-weight:600}.tier-table .score-cell{font-family:'JetBrains Mono',monospace;font-size:0.85rem;font-weight:700}
.freq-badge{font-size:0.62rem;padding:2px 6px;border-radius:5px;font-weight:700}
.freq-d{background:rgba(0,255,136,0.15);color:var(--green)}.freq-w{background:rgba(79,195,247,0.15);color:var(--blue)}.freq-s{background:rgba(255,140,66,0.15);color:var(--orange)}
.tech-stack{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1rem}
.tech-card{background:var(--bg2);border:1px solid var(--border);border-radius:12px;padding:1.1rem}
.tech-card h4{color:var(--green);font-size:0.75rem;letter-spacing:2px;text-transform:uppercase;margin-bottom:0.75rem}
.tech-item{display:flex;align-items:center;gap:0.5rem;padding:0.35rem 0;font-size:0.83rem;border-bottom:1px solid rgba(30,30,58,0.4)}
.tech-item:last-child{border-bottom:none}.tech-dot{width:5px;height:5px;border-radius:50%;flex-shrink:0}
.product-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(310px,1fr));gap:1.25rem}
.product-card{background:var(--bg2);border:1px solid var(--border);border-radius:14px;padding:1.5rem;position:relative;overflow:hidden}
.product-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--green),var(--gold))}
.product-card h3{font-size:1.05rem;font-weight:700;margin-bottom:0.4rem}
.product-card .price{color:var(--gold);font-size:1.3rem;font-weight:700;margin-bottom:0.6rem}
.product-card .price span{font-size:0.75rem;color:var(--muted);font-weight:400}
.product-card ul{list-style:none}.product-card ul li{padding:0.28rem 0;font-size:0.82rem;color:var(--muted);display:flex;gap:0.4rem}
.product-card ul li::before{content:'✓';color:var(--green);flex-shrink:0;font-size:0.75rem}
.product-card .tag{display:inline-block;background:rgba(0,255,136,0.1);color:var(--green);font-size:0.65rem;padding:2px 7px;border-radius:4px;margin-bottom:0.6rem;font-weight:600}
.matrix-table{width:100%;border-collapse:collapse;font-size:0.78rem}
.matrix-table th{background:var(--bg3);padding:0.6rem 0.7rem;text-align:left;color:var(--muted);font-size:0.65rem;letter-spacing:1.5px;text-transform:uppercase;border-bottom:1px solid var(--border);position:sticky;top:56px}
.matrix-table td{padding:0.6rem 0.7rem;border-bottom:1px solid rgba(30,30,58,0.4);vertical-align:middle}
.matrix-table tr:hover td{background:rgba(0,255,136,0.02)}
.pipeline{display:flex;flex-direction:column}
.pipe-step{display:flex;gap:1.25rem;align-items:flex-start}
.pipe-step .num{width:36px;height:36px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.85rem}
.pipe-step .content{flex:1;background:var(--bg2);border:1px solid var(--border);border-radius:12px;padding:1.1rem;margin-bottom:0.75rem}
.pipe-step .content h4{font-size:0.9rem;margin-bottom:0.3rem}.pipe-step .content p{font-size:0.8rem;color:var(--muted)}
.pipe-connector{width:2px;height:18px;background:var(--border);margin-left:17px}
.timeline{position:relative;padding-left:1.75rem}
.timeline::before{content:'';position:absolute;left:6px;top:0;bottom:0;width:2px;background:var(--border)}
.tl-item{position:relative;margin-bottom:1.75rem}
.tl-item::before{content:'';position:absolute;left:-1.75rem;top:4px;width:16px;height:16px;border-radius:50%;border:2px solid var(--green);background:var(--bg)}
.tl-item.active::before{background:var(--green)}
.tl-item h4{font-size:0.95rem;margin-bottom:0.25rem}
.tl-item .date{color:var(--gold);font-size:0.72rem;margin-bottom:0.4rem;font-family:'JetBrains Mono',monospace}
.tl-item p{font-size:0.82rem;color:var(--muted)}
.agent-arch{display:grid;grid-template-columns:1fr 1fr;gap:1.25rem}
@media(max-width:768px){.agent-arch{grid-template-columns:1fr}}
.arch-box{background:var(--bg2);border:1px solid var(--border);border-radius:12px;padding:1.25rem}
.arch-box h4{color:var(--gold);font-size:0.75rem;letter-spacing:2px;text-transform:uppercase;margin-bottom:0.75rem}
.node{display:flex;align-items:center;gap:0.6rem;padding:0.5rem 0;border-bottom:1px solid rgba(30,30,58,0.4);font-size:0.83rem}
.node:last-child{border-bottom:none}.node-icon{width:30px;height:30px;border-radius:7px;display:flex;align-items:center;justify-content:center;font-size:0.85rem;flex-shrink:0}
.ni-green{background:rgba(0,255,136,0.15)}.ni-gold{background:rgba(255,215,0,0.15)}.ni-blue{background:rgba(79,195,247,0.15)}.ni-purple{background:rgba(179,136,255,0.15)}
.node-name{font-weight:600;font-size:0.83rem}.node-desc{font-size:0.72rem;color:var(--muted)}
footer{text-align:center;padding:2.5rem 2rem;color:var(--muted);font-size:0.78rem;border-top:1px solid var(--border);margin-top:2rem}
footer span{color:var(--green)}.divider{height:1px;background:var(--border);margin:3rem 0}
.two-col{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem}
@media(max-width:768px){.two-col{grid-template-columns:1fr}}
.txt-block{background:var(--bg2);border:1px solid var(--border);border-radius:12px;padding:1.25rem}
.txt-block h4{font-size:0.88rem;margin-bottom:0.75rem;color:var(--text)}
.txt-block p,.txt-block li{font-size:0.83rem;color:var(--muted);margin-bottom:0.5rem}.txt-block ul{padding-left:1.2rem}
.highlight{color:var(--green);font-weight:600}
.big-cta{background:linear-gradient(135deg,rgba(0,255,136,0.1),rgba(255,215,0,0.1));border:1px solid rgba(0,255,136,0.3);border-radius:16px;padding:2rem;text-align:center;margin-top:2rem}
.big-cta h2{color:var(--green);font-size:1.5rem;margin-bottom:0