import { useState, useRef, useEffect } from 'react'

const AGENTS = [
  { id: 1, name: 'Building patient portal', status: 'building', p: 68 },
  { id: 2, name: 'CodeRabbit reviewing PR', status: 'reviewing', p: 42 },
  { id: 3, name: 'Deploying to Vercel', status: 'done', p: 100 },
  { id: 4, name: 'Writing PRD', status: 'done', p: 100 },
  { id: 5, name: 'Running POPIA audit', status: 'building', p: 25 },
  { id: 6, name: 'Social media draft', status: 'done', p: 100 },
]

const MEDICAL = [
  { icon: '📅', title: 'Patient Booking Systems', desc: 'Online scheduling with automated WhatsApp reminders. Reduce no-shows by up to 40%. Patients book 24/7 — your staff focuses on care.', stat: '↓40% no-shows' },
  { icon: '🔒', title: 'POPIA Compliant', desc: 'South African data law baked into every layer. Patient consent flows, secure storage, audit trails. Always governance-ready.', stat: '100% compliant' },
  { icon: '💬', title: 'WhatsApp Patient Comms', desc: 'AI-powered WhatsApp for reminders, intake forms, and follow-ups. Conversational AI that feels human.', stat: '↑80% response rate' },
  { icon: '📊', title: 'Clinical Dashboards', desc: 'Real-time theatre utilisation, patient flow, stock management. The numbers your governance team needs, live.', stat: 'Real-time data' },
  { icon: '🧠', title: 'AI Medical Triage', desc: 'Upload a photo of a skin concern. AI flags urgency. Streamlined workflow for your clinical team.', stat: 'AI triage' },
  { icon: '📋', title: 'Digital Intake Forms', desc: 'Patients complete forms on their phone before arriving. No paper. Instantly synced to your EMR.', stat: 'Paperless' },
]

const REVIEWS = [
  { file: 'booking.tsx', lang: 'TypeScript', status: 'approved', comment: 'Solid React patterns. Consider adding loading skeletons for the calendar view.' },
  { file: 'api/appointments.ts', lang: 'Node.js', status: 'changes', comment: 'This endpoint lacks rate limiting. Also consider Redis caching for frequently accessed slots.' },
  { file: 'schema.prisma', lang: 'Prisma', status: 'approved', comment: 'Good use of relations. Add a unique constraint on appointment(time_slot_id, date) to prevent double-booking.' },
]

function BgCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current; if (!c) return
    const ctx = c.getContext('2d'); if (!ctx) return
    let t = 0
    const draw = () => {
      if (!ctx || !c) return
      const w = c.width, h = c.height
      ctx.clearRect(0, 0, w, h)
      ctx.strokeStyle = 'rgba(201,168,76,0.04)'; ctx.lineWidth = 1
      for (let x = 0; x < w; x += 48) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke() }
      for (let y = 0; y < h; y += 48) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke() }
      for (let i = 0; i < 20; i++) {
        const x = ((i * 137.5 + t * 0.2) % (w + 80)) - 40
        const y = ((i * 89.3 + t * 0.1) % (h + 80)) - 40
        ctx.fillStyle = `rgba(201,168,76,${0.04 + (i % 4) * 0.02})`
        ctx.beginPath(); ctx.arc(x, y, 1.5 + (i % 3), 0, Math.PI * 2); ctx.fill()
      }
      const sy = (t * 0.5) % h
      const gr = ctx.createLinearGradient(0, sy - 20, 0, sy + 20)
      gr.addColorStop(0, 'rgba(201,168,76,0)'); gr.addColorStop(0.5, 'rgba(201,168,76,0.05)'); gr.addColorStop(1, 'rgba(201,168,76,0)')
      ctx.fillStyle = gr; ctx.fillRect(0, sy - 20, w, 40)
      t++; requestAnimationFrame(draw)
    }
    const rz = () => { if (c) { c.width = c.offsetWidth; c.height = c.offsetHeight } }
    rz(); window.addEventListener('resize', rz); draw()
    return () => { window.removeEventListener('resize', rz) }
  }, [])
  return <canvas ref={ref} className="fixed inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }} />
}

function StatusDot({ s }: { s: string }) {
  const m: Record<string, string> = { idle: 'bg-gray-600', active: 'bg-yellow-400 animate-pulse', done: 'bg-green-400' }
  return <span className={`w-2.5 h-2.5 rounded-full inline-block flex-shrink-0 ${m[s] || 'bg-gray-600'}`} />
}

