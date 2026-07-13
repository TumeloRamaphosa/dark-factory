import { useState } from 'react';
import {
  CheckCircle, Star, Lock, ShoppingCart, X,
  Package, Bot
} from 'lucide-react';
import { AGENT_PRODUCTS, SKILLS_MARKETPLACE, VM_SANDBOX_REASONS } from './Marketplace';

// ── PRODUCT MODAL ────────────────────────────────────────────────────────
function ProductModal(props: { product: typeof AGENT_PRODUCTS[0]; onClose: () => void }) {
  const p = props.product;
  const emailSubject = 'I want ' + p.name;
  const emailHref = 'mailto:info@studexmeat.com?subject=' + encodeURIComponent(emailSubject);

  return (
    <div className="modal-overlay" onClick={props.onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="mo-bar" style={{ background: 'linear-gradient(90deg, ' + p.color + ', ' + p.color + '60)' }} />
        <div className="mo-body">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="pc-icon" style={{ background: p.color + '15', border: '1px solid ' + p.color + '30' }}>
                <span style={{ fontSize: '1.25rem' }}>{p.icon}</span>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="pc-cat" style={{ color: p.color }}>{p.category}</span>
                  {p.badge && <span className="pc-badge badge-gold">{p.badge}</span>}
                </div>
                <h2 style={{ fontWeight: 800, fontSize: '1.2rem' }}>{p.name}</h2>
              </div>
            </div>
            <button onClick={props.onClose} className="btn-ghost" style={{ padding: '0.5rem', borderRadius: 8 }}>
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="mo-desc mb-6">{p.description}</p>

          {/* Pricing */}
          <div className="card p-5 mb-6" style={{ background: p.color + '08', border: '1px solid ' + p.color + '25' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="label mb-1" style={{ color: p.color }}>PRICE PER MONTH</p>
                <div className="flex items-baseline gap-2">
                  <span className="mo-price" style={{ color: p.color }}>R{p.base_price.toLocaleString()}</span>
                  <span style={{ fontSize: '0.875rem', color: 'var(--text2)' }}>/month</span>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '0.75rem', color: 'var(--text2)' }}>{p.pricing_note}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Lock className="w-3 h-3" style={{ color: '#6c63ff' }} />
                  <span style={{ fontSize: '0.7rem', fontFamily: 'JetBrains Mono, monospace', color: '#6c63ff' }}>VM ISOLATED</span>
                </div>
              </div>
            </div>
          </div>

          {/* What you get */}
          <h3 style={{ fontWeight: 700, marginBottom: '0.75rem' }}>What you get:</h3>
          <div className="space-y-2 mb-6">
            {p.what_you_get.map((w, i) => (
              <div key={i} className="mo-get-item">
                <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: p.color }} />
                <span className="mo-get-text">{w}</span>
              </div>
            ))}
          </div>

          {/* Use cases */}
          <div className="flex flex-wrap gap-2 mb-6">
            {p.use_cases.map((u, i) => (
              <span key={i} className="pc-badge" style={{ background: p.color + '10', color: p.color, border: '1px solid ' + p.color + '20' }}>
                {u}
              </span>
            ))}
          </div>

          {/* VM note */}
          <div className="card p-4 mb-6" style={{ background: 'rgba(108,99,255,0.04)', border: '1px solid rgba(108,99,255,0.12)' }}>
            <div className="flex items-center gap-2 mb-1">
              <Lock className="w-4 h-4" style={{ color: 'var(--accent)' }} />
              <p style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--accent)' }}>VM Sandboxed</p>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text2)', lineHeight: 1.6 }}>{p.vm_note}</p>
          </div>

          {/* CTA */}
          <a href={emailHref} className="btn-primary w-full justify-center"
            style={{ background: p.color, display: 'flex', padding: '0.9rem', fontSize: '0.9rem', justifyContent: 'center' }}>
            <ShoppingCart className="w-4 h-4" />
            Buy {p.name} — R{p.base_price.toLocaleString()}/month
          </a>
        </div>
      </div>
    </div>
  );
}

