const features = [
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect x="4" y="8" width="32" height="24" rx="4" stroke="#00FF88" strokeWidth="2" fill="none" />
        <circle cx="13" cy="18" r="2" fill="#00FF88" />
        <circle cx="20" cy="18" r="2" fill="#00FF88" />
        <circle cx="27" cy="18" r="2" fill="#00FF88" />
        <path d="M8 26L13 22L17 26L22 22L26 26" stroke="#00FF88" strokeWidth="2" strokeLinecap="round" />
        <path d="M14 28L18 25L22 28L26 25" stroke="#00FF88" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      </svg>
    ),
    title: 'WhatsApp Integration',
    description: 'Connect directly to WhatsApp Business. Agents send, receive, and respond to messages automatically — 24/7.',
    color: '#00FF88',
    stats: '2.5M+ Messages/mo',
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect x="6" y="4" width="28" height="32" rx="2" stroke="#FFD700" strokeWidth="2" fill="none" />
        <line x1="12" y1="12" x2="28" y2="12" stroke="#FFD700" strokeWidth="2" />
        <line x1="12" y1="18" x2="24" y2="18" stroke="#FFD700" strokeWidth="1.5" opacity="0.7" />
        <line x1="12" y1="22" x2="26" y2="22" stroke="#FFD700" strokeWidth="1.5" opacity="0.7" />
        <line x1="12" y1="26" x2="20" y2="26" stroke="#FFD700" strokeWidth="1.5" opacity="0.7" />
        <rect x="12" y="29" width="8" height="3" rx="1" fill="#FFD700" opacity="0.5" />
        <circle cx="30" cy="8" r="5" fill="#FFD700" />
        <path d="M28 8L30 10L33 6" stroke="#05050A" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: 'n8n Automations',
    description: 'Powerful no-code workflow automation. Connect 400+ apps and create custom pipelines for your business.',
    color: '#FFD700',
    stats: '400+ Integrations',
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect x="4" y="6" width="32" height="24" rx="2" stroke="#00BFFF" strokeWidth="2" fill="#0D0D1A" />
        <rect x="8" y="10" width="10" height="8" fill="#00BFFF" opacity="0.3" stroke="#00BFFF" strokeWidth="1" />
        <rect x="22" y="10" width="10" height="8" fill="#00BFFF" opacity="0.3" stroke="#00BFFF" strokeWidth="1" />
        <rect x="8" y="22" width="24" height="4" fill="#00BFFF" opacity="0.3" stroke="#00BFFF" strokeWidth="1" />
        <path d="M10 14L13 12L16 15" stroke="#00BFFF" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M24 14L27 12L30 15" stroke="#00BFFF" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="24" y="24" width="8" height="2" rx="1" fill="#00BFFF" />
      </svg>
    ),
    title: 'Pixel Dashboard',
    description: 'Cinematic command center interface. Monitor agent activity, performance metrics, and real-time events.',
    color: '#00BFFF',
    stats: 'Real-time Monitoring',
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="14" stroke="#FF3366" strokeWidth="2" fill="none" />
        <circle cx="20" cy="20" r="10" stroke="#FF3366" strokeWidth="1" opacity="0.5" />
        <circle cx="20" cy="20" r="2" fill="#FF3366" />
        <path d="M20 10V14" stroke="#FF3366" strokeWidth="2" strokeLinecap="round" />
        <path d="M20 26V30" stroke="#FF3366" strokeWidth="2" strokeLinecap="round" />
        <path d="M10 20H14" stroke="#FF3366" strokeWidth="2" strokeLinecap="round" />
        <path d="M26 20H30" stroke="#FF3366" strokeWidth="2" strokeLinecap="round" />
        <text x="20" y="22" textAnchor="middle" fill="#FF3366" fontSize="6" fontFamily="Orbitron">24/7</text>
      </svg>
    ),
    title: '24/7 AI Agents',
    description: 'Never miss an opportunity. Agents work around the clock, handling inquiries, tasks, and automations while you rest.',
    color: '#FF3366',
    stats: '99.9% Uptime',
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect x="6" y="4" width="28" height="32" rx="2" stroke="#00FF88" strokeWidth="2" fill="#0D0D1A" />
        <rect x="10" y="8" width="20" height="4" rx="1" fill="#00FF88" opacity="0.4" />
        <rect x="10" y="14" width="14" height="2" rx="1" fill="#00FF88" opacity="0.6" />
        <rect x="10" y="18" width="18" height="2" rx="1" fill="#00FF88" opacity="0.4" />
        <rect x="10" y="22" width="12" height="2" rx="1" fill="#00FF88" opacity="0.6" />
        <circle cx="28" cy="28" r="6" stroke="#FFD700" strokeWidth="2" fill="#0D0D1A" />
        <path d="M25 28L27 30L31 26" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: 'Email & CRM',
    description: 'Full email automation with CRM integration. Agents manage leads, follow-ups, and customer communications seamlessly.',
    color: '#00FF88',
    stats: 'Smart Lead Routing',
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect x="4" y="20" width="6" height="16" rx="1" fill="#FFD700" opacity="0.6" />
        <rect x="12" y="14" width="6" height="22" rx="1" fill="#FFD700" opacity="0.8" />
        <rect x="20" y="8" width="6" height="28" rx="1" fill="#FFD700" />
        <rect x="28" y="4" width="6" height="32" rx="1" fill="#FFD700" opacity="0.4" />
        <path d="M4 18L10 14L16 18L22 8L28 4L34 2" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="34" cy="2" r="2" fill="#FFFFFF" />
        <line x1="2" y1="38" x2="38" y2="38" stroke="#FFD700" strokeWidth="1" opacity="0.3" />
      </svg>
    ),
    title: 'Real-time Analytics',
    description: 'Comprehensive reporting and insights. Track agent performance, response times, conversion rates, and ROI in real-time.',
    color: '#FFD700',
    stats: 'Live Reports',
  },
]

