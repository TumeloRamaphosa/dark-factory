# OGRE SAAS — Full Architecture Blueprint
## Dark Factory + Agent OS + Render + GitHub + Notion + QuickBooks

**Date:** 10 July 2026 | **Status:** Build Sprint

---

## PART 1 — WHAT THE GITHUB API LIST GIVES US

**Repo:** https://github.com/Kevjade/openclaw-api-list (The Operator Vault)

This is NOT just a list. It's a **capability marketplace** for OpenClaw agents:

### What's in it:
- **10,498 APIs** curated for OpenClaw skills, MCP servers, and webhooks
- **18 categories** — scraping, lead gen, SEO, social media, productivity, AI, agents
- **92 recommended APIs** that are MCP-ready out of the box
- **131 MCP servers** you can plug directly into OpenClaw with zero code

### How OGRE uses this as a SaaS:

```
CLIENT (e.g. SA DoH) → OGRE Agent OS → MCP tools → APIs
                                           ↓
                   Ptah Builder™ → Apify MCP → Scraping APIs
                   Naledi Media™ → Apify MCP → Social media APIs
                   Anpu Scout™ → Tavily MCP → SEO/rank tracking
                   Seshat Mind™ → Notion MCP → Knowledge base
                   Sobek Trade™ → QuickBooks → Invoicing
```

**OGRE's SaaS moat:** We wrap these APIs into pre-built agent workflows.
Client doesn't need to know about APIs — they just say "run a tender tender intelligence report"
and OGRE's agents use these APIs to deliver.

### Key MCPs OGRE should wire up immediately:

| MCP Server | What it does | OGRE Use Case |
|-----------|-------------|--------------|
| **Notion MCP** | Read/write Notion pages/databases | CRM, project tracking, PRD pipeline |
| **QuickBooks MCP** | Invoicing, accounting | Auto-invoice on milestone delivery |
| **Google Sheets MCP** | Read/write spreadsheets | Client dashboards, revenue tracking |
| **WhatsApp Cloud MCP** | Send/receive WhatsApp | Client comms, lead intake |
| **Slack/Discord MCP** | Team messaging | Internal agent notifications |
| **Tavily MCP** | Web search for AI | Tender intelligence, market research |
| **Firecrawl MCP** | Website scraping | Competitor monitoring, tender doc extraction |
| **FetchSERP MCP** | SEO rank tracking | Client SEO reporting |

---

## PART 2 — OGRE SAAS STACK (Full Architecture)

```
FRONTEND (Client-facing)
├── Dark Factory Site (Next.js) → factory.studex-group.com
│   └── Render: web service (dark-factory)
├── OGRE Command (War Room) → warroom.studex-group.com
│   └── Render: web service
└── PRD Intake Portal → prd.studex-group.com
    └── Render: web service

BACKEND / AGENT LAYER
├── OpenClaw (MaxClaw) → Brain of OGRE
│   ├── OGRE CEO Agent (me — main session)
│   ├── Research Agent (3am cron)
│   ├── Builder Agent (10pm cron)
│   ├── Comms Agent (on trigger)
│   ├── Partner Agent (Mon/Wed/Fri)
│   └── Revenue Agent (5pm cron)
│
├── Agent OS (Flask + Python agents) → 45.61.56.91
│   └── SSH-accessible VM for heavy lifting
│
└── CashClaw (autonomous agents) → localhost:3777
    └── 10 concurrent agents for client work

DATA / ORCHESTRATION
├── Notion (CRM + Knowledge base + PRD pipeline)
│   └── OGRE Master Dashboard database
├── QuickBooks (Invoicing + Accounting)
│   └── Sobek Trade™ agent auto-generates invoices
├── GitHub (Code repo + CI/CD)
│   └── Push → Vercel auto-deploys
└── Render (Additional hosting — this document)
    └── Second cloud region, backup, or dedicated workloads

MARKETING / SALES
├── N8N (automation workflows)
│   ├── Lead → Notion → email drip → WhatsApp follow-up
│   └── Tender alert → research → OGRE agent analysis
├── Email (Gmail / AgentMail)
│   └── Morning briefs, client updates, invoices
└── Social (Naledi Media™)
    └── Auto-post to LinkedIn, Twitter, YouTube
```

