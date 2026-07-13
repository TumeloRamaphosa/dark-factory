---
title: "Maphiri Books — Business & Project Hub"
status: active
created: 2026-06-28
tags: [project, maphiri-books, children-literature, south-africa, financial-literacy, voicebox]
type: project
aliases: ["Maphiri Books", "Maphiri's Marvellous Money Moves", "Keamogetswe Matsho"]
---

## For Future Claude

You are the keeper of the Maphiri Books second brain. This note is the single source of truth for everything related to the book business. Update it after every session. Always check this before touching anything related to the book, website, or distribution.

---

## THE BOOK

**Title:** Maphiri's Marvellous Money Moves  
**Subtitle:** The Entrepreneurial Adventures of an Ambitious 12-Year-Old Girl  
**Author:** Keamogetswe Matsho  
**ISBN:** 978-1-77636-874-7  
**Price:** R250.00 (South Africa)  
**Format:** Print + eBook  
**Stock:** Available on Takealot, Amazon, dotdot.direct  
**Genre:** Middle-grade fiction, financial literacy, entrepreneurship  
**Target Audience:** Kids aged 10–14, parents, educators, SA school market  

**Blurb:**
> "Maphiri's Marvellous Money Moves is a pleasant read that will delight the young and old as many will relate and identify with Maphiri's resilience..."

**Logline:**
12-year-old Maphiri Monama navigates friendships, family, and her first crush while launching entrepreneurial ventures to win the Grade 7 Market Day at Crowland Prep in Johannesburg.

---

## PROTAGONIST — MAPHIRI MONAMA

- **Age:** 12, Grade 7
- **School:** Crowland Prep, Johannesburg
- **Personality:** Fierce, ambitious, driven, resilient, courageous, innocent
- **Aspiration:** Successful businesswoman (like her mother)
- **Best Friend:** Thembi
- **Crush:** John
- **Nicknames:** Maphi
- **Key Story Arcs:** Market Day pizza venture, Valentine's Day roses/chocolates, entrepreneurial resilience

---

## BRAND IDENTITY

### Colors (Confirmed from website analysis)
| Color | Role | Notes |
|-------|------|-------|
| `#E91E8C` (Hot Pink) | Primary | CTAs, headings, Mapiri accent |
| `#2ECC71` (Emerald Green) | Secondary | Growth, money, prosperity |
| `#FFFFFF` (White) | Background/Neutral | Clean, fresh, accessible |
| `#1A1A2E` (Deep Navy) | Text | High-contrast readable text |

*(Colors extracted from website visual analysis — confirm hex codes with Keamogetswe directly)*

### Typography
- **Headings:** Playful but legible — something like Nunito or Quicksand
- **Body:** Clean sans-serif for readability
- **Accent:** Slightly handwritten feel for the "Mapiri" brand voice

### Character Visuals
- Mapiri character illustrations needed (cartoon style, fun, diverse SA representation)
- Green + pink brand palette for all character artwork
- Age-appropriate, energetic, aspirational

### Tone of Voice
- Fun, friendly, empowering
- Money-positive — never shame-based
- Rooted in SA context (Johannesburg, Grade 7, local culture)
- Aspirational for kids, nostalgic for adults

---

## DISTRIBUTION CHANNELS (Active — June 2026)

| Channel | URL | Status | Notes |
|---------|-----|--------|-------|
| Takealot | takealot.com | ✅ LIVE | Primary SA online retailer |
| Amazon | amazon.com | ✅ LIVE | Print + eBook available |
| dotdot.direct | dotdot.direct | ✅ LIVE | SA book platform, actively promoting |
| Apple Books | books.apple.com | ✅ LIVE | eBook, $7.99 |
| Amazon Kindle | amazon.com/kindle | ✅ LIVE | eBook available |
| Maru Maphiri Group | facebook.com/WoolworthsSA | ✅ NEWS | Woolworths SA post June 2026, Maru Maphiri Group partnership |
| School Book Fairs | In-person | ✅ ACTIVE | Kingsmead College, Dainfern College, Dotdot.direct school fairs |
| Direct (Website) | maphirisbooks.co.za | ✅ LIVE | R250, sold out / pre-order |

