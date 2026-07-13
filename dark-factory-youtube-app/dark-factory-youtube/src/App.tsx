import { useState, useEffect, useRef } from 'react'
import './styles.css'

const COUNTRIES = [
  {flag:"🇰🇪",name:"Kenya",region:"East Africa · Pop: 56M · Age: 20",tier:"tier-1",tierLabel:"TIER 1",scores:[{l:"AI Ecosystem",w:88,c:"green"},{l:"Payments",w:95,c:"green"},{l:"Political",w:70,c:"blue"},{l:"Speed-to-Scale",w:90,c:"green"},{l:"Young Pop.",w:85,c:"green"}],grade:"A"},
  {flag:"🇳🇬",name:"Nigeria",region:"West Africa · Pop: 230M · Age: 18",tier:"tier-1",tierLabel:"TIER 1",scores:[{l:"AI Ecosystem",w:82,c:"green"},{l:"Payments",w:88,c:"green"},{l:"Political",w:55,c:"orange"},{l:"Speed-to-Scale",w:85,c:"green"},{l:"Young Pop.",w:92,c:"green"}],grade:"A"},
  {flag:"🇷🇼",name:"Rwanda",region:"East Africa · Pop: 14M · Age: 19",tier:"tier-1",tierLabel:"TIER 1",scores:[{l:"AI Ecosystem",w:85,c:"green"},{l:"Payments",w:80,c:"green"},{l:"Political",w:88,c:"green"},{l:"Speed-to-Scale",w:82,c:"green"},{l:"Young Pop.",w:80,c:"green"}],grade:"A-"},
  {flag:"🇬🇭",name:"Ghana",region:"West Africa · Pop: 34M · Age: 21",tier:"tier-1",tierLabel:"TIER 1",scores:[{l:"AI Ecosystem",w:78,c:"blue"},{l:"Payments",w:84,c:"green"},{l:"Political",w:75,c:"blue"},{l:"Speed-to-Scale",w:80,c:"green"},{l:"Young Pop.",w:78,c:"green"}],grade:"A-"},
  {flag:"🇧🇷",name:"Brazil",region:"Latin America · Pop: 215M · Age: 34",tier:"tier-2",tierLabel:"TIER 2",scores:[{l:"AI Ecosystem",w:90,c:"green"},{l:"Payments",w:92,c:"green"},{l:"Political",w:60,c:"orange"},{l:"Speed-to-Scale",w:85,c:"green"},{l:"Young Pop.",w:60,c:"blue"}],grade:"B+"},
  {flag:"🇹🇭",name:"Thailand",region:"Southeast Asia · Pop: 71M · Age: 40",tier:"tier-2",tierLabel:"TIER 2",scores:[{l:"AI Ecosystem",w:84,c:"green"},{l:"Payments",w:88,c:"green"},{l:"Political",w:58,c:"orange"},{l:"Speed-to-Scale",w:75,c:"blue"},{l:"Young Pop.",w:48,c:"orange"}],grade:"B"},
  {flag:"🇲🇦",name:"Morocco",region:"North Africa · Pop: 37M · Age: 30",tier:"tier-2",tierLabel:"TIER 2",scores:[{l:"AI Ecosystem",w:72,c:"blue"},{l:"Payments",w:75,c:"blue"},{l:"Political",w:68,c:"blue"},{l:"Speed-to-Scale",w:72,c:"blue"},{l:"Young Pop.",w:65,c:"blue"}],grade:"B"},
  {flag:"🇨🇮",name:"Côte d'Ivoire",region:"West Africa · Pop: 31M · Age: 19",tier:"tier-2",tierLabel:"TIER 2",scores:[{l:"AI Ecosystem",w:65,c:"blue"},{l:"Payments",w:70,c:"blue"},{l:"Political",w:55,c:"orange"},{l:"Speed-to-Scale",w:72,c:"blue"},{l:"Young Pop.",w:88,c:"green"}],grade:"B"},
  {flag:"🇹🇳",name:"Tunisia",region:"North Africa · Pop: 12M · Age: 32",tier:"tier-2",tierLabel:"TIER 2",scores:[{l:"AI Ecosystem",w:68,c:"blue"},{l:"Payments",w:70,c:"blue"},{l:"Political",w:50,c:"orange"},{l:"Speed-to-Scale",w:68,c:"blue"},{l:"Young Pop.",w:60,c:"blue"}],grade:"B"},
  {flag:"🇺🇬",name:"Uganda",region:"East Africa · Pop: 49M · Age: 16",tier:"tier-2",tierLabel:"TIER 2",scores:[{l:"AI Ecosystem",w:62,c:"blue"},{l:"Payments",w:68,c:"blue"},{l:"Political",w:58,c:"orange"},{l:"Speed-to-Scale",w:72,c:"blue"},{l:"Young Pop.",w:90,c:"green"}],grade:"B-"},
  {flag:"🇧🇼",name:"Botswana",region:"Southern Africa · Pop: 2.6M · Age: 25",tier:"tier-2",tierLabel:"TIER 2",scores:[{l:"AI Ecosystem",w:70,c:"blue"},{l:"Payments",w:80,c:"green"},{l:"Political",w:85,c:"green"},{l:"Speed-to-Scale",w:65,c:"blue"},{l:"Young Pop.",w:62,c:"blue"}],grade:"B"},
  {flag:"🇹🇿",name:"Tanzania",region:"East Africa · Pop: 68M · Age: 17",tier:"tier-3",tierLabel:"TIER 3",scores:[{l:"AI Ecosystem",w:58,c:"blue"},{l:"Payments",w:62,c:"blue"},{l:"Political",w:65,c:"blue"},{l:"Speed-to-Scale",w:65,c:"blue"},{l:"Young Pop.",w:92,c:"green"}],grade:"C+"},
  {flag:"🇿🇼",name:"Zimbabwe",region:"Southern Africa · Pop: 17M · Age: 18",tier:"tier-3",tierLabel:"TIER 3",scores:[{l:"AI Ecosystem",w:52,c:"orange"},{l:"Payments",w:55,c:"orange"},{l:"Political",w:38,c:"red"},{l:"Speed-to-Scale",w:55,c:"orange"},{l:"Young Pop.",w:85,c:"green"}],grade:"C"},
  {flag:"🇲🇿",name:"Mozambique",region:"Southern Africa · Pop: 33M · Age: 17",tier:"tier-3",tierLabel:"TIER 3",scores:[{l:"AI Ecosystem",w:50,c:"orange"},{l:"Payments",w:58,c:"orange"},{l:"Political",w:48,c:"orange"},{l:"Speed-to-Scale",w:58,c:"orange"},{l:"Young Pop.",w:90,c:"green"}],grade:"C"},
  {flag:"🇸🇿",name:"Eswatini",region:"Southern Africa · Pop: 1.2M · Age: 20",tier:"tier-3",tierLabel:"TIER 3",scores:[{l:"AI Ecosystem",w:52,c:"orange"},{l:"Payments",w:62,c:"blue"},{l:"Political",w:58,c:"orange"},{l:"Speed-to-Scale",w:52,c:"orange"},{l:"Young Pop.",w:78,c:"green"}],grade:"C"},
  {flag:"🇲🇼",name:"Malawi",region:"Southern Africa · Pop: 21M · Age: 17",tier:"tier-3",tierLabel:"TIER 3",scores:[{l:"AI Ecosystem",w:48,c:"orange"},{l:"Payments",w:55,c:"orange"},{l:"Political",w:52,c:"orange"},{l:"Speed-to-Scale",w:55,c:"orange"},{l:"Young Pop.",w:92,c:"green"}],grade:"C"},
  {flag:"🇬🇳",name:"Guinea",region:"West Africa · Pop: 14M · Age: 18",tier:"tier-3",tierLabel:"TIER 3",scores:[{l:"AI Ecosystem",w:50,c:"orange"},{l:"Payments",w:55,c:"orange"},{l:"Political",w:48,c:"orange"},{l:"Speed-to-Scale",w:52,c:"orange"},{l:"Young Pop.",w:88,c:"green"}],grade:"C"},
  {flag:"🇸🇩",name:"Sudan",region:"East Africa · Pop: 50M · Age: 18",tier:"tier-4",tierLabel:"TIER 4",scores:[{l:"AI Ecosystem",w:42,c:"orange"},{l:"Payments",w:45,c:"orange"},{l:"Political",w:25,c:"red"},{l:"Speed-to-Scale",w:42,c:"orange"},{l:"Young Pop.",w:88,c:"green"}],grade:"D"},
  {flag:"🇨🇩",name:"DRC",region:"Central Africa · Pop: 105M · Age: 17",tier:"tier-4",tierLabel:"TIER 4",scores:[{l:"AI Ecosystem",w:40,c:"orange"},{l:"Payments",w:42,c:"orange"},{l:"Political",w:28,c:"red"},{l:"Speed-to-Scale",w:40,c:"orange"},{l:"Young Pop.",w:92,c:"green"}],grade:"D"},
  {flag:"🇹🇩",name:"Chad",region:"Central Africa · Pop: 18M · Age: 16",tier:"tier-4",tierLabel:"TIER 4",scores:[{l:"AI Ecosystem",w:38,c:"orange"},{l:"Payments",w:40,c:"orange"},{l:"Political",w:25,c:"red"},{l:"Speed-to-Scale",w:38,c:"orange"},{l:"Young Pop.",w:90,c:"green"}],grade:"D"},
  {flag:"🇬🇼",name:"Guinea-Bissau",region:"West Africa · Pop: 2M · Age: 19",tier:"tier-4",tierLabel:"TIER 4",scores:[{l:"AI Ecosystem",w:42,c:"orange"},{l:"Payments",w:48,c:"orange"},{l:"Political",w:45,c:"orange"},{l:"Speed-to-Scale",w:45,c:"orange"},{l:"Young Pop.",w:85,c:"green"}],grade:"D"},
  {flag:"🇨🇫",name:"Cent. Afr. Rep.",region:"Central Africa · Pop: 6M · Age: 17",tier:"tier-4",tierLabel:"TIER 4",scores:[{l:"AI Ecosystem",w:35,c:"red"},{l:"Payments",w:38,c:"red"},{l:"Political",w:18,c:"red"},{l:"Speed-to-Scale",w:35,c:"orange"},{l:"Young Pop.",w:88,c:"green"}],grade:"D"},
  {flag:"🇻🇪",name:"Venezuela",region:"South America · Pop: 28M · Age: 28",tier:"tier-4",tierLabel:"TIER 4",scores:[{l:"AI Ecosystem",w:40,c:"orange"},{l:"Payments",w:38,c:"red"},{l:"Political",w:22,c:"red"},{l:"Speed-to-Scale",w:40,c:"orange"},{l:"Young Pop.",w:72,c:"blue"}],grade:"D"},
]

