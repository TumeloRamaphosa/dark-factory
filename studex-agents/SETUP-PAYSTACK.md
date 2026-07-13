# StudEx Super Agents — Paystack Merchant Setup Guide
**Accept South African Rand (ZAR) payments from your clients**

---

## 💰 Why Paystack?

Paystack is the go-to payment gateway for South African businesses. Here's why it fits StudEx Super Agents perfectly:

- **ZAR-native** — Full support for South African Rand. No currency conversion, no USD fees.
- **Instant settlement** — Receive funds in your SA bank account the next business day (T+1)
- **Mobile money** — Support for MTN MoMo, Vodacom M-Pesa, Cell C, and other SA/eastern African mobile wallets
- **Multiple payment methods** — Cards (Visa/Mastercard), EFT (South African bank transfers), USSD, mobile money
- **No monthly fee (Starter tier)** — Paystack charges **2.9% per transaction** only when you make money. No setup fee, no monthly subscription.
- **Developer-friendly** — Clean REST API, webhooks, and native n8n integration
- **Pan-African expansion** — Supports Nigeria, Ghana, Kenya, Uganda, and South Africa
- **Trusted by SA businesses** — Used by thousands of SA startups, e-commerce stores, and SaaS companies

---

## 📋 What You Need to Get Started

Before signing up, gather these documents:

- [ ] **CIPC Registration Certificate** — Your business must be registered ( Pty Ltd, LLC, Sole Proprietor)
- [ ] **South African Bank Account** — In the business name (or your personal account if sole proprietor)
- [ ] **Your SA ID or Passport** — For identity verification
- [ ] **Proof of Address** — Utility bill or bank statement (less than 3 months old)
- [ ] **Business Website/Platform** — A landing page or description of your service (can be basic)

---

## 🚀 Step 1 — Sign Up for Paystack

> ⚠️ **ACTION REQUIRED — Do this in your browser**

