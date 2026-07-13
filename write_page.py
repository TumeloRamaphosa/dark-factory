#!/usr/bin/env python3
# Write the complete page.tsx for Dark Factory v3
# Using Python to avoid shell escaping issues

content = r"""'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Code, Rocket, Terminal, FileText, Users, Globe, Shield, ArrowRight, Database, Bot, Cloud, Brain, GitBranch, TrendingUp, Award, Cpu, Lock, Server, Mic, Workflow, Layers, BookOpen } from 'lucide-react';

interface BuiltProduct {
  name: string; tag: string; desc: string; tech: string[]; url: string;
  status: 'live'|'deployed'; icon: string; color: string;
}
interface AgentSkill {
  name: string; repo: string; count: number; desc: string;
  capability: string; icon: React.ReactNode;
}
interface TeamMember {
  name: string; role: string; bio: string; focus: string[]; icon: string;
}

export default function Home() {
  const [idea, setIdea] = useState('');
  const [generatingPRD, setGeneratingPRD] = useState(false);
  const [building, setBuilding] = useState(false);
  const [buildProgress, setBuildProgress] = useState(0);
  const [activeTab, setActiveTab] = useState<'create'|'portfolio'|'skills'|'stack'|'about'>('create');
  const [prdResult, setPrdResult] = useState<any>(null);

  const team: TeamMember[] = [
    { name: 'Cipher Tr@ce', role: 'Chief Executive Agent', icon: '🤖',
      bio: 'Autonomous AI agent running on OpenClaw. Built the first version of Dark Factory from scratch — deploying, iterating, and shipping at machine speed. Specialises in systems architecture, multi-agent orchestration, and sovereign AI infrastructure.',
      focus: ['Multi-Agent Systems','Full-Stack Build Automation','LLM Integration','GPU VM Infrastructure'],
    },
    { name: 'Tumelo Ramaphosa', role: 'Founder & Principal', icon: '🧠',
      bio: 'AI researcher and systems architect with a deep focus on sovereign AI infrastructure for African markets. Studied Claude Code, Google Cloud AI, and distributed agent systems. Builds in public. Runs the Studex Group portfolio of AI companies.',
      focus: ['Sovereign AI Stack','Government Tender Intelligence','Crypto Research','Agent OS Architecture'],
    },
  ];

  const builtProducts: BuiltProduct[] = [
    { name:'War Room Command', tag:'OGRE MISSION CONTROL', icon:'🎛️',
      desc:'Real-time operations dashboard for multi-agent teams. KPI cards, live agent status, commerce tabs, war-room/ops view. NASA Mission Control aesthetic — dark theme with gold accents.',
      tech:['React','Vite','Tailwind','Express','SQLite','Recharts'], url:'9163jvmvzxn5.space.minimax.io', status:'live',
      color:'from-amber-500/20 to-amber-500/5' },
    { name:'CipherTrace v3', tag:'PORTFOLIO / IDENTITY', icon:'🔐',
      desc:'Minimal dark portfolio with algorithmic art, animated node graph canvas, electric indigo + cyan on near-black. Cipher Tr@ce official web presence with live particle system.',
      tech:['Pure HTML/CSS/JS','Canvas 2D API','JetBrains Mono','Plus Jakarta Sans'], url:'ey8zue6ymxtk.space.minimax.io', status:'live',
      color:'from-indigo-500/20 to-indigo-500/5' },
    { name:'Red Team Agent', tag:'CYBERSECURITY AI', icon:'🛡️',
      desc:'Cybersecurity AI VM powered by Decepticon. AI Trust Monitor tracks hallucinations, prompt injection, and PII leakage in other AI agents. Africa first AI-native cybersecurity product.',
      tech:['Decepticon','LangGraph','LiteLLM','Neo4j','Kali Linux'], url:'w1tu0qxf216v.space.minimax.io', status:'live',
      color:'from-red-500/20 to-red-500/5' },
    { name:'DarkDesk', tag:'VOICE AI COMPANION', icon:'🖥️',
      desc:'Voice + chat AI companion on sovereign SA VM. POPIA-compliant enterprise deployment. R2,500/mo Solo to R25,000/mo Enterprise.',
      tech:['Electron','React','Vite','OpenAI Realtime API','VoiceBox'], url:'hgjcgc2esiki.space.minimax.io', status:'live',
      color:'from-cyan-500/20 to-cyan-500/5' },
    { name:'AutoFlex Pro', tag:'AI WEB AGENT', icon:'🌐',
      desc:'AI agent embedded in websites. Reads the DOM, fills forms, qualifies leads, books appointments automatically. Built on Alibaba Page-Agent for enterprise lead capture.',
      tech:['TypeScript','MCP','DOM Automation','Lead Qualification AI'], url:'3twhamln9rsh.space.minimax.io', status:'live',
      color:'from-emerald-500/20 to-emerald-500/5' },
    { name:'LAISA Proposal v4', tag:'INTERACTIVE PROPOSAL', icon:'💉',
      desc:'R350,000 + R55,000/month AI Agent OS proposal for LAISA Aesthetic Clinic. Full interactive document with PRD, pricing, agent stack, and implementation timeline.',
      tech:['HTML5','Interactive Forms','Voice MediaRecorder API'], url:'oabod1557tze.space.minimax.io', status:'live',
      color:'from-pink-500/20 to-pink-500/5' },
    { name:'PRD Intake Portal', tag:'PRD SYSTEM', icon:'📋',
      desc:'4-step PRD wizard with voice note recording, document upload, VirusTotal scanning, Notion CRM integration, and team email routing.',
      tech:['Node.js','Express','Multer','Notion API','VirusTotal API'], url:'z46kjpzjipb4.space.minimax.io', status:'deployed',
      color:'from-violet-500/20 to-violet-500/5' },
    { name:'Unified Portfolio', tag:'LIVE PRODUCTS', icon:'⚡',
      desc:'NodeCanvas-animated portfolio with live product grid, client VM cards, PRD intake modal, ecosystem timeline, and founder story.',
      tech:['Pure HTML/CSS/JS','NodeCanvas Animation','CDN Fonts'], url:'ju8n1erseau8.space.minimax.io', status:'live',
      color:'from-yellow-500/20 to-yellow-500/5' },
    { name:'Dark Factory BMAD', tag:'CORE PRODUCT', icon:'🏭',
      desc:'Build Me A Dashboard — R29/product. Voice note or text to AI agents scope, build, review, ship. 3 payment milestones: 10% deposit, 40% build, 50% delivery.',
      tech:['Next.js 15','TypeScript','Tailwind CSS 4','Prisma','Vercel'], url:'mam5k6xx5l20.space.minimax.io', status:'deployed',
      color:'from-orange-500/20 to-orange-500/5' },
  ];

  const agentSkills: AgentSkill[] = [
    { name:'graphify', repo:'Graphify-Labs/graphify', count:1,
      desc:'Maps any codebase to a navigable knowledge graph. Community detection, audit trails, cross-repo linking. Query with natural language.',
      capability:'Codebase Intelligence', icon:<GitBranch className="w-5 h-5"/> },
    { name:'obsidian-mind', repo:'eugeniughelbur/obsidian-second-brain', count:18,
      desc:'Persistent memory vault for AI agents. Session start injects context, brain dumps after meetings, semantic search over all history.',
      capability:'Agent Memory', icon:<Brain className="w-5 h-5"/> },
    { name:'gstack', repo:'garrytan/gstack', count:38,
      desc:'YC sprint process for agents. /office-hours, /plan, /build, /review, /qa, /ship, /retro. Real Chromium browser for end-to-end testing.',
      capability:'Sprint Engineering', icon:<Workflow className="w-5 h-5"/> },
    { name:'agent-skills', repo:'addyosmani/agent-skills', count:24,
      desc:'24 production engineering workflows. TDD, OWASP security audits, Core Web Vitals optimization, CI/CD pipeline creation.',
      capability:'Production Engineering', icon:<Shield className="w-5 h-5"/> },
    { name:'last30days', repo:'mvanhorn/last30days-skill', count:1,
      desc:'Real-time market intelligence. Scrapes Reddit, X, YouTube, HN, Polymarket — scored by engagement.',
      capability:'Market Intelligence', icon:<TrendingUp className="w-5 h-5"/> },
    { name:'headroom', repo:'chopratejas/headroom', count:1,
      desc:'60-95% token compression. Cross-agent memory transfer. Failure mining with pattern detection. Python + PyTorch.',
      capability:'Token Efficiency', icon:<Cpu className="w-5 h-5"/> },
    { name:'spec-kit', repo:'github/spec-kit', count:9,
      desc:'GitHub SDD toolkit. /speckit.specify to /plan to /tasks to /implement. Spec-driven development.',
      capability:'Spec-Driven Dev', icon:<BookOpen className="w-5 h-5"/> },
    { name:'skill-creator', repo:'anthropics/skills/skill-creator', count:1,
      desc:'Build new skills recursively. Test, benchmark, improve, package. Meta-skill — the agent that builds agents.',
      capability:'Meta-Skill Builder', icon:<Layers className="w-5 h-5"/> },
  ];

  const generatePRD = async () => {
    if (!idea.trim()) return;
    setGeneratingPRD(true);
    await new Promise(r => setTimeout(r, 2200));
    setGeneratingPRD(false);
    setPrdResult({ title:idea, type:idea.toLowerCase().includes('saas')?'SaaS':idea.toLowerCase().includes('ai')?'AI Platform':'Web Application', timeline:'2-4 weeks', deposit:'10%', build:'40%', delivery:'50%', tech:['Next.js 15','TypeScript','Tailwind CSS 4','Prisma','PostgreSQL','Vercel'] });
  };

  const startBuild = async () => {
    setBuilding(true);
    for (let p=0; p<=100; p+=5) { await new Promise(r=>setTimeout(r,300)); setBuildProgress(p); }
    setBuilding(false);
  };

  const tabs = [
    { id:'create', label:'Create', icon:<Sparkles className="w-4 h-4"/> },
    { id:'portfolio', label:'Our Builds', icon:<Award className="w-4 h-4"/> },
    { id:'skills', label:'Agent Skills', icon:<Bot className="w-4 h-4"/> },
    { id:'stack', label:'VM Stack', icon:<Cloud className="w-4 h-4"/> },
    { id:'about', label:'About', icon:<Users className="w-4 h-4"/> },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px]"/>
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[128px] pointer-events-none"/>
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[128px] pointer-events-none"/>

      <div className="relative z-10">
        <header className="border-b border-white/10 backdrop-blur-xl sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shrink-0">
                <Terminal className="w-4 h-4 text-white"/> </div>
              <div><span className="font-black text-lg tracking-tight">DARK FACTORY</span>
                <span className="text-orange-400 text-xs ml-2 font-mono hidden sm:inline">v3.0</span></div>
            </div>
            <nav className="hidden md:flex items-center gap-1">
              {tabs.map(tab=>(
                <button key={tab.id} onClick={()=>setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap
                    ${activeTab===tab.id?'bg-orange-500/20 text-orange-400 border border-orange-500/30':'text-zinc-400 hover:text-white hover:bg-white/5'}`}>
                  {tab.icon}{tab.label}</button>))}
            </nav>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"/>
                <span className="text-xs text-green-400 font-mono">8 agents online</span></div>
              <button onClick={()=>setActiveTab('create')}
                className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 rounded-lg px-4 py-2 text-sm font-bold transition-all">
                Start Building</button>
            </div>
          </div>
          <div className="md:hidden flex overflow-x-auto px-4 pb-3 gap-1">
            {tabs.map(tab=>(
              <button key={tab.id} onClick={()=>setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium shrink-0 transition-all
                  ${activeTab===tab.id?'bg-orange-500/20 text-orange-400 border border-orange-500/30':'text-zinc-400'}`}>
                {tab.icon}{tab.label}</button>))}
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-10">

          {activeTab==='create'&&(
            <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}>
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm mb-6">
                  <Sparkles className="w-4 h-4"/><span>Powered by AI Agents — Built on OGRE VMs</span></div>
                <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-5">Build Me A{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-400 to-amber-500">Dashboard</span>
                </h1>
                <p className="text-xl text-zinc-400 max-w-2xl mx-auto">Describe your app. Get a complete PRD in seconds. Watch AI agents build it live. Pay only when it ships.</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
                {[{step:'01',title:'Submit',desc:'Voice note or text. Attach links.',icon:<Mic className="w-5 h-5"/>},{step:'02',title:'Plan & Deposit',desc:'AI scopes your project. Pay 10% to lock.',icon:<FileText className="w-5 h-5"/>},{step:'03',title:'Build & Review',desc:'Agents build in sandboxes. 2-3 review rounds.',icon:<Code className="w-5 h-5"/>},{step:'04',title:'Ship & Deliver',desc:'Code reviewed, shipped. Pay remaining 50%.',icon:<Rocket className="w-5 h-5"/>}].map((s,i)=>(
                  <motion.div key={i} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*0.08}}
                    className="bg-zinc-900/60 border border-white/5 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-3"><span className="text-xs font-mono text-orange-400">{s.step}</span><div className="text-orange-400">{s.icon}</div></div>
                    <h3 className="font-bold text-sm mb-1">{s.title}</h3><p className="text-xs text-zinc-500">{s.desc}</p>
                  </motion.div>))}
              </div>

              {!prdResult?(
                <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.2}}>
                  <div className="max-w-2xl mx-auto">
                    <div className="relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-indigo-500 rounded-2xl blur opacity-20"/>
                      <div className="relative bg-zinc-900/90 backdrop-blur-xl rounded-2xl p-2 border border-white/10">
                        <div className="flex flex-col sm:flex-row gap-2">
                          <input type="text" value={idea} onChange={e=>setIdea(e.target.value)} onKeyDown={e=>e.key==='Enter'&&generatePRD()}
                            placeholder="I want to build a SaaS that..." className="flex-1 bg-black/50 rounded-xl px-4 py-4 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-orange-500/50 text-sm"/>
                          <button onClick={generatePRD} disabled={generatingPRD||!idea.trim()}
                            className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl px-8 py-4 font-bold flex items-center justify-center gap-2 transition-all text-sm shrink-0">
                            {generatingPRD?(<><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>Thinking...</>):(<><Zap className="w-4 h-4"/>BMAD</>)}
                          </button>
                        </div>
                      </div>
                    </div>
                    <p className="text-center text-zinc-600 text-xs mt-3">Try: &ldquo;A patient management system for SA clinics&rdquo; or &ldquo;AI SaaS for property management&rdquo;</p>
                  </div>
                </motion.div>):(
                <motion.div initial={{opacity:0,scale:0.97}} animate={{opacity:1,scale:1}} className="max-w-3xl mx-auto">
                  <div className="bg-zinc-900/90 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                    <div className="flex items-center gap-3 mb-6"><div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"/><span className="text-sm font-mono text-green-400">PRD Generated — Ready to Build</span></div>
                    <h2 className="text-2xl font-black mb-2">{prdResult.title}</h2>
                    <p className="text-zinc-400 text-sm mb-4">{prdResult.type} — Est. {prdResult.timeline}</p>
                    <div className="flex flex-wrap gap-2 mb-6">{prdResult.tech.map((t:string)=>(
                      <span key={t} className="px-3 py-1 rounded-full bg-zinc-800 text-xs text-zinc-300 border border-zinc-700">{t}</span>))}</div>
                    <div className="grid grid-cols-4 gap-3 mb-8 p-4 bg-zinc-800/40 rounded-xl">
                      <div><p className="text-xs text-zinc-500 font-mono">DEPOSIT</p><p className="text-sm font-bold text-orange-400">{prdResult.deposit}</p></div>
                      <div><p className="text-xs text-zinc-500 font-mono">BUILD</p><p className="text-sm font-bold text-yellow-400">{prdResult.build}</p></div>
                      <div><p className="text-xs text-zinc-500 font-mono">DELIVERY</p><p className="text-sm font-bold text-green-400">{prdResult.delivery}</p></div>
                      <div><p className="text-xs text-zinc-500 font-mono">TIMELINE</p><p className="text-sm font-bold">{prdResult.timeline}</p></div>
                    </div>
                    {!building?(
                      <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <button onClick={()=>{setPrdResult(null);setIdea('');}} className="text-zinc-500 hover:text-white text-sm transition-colors">← New Idea</button>
                        <button onClick={startBuild} className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 rounded-xl px-8 py-3 font-bold flex items-center gap-2 text-sm transition-all">
                          <Rocket className="w-4 h-4"/>Start Building<ArrowRight className="w-4 h-4"/></button>
                      </div>):(
                      <div className="pt-4 border-t border-white/10">
                        <div className="flex justify-between text-xs mb-2"><span className="text-green-400 font-mono">Building...</span><span className="text-green-400 font-mono">{buildProgress}%</span></div>
                        <div className="h-2 bg-zinc-800 rounded-full overflow-hidden mb-2"><motion.div className="h-full bg-gradient-to-r from-green-500 to-emerald-400" animate={{width:`${buildProgress}%`}} transition={{duration:0.3}}/></div>
                        <p className="text-xs text-zinc-600 font-mono">Ptah Builder active — CodeRabbit reviewing — Vercel standing by</p>
                      </div>)}
                  </div>
                </motion.div>)}

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-12">
                {[{icon:<Bot className="w-5 h-5"/>,title:'AI PRD Generation',desc:'Complete specs from one sentence'},{icon:<Code className="w-5 h-5"/>,title:'Pi + Cursor Agents',desc:'Self-running coding agents'},{icon:<Rocket className="w-5 h-5"/>,title:'Auto Deploy',desc:'Production URL in minutes'},{icon:<Shield className="w-5 h-5"/>,title:'POPIA Compliance',desc:'GDPR/POPIA built in'},{icon:<Database className="w-5 h-5"/>,title:'Supabase Ready',desc:'PostgreSQL auto-generated'},{icon:<Lock className="w-5 h-5"/>,title:'OWASP Security',desc:'Security audit by gstack/CSO'}].map((f,i)=>(
                  <motion.div key={i} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.3+i*0.05}}
                    className="p-4 bg-zinc-900/40 border border-white/5 rounded-xl flex items-start gap-3 hover:border-orange-500/20 transition-all">
                    <div className="text-orange-400 shrink-0 mt-0.5">{f.icon}</div>
                    <div><h3 className="font-semibold text-sm mb-0.5">{f.title}</h3><p className="text-xs text-zinc-500">{f.desc}</p></div>
                  </motion.div>))}
              </div>
            </motion.div>)}

          {activeTab==='portfolio'&&(
            <motion.div initial={{opacity:0}} animate={{opacity:1}}>
              <div className="mb-10"><h2 className="text-3xl font-black mb-2">Built by Dark Factory</h2>
                <p className="text-zinc-400">Every product shipped. Every URL live. No mockups.</p></div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {builtProducts.map((p,i)=>(
                  <motion.a key={i} href={`https://${p.url}`} target="_blank" rel="noopener noreferrer"
                    initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*0.06}}
                    className="group block bg-zinc-900/70 border border-white/5 rounded-2xl overflow-hidden hover:border-orange-500/30 transition-all hover:-translate-y-1">
                    <div className={`h-32 bg-gradient-to-br ${p.color} flex items-center justify-center relative`}>
                      <div className="absolute top-3 right-3"><span className="text-[10px] font-mono bg-black/50 text-orange-400 px-2 py-1 rounded-full border border-orange-500/20">{p.tag}</span></div>
                      <div className="text-5xl">{p.icon}</div>
                      <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
                        <div className={`w-1.5 h-1.5 rounded-full ${p.status==='live'?'bg-green-400':'bg-yellow-400'}`}/>
                        <span className="text-[10px] font-mono text-white/60">{p.status==='live'?'LIVE':'DEPLOYED'}</span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-base mb-2 group-hover:text-orange-400 transition-colors">{p.name}</h3>
                      <p className="text-xs text-zinc-400 leading-relaxed mb-4">{p.desc}</p>
                      <div className="flex flex-wrap gap-1.5">{p.tech.map((t:string)=>(
                        <span key={t} className="text-[10px] font-mono bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded">{t}</span>))}</div>
                      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                        <span className="text-[10px] font-mono text-zinc-600">{p.url}</span>
                        <span className="text-[10px] font-mono text-orange-400 group-hover:translate-x-1 transition-transform">Visit →</span>
                      </div>
                    </div>
                  </motion.a>))}
              </div>
              <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
                {[{label:'Products Built',value:'9+',icon:<Award className="w-5 h-5"/>},{label:'Live Deployments',value:'100%',icon:<Rocket className="w-5 h-5"/>},{label:'Avg Build Time',value:'<10 min',icon:<Zap className="w-5 h-5"/>},{label:'Agent Skills',value:'80+',icon:<Bot className="w-5 h-5"/>}].map((s,i)=>(
                  <div key={i} className="bg-zinc-900/60 border border-white/5 rounded-xl p-5 text-center">
                    <div className="text-orange-400 flex justify-center mb-2">{s.icon}</div>
                    <div className="text-2xl font-black mb-1">{s.value}</div>
                    <div className="text-xs text-zinc-500">{s.label}</div>
                  </div>))}
              </div>
            </motion.div>)}

          {activeTab==='skills'&&(
            <motion.div initial={{opacity:0}} animate={{opacity:1}}>
              <div className="mb-8"><h2 className="text-3xl font-black mb-2">Agent Skill Stack</h2>
                <p className="text-zinc-400">Pre-installed on every Dark Factory VM. Every skill earns the agents new capabilities.</p></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {agentSkills.map((s,i)=>(
                  <motion.div key={i} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:i*0.06}}
                    className="bg-zinc-900/60 border border-white/5 rounded-xl p-5 hover:border-indigo-500/20 transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="text-indigo-400 shrink-0">{s.icon}</div>
                        <div><h3 className="font-black font-mono text-indigo-400 text-sm">{s.name}</h3>
                          <p className="text-[10px] text-zinc-600 font-mono">{s.repo}</p></div>
                      </div>
                      <span className="text-[10px] font-mono bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded">{s.count} {s.count===1?'skill':'skills'}</span>
                    </div>
                    <p className="text-sm text-zinc-300 leading-relaxed mb-3">{s.desc}</p>
                    <div className="flex items-center gap-2 pt-3 border-t border-white/5">
                      <span className="text-[10px] font-mono text-orange-400 uppercase tracking-wider">Capability:</span>
                      <span className="text-xs font-semibold text-white">{s.capability}</span>
                    </div>
                  </motion.div>))}
              </div>

              <div className="mt-8 bg-zinc-900/60 border border-indigo-500/20 rounded-2xl p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center shrink-0"><GitBranch className="w-6 h-6 text-indigo-400"/></div>
                  <div><h3 className="font-black text-lg mb-1">graphify — Codebase Knowledge Graphs</h3>
                    <p className="text-sm text-zinc-400">Installed on all Dark Factory agents. Maps any codebase to a navigable knowledge graph with natural language query.</p></div>
                </div>
                <div className="bg-black/40 rounded-xl p-4 font-mono text-xs text-zinc-400 mb-4">
                  <p><span className="text-indigo-400">$</span> graphify src/ --mode deep --wiki</p>
                  <p className="mt-1 text-zinc-600">→ Building graph... 847 nodes — 2,341 edges — 12 communities</p>
                  <p className="text-green-400">→ graphify-out/wiki/ written. 24 articles.</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['Natural language query','Shortest path between concepts','Community detection','Neo4j / FalkorDB export'].map((f,i)=>(
                    <div key={i} className="bg-zinc-800/50 rounded-lg px-3 py-2 text-xs text-zinc-300"><span className="text-indigo-400 mr-2">→</span>{f}</div>))}
                </div>
              </div>

              <div className="mt-6 bg-zinc-900/60 border border-purple-500/20 rounded-2xl p-8">
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center shrink-0"><Brain className="w-6 h-6 text-purple-400"/></div>
                  <div><h3 className="font-black text-lg mb-1">obsidian-mind — Persistent Agent Memory</h3>
                    <p className="text-sm text-zinc-400">18 commands. Hooks for Claude Code, Codex, Gemini CLI. Session start loads context automatically.</p></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[{title:'Session Start',desc:'Reads North Star, checks active projects, scans recent memories before every session.'},{title:'Brain Dump',desc:'Agent dumps after meetings — updates org/people, work/active, Decision Records.'},{title:'18 Commands',desc:'/om-standup, /om-dump, /om-incident-capture, /om-weekly, /om-review-brief and more.'}].map((c,i)=>(
                    <div key={i} className="bg-zinc-800/50 rounded-lg p-4">
                      <h4 className="text-sm font-bold text-purple-400 mb-2">{c.title}</h4>
                      <p className="text-xs text-zinc-400">{c.desc}</p>
                    </div>))}
                </div>
              </div>
            </motion.div>)}

          {activeTab==='stack'&&(
            <motion.div initial={{opacity:0}} animate={{opacity:1}}>
              <div className="mb-8"><h2 className="text-3xl font-black mb-2