export default function App() {
  const [step, setStep] = useState(0)
  const [recording, setRecording] = useState(false)
  const [notes, setNotes] = useState([{ id: 1, dur: '0:47', text: 'I need a booking system for my salon. Clients pick a time slot, get a WhatsApp reminder, I see the daily schedule.', time: '2 min ago' }])
  const [link, setLink] = useState('')
  const [sent, setSent] = useState(false)
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (step === 0) { const t = setTimeout(() => setStep(1), 1200); return () => clearTimeout(t) }
    if (step === 1) { const t = setTimeout(() => setStep(2), 1800); return () => clearTimeout(t) }
  }, [step])

  const stopRecord = () => {
    setRecording(false)
    setNotes(v => [...v, { id: Date.now(), dur: '0:12', text: 'Build a patient portal where clients can book appointments and pay a deposit via SnapScan.', time: 'Just now' }])
    setSent(true)
  }

  const startBuild = () => {
    setStep(3)
    setTimeout(() => {
      const iv = setInterval(() => {
        setProgress(p => {
          if (p >= 100) { clearInterval(iv); setDone(true); setStep(4); return 100 }
          return Math.min(100, p + Math.random() * 18)
        })
      }, 300)
    }, 600)
  }

  const steps = [
    { icon: '📋', title: 'Submit Your Idea', desc: 'Drop a voice note, paste a Figma link, type it out.', status: step >= 1 ? 'done' : 'idle' },
    { icon: '🧠', title: 'AI Analyses Everything', desc: 'Your brief is structured into a Product Requirement Document.', status: step >= 2 ? 'done' : 'idle' },
    { icon: '🔨', title: 'CodeRabbit Reviews & Builds', desc: 'AI agents write code. CodeRabbit reviews every PR before merge.', status: step >= 3 ? 'active' : 'idle' },
    { icon: '🚀', title: 'Live in Production', desc: 'Your product is deployed, tested, and live.', status: step >= 4 ? 'done' : 'idle' },
  ]

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <BgCanvas />

      {/* NAV */}
      <nav className="relative z-20 flex items-center justify-between px-8 py-5 border-b border-white/10 bg-black/90 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-yellow-500 flex items-center justify-center font-black text-black text-sm">⚡</div>
          <span className="font-black text-white">DARK<span className="text-yellow-400">FACTORY</span></span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm text-gray-400">
          <a href="#how" className="hover:text-white transition-colors">How it works</a>
          <a href="#submit" className="hover:text-white transition-colors">Start a build</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="#universe" className="text-yellow-400/70 hover:text-yellow-400 flex items-center gap-1.5"><span>🎮</span>Live Universe</a>
          <button className="bg-yellow-500 text-black font-bold px-4 py-2 rounded-lg text-sm">Start building →</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative z-10 px-8 pt-14 pb-10 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-center min-h-[60vh]">
          <div>
            <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-mono px-3 py-1.5 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />PRODUCTION READY — Clients building now
            </div>
            <h1 className="text-4xl md:text-5xl font-black leading-tight mb-5">
              <span className="text-white">Your clinic's digital</span><br />
              <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">brain, built in 24h.</span>
            </h1>
            <p className="text-gray-400 leading-relaxed mb-6">Describe it in a voice note. Paste a Figma link. Type it out. The Dark Factory turns your aesthetic clinic's needs into a live product — patient portals, booking systems, WhatsApp automation — built while you sleep.</p>
            <div className="flex flex-wrap gap-3 mb-7">
              <a href="#submit" className="bg-yellow-500 text-black font-bold px-7 py-3.5 rounded-xl text-sm hover:bg-yellow-400 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-yellow-500/20">Start a build — R29 →</a>
              <a href="#universe" className="border border-white/20 text-white font-semibold px-7 py-3.5 rounded-xl text-sm hover:bg-white/5 transition-colors flex items-center gap-2"><span>🎮</span>See live agent universe</a>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[['68%', 'Patients book online first'], ['$7.3B', 'Global aesthetic market'], ['40%', 'No-show rate without reminders']].map(([n, l]) => (
                <div key={l} className="text-center p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-2xl font-black text-yellow-400">{n}</div>
                  <div className="text-xs text-gray-500 mt-0.5 leading-tight">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Agent Universe Preview */}
          <div id="universe" className="relative flex flex-col gap-3">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/70" style={{ height: 340 }}>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                <div className="text-5xl mb-4">🚀</div>
                <div className="text-yellow-400 font-bold mb-2">DARK FACTORY UNIVERSE</div>
                <div className="text-gray-400 text-sm mb-4">6 AI agents building in real time</div>
                <div className="flex flex-wrap gap-2 justify-center mb-4">
                  {[{ n: 'Building', s: '🟢', c: 'text-green-400' }, { n: 'Reviewing', s: '🟡', c: 'text-yellow-400' }, { n: 'Done', s: '🔵', c: 'text-blue-400' }].map(a => (
                    <div key={a.n} className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5">
                      <span>{a.s}</span><span className={`text-xs font-bold ${a.c}`}>{a.n}</span>
                    </div>
                  ))}
                </div>
                <div className="text-xs text-gray-600">← OrbitControls · Drag to explore →</div>
              </div>
            </div>
            {/* Live activity feed */}
            <div className="bg-black/80 border border-white/10 rounded-xl p-4">
              <div className="text-xs font-mono text-yellow-400/70 mb-3 uppercase tracking-widest">Live agent activity</div>
              <div className="space-y-2">
                {AGENTS.map(a => (
                  <div key={a.id} className="flex items-center gap-3">
                    <span className="text-sm w-44 truncate text-gray-300">{a.name}</span>
                    <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-700" style={{ width: `${a.p}%`, background: a.p === 100 ? '#22c55e' : a.p > 50 ? '#3b82f6' : '#eab308' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative z-10 border-y border-white/10 bg-yellow-500/5">
        <div className="max-w-6xl mx-auto px-8 py-5 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[['47', 'Builds completed'], ['4.8h', 'Avg delivery time'], ['100%', 'CodeRabbit reviewed'], ['0', 'Security breaches']].map(([n, l]) => (
            <div key={l}><div className="text-2xl font-black text-yellow-400">{n}</div><div className="text-xs text-gray-500 mt-0.5">{l}</div></div>
          ))}
        </div>
      </section>

      {/* MEDICAL */}
      <section className="relative z-10 max-w-6xl mx-auto px-8 py-20">
        <div className="text-center mb-14">
          <div className="text-xs font-mono text-yellow-400/70 uppercase tracking-widest mb-3">For the medical industry</div>
          <h2 className="text-4xl font-black mb-4">Built for aesthetic clinics &amp; healthcare</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">Every feature respects South African healthcare regulations. POPIA compliance is built in from day one. Your patient data stays yours.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {MEDICAL.map(m => (
            <div key={m.title} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-yellow-500/40 transition-colors">
              <div className="text-2xl mb-3">{m.icon}</div>
              <h4 className="font-bold text-white mb-1">{m.title}</h4>
              <p className="text-sm text-gray-500 leading-relaxed mb-3">{m.desc}</p>
              <span className="text-xs font-bold text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 px-2 py-1 rounded-full">{m.stat}</span>
            </div>
          ))}
        </div>
      </section>

      {/* HOW */}
      <section id="how" className="relative z-10 max-w-6xl mx-auto px-8 py-20 border-t border-white/10">
        <div className="text-center mb-16">
          <div className="text-xs font-mono text-yellow-400/70 uppercase tracking-widest mb-3">The flow</div>
          <h2 className="text-4xl font-black mb-4">From idea to live product</h2>
          <p className="text-gray-500">4 steps. Fully automated. CodeRabbit watches every line.</p>
        </div>
        <div className="space-y-8 max-w-3xl mx-auto">
          {steps.map((s, i) => (
            <div key={s.title} className={`relative flex gap-5 p-5 rounded-xl border transition-all duration-500 ${step === i ? 'border-yellow-500/60 bg-yellow-500/5 shadow-lg shadow-yellow-500/10' : 'border-white/10 bg-white/5'}`}>
              {i < 3 && <div className={`absolute -bottom-6 left-8 w-0.5 h-6 transition-colors ${step > i ? 'bg-yellow-500' : 'bg-white/10'}`} />}
              <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center text-2xl">{s.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1"><StatusDot s={s.status} /><span className="text-xs font-mono text-yellow-400/70 uppercase tracking-widest">Step {i + 1}</span></div>
                <h3 className="font-bold text-white mb-1">{s.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CodeRabbit */}
        <div className="mt-12 bg-gradient-to-r from-yellow-500/10 to-amber-500/5 border border-yellow-500/20 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-3xl">🐰</div>
            <div><h3 className="font-bold text-white text-lg">CodeRabbit AI Code Review</h3><p className="text-sm text-gray-500">Every pull request reviewed before it merges.</p></div>
            {done && <span className="ml-auto text-xs text-green-400 bg-green-400/10 border border-green-400/30 px-3 py-1 rounded-full">✓ Active on this build</span>}
          </div>
          {done ? (
            <div className="space-y-3">
              {REVIEWS.map(r => (
                <div key={r.file} className="bg-black/40 border border-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono text-white/60">{r.file}</span>
                    <span className="text-xs text-gray-600">{r.lang}</span>
                    <span className={`ml-auto text-xs px-2 py-0.5 rounded-full ${r.status === 'approved' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'}`}>{r.status === 'approved' ? '✓ Approved' : '↻ Changes'}</span>
                  </div>
                  <p className="text-sm text-gray-400">{r.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-yellow-500 to-amber-400 transition-all" style={{ width: `${progress}%` }} /></div>
                <span className="font-mono text-xs text-yellow-400/70 w-10">{Math.round(progress)}%</span>
              </div>
              <p className="text-xs text-gray-600 font-mono">Reviewing booking.tsx → api/appointments.ts → schema.prisma → ...</p>
            </div>
          )}
        </div>
      </section>

      {/* SUBMIT */}
      <section id="submit" className="relative z-10 max-w-6xl mx-auto px-8 py-20 border-t border-white/10">
        <div className="text-center mb-16">
          <div className="text-xs font-mono text-yellow-400/70 uppercase tracking-widest mb-3">Start here</div>
          <h2 className="text-4xl font-black mb-4">Submit your idea</h2>
          <p className="text-gray-500">Voice note, link, or typed description. Pick your lane.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Voice notes */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-5"><span className="text-2xl">🎙️</span><h3 className="font-bold text-white">Voice Notes</h3><span className="ml-auto text-xs text-gray-600 font-mono">MiniMax TTS</span></div>
            <div className="space-y-3 mb-5">
              {notes.map(n => (
                <div key={n.id} className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center"><svg className="w-3 h-3 text-red-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/></svg></div>
                    <div className="text-xs text-gray-500">{n.dur} · {n.time}</div>
                    <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">✓ Transcribed</span>
                  </div>
                  <p className="text-sm text-gray-300 italic">"{n.text}"</p>
                </div>
              ))}
            </div>
            {sent && <div className="mb-4 p-3 rounded-xl bg-green-500/10 border border-green-500/30 text-sm text-green-400 text-center">✓ Voice note submitted — AI analysing your brief...</div>}
            <button onClick={recording ? stopRecord : undefined} onMouseDown={() => !recording && setRecording(true)} onMouseUp={() => recording && stopRecord()} className={`w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-3 transition-all ${recording ? 'bg-red-500 animate-pulse hover:bg-red-600' : 'bg-yellow-500 hover:bg-yellow-400 text-black'}`}>
              {recording ? <><span className="w-3 h-3 rounded-full bg-white animate-pulse" />Recording... Release to stop</> : <><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/></svg>Hold to record</>}
            </button>
          </div>

          {/* Links */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-5"><span className="text-2xl">🔗</span><h3 className="font-bold text-white">Reference Links</h3><span className="ml-auto text-xs text-gray-600 font-mono">Figma · Notion · Loom · GitHub</span></div>
            {[{ u: 'figma.com/file/salon-booking-v3', n: 'Booking flow mockup', t: 'Figma' }, { u: 'notion.so/clinic-workflows', n: 'Current intake process doc', t: 'Notion' }].map(l => (
              <div key={l.u} className="bg-white/5 border border-white/10 rounded-xl p-4 mb-3 hover:border-yellow-500/40 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="text-xl">{l.t === 'Figma' ? '🎨' : '📋'}</div>
                  <div className="flex-1 min-w-0"><div className="text-sm font-mono text-yellow-400/80 truncate">{l.u}</div><div className="text-xs text-gray-500">{l.n}</div></div>
                  <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded-lg border border-white/10">{l.t}</span>
                </div>
              </div>
            ))}
            <div className="flex gap-2 mt-4">
              <input value={link} onChange={e => setLink(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { setSent(true); setTimeout(() => setStep(2), 800) } }} placeholder="Paste Figma, Notion, or any URL..." className="flex-1 bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 outline-none focus:border-yellow-500/60 transition-colors" />
              <button onClick={() => { if (link.trim()) { setSent(true); setTimeout(() => setStep(2), 800) } }} className="bg-white/10 border border-white/20 text-white font-bold px-5 py-3 rounded-xl text-sm hover:bg-white/20 transition-colors">Submit</button>
            </div>
          </div>
        </div>

        {/* Type */}
        <div className="mt-6 bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4"><span className="text-2xl">⌨️</span><h3 className="font-bold text-white">Or just type it</h3></div>
          <textarea rows={4} placeholder="Describe your product idea in plain English. What does it do? Who uses it? What should it look like?..." className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 outline-none focus:border-yellow-500/60 transition-colors resize-none leading-relaxed" />
          <div className="flex justify-between items-center mt-3">
            <span className="text-xs text-gray-600">Be as descriptive as you can.</span>
            <button onClick={startBuild} className="bg-yellow-500 text-black font-bold px-6 py-3 rounded-xl text-sm hover:bg-yellow-400 transition-colors">Start building — R29 →</button>
          </div>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="relative z-10 border-t border-white/10 bg-yellow-500/[0.02]">
        <div className="max-w-6xl mx-auto px-8 py-20">
          <h2 className="text-3xl font-black text-center mb-12">What you receive</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {[{ i: '🖥️', t: 'Production codebase', d: 'Clean TypeScript. Next.js 16 + Prisma + Tailwind CSS 4. Hosted on Vercel, live tonight.' }, { i: '📋', t: 'PRD Document', d: 'Full Product Requirement Document. Spec-first process. You approve every feature before it gets built.' }, { i: '🐰', t: 'CodeRabbit review', d: 'Every PR reviewed. Security, performance, and best practice flags before merge.' }, { i: '📊', t: 'Live dashboard', d: 'Real-time build progress. See agents working, code being written, tests passing.' }, { i: '🔄', t: 'Unlimited revisions', d: 'Request changes, big or small. Your brief is central — edits always included.' }, { i: '🌐', t: 'Custom domain ready', d: 'Your product deployed to your own domain. SSL, CDN, monitoring all configured.' }].map(x => (
              <div key={x.t} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-yellow-500/40 transition-colors">
                <div className="text-2xl mb-3">{x.i}</div>
                <h4 className="font-bold text-white mb-2">{x.t}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="relative z-10 max-w-6xl mx-auto px-8 py-20">
        <div className="text-center mb-12"><h2 className="text-4xl font-black mb-4">Simple pricing.</h2><p className="text-gray-500">R29 per product. No subscription. No monthly fees. Just results.</p></div>
        <div className="max-w-lg mx-auto">
          <div className="border-2 border-yellow-500/60 bg-yellow-500/5 rounded-2xl p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-yellow-500 text-black text-xs font-black px-3 py-1 rounded-bl-xl">BEST VALUE</div>
            <div className="text-6xl font-black text-yellow-400 mb-2">R29</div>
            <div className="text-gray-400 mb-8">per completed product</div>
            <div className="space-y-3 text-left mb-8">
              {['One product, one price', 'CodeRabbit AI review included', 'Unlimited revisions until you\'re happy', 'Production deployment included', 'PRD document included', '24h support after delivery', 'No monthly commitment'].map(f => (
                <div key={f} className="flex items-center gap-3 text-sm text-gray-300"><span className="text-green-400 text-lg">✓</span>{f}</div>
              ))}
            </div>
            <a href="#submit" className="block w-full bg-yellow-500 text-black font-bold py-4 rounded-xl text-base hover:bg-yellow-400 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-yellow-500/20">Start your first build →</a>
            <p className="text-xs text-gray-600 mt-4">50% payment now · 50% when you approve the build</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 border-t border-white/10 py-20 text-center">
        <h2 className="text-4xl font-black mb-4">Ready to build?</h2>
        <p className="text-gray-500 mb-8">First build is R29. If you don't love it, we fix it free.</p>
        <a href="#submit" className="inline-block bg-yellow-500 text-black font-black px-10 py-5 rounded-xl text-lg hover:bg-yellow-400 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-yellow-500/30">Launch Dark Factory →</a>
      </section>

      <footer className="relative z-10 border-t border-white/10 px-8 py-8 text-center text-xs text-gray-700">
        DARKFACTORY v3 · Built by OGRE Computer · Studex Group AI Infrastructure · 2026 · <a href="mailto:info@studexmeat.com" className="text-yellow-500/60 hover:text-yellow-400">info@studexmeat.com</a>
      </footer>
    </div>
  )
}