const TECH = [
  {title:"AI MODELS",color:"#00ff88",items:[{n:"GPT-5 (OpenAI)",d:"Autonomous coding agents, enterprise workflows"},{n:"Claude 4.5 (Anthropic)",d:"Long-running agents, Constitutional AI safety"},{n:"DeepSeek R1",d:"Open-weight, POPIA-compliant local inference"},{n:"Qwen 2.5 Max",d:"Multimodal, open-weight, African language tuning"},{n:"Gemini 2.0 (Google)",d:"Multi-modal, context window, YouTube pipeline"},{n:"EqualyzAI",d:"Voice-first agentic AI, African languages"}]},
  {title:"PAYMENTS (AFRICA)",color:"#ffd700",items:[{n:"Flutterwave",d:"Banking licence Apr 2026, cross-border SA/USD"},{n:"Paystack",d:"SA-focused, Paystack Commerce"},{n:"Yoco",d:"South Africa point-of-sale + online"},{n:"Peach Payments",d:"SA e-commerce gateway"},{n:"M-Pesa",d:"Kenya, Tanzania, DRC, 60M+ users"},{n:"Mono",d:"Nigeria: financial data + payments"}]},
  {title:"RESEARCH & INTEL",color:"#4fc3f7",items:[{n:"last30days-skill",d:"10-platform real-time research agent"},{n:"OGRE Midnight Build",d:"3AM SA daily brief, 9 countries"},{n:"NotebookLM",d:"Source-grounded research, citation-backed"},{n:"Brave Search API",d:"Privacy-first search for agents"},{n:"Jina AI",d:"Web scraping + content extraction"},{n:"News24 + IOL",d:"SA + Africa news monitoring"}]},
  {title:"AGENT STACK",color:"#ff8c42",items:[{n:"OpenClaw (MaxClaw)",d:"Multi-agent orchestrator, 6 agent fleet"},{n:"n8n (self-hosted)",d:"Workflow automation, 400+ integrations"},{n:"CashClaw",d:"13 freelance service skills, HYRVE AI"},{n:"QwenPaw",d:"Local multi-agent coding, free"},{n:"VoiceBox / ElevenLabs",d:"Voice cloning, STT, TTS"},{n:"Obsidian",d:"Long-term memory, second brain"}]},
  {title:"CONTENT & SOCIAL",color:"#b388ff",items:[{n:"YouTube",d:"Studex Wildlife — long-form AI content"},{n:"TikTok",d:"@studexwildlife — short clips, reels"},{n:"Instagram",d:"@laisa_aesthetics — visuals, stories"},{n:"LinkedIn",d:"Thought leadership, B2B outreach"},{n:"Facebook",d:"Tumelo Ramaphosa, community"},{n:"Threads / X",d:"Real-time engagement, threads"}]},
  {title:"INFRASTRUCTURE",color:"#00ff88",items:[{n:"ORGO VM (orgo.ai)",d:"D@RK F@C#ORY, 8 VMs, VNC access"},{n:"Vercel",d:"Frontend deployment, CDN"},{n:"GitHub",d:"Code, Actions, deployment triggers"},{n:"Docker",d:"Containerised agents, reproducible builds"},{n:"Cloudflare",d:"DNS, CDN, DDoS protection"},{n:"NotebookLM API",d:"Gemini-backed research layer"}]},
]

