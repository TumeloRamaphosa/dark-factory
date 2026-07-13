import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  size: number
  opacity: number
  speed: number
  twinkle: number
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const stars: Star[] = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random(),
      speed: Math.random() * 0.5 + 0.1,
      twinkle: Math.random() * Math.PI * 2,
    }))

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      stars.forEach((star) => {
        star.twinkle += 0.02
        star.opacity = 0.3 + Math.sin(star.twinkle) * 0.7
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${star.opacity})`
        ctx.fill()

        // Glow
        const grd = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 4)
        grd.addColorStop(0, `rgba(180,220,255,${star.opacity * 0.3})`)
        grd.addColorStop(1, 'transparent')
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size * 4, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()
      })
      animId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animId)
    }
  }, [])

  const tiers = [
    {
      name: 'STARTER',
      price: 'R2,500',
      period: '/month',
      features: ['1 AI Agent', 'WhatsApp Integration', '5 Automations', 'Email Support', 'Basic Dashboard'],
      color: '#00FF88',
      glow: 'glow-primary',
      accent: false,
    },
    {
      name: 'PROFESSIONAL',
      price: 'R5,000',
      period: '/month',
      features: ['3 AI Agents', 'WhatsApp + Email CRM', '20 Automations', 'Priority Support', 'Advanced Analytics', 'Custom Workflows'],
      color: '#FFD700',
      glow: 'glow-accent',
      accent: true,
      popular: true,
    },
    {
      name: 'ENTERPRISE',
      price: 'R7,000',
      period: '/month',
      features: ['Unlimited Agents', 'Full Suite Integration', 'Unlimited Automations', '24/7 Dedicated Support', 'Real-time Analytics', 'White-label Options'],
      color: '#00BFFF',
      glow: 'glow-accent',
      accent: false,
    },
  ]

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      />

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(0,255,136,0.06) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(255,215,0,0.04) 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, rgba(0,191,255,0.03) 0%, transparent 50%)',
          zIndex: 1,
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-20 flex flex-col items-center">
        {/* Bear Claw on Fire — Hero Logo */}
        <div className="text-center mb-8 reveal">
          <img
            src="https://agent-cdn.minimax.io/mcp/image_tool/output/364053150926602246/386320008851715/1782498790_ee8744f5.png"
            alt="StudEx Bear Claw on Fire"
            style={{
              width: 'auto',
              height: 'clamp(160px, 30vw, 280px)',
              imageRendering: 'pixelated',
              filter: 'drop-shadow(0 0 40px rgba(255,107,0,0.6)) drop-shadow(0 0 80px rgba(255,215,0,0.3))',
              animation: 'float 4s ease-in-out infinite',
            }}
          />
          <div
            className="mt-2"
            style={{ fontFamily: 'Orbitron, monospace', fontSize: 'clamp(2rem, 6vw, 4.5rem)', fontWeight: 700 }}
          >
            <span style={{ color: '#00FF88' }} className="glow-text-primary">{'{'}S</span>
            <span style={{ color: '#FFD700' }} className="glow-text-accent">tud</span>
            <span style={{ color: '#00FF88' }} className="glow-text-primary">Ex{'}'}</span>
            <span style={{ color: '#FF6B00', marginLeft: '8px', fontSize: '0.6em' }}>🔥</span>
          </div>
          <p style={{ color: '#6B7280', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', letterSpacing: '0.3em' }}>
            SUPER AGENTS
          </p>
        </div>

        {/* Tagline */}
        <h1
          className="text-center mb-6 reveal"
          style={{
            fontFamily: 'Orbitron, monospace',
            fontSize: 'clamp(1.5rem, 5vw, 3.5rem)',
            fontWeight: 700,
            color: '#E0E0FF',
            lineHeight: 1.2,
            maxWidth: '800px',
          }}
        >
          Your{' '}
          <span style={{ color: '#00FF88' }} className="glow-text-primary">Second Employee</span>
          {' '}is an{' '}
          <span style={{ color: '#FFD700' }} className="glow-text-accent">Agent</span>
        </h1>

        <p
          className="text-center mb-12 reveal"
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 'clamp(0.85rem, 2vw, 1.1rem)',
            color: '#6B7280',
            maxWidth: '600px',
            lineHeight: 1.8,
          }}
        >
          AI agents that work 24/7. Automate WhatsApp, emails, CRM, and workflows — while you sleep.
        </p>

        {/* CTA buttons */}
        <div className="flex gap-4 mb-16 reveal">
          <button className="btn-primary">
            Get Started
          </button>
          <button className="btn-outline">
            Watch Demo
          </button>
        </div>

        {/* Tier cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`pixel-card relative p-6 reveal ${tier.popular ? 'gradient-border' : ''}`}
              style={{
                background: '#0D0D1A',
                border: `2px solid ${tier.color}33`,
                clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
              }}
            >
              {tier.popular && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-bold"
                  style={{
                    background: 'linear-gradient(90deg, #FFD700, #FFA500)',
                    color: '#05050A',
                    fontFamily: 'Orbitron, monospace',
                    clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 8px 100%, 0 50%)',
                  }}
                >
                  MOST POPULAR
                </div>
              )}

              <div
                className="text-center mb-4"
                style={{ fontFamily: 'Orbitron, monospace', color: tier.color }}
              >
                {tier.name}
              </div>

              <div className="text-center mb-6">
                <span
                  style={{ fontFamily: 'Orbitron, monospace', fontSize: '2.5rem', fontWeight: 700, color: tier.color }}
                  className={tier.color === '#00FF88' ? 'glow-text-primary' : 'glow-text-accent'}
                >
                  {tier.price}
                </span>
                <span style={{ color: '#6B7280', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem' }}>
                  {tier.period}
                </span>
              </div>

              <ul className="space-y-2 mb-6">
                {tier.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2"
                    style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem', color: '#E0E0FF' }}
                  >
                    <span style={{ color: tier.color }}>▸</span>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                className="w-full py-3 text-sm font-bold"
                style={{
                  background: tier.accent ? 'linear-gradient(135deg, #FFD700, #FFA500)' : 'transparent',
                  color: tier.color,
                  border: `2px solid ${tier.color}`,
                  fontFamily: 'Orbitron, monospace',
                  cursor: 'pointer',
                  clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 20px ${tier.color}66`
                  e.currentTarget.style.background = `${tier.color}22`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.background = tier.accent ? 'linear-gradient(135deg, #FFD700, #FFA500)' : 'transparent'
                }}
              >
                CHOOSE {tier.name}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        style={{ animation: 'bounce 2s infinite' }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 5L12 19M12 19L5 12M12 19L19 12" stroke="#00FF88" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(10px); }
        }
      `}</style>
    </section>
  )
}
