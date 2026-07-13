# StudEx Super Agents — Domain Setup Guide
**studexagents.africa**

---

## 🌍 Why This Domain Matters

Your domain is your brand's anchor on the internet. Here's why `studexagents.africa` is the right choice:

- **Pan-African credibility** — `.africa` signals that StudEx is built *for* Africa, by Africans. It differentiates you from global competitors who use generic `.com` domains.
- **Brand authority** — A clean, purpose-built domain (`studexagents.africa`) is more memorable and trustworthy than a subdomain (`studexagents.someplatform.com`).
- **Professional email** — You can use `hello@studexagents.africa`, `billing@studexagents.africa`, etc. — clients will take you seriously.
- **HTTPS enforced** — Once configured, your domain will serve secure (TLS) connections, required for WhatsApp webhooks and payment integrations.
- **Future-proof** — Point this at your OpenClaw agent cloud, your marketing site, client portals — one domain, many services.

---

## 📋 What You Need First

Before registering, make sure you have:

- [ ] An ORGO VM with a public IPv4 address (get this from the orgo.ai dashboard — see below)
- [ ] A payment method (credit/debit card or PayPal) for the registrar
- [ ] Cloudflare account (recommended — free tier is sufficient, and you get DNS management + CDN + SSL in one place)

---

## 🔍 Step 1 — Get Your ORGO VM IP Address

> ⚠️ **ACTION REQUIRED — Do this in your browser**

