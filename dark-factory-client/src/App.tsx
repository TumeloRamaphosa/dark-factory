import { useState, useRef, useEffect } from 'react'

// ── Data ─────────────────────────────────────────────────────────────────────
const AGENTS = [
  { id: 1, name: 'Building patient portal', status: 'building', p: 68, emoji: '🏗️' },
  { id: 2, name: 'CodeRabbit reviewing PR', status: 'reviewing', p: 42, emoji: '🐰' },
  { id: 3, name: 'Deploying to Vercel', status: 'done', p: 100, emoji: '🚀' },
  { id: 4, name: 'Writing PRD document', status: 'done', p: 100, emoji: '📋' },
  { id: 5, name: 'Running POPIA audit', status: 'building', p: 25, emoji: '🔒' },
  { id: 6, name: 'Social media draft', status: 'done', p: 100, emoji: '📱' },
]

const MEDICAL = [
  { icon: '📅', title: 'Patient Booking Systems', desc: 'Online scheduling with automated WhatsApp reminders. Reduce no-shows by up to 40%. Patients book 24/7 — your staff focuses on care.', stat: '↓40% no-shows' },
  { icon: '🔒', title: 'POPIA Compliant', desc: 'South African data law baked into every layer. Patient consent flows, secure storage, audit trails. Always governance-ready.', stat: '100% compliant' },
  { icon: '💬', title: 'WhatsApp Patient Comms', desc: 'AI-powered WhatsApp for appointment reminders, intake forms, and follow-ups.', stat: '↑80% response rate' },
  { icon: '📊', title: 'Clinical Dashboards', desc: 'Real-time theatre utilisation, patient flow, stock management. Live.', stat: 'Real-time data' },
  { icon: '🧠', title: 'AI Medical Triage', desc: 'Upload a photo of a concern. AI flags urgency. Streamlined clinical workflow.', stat: 'AI triage' },
  { icon: '📋', title: 'Digital Intake Forms', desc: 'Patients complete forms before arriving. No paper. Instantly synced to your EMR.', stat: 'Paperless' },
]

const WHAT_YOU_GET = [
  { i: '🖥️', t: 'Production codebase', d: 'Clean TypeScript. Next.js + Prisma + Tailwind. Hosted on Vercel, live tonight.' },
  { i: '📋', t: 'PRD Document', d: 'Full Product Requirement Document. Spec-first. You approve before we build.' },
  { i: '🐰', t: 'CodeRabbit review', d: 'Every PR reviewed by AI. Security and performance flags before merge.' },
  { i: '📊', t: 'Live dashboard', d: 'Real-time build progress. Watch agents working in the space station.' },
  { i: '🔄', t: 'Unlimited revisions', d: 'Request changes, big or small. Your brief is central — edits always included.' },
  { i: '🌐', t: 'Custom domain ready', d: 'Your product deployed to your own domain. SSL, CDN, monitoring configured.' },
]

const REVIEWS = [
  { file: 'booking.tsx', lang: 'TypeScript', status: 'approved', comment: 'Solid React patterns. Consider adding loading skeletons for the calendar view.' },
  { file: 'api/appointments.ts', lang: 'Node.js', status: 'changes', comment: 'This endpoint lacks rate limiting. Also consider Redis caching for frequently accessed slots.' },
  { file: 'schema.prisma', lang: 'Prisma', status: 'approved', comment: 'Good use of relations. Add a unique constraint on appointment(time_slot_id, date).' },
]

const FIVE_FREE = [
  { n: '01', title: 'AI Chatbot', desc: 'A chatbot that answers your clients\' questions 24/7. WhatsApp + web. Powered by Claude.' },
  { n: '02', title: 'Booking System', desc: 'Online scheduling with WhatsApp reminders. Patients pick slots. You get a daily agenda.' },
  { n: '03', title: 'Social Media Manager', desc: '20 posts/month, scheduled across all platforms. AI writes, designs, posts, replies.' },
  { n: '04', title: 'Lead Capture CRM', desc: 'Every enquiry captured, qualified, and followed up automatically. Never lose a lead again.' },
  { n: '05', title: 'Email Automation', desc: 'Auto-reply, priority triage, follow-up sequences. Your inbox managed before you open it.' },
]

