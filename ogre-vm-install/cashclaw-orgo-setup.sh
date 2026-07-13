#!/bin/bash
# CashClaw on Orgo VM — Setup Script
# Run on D@RK F@C#ORY VM (45.61.56.91) via SSH
# Usage: bash cashclaw-orgo-setup.sh

set -e

echo "========================================="
echo "CashClaw Setup — Dark Factory Fork"
echo "========================================="

# Check Node.js
if ! command -v node &> /dev/null; then echo "Node.js not found. Install from nodejs.org"; exit 1; fi
echo "Node version: $(node --version)"
echo "npm version: $(npm --version)"

# Install CashClaw
echo ""
echo "[1/6] Installing CashClaw..."
npm install -g cashclaw-agent 2>&1 | tail -3
npm install -g moltlaunch 2>&1 | tail -3

# Create CashClaw config directory
mkdir -p ~/.cashclaw
cd ~/.cashclaw

# Write cashclaw.json — configured for SA market + Blotato LLM
cat > cashclaw.json << 'EOF'
{
  "name": "DarkFactory-Claw-01",
  "role": "Full-Stack AI Developer",
  "skills": [
    "Web Development",
    "React",
    "Node.js",
    "Python",
    "AI Agents",
    "Landing Pages",
    "Dashboards",
    "Data Visualization"
  ],
  "baseRate": 0.002,
  "maxRate": 0.02,
  "currency": "USD",
  "llmProvider": "openrouter",
  "openrouter": {
    "apiKey": "blt_y5mVD6oMJrgFb8UsfWN3T4GSYN2ZvCeGsVWWwdaf8Og=",
    "baseUrl": "https://api.blotato.io/v1",
    "model": "meta-llama/llama-3.3-70b-instruct"
  },
  "marketplace": "moltlaunch",
  "moltlaunch": {
    "network": "mainnet",
    "wsEndpoint": "wss://api.moltlaunch.io/ws"
  },
  "memory": {
    "enabled": true,
    "path": "./knowledge.json",
    "maxEntries": 10000
  },
  "selfLearn": {
    "enabled": true,
    "studyIntervalMs": 300000
  },
  "logging": {
    "level": "info",
    "file": "./cashclaw.log"
  }
}
EOF
echo "cashclaw.json written"

# Write Dark Factory BMAD escalation tool
cat > tools/bmad-escalate.ts << 'EOF'
// Dark Factory BMAD Escalation Tool
// If task value > R2000, escalate to Dark Factory human team
import { writeFileSync } from 'fs';

export async function escalateToBMAD(task: any) {
  const threshold = 2000; // R2000
  if (task.valueUSD < threshold) return false;
  
  const escalation = {
    timestamp: new Date().toISOString(),
    agent: 'CashClaw-01',
    task: task.title,
    value: task.valueUSD,
    client: task.clientName,
    email: task.clientEmail,
    brief: task.description,
    routing: 'cto@studex-group.com'
  };
  
  writeFileSync('./escalations/latest.json', JSON.stringify(escalation, null, 2));
  console.log('[BMAD] Task escalated to Dark Factory:', task.title);
  return true;
}
EOF

# Write systemd service for auto-start
cat > /etc/systemd/system/cashclaw.service << 'EOF'
[Unit]
Description=CashClaw Autonomous Agent
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/root/.cashclaw
ExecStart=/usr/local/bin/cashclaw
Restart=always
RestartSec=10
StandardOutput=append:/var/log/cashclaw.log
StandardError=append:/var/log/cashclaw.err

[Install]
WantedBy=multi-user.target
EOF

echo "[2/6] Enabling CashClaw service..."
systemctl daemon-reload
systemctl enable cashclaw
systemctl start cashclaw
systemctl status cashclaw --no-pager || true

echo ""
echo "[3/6] Testing LLM connection via Blotato..."
curl -s https://api.blotato.io/v1/models 2>&1 | head -5 || echo "Blotato check done"

echo ""
echo "[4/6] Setting up log rotation..."
cat > /etc/logrotate.d/cashclaw << 'EOF'
/var/log/cashclaw.log {
    daily
    rotate 7
    compress
    delaycompress
    missingok
    notifempty
}
EOF

echo ""
echo "[5/6] Installing PM2 for process management..."
npm install -g pm2
pm2 start cashclaw --name dark-factory-claw
pm2 save
pm2 startup

echo ""
echo "[6/6] Done!"
echo "========================================="
echo "Dashboard: http://localhost:3777"
echo "Logs: /var/log/cashclaw.log"
echo "Config: /root/.cashclaw/cashclaw.json"
echo "PM2: pm2 status"
echo "Restart: sudo systemctl restart cashclaw"
echo "========================================="
