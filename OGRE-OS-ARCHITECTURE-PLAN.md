# OGRE OS — BACKEND UPGRADE PLAN
## Studex Group · Dark Factory · OGRE Computer
## Version 2.0 — July 2026

---

## WHERE WE ARE RIGHT NOW

```
OpenClaw (this platform)
    │
    ├── Cipher Tr@ce (CEO agent — me)
    ├── Research Agent (cron triggered)
    ├── Builder Agent (cron triggered)
    ├── Comms Agent (on trigger)
    └── Partner Agent (Mon/Wed/Fri cron)

Dark Factory BMAD
    └── PRD Intake Form → email to cto@

VM Infrastructure (Orgo)
    └── D@RK F@C#ORY: Ollama, Cursor API, Temporal
```

**What's working:** Agent orchestration, VM infrastructure, deployed sites, product pipeline
**What's missing:** Skills layer, memory, dashboard, team vault, client portal

---

## THE TARGET ARCHITECTURE — 5 LAYERS

Based on: chase.h.ai Agentic OS (7-layer) + VAULT dashboard + Software Factory

```
┌─────────────────────────────────────────────────┐
│  LAYER 5 — /HANDOFF                             │
│  Client portal. Share build specs. Team access.  │
│  No terminal required for clients.                │
├─────────────────────────────────────────────────┤
│  LAYER 4 — /INTERFACE                          │
│  VAULT Dashboard. Live metrics. Action buttons.  │
│  Schedule. Tasks. Revenue. Pipeline.            │
├─────────────────────────────────────────────────┤
│  LAYER 3 — /MEMORY                             │
│  Obsidian vault. llm_wiki. All sessions stored.  │
│  Semantic search. Decisions. Context.             │
├─────────────────────────────────────────────────┤
│  LAYER 2 — /SKILLS                             │
│  Reusable workflow automations. Self-improving.  │
│  Morning brief. Tender watch. Email sequences.    │
├─────────────────────────────────────────────────┤
│  LAYER 1 — /CORE                               │
│  OpenClaw. CashClaw. Temporal. The VM OS.      │
│  Agent-to-agent communication.                  │
└─────────────────────────────────────────────────┘
```

---

## LAYER 1 — /CORE
### What to add

**1.1 CashClaw Integration**
- Install CashClaw on D@RK F@C#ORY VM
- Connect to Blotato API (llama-3.3-70b) for LLM
- Wire Fiverr seller account → CashClaw does the work
- Repository: github.com/moltlaunch/cashclaw

**1.2 Temporal Durable Workflows**
- Namespace: cloud.temporal.io (awaiting namespace name)
- Use for: long-running agent workflows that survive restarts
- Workflows to build:
  - `tender-watcher`: checks etenders.gov.za daily, escalates new tenders
  - `proposal-generator`: takes PRD → generates full proposal doc
  - `client-onboarding`: new client → creates VM + agent + dashboard
  - `morning-brief`: compiles memory + pipeline + weather → generates brief

**1.3 Ollama Local LLM**
- API key: `3a8683d8ab754429a6c27ad8c4ccf6f9.9xk5uQYQd4Jd9WQq3jprtDNu`
- Install on D@RK F@C#ORY: `ollama serve`
- Use for: cheap local inference, CashClaw tasks, document processing
- Model: `llama3.3:70b` or `qwen2.5:72b`

**1.4 Agent Communication Bus**
- Currently: OpenClaw handles this
- Add: Internal webhook system (n8n or custom)
- Every agent can trigger any other agent
- Example: Research Agent finds tender → triggers Comms Agent → sends email

---

## LAYER 2 — /SKILLS
### What to add

**2.1 Morning Brief Skill**
```
Trigger: 06:00 SA every weekday (cron)
Action:
  1. Read MEMORY.md + yesterday's memory file
  2. Check email queue (new emails?)
  3. Check tender portals (new tenders?)
  4. Check pipeline status (any updates?)
  5. Compile → Morning Brief
  6. Save to /workspace/email-queue/morning-brief-YYYY-MM-DD.txt
  7. Save to memory/YYYY-MM-DD.md
```

**2.2 Evening Revenue Meeting Skill**
```
Trigger: 17:00 SA every weekday (cron)
Action:
  1. Read revenue-log.md
  2. Check email queue (what went out today?)
  3. Check pipeline (status updates?)
  4. Compile → Evening Digest
  5. Save to /workspace/email-queue/evening-digest-YYYY-MM-DD.txt
  6. Update MEMORY.md
  7. Update revenue-log.md
```

