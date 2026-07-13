import { useState, useCallback } from 'react'
import { D, shops, chapters, reviews } from './ClaymorphismDesign'
import Avatar3D from './Avatar3D'

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontSize: '0.72rem', fontWeight: 800, color: D.PINK,
      textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '0.5rem',
      fontFamily: D.FONTS.body,
    }}>
      {children}
    </div>
  )
}

function ClayCard({ children, color = 'white', style = {} }: {
  children: React.ReactNode; color?: string; style?: React.CSSProperties
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: color === 'white' ? D.CARD_BG : `rgba(${color},0.12)`,
        borderRadius: D.R_CARD,
        boxShadow: hovered ? D.SHADOW_CLAY_DEEP : D.SHADOW_CLAY,
        border: `2px solid rgba(255,255,255,${hovered ? 0.9 : 0.5})`,
        backdropFilter: 'blur(20px)',
        padding: '2rem',
        transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
        transform: hovered ? 'translateY(-6px) scale(1.02)' : 'translateY(0) scale(1)',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

function ClayButton({
  children, onClick, color = D.PINK, size = 'md', style = {}, disabled = false
}: {
  children: React.ReactNode; onClick?: () => void; color?: string;
  size?: 'sm' | 'md' | 'lg'; style?: React.CSSProperties; disabled?: boolean
}) {
  const [pressed, setPressed] = useState(false)
  const sizes = { sm: { padding: '0.6rem 1.4rem', fontSize: '0.85rem' }, md: { padding: '0.9rem 2rem', fontSize: '0.95rem' }, lg: { padding: '1.1rem 2.8rem', fontSize: '1.05rem' } }
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      style={{
        background: color,
        color: '#fff',
        border: 'none',
        borderRadius: D.R_BUTTON,
        fontFamily: D.FONTS.heading,
        fontWeight: 800,
        cursor: disabled ? 'not-allowed' : 'pointer',
        boxShadow: pressed ? `4px 4px 12px rgba(0,0,0,0.2)` : `8px 8px 20px ${color}55`,
        transform: pressed ? 'translateY(2px) scale(0.97)' : 'translateY(0) scale(1)',
        transition: 'all 0.2s cubic-bezier(0.34,1.56,0.64,1)',
        opacity: disabled ? 0.6 : 1,
        ...sizes[size],
        ...style,
      }}
    >
      {children}
    </button>
  )
}

function StarRating() {
  return <div style={{ color: D.GOLD, fontSize: '1.1rem', marginBottom: '0.6rem', letterSpacing: '2px' }}>★★★★★</div>
}

// ---- Navigation ----
function Nav({ onAvatar }: { onAvatar: () => void }) {
  const [open, setOpen] = useState(false)
  const scroll = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <>
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(255,248,240,0.92)',
        backdropFilter: 'blur(20px)',
        borderBottom: `2px solid ${D.PINK}18`,
        padding: '0 8vw', height: 68,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ fontFamily: D.FONTS.heading, fontWeight: 900, fontSize: '1.3rem', cursor: 'pointer' }}
          onClick={() => scroll('home')}>
          📚 Maphiri<span style={{ color: D.PINK }}>'s</span> <span style={{ color: D.GREEN }}>Books</span>
        </div>

        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {['home','about-book','meet-maphiri','buy','author'].map(h => (
            <a key={h} href={`#${h}`}
              onClick={e => { e.preventDefault(); scroll(h) }}
              style={{
                fontFamily: D.FONTS.body, fontWeight: 600, fontSize: '0.88rem',
                color: D.TEXT, textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = D.PINK}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = D.TEXT}
            >
              {h.replace('-',' ').replace(/\b\w/g, l => l.toUpperCase())}
            </a>
          ))}
          <ClayButton onClick={onAvatar} size="sm" color={D.GREEN}>
            🎙 Meet Maphiri AI
          </ClayButton>
        </div>
      </nav>

      {open && (
        <div style={{
          position: 'fixed', inset: 0, background: D.PAPER, zIndex: 200,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2rem',
        }}>
          <button onClick={() => setOpen(false)} style={{
            position: 'absolute', top: '1.5rem', right: '2rem',
            background: 'none', border: 'none', fontSize: '2rem', cursor: 'pointer',
          }}>✕</button>
          {['home','about-book','meet-maphiri','buy','author'].map(h => (
            <a key={h} href={`#${h}`} onClick={e => { e.preventDefault(); scroll(h); setOpen(false) }}
              style={{ fontFamily: D.FONTS.heading, fontSize: '1.2rem', fontWeight: 700, color: D.TEXT, textDecoration: 'none' }}>
              {h.replace('-',' ')}
            </a>
          ))}
        </div>
      )}
    </>
  )
}

