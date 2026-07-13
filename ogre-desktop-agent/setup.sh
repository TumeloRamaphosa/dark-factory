#!/bin/bash
# ============================================================
# OGRE Desktop Agent — One-Command Setup
# Run on your Mac/Linux/Windows (Ubuntu 24.04 on Orgo VM)
# ============================================================
# Requirements: Ubuntu 24.04, curl, git, 8GB RAM minimum
# Time: ~15-20 minutes
# ============================================================

set -e

# ── Colours ──────────────────────────────────────────────
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${CYAN}"
echo "═══════════════════════════════════════════════"
echo "  OGRE Desktop Agent — Setup"
echo "  Dark Factory · Cipher Tr@ce"
echo "═══════════════════════════════════════════════"
echo -e "${NC}"

# ── 1. System Update ──────────────────────────────────────
echo -e "${GREEN}[1/7]${NC} Updating system packages..."
sudo apt update && sudo apt upgrade -y

# ── 2. Install Python + Node.js ───────────────────────────
echo -e "${GREEN}[2/7]${NC} Installing Python, Node.js, and dependencies..."
sudo apt install -y python3 python3-pip python3-venv git curl wget \
  libopenblas-dev liblapack-dev screen xclip xsel || true

# ── 3. Install Ollama ─────────────────────────────────────
echo -e "${GREEN}[3/7]${NC} Installing Ollama (local LLM brain)..."
curl -fsSL https://ollama.com/install.sh | sh

# Pull recommended models
echo -e "${YELLOW}  Pulling Qwen 2.5 7B (first run takes ~5 min)...${NC}"
ollama pull qwen2.5:7b 2>/dev/null || echo "  Skipped (may take long)"
echo -e "${YELLOW}  Pulling nomic-embed-text (for memory)...${NC}"
ollama pull nomic-embed-text 2>/dev/null || echo "  Skipped"

# ── 4. Install OpenJarvis ────────────────────────────────
echo -e "${GREEN}[4/7]${NC} Installing OpenJarvis (Stanford desktop AI agent)..."
cd ~
git clone https://github.com/open-jarvis/OpenJarvis.git 2>/dev/null || (
  echo "  OpenJarvis already cloned, skipping"
)
cd OpenJarvis
pip3 install -e . 2>/dev/null || pip install -e .
pip3 install elevenlabs python-dotenv openai 2>/dev/null || pip install elevenlabs python-dotenv openai

# ── 5. Configure API Keys ────────────────────────────────
echo -e "${GREEN}[5/7]${NC} Configuring API keys..."
mkdir -p ~/.ogre
cat > ~/.ogre/.env << 'ENVEOF'
# ── OGRE Desktop Agent — API Keys ──────────────────────────────────
# Replace these values with your actual keys

# Eleven Labs (voice in/out + voice cloning)
ELEVEN_LABS_API_KEY=sk_93f872929e312224f4012da0709e8e18dfe53fdd0ae790b5

# Ollama (local brain — no external API calls for reasoning)
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=qwen2.5:7b

# OpenAI (for Whisper STT + GPT reasoning fallback)
OPENAI_API_KEY=sk-proj-NecwPVzz3CB85K3ejSsFDSRyQchEtIrFYrKCXpA8Y3u09WvKBlF2FRjNnNJlkr-RjwymhCpmDUT3BlbkFJo-ZbwTPhpS6bBhJJgYj_N9346Ahm0hi7Md5Q5wdaVDrToxomXh4X_ELKOFTebQhAIVFTCwgwXUA

# Cursor API (AI code generation + desktop control)
CURSOR_API_KEY=crsr_49d31a5e44cbbe2d68f6c0033b9398349329013bd085917854e702cfeff0d6d6

# Obsidian Mind (persistent memory vault)
# Install from: https://github.com/breferrari/obsidian-mind
OBSIDIAN_VAULT_PATH=~/obsidian-mind-vault

# ── Agent Configuration ───────────────────────────────────────────
AGENT_NAME="Cipher Tr@ce"
AGENT_ROLE="CEO of Dark Factory"
AGENT_PERSONA="You are Cipher Tr@ce, CEO of Dark Factory. You help Tumelo Ramaphosa manage Studex Group. You are confident, direct, minimal. You speak in code and action. No fluff."

# ── Voice Configuration ───────────────────────────────────────────
VOICE_MODEL=eleven_multilingual_v2
VOICE_ID=21m00Tcm4TlvDq8ikWAM  # Default voice — replace with your cloned voice ID
VOICE_SPEED=1.0
VOICE_STABILITY=0.5

ENVEOF
echo -e "${YELLOW}  API keys written to ~/.ogre/.env${NC}"
echo -e "${YELLOW}  ⚠️  Edit ~/.ogre/.env and add your actual API keys${NC}"

# ── 6. Set up Obsidian Mind (Memory) ──────────────────────────
echo -e "${GREEN}[6/7]${NC} Setting up Obsidian Mind (persistent memory vault)..."
cd ~
git clone https://github.com/breferrari/obsidian-mind.git obsidian-mind-vault 2>/dev/null || (
  echo "  Obsidian Mind already cloned, skipping"
)
echo -e "${YELLOW}  Vault path: ~/obsidian-mind-vault${NC}"

# ── 7. Start the Desktop Agent ─────────────────────────────────
echo -e "${GREEN}[7/7]${NC} Starting Ollama service..."
# Start Ollama in background
nohup ollama serve > ~/.ogre/ollama.log 2>&1 &
echo -e "${YELLOW}  Ollama started on http://localhost:11434${NC}"

# ── Completion ──────────────────────────────────────────────
echo ""
echo -e "${CYAN}═══════════════════════════════════════════════"
echo "  OGRE Desktop Agent — Setup Complete!"
echo "═══════════════════════════════════════════════${NC}"
echo ""
echo "Next steps:"
echo "  1. Edit ~/.ogre/.env with your actual API keys"
echo "  2. Run: source ~/.ogre/.env"
echo "  3. Run: open-jarvis --agent cipher-trace"
echo "  4. Or use voice: say 'Hey Cipher, what's on today?'"
echo ""
echo "Installed:"
echo "  ✓ Ollama + Qwen 2.5 (local brain)"
echo "  ✓ OpenJarvis (desktop AI agent)"
echo "  ✓ Eleven Labs (voice in/out)"
echo "  ✓ Obsidian Mind (persistent memory)"
echo "  ✓ Cursor API (code generation)"
echo ""
echo "Logs: ~/.ogre/ollama.log"
echo "Config: ~/.ogre/.env"
echo ""
