import { useState, useEffect, useRef } from 'react'

// Types
interface Product {
  icon: string; color: string; colorBg: string
  name: string; tag: string; desc: string; price: string
  demo?: string; proposal?: string; live?: boolean
}
interface Agent {
  icon: string; name: string; role: string; desc: string; tags: string[]
}
interface PipelineItem {
  name: string; value: string; stage: string; stageColor: string
}
interface VM { name: string; sector: string; status: string; detail: string }

// Color mapping
const C = {
  a: '#6c63ff', c: '#00d4ff', g: '#00ff88', p: '#ec4899',
  y: '#f59e0b', bg: '#07070f', bg2: '#0d0d1c', bd: '#1c1c32',
  text: '#eeeef8', muted: '#7070a0', dim: '#2e2e50'
}

// Products
const PRODUCTS: Product[] = [
  { icon:'🔊', color:C.p, colorBg:'rgba(236,72,153,.1)', name:'DarkDesk™', tag:'Voice AI', desc:'AI voice companion. Real-time voice + chat. Lives in your own sovereign SA VM. POPIA-compliant.', price:'From R2,500/mo', demo:'https://hgjcgc2esiki.space.minimax.io', live:true },
  { icon:'🌐', color:C.g, colorBg:'rgba(0,255,136,.1)', name:'AutoFlex Pro™', tag:'Web Automation', desc:'AI agent reads webpages, fills forms, qualifies leads, books appointments automatically.', price:'From R1,500/mo', demo:'https://3twhamln9rsh.space.minimax.io' },
  { icon:'🛡️', color:C.y, colorBg:'rgba(245,158,11,.1)', name:'Red Team Agent', tag:'Cybersecurity AI', desc:'AI VM monitoring other AI agents for hallucinations, prompt injection, and PII leakage.', price:'R45,000/mo', demo:'https://w1tu0qxf216v.space.minimax.io', live:true },
  { icon:'🖥️', color:C.c, colorBg:'rgba(0,212,255,.1)', name:'ICVMS Platform', tag:'Global Markets', desc:'6 VMs connected through StudEx OS. Africa-Russia trade corridor. B-BBEE Level 1.', price:'$4,000/mo', demo:'https://a5cjrm7f1x8s.space.minimax.io', proposal:'https://j3s0jkun4cbh.space.minimax.io' },
  { icon:'🔧', color:C.a, colorBg:'rgba(108,99,255,.1)', name:'BMAD', tag:'Rapid Development', desc:'Build Me A Dashboard. Describe what you want. We build it. Powered by AI agent teams.', price:'R29/once-off', demo:'https://6g18k484b9fx.space.minimax.io' },
  { icon:'🧠', color:C.p, colorBg:'rgba(236,72,153,.1)', name:'Obsidian Mind', tag:'Enterprise AI OS', desc:'Persistent memory vault for AI agents. Every conversation, deal, document stored forever.', price:'$4,000/mo', demo:'https://idsucux7j3e4.space.minimax.io' },
  { icon:'👁️', color:C.c, colorBg:'rgba(0,212,255,.1)', name:'Computer Vision', tag:'Ntech Lab × Studex', desc:'AI-powered facial recognition, safety compliance, fraud detection. Powered by Ntech Lab.', price:'From R8,500/mo', demo:'https://nhvo1j0675qd.space.minimax.io', proposal:'https://nhvo1j0675qd.space.minimax.io' },
  { icon:'🎬', color:C.y, colorBg:'rgba(245,158,11,.1)', name:'CashClaw', tag:'Autonomous AI Worker', desc:'AI agent that finds work, does the work, gets paid in ETH. Runs 24/7 on your VM.', price:'R200/mo', demo:'https://d60ti0jcvuvw.space.minimax.io' },
]

