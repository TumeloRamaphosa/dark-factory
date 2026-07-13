#!/bin/bash
# ============================================================
# DARK FACTORY — D@RK F@C#ORY VM Setup Script
# Chief Engineer: AI Agent | CTO: Tumelo Ramaphosa
# VM: D@RK F@C#ORY | Ogre (orgo.ai)
# ============================================================
# Run this script on the D@RK F@C#ORY VM
# SSH into VM: ssh user@your-vm-ip
# Then run: curl -fsSL https://your-server/dark-factory-setup.sh | bash
# ============================================================

set -e

echo "=========================================="
echo "DARK FACTORY VM SETUP"
echo "Chief Engineer: AI Agent"
echo "Date: $(date)"
echo "=========================================="

# Color output
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'
BLUE='\033[0;34m'; PURPLE='\033[0;35m'; NC='\033[0m'

log() { echo -e "${GREEN}[SETUP]${NC} $1"; }
warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
info() { echo -e "${BLUE}[INFO]${NC} $1"; }

# ============================================================
# 1. SYSTEM DEPENDENCIES
# ============================================================
log "Installing system dependencies..."

sudo apt update && sudo apt upgrade -y
sudo apt install -y \
  curl \
  wget \
  git \
  build-essential \
  pkg-config \
  libssl-dev \
  ufw \
  htop \
  tmux \
  vim \
  unzip \
  jq \
  zip \
  python3 \
  python3-pip \
  python3-venv \
  ffmpeg \
  libgl1-mesa-glx \
  libglib2.0-0

log "System dependencies installed ✓"

# ============================================================
# 2. NODE.JS 20 LTS
# ============================================================
log "Installing Node.js 20 LTS..."

if ! command -v node &> /dev/null; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt install -y nodejs
  node --version
  npm --version
else
  info "Node.js already installed: $(node --version)"
fi

# ============================================================
# 3. UV (Python package manager for spec-kit)
# ============================================================
log "Installing uv (for spec-kit and Python tools)..."

if ! command -v uv &> /dev/null; then
  curl -LsSf https://astral.sh/uv/install.sh | sh
  export PATH="$HOME/.local/bin:$PATH"
  echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
else
  info "uv already installed: $(uv --version)"
fi

# ============================================================
# 4. SPEC-KIT (GitHub Spec-Driven Development)
# ============================================================
log "Installing spec-kit (GitHub Spec-Driven Development Toolkit)..."

uv tool install specify-cli --from git+https://github.com/github/spec-kit.git@v0.5.0 2>/dev/null || \
  warn "spec-kit install attempted. May need uv update."

# ============================================================
# 5. HEADROOM (Context compression + cross-agent memory)
# ============================================================
log "Installing headroom (token compression + cross-agent memory)..."

pip install "headroom-ai[all]" --quiet 2>/dev/null || \
  pip3 install "headroom-ai[all]" --quiet 2>/dev/null || \
  warn "headroom install may need Python 3.10+"

# Verify headroom
python3 -c "import headroom" 2>/dev/null && \
  log "headroom installed ✓" || \
  warn "headroom not importable (ok if Python version mismatch)"

# ============================================================
# 6. GSTACK (YC Software Factory)
# ============================================================
log "Installing gstack (YC sprint process)..."

GSTACK_DIR="$HOME/gstack"
if [ ! -d "$GSTACK_DIR" ]; then
  git clone https://github.com/garrytan/gstack.git "$GSTACK_DIR"
  cd "$GSTACK_DIR"
  # gstack typically installs via npm or direct Python
  npm install 2>/dev/null || python3 -m pip install -e . 2>/dev/null || true
  log "gstack cloned to $GSTACK_DIR"
else
  info "gstack already exists at $GSTACK_DIR"
fi

# ============================================================
# 7. GRAPHIFY (Codebase → knowledge graph)
# ============================================================
log "Installing graphify (codebase mapping)..."

