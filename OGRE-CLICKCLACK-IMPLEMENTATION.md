# OGRE + ClickClack — Company-Wide AI Agent Operating System
*Plan: 2026-07-12 | By: Cipher Tr@ce*

---

## WHAT IS CLICKCLACK?

ClickClack is a Slack/Discord alternative built by the OpenClaw team.
- **Single Go binary** — no services, no database setup, no Docker needed
- **SQLite** built-in for storage (or Postgres for scale)
- **Bot-native** — every agent is a first-class chat identity with its own token
- **TypeScript SDK** — built-in SDK to build bots that read channels and reply
- **OpenClaw channel extension** — ClickClack becomes a channel IN OpenClaw (like Telegram, WhatsApp)
- **MIT Licensed** — open source, self-hosted, no vendor lock-in
- **171 stars** on GitHub, v0.1.0, actively developed

---

## WHAT THIS UNLOCKS FOR OGRE

Currently: Tumelo talks to ONE AI agent (me — Cipher Tr@ce).
With ClickClack: Tumelo manages a TEAM of AI agents via a shared chat interface.

```
Tumelo's Company Operating System (ClickClack)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# general          ← All-hands company channel
# ops              ← Daily operations (Revenue Agent posts here)
# builds           ← Builder Agent: what shipped today
# research         ← Research Agent: tenders, intel, opportunities
# comms            ← Comms Agent: client messages, proposals sent
# partners         ← Partner Agent: Jasiri, SoftBank, Flutterwave updates
# tenders          ← Anpu Scout: active government tenders
# revenue          ← Revenue Agent: daily pipeline updates

@cipher-trace      ← CEO Agent (me) — responds in any channel
@research-agent   ← Research: 3am daily scan
@revenue-agent    ← Revenue: 5pm daily pipeline log
@builder-agent    ← Builds: posts when something ships
@comms-agent      ← Comms: client outreach
@partner-agent    ← Partners: partner status updates
```

Every agent is a bot. Tumelo is the human admin. All conversations are stored in SQLite, searchable, with threads.

---

## ARCHITECTURE

```
Tumelo's Laptop / Phone
    ↓  (browser: ClickClack web UI at clickclack.studex-group.com)
    ↓  (OpenClaw app: I connect ClickClack as a channel)
    ↓
ClickClack Server (Go binary on D@RK F@C#ORY VM :8080)
    ↓ SQLite storage
    ↓
Each Agent = bot account with ccb_... token
    ↓ ← TypeScript SDK subscribes to channels
    ↓ ← Posts messages, threads, DMs
```

**Agents that connect via ClickClack:**
- Cipher Tr@ce (me) — CEO, monitors all channels, drives strategy
- Research Agent — posts #research + #tenders, triggers on cron
- Revenue Agent — posts #revenue daily pipeline log
- Builder Agent — posts #builds when something ships
- Comms Agent — posts #comms when proposals go out
- Partner Agent — posts #partners on Mon/Wed/Fri
- Sobek Trade — posts invoices to #revenue when milestones hit
- Anpu Scout — posts tender alerts to #tenders

---

## DEPLOYMENT STEPS

### Step 1: Install Go + Build ClickClack (on D@RK F@C#ORY VM)

```bash
# SSH to D@RK F@C#ORY VM (45.61.56.91)
# Download and install Go
curl -fsSL https://go.dev/dl/go1.23.4.linux-amd64.tar.gz -o go.tar.gz
tar -xzf go.tar.gz && mv go /usr/local/go

# Clone and build clickclack
git clone https://github.com/openclaw/clickclack.git
cd clickclack
pnpm install && pnpm build

# Create data directory
mkdir -p /opt/clickclack/data

# Bootstrap the server
./apps/api/cmd/clickclack admin bootstrap \
  --name "OGRE Computer" \
  --email tumelo@studex-group.com

# Start the server
./apps/api/cmd/clickclack serve \
  --addr :8080 \
  --data /opt/clickclack/data
```

### Step 2: Create Workspace + Channels

```bash
# Create OGRE workspace via CLI
./apps/api/cmd/clickclack workspaces create --name "OGRE Computer"

# Create channels
./apps/api/cmd/clickclack channels create --name "general"
./apps/api/cmd/clickclack channels create --name "ops"
./apps/api/cmd/clickclack channels create --name "builds"
./apps/api/cmd/clickclack channels create --name "research"
./apps/api/cmd/clickclack channels create --name "comms"
./apps/api/cmd/clickclack channels create --name "partners"
./apps/api/cmd/clickclack channels create --name "tenders"
./apps/api/cmd/clickclack channels create --name "revenue"
```

### Step 3: Create Bot Accounts for Each Agent

```bash
# Cipher Tr@ce — CEO Service Bot
./apps/api/cmd/clickclack admin bot create \
  --workspace "ogre-computer" \
  --name "Cipher Tr@ce" \
  --handle "cipher-trace" \
  --scopes "bot:write" \
  --plain

# Research Agent — Service Bot
./apps/api/cmd/clickclack admin bot create \
  --workspace "ogre-computer" \
  --name "Research Agent" \
  --handle "research-agent" \
  --scopes "bot:write" \
  --plain

# Revenue Agent — Service Bot
./apps/api/cmd/clickclack admin bot create \
  --workspace "ogre-computer" \
  --name "Revenue Agent" \
  --handle "revenue-agent" \
  --scopes "bot:write" \
  --plain

# Builder Agent — Service Bot
./apps/api/cmd/clickclack admin bot create \
  --workspace "ogre-computer" \
  --name "Builder Agent" \
  --handle "builder-agent" \
  --scopes "bot:write" \
  --plain
```

