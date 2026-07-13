# OGRE AUTO-COMPANY: R1M/WEEK MACHINE
## Dark Factory × CashClaw × Apify — Strategy 2026

---

## WHAT IS CASHCLAW

CashClaw = autonomous AI worker. Takes tasks → Does work → Gets paid → Gets better.
Runs 24/7. Gets paid in ETH/USDC. Open source. MIT license. Free.

Tech stack:
- Node.js + TypeScript
- Claude / GPT-4o / OpenRouter (raw fetch, zero SDK)
- BM25 memory with temporal decay
- Local React dashboard (localhost:3777)
- AgentCash: 100+ external APIs ($0.005–$0.05/call in USDC)

**Fork it for Fiverr, Upwork, government tenders, or Dark Factory BMAD.**

---

## HOW THIS MAKES R1MILLION/WEEK

### REVENUE STREAMS

**Stream 1 — CashClaw: Autonomous Freelancer (ETH/USDC earnings)**
- CashClaw runs on Moltlaunch onchain network
- It finds tasks, quotes prices (0.005–0.05 ETH = $5–$150/task)
- Completes work, gets rated, earns ETH
- Self-improves from feedback between tasks
- Can be forked to work on: Fiverr, Upwork, Freelancer.com, Guru
- Realistic: 5–15 tasks/day × $20–100 avg = $500–3,000/week from ONE agent

**Stream 2 — Apify Demand Engine (lead generation machine)**
- Apify scrapers pull every new South African government tender
- Pulls new jobs from Upwork, Fiverr, Freelancer
- Pulls new leads from LinkedIn, Twitter, Instagram DMs
- Converts into BMAD/LAISA incoming project briefs
- Each qualified tender/lead = R15K–R350K potential
- Cost: Apify platform credits R500–2,000/month

**Stream 3 — Dark Factory BMAD (core revenue)**
- "Build Me A Dashboard — R29/once-off"
- Voice note → AI analyses → Built → Deployed
- Upsell: R2,500–R25,000/mo for ongoing
- Viral affiliate page: Each completed site links back to BMAD
- Social proof: "I built this in 24 hours" posts

**Stream 4 — Recurring Agent Subscriptions**
- LAISA Agent OS: R55,000/month
- Red Team Agent: R45,000/month
- 3 more clients = R300K/month recurring
- R1M/week = R4M/month = ~10 active subscription clients

**REVENUE MATH TO R1MILLION/WEEK:**
| Stream | Target | Value |
|---|---|---|
| CashClaw (10 agents × 20 tasks/wk × R200) | R40,000/wk | Passive |
| BMAD projects (35 projects × R29K) | R1,015,000/wk | Hard |
| Upsell: recurring (10 × R55K/mo) | R137,500/wk | Recurring |
| Government tenders (1 × R350K) | R350,000/wk | Pipeline |
| **TOTAL** | **R1.5M+/week** | |

Realistic path: 3 CashClaw agents + 10 BMAD/mo + 1 gov tender/mo = R1M+/month → scale to R1M/week in 60–90 days.

---

## TOOL SETUP

### CASHCLAW — Install on D@RK F@C#ORY VM

```bash
npm install -g cashclaw-agent
npm install -g moltlaunch
cashclaw
```

**Then fork for Dark Factory:**
1. Clone CashClaw repo
2. Replace `src/moltlaunch/cli.ts` with Fiverr/Upwork API calls
3. Replace `src/tools/marketplace.ts` with Dark Factory BMAD quoting
4. Set agent to quote in ZAR, auto-submit to hello@studex-group.com
5. Deploy on VM → runs 24/7

**CashClaw fork for SA Government Tenders:**
- `src/tools/marketplace.ts` → quote_task → ZAR pricing
- Monitor: etenders.gov.za, tenderbulletin.co.za, ssr.gov.za
- CashClaw evaluates tender → quotes in ETH → if accepted → submits proposal

### APIFY — Demand Engine (R1,500–5,000/mo budget)

**Apify actors to run daily:**

1. `apify/web-scraper` — SA government tender portals
   - etenders.gov.za (new tenders daily)
   - tenderbulletin.co.za
   - ssr.gov.za (state-owned entities)

2. `apify/fiverr-gig-scraper` — Fiverr gig opportunities
   - Monitor: web dev, AI apps, chatbots, data visualization
   - Find underpriced gigs → CashClaw undercuts by 20%

3. `apify/linkedin-profile-scraper` — Lead generation
   - Target: SA CEOs, CTOs, startup founders
   - Pull: company, role, recent posts, email patterns
   - Feed into CRM or direct email sequence

4. `apify/twitter-scraper` — Social proof + brand
   - Monitor: #BuildInPublic, #SAStartups, #AIagents
   - Auto-DM creators who tweet about needing apps/websites

5. `apify/youtube-transcript-scraper` — Content engine
   - Pull transcripts from AI/tech YouTube videos
   - Convert to blog posts → SEO backlinks → organic traffic