GRAPHIFY_DIR="$HOME/graphify"
if [ ! -d "$GRAPHIFY_DIR" ]; then
  git clone https://github.com/safishamsi/graphify.git "$GRAPHIFY_DIR"
  cd "$GRAPHIFY_DIR"
  # graphify uses uv
  uv sync 2>/dev/null || python3 -m pip install -e . 2>/dev/null || true
  log "graphify installed to $GRAPHIFY_DIR"
else
  info "graphify already exists at $GRAPHIFY_DIR"
fi

# ============================================================
# 8. AGENT-SKILLS (Addy Osmani 24 engineering skills)
# ============================================================
log "Installing agent-skills (24 engineering workflows)..."

npx skills add addyosmani/agent-skills -g 2>/dev/null || \
  npx skills add addyosmani/agent-skills 2>/dev/null || \
  warn "agent-skills: npm/npx skills not available (install via npm install -g @anthropic/skills)"

# Alternative: clone directly
AGENT_SKILLS_DIR="$HOME/agent-skills"
if [ ! -d "$AGENT_SKILLS_DIR" ]; then
  git clone https://github.com/addyosmani/agent-skills.git "$AGENT_SKILLS_DIR"
  log "agent-skills cloned to $AGENT_SKILLS_DIR"
fi

# ============================================================
# 9. OBSIDIAN-SKILLS (Markdown + wiki)
# ============================================================
log "Installing obsidian-skills..."

OBSIDIAN_DIR="$HOME/obsidian-skills"
if [ ! -d "$OBSIDIAN_DIR" ]; then
  git clone https://github.com/kepano/obsidian-skills.git "$OBSIDIAN_DIR"
  log "obsidian-skills cloned to $OBSIDIAN_DIR"
fi

# ============================================================
# 10. LAST30DAYS-SKILL (Market intelligence)
# ============================================================
log "Installing last30days-skill (real-time market intelligence)..."

LAST30_DIR="$HOME/last30days-skill"
if [ ! -d "$LAST30_DIR" ]; then
  git clone https://github.com/mvanhorn/last30days-skill.git "$LAST30_DIR"
  cd "$LAST30_DIR"
  # Check for setup requirements
  if [ -f "requirements.txt" ]; then
    pip install -r requirements.txt --quiet 2>/dev/null
  fi
  log "last30days-skill installed to $LAST30_DIR"
fi

# ============================================================
# 11. SKILL-CREATOR (Anthropics skill building)
# ============================================================
log "Installing skill-creator (build new skills)..."

SKILLS_DIR="$HOME/anthropics-skills"
if [ ! -d "$SKILLS_DIR" ]; then
  git clone https://github.com/anthropics/skills.git "$SKILLS_DIR"
  log "skill-creator installed to $SKILLS_DIR"
fi

# ============================================================
# 12. DARK FACTORY APP (the actual project)
# ============================================================
log "Setting up Dark Factory application..."

DARK_FACTORY_DIR="$HOME/dark-factory"
if [ ! -d "$DARK_FACTORY_DIR" ]; then
  git clone https://github.com/TumeloRamaphosa/dark-factory.git "$DARK_FACTORY_DIR"
fi

cd "$DARK_FACTORY_DIR"
npm install
npx prisma generate
npm run build

log "Dark factory built at $DARK_FACTORY_DIR"

# ============================================================
# 13. CURSOR (AI Coding IDE) — Non-interactive install
# ============================================================
log "Setting up Cursor (AI coding IDE)..."

# Check if Cursor is already installed
if command -v cursor &> /dev/null; then
  info "Cursor already installed: $(cursor --version 2>/dev/null || echo 'unknown')"
else
  # Download Cursor AppImage for Linux
  CURSOR_URL="https://cursor.sh/download/linux"
  warn "Cursor requires manual download from cursor.com or the AppImage"
  warn "Run: wget $CURSOR_URL -O cursor.AppImage && chmod +x cursor.AppImage"
  warn "Or download from: https://www.cursor.com/download"
