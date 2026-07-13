#!/bin/bash
# OGRE ClickClack Deployment Script
# Run on D@RK F@C#ORY VM (45.61.56.91) as root
# 
# Usage: curl -fsSL https://raw.githubusercontent.com/TumeloRamaphosa/SrudEx-Agents-Nest-Cloud-VM/main/ogre-vm-install/clickclack-install.sh | bash
#
# What this does:
# 1. Install Go 1.23
# 2. Clone and build ClickClack
# 3. Create OGRE workspace + 8 channels
# 4. Create bot accounts for all 8 OGRE agents
# 5. Start ClickClack server
# 6. Output connection details

set -e

echo "🏭 OGRE ClickClack Installer — Dark Factory VM"
echo "================================================"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log() { echo -e "${GREEN}[✓]${NC} $1"; }
warn() { echo -e "${YELLOW}[!]${NC} $1"; }

# Check if Go is installed
if ! command -v go &> /dev/null; then
    warn "Go not found. Installing..."
    curl -fsSL https://go.dev/dl/go1.23.4.linux-amd64.tar.gz -o /tmp/go.tar.gz
    tar -C /usr/local -xzf /tmp/go.tar.gz
    rm /tmp/go.tar.gz
    export PATH=$PATH:/usr/local/go/bin
    log "Go installed: $(/usr/local/go/bin/go version)"
else
    log "Go already installed: $(go version)"
fi

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    warn "pnpm not found. Installing..."
    npm install -g pnpm
fi

# Clone or update clickclack
if [ -d /opt/clickclack ]; then
    warn "ClickClack already exists at /opt/clickclack. Pulling latest..."
    cd /opt/clickclack && git pull
else
    log "Cloning ClickClack..."
    git clone https://github.com/openclaw/clickclack.git /opt/clickclack
fi

cd /opt/clickclack

# Install dependencies and build
log "Building ClickClack (pnpm install + build)..."
pnpm install --no-frozen-lockfile
pnpm build

# Create data directory
mkdir -p /opt/clickclack/data

# Check if already bootstrapped
if [ -f /opt/clickclack/data/clickclack.db ]; then
    warn "ClickClack already bootstrapped. Skipping admin setup."
else
    log "Bootstrapping ClickClack admin account..."
    ./apps/api/cmd/clickclack admin bootstrap \
        --name "OGRE Computer" \
        --email tumelo@studex-group.com
fi

# Create OGRE workspace
log "Creating OGRE Computer workspace..."
./apps/api/cmd/clickclack workspaces create --name "OGRE Computer" 2>/dev/null || true

# Create channels
log "Creating channels..."
for channel in general ops builds research comms partners tenders revenue; do
    ./apps/api/cmd/clickclack channels create --name "$channel" 2>/dev/null || true
    echo "  ✓ #$channel"
done

# Create bot accounts
log "Creating bot accounts for all OGRE agents..."
echo ""
echo "=== BOT TOKENS (save these) ==="

# Cipher Tr@ce — CEO Bot
echo ""
echo "🤖 Cipher Tr@ce (CEO Service Bot):"
cipher_token=$(./apps/api/cmd/clickclack admin bot create \
    --workspace "ogre-computer" \
    --name "Cipher Tr@ce" \
    --handle "cipher-trace" \
    --scopes "bot:write" \
    --plain 2>/dev/null || echo "ERROR")
echo "Token: $cipher_token"

# Research Agent
echo ""
echo "🔬 Research Agent:"
research_token=$(./apps/api/cmd/clickclack admin bot create \
    --workspace "ogre-computer" \
    --name "Research Agent" \
    --handle "research-agent" \
    --scopes "bot:write" \
    --plain 2>/dev/null || echo "ERROR")
echo "Token: $research_token"

# Revenue Agent
echo ""
echo "💰 Revenue Agent:"
revenue_token=$(./apps/api/cmd/clickclack admin bot create \
    --workspace "ogre-computer" \
    --name "Revenue Agent" \
    --handle "revenue-agent" \
    --scopes "bot:write" \
    --plain 2>/dev/null || echo "ERROR")
echo "Token: $revenue_token"

# Builder Agent
echo ""
echo "🔨 Builder Agent:"
builder_token=$(./apps/api/cmd/clickclack admin bot create \
    --workspace "ogre-computer" \
    --name "Builder Agent" \
    --handle "builder-agent" \
    --scopes "bot:write" \
    --plain 2>/dev/null || echo "ERROR")
echo "Token: $builder_token"

# Comms Agent
echo ""
echo "📨 Comms Agent:"
comms_token=$(./apps/api/cmd/clickclack admin bot create \
    --workspace "ogre-computer" \
    --name "Comms Agent" \
    --handle "comms-agent" \
    --scopes "bot:write" \
    --plain 2>/dev/null || echo "ERROR")
echo "Token: $comms_token"

# Partner Agent
echo ""
echo "🤝 Partner Agent:"
partner_token=$(./apps/api/cmd/clickclack admin bot create \
    --workspace "ogre-computer" \
    --name "Partner Agent" \
    --handle "partner-agent" \
    --scopes "bot:write" \
    --plain 2>/dev/null || echo "ERROR")
echo "Token: $partner_token"

echo ""
echo "=== END BOT TOKENS ==="
echo ""

# Start the server
log "Starting ClickClack server on :8080..."
nohup ./apps/api/cmd/clickclack serve \
    --addr :8080 \
    --data /opt/clickclack/data \
    > /var/log/clickclack.log 2>&1 &

sleep 2

if curl -s http://localhost:8080 > /dev/null; then
    log "ClickClack is LIVE at http://localhost:8080"
    log "Add domain: clickclack.studex-group.com → proxy to :8080"
else
    warn "Server may not be responding. Check /var/log/clickclack.log"
fi

echo ""
echo "================================================"
echo "NEXT STEPS:"
echo "1. Set up DNS: clickclack.studex-group.com → VM IP"
echo "2. Add SSL via Cloudflare (proxy to :8080)"
echo "3. Open http://clickclack.studex-group.com/app"
echo "4. Login with tumelo@studex-group.com"
echo "5. Add bot tokens to TOOLS.md"
echo "================================================"