const AGENTS: Agent[] = [
  { icon:'🤖', name:'Hermes', role:'Chief Technology Officer', desc:'Self-hosted LLM. Ollama Qwen 2.5. Persistent memory. Multi-agent orchestration.', tags:['Ollama Qwen 2.5','GitHub','Self-Hosted'] },
  { icon:'📣', name:'Naledi', role:'Chief Marketing Officer', desc:'Content calendars, social media, multi-platform campaign drafting 24/7.', tags:['20 posts/month','Analytics','Multi-platform'] },
  { icon:'🛒', name:'Auto-Commerce', role:'E-Commerce Manager', desc:'Shopify, listings, orders, inventory, customer comms.', tags:['Shopify','Inventory','Orders'] },
  { icon:'📋', name:'Robusca', role:'Chief of Staff', desc:'Coordinates all agents, manages priorities, calendar, war room.', tags:['Coordination','War Room','Reporting'] },
  { icon:'🧠', name:'Obsidian Mind', role:'Memory & Reasoning Core', desc:'Persistent vault. Semantic search. Every decision stored forever.', tags:['Vault','Semantic Search','Memory'] },
  { icon:'🎙️', name:'Voice Agent', role:'Client Communications', desc:'Real-time voice AI. Speaks to clients 24/7. OpenAI Realtime + Eleven Labs.', tags:['OpenAI Realtime','Eleven Labs','SA Phone'] },
]

const PIPELINE: PipelineItem[] = [
  { name:'SA DoH EMR Tender', value:'R200M+', stage:'TENDER', stageColor:C.y },
  { name:'LAISA Phase A', value:'R350K + R55K/mo', stage:'PROPOSAL OUT', stageColor:C.a },
  { name:'MindX Voice Agent', value:'R2.5K–25K/mo', stage:'PROPOSAL OUT', stageColor:C.a },
  { name:'Obsidian Mind / Bre Ferrari', value:'$4K/mo', stage:'PROPOSAL OUT', stageColor:C.a },
  { name:'Pharmasyntez Partnership', value:'R2.99M Y1', stage:'AWAITING', stageColor:C.p },
  { name:'Ghana AI Ministry', value:'$250M', stage:'TENDER', stageColor:C.y },
  { name:'Red Team Agent MRR', value:'R45,000/mo', stage:'LIVE ✅', stageColor:C.g },
]

const VMS: VM[] = [
  { name:'AfricaBiz', sector:'Trade & Commerce', status:'LIVE', detail:'B-BBEE Level 1 · POPIA' },
  { name:'NtechLab', sector:'AI Vision', status:'LIVE', detail:'Facial recognition, safety AI' },
  { name:'VM 05', sector:'OPEN SLOT', status:'APPLY', detail:'B-BBEE preferred' },
  { name:'Pharmasyntez', sector:'Pharma Distribution', status:'LIVE', detail:'Cold chain · SAHPRA' },
  { name:'ART Engineering', sector:'Manufacturing', status:'LIVE', detail:'DevOps · CI/CD' },
]

// Canvas animation hook
function useCanvas(canvasId: string, draw: (ctx: CanvasRenderingContext2D, t: number, w: number, h: number) => void) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current
    if (!c) return
    const ctx = c.getContext('2d')
    if (!ctx) return
    let anim = 0
    let raf = 0
    const resize = () => { c.width = c.offsetWidth; c.height = c.offsetHeight }
    const loop = () => { resize(); anim += 0.005; draw(ctx, anim, c.width, c.height); raf = requestAnimationFrame(loop) }
    const ro = new ResizeObserver(resize); ro.observe(c); resize(); raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); ro.disconnect() }
  }, [canvasId, draw])
  return ref
}