### To Add to Website
All of the above should be linked prominently on the website with "Buy the Book" as the only CTA.

---

## WEBSITE — MAPHIRISBOOKS.CO.ZA

**Current Status:** Live at https://www.maphirisbooks.co.za  
**Current Issues:**
- Multiple competing CTAs ("Donate Today", "Order Book", "Pre-order", "Buy a Book", "Donate a Book")
- Landing page does not directly sell
- Product portfolio may be outdated
- About Author page needs expansion
- Foundation page has unwanted "Donate Today" CTA

### Website Rebuild Brief (Priority Order)

#### 1. Landing Page — Sell First
- Hero: Mapiri character graphic + "Buy the Book" CTA (ONLY CTA)
- Product card: Book cover, R250, "Buy Now" button
- Social proof: Reviews, news coverage, book fair appearances
- Distribution links: Takealot, Amazon, dotdot.direct (all "Buy" links)
- Author intro: 1-sentence hook + link to About Author

#### 2. Navigation — Simplify
- Home | About the Book | About the Author | Buy the Book | Resources | Contact
- REMOVE: "Donate a Book", "Partnerships" (move to footer)
- RENAME: "Maphiri Foundation" → keep, but remove "Donate Today" CTA

#### 3. About the Author Page
- Name: Keamogetswe Matsho
- Role: Author, blogger, businesswoman, Founder of Maphiri Foundation
- Bio: SA journalist/author context
- Photo: Author photo
- Links: Social media, blog, other publications
- Updates needed: Full biography, recent achievements (Woolworths SA Youth Makers 2026)

#### 4. Buy the Book Page (PRIMARY CTA PAGE)
- Book cover image
- Price: R250.00
- ISBN: 978-1-77636-874-7
- BUY BUTTONS (all distribution channels):
  - [Buy on Takealot]
  - [Buy on Amazon]
  - [Buy on dotdot.direct]
  - [Buy on Apple Books]
  - [Buy on Kindle]
- Synopsis / chapter overview
- Reviews and endorsements
- For Parents/Educators section
- For School Book Fairs section

#### 5. About the Book / Resources Page
- Full synopsis
- Chapter extracts
- Discussion guide for classrooms
- Financial literacy themes
- SA school market fit (Grade 4–8 Life Skills curriculum)

#### 6. Maphiri Foundation Page
- REMOVE "Donate Today" CTA — NO DONATE CTA anywhere on site
- Keep: Foundation mission, what it does, impact stories
- Add: "Support via purchasing a book" link

#### 7. Contact Page
- Simple contact form
- School/enrollment enquiries
- Distribution/partnership enquiries

---

## VOICE AGENT — MAPIRI VOICEBOX

### Project
Clone Keamogetswe's voice via Voicebox for:
- Read-aloud audio for the book chapters (YouTube content)
- WhatsApp voice bot for book promotions
- Audiobook preview clips
- School virtual visits (pre-recorded Q&A with Mapiri "voice")

### Voicebox Setup
- Repo: https://github.com/jamiepine/voicebox
- Local install on machine with decent GPU (or ORGO VM)
- Clone voice from ~30 seconds of Keamogetswe speaking
- Generate TTS in English + eventually Sesotho, Zulu, Afrikaans
- 7 TTS engines: Qwen3-TTS, LuxTTS, Chatterbox, Kokoro, etc.

### Voice Agent Pipeline
1. Script written for chapter read-aloud (by Cipher Tr@ce agent)
2. Voicebox generates MP3 in Keamogetswe's cloned voice
3. Audio posted to YouTube with Mapiri visual
4. WhatsApp bot sends audio clip to opted-in parents

---

## CONTENT PIPELINE (YouTube + Social)

### YouTube Channel
- Channel: Mapiri's Marvellous Money Moves
- Content: Chapter read-alouds, author interviews, financial literacy tips for kids
- Posting: 1x/week minimum