**2.3 Tender Watcher Skill**
```
Trigger: Every 4 hours (cron)
Action:
  1. Scrape etenders.gov.za (Apify actor)
  2. Filter for: AI, cloud, software, EMR, cybersecurity
  3. If new tender found:
     - Save to tender-pipeline.md
     - Send WhatsApp to Tumelo (if high value)
     - Escalate to Comms Agent
```

**2.4 Proposal Generator Skill**
```
Trigger: New PRD submitted (webhook from PRD form)
Action:
  1. Read PRD (from form or email)
  2. Analyse: client type, budget, timeline, requirements
  3. Generate proposal using Cursor API or local Ollama
  4. Save as /workspace/proposals/YYYY-MM-DD-[client].md
  5. Convert to HTML → deploy to proposal URL
  6. Send email to Tumelo with link
```

**2.5 Social Content Skill**
```
Trigger: Mon/Wed/Fri 08:00 SA (cron)
Action:
  1. Read today's content calendar
  2. Generate LinkedIn post (Ollama or Blotato)
  3. Generate Twitter/X thread
  4. Generate Instagram caption
  5. Save drafts to /workspace/content/queue/
  6. Notify Tumelo via WhatsApp for approval
```

---

## LAYER 3 — /MEMORY
### What to add

**3.1 Obsidian Vault Structure**
```
/workspace/OBSIDIAN-SECOND-BRAIN/
  vault.md                    (index)
  TEMPLATES/
    daily-note.md
    meeting-note.md
    proposal.md
    tender-analysis.md
    client-brief.md
  ENTITIES/
    Tumelo-Ramaphosa.md
    LAISA-Aesthetic-Clinic.md
    Studex-Global-Markets.md
    Pharmasyntez.md
    Ntech-Lab.md
  PROJECTS/
    LAISA-Phase-A.md
    DarkDesk-Product.md
    SA-DoH-EMR-Tender.md
    Global-Markets-Launch.md
  CONCEPTS/
    BMAD-Model.md
    ICVMS-Platform.md
    Keiretsu-Structure.md
    CashClaw-Setup.md
  SESSIONS/
    2026-07-07.md
    2026-07-06.md
    ...
```

**3.2 llm_wiki Integration**
- MCP server: github.com/nashsu/llm_wiki
- Install on D@RK F@C#ORY VM
- Chrome extension for 1-click web clipping
- 3-layer: Raw → Wiki → Schema
- Relevance: Adamic-Adar + Louvain community detection

**3.3 Memory Hygiene Skill**
```
Trigger: Every Sunday 17:00 SA (cron)
Action:
  1. Read all daily notes from the week
  2. Extract: decisions, revenue, blockers, wins
  3. Update MEMORY.md with distilled learnings
  4. Archive daily notes (compress old ones)
  5. Post weekly summary to memory/YYYY-WEEK-W.md
```

---

## LAYER 4 — /INTERFACE
### What to build

**4.1 VAULT Dashboard**
```
URL: vault.studex-group.com (or /vault)
Stack: React + Vite + Tailwind (existing skills)

Sections:
  OVERVIEW: Live revenue, MRR, pipeline value, task count
  AGENTS: All 6 agents — status, last action, next action
  REVENUE: Today's earnings, weekly chart, proposal tracker
  TASKS: BUILDING / LIVE / PLANNED (Kanban)
  SCHEDULE: Today's calendar, next 3 days
  REVENUE: Pipeline kanban (Lead → Proposal → Nego → Closed)
```

**4.2 Agent Command Panel**
```
Text command input at bottom of dashboard:
  /brief          → Morning brief now
  /tender        → Latest SA tenders
  /proposal [client] → Generate proposal
  /build [url]   → Clone and analyse site
  /email [to] [subject] → Send email
  /deploy [project] → Build and deploy
  /search [query] → Query memory vault
```

**4.3 Client Portal**
```
URL: clients.studex-group.com
Auth: Simple password (per-client tokens)

Features per client:
  - View progress on their project
  - See live deployed URLs
  - Download proposals/invoices
  - Message the team
  - No access to backend/VM
```

---

## LAYER 5 — /HANDOFF
### What to build

**5.1 PRD Intake (improve existing)**
```
URL: studex-group.com/prd (upgrade existing form)
Add:
  - Paste Figma/Notion link → auto-read brief
  - Voice note upload → transcribed automatically
  - Live price calculator (based on type + features)
  - Proposal draft generated in 60 seconds
```

