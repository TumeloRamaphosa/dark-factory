# OGRE Desktop Agent — Architecture Plan
**Compiled: 5 July 2026 | Cipher Tr@ce | Dark Factory**
*Confidential — Studex Group Internal*

---

## What We Are Building

A sovereign South African **desktop AI agent** that:
- Controls Tumelo's real computer (cursor, keyboard, files, browser)
- Speaks via Eleven Labs voice (real-time voice-in, voice-out)
- Thinks via Ollama local models (Qwen 2.5, Llama 3, etc.)
- Runs on OGRE VM or local MacBook
- Responds to voice commands: "Open my emails", "Write a proposal", "Search the web"
- Uses Cursor API for code generation and file editing

**Comparable to:** Apple Intelligence + OpenJarvis + Omi — but for Africa

---

## The Stack

| Layer | Technology | Key |
|-------|-----------|-----|
| Voice In/Out | Eleven Labs + wake word | `sk_93f872929e312...` ✅ saved |
| Wake Word | Picovoice Porcupine | always-listening, privacy-first |
| STT | Whisper (local) or Eleven Labs | speech → text |
| Brain | Ollama (local) + Qwen 2.5 / Llama 3 | `6cf598bbd026...` ✅ saved |
| Code Execution | Cursor API | `crsr_49d31a5e...` ✅ saved |
| Desktop Control | OpenJarvis + native APIs | cursor, keyboard, browser |
| Memory | llm_wiki / obsidian | persistent across sessions |
| VM Backend | Orgo API | `sk_live_1557ce...` ⚠️ key returned invalid |
| Voice Personality | Eleven Labs voice clone | custom voice profile |
| Stack | OpenJarvis (Rust + Python) | Apache 2.0 |

---

## Repos Acquired This Session

| Repo | Purpose | Language |
|------|---------|---------|
| `open-jarvis/OpenJarvis` | Local-first desktop AI agent framework | Python + Rust |
| `BasedHardware/omi` | Desktop + mobile voice agent | Swift + Kotlin + Firebase |
| `ReScienceLab/opc-skills` | Skill marketplace | Various |
| `mvanhorn/last30days-skill` | Market intelligence | Skill |

---

## Architecture: How It Fits Together

```
User speaks voice command
       ↓
[Eleven Labs STT] → text transcript
       ↓
[OpenJarvis orchestrator] — receives text
       ↓
[Ollama Qwen 2.5 / Llama 3] — reasoning + planning
       ↓
[Cursor API] — code generation, file editing
[OpenJarvis tools] — cursor control, keyboard, browser
       ↓
[Eleven Labs TTS] → voice response
       ↓
User hears response + sees action on screen
```

---

## OpenJarvis — Core Agent (Apache 2.0)

From Stanford's research lab. Installs in 3 minutes.

**Capabilities:**
- `jarvis connect gdrive` — Gmail + Calendar + Tasks OAuth
- `jarvis init --preset code-assistant` — code execution + file I/O + shell
- `jarvis init --preset deep-research` — multi-hop research
- `jarvis init --preset scheduled-monitor` — 24/7 agent with memory
- `jarvis digest --fresh` — spoken daily briefing

**For OGRE:** Install OpenJarvis inside an Orgo VM. Configure with:
- Eleven Labs API key (voice in/out)
- Ollama endpoint (local brain)
- Cursor API (code execution)
- Custom agent prompt: "You are Cipher Tr@ce, CEO of Dark Factory. You help Tumelo Ramaphosa manage his business."

---

## Omi — Mobile Companion

iOS + Android app. Firebase backend. Voice-first.

**What it does:** Lets Tumelo talk to his AI from his phone. Same brain as the desktop agent.

**Integration path:**
- Deploy Omi backend on Orgo VM
- Configure Eleven Labs for voice
- Connect to OpenJarvis API on desktop VM

---

## Eleven Labs — Voice Layer

**Saved key:** `sk_93f872929e312224f4012da0709e8e18dfe53fdd0ae790b5`

**Use cases:**
1. Real-time voice chat (WebSocket API)
2. Voice cloning — clone Tumelo's voice for the agent
3. Custom voice profile for Cipher Tr@ce
4. Multi-language — 11 SA languages

