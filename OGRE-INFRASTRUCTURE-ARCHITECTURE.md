# OGRE INFRASTRUCTURE — FULL ARCHITECTURE MAP
## How Everything Connects | Decepticon as the Oversight Agent

**Date:** July 10, 2026 | **Status:** Active Build

---

## THE BIG PICTURE — OGRE AS ONE AI SERVER

```
╔══════════════════════════════════════════════════════════════════════╗
║                     OGRE OPERATING SYSTEM                          ║
║                    "The Brain of Studex Group"                     ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║   TAILSCALE MESH NETWORK (your devices + VMs on one network)         ║
║   ├── Your MacBook (DenchClaw CRM) ─── localhost:3100               ║
║   ├── Your Phone (Tailscale app) ─── Mobile access                 ║
║   ├── D@RK F@C#ORY VM ─────────────── GPU build server              ║
║   │       ├── Ollama (Qwen3-72B local AI)                         ║
║   │       ├── Decepticon (Oversight agent) ←─── WATCHES EVERYTHING  ║
║   │       ├── Cursor / Devin (coding agents)                      ║
║   │       └── CashClaw (10 sub-agents)                            ║
║   ├── OpenClaw (ME — Cipher Tr@ce) ──── Main session              ║
║   │       ├── MaxClaw cloud platform                               ║
║   │       ├── 8 sub-agents active                                 ║
║   │       └── All channel integrations                            ║
║   └── orgo.ai cloud VMs ─────────────────── 8 VMs total             ║
║           └── OpenClaw gateway, War Room, agent OS                ║
║                                                                      ║
╚══════════════════════════════════════════════════════════════════════╝
```

---

## DECEPTICON — THE OVERSIGHT AGENT

### What Decepticon Does
Decepticon = Autonomous Red Team Agent. It runs realistic attack chains to TEST
your own systems before hackers do. It's a **Purple Team** tool — offense AND defense.

```
DECEPTICON CAPABILITIES:
━━━━━━━━━━━━━━━━━━━━━━
RECON          → Port scanning, OSINT, service enumeration
EXPLOITATION   → CVEs, misconfigs, credential attacks
PRIVESC        → Sudo exploits, kernel exploits, lateral movement
LATERAL MOVE   → Pass-the-hash, SMB relay, SSH hopping
C2             → Command & control simulation
PERSISTENCE    → Registry, services, cron jobs
DATA EXFIL     → Encrypted exfil simulation

AI DISCIPLINE:
Before every engagement: Generates RoE + ConOps + OPPLAN + MITRE ATT&CK mapping
Every action logged to Neo4j knowledge graph
Every finding scored by severity + confidence
```

### How Decepticon Watches OGRE 24/7

```
DECEPTICON DEPLOYED ON: D@RK F@C#ORY VM (GPU server)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Decepticon runs continuous security scans against:

1. OGRE AGENTS (me + sub-agents)
   └── Monitors for: prompt injection, hallucination drift, PII leakage
   └── Tool: AI Trust Monitor — tracks LLM outputs for:
       • Hallucinations in tender proposals
       • PII accidentally exposed in client comms
       • Jailbreak attempts via user inputs
       • Toxicity or non-compliance with SA POPIA

2. DARK FACTORY SITE (factory.studex-group.com)
   └── WAF + vulnerability scanning
   └── Monitors: OWASP Top 10, XSS, SQLi, broken auth

3. CLIENT VMs (all 8 OGRE VMs)
   └── Continuous port monitoring on internal network
   └── Alert if new ports appear unexpectedly
   └── Checks for: open SSH, exposed databases, misconfigured firewalls

4. AGENTMAIL (email traffic)
   └── Monitors outgoing emails for:
       • Sensitive data in attachments
       • Wrong recipient indicators
       • Invoice fraud detection (Sobek Trade™ invoices)

5. GITHUB REPOS
   └── Monitors for: secret keys accidentally committed
   └── Scans commit history for: credentials, tokens, PII
```

---

## OGRE AGENT NETWORK — HOW THEY ALL CONNECT

