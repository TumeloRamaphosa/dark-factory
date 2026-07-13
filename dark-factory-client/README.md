# ⚡ DARKFACTORY — Build Me A Dashboard

> Describe your product in a voice note. Drop a Figma link. Type it out. The Dark Factory builds it. CodeRabbit reviews every line. Deployed and live before tomorrow morning.

**[Live Website →](https://mam5k6xx5l20.space.minimax.io)**

---

## What is Dark Factory?

Dark Factory is a **BMAD** (Build Me A Dashboard) product factory for South African aesthetic clinics and healthcare businesses. Clients submit product ideas through our web portal — voice note, Figma link, or typed description — and the Dark Factory delivers a production-ready digital product.

**Stack:** React + Vite + TypeScript + Tailwind CSS | Next.js 16 + Prisma (build system) | Godot MCP (game engine for open-world visualization)

---

## The 4-Step Flow

```
1. SUBMIT  →  Voice note · Figma link · Typed description
2. ANALYSE →  AI reads, understands, writes PRD
3. BUILD   →  Agents write code · CodeRabbit reviews every PR
4. SHIP    →  Deployed to Vercel · Live tonight
```

---

## For Clients

**R29 per product.** No subscription. No monthly fees.

- Voice note submission (MiniMax TTS)
- Figma / Notion / Loom / GitHub links
- Typed description
- PRD document included
- CodeRabbit AI review included
- Production deployment included
- Unlimited revisions
- 24h post-delivery support

**[Start a build →](https://mam5k6xx5l20.space.minimax.io)**

---

## For Developers

```bash
# Clone the repo
git clone https://github.com/TumeloRamaphosa/dark-factory.git
cd dark-factory

# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

---

## Architecture

```
dark-factory/
├── src/                    # React + Vite frontend
│   ├── App.tsx             # Main application
│   └── index.css           # Tailwind CSS
├── public/                 # Static assets
├── vercel.json            # Vercel deployment config
├── .github/
│   └── workflows/
│       └── coderabbit.yml  # CodeRabbit AI review on every PR
└── SPEC.md                # Full product specification
```

---

## CodeRabbit Setup

To enable AI code reviews on every PR:

1. Get a CodeRabbit API key at [review.codeterrace.com](https://review.codeterrace.com)
2. Add to GitHub Secrets: `Settings → Secrets → Actions → New secret`
   - Name: `CARETOEKINSIGHTAI_API_KEY`
   - Value: your CodeRabbit API key
3. Install CodeRabbit on your repo: [github.com/marketplace/coderabbitai](https://github.com/marketplace/coderabbitai)

CodeRabbit will automatically review every pull request and post comments directly on the code.

---

## Medical Industry Focus

Dark Factory is purpose-built for South African aesthetic clinics:

- **POPIA compliant** — South African data law built in from day one
- **Patient booking systems** — WhatsApp reminders, reduce no-shows by 40%
- **Clinical dashboards** — Real-time theatre utilisation, patient flow, stock
- **Digital intake forms** — Paperless, digitally signed, instant EMR sync
- **AI medical triage** — Upload a concern photo, AI flags urgency

---

## Built by

**OGRE Computer** — Studex Group AI Infrastructure Division  
`info@studexmeat.com` | [studexmeat.com](https://studexmeat.com)

---

## License

Proprietary — Studex Group (Pty) Ltd. All rights reserved.
