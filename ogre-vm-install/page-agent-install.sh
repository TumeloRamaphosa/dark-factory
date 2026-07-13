#!/bin/bash
# OGRE VM — Page-Agent Installation Script
# Run on D@RK F@C#ORY VM (or any OGRE VM)
# Repo: https://github.com/alibaba/page-agent
# Purpose: Web automation agent for OGRE operating system
# Run as: bash <(curl -s https://raw.githubusercontent.com/TumeloRamaphosa/ogre-vm-install/main/page-agent-install.sh)

set -e
echo "=========================================="
echo "OGRE VM — Page-Agent Installer"
echo "Cipher Tr@ce · Dark Factory"
echo "=========================================="

# Check Node.js version
NODE_VERSION=$(node --version 2>/dev/null || echo "NOT_INSTALLED")
echo "[CHECK] Node.js version: $NODE_VERSION"

if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js is not installed. Install from https://nodejs.org"
    exit 1
fi

# Create ogre-agents directory
mkdir -p ~/ogre-agents
cd ~/ogre-agents

# Clone or update page-agent
if [ -d "page-agent" ]; then
    echo "[UPDATE] Pulling latest page-agent..."
    cd page-agent && git pull
else
    echo "[INSTALL] Cloning alibaba/page-agent..."
    git clone https://github.com/alibaba/page-agent.git
    cd page-agent
fi

# Install dependencies
echo "[BUILD] Installing npm dependencies..."
npm install

# Install globally for CLI access
echo "[GLOBAL] Installing page-agent globally..."
npm install -g page-agent

# Verify installation
echo "[VERIFY] Verifying page-agent..."
npx page-agent --version 2>/dev/null || echo "CLI available via npx page-agent"

# Create OGRE config
mkdir -p ~/.ogre/config
cat > ~/.ogre/config/page-agent.json << 'EOF'
{
  "name": "OGRE Web Agent",
  "description": "Web automation agent for OGRE Computer — reads DOM, fills forms, scrapes, automates",
  "repo": "https://github.com/alibaba/page-agent",
  "installed": "$(date -u +%Y-%m-%d)",
  "capabilities": [
    "DOM reading and manipulation",
    "Natural language web interaction",
    "Form filling and submission",
    "Web scraping and data extraction",
    "MCP server support (beta)"
  ],
  "mcp_endpoint": "http://localhost:3001",
  "models": ["qwen3.5-plus", "claude-sonnet-4"],
  "vm_user": "ogre"
}
EOF

echo ""
echo "=========================================="
echo "[DONE] Page-Agent installed successfully"
echo "=========================================="
echo ""
echo "Next steps:"
echo "1. Start MCP server: cd ~/ogre-agents/page-agent && npm run mcp-server"
echo "2. Or run via npx: npx page-agent"
echo ""
echo "To integrate with OGRE OpenClaw, add to openclaw.json MCP servers:"
echo '{ "command": "npx", "args": ["page-agent", "mcp-server"] }'
echo ""
