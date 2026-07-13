const tiers = [
  {
    name: 'STARTER',
    price: 'R2,500',
    period: 'per month',
    tagline: 'Perfect for solo entrepreneurs',
    features: [
      { text: '1 AI Agent', included: true },
      { text: 'WhatsApp Integration', included: true },
      { text: '5 n8n Automations', included: true },
      { text: 'Basic Dashboard', included: true },
      { text: 'Email Support', included: true },
      { text: '100 Messages/month', included: true },
      { text: 'CRM Integration', included: false },
      { text: 'Priority Support', included: false },
      { text: 'Custom Workflows', included: false },
      { text: 'White-label Options', included: false },
    ],
    color: '#00FF88',
    cta: 'GET STARTED',
    popular: false,
  },
  {
    name: 'PROFESSIONAL',
    price: 'R5,000',
    period: 'per month',
    tagline: 'For growing teams that need more power',
    features: [
      { text: '3 AI Agents', included: true },
      { text: 'WhatsApp + Email CRM', included: true },
      { text: '20 n8n Automations', included: true },
      { text: 'Advanced Dashboard', included: true },
      { text: 'Priority Support', included: true },
      { text: '1,000 Messages/month', included: true },
      { text: 'CRM Integration', included: true },
      { text: 'Custom Workflows', included: true },
      { text: 'Analytics & Reports', included: true },
      { text: 'White-label Options', included: false },
    ],
    color: '#FFD700',
    cta: 'CHOOSE PROFESSIONAL',
    popular: true,
  },
  {
    name: 'ENTERPRISE',
    price: 'R7,000',
    period: 'per month',
    tagline: 'Unlimited power for serious operators',
    features: [
      { text: 'Unlimited AI Agents', included: true },
      { text: 'Full Suite Integration', included: true },
      { text: 'Unlimited Automations', included: true },
      { text: 'Real-time Analytics', included: true },
      { text: '24/7 Dedicated Support', included: true },
      { text: 'Unlimited Messages', included: true },
      { text: 'CRM Integration', included: true },
      { text: 'Custom Workflows', included: true },
      { text: 'Analytics & Reports', included: true },
      { text: 'White-label Options', included: true },
    ],
    color: '#00BFFF',
    cta: 'GO ENTERPRISE',
    popular: false,
  },
]

export default function Pricing() {
  return (
    <section className="relative py-24 px-4" style={{ background: 'linear-gradient(180deg, #05050A 0%, #080818 50%, #05050A 100%)' }}>
      <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px', background: 'linear-gradient(90deg, transparent, #00FF88, #FFD700, #00BFFF, transparent)', opacity: 0.4 }} />
      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: '#00BFFF', letterSpacing: '0.3em' }} className="mb-3">PRICING</p>
          <h2 style={{ fontFamily: 'Orbitron, monospace', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 700, color: '#E0E0FF' }}>
            CHOOSE YOUR <span style={{ color: '#FFD700' }} className="glow-text-accent">ARMS RACE</span>
          </h2>
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.9rem', color: '#6B7280', maxWidth: '600px', margin: '0.75rem auto 0' }}>
            All prices in ZAR. Cancel anytime. No lock-in contracts.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {tiers.map((tier) => (
            <div key={tier.name} className="reveal" style={{ position: 'relative', background: tier.popular ? '#0D0D1A' : '#08081A', border: tier.popular ? `2px solid ${tier.color}` : `1px solid #1A1A3A`, display: 'flex', flexDirection: 'column', clipPath: tier.popular ? 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)' : 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))' }}>
              {tier.popular && (
                <div style={{ position: 'absolute', top: '-1px', left: '50%', transform: 'translateX(-50%)', padding: '0.3rem 1.5rem', background: `linear-gradient(90deg, ${tier.color}, #FFA500)`, color: '#05050A', fontFamily: 'Orbitron, monospace', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.15em', clipPath: 'polygon(10px 0, calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 10px 100%, 0 50%)', whiteSpace: 'nowrap' }}>
                  RECOMMENDED
                </div>
              )}
              <div style={{ padding: '2rem 1.5rem 1.5rem', borderBottom: `1px solid ${tier.color}22`, textAlign: 'center' }}>
                <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.8rem', fontWeight: 700, color: tier.color, letterSpacing: '0.2em', marginBottom: '0.5rem' }}>{tier.name}</div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: '#6B7280', marginBottom: '1rem' }}>{tier.tagline}</div>
                <div className="flex items-baseline justify-center gap-1">
                  <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '2.5rem', fontWeight: 700, color: tier.color }}>{tier.price}</span>
                </div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: '#6B7280' }}>{tier.period}</div>
              </div>
              <div style={{ padding: '1.5rem', flex: 1 }}>
                <ul className="space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature.text} className="flex items-center gap-3" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.78rem' }}>
                      {feature.included ? (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="14" height="14" rx="2" stroke={tier.color} strokeWidth="1.5" /><path d="M4 8L7 11L12 5" stroke={tier.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="14" height="14" rx="2" stroke="#1A1A3A" strokeWidth="1.5" /><path d="M5 5L11 11M11 5L5 11" stroke="#1A1A3A" strokeWidth="1.5" strokeLinecap="round" /></svg>
                      )}
                      <span style={{ color: feature.included ? '#E0E0FF' : '#6B7280' }}>{feature.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ padding: '1.5rem' }}>
                <button className="w-full py-3 text-sm font-bold transition-all" style={{ background: tier.popular ? `linear-gradient(135deg, ${tier.color}, #FFA500)` : 'transparent', color: tier.popular ? '#05050A' : tier.color, border: `2px solid ${tier.color}`, fontFamily: 'Orbitron, monospace', fontSize: '0.75rem', letterSpacing: '0.1em', cursor: 'pointer', clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))', transition: 'all 0.3s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 0 30px ${tier.color}66`; if (!tier.popular) e.currentTarget.style.background = `${tier.color}22`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; if (!tier.popular) e.currentTarget.style.background = 'transparent'; }}>
                  {tier.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center mt-12" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: '#6B7280' }}>
          All plans include setup assistance, onboarding, and a 14-day free trial. <span style={{ color: '#00FF88' }}>Need a custom quote?</span> <span style={{ color: '#FFD700' }}>Talk to us.</span>
        </p>
      </div>
    </section>
  )
}
