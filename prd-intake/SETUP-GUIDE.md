# PRD Intake — Notion + Backend Setup Guide

## Step 1: Notion Integration

### 1. Create a Notion Integration
1. Go to https://www.notion.so/my-integrations
2. Click "New integration"
3. Name it "Dark Factory PRD"
4. Select your workspace
5. Under "Capabilities", enable: Read content, Update content, Insert content
6. Submit and copy the **Internal Integration Token**

### 2. Create a PRD Database in Notion
1. Create a new page in Notion
2. Add a database (inline table)
3. Add these properties:
   - **Name** (title)
   - **Company** (text)
   - **Email** (email)
   - **Project Type** (select: Voice Agent / Dashboard / Website / Other)
   - **Budget** (select: Under R10K / R10-50K / R50-100K / R100K+)
   - **Timeline** (select: ASAP / 1 Month / 3 Months / Flexible)
   - **Status** (select: New / In Review / In Progress / Complete)
4. Copy the **database ID** from the URL:
   `notion.so/{workspace}/{DATABASE_ID}?v=...`
   The DATABASE_ID is the 32-character string before the `?v=`

### 3. Share the Database with the Integration
1. Open the database page in Notion
2. Click the "..." menu → "Add connections"
3. Search for "Dark Factory PRD" and add it

---

## Step 2: Environment Variables

Create a `.env` file in `/workspace/prd-intake/` with these values:

```env
# Notion CRM (required for PRD → Notion)
NOTION_API_KEY=secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# VirusTotal (optional — for file/link scanning)
# Get free key at: https://www.virustotal.com/gui/join-us
VIRUSTOTAL_API_KEY=

# Email notifications (optional — for team alerts)
# Use Resend: https://resend.com (free: 100 emails/day)
EMAIL_API_KEY=
EMAIL_FROM=noreply@darkfactory.dev
TEAM_EMAIL=cto@studex-group.com

# Server port
PORT=3099
```

---

## Step 3: Deploy the Backend

### Option A: Orgo VM (Recommended for SA data sovereignty)

```bash
# SSH into your Orgo VM, then:
cd /workspace/prd-intake
npm install
node server.js

# For persistent background running:
nohup node server.js > prd-server.log 2>&1 &
```

### Option B: Railway (Free tier works)

1. Go to https://railway.app
2. Connect your GitHub repo
3. Add environment variables from Step 2
4. Deploy — gets a public URL like `prd-intake.up.railway.app`

### Option C: Render (Free tier)

1. Go to https://render.com
2. Create Web Service
3. Set build command: `npm install`
4. Set start command: `node server.js`
5. Add environment variables

---

## Step 4: Update the PRD Form API URL

If the backend is at a custom URL (not `localhost:3099`), edit:
`/workspace/prd-intake/public/prd-form.js` — line 7:

```javascript
window.API_BASE = 'https://your-backend-url.com';
```

Then redeploy the `public/` folder.

---

## Step 5: Update the PRD Form Link

Once backend is live, update the proposal with the correct PRD URL:
- PRD Form: `https://75glowowaxdq.space.minimax.io` (frontend)
- Backend: your server URL + `/api/prd/full`

---

*Questions? cto@studex-group.com*
*Code: /workspace/prd-intake/server.js*