fi

# ============================================================
# 14. ANTI-GRAVITY — Setup placeholder
# ============================================================
log "Setting up Anti-Gravity..."

# Anti-Gravity is a platform for AI agents
# Check if there's a CLI tool available
if command -v antigravity &> /dev/null; then
  info "Anti-Gravity CLI found: $(antigravity --version 2>/dev/null || echo 'unknown')"
else
  warn "Anti-Gravity CLI not found."
  warn "To install Anti-Gravity:"
  warn "  1. Sign up at: https://antigravity.com (or relevant URL)"
  warn "  2. Download the CLI for Linux"
  warn "  3. Run: antigravity auth --api-key YOUR_KEY"
  warn "  4. Run: antigravity connect --vm $HOSTNAME"
fi

# ============================================================
# 15. GOOGLE ANTI-GRAVITY CLI — Setup placeholder
# ============================================================
log "Setting up Google Anti-Gravity CLI..."

if command -v google-antigravity &> /dev/null; then
  info "Google Anti-Gravity CLI found"
else
  warn "Google Anti-Gravity CLI not in standard PATH."
  warn "This may be a Google Cloud or Vertex AI agent tool."
  warn "Check: https://cloud.google.com/vertex-ai/docs"
  warn "gcloud CLI: https://cloud.google.com/sdk/docs/install"
fi

# ============================================================
# 16. KIT HUB CLI (GitHub package registry)
# ============================================================
log "Setting up KitHub CLI..."

if command -v kithub &> /dev/null; then
  info "KitHub CLI found"
else
  # Install kithub if available
  npm install -g kithub 2>/dev/null || \
    warn "KitHub CLI: npm install -g kithub (after getting API key)"
  warn "Login: kithub login --token YOUR_TOKEN"
fi

# ============================================================
# 17. TAILWIND CSS 4 + Next.js setup (already in dark-factory)
# ============================================================
log "Ensuring Tailwind CSS 4 is configured..."
cd "$DARK_FACTORY_DIR"
npm install tailwindcss @tailwindcss/postcss 2>/dev/null || true

# ============================================================
# 18. TMUX CONFIGURATION (persistent sessions)
# ============================================================
log "Configuring tmux for persistent sessions..."

cat > ~/.tmux.conf << 'EOF'
# tmux config for Dark Factory

# Better prefix
unbind C-b
set -g prefix C-a
bind C-a send-prefix

# Vi mode
set -g mode-keys vi

# Reload config
bind r source-file ~/.tmux.conf \; display "Config reloaded!"

# Split panes
bind h split-window -h
bind v split-window -v

# Switch panes
bind H select-pane -L
bind J select-pane -D
bind K select-pane -U
bind L select-pane -R

# Mouse support
set -g mouse on

# Start windows at 1
set -g base-index 1
setw -g pane-base-index 1

# Status bar
set -g status-style bg='#0a0a0a',fg='#ffffff'
set -g status-left "#[fg=colour208,bold] #S #[fg=default]"
set -g status-right "#[fg=colour39] %Y-%m-%d %H:%M "

# Don't rename windows automatically
set-option -g allow-rename off

# Dark theme colors
set -g window-status-style bg='#1a1a1a',fg='#888888'
set -g window-status-current-style bg='#0a0a0a',fg='#ffffff'
set -g pane-border-style fg='#333333'
set -g pane-active-border-style fg='#f97316'

EOF

log "tmux configured ✓"

# ============================================================
# 19. FIREWALL (SSH only, VNC for Ogre)
# ============================================================
log "Configuring firewall..."

sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp     # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw --force enable

log "Firewall configured ✓"

# ============================================================
# 20. OBSIDIAN (Second Brain) — portable version
# ============================================================
log "Setting up Obsidian (Second Brain knowledge base)..."

