import { useState, useEffect, useRef } from 'react';
import {
  Mic, Link2, ArrowRight, Bot, Layers,
  CheckCircle, Star, Lock, ShoppingCart, X, Package,
  Crosshair, Sparkles, Hexagon, Factory,
  Server, Users, Eye, Send, Upload, Cpu
} from 'lucide-react';
import './clean.css';
import { AgentMarketplace, SkillsMarketplace, VMSandboxExplainer, CTABanner } from './MarketplacePage';

// ── BRAND CONSTANTS ──────────────────────────────────────────────────────────
const BRAND = {
  name: 'Th3 Dark Factory | Studex Dev♤¿$',
  short: 'Dark Factory',
  company: 'Studex Dev♤¿$',
  accent: '#6c63ff',
  secondary: '#00d4ff',
  gold: '#f59e0b',
  pink: '#ec4899',
};

// ── CANVAS ───────────────────────────────────────────────────────────────────
function AlgorithmicCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let frame = 0;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize(); window.addEventListener('resize', resize);
    const nodes = Array.from({ length: 90 }, () => ({
      x: Math.random() * 1400, y: Math.random() * 900,
      vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 2 + 0.8, pulse: Math.random() * Math.PI * 2,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame += 0.003;
      for (let i = 0; i < nodes.length; i++)
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(108,99,255,${(1 - dist / 160) * 0.3})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      for (const n of nodes) {
        n.x += n.vx + Math.sin(frame + n.y * 0.004) * 0.2;
        n.y += n.vy + Math.cos(frame + n.x * 0.004) * 0.2;
        if (n.x < 0) n.x = canvas.width; if (n.x > canvas.width) n.x = 0;
        if (n.y < 0) n.y = canvas.height; if (n.y > canvas.height) n.y = 0;
        const b = 0.5 + Math.sin(frame * 1.5 + n.pulse) * 0.25;
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 3);
        g.addColorStop(0, `rgba(180,160,255,${b})`);
        g.addColorStop(0.4, `rgba(108,99,255,${b * 0.7})`);
        g.addColorStop(1, 'rgba(108,99,255,0)');
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r * 3, 0, Math.PI * 2);
        ctx.fillStyle = g; ctx.fill();
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,180,255,${b})`; ctx.fill();
      }
      requestAnimationFrame(draw);
    };
    draw();
    return () => { window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} className="canvas-bg" />;
}

// ── NAVBAR ────────────────────────────────────────────────────────────────────
function Navbar() {
  const scroll = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  return (
    <nav className="nav">
      <div className="nav-inner">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => scroll('hero')}>
          <div className="nav-brand-logo">
            <Factory className="w-5 h-5 text-white" strokeWidth={2} />
          </div>
          <div>
            <span style={{ fontWeight: 800, fontSize: '0.875rem', letterSpacing: '-0.01em', background: 'linear-gradient(135deg, #6c63ff, #00d4ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              {BRAND.short}
            </span>
            <span style={{ fontSize: '0.65rem', color: 'var(--text3)', display: 'block', marginTop: -2, fontFamily: 'JetBrains Mono, monospace' }}>
              {BRAND.company}
            </span>
          </div>
        </div>
        <div className="nav-links">
          {[
            ['Architecture', 'architecture'], ['Marketplace', 'marketplace'],
            ['Skills', 'skills'], ['Founder', 'founder'],
            ['Partners', 'partners'],
          ].map(([l, id]) => (
            <button key={id} className="nav-link" onClick={() => scroll(id)}>{l}</button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <a href="mailto:info@studexmeat.com" className="btn-primary text-sm" style={{ padding: '0.5rem 1.1rem' }}>
            <Sparkles className="w-3.5 h-3.5" /> Build With Us
          </a>
        </div>
      </div>
    </nav>
  );
}

// ── NEWS TICKER ──────────────────────────────────────────────────────────────
function NewsTicker() {
  const items = [
    'Th3 Dark Factory | Studex Dev♤¿$ — Now Live',
    'LAISA v4 Proposal Live — R350K Build + R55K/Month Agent OS',
    'Cipher Tr@ce: CEO AI Agent, Fully Operational',
    '8 VMs Running 24/7 on the OGRE GPU Cluster',
    'Studex Global Markets × Pharmasyntez Partnership Active',
    'nTech Labs × Studex — Computer Vision AI Partnership',
    'DeepSeek R2 African Inference Layer — Coming Q3 2026',
  ];
  return (
    <div className="ticker">
      <div className="ticker-inner">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="ticker-item">
            <span className="ticker-dot" />
            <span>{item}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  const scroll = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  return (
    <section id="hero" className="hero">
      <div className="container">
        <div className="hero-grid">
          {/* LEFT */}
          <div>
            <div className="badge-live mb-6">
              <span className="badge-live-dot" />
              Strategic Partnership: Studex AI × nTech Labs
            </div>
            <h1 className="hero-title">
              A business<br />
              <span className="gradient-text">is a computer.</span><br />
              <span style={{ color: 'var(--text2)', fontWeight: 600 }}>A computer</span><br />
              <span style={{ color: 'var(--gold)' }}>is a business.</span>
            </h1>
            <p className="hero-sub">
              We build Cyber Sapien companies — AI agents run operations, humans orchestrate from the command centre. Every business has the intelligence of a multinational at African prices.
            </p>
            <div className="hero-actions">
              <button className="btn-glow" onClick={() => scroll('intake')}>
                <Mic className="w-5 h-5" /> Drop a Voice Note
              </button>
              <button className="btn-outline" onClick={() => scroll('architecture')}>
                <Layers className="w-4 h-4" /> See Architecture
              </button>
            </div>
            <div className="hero-stats">
              {[
                { v: '8', l: 'VMs Active 24/7' },
                { v: '60+', l: 'Skills Pack' },
                { v: '24/7', l: 'AI Operation' },
              ].map(s => (
                <div key={s.l} className="hero-stat">
                  <div className="hero-stat-num">{s.v}</div>
                  <div className="hero-stat-label">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          {/* RIGHT — Death Star */}
          <div className="flex items-center justify-center">
            <div className="deathstar">
              {[0, 1, 2, 3].map(i => (
                <div key={i} className="deathstar-ring"
                  style={{ width: `${60 + i * 75}px`, height: `${60 + i * 75}px`, animationDelay: `${i * 0.5}s` }} />
              ))}
              {[0, 1, 2].map(i => (
                <div key={`p${i}`} className="deathstar-pulse"
                  style={{ width: `${110 + i * 60}px`, height: `${110 + i * 60}px`, animationDelay: `${i * 1}s` }} />
              ))}
              <div className="deathstar-core">
                <Cpu className="w-7 h-7" style={{ color: '#6c63ff' }} />
                <span style={{ fontSize: '0.55rem', fontWeight: 700, letterSpacing: '0.15em', color: '#6c63ff', fontFamily: 'JetBrains Mono, monospace' }}>
                  DARK FACTORY
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── INTAKE WIZARD ─────────────────────────────────────────────────────────────
function IntakeWizard() {
  const [step, setStep] = useState(0);
  const [mode, setMode] = useState<string | null>(null);
  const [link, setLink] = useState('');
  const [chat, setChat] = useState([
    { r: 'agent', t: "Hi! I'm Cipher Tr@ce's intake agent. Tell me what you want to build — voice note, document, or a link." }
  ]);
  const [input, setInput] = useState('');
  const [recording, setRecording] = useState(false);

  const handleVoice = () => {
    setRecording(true);
    setTimeout(() => {
      setRecording(false); setStep(2);
      setChat(c => [...c, { r: 'user', t: '🎤 Voice note recorded' }, { r: 'agent', t: "Got it! I can hear exactly what you need. Let me ask a few targeted questions." }]);
    }, 2500);
  };
  const handleDoc = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setStep(2);
    setChat(c => [...c, { r: 'user', t: `📄 File uploaded: ${f.name}` }, { r: 'agent', t: 'Perfect. I have your document. Now let me understand the key details.' }]);
  };
  const handleLink = () => {
    if (!link.trim()) return;
    setStep(2);
    setChat(c => [...c, { r: 'user', t: `🔗 Link: ${link}` }, { r: 'agent', t: 'Nice link. I can see the direction. Let me dig into specifics.' }]);
  };
  const sendChat = () => {
    if (!input.trim()) return;
    const userText = input;
    setInput('');
    setChat(c => [...c, { r: 'user', t: userText }]);
    setTimeout(() => {
      const qs = [
        'And who is the end user? What does their day look like?',
        'What is the biggest pain point you are trying to solve?',
        'How should clients interact — WhatsApp, web, or email?',
        'What does success look like in 90 days?',
        "That's exactly what I needed. PRD is forming. You'll have a live demo in 48 hours.",
      ];
      setChat(c => [...c, { r: 'agent', t: qs[Math.floor(Math.random() * qs.length)] }]);
    }, 1200);
  };

  const steps = ['Start', 'Analyse', 'Discuss', 'PRD'];

  return (
    <section id="intake" className="section-pad" style={{ background: 'linear-gradient(180deg, transparent, rgba(108,99,255,0.02))' }}>
      <div className="container">
        <div className="section-header">
          <p className="label">// VoiceBox Intake Wizard</p>
          <h2 className="section-title">Tell me what you want to build.</h2>
          <p className="section-desc">Voice note. Document. Link. I'll analyse it and generate your PRD in 48 hours.</p>
        </div>

        <div className="card" style={{ maxWidth: 640, margin: '0 auto', padding: '2rem' }}>
          {/* Progress */}
          <div className="flex items-center gap-3 mb-8">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-3 flex-1">
                <div className="flex flex-col items-center gap-1 flex-1">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      background: i <= step ? 'linear-gradient(135deg, #6c63ff, #8b5cf6)' : 'var(--surface2)',
                      color: i <= step ? '#fff' : 'var(--text3)',
                      border: i <= step ? 'none' : '1px solid var(--border-bright)',
                      boxShadow: i <= step ? '0 4px 12px rgba(108,99,255,0.3)' : 'none',
                    }}>
                    {i < step ? <CheckCircle className="w-4 h-4" /> : i + 1}
                  </div>
                  <span style={{ fontSize: '0.65rem', color: i <= step ? 'var(--accent)' : 'var(--text3)', fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>{s}</span>
                </div>
                {i < steps.length - 1 && <div className="h-px flex-1" style={{ background: i < step ? 'var(--accent)' : 'var(--border)', marginBottom: 18 }} />}
              </div>
            ))}
          </div>

          {/* Step 0: Mode selection */}
          {step === 0 && (
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'voice', icon: Mic, label: 'Voice Note', desc: 'Talk through your idea naturally' },
                { id: 'doc', icon: Upload, label: 'Document', desc: 'Drop a brief, spec, or text file' },
                { id: 'link', icon: Link2, label: 'Share Link', desc: 'Figma, Notion, GitHub, any URL' },
              ].map(m => (
                <div key={m.id}
                  className="card p-5 text-center cursor-pointer"
                  style={{ border: mode === m.id ? '1px solid var(--accent)' : undefined, padding: '1.25rem' }}
                  onClick={() => setMode(m.id)}>
                  <m.icon className="w-6 h-6 mx-auto mb-2" style={{ color: 'var(--accent)' }} />
                  <p style={{ fontWeight: 700, fontSize: '0.875rem', marginBottom: '0.25rem' }}>{m.label}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text2)' }}>{m.desc}</p>
                </div>
              ))}
            </div>
          )}

          {/* Step 0: Actions */}
          {step === 0 && mode && (
            <div className="mt-6 flex justify-center">
              {mode === 'voice' && (
                <button className="record-btn" onClick={handleVoice}>
                  {recording
                    ? <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#fff', animation: 'pulse 1s infinite' }} />
                    : <Mic className="w-7 h-7 text-white" />
                  }
                </button>
              )}
              {mode === 'doc' && (
                <label className="btn-primary cursor-pointer">
                  <Upload className="w-4 h-4" /> Choose File
                  <input type="file" className="hidden" accept=".pdf,.doc,.docx,.txt,.md" onChange={handleDoc} />
                </label>
              )}
              {mode === 'link' && (
                <div className="flex gap-2 w-full" style={{ maxWidth: 400 }}>
                  <input value={link} onChange={e => setLink(e.target.value)} placeholder="https://..." className="input"
                    onKeyDown={e => e.key === 'Enter' && handleLink()} />
                  <button className="btn-primary" onClick={handleLink}><ArrowRight className="w-4 h-4" /></button>
                </div>
              )}
            </div>
          )}

          {/* Step 1: Loading */}
          {step === 1 && (
            <div className="text-center py-8">
              <div className="w-10 h-10 rounded-full border-2 border-t-transparent mx-auto mb-4 animate-spin"
                style={{ borderColor: 'var(--accent)', borderTopColor: 'transparent' }} />
              <p style={{ color: 'var(--text2)', fontSize: '0.875rem' }}>Analysing your input with Cipher Tr@ce...</p>
            </div>
          )}

          {/* Step 2+: Chat */}
          {step >= 2 && (
            <div>
              <div className="space-y-3 mb-4" style={{ maxHeight: 280, overflowY: 'auto' }}>
                {chat.map((m, i) => (
                  <div key={i} className={m.r === 'user' ? 'flex justify-end' : ''}>
                    <div className={m.r === 'user' ? 'chat-bubble-user px-4 py-3' : 'chat-bubble-agent px-4 py-3'}
                      style={{ maxWidth: '80%' }}>
                      <p style={{ fontSize: '0.875rem' }}>{m.t}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type your answer..." className="input flex-1"
                  onKeyDown={e => e.key === 'Enter' && sendChat()} />
                <button className="btn-primary" onClick={sendChat}><Send className="w-4 h-4" /></button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ── FOUNDER STORY ─────────────────────────────────────────────────────────────
function FounderStory() {
  return (
    <section id="founder" className="section-pad" style={{ background: 'var(--surface)' }}>
      <div className="container">
        <div className="section-header">
          <p className="label">// The Founder</p>
          <h2 className="section-title">
            Meet <span className="gradient-text-gold">Tumelo Ramaphosa</span>
          </h2>
          <p className="section-desc">
            Son of President Cyril Ramaphosa. Serial entrepreneur. Youngest AWS CP in Africa. 11 years building at the intersection of technology, trade, and transformation.
          </p>
        </div>

        <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
          {/* LEFT: Bio + Companies */}
          <div>
            <div className="card p-6 mb-6">
              <p style={{ fontSize: '0.9rem', color: 'var(--text2)', lineHeight: 1.8 }}>
                From McDonald's batch cooker to South Africa's premier Wagyu supplier. From Hult International Business School to the youngest AWS Certified Cloud Practitioner in Africa. From blockchain wildlife conservation with IBM and Cardano to AI agents running 24/7. Tumelo has spent 11 years building the companies that others said were impossible.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {['IBM Partner', 'Cardano Partner', 'AWS Partner', 'Google Cloud Partner'].map(t => (
                  <span key={t} className="badge-live">{t}</span>
                ))}
              </div>
            </div>
            <h3 style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text3)', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'JetBrains Mono, monospace' }}>
              The Studex Ecosystem
            </h3>
            <div className="space-y-2">
              {[
                { name: 'Studex Meat', sector: 'Premium Wagyu · 50+ restaurants', color: '#ec4899' },
                { name: 'StudEx Enterprise', sector: 'Cloud FinOps · AWS + Google Cloud Partner', color: '#4d9fff' },
                { name: 'StudEx Wild Life', sector: 'Blockchain conservation · IBM + Cardano', color: '#f59e0b' },
                { name: 'Th3 Dark Factory', sector: 'AI Agent Factory · Cipher Tr@ce CEO', color: '#6c63ff' },
              ].map(c => (
                <div key={c.name} className="card p-4" style={{ borderLeft: `3px solid ${c.color}` }}>
                  <p style={{ fontWeight: 700, fontSize: '0.875rem' }}>{c.name}</p>
                  <p style={{ fontSize: '0.75rem', color: c.color }}>{c.sector}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Timeline */}
          <div>
            <h3 style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--text3)', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'JetBrains Mono, monospace' }}>
              11 Years of Building
            </h3>
            <div className="timeline space-y-0">
              {[
                { y: '2011', e: 'Founded Studex Meat at age 20' },
                { y: '2017', e: 'Founded StudEx Enterprise + Wild Life' },
                { y: '2018', e: 'ICO vs VC panel, Sheppard Mullin, Palo Alto' },
                { y: '2019', e: 'AWS + Google Cloud partnerships signed' },
                { y: '2020', e: 'ITWeb: "SA\'s First Son looks to cut cloud costs"' },
                { y: '2020', e: 'IBM + Cardano wildlife blockchain confirmed' },
                { y: '2025', e: 'Pharmasyntez Russia partnership signed' },
                { y: '2026', e: 'Dark Factory + Cipher Tr@ce fully operational' },
              ].map(item => (
                <div key={item.y} className="timeline-item">
                  <div className="timeline-year">{item.y}</div>
                  <div className="timeline-content">{item.e}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── PARTNERS ───────────────────────────────────────────────────────────────────
function Partners() {
  return (
    <section id="partners" className="section-pad">
      <div className="container">
        <div className="section-header">
          <p className="label">// Strategic Partnerships</p>
          <h2 className="section-title">The <span className="gradient-text-gold">nTech Labs</span> Partnership</h2>
          <p className="section-desc">Studex AI announces strategic partnership with nTech Labs — world-class computer vision AI — to power the Studex Super Agents platform across Africa.</p>
        </div>

        <div className="partner-grid mb-8">
          {[
            { name: 'nTech Labs', tag: 'Computer Vision AI', desc: 'World-class computer vision. Object detection, facial recognition, quality inspection for African industry. 99.7% accuracy on African datasets.', color: '#ec4899', icon: Eye },
            { name: 'Art Engineering', tag: 'Data Centre Infrastructure', desc: 'Hyperscale data centres across Africa. AI-ready infrastructure — power, cooling, connectivity — purpose-built for the Studex Super Agents platform.', color: '#f59e0b', icon: Server },
            { name: 'Pharmasyntez', tag: 'Russia-Africa Pharma', desc: 'Anti-TB, HIV, oncology, diabetes distribution across Africa. SAHPRA licensed. B-BBEE Level 1. Managed by Studex Global Markets agents.', color: '#4d9fff', icon: Package },
          ].map(p => (
            <div key={p.name} className="partner-card"
              style={{ background: `${p.color}06`, borderColor: `${p.color}25` }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${p.color}12`, border: `1px solid ${p.color}25` }}>
                  <p.icon className="w-5 h-5" style={{ color: p.color }} />
                </div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: '0.95rem' }}>{p.name}</p>
                  <p style={{ fontSize: '0.7rem', color: p.color, fontWeight: 600, fontFamily: 'JetBrains Mono, monospace' }}>{p.tag}</p>
                </div>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text2)', lineHeight: 1.7 }}>{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Cyber Sapien Block */}
        <div className="card p-8" style={{ border: '1px solid rgba(245,158,11,0.12)', background: 'linear-gradient(135deg, rgba(245,158,11,0.03), transparent)' }}>
          <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
            <div>
              <p className="label mb-3">// The Vision</p>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.02em' }}>
                The <span style={{ color: 'var(--gold)' }}>Cyber Sapien</span>
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text2)', lineHeight: 1.8 }}>
                A symbiosis of the best attributes of <strong style={{ color: 'var(--text)' }}>homo sapiens</strong> and <strong style={{ color: 'var(--text)' }}>robot</strong>. Agents have personality. Businesses have intelligence. Computers run themselves. The line blurs.
              </p>
            </div>
            <div>
              <p className="label mb-3">// The Systems</p>
              <div className="space-y-2">
                {[
                  'Agents Nest Cloud VM — secure isolated agent hosting',
                  'nTech Labs computer vision — quality control and logistics',
                  'Pharmasyntez — Russia-Africa pharma distribution',
                  'Art Engineering — hyperscale African data centres',
                  'B-BBEE Level 1 · SAHPRA licensed',
                ].map(f => (
                  <div key={f} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--accent)' }} />
                    <span style={{ fontSize: '0.85rem', color: 'var(--text2)' }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── FOOTER ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="nav-brand-logo">
              <Factory className="w-5 h-5 text-white" strokeWidth={2} />
            </div>
            <div>
              <span style={{ fontWeight: 800, fontSize: '0.875rem', letterSpacing: '-0.01em', background: 'linear-gradient(135deg, #6c63ff, #00d4ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                {BRAND.short}
              </span>
              <span style={{ fontSize: '0.65rem', color: 'var(--text3)', display: 'block', marginTop: -2, fontFamily: 'JetBrains Mono, monospace' }}>
                {BRAND.company}
              </span>
            </div>
          </div>
          <p className="footer-brand">
            The command centre for African business. AI agents that research, build, sell, and manage — 24/7. Humans orchestrate from the top.
          </p>
        </div>
        <div>
          <p className="footer-title">Contact</p>
          <a href="mailto:info@studexmeat.com" className="footer-link">info@studexmeat.com</a>
          <a href="mailto:info@studexmeat.com" className="footer-link">Tumelo Ramaphosa — Founder</a>
          <a className="footer-link">Cipher Tr@ce — CEO AI Agent</a>
        </div>
        <div>
          <p className="footer-title">Links</p>
          <a href="https://oabod1557tze.space.minimax.io" className="footer-link">LAISA Agent OS v4</a>
          <a href="https://mam5k6xx5l20.space.minimax.io" className="footer-link">Dark Factory v3</a>
          <a href="https://ovkzmtngjhn6.space.minimax.io/portal.html" className="footer-link">OGRE Intelligence</a>
        </div>
      </div>
      <div style={{ maxWidth: 1200, margin: '2rem auto 0', padding: '0 2rem', borderTop: '1px solid var(--border)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ fontSize: '0.75rem', color: 'var(--text3)', fontFamily: 'JetBrains Mono, monospace' }}>
          {BRAND.name} · Studex Group 2026
        </p>
        <p style={{ fontSize: '0.75rem', color: 'var(--accent)', fontFamily: 'JetBrains Mono, monospace' }}>
          Cipher Tr@ce · CEO · {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}

// ── MAIN APP ────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <AlgorithmicCanvas />
      <Navbar />
      <NewsTicker />
      <Hero />
      <IntakeWizard />
      <VMSandboxExplainer />
      <AgentMarketplace />
      <SkillsMarketplace />
      <FounderStory />
      <Partners />
      <CTABanner />
      <Footer />
    </div>
  );
}