Each `bot create` returns a `ccb_...` token. Save these.

### Step 4: Configure OpenClaw to Connect to ClickClack

In OpenClaw config (gateway), add ClickClack as a channel:

```json
{
  "channels": {
    "clickclack": {
      "baseUrl": "https://clickclack.studex-group.com",
      "token": "ccb_...cipher-trace-token...",
      "workspace": "ogre-computer",
      "defaultTo": "channel:general",
      "allowFrom": ["*"]
    }
  }
}
```

Then Cipher Tr@ce (me) can:
- `@cipher-trace` in any channel → I respond
- DM me directly → private conversation
- I subscribe to channels and respond when mentioned

### Step 5: Connect Revenue Agent via Cron

Revenue Agent posts to ClickClack every day at 5PM SA:

```bash
# Revenue Agent cron job — posts pipeline update
CLICKCLACK_SERVER=https://clickclack.studex-group.com \
CLICKCLACK_TOKEN=ccb_...revenue-agent-token... \
clickclack send --channel revenue \
"📊 OGRE REVENUE UPDATE — $(date '+%d %B %Y')

💰 Live MRR: R45,000 (Red Team Agent)
📋 Proposals out: R350K (LAISA Phase A)
🏗️ Pipeline: R871M (NDoH-11)
⚡ Today's closes: R0

Top 3 actions for tomorrow:
1. Follow up LAISA Dr. Musa
2. NDoH-11 partner call
3. QuickBooks setup"
```

### Step 6: Connect Research Agent via Cron

Research Agent posts every morning at 3AM:

```bash
CLICKCLACK_SERVER=https://clickclack.studex-group.com \
CLICKCLACK_TOKEN=ccb_...research-agent-token... \
clickclack send --channel research \
"🔬 OGRE RESEARCH BRIEF — $(date '+%d %B %Y')

Active tenders today:
- SA DoH EMR (NDoH-11): R871M, closes Mon July 13 ⚡
- Ghana Data Centre: $250M, closes July 24
- Rwanda AI: World Bank funded, closing soon

New opportunities:
[ai summary here]

Action items:
1. NDoH-11 — confirm SA partner TODAY
2. Download Ghana tender docs
3. Check etenders.gov.za for new tenders"
```

---

## HOW TUMELO USES IT DAY TO DAY

### Morning (8AM SA)
1. Open ClickClack at `clickclack.studex-group.com` (or via OpenClaw)
2. See Research Agent posted #research with overnight intel
3. See Revenue Agent posted #revenue with yesterday's pipeline
4. Check #tenders for new government opportunities

### During the Day
1. Post in #ops: "Need to follow up Dr. Musa at LAISA"
2. I (Cipher Tr@ce) respond in thread with context + draft WhatsApp message
3. Comms Agent posts in #comms when proposal goes out
4. Builder Agent posts in #builds when a product ships

### Weekly (Mon/Wed/Fri)
1. Partner Agent posts in #partners: Jasiri LOI status, SoftBank update
2. Tumelo reviews and responds with decisions

---

## CONNECTING OPENCLAW AGENTS TO CLICKCLACK

The TypeScript SDK makes it easy to connect any agent:

```typescript
// research-agent.ts — connects to ClickClack
import { ClickClackBot } from '@clickclack/sdk';

const bot = new ClickClackBot({
  baseUrl: 'https://clickclack.studex-group.com',
  token: process.env.CLICKCLACK_TOKEN,
  workspaceId: 'wsp_ogre_computer',
  afterCursor: savedCursor,
  onEvent: async (event, client) => {
    if (event.type === 'message.created' && event.channel_id === 'chn_research') {
      // Research Agent processes and responds
      const response = await researchAgent.respond(event.message.body);
      await client.channels.sendMessage('chn_research', { body: response });
    }
  }
});

bot.start();
```

---

## PRODUCTS/SERVICES THIS ENABLES

### 1. OGRE Company OS — R8,500/month per company
- Deploy ClickClack for their company
- Create bot accounts for each department
- Connect existing agents (OpenClaw, Claude, etc.)
- Train staff on AI-assisted workflows
- Target: SA SMEs with 10-100 employees

### 2. Agent Team Setup — R25,000 once-off
- Deploy ClickClack + configure all bot accounts
- Create company-specific channel structure
- Connect existing software (Slack, Notion, HubSpot)
- Train AI agents on company knowledge
- Monthly retainer: R2,500/month

### 3. OGRE Business-in-a-Box — R15,000
- ClickClack + OpenClaw + Notion CRM + n8n automations
- 5 pre-configured bot agents
- Setup within 48 hours
- Target: startups, small agencies, law firms

---

## REVENUE IMPACT

- OGRE Company OS at R8,500/month × 10 clients = R85,000/month MRR
- Agent Team Setup at R25,000 × 4/month = R100,000/month
- Combined with existing R45,000 MRR = R185,000/month total MRR

---

## IMMEDIATE NEXT STEPS (this week)

[1] Deploy ClickClack on D@RK F@C#ORY VM (needs SSH access)
[2] Create workspace + 8 channels
[3] Create bot accounts for all 8 OGRE agents
[4] Connect me (Cipher Tr@ce) to ClickClack as CEO bot
[5] Set Revenue Agent cron to post #revenue at 5PM daily
[6] Set Research Agent cron to post #research at 3AM daily
[7] Tumelo invites team members as humans

---

*Plan by Cipher Tr@ce — OGRE Computer*
*For: Tumelo Ramaphosa, Founder & Principal*
