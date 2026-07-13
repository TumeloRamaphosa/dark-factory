#!/usr/bin/env python3
content = r'''import {useState,useEffect,useRef} from "react"

const NAV = ["Products","VM Ecosystem","Global Markets","Build Me A Dashboard","AI Agents","YouTube Scripts"]
const PRD = [
  {i:"V",b:"bg-pink-500/10",n:"DarkDesk",t:"Voice AI",p:"AI voice companion. Real-time voice + chat. Own sovereign SA VM. POPIA-compliant.",pr:"From R2,500/mo",l:[{l:"Demo",h:"https://hgjcgc2esiki.space.minimax.io"},{l:"Proposal",h:"https://9w8nktistow4.space.minimax.io"}]},
  {i:"W",b:"bg-emerald-500/10",n:"AutoFlex Pro",t:"Web Automation",p:"AI reads webpages, fills forms, qualifies leads, books appointments automatically.",pr:"From R1,500/mo",l:[{l:"Demo",h:"https://3twhamln9rsh.space.minimax.io"},{l:"Build yours",h:"#bmad"}]},
  {i:"S",b:"bg-amber-500/10",n:"Red Team Agent",t:"Cybersecurity AI",p:"AI VM monitoring other AI agents for hallucinations, prompt injection, PII leakage.",pr:"R45,000/mo",l:[{l:"Demo",h:"https://w1tu0qxf216v.space.minimax.io"},{l:"Proposal",h:"https://kidvuwlj196t.space.minimax.io"}]},
  {i:"I",b:"bg-indigo-500/10",n:"ICVMS Platform",t:"Global Markets",p:"6 VMs connected through StudEx OS. Africa-Russia trade corridor infrastructure.",pr:"$4,000/mo",l:[{l:"Proposal",h:"https://j3s0jkun4cbh.space.minimax.io"},{l:"Full Demo",h:"https://a5cjrm7f1x8s.space.minimax.io"}]},
  {i:"B",b:"bg-cyan-500/10",n:"BMAD",t:"Rapid Development",p:"Build Me A Dashboard. Describe what you want. We build it. Powered by AI agent teams.",pr:"R29/once-off",l:[{l:"Start now",h:"#bmad"},{l:"View tool",h:"https://6g18k484b9fx.space.minimax.io"}]},
  {i:"O",b:"bg-red-500/10",n:"Obsidian Mind",t:"Enterprise AI OS",p:"Persistent memory vault. Every conversation, deal, document stored forever.",pr:"$4,000/mo",l:[{l:"Proposal",h:"https://kidvuwlj196t.space.minimax.io"},{l:"VM Demo",h:"https://idsucux7j3e4.space.minimax.io"}]},
]
const AGENTS = [
  {i:"H",n:"Hermes",r:"Chief Technology Officer",p:"Self-hosted LLM. Ollama Qwen 2.5. Persistent memory. Multi-agent orchestration. Zero external API calls.",s:["Ollama Qwen 2.5","GitHub","Self-Hosted"]},
  {i:"N",n:"Naledi",r:"Chief Marketing Officer",p:"Content calendars, social media scheduling, multi-platform campaign drafting 24/7.",s:["20 posts/month","Analytics","Multi-platform"]},
  {i:"A",n:"Auto-Commerce",r:"E-Commerce Manager",p:"Manages Shopify, product listings, orders, inventory, customer communication.",s:["Shopify","Inventory","Orders"]},
  {i:"R",n:"Robusca",r:"Chief of Staff",p:"Coordinates all agents, manages priorities, maintains the operational calendar and War Room.",s:["Coordination","War Room","Reporting"]},
  {i:"M",n:"Obsidian Mind",r:"Memory and Reasoning Core",p:"Persistent vault. Semantic search. Decision records. Client history. Agents never start from zero.",s:["Vault","Semantic Search","Memory"]},
  {i:"V",n:"Voice Agent",r:"Client Communications",p:"Real-time voice AI. Speaks to clients 24/7. Qualifies leads, books appointments.",s:["OpenAI Realtime","Eleven Labs","SA Phone"]},
]
const VMS = [
  {n:"AfricaBiz",s:"Trade & Commerce",p:"B-BBEE Level 1 · POPIA Compliant",o:false},
  {n:"NtechLab",s:"AI Facial Recognition",p:"Computer vision. OpenJarvis integration.",o:false},
  {n:"VM 05",s:"Your Company",p:"Apply now. B-BBEE preferred.",o:true},
  {n:"Pharmasyntez",s:"Pharma Distribution",p:"Cold chain. SAHPRA licensed.",o:false},
  {n:"ART Engineering",s:"Manufacturing",p:"Infrastructure · DevOps · CI/CD",o:false},
]
const STEPS = [
  {n:"1",t:"Submit",d:"Fill the brief. Describe your project in plain English."},
  {n:"2",t:"We Analyse",d:"Our agents scope and plan the build in 24 hours."},
  {n:"3",t:"We Build",d:"CodeRabbit reviews every PR. Built and deployed."},
  {n:"4",t:"You Approve",d:"R29. 50% now, 50% on approval."},
]
const TYPES = ["Dashboard","Landing Page","Web App","Voice Agent","Automation","CRM","Other"]

function VCanvas() {
  const ref = useRef(null)
  useEffect(() => {
    const cv = ref.current
    if (!cv) return
    const ctx = cv.getContext("2d")
    if (!ctx) return
    let W = cv.offsetWidth || 600; const H = 280; cv.height = H
    const cx = W/2, cy = H/2, rr = Math.min(W,H)*0.32
    const vms = [{a:270,c:"#6c63ff"},{a:330,c:"#00d4ff"},{a:30,c:"#10b981"},{a:90,c:"#ec4899"},{a:150,c:"#f59e0b"}]
    let t = 0
    const draw = () => {
      if (!ctx) return
      ctx.clearRect(0,0,W,H); t += 0.008
      vms.forEach((v,i) => {
        const ra = (v.a-90)*Math.PI/180
        const px = cx+rr*Math.cos(ra), py = cy+rr*Math.sin(ra)
        ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(px,py)
        ctx.strokeStyle = v.c+"22"; ctx.lineWidth = 1; ctx.stroke()
        const g = ctx.createRadialGradient(px,py,0,px,py,30)
        g.addColorStop(0,v.c+"18"); g.addColorStop(1,"transparent")
        ctx.beginPath(); ctx.arc(px,py,30,0,Math.PI*2); ctx.fillStyle=g; ctx.fill()
        const pt = (t*0.8+i*0.3)%1
        const dx=cx+(px-cx)*pt, dy=cy+(py-cy)*pt
        ctx.beginPath(); ctx.arc(dx,dy,3,0,Math.PI*2)
        ctx.fillStyle=v.c; ctx.shadowColor=v.c; ctx.shadowBlur=6; ctx.fill(); ctx.shadowBlur=0
      })
      for(let i=1;i<=3;i++){
        ctx.beginPath()
        ctx.arc(cx,cy,40+i*18+Math.sin(t*0.7+i)*3,0,Math.PI*2)
        ctx.strokeStyle="rgba(108,99,255,"+String(0.06/i)+")"
        ctx.setLineDash([4,6]); ctx.lineWidth=0.5; ctx.stroke(); ctx.setLineDash([])
      }
      requestAnimationFrame(draw)
    }
    draw()
    const ro = new ResizeObserver(()=>{ if(ref.current){W=ref.current.offsetWidth; ref.current.width=W} })
    ro.observe(cv)
    return ()=>ro.disconnect()
  },[])
  return <canvas ref={ref} className="w-full rounded-xl" style={{height:"280px",display:"block"}}/>
}

function HCanvas() {
  const ref = useRef(null)
  useEffect(() => {
    const cv = ref.current
    if (!cv) return
    const ctx = cv.getContext("2d")
    if (!ctx) return
    let W=cv.offsetWidth||800, H=cv.offsetHeight||600; cv.width=W; cv.height=H
    const cx=W/2, cy=H/2
    const pts = [{a:0,c:"#6c63ff"},{a:72,c:"#00d4ff"},{a:144,c:"#ec4899"},{a:216,c:"#f59e0b"},{a:288,c:"#10b981"}]
    let t=0
    const draw = () => {
      if (!ctx) return
      ctx.clearRect(0,0,W,H); t+=0.006
      const dist = Math.min(W,H)*0.3
      pts.forEach((p,i) => {
        const ra = (p.a+t*20)*Math.PI/180
        const rx=cx+dist*Math.cos(ra), ry=cy+dist*Math.sin(ra)
        ctx.beginPath(); ctx.arc(rx,ry,4+Math.sin(t+i)*2,0,Math.PI*2)
        ctx.fillStyle=p.c; ctx.shadowColor=p.c; ctx.shadowBlur=12; ctx.fill(); ctx.shadowBlur=0
        ctx.beginPath(); ctx.arc(rx,ry,16+Math.sin(t+i)*4,0,Math.PI*2)
        ctx.strokeStyle=p.c+"22"; ctx.lineWidth=1; ctx.stroke()
      })
      ctx.beginPath(); ctx.arc(cx,cy,8,0,Math.PI*2)
      ctx.fillStyle="#6c63ff"; ctx.shadowColor="#6c63ff"; ctx.shadowBlur=16; ctx.fill(); ctx.shadowBlur=0
      for(let i=1;i<=3;i++){
        ctx.beginPath()
        ctx.arc(cx,cy,30*i+Math.sin(t*0.5)*4,0,Math.PI*2)
        ctx.strokeStyle="rgba(108,99,255,"+String(0.08/i)+")"; ctx.lineWidth=0.5; ctx.stroke()
      }
      requestAnimationFrame(draw)
    }
    draw()
    const ro = new ResizeObserver(()=>{if(ref.current){W=ref.current.offsetWidth;H=ref.current.offsetHeight;ref.current.width=W;ref.current.height=H}})
    ro.observe(cv)
    return ()=>ro.disconnect()
  },[])
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" style={{zIndex:0,opacity:0.45}}/>
}

export default function App() {
  const [fm, setFm] = useState({n:"",e:"",c:"",t:"Dashboard",d:""})
  const se = (e: React.ChangeEvent<HTMLInputElement>) => setFm(x=>({...x,[e.target.name]:e.target.value}))
  const st = (e: React.ChangeEvent<HTMLTextAreaElement>) => setFm(x=>({...x,[e.target.name]:e.target.value}))
  const ss = (e: React.ChangeEvent<HTMLSelectElement>) => setFm(x=>({...x,t:e.target.value}))
  const sub = (ev: React.FormEvent) => {
    ev.preventDefault()
    const m = "BMAD Submission\n\nName: "+fm.n+"\nEmail: "+fm.e+"\nCompany: "+fm.c+"\nType: "+fm.t+"\n\n"+fm.d
    window.location.href = "mailto:cto@studex-group.com?subject=BMAD Submission — "+fm.n+"&body="+encodeURIComponent(m)
  }

  return (
    <div className="min-h-screen bg-[#07070f] text-gray-200 font-sans antialiased">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 h-16"
        style={{background:"rgba(7,7,15,0.93)",backdropFilter:"blur(20px)",borderBottom:"1px solid #1c1c32"}}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black text-white" style={{background:"linear-gradient(135deg,#6c63ff,#00d4ff)"}}>DF</div>
          <div>
            <div className="text-xs font-extrabold text-gray-100 tracking-widest uppercase">Dark Factory</div>
            <div className="text-xs text-gray-500">OGRE Computer · Studex Group · 2026</div>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {NAV.map((n,i) => (
            <a key={i} href={"#"+n.toLowerCase().replace(/ /g,"-")} className="text-sm text-gray-500 hover:text-gray-200 transition-colors">{n}</a>
          ))}
        </div>
        <a href="#bmad" className="px-5 py-2.5 rounded-lg text-sm font-bold text-white transition-opacity hover:opacity-90" style={{background:"#6c63ff",boxShadow:"0 4px 20px rgba(108,99,255,0.4)"}}>Start a Project</a>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <HCanvas />
        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase mb-8"
            style={{background:"rgba(108,99,255,0.1)",border:"1px solid rgba(108,99,255,0.2)",color:"#6c63ff"}}>
            Dark Factory · OGRE Computer · Studex Group · July 2026
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-6"
            style={{background:"linear-gradient(135deg,#fff 40%,rgba(255,255,255,0.35))",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
            Build. Ship.<br/>Repeat.
          </h1>
          <p className="text-lg text-gray-400 max-w-lg mx-auto mb-10 leading-relaxed">
            A sovereign AI build factory. Multi-agent teams design, build, and deploy software from idea to live product in days.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#bmad" className="px-8 py-4 rounded-xl text-base font-bold text-white transition-opacity hover:opacity-90"
              style={{background:"#6c63ff",boxShadow:"0 8px 32px rgba(108,99,255,0.45)"}}>
              Build Me A Dashboard — R29
            </a>
            <a href="#vms" className="px-8 py-4 rounded-xl text-base font-semibold border text-gray-400 border-gray-800 hover:border-gray-600 transition-colors">
              Explore VM Ecosystem
            </a>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="grid grid-cols-4" style={{borderTop:"1px solid #1c1c32",borderBottom:"1px solid #1c1c32",background:"#0d0d1c"}}>
        {[["6","Live Products"],["5","AI Agents"],["R200M+","Tender Pipeline"],["$4K","MRR Target"]].map(([n,l])=>(
          <div key={n} className="text-center py-10 px-4" style={{borderRight:"1px solid #1c1c32"}}>
            <div className="text-3xl font-black text-indigo-400 block">{n}</div>
            <div className="text-xs uppercase tracking-widest text-gray-600 mt-2 font-semibold">{l}</div>
          </div>
        ))}
      </div>

      {/* PRODUCTS */}
      <section id="products" className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{color:"#6c63ff"}}>The Products</div>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Everything We Build</h2>
        <p className="text-gray-500 max-w-xl mb-12 leading-relaxed">Six live products. Each built, deployed, and earning. Voice AI, web automation, cybersecurity, ICVMS, BMAD, Obsidian Mind.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PRD.map(p=>(
            <div key={p.n} className="rounded-2xl p-7 border transition-all hover:border-indigo-500/30" style={{background:"#0d0d1c",borderColor:"#1c1c32"}}>
              <div className="text-2xl w-12 h-12 rounded-xl flex items-center justify-center mb-5 font-black" style={{background:p.b}}>{p.i}</div>
              <div className="text-lg font-bold mb-1">{p.n}</div>
              <div className="inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4" style={{background:"rgba(108,99,255,0.08)",border:"1px solid rgba(108,99,255,0.15)",color:"#6c63ff"}}>{p.t}</div>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">{p.p}</p>
              <div className="text-sm font-bold mb-4" style={{color:"#6c63ff"}}>{p.pr}</div>
              <div className="flex gap-2 flex-wrap">
                {p.l.map(l=>(
                  <a key={l.l} href={l.h} target="_blank" rel="noopener"
                    className="px-3 py-1.5 rounded-lg text-xs border text-gray-500 hover:text-gray-300 transition-colors" style={{borderColor:"#1c1c32",background:"#11111f"}}>{l.l}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6"><div style={{borderTop:"1px solid #1c1c32"}}/></div>

      {/* VM ECOSYSTEM */}
      <section id="vms" className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{color:"#6c63ff"}}>Live Now · Animated</div>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">ICVMS — VM Ecosystem</h2>
        <p className="text-gray-500 max-w-xl mb-10 leading-relaxed">Six VMs connected through StudEx OS. B-BBEE Level 1 · POPIA Compliant · Johannesburg SA</p>
        <div className="rounded-2xl p-6 border" style={{background:"#0d0d1c",borderColor:"#1c1c32"}}>
          <VCanvas />
          <div className="grid grid-cols-5 gap-3 mt-6">
            {VMS.map(v=>(
              <div key={v.n} className="rounded-xl p-4 text-center border" style={{background:v.o?"rgba(16,185,129,0.03)":"#11111f",borderColor:v.o?"rgba(16,185,129,0.4)":"#1c1c32"}}>
                <div className="text-sm font-bold mb-1">{v.n}</div>
                <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{color:v.o?"#10b981":"#6c63ff"}}>{v.s}</div>
                <div className="text-xs text-gray-600 leading-snug">{v.p}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6"><div style={{borderTop:"1px solid #1c1c32"}}/></div>

      {/* GLOBAL MARKETS */}
      <section id="market" className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{color:"#6c63ff"}}>Studex Global Markets</div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">Africa-Russia<br/>Trade Infrastructure</h2>
            <p className="text-gray-500 mb-8 leading-relaxed">Built for the Africa-Russia trade corridor. B-BBEE Level 1. POPIA compliant. 6 VMs. 1 platform.</p>
            <div className="flex flex-wrap gap-3 mb-8">
              {[["Africa-Russia Trade","#6c63ff"],["B-BBEE Level 1","#10b981"],["Johannesburg SA","#00d4ff"],["6 VMs","#f59e0b"]].map(([l,c])=>(
                <div key={l} className="flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold" style={{background:"#0d0d1c",borderColor:"#1c1c32",color:"#7070a8"}}>
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{background:c}}/>{l}
                </div>
              ))}
            </div>
            <div className="rounded-2xl p-6 border text-center" style={{background:"linear-gradient(135deg,rgba(108,99,255,0.08),rgba(0,212,255,0.04))",borderColor:"rgba(108,99,255,0.2)"}}>
              <div className="text-lg font-bold mb-2">Apply for VM 05</div>
              <div className="text-sm text-gray-500 mb-4">The final ICVMS partner slot. B-BBEE companies preferred.</div>
              <a href="mailto:hello@studexglobalmarkets.com?subject=VM 05 Application" className="inline-block px-6 py-2.5 rounded-lg text-sm font-bold text-white transition-opacity hover:opacity-90" style={{background:"#6c63ff"}}>Apply via Email</a>
            </div>
          </div>
          <div className="space-y-4">
            {[
              {l:"I",c:"bg-cyan-500/10",n:"ICVMS Official Proposal",tag:"Official · Minima UI",p:"Minima sophisticated UI. All 5 partner logos, VM specs, pricing tiers, FNB bank details.",pr:"$4,000/mo · $7,590 setup",links:[{l:"Proposal",h:"https://j3s0jkun4cbh.space.minimax.io"},{l:"Full Demo",h:"https://a5cjrm7f1x8s.space.minimax.io"}]},
              {l:"M",c:"bg-red-500/10",n:"MindX Voice Agent",tag:"New Proposal",p:"Voice AI for MindX. Own SA VM. 4 agents. Built in 4 weeks.",pr:"$4,000/mo · $7,590 setup",links:[{l:"Proposal",h:"https://9w8nktistow4.space.minimax.io"},{l:"Start PRD",h:"#bmad"}]},
            ].map(x=>(
              <div key={x.n} className="rounded-2xl p-6 border" style={{background:"#0d0d1c",borderColor:"#1c1c32"}}>
                <div className="flex items-start gap-4">
                  <div className="text-2xl w-12 h-12 rounded-xl flex items-center justify-center font-black flex-shrink-0" style={{background:x.c}}>{x.l}</div>
                  <div className="flex-1">
                    <div className="text-lg font-bold mb-1">{x.n}</div>
                    <div className="inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3" style={{background:"rgba(108,99,255,0.08)",border:"1px solid rgba(108,99,255,0.15)",color:"#6c63ff"}}>{x.tag}</div>
                    <p className="text-sm text-gray-500 leading-relaxed mb-3">{x.p}</p>
                    <div className="text-sm font-bold mb-3" style={{color:"#6c63ff"}}>{x.pr}</div>
                    <div className="flex gap-2 flex-wrap">
                      {x.links.map(l=>(
                        <a key={l.l} href={l.h} target="_blank" rel="noopener" className="px-3 py-1.5 rounded-lg text-xs border text-gray-500 hover:text-gray-300 transition-colors" style={{borderColor:"#1c1c32",background:"#11111f"}}>{l.l}</a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6"><div style={{borderTop:"1px solid #1c1c32"}}/></div>

      {/* BMAD */}
      <section id="bmad" className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{color:"#6c63ff"}}>Rapid Development</div>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Build Me A Dashboard</h2>
        <p className="text-gray-500 max-w-xl mb-10 leading-relaxed">R29/once-off · B-BBEE Level 1 · POPIA Compliant · Johannesburg SA</p>
        <div className="rounded-2xl p-8 border" style={{background:"#0d0d1c",borderColor:"#1c1c32"}}>
          <div className="grid grid-cols-4 gap-4 mb-10">
            {STEPS.map(s=>(
              <div key={s.n} className="text-center p-5 rounded-xl border" style={{background:"#11111f",borderColor:"#1c1c32"}}>
                <div className="w-8 h-8 rounded-full mx-auto mb-3 flex items-center justify-center text-sm font-black" style={{background:"rgba(108,99,255,0.1)",border:"1px solid rgba(108,99,255,0.2)",color:"#6c63ff"}}>{s.n}</div>
                <div className="text-sm font-bold mb-2">{s.t}</div>
                <div className="text-xs text-gray-600 leading-relaxed">{s.d}</div>
              </div>
            ))}
          </div>
          <form onSubmit={sub} className="grid grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-gray-600 block mb-2">Name</label>
              <input name="n" value={fm.n} onChange={se} placeholder="Tumelo Ramaphosa" required type="text"
                className="w-full rounded-xl px-4 py-3 text-sm outline-none bg-[#11111f] border text-gray-200 placeholder-gray-700 focus:border-indigo-500/50" style={{borderColor:"#1c1c32"}}/>
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-gray-600 block mb-2">Email</label>
              <input name="e" value={fm.e} onChange={se} placeholder="tumelo@studexmeat.com" required type="email"
                className="w-full rounded-xl px-4 py-3 text-sm outline-none bg-[#11111f] border text-gray-200 placeholder-gray-700 focus:border-indigo-500/50" style={{borderColor:"#1c1c32"}}/>
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-gray-600 block mb-2">Company</label>
              <input name="c" value={fm.c} onChange={se} placeholder="Studex Group" type="text"
                className="w-full rounded-xl px-4 py-3 text-sm outline-none bg-[#11111f] border text-gray-200 placeholder-gray-700 focus:border-indigo-500/50" style={{borderColor:"#1c1c32"}}/>
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-gray-600 block mb-2">Type</label>
              <select value={fm.t} onChange={ss} className="w-full rounded-xl px-4 py-3 text-sm outline-none bg-[#11111f] border text-gray-200" style={{borderColor:"#1c1c32"}}>
                {TYPES.map(o=><option key={o}>{o}</option>)}
              </select>
            </div>
            <div className="col-span-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-600 block mb-2">Project Description</label>
              <textarea name="d" value={fm.d} onChange={st} rows={4} placeholder="Describe what you want built. Be specific about features, integrations, users..."
                className="w-full rounded-xl px-4 py-3 text-sm outline-none resize-none bg-[#11111f] border text-gray-200 placeholder-gray-700 focus:border-indigo-500/50" style={{borderColor:"#1c1c32"}}/>
            </div>
            <div className="col-span-2 flex justify-center pt-2">
              <button type="submit" className="px-12 py-4 rounded-xl text-base font-bold text-white transition-opacity hover:opacity-90" style={{background:"#6c63ff",boxShadow:"0 8px 32px rgba(108,99,255,0.45)"}}>
                Submit Project — R29
              </button>
            </div>
          </form>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6"><div style={{borderTop:"1px solid #1c1c32"}}/></div>

      {/* AGENTS */}
      <section id="agents" className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{color:"#6c63ff"}}>Intelligence Layer</div>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">The AI Agent Team</h2>
        <p className="text-gray-500 max-w-xl mb-12 leading-relaxed">Six specialist agents. Each running 24/7. OpenJarvis + Ollama + Eleven Labs + Cursor.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {AGENTS.map(a=>(
            <div key={a.n} className="rounded-2xl p-6 border" style={{background:"#0d0d1c",borderColor:"#1c1c32"}}>
              <div className="text-2xl w-12 h-12 rounded-xl flex items-center justify-center font-black mb-4" style={{background:"rgba(108,99,255,0.1)",color:"#6c63ff"}}>{a.i}</div>
              <div className="text-base font-bold mb-0.5">{a.n}</div>
              <div className="text-xs font-bold uppercase tracking-wider mb-3" style={{color:"#6c63ff"}}>{a.r}</div>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">{a.p}</p>
              <div className="flex flex-wrap gap-2">
                {a.s.map(s=>(
                  <span key={s} className="px-2.5 py-1 rounded-lg text-xs font-semibold" style={{background:"#11111f",border:"1px solid #1c1c32",color:"#7070a8"}}>{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t mt-8" style={{borderColor:"#1c1c32",background:"#0d0d1c"}}>
        <div className="max-w-6xl mx-auto px-6 py-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black text-white" style={{background:"linear-gradient(135deg,#6c63ff,#00d4ff)"}}>DF</div>
            <div>
              <div className="text-xs font-bold text-gray-400">Dark Factory</div>
              <div className="text-xs text-gray-600">OGRE Computer · Studex Group · 2026</div>
            </div>
          </div>
          <div className="text-xs text-gray-600 text-right">
            cto@studex-group.com<br/>
            Johannesburg, South Africa
          </div>
        </div>
      </footer>
    </div>
  )
}
'''

with open('/workspace/df-site/src/App.tsx', 'w') as f:
    f.write(content)

size = len(content)
lines = content.count('\n')
print(f"Written: {size} bytes, {lines} lines")
'''

with open('/workspace/build_df.py', 'w') as f:
    f.write(content)

import subprocess
result = subprocess.run(['python3', '/workspace/build_df.py'], capture_output=True, text=True)
print(result.stdout)
if result.returncode != 0:
    print("ERROR:", result.stderr)
