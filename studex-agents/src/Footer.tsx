export default function Footer() {
  const links = {
    Product: ['Features', 'Pricing', 'Integrations', 'Changelog', 'Roadmap'],
    Company: ['About', 'Blog', 'Careers', 'Press', 'Contact'],
    Resources: ['Documentation', 'API Reference', 'Status', 'Community', 'Support'],
    Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR'],
  }

  return (
    <footer style={{ background: '#030308', borderTop: '1px solid #1A1A3A' }}>
      <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, #1A1A3A, #00FF8844, #FFD70044, #1A1A3A, transparent)' }} />
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4" style={{ fontFamily: 'Orbitron, monospace', fontSize: '1.3rem' }}>
              <span style={{ color: '#00FF88' }}>{'{'}</span>
              <span style={{ color: '#FFD700' }}>StudEx</span>
              <span style={{ color: '#00FF88' }}>{'}'}</span>
            </div>
            <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: '#6B7280', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              AI agents for South African businesses. Automate everything. Scale infinitely.
            </p>
            <div className="flex gap-3">
              {[
                { label: 'Twitter/X', color: '#E0E0FF', path: 'M4 4L20 20M20 4L4 20' },
                { label: 'LinkedIn', color: '#E0E0FF', path: 'M8 10h4v12M8 8v1M12 16h4' },
                { label: 'GitHub', color: '#E0E0FF', path: 'M8 6C8 6 6 8 6 12c0 2.2.8 4 2 4s2-1.2 2-2.8c0-1.6 1.2-2.2 1.2-2.2M10 18c0-2.2-.8-4-2-4' },
                { label: 'WhatsApp', color: '#00FF88', path: 'M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.3c1.5.5 3.2.8 5 .8 5.5 0 10-4.5 10-10S17.5 2 12 2z' },
              ].map((social) => (
                <button key={social.label} aria-label={social.label} style={{ width: '36px', height: '36px', background: '#0D0D1A', border: '1px solid #1A1A3A', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.3s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = social.color; e.currentTarget.style.boxShadow = `0 0 10px ${social.color}44`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#1A1A3A'; e.currentTarget.style.boxShadow = 'none'; }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d={social.path} stroke={social.color} strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.7rem', fontWeight: 700, color: '#E0E0FF', letterSpacing: '0.15em', marginBottom: '1rem' }}>
                {category.toUpperCase()}
              </h4>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: '#6B7280', textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#00FF88'; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#6B7280'; }}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid #1A1A3A', paddingTop: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: '#6B7280' }}>
            © 2026 StudEx Super Agents. All rights reserved. Made with{' '}
            <span style={{ color: '#FF3366' }}>♥</span> in South Africa.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00FF88', animation: 'pulse 2s infinite' }} />
            <span style={{ color: '#00FF88' }}>All systems operational</span>
            <span style={{ color: '#6B7280' }}>•</span>
            <span style={{ color: '#6B7280' }}>v2.4.1</span>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </footer>
  )
}
