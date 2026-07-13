'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap, Code, Rocket, Terminal, FileText, Users, Bot, Cloud, Brain, GitBranch, TrendingUp, Award, Cpu, Shield, ArrowRight, Database, Lock, Mic, Server, Menu, X, ExternalLink, CheckCircle } from 'lucide-react';

const BUILTS = [
  { n:'War Room Command', t:'OGRE MISSION CONTROL', d:'Real-time operations dashboard for multi-agent teams. KPI cards, live agent status, commerce tabs, war-room/ops view. NASA Mission Control aesthetic.', tk:['React','Vite','Tailwind','Express','SQLite','Recharts'], u:'9163jvmvzxn5.space.minimax.io', s:'LIVE', c:'from-amber-500/20 to-amber-500/5' },
  { n:'CipherTrace v3', t:'PORTFOLIO / IDENTITY', d:'Minimal dark portfolio with algorithmic art, animated node graph canvas, electric indigo + cyan on near-black.', tk:['Pure HTML/CSS/JS','Canvas 2D API','JetBrains Mono','Plus Jakarta Sans'], u:'ey8zue6ymxtk.space.minimax.io', s:'LIVE', c:'from-indigo-500/20 to-indigo-500/5' },
  { n:'Red Team Agent', t:'CYBERSECURITY AI', d:'Cybersecurity AI VM powered by Decepticon. AI Trust Monitor tracks hallucinations, prompt injection, and PII leakage in other AI agents.', tk:['Decepticon','LangGraph','LiteLLM','Neo4j','Kali Linux'], u:'w1tu0qxf216v.space.minimax.io', s:'LIVE', c:'from-red-500/20 to-red-500/5' },
  { n:'DarkDesk™', t:'VOICE AI COMPANION', d:'Voice + chat AI companion on sovereign SA VM. POPIA-compliant enterprise deployment. R2,500/mo Solo → R25,000/mo Enterprise.', tk:['Electron','React','Vite','OpenAI Realtime API','VoiceBox'], u:'hgjcgc2esiki.space.minimax.io', s:'LIVE', c:'from-cyan-500/20 to-cyan-500/5' },
  { n:'AutoFlex Pro™', t:'AI WEB AGENT', d:'AI agent embedded in websites. Reads DOM, fills forms, qualifies leads, books appointments automatically.', tk:['TypeScript','MCP','DOM Automation','Lead Qualification AI'], u:'3twhamln9rsh.space.minimax.io', s:'LIVE', c:'from-emerald-500/20 to-emerald-500/5' },
  { n:'LAISA Proposal v4', t:'INTERACTIVE PROPOSAL', d:'R350,000 + R55,000/month AI Agent OS proposal for LAISA Aesthetic Clinic. Full PRD, pricing, agent stack, timeline.', tk:['HTML5','Interactive Forms','MediaRecorder API'], u:'oabod1557tze.space.minimax.io', s:'LIVE', c:'from-pink-500/20 to-pink-500/5' },
  { n:'PRD Intake Portal', t:'PRD SYSTEM', d:'4-step PRD wizard. Voice recording, document upload, VirusTotal scan, Notion CRM, team email routing.', tk:['Node.js','Express','Multer','Notion API'], u:'z46kjpzjipb4.space.minimax.io', s:'DEPLOYED', c:'from-violet-500/20 to-violet-500/5' },
  { n:'Unified Portfolio', t:'LIVE PRODUCTS', d:'NodeCanvas portfolio. Live product grid, client VM cards, PRD intake modal, ecosystem timeline.', tk:['Pure HTML/CSS/JS','NodeCanvas Animation','CDN Fonts'], u:'ju8n1erseau8.space.minimax.io', s:'LIVE', c:'from-yellow-500/20 to-yellow-500/5' },
  { n:'Dark Factory BMAD', t:'CORE PRODUCT', d:'Build Me A Dashboard. R29/product. Voice note to AI agents scope, build, review, ship. 3 milestones.', tk:['Next.js 15','TypeScript','Tailwind CSS 4','Prisma','Vercel'], u:'mam5k6xx5l20.space.minimax.io', s:'DEPLOYED', c:'from-orange-500/20 to-orange-500/5' },
];