const PRODUCTS = [
  {title:"Starter Voice Agent",price:"R2,500",period:"/month",tag:"TIER 1 MARKETS",color:"#00ff88",features:["1 AI voice agent (Swahili, Yoruba, French, Portuguese)","WhatsApp + phone channel","Auto invoice generation","Daily market brief to client","5GB research data","Email support","Flutterwave billing"]},
  {title:"Growth Voice Agent",price:"R5,500",period:"/month",tag:"SCALE UP",color:"#ffd700",features:["3 AI voice agents (all Tier 1+2 languages)","WhatsApp + Telegram + Email","CRM auto-update + lead scoring","Real-time competitor monitoring","Daily brief + weekly market report","Multi-country payment integration","Priority support + strategy calls"]},
  {title:"Enterprise Voice Agent",price:"R12,000",period:"/month",tag:"FULL STACK",color:"#4fc3f7",features:["Unlimited AI voice agents","Custom languages + dialects","White-label (your brand, your clients)","All 18 country market data feeds","API access + webhook integrations","Dedicated account manager","SOC2-ready infrastructure"]},
]

const PIPELINE = [
  {n:"01",c:"#00ff88",t:"3AM — OGRE Midnight Build Research",d:"OGRE-3AM-NAI agent scans 9 countries across AI ecosystems. Writes to /workspace/OGRE-Midnight-Build/RESEARCH-YYYY-MM-DD.md."},
  {n:"02",c:"#00ff88",t:"6AM — Morning Brief Compilation",d:"Cipher Tr@ce reads midnight build output. Compiles top 5 insights per tier. Feeds into NotebookLM."},
  {n:"03",c:"#ffd700",t:"8AM SA — Email to Stakeholders",d:"Morning brief sent via Gmail SMTP (when credentials configured). Key insights from overnight research."},
  {n:"04",c:"#ffd700",t:"9AM SA — NotebookLM Brief",d:"Research uploaded to NotebookLM. Gemini generates source-grounded answers: top 3 AI opportunities per country."},
  {n:"05",c:"#4fc3f7",t:"10AM SA — YouTube Script Generation",d:"Agent reads NotebookLM answers. Generates 1,500-2,000 word script: hook (30s) + overview + demo + CTA."},
  {n:"06",c:"#4fc3f7",t:"11AM SA — Voice Agent Recording",d:"Script fed to VoiceBox/ElevenLabs. Cipher Tr@ce voice clone narrates. MP3/MP4 output. EqualyzAI for African languages."},
  {n:"07",c:"#b388ff",t:"12PM SA — Video Assembly & Publish",d:"MP3 + stock footage + Canvas 2D animations → video. Published to YouTube — Studex Wildlife."},
  {n:"08",c:"#b388ff",t:"1PM SA — Cross-Platform Distribution",d:"Same content reformatted: TikTok (60s), LinkedIn (carousel), Instagram, Facebook, Threads. Scheduled via n8n."},
  {n:"09",c:"#ff8c42",t:"6PM SA — Engagement & Outreach",d:"Agent monitors comments, DMs, LinkedIn. Responds to Tier 1 leads. Flags warm prospects to Tumelo."},
  {n:"10",c:"#ff8c42",t:"8PM SA — Evening Digest",d:"Evening digest: what shipped today, pipeline stats, tomorrow's priority countries."},
]