// ── Background animation ─────────────────────────────────────────────────────
function BgGrid() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current; if (!c) return
    const ctx = c.getContext('2d'); if (!ctx) return
    let t = 0
    const draw = () => {
      if (!ctx || !c) return
      const { width: w, height: h } = c
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, w, h)
      ctx.strokeStyle = 'rgba(201,168,76,0.04)'; ctx.lineWidth = 1
      for (let x = 0; x < w; x += 48) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke() }
      for (let y = 0; y < h; y += 48) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke() }
      for (let i = 0; i < 20; i++) {
        const x = ((i * 137.5 + t * 0.2) % (w + 80)) - 40
        const y = ((i * 89.3 + t * 0.1) % (h + 80)) - 40
        ctx.fillStyle = `rgba(201,168,76,${0.04 + (i % 4) * 0.02})`
        ctx.beginPath(); ctx.arc(x, y, 1.5 + (i % 3), 0, Math.PI * 2); ctx.fill()
      }
      t++; requestAnimationFrame(draw)
    }
    const rz = () => { if (c) { c.width = c.offsetWidth; c.height = c.offsetHeight } }
    rz(); window.addEventListener('resize', rz); draw()
    return () => { window.removeEventListener('resize', rz) }
  }, [])
  return <canvas ref={ref} className="fixed inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }} />
}

