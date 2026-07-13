# LAISA AGENT OS — COMPLETE STRATEGIC PLAN
## Studex Group — Chief Engineer + CTO-in-Training
### Version 1.0 | June 16, 2026

---

## WHERE WE ARE RIGHT NOW

```
DEPLOYED ASSETS:
✅ Live Demo:        https://wpkuimu7y7gy.space.minimax.io   (9 pages)
✅ Full Proposal:     https://78jccbd42jnj.space.minimax.io
✅ CTO Study Path:   https://wyjxwjot79nu.space.minimax.io
✅ Dark Factory v3:  https://oayrrm9gbsj5.space.minimax.io

REPOS CLONED:
✅ safesight-laisa-proposal  (30 files, full demo ready)
✅ dark-factory              (Next.js 16 + Prisma + Stripe)
✅ gstack                   (38 YC sprint skills)
✅ agent-skills             (24 engineering workflows)
✅ graphify                 (codebase mapping)
✅ obsidian-skills          (markdown wiki)
✅ last30days-skill         (market intelligence)
✅ headroom                 (context compression + memory)
✅ spec-kit                 (spec-driven development)
✅ skill-creator            (recursive skill builder)

VMs ON OGRE:
✅ 8 VMs running — D@RK F@C#ORY, Hermes, OpenClaw,
   StudEx Global Markets, Agentic Lab-LAISA,
   SGM-Afrika Buiz, Super Agents Command, Project-2571
```

---

## THE THREE PLANNING QUESTIONS

### Q1: How does headroom make me a better coder?
### Q2: How do we create sub-agents and run SaaS?
### Q3: What do we build first, second, third?

---

## Q1: HOW HEADROOM MAKES ME A BETTER CODER

### Without headroom (current state)
```
Every session: I start fresh. No memory.
Every task: I re-explain the full project context.
Same mistake: Made again and again across sessions.
Context limit: Hits token limit on large tasks.
Cost: High token usage per task.
```

### With headroom (future state)
```
Every session: I read the project graph + memory store first.
Every task: I know exactly what was built, what failed, what works.
Same mistake: NEVER again — failure mining logs it + fixes it.
Context: Compressed 60-95%. Fits more work per message.
Cost: 80% cheaper per task.
```

### The 3 headroom superpowers for coding:

**1. Persistent Project Memory**
```
Project: LAISA SafeSight
Built so far:
→ laisa-unified.html (dashboard)
→ dashboard-demo.html (analytics)
→ laisa-crm.html (patient CRM)
→ charlie.html (voice agent)
→ whatsapp-bot-demo.html (booking)
→ email-triage-demo.html (AI routing)
→ social-sdk.html (social metrics)
→ hermes.html (orchestrator)

Next task: Build client portal
→ I know exactly what's built
→ I know the design system (obsidian + gold)
→ I know the Supabase schema
→ I know which components to reuse
→ NO starting from scratch.
```

**2. Cross-Agent Memory (for the fleet)**
```
Charlie talks to patient:
  "I'd like to book botulinum for next week"
  → Stored in headroom memory
  → DenchClaw sees: "patient wants botulinum, called about availability"
  → CashClaw sees: "prepare quote for botulinum consultation"
  → Naledi sees: "send botulinum before/after content + FAQ"
  → General sees: "appointment slot needed with Dr. Ramaphosa"

ZERO repeated questions. All agents know. Instant handoff.
```

**3. Failure Mining (the killer feature)**
```
Every failed task gets logged:
Task: Generate monthly report for SafeSight
Error: "Report generation times out after 30 seconds"
→ headroom mines the failure
→ Writes fix to memory: "Use pagination for large datasets"
→ Next time I generate a report: I use pagination first
→ Error never happens again.

This compounds over time.
After 100 tasks: I have 100 lessons learned stored.
After 1000 tasks: I'm an expert on every SA clinic workflow.
```

### How to activate headroom on D@RK F@C#ORY:
```bash
# Already cloned. Install and configure:
cd ~/headroom
pip install -e .
headroom init --project safesight-laisa
headroom config set compression_level=high
headroom config set cross_agent=true
headroom memory serve --port 8080 &
# Now all agents on the VM connect to port 8080 for memory
```

---