1. Log in to your **orgo.ai dashboard** at [https://orgo.ai](https://orgo.ai)
2. Navigate to **Compute → Virtual Machines** (or your project → VM instance)
3. Copy the **public IPv4 address** of the VM that will host your StudEx agents
4. Keep this IP handy — you'll use it in Step 4

**Example:** `12.34.56.78`

---

## 🌐 Step 2 — Register Your Domain

> ⚠️ **ACTION REQUIRED — Do this in your browser**

You can register `.africa` domains through any ICANN-accredited registrar. Three recommended options:

### Option A — Namecheap (Recommended for simplicity)
- Visit: [https://www.namecheap.com](https://www.namecheap.com)
- Search: `studexagents.africa`
- Estimated cost: **~$10–12 USD/year** (~**R199–R230 ZAR/year** at ~R17/USD)
- Supports DNS management + free WHOIS privacy

### Option B — Cloudflare Registrar (Best value, tightly integrated with DNS)
- Visit: [https://dash.cloudflare.com](https://dash.cloudflare.com)
- Cloudflare Registrar offers transparent pricing with noMarkup on wholesale rates
- Estimated cost: **~$9–11 USD/year** (~**R160–R190 ZAR/year**)
- If you use Cloudflare for DNS (recommended), registrar + DNS are in one dashboard
- **NOTE:** Cloudflare Registrar is only available if you transfer the domain — for new registrations, use Namecheap first then transfer, or register directly via a ZACR-accredited registrar

### Option C — ZACR (.africa Registry — directly authoritative)
- Visit: [https://www.registry.net.za](https://www.registry.net.za) or [https://www.africa.bz](https://www.africa.bz) (ZACR accredited resellers)
- Local South African pricing, ZAR invoicing
- Estimated cost: **~R180–R250/year**
- Best option if you want a SA-based registrar and ZAR billing

**Action:** Choose one registrar, search for `studexagents.africa`, and register it. Payment is via card/PayPal.

---

## ⚙️ Step 3 — Set Up DNS: Point Domain to Your VM

> ⚠️ **ACTION REQUIRED — Do this in your registrar's DNS dashboard**

Once registered, go to your registrar's DNS management panel (or Cloudflare if using CF for DNS) and add the following DNS record:

| Record Type | Name/Host | Value | TTL |
|---|---|---|---|
| **A** | `@` (or `studexagents`) | `YOUR_VM_IP` (from Step 1) | Auto / 300s |

> **Example:** If your VM IP is `12.34.56.78`, the A record value is `12.34.56.78`

If you want `www.studexagents.africa` to also work (redirecting to the root):

| Record Type | Name/Host | Value | TTL |
|---|---|---|---|
| **CNAME** | `www` | `@` | Auto |

> **⏱️ DNS propagation:** Changes can take **5 minutes to 48 hours** to propagate globally. Most registrars update within 5–30 minutes.

---

## 🔒 Step 4 — Set Up SSL Certificate (Let's Encrypt via Certbot)

> 🤖 **AUTOMATED — OpenClaw handles this**
>
> This step is handled automatically by OpenClaw's provisioning system once DNS is pointing to your VM. OpenClaw runs certbot and renews certificates before expiry.

**For reference — what happens under the hood:**

1. Certbot requests a certificate from **Let's Encrypt** (free, automated CA)
2. It proves you control the domain via an HTTP-01 challenge (a file placed on your VM at `.well-known/acme-challenge/`)
3. Let's Encrypt issues a certificate valid for 90 days
4. Certbot is set up with a cron job or systemd timer to auto-renew

**You do NOT need to do anything manually** — OpenClaw manages this.

> ⚠️ **ACTION REQUIRED — Verify DNS has propagated before OpenClaw can get the SSL cert**
>
> After setting DNS in Step 3, wait ~10–15 minutes, then confirm propagation using: [https://dnschecker.org/#A/studexagents.africa](https://dnschecker.org/#A/studexagents.africa)
>
> All green ticks = DNS is live. Then OpenClaw can obtain the SSL cert.

---

## 🖥️ Step 5 — Nginx VHost Configuration

> 🤖 **AUTOMATED — OpenClaw handles this**
>
> OpenClaw generates and applies the correct Nginx vhost configuration automatically when the domain is added.

**Reference vhost block (for reference — do not edit manually):**

```nginx
# /etc/nginx/sites-available/studexagents.africa
server {
    listen 80;
    server_name studexagents.africa www.studexagents.africa;

    # Redirect all HTTP → HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name studexagents.africa www.studexagents.africa;

    # SSL certificates managed by Let's Encrypt / Certbot
    ssl_certificate     /etc/letsencrypt/live/studexagents.africa/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/studexagents.africa/privkey.pem;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Proxy to OpenClaw / n8n running locally
    location / {
        proxy_pass http://127.0.0.1:3000;  # Adjust port to match your OpenClaw instance
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Webhook path for WhatsApp / Paystack (no caching)
    location /webhook/ {
        proxy_pass http://127.0.0.1:5678/webhook/;  # n8n default port
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

> ⚠️ **ACTION REQUIRED — Tell OpenClaw your domain**
>
> Once registered, provide OpenClaw with:
> 1. Your domain: `studexagents.africa`
> 2. Your VM IP address (from Step 1)
>
> OpenClaw will configure Nginx, obtain the SSL certificate, and point the site live.

---

## 📅 Estimated Timeline

| Task | Duration | Who |
|---|---|---|
| Register domain | 10–20 min | You |
| DNS propagation | 5 min – 48 hrs | You (Cloudflare/Nameserver) |
| SSL certificate provisioning | ~5 min | OpenClaw (automated) |
| Nginx + site verification | ~5 min | OpenClaw (automated) |
| **Total** | **1–2 days** (most of which is waiting for DNS) | |

---

## 💡 Quick Reference Checklist

- [ ] Get VM public IP from orgo.ai dashboard
- [ ] Register `studexagents.africa` (Namecheap / Cloudflare / ZACR)
- [ ] Set A record → VM IP in registrar DNS panel
- [ ] Wait for DNS propagation (use dnschecker.org to verify)
- [ ] Share domain + VM IP with OpenClaw
- [ ] OpenClaw auto-configures SSL + Nginx
- [ ] Done! Domain live at `https://studexagents.africa`

---

*Need help with any step? Ask OpenClaw to walk through the orgo.ai dashboard or DNS setup with you.*
