#!/bin/bash
#===============================================================================
# StudEx Client Provisioning Script
# Provisions a new StudEx Claw VM client on ORGO AI VM
# Usage: ./provision.sh <client_id> <tier> <email> [whatsapp_token] [whatsapp_phone]
#===============================================================================

set -euo pipefail

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Logging
log_info()  { echo -e "${BLUE}[INFO]${NC}  $*"; }
log_ok()    { echo -e "${GREEN}[OK]${NC}   $*"; }
log_warn()  { echo -e "${YELLOW}[WARN]${NC} $*"; }
log_error() { echo -e "${RED}[ERR]${NC}  $*" >&2; }

# Config paths
BASE_DIR="/opt/studex"
PROFILES_DIR="${BASE_DIR}/profiles"
NGINX_AVAILABLE="/etc/nginx/sites-available"
NGINX_ENABLED="/etc/nginx/sites-enabled"
STUDEX_REPO="/opt/studex-agents"

#===============================================================================
# Parse arguments
#===============================================================================
if [[ $# -lt 3 ]]; then
    echo "Usage: $0 <client_id> <tier> <email> [whatsapp_token] [whatsapp_phone]"
    echo ""
    echo "Arguments:"
    echo "  client_id        Unique client identifier (e.g. acme-corp)"
    echo "  tier             Subscription tier: starter | professional | enterprise"
    echo "  email            Client admin email for onboarding"
    echo "  whatsapp_token   (optional) WhatsApp Business API access token"
    echo "  whatsapp_phone   (optional) WhatsApp Business phone number ID"
    exit 1
fi

CLIENT_ID="$1"
TIER="$2"
CLIENT_EMAIL="$3"
WHATSAPP_TOKEN="${4:-}"
WHATSAPP_PHONE="${5:-}"
TIMESTAMP=$(date +%s)

# Validate tier
VALID_TIERS=("starter" "professional" "enterprise")
if [[ ! " ${VALID_TIERS[*]} " =~ " ${TIER} " ]]; then
    log_error "Invalid tier: ${TIER}. Must be one of: ${VALID_TIERS[*]}"
    exit 1
fi

# Derived values
CLIENT_USER="studex-${CLIENT_ID}"
CLIENT_HOME="/home/${CLIENT_USER}"
CLIENT_PORT=$((18700 + RANDOM % 100))
CLIENT_DOMAIN="${CLIENT_ID}.studexagents.africa"

log_info "Provisioning client: ${CLIENT_ID} (${TIER} tier)"
log_info "Email: ${CLIENT_EMAIL}"
log_info "Port: ${CLIENT_PORT}"
log_info "Domain: ${CLIENT_DOMAIN}"

#===============================================================================
# Pre-flight checks
#===============================================================================
log_info "Running pre-flight checks..."

if id "${CLIENT_USER}" &>/dev/null; then
    log_error "User ${CLIENT_USER} already exists. Choose a different client_id."
    exit 1
fi

if ! command -v docker &>/dev/null; then
    log_error "Docker is not installed. Run setup-studex-vm.sh first."
    exit 1
fi

if ! command -v jq &>/dev/null; then
    log_error "jq is not installed. Install with: apt-get install -y jq"
    exit 1
fi

# Load tier config
TIER_CONFIG=$(cat "${BASE_DIR}/config/tiers.json")
RAM=$(echo "$TIER_CONFIG" | jq -r ".${TIER}.ram")
STORAGE=$(echo "$TIER_CONFIG" | jq -r ".${TIER}.storage")
N8N_FLOWS=$(echo "$TIER_CONFIG" | jq -r ".${TIER}.n8n_flows")
AGENTS=$(echo "$TIER_CONFIG" | jq -r ".${TIER}.agents | join(\",\")")

log_info "Tier resources: RAM=${RAM}, Storage=${STORAGE}, N8N flows=${N8N_FLOWS}"

#===============================================================================
# 1. Create system user account
#===============================================================================
log_info "Creating user account: ${CLIENT_USER}"

useradd -m \
    -s /bin/bash \
    -c "StudEx Client: ${CLIENT_ID}" \
    "${CLIENT_USER}"

# Set secure password (random, client will reset)
TEMP_PASS=$(openssl rand -base64 24)
echo "${CLIENT_USER}:${TEMP_PASS}" | chpasswd

# Create app directories
mkdir -p "${CLIENT_HOME}/.config/openclaw"
mkdir -p "${CLIENT_HOME}/n8n/data"
mkdir -p "${CLIENT_HOME}/n8n/files"
mkdir -p "${CLIENT_HOME}/logs"
mkdir -p "${CLIENT_HOME}/monitoring"

chown -R "${CLIENT_USER}:${CLIENT_USER}" "${CLIENT_HOME}"

log_ok "User account created: ${CLIENT_USER}"

#===============================================================================
# 2. Deploy OpenClaw tier config
#===============================================================================
log_info "Deploying OpenClaw tier configuration..."

OC_CONFIG="${BASE_DIR}/config/openclaw-tier-configs/${TIER}.json"

if [[ ! -f "${OC_CONFIG}" ]]; then
    log_error "Tier config not found: ${OC_CONFIG}"
    exit 1
fi

# Inject runtime values into config
OC_CONFIG_RUNTIME="${CLIENT_HOME}/.config/openclaw/gateway.json"

jq --arg port "${CLIENT_PORT}" \
   --arg client_id "${CLIENT_ID}" \
   --arg client_email "${CLIENT_EMAIL}" \
   --arg domain "${CLIENT_DOMAIN}" \
   '
    .gateway.port = ($port | tonumber) |
    .gateway.host = "127.0.0.1" |
    .client_id = $client_id |
    .client_email = $client_email |
    .domain = $domain
   ' "${OC_CONFIG}" > "${OC_CONFIG_RUNTIME}"

chown "${CLIENT_USER}:${CLIENT_USER}" "${OC_CONFIG_RUNTIME}"
log_ok "OpenClaw config deployed to ${OC_CONFIG_RUNTIME}"

#===============================================================================
# 3. Generate WhatsApp credentials (if not provided)
#===============================================================================
log_info "Configuring WhatsApp Business API..."

WA_CREDS_FILE="${CLIENT_HOME}/.config/whatsapp.json"

if [[ -n "${WHATSAPP_TOKEN}" && -n "${WHATSAPP_PHONE}" ]]; then
    jq -n \
        --arg token "${WHATSAPP_TOKEN}" \
        --arg phone "${WHATSAPP_PHONE}" \
        --arg client_id "${CLIENT_ID}" \
        --arg ts "$(date -Iseconds)" \
        '{
           access_token: $token,
           phone_number_id: $phone,
           client_id: $client_id,
           configured_at: $ts,
           webhook_url: "https://\($client_id).studexagents.africa/webhooks/whatsapp"
         }' > "${WA_CREDS_FILE}"
else
    # Placeholder for client to fill in later
    jq -n \
        --arg client_id "${CLIENT_ID}" \
        '{
           access_token: "PENDING_CONFIGURATION",
           phone_number_id: "PENDING_CONFIGURATION",
           client_id: $client_id,
           configured_at: null,
           webhook_url: "https://\($client_id).studexagents.africa/webhooks/whatsapp",
           pending: true
         }' > "${WA_CREDS_FILE}"
    log_warn "WhatsApp credentials not provided — client must configure manually"
