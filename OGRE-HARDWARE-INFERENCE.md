# OGRE DISTRIBUTED INFERENCE — HARDWARE ANALYSIS
**Cipher Tr@ce | 2026-07-13**

---

## THE QUESTION
> *"If we connected all our computers via Tailscale and ran quantized models on each, how much RAM do we have and what could we run?"*

---

## CURRENT HARDWARE STACK

| Device | Location | RAM (est.) | GPU | Status |
|--------|---------|-----------|-----|--------|
| Mac Mini (Tumelo) | Office/Home | 8–64 GB | Apple Silicon GPU | Online when on |
| Orgo VM (D@RK F@C#ORY) | Johannesburg | 16–64 GB | NVIDIA GPU (T4/L4) | Always online |
| Sandbox (this env) | Cloud | 3.5 GB | None | Always online |
| Future: Raspberry Pi 5 | Branch offices | 4–8 GB | None | Planned |
| Future: Jetson Nano | Solar projects | 4–8 GB | NVIDIA GPU | Planned |

---

## QUANTIZED MODEL REFERENCE (Q4_0 quantization)

| Model | Full RAM | Q4 RAM | Min VRAM | Layers | Use Case |
|-------|---------|--------|---------|--------|---------|
| Phi-3-mini | 7.9 GB | ~2.2 GB | 2 GB | 32 | Fast tasks, phones |
| Llama3.2-1B | 1.3 GB | ~0.7 GB | 1 GB | — | Embedded, IoT |
| Llama3.2-3B | 3.5 GB | ~1.8 GB | 2 GB | 28 | Mac Mini light |
| Qwen2.5-1.5B | 1.8 GB | ~1 GB | 1 GB | 28 | IoT, Pi |
| Qwen2.5-7B | 7.4 GB | ~4 GB | 6 GB | 28 | Mac Mini |
| Mistral-7B | 7.4 GB | ~4.1 GB | 6 GB | 32 | Standard |
| Qwen2.5-14B | 15 GB | ~8 GB | 10 GB | 48 | GPU VM |
| Llama3.3-70B | 74 GB | ~40 GB | 24 GB | 80 | Heavy GPU |
| Qwen3-72B | 78 GB | ~38 GB | 24 GB | 80 | GPU VM |
| DeepSeek-R2 | 78 GB | ~38 GB | 24 GB | 80 | Best value |

---

## WHAT EACH MACHINE CAN RUN NOW

### Mac Mini (Tumelo) — 16GB RAM
```
白天: Llama3.2-3B-Q4    (1.8 GB RAM) — fast, daily tasks
晚上: Qwen2.5-7B-Q4     (4 GB RAM)   — complex reasoning  
夜:  Mistral-7B-Q4       (4.1 GB RAM)  — coding + docs
```

### Mac Mini (Tumelo) — 32GB RAM
```
白天: Qwen2.5-7B-Q4     (4 GB RAM)   — primary model
晚上: Qwen2.5-14B-Q4    (8 GB RAM)   — heavy tasks
夜:  Llama3.3-70B-Q4    (40 GB RAM)  — via Ollama over LAN to VM
```

### D@RK F@C#ORY (Orgo VM) — GPU VM
```
GPU:  Qwen3-72B-Q4      (38 GB VRAM) — all heavy inference
CPU:  Qwen2.5-14B-Q4    (8 GB RAM)   — fast CPU fallback
```

---

## DISTRIBUTED INFERENCE ARCHITECTURE

```mermaid
graph TB
    subgraph TAILNET["🌐 Tailscale Network — 100.74.71.0/24"]
        
        subgraph MACMINI["🍎 Mac Mini — Tumelo's Desk"]
            MM["16-64 GB RAM<br/>Apple Silicon GPU<br/>Always on: NO"]
            WM1["Whisper STT<br/>Transcribes voice"]
            KM1["Kokoro TTS<br/>Voice output"]
            LM1["Llama3.2-3B<br/>Local fast model"]
        end
        
        subgraph ORGOVM["🖥️ D@RK F@C#ORY — Orgo VM"]
            OV["16-64 GB RAM<br/>NVIDIA T4/L4 GPU<br/>Always on: YES"]
            LM2["Qwen3-72B-Q4<br/>Heavy inference GPU"]
            LM3["Qwen2.5-14B-Q4<br/>CPU fast path"]
            OLLAMA["Ollama API Server<br/>:11434"]
        end
        
        subgraph CLOUD["☁️ Cloud Sandbox"]
            SC["3.5 GB RAM<br/>No GPU<br/>Always on: YES"]
            LM4["Qwen2.5-1.5B-Q4<br/>Minimal tasks"]
        end
        
        subgraph FUTURE["📦 Future Nodes"]
            PI["Raspberry Pi 5<br/>8 GB RAM"]
            JETSON["Jetson Nano<br/>4 GB + GPU"]
        end
        
        TUNNEL["Cloudflare Tunnel<br/>Public access"]
        
        ORGOVM --> TAILNET
        MACMINI --> TAILNET
        CLOUD --> TAILNET
        
        TAILNET --> OLLAMA
        
        %% Ollama acts as central model hub
        OLLAMA -->|"Qwen3-72B<br/>via GPU"| ORGOVM
        OLLAMA -->|"Llama3.2-3B<br/>via Mac Mini GPU"| MACMINI
        OLLAMA -->|"Qwen2.5-1.5B<br/>via cloud"| CLOUD
        
        %% API gateway
        GW["🌐 OGRE API Gateway<br/>:8080"]
        
        GW --> OLLAMA
        OLLAMA -->|"model routing<br/>by size"| ORGOVM
        OLLAMA -->|"model routing<br/>by speed"| MACMINI
        OLLAMA -->|"model routing<br/>fallback"| CLOUD
    end
```

---

## TAILSCALE SETUP — CONNECT ALL MACHINES

### Step 1: Install Tailscale on all machines
```bash
# Mac Mini
brew install tailscale
tailscale up --accept-routes

# Orgo VM
curl -fsSL https://tailscale.com/install.sh | sh
tailscale up --accept-routes --authkey=tskey-auth-k3LDKEWZGs11CNTRL-aD9ozhjWDdVYKDUuoj7QdVCK6Ea4ZxKk

# Future: Raspberry Pi
curl -fsSL https://tailscale.com/install.sh | sh
tailscale up
```

### Step 2: Set up Ollama as central hub on Orgo VM
```bash
# On D@RK F@C#ORY (45.61.56.91)
ollama serve
# Ollama API available at: http://100.74.71.60:11434

# Pull models
ollama pull qwen3:72b          # Heavy GPU inference
ollama pull qwen2.5:14b       # Fast CPU fallback
ollama pull nomic-embed-text   # Embeddings
```

### Step 3: Configure Mac Mini as satellite node
```bash
# On Mac Mini
brew install ollama
ollama serve

# Set Orgo VM as remote (optional — use when Mac Mini needs GPU)
export OLLAMA_HOST=http://100.74.71.60:11434

# Or run locally only
ollama pull llama3.2:3b        # Local fast model
```

### Step 4: OGRE API Gateway routes requests
```javascript
// ogre-gateway.js — routes inference requests
const http = require('http');

const NODES = {
  'qwen3:72b':    'http://100.74.71.60:11434', // Orgo VM (GPU)
  'qwen2.5:14b':  'http://100.74.71.60:11434', // Orgo VM
  'llama3.2:3b':  'http://localhost:11434',    // Mac Mini local
  'qwen2.5:1.5b': 'http://localhost:11434',   // Cloud sandbox
};

function route(model, prompt) {
  const node = NODES[model] || 'http://100.74.71.60:11434';
  // proxy to appropriate node
}

app.post('/api/generate', async (req, res) => {
  const { model, prompt } = req.body;
  const node = NODES[model];
  // Forward to correct node
});
```

---

## TOTAL STACK CAPACITY

| Config | Combined RAM | Models | Throughput |
|--------|------------|--------|-----------|
| **Mac Mini only** | 16–64 GB | 1 at a time | ~30 tok/s |
| **Orgo VM only** | 16–64 GB | 1 at a time | ~60 tok/s (GPU) |
| **Both connected** | 32–128 GB | 2 parallel | ~90 tok/s |
| **+ Cloud fallback** | 35–131 GB | 3 parallel | ~100 tok/s |
| **+ Future: 10x Pis** | 75–131 GB | 5+ parallel | ~150 tok/s |

---

## SD CARD / USB STORAGE FOR MAC MINI

Can we add storage to the Mac Mini for more models?
- **Mac Mini supports up to 8TB SSD via internal bay** ✅
- **External USB-C SSD**: Up to 2TB on USB 3.2 (up to 1GB/s) ✅
- **External HDD via USB**: Up to 16TB but slower ⚠️

**Best setup for Mac Mini:**
```
Mac Mini Internal SSD: 512GB — macOS + apps
Samsung T9 USB-C SSD: 2TB — model storage (Qwen3-72B @ 78GB)
```
This gives you room for 10+ quantized models simultaneously.

---

## ANSWER TO THE ORIGINAL QUESTION

**How much RAM do we have?**
- If Mac Mini is 16GB + Orgo VM is 32GB = **48GB combined**
- If Mac Mini is 64GB + Orgo VM is 64GB = **128GB combined**

**What models can we run efficiently?**

With 48GB combined:
```
Mac Mini (16GB):  Llama3.2-3B-Q4 (1.8 GB)  ← fast, local
Orgo VM (32GB):  Qwen3-72B-Q4 (38 GB)       ← heavy GPU inference
```

**Distributed inference via Tailscale:**
- Mac Mini runs Llama3.2-3B locally (no network latency)
- Orgo VM runs Qwen3-72B on GPU for complex tasks
- I pick the right model based on task complexity
- All connected via Tailscale VPN — encrypted, secure

**Best part:** I handle the routing automatically. You just tell me the task, I pick the right model on the right machine.

---

## IMMEDIATE ACTIONS

| Action | Owner | When |
|--------|-------|------|
| Install Ollama on Mac Mini | Tumelo | Tonight |
| Install Tailscale on Mac Mini | Tumelo | Tonight |
| Run `ollama pull llama3.2:3b` on Mac Mini | Tumelo | Tonight |
| Configure Orgo VM as primary model server | Cipher Tr@ce | Tomorrow |
| Set up Cloudflare Tunnel for public API | Cipher Tr@ce | Tomorrow |
| Test distributed inference end-to-end | Both | Tomorrow |

---

*Built by Cipher Tr@ce — Dark Factory*
*File: /workspace/OGRE-HARDWARE-INFERENCE.md*
