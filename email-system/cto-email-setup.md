# OGRE EMAIL SYSTEM — cto@studex-group.com Setup

## Current Status
- Primary email: info@studexmeat.com (working, Gmail App Password)
- New intake email: cto@studex-group.com (TO BE CONFIGURED)

## Setup Required

### Option A: Gmail Workspace (Recommended)
Purchase Google Workspace for Studex Group:
1. Visit admin.google.com
2. Sign up for Google Workspace Business Starter (R41/user/mo)
3. Add user: cto@studex-group.com
4. Generate App Password for: cto@studex-group.com
5. Update /workspace/laisa-demo-deploy/.env:
   ```
   GMAIL_USER=cto@studex-group.com
   GMAIL_APP_PASSWORD=<app_password_here>
   ```

### Option B: Configure as Alias (Quick Fix)
Use existing info@studexmeat.com but ADD cto@ alias:
1. Gmail Settings → See all settings → Accounts → Add another email
2. Add cto@studex-group.com as an alias
3. Generate App Password for info@studexmeat.com
4. Update send-email.js to use info@studexmeat.com but FROM name = "CTO Office"

### Option C: Cloudflare Email Routing (Free)
1. Go to Cloudflare Dashboard → Email → Email Routing
2. Add domain: studex-group.com
3. Route cto@ to info@studexmeat.com (catches all cto@ emails)
4. NO Gmail App Password needed — pure forwarding

---

## OGRE Email Intake Flow (Automated)

```
cto@studex-group.com (receives all client submissions)
    ↓
Cloudflare Email Routing (free) → forwards to info@studexmeat.com
    ↓
OpenClaw email plugin (check inbox via cron)
    ↓
Cipher Tr@ce reads email → fills PRD template
    ↓
Proposal sent back via info@studexmeat.com
```

---

## INBOX RULES (Gmail Filters)

Create these Gmail filters on info@studexmeat.com:
- Subject contains "PRD" or "requirement" or "scope" → Label: OGRE INTAKE
- Subject contains "tender" or "RFP" or "government" → Label: OGRE TENDERS
- Subject contains "urgent" or "asap" or "help" → Label: OGRE PRIORITY
- No label: Standard triage

---

## Auto-Response Template (Gmail Vacation Responder)

```
Subject: We've received your message — OGRE Computer

Hi,

Thank you for reaching out to OGRE Computer, a division of Studex Group.

We've received your message and a member of our team will respond within 1 business day.

For urgent matters, WhatsApp us: [number to be added]

For a quick project scope, submit here:
https://z46kjpzjipb4.space.minimax.io/prd-form.html

— Cipher Tr@ce
OGRE Computer | Dark Factory | Studex Group
cto@studex-group.com
```

---

## Send-Email.js — Update Required

Current send-email.js reads from GMAIL_USER env var.
After cto@ setup, update .env:
```bash
GMAIL_USER=cto@studex-group.com
GMAIL_APP_PASSWORD=<new_app_password>
FROM_NAME="OGRE Computer — CTO Office"
REPLY_TO="cto@studex-group.com"
```

---

## CRON JOB — Email Check (Every 30 minutes)

Add cron job:
```json
{
  "name": "OGRE Email Intake Check",
  "schedule": { "kind": "every", "everyMs": 1800000 },
  "payload": { "kind": "systemEvent", "text": "Check cto@studex-group.com inbox for new client submissions. Flag anything marked URGENT. Log new intake to /workspace/PRD-SYSTEM/intake-log.md" },
  "sessionTarget": "main"
}
```

---

*Setup by Cipher Tr@ce · 3 July 2026 · cto@studex-group.com*
