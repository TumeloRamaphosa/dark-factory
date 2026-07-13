# LAISA Agent OS — Email Configuration

## To Enable Email Sending

The demo server has email endpoints ready. You need to configure one of the following:

### Option 1: Gmail SMTP (Free — Recommended for Demo)

Create a `.env` file with these values:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
FROM_NAME=LAISA Agent
FROM_EMAIL=agent@studexgroup.co.za
```

**To get a Gmail App Password:**
1. Go to myaccount.google.com → Security
2. Enable 2-Step Verification
3. Search "App Passwords" → Create new
4. Name it "LAISA Agent OS"
5. Copy the 16-character password

### Option 2: SendGrid (Better for Production)

```env
SENDGRID_API_KEY=SG.your-api-key-here
FROM_EMAIL=agent@studexgroup.co.za
```

Sign up: sendgrid.com (free tier: 100 emails/day)

### Option 3: Resend (Easiest)

```env
RESEND_API_KEY=re_your-api-key
FROM_EMAIL=agent@studexgroup.co.za
```

Sign up: resend.com (free tier: 3,000 emails/month)

---

## Agent Email Address Options

| Option | Email | Best For |
|--------|-------|----------|
| Gmail with custom domain | agent.laisa@gmail.com | Quick demo |
| Google Workspace | agent@studexgroup.co.za | Professional — recommended |
| Resend + custom domain | agent@studexgroup.co.za | Production, high volume |
| SendGrid + custom domain | agent@studexgroup.co.za | Enterprise, high volume |

---

## Start the Demo Server with Email

```bash
cd /workspace/laisa-demo-deploy
cp .env.example .env
# Edit .env with your credentials
node server.js
```

---

## Email Endpoints Available

```
POST /api/send-demo
Body: { to, subject, message }
Response: { success: true, message_id }

POST /api/agent-contact
Body: { name, email, company, interest, message }
Response: { success: true, message_id }
```

---

## Email Templates

All templates are in `/workspace/laisa-demo-deploy/email-templates/`:

- `welcome.txt` — Welcome email for new leads
- `proposal.txt` — LAISA Agent OS proposal introduction
- `demo-link.txt` — Demo access email with all URLs
- `follow-up.txt` — 3-day follow-up for leads
- `invoice.txt` — Invoice/proforma document