// Hero canvas
function HeroCanvas() {
  const ref = useCanvas('herocanvas', (ctx, t, W, H) => {
    ctx.clearRect(0, 0, W, H)
    const cx = W / 2, cy = H / 2, d = Math.min(W, H) * 0.32
    const pts = [
      { a: 0, c: C.a }, { a: 72, c: C.c }, { a: 144, c: C.p },
      { a: 216, c: C.y }, { a: 288, c: C.g }
    ]
    pts.forEach(p => {
      const r = (p.a + t * 20) * Math.PI / 180
      const rx = cx + d * Math.cos(r), ry = cy + d * Math.sin(r)
      // Orbit ring
      ctx.beginPath(); ctx.arc(rx, ry, 16 + Math.sin(t + p.a) * 4, 0, Math.PI * 2)
      ctx.strokeStyle = p.c + '22'; ctx.lineWidth = 1; ctx.stroke()
      // Dot
      ctx.beginPath(); ctx.arc(rx, ry, 4 + Math.sin(t * 2 + p.a) * 2, 0, Math.PI * 2)
      ctx.fillStyle = p.c; ctx.shadowColor = p.c; ctx.shadowBlur = 12; ctx.fill(); ctx.shadowBlur = 0
    })
    // Center
    ctx.beginPath(); ctx.arc(cx, cy, 8, 0, Math.PI * 2)
    ctx.fillStyle = C.a; ctx.shadowColor = C.a; ctx.shadowBlur = 16; ctx.fill(); ctx.shadowBlur = 0
    // Rings
    for (let i = 1; i <= 3; i++) {
      ctx.beginPath(); ctx.arc(cx, cy, 30 * i + Math.sin(t * 0.5) * 4, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(108,99,255,${0.08 / i})`; ctx.lineWidth = 0.5; ctx.stroke()
    }
  })
  return <canvas ref={ref} id="herocanvas" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.4 }} />
}

// VM Network canvas
function VMCanvas() {
  const ref = useCanvas('vmcanvas', (ctx, t, W, H) => {
    ctx.clearRect(0, 0, W, H)
    const cx = W / 2, cy = H / 2, rr = Math.min(W, H) * 0.32
    const vms = [
      { a: 270, c: C.a }, { a: 330, c: C.c }, { a: 30, c: C.g },
      { a: 90, c: C.p }, { a: 150, c: C.y }
    ]
    vms.forEach((v, i) => {
      const ra = (v.a - 90) * Math.PI / 180
      const px = cx + rr * Math.cos(ra), py = cy + rr * Math.sin(ra)
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(px, py)
      ctx.strokeStyle = v.c + '22'; ctx.lineWidth = 1; ctx.stroke()
      const g = ctx.createRadialGradient(px, py, 0, px, py, 30)
      g.addColorStop(0, v.c + '18'); g.addColorStop(1, 'transparent')
      ctx.beginPath(); ctx.arc(px, py, 30, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill()
      const pt = (t * 0.8 + i * 0.3) % 1
      const dx = cx + (px - cx) * pt, dy = cy + (py - cy) * pt
      ctx.beginPath(); ctx.arc(dx, dy, 3, 0, Math.PI * 2)
      ctx.fillStyle = v.c; ctx.shadowColor = v.c; ctx.shadowBlur = 6; ctx.fill(); ctx.shadowBlur = 0
    })
    for (let i = 1; i <= 3; i++) {
      ctx.beginPath(); ctx.arc(cx, cy, 40 + i * 18 + Math.sin(t * 0.7 + i) * 3, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(108,99,255,${0.06 / i})`; ctx.lineWidth = 0.5; ctx.setLineDash([4, 6]); ctx.stroke(); ctx.setLineDash([])
    }
  })
  return <canvas ref={ref} style={{ borderRadius: 12, display: 'block', width: '100%', height: 240 }} />
}

export function App() {
  const [activeTab, setActiveTab] = useState('overview')
  const [form, setForm] = useState({ name: '', email: '', company: '', type: 'Dashboard', desc: '' })
  const [submitted, setSubmitted] = useState(false)
  const [mrr] = useState(45000)
  const [pipelineValue] = useState('R203M+')
  const [taskCount] = useState(14)

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault()
    const body = `BMAD Submission\n\nName: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company || '—'}\nType: ${form.type}\n\n${form.desc}`
    window.location.href = `mailto:cto@studex-group.com?subject=BMAD Submission — ${form.name}&body=${encodeURIComponent(body)}`
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: "'Space Grotesk', sans-serif", minHeight: '100vh', WebkitFontSmoothing: 'antialiased' }}>

      {/* NAV */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', background: 'rgba(7,7,15,.95)', backdropFilter: 'blur(20px)', borderBottom: `1px solid ${C.bd}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg,${C.a},${C.c})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.6rem', fontWeight: 900, color: '#fff' }}>DF</div>
          <div>
            <div style={{ fontSize: '.6rem', fontWeight: 800, letterSpacing: '.08em', textTransform: 'uppercase', color: C.text }}>Studex Group</div>
            <div style={{ fontSize: '.5rem', color: C.dim }}>Dark Factory · OGRE Computer · 2026</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {['Products','VMs','Market','BMAD','Agents','Pipeline'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab.toLowerCase())} style={{ padding: '5px 12px', borderRadius: 7, fontSize: '.68rem', fontWeight: 500, background: activeTab === tab.toLowerCase() ? `${C.a}18` : 'transparent', color: activeTab === tab.toLowerCase() ? C.a : C.muted, border: 'none', cursor: 'pointer', transition: 'all .2s' }}>{tab}</button>
          ))}
        </div>
        <a href="#bmad" style={{ padding: '7px 16px', background: C.a, color: '#fff', borderRadius: 7, fontSize: '.7rem', fontWeight: 700, textDecoration: 'none' }}>Start a Project</a>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '80px 24px 60px', position: 'relative', overflow: 'hidden' }}>
        <HeroCanvas />
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 0%,${C.a}0f 0%,transparent 65%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 860 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 14px', background: `${C.a}18`, border: `1px solid ${C.a}33`, borderRadius: 999, fontSize: '.58rem', fontWeight: 700, color: C.a, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 20 }}>Dark Factory · OGRE Computer · Studex Group · July 2026</div>
          <h1 style={{ fontSize: 'clamp(2.8rem,8vw,6rem)', fontWeight: 900, letterSpacing: '-.03em', lineHeight: .95, marginBottom: 14, background: `linear-gradient(135deg,#fff 38%,${C.a}80)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Build. Ship. Repeat.</h1>
          <p style={{ fontSize: '1rem', color: C.muted, maxWidth: 480, margin: '0 auto 28px', lineHeight: 1.8 }}>A sovereign AI build factory. Multi-agent teams design, build, and deploy software from idea to live product in days.</p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#bmad" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 28px', background: C.a, color: '#fff', borderRadius: 10, fontWeight: 700, fontSize: '.84rem', textDecoration: 'none', boxShadow: `0 8px 28px ${C.a}66`, transition: 'all .2s' }}>Build Me A Dashboard — R29</a>
            <a href="#products" style={{ display: 'inline-flex', alignItems: 'center', padding: '12px 24px', background: 'transparent', border: `1px solid ${C.bd}`, color: C.muted, borderRadius: 10, fontWeight: 600, fontSize: '.82rem', textDecoration: 'none', transition: 'all .2s' }}>Explore Products</a>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', borderTop: `1px solid ${C.bd}`, borderBottom: `1px solid ${C.bd}`, background: C.bg2 }}>
        {[
          { val: '8', lab: 'Live Products' },
          { val: '6', lab: 'AI Agents' },
          { val: pipelineValue, lab: 'Pipeline Value' },
          { val: 'R45K', lab: 'Live MRR' },
        ].map((s, i) => (
          <div key={i} style={{ textAlign: 'center', padding: '22px 12px', borderRight: i < 3 ? `1px solid ${C.bd}` : 'none' }}>
            <span style={{ fontSize: '1.7rem', fontWeight: 900, color: C.a, display: 'block' }}>{s.val}</span>
            <span style={{ fontSize: '.54rem', textTransform: 'uppercase', letterSpacing: '.1em', color: C.dim, marginTop: 4, display: 'block', fontWeight: 600 }}>{s.lab}</span>
          </div>
        ))}
      </div>

      {/* PRODUCTS */}
      <section id="products" style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontSize: '.54rem', fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: C.a, marginBottom: 8, fontFamily: "'JetBrains Mono', monospace" }}>// THE PRODUCTS</div>
          <h2 style={{ fontSize: 'clamp(1.7rem,4vw,2.8rem)', fontWeight: 900, letterSpacing: '-.02em', lineHeight: 1.1, marginBottom: 8 }}>Everything We Build</h2>
          <p style={{ color: C.muted, maxWidth: 500, fontSize: '.86rem', lineHeight: 1.8, marginBottom: 36 }}>Eight live products. Voice AI, cybersecurity, global trade infrastructure, computer vision, autonomous workers.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 14 }}>
            {PRODUCTS.map(p => (
              <div key={p.name} style={{ background: C.bg2, border: `1px solid ${C.bd}`, borderRadius: 16, padding: 24, transition: 'all .3s', cursor: 'default' }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', marginBottom: 14, background: p.colorBg, color: p.color }}>{p.icon}</div>
                <div style={{ fontSize: '.88rem', fontWeight: 800, marginBottom: 4 }}>{p.name} {p.live && <span style={{ fontSize: '.5rem', background: `${C.g}18`, color: C.g, padding: '2px 6px', borderRadius: 999, fontWeight: 700 }}>LIVE</span>}</div>
                <div style={{ display: 'inline-flex', padding: '2px 9px', background: `${C.a}14`, border: `1px solid ${C.a}28`, borderRadius: 999, fontSize: '.54rem', color: C.a, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 8 }}>{p.tag}</div>
                <p style={{ fontSize: '.72rem', color: C.muted, lineHeight: 1.65, marginBottom: 6 }}>{p.desc}</p>
                <div style={{ fontSize: '.78rem', fontWeight: 700, color: C.a, marginBottom: 6 }}>{p.price}</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {p.demo && <a href={p.demo} target="_blank" rel="noopener" style={{ padding: '4px 10px', background: C.bg3, border: `1px solid ${C.bd}`, borderRadius: 6, fontSize: '.62rem', color: C.muted, textDecoration: 'none' }}>Demo</a>}
                  {p.proposal && <a href={p.proposal} target="_blank" rel="noopener" style={{ padding: '4px 10px', background: C.bg3, border: `1px solid ${C.bd}`, borderRadius: 6, fontSize: '.62rem', color: C.muted, textDecoration: 'none' }}>Proposal</a>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: `1px solid ${C.bd}`, maxWidth: 1200, margin: '0 auto' }} />

      {/* VM ECOSYSTEM */}
      <section id="vms" style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontSize: '.54rem', fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: C.a, marginBottom: 8, fontFamily: "'JetBrains Mono', monospace" }}>// LIVE NOW · ANIMATED</div>
          <h2 style={{ fontSize: 'clamp(1.7rem,4vw,2.8rem)', fontWeight: 900, letterSpacing: '-.02em', lineHeight: 1.1, marginBottom: 8 }}>ICVMS — VM Ecosystem</h2>
          <p style={{ color: C.muted, maxWidth: 500, fontSize: '.86rem', lineHeight: 1.8, marginBottom: 20 }}>Six VMs connected through StudEx OS. B-BBEE Level 1 · POPIA Compliant · Johannesburg SA</p>
          <div style={{ background: C.bg2, border: `1px solid ${C.bd}`, borderRadius: 16, padding: 24 }}>
            <VMCanvas />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 10, marginTop: 16 }}>
              {VMS.map(v => (
                <div key={v.name} style={{ background: C.bg3, border: v.name === 'VM 05' ? `1px solid ${C.g}44` : `1px solid ${C.bd}`, borderRadius: 10, padding: '14px 10px', textAlign: 'center' }}>
                  <div style={{ fontSize: '.68rem', fontWeight: 700, marginBottom: 2 }}>{v.name}</div>
                  <div style={{ fontSize: '.54rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', color: v.name === 'VM 05' ? C.g : C.a, marginBottom: 4 }}>{v.sector}</div>
                  <div style={{ fontSize: '.58rem', color: C.dim, lineHeight: 1.5 }}>{v.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: `1px solid ${C.bd}`, maxWidth: 1200, margin: '0 auto' }} />

      {/* COMPUTER VISION + GLOBAL MARKETS */}
      <section id="market" style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>
            <div>
              <div style={{ fontSize: '.54rem', fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: C.c, marginBottom: 8, fontFamily: "'JetBrains Mono', monospace" }}>// NEW · PARTNERSHIP</div>
              <h2 style={{ fontSize: 'clamp(1.7rem,4vw,2.8rem)', fontWeight: 900, letterSpacing: '-.02em', lineHeight: 1.1, marginBottom: 8 }}>Computer Vision<br/>Ntech Lab × Studex</h2>
              <p style={{ color: C.muted, fontSize: '.88rem', lineHeight: 1.8, marginBottom: 20 }}>Ntech Lab builds the AI. Studex deploys it across the Africa-Russia corridor. B-BBEE Level 1. POPIA compliant. 8 industry verticals.</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 20 }}>
                {['Healthcare AI', 'Anti-Fraud KYC', 'Transport AI', 'Safety Monitoring', 'Retail Loss Prev', 'Event Analytics'].map(s => (
                  <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '7px 12px', background: C.bg2, border: `1px solid ${C.bd}`, borderRadius: 8, fontSize: '.7rem', fontWeight: 600, color: C.muted }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: C.c, flexShrink: 0 }} />
                    {s}
                  </div>
                ))}
              </div>
              <a href="https://nhvo1j0675qd.space.minimax.io" target="_blank" rel="noopener" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', background: C.c, color: '#07070f', borderRadius: 10, fontWeight: 700, fontSize: '.82rem', textDecoration: 'none' }}>View Computer Vision →</a>
            </div>

            <div>
              <div style={{ fontSize: '.54rem', fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: C.a, marginBottom: 8, fontFamily: "'JetBrains Mono', monospace" }}>// STUDex GLOBAL MARKETS</div>
              <h2 style={{ fontSize: 'clamp(1.7rem,4vw,2.8rem)', fontWeight: 900, letterSpacing: '-.02em', lineHeight: 1.1, marginBottom: 8 }}>Africa-Russia<br/>Trade Infrastructure</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, margin: '16px 0' }}>
                {[['Africa-Russia Trade', C.a], ['B-BBEE Level 1', C.g], ['Johannesburg SA', C.c], ['6 VMs · 1 Platform', C.y]].map(([l, c]) => (
                  <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 12px', background: `${c}14`, border: `1px solid ${c}33`, borderRadius: 8, fontSize: '.7rem', fontWeight: 600, color: c }}><div style={{ width: 5, height: 5, borderRadius: '50%', background: c }} />{l}</div>
                ))}
              </div>
              <div style={{ background: `linear-gradient(135deg,${C.a}18,${C.c}0a)`, border: `1px solid ${C.a}33`, borderRadius: 16, padding: 20, textAlign: 'center', marginBottom: 16 }}>
                <div style={{ fontSize: '.86rem', fontWeight: 800, marginBottom: 4 }}>Apply for ICVMS VM 05</div>
                <div style={{ fontSize: '.72rem', color: C.muted, marginBottom: 10 }}>Final open partner slot. B-BBEE companies preferred.</div>
                <a href="mailto:hello@studexglobalmarkets.com?subject=VM 05 Application" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 22px', background: C.a, color: '#fff', borderRadius: 10, fontWeight: 700, fontSize: '.78rem', textDecoration: 'none' }}>Apply via Email →</a>
              </div>
              <div style={{ background: C.bg2, border: `1px solid ${C.bd}`, borderRadius: 16, padding: 18 }}>
                <div style={{ fontSize: '.68rem', fontWeight: 700, color: C.dim, marginBottom: 10, fontFamily: "'JetBrains Mono', monospace" }}>// PROPOSALS LIVE</div>
                {[
                  { n:'ICVMS Official Proposal', p:'$4K/mo · $7.59K setup', u:'https://j3s0jkun4cbh.space.minimax.io', c:C.c },
                  { n:'MindX Voice Agent', p:'$4K/mo · $7.59K setup', u:'https://9w8nktistow4.space.minimax.io', c:C.p },
                  { n:'Obsidian Mind / Bre Ferrari', p:'$4K/mo · $7.59K setup', u:'https://kidvuwlj196t.space.minimax.io', c:C.a },
                ].map(x => (
                  <div key={x.n} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: `1px solid ${C.bd}` }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: `${x.c}18`, color: x.c, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.9rem', flexShrink: 0 }}>📋</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '.78rem', fontWeight: 700 }}>{x.n}</div>
                      <div style={{ fontSize: '.68rem', color: C.a }}>{x.p}</div>
                    </div>
                    <a href={x.u} target="_blank" rel="noopener" style={{ padding: '4px 10px', background: C.bg3, border: `1px solid ${C.bd}`, borderRadius: 6, fontSize: '.6rem', color: C.muted, textDecoration: 'none' }}>View</a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: `1px solid ${C.bd}`, maxWidth: 1200, margin: '0 auto' }} />

      {/* BMAD FORM */}
      <section id="bmad" style={{ padding: '80px 24px', background: C.bg2 }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ fontSize
          <div style={{ fontSize: '.54rem', fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: C.a, marginBottom: 8, fontFamily: "'JetBrains Mono', monospace" }}>// RAPID DEVELOPMENT</div>
          <h2 style={{ fontSize: 'clamp(1.7rem,4vw,2.8rem)', fontWeight: 900, letterSpacing: '-.02em', lineHeight: 1.1, marginBottom: 8 }}>Build Me A Dashboard</h2>
          <p style={{ color: C.muted, fontSize: '.86rem', lineHeight: 1.8, marginBottom: 36 }}>R29/once-off · B-BBEE Level 1 · POPIA Compliant · Johannesburg SA</p>

          {/* Steps */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginBottom: 28 }}>
            {[{n:'1',t:'Submit',d:'Fill the brief'},{n:'2',t:'We Analyse',d:'Scope in 24h'},{n:'3',t:'We Build',d:'Deploy live'},{n:'4',t:'You Approve',d:'R29'}].map(s => (
              <div key={s.n} style={{ textAlign: 'center', padding: '16px 10px', background: C.bg, border: `1px solid ${C.bd}`, borderRadius: 12 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: `${C.a}18`, border: `1px solid ${C.a}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px', fontSize: '.7rem', fontWeight: 800, color: C.a }}>{s.n}</div>
                <div style={{ fontSize: '.74rem', fontWeight: 700, marginBottom: 2 }}>{s.t}</div>
                <div style={{ fontSize: '.62rem', color: C.dim }}>{s.d}</div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div style={{ background: C.bg, border: `1px solid ${C.bd}`, borderRadius: 16, padding: 28 }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: 40 }}>
                <div style={{ fontSize: '2rem', marginBottom: 12 }}>✅</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: 8 }}>Submission Sent!</div>
                <div style={{ fontSize: '.86rem', color: C.muted }}>We'll scope your project and respond within 24 hours.</div>
              </div>
            ) : (
              <form onSubmit={submitForm}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={{ fontSize: '.58rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', color: C.dim, marginBottom: 6 }}>Name</label>
                    <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Tumelo Ramaphosa" style={{ background: C.bg2, border: `1px solid ${C.bd}`, borderRadius: 10, padding: '11px 14px', fontSize: '.82rem', color: C.text, width: '100%' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={{ fontSize: '.58rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', color: C.dim, marginBottom: 6 }}>Email</label>
                    <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="tumelo@studexmeat.com" style={{ background: C.bg2, border: `1px solid ${C.bd}`, borderRadius: 10, padding: '11px 14px', fontSize: '.82rem', color: C.text, width: '100%' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={{ fontSize: '.58rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', color: C.dim, marginBottom: 6 }}>Company</label>
                    <input value={form.company} onChange={e => setForm({...form, company: e.target.value})} placeholder="Studex Group" style={{ background: C.bg2, border: `1px solid ${C.bd}`, borderRadius: 10, padding: '11px 14px', fontSize: '.82rem', color: C.text, width: '100%' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={{ fontSize: '.58rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', color: C.dim, marginBottom: 6 }}>Type</label>
                    <select value={form.type} onChange={e => setForm({...form, type: e.target.value})} style={{ background: C.bg2, border: `1px solid ${C.bd}`, borderRadius: 10, padding: '11px 14px', fontSize: '.82rem', color: C.text, width: '100%', appearance: 'none' }}>
                      {['Dashboard','Landing Page','Web App','Voice Agent','Automation','CRM','Other'].map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <div style={{ gridColumn: '1/-1', display: 'flex', flexDirection: 'column' }}>
                    <label style={{ fontSize: '.58rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', color: C.dim, marginBottom: 6 }}>Project Description</label>
                    <textarea required rows={4} value={form.desc} onChange={e => setForm({...form, desc: e.target.value})} placeholder="Describe what you want built. Be specific about features, integrations, users..." style={{ background: C.bg2, border: `1px solid ${C.bd}`, borderRadius: 10, padding: '11px 14px', fontSize: '.82rem', color: C.text, width: '100%', resize: 'vertical' }} />
                  </div>
                </div>
                <button type="submit" style={{ width: '100%', padding: 14, background: C.a, color: '#fff', borderRadius: 10, fontSize: '.92rem', fontWeight: 700, boxShadow: `0 8px 28px ${C.a}55`, cursor: 'pointer', border: 'none', transition: 'all .2s' }}>Submit Project — R29 →</button>
              </form>
            )}
          </div>
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: `1px solid ${C.bd}`, maxWidth: 1200, margin: '0 auto' }} />

      {/* AGENTS */}
      <section id="agents" style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontSize: '.54rem', fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: C.a, marginBottom: 8, fontFamily: "'JetBrains Mono', monospace" }}>// INTELLIGENCE LAYER</div>
          <h2 style={{ fontSize: 'clamp(1.7rem,4vw,2.8rem)', fontWeight: 900, letterSpacing: '-.02em', lineHeight: 1.1, marginBottom: 36 }}>The AI Agent Team</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 14 }}>
            {AGENTS.map(a => (
              <div key={a.name} style={{ background: C.bg2, border: `1px solid ${C.bd}`, borderRadius: 16, padding: 20 }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', marginBottom: 12, background: `${C.a}18`, color: C.a }}>{a.icon}</div>
                <div style={{ fontSize: '.82rem', fontWeight: 800, marginBottom: 2 }}>{a.name}</div>
                <div style={{ fontSize: '.56rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', color: C.a, marginBottom: 6 }}>{a.role}</div>
                <p style={{ fontSize: '.7rem', color: C.muted, lineHeight: 1.65, marginBottom: 8 }}>{a.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                  {a.tags.map(t => <span key={t} style={{ padding: '3px 9px', background: C.bg3, border: `1px solid ${C.bd}`, borderRadius: 6, fontSize: '.6rem', fontWeight: 600, color: C.muted }}>{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: `1px solid ${C.bd}`, maxWidth: 1200, margin: '0 auto' }} />

      {/* PIPELINE */}
      <section id="pipeline" style={{ padding: '80px 24px', background: C.bg2 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontSize: '.54rem', fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: C.a, marginBottom: 8, fontFamily: "'JetBrains Mono', monospace" }}>// REVENUE PIPELINE</div>
          <h2 style={{ fontSize: 'clamp(1.7rem,4vw,2.8rem)', fontWeight: 900, letterSpacing: '-.02em', lineHeight: 1.1, marginBottom: 8 }}>Live Opportunity Board</h2>
          <p style={{ color: C.muted, fontSize: '.86rem', marginBottom: 28 }}>Track every proposal, tender, and partnership in the pipeline.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 12 }}>
            {PIPELINE.map(p => (
              <div key={p.name} style={{ background: C.bg, border: `1px solid ${C.bd}`, borderRadius: 12, padding: 16, display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '.82rem', fontWeight: 800, marginBottom: 4 }}>{p.name}</div>
                  <div style={{ fontSize: '.7rem', color: C.muted }}>{p.stage === 'LIVE ✅' ? <span style={{ color: C.g }}>{p.stage}</span> : <span style={{ color: C.a }}>{p.stage}</span>}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '.9rem', fontWeight: 800, color: C.a }}>{p.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: `1px solid ${C.bd}`, maxWidth: 1200, margin: '0 auto' }} />

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${C.bd}`, background: C.bg }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24, flexWrap: 'wrap' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg,${C.a},${C.c})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.6rem', fontWeight: 900, color: '#fff' }}>DF</div>
              <div style={{ fontSize: '.62rem', fontWeight: 800, textTransform: 'uppercase', color: C.text }}>Studex Group</div>
            </div>
            <div style={{ fontSize: '.66rem', color: C.dim, lineHeight: 2 }}>
              Dark Factory · OGRE Computer<br/>
              B-BBEE Level 1 · POPIA Compliant<br/>
              Johannesburg, South Africa<br/>
              <a href="mailto:cto@studex-group.com" style={{ color: C.a }}>cto@studex-group.com</a>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '.68rem', color: C.dim, lineHeight: 2 }}>
              <strong style={{ color: C.muted }}>FNB Banking</strong><br/>
              Studex Group<br/>
              Account: 62760837610<br/>
              Branch: Woodmead<br/>
              Code: 250-655 · SWIFT: FIRNZAJJ
            </div>
          </div>
        </div>
        <div style={{ borderTop: `1px solid ${C.bd}`, padding: '16px 24px', textAlign: 'center', fontSize: '.56rem', color: C.dim }}>
          © 2026 Studex Group · Dark Factory · OGRE Computer · B-BBEE Level 1 · POPIA Compliant
        </div>
      </footer>
    </div>
  )
}

export default App
