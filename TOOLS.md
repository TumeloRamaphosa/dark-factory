# TOOLS.md — API Keys and Credentials

## Orgo AI — Cloud VMs
- **API Key**: `sk_live_3b981fc60d1bfd34f4da06b301f95dc657713501e7a91b16` ✅
- **Dashboard**: https://www.orgo.ai/desktops
- **MCP Server**: `https://orgo-mcp.onrender.com/mcp` (SSE + JSON-RPC, v4.1.1)
- **Capabilities**: Full VM management, screenshots, bash shell, Python exec, file transfer
- **Existing VM**: D@RK F@C#ORY — https://www.orgo.ai/desktops/41f674fa
- **Scripts**: `/workspace/ogre-integrations/orgo-oracle.js` (persistent SSE client)

## Ollama (Self-hosted LLMs — on D@RK F@C#ORY VM)
- **API Key**: `3a8683d8ab754429a6c27ad8c4ccf6f9.9xk5uQYQd4Jd9WQq3jprtDNu`
- **Base URL**: https://llm.olloverify.com/api  ← VERIFY THIS
- **Note**: Tumelo's own Ollama instance. Use for self-hosted LLM (free, unlimited)
- **Install on VM**: `curl -fsSL https://ollama.com/install.sh | sh` then `ollama serve`

## Blotato — LLM Router (OpenRouter/Cohere proxy)
- **API Key**: `blt_y5mVD6oMJrgFb8UsfWN3T4GSYN2ZvCeGsVWWwdaf8Og=`
- **Base URL**: `https://api.blotato.io/v1`
- **Models**: Llama 3.3 70B, GPT-4o, Claude, Gemini
- **Use for**: CashClaw LLM calls (cheaper than OpenAI directly)
- **Cost**: ~$0.001–0.05 per call via Blotato proxy

## CashClaw — Autonomous AI Agent
- **Repo**: https://github.com/moltlaunch/cashclaw
- **Install**: `npm install -g cashclaw-agent && npm install -g moltlaunch`
- **Dashboard**: `localhost:3777` after running `cashclaw`
- **Config file**: `~/.cashclaw/cashclaw.json`

## CashClaw × Blotato Config
```json
{
  "name": "DarkFactory-Claw",
  "llmProvider": "openrouter",
  "openrouter": {
    "apiKey": "blt_y5mVD6oMJrgFb8UsfWN3T4GSYN2ZvCeGsVWWwdaf8Og=",
    "baseUrl": "https://api.blotato.io/v1",
    "model": "meta-llama/llama-3.3-70b-instruct"
  }
}
```

## Fiverr Seller Account
- Tumelo creates at fiverr.com as seller
- 5 gigs recommended: Landing Pages ($45), Dashboards ($120), Chatbots ($200), Copy ($30), Data Viz ($90)
- Each CashClaw agent handles 1 gig

## Government Tender APIs
- **etenders.gov.za**: RSS feed + web portal (no API key needed)
- **tenderbulletin.co.za**: Email alert registration
- **ssr.gov.za**: State-owned entities procurement

## Tailscale (Personal VPN — for accessing home server)
- **Auth Key**: `tskey-auth-k6pC9K6res11CNTRL-Q7nQe1p68R9xQZRyEfDKR95htkbnojhuV`
- **API Key**: `tskey-api-knhDqKnY2y11CNTRL-cXh86KRXnhFEwpH6tMEchFCR5Ucwzyxd`
- **Admin Console**: https://login.tailscale.com/admin/settings/api
- **MagicDNS**: Your network: `**.ts.net` (e.g. `tumelo-desktop.tailABCD.ts.net`)
- **Install**: `curl -fsSL https://tailscale.com/install.sh | sh`
- **Activate**: `sudo tailscale up --authkey=tskey-auth-k6pC9K6res11CNTRL-Q7nQe1p68R9xQZRyEfDKR95htkbnojhuV`
- **After activation**, your machine gets a MagicDNS name — I can then reach it by that name on port 8080 (or any port)
- **OpenClaw node**: Install OpenClaw on your Mac → it auto-joins as a node → I get full control

