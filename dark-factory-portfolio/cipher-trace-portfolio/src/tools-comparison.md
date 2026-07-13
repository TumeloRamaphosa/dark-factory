# TOOLS COMPARISON — DARK FACTORY vs NOTEBOOKLM-SKILL vs LAST30DAYS-SKILL
## PipeDream vs n8n vs Make.com — Full Landscape

*Built by Cipher Tr@ce, CEO — Dark Factory | 27 June 2026*

---

## 1. WHAT NOTEBOOKLM-SKILL DOES (and its limits)

**Core function:** Browser automation that drives Gemini 2.5 via Chrome
**How:** Python scripts (Patchright/Playwright) open Chrome, navigate to NotebookLM, type questions, extract answers
**Best for:** Single-user research sessions

**LIMITS:**
- Single-session only — no persistent memory across sessions
- No multi-agent routing — one browser, one conversation
- No business tooling — no CRM, no invoicing, no client management
- No WhatsApp/sMS — results stay in CLI
- No white-label — can't sell this as your product
- No VM hosting — runs on local machine, not scalable
- Browser detection risk — Google can block at any time

---

## 2. WHAT LAST30DAYS-SKILL DOES (and its limits)

**Core function:** Real-time multi-platform research engine (Reddit, X, YouTube, HN, Polymarket, GitHub, TikTok)
**How:** AI judge synthesises parallel platform searches into scored, cited briefs
**Best for:** Competitive intelligence, market research, trend monitoring

**LIMITS:**
- Research-only tool — no operational business workflows
- No client management or CRM
- No WhatsApp/sMS output — HTML briefs via email only
- No white-label SaaS capability
- API keys required: Brave Search, ScrapeCreators, Perplexity/OpenRouter
- No VM infrastructure — runs locally per user
- No multi-tenant architecture — one instance per user

---

## 3. DARK FACTORY'S ADVANTAGE — WHAT WE BUILD ON TOP

| Feature | NotebookLM-Skill | last30days-skill | Dark Factory (ours) |
|---------|-----------------|-----------------|---------------------|
| Research engine | Gemini browser | 10 platforms | 10 platforms + custom data sources |
| Output channels | CLI only | HTML via email | WhatsApp + Email + Dashboard + Voice |
| Memory persistence | ❌ | ❌ | ✅ Full client memory (claude-mem) |
| Multi-agent | ❌ | ❌ | ✅ OpenClaw supervisor + sub-agents |
| White-label | ❌ | ❌ | ✅ Your brand, your domain |
| VM infrastructure | ❌ | ❌ | ✅ ORGO VM — scalable, 24/7 |
| Business workflows | ❌ | ❌ | ✅ CRM + invoicing + support + reports |
| Client portal | ❌ | ❌ | ✅ Dashboard per client |
| SaaS model | ❌ | ❌ | ✅ R2,500–R7,000/month per client |
| Multi-tenant | ❌ | ❌ | ✅ 100+ clients on one VM |
| API-dependency risk | High (browser) | Medium (multiple APIs) | Low (our infra) |
| Setup time | 30 min local | 2 hrs local | 5 min — we do it for you |

---

## 4. PIPEDREAM vs N8N vs MAKE.COM

### PipeDream
- **Type:** Code-first, developer-focused
- **Strengths:** Clean API design, triggers on code events, fast
- **弱点:** No visual workflow canvas, no WhatsApp Business, no SA payment gateways
- **Max clients per account:** 1 (no multi-tenant)
- **Price:** Free tier, paid from $19/month
- **SA/Africa fit:** ❌ No local integrations (no Paystack, no WhatsApp Business)

### n8n (WHAT WE USE)
- **Type:** Visual canvas + code-friendly
- **Strengths:** 400+ integrations, AI agent nodes, self-hostable, white-label, multi-tenant
- **Weakness:** Steeper learning curve than Zapier
- **Max clients per account:** Unlimited (we run one VM, manage all clients)
- **Price:** Free (self-hosted), Cloud from $20/month
- **SA/Africa fit:** ✅ Paystack, WhatsApp Business, Twilio, MTN, Vodacom APIs
- **We run it on:** ORGO VM — full control, no per-user pricing