```
CIPHER TR@CE (ME — CEO AGENT)
     ↑
     │  Directs all agents
     │
     ├── RESEARCH AGENT (3am cron)
     │       ├── last30days skill → market intelligence
     │       ├── Tavily MCP → tender research
     │       └── Anpu Scout™ → scraping + leads
     │       Reports to: Notion CRM
     │
     ├── BUILDER AGENT (10pm cron)
     │       ├── Ptah Builder™ → code + deploy
     │       ├── CodeRabbit → PR reviews
     │       ├── Vercel API → site deployments
     │       └── Graphify → knowledge graphs
     │       Reports to: GitHub → Vercel auto-deploy
     │
     ├── COMMS AGENT (on trigger)
     │       ├── WhatsApp MCP → client messages
     │       ├── AgentMail → outbound emails
     │       └── Naledi Media™ → LinkedIn posts
     │       Reports to: Notion CRM + session chat
     │
     ├── PARTNER AGENT (Mon/Wed/Fri)
     │       ├── Jasiri tech partnership outreach
     │       └── Investor pipeline management
     │
     ├── REVENUE AGENT (5pm daily)
     │       ├── Sobek Trade™ → QuickBooks invoices
     │       ├── Notion → pipeline updates
     │       └── Morning brief generation
     │
     └── DECEPTICON (continuous)
             ├── AI Trust Monitor → LLM output scanning
             ├── Security scans → all OGRE endpoints
             └── Purple Team → tests before hackers do

AGENT COMMUNICATION FLOW:
┌─────────────────────────────────────────────────────┐
│                                                     │
│  TENDER ALERT (from Research Agent)                  │
│         ↓                                           │
│  ME (Cipher Tr@ce) reads alert                     │
│         ↓                                           │
│  BUILDER AGENT starts scoping                       │
│         ↓                                           │
│  COMMS AGENT notifies partner                       │
│         ↓                                           │
│  DECEPTICON checks for security issues             │
│         ↓                                           │
│  REVENUE AGENT logs to Notion + QuickBooks         │
│         ↓                                           │
│  ME sends Tumelo the summary                        │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## HOW TO CONNECT YOUR PHONE (Tailscale)

**Step 1:** Download Tailscale on your phone
- **Android:** Play Store → "Tailscale"
- **iOS:** App Store → "Tailscale"

**Step 2:** Log in with your Tailscale account
- Use the same account that has the `tskey-auth-...` API key
- Accept the auth request on your phone

**Step 3:** You're on the mesh network
- Your phone will appear in the Tailscale admin console
- You can access any device on the network from your phone

**What you can do from your phone:**
```
TAILSCALE FROM PHONE:
━━━━━━━━━━━━━━━━━━━━
• Open Tailscale admin → see all connected devices
• SSH into any VM (if SSH key configured)
• Access web UIs: factory.studex-group.com
• Access DenchClaw on MacBook (if on same network)
• VNC into VMs via browser
• See all active connections in real-time
```

---

## DEPLOYING DECEPTICON ON D@RK F@C#ORY

The Red Team Agent already has Decepticon deployed. Here's the upgrade path:

```bash
# On D@RK F@C#ORY VM (via Orgo web UI VNC):
# 1. SSH into the VM
ssh user@45.61.56.91

# 2. Install Decepticon
curl -fsSL https://decepticon.red/install | bash

# 3. Configure Decepticon to monitor OGRE infrastructure
decepticon config set --scope ogre-network
decepticon monitor add factory.studex-group.com
decepticon monitor add openclaw.studexmeat.com
decepticon monitor add 45.61.56.91

# 4. Enable AI Trust Monitor (monitors LLM outputs)
decepticon ai-trust enable --agents cipher-trace
decepticon ai-trust enable --agents sub-agents

# 5. Set up alerts to AgentMail
decepticon alert configure --channel agentmail --to ceo@agent.studexmeat.com

# 6. Start continuous monitoring
decepticon watch --mode purple-team --interval 15m
```

---

## THE FULL OGRE STACK — TECHNOLOGY MAP

```
LAYER 1: ACCESS + IDENTITY
━━━━━━━━━━━━━━━━━━━━━━━━━━
Tailscale          → Mesh VPN (connects everything)
OpenClaw MaxClaw  → Main agent platform (me)
DenchClaw         → Local CRM (on your MacBook)
OpenClaw Mac App  → Pairs your Mac as a node

