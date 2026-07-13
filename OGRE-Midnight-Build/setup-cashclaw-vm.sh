#!/bin/bash
# CashClaw VM Setup Script for D@RK F@C#ORY
# Run on VM desktop: bash setup-cashclaw-vm.sh

set -e
echo "=== OGRE Computer — CashClaw VM Setup ==="
echo "Agent: OGRE-Claw | Owner: Studex Group"
echo ""

# 1. Install Node.js if not present
if ! command -v node &> /dev/null; then
  echo "[1/6] Installing Node.js..."
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y nodejs
else
  echo "[1/6] Node.js already installed: $(node --version)"
fi

# 2. Clone CashClaw
echo "[2/6] Cloning CashClaw..."
cd ~
if [ -d CashClaw ]; then
  echo "CashClaw already cloned — pulling latest..."
  cd CashClaw && git pull
else
  git clone https://github.com/ErtugrulAkben/CashClaw.git
  cd CashClaw
fi

# 3. Install dependencies
echo "[3/6] Installing CashClaw dependencies..."
npm install

# 4. Install globally
echo "[4/6] Installing CashClaw globally..."
npm install -g .

# 5. Initialize CashClaw (non-interactive)
echo "[5/6] Configuring CashClaw..."
mkdir -p ~/.cashclaw/skills ~/.cashclaw/missions ~/.cashclaw/logs

# Copy skills
cp -r skills/* ~/.cashclaw/skills/

# Write config
cat > ~/.cashclaw/config.json << 'CONFIG'
{
  "agent": {
    "name": "OGRE-Claw",
    "owner": "Studex Group — OGRE Computer",
    "email": "info@studexmeat.com",
    "timezone": "Africa/Johannesburg"
  },
  "hyrve": {
    "enabled": true,
    "api_key": "YOUR_HYRVE_API_KEY_HERE",
    "auto_accept": false,
    "max_budget_usd": 500
  },
  "stripe": {
    "enabled": false,
    "secret_key": "YOUR_STRIPE_SECRET_KEY_HERE",
    "currency": "usd"
  },
  "guard": {
    "enabled": true,
    "policy_file": "~/.cashclaw/guard-policy.yaml",
    "max_cost_per_run_usd": 10,
    "max_recursion_depth": 10
  }
}
CONFIG

# Write Guard policy
cat > ~/.cashclaw/guard-policy.yaml << 'POLICY'
version: "1.0"
guard:
  max_cost_per_run_usd: 10
  max_recursion_depth: 10
  kill_on_overrun: true
  tool_firewall:
    allowlist: [web-search, read-file, write-file, browser, message, execute, deploy]
    denylist: [rm, sudo, mkfs, dd]
    rate_limit:
      browser: 30/min
      execute: 10/min
  cost_alerts:
    - threshold: 2
      notify: log
    - threshold: 5
      notify: log
    - threshold: 10
      notify: webhook
  recursion_policy:
    window_seconds: 60
    max_calls: 20
    action: kill
POLICY

# 6. Verify
echo "[6/6] Verifying installation..."
node src/cli/index.js --version 2>/dev/null && echo "✅ CashClaw v1.7.0 ready!"

echo ""
echo "=== Setup Complete ==="
echo ""
echo "NEXT STEPS:"
echo "1. Get your HYRVE API key: https://hyrve.ai"
echo "2. Get your Stripe key: https://dashboard.stripe.com"
echo "3. Edit ~/.cashclaw/config.json and add your API keys"
echo "4. Run: cashclaw hyrve connect --api-key YOUR_KEY"
echo "5. Run: cashclaw guard init"
echo ""
echo "13 Skills Available:"
echo "  cashclaw-seo-auditor         — SEO audit reports"
echo "  cashclaw-content-writer      — blog posts, email newsletters"
echo "  cashclaw-lead-generator      — lead gen campaigns"
echo "  cashclaw-whatsapp-manager    — WhatsApp setup + management"
echo "  cashclaw-social-media        — social media management"
echo "  cashclaw-email-outreach      — cold email sequences"
echo "  cashclaw-competitor-analyzer — competitor research"
echo "  cashclaw-landing-page        — landing page creation"
echo "  cashclaw-data-scraper        — web data scraping"
echo "  cashclaw-reputation-manager  — ORM management"
echo "  cashclaw-invoicer            — automated invoicing + Stripe"
echo "  cashclaw-guard               — runtime protection"
echo "  cashclaw-core                — orchestration engine"
echo ""
echo "TO START THE AGENT MARKETPLACE DAEMON:"
echo "  cashclaw hyrve poll &"
echo "  # Runs in background, polls HYRVE AI marketplace for jobs"