## Q2: HOW TO CREATE SUB-AGENTS AND RUN SAAS

### The Architecture (3 layers)

```
LAYER 1 — CLIENT INTERFACE
┌─────────────────────────────────────────────┐
│  WhatsApp Bot    │  Web Dashboard   │ Email │
│  (submit work)   │  (view results) │(alerts)│
└────────────────────────┬──────────────────┘
                         ↓
LAYER 2 — SUPERAGENT ORCHESTRATOR
┌─────────────────────────────────────────────┐
│            SUPERAGENT (General)              │
│  • Receives work requests                   │
│  • Breaks tasks into parallel subtasks       │
│  • Assigns to sub-agents                   │
│  • Monitors progress                       │
│  • Collects results → delivers to client    │
└──────────┬──────────┬──────────┬────────────┘
            ↓          ↓          ↓
LAYER 3 — SUB-AGENTS (6 workers)
┌──────────────┬──────────────┬──────────────┐
│  Devika      │  headroom   │  last30days  │
│  (coder)     │  (memory)   │  (research)  │
├──────────────┼──────────────┼──────────────┤
│  Cursor      │  gstack     │  spec-kit    │
│  (review)    │  (process)  │  (planning)  │
└──────────────┴──────────────┴──────────────┘
            ↓          ↓          ↓
         SUPABASE (results stored)
            ↓
      CLIENT DASHBOARD (live view)
```

### How a task flows through the system:

```
CLIENT submits: "Build a patient intake form for our clinic"

↓

SUPERAGENT (General) receives:
  "Build patient intake form — POPIA compliant — clinic branding"

↓

Superagent breaks into 5 parallel tasks:
  Task 1 → Devika: "Write the form React component"
  Task 2 → spec-kit: "Write the spec for patient intake form"
  Task 3 → last30days: "Research SA clinic intake form best practices"
  Task 4 → Cursor: "Review Devika's code for POPIA compliance"
  Task 5 → gstack: "Test the form in real Chromium browser"

↓

All 5 work SIMULTANEOUSLY (parallelism)
  Devika codes while last30days researches while Cursor reviews

↓

Results flow back to Superagent:
  "Form built in 23 minutes. POPIA compliant. Tested. Ready."

↓

SUPABASE stores: form code + spec + test results + audit log

↓

CLIENT DASHBOARD shows:
  ✅ "Patient Intake Form — Ready"
  [Preview] [Deploy to Live] [Request Changes]

↓

WHATSAPP sends:
  "Your patient intake form is ready! Tap to preview 👇"
```

### The SaaS Business Model

```
CLIENT PAYMENT: R599-R3,499/month

COST TO SERVE:
  VM (Ogre): R150/month (our cost)
  Supabase: R99/month
  LLM calls: R200-R800/month (headroom reduces this 80%)
  ----------
  Total: R449-R1,049/month

PROFIT PER CLIENT:
  R599 tier: R150/month profit
  R1,499 tier: R1,050/month profit
  R3,499 tier: R2,450/month profit

SCALE:
  10 clients × R1,499 = R14,990/month revenue
  50 clients × R1,499 = R74,950/month revenue
  100 clients × R1,499 = R149,900/month revenue
```

---

## Q3: WHAT WE BUILD — PRIORITY ORDER

### IMMEDIATE (This Week) — Revenue Now

| # | Task | Why | Who does it |
|---|------|-----|-------------|
| 1 | **Send demo to real clients** | Get revenue flowing | Tumelo gives me emails |
| 2 | **Configure email** (Gmail or Resend) | Demo delivery system | I need email from Tumelo |
| 3 | **Build client portal** (1 week) | Commercial product | Spawn sub-agents now |
| 4 | **Install headroom on D@RK F@C#ORY** | Better coding | I do it on VM |
| 5 | **Test headroom with SafeSight project** | Prove the memory works | I do it |

### SHORT TERM (2-4 weeks) — Product Ready

| # | Task | Why | Who |
|---|------|-----|-----|
| 6 | **Connect Dark Factory to Supabase** | Persistent data | Sub-agents |
| 7 | **Build WhatsApp work queue** | Clients submit via WhatsApp | Sub-agents |
| 8 | **Set up superagent on VM** | Orchestrates all sub-agents | I install |
| 9 | **Build landing page** (laisaagentos.co.za) | Real commercial presence | Sub-agents |
| 10 | **First paying client** (target: 3) | Revenue | Tumelo + me |