// ── PRODUCT CARD ──────────────────────────────────────────────────────────
function ProductCard(props: { product: typeof AGENT_PRODUCTS[0] }) {
  const p = props.product;
  const [open, setOpen] = useState(false);
  const extraFeatures = p.what_you_get.length - 3;

  return (
    <>
      <div className="product-card" onClick={() => setOpen(true)}>
        <div className="pc-top" style={{ background: 'linear-gradient(90deg, ' + p.color + ', ' + p.color + '60)' }} />
        <div className="pc-body">
          <div className="flex items-center justify-between mb-4">
            <div className="pc-icon" style={{ background: p.color + '12', border: '1px solid ' + p.color + '25' }}>
              <span style={{ fontSize: '1.1rem' }}>{p.icon}</span>
            </div>
            <div className="flex items-center gap-2">
              {p.badge && <span className="pc-badge badge-gold">{p.badge}</span>}
              <div className="badge-live-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', animation: 'pulse 2s ease-in-out infinite' }} />
            </div>
          </div>
          <h3 className="pc-title">{p.name}</h3>
          <p className="pc-cat" style={{ color: p.color }}>{p.category}</p>
          <p className="pc-tagline">{p.tagline}</p>
          <div className="pc-features">
            {p.what_you_get.slice(0, 3).map((w, i) => (
              <div key={i} className="pc-feature">
                <div className="pc-feature-dot" style={{ background: p.color }} />
                <span className="pc-feature-text" style={{ color: 'var(--text2)' }}>{w}</span>
              </div>
            ))}
          </div>
          {extraFeatures > 0 && (
            <p className="pc-cat" style={{ color: p.color, fontFamily: 'Inter, monospace', fontSize: '0.7rem' }}>
              +{extraFeatures} more
            </p>
          )}
        </div>
        <div className="pc-footer">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="pc-price" style={{ color: p.color }}>R{p.base_price.toLocaleString()}</span>
              <span className="pc-price-lbl">/mo</span>
            </div>
            <div className="flex items-center gap-1 mt-1">
              <Lock className="w-3 h-3" style={{ color: 'var(--accent)' }} />
              <span style={{ fontSize: '0.7rem', fontFamily: 'Inter, monospace', color: 'var(--accent)' }}>VM isolated</span>
            </div>
          </div>
          <button className="pc-view-btn" style={{ background: p.color + '15', color: p.color, border: '1px solid ' + p.color + '30' }}>
            View
          </button>
        </div>
      </div>
      {open && <ProductModal product={p} onClose={() => setOpen(false)} />}
    </>
  );
}

// ── SKILL CARD ───────────────────────────────────────────────────────────
function SkillCard(props: { skill: typeof SKILLS_MARKETPLACE[0] }) {
  const s = props.skill;
  return (
    <div className="skill-card">
      <div className="sc-top" style={{ background: 'linear-gradient(90deg, ' + s.color + ', ' + s.color + '60)' }} />
      <div className="sc-body">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: s.color + '12', border: '1px solid ' + s.color + '25' }}>
              <span style={{ fontSize: '1rem' }}>{s.icon}</span>
            </div>
            <div>
              <h3 className="sc-title">{s.name}</h3>
              <p className="sc-cat" style={{ color: s.color }}>{s.category}</p>
            </div>
          </div>
          {s.badge && <span className="pc-badge badge-gold">{s.badge}</span>}
        </div>
        <p className="sc-desc">{s.description}</p>
        <div className="sc-items">
          {s.skills_you_get.slice(0, 3).map((sk, i) => (
            <div key={i} className="sc-item">
              <div className="sc-item-dot" style={{ background: s.color }} />
              <span className="sc-item-text" style={{ color: 'var(--text2)' }}>{sk}</span>
            </div>
          ))}
        </div>
        <div className="sc-footer">
          <div className="flex items-center gap-3">
            <span className="sc-price" style={{ color: s.color }}>R{s.price.toLocaleString()}</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text3)' }}>{s.price_type}</span>
          </div>
          <div className="sc-rating">
            <Star className="w-3.5 h-3.5" style={{ color: '#f59e0b', fill: '#f59e0b' }} />
            <span style={{ fontSize: '0.75rem', fontFamily: 'Inter, monospace' }}>{s.rating}</span>
          </div>
        </div>
        <button className="btn-primary w-full justify-center mt-3" style={{ background: s.color + '15', color: s.color, border: '1px solid ' + s.color + '30', padding: '0.625rem' }}>
          <ShoppingCart className="w-4 h-4" /> Buy Skill
        </button>
      </div>
    </div>
  );
}

