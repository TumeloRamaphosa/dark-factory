# OGRE Email Queue — Content Format Guide
## Studex Group / OGRE Computer / Dark Factory

Queue files in this directory are automatically read by `/workspace/email-system/send-email.js`
and rendered as branded HTML emails. Keep this format consistent for best results.

---

## File Naming

```
morning-brief-YYYY-MM-DD.txt
evening-digest-YYYY-MM-DD.txt
research-brief-YYYY-MM-DD.txt
```

- Date is **South Africa date** (UTC+2)
- System checks today's date first, then yesterday's — so late-night writes still send
- Files persist after sending

---

## Required Sections (Morning Brief)

```
═══════════════════════════════════════
SECTION HEADER (all caps, === or === lines)
═══════════════════════════════════════

Content lines here. Each non-empty line becomes a list item in the email.
```

**Minimum sections:**
1. TOP 3 PRIORITIES TODAY
2. GLOBAL AI LANDSCAPE (country entries)
3. IMMEDIATE ACTION MATRIX

---

## Required Sections (Evening Digest)

**Minimum sections:**
1. MAJOR: what shipped today
2. OPPORTUNITY: what to act on
3. TOMORROW: priorities for next day

---

## Required Sections (Research Brief)

**Minimum sections:**
1. EXECUTIVE SUMMARY
2. COUNTRY INTELLIGENCE BRIEFS (━━ USA ━━ style)
3. ACTION ITEMS

---

## Styling Conventions

| Symbol | Meaning | Renders as |
|--------|---------|------------|
| ✅     | Completed | Green bullet |
| ❌     | Blocked   | Red bullet |
| 🚀     | Milestone | Gold bullet |
| →      | Action item | Arrow bullet |
| ━━     | Country divider | Large label |
| [1]    | Priority | Numbered list |

---

## Example: Morning Brief

```
OGRE MORNING BRIEF — STUDEX GROUP
Date: Monday, 29 June 2026 | 08:00 AM SAST
═══════════════════════════════════════

TOP 3 PRIORITIES TODAY
═══════════════════════════════════════
1. Flutterwave integration — African billing layer for OGRE client portal
2. Ghana AI Ministry outreach — $250M programme proposal due THIS WEEK
3. DeepSeek deployment — POPIA-compliant stack for SA government clients

GLOBAL AI LANDSCAPE — 29 JUNE 2026
═══════════════════════════════════════

USA: GPT-5 embedded in autonomous coding agents. $730B OpenAI valuation.
→ OGRE action: Deploy GPT-5 + Claude 4.5 workflow scaffolding; 3 pilot clients

Nigeria: Flutterwave secured full banking licence (April 2026).
→ OGRE action: Integrate Flutterwave API immediately

Ghana: $250M national AI strategy. Contracts being signed NOW.
→ OGRE action: Submit partnership proposal TODAY

IMMEDIATE ACTION MATRIX (30/90/180 DAYS)
═══════════════════════════════════════

BY 29 JULY (30 days):
[1] Deploy OGRE Agent Stack — GPT-5 + Claude 4.5 + DeepSeek
[2] Flutterwave Integration — African billing for OGRE clients
[3] Ghana AI Strategy — Formal partnership proposal
```

---

## Tips

- **Be concise** — punchy bullets over long paragraphs
- **Lead with action** — most important item first
- **Date stamp everything** — always put the date in the header
- **Keep under 600 lines** — email clients handle it better

---

*Cipher Tr@ce · Dark Factory · OGRE Computer*
*Code: /workspace/email-system/send-email.js*