### Platform Distribution
| Platform | Account | Content |
|----------|---------|---------|
| Instagram | @maphiris_books | Visual quotes, character art, behind-the-scenes |
| TikTok | @maphirisbooks | Short chapter clips, "Mapiri's money tip of the day" |
| LinkedIn | Keamogetswe Matsho | Professional, press, partnerships |
| Facebook | Maphiri's Marvellous Money Moves | Community, events, reviews |

---

## REMOTION SPHERE ANIMATION

**Purpose:** Create a 5-second branded sphere animation for YouTube intros, website hero, and social clips.

**What it shows:**
- A floating sphere/ball in brand pink (#E91E8C) and green (#2ECC71)
- Mapiri character silhouette inside or floating beside the sphere
- Title text: "Maphiri's Marvellous Money Moves"
- Subtitle: "Financial Literacy for Kids"
- Smooth, playful motion — appropriate for kids but polished for adults
- Duration: 5 seconds
- Output: MP4 (YouTube), WebM (web), GIF (social)

**Stack:** Remotion + @remotion/three + Three.js  
**Repo:** /workspace/remotion-sphere/  
**Live preview:** https://0qpysknffovx.space.minimax.io (sphere section)

---

## OBSIDIAN SECOND BRAIN

**GitHub:** https://github.com/eugeniughelbur/obsidian-second-brain  
**Local Clone:** /workspace/maphiri-obsidian/  
**Purpose:** Run the Maphiri Books business as a second brain using Obsidian + AI agents

### Structure to Add

```
wiki/
  projects/
    maphiri-books/
      MAPIRI-BOOKS-BUSINESS.md    ← this file
      WEBSITE-BUILD.md             ← website rebuild task list
      DISTRIBUTION-CHANNELS.md     ← retailer management
      CONTENT-CALENDAR.md          ← YouTube + social schedule
      VOICE-AGENT.md               ← Voicebox setup + pipeline
  entities/
    keamogetswe-matsho.md         ← author profile
    maphiri-monama.md             ← character profile
    takealot.md                   ← retailer entity
    amazon.md                     ← retailer entity
    dotdot-direct.md              ← retailer entity
    maru-maphiri-group.md         ← partner entity
  concepts/
    financial-literacy-sa.md      ← market research
    childrens-book-market-sa.md   ← distribution research
    brand-identity-maphiri.md     ← color, tone, voice
  daily/
    2026-06-28.md                ← session log
```

### AI-First Vault Rules
- Every note starts with: `## For future Claude`
- Every note has frontmatter with `tags`, `created`, `status`
- All claims have `(as of YYYY-MM, source)` citations
- Use `[[wikilinks]]` to connect notes
- Generated content in `<!-- @generated -->` blocks

---

## COMPETITORS & MARKET CONTEXT

| Competitor | What They Do | Maphiri's Edge |
|-----------|-------------|----------------|
| Shark Tanks in SA books | Complex financial concepts | Mapiri makes it fun + local |
| US financial kids books | US-centric | SA context, Johannesburg, relatable |
| SA school reading schemes | Boring/formulaic | Engaging story + entrepreneurial theme |

**Market Insight:** Children's Book Market growing 6.8% CAGR globally. Online retail fastest growing channel. SA market underserved for fun, local financial literacy content.

---

## ACTION LOG

- [x] 2026-06-28: Business plan created, distribution channels identified, Voicebox repo analyzed, Obsidian vault cloned
- [ ] Confirm brand hex colors with Keamogetswe (#E91E8C and #2ECC71 estimated from web analysis)
- [ ] Get full author bio + photo for About Author page
- [ ] Set up Voicebox and clone Keamogetswe's voice
- [ ] Build new website (Remotion hero + full rebuild)
- [ ] Add all distribution links to Buy the Book page
- [ ] Remove all "Donate Today" CTAs from site
- [ ] Create Remotion sphere animation
- [ ] Populate Obsidian vault with all notes above

---

*Last updated: 2026-06-28 by Cipher Tr@ce, CEO — Dark Factory 🏭*
*For: Keamogetswe Matsho, Author — Maphiri's Marvellous Money Moves*