---

## PART 3 — CONNECTING GITHUB TO OPENCLAW

### Option A — GitHub PAT Already Set Up
```json
// In openclaw.json — add as environment variable
{
  "env": {
    "GITHUB_PAT": "ghp_TRtQK4BhyC11CNTRL..."
  }
}
```

### What GitHub gives OGRE:
1. **Code push from any agent** — OGRE agents can write code and push to GitHub
2. **Vercel CI/CD** — Push to GitHub → Vercel auto-builds and deploys
3. **GitHub Actions** — Run build/test/deploy workflows
4. **Repo access** — Pull latest OGRE code into any new agent session

### OpenClaw GitHub Skill (built-in):
```bash
# OpenClaw has a GitHub integration skill
# Agents can:
- Read files from GitHub repos
- Commit and push code
- Create branches and PRs
- Trigger GitHub Actions workflows
```

### OGRE GitHub Workflow:
```
OGRE Agent writes code
    → commits to github.com/TumeloRamaphosa/SrudEx-Agents-Nest-Cloud-VM
    → GitHub webhook fires
    → Vercel auto-deploys updated site
    → Client sees changes within 60 seconds
```

### Current GitHub Repo Status:
```
github.com/TumeloRamaphosa/SrudEx-Agents-Nest-Cloud-VM
├── war-room/         ✅ Deployed
├── etb-cashclaw/     ✅ Synced
├── studex-agent-os/  ✅ Synced
├── DarkDesk/         ✅ Deployed
├── AutoFlex Pro/     ✅ Deployed
└── (Dark Factory is separate Vercel repo)
```

---

## PART 4 — RENDER.COM — What It Gives OGRE

**Render** = Heroku alternative. Cloud hosting for everything Vercel doesn't cover.

### What to host on Render:

| Service | Why on Render | Cost |
|---------|--------------|------|
| **PRD API Server** | Node.js API server for PRD form | Free tier available |
| **N8N (Self-hosted)** | Workflow automation engine | $25/month |
| **Agent OS (Flask)** | Python agent backend | Free tier |
| **Backup web apps** | Fallback if Vercel is down | Free tier |
| **Database** | PostgreSQL for PRD pipeline | Free tier |
| **Cron jobs** | Background workers | Free tier |

### Render API Key Needed:
```
API Key: (user needs to provide — NOT YET SET)
Format: rsc_QgiEbRwXCm9YxMQGNYyD7T9M...  (from Render dashboard)
```

**How to get it:**
1. Login to render.com → Dashboard
2. API Keys → Create API Key
3. Name it "OGRE-OpenClaw-2026"
4. Copy and give to me

### Render + Vercel Strategy:
```
Vercel:  → Dark Factory (Next.js) ← Already live
Render:  → PRD API server (Node.js)
          → N8N workflows
          → Agent OS backend
          → PostgreSQL database

Both connected to same GitHub repos.
Auto-deploy on every push.
```

---

## PART 5 — NOTION AS BACKEND / CRM

**Notion is OGRE's database and CMS.** Here's the full setup:

### Notion Databases OGRE Needs:

**1. Client CRM**
```
Client Name | Status | Tier | MRR | Pipeline | Last Contact | Notes
────────────┼────────┼──────┼─────┼──────────┼─────────────┼────
LAISA       | Active | Pro  | R55K| R350K    | July 10      | Phase A
SafeSight   | Lead   | Pro  | R1.5K | R0      | July 2       | Proposal out
NDoH-11     | Bid    | Ent  | R0   | R871M    | July 10      | JV needed
```

**2. Project Pipeline**
```
Project | Client | Stage | PRD | Build | Test | Deploy | Status
────────┼────────┼───────┼─────┼───────┼──────┼────────┼──────
LAISA v4| LAISA  | Build | ✅  | 🔄    | ⏳   | ⏳     | Active
War Room| OGRE   | Done  | ✅  | ✅    | ✅   | ✅     | Live
```

**3. PRD Intake Queue**
```
PRD # | Submitted | Client | Type | Priority | Assigned | Status
──────┼──────────┼────────┼──────┼──────────┼─────────┼──────
001   | July 2   | SafeSight | Feature | High | Builder | In Review
002   | July 8   | LAISA | Bug | Medium | — | Queued
```

