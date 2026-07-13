import { useState, useEffect, useRef } from 'react'

const NAV_LINKS = [
  { label: 'Products', href: '#products' },
  { label: 'VM Ecosystem', href: '#vms' },
  { label: 'Global Markets', href: '#market' },
  { label: 'Build Me A Dashboard', href: '#bmad' },
  { label: 'AI Agents', href: '#agents' },
  { label: 'Global Launch', href: '#event' },
  { label: 'YouTube Scripts', href: '#scripts' },
]

const PRODUCTS = [
  { icon: 'V', bg: 'rgba(236,72,153,.1)', name: 'DarkDesk', tag: 'Voice AI', tagClass: '', desc: 'AI voice companion. Real-time voice + chat. Lives in your own sovereign SA VM. POPIA-compliant.', price: 'From R2,500/mo', links: [{ label: 'Demo', href: 'https://hgjcgc2esiki.space.minimax.io' }, { label: 'Proposal', href: 'https://9w8nktistow4.space.minimax.io' }] },
  { icon: 'W', bg: 'rgba(16,185,129,.1)', name: 'AutoFlex Pro', tag: 'Web Automation', tagClass: 'g', desc: 'AI agent reads webpages, fills forms, qualifies leads, books appointments automatically.', price: 'From R1,500/mo', links: [{ label: 'Demo', href: 'https://3twhamln9rsh.space.minimax.io' }, { label: 'Build yours', href: '#bmad' }] },
  { icon: 'S', bg: 'rgba(245,158,11,.1)', name: 'Red Team Agent', tag: 'Cybersecurity AI', tagClass: '', desc: 'AI VM monitoring other AI agents for hallucinations, prompt injection, PII leakage.', price: 'R45,000/mo · Live MRR', links: [{ label: 'Demo', href: 'https://w1tu0qxf216v.space.minimax.io' }, { label: 'Proposal', href: 'https://kidvuwlj196t.space.minimax.io' }] },
  { icon: 'I', bg: 'rgba(108,99,255,.1)', name: 'ICVMS Platform', tag: 'Global Markets', tagClass: 'c', desc: 'Integrated Company VM System. 5 partner VMs connected through StudEx OS.', price: '$4,000/mo', links: [{ label: 'Proposal', href: 'https://j3s0jkun4cbh.space.minimax.io' }, { label: 'Full Demo', href: 'https://a5cjrm7f1x8s.space.minimax.io' }] },
  { icon: 'B', bg: 'rgba(0,212,255,.1)', name: 'BMAD', tag: 'Rapid Development', tagClass: '', desc: 'Build Me A Dashboard. Describe what you want. We build it.', price: 'R29/once-off', links: [{ label: 'Start now', href: '#bmad' }, { label: 'View BMAD', href: 'https://6g18k484b9fx.space.minimax.io' }] },
  { icon: 'O', bg: 'rgba(239,68,68,.1)', name: 'Obsidian Mind', tag: 'Enterprise AI OS', tagClass: 'p', desc: 'Persistent memory vault for AI agents. Every conversation, deal, document stored forever.', price: '$4,000/mo', links: [{ label: 'Proposal', href: 'https://kidvuwlj196t.space.minimax.io' }, { label: 'VM Demo', href: 'https://idsucux7j3e4.space.minimax.io' }] },
]

const AGENTS = [
  { icon: 'H', name: 'Hermes', role: 'Chief Technology Officer', desc: 'Self-hosted LLM, persistent memory, multi-agent orchestration. Zero external API calls for reasoning.', specs: ['Ollama Qwen 2.5', 'GitHub', 'Self-Hosted'] },
  { icon: 'N', name: 'Naledi', role: 'Chief Marketing Officer', desc: 'Manages content calendars, social media scheduling, and campaign drafting across all major platforms.', specs: ['20 posts/month', 'Analytics', 'Multi-platform'] },
  { icon: 'A', name: 'Auto-Commerce', role: 'E-Commerce Manager', desc: 'Manages Shopify, product listings, order workflows, inventory, and customer communication.', specs: ['Shopify', 'Inventory', 'Orders'] },
  { icon: 'R', name: 'Robusca', role: 'Chief of Staff', desc: 'Coordinates all agents, manages priorities, maintains the operational calendar.', specs: ['Coordination', 'War Room', 'Reporting'] },
  { icon: 'O', name: 'Obsidian Mind', role: 'Memory and Reasoning Core', desc: 'Persistent memory vault. Semantic search. Decision records. Client history.', specs: ['Vault', 'Semantic Search', 'Memory'] },
  { icon: 'V', name: 'Voice Agent', role: 'Client Communications', desc: 'Real-time voice AI. Speaks to clients, qualifies leads, books appointments 24/7.', specs: ['OpenAI Realtime', 'Eleven Labs', 'SA Phone'] },
]

