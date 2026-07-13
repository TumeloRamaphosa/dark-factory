# StudEx Super Agents — WhatsApp Business API Setup Guide
**Connect your AI agents to WhatsApp**

---

## 📱 Why WhatsApp Business API?

WhatsApp is South Africa's dominant messaging platform — over **90% of SA internet users** have WhatsApp. For an AI agent cloud service targeting SA businesses, WhatsApp is the obvious channel:

- **Massive reach** — No app install needed; clients already have WhatsApp
- **Rich messaging** — Send text, images, documents, buttons, lists, and location
- **Trusted brand** — Green tick (official business account) builds client confidence
- **Low cost** — Free tier: 1,000 messages/month; paid tiers from ~$0.05/msg
- **24/7 availability** — AI agents handle queries around the clock
- **n8n integration** — Webhook-driven workflows connect WhatsApp directly to OpenClaw

---

## ⚡ Quick Decision: Which Option?

| | Option A — Official Meta | Option B — Ultramsg |
|---|---|---|
| **Speed** | 3–7 days (Meta review) | 1–2 days (instant) |
| **Cost** | Free tier: 1,000 msgs/month | ~$12/month (Starter plan) |
| **Setup complexity** | High (Meta Business, app, webhooks) | Low (one dashboard) |
| **Business verification** | Required (CIPC + ID) | Not required |
| **Best for** | High-volume, official deployments | Fast MVP, testing, solopreneurs |

> **Recommendation for StudEx MVP:** Start with **Option B (Ultramsg)** to get live in 24–48 hours. Switch to Option A (Official Meta) once you have paying clients and want the verified green tick.

---

## 🔐 Option A — Official Meta WhatsApp Business API

> ⏱️ **Timeline: 3–7 days** (Meta business verification takes time)

### Step 1 — Create a Meta Business Account

> ⚠️ **ACTION REQUIRED — Do this in your browser**