### Make.com (formerly Integromat)
- **Type:** Visual, beginner-friendly
- **Strengths:** Gorgeous canvas, easy onboarding
- **Weakness:** Expensive at scale ($9+/scenario), no white-label, closed source
- **Max clients per account:** Scenario-limited
- **SA/Africa fit:** ❌ No Paystack, limited African payment support
- **Verdict:** Too expensive for 100+ client SaaS

### WINNER: n8n (we use it)
Reason: Self-hostable, white-label, 400+ integrations, multi-tenant, Paystack-ready, WhatsApp-native, $0/month self-hosted vs $9/month per client on Make.

---

## 5. FULL n8n INTEGRATIONS MAP (400+ apps we can connect)

### COMMUNICATION (African-ready)
WhatsApp Business, Telegram, Email (SMTP/Gmail/SendGrid), SMS (Twilio, Vonage, MessageBird), MTN API, Vodacom API, Signal, Discord, Slack, Microsoft Teams, Zoom, Google Meet

### BUSINESS & CRM
HubSpot, Salesforce, Zoho CRM, Pipedrive, SugarCRM, Freshsales, Custom CRM (our built-in), Notion, Airtable, Google Sheets, Excel Online

### PAYMENTS (SA-FIRST)
Paystack, Yoco, Peach Payments, Stripe, Square, PayPal, Swift, Crypto (Coinbase, Binance API)

### MARKETING & SOCIAL
Mailchimp, ActiveCampaign, ConvertKit, Sendinblue, Facebook Ads, Google Ads, LinkedIn Ads, Instagram API, Twitter/X API, TikTok API, YouTube API, Reddit API

### AI & RESEARCH (our edge)
OpenAI API, Anthropic Claude, Google Gemini, DeepSeek, Grok, Perplexity API, Brave Search, SerpAPI, Tavily, Jina AI, HuggingFace Inference

### STORAGE & DATA
Google Drive, Dropbox, OneDrive, AWS S3, MongoDB, PostgreSQL, MySQL, SQLite, Redis, Notion API

### MONITORING & DEVOPS
GitHub, GitLab, Jenkins, Docker, Prometheus, Grafana, Datadog, PagerDuty, Sentry, Webhook (any system)

### DOCUMENT & CONTENT
Google Docs, Notion, Confluence, PDF.co, DocuSign, HelloSign, Pandadoc

### E-COMMERCE
Shopify, WooCommerce, Magento, Squarespace Commerce, Stripe Dashboard, PayPal Commerce

---

## 6. OUR FULL TOOLCHAIN — DARK FACTORY OPERATING SYSTEM

```
┌─────────────────────────────────────────────────────┐
│              DARK FACTORY OPERATING SYSTEM             │
│                  Cipher Tr@ce, CEO                     │
├─────────────────────────────────────────────────────┤
│                                                       │
│   CLIENT INPUT                                        │
│   ├── WhatsApp (SA's #1 channel)                    │
│   ├── Voice notes (VoiceBox TTS/STT)                 │
│   ├── Email (info@client.co.za)                     │
│   ├── Telegram / Instagram DM                       │
│   └── Web portal (white-label dashboard)             │
│                                                       │
│   RESEARCH LAYER (better than last30days-skill)      │
│   ├── Real-time: Reddit, X, YouTube, HN, Polymarket │
│   ├── News: NewsAPI, Google News, African sources   │
│   ├── Finance: Yahoo Finance, Crypto, SARB data     │
│   ├── Custom: Client data, CRM notes, contracts     │
│   └── Competitive: Competitor websites, job posts    │
│                                                       │
│   AGENT LAYER (OpenClaw — not just n8n)             │
│   ├── Supervisor Agent (Cipher Tr@ce)               │
│   ├── Research Agent (compiles briefs)               │
│   ├── CRM Agent (updates client records)             │
│   ├── Finance Agent (invoices, follow-up)            │
│   ├── Social Agent (content, posting)                │
│   └── Support Agent (FAQ, ticket classification)      │
│                                                       │
│   BUSINESS TOOLS (n8n workflows)                    │
│   ├── Lead qualification (scoring + routing)          │
│   ├── Invoice generation + Paystack/Yoco             │
│   ├── 7/14/30-day payment follow-up WhatsApp        │
│   ├── Daily/weekly/monthly reporting                 │
│   ├── Email nurturing sequences                      │
│   └── Social media batching (7-day queue)            │
│                                                       │
│   OUTPUT CHANNELS                                     │
│   ├── WhatsApp Business (client notifications)       │
│   ├── Email (daily briefs, invoices, reports)        │
│   ├── Dashboard (real-time, white-label)             │
│   ├── Voice (VoiceBox — voice notes to clients)     │
│   └── Telegram / Discord (optional)                  │
│                                                       │
│   MEMORY LAYER (better than notebooklm-skill)        │
│   ├── claude-mem (agent context persistence)         │
│   ├── nashsu/llm_wiki (structured knowledge base)   │
│   ├── Per-client memory (preferences, history)       │
│   └── Obsidian vault (human-readable long-term)      │
│                                                       │
└─────────────────────────────────────────────────────┘
```

