import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = ['Features', 'Demo', 'Pricing', 'How it Works']

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      transition: 'all 0.3s',
      background: scrolled ? 'rgba(5,5,10,0.95)' : 'transparent',
      borderBottom: scrolled ? '1px solid #1A1A3A' : '1px solid transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
    }}>
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Bear Claw Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
          <img
            src="https://agent-cdn.minimax.io/mcp/image_tool/output/364053150926602246/386320008851715/1782498790_ee8744f5.png"
            alt="StudEx Claw"
            style={{ height: '38px', width: 'auto', imageRendering: 'pixelated' }}
          />
          <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '1.1rem', fontWeight: 700 }}>
            <span style={{ color: '#00FF88' }}>{'{'}</span>
            <span style={{ color: '#FFD700' }}>StudEx</span>
          </span>
        </div>

        {/* Nav links (desktop) */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(' ', '-')}`}
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.75rem',
                color: '#6B7280',
                textDecoration: 'none',
                letterSpacing: '0.05em',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#00FF88' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#6B7280' }}
            >
              {link}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <button style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.7rem', color: '#6B7280', background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#E0E0FF' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#6B7280' }}>
            Login
          </button>
          <button className="btn-primary" style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.7rem', padding: '0.5rem 1.25rem' }}>
            Get Started
          </button>
        </div>
      </div>
    </nav>
  )
}
