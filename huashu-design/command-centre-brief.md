# Command Centre Design Brief
> Extracted from `huashu-design/SKILL.md` for Bloomberg/NASA style command centre work

---

## 1. Key Design Principles (Bloomberg/NASA Command Centre)

**A. System-first, not filler — density is the product**
Command centre UIs are data products. Every element earns its place. Blank space is a layout decision, not an omission. Especially avoid:
- "Data slop" — fake stats, decorative numbers, meaningless icon clusters
- "Iconography slop" — every label paired with a generic icon
- "Gradient slop" — dark background ≠ dramatic; one deliberate accent is better than gradient wash

**B. Honest placeholders > sloppy real attempts**
No real product data? Write `<!-- [placeholder: real data TBC] -->` rather than faking numbers that look authoritative. A credible gap is better than a broken illusion.

**C. Variations, not "the final answer"**
Show 3+ variants across visual/colour/layout dimensions before converging. Command centre UIs have many valid data-density tradeoffs.

**D. Junior Designer mode: show assumptions early**
Write assumptions + reasoning as HTML comments at the top. Show greybox layout before full implementation. Direction error costs 100× more late.

---

## 2. CSS & Layout Rules

### Fonts
```css
/* AVOID */
font-family: Inter, Roboto, Arial, system-ui;  /* too generic */

/* USE — distinctive pairings */
font-family: 'Newsreader', Georgia, serif;       /* display / headers */
font-family: 'Source Serif 4', 'EB Garamond', serif; /* body accent */
font-family: -apple-system, BlinkMacSystemFont, sans-serif; /* body fallback only */
```
- `text-wrap: pretty` for refined text layout
- Never use system fonts as the primary display face

### Color Palette
```css
/* AVOID */
background: linear-gradient(135deg, #7c3aed, #db2777);  /* AI purple-pink slop */
background: #0D1117;  /* GitHub-dark lazy shorthand — uniform dark + neon glow */

/* COMMAND CENTRE APPROACH */
--bg-primary: oklch(15% 0.02 260);       /* deep navy, defined, not #0D1117 magic number */
--accent: oklch(72% 0.18 155);           /* one deliberate accent (teal/amber/red) */
--text-primary: oklch(92% 0.01 240);
--text-muted: oklch(60% 0.02 240);
--status-green: oklch(70% 0.18 145);
--status-red: oklch(65% 0.22 25);
```
- Use `oklch()` for perceptually uniform colour scales
- Define a brand palette; never invent colours ad hoc
- One accent colour, used sparingly — the data is the colour

### Layout
```css
/* Grid-first, not card-stack */
display: grid;
grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
gap: 0;  /* command centres often use 0-gap panels */

/* Borders over box-shadows and coloured left-accent cards */
border: 1px solid var(--border);
border-left: 4px solid var(--accent);  /* ONLY if brand spec allows */

/* Avoid: rounded(8px) + left-accent card combo — 2020-2024 Material/Tailwind cliché */
```

---

## 3. Demo Files in `/workspace/huashu-design/demos/`

| File | Description |
|------|-------------|
| `c1-ios-prototype.html` | iOS App high-fidelity interactive prototype (multi-screen, tappable) |
| `c2-slides-pptx.html` | HTML slide deck — multi-page presentation with keyboard navigation |
| `c3-motion-design.html` | Motion/animation showcase — timeline-driven animation demo |
| `c4-tweaks.html` | Live parameter tweak system — sliders that adjust design in real time |
| `c5-infographic.html` | Data infographic — precise typographic layout with real data structure |
| `c6-expert-review.html` | 5-dimension expert design review — scoring rubric and critique guide |
| `hero-animation-v10-en.html` | Hero animation showcase — full-screen motion with orchestrated easing |
| `md-html-narration/` | Voiceover narration pipeline — audio-sync animation with subtitles |
| `voiceover-demo/` | Voiceover demo — TTS-driven timed narrative segments |
| `w1-brand-protocol.html` | Brand asset protocol — logo/product/UI extraction workflow |
| `w2-junior-designer.html` | Junior Designer workflow — assumption comments + early greybox reveal |
| `w3-fallback-advisor.html` | Design Direction Advisor — 3-variant fallback when no style context given |

---

## 4. Anti-AI-Slop Rules (Non-Negotiable)

> Slop = AI training data's visual greatest common divisor. Using it dilutes brand identity to "another AI page."

### Elements to AVOID

| Element | Why It's Slop | Legitimate Exception |
|---------|--------------|---------------------|
| Aggressive purple/pink gradient | AI's "tech = purple gradient" formula — every AI/SaaS/web3 page | Brand spec explicitly uses it |
| Emoji as icons | "Not professional enough = add emoji" default | Brand spec uses emoji (Notion-style) |
| Rounded card + left colored border | 2020–2024 Material/Tailwind cliché | Brand spec retains the pattern |
| SVG-drawn faces/people/objects | AI SVG always has broken anatomy | Almost never — use real photos |
| CSS silhouette as product image | Generates "generic tech product" — zero brand identity | Almost never — use real product photos |
| Inter/Roboto/Arial as display font | Unrecognizable as "designed" vs "demo page" | Brand spec explicitly uses them |
| `#0D1117` + neon cyan/purple glow | One specific SaaS cliché copy — not all dark UIs | Developer-tool products following this direction |

### Positive Rules (Do These Instead)

- ✅ `text-wrap: pretty` + CSS Grid — AI can't fake these; they signal real craft
- ✅ `oklch()` or brand-spec colours — never invent new hues ad hoc
- ✅ Real imagery over SVG — Wikimedia/Unsplash/AI-generated > hand-drawn SVG
- ✅ 「」 Chinese quotation marks — signals "reviewed by a human"
- ✅ One detail at 120%, others at 80% — uneven craft reads as taste
- ✅ Film-grade dark: warm amber/teal戏剧光影, not cold neon — strong authorial intent

> **Legal override**: "Brand spec explicitly uses X" is the only legitimate slop-bypass. If the brand says purple gradient, it's a signature, not slop.

---

*Source: `/workspace/huashu-design/SKILL.md` — 花叔Design (Huashu-Design) skill*
