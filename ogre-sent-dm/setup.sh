#!/bin/bash
# ═══════════════════════════════════════════════════════════════
# OGRE Sent.dm DM Bot Setup — Automated client outreach
# Repo: github.com/sonnysangha/sent-dm-demo
# Purpose: Send SMS, WhatsApp, and Discord DMs programmatically
# ═══════════════════════════════════════════════════════════════

set -e

echo "🚀 Installing Sent.dm DM Bot..."

# Install Node if not present
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_24.x | bash -
    apt-get install -y nodejs
fi

# Create directory
mkdir -p ~/ogre-sent-dm
cd ~/ogre-sent-dm

# Clone the demo
git clone https://github.com/sonnysangha/sent-dm-demo.git .
rm -rf .git

# Install dependencies
npm install

# Create .env from example
if [ -f .env.example ]; then
    cp .env.example .env
fi

echo ""
echo "═══════════════════════════════════════════════"
echo "📋 Sent.dm Setup — ADD YOUR KEYS"
echo "═══════════════════════════════════════════════"
echo ""
echo "1. Get Sent.dm API key: https://sent-dm.com"
echo "2. Get Discord Bot Token: discord.com/developers"
echo "3. Edit .env:"
echo ""
echo "   SENT_DM_API_KEY=your_sent_dm_key"
echo "   DISCORD_BOT_TOKEN=your_discord_token"
echo "   OPENAI_API_KEY=your_openai_key"
echo ""
echo "4. Run: npm start"
echo ""
echo "═══════════════════════════════════════════════"
echo ""
echo "📋 What Sonnysangha's sent-dm-demo does:"
echo "   • Send DMs via Discord programmatically"
echo "   • Send SMS via multiple providers"
echo "   • AI-powered response handling"
echo "   • Automated outreach campaigns"
echo ""
echo "🏭 OGRE Use Cases:"
echo "   • DM leads from LinkedIn outreach"
echo "   • SMS appointment reminders"
echo "   • WhatsApp client notifications"
echo "   • Automated sales follow-ups"
echo ""
