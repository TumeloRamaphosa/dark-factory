import { useEffect } from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import PixelCommandCenter from './PixelCommandCenter'
import Features from './Features'
import Pricing from './Pricing'
import HowItWorks from './HowItWorks'
import Footer from './Footer'

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    document.querySelectorAll('.reveal').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])
}

export default function App() {
  useScrollReveal()

  return (
    <div style={{ background: '#05050A', minHeight: '100vh' }}>
      {/* CRT scanline overlay */}
      <div className="crt-overlay" />

      {/* Navigation */}
      <Navbar />

      {/* Sections */}
      <main>
        <div id="hero">
          <Hero />
        </div>
        <div id="demo">
          <PixelCommandCenter />
        </div>
        <div id="features">
          <Features />
        </div>
        <div id="pricing">
          <Pricing />
        </div>
        <div id="how-it-works">
          <HowItWorks />
        </div>

        {/* CTA Banner */}
        <section style={{ padding: '80px 1rem', textAlign: 'center', background: 'linear-gradient(180deg, #05050A 0%, #0A0A1A 50%, #05050A 100%)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 50%, rgba(0,255,136,0.06) 0%, transparent 60%)' }} />
          <div className="relative" style={{ maxWidth: '700px', margin: '0 auto' }}>
            <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: '#FFD700', letterSpacing: '0.3em', marginBottom: '1rem' }}>
              READY TO AUTOMATE?
            </p>
            <h2 style={{ fontFamily: 'Orbitron, monospace', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 700, color: '#E0E0FF', marginBottom: '1rem' }}>
              Your agents are waiting.
            </h2>
            <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.9rem', color: '#6B7280', marginBottom: '2rem', lineHeight: 1.8 }}>
              Join South African businesses already using AI agents to automate WhatsApp, emails, and workflows. Start your free trial today.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="btn-primary" style={{ fontSize: '0.8rem' }}>
                START FREE TRIAL
              </button>
              <button className="btn-outline" style={{ fontSize: '0.8rem' }}>
                BOOK A DEMO
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