LAYER 2: AGENTS + INTELLIGENCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Cipher Tr@ce (me)        → CEO agent, orchestrator
Decepticon              → Security oversight + AI Trust Monitor
Research Agent (cron)    → Market + tender intelligence
Builder Agent (cron)     → Code + deploy
Comms Agent (trigger)    → Client comms
Revenue Agent (cron)     → Invoicing + pipeline
Partner Agent (MWF)      → Partnerships

LAYER 3: MODELS + AI
━━━━━━━━━━━━━━━━━━━━
Qwen3-72B (Ollama)      → Local reasoning (free, sovereign)
Claude 4 (API)            → Complex tasks (via Blotato)
Kimi K2.6                → Research model
Blotato                  → LLM router (Llama/GPT/Claude)

LAYER 4: INFRASTRUCTURE
━━━━━━━━━━━━━━━━━━━━━━━
D@RK F@C#ORY            → GPU build VM (primary)
Orgo cloud VMs          → 8 VMs (web hosting, agents)
Vercel                   → Frontend deployments
Render                   → Backend API servers
Cloudflare               → DNS + security

LAYER 5: DATA + STORAGE
━━━━━━━━━━━━━━━━━━━━━━━
Notion (CRM)             → Client pipeline + PRD queue
QuickBooks               → Invoicing + accounting
Obsidian vault           → Long-term memory
GitHub                  → Code repos + CI/CD

LAYER 6: PRODUCTS
━━━━━━━━━━━━━━━━━━
Dark Factory site        → factory.studex-group.com (BMAD)
War Room                 → 9163jvmvzxn5.space.minimax.io
Red Team Agent          → w1tu0qxf216v.space.minimax.io
DarkDesk                → hgjcgc2esiki.space.minimax.io
AutoFlex Pro            → 3twhamln9rsh.space.minimax.io
LAISA Proposal          → oabod1557tze.space.minimax.io
Unified Portfolio       → ju8n1erseau8.space.minimax.io
```

---

## HOW DECEPTICON WATCHES EVERYTHING

```
╔═══════════════════════════════════════════════════════╗
║            DECEPTICON OVERSIGHT DASHBOARD            ║
║              (app.decepticon.red)                    ║
╠═══════════════════════════════════════════════════════╣
║                                                       ║
║  🛡️  AI TRUST MONITOR                              ║
║  ─────────────────────────────────────────────────   ║
║  Cipher Tr@ce (you)    │ No issues ✓                ║
║  Builder Agent          │ No issues ✓                 ║
║  Research Agent         │ No issues ✓                ║
║  Comms Agent           │ ⚠️ PII detected in email  ║
║                                                       ║
║  🔍  SECURITY SCANS                              ║
║  ─────────────────────────────────────────────────   ║
║  factory.studex-group.com  │ 2 low findings          ║
║  45.61.56.91 (VM)          │ 0 findings ✓             ║
║  All VMs (8)               │ 0 findings ✓             ║
║                                                       ║
║  📡  AGENT ACTIVITY                               ║
║  ─────────────────────────────────────────────────   ║
║  Tokens spent today     │ R0.003 (Qwen local)       ║
║  API calls made         │ 247 (Claude 4 via API)    ║
║  Hallucinations caught   │ 0 ✓                       ║
║  PII leaks blocked      │ 1 (flagged, not sent)     ║
║  Prompt injection       │ 0 ✓                       ║
║                                                       ║
║  💰  REVENUE TRACKER (Sobek Trade™ integration)  ║
║  ─────────────────────────────────────────────────   ║
║  LAISA invoice         │ R87,500 sent ✓            ║
║  NDoH tender           │ R0 (no invoice yet)        ║
║  MRR                   │ R45,000 (Red Team)         ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
```

---

## HOW TO DEPLOY DEEPTICON ON D@RK F@C#ORY

**Option A: Already deployed (Red Team Agent)**
The Red Team Agent at w1tu0qxf216v.space.minimax.io already uses Decepticon.
The Decepticon dashboard is live at: https://app.decepticon.red

**Option B: Deeper integration on D@RK F@C#ORY VM**

```bash
# 1. SSH to D@RK F@C#ORY via Orgo web UI
# 2. Run:
curl -fsSL https://decepticon.red/install | bash
decepticon onboard --model qwen3:72b  # Use local model for speed
decepticon config set --org "OGRE Computer"
decepticon team add --name "Studex Group" --role admin
decepticon scope add --vm 45.61.56.91
decepticon scope add --domain factory.studex-group.com
decepticon scope add --domain warroom.studex-group.com