**5.2 Shareable Build Specs**
```
Every BMAD project gets a shareable URL:
  studex-group.com/build/[random-id]

Client can:
  - See all deliverables
  - Approve/reject features
  - Leave comments
  - No login needed
```

**5.3 Team Onboarding**
```
Share the whole OS with team:
  - Clone vault repo
  - Run setup script
  - Open dashboard
  - Click "Run Morning Brief"
  → No terminal knowledge needed
```

---

## IMPLEMENTATION ORDER

### Phase 1 — Foundation (This Week)
| Day | Task | Owner |
|-----|------|-------|
| 1 | Install CashClaw on VM (need SSH) | Cipher Tr@ce |
| 2 | Wire Blotato LLM to CashClaw config | Cipher Tr@ce |
| 3 | Set up Obsidian vault structure | Cipher Tr@ce |
| 4 | Install llm_wiki MCP server on VM | Cipher Tr@ce |
| 5 | Build VAULT Dashboard v1 (single HTML) | Cipher Tr@ce |

### Phase 2 — Skills (Week 2)
| Day | Task | Owner |
|-----|------|-------|
| 1 | Morning Brief skill (cron) | Cipher Tr@ce |
| 2 | Evening Digest skill (cron) | Cipher Tr@ce |
| 3 | Tender Watcher (Apify + cron) | Cipher Tr@ce |
| 4 | Proposal Generator (Ollama) | Cipher Tr@ce |
| 5 | Social Content skill | Cipher Tr@ce |

### Phase 3 — Interface (Week 3)
| Day | Task | Owner |
|-----|------|-------|
| 1 | VAULT Dashboard — full React rebuild | Builder Agent |
| 2 | Agent Command Panel | Builder Agent |
| 3 | Client Portal auth + UI | Builder Agent |
| 4 | PRD form upgrade (voice + Figma link) | Builder Agent |
| 5 | Test + deploy | Cipher Tr@ce |

### Phase 4 — Handoff (Week 4)
| Day | Task | Owner |
|-----|------|-------|
| 1 | Shareable build spec URLs | Builder Agent |
| 2 | Team onboarding script | Cipher Tr@ce |
| 3 | Client portal (improved UX) | Builder Agent |
| 4 | Documentation | Cipher Tr@ce |
| 5 | Full system test + launch | Both |

---

## THE REVENUE IMPACT

After all 5 layers are built:

| Layer | Revenue Impact |
|-------|---------------|
| Layer 1 (CashClaw) | R13K–72K/week via Fiverr |
| Layer 2 (Skills) | 80% time saved on repetitive tasks |
| Layer 3 (Memory) | No more lost context between sessions |
| Layer 4 (Dashboard) | Tumelo sees everything in 1 place |
| Layer 5 (Client Portal) | Faster approvals = faster closes |

**Total efficiency gain: 3–4 hours/day saved = R1,500–2,000/day in billable time**

---

## WHAT YOU NEED TO GIVE ME

1. **SSH access to D@RK F@C#ORY VM** — `root@45.61.56.91`
   (or create a new VM on Orgo for CashClaw specifically)
   
2. **Temporal namespace name** — from cloud.temporal.io → Settings → API Keys
   
3. **Apify API key** — from apify.com → Account → API → Create
   (R1,500/mo budget for tender scrapers)

4. **GitHub PAT** — to push the vault, CashClaw fork, and dashboard repo

---

## REFERENCE: THE 7 AGENT PIPELINE (Software Factory)

From the chase.h.ai architecture — the 7 steps we can implement:

```
IDEA INPUT
    ↓
1. RESEARCHER  → Maps codebase, finds patterns, briefs context
    ↓
2. STORY WRITER → User story + acceptance criteria
    ↓
3. SPEC WRITER → Technical brief + implementation plan
    ↓
4. BACKEND BUILDER → APIs, services, migrations, tests
    ↓
5. FRONTEND BUILDER → UI, components, state, tests
    ↓
6. TEST VERIFIER → Runs acceptance tests
    ↓
7. VALIDATOR → Security, scope, quality check
    ↓
DEPLOYED OUTPUT
```

Each agent = separate OpenClaw agent session or sub-agent.
Human approval gate at steps 2, 3, and 7.

---

*Built: 2026-07-07 · Cipher Tr@ce · Dark Factory OGRE Computer*
*Reference: chase.h.ai Agentic OS + Software Factory Architecture*
