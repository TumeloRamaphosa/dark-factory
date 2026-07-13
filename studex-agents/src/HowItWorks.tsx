const steps = [
  {
    num: '01',
    title: 'Choose Your Tier',
    description: 'Select the plan that fits your business needs. Starter, Professional, or Enterprise.',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="4" y="12" width="40" height="28" rx="2" stroke="#00FF88" strokeWidth="2" />
        <path d="M4 18H44" stroke="#00FF88" strokeWidth="2" />
        <rect x="10" y="24" width="12" height="8" rx="1" fill="#00FF88" opacity="0.3" stroke="#00FF88" strokeWidth="1.5" />
        <rect x="26" y="24" width="12" height="8" rx="1" stroke="#00FF88" strokeWidth="1.5" />
        <path d="M24 4V12" stroke="#00FF88" strokeWidth="2" strokeLinecap="round" />
        <path d="M20 8H28" stroke="#00FF88" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    color: '#00FF88',
  },
  {
    num: '02',
    title: 'Connect WhatsApp',
    description: 'Link your WhatsApp Business account in minutes. Our agents are ready to communicate instantly.',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M8 40C8 40 10 36 14 34C18 32 20 34 20 34C20 34 22 36 20 40C18 44 14 46 14 46L12 42" stroke="#00BFFF" strokeWidth="2" strokeLinecap="round" />
        <circle cx="24" cy="24" r="14" stroke="#00BFFF" strokeWidth="2" />
        <circle cx="18" cy="21" r="2" fill="#00BFFF" />
        <circle cx="30" cy="21" r="2" fill="#00BFFF" />
        <circle cx="24" cy="29" r="1.5" fill="#00BFFF" />
        <path d="M18 25C18 25 20 27 24 27C28 27 30 25 30 25" stroke="#00BFFF" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    color: '#00BFFF',
  },
  {
    num: '03',
    title: 'Agents Join Your Team',
    description: 'Your AI agents come online and integrate with your systems — CRM, email, n8n, and more.',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="18" cy="20" r="8" stroke="#FFD700" strokeWidth="2" />
        <circle cx="30" cy="20" r="8" stroke="#FFD700" strokeWidth="2" />
        <path d="M8 40C8 40 10 34 18 34" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" />
        <path d="M28 34C36 34 40 40 40 40" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" />
        <circle cx="30" cy="20" r="5" fill="#0D0D1A" />
        <path d="M27 18L29 20L33 16" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M18 16V20M14 18H22" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    color: '#FFD700',
  },
  {
    num: '04',
    title: 'Watch Them Work',
    description: 'Monitor your agents in real-time via the pixel dashboard. Sit back as automation happens 24/7.',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="4" y="6" width="40" height="28" rx="2" stroke="#FF3366" strokeWidth="2" />
        <rect x="8" y="10" width="14" height="10" rx="1" fill="#FF3366" opacity="0.2" stroke="#FF3366" strokeWidth="1" />
        <rect x="26" y="10" width="14" height="10" rx="1" fill="#FF3366" opacity="0.2" stroke="#FF3366" strokeWidth="1" />
        <rect x="8" y="24" width="32" height="6" rx="1" fill="#FF3366" opacity="0.2" stroke="#FF3366" strokeWidth="1" />
        <path d="M11 15L15 12L19 16" stroke="#FF3366" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="28" y="26" width="8" height="2" rx="1" fill="#FF3366" />
        <rect x="4" y="36" width="40" height="6" rx="2" stroke="#FF3366" strokeWidth="2" />
        <circle cx="12" cy="39" r="1.5" fill="#FF3366" />
        <circle cx="18" cy="39" r="1.5" fill="#00FF88" />
        <circle cx="24" cy="39" r="1.5" fill="#FFD700" />
      </svg>
    ),
    color: '#FF3366',
  },
]

export default function HowItWorks() {
  return (
    <section className="relative py-24 px-4" style={{ background: '#05050A' }}>
      {/* Top gradient */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, #1A1A3A, transparent)' }} />
      <div className="relative max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: '#FF3366', letterSpacing: '0.3em' }} className="mb-3">HOW IT WORKS</p>
          <h2 style={{ fontFamily: 'Orbitron, monospace', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 700, color: '#E0E0FF' }}>
            FOUR STEPS TO <span style={{ color: '#00FF88' }} className="glow-text-primary">AGENT POWER</span>
          </h2>
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.9rem', color: '#6B7280', maxWidth: '600px', margin: '0.75rem auto 0' }}>
            From signup to full automation in under 24 hours.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line */}
          <div style={{ position: 'absolute', top: '60px', left: '10%', right: '10%', height: '2px', background: 'linear-gradient(90deg, #00FF88, #00BFFF, #FFD700, #FF3366)', opacity: 0.3 }} />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={step.num} className="reveal flex flex-col items-center text-center" style={{ transitionDelay: `${i * 150}ms` }}>
                {/* Step number */}
                <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
                  {/* Glow */}
                  <div style={{ position: 'absolute', inset: '-10px', background: `radial-gradient(circle, ${step.color}22 0%, transparent 70%)` }} />
                  {/* Icon circle */}
                  <div style={{ width: '80px', height: '80px', border: `2px solid ${step.color}`, background: '#0D0D1A', display: 'flex', alignItems: 'center', justifyContent: 'center', clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))', position: 'relative' }}>
                    {step.icon}
                  </div>
                  {/* Number badge */}
                  <div style={{ position: 'absolute', top: '-8px', right: '-8px', width: '28px', height: '28px', background: step.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Orbitron, monospace', fontSize: '0.65rem', fontWeight: 700, color: '#05050A', clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))' }}>
                    {step.num}
                  </div>
                </div>

                <h3 style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.9rem', fontWeight: 700, color: step.color, marginBottom: '0.75rem' }}>
                  {step.title}
                </h3>
                <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: '#6B7280', lineHeight: 1.7 }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