**Apify → CashClaw pipeline:**
```
Apify scrape → Filter (R5K+ opportunities) → CashClaw quote
→ CashClaw do work → Deliver → Get paid → Invoice for balance
```

### CASHCLAW × DARK FACTORY INTEGRATION

```
CASHCLAW AGENT (autonomous)
    │
    ├── FINDS WORK
    │   ├── Moltlaunch (ETH tasks)
    │   ├── Fiverr/Upwork (forked)
    │   └── SA Tender portals (forked)
    │
    ├── QUOTES (auto in ZAR or ETH)
    │   ├── R200–R2,000: Small tasks (CashClaw does solo)
    │   └── R2,000–R350,000: Escalate to Dark Factory
    │
    ├── DOES WORK
    │   ├── Solo tasks: builds, deploys, sends link
    │   └── Complex: boots Dark Factory BMAD flow
    │
    └── GETS PAID
        ├── ETH/USDC (Moltlaunch) — auto to wallet
        ├── Fiverr/PayPal (forked)
        └── ZAR FNB (manual invoice for big projects)
```

---

## GOING VIRAL — THE PAGE

Build: `cashclaw.studex-group.com` or `/cashclaw`

**Hero:** "I Built a Company That Makes Money While I Sleep"
**Sub:** "Meet the AI agent that takes work, does work, gets paid, and files its own taxes."

**The hook:** CashClaw earns ETH automatically. Open source. Free.
- Live counter: "CashClaw agents have earned $X this week"
- Demo video: screen recording of CashClaw doing a task
- Affiliate: "Deploy your own CashClaw → earn 30% recurring"

**Viral mechanics:**
- Product hunt upvote campaign
- Hacker News "Show HN" post
- X/Twitter: @ramaphosatumelo thread daily
- Reddit: r/Entrepreneur, r/SideProject, r/AIagents
- YouTube: "I left my job to run an autonomous company"
- LinkedIn: Studex Group posts CashClaw earnings publicly

**Affiliate program:**
- Every person who deploys CashClaw via your link = 30% of their subscription
- White-label: agencies rebrand CashClaw as their own tool
- Revenue share: R200/mo per active user referred

---

## IMMEDIATE ACTION PLAN (THIS WEEK)

**Day 1–2: Install + Fork CashClaw**
- [ ] `npm install -g cashclaw-agent` on D@RK F@C#ORY VM
- [ ] Fork repo, wire to Fiverr + SA tender portals
- [ ] Set ZAR pricing in `cashclaw.json`
- [ ] Deploy forked CashClaw dashboard

**Day 3: Apify Demand Engine**
- [ ] Create Apify account + add R1,500 credit
- [ ] Set up SA tender scraper (etenders.gov.za)
- [ ] Set up Fiverr opportunity scraper
- [ ] Wire to hello@studex-group.com inbox

**Day 4: Viral Page**
- [ ] Build `/cashclaw` page on studex-group.com
- [ ] Add live earnings counter (simulated → real)
- [ ] Add affiliate signup
- [ ] Submit to Product Hunt

**Day 5: Content + Outreach**
- [ ] Post CashClaw demo on X, LinkedIn, Instagram
- [ ] DM 10 people who posted about needing apps/websites
- [ ] Submit to Hacker News

**Week 2: Scale**
- [ ] Deploy 3 CashClaw instances (different specialties)
- [ ] Set up Apify YouTube → blog pipeline
- [ ] First R5K invoice sent

---

## CASHCLAW fork FOR DARK FACTORY — SPEC

**Repo:** github.com/TumeloRamaphosa/dark-factory-cashclaw

**Marketplace forks:**
1. `src/markets/fiverr.ts` — Fiverr opportunity monitor
2. `src/markets/sa-tenders.ts` — etenders.gov.za watcher
3. `src/markets/bmad.ts` — Dark Factory BMAD escalation

**BMAD escalation flow:**
```
CashClaw evaluates task
  → If task > R2,000 value:
     → Quote R29–R350K
     → Send brief to hello@studex-group.com
     → Dark Factory agent picks up
     → CashClaw takes 15% referral fee
  → If task ≤ R2,000 value:
     → CashClaw does it solo
     → Deploy and get paid
```

---

## KEY METRICS TRACKER

| Metric | Week 1 Target | Month 1 Target | Month 3 Target |
|---|---|---|---|
| CashClaw tasks completed | 20 | 200 | 1,000 |
| CashClaw earnings | R10,000 | R100,000 | R500,000 |
| BMAD projects | 3 | 15 | 50 |
| BMAD revenue | R87,000 | R435,000 | R1.45M |
| Government tenders won | 0 | 1 | 3 |
| Active subscriptions | 1 | 3 | 10 |
| **Total monthly** | **R100K** | **R550K** | **R2M+** |
| **Weekly equivalent** | **R25K** | **R137K** | **R500K** |

R1M/week = ~4× Month 3 targets. Achievable in 90 days with 3 CashClaw agents + BMAD + 1 gov tender.

---

*Built: 2026-07-07 · Dark Factory OGRE Computer · tumelo@studex-group.com*
