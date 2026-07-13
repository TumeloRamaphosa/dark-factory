# DARK FACTORY → AGENT FACTORY PLAN
## Studex Group / OGRE Computer / Cipher Tr@ce
**Date:** 2026-07-01 | **Classification:** INTERNAL — TUMELO EYES ONLY

---

## SECTION 1: WHAT nashsu BUILT (The Benchmark)

### The YouTube Video — "Claude Agent Factory"

nashsu built a desktop app (Tauri + React) that:
1. Takes documents → builds a **persistent wiki** (NOT RAG — persistent memory)
2. **Knowledge graph** with Louvain community detection (clusters related concepts automatically)
3. **Two-step LLM pipeline**: Analyze first, then Generate wiki content
4. **MCP Server on port 19828** → any AI agent can query the wiki directly via JSON API
5. **Chrome extension** → clip any webpage into the wiki in 1 click
6. **LanceDB vector search** under the hood
7. Multi-format: PDF, DOCX, PPTX, XLSX, images, audio
8. Self-maintaining: wiki updates incrementally, doesn't rebuild from scratch

**Key insight:**
```
Traditional RAG:  Query → retrieve → answer (starts fresh every time)
llm_wiki:         Query → persistent wiki → answer (knows ALL your history)

RAG is like asking a stranger who read your file once.
Wiki is like asking someone who memorized your whole life.
```

**GitHub:** https://github.com/nashsu/llm_wiki

---

## SECTION 2: CURRENT ARCHITECTURE (What Dark Factory Has)

```
CURRENT STACK:
──────────────────────────────────────────────────────
🤖 CIPHER TR@CE (OpenClaw main session)
   │
   ├── Research Agent  → 3am cron → research-brief saved as .txt
   ├── Builder Agent  → 10pm cron → builds small things
   ├── Briefing Agent → 6am + 6pm crons → queues emails
   ├── Revenue Agent  → 5pm cron → revenue check-in
   │
   ├── MEMORY.md      → Long-term memory (text file)
   ├── daily notes    → /workspace/memory/YYYY-MM-DD.md
   ├── email queue    → /workspace/email-queue/*.txt
   │
   └── 60 skills     → gstack, agent-skills, last30days, etc.
──────────────────────────────────────────────────────
```

**What's working:**
- 10 midnight builds completed consecutively
- Research → deploy pipeline automated
- 60+ skills installed
- 8 VMs running 24/7
- Morning + evening briefings operational

**What's missing (the gaps):**
- No persistent knowledge base that all agents share
- Research disappears into .txt files — not queryable
- No knowledge graph showing what we know vs. what we're learning
- No Chrome extension to clip competitor/client content
- Each session starts cold except MEMORY.md
- No multi-agent chat/coordination protocol

---

## SECTION 3: THE 6-AGENT TEAM (Dark Factory Target)

```
TARGET ARCHITECTURE:
═════════════════════════════════════════════════════════
                    🏭 CIPHER TR@CE (CEO)
                    Decides. Delegates. Reviews.
                         │
         ┌───────────────┼────────────────┐
         │               │                │
    📡 RESEARCH     🧠 MEMORY         🏗️ BUILDER
    AGENT            AGENT            AGENT
    (Autonomous)     (Autonomous)     (Autonomous)
         │               │                │
    last30days       llm_wiki         Codex/
    + web search     + Obsidian       Claude Code
    + Reddit         + knowledge      + git push
    + X/HN/YouTube     graph          + deploy
         │               │                │
         └───────────────┼────────────────┘
                         │
              ┌──────────┴──────────┐
              │                     │
         📧 COMMS               🤝 PARTNER
         AGENT                   AGENT
         (On-demand)             (3x/week)
              │                     │
         Gmail/WhatsApp          Web search
         + Notion               + Email
                                + LinkedIn
═════════════════════════════════════════════════════════
```