const VMS = [
  { name: 'AfricaBiz', sector: 'Trade and Commerce', specs: 'Trade flow · Compliance', open: false },
  { name: 'NtechLab', sector: 'AI Facial Recognition', specs: 'Computer Vision · AI Models', open: false },
  { name: 'VM 05 — OPEN', sector: 'Your Company Here', specs: 'Apply now · B-BBEE preferred', open: true },
  { name: 'Pharmasyntez', sector: 'Pharma Distribution', specs: 'Cold Chain · SAHPRA', open: false },
  { name: 'ART Engineering', sector: 'Manufacturing', specs: 'Infrastructure · DevOps', open: false },
]

const SCRIPTS = [
  { icon: '1', title: 'How to Launch a Business in SA 2026', tag: 'Business', dur: '12 min', desc: 'The complete A-Z guide. From idea to first revenue. Real story, real lessons.' },
  { icon: '2', title: 'The AI Opportunity for African Entrepreneurs', tag: 'AI Opportunity', dur: '12 min', desc: 'Why Africa is the biggest untapped AI market. Framework for finding AI opportunities.' },
  { icon: '3', title: 'Build a Global Business from Africa', tag: 'Global Trade', dur: '16 min', desc: 'Studex journey from butcher shop to Africa-Russia trade corridor platform.' },
]

