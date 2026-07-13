---
type: concept
name: BMAD Model
domain: business-model
created: 2026-06-15
tags: [business-model, pricing, dark-factory]
---

# BMAD Model — Build Me A Dashboard

## What Is BMAD?

BMAD = **Build Me A Dashboard**. A fixed-price product development model.

**Price:** R29 per product (50% now / 50% on approval)

## How It Works

```
1. Client submits idea (voice note, Figma link, Notion, or typed)
         ↓
2. Dark Factory AI analyses → generates complete PRD
         ↓
3. CodeRabbit reviews every PR
         ↓
4. Multi-agent build team (Builder Agent + QwenPaw)
         ↓
5. Auto-deploy to Vercel (or client's preferred host)
         ↓
6. Client reviews → approves or requests changes
         ↓
7. Final delivery + 30-day support
```

## Why R29?

- **Affordable entry point** — Client can start with one product
- **Predictable revenue** — 50/50 payment terms de-risk the transaction
- **Scalable** — Agents handle volume, humans handle exceptions
- **African pricing** — Accessible to SA small businesses

## What's Included at R29

- PRD generation from voice/text/Figma/Notion
- Full-stack development (Next.js + Prisma + Tailwind + Radix UI)
- CodeRabbit review on every PR
- Auto-deploy to Vercel
- Basic SEO setup
- Mobile responsive
- 30-day bug fixes

## Not Included

- Custom illustrations / graphic design (R500/hour)
- Third-party API costs (Stripe, Twilio, etc.)
- Hosting fees beyond Vercel free tier
- Ongoing maintenance (separate R1,500/month)

## Dark Factory as BMAD Engine

The [[PRD Intake System]] is the BMAD frontend:
- Voice note recording → transcribed
- Link submission → scraped + analysed
- Document upload → extracted
- VirusTotal scan on all files
- Notion CRM → new client record
- Team notification → Slack/WhatsApp/Email

## Financial Model

| Products/month | Revenue | Cost | Margin |
|----------------|---------|------|--------|
| 5 | R145 | R45 | R100 |
| 20 | R580 | R120 | R460 |
| 50 | R1,450 | R250 | R1,200 |

*Agent costs: ~R9/product (QwenPaw local LLM = near-zero marginal cost)*

## Related

- [[Dark Factory BMAD]] product
- [[PRD Intake System]]
- [[Dark Factory Stack]]