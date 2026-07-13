const PINK = '#E91E8C'
const GREEN = '#2ECC71'

export default function Footer() {
  return (
    <footer style={{background:'#1A1A2E',color:'#fff',padding:'4rem 8vw 2rem'}}>
      <div style={{display:'grid',gridTemplateColumns:'1.5fr 1fr 1fr 1fr',gap:'2.5rem',marginBottom:'3rem'}}>
        {/* Column 1: Brand */}
        <div>
          <div style={{fontFamily:'Nunito,sans-serif',fontWeight:900,fontSize:'1.2rem',color:PINK,marginBottom:'0.75rem'}}>
            📚 Maphiri<span style={{color:GREEN}}>'s Books</span>
          </div>
          <p style={{fontSize:'0.82rem',color:'#777',lineHeight:1.7}}>
            Financial literacy for kids through storytelling. Empowering the next generation of young South African entrepreneurs.
          </p>
        </div>
        {/* Column 2: Navigate */}
        <div>
          <h4 style={{fontFamily:'Nunito,sans-serif',fontWeight:800,fontSize:'0.78rem',color:'#fff',textTransform:'uppercase',letterSpacing:'2px',marginBottom:'1rem'}}>Navigate</h4>
          {['#home','#about-book','#meet-maphiri','#author','#foundation'].map(h => (
            <a key={h} href={h} style={{display:'block',fontSize:'0.82rem',color:'#777',marginBottom:'0.5rem',transition:'color 0.2s'}}
              onMouseEnter={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.color = PINK }}
              onMouseLeave={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.color = '#777' }}>
              {h.replace('#','').replace('-',' ')}
            </a>
          ))}
        </div>
        {/* Column 3: Buy */}
        <div>
          <h4 style={{fontFamily:'Nunito,sans-serif',fontWeight:800,fontSize:'0.78rem',color:'#fff',textTransform:'uppercase',letterSpacing:'2px',marginBottom:'1rem'}}>Buy</h4>
          {[
            ['Takealot','https://www.takealot.com'],
            ['Amazon','https://www.amazon.com/dp/1037090926'],
            ['dotdot.direct','https://dotdot.direct'],
            ['Apple Books','https://books.apple.com/us/book/id6753307388'],
            ['Kindle','https://www.amazon.com/Maphiris-Marvellous-Money-Moves-ebook'],
          ].map(([n,u]) => (
            <a key={n} href={u} target="_blank" rel="noopener noreferrer" style={{display:'block',fontSize:'0.82rem',color:'#777',marginBottom:'0.5rem',transition:'color 0.2s'}}
              onMouseEnter={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.color = PINK }}
              onMouseLeave={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.color = '#777' }}>
              {n}
            </a>
          ))}
        </div>
        {/* Column 4: Connect */}
        <div>
          <h4 style={{fontFamily:'Nunito,sans-serif',fontWeight:800,fontSize:'0.78rem',color:'#fff',textTransform:'uppercase',letterSpacing:'2px',marginBottom:'1rem'}}>Connect</h4>
          <a href="https://www.instagram.com/maphiris_books" target="_blank" rel="noopener noreferrer" style={{display:'block',fontSize:'0.82rem',color:'#777',marginBottom:'0.5rem',transition:'color 0.2s'}}
            onMouseEnter={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.color = PINK }}
            onMouseLeave={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.color = '#777' }}>Instagram</a>
          <a href="https://www.maphirisbooks.co.za" target="_blank" rel="noopener noreferrer" style={{display:'block',fontSize:'0.82rem',color:'#777',marginBottom:'0.5rem',transition:'color 0.2s'}}
            onMouseEnter={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.color = PINK }}
            onMouseLeave={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.color = '#777' }}>Website</a>
          <a href="mailto:info@maphirisbooks.co.za" style={{display:'block',fontSize:'0.82rem',color:'#777',marginBottom:'0.5rem',transition:'color 0.2s'}}
            onMouseEnter={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.color = PINK }}
            onMouseLeave={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.color = '#777' }}>Email</a>
        </div>
      </div>
      {/* Bottom bar */}
      <div style={{borderTop:'1px solid rgba(255,255,255,0.06)',paddingTop:'1.5rem',display:'flex',justifyContent:'space-between',alignItems:'center',fontSize:'0.75rem',color:'#555'}}>
        <span>© 2026 Maphiri's Books. All rights reserved.</span>
        <span>Built by Dark Factory for Keamogetswe Matsho</span>
      </div>
    </footer>
  )
}