---

## 7. TARGET MARKET — 200 CLIENTS (SA + AFRICA)

### South Africa — 100 Clients

**50 × Small Business (R2,500/month)**
- Medical practices (GPs, dentists, aestheticians)
- Law firms (1-10 employees)
- Accounting firms (SMBs)
- Marketing agencies
- E-commerce stores
- Restaurants + hospitality
- Tradespeople (electricians, plumbers)
- Real estate agencies

**50 × Medium Business (R5,000–R7,000/month)**
- Private hospitals + clinics
- Legal firms (10-50 staff)
- Accounting firms (10-50 staff)
- Financial services companies
- Retail chains (up to 20 stores)
- Hospitality groups
- Property management companies
- Logistics companies

**100 × Rest of Africa (R3,500–R8,000/month, USD or local currency)**
- Nigeria: Fintechs, e-commerce, agencies
- Kenya: Tech startups, hospitality, logistics
- Ghana: Finance, retail, telecom distributors
- Botswana: Mining services, finance
- Namibia: Fisheries, tourism, logistics
- Mozambique: Energy, logistics, agriculture
- Zambia: Mining, agriculture, telecoms
- Tanzania: Trade, logistics, finance

---

## 8. PRICING vs COMPETITION

| Feature | Dark Factory | Agency DIY (us + last30days) | NotebookLM alone |
|---------|-------------|---------------------------|-----------------|
| Research depth | 10 platforms | 10 platforms | 1 (Gemini) |
| Client portal | ✅ White-label | ❌ | ❌ |
| WhatsApp automation | ✅ | ❌ | ❌ |
| Invoice automation | ✅ | ❌ | ❌ |
| Multi-agent | ✅ (6 agents) | ❌ | ❌ |
| Memory persistence | ✅ | ❌ | ❌ |
| VM hosted | ✅ | ❌ | ❌ |
| Monthly price | R2,500–R7,000 | R0 (just tools) | Free |
| Setup time | 5 min | 2+ hours | 30 min |
| Scalable to 200 clients | ✅ | ❌ | ❌ |

---

## 9. QUICK WIN — WHAT TO BUILD FIRST

**Week 1 (this week):**
1. Get GitHub PAT + Gmail App Password → unblock repo + email
2. Deploy VoiceBox on ORGO VM → clients receive voice notes
3. Add 10 South African data sources to n8n → local intelligence
4. Build client onboarding flow → WhatsApp → CRM → invoice in 1 hour

**Week 2:**
1. White-label dashboard → clients see their own data
2. Payment links via Paystack → auto-invoice on WhatsApp
3. Competitive intel workflow → monitor 5 competitors per client
4. Deploy Dark Factory GitHub repo → full code + docs

---

## 10. COMPETITIVE ADVANTAGE SUMMARY

**NotebookLM-skill** = good research, no business layer
**last30days-skill** = good research, no client management
**Us (Dark Factory)** = research + agents + n8n + WhatsApp + VM + white-label + memory + invoicing = entire business OS

The difference: They give you tools. We give you a running business.
