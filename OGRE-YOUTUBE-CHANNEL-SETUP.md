# OGRE YouTube Channel — Setup & Streaming Guide
**Compiled: 6 July 2026 | Cipher Tr@ce | Dark Factory**
*For: Tumelo Ramaphosa · Studex Group · YouTube Launch*

---

## Step 1 — Get Your YouTube Stream Key

1. Go to [studio.youtube.com](https://studio.youtube.com)
2. Click **Create** (top right) → **Go Live**
3. If not verified → click **Start** under "Verify your channel"
4. Once verified → **Stream** tab → copy the **Stream Key**
5. Copy your **Stream URL** (usually `rtmp://a.rtmp.youtube.com/live2`)

⚠️ Keep your stream key private. Anyone with it can stream to your channel.

---

## Step 2 — Install OBS Studio

### Download
Go to [obsproject.com](https://obsproject.com) → Download → Choose your OS (Windows/Mac/Linux)

### Install
Run the installer. Accept defaults. Launch OBS Studio.

### Configure for YouTube
1. In OBS: Click **Settings** (bottom right)
2. Go to **Stream** tab
3. Service: **YouTube / YouTube Gaming**
4. Server: Leave as default (YouTube default)
5. Stream Key: **Paste your stream key from Step 1**
6. Click **OK**

### Set Up Your Scene (What viewers see)
1. In OBS, bottom-left panel: Sources → Click **+**
2. **Display Capture** (your entire screen) OR **Window Capture** (specific window)
3. Choose your browser window / presentation window
4. Click **Start Streaming** (bottom-right, red button)

### Audio
1. Sources → **+** → **Audio Input Capture** → Select your microphone
2. Test in Settings → Audio → Mic/Auxiliary Audio Device

---

## Step 3 — Recording Locally (No Live Stream)

To record without going live:
1. In OBS: Click **Start Recording** instead of Start Streaming
2. Videos save to your Videos folder
3. Edit in DaVinci Resolve (free) or Adobe Premiere
4. Upload directly to YouTube

---

## Step 4 — YouTube API Credentials

To use the YouTube API (analytics, uploads, playlist management):

### Create a Google Cloud Project
1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Click **New Project** → Name it "OGRE YouTube"
3. Enable YouTube Data API v3:
   - APIs & Services → Enable APIs → Search "YouTube Data API v3" → Enable

### Create OAuth Credentials
1. APIs & Services → Credentials → **Create Credentials** → OAuth client ID
2. Application type: **Web application**
3. Name: "OGRE YouTube Channel"
4. Authorized redirect URIs: `http://localhost`
5. Click **Create**
6. Copy your **Client ID** and **Client Secret**

### Share with OGRE
Once you have Client ID + Client Secret, share them and I'll wire up:
- YouTube analytics dashboard
- Automated video upload
- Comment monitoring
- Thumbnail generation pipeline

---

## Step 5 — Recommended Recording Setup

### For Tumelo's YouTube Videos (Talking Head)

**Camera:**
- iPhone as webcam: Use [DroidCam](https://www.dev47apps.com) (free) or EpocCam
- Or: Logitech Brio 4K webcam

**Lighting:**
- Ring light: Neewer 18-inch LED (R800 on Takealot)
- Position: 45° to one side, slightly above eye level

**Audio:**
- Lavalier mic: BOYA BY-M1 (R350, Takealot) — plug into mic port
- Or: Audio-Technica ATR2100x (R1,200)

**Script:**
- Use the 3 scripts in this document
- Read from your phone or second screen
- Record in one take (don't worry about mistakes — edit later)

**Background:**
- Clean desk with branded backdrop
- Or: the animated node graph from re:motion displayed on screen behind you

---

## Step 6 — Stream to YouTube (Live)

### Pre-Live (10 min before):
1. Open OBS → Start Streaming
2. Go to YouTube Studio → **Go Live** → Your stream should appear
3. Set title: "Launch Week: [Topic]"
4. Add description, tags, thumbnail
5. Set visibility: **Public** or **Unlisted**
6. Click **Go Live**

### During Stream:
- OBS is broadcasting (your screen/audio is live)
- Monitor chat in YouTube Studio
- Use second device to watch your own stream

### After Stream:
- Stream saves automatically to YouTube
- Edit title/description → Post immediately
- Pin the video, share on LinkedIn + Instagram

---

## Quick Checklist

- [ ] YouTube channel verified (1000 subscribers needed for live streaming)
- [ ] OBS Studio installed
- [ ] Stream key pasted into OBS
- [ ] Camera + mic tested
- [ ] Scene set (screen capture or talking head)
- [ ] 3 scripts ready below
- [ ] Stream key shared with OGRE (optional — for automated streaming)

---

*Cipher Tr@ce · Dark Factory · OGRE Computer*
*cto@studex-group.com*