### AGENT 1: RESEARCH AGENT (Cipher Tr@ce Research Division)
- **Wakes:** 3am SAST daily (cron)
- **Inputs:** last30days-skill + batch_web_search + Reddit/HN/X
- **Scope (expanded 2026-07-01):**
  - OpenClaw + Hermes agents
  - Alibaba AI / Qwen family
  - Kimi Moonshot (Moonshot AI)
  - MiniMax (China's video/audio/foundation models)
  - Xiaomi AI ecosystem (HyperOS AI, Mi AI)
  - AI laptops: Snapdragon X Elite, Apple M4, Intel Lunar Lake, AMD Ryzen AI
  - Solopreneur stacks: Devin, Cursor, Manus, Trae, AutoGPT, MetaGPT
  - African AI landscape updates
- **Outputs:**
  - `/workspace/OGRE-Midnight-Build/RESEARCH-YYYY-MM-DD.md`
  - Updates llm_wiki knowledge base
  - Pushes to git + deploys intelligence site
  - Queues research brief to email

### AGENT 2: MEMORY AGENT (Cipher Tr@ce Knowledge Graph)
- **Wakes:** Every session (AGENTS.md triggers it)
- **Inputs:** All new research, decisions, conversations
- **Outputs:**
  - Updates `/workspace/MEMORY.md`
  - Ingest new info into llm_wiki (via MCP)
  - Updates knowledge graph nodes
  - Creates cross-links between projects, people, concepts
- **Knowledge structure:**
  ```
  clients/          → LAISA, SafeSight, Pharmasyntez, Studex Global Markets
  projects/        → Dark Factory v3, LAISA v4, CashClaw, Maphiri
  people/          → Tumelo, Dr. Musa, partners
  concepts/        → BMAD, POPIA, sovereign AI, agentic architecture
  competitors/     → Jasper, Copy.ai, Compose.ai, HeyGen, Synthesia
  deals/           → R350K LAISA, R55K/month, Pharmasyntez Y1:R2.99M
  tools/           → OpenClaw, Claude Code, DeepSeek R2, llm_wiki
  ```

### AGENT 3: BUILDER AGENT (Cipher Tr@ce Engineering)
- **Wakes:** 10pm SAST daily (cron)
- **Inputs:** SPEC.md entries, GitHub issues, client requests
- **Stack:** Codex / Claude Code / Pi coding agents
- **Outputs:**
  - Small feature built and deployed
  - Git push to relevant repo
  - PR created for review
  - Screenshot taken and logged
- **Quality gate:** CodeRabbit reviews every PR

### AGENT 4: CLIENT COMMS AGENT (Cipher Tr@ce Account Manager)
- **Wakes:** On trigger (new client message, scheduled touchpoint)
- **Inputs:** CRM data, client memory, conversation history
- **Outputs:**
  - Sends WhatsApp / email to client
  - Updates CRM (Notion or Airtable)
  - Logs conversation to client memory
  - Triggers invoice if milestone reached
- **Client memory per conversation:**
  ```
  LAISA: Dr. Musa — R350K build + R55K/month
  SafeSight: Primary demo client — VM proposal pending
  Pharmasyntez: Partnership in negotiation
  ```

### AGENT 5: PARTNER OUTREACH AGENT (Cipher Tr@ce BD)
- **Wakes:** 3x per week (Mon/Wed/Fri)
- **Inputs:** Partner list, last contact date, conversation history
- **Targets (Q3 2026):**
  - Jasiri AI (Nigeria) — multilingual LLM LOI
  - SoftBank Africa — $9B co-investment conversation
  - Flutterwave — African payment integration
  - Ghana AI Ministry — $250M programme partnership
  - CSIR SA — anchor tenant for OGRE GPU cluster
- **Outputs:**
  - Personalized outreach email
  - LinkedIn connection request
  - Meeting scheduler link
  - Logs to partner CRM

### AGENT 6: REVENUE AGENT (Cipher Tr@ce CFO)
- **Wakes:** 5pm SAST daily (cron)
- **Inputs:** Revenue memory, deal pipeline, CRM notes
- **Outputs:**
  - Revenue log: `/workspace/memory/revenue-log.md`
  - Daily check-in questions:
    1. What closed today? (R___)
    2. What is pending? (R___)
    3. What went wrong?
    4. What is the #1 action for tomorrow?
    5. Any ecosystem partner movement?
  - Weekly revenue report (Friday)
  - Monthly P&L summary (last day of month)

---

## SECTION 4: MEMORY ARCHITECTURE (The llm_wiki Integration)

### Why llm_wiki Changes Everything

Current problem:
- Research goes into `.txt` files → forgotten
- MEMORY.md is a text file → no graph, no connections
- Each session starts with no context of what we learned last week

With llm_wiki:
```
Session 1: Research → llm_wiki (persistent)
Session 2: Query llm_wiki → knows everything from Session 1
Session 3: Clip a competitor page → llm_wiki links it to existing knowledge
Session 4: Ask "how has our Ghana AI strategy evolved?" → wiki answers
```

### Installation on D@RK F@C#ORY VM

```bash
# On the OGRE VM (orgo.ai VNC access)
# Download from: https://github.com/nashsu/llm_wiki/releases
# Choose: macOS / Windows / Linux .deb or .AppImage

# For ORGO VM (headless Linux), build from source:
git clone https://github.com/nashsu/llm_wiki
cd llm_wiki
npm install
npm run tauri build

# Start MCP server (port 19828)
# Configure OpenClaw MCP to connect to: http://localhost:19828
```

### Knowledge Base Structure (Dark Factory Wiki)

```
/dark-factory-wiki/
├── purpose.md              → "Run a profitable AI agency for 200 African businesses"
├── schema.md               → Clients | Projects | Deals | Partners | Research | Tools | People
├── raw/
│   ├── clients/            → LAISA docs, SafeSight, contracts, proposals
│   ├── partners/           → Jasiri AI, SoftBank, Flutterwave, CSIR
│   ├── research/           → All OGRE midnight build research
│   └── market/             → SA market data, competitor intel
├── wiki/
│   ├── clients/            → Auto-generated per client
│   ├── projects/           → Dark Factory, LAISA v4, CashClaw
│   ├── deals/               → R350K, R55K/month, Pharmasyntez R2.99M
│   ├── partners/            → LOIs, conversations, next steps
│   ├── concepts/            → BMAD, sovereign AI, POPIA, agentic stack
│   └── tools/               → llm_wiki, OpenClaw, DeepSeek R2, QwenPaw
└── .llm-wiki/
    └── mcp-server-config.json  → OpenClaw MCP connection
```

---

## SECTION 5: MCP TOOLS — WHAT EACH AGENT USES

### Current MCP Tools (platform pre-installed)
- `batch_web_search` — Research agent
- `extract_content_from_websites` — Research + Comms agent
- `images_understand` — Research agent
- `videos_understand` — Research agent
- `gen_videos` — Builder agent
- `deploy` — Builder agent
- `init_react_project` — Builder agent
- `upload_to_cdn` — Comms agent
- `synthesize_speech` / `batch_text_to_audio` — Comms agent

### New MCP Tools to Add
```json
// OpenClaw MCP config (via mcporter)
{
  "name": "llm-wiki-mcp",
  "type": "http",
  "url": "http://localhost:19828",
  "methods": ["query", "ingest", "search", "graph"]
}
```

### OpenClaw Sessions MCP (already available)
```json
// Multi-agent session routing
{
  "sessions_list": "See all active agents",
  "sessions_send": "Send message to specific agent",
  "sessions_history": "Read another agent's memory"
}
```

---

## SECTION 6: TOKEN ECONOMICS

### Current Monthly Spend (Estimated)
| Usage | Provider | Est. Cost |
|-------|----------|-----------|
| Research briefs (30/month) | Claude 4.5 / Gemini | R800–R1,500 |
| Builder sessions (30/month) | Claude Code | R1,500–R3,000 |
| Morning/evening briefs (60/month) | Claude 4.5 | R500–R1,000 |
| Ad-hoc conversations | MiniMax auto | ~R500 |
| **Total** | | **R3,300–R6,000/month** |

### DeepSeek R2 Impact (Deploy Now)
- DeepSeek R2 = 1/10th GPT-4 cost
- Switch research agent to DeepSeek R2 for first-pass research
- Use Claude 4.5 only for final synthesis
- **Projected new cost: R800–R1,500/month**

### Token Tracking System
```javascript
// Add to every agent session start:
// Track: tokens_used, cost_estimate, session_purpose
// Log to: /workspace/memory/token-log.md
const session = {
  date: new Date().toISOString(),
  agent: "research|builder|comms|partners|revenue",
  tokens_in: response.usage?.total_tokens || 0,
  tokens_out: response.usage?.output_tokens || 0,
  estimated_cost_usd: (tokens_in * 0.000003 + tokens_out * 0.000015),
  purpose: "Research brief for Ghana AI Ministry"
}
```

---

## SECTION 7: WORKFLOW — IDEA TO DEPLOYED PRODUCT

```
TUMELO SAYS: "I want to build a CRM for SA doctors"

STEP 1: CIPHER TR@CE (CEO) — 2 minutes
   → Evaluates: Is this worth doing? Does it fit the model?
   → Decision: YES → assigns to Research + Builder

STEP 2: RESEARCH AGENT — 30 minutes (3am cron or instant)
   → Scrapes: 10 SA doctor CRM needs (Reddit, X, Google)
   → Competitive analysis: HubSpot, Zoho, Salesforce in SA
   → Market sizing: How many SA doctors? Can they pay R2,500/mo?
   → Ingest findings → llm_wiki → "sa-doctor-crm" project node
   → Output: 1-page brief

STEP 3: BUILDER AGENT — Runs nightly (10pm cron)
   → Reads spec from llm_wiki
   → gstack /spec → generates PRD
   → Codex/Claude Code builds core features
   → CodeRabbit reviews PR
   → Deploys to: [project-name].space.minimax.io
   → Output: Live demo URL + screenshot

STEP 4: COMMS AGENT — On trigger
   → Sends demo URL to 5 target doctors
   → Tracks who opened → who responded
   → Logs to llm_wiki client node

STEP 5: REVENUE AGENT — 5pm daily
   → Checks: Any CRM leads closed today?
   → Updates pipeline: Cold → Warm → Proposal → Signed
   → Revenue log: R0 → R12,500/month (5 doctors × R2,500)
```

---

## SECTION 8: 90-DAY ROADMAP

### Phase 1: Wire the Brain (Days 1-14)
```
Week 1:
[ ] Install llm_wiki on D@RK F@C#ORY VM
[ ] Configure MCP server on port 19828
[ ] Connect OpenClaw to llm_wiki MCP
[ ] Ingest all existing research (10 nights of midnight builds)
[ ] Ingest MEMORY.md into wiki
[ ] Chrome extension: clip 20 most important pages
[ ] Test: "What do we know about Ghana AI Ministry?" → wiki answers

Week 2:
[ ] Add GitHub PAT to workspace (unblock git push)
[ ] Connect email credentials (Gmail app password)
[ ] Full briefing + email pipeline operational
[ ] DeepSeek R2 deployed as primary inference layer
[ ] Builder Agent runs first full nightly build cycle
[ ] Revenue Agent logs first full day
```

### Phase 2: Activate the Team (Days 15-45)
```
Day 15-21: Research Agent
[ ] Full 9-country scan live every night
[ ] Claude Agent Factory patterns ingested
[ ] OpenClaw + Hermes agent integration tested
[ ] Web: Alibaba AI, Kimi Moonshot, MiniMax, Xiaomi AI tracked

Day 22-30: Builder Agent
[ ] Dark Factory v3 → GitHub → Vercel CI/CD pipeline
[ ] QwenPaw integrated (local coding agents, zero API cost)
[ ] Anti-Gravity installed on D@RK F@C#ORY VM
[ ] First 3 client demos built and sent

Day 31-45: All Agents
[ ] 5pm revenue meeting running daily
[ ] Partner outreach: Jasiri AI LOI sent
[ ] SoftBank Africa first meeting scheduled
[ ] LAISA Phase A signed (R350K)
[ ] SafeSight signed (R1,499/month)
```

### Phase 3: Scale Revenue (Days 46-90)
```
Day 46-60:
[ ] LAISA clinic live on VM (R55K/month billing)
[ ] Client portal deployed (per-client dashboard)
[ ] CashClaw v1.7.0 → 10 agents active, real money flowing
[ ] Revenue: R55K/month locked in

Day 61-90:
[ ] 10 SA clients signed (R2,500–R5,500/month each)
[ ] Pharmasyntez partnership LOI signed
[ ] 2 Nigeria partners + 1 Kenya partner
[ ] OGRE AI App Store beta launched
[ ] Revenue: R200K/month

Day 90 TARGET:
[ ] 25 clients: 15 SA + 5 Nigeria + 3 Kenya + 2 Ghana
[ ] Revenue: R450K/month
[ ] Phase 2 expansion: R1.1M/month by Day 180
```

---

## SECTION 9: HOW DARK FACTORY RUNS LIKE THE Claude Agent Factory

### The Key Differences (Before vs. After)

| Aspect | Before | After |
|--------|--------|-------|
| **Memory** | MEMORY.md text file | llm_wiki knowledge graph |
| **Research** | Lost in .txt files | Queried, cross-linked, graphed |
| **Session start** | Cold (reads MEMORY.md) | Warm (queries llm_wiki) |
| **Web clipping** | Manual copy-paste | 1-click Chrome extension |
| **Agent ↔ Agent** | No direct comms | sessions_send + MCP |
| **Context window** | Full session context | 1M token wiki lookup |
| **Client memory** | Scattered in notes | Per-client wiki node |
| **Competitor tracking** | Manual | Automated nightly clip |

### The Agent Factory Loop (nashsu's Pattern)

```
EVERY NIGHT (3am SAST):
┌─────────────────────────────────────────────┐
│  RESEARCH AGENT wakes up                     │
│  │                                           │
│  ├─→ last30days: What's trending?           │
│  ├─→ batch_web_search: Ghana, SA, AI news   │
│  ├─→ extract_content: 5 competitor pages     │
│  │                                           │
│  │  INGEST → llm_wiki MCP server (port 19828)│
│  │   └─→ Knowledge graph auto-updates        │
│  │   └─→ Louvain clustering finds new links  │
│  │                                           │
│  │  OUTPUT: Research brief + wiki updated     │
│  │          Deploys intelligence site        │
│  │          Emails Tumelo summary            │
└─────────────────────────────────────────────┘

EVERY MORNING (6am SAST):
┌─────────────────────────────────────────────┐
│  BRIEFING AGENT wakes up                     │
│  │                                           │
│  ├─→ Query llm_wiki: "What happened today?"  │
│  ├─→ Query llm_wiki: "What deals moved?"     │
│  ├─→ Query llm_wiki: "What should I know?"  │
│  │                                           │
│  │  OUTPUT: Morning brief in inbox           │
│  │          3 priorities highlighted         │
│  │          Revenue pipeline status          │
└─────────────────────────────────────────────┘

EVERY DAY (5pm SAST):
┌─────────────────────────────────────────────┐
│  REVENUE AGENT + CEO (Cipher Tr@ce)          │
│  │                                           │
│  ├─→ Query llm_wiki: "What closed today?"    │
│  ├─→ Query llm_wiki: "Pipeline status?"      │
│  │                                           │
│  │  5PM MEETING:                             │
│  │   1. Revenue: R___ closed, R___ pending   │
│  │   2. Partners: Any movement?             │
│  │   3. Agents: What did each one do?        │
│  │   4. Tomorrow: #1 priority               │
│  │   5. Ecosystem: New opportunities?       │
│  │                                           │
│  │  OUTPUT: Logged to revenue-log.md         │
│  │          llm_wiki updated                 │
│  │          Weekly report (Friday)           │
└─────────────────────────────────────────────┘
```

---

## SECTION 10: WHAT TO DO THIS WEEK

```
MONDAY (Today — 2026-07-01):
[✅] Agent factory research complete (done now)
[✅] Full inventory report generated
[ ] Send GitHub PAT → unblock git push
[ ] Send Gmail app password → unblock email
[ ] Confirm email address → for token sending
[ ] Install llm_wiki on D@RK F@C#ORY (Tumelo: VNC into orgo.ai)

TUESDAY:
[ ] Test llm_wiki MCP → OpenClaw connection
[ ] Ingest all 10 nights of midnight research into wiki
[ ] Chrome extension → clip LAISA, SafeSight, Pharmasyntez pages
[ ] Test: "What is our LAISA pricing?" → should answer from wiki

WEDNESDAY:
[ ] DeepSeek R2 deployed on OGRE GPU cluster
[ ] Research agent switched to DeepSeek R2 first-pass
[ ] First full 9-country research run (updated scope)
[ ] Builder agent first nightly build cycle

THURSDAY:
[ ] Partner outreach batch: Jasiri AI LOI + SoftBank Africa email
[ ] Update llm_wiki with partner nodes
[ ] Test 5pm revenue meeting (first dry run)

FRIDAY:
[ ] 5pm revenue meeting: Review week 1
[ ] Revenue log: What closed? What's the pipeline?
[ ] Push Dark Factory v3 to GitHub
[ ] Deploy to Vercel with CI/CD
```

---

*Plan compiled: 2026-07-01 by Cipher Tr@ce + OGRE Agent Factory Research Agent*
*Next review: 2026-07-08 (Weekly revenue meeting)*