const TIMELINE = [
  {d:"28 JUN 2026",t:"Day 0 — Plan Live",p:"This plan deployed. Midnight build running. YouTube pipeline activated.",active:true},
  {d:"29 JUN — 5 JUL",t:"Week 1 — TIER 1 Focus",p:"Nigeria + Kenya + Rwanda deep dive. First 3 YouTube videos. Flutterwave integration. NotebookLM wired.",active:false},
  {d:"6 — 20 JUL",t:"Week 2-3 — TIER 2 Launch",p:"Brazil + Thailand + Ghana videos. Voice agent demo recording. First client demo call scheduled.",active:false},
  {d:"21 JUL — 10 AUG",t:"Month 2 — Scale TIER 1+2",p:"Morocco, Tunisia, Côte d'Ivoire, Botswana, Uganda. WhatsApp onboarding live. First paying client.",active:false},
  {d:"11 — 31 AUG",t:"Month 3 — TIER 3 Expansion",p:"Tanzania, Zimbabwe, Mozambique, Eswatini, Malawi, Guinea. Full content calendar operational.",active:false},
  {d:"1 — 30 SEP",t:"Month 4 — MONITOR MARKETS",p:"Sudan, Chad, DRC, CAR, Venezuela. Automated reports only. Watch list for 2027.",active:false},
  {d:"OCT 2026",t:"Q4 — Enterprise Deals",p:"White-label product finalized. R12K/month enterprise tier. 3 pilots. Annual contracts offered.",active:false},
]

const POSTS = [
  {p:"YouTube",f:"Long-form video",fq:"3x/week",c:"AI market deep-dive + demo + CTA",b:"Thought leadership, search traffic, evergreen content",col:"#FF0000",em:"📺"},
  {p:"TikTok",f:"60-90s clip",fq:"5x/week",c:"Highlight reel of main video + trending sounds",b:"Viral reach, Gen Z audience",col:"#ff0050",em:"🎵"},
  {p:"Instagram Reels",f:"30-60s video",fq:"5x/week",c:"Short clips + carousel posts with stats",b:"Visual demos, aesthetic brand building",col:"#E1306C",em:"📸"},
  {p:"LinkedIn",f:"Carousel + post",fq:"3x/week",c:"Market insights, case studies, company updates",b:"B2B leads, enterprise outreach",col:"#0A66C2",em:"💼"},
  {p:"Facebook",f:"Post + live",fq:"Daily",c:"Briefs, meme content, community engagement",b:"Community building, African market penetration",col:"#1877F2",em:"📘"},
  {p:"Threads / X",f:"Thread + tweet",fq:"3x/day",c:"Real-time insights, news commentary, links",b:"Thought leadership, newsjacking",col:"#1D9BF0",em:"🧵"},
]