const SKILLS = [
  { n:'graphify', r:'Graphify-Labs/graphify', c:1, cp:'Codebase Intelligence', d:'Maps any codebase to a navigable knowledge graph. Community detection, audit trails, cross-repo linking. Query with natural language.', k:'Natural language query · Shortest path · Community detection · Neo4j export' },
  { n:'obsidian-mind', r:'eugeniughelbur/obsidian-second-brain', c:18, cp:'Agent Memory', d:'Persistent memory vault. Session start injects context, brain dumps after meetings, semantic search over all history.', k:'Session Start · Brain Dump · /om-standup · /om-weekly · 18 commands' },
  { n:'gstack', r:'garrytan/gstack', c:38, cp:'Sprint Engineering', d:'YC sprint process. /office-hours, /plan, /build, /review, /qa, /ship, /retro. Real Chromium browser for end-to-end testing.', k:'/office-hours · /build · /review · /qa · /ship · /retro' },
  { n:'agent-skills', r:'addyosmani/agent-skills', c:24, cp:'Production Engineering', d:'24 production workflows. TDD, OWASP security audits, Core Web Vitals optimization, CI/CD pipeline creation.', k:'TDD · OWASP · Core Web Vitals · CI/CD · Security audit' },
  { n:'last30days', r:'mvanhorn/last30days-skill', c:1, cp:'Market Intelligence', d:'Real-time market intelligence. Scrapes Reddit, X, YouTube, HN, Polymarket — scored by engagement.', k:'Reddit · Twitter/X · YouTube · Hacker News · Polymarket' },
  { n:'headroom', r:'chopratejas/headroom', c:1, cp:'Token Efficiency', d:'60–95% token compression. Cross-agent memory transfer. Failure mining with pattern detection. Python + PyTorch.', k:'60-95% compression · Cross-agent memory · Failure mining' },
  { n:'spec-kit', r:'github/spec-kit', c:9, cp:'Spec-Driven Dev', d:'GitHub SDD toolkit. /speckit.specify → /plan → /tasks → /implement. Spec drives every line of code.', k:'/speckit.specify · /plan · /tasks · /implement' },
  { n:'skill-creator', r:'anthropics/skills/skill-creator', c:1, cp:'Meta-Skill Builder', d:'Build new skills recursively. Test, benchmark, improve, package. The agent that builds agents.', k:'Recursive skill building · Test · Benchmark · Package' },
];

const VMS = [
  { n:'D@RK F@C#ORY', e:'🏭', p:'Primary GPU build VM. Hosts Ollama, Qwen3-72B, Devin, Cursor, Anti-Gravity.', s:'GPU / 16GB+' },
  { n:'Hermes Agent', e:'🤖', p:'Orchestrator. Coordinates all sub-agents. Routes tasks to the right agent.', s:'4 vCPU / 8GB' },
  { n:'OpenClaw', e:'🧠', p:'MaxClaw platform VM. Main OGRE session. All channel integrations.', s:'4 vCPU / 8GB' },
  { n:'StudEx Global Markets', e:'🌍', p:'Distribution company VM. Pharmasyntez SA office. SADC regional ops.', s:'4 vCPU / 8GB' },
  { n:'Agentic Lab — LAISA', e:'💉', p:'LAISA aesthetic clinic intelligence VM. Client workload tier.', s:'4 vCPU / 16GB' },
  { n:'SGM — Afrika Buiz', e:'📈', p:'Afrika business VM. SADC regional expansion. Partner Agent.', s:'4 vCPU / 8GB' },
  { n:'Super Agents Command', e:'🎛️', p:'Command center for all agent deployments. Revenue Agent lives here.', s:'4 vCPU / 8GB' },
  { n:'Project-2571', e:'🚀', p:'Special projects VM. New product development. Research Agent.', s:'4 vCPU / 8GB' },
];