1. Go to: [https://paystack.com](https://paystack.com)
2. Click **"Get Started"** or **"Sign Up"**
3. Choose **"Business Account"** (not "Personal")
4. Enter your details:
   - **Business name:** StudEx Super Agents
   - **Business email:** Your official email (this is where payout notifications go)
   - **Phone number:** SA mobile (+27...)
   - **Business type:** Select appropriate type (Sole Proprietor / Private Company / etc.)
5. Verify your email via the confirmation link Paystack sends
6. Log in to your Paystack dashboard

---

## 🏢 Step 2 — Complete Business Verification (KYC)

> ⚠️ **ACTION REQUIRED — Upload your documents**

After sign-up, Paystack requires identity and business verification. This is mandatory before you can receive real payments.

**In the Paystack dashboard:**

1. Go to **Settings → Business Information**
2. Fill in your business details:
   - **Registered Business Name:** Must match CIPC exactly
   - **Business Type:** Pty Ltd, LLC, Sole Proprietor, etc.
   - **Industry:** Software / Technology / AI Services
   - **Business Address:** Your registered address
   - **Website:** `https://studexagents.africa` (once domain is live)

3. Go to **Settings → Bank Account**
4. Add your **South African business bank account**:
   - Bank name, account number, account type
   - This is where Paystack deposits your earnings

5. Go to **Settings → Verification**
6. Upload:
   - **CIPC Registration Certificate** (PDF or image)
   - **Director/Owner ID** (SA ID card or passport)
   - **Proof of Address** (utility bill or bank statement)

> ⏱️ **Verification timeline:** Typically **1–3 business days** for South African businesses. Sole proprietors can sometimes be verified within hours.

---

## 🔑 Step 3 — Get Your Paystack API Keys

> ⚠️ **ACTION REQUIRED — Copy and store these securely**

Once your account is verified and active:

1. In the Paystack dashboard, go to **Settings → API Keys & Webhooks**
2. You'll see two keys:

| Key | What it is | Used for |
|---|---|---|
| **Public Key** | Starts with `pk_live_...` (or `pk_test_...` for sandbox) | Client-side (n8n frontend, payment page) |
| **Secret Key** | Starts with `sk_live_...` (or `sk_test_...` for sandbox) | Server-side (n8n backend, OpenClaw) |

> ⚠️ **CRITICAL — Store your Secret Key securely.** Never expose it in client-side code or commit it to repositories. OpenClaw stores it in environment variables.

**Test vs Live mode:**
- During setup and testing, use **test keys** (`pk_test_` / `sk_test_`)
- Once ready for real payments, switch to **live keys** (`pk_live_` / `sk_live_`)
- OpenClaw will use live keys in production

---

## 🔗 Step 4 — Integration Points

### Integration A — Paystack Payment Links (No Code)

> ⚠️ **ACTION REQUIRED — Generate your first payment link**

Payment links are the fastest way to collect payment — no website checkout required:

1. In Paystack dashboard, go to **Payment Links → Create Payment Link**
2. Set:
   - **Name:** "StudEx Agent Package — Starter"
   - **Amount:** R499 (or your pricing)
   - **Currency:** ZAR
   - **Description:** "1-month AI Agent subscription"
3. Click **"Create"**
4. Paystack gives you a unique URL, e.g.:
   ```
   https://paystack.com/pay/studex-starter-499
   ```
5. Share this link via WhatsApp, email, or any channel

**How OpenClaw uses payment links:**
> 🤖 **AUTOMATED — OpenClaw generates personalized payment links**
>
> When OpenClaw creates a client invoice, it automatically:
> 1. Generates a unique Paystack payment link via the API
> 2. Sends it to the client via WhatsApp
> 3. Tracks payment status via webhook
> 4. Activates the client's agent access upon payment confirmation

---

### Integration B — n8n Paystack Node (Automated Billing)

> 🤖 **AUTOMATED — OpenClaw configures this n8n workflow**

**n8n workflow architecture:**

```
[Client subscribes / requests invoice]
        ↓
[n8n: Paystack Node — Create Transaction]
  action: initialize
  email: {client_email}
  amount: {price_in_kobo}  ← ZAR × 100 (Paystack uses kobo/sens)
  currency: ZAR
        ↓
[n8n: Extract authorization_url]
  → sends payment link to client via WhatsApp
        ↓
[Client pays via link]
        ↓
[Paystack sends webhook to n8n]
  POST https://studexagents.africa/webhook/paystack
        ↓
[n8n: Paystack Trigger node]
  Verifies: webhook signature (Paystack secret key)
  Checks: event.type == "charge.success"
        ↓
[n8n: OpenClaw action node]
  → Activate client account
  → Set subscription end date
  → Send confirmation via WhatsApp
  → Create invoice record
```

**n8n Paystack node setup:**

1. Add the **Paystack node** in n8n (official integration available in n8n)
2. Authenticate with your **Secret Key** (sk_live_...)
3. Use the following key operations:
   - `initialize` — Create a payment transaction and get a payment URL
   - `verify` — Verify a payment by reference
   - `trigger` — Receive webhooks from Paystack (payment success/failure)

**Important — Amount format:**
- Paystack amounts are in **smallest currency unit**
- For ZAR: **R1 = 100 kobo**
- Example: R499 = `49900`

---

### Integration C — OpenClaw Invoice Generation

> 🤖 **AUTOMATED — OpenClaw handles the full billing flow**

OpenClaw manages the client billing cycle:

1. **Client requests a plan** via WhatsApp
2. **OpenClaw** generates an invoice (in ZAR):
   - Plan: "StudEx Agent — Starter"
   - Amount: R499/month
   - Invoice #: INV-2024-001
3. **OpenClaw** calls Paystack API to create a payment link
4. **OpenClaw** sends the link via WhatsApp:
   ```
   💳 Your StudEx invoice is ready!
   
   Invoice: INV-2024-001
   Amount: R499.00
   
   Pay securely here:
   [https://paystack.com/pay/studex-inv-001]
   
   Pay within 24 hours to activate your agent.
   ```
5. **Client pays** via the link (card, EFT, or mobile money)
6. **Paystack webhook fires** to OpenClaw/n8n
7. **OpenClaw** activates the agent and sends confirmation

---

## 🪝 Step 5 — Set Up Paystack Webhooks

> ⚠️ **ACTION REQUIRED — Configure webhook endpoint in Paystack**

The webhook is how Paystack tells OpenClaw when a payment has succeeded.

**In Paystack dashboard:**

1. Go to **Settings → Webhooks**
2. Click **"Add Webhook URL"**
3. Enter:
   ```
   https://studexagents.africa/webhook/paystack
   ```
4. Select events to listen for:
   - ✅ `charge.success` — Payment confirmed (activate client)
   - ✅ `charge.failed` — Payment failed (notify client)
   - ✅ `subscription.create` — New subscription started
   - ✅ `subscription.disable` — Subscription cancelled
   - ✅ `transfer.success` — Payout completed to your bank

> ⚠️ **ACTION REQUIRED — In n8n**
>
> Set up a Paystack Trigger node in n8n to receive the webhook:
> 1. Add: **"Paystack Trigger"** node
> 2. Set webhook URL: `https://studexagents.africa/webhook/paystack`
> 3. n8n will give you a unique webhook URL — use this in the Paystack dashboard
> 4. The Paystack node handles signature verification automatically

**Webhook verification (for reference — OpenClaw handles this):**
- Paystack signs every webhook with an `x-paystack-signature` header
- OpenClaw/n8n verifies this against your secret key to prevent spoofed payment notifications

---

## 💳 Payment Methods Available to Clients

Once integrated, your clients can pay via:

| Method | How it works | Settlement |
|---|---|---|
| **Visa / Mastercard** | Card payment | T+1 |
| **EFT (South Africa)** | Instant or next-day bank transfer | T+1 |
| **Mastercard** | International cards | T+1 |
| **MTN MoMo** | MTN mobile money | T+1 |
| **Vodacom M-Pesa** | Vodacom mobile money | T+1 |
| **USSD** | *#XXX# code payment | T+1 |

> 💡 **Tip:** For South African clients, EFT and card payments are the most popular. Mobile money (MoMo) is great for clients in Kenya, Uganda, and Ghana — enabling pan-African expansion.

---

## 🏦 Settlement: Getting Your Money

**Settlement timeline:**
- Payments are settled to your SA bank account on **T+1 working days**
- "T+1" means next business day (not weekends or public holidays)
- Minimum payout threshold: **R300** (below this, payout rolls over)

**To check settlement status:**
- Paystack Dashboard → **Transactions → Settlements**
- Each payout shows gross amount, fees deducted, and net amount

**Fee breakdown per transaction (Starter tier):**

| Transaction Amount | Fee (2.9%) | You Receive |
|---|---|---|
| R100 | R2.90 | R97.10 |
| R499 | R14.47 | R484.53 |
| R999 | R28.97 | R970.03 |
| R1,999 | R57.97 | R1,941.03 |

> 💰 **No monthly fee** on the Starter plan. You only pay when you make money.

---

## 💰 Cost Summary

| Item | Cost |
|---|---|
| Paystack account | **Free** |
| Monthly fee (Starter) | **R0** |
| Transaction fee | **2.9% per successful payment** |
| Chargebacks / disputes | R0 (Paystack handles) |
| n8n cloud (Starter) | ~R288/month |
| **Total platform cost** | **2.9% per transaction + R288/month n8n** |

> 📊 **Example:** If you charge R499/month and have 10 clients, your monthly revenue is R4,990. Paystack takes 2.9% = R144.71. You keep ~R4,845.29.

---

## 📅 Estimated Timeline

| Task | Duration | Who |
|---|---|---|
| Sign up at paystack.com | 15 min | You |
| Business KYC verification | 1–3 days | Paystack (automated review) |
| Add bank account | 10 min | You |
| Get API keys | 5 min | You |
| Configure webhook in Paystack | 5 min | You |
| Build n8n workflow | 30 min | OpenClaw (automated) |
| Test payment flow | 15 min | You + OpenClaw |
| **Total (ready to accept payments)** | **1–4 days** | |

---

## 📞 Paystack Support

- **Help docs:** [https://paystack.com/help](https://paystack.com/help)
- **SA support:** `support@paystack.com` or `+27 10 500 2500`
- **Dashboard:** [https://dashboard.paystack.com](https://dashboard.paystack.com)

---

## 📋 Quick Reference Checklist

- [ ] Sign up at [https://paystack.com](https://paystack.com) — free account
- [ ] Gather: CIPC cert, SA bank account, ID, proof of address
- [ ] Complete business KYC verification (Settings → Business Information)
- [ ] Add your SA bank account for payouts (Settings → Bank Account)
- [ ] Wait for verification approval (1–3 business days)
- [ ] Get Public Key + Secret Key (Settings → API Keys & Webhooks)
- [ ] Share Secret Key with OpenClaw (securely — never in plain text)
- [ ] Set webhook URL in Paystack: `https://studexagents.africa/webhook/paystack`
- [ ] OpenClaw configures n8n workflow (automated)
- [ ] Test with a small payment (use test mode first)
- [ ] Switch to live keys when ready to accept real payments

---

## 🤖 What OpenClaw Manages

> 🤖 **AUTOMATED — Full billing automation**
>
> Once Paystack is configured, OpenClaw handles:
> - Invoice generation in ZAR (auto-numbered, client-specific)
> - Unique Paystack payment link creation per invoice
> - Sending invoices + links via WhatsApp to clients
> - Webhook processing (payment confirmed → activate client)
> - Webhook processing (payment failed → notify client)
> - Subscription renewal reminders via WhatsApp
> - Monthly billing cycle management
> - Revenue tracking and reporting
> - Receipt generation and sending

---

*Paystack + WhatsApp = the complete SA billing stack. Clients browse your service on WhatsApp, pay via a link, and get charged monthly — all automated.*
