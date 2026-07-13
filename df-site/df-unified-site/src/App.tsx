import {useState, useEffect, useRef} from "react"

const ACCENT = "#6c63ff"
const CYAN = "#00d4ff"
const TEXT = "#eeeef8"
const MUTED = "#7070a8"
const GRAPH_NODES = [
  {id: "df", label: "Dark Factory", sub: "OGRE Computer · Studex Group", x: 0.5, y: 0.5, r: 28, col: "#6c63ff", icon: "DF", tag: "CORE"},
  {id: "darkdesk", label: "DarkDesk", sub: "Voice AI · R2,500/mo", x: 0.2, y: 0.3, r: 22, col: "#ec4899", icon: "V", tag: "LIVE"},
  {id: "autoflex", label: "AutoFlex Pro", sub: "Web Automation · R1,500/mo", x: 0.8, y: 0.3, r: 22, col: "#10b981", icon: "W", tag: "LIVE"},
  {id: "redteam", label: "Red Team Agent", sub: "Cybersecurity · R45K/mo", x: 0.15, y: 0.65, r: 22, col: "#f59e0b", icon: "S", tag: "LIVE"},
  {id: "icvms", label: "ICVMS Platform", sub: "Global Markets · $4K/mo", x: 0.85, y: 0.65, r: 22, col: CYAN, icon: "I", tag: "LIVE"},
  {id: "bmad", label: "BMAD", sub: "Rapid Dev · R29/product", x: 0.32, y: 0.78, r: 20, col: CYAN, icon: "B", tag: "TOOL"},
  {id: "obsidian", label: "Obsidian Mind", sub: "Enterprise AI OS · $4K/mo", x: 0.68, y: 0.78, r: 20, col: "#ec4899", icon: "O", tag: "LIVE"},
  {id: "icvms-proposal", label: "ICVMS Proposal", sub: "Official · minima UI", x: 0.08, y: 0.45, r: 16, col: CYAN, icon: "P", tag: "PROPOSAL"},
  {id: "icvms-demo", label: "ICVMS Full Demo", sub: "4 Video Scripts · Agents", x: 0.92, y: 0.45, r: 16, col: CYAN, icon: "D", tag: "DEMO"},
  {id: "mindx", label: "MindX Voice", sub: "New Proposal · $4K/mo", x: 0.5, y: 0.18, r: 18, col: ACCENT, icon: "M", tag: "PITCH"},
  {id: "unified", label: "Unified Site", sub: "Portfolio · All in one", x: 0.5, y: 0.82, r: 16, col: ACCENT, icon: "U", tag: "NEW"},
]
const EDGES = [
  {from: "df", to: "darkdesk"}, {from: "df", to: "autoflex"}, {from: "df", to: "redteam"},
  {from: "df", to: "icvms"}, {from: "df", to: "bmad"}, {from: "df", to: "obsidian"},
  {from: "icvms", to: "icvms-proposal"}, {from: "icvms", to: "icvms-demo"},
  {from: "df", to: "mindx"}, {from: "df", to: "unified"},
]

