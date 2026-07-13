// ============================================================
// MAPHIRI BOOKS — Claymorphism Design System
// Built by Dark Factory for Keamogetswe Matsho
// ============================================================

export const D = {
  // Brand colors
  PINK: '#E91E8C',
  GREEN: '#2ECC71',
  GOLD: '#F7D716',

  // Claymorphism pastel palette
  PEACH: '#FDBCB4',
  BABY_BLUE: '#ADD8E6',
  MINT: '#98FF98',
  LILAC: '#E6E6FA',
  LAVENDER: '#C4B5FD',

  // Warm paper background
  PAPER: '#FFF8F0',
  PAPER_WARM: '#FEF3E2',

  // UI surface
  CARD_BG: 'rgba(255,255,255,0.72)',
  CARD_GLASS: 'rgba(255,255,255,0.55)',

  // Text
  TEXT: '#2D2045',
  TEXT_MUTED: '#7C6F9A',
  TEXT_LIGHT: '#A99FC8',

  // Claymorphism shadows
  SHADOW_INNER: 'inset -4px -4px 12px rgba(255,255,255,0.9), inset 4px 4px 12px rgba(0,0,0,0.06)',
  SHADOW_CLAY: '8px 8px 20px rgba(0,0,0,0.12), -8px -8px 20px rgba(255,255,255,0.9)',
  SHADOW_CLAY_DEEP: '12px 12px 30px rgba(0,0,0,0.18), -6px -6px 18px rgba(255,255,255,0.95)',
  SHADOW_CLAY_PINK: '8px 8px 20px rgba(233,30,140,0.25), -4px -4px 12px rgba(255,255,255,0.8)',
  SHADOW_CLAY_GREEN: '8px 8px 20px rgba(46,204,113,0.25), -4px -4px 12px rgba(255,255,255,0.8)',
  SHADOW_CLAY_LARGE: '20px 20px 60px rgba(0,0,0,0.15), -10px -10px 30px rgba(255,255,255,0.8)',

  // Fonts
  FONTS: {
    heading: "'Nunito', sans-serif",
    body: "'DM Sans', sans-serif",
    display: "'Fredoka', sans-serif",
  },

  // Border radius (claymorphism = very rounded)
  R_CARD: '28px',
  R_BUTTON: '50px',
  R_ELEMENT: '20px',
  R_AVATAR: '50%',
}

export const shops = [
  { name: 'Takealot', flag: '🟠', note: 'R250 · SA delivery', href: 'https://www.takealot.com', color: '#FF6B35' },
  { name: 'Amazon', flag: '🟣', note: 'Print + Kindle', href: 'https://www.amazon.com/dp/1037090926', color: '#FF9900' },
  { name: 'dotdot.direct', flag: '🟢', note: 'SA school-friendly', href: 'https://dotdot.direct', color: '#2ECC71' },
  { name: 'Apple Books', flag: '🔵', note: 'eBook · $7.99', href: 'https://books.apple.com/us/book/id6753307388', color: '#007AFF' },
  { name: 'Kindle', flag: '📱', note: 'eBook', href: 'https://www.amazon.com/Maphiris-Marvellous-Money-Moves-ebook', color: '#FF9900' },
]

export const chapters = [
  { n: 1, title: 'Meet Maphiri Monama', desc: 'We meet our fierce, ambitious 12-year-old protagonist navigating Grade 7 at Crowland Prep.', emoji: '👧🏾' },
  { n: 2, title: 'Market Day Dreams', desc: 'The annual September Market Day sets Maphiri and her bestie Thembi on an entrepreneurial adventure.', emoji: '🏪' },
  { n: 3, title: 'The Valentine Venture', desc: "Maphiri launches her first real business — selling roses and chocolates on Valentine's Day.", emoji: '💝' },
  { n: 4, title: 'Resilience in Action', desc: "Things don't go to plan. Maphiri learns what real entrepreneurship costs — and what it gives back.", emoji: '💪🏾' },
]

export const reviews = [
  { t: "Maphiri's Marvellous Money Moves is a pleasant read that will delight the young and old.", s: 'Amazon Reader' },
  { t: 'A delightful story that teaches financial literacy without being preachy. Kids will love Maphiri!', s: 'Educator Review' },
  { t: "Finally, a South African children's book that talks about entrepreneurship the right way.", s: 'Parent Review' },
]

export const avatarMessages = [
  "Hello! I'm Maphiri! 👋 Welcome to my book shop!",
  "I wrote this book to help kids like you learn about money and business!",
  "Did you know? Market Day at school taught me my first big business lesson!",
  "My friend Thembi helped me turn R50 into R200 at the school market!",
  "Every big business starts with a small idea. What's yours?",
  "You can buy my book at Takealot, Amazon, or dotdot.direct! 📚",
]
