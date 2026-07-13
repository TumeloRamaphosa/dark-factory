#!/bin/bash
# ═══════════════════════════════════════════════════════════════
# OGRE Rocket.Chat Server Setup
# Run this on any VM (e.g., D@RK F@C#ORY or a new VM)
# Usage: bash setup-rocket-chat.sh
# ═══════════════════════════════════════════════════════════════

set -e

ROCKETCHAT_VERSION="6.12.2"
ROCKETCHAT_PORT="3000"
ROCKETCHAT_ADMIN_EMAIL="info@studexmeat.com"
ROCKETCHAT_ADMIN_PASS="Opencodeclaw1$"
ROCKETCHAT_ADMIN_USER="cipher"
MONGO_VERSION="6.0"

echo "🚀 Installing Rocket.Chat ${ROCKETCHAT_VERSION}..."

# Install Docker if not present
if ! command -v docker &> /dev/null; then
    echo "📦 Installing Docker..."
    curl -fsSL https://get.docker.com | sh
    systemctl enable docker
    systemctl start docker
fi

# Create Docker network
docker network create ogre-net 2>/dev/null || true

# Stop existing Rocket.Chat
docker stop ogre-rocket 2>/dev/null || true
docker rm ogre-rocket 2>/dev/null || true

# Launch MongoDB
echo "📦 Starting MongoDB..."
docker run -d \
  --name ogre-mongo \
  --network ogre-net \
  -v ogre-mongo-data:/data/db \
  -e MONGO_INITDB_DATABASE=rocket.chat \
  mongo:${MONGO_VERSION} \
  --replSet rs1 \
  --bind_ip_all

sleep 5

# Initialize replica set
docker exec ogre-mongo mongosh --eval "
  rs.initiate({
    _id: 'rs1',
    members: [{ _id: 0, host: '127.0.0.1:27017' }]
  });
"

# Launch Rocket.Chat
echo "🚀 Starting Rocket.Chat..."
docker run -d \
  --name ogre-rocket \
  --network ogre-net \
  -p ${ROCKETCHAT_PORT}:3000 \
  -e MONGO_URL="mongodb://ogre-mongo:27017/rocket.chat?replicaSet=rs1" \
  -e MONGO_OPLOG_URL="mongodb://ogre-mongo:27017/local?replicaSet=rs1" \
  -e ROOT_URL="http://45.61.56.91:${ROCKETCHAT_PORT}" \
  -e PORT=${ROCKETCHAT_PORT} \
  -e ADMIN_EMAIL=${ROCKETCHAT_ADMIN_EMAIL} \
  -e ADMIN_PASS=${ROCKETCHAT_ADMIN_PASS} \
  -e ADMIN_USERNAME=${ROCKETCHAT_ADMIN_USER} \
  -v ogre-rocket-uploads:/app/uploads \
  rocketchat/rocket.chat:${ROCKETCHAT_VERSION}

echo ""
echo "⏳ Waiting for Rocket.Chat to start (this takes 2-3 minutes)..."
for i in $(seq 1 60); do
    if curl -sf http://localhost:${ROCKETCHAT_PORT} > /dev/null 2>&1; then
        echo ""
        echo "✅ Rocket.Chat is ONLINE!"
        echo ""
        echo "═══════════════════════════════════════════════"
        echo "📋 OGRE Rocket.Chat Setup Complete"
        echo "═══════════════════════════════════════════════"
        echo "URL:      http://45.61.56.91:${ROCKETCHAT_PORT}"
        echo "Admin:    ${ROCKETCHAT_ADMIN_USER}"
        echo "Email:    ${ROCKETCHAT_ADMIN_EMAIL}"
        echo "Password: ${ROCKETCHAT_ADMIN_PASS}"
        echo "═══════════════════════════════════════════════"
        echo ""
        echo "📌 Next steps:"
        echo "1. Go to http://45.61.56.91:${ROCKETCHAT_PORT}"
        echo "2. Login with admin credentials above"
        echo "3. Create channels: #ops, #builds, #sales, #tenders, #revenue"
        echo "4. Invite the Comms Agent bot"
        echo "5. Connect via API:"
        echo "   curl -H 'Content-Type: application/json' \\"
        echo "     -d '{\"user\":\"${ROCKETCHAT_ADMIN_USER}\",\"password\":\"${ROCKETCHAT_ADMIN_PASS}\"}' \\"
        echo "     http://45.61.56.91:${ROCKETCHAT_PORT}/api/v1/login"
        exit 0
    fi
    echo -n "."
    sleep 3
done

echo ""
echo "⚠️ Rocket.Chat took too long to start."
echo "Check logs: docker logs ogre-rocket"
