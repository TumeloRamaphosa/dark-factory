#!/bin/bash
# Orgo VM Provisioning Script — CashClaw Dedicated VM
# Uses Orgo API to spin up a new desktop/VM for CashClaw agents

ORGO_KEY="sk_live_1770eb20bb9b07506723a87091416e02e71863c82d3c032e"
BASE_URL="https://www.orgo.ai/api"

echo "=============================================="
echo "Orgo VM Provisioner — CashClaw Farm"
echo "=============================================="

# Check current credits
echo "[1] Checking Orgo credits..."
curl -s -H "Authorization: Bearer $ORGO_KEY" \
  "$BASE_URL/credits" 2>&1

echo ""
echo "[2] Listing current desktops..."
curl -s -H "Authorization: Bearer $ORGO_KEY" \
  "$BASE_URL/desktops" 2>&1

echo ""
echo "[3] Creating CashClaw VM (4 vCPU, 8GB RAM)..."
curl -s -X POST -H "Authorization: Bearer $ORGO_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "CashClaw-Farm-01",
    "plan": "medium",
    "region": "Johannesburg",
    "os": "ubuntu-22.04",
    "label": "DarkFactory-CashClaw"
  }' \
  "$BASE_URL/desktops" 2>&1

echo ""
echo "[4] Provision complete. Check Orgo dashboard:"
echo "https://www.orgo.ai/desktops"
echo ""
echo "Once VM is ready, SSH in and run:"
echo "bash <(curl -s https://raw.githubusercontent.com/TumeloRamaphosa/dark-factory/main/cashclaw-orgo-setup.sh)"
