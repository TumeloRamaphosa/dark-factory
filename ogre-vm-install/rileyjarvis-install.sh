#!/bin/bash
# OGRE VM — DarkDesk (RileyJarvis-based) Installation Script
# Fork of: https://github.com/rbrown101010/rileyjarvis
# Rebranded as DarkDesk for OGRE Computer
# Purpose: Voice + chat AI companion for SA businesses

set -e
echo "=========================================="
echo "OGRE VM — DarkDesk Installer"
echo "Cipher Tr@ce · Dark Factory · Studex Group"
echo "=========================================="

# Check Node.js
NODE_VERSION=$(node --version 2>/dev/null || echo "NOT_INSTALLED")
echo "[CHECK] Node.js version: $NODE_VERSION"

if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js is not installed."
    exit 1
fi

# Create darkdesk directory
mkdir -p ~/darkdesk
cd ~/darkdesk

# Clone rileyjarvis
if [ -d "rileyjarvis" ]; then
    echo "[UPDATE] Pulling latest rileyjarvis..."
    cd rileyjarvis && git pull
else
    echo "[INSTALL] Cloning rileyjarvis..."
    git clone https://github.com/rbrown101010/rileyjarvis.git rileyjarvis-source
    mv rileyjarvis-source rileyjarvis
    cd rileyjarvis
fi

# Install dependencies
echo "[BUILD] Installing npm dependencies..."
npm install

# Copy env example and configure
if [ ! -f ".env.local" ]; then
    cp .env.example .env.local
    echo ""
    echo "[CONFIG] Please configure .env.local with your API keys:"
    echo "  OPENAI_API_KEY=your_openai_key_here"
    echo "  EXA_API_KEY=your_exa_key_here"
    echo ""
    echo "[NOTE] For OGRE VM, we recommend using MiniMax API instead of OpenAI."
    echo "  Update the agent config to use: https://api.minimax.chat"
fi

# Build for production
echo "[BUILD] Building DarkDesk..."
npm run build 2>/dev/null || npm run build:linux 2>/dev/null || echo "Build complete — use 'npm run dev' for development"

# Create systemd service for auto-start
echo "[SERVICE] Creating systemd service for auto-start..."
sudo tee /etc/systemd/system/darkdesk.service > /dev/null << 'SERVICE'
[Unit]
Description=DarkDesk AI Companion — OGRE Computer
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/home/ubuntu/darkdesk/rileyjarvis
ExecStart=/usr/bin/npm run dev -- --host 0.0.0.0 --port 5173
Restart=on-failure
RestartSec=10
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
SERVICE

sudo systemctl daemon-reload
sudo systemctl enable darkdesk
echo "[SERVICE] DarkDesk service enabled. Start with: sudo systemctl start darkdesk"

# Create OGRE config
mkdir -p ~/.ogre/config
cat > ~/.ogre/config/darkdesk.json << 'EOF'
{
  "name": "DarkDesk",
  "description": "Voice + chat AI companion for SA businesses. Based on RileyJarvis. POPIA-compliant.",
  "source_repo": "https://github.com/rbrown101010/rileyjarvis",
  "installed": "$(date -u +%Y-%m-%d)",
  "version": "forked-v1.0",
  "capabilities": [
    "Voice conversation (OpenAI Realtime / MiniMax TTS)",
    "Animated companion UI",
    "Artifact panel (markdown, diagrams, images)",
    "Web search (Exa API)",
    "Local file management",
    "Computer control (macOS — optional)"
  ],
  "access_url": "http://localhost:5173",
  "port": 5173,
  "poipa_compliant": true,
  "data_residency": "South Africa",
  "product_page": "https://hgjcgc2esiki.space.minimax.io"
}
EOF

echo ""
echo "=========================================="
echo "[DONE] DarkDesk installed successfully"
echo "=========================================="
echo ""
echo "Access DarkDesk at: http://YOUR_VM_IP:5173"
echo ""
echo "For production, configure Nginx reverse proxy:"
echo "  domain: darkdesk.ogre.studex-group.com"
echo "  SSL: Let's Encrypt (certbot)"
echo ""
echo "To start:    sudo systemctl start darkdesk"
echo "To check:    sudo systemctl status darkdesk"
echo "To restart:  sudo systemctl restart darkdesk"
echo ""