function App() {
  const vmRef = useRef<HTMLCanvasElement>(null)
  const heroRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const vm = vmRef.current
    if (!vm) return
    const ctx = vm.getContext('2d')
    if (!ctx) return
    let W = vm.offsetWidth
    let H = 280
    vm.width = W
    vm.height = H
    let t = 0
    const cx = W / 2
    const cy = H / 2
    const r = Math.min(W, H) * 0.32
    const vms = [
      { angle: 270, color: '#6c63ff' },
      { angle: 330, color: '#00d4ff' },
      { angle: 30, color: '#10b981' },
      { angle: 90, color: '#ec4899' },
      { angle: 150, color: '#f59e0b' },
    ]
    function draw() {
      if (!ctx) return
      ctx.clearRect(0, 0, W, H)
      t += 0.008
      vms.forEach((vm, i) => {
        const rad = (vm.angle - 90) * Math.PI / 180
        const x = cx + r * Math.cos(rad)
        const y = cy + r * Math.sin(rad)
        ctx.beginPath()
        ctx.moveTo(cx, cy)
        ctx.lineTo(x, y)
        ctx.strokeStyle = vm.color + '22'
        ctx.lineWidth = 1
        ctx.stroke()
        const g = ctx.createRadialGradient(x, y, 0, x, y, 30)
        g.addColorStop(0, vm.color + '18')
        g.addColorStop(1, 'transparent')
        ctx.beginPath()
        ctx.arc(x, y, 30, 0, Math.PI * 2)
        ctx.fillStyle = g
        ctx.fill()
        const pt = ((t * 0.8 + i * 0.3) % 1)
        const px = cx + (x - cx) * pt
        const py = cy + (y - cy) * pt
        ctx.beginPath()
        ctx.arc(px, py, 3, 0, Math.PI * 2)
        ctx.fillStyle = vm.color
        ctx.shadowColor = vm.color
        ctx.shadowBlur = 6
        ctx.fill()
        ctx.shadowBlur = 0
      })
      for (let i = 1; i <= 3; i++) {
        ctx.beginPath()
        ctx.arc(cx, cy, 40 + i * 18 + Math.sin(t * 0.7 + i) * 3, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(108,99,255,${0.06 - i * 0.015})`
        ctx.setLineDash([4, 6])
        ctx.lineWidth = 0.5
        ctx.stroke()
        ctx.setLineDash([])
      }
      requestAnimationFrame(draw)
    }
    draw()
    const ro = new ResizeObserver(() => { W = vm.offsetWidth; vm.width = W })
    ro.observe(vm)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const c = heroRef.current
    if (!c) return
    const ctx = c.getContext('2d')
    if (!ctx) return
    let W = c.offsetWidth
    let H = c.offsetHeight
    c.width = W
    c.height = H
    let t = 0
    const cx2 = W / 2
    const cy2 = H / 2
    function draw() {
      if (!ctx) return
      ctx.clearRect(0, 0, W, H)
      t += 0.006
      const pts = [
        { angle: 0, color: '#6c63ff' },
        { angle: 72, color: '#00d4ff' },
        { angle: 144, color: '#ec4899' },
        { angle: 216, color: '#f59e0b' },
        { angle: 288, color: '#10b981' },
      ]
      pts.forEach((p, i) => {
        const rad = (p.angle + t * 20) * Math.PI / 180
        const dist = Math.min(W, H) * 0.3
        const x = cx2 + dist * Math.cos(rad)
        const y = cy2 + dist * Math.sin(rad)
        ctx.beginPath()
        ctx.arc(x, y, 4 + Math.sin(t + i) * 2, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.shadowColor = p.color
        ctx.shadowBlur = 12
        ctx.fill()
        ctx.shadowBlur = 0
        ctx.beginPath()
        ctx.arc(x, y, 16 + Math.sin(t + i) * 4, 0, Math.PI * 2)
        ctx.strokeStyle = p.color + '20'
        ctx.lineWidth = 1
        ctx.stroke()
      })
      ctx.beginPath()
      ctx.arc(cx2, cy2, 8, 0, Math.PI * 2)
      ctx.fillStyle = '#6c63ff'
      ctx.shadowColor = '#6c63ff'
      ctx.shadowBlur = 16
      ctx.fill()
      ctx.shadowBlur = 0
      for (let ring = 1; ring <= 3; ring++) {
        ctx.beginPath()
        ctx.arc(cx2, cy2, 30 * ring + Math.sin(t * 0.5) * 4, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(108,99,255,${0.08 / ring})`
        ctx.lineWidth = 0.5
        ctx.stroke()
      }
      requestAnimationFrame(draw)
    }
    draw()
    const ro = new ResizeObserver(() => { W = c.offsetWidth; H = c.offsetHeight; c.width = W; c.height = H })
    ro.observe(c)
    return () => ro.disconnect()
  }, [])

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = data.get('name') as string
    const email = data.get('email') as string
    const company = data.get('company') as string
    const type = data.get('type') as string
    const desc = data.get('desc') as string
    const msg = `New BMAD submission from ${name} (${company} / ${email})\nType: ${type}\n\n${desc}`
    window.location.href = `mailto:cto@studex-group.com?subject=BMAD Submission — ${name}&body=${encodeURIComponent(msg)}`
  }

  return (
    <div style={{ background: '#07070f', color: '#eeeef8', fontFamily: "'Plus Jakarta Sans', sans-serif", minHeight: '100vh', WebkitFontSmoothing: 'antialiased' }}>
      {/* NAV */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 3rem', height: 62, background: 'rgba(7,7,15,.93)', backdropFilter: 'blur(20px)', borderBottom: '1px solid #1c1c32' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 9, background: 'linear-gradient(135deg, #6c63ff, #00d4ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.7rem', fontWeight: 900, color: '#fff' }}>DF</div>
          <div>
            <div style={{ fontSize: '.7rem', fontWeight: 800, color: '#eeeef8', letterSpacing: '.1em', textTransform: 'uppercase' }}>Dark Factory</div>
            <div style={{ fontSize: '.55rem', color: '#7070a8' }}>OGRE Computer · Studex Group</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '2rem', flex: 1, justifyContent: 'center }}>
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} style={{ fontSize: '.72rem', color: '#7070a8', fontWeight: 500 }}>{l.label}</a>
          ))}
        </div>
        <a href="#bmad" style={{ display: 'inline-flex', padding: '8px 18px', background: '#6c63ff', color: '#fff', borderRadius: 8, fontSize: '.72rem', fontWeight: 700 }}>Start a Project</a>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '5rem 2rem 3rem', position: 'relative', overflow: 'hidden' }}>
        <canvas ref={heroRef} style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.5 }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 900 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 16px', background: 'rgba(108,99,255,.1)', border: '1px solid rgba(108,99,255,.2)', borderRadius: 999, fontSize: '.62rem', color: '#6c63ff', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: '1.8rem' }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#6c63ff', animation: 'bd 2s infinite' }} />
            Dark Factory · OGRE Computer · Studex Group · 2026
          </div>
          <h1 style={{ fontSize: 'clamp(2.6rem, 8vw, 6rem)', fontWeight: 900, lineHeight: .95, letterSpacing: '-.03em', marginBottom: '1.2rem', background: 'linear-gradient(135deg, #fff 30%, rgba(255,255,255,.4%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Build. Ship.<br />Repeat.
          </h1>
          <p style={{ fontSize: '.98rem', color: '#7070a8', maxWidth: 500, margin: '0 auto 2.5rem', lineHeight: 1.9 }}>
            A sovereign AI build factory. Multi-agent teams design, build, and deploy software from idea to live product in days.
          </p>
          <div style={{ display: 'flex', gap: '.9rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#bmad" style={{ display: 'inline-flex', padding: '13px 30px', background: '#6c63ff', color: '#fff', borderRadius: 10, fontWeight: 700, fontSize: '.88rem', boxShadow: '0 8px 30px rgba(108,99,255,.4)' }}>Build Me A Dashboard — R29</a>
            <a href="#vms" style={{ display: 'inline-flex', padding: '12px 26px', background: 'transparent', border: '1px solid #272745', color: '#7070a8', borderRadius: 10, fontWeight: 600, fontSize: '.85rem' }}>Explore VM Ecosystem</a>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderTop: '1px solid #1c1c32', borderBottom: '1px solid #1c1c32', background: '#0d0d1c' }}>
        {[['6','Live Products'],['5','AI Agents'],['R200M+','Tender Pipeline'],['$4K','MRR Target']].map(([n,l]) => (
          <div key={n} style={{ textAlign: 'center', padding: '1.5rem 1rem', borderRight: '1px solid #1c1c32' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#6c63ff', display: 'block' }}>{n}</div>
            <div style={{ fontSize: '.6rem', textTransform: 'uppercase', letterSpacing: '.1em', color: '#40406a', marginTop: 4, fontWeight: 600 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* PRODUCTS */}
      <section id="products" style={{ padding: '6rem 2rem', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ fontSize: '.6rem', textTransform: 'uppercase', letterSpacing: '.2em', color: '#6c63ff', fontWeight: 700, marginBottom: '.6rem' }}>The Products</div>
        <h2 style={{ fontSize: 'clamp(1.5rem,4vw,2.4rem)', fontWeight: 900, letterSpacing: '-.02em', lineHeight: 1.1, marginBottom: '.6rem' }}>Everything We Build</h2>
        <p style={{ color: '#7070a8', maxWidth: 480, fontSize: '.9rem', lineHeight: 1.8, marginBottom: '2.5rem' }}>Six live products. Each built, deployed, and earning.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(265px, 1fr)', gap: '1rem' }}>
          {PRODUCTS.map(p => (
            <div key={p.name} style={{ background: '#0d0d1c', border: '1px solid #1c1c32', borderRadius: 16, padding: '1.7rem', transition: 'all .3s' }}>
              <div style={{ width: 44, height: 44, borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', marginBottom: '.9rem', background: p.bg }}>{p.icon}</div>
              <div style={{ fontSize: '.92rem', fontWeight: 800, marginBottom: 4 }}>{p.name}</div>
              <span style={{ display: 'inline-flex', padding: '3px 10px, background: 'rgba(108,99,255,.08)', border: '1px solid rgba(108,99,255,.15)', borderRadius: 999, fontSize: '.58rem', color: '#6c63ff', fontWeight: 700, letterSpacing: '.05em', textTransform: 'uppercase', marginBottom: '.5rem' }}>{p.tag}</span>
              <p style={{ fontSize: '.76rem', color: '#7070a8', lineHeight: 1.6, marginBottom: '.5rem' }}>{p.desc}</p>
              <div style={{ fontSize: '.82rem', fontWeight: 700, color: '#6c63ff', marginBottom: '.5rem' }}>{p.price}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem', marginTop: '.8rem' }}>
                {p.links.map(l => (
                  <a key={l.href} href={l.href} target="_blank" style={{ padding: '5px 12px, background: '#11111f', border: '1px solid #1c1c32', borderRadius: 6, fontSize: '.66rem', color: '#7070a8' }}>{l.label}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid #1c1c32', maxWidth: 1200, margin: '0 auto' }} />

      {/* VM ECOSYSTEM */}
      <section id="vms" style={{ padding: '6rem 2rem', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ fontSize: '.6rem', textTransform: 'uppercase', letterSpacing: '.2em', color: '#6c63ff', fontWeight: 700, marginBottom: '.6rem' }}>Live Now</div>
        <h2 style={{ fontSize: 'clamp(1.5rem,4vw,2.4rem)', fontWeight: 900, letterSpacing: '-.02em', lineHeight: 1.1, marginBottom: '.6rem' }}>ICVMS — VM Ecosystem</h2>
        <p style={{ color: '#7070a8', maxWidth: 480, fontSize: '.9rem', lineHeight: 1.8, marginBottom: '2rem' }}>Animated in real time. Six VMs connected through StudEx OS.</p>
        <div style={{ background: '#0d0d1c', border: '1px solid #1c1c32', borderRadius: 16, padding: '2rem' }}>
          <canvas ref={vmRef} style={{ borderRadius: 10, height: 280, display: 'block', width: '100%' }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '.7rem', marginTop: '1.2rem' }}>
            {VMS.map(v => (
              <div key={v.name} style={{ background: '#11111f', border: `1px solid ${v.open ? 'rgba(16,185,129,.4)' : '#1c1c32'}`, borderRadius: 10, padding: '.8rem', textAlign: 'center', background: v.open ? 'rgba(16,185,129,.03)' : undefined }}>
                <div style={{ fontSize: '.72rem', fontWeight: 700, marginBottom: 2 }}>{v.name}</div>
                <div style={{ fontSize: '.58rem', color: v.open ? '#10b981' : '#6c63ff', textTransform: 'uppercase', letterSpacing: '.06em', fontWeight: 700, marginBottom: 3 }}>{v.sector}</div>
                <div style={{ fontSize: '.66rem', color: '#40406a', lineHeight: 1.5 }}>{v.specs}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid #1c1c32', maxWidth: 1200, margin: '0 auto' }} />

      {/* GLOBAL MARKETS */}
      <section id="market" style={{ padding: '6rem 2rem', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '.6rem', textTransform: 'uppercase', letterSpacing: '.2em', color: '#6c63ff', fontWeight: 700, marginBottom: '.6rem' }}>Studex Global Markets</div>
            <h2 style={{ fontSize: 'clamp(1.5rem,4vw,2.4rem)', fontWeight: 900, letterSpacing: '-.02em', lineHeight: 1.1, marginBottom: '.6rem' }}>Africa-Russia Trade<br />Infrastructure</h2>
            <p style={{ color: '#7070a8', maxWidth: 480, fontSize: '.9rem', lineHeight: 1.8, marginBottom: '1rem' }}>Built for the Africa-Russia trade corridor. B-BBEE Level 1. POPIA compliant.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.6rem', marginTop: '1rem' }}>
              {['Africa-Russia Trade','B-BBEE Level 1','Johannesburg SA','6 VMs · 1 Platform'].map((c,i) => (
                <div key={c} style={{ padding: '7px 14px, background: #0d0d1c, border: 1px solid #1c1c32, borderRadius: 8, fontSize: '.74rem', fontWeight: 600, color: '#7070a8', display: 'flex', alignItems: 'center', gap: 7 }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: ['#6c63ff','#10b981','#00d4ff','#f59e0b'][i], flexShrink: 0 }} />
                  {c}
                </div>
              ))}
            </div>
            <div style={{ background: 'linear-gradient(135deg,rgba(108,99,255,.12),rgba(0,212,255,.06)', border: '1px solid rgba(108,99,255,.2)', borderRadius: 16, padding: '1.5rem', textAlign: 'center', marginTop: '1.5rem' }}>
              <div style={{ fontSize: '.9rem', fontWeight: 800, marginBottom: '.4rem' }}>Apply for VM 05</div>
              <div style={{ fontSize: '.76rem', color: '#7070a8', marginBottom: '.8rem' }}>The final ICVMS partner slot. B-BBEE companies preferred.</div>
              <a href="mailto:hello@studexglobalmarkets.com?subject=VM 05 Application" style={{ background: '#6c63ff', color: '#fff', fontWeight: 700, padding: '8px 20px', borderRadius: 8, display: 'inline-block', fontSize: '.78rem' }}>Apply via Email</a>
            </div>
          </div>
          <div>
            <div style={{ background: '#0d0d1c', border: '1px solid #1c1c32', borderRadius: 16, padding: '1.7rem', marginBottom: '.8rem' }}>
              <div style={{ width: 44, height: 44, borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', marginBottom: '.9rem', background: 'rgba(0,212,255,.1)' }}>I</div>
              <div style={{ fontSize: '.92rem', fontWeight: 800, marginBottom: 4 }}>ICVMS Official Proposal</div>
              <span style={{ display: 'inline-flex', padding: '3px 10px', background: 'rgba(0,212,255,.08)', border: '1px solid rgba(0,212,255,.2)', borderRadius: 999, fontSize: '.58rem', color: '#00d4ff', fontWeight: 700, letterSpacing: '.05em', textTransform: 'uppercase', marginBottom: '.5rem' }}>Official · Minima UI</span>
              <p style={{ fontSize: '.76rem', color: '#7070a8', lineHeight: 1.6, marginBottom: '.5rem' }}>All 5 partner logos, VM specs, pricing tiers, bank details.</p>
              <div style={{ fontSize: '.82rem', fontWeight: 700, color: '#6c63ff', marginBottom: '.5rem' }}>$4,000<span style={{ fontWeight: 400, color: '#40406a', fontSize: '.72rem' }}>/mo + $7,590 setup</span></div>
              <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
                <a href="https://j3s0jkun4cbh.space.minimax.io" target="_blank" style={{ padding: '5px 12px, background: '#11111f', border: '1px solid #1c1c32', borderRadius: 6, fontSize: '.66rem', color: '#7070a8' }}>Proposal</a>
                <a href="https://a5cjrm7f1x8s.space.minimax.io" target="_blank" style={{ padding: '5px 12px, background: '#11111f', border: '1px solid #1c1c32', borderRadius: 6, fontSize: '.66rem', color: '#7070a8' }}>Full Demo + Scripts</a>
              </div>
            </div>
            <div style={{ background: '#0d0d1c', border: '1px solid #1c1c32', borderRadius: 16, padding: '1.7rem' }}>
              <div style={{ width: 44, height: 44, borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', marginBottom: '.9rem', background: 'rgba(239,68,68,.1)' }}>M</div>
              <div style={{ fontSize: '.92rem', fontWeight: 800, marginBottom: 4 }}>MindX Voice Agent</div>
              <span style={{ display: 'inline-flex', padding: '3px 10px', background: 'rgba(108,99,255,.08)', border: '1px solid rgba(108,99,255,.15)', borderRadius: 999, fontSize: '.58rem', color: '#6c63ff', fontWeight: 700, letterSpacing: '.05em', textTransform: 'uppercase', marginBottom: '.5rem' }}>New Proposal</span>
              <p style={{ fontSize: '.76rem', color: '#7070a8', lineHeight: 1.6, marginBottom: '.5rem' }}>Voice AI for MindX. Own SA VM. 4 agents. Built in 4 weeks.</p>
              <div style={{ fontSize: '.82rem', fontWeight: 700, color: '#6c63ff', marginBottom: '.5rem' }}>$4,000<span style={{ fontWeight: 400, color: '#40406a', fontSize: '.72rem' }}>/mo + $7,590 setup</span></div>
              <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
                <a href="https://9w8nktistow4.space.minimax.io" target="_blank" style={{ padding: '5px 12px, background: '#11111f', border: '1px solid #1c1c32', borderRadius: 6, fontSize: '.66rem', color: '#7070a8' }}>Proposal</a>
                <a href="#bmad" style={{ padding: '5px 12px, background: '#11111f', border: '1px solid #1c1c32', borderRadius: 6, fontSize: '.66rem', color: '#7070a8' }}>Start PRD</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid #1c1c32', maxWidth: 1200, margin: '0 auto' }} />

      {/* BMAD */}
      <section id="bmad" style={{ padding: '6rem 2rem', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ fontSize: '.6rem', textTransform: 'uppercase', letterSpacing: '.2em', color: '#6c63ff', fontWeight: 700, marginBottom: '.6rem' }}>Rapid Development</div>
        <h2 style={{ fontSize: 'clamp(1.5rem,4vw,2.4rem)', fontWeight: 900, letterSpacing: '-.02em', lineHeight: 1.1, marginBottom: '.6rem' }}>Build Me A Dashboard</h2>
        <p style={{ color: '#7070a8', maxWidth: 480, fontSize: '.9rem', lineHeight: 1.8, marginBottom: '2.5rem' }}>Describe what you want