const TIERS = [
  {tier:"TIER 1 — EASIEST",color:"#00ff88",timing:"NOW",countries:[{f:"🇰🇪",n:"Kenya",d:"M-Pesa, 37.9M mobile money users. Flutterwave native. AI startup density highest in Africa."},{f:"🇳🇬",n:"Nigeria",d:"Flutterwave ($3B val), Interswitch, Opay. 230M people, largest market in Africa."},{f:"🇷🇼",n:"Rwanda",d:"$250M AI strategy. Government-backed. Most politically stable in Africa."},{f:"🇬🇭",n:"Ghana",d:"$250M national AI strategy. Strong fintech. Mobile money growing fast."}]},
  {tier:"TIER 2 — FAST MOVE",color:"#4fc3f7",timing:"Q3 2026",countries:[{f:"🇧🇷",n:"Brazil",d:"869 AI startups, $1B+ funding. Fintech leads LatAm. 14.9% CAGR to 2034."},{f:"🇹🇭",n:"Thailand",d:"Digital economy $50B target 2025. 2,100+ startups. 7.3% growth."},{f:"🇲🇦",n:"Morocco",d:"Fastest growing startup ecosystem in North Africa. EU proximity."},{f:"🇨🇮",n:"Côte d'Ivoire",d:"Largest Francophone fintech hub. Young population. Mobile-first."},{f:"🇹🇳",n:"Tunisia",d:"Strong STEM education. AI research output growing."},{f:"🇺🇬",n:"Uganda",d:"Mobile money penetration. Young median age 16. Fast adopter market."},{f:"🇧🇼",n:"Botswana",d:"High income country. Stable government. Gateway to SADC."}]},
  {tier:"TIER 3 — BUILD PRESENCE",color:"#ff8c42",timing:"Q4 2026",countries:[{f:"🇹🇿",n:"Tanzania",d:"Instant Payment System linking Rwanda/Tanzania. DPs in progress."},{f:"🇿🇼",n:"Zimbabwe",d:"Ecocash dominant. USD hyperinflation. AI = efficiency tool."},{f:"🇲🇿",n:"Mozambique",d:"Off-grid energy + AI combo. Large youth population."},{f:"🇸🇿",n:"Eswatini",d:"Small market. Gateway to SACU. Stable."},{f:"🇲🇼",n:"Malawi",d:"Agriculture AI opportunity. Mobile coverage expanding."},{f:"🇬🇳",n:"Guinea",d:"Francophone West Africa. Mining sector AI demand."}]},
  {tier:"TIER 4 — MONITOR",color:"#ff4455",timing:"2027+",countries:[{f:"🇸🇩",n:"Sudan",d:"Conflict zone. Humanitarian AI use cases. Long-term play only."},{f:"🇨🇩",n:"DRC",d:"Huge population. Instability. NGO + mining AI use cases."},{f:"🇹🇩",n:"Chad",d:"Highest youth ratio. Oil + AI opportunity for future."},{f:"🇬🇼",n:"Guinea-Bissau",d:"Cashew export economy. Very small. Partner via Senegal."},{f:"🇨🇫",n:"Cent. Afr. Rep.",d:"Humanitarian. Diamond/gold mining AI. NGO partnerships."},{f:"🇻🇪",n:"Venezuela",d:"Crisis market. Crypto adoption high. AI for diaspora."}]},
]

const AGENTS_L = [{i:"🎙️",t:"STUDENT",d:"Voice input, natural language query"},{i:"🧠",t:"Cipher Tr@ce",d:"CEO supervisor, routes request"},{i:"🔍",t:"Research Agent",d:"Scans midnight build, NotebookLM"},{i:"📊",t:"Market Analyst",d:"Scores countries, segments tiers"},{i:"✍️",t:"Script Writer",d:"Generates YouTube script"},{i:"🎬",t:"Video Assembler",d:"Compiles video + voice"}]
const AGENTS_R = [{i:"🌍",t:"Distribution Agent",d:"Posts to YouTube, TikTok, LinkedIn"},{i:"💬",t:"Engagement Agent",d:"Monitors comments, DMs"},{i:"📧",t:"Email Agent",d:"Sends briefs, digests, invoices"},{i:"💰",t:"Finance Agent",d:"Flutterwave, invoice tracking"},{i:"📈",t:"Analytics Agent",d:"Reports, ROI, conversion tracking"},{i:"🏁",t:"Handoff Agent",d:"Flags warm leads to Tumelo"}]

function gradeCls(g: string) { return g.startsWith("A") ? "s-a" : g.startsWith("B") ? "s-b" : g.startsWith("C") ? "s-c" : "s-d" }