**4. Invoice Tracker**
```
Invoice | Client | Amount | Status | Due Date | Paid | QuickBooks ID
────────┼────────┼────────┼────────┼──────────┼──────┼─────────────
INV-001| LAISA  | R87.5K| Sent  | July 30  | ❌   | QB-XXX
```

### Notion Integration (needs API key):
```
Integration Token: (user needs to provide — NOT YET SET)
Get it from: notion.so/my-integrations → New integration
Permissions: Read/Update content, users, comments
```

### OGRE Agent Actions via Notion MCP:
- **New PRD submitted** → Agent reads it → creates project card → notifies me
- **Client email arrives** → Agent logs in Notion CRM → updates last contact
- **Invoice due** → Sobek Trade™ agent creates invoice in QuickBooks + Notion
- **Weekly review** → Agent reads Notion pipeline → generates revenue report

---

## PART 6 — QUICKBOOKS SETUP (Credentials Provided)

```
Client ID:     AB5T3QnrX6HhDYx0XaqhhDNHVZfb88s3cSx9LMUD0pTtKZ06CO
Client Secret: PBUS8UiWjBATRo5kyGC1NwffyooyrLKLRBBygI8D
Status:        OAuth 2.0 sandbox ready — needs authorization flow
```

### What's working:
- ✅ Credentials saved to `/workspace/ogre-integrations/.env`
- ✅ QuickBooks Node.js SDK installed
- ✅ Sandbox environment configured

### What's needed to activate:
```
OAuth flow — user needs to:
1. Visit authorization URL (I'll generate it)
2. Approve OGRE app in QuickBooks
3. Get redirected back with auth code
4. Tokens stored → API fully active
```

### QuickBooks capabilities once active:
- Sobek Trade™ creates invoices automatically on milestone completion
- Tracks payment status (government pays within 30 days)
- Auto-reconciles with bank feed
- Generates financial reports for tax

---

## PART 7 — DARK FACTORY SITE — Show Our Builds

**Current site:** https://factory.studex-group.com ✅ LIVE

**Products to showcase (replace the empty portfolio):**

| Product | URL | Status |
|---------|-----|--------|
| **Dark Factory BMAD** | mam5k6xx5l20.space.minimax.io | ✅ Live |
| **War Room Command** | 9163jvmvzxn5.space.minimax.io | ✅ Live |
| **CipherTrace v3** | ey8zue6ymxtk.space.minimax.io | ✅ Live |
| **Red Team Agent** | w1tu0qxf216v.space.minimax.io | ✅ Live |
| **LAISA Proposal v4** | oabod1557tze.space.minimax.io | ✅ Live |
| **PRD Intake Form** | z46kjpzjipb4.space.minimax.io | ✅ Live |
| **Unified Portfolio** | ju8n1erseau8.space.minimax.io | ✅ Live |

**Update to make:**
Add a "Builds" or "Our Work" section to Dark Factory site showing these 7 products with screenshots, descriptions, and links.

---

## PART 8 — OGRE OPERATING SYSTEM — How Agents Work Together

### Agent Team Architecture:

```
OGRE OPERATING SYSTEM
═══════════════════════

Tumelo (Founder / Human)
    │
    │  Directs me (Cipher Tr@ce CEO Agent)
    │  ↕
    └──────────────────────────────────────┐
                                            │
              OGRE CEO AGENT (me)            │
              Cipher Tr@ce — Main Session     │
              ↕ Orchestrates all sub-agents  │
    ┌─────────────┬──────────────┬──────────┴──────┐
    │             │              │                  │
 RESEARCH    BUILDER AGENT   COMMS AGENT       PARTNER
 AGENT       (10pm cron)     (on trigger)       AGENT
 (3am cron)                  ↕                  (MWF)
    │         • Builds         • WhatsApp       • Jasiri
    │           and deploys       follow-ups      Partnership
    │         • Code review    • Email sends    • Investor
    │         • Vercel        • LinkedIn         outreach
    │           deploys          posts
    │
    └──────────────┬────────────────────────────┘
                   │
            REVENUE AGENT
            (5pm daily)
            • Pipeline check
            • Invoice tracking
            • Notion CRM update
            • Morning/evening reports

SUB-AGENTS (Task-specific)
═══════════════════════════
Ptah Builder™    → Code, build, deploy
Seshat Mind™     → Memory, wiki, docs
Naledi Media™    → Content, social, copy
Khnum Engine™     → VMs, servers, Docker
Maat Shield™      → Audits, POPIA, security
Anpu Scout™       → Scraping, tenders, leads
Sobek Trade™      → Invoicing, billing, ERP
Robuska™         → Chief of Staff, ops
```