fi

chown "${CLIENT_USER}:${CLIENT_USER}" "${WA_CREDS_FILE}"
log_ok "WhatsApp config written"

#===============================================================================
# 4. Deploy docker-compose.yml for n8n
#===============================================================================
log_info "Deploying n8n Docker container..."

# Determine port mapping strategy
# Each client gets a unique internal port; external port = CLIENT_PORT
N8N_WEB_PORT=5678

cat > "${CLIENT_HOME}/docker-compose.yml" <<EOF
version: "3.8"

services:
  n8n:
    image: n8nio/n8n:latest
    container_name: studex-n8n-${CLIENT_ID}
    restart: unless-stopped
    ports:
      - "127.0.0.1:${CLIENT_PORT}:${N8N_WEB_PORT}"
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=studex-${CLIENT_ID}
      - N8N_BASIC_AUTH_PASSWORD=${TEMP_PASS}
      - N8N_HOST=${CLIENT_DOMAIN}
      - N8N_PROTOCOL=https
      - N8N_PORT=${N8N_WEB_PORT}
      - WEBHOOK_URL=https://${CLIENT_DOMAIN}/
      - EXECUTIONS_DATA_SAVE_ON_ERROR=all
      - EXECUTIONS_DATA_SAVE_ON_SUCCESS=all
      - GENERIC_TIMEZONE=Africa/Nairobi
      - N8N_LOG_LEVEL=info
    volumes:
      - ./n8n/data:/home/node/.n8n
      - ./n8n/files:/files
    networks:
      - studex-network
    healthcheck:
      test: ["CMD", "wget", "--spider", "-q", "http://localhost:${N8N_WEB_PORT}/healthz"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 60s
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.studex-${CLIENT_ID}.rule=Host(\`${CLIENT_DOMAIN}\`)"
      - "traefik.http.routers.studex-${CLIENT_ID}.entrypoints=websecure"
      - "traefik.http.routers.studex-${CLIENT_ID}.tls=true"
      - "traefik.http.routers.studex-${CLIENT_ID}.tls.certresolver=letsencrypt"
      - "traefik.http.services.studex-${CLIENT_ID}.loadbalancer.server.port=${N8N_WEB_PORT}"
      - "studex.client.id=${CLIENT_ID}"
      - "studex.tier=${TIER}"

networks:
  studex-network:
    external: true
EOF

chown "${CLIENT_USER}:${CLIENT_USER}" "${CLIENT_HOME}/docker-compose.yml"
log_ok "docker-compose.yml deployed"

#===============================================================================
# 5. Start n8n container
#===============================================================================
log_info "Starting n8n container..."

# Ensure studex-network exists
docker network create studex-network &>/dev/null || true

# Start as client user via systemd (or directly for now)
cd "${CLIENT_HOME}"
sudo -u "${CLIENT_USER}" docker compose -f "${CLIENT_HOME}/docker-compose.yml" up -d

log_ok "n8n container started"

#===============================================================================
# 6. Configure nginx reverse proxy
#===============================================================================
log_info "Configuring nginx reverse proxy..."

NGINX_CONF="${NGINX_AVAILABLE}/studex-${CLIENT_ID}.conf"

cat > "${NGINX_CONF}" <<EOF
# StudEx client reverse proxy: ${CLIENT_ID}
# Domain: ${CLIENT_DOMAIN}
# Port: ${CLIENT_PORT}

upstream studex_${CLIENT_ID} {
    server 127.0.0.1:${CLIENT_PORT};
}

server {
    listen 80;
    server_name ${CLIENT_DOMAIN};

    # ACME challenge for Let's Encrypt
    location /.well-known/acme-challenge/ {
        root /var/www/acme;
        try_files \$uri =404;
    }

    # Redirect HTTP to HTTPS (after SSL provisioned)
    # Uncomment when SSL is ready:
    # return 301 https://\$host\$request_uri;
}

# HTTPS server block (enable after Let's Encrypt SSL provisioning)
# server {
#     listen 443 ssl http2;
#     server_name ${CLIENT_DOMAIN};
#
#     ssl_certificate     /etc/letsencrypt/live/${CLIENT_DOMAIN}/fullchain.pem;
#     ssl_certificate_key /etc/letsencrypt/live/${CLIENT_DOMAIN}/privkey.pem;
#     ssl_protocols       TLSv1.2 TLSv1.3;
#     ssl_ciphers         ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
#
#     client_max_body_size 50M;
#
#     location / {
#         proxy_pass         http://studex_${CLIENT_ID};
#         proxy_set_header   Host \$host;
#         proxy_set_header   X-Real-IP \$remote_addr;
#         proxy_set_header   X-Forwarded-For \$proxy_add_x_forwarded_for;
#         proxy_set_header   X-Forwarded-Proto \$scheme;
#         proxy_set_header   X-Studex-Client-ID ${CLIENT_ID};
#         proxy_set_header   X-Studex-Tier ${TIER};
#
#         # Timeouts
#         proxy_connect_timeout 60s;
#         proxy_send_timeout    300s;
#         proxy_read_timeout    300s;
#
#         # WebSocket support
#         proxy_http_version 1.1;
#         proxy_set_header Upgrade \$http_upgrade;
#         proxy_set_header Connection "upgrade";
#
#         # Buffering
#         proxy_buffering off;
#     }
#
#     # Rate limiting
#     limit_req zone=studex_api burst=20 nodelay;
#     limit_conn conn_limit 10;
# }
EOF

# Enable site
ln -sf "${NGINX_CONF}" "${NGINX_ENABLED}/studex-${CLIENT_ID}.conf" 2>/dev/null || true

# Reload nginx
nginx -t && systemctl reload nginx
log_ok "Nginx reverse proxy configured"

#===============================================================================
# 7. Set up monitoring
#===============================================================================
log_info "Setting up monitoring..."

MONITOR_SCRIPT="${CLIENT_HOME}/monitoring/agent-monitor.sh"
cat > "${MONITOR_SCRIPT}" <<'MONEOF'
#!/bin/bash
# StudEx Agent Activity Monitor — runs via cron every 5 min
CLIENT_HOME_DIR="$(dirname "$(dirname "$0")")"
LOG_FILE="${CLIENT_HOME_DIR}/logs/agent-activity.log"
TIMESTAMP=$(date +%Y-%m-%dT%H:%M:%S%z)

# Check n8n container
N8N_STATUS=$(docker inspect --format='{{.State.Status}}' "studex-n8n-${CLIENT_ID}" 2>/dev/null || echo "unknown")
N8N_RESTART_COUNT=$(docker inspect --format='{{.RestartCount}}' "studex-n8n-${CLIENT_ID}" 2>/dev/null || echo "0")

# Check CPU / RAM usage for client processes
CPU_PCT=$(top -bn1 -u "${CLIENT_USER}" | awk '/^top/{next} NR>6{sum+=$9} END{printf "%.1f", sum}')
MEM_PCT=$(ps aux -U "${CLIENT_USER}" --no-headers | awk '{sum+=$4} END{printf "%.1f", sum}')

# Log
echo "${TIMESTAMP} n8n=${N8N_STATUS} n8n_restarts=${N8N_RESTART_COUNT} cpu=${CPU_PCT}% mem=${MEM_PCT}%" >> "${LOG_FILE}"

# Alert if container is down
if [[ "${N8N_STATUS}" != "running" ]]; then
    echo "[ALERT] ${TIMESTAMP} n8n container is DOWN for client ${CLIENT_ID}" >> "${LOG_FILE}"
    # Attempt restart
    docker start "studex-n8n-${CLIENT_ID}" &>/dev/null
fi
MONEOF

# Patch the script with actual client ID
sed -i "s/\${CLIENT_ID}/${CLIENT_ID}/g" "${MONITOR_SCRIPT}"
chmod +x "${MONITOR_SCRIPT}"
chown "${CLIENT_USER}:${CLIENT_USER}" "${MONITOR_SCRIPT}"

# Add to crontab
CRON_JOB="*/5 * * * * ${MONITOR_SCRIPT}"
(grep -v "${CLIENT_USER}" /var/spool/cron/crontabs/root 2>/dev/null; echo "${CRON_JOB}") | crontab - 2>/dev/null || true

log_ok "Monitoring configured"

#===============================================================================
# 8. Create client onboarding script
#===============================================================================
log_info "Creating onboarding script..."

ONBOARD_SCRIPT="${CLIENT_HOME}/onboard.sh"
cat > "${ONBOARD_SCRIPT}" <<'ONBOARDEOF'
#!/bin/bash
# StudEx Client Onboarding Script
# Run by client on first login to complete setup

set -e

echo "========================================"
echo "  Welcome to StudEx Super Agents!"
echo "========================================"
echo ""

# Prompt for WhatsApp token if not set
if grep -q "PENDING_CONFIGURATION" ~/.config/whatsapp.json 2>/dev/null; then
    echo "📱 WhatsApp Setup Required"
    echo "Please provide your WhatsApp Business API credentials:"
    read -rp "Access Token: " WA_TOKEN
    read -rp "Phone Number ID: " WA_PHONE
    echo ""

    # Update WhatsApp config
    jq --arg token "${WA_TOKEN}" \
       --arg phone "${WA_PHONE}" \
       --arg ts "$(date -Iseconds)" \
       '{
          access_token: $token,
          phone_number_id: $phone,
          configured_at: $ts,
          pending: false
        }' ~/.config/whatsapp.json > ~/.config/whatsapp.json.tmp && \
        mv ~/.config/whatsapp.json.tmp ~/.config/whatsapp.json
    echo "✅ WhatsApp configured"
fi

# Prompt to change password
echo "🔐 Security Recommendation"
read -rp "Change your n8n password now? (y/N): " CHANGE_PW
if [[ "${CHANGE_PW}" =~ ^[Yy]$ ]]; then
    docker exec "studex-n8n-${CLIENT_ID}" n8n user-management:update --email "${CLIENT_EMAIL}" --newPassword
    echo "✅ Password updated"
fi

echo ""
echo "========================================"
echo "  Access Your Dashboard"
echo "========================================"
echo ""
echo "  🌐 n8n Workflows:  https://${CLIENT_DOMAIN}"
echo "  👤 Username:       studex-${CLIENT_ID}"
echo "  🔧 OpenClaw Config: ~/.config/openclaw/gateway.json"
echo ""
echo "📚 Docs: https://docs.studexagents.africa"
echo "💬 Support: support@studexagents.africa"
echo "========================================"
ONBOARDEOF

sed -i "s/\${CLIENT_ID}/${CLIENT_ID}/g" "${ONBOARD_SCRIPT}"
sed -i "s/\${CLIENT_DOMAIN}/${CLIENT_DOMAIN}/g" "${ONBOARD_SCRIPT}"
chmod +x "${ONBOARD_SCRIPT}"
chown "${CLIENT_USER}:${CLIENT_USER}" "${ONBOARD_SCRIPT}"

log_ok "Onboarding script created"

#===============================================================================
# 9. Send onboarding email
#===============================================================================
log_info "Sending onboarding email to ${CLIENT_EMAIL}..."

EMAIL_TEMPLATE="/tmp/studex-onboard-${CLIENT_ID}.html"

cat > "${EMAIL_TEMPLATE}" <<HTMLEOF
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Welcome to StudEx Super Agents</title>
</head>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 12px 12px 0 0;">
    <h1 style="color: white; margin: 0;">🚀 Welcome to StudEx Super Agents</h1>
    <p style="color: #e0e0e0; margin-top: 8px;">Your AI agent fleet is ready!</p>
  </div>

  <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #e0e0e0;">
    <h2 style="color: #333;">Your Provisioned Environment</h2>
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 8px 0; color: #666;"><strong>Client ID</strong></td>
        <td style="padding: 8px 0; color: #333;">${CLIENT_ID}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #666;"><strong>Tier</strong></td>
        <td style="padding: 8px 0; color: #333; text-transform: capitalize;">${TIER}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #666;"><strong>n8n Dashboard</strong></td>
        <td style="padding: 8px 0;"><a href="https://${CLIENT_DOMAIN}" style="color: #667eea;">https://${CLIENT_DOMAIN}</a></td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #666;"><strong>Agents</strong></td>
        <td style="padding: 8px 0; color: #333;">${AGENTS}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #666;"><strong>Resources</strong></td>
        <td style="padding: 8px 0; color: #333;">RAM: ${RAM} | Storage: ${STORAGE}</td>
      </tr>
    </table>

    <div style="background: #fff3cd; border: 1px solid #ffc107; border-radius: 8px; padding: 16px; margin: 20px 0;">
      <strong>⚠️ Important:</strong> Your temporary n8n password is shown below. Please change it on first login.
    </div>

    <div style="background: #333; color: #0f0; padding: 16px; border-radius: 8px; font-family: monospace; margin-bottom: 20px;">
      Temporary Password: ${TEMP_PASS}
    </div>

    <h3>📋 Next Steps</h3>
    <ol style="color: #555; line-height: 1.8;">
      <li>Log into your n8n dashboard at <a href="https://${CLIENT_DOMAIN}">https://${CLIENT_DOMAIN}</a></li>
      <li>Complete WhatsApp Business API setup (if not already configured)</li>
      <li>Import your n8n workflows (${N8N_FLOWS} workflow limit on ${TIER} tier)</li>
      <li>Configure your OpenClaw agent personas</li>
      <li>Test your agent flows end-to-end</li>
    </ol>

    <p style="color: #888; font-size: 12px; margin-top: 30px;">
      📚 Documentation: <a href="https://docs.studexagents.africa">docs.studexagents.africa</a><br>
      💬 Support: <a href="mailto:support@studexagents.africa">support@studexagents.africa</a><br>
      🔧 Provisioning ID: ${CLIENT_ID} | ${TIMESTAMP}
    </p>
  </div>
</body>
</html>
HTMLEOF

# Send email (requires mailutils/postfix)
if command -v mail &>/dev/null; then
    mail -s "🎉 Your StudEx Super Agents are ready — ${CLIENT_ID}" \
         -A "${EMAIL_TEMPLATE}" \
         "${CLIENT_EMAIL}" < /dev/null && \
        log_ok "Onboarding email sent to ${CLIENT_EMAIL}" || \
        log_warn "Failed to send email — install mailutils to enable"
else
    log_warn "mail command not found — onboarding email skipped"
    log_warn "Save credentials manually:"
    echo "  Domain: ${CLIENT_DOMAIN}"
    echo "  n8n URL: https://${CLIENT_DOMAIN}"
    echo "  Temp Password: ${TEMP_PASS}"
fi

rm -f "${EMAIL_TEMPLATE}"

#===============================================================================
# 10. Summary
#===============================================================================
echo ""
echo "=========================================================="
echo "  ✅ Provisioning Complete — ${CLIENT_ID}"
echo "=========================================================="
echo ""
echo "  👤 User:        ${CLIENT_USER}"
echo "  🌐 Domain:      ${CLIENT_DOMAIN}"
echo "  🔌 n8n Port:    ${CLIENT_PORT}"
echo "  📧 Email:       ${CLIENT_EMAIL}"
echo "  🧩 Tier:        ${TIER}"
echo "  🤖 Agents:      ${AGENTS}"
echo ""
echo "  📁 Profile:     ${CLIENT_HOME}/.config/openclaw/"
echo "  📁 n8n Data:    ${CLIENT_HOME}/n8n/"
echo "  📁 Logs:        ${CLIENT_HOME}/logs/"
echo ""
echo "  ⚠️  Temp password: ${TEMP_PASS}  (change on first login!)"
echo "=========================================================="

exit 0