function CanvasChart() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current
    if (!c) return
    const ctx = c.getContext('2d')
    if (!ctx) return
    const W = c.width = c.parentElement!.clientWidth; const H = 400
    const pads = {t:30,r:30,b:50,l:60}
    const pw = W-pads.l-pads.r; const ph = H-pads.t-pads.b
    ctx.clearRect(0,0,W,H)
    ctx.strokeStyle='rgba(30,30,58,0.8)'; ctx.lineWidth=1
    for(let i=0;i<=5;i++){const y=pads.t+(ph/5)*i; ctx.beginPath();ctx.moveTo(pads.l,y);ctx.lineTo(W-pads.r,y);ctx.stroke();ctx.fillStyle='#7a7a9a';ctx.font='11px JetBrains Mono,monospace';ctx.fillText(String(Math.round(100-i*20)),pads.l-8,y+4)}
    for(let i=0;i<=5;i++){const x=pads.l+(pw/5)*i;ctx.beginPath();ctx.moveTo(x,pads.t);ctx.lineTo(x,H-pads.b);ctx.stroke();ctx.fillStyle='#7a7a9a';ctx.font='11px JetBrains Mono,monospace';ctx.fillText(String(i*20),x-4,H-pads.b+15)}
    ctx.fillStyle='#7a7a9a';ctx.font='12px Space Grotesk,sans-serif';ctx.fillText('AI Readiness Score \u2192',W/2-60,H-6)
    ctx.save();ctx.translate(14,H/2+40);ctx.rotate(-Math.PI/2);ctx.fillText('Youth Population % \u2192',0,0);ctx.restore()
    const data:[string,number,number,number,string][]=[["Kenya",88,85,56,"#00ff88"],["Nigeria",82,92,230,"#00ff88"],["Rwanda",85,80,14,"#00ff88"],["Ghana",78,78,34,"#00ff88"],["Brazil",90,60,215,"#4fc3f7"],["Thailand",84,48,71,"#4fc3f7"],["Morocco",72,65,37,"#4fc3f7"],["Cote dIvoire",65,88,31,"#4fc3f7"],["Tunisia",68,60,12,"#4fc3f7"],["Uganda",62,90,49,"#4fc3f7"],["Botswana",70,62,2.6,"#4fc3f7"],["Tanzania",58,92,68,"#ff8c42"],["Zimbabwe",52,85,17,"#ff8c42"],["Mozambique",50,90,33,"#ff8c42"],["Eswatini",52,78,1.2,"#ff8c42"],["Malawi",48,92,21,"#ff8c42"],["Guinea",50,88,14,"#ff8c42"],["Sudan",42,88,50,"#ff4455"],["DRC",40,92,105,"#ff4455"],["Chad",38,90,18,"#ff4455"],["Guinea-Bissau",42,85,2,"#ff4455"],["CAR",35,88,6,"#ff4455"],["Venezuela",40,72,28,"#ff4455"]]
    data.forEach(([n,r,y,p,col])=>{const px=pads.l+(r/100)*pw;const py=pads.t+((100-y)/100)*ph;const rad=Math.max(6,Math.min(28,Math.sqrt(p)*1.1));ctx.beginPath();ctx.arc(px,py,rad+3,0,Math.PI*2);ctx.fillStyle=col+'1a';ctx.fill();ctx.beginPath();ctx.arc(px,py,rad,0,Math.PI*2);ctx.fillStyle=col+'33';ctx.fill();ctx.strokeStyle=col;ctx.lineWidth=1.5;ctx.stroke();ctx.fillStyle=col;ctx.font='9px Space Grotesk,sans-serif';ctx.textAlign='center';ctx.fillText(n.slice(0,8),px,py+rad+12);ctx.textAlign='left'})
  }, [])
  return <canvas ref={ref} style={{width:'100%',maxHeight:420}}/>
}