1. Go to: [https://business.facebook.com](https://business.facebook.com)
2. Click **"Create Account"**
3. Enter your business details:
   - **Business name:** StudEx Super Agents
   - **Work email:** Use a real email (not a free provider if possible)
   - **Name:** Your full legal name (as per CIPC)
   - **Phone number:** A SA number you can receive SMS on
4. Verify your email via the confirmation email from Meta
5. Complete the initial business profile (address, website, industry)

---

### Step 2 — Apply for WhatsApp Business API Access

> ⚠️ **ACTION REQUIRED — Do this in your browser**

1. Go to: [https://business.whatsapp.com](https://business.whatsapp.com)
2. Log in with your Meta Business account
3. Click **"Get Started"** → **"API Access"**
4. Fill in your business details:
   - **Display name:** `StudEx Super Agents` (must be recognizable — no generic names)
   - **Categories:** Select "Software" or "Technology" as primary category
   - **Description:** "AI agent cloud service for South African businesses"
5. Agree to WhatsApp Business Terms of Service
6. Submit for review

> **⏱️ Meta review:** Typically 1–3 business days. You'll receive an email when approved.

---

### Step 3 — Create Your Phone Number (WhatsApp Business Number)

> ⚠️ **ACTION REQUIRED — You need a dedicated phone number**

**Critical requirements:**
- The number must **NOT have an active WhatsApp account** — deactivate/delete any existing WhatsApp first
- Use a **landline or mobile number** (SA format: +27 XX XXX XXXX)
- SIM card should be active (can receive SMS/calls for verification code)
- You can port an existing number later if needed

**In the WhatsApp Business Manager dashboard:**

1. Navigate to **"Phone Numbers"** → **"Add Phone Number"**
2. Enter the SA number (+27...)
3. Meta will send a 6-digit verification code via **SMS or voice call**
4. Enter the code to verify
5. Set up your **business profile**:
   - Profile photo (optional but recommended — use StudEx logo)
   - Description: "AI Agent Cloud — StudEx Super Agents"
   - Address, website URL, email

---

### Step 4 — Get Your API Credentials

> ⚠️ **ACTION REQUIRED — Copy and store these securely**

Once your number is verified, go to **"API Setup"** in the WhatsApp Business Manager:

1. Click **"API"** tab on your phone number
2. Note down these two values:

| Credential | Where to find it |
|---|---|
| **Phone Number ID** | Shows under your phone number in WhatsApp Business Manager |
| **WhatsApp Business Account (WABA) ID** | Shows in Account Information |
| **System User Access Token** | Meta Business → Settings → System Users → Create a system user → Generate token |

> ⚠️ **Store these credentials safely** — treat them like passwords. Do not commit them to code repositories.

**To generate an access token:**
1. Go to: [https://business.facebook.com](https://business.facebook.com) → Settings → System Users
2. Create a **System User** (name it: `studex-whatsapp`)
3. Assign the **WhatsApp Business Assets** role
4. Generate a **permanent token** (not temporary)
5. Save this token — you'll paste it into n8n

---

### Step 5 — Set Up Webhooks (Connect to n8n)

> 🤖 **AUTOMATED — OpenClaw configures the webhook routing**

The WhatsApp webhook receives incoming messages and forwards them to your n8n workflow:

1. In **WhatsApp Business Manager** → your phone number → **Messaging API**
2. Click **"Edit** next to Webhook URL"
3. Enter your webhook URL:
   ```
   https://studexagents.africa/webhook/whatsapp
   ```
   *(n8n default: `https://your-domain.com/webhook/whatsapp`)*
4. Enter a **Verify Token** — a random string you'll match in n8n (e.g., `studex_whatsapp_verify_2024`)
5. Click **"Verify and Save"**

**In n8n:**
1. Create a new workflow
2. Add a **"WhatsApp Trigger"** node (n8n community node or Ultramsg node)
3. Set the **Verify Token** to match what you entered in Meta
4. The node will auto-verify when you save

---

### Step 6 — n8n Workflow: WhatsApp → OpenClaw Agent → Respond

> 🤖 **AUTOMATED — OpenClaw builds and maintains this workflow**

**Workflow architecture:**

```
[WhatsApp Incoming Message]
        ↓
[WhatsApp Trigger Node]  ← receives the webhook
        ↓
[HTTP Request Node]  ← calls OpenClaw agent API
  POST https://studexagents.africa/api/agent
  Body: { "message": "{{ $json.message.text }}", "from": "{{ $json.from }}" }
        ↓
[WhatsApp Send Message Node]  ← sends the AI response back
  To: {{ $json.from }}
  Message: {{ $json.reply }}
```

**Key notes for the n8n workflow:**
- Use the **WhatsApp Business API node** in n8n (community version available in n8n community nodes)
- Pass through the sender's phone number so OpenClaw knows who it's talking to
- OpenClaw maintains conversation context per client using session memory
- Set up a **conversational AI** node or call OpenClaw's API directly

---

### Cost Breakdown — Option A

| Item | Cost |
|---|---|
| Meta Business Account | **Free** |
| WhatsApp Business API (free tier) | **Free** — 1,000 msg/month |
| 1,000 additional messages | ~$0.05/msg (~R0.90/msg at R18/USD) |
| n8n cloud (Starter) | ~$16/month (~R288/month) |
| **Estimated monthly total (MVP)** | **~R288/month + usage** |

---

## 🔥 Option B — Ultramsg (Recommended for Fast MVP)

> ⏱️ **Timeline: 1–2 days** (can be live same day)
> 💰 **Cost: ~$12/month** (~R216/month at R18/USD)

Ultramsg is a WhatsApp Gateway provider that handles the Meta infrastructure for you. You get a hosted WhatsApp API without needing a Meta Business account or going through Meta's review process.

### Step 1 — Create an Ultramsg Account

> ⚠️ **ACTION REQUIRED — Do this in your browser**

1. Go to: [https://ultramsg.com](https://ultramsg.com)
2. Click **"Get Started"** or **"Sign Up"**
3. Use your **email + password** to create an account
4. Choose your plan — **Starter ($12/month)** is sufficient for MVP:
   - 1 WhatsApp number
   - 1,000 messages/month included
   - REST API + Webhook support
   - n8n integration built-in

> 💳 Payment: Credit/debit card or PayPal. USD billing.

---

### Step 2 — Connect Your WhatsApp Number (QR Code)

> ⚠️ **ACTION REQUIRED — You need a phone number**

**In your Ultramsg dashboard:**

1. Go to **"Instances"** → **"New Instance"**
2. Choose **"WhatsApp"** type
3. Name it: `studex-agents`
4. Open the instance → Click **"QR Code"** tab
5. Open **WhatsApp on your phone** → Settings → Linked Devices → Link a Device
6. Scan the QR code from Ultramsg
7. Your WhatsApp is now connected to Ultramsg (your personal or a dedicated number)

> ⚠️ **Note:** The phone must stay online (not necessarily connected to WiFi, just the app running or the device online). If you need a dedicated number, consider getting a second SIM or an eSIM.

---

### Step 3 — Get Your Ultramsg API Credentials

> ⚠️ **ACTION REQUIRED — Copy and store these**

In your Ultramsg dashboard:

1. Go to **"Instances"** → your instance → **"API"** tab
2. Note your **Instance ID** (e.g., `instance12345`)
3. Note your **API Token** (from Account → API Token)

| Credential | Where to find it |
|---|---|
| Instance ID | Instances → [your instance] → API |
| API Token | Account → API Token |
| API URL | `https://api.ultramsg.com/instance{token}/` |

---

### Step 4 — Set Up Webhook (Connect to n8n)

> ⚠️ **ACTION REQUIRED — In Ultramsg dashboard**

1. Go to your instance → **"Webhooks"** tab
2. Set **Webhook URL** to your n8n webhook URL:
   ```
   https://studexagents.africa/webhook/whatsapp
   ```
3. Enable: `Incoming Message`, `Outgoing Message`, `Connection Status`
4. Save

---

### Step 5 — n8n Workflow: Ultramsg → OpenClaw → Respond

> 🤖 **AUTOMATED — OpenClaw builds and maintains this workflow**

**Ultramsg + n8n is the easiest integration:**

```
[Incoming WhatsApp Message]
        ↓
[n8n "Ultramsg Trigger" node]  ← receives webhook from Ultramsg
        ↓
[HTTP Request node]
  POST https://api.ultramsg.com/instanceXXXXX/messages/chat
  Headers: Content-Type: application/x-www-form-urlencoded
  Body:
    token={your_api_token}
    to={sender_phone}
    body={AI_response_from_openclaw}
        ↓
[OpenClaw Agent node]
  Receives: sender's message + phone number
  Processes: OpenClaw AI agent with client context
  Returns: AI-generated response
```

**n8n configuration:**
- Use the **"UltraMsg" node** in n8n (search in community nodes or use HTTP Request)
- Instance ID and token go into n8n credentials
- Phone numbers are in **international format** (e.g., `27821234567@c.us` for SA)

---

### Sending Rich Messages (Optional)

> 🤖 **AUTOMATED — OpenClaw handles message formatting**

Once connected, OpenClaw can send:
- **Text messages** (normal replies)
- **Images** (e.g., invoice PDFs, charts)
- **Documents** (PDF invoices, contracts)
- **Buttons** (Quick Reply options)
- **Lists** (structured menu options)
- **Location** (business address)

Example n8n node output for an image:
```json
{
  "action": "sendImage",
  "to": "27821234567@c.us",
  "image": "https://studexagents.africa/invoices/invoice-001.pdf"
}
```

---

## 🧪 Testing Your Integration

> ⚠️ **ACTION REQUIRED — Do this yourself to verify**

**Test sequence:**

1. Open WhatsApp on your phone
2. Send a message to **your own WhatsApp Business number** (the one connected to Ultramsg/Meta)
3. Check your n8n workflow — you should see a webhook event come in
4. If OpenClaw is configured, you should receive an AI reply within seconds
5. Check the Ultramsg/Meta dashboard for delivery status

**Troubleshooting:**
- No webhook received? → Check Ultramsg/Meta webhook URL is correct
- Webhook received but no reply? → Check n8n workflow is active + OpenClaw API is reachable
- SSL error? → Ensure `https://` is set in webhook URL

---

## 📅 Estimated Timeline

| Task | Option A (Meta) | Option B (Ultramsg) |
|---|---|---|
| Account creation | 20 min | 20 min |
| Business verification | 1–3 days | Not needed |
| Phone number setup | 10 min | 10 min (QR scan) |
| API credentials | 10 min | 10 min |
| n8n webhook setup | 30 min | 30 min |
| OpenClaw integration | 30 min | 30 min |
| **Total** | **3–7 days** | **1–2 days** |

---

## 💡 Quick Reference Checklist

### For Option B (Ultramsg — Recommended MVP):
- [ ] Sign up at [https://ultramsg.com](https://ultramsg.com) — $12/month
- [ ] Create instance, scan QR code with your WhatsApp number
- [ ] Get Instance ID + API Token from Ultramsg dashboard
- [ ] Set Ultramsg webhook URL to `https://studexagents.africa/webhook/whatsapp`
- [ ] Share Instance ID + Token with OpenClaw
- [ ] OpenClaw builds the n8n workflow
- [ ] Test by sending a WhatsApp message to your connected number

### For Option A (Official Meta — Later Stage):
- [ ] Create Meta Business account at [https://business.facebook.com](https://business.facebook.com)
- [ ] Apply for WhatsApp Business API at [https://business.whatsapp.com](https://business.whatsapp.com)
- [ ] Wait for business verification (1–3 days)
- [ ] Add a dedicated phone number (no active WhatsApp)
- [ ] Generate system user token in Meta Business settings
- [ ] Configure webhook URL in WhatsApp Business Manager
- [ ] Share Phone Number ID + WABA ID + Token with OpenClaw
- [ ] OpenClaw builds the n8n workflow

---

*Both options route through n8n → OpenClaw. The difference is who manages the WhatsApp infrastructure — Meta directly (A) or Ultramsg as your gateway provider (B). OpenClaw handles the AI response logic regardless of which option you choose.*