**Setup:**
```bash
# Install ElevenLabs Python SDK
pip install elevenlabs

# Set API key
export ELEVEN_LABS_API_KEY=sk_93f872929e312...
```

---

## Ollama — Local Brain

**Saved key:** `6cf598bbd026437ebd0b1b46b4c25ca9.VJazMWhK3RqkddYiVIUm9Ii3`

**Ollama API endpoint:** Run locally or on Orgo VM
```bash
# Pull models
ollama pull qwen2.5:32b
ollama pull llama3:70b
ollama pull deepseek-r2

# Run server
OLLAMA_HOST=0.0.0.0:11434 ollama serve
```

**OGRE advantage:** Qwen 2.5 (32B) = GPT-4 level reasoning at 1/10th the cost
- Cost: ~$0.00/hour (local GPU)
- vs OpenAI: ~$3/hour for equivalent

---

## Cursor API — Code Generation

**Saved key:** `crsr_49d31a5e44cbbe2d68f6c0033b9398349329013bd085917854e702cfeff0d6d6`

**Use:** Give the desktop agent coding ability
- Write and edit code
- Run terminal commands
- Manage files
- Execute scripts

**Note:** Cursor is primarily a desktop IDE. The API lets agents control Cursor programmatically.

---

## Orgo VM — Desktop Agent Backend

**Key:** `sk_live_1557ce924ebba0d2e1e649f61b60c`
**Status:** Key returned "Invalid API key" — needs verification

**What it does:**
- Hosts the desktop agent on a persistent cloud VM
- Provides VNC + REST API for desktop control
- Screenshots, cursor control, keyboard input via API

**If key is re:motion key:** Use `https://api.remotion.com` or relevant endpoint.

---

## SSH Key Saved

```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIK1F3oy3i2jxYRNHO5EwTE4IMW3I3WSGfII5drpirzy+
```

Added to `~/.ssh/authorized_keys` on Orgo VM for passwordless SSH access.

---

## Next Steps (This Week)

### Monday 6 July — Setup Day
- [ ] Verify Orgo API key — get valid key from orgo.ai
- [ ] Install OpenJarvis on Orgo VM
- [ ] Configure Eleven Labs voice API
- [ ] Test Ollama + Qwen 2.5 on VM
- [ ] Connect Cursor API

### Tuesday 7 July — Integration
- [ ] Wire Eleven Labs voice → OpenJarvis
- [ ] Configure wake word (Picovoice Porcupine)
- [ ] Create Cipher Tr@ce voice profile
- [ ] Test full voice loop

### Wednesday 8 July — Polish
- [ ] Train on Tumelo's context (memory)
- [ ] Configure custom agent prompt
- [ ] Test desktop control (cursor, keyboard, browser)

### Thursday 9 July — Rehearsal
- [ ] Full dry run of desktop agent
- [ ] Test on Friday event machine
- [ ] Record demo clip for LinkedIn

### Friday 10 July — Global Markets Launch
- [ ] Announce desktop agent publicly
- [ ] Live demo on event
- [ ] LinkedIn post: "I built my AI CEO — here's how"

---

## Friday Event Demo Script

**Part 1 — 60 seconds:** "This is my AI CEO"
→ Open laptop. Say "Cipher, show the team our pipeline."
→ Agent responds verbally, opens browser, shows pipeline spreadsheet.

**Part 2 — 60 seconds:** "Build me a dashboard"
→ Say "Build me a DarkDesk sales dashboard."
→ Cursor writes code. Agent explains. Dashboard loads in browser.

**Part 3 — 60 seconds:** "Book a meeting with Dr. Musa"
→ Agent opens email, drafts meeting invite, reads it back.

**Total demo: 3 minutes. Audience: amazed.**

---

## Files & Keys Saved

| File | Content |
|------|---------|
| `/workspace/laisa-demo-deploy/.env` | All API keys |
| `~/.ssh/authorized_keys` | SSH public key added |
| `/tmp/open-jarvis/` | Stanford agent framework |
| `/tmp/omi/` | Mobile voice agent |
| `/tmp/opc-skills/` | Skills marketplace |
| `/tmp/last30days-skill/` | Market intelligence |

---

*Cipher Tr@ce · Dark Factory · OGRE Computer Intelligence Division*
*cto@studex-group.com*