const ALL_PRODUCTS = [
  {id: "darkdesk", icon: "V", bg: "rgba(236,72,153,.12)", col: "#ec4899", name: "DarkDesk", tag: "Voice AI", desc: "AI voice companion. Real-time voice + chat. Lives in your own sovereign SA VM. POPIA-compliant.", price: "From R2,500/mo", url: "https://hgjcgc2esiki.space.minimax.io", proposal: "https://9w8nktistow4.space.minimax.io"},
  {id: "autoflex", icon: "W", bg: "rgba(16,185,129,.12)", col: "#10b981", name: "AutoFlex Pro", tag: "Web Automation", desc: "AI agent reads webpages, fills forms, qualifies leads, books appointments automatically.", price: "From R1,500/mo", url: "https://3twhamln9rsh.space.minimax.io", proposal: null},
  {id: "redteam", icon: "S", bg: "rgba(245,158,11,.12)", col: "#f59e0b", name: "Red Team Agent", tag: "Cybersecurity AI", desc: "AI VM monitoring other AI agents for hallucinations, prompt injection, PII leakage. Live MRR.", price: "R45,000/mo", url: "https://w1tu0qxf216v.space.minimax.io", proposal: "https://kidvuwlj196t.space.minimax.io"},
  {id: "icvms", icon: "I", bg: "rgba(0,212,255,.12)", col: CYAN, name: "ICVMS Platform", tag: "Global Markets", desc: "6 VMs connected through StudEx OS. Africa-Russia trade corridor infrastructure. B-BBEE Level 1.", price: "$4,000/mo", url: "https://j3s0jkun4cbh.space.minimax.io", proposal: "https://a5cjrm7f1x8s.space.minimax.io"},
  {id: "bmad", icon: "B", bg: "rgba(0,212,255,.12)", col: CYAN, name: "BMAD", tag: "Rapid Development", desc: "Build Me A Dashboard. Describe what you want. We build it. Powered by AI agent teams.", price: "R29/once-off", url: "https://6g18k484b9fx.space.minimax.io", proposal: null},
  {id: "obsidian", icon: "O", bg: "rgba(239,68,68,.12)", col: "#ec4899", name: "Obsidian Mind", tag: "Enterprise AI OS", desc: "Persistent memory vault for AI agents. Every conversation, deal, document stored forever.", price: "$4,000/mo", url: "https://idsucux7j3e4.space.minimax.io", proposal: "https://kidvuwlj196t.space.minimax.io"},
]

const NAV_ITEMS = ["Portfolio", "Graph", "BMAD", "Agents"]

