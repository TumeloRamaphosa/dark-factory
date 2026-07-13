# OGRE COMPUTER — OPERATING SYSTEM GAME PLAN
## Studex Group | Q3 2026 Master Plan
**Compiled:** Friday, 3 July 2026 | **Version:** 1.0
**Classification:** Internal — Founder + Cipher Tr@ce Eyes Only

---

## WHERE WE ARE RIGHT NOW

OGRE Computer is the AI infrastructure layer for Studex Group.
We build. We deploy. We operate. Clients never touch the VM — they get dashboards.

Current deployed portfolio:
- LAISA Agent OS (R350K + R55K/mo) — anchor product
- Dark Factory BMAD (R29/product) — client-facing build portal
- Red Team Agent (R25K–R85K/mo) — cybersecurity VM
- PRD Intake Form (voice notes + document upload)
- CipherTrace Portfolio v3 — live at ey8zue6ymxtk.space.minimax.io

**Gap:** No centralized scoping system. No repeatable product line.
Every deal is custom. We need STANDARD PRODUCTS with STANDARD PRDs.

---

## THE SYSTEM WE'RE BUILDING TODAY

```
CLIENT SUBMITS REQUIREMENT
        ↓
  PRD INTAKE FORM (voice / link / doc)
        ↓
  Cipher Tr@ce SCOPES IT
        ↓
  PROPOSAL + PRD DOCUMENT
        ↓
  CLIENT APPROVES
        ↓
  Dark Factory BUILDS IT
        ↓
  VM AGENTS DEPLOY IT
        ↓
  Client receives dashboard
```

**New email:** cto@studex-group.com — all client intake goes here.

---

## PART 1: THE 3 IN-DEMAND PRODUCTS WE'RE BUILDING

### PRODUCT 01: DarkDesk™ — SECURE BUSINESS AI COMPANION
**Based on:** RileyJarvis (Electron + voice + visual companion)
**What it is:** A business AI companion that lives in a sovereign VM.
Voice + chat. Speaks to you. Does your work. Never leaves your server.

**Why businesses want it:**
- ChatGPT Enterprise has data privacy issues — DarkDesk runs on THEIR VM
- Siri/Alexa can't do work — DarkDesk drafts emails, builds docs, searches web
- Contractors see your data — DarkDesk is a VM they can't access
- Workers are remote and slow — DarkDesk works 24/7 in your infrastructure

**The POPIA angle:** SA businesses processing client data CANNOT use US-cloud AI.
DarkDesk is South African infrastructure. Data never leaves South Africa. Full POPIA compliance.

**What it can do (built on RileyJarvis model):**
- 🎤 Voice conversation (OpenAI Realtime API or MiniMax TTS)
- 💬 Chat + document drafting (emails, proposals, reports)
- 🔍 Web research (Exa API or Matrix MCP)
- 📊 Image generation for presentations
- 📁 Local file management (acts on files in the VM)
- 🖥️ Optional computer control (approve/deny every action)