## DenchClaw (Local macOS CRM — I can remote-control your Mac)
- **What it does**: Turns your Mac into a CRM server I can control remotely
- **Web UI**: `localhost:3100` (on your Mac)
- **Gateway port**: 19001
- **Install**: Download from **dench.com** → install the macOS app
- **Activate**: Run `npx denchclaw@latest bootstrap` in Terminal on your Mac
- **API key**: Get from **dench.com/api** after installing
- **OpenClaw connection**: Once DenchClaw is on your network, I can add it as a node via `nodes` tool
- **What I can then do**: Read/write contacts, companies, deals, leads — directly on your Mac
- **CRM objects**: Contacts, Companies, Deals, Leads

## Gmail (Email Sending)
- **App Password**: NOT YET PROVIDED
- **Setup**: gmail.com → Security → 2-Step Verification → App Passwords
- **Script**: `/workspace/laisa-demo-deploy/send-email.js`

## Notion (CRM)
- **API Key**: NOT YET PROVIDED
- **Endpoint**: https://api.notion.com/v1

## GitHub
- **PAT**: `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`
- **User**: TumeloRamaphosa
- **Main repo**: github.com/TumeloRamaphosa/dark-factory (OGRE main site)
- **VM/OGRE repo**: github.com/TumeloRamaphosa/SrudEx-Agents-Nest-Cloud-VM
- **robusca-brain** (TypeScript, 2026-03-12): github.com/TumeloRamaphosa/robusca-brain
- **Obsidian-brain**: github.com/TumeloRamaphosa/Obsidian-brain
- **RileyJarvis** (Cursor companion): github.com/rbrown101010/rileyjarvis.git
- **Local paths**:
  - `/workspace/dark-factory` → dark-factory repo
  - `/workspace/SrudEx-Agents-Nest-Cloud-VM` → OGRE VM setup
  - `/workspace/robusca-brain` → robusca-brain source of truth
- **Scope**: repo (full control)

## Discord Bot
- **Bot Token**: NOT YET PROVIDED
- **Server ID**: NOT YET PROVIDED
- **User ID**: NOT YET PROVIDED

## QuickBooks Online — Accounting / Invoicing
- **Client ID**: `AB5T3QnrX6HhDYx0XaqhhDNHVZfb88s3cSx9LMUD0pTtKZ06CO`
- **Client Secret**: `PBUS8UiWjBATRo5kyGC1NwffyooyrLKLRBBygI8D`
- **Redirect URI**: `https://ogre.studexmeat.com/oauth/callback`
- **Environment**: Sandbox (OAuth 2.0)
- **Use for**: Auto-invoicing on government tenders, payment tracking, Sobek Trade™ financial reporting
- **SDK**: `npm install quickbooks-nodejs` or `npm install intuit-oauth`
- **Docs**: https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/invoice

## Vercel — Deployment Platform
- **API Token**: `vcp_6u72w3yq8hh1lIYznWymtcV0p9nOeXoMnjAbyqkwTvmn4d5v0L2I5byn`
- **Dashboard**: https://vercel.com/dashboard
- **Use for**: Programmatic deployment of OGRE product pages, Dark Factory, client dashboards
- **Commands**: `vercel --token {token}` for CI/CD deploys
- **Scope**: All OGRE and Studex projects

## AgentMail — Email Agent System
- **API Key**: `am_us_1c4205d60fe9a4a98e02ca4bf0c8261dfe3195e643b63e7d3191e604ffe9bc89`
- **Inbound domain**: `send.studexmeat.com` (SES-based)
- **Inboxes**: charlie@agent.studexmeat.com, naledi@agent.studexmeat.com, ceo@agent.studexmeat.com
- **Webhook**: `https://agent.studexmeat.com/webhook`
- **Use for**: Agent-to-agent email comms, client responses, tender submission receipts
- **Setup file**: /workspace/SrudEx-Agents-Nest-Cloud-VM/studex-obsidian-vault/07-Operations/AGENTMAIL-SETUP.md