// ── Space station SVG (replaces broken Three.js) ───────────────────────────────
function SpaceStationPreview() {
  return (
    <div className="relative w-full h-full" style={{ background: 'radial-gradient(ellipse at 50% 40%, #1a1040 0%, #0a0a0a 70%)' }}>
      {/* Stars */}
      {Array.from({ length: 60 }, (_, i) => (
        <div key={i} style={{
          position: 'absolute', borderRadius: '50%',
          left: `${(i * 37 + 5) % 100}%`, top: `${(i * 53 + 7) % 100}%`,
          width: `${1 + (i % 3)}px`, height: `${1 + (i % 3)}px`,
          background: '#fff', opacity: 0.3 + (i % 5) * 0.1,
          animation: `twinkle ${2 + (i % 3)}s ease-in-out infinite`,
          animationDelay: `${i * 0.3}s`,
        }} />
      ))}
      <style>{`@keyframes twinkle{0%,100%{opacity:0.3}50%{opacity:1}}`}</style>

      {/* Nebula glows */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 50%, rgba(59,130,246,0.12) 0%, transparent 60%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 50%, rgba(139,92,246,0.1) 0%, transparent 60%)' }} />

      {/* Station — SVG illustration */}
      <svg viewBox="0 0 400 280" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.9 }}>
        {/* Solar panels */}
        <rect x="170" y="20" width="60" height="4" fill="#475569" rx="2" />
        <rect x="155" y="24" width="30" height="50" fill="#1e3a8a" opacity="0.9" rx="1" />
        <rect x="215" y="24" width="30" height="50" fill="#1e3a8a" opacity="0.9" rx="1" />
        <rect x="194" y="24" width="12" height="60" fill="#374151" rx="1" />

        {/* Ring */}
        <ellipse cx="200" cy="140" rx="120" ry="30" fill="none" stroke="#C9A84C" strokeWidth="3" opacity="0.6" />
        <ellipse cx="200" cy="140" rx="120" ry="30" fill="none" stroke="#C9A84C" strokeWidth="1" opacity="0.3" strokeDasharray="4 4">
          <animateTransform attributeName="transform" type="rotate" from="0 200 140" to="360 200 140" dur="20s" repeatCount="indefinite" />
        </ellipse>

        {/* Main hub */}
        <rect x="155" y="120" width="90" height="40" fill="#111827" rx="6" stroke="#C9A84C" strokeWidth="1.5" />
        <rect x="155" y="120" width="90" height="40" fill="url(#hubGrad)" rx="6" opacity="0.5" />
        <text x="200" y="144" textAnchor="middle" fill="#C9A84C" fontSize="7" fontFamily="monospace" fontWeight="bold" letterSpacing="2">DARK FACTORY</text>

        {/* Modules */}
        <rect x="30" y="125" width="70" height="30" fill="#111827" rx="4" stroke="#3b82f6" strokeWidth="1.2" />
        <text x="65" y="143" textAnchor="middle" fill="#3b82f6" fontSize="5.5" fontFamily="monospace">AGENT BAY A</text>

        <rect x="300" y="125" width="70" height="30" fill="#111827" rx="4" stroke="#22c55e" strokeWidth="1.2" />
        <text x="335" y="143" textAnchor="middle" fill="#22c55e" fontSize="5.5" fontFamily="monospace">AGENT BAY B</text>

        <rect x="155" y="200" width="90" height="30" fill="#111827" rx="4" stroke="#eab308" strokeWidth="1.2" />
        <text x="200" y="218" textAnchor="middle" fill="#eab308" fontSize="5.5" fontFamily="monospace">CODE REVIEW</text>

        {/* Corridors */}
        <line x1="125" y1="140" x2="155" y2="140" stroke="#1e3a5f" strokeWidth="6" />
        <line x1="245" y1="140" x2="300" y2="140" stroke="#1e3a5f" strokeWidth="6" />
        <line x1="200" y1="160" x2="200" y2="200" stroke="#1e3a5f" strokeWidth="6" />

        {/* Agents — animated dots */}
        {[{ cx: 80, cy: 140, c: '#3b82f6', label: 'BUILD' }, { cx: 320, cy: 140, c: '#22c55e', label: 'DONE' }, { cx: 200, cy: 80, c: '#C9A84C', label: 'HQ' }].map((a, i) => (
          <g key={i}>
            <circle cx={a.cx} cy={a.cy} r="10" fill={a.c} opacity="0.2">
              <animate attributeName="r" values="8;12;8" dur={`${2 + i}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.2;0.5;0.2" dur={`${2 + i}s`} repeatCount="indefinite" />
            </circle>
            <circle cx={a.cx} cy={a.cy} r="5" fill={a.c} />
          </g>
        ))}

        <defs>
          <radialGradient id="hubGrad"><stop offset="0%" stopColor="#C9A84C" stopOpacity="0.2" /><stop offset="100%" stopColor="#C9A84C" stopOpacity="0" /></radialGradient>
        </defs>
      </svg>

      {/* HUD overlay */}
      <div style={{
        position: 'absolute', bottom: 12, left: 12, right: 12,
        background: 'rgba(0,0,0,0.75)', border: '1px solid rgba(201,168,76,0.3)',
        borderRadius: 8, padding: '8px 12px', backdropFilter: 'blur(8px)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <span style={{ fontSize: 9, color: '#C9A84C', fontFamily: 'monospace', letterSpacing: '0.15em' }}>DARK FACTORY UNIVERSE</span>
          <span style={{ fontSize: 9, color: '#22c55e', fontFamily: 'monospace' }}>● LIVE</span>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {[{ l: 'BUILD', c: '#3b82f6' }, { l: 'REVIEW', c: '#eab308' }, { l: 'DONE', c: '#22c55e' }].map(s => (
            <span key={s.l} style={{ fontSize: 8, color: s.c, background: `${s.c}22`, border: `1px solid ${s.c}44`, borderRadius: 4, padding: '2px 6px', fontFamily: 'monospace' }}>{s.l}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Step card ─────────────────────────────────────────────────────────────────
function Step({ n, icon, title, desc, status }: { n: number; icon: string; title: string; desc: string; status: 'done' | 'active' | 'idle' }) {
  const colors = { done: '#22c55e', active: '#eab308', idle: '#6b7280' }
  const bg = { done: 'rgba(34,197,94,0.08)', active: 'rgba(234,179,8,0.08)', idle: 'rgba(255,255,255,0.03)' }
  const border = { done: 'rgba(34,197,94,0.3)', active: 'rgba(234,179,8,0.5)', idle: 'rgba(255,255,255,0.1)' }
  const c = colors[status]
  return (
    <div style={{ background: bg[status], border: `1px solid ${border[status]}`, borderRadius: 12, padding: 20, display: 'flex', gap: 16, alignItems: 'flex-start', transition: 'all 0.4s' }}>
      <div style={{ width: 48, height: 48, borderRadius: 10, background: `${c}22`, border: `1px solid ${c}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
        {status === 'done' ? '✓' : status === 'active' ? '●' : '○'}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 10, color: c, fontFamily: 'monospace', letterSpacing: '0.15em', marginBottom: 4 }}>STEP {n}</div>
        <div style={{ fontWeight: 700, color: '#fff', marginBottom: 4, fontSize: 15 }}>{title}</div>
        <div style={{ fontSize: 13, color: '#9ca3af', lineHeight: 1.6 }}>{desc}</div>
      </div>
    </div>
  )
}

// ── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [step, setStep] = useState(0)
  const [recording, setRecording] = useState(false)
  const [recordingTimer, setRecordingTimer] = useState(0)
  const [notes, setNotes] = useState([
    { id: 1, dur: '0:47', text: 'I need a booking system for my salon. Clients pick a time slot, get a WhatsApp reminder the day before, I see the daily schedule on a dashboard.', time: '2 min ago' },
  ])
  const [desc, setDesc] = useState('')
  const [link, setLink] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [buildProgress, setBuildProgress] = useState(0)
  const [buildDone, setBuildDone] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 1500)
    const t2 = setTimeout(() => setStep(2), 2500)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  const startRecord = () => {
    setRecording(true)
    setRecordingTimer(0)
    timerRef.current = setInterval(() => setRecordingTimer(t => t + 1), 1000)
  }
  const stopRecord = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    setRecording(false)
    const m = Math.floor(recordingTimer / 60)
    const s = recordingTimer % 60
    const dur = `${m}:${s.toString().padStart(2, '0')}`
    setNotes(v => [...v, { id: Date.now(), dur, text: 'Build a patient portal where clients can book appointments, upload their ID, and pay a deposit via SnapScan. I want WhatsApp reminders and a daily dashboard.', time: 'Just now' }])
    setSubmitted(true)
    setTimeout(() => { setStep(2) }, 1000)
  }
  const submitLink = () => {
    if (!link.trim()) return
    setSubmitted(true)
    setTimeout(() => { setStep(2) }, 1000)
  }
  const startBuild = () => {
    setStep(3)
    setTimeout(() => {
      const iv = setInterval(() => {
        setBuildProgress(p => {
          if (p >= 100) { clearInterval(iv); setBuildDone(true); setStep(4); return 100 }
          return Math.min(100, p + Math.random() * 15)
        })
      }, 400)
    }, 600)
  }

  const fmt = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`

  const stepDefs = [
    { icon: '📋', title: 'Submit Your Idea', desc: 'Drop a voice note. Paste a Figma or Notion link. Or just type what you need.' },
    { icon: '🧠', title: 'AI Reads & Understands', desc: 'Your brief is analysed, structured, and turned into a full Product Requirement Document.' },
    { icon: '🔨', title: 'CodeRabbit Reviews & Builds', desc: 'AI agents write the code. CodeRabbit reviews every pull request before it merges.' },
    { icon: '🚀', title: 'Live in Production', desc: 'Your product is deployed, tested, and live. You get the link tonight.' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff', fontFamily: 'Inter, system-ui, sans-serif', position: 'relative', overflowX: 'hidden' }}>
      <BgGrid />

      {/* ── NAV ── */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', height: 64, background: 'rgba(10,10,10,0.92)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: '#C9A84C', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 14, color: '#0a0a0a' }}>⚡</div>
          <span style={{ fontWeight: 900, fontSize: 15, letterSpacing: '-0.02em' }}>DARK<span style={{ color: '#C9A84C' }}>FACTORY</span></span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, fontSize: 13, color: '#9ca3af' }}>
          <a href="#how" style={{ textDecoration: 'none', color: '#9ca3af' }}>How it works</a>
          <a href="#free" style={{ textDecoration: 'none', color: '#9ca3af' }}>5 Free Apps</a>
          <a href="#submit" style={{ textDecoration: 'none', color: '#9ca3af' }}>Start building</a>
          <a href="#pricing" style={{ textDecoration: 'none', color: '#9ca3af' }}>Pricing</a>
          <button style={{ background: '#C9A84C', color: '#0a0a0a', fontWeight: 700, fontSize: 13, padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer' }}>Start building →</button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', zIndex: 10, padding: '120px 32px 80px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>

          {/* Left — copy */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 20, padding: '6px 14px', fontSize: 11, color: '#C9A84C', fontFamily: 'monospace', marginBottom: 24, letterSpacing: '0.05em' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block', animation: 'pulse 2s infinite' }} />
              PRODUCTION READY — First 5 apps free today
            </div>
            <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}`}</style>

            <h1 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 900, lineHeight: 1.05, marginBottom: 20, letterSpacing: '-0.02em' }}>
              <span style={{ color: '#fff' }}>Your clinic's digital</span><br />
              <span style={{ background: 'linear-gradient(90deg, #f59e0b, #C9A84C, #d97706)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                brain, built tonight.
              </span>
            </h1>

            <p style={{ fontSize: 16, color: '#9ca3af', lineHeight: 1.75, marginBottom: 32, maxWidth: 480 }}>
              Describe it in a voice note. Paste a Figma link. Type it out. The Dark Factory turns your aesthetic clinic's needs into a live product — built while you sleep, reviewed by AI, deployed to your domain.
            </p>

            <div style={{ display: 'flex', gap: 12, marginBottom: 32, flexWrap: 'wrap' }}>
              <a href="#submit" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#C9A84C', color: '#0a0a0a', fontWeight: 700, fontSize: 14, padding: '14px 24px', borderRadius: 10, textDecoration: 'none', transition: 'transform 0.2s, box-shadow 0.2s' }}
                onMouseEnter={e => { (e.target as HTMLElement).style.transform = 'translateY(-2px)'; (e.target as HTMLElement).style.boxShadow = '0 8px 24px rgba(201,168,76,0.3)' }}
                onMouseLeave={e => { (e.target as HTMLElement).style.transform = ''; (e.target as HTMLElement).style.boxShadow = '' }}>
                🚀 Start free today
              </a>
              <a href="#how" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid rgba(255,255,255,0.15)', color: '#fff', fontWeight: 600, fontSize: 14, padding: '13px 24px', borderRadius: 10, textDecoration: 'none' }}>
                See how it works
              </a>
            </div>

            {/* Stats row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              {[['68%', 'Patients book online first'], ['$7.3B', 'Global aesthetic market'], ['40%', 'No-shows without reminders']].map(([n, l]) => (
                <div key={l} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '14px 0', textAlign: 'center' }}>
                  <div style={{ fontSize: 22, fontWeight: 900, color: '#C9A84C' }}>{n}</div>
                  <div style={{ fontSize: 11, color: '#6b7280', marginTop: 4, lineHeight: 1.4 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — space station */}
          <div style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', height: 420, position: 'relative' }}>
            <SpaceStationPreview />
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section style={{ position: 'relative', zIndex: 10, borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(201,168,76,0.04)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px 32px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, textAlign: 'center' }}>
          {[['47', 'Builds completed'], ['4.8h', 'Avg delivery'], ['100%', 'CodeRabbit reviewed'], ['0', 'Security breaches']].map(([n, l]) => (
            <div key={l}><div style={{ fontSize: 24, fontWeight: 900, color: '#C9A84C' }}>{n}</div><div style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>{l}</div></div>
          ))}
        </div>
      </section>

      {/* ── 5 FREE APPS ── */}
      <section id="free" style={{ position: 'relative', zIndex: 10, maxWidth: 1200, margin: '0 auto', padding: '80px 32px' }}>
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <div style={{ fontSize: 11, color: '#C9A84C', fontFamily: 'monospace', letterSpacing: '0.2em', marginBottom: 12 }}>LAUNCHING TODAY</div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 900, marginBottom: 12 }}>First 5 apps are free.</h2>
          <p style={{ color: '#9ca3af', maxWidth: 500, margin: '0 auto', fontSize: 15 }}>Tell us what you need. If it's one of these five, it's built and live tonight — completely free.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16, marginTop: 40 }}>
          {FIVE_FREE.map((f, i) => (
            <div key={f.n} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 24, transition: 'border-color 0.2s', cursor: 'pointer' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(201,168,76,0.5)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}>
              <div style={{ fontSize: 11, fontFamily: 'monospace', color: '#C9A84C', marginBottom: 12, opacity: 0.7 }}>{f.n} / 05</div>
              <div style={{ fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{f.title}</div>
              <div style={{ fontSize: 13, color: '#9ca3af', lineHeight: 1.6 }}>{f.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <a href="#submit" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#C9A84C', color: '#0a0a0a', fontWeight: 700, fontSize: 15, padding: '16px 32px', borderRadius: 10, textDecoration: 'none' }}>
            Claim your free app → 
          </a>
        </div>
      </section>

      {/* ── MEDICAL ── */}
      <section style={{ position: 'relative', zIndex: 10, maxWidth: 1200, margin: '0 auto', padding: '0 32px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 11, color: '#C9A84C', fontFamily: 'monospace', letterSpacing: '0.2em', marginBottom: 12 }}>FOR THE MEDICAL INDUSTRY</div>
          <h2 style={{ fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 900, marginBottom: 12 }}>Built for aesthetic clinics &amp; healthcare</h2>
          <p style={{ color: '#9ca3af', maxWidth: 560, margin: '0 auto', fontSize: 15 }}>Every feature respects South African healthcare regulations. POPIA compliance built in from day one. Patient data stays yours.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
          {MEDICAL.map(m => (
            <div key={m.title} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: 20 }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{m.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, color: '#fff', marginBottom: 6 }}>{m.title}</div>

              <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, color: '#C9A84C', background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 20, padding: '3px 10px' }}>{m.stat}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" style={{ position: 'relative', zIndex: 10, maxWidth: 1200, margin: '0 auto', padding: '0 32px 80px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 11, color: '#C9A84C', fontFamily: 'monospace', letterSpacing: '0.2em', marginBottom: 12 }}>THE FLOW</div>
          <h2 style={{ fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 900 }}>From idea to live product in 4 steps</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
          {stepDefs.map((s, i) => (
            <Step key={s.title} n={i + 1} {...s} status={step > i ? 'done' : step === i ? 'active' : 'idle'} />
          ))}
        </div>

        {/* CodeRabbit */}
        <div style={{ marginTop: 32, background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.25)', borderRadius: 16, padding: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <div style={{ fontSize: 32 }}>🐰</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 17, color: '#fff', marginBottom: 4 }}>CodeRabbit AI Code Review</div>
              <div style={{ fontSize: 13, color: '#9ca3af' }}>Every pull request reviewed before it merges. Security, performance, and best practice flags in real time.</div>
            </div>
            {buildDone && <div style={{ marginLeft: 'auto', fontSize: 11, color: '#22c55e', background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 20, padding: '4px 12px', whiteSpace: 'nowrap' }}>✓ Active on this build</div>}
          </div>
          {buildDone ? (
            <div style={{ display: 'grid', gap: 10 }}>
              {REVIEWS.map(r => (
                <div key={r.file} style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <span style={{ fontSize: 11, color: '#9ca3af', fontFamily: 'monospace' }}>{r.file}</span>
                    <span style={{ fontSize: 10, color: '#6b7280' }}>{r.lang}</span>
                    <span style={{ marginLeft: 'auto', fontSize: 10, padding: '2px 8px', borderRadius: 10, background: r.status === 'approved' ? 'rgba(34,197,94,0.15)' : 'rgba(234,179,8,0.15)', color: r.status === 'approved' ? '#22c55e' : '#eab308', border: `1px solid ${r.status === 'approved' ? 'rgba(34,197,94,0.4)' : 'rgba(234,179,8,0.4)'}`, fontFamily: 'monospace' }}>
                      {r.status === 'approved' ? '✓ Approved' : '↻ Changes requested'}
                    </span>
                  </div>
                  <div style={{ fontSize: 12, color: '#9ca3af', lineHeight: 1.6 }}>{r.comment}</div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                <div style={{ flex: 1, height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${buildProgress}%`, background: 'linear-gradient(90deg, #f59e0b, #C9A84C)', transition: 'width 0.3s', borderRadius: 4 }} />
                </div>
                <span style={{ fontSize: 11, color: '#C9A84C', fontFamily: 'monospace', minWidth: 36 }}>{Math.round(buildProgress)}%</span>
              </div>
              <div style={{ fontSize: 11, color: '#6b7280', fontFamily: 'monospace' }}>booking.tsx → api/appointments.ts → schema.prisma → ...</div>
            </div>
          )}
        </div>
      </section>

      {/* ── SUBMIT ── */}
      <section id="submit" style={{ position: 'relative', zIndex: 10, maxWidth: 1200, margin: '0 auto', padding: '0 32px 80px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 11, color: '#C9A84C', fontFamily: 'monospace', letterSpacing: '0.2em', marginBottom: 12 }}>START HERE</div>
          <h2 style={{ fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 900 }}>Submit your idea</h2>
          <p style={{ color: '#9ca3af', marginTop: 8 }}>Voice note, link, or typed description. Pick your lane.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
          {/* Voice notes */}
          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <span style={{ fontSize: 24 }}>🎙️</span>
              <span style={{ fontWeight: 700, fontSize: 16, color: '#fff' }}>Voice Notes</span>
              <span style={{ marginLeft: 'auto', fontSize: 10, color: '#6b7280', fontFamily: 'monospace' }}>MiniMax TTS</span>
            </div>
            <div style={{ display: 'grid', gap: 12, marginBottom: 16 }}>
              {notes.map(n => (
                <div key={n.id} style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(239,68,68,0.2)', border: '1px solid rgba(239,68,68,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="#ef4444"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/></svg>
                    </div>
                    <span style={{ fontSize: 11, color: '#9ca3af' }}>{n.dur} · {n.time}</span>
                    <span style={{ marginLeft: 'auto', fontSize: 10, color: '#22c55e', background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 20, padding: '2px 8px' }}>✓ Transcribed</span>
                  </div>
                  <p style={{ fontSize: 12, color: '#d1d5db', fontStyle: 'italic', lineHeight: 1.6 }}>"{n.text}"</p>
                </div>
              ))}
            </div>
            {submitted && <div style={{ padding: '10px 14px', background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 10, fontSize: 13, color: '#22c55e', textAlign: 'center', marginBottom: 14 }}>✓ Voice note submitted — AI analysing your brief...</div>}
            <button
              onMouseDown={() => !recording && startRecord()}
              onMouseUp={() => recording && stopRecord()}
              style={{ width: '100%', padding: '14px', borderRadius: 10, fontWeight: 700, fontSize: 13, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 0.2s', background: recording ? 'rgba(239,68,68,0.8)' : '#C9A84C', color: recording ? '#fff' : '#0a0a0a' }}>
              {recording ? (
                <><span style={{ width: 10, height: 10, borderRadius: '50%', background: '#fff', animation: 'pulse 1s infinite', display: 'inline-block' }} />{fmt(recordingTimer)} — Release to stop</>
              ) : (
                <><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/></svg>Hold to record</>
              )}
            </button>
          </div>

          {/* Links */}
          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <span style={{ fontSize: 24 }}>🔗</span>
              <span style={{ fontWeight: 700, fontSize: 16, color: '#fff' }}>Reference Links</span>
              <span style={{ marginLeft: 'auto', fontSize: 10, color: '#6b7280', fontFamily: 'monospace' }}>Figma · Notion · Loom</span>
            </div>
            {[{ u: 'figma.com/file/salon-booking-v3', t: 'Figma', d: 'Booking flow mockup' }, { u: 'notion.so/clinic-workflows', t: 'Notion', d: 'Current intake process' }].map(l => (
              <div key={l.u} style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: 12, marginBottom: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 18 }}>{l.t === 'Figma' ? '🎨' : '📋'}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 11, color: '#C9A84C', fontFamily: 'monospace', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{l.u}</div>
                    <div style={{ fontSize: 10, color: '#6b7280' }}>{l.d}</div>
                  </div>
                  <span style={{ fontSize: 10, color: '#6b7280', background: 'rgba(255,255,255,0.06)', padding: '2px 8px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.08)', fontFamily: 'monospace', flexShrink: 0 }}>{l.t}</span>
                </div>
              </div>
            ))}
            <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
              <input value={link} onChange={e => setLink(e.target.value)} onKeyDown={e => e.key === 'Enter' && submitLink()} placeholder="Paste Figma, Notion, or any URL..." style={{ flex: 1, background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, padding: '10px 14px', fontSize: 12, color: '#fff', outline: 'none', fontFamily: 'monospace' }} />
              <button onClick={submitLink} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', fontWeight: 700, fontSize: 12, padding: '10px 16px', borderRadius: 8, cursor: 'pointer', whiteSpace: 'nowrap' }}>Submit</button>
            </div>
          </div>
        </div>

        {/* Type description */}
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <span style={{ fontSize: 24 }}>⌨️</span>
            <span style={{ fontWeight: 700, fontSize: 16, color: '#fff' }}>Or just type it</span>
          </div>
          <textarea value={desc} onChange={e => setDesc(e.target.value)} rows={4} placeholder="Describe your product idea in plain English. What does it do? Who uses it? What should it look like? What problem does it solve?..." style={{ width: '100%', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, padding: '12px 14px', fontSize: 13, color: '#fff', outline: 'none', resize: 'none', lineHeight: 1.65, fontFamily: 'Inter, sans-serif' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
            <span style={{ fontSize: 12, color: '#6b7280' }}>Be as descriptive as possible — the more detail, the better the output.</span>
            <button onClick={startBuild} style={{ background: '#C9A84C', color: '#0a0a0a', fontWeight: 700, fontSize: 13, padding: '12px 24px', borderRadius: 8, border: 'none', cursor: 'pointer' }}>
              Start building — R29 →
            </button>
          </div>
        </div>
      </section>

      {/* ── WHAT YOU GET ── */}
      <section style={{ position: 'relative', zIndex: 10, borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(201,168,76,0.02)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 32px' }}>
          <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 900, textAlign: 'center', marginBottom: 48 }}>What you receive</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {WHAT_YOU_GET.map(w => (
              <div key={w.t} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: 20 }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{w.i}</div>
                <div style={{ fontWeight: 700, fontSize: 15, color: '#fff', marginBottom: 6 }}>{w.t}</div>
                <div style={{ fontSize: 13, color: '#9ca3af', lineHeight: 1.65 }}>{w.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" style={{ position: 'relative', zIndex: 10, maxWidth: 1200, margin: '0 auto', padding: '80px 32px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, marginBottom: 12 }}>Simple pricing.</h2>
          <p style={{ color: '#9ca3af', fontSize: 16 }}>R29 per product. No subscription. No surprises.</p>
        </div>
        <div style={{ maxWidth: 440, margin: '0 auto' }}>
          <div style={{ background: 'rgba(201,168,76,0.06)', border: '2px solid rgba(201,168,76,0.5)', borderRadius: 20, padding: 36, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, background: '#C9A84C', color: '#0a0a0a', fontSize: 10, fontWeight: 900, padding: '4px 14px', borderBottomLeftRadius: 12 }}>BEST VALUE</div>
            <div style={{ fontSize: 64, fontWeight: 900, color: '#C9A84C', lineHeight: 1 }}>R29</div>
            <div style={{ fontSize: 15, color: '#9ca3af', marginBottom: 28, marginTop: 4 }}>per completed product</div>
            {['One product, one price', 'CodeRabbit AI review included', 'Unlimited revisions until approved', 'Production deployment included', 'PRD document included', '24h support after delivery', 'No monthly commitment'].map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, textAlign: 'left', fontSize: 13, color: '#d1d5db', padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <span style={{ color: '#22c55e', fontSize: 16 }}>✓</span>{f}
              </div>
            ))}
            <a href="#submit" style={{ display: 'block', width: '100%', marginTop: 24, background: '#C9A84C', color: '#0a0a0a', fontWeight: 800, fontSize: 15, padding: '16px', borderRadius: 10, textDecoration: 'none', transition: 'transform 0.2s, box-shadow 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(201,168,76,0.3)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = '' }}>
              Start your first build →
            </a>
            <p style={{ fontSize: 11, color: '#6b7280', marginTop: 14 }}>50% payment now · 50% when you approve the build</p>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '80px 32px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, marginBottom: 12 }}>Ready to build?</h2>
        <p style={{ color: '#9ca3af', marginBottom: 32, fontSize: 15 }}>First build is R29. If you don't love it, we fix it free.</p>
        <a href="#submit" style={{ display: 'inline-block', background: '#C9A84C', color: '#0a0a0a', fontWeight: 900, fontSize: 17, padding: '18px 48px', borderRadius: 12, textDecoration: 'none', transition: 'transform 0.2s, box-shadow 0.2s' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(201,168,76,0.35)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = '' }}>
          Launch Dark Factory →
        </a>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ position: 'relative', zIndex: 10, borderTop: '1px solid rgba(255,255,255,0.06)', padding: '24px 32px', textAlign: 'center', fontSize: 12, color: '#4b5563' }}>
        DARKFACTORY · Built by <span style={{ color: '#C9A84C' }}>OGRE Computer</span> · Studex Group AI Infrastructure · 2026 ·
        <a href="mailto:info@studexmeat.com" style={{ color: '#C9A84C', textDecoration: 'none', marginLeft: 8 }}>info@studexmeat.com</a>
      </footer>
    </div>
  )
}
