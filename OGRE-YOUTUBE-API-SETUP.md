# YouTube API Credentials — For OGRE Desktop Agent Integration
**Date: 6 July 2026**

---

## What "The Code" Means

To connect OGRE to YouTube (for analytics, video upload, comments), you need OAuth 2.0 credentials from Google Cloud. Here's what to do:

---

## Step 1 — Create a Google Cloud Project

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Click **New Project** → Name: `OGRE YouTube`
3. Click **Create**

---

## Step 2 — Enable YouTube Data API v3

1. In the sidebar: **APIs & Services → Library**
2. Search: **YouTube Data API v3**
3. Click it → **Enable**

---

## Step 3 — Create OAuth 2.0 Credentials

1. Go to **APIs & Services → Credentials**
2. Click **Create Credentials → OAuth client ID**
3. Application type: **Web application**
4. Name: `OGRE YouTube Integration`
5. Authorized redirect URIs: `http://localhost`
6. Click **Create**
7. Copy the **Client ID** and **Client Secret**

---

## Step 4 — Share with OGRE

Once you have:
- **Client ID:** `xxxxx.apps.googleusercontent.com`
- **Client Secret:** `GOCSPX-xxxxx`

Share these with me and I'll wire up:
- YouTube analytics dashboard
- Automated video upload pipeline
- Comment monitoring + sentiment analysis
- Thumbnail generation via AI

---

## Quick Reference — What Each Credential Does

| Credential | Purpose |
|-----------|---------|
| **Stream Key** | OBS → YouTube live streaming (from YouTube Studio) |
| **Client ID + Secret** | API access for OGRE agent (analytics, upload, comments) |
| **Developer Key (optional)** | YouTube Data API basic access |

---

## For OBS + YouTube Streaming (No API Needed)

For live streaming via OBS Studio — you only need the **Stream Key**:
1. YouTube Studio → Create → Go Live
2. Copy Stream Key
3. Paste into OBS → Settings → Stream → Stream Key field
4. Click "Start Streaming" in OBS

No API credentials needed for streaming.

---

*Share Client ID + Secret with Cipher Tr@ce once created.*