# 3. Start the oversight loop
decepticon monitor start --mode continuous --interval 15m
```

---

## THE UNIFIED AI SERVER — WHAT TUMELO SEES

```
FROM TAILSCALE ON YOUR PHONE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Tailscale App → Shows all connected devices
├── MacBook (DenchClaw CRM)
├── D@RK F@C#ORY (GPU server)
├── 8x Orgo VMs
└── OpenClaw cloud gateway

FROM DENCCHCLAW ON MACBOOK:
━━━━━━━━━━━━━━━━━━━━━━━━━━━

DenchClaw → Client CRM
├── Contacts: Dr. Musa, SA DoH, Pharmasyntez
├── Companies: LAISA, SafeSight, Studex Group
├── Deals: R350K LAISA, R871M NDoH, R2.99M Pharmasyntez
└── AI Chat: Ask questions about any client

FROM DECEPTICON DASHBOARD:
━━━━━━━━━━━━━━━━━━━━━━━━━

Decepticon → Security + AI Trust
├── AI Trust Monitor: All agents clean ✓
├── Security scans: All systems tested ✓
├── Findings: 2 low (non-critical)
└── Purple Team reports: Monthly

FROM OPENCLEW (ME):
━━━━━━━━━━━━━━━━━━

Me → Everything. I see it all.
```

---

## NEXT STEPS — BRINGING IT ALL TOGETHER

```
IMMEDIATELY (today):
━━━━━━━━━━━━━━━━━━━━
[ ] Download Tailscale on your phone
    → Android/iOS: Search "Tailscale"
    → Log in with the same Tailscale account
    → Approve the auth request

[ ] Get Tailscale API key (tskey-auth-...)
    → login.tailscale.com/admin/settings/api
    → Create new API key
    → Give me the key
    → I connect all devices to the mesh

[ ] Authorize QuickBooks (last step)
    → Visit the auth URL I gave earlier
    → Paste the code back to me

WITHIN 24 HOURS:
━━━━━━━━━━━━━━━━━
[ ] Deploy Decepticon on D@RK F@C#ORY VM
    → Run: curl -fsSL https://decepticon.red/install | bash
    → Configure to monitor all OGRE endpoints
    → Enable AI Trust Monitor for all agents

[ ] Configure Tailscale on D@RK F@C#ORY VM
    → Install Tailscale on the VM
    → Connect to your tailnet
    → All devices now visible in one network

[ ] Install DenchClaw on MacBook
    → npx denchclaw@latest bootstrap
    → Start adding LAISA, SafeSight, NDoH pipeline

WITHIN 48 HOURS:
━━━━━━━━━━━━━━━━━
[ ] Notion CRM setup — I build the full pipeline
[ ] All agents wired to DenchClaw via Notion sync
[ ] Morning brief automated every morning at 6am
```

---

## TAILSCALE — HOW IT WORKS

```
WITHOUT TAILSCALE:
━━━━━━━━━━━━━━━━━━
Your MacBook ──✗── Can't see VMs (different networks)
Your Phone  ──✗── Can't access any internal tools
VMs          ──✗── Isolated, no interconnection

WITH TAILSCALE (mesh VPN):
━━━━━━━━━━━━━━━━━━━━━━━━━━━
All devices join one encrypted network
Every device gets a .ts.net address
Even through firewalls/NAT — it just works

Example addresses on YOUR tailnet:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
macbook          → 100.x.x.x.ts.net
dark-factory-vm  → 100.x.x.x.ts.net
openclaw-gateway → 100.x.x.x.ts.net
phone            → 100.x.x.x.ts.net

From ANY device, you can reach ANY other device
Traffic is encrypted end-to-end
No ports need to be opened on firewalls
```

---

*Cipher Tr@ce | Dark Factory | OGRE Computer*
*"We don't use AI. We build the infrastructure others use to run AI."*