export default function Features() {
  return (
    <section
      className="relative py-24 px-4"
      style={{
        background: 'linear-gradient(180deg, #05050A 0%, #0A0A1A 50%, #05050A 100%)',
      }}
    >
      {/* Background decoration */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(0,255,136,0.03) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(255,215,0,0.03) 0%, transparent 50%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p
            style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: '#FFD700', letterSpacing: '0.3em' }}
            className="mb-3"
          >
            FEATURES
          </p>
          <h2
            style={{
              fontFamily: 'Orbitron, monospace',
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
              fontWeight: 700,
              color: '#E0E0FF',
            }}
            className="glow-text-accent"
          >
            BUILT FOR MODERN BUSINESS
          </h2>
          <p
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.9rem',
              color: '#6B7280',
              maxWidth: '600px',
              margin: '0.75rem auto 0',
            }}
          >
            Everything you need to automate, scale, and dominate your market — powered by AI agents.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="pixel-card reveal"
              style={{
                background: '#0D0D1A',
                border: `1px solid ${feature.color}22`,
                padding: '2rem',
                transitionDelay: `${i * 100}ms`,
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${feature.color}66`
                e.currentTarget.style.boxShadow = `0 0 30px ${feature.color}15`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `${feature.color}22`
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Background accent */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '100px',
                  height: '100px',
                  background: `radial-gradient(circle, ${feature.color}11 0%, transparent 70%)`,
                  pointerEvents: 'none',
                }}
              />

              {/* Icon */}
              <div className="mb-4" style={{ position: 'relative', zIndex: 1 }}>
                {feature.icon}
              </div>

              {/* Title */}
              <h3
                style={{
                  fontFamily: 'Orbitron, monospace',
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: feature.color,
                  marginBottom: '0.75rem',
                }}
              >
                {feature.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.8rem',
                  color: '#6B7280',
                  lineHeight: 1.7,
                  marginBottom: '1rem',
                }}
              >
                {feature.description}
              </p>

              {/* Stats badge */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.25rem 0.75rem',
                  background: `${feature.color}11`,
                  border: `1px solid ${feature.color}33`,
                  borderRadius: '2px',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.65rem',
                  color: feature.color,
                }}
              >
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: feature.color }} />
                {feature.stats}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