const TEAM = [
  { n:'Cipher Tr@ce', r:'Chief Executive Agent', e:'🤖', bio:'Autonomous AI agent running on OpenClaw. Built the first version of Dark Factory from scratch — deploying, iterating, and shipping at machine speed. Specialises in systems architecture, multi-agent orchestration, and sovereign AI infrastructure.', f:['Multi-Agent Systems','Full-Stack Build Automation','LLM Integration','GPU VM Infrastructure'] },
  { n:'Tumelo Ramaphosa', r:'Founder & Principal', e:'🧠', bio:'AI researcher and systems architect with a deep focus on sovereign AI infrastructure for African markets. Studied Claude Code, Google Cloud AI, and distributed agent systems. Builds in public. Runs the Studex Group portfolio of AI companies.', f:['Sovereign AI Stack','Government Tender Intelligence','Crypto Research','Agent OS Architecture'] },
];

const NAV = ['home','portfolio','skills','stack','about'] as const;
type Tab = typeof NAV[number];

const STEPS = [
  { i:'🎙️', n:'01', t:'Submit', d:'Voice note or text. Attach links.' },
  { i:'📋', n:'02', t:'Plan & Deposit', d:'AI scopes your project. Pay 10% to lock.' },
  { i:'⚡', n:'03', t:'Build & Review', d:'Agents build in sandboxes. 2-3 review rounds.' },
  { i:'🚀', n:'04', t:'Ship & Deliver', d:'Code reviewed, shipped. Pay remaining 50%.' },
];

const FEATS = [
  { i:<Bot size={20}/>, t:'AI PRD Generation', d:'Complete specs from one sentence' },
  { i:<Code size={20}/>, t:'Pi + Cursor Agents', d:'Self-running coding agents' },
  { i:<Rocket size={20}/>, t:'Auto Deploy', d:'Production URL in minutes' },
  { i:<Shield size={20}/>, t:'POPIA Compliance', d:'GDPR/POPIA built in' },
  { i:<Database size={20}/>, t:'Supabase Ready', d:'PostgreSQL auto-generated' },
  { i:<Lock size={20}/>, t:'OWASP Security', d:'Security audit by gstack/CSO' },
];

const PRICING = [
  { t:'Essential VM', p:'R599/mo', f:['4 vCPU / 16GB RAM / 500GB SSD','gstack + agent-skills','Branded client dashboard','WhatsApp notifications','GitHub CI/CD pipeline'], pop:false },
  { t:'Intelligence VM', p:'R1,499/mo', f:['+ last30days market intel','+ Charlie voice agent','+ Google Ads management','+ Advanced analytics','Priority support'], pop:false },
  { t:'Enterprise VM', p:'R3,499/mo', f:['+ Custom skill development','+ White-label portal','+ SADC expansion rights','+ API access + webhook','99.9% SLA guarantee'], pop:true },
];

const AGENTS = [
  { n:'Cipher Tr@ce', r:'CEO Agent', d:'Orchestrates all agents. Main session.' },
  { n:'Research Agent', r:'3am cron', d:'Tender intelligence. Market research.' },
  { n:'Builder Agent', r:'10pm cron', d:'Builds, deploys, Vercel. CodeRabbit.' },
  { n:'Comms Agent', r:'On trigger', d:'WhatsApp, email, LinkedIn.' },
  { n:'Partner Agent', r:'Mon/Wed/Fri', d:'Jasiri tech. Partnerships.' },
  { n:'Revenue Agent', r:'5pm daily', d:'Pipeline. Invoices. Notion.' },
  { n:'Ptah Builder', r:'Code + Deploy', d:'Full-stack builds. CI/CD.' },
  { n:'Seshat Mind', r:'Memory + Docs', d:'Obsidian vault. Wiki.' },
];