export default function App() {
  const [filter, setFilter] = useState('all')
  const shown = filter === 'all' ? COUNTRIES : COUNTRIES.filter(c => c.tier === filter)

  return (
    <>
    <nav>
      <div className="logo">🏭 DARK <span>FACTORY</span></div>
      <a href="#markets">Markets</a><a href="#readiness">Readiness</a><a href="#partners">Tech Stack</a>
      <a href="#tiers">Tiers</a><a href="#product">Product</a><a href="#pipeline">Pipeline</a>
      <a href="#schedule">Schedule</a><a href="#agent">Voice Agent</a>
      <span className="badge">v1.0 LIVE</span>
    </nav>

    <div className="hero">
      <div className="tag mono">// 28 JUNE 2026 — STRATEGIC PLAN</div>
      <h1><span className="g">Dark Factory</span> Global AI<br/><span className="y">YouTube &amp; 18-Country Pipeline</span></h1>
      <p>Complete go-to-market plan: 18 countries, 6 platforms, one AI voice agent product, automated midnight-build research-to-content pipeline. Cipher Tr@ce, CEO.</p>
      <div className="channels">
        <div className="ch active">📺 YouTube — Studex Wildlife</div>
        <div className="ch active">📘 Facebook</div>
        <div className="ch active">📸 Instagram</div>
        <div className="ch active">💼 LinkedIn</div>
        <div className="ch active">🎵 TikTok</div>
        <div className="ch active">🧵 Threads</div>
      </div>
    </div>

    <section id="markets">
      <div className="stats-row">
        <div className="stat-box"><div className="val">18</div><div className="lab">Target Countries</div></div>
        <div className="stat-box"><div className="val">6</div><div className="lab">Active Platforms</div></div>
        <div className="stat-box"><div className="val">4</div><div className="lab">Market Tiers</div></div>
        <div className="stat-box"><div className="val">1</div><div className="lab">Voice Product</div></div>
      </div>
      <div className="notice">
        <strong>⏰ Midnight Build Integration:</strong> Each night at 10pm SA, OGRE-3AM scans 9 global AI ecosystems and writes to <span className="mono">/workspace/OGRE-Midnight-Build/</span>. That output feeds this pipeline — auto-generating YouTube scripts, country briefs, and product briefs per tier.
      </div>
      <div className="section-tag">// MARKETS</div>
      <div className="section-title">18-Country Market Cards</div>
      <div className="section-sub">Scored: Political Risk · Payment Readiness · Speed-to-Scale · AI Ecosystem · Young Population</div>
      <div style={{display:'flex',gap:'0.5rem',flexWrap:'wrap',marginBottom:'1.5rem'}}>
        {(['all','tier-1','tier-2','tier-3','tier-4'] as const).map(t => (
          <button key={t} className={`sel-btn ${filter===t?'active':''}`} onClick={()=>setFilter(t)}>
            {t==='all'?'All 18':t==='tier-1'?'Tier 1: Easiest':t==='tier-2'?'Tier 2: Fast Move':t==='tier-3'?'Tier 3: Build':t==='tier-4'?'Tier 4: Monitor':t}
          </button>
        ))}
      </div>
      <div className="country-grid">
        {shown.map(c => (
          <div key={c.name} className="card">
            <div className={`tier-badge ${c.tier}`}>{c.tierLabel}</div>
            <div className="flag">{c.flag}</div><div className="name">{c.name}</div>
            <div className="region">{c.region}</div>
            {c.scores.map(s => (
              <div key={s.l} className="score-bar">
                <span className="label">{s.l}</span>
                <div className="bar"><div className={`fill fill-${s.c}`} style={{width:`${s.w}%`}}></div></div>
              </div>
            ))}
            <div className="overall-score">
              <span className="mono" style={{fontSize:'0.7rem',color:'var(--muted)'}}>SCORE</span>
              <span className={`num ${gradeCls(c.grade)}`}>{c.grade}</span>
            </div>
          </div>
        ))}
      </div>
    </section>

    <section id="readiness">
      <div className="section-tag">// READINESS DIAGRAM</div>
      <div className="section-title">Market Readiness vs. Youth Population</div>
      <div className="section-sub">X-axis = AI Readiness Score · Y-axis = Youth Population % · Bubble size = Total population</div>
      <div className="canvas-wrap"><CanvasChart /></div>
      <div style={{display:'flex',gap:'1.5rem',marginTop:'1rem',flexWrap:'wrap'}}>
        {([['#00ff88','Tier 1 — Easiest'],['#4fc3f7','Tier 2 — Fast Move'],['#ff8c42','Tier 3 — Build Presence'],['#ff4455','Tier 4 — Monitor']] as const).map(([c,l]) => (
          <div key={l} style={{display:'flex',alignItems:'center',gap:'0.5rem',fontSize:'0.78rem',color:'var(--muted)'}}>
            <div style={{width:10,height:10,borderRadius:'50%',background:c as string}}></div>{l}
          </div>
        ))}
      </div>
    </section>

    <section id="partners">
      <div className="section-tag">// TECH STACK</div>
      <div className="section-title">Technology Partners &amp; Players</div>
      <div className="section-sub">Who is operating in these markets — and how we integrate</div>
      <div className="tech-stack">
        {TECH.map(s => (
          <div key={s.title} className="tech-card">
            <h4 style={{color:s.color}}>{s.title}</h4>
            {s.items.map(i => (
              <div key={i.n} className="tech-item">
                <div className="tech-dot" style={{background:s.color}}></div>
                <div><div className="node-name" style={{fontSize:'0.83rem'}}>{i.n}</div><div className="node-desc" style={{fontSize:'0.72rem'}}>{i.d}</div></div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>

    <section id="tiers">
      <div className="section-tag">// EXECUTION TIERS</div>
      <div className="section-title">4-Tier Market Penetration Plan</div>
      <div className="section-sub">Ranked by: Political Risk · Payment Readiness · Speed-to-Scale · AI Ecosystem · Young Population</div>
      <table className="tier-table">
        <thead><tr><th></th><th>Country</th><th>Key Tech Players &amp; Notes</th><th>Entry</th><th>Timeline</th></tr></thead>
        <tbody>
          {TIERS.map(tier => (
            <>
              <tr key={tier.tier} style={{borderLeft:`4px solid ${tier.color}`}}>
                <td colSpan={5} style={{background:'var(--bg3)',padding:'0.65rem 1rem',fontWeight:700,fontSize:'0.75rem',letterSpacing:'2px',textTransform:'uppercase',color:tier.color}}>
                  {tier.tier} — <span style={{fontWeight:400,textTransform:'none',fontSize:'0.7rem',color:'var(--muted)'}}>Start: {tier.timing}</span>
                </td>
              </tr>
              {tier.countries.map(c => (
                <tr key={c.n}>
                  <td className="flag-cell">{c.f}</td>
                  <td className="country-cell">{c.n}</td>
                  <td style={{fontSize:'0.8rem',color:'var(--muted)',maxWidth:320}}>{c.d}</td>
                  <td><span className="freq-badge freq-w">{tier.timing}</span></td>
                  <td className="score-cell" style={{color:tier.color}}>{tier.timing === 'NOW' ? 'Active' : tier.timing}</td>
                </tr>
              ))}
            </>
          ))}
        </tbody>
      </table>
    </section>

    <section id="product">
      <div className="section-tag">// VOICE AGENT PRODUCT</div>
      <div className="section-title">What We Sell — AI Voice Agent</div>
      <div className="section-sub">An AI voice agent that researches a country, writes a brief, and presents it — 100% automated. Tumelo presents the demo. The agent handles the rest.</div>
      <div className="product-grid">
        {PRODUCTS.map(p => (
          <div key={p.title} className="product-card">
            <div className="tag" style={{color:p.color,background:p.color+'22'}}>{p.tag}</div>
            <h3>{p.title}</h3>
            <div className="price" style={{color:p.color}}>{p.price}<span>{p.period}</span></div>
            <ul>{p.features.map(f => <li key={f}>{f}</li>)}</ul>
          </div>
        ))}
      </div>
      <div className="big-cta">
        <h2>🎙️ 30-Minute Demo: "AI Voice Agent for [Country] Market"</h2>
        <p>Tumelo presents live — agent researches Nigeria, writes brief, voices it, delivers to WhatsApp. Agent then presents in French. Full sell in one call.</p>
      </div>
    </section>

    <section id="pipeline">
      <div className="section-tag">// PIPELINE</div>
      <div className="section-title">Midnight Build → YouTube Pipeline</div>
      <div className="section-sub">10-step automated flow: 3AM research → 12PM video live on all platforms</div>
      <div className="pipeline">
        {PIPELINE.map((step, i) => (
          <div key={step.n}>
            {i > 0 && <div className="pipe-connector"></div>}
            <div className="pipe-step">
              <div className="num" style={{background:step.c+'22',color:step.c,border:'2px solid '+step.c}}>{step.n}</div>
              <div className="content">
                <h4 style={{color:step.c}}>{step.t}</h4>
                <p>{step.d}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>

    <section id="schedule">
      <div className="section-tag">// POSTING SCHEDULE</div>
      <div className="section-title">6-Platform Posting Matrix</div>
      <div className="section-sub">Each piece of content repurposed 6x — one research output, maximum reach</div>
      <div style={{overflowX:'auto'}}>
        <table className="matrix-table">
          <thead><tr><th>Platform</th><th>Format</th><th>Frequency</th><th>Content</th><th>Best For</th></tr></thead>
          <tbody>
            {POSTS.map(p => (
              <tr key={p.p}>
                <td><span style={{fontSize:'1.1rem'}}>{p.em}</span> <strong>{p.p}</strong></td>
                <td>{p.f}</td>
                <td><span className="freq-badge freq-d">{p.fq}</span></td>
                <td style={{fontSize:'0.78rem',color:'var(--muted)'}}>{p.c}</td>
                <td style={{fontSize:'0.78rem',color:'var(--muted)'}}>{p.b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{marginTop:'2rem'}}>
        <div className="section-tag">// EXECUTION TIMELINE</div>
        <div className="section-title">Roadmap: Now → Q4 2026</div>
        <div className="timeline">
          {TIMELINE.map(item => (
            <div key={item.d} className={`tl-item ${item.active ? 'active' : ''}`}>
              <div className="date">{item.d}</div>
              <h4>{item.t}</h4>
              <p>{item.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section id="agent">
      <div className="section-tag">// VOICE AGENT ARCHITECTURE</div>
      <div className="section-title">The 12-Agent Fleet</div>
      <div className="section-sub">From voice input to YouTube published to Flutterwave invoiced — fully autonomous</div>
      <div className="agent-arch">
        <div className="arch-box">
          <h4>🎙️ Input + Intelligence Layer</h4>
          {AGENTS_L.map(a => (
            <div key={a.t} className="node">
              <div className="node-icon ni-green">{a.i}</div>
              <div><div className="node-name">{a.t}</div><div className="node-desc">{a.d}</div></div>
            </div>
          ))}
        </div>
        <div className="arch-box">
          <h4>💰 Output + Delivery Layer</h4>
          {AGENTS_R.map(a => (
            <div key={a.t} className="node">
              <div className="node-icon ni-gold">{a.i}</div>
              <div><div className="node-name">{a.t}</div><div className="node-desc">{a.d}</div></div>
            </div>
          ))}
        </div>
      </div>
      <div className="big-cta">
        <h2>🔊 VoiceBox Integration</h2>
        <p>Cipher Tr@ce voice cloned via VoiceBox or ElevenLabs. Agent presents the 30-minute demo in English. Switch to French (Côte d'Ivoire), Portuguese (Brazil), Swahili (Kenya/Tanzania), Yoruba (Nigeria) with one API call.</p>
      </div>
    </section>

    <footer>
      Dark Factory · Built by Cipher Tr@ce · <span>Studex Group</span> · 28 June 2026<br/>
      Midnight Build: /workspace/OGRE-Midnight-Build/ · Pipeline: automated · 6 platforms · 18 countries
    </footer>
    </>
  )
}