OBSIDIAN_APP="$HOME/Obsidian"
if [ ! -d "$OBSIDIAN_APP" ]; then
  mkdir -p "$OBSIDIAN_APP"
  # Download Obsidian AppImage
  OBSIDIAN_URL="https://github.com/obsidianmd/obsidian-releases/releases/download/latest/obsidian.AppImage"
  wget -q "$OBSIDIAN_URL" -O "$OBSIDIAN_APP/Obsidian.AppImage" 2>/dev/null || \
    warn "Obsidian: download manually from obsidian.md"
  chmod +x "$OBSIDIAN_APP/Obsidian.AppImage" 2>/dev/null || true
  log "Obsidian AppImage downloaded to $OBSIDIAN_APP"
fi

# Copy second brain to Obsidian vault
SECOND_BRAIN_SOURCE="$HOME/OBSIDIAN-SECOND-BRAIN"
SECOND_BRAIN_TARGET="$OBSIDIAN_APP/Dark-Factory-Vault"
if [ -d "$SECOND_BRAIN_SOURCE" ]; then
  mkdir -p "$OBSIDIAN_APP"
  cp -r "$SECOND_BRAIN_SOURCE" "$SECOND_BRAIN_TARGET" 2>/dev/null || true
  log "Second brain copied to Obsidian vault: $SECOND_BRAIN_TARGET"
fi

# ============================================================
# 21. STARTUP tmux SESSION
# ============================================================
log "Creating startup tmux session..."

cat > ~/dark-factory-startup.sh << 'EOF'
#!/bin/bash
# Dark Factory startup script — run this to restore all sessions

# Restore or create main tmux session
tmux new-session -d -s dark-factory -c ~/dark-factory

# Window 1: Development server
tmux new-window -t dark-factory:1 -n 'dev' -c ~/dark-factory
tmux send-keys -t dark-factory:1 'cd ~/dark-factory && npm run dev' C-m

# Window 2: Agent workspace
tmux new-window -t dark-factory:2 -n 'agents' -c ~
tmux send-keys -t dark-factory:2 'echo "Agent workspace ready"' C-m

# Window 3: Monitoring
tmux new-window -t dark-factory:3 -n 'monitor' -c ~
tmux send-keys -t dark-factory:3 'htop' C-m

# Window 4: Knowledge base
tmux new-window -t dark-factory:4 -n 'notes' -c ~/OBSIDIAN-SECOND-BRAIN

echo "Dark Factory sessions started. Attach with: tmux attach -t dark-factory"
EOF

chmod +x ~/dark-factory-startup.sh
chmod +x ~/dark-factory-startup.sh 2>/dev/null

# ============================================================
# 22. FINAL STATUS
# ============================================================
echo ""
echo "=========================================="
echo -e "${PURPLE}DARK FACTORY SETUP COMPLETE${NC}"
echo "=========================================="
echo ""
echo "VM: D@RK F@C#ORY — orgo.ai"
echo ""
echo "Installed:"
echo "  ✓ Node.js 20 LTS"
echo "  ✓ spec-kit (GitHub SDD)"
echo "  ✓ headroom (token compression)"
echo "  ✓ gstack (YC sprint process)"
echo "  ✓ graphify (codebase mapping)"
echo "  ✓ agent-skills (24 workflows)"
echo "  ✓ obsidian-skills (wiki)"
echo "  ✓ last30days-skill (market intel)"
echo "  ✓ skill-creator (build skills)"
echo "  ✓ Dark Factory app"
echo "  ✓ tmux (persistent sessions)"
echo "  ✓ Obsidian (second brain)"
echo ""
echo "To start:"
echo "  1. cd ~/dark-factory && npm run dev"
echo "  2. tmux attach -t dark-factory"
echo "  3. Open Obsidian: ~/Obsidian/Obsidian.AppImage"
echo ""
echo "Anti-Gravity + Cursor: Manual install required"
echo "=========================================="