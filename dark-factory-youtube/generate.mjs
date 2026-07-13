// Dark Factory — Full HTML Generator for YouTube Pipeline Plan
import { writeFileSync } from 'fs';

// Country data
const countries = [
  {flag:"🇰🇪",name:"Kenya",region:"East Africa · Pop: 56M · Age: 20",tier:"tier-1",tierLabel:"TIER 1",scores:[{label:"AI Ecosystem",w:88,color:"green"},{label:"Payments",w:95,color:"green"},{label:"Political",w:70,color:"blue"},{label:"Speed-to-Scale",w:90,color:"green"},{label:"Young Pop.",w:85,color:"green"}],grade:"A"},
  {flag:"🇳🇬",name:"Nigeria",region:"West Africa · Pop: 230M · Age: 18",tier:"tier-1",tierLabel:"TIER 1",scores:[{label:"AI Ecosystem",w:82,color:"green"},{label:"Payments",w:88,color:"green"},{label:"Political",w:55,color:"orange"},{label:"Speed-to-Scale",w:85,color:"green"},{label:"Young Pop.",w:92,color:"green"}],grade:"A"},
  {flag:"🇷🇼",name:"Rwanda",region:"East Africa · Pop: 14M · Age: 19",tier:"tier-1",tierLabel:"TIER 1",scores:[{label:"AI Ecosystem",w:85,color:"green"},{label:"Payments",w:80,color:"green"},{label:"Political",w:88,color:"green"},{label:"Speed-to-Scale",w:82,color:"green"},{label:"Young Pop.",w:80,color:"green"}],grade:"A-"},
  {flag:"🇬🇭",name:"Ghana",region:"West Africa · Pop: 34M · Age: 21",tier:"tier-1",tierLabel:"TIER 1",scores:[{label:"AI Ecosystem",w:78,color:"blue"},{label:"Payments",w:84,color:"green"},{label:"Political",w:75,color:"blue"},{label:"Speed-to-Scale",w:80,color:"green"},{label:"Young Pop.",w:78,color:"green"}],grade:"A-"},
  {flag:"🇧🇷",name:"Brazil",region:"Latin America · Pop: 215M · Age: 34",tier:"tier-2",tierLabel:"TIER 2",scores:[{label:"AI Ecosystem",w:90,color:"green"},{label:"Payments",w:92,color:"green"},{label:"Political",w:60,color:"orange"},{label:"Speed-to-Scale",w:85,color:"green"},{label:"Young Pop.",w:60,color:"blue"}],grade:"B+"},
  {flag:"🇹🇭",name:"Thailand",region:"Southeast Asia · Pop: 71M · Age: 40",tier:"tier-2",tierLabel:"TIER 2",scores:[{label:"AI Ecosystem",w:84,color:"green"},{label:"Payments",w:88,color:"green"},{label:"Political",w:58,color:"orange"},{label:"Speed-to-Scale",w:75,color:"blue"},{label:"Young Pop.",w:48,color:"orange"}],grade:"B"},
  {flag:"🇲🇦",name:"Morocco",region:"North Africa · Pop: 37M · Age: 30",tier:"tier-2",tierLabel:"TIER 2",scores:[{label:"AI Ecosystem",w:72,color:"blue"},{label:"Payments",w:75,color:"blue"},{label:"Political",w:68,color:"blue"},{label:"Speed-to-Scale",w:72,color:"blue"},{label:"Young Pop.",w:65,color:"blue"}],grade:"B"},
  {flag:"🇨🇮",name:"Côte d'Ivoire",region:"West Africa · Pop: 31M · Age: 19",tier:"tier-2",tierLabel:"TIER 2",scores:[{label:"AI Ecosystem",w:65,color:"blue"},{label:"Payments",w:70,color:"blue"},{label:"Political",w:55,color:"orange"},{label:"Speed-to-Scale",w:72,color:"blue"},{label:"Young Pop.",w:88,color:"green"}],grade:"B"},
  {flag:"🇹🇳",name:"Tunisia",region:"North Africa · Pop: 12M · Age: 32",tier:"tier-2",tierLabel:"TIER 2",scores:[{label:"AI Ecosystem",w:68,color:"blue"},{label:"Payments",w:70,color:"blue"},{label:"Political",w:50,color:"orange"},{label:"Speed-to-Scale",w:68,color:"blue"},{label:"Young Pop.",w:60,color:"blue"}],grade:"B"},
  {flag:"🇺🇬",name:"Uganda",region:"East Africa · Pop: 49M · Age: 16",tier:"tier-2",tierLabel:"TIER 2",scores:[{label:"AI Ecosystem",w:62,color:"blue"},{label:"Payments",w:68,color:"blue"},{label:"Political",w:58,color:"orange"},{label:"Speed-to-Scale",w:72,color:"blue"},{label:"Young Pop.",w:90,color:"green"}],grade:"B-"},
  {flag:"🇧🇼",name:"Botswana",region:"Southern Africa · Pop: 2.6M · Age: 25",tier:"tier-2",tierLabel:"TIER 2",scores:[{label:"AI Ecosystem",w:70,color:"blue"},{label:"Payments",w:80,color:"green"},{label:"Political",w:85,color:"green"},{label:"Speed-to-Scale",w:65,color:"blue"},{label:"Young Pop.",w:62,color:"blue"}],grade:"B"},
  {flag:"🇹🇿",name:"Tanzania",region:"East Africa · Pop: 68M · Age: 17",tier:"tier-3",tierLabel:"TIER 3",scores:[{label:"AI Ecosystem",w:58,color:"blue"},{label:"Payments",w:62,color:"blue"},{label:"Political",w:65,color:"blue"},{label:"Speed-to-Scale",w:65,color:"blue"},{label:"Young Pop.",w:92,color:"green"}],grade:"C+"},
  {flag:"🇿🇼",name:"Zimbabwe",region:"Southern Africa · Pop: 17M · Age: 18",tier:"tier-3",tierLabel:"TIER 3",scores:[{label:"AI Ecosystem",w:52,color:"orange"},{label:"Payments",w:55,color:"orange"},{label:"Political",w:38,color:"red"},{label:"Speed-to-Scale",w:55,color:"orange"},{label:"Young Pop.",w:85,color:"green"}],grade:"C"},
  {flag:"🇲🇿",name:"Mozambique",region:"Southern Africa · Pop: 33M · Age: 17",tier:"tier-3",tierLabel:"TIER 3",scores:[{label:"AI Ecosystem",w:50,color:"orange"},{label:"Payments",w:58,color:"orange"},{label:"Political",w:48,color:"orange"},{label:"Speed-to-Scale",w:58,color:"orange"},{label:"Young Pop.",w:90,color:"green"}],grade:"C"},
  {flag:"🇸🇿",name:"Eswatini",region:"Southern Africa · Pop: 1.2M · Age: 20",tier:"tier-3",tierLabel:"TIER 3",scores:[{label:"AI Ecosystem",w:52,color:"orange"},{label:"Payments",w:62,color:"blue"},{label:"Political",w:58,color:"orange"},{label:"Speed-to-Scale",w:52,color:"orange"},{label:"Young Pop.",w:78,color:"green"}],grade:"C"},
  {flag:"🇲🇼",name:"Malawi",region:"Southern Africa · Pop: 21M · Age: 17",tier:"tier-3",tierLabel:"TIER 3",scores:[{label:"AI Ecosystem",w:48,color:"orange"},{label:"Payments",w:55,color:"orange"},{label:"Political",w:52,color:"orange"},{label:"Speed-to-Scale",w:55,color:"orange"},{label:"Young Pop.",w:92,color:"green"}],grade:"C"},
  {flag:"🇬🇳",name:"Guinea",region:"West Africa · Pop: 14M · Age: 18",tier:"tier-3",tierLabel:"TIER 3",scores:[{label:"AI Ecosystem",w:50,color:"orange"},{label:"Payments",w:55,color:"orange"},{label:"Political",w:48,color:"orange"},{label:"Speed-to-Scale",w:52,color:"orange"},{label:"Young Pop.",w:88,color:"green"}],grade:"C"},
  {flag:"🇸🇩",name:"Sudan",region:"East Africa · Pop: 50M · Age: 18",tier:"tier-4",tierLabel:"TIER 4",scores:[{label:"AI Ecosystem",w:42,color:"orange"},{label:"Payments",w:45,color:"orange"},{label:"Political",w:25,color:"red"},{label:"Speed-to-Scale",w:42,color:"orange"},{label:"Young Pop.",w:88,color:"green"}],grade:"D"},
  {flag:"🇨🇩",name:"DRC",region:"Central Africa · Pop: 105M · Age: 17",tier:"tier-4",tierLabel:"TIER 4",scores:[{label:"AI Ecosystem",w:40,color:"orange"},{label:"Payments",w:42,color:"orange"},{label:"Political",w:28,color:"red"},{label:"Speed-to-Scale",w:40,color:"orange"},{label:"Young Pop.",w:92,color:"green"}],grade:"D"},
  {flag:"🇹🇩",name:"Chad",region:"Central Africa · Pop: 18M · Age: 16",tier:"tier-4",tierLabel:"TIER 4",scores:[{label:"AI Ecosystem",w:38,color:"orange"},{label:"Payments",w:40,color:"orange"},{label:"Political",w:25,color:"red"},{label:"Speed-to-Scale",w:38,color:"orange"},{label:"Young Pop.",w:90,color:"green"}],grade:"D"},
  {flag:"🇬🇼",name:"Guinea-Bissau",region:"West Africa · Pop: 2M · Age: 19",tier:"tier-4",tierLabel:"TIER 4",scores:[{label:"AI Ecosystem",w:42,color:"orange"},{label:"Payments",w:48,color:"orange"},{label:"Political",w:45,color:"orange"},{label:"Speed-to-Scale",w:45,color:"orange"},{label:"Young Pop.",w:85,color:"green"}],grade:"D"},
  {flag:"🇨🇫",name:"Cent. Afr. Rep.",region:"Central Africa · Pop: 6M · Age: 17",tier:"tier-4",tierLabel:"TIER 4",scores:[{label:"AI Ecosystem",w:35,color:"red"},{label:"Payments",w:38,color:"red"},{label:"Political",w:18,color:"red"},{label:"Speed-to-Scale",w:35,color:"orange"},{label:"Young Pop.",w:88,color:"green"}],grade:"D"},
  {flag:"🇻🇪",name:"Venezuela",region:"South America · Pop: 28M · Age: 28",tier:"tier-4",tierLabel:"TIER 4",scores:[{label:"AI Ecosystem",w:40,color:"orange"},{label:"Payments",w:38,color:"red"},{label:"Political",w:22,color:"red"},{label:"Speed-to-Scale",w:40,color:"orange"},{label:"Young Pop.",w:72,color:"blue"}],grade:"D"},
];