// ── AGENT MARKETPLACE ────────────────────────────────────────────────────
function AgentMarketplace() {
  const [active, setActive] = useState('all');
  const cats = ['all', ...Array.from(new Set(AGENT_PRODUCTS.map((p) => p.category)))];
  const filtered = active === 'all' ? AGENT_PRODUCTS : AGENT_PRODUCTS.filter((p) => p.category === active);
  const featured = filtered.filter((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured);

  return (
    <section id="marketplace" className="mp-section">
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(108,99,255,0.05) 0%, transparent 60%)', pointerEvents: 'none' }} />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="mp-header">
          <p className="label">// Agent Marketplace</p>
          <h2 className="mp-title">Buy an <span style={{ color: 'var(--accent)' }}>Agent.</span><br />Ship It Tonight.</h2>
          <p className="mp-desc">Off-the-shelf AI agents. Rebranded. Enhanced. Running in your own secure VM. One click to activate.</p>
        </div>

        <div className="mp-pills">
          {cats.map((c) => (
            <button key={c} onClick={() => setActive(c)} className={'filter-pill' + (active === c ? ' active' : '')}>
              {c === 'all' ? 'All Agents' : c}
            </button>
          ))}
        </div>

        {featured.length > 0 && (
          <div className="mp-grid-2 mb-6">
            {featured.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
        <div className="mp-grid-3">
          {rest.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </section>
  );
}

// ── SKILLS MARKETPLACE ──────────────────────────────────────────────────
function SkillsMarketplace() {
  const [active, setActive] = useState('all');
  const cats = ['all', ...Array.from(new Set(SKILLS_MARKETPLACE.map((s) => s.category)))];
  const filtered = active === 'all' ? SKILLS_MARKETPLACE : SKILLS_MARKETPLACE.filter((s) => s.category === active);

  return (
    <section id="skills" className="mp-section" style={{ background: 'var(--surface)' }}>
      <div className="container">
        <div className="mp-header">
          <p className="label" style={{ color: '#a855f7' }}>// Skills Marketplace</p>
          <h2 className="mp-title">Buy a <span style={{ color: '#a855f7' }}>Skill.</span><br />Upgrade Tonight.</h2>
          <p className="mp-desc">The same workflows we use every night in the Dark Factory. One-time purchase. Yours forever.</p>
        </div>

        <div className="mp-pills">
          {cats.map((c) => (
            <button key={c} onClick={() => setActive(c)} className={'filter-pill' + (active === c ? ' active' : '')}
              style={active === c ? { background: '#a855f7', color: '#fff', borderColor: '#a855f7' } : {}}>
              {c === 'all' ? 'All Skills' : c}
            </button>
          ))}
        </div>

        <div className="mp-grid-3 mb-8">
          {filtered.map((s) => <SkillCard key={s.id} skill={s} />)}
        </div>

        {/* Bundle */}
        <div className="cta-inner">
          <p style={{ fontFamily: 'Inter, monospace', fontSize: '0.75rem', marginBottom: '0.75rem', color: 'var(--text3)' }}>SKILL BUNDLE — ALL 6 SKILLS</p>
          <p style={{ fontSize: '0.9rem', marginBottom: '1rem', color: 'var(--text2)' }}>
            All 6 skills — <span style={{ textDecoration: 'line-through', color: 'var(--text3)' }}>R2,394</span>
            <span style={{ marginLeft: '0.5rem', fontWeight: 800, fontSize: '1.1rem', color: 'var(--accent)' }}>R1,499</span>
            <span style={{ fontSize: '0.75rem', marginLeft: '0.25rem', color: 'var(--text3)' }}>save R895</span>
          </p>
          <button className="btn-primary">
            <ShoppingCart className="w-4 h-4" /> Get the Bundle
          </button>
        </div>
      </div>
    </section>
  );
}

// ── VM SANDBOX ───────────────────────────────────────────────────────────
function VMSandboxExplainer() {
  const bads = [
    'All clients on the same server',
    'Your data mixed with other companies',
    'One slow client slows everyone down',
    'One breach = all clients exposed',
    'No guaranteed data residency',
    'POPIA compliance by policy only',
    'Shared GPU = unpredictable performance',
  ];
  const goods = [
    'One VM per client — completely isolated',
    'Your data never leaves your VM',
    'Dedicated GPU — no shared slowdown',
    'One breach = one VM. Zero blast radius.',
    'SA-based infrastructure — data never leaves SA',
    'POPIA compliant by architecture',
    '8 VMs running 24/7 on OGRE GPU cluster',
  ];
  const partners = [
    { name: 'nTech Labs', reason: "Computer vision models trained on YOUR data stay in YOUR VM. nTech Labs never sees anyone else's data.", color: '#ff4d88' },
    { name: 'Art Engineering', reason: 'Data centres built to VM spec. Hardware-level isolation — not just software.', color: '#f59e0b' },
    { name: 'Pharmasyntez', reason: 'SAHPRA requires pharmaceutical data isolation. Our VM architecture is already compliant.', color: '#4d9fff' },
  ];

  return (
    <section id="vmsandbox" className="vm-section">
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(108,99,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(108,99,255,0.02) 1px, transparent 1px)', backgroundSize: '50px 50px', opacity: 0.5 }} />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="mp-header">
          <p className="label">// VM Sandbox Architecture</p>
          <h2 className="mp-title">Why <span style={{ color: 'var(--accent)' }}>VM Isolation</span><br />Beats Shared AI</h2>
        </div>

        {/* Comparison */}
        <div className="vm-comp-grid">
          <div className="vm-comp-card" style={{ background: 'rgba(255,51,51,0.03)', borderColor: 'rgba(255,51,51,0.15)' }}>
            <p className="vm-comp-title" style={{ color: '#ef4444' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444', display: 'inline-block' }} />
              SHARED INFRASTRUCTURE
            </p>
            {bads.map((t, i) => (
              <div key={i} className="vm-comp-item">
                <div className="vm-comp-item-icon" style={{ background: 'rgba(255,85,85,0.2)' }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(255,85,85,0.6)' }} />
                </div>
                <span className="vm-comp-item-text" style={{ color: 'var(--text2)' }}>{t}</span>
              </div>
            ))}
          </div>
          <div className="vm-comp-card" style={{ background: 'rgba(108,99,255,0.03)', borderColor: 'rgba(108,99,255,0.15)' }}>
            <p className="vm-comp-title" style={{ color: '#6c63ff' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#6c63ff', display: 'inline-block', animation: 'pulse 2s ease-in-out infinite' }} />
              STUDEX VM SANDBOX
            </p>
            {goods.map((t, i) => (
              <div key={i} className="vm-comp-item">
                <div className="vm-comp-item-icon" style={{ background: 'rgba(108,99,255,0.15)' }}>
                  <CheckCircle className="w-3.5 h-3.5" style={{ color: '#6c63ff' }} />
                </div>
                <span className="vm-comp-item-text">{t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Partner proof */}
        <div className="mb-8">
          <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '1.5rem', textAlign: 'center' }}>Why this matters with our partners:</h3>
          <div className="grid grid-cols-3 gap-4">
            {partners.map((p) => (
              <div key={p.name} className="vm-partner-card"
                style={{ background: p.color + '06', borderColor: p.color + '30' }}>
                <p style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.4rem', color: p.color }}>{p.name}</p>
                <p className="vm-partner-desc">{p.reason}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 6 reasons */}
        <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '1.5rem', textAlign: 'center' }}>6 Reasons VM Isolation Changes Everything</h3>
        <div className="vm-reason-grid">
          {VM_SANDBOX_REASONS.map((r) => (
            <div key={r.title} className="vm-reason-card">
              <div className="mp-reason-icon">{r.icon}</div>
              <h4 className="mp-reason-title">{r.title}</h4>
              <p className="mp-reason-desc">{r.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CTA BANNER ─────────────────────────────────────────────────────────
function CTABanner() {
  return (
    <section className="section-pad">
      <div className="container">
        <div className="cta-inner">
          <p style={{ fontFamily: 'Inter, monospace', fontSize: '0.7rem', letterSpacing: '0.15em', color: 'rgba(108,99,255,0.4)', marginBottom: '1rem' }}>READY TO START?</p>
          <h2 className="cta-title">Buy an agent.<br /><span style={{ color: 'var(--accent)' }}>Running by tomorrow.</span></h2>
          <p className="cta-desc">No setup fees. No lock-in contracts. Cancel anytime. VM included. The Dark Factory ships every day.</p>
          <div className="cta-actions">
            <button className="btn-primary" onClick={() => document.getElementById('marketplace')?.scrollIntoView({ behavior: 'smooth' })}>
              <Package className="w-4 h-4" /> Browse Agents
            </button>
            <button className="btn-outline" onClick={() => document.getElementById('intake')?.scrollIntoView({ behavior: 'smooth' })}>
              <Bot className="w-4 h-4" /> Build Custom Agent
            </button>
          </div>
          <div className="cta-specs">
            {['6 agents', '6 skills', '8 VMs', '24/7', 'SA-hosted', 'POPIA compliant'].map((s) => (
              <span key={s} className="cta-spec">
                <span className="cta-dot" />{s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export { AgentMarketplace, SkillsMarketplace, VMSandboxExplainer, CTABanner };