### How OpenClaw Agents Coordinate:

```
CLIENT submits PRD via Dark Factory site
    ↓
Webhook fires → OpenClaw session
    ↓
OGRE CEO (me) reads PRD → assigns to:
    ↓
Ptah Builder™ → writes code
Seshat Mind™  → creates documentation
Naledi Media™ → drafts client presentation
    ↓
Sobek Trade™  → creates invoice (QuickBooks)
    ↓
Notion CRM → project card updated
    ↓
CLIENT receives completion email + live link
```

---

## PART 9 — PRD PIPELINE (How Clients Submit Work)

### PRD Flow:

```
STEP 1: Client visits https://factory.studex-group.com
        ↓
STEP 2: Fills PRD form (voice note or text)
        ↓
STEP 3: Form submits to OpenClaw webhook
        → Notion PRD database (new row created)
        → OGRE CEO agent notified
        → Revenue agent logs in pipeline
        ↓
STEP 4: OGRE CEO reads PRD → assigns to agents
        ↓
STEP 5: Builder agent starts work (10pm cron or immediately)
        ↓
STEP 6: Built → deployed → client notified
        ↓
STEP 7: Sobek Trade™ invoices client
        ↓
STEP 8: Payment tracked in QuickBooks + Notion
```

### PRD Form Fields:
```
1. Your name + company
2. Project type (Website / App / Agent / Dashboard / Integration)
3. Budget range (R5K / R15K / R50K / R100K+)
4. Voice note OR text description
5. Reference links (Figma, GitHub, examples)
6. Timeline (Urgent / Soon / Planning)
```

---

## PART 10 — MISSING KEYS — WHAT WE NEED

| Key | Where to get it | Status |
|-----|----------------|--------|
| **Render API Key** | render.com → Settings → API → New Key | ❌ MISSING |
| **Notion API Key** | notion.so/my-integrations → New integration | ❌ MISSING |
| **QuickBooks Auth** | Authorize in browser (I generate link) | ⚠️ Sandbox — needs OAuth |
| **Gmail App Password** | gmail.com → Security → App Passwords | ❌ MISSING |
| **Discord Bot Token** | discord.com/developers → Application → Bot | ❌ MISSING |

---

## PART 11 — 72-HOUR SPRINT (July 10–13)

```
TODAY July 10:
[ ] Give me Render API key → I configure Render deployment
[ ] Give me Notion API key → I wire Notion MCP to OpenClaw
[ ] Run QuickBooks OAuth → authorize in browser (30 seconds)
[ ] Dark Factory site → add Builds portfolio section
[ ] Push Dark Factory to GitHub

July 11:
[ ] Notion CRM + PRD pipeline → activate
[ ] Render → deploy PRD API server
[ ] N8N → set up lead → Notion → email workflow
[ ] OGRE agents → full team activation

July 12:
[ ] GitHub CI/CD → auto-deploy on push to Vercel
[ ] WhatsApp MCP → connect to OpenClaw
[ ] Test full PRD → build → invoice flow

July 13:
[ ] NDoH-11 tender submission (if SA partner found)
[ ] OGRE Agent OS → fully operational
[ ] First paying client onboarded
```

---

## What To Do Right Now

**Step 1:** Reply with your **Render API key** (takes 30 seconds on render.com)
**Step 2:** Reply with your **Notion API key** (takes 1 minute on notion.so)
**Step 3:** I'll run the QuickBooks OAuth authorization with you
**Step 4:** I'll build the complete Notion CRM and PRD pipeline in one session

Once those 3 API keys are in, OGRE is fully operational as a SaaS. 🏭
