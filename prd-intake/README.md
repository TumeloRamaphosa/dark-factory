# Dark Factory — PRD Intake System

**Live form:** `http://localhost:3099/prd-form.html`

A secure client PRD intake system with:
- 🎤 Voice note recording (browser mic → webm → upload)
- 📄 Document upload (PDF, DOC, TXT, MD — up to 50MB)
- 🔍 VirusTotal scanning for all files and links
- 📋 Notion CRM integration — every submission creates a Notion page
- 📧 Team email notification on submission
- 🌐 Beautiful 4-step form with dark theme

## Quick Start

```bash
cd /workspace/prd-intake
npm install

# Copy and edit env vars
cp .env.example .env
# Then edit .env with your keys

# Start server
node server.js
```

## Features

### Security First
All files and links go through VirusTotal scanning before our team sees them. If something is flagged, it's marked in Notion with a 🚨 callout and the team does a manual review.

### Notion CRM
Each submission creates a new page in your Notion PRD database with:
- All form fields as properties (Name, Company, Budget, Timeline, Status)
- Problem statement, goals, target users as bullet blocks
- Scan results as callout blocks (green ✅ or red 🚨)
- Reference links and attachments

### Email Alert
Team gets an HTML email on every submission with:
- Full PRD summary
- Scan results
- Direct link to Notion page

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `VIRUSTOTAL_API_KEY` | Recommended | Free at virustotal.com (4 req/min free tier) |
| `NOTION_API_KEY` | Recommended | From notion.so/my-integrations |
| `NOTION_DATABASE_ID` | Recommended | Database ID from Notion share |
| `EMAIL_API_KEY` | Recommended | Resend API key (100 emails/day free) |
| `TEAM_EMAIL` | Recommended | Where to send notifications |
| `PORT` | No | Default: 3099 |

## API Endpoints

| Endpoint | Method | Description |
|---|---|---|
| `/api/health` | GET | Health check + feature status |
| `/api/prd/submit` | POST | Submit form fields only (no files) |
| `/api/prd/upload` | POST | Upload + scan a single file |
| `/api/prd/scan-url` | POST | Scan a URL for malware |
| `/api/prd/full` | POST | Full submission with form + files |

## Notion Setup

1. Go to https://www.notion.so/my-integrations
2. Create new integration → give it a name (e.g. "Dark Factory PRD")
3. Copy the API key to your `.env` as `NOTION_API_KEY`
4. Create a new database in Notion with these properties:
   - **Project Name** (title)
   - **Client Name** (text)
   - **Company** (text)
   - **Email** (email)
   - **Status** (select: "New PRD — Approved", "⚠️ Needs Review — Scan Flagged")
   - **Budget** (select)
   - **Timeline** (select)
   - **Priority** (select)
   - **Submission Date** (date)
   - **Project Type** (multi-select)
5. Share the database with your integration (click "..." → "Add connections" → select your integration)
6. Copy the database ID from the URL: `notion.so/[workspace]/[DATABASE-ID]?v=...`
7. Add to `.env` as `NOTION_DATABASE_ID`

## Deploy

```bash
# Run on server
node server.js

# Or with PM2
pm2 start server.js --name prd-intake

# Or push to Railway/Render/Fly.io
```