const gradeClass = g => g.startsWith("A") ? "s-a" : g.startsWith("B") ? "s-b" : g.startsWith("C") ? "s-c" : "s-d";

const cardsHtml = countries.map(c => \`
    <div class="card">
      <div class="tier-badge \${c.tier}">\${c.tierLabel}</div>
      <div class="flag">\${c.flag}</div><div class="name">\${c.name}</div>
      <div class="region">\${c.region}</div>
      \${c.scores.map(s => \`<div class="score-bar"><span class="label">\${s.label}</span><div class="bar"><div class="fill fill-\${s.color}" style="width:\${s.w}%"></div></div></div>\`).join('')}
      <div class="overall-score"><span class="mono" style="font-size:0.7rem;color:var(--muted)">SCORE</span><span class="num \${gradeClass(c.grade)}">\${c.grade}</span></div>
    </div>\`).join('');

const techSections = [
  {title:"AI MODELS",color:"var(--green)",items:[{name:"GPT-5 (OpenAI)",note:"Autonomous coding agents, enterprise workflows"},{name:"Claude 4.5 (Anthropic)",note:"Long-running agents, Constitutional AI safety"},{name:"DeepSeek R1",note:"Open-weight, POPIA-compliant local inference"},{name:"Qwen 2.5 Max (Alibaba)",note:"Multimodal, open-weight, African language tuning"},{name:"Gemini 2.0 (Google)",note:"Multi-modal, context window, YouTube pipeline"},{name:"EqualyzAI",note:"Voice-first agentic AI, African languages"}]},
  {title:"PAYMENTS (AFRICA)",color:"var(--gold)",items:[{name:"Flutterwave",note:"Banking licence Apr 2026, cross-border SA/USD"},{name:"Paystack",note:"SA-focused, Paystack Commerce"},{name:"Yoco",note:"South Africa point-of-sale + online"},{name:"Peach Payments",note:"SA e-commerce gateway"},{name:"M-Pesa",note:"Kenya, Tanzania, DRC, 60M+ users"},{name:"Mono",note:"Nigeria: financial data + payments"}]},
  {title:"RESEARCH & INTEL",color:"var(--blue)",items:[{name:"last30days-skill",note:"10-platform real-time research agent"},{name:"OGRE Midnight Build",note:"3AM SA daily brief, 9 countries"},{name:"NotebookLM",note:"Source-grounded research, citation-backed"},{name:"Brave Search API",note:"Privacy-first search for agents"},{name:"Jina AI",note:"Web scraping + content extraction"},{name:"NewsAPI + News24 + IOL",note:"SA + Africa news monitoring"}]},
  {title:"AGENT STACK",color:"var(--orange)",items:[{name:"OpenClaw (MaxClaw)",note:"Multi-agent orchestrator, 6 agent fleet"},{name:"n8n (self-hosted)",note:"Workflow automation, 400+ integrations"},{name:"CashClaw",note:"13 freelance service skills, HYRVE AI"},{name:"QwenPaw",note:"Local multi-agent coding, free"},{name:"VoiceBox / ElevenLabs",note:"Voice cloning, STT, TTS"},{name:"Obsidian",note:"Long-term memory, second brain"}]},
  {title:"CONTENT & SOCIAL",color:"var(--purple)",items:[{name:"YouTube",note:"Studex Wildlife — long-form AI content"},{name:"TikTok",note:"@studexwildlife — short clips, reels"},{name:"Instagram",note:"@laisa_aesthetics — visuals, stories"},{name:"LinkedIn",note:"Thought leadership, B2B outreach"},{name:"Facebook",note:"Tumelo Ramaphosa, community"},{name:"Threads / X",note:"Real-time engagement, threads"}]},
  {title:"INFRASTRUCTURE",color:"var(--green)",items:[{name:"ORGO VM (orgo.ai)",note:"D@RK F@C#ORY, 8 VMs, VNC access"},{name:"Vercel",note:"Frontend deployment, CDN"},{name:"GitHub",note:"Code, Actions, deployment triggers"},{name:"Docker",note:"Containerised agents, reproducible builds"},{name:"Cloudflare",note:"DNS, CDN, DDoS protection"},{name:"NotebookLM API",note:"Gemini-backed research layer"}]},
];

const techHtml = techSections.map(s => \`
  <div class="tech-card">
    <h4 style="color:\${s.color}">\${s.title}</h4>
    \${s.items.map(i => \`<div class="tech-item">
      <div class="tech-dot" style="background:\${s.color}"></div>
      <div><div class="node-name" style="font-size:0.83rem">\${i.name}</div>
      <div class="node-desc" style="font-size:0.72rem">\${i.note}</div></div>
    </div>\`).join('')}
  </div>\`).join('');

const productTiers = [
  {title:"Starter Voice Agent",price:"R2,500",period:"/month",tag:"TIER 1 MARKETS",color:"var(--green)",features:["1 AI voice agent (Swahili, Yoruba, French, Portuguese)","WhatsApp + phone channel","Auto invoice generation","Daily market brief to client","5GB research data","Email support","Flutterwave billing"]},
  {title:"Growth Voice Agent",price:"R5,500",period:"/month",tag:"SCALE UP",color:"var(--gold)",features:["3 AI voice agents (all Tier 1+2 languages)","WhatsApp + Telegram + Email","CRM auto-update + lead scoring","Real-time competitor monitoring","Daily brief + weekly market report","Multi-country payment integration","Priority support + strategy calls"]},
  {title:"Enterprise Voice Agent",price:"R12,000",period:"/month",tag:"FULL STACK",color:"var(--blue)",features:["Unlimited AI voice agents","Custom languages + dialects","White-label (your brand, your clients)","All 18 country market data feeds","API access + webhook integrations","Dedicated account manager","SOC2-ready infrastructure"]},
];

const productHtml = productTiers.map(p => \`
  <div class="product-card">
    <div class="tag" style="color:\${p.color};background:\${p.color}22">\${p.tag}</div>
    <h3>\${p.title}</h3>
    <div class="price" style="color:\${p.color}">\${p.price}<span>\${p.period}</span></div>
    <ul>\${p.features.map(f => \`<li>\${f}</li>\`).join('')}</ul>
  </div>\`).join('');

const pipelineSteps = [
  {num:"01",color:"var(--green)",title:"3AM — OGRE Midnight Build Research",desc:"OGRE-3AM-NAI agent scans 9 countries across AI ecosystems. Writes structured research to /workspace/OGRE-Midnight-Build/RESEARCH-YYYY-MM-DD.md. Covers: startups, policy, fintech, AI adoption, local models."},
  {num:"02",color:"var(--green)",title:"6AM — Morning Brief Compilation",desc:"Cipher Tr@ce agent reads midnight build output. Compiles top 5 insights per country tier. Writes /workspace/email-queue/morning-brief-YYYY-MM-DD.txt. Feeds into NotebookLM."},
  {num:"03",color:"var(--gold)",title:"8AM SA — Email to Stakeholders",desc:"Morning brief sent to Tumelo via Gmail SMTP (when credentials configured). Key insights from overnight research. Action items for the day."},
  {num:"04",color:"var(--gold)",title:"9AM SA — NotebookLM Brief",desc:"Research MD file uploaded to NotebookLM. Gemini generates source-grounded answers per country. Query: \"What are the top 3 AI opportunities for Dark Factory in [Country] this week?\""},
  {num:"05",color:"var(--blue)",title:"10AM SA — YouTube Script Generation",desc:"Agent reads NotebookLM answers + midnight build research. Generates YouTube script (1,500-2,000 words). Format: hook (30s) + market overview + demo + CTA. Stored in /workspace/dark-factory-youtube/scripts/"},
  {num:"06",color:"var(--blue)",title:"11AM SA — Voice Agent Recording",desc:"Script fed to VoiceBox (ElevenLabs or VoiceBox). Cipher Tr@ce voice clone narrates the script. Output: MP3/MP4. Alternative: EqualyzAI for African language voice agents."},
  {num:"07",color:"var(--purple)",title:"12PM SA — Video Assembly",desc:"MP3 + stock footage (Pexels/Unsplash) + Canvas 2D animations compiled into video. Published to YouTube — Studex Wildlife. Title: \"[Country] AI Market: [Opportunity] — [Date]\"."},
  {num:"08",color:"var(--purple)",title:"1PM SA — Cross-Platform Distribution",desc:"Same content reformatted: TikTok (60s clip), LinkedIn (carousel), Instagram (story + post), Facebook (post + thread). Each platform gets native format. Scheduled via n8n."},
  {num:"09",color:"var(--orange)",title:"6PM SA — Engagement & Outreach",desc:"Agent monitors comments, DMs, LinkedIn connections. Responds to inbound leads from Tier 1 countries. Flags warm prospects for Tumelo's outreach."},
  {num:"10",color:"var(--orange)",title:"8PM SA — Evening Digest",desc:"Evening digest sent: what shipped today, pipeline stats, tomorrow's priority countries. Written to /workspace/email-queue/evening-digest-YYYY-MM-DD.txt."},
];

const pipelineHtml = pipelineSteps.map((s,i) => \`
  \${i > 0 ? '<div class="pipe-connector"></div>' : ''}
  <div class="pipe-step">
    <div class="num" style="background:\${s.color}22;color:\${s.color};border:2px solid \${s.color}">\${s.num}</div>
    <div class="content">
      <h4 style="color:\${s.color}">\${s.title}</h4>
      <p>\${s.desc}</p>
    </div>
  </div>\`).join('');

const timelineItems = [
  {date:"28 JUN 2026",title:"Day 0 — Plan Live",desc:"This plan deployed. Midnight build running. YouTube pipeline activated. First video research starts.",active:true},
  {date:"29 JUN — 5 JUL",title:"Week 1 — TIER 1 Focus",desc:"Nigeria + Kenya + Rwanda deep dive. First 3 YouTube videos. Flutterwave integration. NotebookLM wired to pipeline.",active:false},
  {date:"6 — 20 JUL",title:"Week 2-3 — TIER 2 Launch",desc:"Brazil + Thailand + Ghana videos. Voice agent demo recording. First client demo call scheduled.",active:false},
  {date:"21 JUL — 10 AUG",title:"Month 2 — Scale to TIER 1+2",desc:"Morocco, Tunisia, Côte d'Ivoire. WhatsApp onboarding flow live. First paying client acquired.",active:false},
  {date:"11 — 31 AUG",title:"Month 3 — TIER 3 Expansion",desc:"Tanzania, Botswana, Uganda, Zimbabwe, Mozambique, Eswatini, Malawi, Guinea. YouTube content calendar full.",active:false},
  {date:"1 — 30 SEP",title:"Month 4 — MONITOR MARKETS",desc:"Sudan, Chad, DRC, CAR, Venezuela. Automated reports only. No active sales. Watch list for 2027.",active:false},
  {date:"OCT 2026",title:"Q4 — Enterprise Deals",desc:"White-label product finalized. R12K/month enterprise tier. 3 enterprise pilots. Annual contracts offered.",active:false},
];

const timelineHtml = timelineItems.map(t => \`
  <div class="tl-item \${t.active ? 'active' : ''}">
    <div class="date">\${t.date}</div>
    <h4>\${t.title}</h4>
    <p>\${t.desc}</p>
  </div>\`).join('');

const postSchedule = [
  {platform:"YouTube",format:"Long-form video",freq:"3x/week",content:"AI market deep-dive + demo + CTA",bestFor:"Thought leadership, search traffic, evergreen content",color:"#FF0000",emoji:"📺"},
  {platform:"TikTok",format:"60-90s clip",freq:"5x/week",content:"Highlight reel of main video + trending sounds",bestFor:"Viral reach, Gen Z audience",color:"#ff0050",emoji:"🎵"},
  {platform:"Instagram Reels",format:"30-60s video",freq:"5x/week",content:"Short clips + carousel posts with stats",bestFor:"Visual demos, aesthetic brand building",color:"#E1306C",emoji:"📸"},
  {platform:"LinkedIn",format:"Carousel + post",freq:"3x/week",content:"Market insights, case studies, company updates",bestFor:"B2B leads, enterprise outreach",color:"#0A66C2",emoji:"💼"},
  {platform:"Facebook",format:"Post + live",freq:"Daily",content:"Briefs, meme content, community engagement",bestFor:"Community building, African market penetration",color:"#1877F2",emoji:"📘"},
  {platform:"Threads / X",format:"Thread + tweet",freq:"3x/day",content:"Real-time insights, news commentary, links",bestFor:"Thought leadership, newsjacking",color:"#1D9BF0",emoji:"🧵"},
];

const matrixRows = postSchedule.map(p => \`
  <tr>
    <td><span style="font-size:1.1rem">\${p.emoji}</span> <strong>\${p.platform}</strong></td>
    <td>\${p.format}</td>
    <td><span class="freq-badge freq-d">\${p.freq}</span></td>
    <td style="font-size:0.78rem;color:var(--muted)">\${p.content}</td>
    <td style="font-size:0.78rem;color:var(--muted)">\${p.bestFor}</td>
  </tr>\`).join('');

const tiersTableRows = [
  {tier:"TIER 1 — EASIEST",color:"var(--green)",timing:"NOW",countries:[
    {flag:"🇰🇪",name:"Kenya",notes:"M-Pesa, 37.9M mobile money users. Flutterwave native. AI startup density highest in Africa."},
    {flag:"🇳🇬",name:"Nigeria",notes:"Flutterwave ($3B val), Interswitch, Opay. 230M people, largest market in Africa."},
    {flag:"🇷🇼",name:"Rwanda",notes:"$250M AI strategy. Government-backed. Most politically stable in Africa."},
    {flag:"🇬🇭",name:"Ghana",notes:"$250M national AI strategy. Strong fintech. Mobile money growing fast."},
  ]},
  {tier:"TIER 2 — FAST MOVE",color:"var(--blue)",timing:"Q3 2026",countries:[
    {flag:"🇧🇷",name:"Brazil",notes:"869 AI startups, $1B+ funding. Fintech leads LatAm. 14.9% CAGR to 2034."},
    {flag:"🇹🇭",name:"Thailand",notes:"Digital economy $50B target 2025. 2,100+ startups. 7.3% growth."},
    {flag:"🇲🇦",name:"Morocco",notes:"Fastest growing startup ecosystem in North Africa. EU proximity."},
    {flag:"🇨🇮",name:"Côte d'Ivoire",notes:"Largest Francophone fintech hub. Young population. Mobile-first."},
    {flag:"🇹🇳",name:"Tunisia",notes:"Strong STEM education. AI research output growing."},
    {flag:"🇺🇬",name:"Uganda",notes:"Mobile money penetration. Young median age 16. Fast adopter market."},
    {flag:"🇧🇼",name:"Botswana",notes:"High income country. Stable government. Gateway to SADC."},
  ]},
  {tier:"TIER 3 — BUILD PRESENCE",color:"var(--orange)",timing:"Q4 2026",countries:[
    {flag:"🇹🇿",name:"Tanzania",notes:"Instant Payment System linking Rwanda/Tanzania. DPs in progress."},
    {flag:"🇿🇼",name:"Zimbabwe",notes:"Ecocash dominant. USD hyperinflation. AI = efficiency tool."},
    {flag:"🇲🇿",name:"Mozambique",notes:"Off-grid energy + AI combo. Large youth population."},
    {flag:"🇸🇿",name:"Eswatini",notes:"Small market. Gateway to SACU. Stable."},
    {flag:"🇲🇼",name:"Malawi",notes:"Agriculture AI opportunity. Mobile coverage expanding."},
    {flag:"🇬🇳",name:"Guinea",notes:"Francophone West Africa. Mining sector AI demand."},
  ]},
  {tier:"TIER 4 — MONITOR",color:"var(--red)",timing:"2027+",countries:[
    {flag:"🇸🇩",name:"Sudan",notes:"Conflict zone. Humanitarian AI use cases. Long-term play only."},
    {flag:"🇨🇩",name:"DRC",notes:"Huge population. Instability. NGO + mining AI use cases."},
    {flag:"🇹🇩",name:"Chad",notes:"Highest youth ratio. Oil + AI opportunity for future."},
    {flag:"🇬🇼",name:"Guinea-Bissau",notes:"Cashew export economy. Very small. Partner via Senegal."},
    {flag:"🇨🇫",name:"Cent. Afr. Rep.",notes:"Humanitarian. Diamond/gold mining AI. NGO partnerships."},
    {flag:"🇻🇪",name:"Venezuela",notes:"Crisis market. Crypto adoption high. AI for diaspora."},
  ]},
];

const tableRowsHtml = tiersTableRows.map(t => \`
    <tr style="border-left:4px solid \${t.color}"><td colspan="5" style="background:var(--bg3);padding:0.65rem 1rem;font-weight:700;font-size:0.75rem;letter-spacing:2px;text-transform:uppercase;color:\${t.color}">\${t.tier} — <span style="font-weight:400;text-transform:none;font-size:0.7rem;color:var(--muted)">Start: \${t.timing}</span></td></tr>
    \${t.countries.map(c => \`
    <tr>
      <td class="flag-cell">\${c.flag}</td>
      <td class="country-cell">\${c.name}</td>
      <td style="font-size:0.8rem;color:var(--muted);max-width:320px">\${c.notes}</td>
      <td><span class="freq-badge freq-w">\${t.timing}</span></td>
      <td class="score-cell" style="color:\${t.color}">\${t.timing === 'NOW' ? 'Active' : t.timing}</td>
    </tr>\`).join('')}
  \`).join('');

const agentNodesLeft = [
  {icon:"🎙️",title:"STUDENT",desc:"Voice input, natural language query"},
  {icon:"🧠",title:"Cipher Tr@ce",desc:"CEO supervisor, routes request"},
  {icon:"🔍",title:"Research Agent",desc:"Scans midnight build, NotebookLM"},
  {icon:"📊",title:"Market Analyst",desc:"Scores countries, segments tiers"},
  {icon:"✍️",title:"Script Writer",desc:"Generates YouTube script"},
  {icon:"🎬",title:"Video Assembler",desc:"Compiles video + voice"},
];

const agentNodesRight = [
  {icon:"🌍",title:"Distribution Agent",desc:"Posts to YouTube, TikTok, LinkedIn"},
  {icon:"💬",title:"Engagement Agent",desc:"Monitors comments, DMs"},
  {icon:"📧",title:"Email Agent",desc:"Sends briefs, digests, invoices"},
  {icon:"💰",title:"Finance Agent",desc:"Flutterwave, invoice tracking"},
  {icon:"📈",title:"Analytics Agent",desc:"Reports, ROI, conversion tracking"},
  {icon:"🏁",title:"Handoff Agent",desc:"Flags warm leads to Tumelo"},
];

const leftNodes = agentNodesLeft.map(n => \`
    <div class="node">
      <div class="node-icon ni-green">\${n.icon}</div>
      <div><div class="node-name">\${n.title}</div><div class="node-desc">\${n.desc}</div></div>
    </div>\`).join('');

const rightNodes = agentNodesRight.map(n => \`
    <div class="node">
      <div class="node-icon ni-gold">\${n.icon}</div>
      <div><div class="node-name">\${n.title}</div><div class="node-desc">\${n.desc}</div></div>
    </div>\`).join('');

// Full HTML
const fullHtml = \`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Dark Factory — Global AI YouTube Pipeline | 18-Country Plan</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500&display=swap');
:root{--bg:#0a0a0f;--bg2:#0f0f1a;--bg3:#141428;--green:#00ff88;--gold:#ffd700;--red:#ff4455;--orange:#ff8c42;--blue:#4fc3f7;--purple:#b388ff;--text:#e8e8f0;--muted:#7a7a9a;--border:#1e1e3a;}
*{margin:0;padding:0;box-sizing:border-box}body{background:var(--bg);color:var(--text);font-family:'Space Grotesk',sans-serif;line-height:1.6}
.mono{font-family:'JetBrains Mono',monospace}
nav{position:sticky;top:0;background:rgba(10,10,15,0.96);backdrop-filter:blur(12px);border-bottom:1px solid var(--border);padding:0 2rem;display