function PortfolioCanvas({active, onNodeClick}: {active: string; onNodeClick: (id: string) => void}) {
  const ref = useRef<HTMLCanvasElement>(null)
  const nodesRef = useRef(GRAPH_NODES.map(n => ({...n, ox: n.x, oy: n.y, vx: 0, vy: 0})))
  const hoveredRef = useRef<string | null>(null)
  const tickRef = useRef(0)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let W = canvas.offsetWidth || 800
    const H = 520
    canvas.height = H

    const getPos = (n: typeof GRAPH_NODES[0]) => ({
      x: n.x * W,
      y: n.y * H,
    })



    const draw = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, W, H)
      tickRef.current++

      const nodes = nodesRef.current
      // Spring forces
      nodes.forEach((n, i) => {
        const target = GRAPH_NODES[i]
        n.vx += (target.x - n.x) * 0.018
        n.vy += (target.y - n.y) * 0.018
        // Repulsion between nodes
        nodes.forEach((n2, j) => {
          if (i === j) return
          const dx = n.x - n2.x
          const dy = n.y - n2.y
          const dist = Math.sqrt(dx * dx + dy * dy) + 0.001
          const force = 0.0008 * (n.r + n2.r + 0.08)
          n.vx += (dx / dist) * force
          n.vy += (dy / dist) * force
        })
        n.vx *= 0.88
        n.vy *= 0.88
        n.x += n.vx
        n.y += n.vy
        n.x = Math.max(0.04, Math.min(0.96, n.x))
        n.y = Math.max(0.04, Math.min(0.96, n.y))
      })

      // Draw edges
      EDGES.forEach(e => {
        const src = nodes.find(n => n.id === e.from)!
        const dst = nodes.find(n => n.id === e.to)!
        const s = getPos(src), d = getPos(dst)
        const pulse = (tickRef.current * 0.003 + nodes.indexOf(src) * 0.15) % 1
        ctx.beginPath()
        ctx.moveTo(s.x, s.y)
        ctx.lineTo(d.x, d.y)
        ctx.strokeStyle = `rgba(108,99,255,${0.06 + pulse * 0.08})`
        ctx.lineWidth = 0.8
        ctx.setLineDash([4, 8])
        ctx.stroke()
        ctx.setLineDash([])
        // Moving dot on edge
        const dotX = s.x + (d.x - s.x) * pulse
        const dotY = s.y + (d.y - s.y) * pulse
        ctx.beginPath()
        ctx.arc(dotX, dotY, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(108,99,255,${0.3 + pulse * 0.5})`
        ctx.fill()
      })

      // Draw nodes
      const hovered = hoveredRef.current
      nodes.forEach(n => {
        const pos = getPos(n)
        const isHovered = hovered === n.id
        const isActive = active === n.id
        const scale = isHovered || isActive ? 1.25 : 1.0
        const r = n.r * scale

        // Glow
        if (isHovered || isActive) {
          const g = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, r * 2.2)
          g.addColorStop(0, n.col + "30")
          g.addColorStop(1, "transparent")
          ctx.beginPath()
          ctx.arc(pos.x, pos.y, r * 2.2, 0, Math.PI * 2)
          ctx.fillStyle = g
          ctx.fill()
        }

        // Node bg
        ctx.beginPath()
        ctx.arc(pos.x, pos.y, r, 0, Math.PI * 2)
        ctx.fillStyle = n.col + (isActive ? "40" : isHovered ? "28" : "18")
        ctx.fill()

        // Node border
        ctx.beginPath()
        ctx.arc(pos.x, pos.y, r, 0, Math.PI * 2)
        ctx.strokeStyle = n.col + (isHovered || isActive ? "cc" : "66")
        ctx.lineWidth = isHovered || isActive ? 1.5 : 1
        ctx.stroke()

        // Icon text
        ctx.fillStyle = n.col
        ctx.font = `900 ${Math.round(r * 0.75)}px "JetBrains Mono", monospace`
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(n.icon, pos.x, pos.y)

        // Label
        const labelY = pos.y + r + 12
        ctx.font = `600 9px "Plus Jakarta Sans", sans-serif`
        ctx.fillStyle = isHovered || isActive ? TEXT : MUTED
        ctx.textAlign = "center"
        ctx.textBaseline = "top"
        ctx.fillText(n.label, pos.x, labelY)

        // Tag badge
        if (n.tag) {
          const tagW = ctx.measureText(n.tag).width + 8
          ctx.fillStyle = n.col + "22"
          ctx.beginPath()
          ctx.roundRect(pos.x - tagW / 2, labelY + 13, tagW, 11, 3)
          ctx.fill()
          ctx.font = `700 7px "Plus Jakarta Sans", sans-serif`
          ctx.fillStyle = n.col
          ctx.textAlign = "center"
          ctx.textBaseline = "middle"
          ctx.fillText(n.tag, pos.x, labelY + 18.5)
        }
      })

      requestAnimationFrame(draw)
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const mx = (e.clientX - rect.left) / W
      const my = (e.clientY - rect.top) / H
      let found: string | null = null
      nodesRef.current.forEach(n => {
        const dx = n.x - mx, dy = n.y - my
        if (Math.sqrt(dx * dx + dy * dy) < n.r / W * 1.5) found = n.id
      })
      hoveredRef.current = found
      canvas.style.cursor = found ? "pointer" : "default"
    }

    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const mx = (e.clientX - rect.left) / W
      const my = (e.clientY - rect.top) / H
      nodesRef.current.forEach(n => {
        const dx = n.x - mx, dy = n.y - my
        if (Math.sqrt(dx * dx + dy * dy) < n.r / W * 1.5) onNodeClick(n.id)
      })
    }

    canvas.addEventListener("mousemove", onMouseMove)
    canvas.addEventListener("click", onClick)

    const ro = new ResizeObserver(() => {
      if (canvas) { W = canvas.offsetWidth; canvas.width = W }
    })
    ro.observe(canvas)

    draw()
    return () => {
      canvas.removeEventListener("mousemove", onMouseMove)
      canvas.removeEventListener("click", onClick)
      ro.disconnect()
    }
  }, [active, onNodeClick])

  return <canvas ref={ref} className="w-full" style={{height: "520px", display: "block"}} />
}

export default function App() {
  const [activeNode, setActiveNode] = useState("df")
  const [form, setForm] = useState({name: "", email: "", company: "", type: "Dashboard", desc: ""})
  const [nav, setNav] = useState("Portfolio")

  const activeProduct = ALL_PRODUCTS.find(p => p.id === activeNode)

  const h = (e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({...f, [e.target.name]: e.target.value}))
  const t = (e: React.ChangeEvent<HTMLTextAreaElement>) => setForm(f => ({...f, [e.target.name]: e.target.value}))
  const s = (e: React.ChangeEvent<HTMLSelectElement>) => setForm(f => ({...f, type: e.target.value}))
  const sub = (e: React.FormEvent) => {
    e.preventDefault()
    const b = "BMAD Submission\n\nName: " + form.name + "\nEmail: " + form.email + "\nCompany: " + form.company + "\nType: " + form.type + "\n\n" + form.desc
    window.location.href = "mailto:cto@studex-group.com?subject=BMAD Submission — " + form.name + "&body=" + encodeURIComponent(b)
  }
  const nodecnt = GRAPH_NODES.length
  const livecnt = GRAPH_NODES.filter(n => n.tag === "LIVE").length

  return (
    <div className="min-h-screen bg-[#07070f] text-gray-200 font-sans antialiased">

      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 h-14"
        style={{background:"rgba(7,7,15,0.92)", backdropFilter:"blur(24px)", borderBottom:"1px solid #1c1c32"}}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black text-white"
            style={{background:"linear-gradient(135deg,#6c63ff,#00d4ff)"}}>DF</div>
          <div>
            <div className="text-xs font-extrabold text-gray-100 tracking-widest uppercase leading-none">Dark Factory</div>
            <div className="text-xs text-gray-600 leading-none mt-0.5">OGRE Computer · 2026</div>
          </div>
        </div>
        <nav className="flex items-center gap-1">
          {NAV_ITEMS.map(item => (
            <button key={item} onClick={() => setNav(item)}
              className="px-4 py-2 rounded-lg text-xs font-semibold transition-all"
              style={{
                background: nav === item ? "rgba(108,99,255,0.15)" : "transparent",
                color: nav === item ? "#6c63ff" : "#7070a8",
                border: "1px solid " + (nav === item ? "rgba(108,99,255,0.3)" : "transparent"),
              }}>
              {item}
            </button>
          ))}
        </nav>
        <a href="#bmad" className="px-4 py-2 rounded-lg text-xs font-bold text-white"
          style={{background:"#6c63ff"}}>
          Start a Project →
        </a>
      </header>

      {nav === "Portfolio" && (
        <>
          {/* HERO + GRAPH */}
          <section className="pt-14 min-h-screen flex flex-col" style={{background:"radial-gradient(ellipse at 50% 0%, rgba(108,99,255,0.07) 0%, transparent 60%)"}}>
            <div className="text-center pt-12 pb-4 px-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase mb-6"
                style={{background:"rgba(108,99,255,0.1)",border:"1px solid rgba(108,99,255,0.2)",color:"#6c63ff"}}>
                {nodecnt} Nodes · {livecnt} Live Products · {GRAPH_NODES.filter(n=>n.tag==="PROPOSAL"||n.tag==="PITCH").length} Proposals
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-4"
                style={{background:"linear-gradient(135deg,#fff 40%,rgba(255,255,255,0.3))",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
                CipherTrace Portfolio
              </h1>
              <p className="text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
                Interactive graph. Click any node to explore the product, demo, or proposal.
              </p>
            </div>

            {/* GRAPH */}
            <div className="flex-1 px-6 pb-6">
              <div className="rounded-2xl border overflow-hidden" style={{background:"#0d0d1c",borderColor:"#1c1c32"}}>
                <PortfolioCanvas active={activeNode} onNodeClick={setActiveNode} />
                {/* Node detail panel */}
                <div className="px-6 pb-6">
                  {activeProduct ? (
                    <div className="flex items-start gap-5 p-5 rounded-xl border animate-in" style={{background:"#11111f",borderColor:"#1c1c32",animation:"fadeIn 0.3s ease"}}>
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-black flex-shrink-0" style={{background:activeProduct.bg,color:activeProduct.col}}>
                        {activeProduct.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-base font-bold">{activeProduct.name}</span>
                          <span className="px-2 py-0.5 rounded-full text-xs font-bold uppercase" style={{background:activeProduct.col+"18",color:activeProduct.col,border:`1px solid ${activeProduct.col}33`}}>
                            {activeProduct.tag}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed mb-3">{activeProduct.desc}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold" style={{color:activeProduct.col}}>{activeProduct.price}</span>
                          <div className="flex gap-2">
                            {activeProduct.url && (
                              <a href={activeProduct.url} target="_blank" rel="noopener"
                                className="px-4 py-1.5 rounded-lg text-xs font-semibold text-white" style={{background:activeProduct.col}}>
                                View Live →
                              </a>
                            )}
                            {activeProduct.proposal && (
                              <a href={activeProduct.proposal} target="_blank" rel="noopener"
                                className="px-4 py-1.5 rounded-lg text-xs font-semibold border" style={{borderColor:"#1c1c32",color:"#7070a8"}}>
                                Proposal →
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : activeNode === "df" ? (
                    <div className="p-5 rounded-xl border" style={{background:"#11111f",borderColor:"rgba(108,99,255,0.3)"}}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-black text-white" style={{background:"linear-gradient(135deg,#6c63ff,#00d4ff)"}}>DF</div>
                        <div>
                          <div className="text-sm font-bold">Dark Factory</div>
                          <div className="text-xs text-gray-600">OGRE Computer · Studex Group · 2026</div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed mb-3">
                        A sovereign AI build factory. Multi-agent teams design, build, and deploy software from idea to live product.
                      </p>
                      <div className="flex gap-3 text-xs text-gray-600">
                        <span>6 Products</span>
                        <span>·</span>
                        <span>5 AI Agents</span>
                        <span>·</span>
                        <span>R200M+ Pipeline</span>
                      </div>
                    </div>
                  ) : (
                    <div className="p-5 rounded-xl border" style={{background:"#11111f",borderColor:"#1c1c32"}}>
                      <p className="text-xs text-gray-600">Select a node to explore the product details.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* ALL PRODUCTS GRID */}
          <section className="max-w-6xl mx-auto px-6 pb-20">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="text-xs font-bold tracking-widest uppercase mb-1" style={{color:"#6c63ff"}}>All Products</div>
                <h2 className="text-3xl font-black tracking-tight">The Full Portfolio</h2>
              </div>
              <div className="flex gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold border" style={{background:"rgba(16,185,129,0.1)",color:"#10b981",borderColor:"rgba(16,185,129,0.3)"}}>● Live</span>
                <span className="px-3 py-1 rounded-full text-xs font-bold border" style={{background:"rgba(0,212,255,0.1)",color:"#00d4ff",borderColor:"rgba(0,212,255,0.3)"}}>● Proposal</span>
                <span className="px-3 py-1 rounded-full text-xs font-bold border" style={{background:"rgba(108,99,255,0.1)",color:"#6c63ff",borderColor:"rgba(108,99,255,0.3)"}}>● Tool</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ALL_PRODUCTS.map(p => (
                <div key={p.id} onClick={() => setActiveNode(p.id)}
                  className="rounded-2xl p-6 border cursor-pointer transition-all hover:scale-[1.02] group"
                  style={{background:"#0d0d1c",borderColor:activeNode===p.id?p.col+"55":"#1c1c32"}}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-black" style={{background:p.bg,color:p.col}}>
                      {p.icon}
                    </div>
                    <span className="px-2 py-1 rounded-lg text-xs font-bold" style={{background:p.col+"15",color:p.col,border:`1px solid ${p.col}30`}}>
                      {p.tag}
                    </span>
                  </div>
                  <div className="text-sm font-bold mb-1">{p.name}</div>
                  <p className="text-xs text-gray-600 leading-relaxed mb-3 line-clamp-2">{p.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold" style={{color:p.col}}>{p.price}</span>
                    {p.url && (
                      <a href={p.url} target="_blank" rel="noopener"
                        onClick={e=>e.stopPropagation()}
                        className="text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity" style={{color:p.col}}>
                        View →</a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {nav === "Graph" && (
        <section className="pt-14 min-h-screen" style={{background:"radial-gradient(ellipse at 50% 30%, rgba(108,99,255,0.06) 0%, transparent 60%)"}}>
          <div className="text-center pt-12 pb-8 px-6">
            <h2 className="text-4xl font-black tracking-tight mb-2"
              style={{background:"linear-gradient(135deg,#fff 40%,rgba(255,255,255,0.3))",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
              Interactive Node Graph
            </h2>
            <p className="text-gray-600 text-sm">Hover to highlight. Click to select. Full portfolio mapped.</p>
          </div>
          <div className="max-w-5xl mx-auto px-6 pb-16">
            <div className="rounded-2xl border overflow-hidden" style={{background:"#0d0d1c",borderColor:"#1c1c32"}}>
              <PortfolioCanvas active={activeNode} onNodeClick={setActiveNode} />
            </div>
          </div>
        </section>
      )}

      {nav === "BMAD" && (
        <section id="bmad" className="pt-14 min-h-screen" style={{background:"radial-gradient(ellipse at 50% 30%, rgba(0,212,255,0.04) 0%, transparent 60%)"}}>
          <div className="max-w-3xl mx-auto px-6 py-16">
            <div className="text-center mb-12">
              <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{color:"#6c63ff"}}>Rapid Development</div>
              <h2 className="text-4xl font-black tracking-tight mb-3">Build Me A Dashboard</h2>
              <p className="text-gray-600 text-sm">R29 once-off · B-BBEE Level 1 · POPIA Compliant · Johannesburg SA</p>
            </div>
            <div className="grid grid-cols-4 gap-3 mb-10">
              {[["1","Submit","Fill the brief"],["2","We Analyse","Scope in 24h"],["3","We Build","Deploy live"],["4","You Approve","R29"]].map(([n,t,d])=>(
                <div key={n} className="text-center p-4 rounded-xl border" style={{background:"#0d0d1c",borderColor:"#1c1c32"}}>
                  <div className="w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center text-xs font-black" style={{background:"rgba(108,99,255,0.12)",color:"#6c63ff",border:"1px solid rgba(108,99,255,0.2)"}}>{n}</div>
                  <div className="text-xs font-bold mb-0.5">{t}</div>
                  <div className="text-xs text-gray-600">{d}</div>
                </div>
              ))}
            </div>
            <form onSubmit={sub} className="rounded-2xl p-8 border" style={{background:"#0d0d1c",borderColor:"#1c1c32"}}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-600 block mb-2">Name</label>
                  <input name="name" value={form.name} onChange={h} placeholder="Tumelo Ramaphosa" required type="text"
                    className="w-full rounded-xl px-4 py-3 text-sm bg-[#11111f] border text-gray-200 placeholder-gray-700 outline-none focus:border-indigo-500/50" style={{borderColor:"#1c1c32"}}/>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-600 block mb-2">Email</label>
                  <input name="email" value={form.email} onChange={h} placeholder="tumelo@studexmeat.com" required type="email"
                    className="w-full rounded-xl px-4 py-3 text-sm bg-[#11111f] border text-gray-200 placeholder-gray-700 outline-none focus:border-indigo-500/50" style={{borderColor:"#1c1c32"}}/>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-600 block mb-2">Company</label>
                  <input name="company" value={form.company} onChange={h} placeholder="Studex Group" type="text"
                    className="w-full rounded-xl px-4 py-3 text-sm bg-[#11111f] border text-gray-200 placeholder-gray-700 outline-none focus:border-indigo-500/50" style={{borderColor:"#1c1c32"}}/>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-600 block mb-2">Type</label>
                  <select value={form.type} onChange={s}
                    className="w-full rounded-xl px-4 py-3 text-sm bg-[#11111f] border text-gray-200 outline-none" style={{borderColor:"#1c1c32"}}>
                    {["Dashboard","Landing Page","Web App","Voice Agent","Automation","CRM","Other"].map(o=><option key={o}>{o}</option>)}
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-600 block mb-2">Project Description</label>
                  <textarea name="desc" value={form.desc} onChange={t} rows={4}
                    placeholder="Describe what you want built. Features, integrations, users..."
                    className="w-full rounded-xl px-4 py-3 text-sm bg-[#11111f] border text-gray-200 placeholder-gray-700 outline-none resize-none focus:border-indigo-500/50" style={{borderColor:"#1c1c32"}}/>
                </div>
              </div>
              <button type="submit" className="w-full py-4 rounded-xl text-base font-bold text-white"
                style={{background:"#6c63ff",boxShadow:"0 8px 32px rgba(108,99,255,0.4)"}}>
                Submit Project — R29 🏗️
              </button>
            </form>
          </div>
        </section>
      )}

      {nav === "Agents" && (
        <section className="pt-14 min-h-screen" style={{background:"radial-gradient(ellipse at 50% 30%, rgba(108,99,255,0.05) 0%, transparent 60%)"}}>
          <div className="max-w-5xl mx-auto px-6 py-16">
            <div className="text-center mb-12">
              <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{color:"#6c63ff"}}>Intelligence Layer</div>
              <h2 className="text-4xl font-black tracking-tight mb-3">The AI Agent Team</h2>
              <p className="text-gray-600 text-sm">Six specialist agents. Each running 24/7. OpenJarvis + Ollama + Eleven Labs.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {i:"H",n:"Hermes",r:"Chief Technology Officer",d:"Self-hosted LLM. Ollama Qwen 2.5. Persistent memory. Multi-agent orchestration.",s:["Ollama Qwen 2.5","GitHub","Self-Hosted"]},
                {i:"N",n:"Naledi",r:"Chief Marketing Officer",d:"Content calendars, social media, multi-platform campaigns 24/7.",s:["20 posts/month","Analytics","Multi-platform"]},
                {i:"A",n:"Auto-Commerce",r:"E-Commerce Manager",d:"Shopify, listings, orders, inventory, customer comms.",s:["Shopify","Inventory","Orders"]},
                {i:"R",n:"Robusca",r:"Chief of Staff",d:"Coordinates all agents, manages priorities, calendar.",s:["Coordination","War Room","Reporting"]},
                {i:"M",n:"Obsidian Mind",r:"Memory and Reasoning Core",d:"Persistent vault. Semantic search. Decision records.",s:["Vault","Semantic Search","Memory"]},
                {i:"V",n:"Voice Agent",r:"Client Communications",d:"Real-time voice AI. Speaks to clients 24/7.",s:["OpenAI Realtime","Eleven Labs","SA Phone"]},
              ].map(a => (
                <div key={a.n} className="rounded-2xl p-6 border" style={{background:"#0d0d1c",borderColor:"#1c1c32"}}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-black mb-4" style={{background:"rgba(108,99,255,0.1)",color:"#6c63ff"}}>{a.i}</div>
                  <div className="text-sm font-bold mb-0.5">{a.n}</div>
                  <div className="text-xs font-bold uppercase tracking-wider mb-3" style={{color:"#6c63ff"}}>{a.r}</div>
                  <p className="text-xs text-gray-600 leading-relaxed mb-4">{a.d}</p>
                  <div className="flex flex-wrap gap-2">
                    {a.s.map(sk => (
                      <span key={sk} className="px-2.5 py-1 rounded-lg text-xs font-semibold" style={{background:"#11111f",border:"1px solid #1c1c32",color:"#7070a8"}}>{sk}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="border-t" style={{borderColor:"#1c1c32",background:"#0d0d1c"}}>
        <div className="max-w-6xl mx-auto px-6 py-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black text-white" style={{background:"linear-gradient(135deg,#6c63ff,#00d4ff)"}}>DF</div>
            <div>
              <div className="text-xs font-bold text-gray-400">Dark Factory</div>
              <div className="text-xs text-gray-700">OGRE Computer · Studex Group · 2026</div>
            </div>
          </div>
          <div className="text-xs text-gray-700 text-right">
            cto@studex-group.com<br/>Johannesburg, South Africa
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fadeIn { from { opacity:0; transform: translateY(4px) } to { opacity:1; transform: translateY(0) } }
        .animate-in { animation: fadeIn 0.3s ease }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>
    </div>
  )
}