export default function App() {
  const [tab, setTab] = useState<Tab>('home');
  const [idea, setIdea] = useState('');
  const [loading, setLoading] = useState(false);
  const [prd, setPrd] = useState<{t:string;y:string;v:string[]}[]|null>(null);
  const [building, setBuilding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mobile, setMobile] = useState(false);

  const genPRD = async () => {
    if (!idea.trim()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 2200));
    setLoading(false);
    const t = idea.toLowerCase().includes('saas') ? 'SaaS Platform' : idea.toLowerCase().includes('ai') ? 'AI Platform' : 'Web Application';
    setPrd([
      { t: idea, y: t, v: ['Next.js 15','TypeScript','Tailwind CSS 4','Prisma','PostgreSQL','Vercel'] },
    ]);
  };

  const startBuild = async () => {
    setBuilding(true);
    for (let p = 0; p <= 100; p += 5) {
      await new Promise(r => setTimeout(r, 300));
      setProgress(p);
    }
    setBuilding(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative overflow-hidden font-sans">
      {/* Background */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
      <div className="fixed top-[-200px] left-[15%] w-[700px] h-[700px] bg-orange-600/[0.10] rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-100px] right-[10%] w-[600px] h-[600px] bg-indigo-600/[0.08] rounded-full blur-[120px] pointer-events-none" />

      {/* Sticky header */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] backdrop-blur-xl bg-[#0a0a0a]/85">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shrink-0">
              <Terminal className="w-4 h-4 text-white" />
            </div>
            <span className="font-black text-lg tracking-tight">DARK FACTORY</span>
            <span className="text-orange-400 text-xs ml-1 font-mono hidden sm:inline">v3.0</span>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {(NAV as readonly string[]).map(id => (
              <button key={id} onClick={() => setTab(id as Tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${tab === id ? 'bg-orange-500/15 text-orange-400 border border-orange-500/25' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}>
                {id}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-500 font-mono">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              8 agents
            </div>
            <button onClick={() => setTab('home')}
              className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 rounded-lg px-4 py-2 text-sm font-bold transition-all">
              Start Building
            </button>
            <button className="md:hidden p-1.5 text-zinc-400" onClick={() => setMobile(m => !m)}>
              {mobile ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {mobile && (
          <div className="md:hidden px-4 pb-3 flex flex-col gap-1 border-t border-white/5 pt-3">
            {(NAV as readonly string[]).map(id => (
              <button key={id} onClick={() => { setTab(id as Tab); setMobile(false); }}
                className={`px-4 py-2 rounded-lg text-sm text-left capitalize ${tab === id ? 'bg-orange-500/15 text-orange-400' : 'text-zinc-400'}`}>
                {id}
              </button>
            ))}
          </div>
        )}
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-10">

        {/* ── HOME ── */}
        {tab === 'home' && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-center mb-12 pt-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm mb-6">
                <Sparkles size={14} />
                <span>Powered by AI Agents — Built on OGRE VMs</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05] mb-5">
                Build Me A{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500">
                  Dashboard
                </span>
              </h1>
              <p className="text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed">
                Describe your app. AI agents scope, build, review, and ship it.<br />Pay only when it ships. From R29.
              </p>
            </div>

            {/* 4 steps */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
              {STEPS.map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                  className="bg-zinc-900/60 border border-white/5 rounded-2xl p-5 text-center">
                  <div className="text-3xl mb-3">{s.i}</div>
                  <div className="text-[10px] font-mono text-orange-500 mb-2">{s.n}</div>
                  <h3 className="font-bold text-sm mb-1">{s.t}</h3>
                  <p className="text-xs text-zinc-500">{s.d}</p>
                </motion.div>
              ))}
            </div>

            {/* BMAD form */}
            {!prd ? (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="max-w-2xl mx-auto mb-12">
                <div className="relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-600 to-amber-500 rounded-2xl blur opacity-20" />
                  <div className="relative bg-zinc-900/90 backdrop-blur-xl rounded-2xl p-1.5 border border-white/10">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        value={idea} onChange={e => setIdea(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && genPRD()}
                        placeholder="I want to build a SaaS that..."
                        className="flex-1 bg-black/50 rounded-xl px-4 py-4 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-orange-500/50 text-sm"
                      />
                      <button
                        onClick={genPRD} disabled={loading || !idea.trim()}
                        className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl px-8 py-4 font-bold flex items-center justify-center gap-2 text-sm shrink-0 transition-all">
                        {loading ? (
                          <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Thinking...</>
                        ) : (
                          <><Zap size={16} />BMAD</>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                <p className="text-center text-zinc-600 text-xs mt-3">
                  Try: &ldquo;A patient management system for SA clinics&rdquo; · &ldquo;AI SaaS for property management&rdquo;
                </p>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
                className="max-w-3xl mx-auto mb-12">
                <div className="bg-zinc-900/90 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-sm font-mono text-green-400">PRD Generated — Ready to Build</span>
                  </div>
                  <h2 className="text-2xl font-black mb-1">{prd[0].t}</h2>
                  <p className="text-zinc-400 text-sm mb-4">{prd[0].y}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {prd[0].v.map(tech => (
                      <span key={tech} className="px-3 py-1 rounded-full bg-zinc-800 text-xs text-zinc-300 border border-zinc-700">{tech}</span>
                    ))}
                  </div>
                  <div className="grid grid-cols-4 gap-3 mb-8 p-4 bg-zinc-800/40 rounded-xl">
                    {[{ l:'DEPOSIT', v:'10%', c:'text-orange-400' },{ l:'BUILD', v:'40%', c:'text-yellow-400' },{ l:'DELIVERY', v:'50%', c:'text-green-400' },{ l:'TIMELINE', v:'2–4 wks', c:'text-white' }].map(x => (
                      <div key={x.l}>
                        <div className="text-[10px] font-mono text-zinc-500 mb-1">{x.l}</div>
                        <div className={`text-sm font-bold ${x.c}`}>{x.v}</div>
                      </div>
                    ))}
                  </div>
                  {!building ? (
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <button onClick={() => { setPrd(null); setIdea(''); }}
                        className="text-zinc-500 hover:text-white text-sm transition-colors">← New Idea</button>
                      <button onClick={startBuild}
                        className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 rounded-xl px-8 py-3 font-bold flex items-center gap-2 text-sm">
                        <Rocket size={15} />Start Building<ArrowRight size={15} />
                      </button>
                    </div>
                  ) : (
                    <div className="pt-4 border-t border-white/10">
                      <div className="flex justify-between text-xs mb-2">
                        <span className="text-green-400 font-mono">Building...</span>
                        <span className="text-green-400 font-mono">{progress}%</span>
                      </div>
                      <div className="h-2 bg-zinc-800 rounded-full overflow-hidden mb-2">
                        <motion.div className="h-full bg-gradient-to-r from-green-500 to-emerald-400"
                          animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }} />
                      </div>
                      <p className="text-xs text-zinc-600 font-mono">Ptah Builder™ active · CodeRabbit reviewing · Vercel standing by</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Feature grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {FEATS.map((f, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.05 }}
                  className="p-4 bg-zinc-900/40 border border-white/5 rounded-xl flex items-start gap-3 hover:border-orange-500/20 transition-all">
                  <div className="text-orange-400 shrink-0 mt-0.5">{f.i}</div>
                  <div><h3 className="font-semibold text-sm mb-0.5">{f.t}</h3><p className="text-xs text-zinc-500">{f.d}</p></div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── PORTFOLIO ── */}
        {tab === 'portfolio' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="mb-8">
              <h2 className="text-4xl font-black mb-2">Our Builds</h2>
              <p className="text-zinc-400">Every product shipped. Every URL live. No mockups.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-12">
              {BUILTS.map((p, i) => (
                <motion.a key={i} href={`https://${p.u}`} target="_blank" rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="group block bg-zinc-900/70 border border-white/5 rounded-2xl overflow-hidden hover:border-orange-500/30 transition-all hover:-translate-y-1">
                  <div className={`h-36 bg-gradient-to-br ${p.c} flex items-center justify-center relative`}>
                    <div className="absolute top-3 right-3">
                      <span className="text-[9px] font-mono bg-black/70 text-orange-400 px-2 py-1 rounded-full border border-orange-500/20">{p.t}</span>
                    </div>
                    <div className="text-5xl">🏭</div>
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${p.s === 'LIVE' ? 'bg-green-400' : 'bg-yellow-400'}`} />
                      <span className="text-[9px] font-mono text-white/60">{p.s}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-base mb-2 group-hover:text-orange-400 transition-colors">{p.n}</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed mb-4">{p.d}</p>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {p.tk.map(t => (
                        <span key={t} className="text-[10px] font-mono bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded">{t}</span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-white/5">
                      <span className="text-[9px] font-mono text-zinc-600 truncate mr-2">{p.u}</span>
                      <span className="text-[9px] font-mono text-orange-400">Visit ↗</span>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[{ v:'9+', l:'Products Built', i:<Award size={18} /> },{ v:'100%', l:'Live Deployments', i:<Rocket size={18} /> },{ v:'<10 min', l:'Avg Build Time', i:<Zap size={18} /> },{ v:'80+', l:'Agent Skills', i:<Bot size={18} /> }].map((s, i) => (
                <div key={i} className="bg-zinc-900/60 border border-white/5 rounded-xl p-5 text-center">
                  <div className="text-orange-400 flex justify-center mb-2">{s.i}</div>
                  <div className="text-2xl font-black mb-1">{s.v}</div>
                  <div className="text-xs text-zinc-500">{s.l}</div>
                </div>
            ))}
          </motion.div>
        )}

        {/* ── SKILLS ── */}
        {tab === 'skills' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="mb-8">
              <h2 className="text-4xl font-black mb-2">Agent Skills</h2>
              <p className="text-zinc-400">Pre-installed on every Dark Factory VM. Each skill earns agents new capabilities.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {SKILLS.map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="bg-zinc-900/60 border border-white/5 rounded-xl p-5 hover:border-orange-500/20 transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-black font-mono text-orange-400 text-sm">{s.n}</h3>
                      <p className="text-[9px] font-mono text-zinc-600 mt-0.5">{s.r}</p>
                    </div>
                    <span className="text-[9px] font-mono bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded">{s.c} skill{s.c === 1 ? '' : 's'}</span>
                  </div>
                  <p className="text-sm text-zinc-300 leading-relaxed mb-3">{s.d}</p>
                  <p className="text-[10px] font-mono text-zinc-600 leading-relaxed">{s.k}</p>
                  <div className="flex items-center gap-2 pt-3 border-t border-white/5">
                    <span className="text-[9px] font-mono text-orange-400 uppercase tracking-wider">Capability:</span>
                    <span className="text-xs font-semibold text-white">{s.cp}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* graphify feature */}
            <div className="bg-zinc-900/60 border border-indigo-500/20 rounded-2xl p-8 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <GitBranch className="text-indigo-400" size={24} />
                <div>
                  <h3 className="font-black text-lg">graphify — Codebase Knowledge Graphs</h3>
                  <p className="text-sm text-zinc-400">Installed on all Dark Factory agents. Query any codebase in natural language.</p>
                </div>
              </div>
              <div className="bg-black/50 rounded-xl p-4 font-mono text-xs text-zinc-400 mb-4 space-y-1">
                <div><span className="text-indigo-400">$</span> graphify src/ --mode deep --wiki</div>
                <div className="text-zinc-600">→ Building graph... 847 nodes — 2,341 edges — 12 communities</div>
                <div className="text-green-400">→ graphify-out/wiki/ written. 24 articles.</div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {['Natural language query','Shortest path','Community detection','Neo4j / FalkorDB export'].map(f => (
                  <div key={f} className="bg-zinc-800/50 rounded-lg px-3 py-2 text-xs text-zinc-300">
                    <span className="text-indigo-400 mr-1.5">→</span>{f}
                  </div>
                ))}
              </div>
            </div>

            {/* obsidian-mind feature */}
            <div className="bg-zinc-900/60 border border-purple-500/20 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <Brain className="text-purple-400" size={24} />
                <div>
                  <h3 className="font-black text-lg">obsidian-mind — Persistent Agent Memory</h3>
                  <p className="text-sm text-zinc-400">18 commands. Hooks for Claude Code, Codex, Gemini CLI. Session start loads context automatically.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { t:'Session Start', d:'Reads North Star, checks active projects, scans recent memories before every session.' },
                  { t:'Brain Dump', d:'Agent dumps after meetings — updates org/people, work/active, Decision Records.' },
                  { t:'18 Commands', d:'/om-standup, /om-dump, /om-incident-capture, /om-weekly, /om-review-brief and more.' },
                ].map((c, i) => (
                  <div key={i}