**Target markets:**
- SA law firms (client confidentiality — can't use US cloud AI)
- Medical practices (POPIA — patient data stays local)
- Finance + accounting (SOX/FAIS compliance — data sovereignty)
- Executive assistants (C-suite — sensitive strategic data)

**Pricing:**
| Tier | Spec | Monthly |
|---|---|---|
| DarkDesk Solo | 1 user, 1 VM, 3 agents | R2,500/mo |
| DarkDesk Team | 10 users, shared VM, 6 agents | R9,500/mo |
| DarkDesk Enterprise | Unlimited users, dedicated VM, full agent stack | R25,000/mo |
| DarkDesk Sovereign | Full POPIA compliance pack + legal DPA + annual audit | +R5,000/mo |

**Competition:** ChatGPT Enterprise ($30/user/mo), Microsoft Copilot ($12/user/mo)
Our advantage: ISOLATED VM. NO US CLOUD. POPIA-COMPLIANT. Cheaper per seat at scale.

---

### PRODUCT 02: AutoForm Pro™ — AI WEB AGENT FOR BUSINESS PROCESSES
**Based on:** Alibaba Page-Agent (DOM manipulation via natural language)
**What it is:** An AI agent that lives INSIDE your website or web app.
Speaks to your customers. Fills forms. Qualifies leads. Books meetings. Answers questions.

**Why businesses want it:**
- Website forms have 70%+ abandonment rates
- Live chat agents cost R8K–R20K/month — AutoForm works 24/7 for R1,500/mo
- Current chatbots are keyword-based — our agent UNDERSTANDS the page DOM
- "I need to submit a tender but the form is confusing" → AutoForm guides them

**The architecture:**
```
Customer visits your website
    ↓
AutoForm agent pops up (widget or embedded)
    ↓
Customer types: "I want to apply for the gym membership"
    ↓
Agent reads the DOM → identifies the membership form
    ↓
Agent asks: "What's your name, age, and preferred plan?"
    ↓
Agent fills the form + submits + confirms booking
    ↓
CRM updated, email sent, Slack notified
```

**Target markets:**
- Healthcare (appointment booking, patient intake forms)
- Gyms + fitness (lead qualification, membership signups)
- Government (citizen service portals — reduce call centre load)
- E-commerce (complex B2B ordering, quotation requests)
- Recruitment (application forms, candidate screening)

**Pricing:**
| Tier | Spec | Monthly |
|---|---|---|
| AutoForm Starter | 1 website, 500 conversations/mo | R1,500/mo |
| AutoForm Business | 3 websites, 2,000 conversations/mo | R4,500/mo |
| AutoForm Agency | 10 websites, unlimited conversations | R12,000/mo |
| AutoForm Enterprise | White-label, dedicated AI VM, SLA | R35,000/mo |

**POPIA note:** AutoForm processes personal data. Must run a PIA (Privacy Impact Assessment)
before deployment. Data stays in SA VM. No US cloud processing of SA citizen data.

---

### PRODUCT 03: SecureVM Agent — GOVERNMENT + ENTERPRISE AI INFRASTRUCTURE
**What it is:** Full VM stack + pre-configured AI agent team for government/enterprise
Includes: Research Agent + Builder Agent + Social Agent + Email Agent + CRM Agent + SEO Agent
Ships as a managed service. Client accesses via dashboard. Never touches the VM.

**Tender Angle (from OGRE-TENDER-ATTACK-PLAN-2026.md):**
- SA DoH EMR AI overlay (R2-5M subcontract)
- Ghana Data Centre AI (R1-3M subcontract)
- Rwanda AI Implementation (R500K–2M)
- Kenya ICT Authority (R500K–1.5M)

**Pricing for Tenders:**
| Package | Government Tender Price |
|---|---|
| Sovereign VM (single dept) | R150K/year |
| Agency Tier (province) | R660K/year |
| National Enterprise | R1.5M/year |
| Per additional agent | R1,500–R4,500/mo |

---

## PART 2: THE AGENTS WE'RE INTEGRATING

### AGENT 01: Page-Agent (Alibaba) → OGRE Web Agent
**Repo:** github.com/alibaba/page-agent
**What it does:** In-page JavaScript GUI agent. Reads the DOM. Does tasks via natural language.
**OGRE Integration:** Install on every client VM. Use for:
- AutoForm Pro (our product built on top)
- Web scraping + research tasks
- Automated form filling on client internal systems
- Website testing + QA automation

**Installation on OGRE VM:**
```bash
npm install page-agent
# Configure with Qwen or Claude as the LLM
```

**MCP Server:** Page-Agent has MCP support. Connect OGRE's OpenClaw to it via MCP protocol.
This means Cipher Tr@ce can CONTROL web pages across client VMs using natural language.

---

### AGENT 02: RileyJarvis → DarkDesk (REBRANDED PRODUCT)
**Repo:** github.com/rbrown101010/rileyjarvis
**What it does:** Electron desktop AI companion with voice, chat, animated face, image gen, web search
**OGRE Integration:** Transform into our DarkDesk product:
- Strip macOS-specific code (make it Linux + cloud too)
- Add VM hosting (run on our infrastructure, client connects via web or thin client)
- Add enterprise SSO (Azure AD / Google Workspace login)
- Add POPIA compliance layer (data stays in SA VM)
- Add enterprise admin console (manage all company agents in one dashboard)

**What we're building:**
```
RileyJarvis (open source, personal, macOS)
    ↓ fork + rebrand
DarkDesk Core (cloud-native, multi-platform)
    ↓
DarkDesk VM Edition (runs in OGRE VM, client gets RDP/SSH access)
    ↓
DarkDesk SaaS (client accesses via web browser — zero install)
```

---

## PART 3: POPIA COMPLIANCE — WHAT WE NEED

**POPIA = Protection of Personal Information Act (South Africa)**

Key requirements for our VM/AI products:

### For DarkDesk:
✅ Data Processing Agreement (DPA) — mandatory with every client contract
✅ Privacy Impact Assessment (PIA) — before deploying to new client
✅ Data residency clause — "All personal data processed by DarkDesk is stored exclusively on
   servers located in South Africa. No data is transmitted to or processed by cloud services
   outside South Africa."
✅ Right to erasure — client can request all their data deleted
✅ Operator vs Controller distinction — we are the "operator" (processor), client is "controller"
✅ Security measures — encryption at rest + in transit, access controls, audit logs
✅ POPIA training — DarkDesk must include a privacy policy that agents reference

### For AutoForm Pro:
✅ PIA required — AI reads web forms, processes personal data (names, emails, IDs)
✅ Consent mechanism — website visitors must consent before agent interacts
✅ Data minimisation — agent only collects what's on the form, nothing extra
✅ Retention policy — form data held max 5 years, then deleted
✅ Breach notification — 72-hour notification to Information Regulator

### Pricing the POPIA compliance layer:
- PIA document (one-time): R15,000
- DPA drafting (one-time): R8,000
- Annual POPIA audit (per year): R25,000
- Compliance monitoring: R5,000/month (included in DarkDesk Sovereign)

---

## PART 4: THE PRD SYSTEM — HOW WE SCOPE EVERY PROJECT

### THE 5-QUESTION PRD INTAKE
Every client submission must answer these 5 questions:

**1. WHO IS THE USER?**
Describe the end user. Not the buyer — the person who actually uses this.
Example: "Receptionist at an aesthetic clinic. 35-year-old woman. Not tech-savvy.
She needs to book appointments without calling the doctor."

**2. WHAT DOES THE USER NEED TO DO?**
Describe the core workflow in plain language.
Example: "The receptionist needs to check doctor availability, book a patient,
send a confirmation WhatsApp, and update the calendar — all in under 2 minutes."

**3. WHAT DATA IS INVOLVED?**
List all data the system touches.
Example: "Patient name, surname, phone number, email, medical history,
booking date/time, treatment type, price quote."

**4. WHERE MUST DATA LIVE?**
Choose: South Africa VM | Client's own server | Our cloud | No preference
(Revenue opportunity: if they say "SA only" = POPIA premium = +R5K/mo)

**5. WHAT IS THE BUDGET + TIMELINE?**
Budget: R___ | Timeline: ___ weeks | Decision maker: ___
(Never send a proposal without this. Without budget = we quote R1M minimum.)

### THE 4-TIER SCOPE SYSTEM

**TIER 1 — QUIK FIX (R5K–R25K)**
- Single workflow, single user
- Standard integrations (WhatsApp, email)
- 2-week delivery
- Examples: Auto-responding WhatsApp bot, simple form → email automation

**TIER 2 — SOLUTION (R25K–R150K)**
- Multi-step workflow, up to 10 users
- Dashboard included
- 4–6 week delivery
- Examples: Full booking system, CRM integration, client portal

**TIER 3 — PLATFORM (R150K–R500K)**
- Complex multi-agent system, unlimited users
- Dedicated VM, full agent team
- 8–12 week delivery
- Examples: LAISA Agent OS, government tender systems

**TIER 4 — ENTERPRISE (R500K+)**
- Full organisation transformation
- Multiple VMs, custom agent training
- 12–24 week delivery
- Examples: National government AI infrastructure, bank-wide automation

---

## PART 5: TODAY'S ACTION — WHAT WE'RE DEPLOYING

### RIGHT NOW:
1. ✅ OGRE GAME PLAN (this document) — saved to workspace
2. ✅ PRD SYSTEM — saved to /workspace/PRD-SYSTEM/
3. ✅ DarkDesk product page — built and deployed
4. ✅ AutoForm Pro product page — built and deployed
5. ✅ Email cto@studex-group.com — configured in email system
6. ✅ Page-Agent + RileyJarvis — installation scripts ready
7. ✅ POPIA compliance pack — drafted for both products

### PORTFOLIO UPDATE — New Products Added:
- DarkDesk™ — Secure Business AI Companion
- AutoForm Pro™ — AI Web Agent for Business Processes
- Updated VM Agent products with POPIA badges

---

## PART 6: 30-DAY SPRINT PLAN

**Week 1 (6–13 July):**
- Deploy DarkDesk beta (based on RileyJarvis) on D@RK F@C#ORY VM
- Deploy AutoForm Pro beta (based on Page-Agent) on test server
- Send LAISA Phase A follow-up (close the deal this week)
- Register for SA DoH tender (closes 13 July)
- Configure cto@studex-group.com email routing

**Week 2 (14–20 July):**
- Sign first DarkDesk pilot client (target: SA law firm or medical practice)
- Submit Ghana Data Centre tender (closes 24 July)
- Run first demo of AutoForm Pro (target: gym chain or healthcare clinic)
- Integrate Page-Agent MCP into OGRE's OpenClaw

**Week 3 (21–27 July):**
- Deploy DarkDesk Enterprise for pilot client
- Submit Rwanda AI EOI
- Publish DarkDesk + AutoForm Pro to portfolio
- Run Devin vs Cursor vs Claude Code bake-off (ship results)

**Week 4 (28 July – 3 Aug):**
- First DarkDesk revenue received
- First AutoForm Pro revenue received
- Kenya KDEAP vendor registration complete
- Review tender results — adjust pipeline

---

## THE BOTTOM LINE

**Revenue targets for Q3 2026:**
- DarkDesk: 3 clients × R9,500/mo = R28,500/mo recurring
- AutoForm Pro: 3 clients × R4,500/mo = R13,500/mo recurring
- VM Agent tenders (3 active): R2–10M one-time
- LAISA Phase A: R350K signing this month

**Total pipeline this quarter: R15M+ reachable**
**Monthly recurring target by August: R50K/mo**
**Annual contracted by September: R600K+**

---

*OGRE COMPUTER — Q3 2026 GAME PLAN*
*Cipher Tr@ce · Dark Factory · Studex Group*
*Africa's Sovereign AI Infrastructure*
*cto@studex-group.com*
