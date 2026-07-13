// data.js — all static data
export const BRAND = { name:'CipherTrace', sub:'Dark Factory | Studex Dev' };

export const CLIENTS = [
  {
    id:'laisa', name:'LAISA Aesthetic Clinic', vm:'LAISA-VM-01',
    live:true, agents:6, uptime:'99.7%', since:'June 2026',
    tagline:'Phase A — Agent OS + WhatsApp CRM + Booking',
    metrics:'R350K build + R55K/month · 247 beds',
    color:'#22c55e', bg:'#f0fdf4', border:'#bbf7d0',
    icon:'🏥', agent:'Dr. Musa + 6 AI Agents'
  },
  {
    id:'safe', name:'SafeSight Aesthetic Clinic', vm:'SAFE-VM-01',
    live:false, agents:3, uptime:'Demo', since:'June 2026',
    tagline:'Primary demo client — Agent OS showcase',
    metrics:'R1,499/month · Proposal pending',
    color:'#ec4899', bg:'#fdf2f8', border:'#fce7f3',
    icon:'🛡️', agent:'Demo Agent OS'
  },
  {
    id:'pharma', name:'Pharmasyntez Russia', vm:'PHARMA-VM-GLOBAL',
    live:true, agents:4, uptime:'98.2%', since:'Jan 2026',
    tagline:'Anti-TB, HIV, oncology distribution across Africa',
    metrics:'R2.99M Y1 pipeline · SAHPRA licensed',
    color:'#8b5cf6', bg:'#f5f3ff', border:'#ddd6fe',
    icon:'💊', agent:'Studex Global Markets Agent'
  },
  {
    id:'rt', name:'Red Team Agent', vm:'RT-VM-SENTINEL',
    live:true, agents:16, uptime:'24/7', since:'July 2026',
    tagline:'Autonomous pen testing + AI Trust Monitor',
    metrics:'R45K/month · 16 specialist agents',
    color:'#ef4444', bg:'#fef2f2', border:'#fecaca',
    icon:'🔴', agent:'16 Cybersecurity AI Agents'
  },
];

export const PRODUCTS = [
  {
    id:'laisa-os', name:'LAISA Agent OS', tagline:'AI Agent OS for Aesthetic Clinics',
    price:'R350K + R55K/month', color:'#22c55e', bg:'#f0fdf4', border:'#bbf7d0', icon:'🏥',
    features:['WhatsApp CRM + Booking','6 specialist AI agents','Dashboard + reporting','Email + social automation','Notion CRM integration','VoiceBox AI']
  },
  {
    id:'dark-factory', name:'Dark Factory BMAD', tagline:'Build Me A Dashboard — R29 per product',
    price:'R29 per product', color:'#22c55e', bg:'#f0fdf4', border:'#bbf7d0', icon:'🏭',
    features:['Voice note → PRD pipeline','CodeRabbit review every PR','Auto-deploy to Vercel','Multi-agent build team','48hr delivery','Dark Factory VM included']
  },
  {
    id:'red-team', name:'Red Team Agent', tagline:'Cybersecurity AI VM',
    price:'From R25K/month', color:'#ec4899', bg:'#fdf2f8', border:'#fce7f3', icon:'🛡️',
    features:['16 specialist AI agents','Autonomous pen testing','AI Trust Monitor','Purple Team loop','POPIA compliance','MITRE ATT\u0026CK mapped']
  },
  {
    id:'vm-base', name:'VM Base Package', tagline:'Your own isolated AI agent VM',
    price:'R599/month', color:'#0ea5e9', bg:'#f0f9ff', border:'#bae6fd', icon:'🖥️',
    features:['Isolated VM environment','Up to 6 AI agents','Dashboard access','WhatsApp integration','Email integration','24/7 uptime']
  },
];

export const ECOSYSTEM = [
  { n:'Studex Meat', s:'Premium Wagyu · 50+ restaurants', c:'#22c55e' },
  { n:'StudEx Enterprise', s:'Cloud FinOps · AWS + Google Partner', c:'#3b82f6' },
  { n:'StudEx Wild Life', s:'Blockchain conservation · IBM + Cardano', c:'#ec4899' },
  { n:'Dark Factory', s:'AI Agent Factory · CipherTr\u0040ce CEO', c:'#0f172a' },
];

export const TIMELINE = [
  { y:'2009', e:"McDonald's SA batch cooker, age 18" },
  { y:'2011', e:'Founded Studex Meat at age 20' },
  { y:'2016', e:'MSc International Business, Hult Business School' },
  { y:'2019', e:'AWS + Google Cloud partnerships signed' },
  { y:'2019', e:'IBM + Cardano wildlife blockchain confirmed (Forbes Africa)' },
  { y:'2020', e:"ITWeb: \"SA's First Son looks to cut cloud costs\"" },
  { y:'2020', e:'GQ SA: "Changing the nature of conservation"' },
  { y:'2024', e:'Eva Modika YouTube — 367K views' },
  { y:'2025', e:'Sputnik Africa: "Trade key to Russia-Africa Relations"' },
  { y:'2026', e:'Dark Factory + CipherTr\u0040ce CEO — fully operational' },
];