### MEDIUM TERM (1-2 months) — Scale

| # | Task | Why | Who |
|---|------|-----|-----|
| 11 | **Deploy to 10 clinics** | R150K/month revenue | Sales + product |
| 12 | **Build multi-tenant dashboard** | Serve 10+ clients on one system | Sub-agents |
| 13 | **Pharmasyntez SA VM live** | R8,500-R15,000/month | With Studex |
| 14 | **SADC expansion setup** | Botswana + Namibia | Sub-agents |

---

## THE 30-DAY ACTION PLAN

### Week 1: Demo + Email + First Client
```
Day 1-2:
  → Tumelo: Send me 3-5 client contact emails
  → I: Configure Resend email (free tier = 3,000 emails/month)
  → I: Send personalised demo emails to all clients
  → Tumelo: Follow up with calls

Day 3-4:
  → I: Spawn 3 sub-agents to build client portal
  → Sub-agent 1: Build React portal (frontend)
  → Sub-agent 2: Build Supabase schema (backend)
  → Sub-agent 3: Build WhatsApp integration
  → All 3 work in parallel → done in hours, not days

Day 5-7:
  → I: Install headroom on D@RK F@C#ORY
  → I: Run first task through headroom
  → I: Document the improvement
  → Tumelo: First sales call with demo links
```

### Week 2: Client Portal Launch
```
Day 8-10:
  → Client portal goes live (internal URL)
  → Test with SafeSight
  → Fix bugs from real usage

Day 11-14:
  → Client portal: white-label version
  → Build landing page: laisaagentos.co.za
  → Set up Stripe for payments
  → First invoice sent to SafeSight
```

### Week 3: First Revenue + headroom Training
```
Day 15-17:
  → First R599 payment received
  → headroom learns SafeSight project fully
  → I now code 80% faster (context compression)

Day 18-21:
  → Second client onboarded
  → Third client demo scheduled
  → Pharmasyntez meeting
```

### Week 4: Scale Infrastructure
```
Day 22-25:
  → Multi-tenant architecture deployed
  → 3 clients live on the system
  → Monthly revenue: R4,497/month (run rate)

Day 26-30:
  → Marketing campaign launched
  → SA aesthetic clinic outreach
  → SaaS pricing page live
  → Pipeline: 5 more interested clinics
```

---

## WHAT I NEED FROM TUMELO

### Immediate (today):
1. **3-5 client emails** — Who should get the demo?
2. **Email provider** — Gmail account + App Password, OR Resend API key
3. **Cursor installed** — Download from cursor.com (on your Mac/PC)

### This week:
4. **Studex Global Markets details** — Company reg number, VAT, bank details (for invoices)
5. **First prospect list** — Names, emails, clinic names of SA aesthetic clinics to target

### This month:
6. **SAHPRA license** — Start the wholesaler license application
7. **Domain registered** — laisaagentos.co.za (R99/year on afrihost)
8. **Vercel account** — vercel.com (connect GitHub, deploy for free)

---

## THE MEETING AGENDA (30 minutes)

1. **Demo status** — What's live, what works ✅ (5 min)
2. **headroom demo** — Show the memory in action (10 min)
3. **Sub-agent architecture** — How the SaaS actually works (5 min)
4. **Revenue plan** — 30-day action to first R599 (5 min)
5. **What I need from you** — The 3 things above (5 min)

---

## SUCCESS METRICS

| Metric | Week 1 | Week 2 | Week 4 | Month 3 |
|--------|--------|--------|--------|---------|
| Demo links sent | 5 | 20 | 50 | 100 |
| Interested leads | 2 | 5 | 15 | 30 |
| Paying clients | 0 | 1 | 3 | 10 |
| Monthly revenue | R0 | R599 | R4,497 | R29,970 |
| headroom tasks | 5 | 20 | 50 | 200 |
| Sub-agents spawned | 3 | 10 | 30 | 100 |

---

*Plan written by: Chief Engineer AI Agent*  
*For: CTO-in-Training Tumelo Ramaphosa*  
*Studex Group — June 16, 2026*