// ---- Hero ----
function Hero({ onAvatar }: { onAvatar: () => void }) {
  const scroll = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="home" style={{
      minHeight: '92vh', background: `linear-gradient(160deg, ${D.PAPER} 0%, #FFF0F7 45%, #F0FFF5 100%)`,
      display: 'flex', alignItems: 'center', padding: '5rem 8vw', position: 'relative', overflow: 'hidden',
    }}>
      {/* Background blobs */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {[{ bg: D.PEACH, w: 450, h: 450, x: '-8%', y: '-10%', op: 0.22 },
          { bg: D.LAVENDER, w: 380, h: 380, x: '65%', y: '5%', op: 0.18 },
          { bg: D.MINT, w: 320, h: 320, x: '70%', y: '60%', op: 0.2 },
          { bg: D.BABY_BLUE, w: 300, h: 300, x: '5%', y: '60%', op: 0.2 },
        ].map((b, i) => (
          <div key={i} style={{
            position: 'absolute', left: b.x, top: b.y, width: b.w, height: b.h,
            borderRadius: '50%', background: b.bg, opacity: b.op,
            filter: 'blur(80px)',
          }} />
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center', position: 'relative', zIndex: 2, width: '100%', maxWidth: 1200 }}>
        {/* Left: Text */}
        <div>
          <div style={{
            display: 'inline-block', background: `${D.PINK}18`, borderRadius: 50,
            padding: '0.4rem 1rem', fontSize: '0.8rem', fontWeight: 700, color: D.PINK,
            marginBottom: '1.5rem', fontFamily: D.FONTS.body,
          }}>
            🏆 Award-Winning · Financial Literacy for Kids
          </div>

          <h1 style={{ fontFamily: D.FONTS.display, fontSize: 'clamp(2.4rem,5vw,4rem)', fontWeight: 700, lineHeight: 1.05, marginBottom: '0.5rem', color: D.TEXT }}>
            <span style={{ color: D.PINK }}>Maphiri</span><br />
            <span style={{ color: D.GREEN }}>Marvellous</span><br />
            <span style={{ color: D.TEXT }}>Money Moves</span>
          </h1>
          <p style={{ fontFamily: D.FONTS.body, fontSize: '0.85rem', color: D.TEXT_MUTED, marginBottom: '2rem' }}>
            by Keamogetswe Matsho · ISBN 978-1-77636-874-7
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            <ClayButton onClick={() => scroll('buy')} size="lg" color={D.PINK}>
              🛒 Buy — R250
            </ClayButton>
            <ClayButton onClick={onAvatar} size="lg" color={D.GREEN}>
              🎙 Meet Maphiri AI
            </ClayButton>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
            {['🏆 Amazon 5-Star', '📚 Takealot Bestseller', '🇿🇦 Made in SA'].map(b => (
              <span key={b} style={{
                fontFamily: D.FONTS.body, fontSize: '0.75rem', fontWeight: 600,
                background: D.CARD_BG, borderRadius: 50, padding: '0.3rem 0.8rem',
                boxShadow: '4px 4px 12px rgba(0,0,0,0.08)',
                backdropFilter: 'blur(12px)', color: D.TEXT_MUTED,
              }}>{b}</span>
            ))}
          </div>
        </div>

        {/* Right: Claymorphic Book + Avatar illustration */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
          {/* Book display */}
          <div style={{
            width: 'min(360px,100%)', aspectRatio: '3/4',
            background: `linear-gradient(145deg, ${D.PINK}22, ${D.GREEN}22)`,
            borderRadius: D.R_CARD, boxShadow: D.SHADOW_CLAY_LARGE,
            border: '3px solid rgba(255,255,255,0.7)',
            backdropFilter: 'blur(20px)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            padding: '2.5rem', textAlign: 'center',
          }}>
            <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>📖</div>
            <div style={{ fontFamily: D.FONTS.display, fontSize: '1.8rem', fontWeight: 700, color: D.PINK, lineHeight: 1.1, marginBottom: '0.5rem' }}>
              Maphiri's<br />Marvellous<br />Money Moves
            </div>
            <div style={{ fontFamily: D.FONTS.body, fontSize: '0.8rem', color: D.TEXT_MUTED, marginBottom: '1.5rem' }}>
              A story about entrepreneurship, friendship & believing in yourself
            </div>
            <div style={{ fontFamily: D.FONTS.body, fontSize: '0.7rem', color: D.TEXT_LIGHT }}>
              Ages 10–14 · Grade 4–8
            </div>
            <div style={{
              marginTop: '1.5rem', background: D.PINK, color: '#fff',
              borderRadius: 50, padding: '0.5rem 1.5rem', fontWeight: 800,
              fontFamily: D.FONTS.heading, fontSize: '1.1rem',
              boxShadow: D.SHADOW_CLAY_PINK,
            }}>
              R250.00
            </div>
          </div>

          {/* Available at badges */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {shops.map(s => (
              <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer"
                style={{
                  background: D.CARD_BG, borderRadius: 50, padding: '0.4rem 1rem',
                  fontSize: '0.75rem', fontWeight: 700, fontFamily: D.FONTS.body,
                  color: D.TEXT, textDecoration: 'none', boxShadow: '4px 4px 10px rgba(0,0,0,0.08)',
                  backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', gap: '0.3rem',
                }}>
                <span>{s.flag}</span> {s.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ---- Marquee ----
function Marquee() {
  const items = ['📚 Available at Takealot · Amazon · dotdot.direct · Apple Books · Kindle', '🌍 Financial Literacy for Kids', '💰 Entrepreneurship · Saving · Market Day', '📖 For Ages 10–14', '🇿🇦 Made in South Africa', '🌟 Loved by educators across SA']
  const doubled = [...items, ...items]
  return (
    <div style={{ background: D.PINK, padding: '0.7rem 0', overflow: 'hidden' }}>
      <div style={{
        display: 'inline-flex', gap: '3rem', animation: 'mq 25s linear infinite',
        fontFamily: D.FONTS.body, fontWeight: 800, fontSize: '0.82rem', color: '#fff',
        letterSpacing: '0.05em', textTransform: 'uppercase', whiteSpace: 'nowrap',
      }}>
        {doubled.map((item, i) => <span key={i}>{item}</span>)}
      </div>
    </div>
  )
}

// ---- Buy Section ----
function BuySection() {
  return (
    <section id="buy" style={{ background: `linear-gradient(180deg, ${D.PAPER}, #fff)`, textAlign: 'center', padding: '5rem 8vw' }}>
      <SectionLabel>// 📖 Order Your Copy</SectionLabel>
      <h2 style={{ fontFamily: D.FONTS.display, fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 700, marginBottom: '0.5rem', lineHeight: 1.1, color: D.TEXT }}>
        Get Your Copy <span style={{ color: D.PINK }}>Today</span>
      </h2>
      <p style={{ color: D.TEXT_MUTED, fontFamily: D.FONTS.body, fontSize: '0.95rem', maxWidth: 500, margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
        R250 · ISBN 978-1-77636-874-7 · Free delivery on orders over R350 at Takealot
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.25rem', maxWidth: 900, margin: '0 auto' }}>
        {shops.map(s => (
          <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}>
            <ClayCard color="white" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.6rem' }}>{s.flag}</div>
              <div style={{ fontFamily: D.FONTS.heading, fontWeight: 800, fontSize: '0.95rem', color: D.TEXT }}>{s.name}</div>
              <div style={{ fontFamily: D.FONTS.body, fontSize: '0.75rem', color: D.TEXT_MUTED, margin: '0.3rem 0 0.8rem' }}>{s.note}</div>
              <div style={{
                display: 'inline-block', background: D.PINK, color: '#fff',
                fontWeight: 700, fontSize: '0.75rem', padding: '0.4rem 1rem', borderRadius: 50,
                fontFamily: D.FONTS.body,
              }}>
                Buy Now →
              </div>
            </ClayCard>
          </a>
        ))}
      </div>
    </section>
  )
}

// ---- Chapters ----
function ChaptersSection() {
  return (
    <section id="about-book" style={{ padding: '5rem 8vw', background: D.PAPER }}>
      <SectionLabel>// 📖 Inside the Book</SectionLabel>
      <h2 style={{ fontFamily: D.FONTS.display, fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 700, marginBottom: '2rem', lineHeight: 1.1, color: D.TEXT }}>
        The <span style={{ color: D.PINK }}>Story</span>
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
        {chapters.map(ch => (
          <ClayCard key={ch.n} color={`${D.PINK}08`}>
            <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>{ch.emoji}</div>
            <div style={{ fontFamily: D.FONTS.heading, fontSize: '2rem', fontWeight: 900, color: `${D.PINK}25`, lineHeight: 1, marginBottom: '0.5rem' }}>
              0{ch.n}
            </div>
            <h4 style={{ fontFamily: D.FONTS.heading, fontWeight: 800, fontSize: '0.95rem', color: D.TEXT, marginBottom: '0.4rem' }}>{ch.title}</h4>
            <p style={{ fontFamily: D.FONTS.body, fontSize: '0.83rem', color: D.TEXT_MUTED, lineHeight: 1.65 }}>{ch.desc}</p>
          </ClayCard>
        ))}
      </div>
    </section>
  )
}

// ---- Reviews ----
function ReviewsSection() {
  return (
    <section style={{ padding: '5rem 8vw', background: `linear-gradient(180deg, #fff, ${D.PAPER_WARM})` }}>
      <SectionLabel>// ⭐ What Readers Say</SectionLabel>
      <h2 style={{ fontFamily: D.FONTS.display, fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 700, marginBottom: '2.5rem', lineHeight: 1.1, color: D.TEXT }}>
        Loved by <span style={{ color: D.GREEN }}>Kids</span> & Parents
      </h2>
      <div style={{ display: 'flex', gap: '1.25rem', overflowX: 'auto', paddingBottom: '1rem' }}>
        {reviews.map((r, i) => (
          <div key={i} style={{
            minWidth: 300, background: D.CARD_BG, borderRadius: D.R_CARD,
            boxShadow: D.SHADOW_CLAY, backdropFilter: 'blur(20px)',
            padding: '1.75rem', flexShrink: 0, border: '2px solid rgba(255,255,255,0.6)',
          }}>
            <StarRating />
            <p style={{ fontFamily: D.FONTS.body, fontSize: '0.88rem', color: D.TEXT, lineHeight: 1.7, marginBottom: '0.6rem', fontStyle: 'italic' }}>"{r.t}"</p>
            <p style={{ fontFamily: D.FONTS.body, fontSize: '0.75rem', color: D.TEXT_MUTED, fontWeight: 600 }}>— {r.s}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ---- Meet Maphiri Character ----
function CharacterSection({ onAvatar }: { onAvatar: () => void }) {
  const traits = ['Fierce', 'Ambitious', 'Resilient', 'Courageous', 'Driven', 'Innocent']
  return (
    <section id="meet-maphiri" style={{
      background: `linear-gradient(145deg, ${D.TEXT}, #2D1F4E)`,
      color: '#fff', padding: '5rem 8vw', position: 'relative', overflow: 'hidden',
    }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute', right: '-5%', top: '50%', transform: 'translateY(-50%)',
        width: 500, height: 500, borderRadius: '50%',
        background: `radial-gradient(circle, ${D.PINK}20 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      <SectionLabel>// 👧🏾 Meet Maphiri Monama</SectionLabel>
      <h2 style={{ fontFamily: D.FONTS.display, fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 700, marginBottom: '2.5rem', lineHeight: 1.1, color: '#fff' }}>
        The Girl Who <span style={{ color: D.GREEN }}>Means Business</span>
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '4rem', alignItems: 'center' }}>
        {/* Avatar card */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: 'min(300px,80%)', aspectRatio: '1',
            borderRadius: D.R_CARD, background: `linear-gradient(145deg, ${D.PINK}22, ${D.GREEN}22)`,
            border: '3px solid rgba(255,255,255,0.15)',
            boxShadow: D.SHADOW_CLAY_DEEP,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            padding: '2rem', backdropFilter: 'blur(12px)',
          }}>
            <div style={{ fontSize: '6rem', marginBottom: '1rem' }}>👧🏾</div>
            <div style={{ fontFamily: D.FONTS.heading, fontSize: '1.4rem', fontWeight: 900, color: '#fff', textAlign: 'center' }}>Maphiri Monama</div>
            <div style={{ color: D.PINK, fontWeight: 600, fontSize: '0.85rem', fontFamily: D.FONTS.body, marginTop: '0.3rem' }}>Grade 7 · Crowland Prep</div>
            <div style={{
              marginTop: '1rem', background: D.GREEN, color: '#fff',
              fontSize: '0.7rem', fontWeight: 700, padding: '0.3rem 0.9rem', borderRadius: 50,
              fontFamily: D.FONTS.body,
            }}>Age 12 · Entrepreneur</div>
          </div>
          <ClayButton onClick={onAvatar} size="md" color={D.GREEN}>
            🎙 Talk to Maphiri AI
          </ClayButton>
        </div>

        {/* Info */}
        <div>
          <p style={{ fontFamily: D.FONTS.body, fontSize: '1rem', color: '#ccc', lineHeight: 1.8, marginBottom: '1.5rem' }}>
            12 years old. Grade 7 at Crowland Prep, Johannesburg. One dream: to be just like her mother — a successful businesswoman.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '1.5rem' }}>
            {traits.map((t, i) => (
              <div key={t} style={{
                background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
                padding: '0.35rem 0.9rem', borderRadius: 50, fontSize: '0.8rem', fontWeight: 600,
                fontFamily: D.FONTS.body, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.4rem',
              }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: i % 2 === 0 ? D.PINK : D.GREEN }} />
                {t}
              </div>
            ))}
          </div>

          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {[
              ['Best friend', 'Thembi — always in on the plan'],
              ['Hero', 'Her mother — the businesswoman she admires'],
              ['School', 'Crowland Prep, Johannesburg'],
              ['Grade', '7 (Senior Primary)'],
            ].map(([k, v]) => (
              <li key={k} style={{ display: 'flex', gap: '0.75rem', fontFamily: D.FONTS.body, fontSize: '0.88rem', color: '#bbb' }}>
                <span style={{ color: D.GREEN, fontWeight: 700, minWidth: 80 }}>{k}:</span>
                <span>{v}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

// ---- Author ----
function AuthorSection() {
  return (
    <section id="author" style={{ padding: '5rem 8vw', background: D.PAPER }}>
      <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
        <SectionLabel>// ✍️ About the Author</SectionLabel>
        <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>👩🏾‍💼</div>
        <h2 style={{ fontFamily: D.FONTS.display, fontSize: 'clamp(1.6rem,4vw,2.4rem)', fontWeight: 700, marginBottom: '1.5rem', color: D.TEXT }}>
          Keamogetswe <span style={{ color: D.PINK }}>Matsho</span>
        </h2>
        <p style={{ fontFamily: D.FONTS.body, fontSize: '0.95rem', color: D.TEXT_MUTED, lineHeight: 1.8, marginBottom: '1.5rem' }}>
          Keamogetswe Matsho is a South African author and educator passionate about financial literacy for children. Through the character of Maphiri Monama, she brings the fundamentals of entrepreneurship, saving, and business ownership to life for young readers across South Africa.
        </p>
        <p style={{ fontFamily: D.FONTS.body, fontSize: '0.95rem', color: D.TEXT_MUTED, lineHeight: 1.8 }}>
          Her work has been featured in national media and adopted by schools across Johannesburg. She is the founder of the <strong>Maphiri Foundation</strong>, dedicated to bringing financial literacy resources to underserved communities.
        </p>
      </div>
    </section>
  )
}

// ---- Footer ----
function Footer() {
  return (
    <footer style={{ background: '#1A1A2E', color: '#fff', padding: '4rem 8vw 2rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: '2.5rem', marginBottom: '3rem' }}>
        <div>
          <div style={{ fontFamily: D.FONTS.heading, fontWeight: 900, fontSize: '1.2rem', color: D.PINK, marginBottom: '0.75rem' }}>
            📚 Maphiri<span style={{ color: D.GREEN }}>'s Books</span>
          </div>
          <p style={{ fontSize: '0.82rem', color: '#777', lineHeight: 1.7, fontFamily: D.FONTS.body }}>
            Financial literacy for kids through storytelling. Empowering the next generation of young South African entrepreneurs.
          </p>
        </div>
        <div>
          <h4 style={{ fontFamily: D.FONTS.body, fontWeight: 800, fontSize: '0.78rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem' }}>Navigate</h4>
          {['#home','#about-book','#meet-maphiri','#author','#buy'].map(h => (
            <a key={h} href={h} style={{ display: 'block', fontSize: '0.82rem', color: '#777', marginBottom: '0.5rem', textDecoration: 'none', fontFamily: D.FONTS.body }}
              onClick={e => { e.preventDefault(); document.querySelector(h)?.scrollIntoView({ behavior: 'smooth' }) }}>
              {h.replace('#','').replace('-',' ')}
            </a>
          ))}
        </div>
        <div>
          <h4 style={{ fontFamily: D.FONTS.body, fontWeight: 800, fontSize: '0.78rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem' }}>Buy</h4>
          {shops.map(s => (
            <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer"
              style={{ display: 'block', fontSize: '0.82rem', color: '#777', marginBottom: '0.5rem', textDecoration: 'none', fontFamily: D.FONTS.body }}>
              {s.name}
            </a>
          ))}
        </div>
        <div>
          <h4 style={{ fontFamily: D.FONTS.body, fontWeight: 800, fontSize: '0.78rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem' }}>Connect</h4>
          {[['Instagram', 'https://www.instagram.com/maphiris_books'], ['Website', 'https://www.maphirisbooks.co.za'], ['Email', 'mailto:info@maphirisbooks.co.za']].map(([n, u]) => (
            <a key={n} href={u} style={{ display: 'block', fontSize: '0.82rem', color: '#777', marginBottom: '0.5rem', textDecoration: 'none', fontFamily: D.FONTS.body }}>{n}</a>
          ))}
        </div>
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: '#555', fontFamily: D.FONTS.body }}>
        <span>© 2026 Maphiri's Books. All rights reserved.</span>
        <span>🏭 Built by Dark Factory for Keamogetswe Matsho</span>
      </div>
    </footer>
  )
}

// ---- Main App ----
export default function App() {
  const [showAvatar, setShowAvatar] = useState(false)

  return (
    <div style={{ minHeight: '100vh', background: D.PAPER }}>
      {showAvatar && <Avatar3D onClose={() => setShowAvatar(false)} />}

      <Nav onAvatar={() => setShowAvatar(true)} />
      <Hero onAvatar={() => setShowAvatar(true)} />
      <Marquee />
      <BuySection />
      <ChaptersSection />
      <ReviewsSection />
      <CharacterSection onAvatar={() => setShowAvatar(true)} />
      <AuthorSection />
      <Footer />

      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: ${D.PAPER}; }
        @keyframes mq { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: ${D.PAPER}; }
        ::-webkit-scrollbar-thumb { background: ${D.PINK}55; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: ${D.PINK}; }
      `}</style>
    </div>
  )
}
