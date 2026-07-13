#!/bin/bash
#===============================================================================
# StudEx Super Agents — Master ORGO VM Setup Script
# Run ONCE on a fresh ORGO VM to set up the entire platform base.
# MUST be run as root.
#===============================================================================

set -euo pipefail

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m'

# Helpers
log_info()  { echo -e "${BLUE}[INFO]${NC}  $*"; }
log_ok()    { echo -e "${GREEN}[OK]${NC}   $*"; }
log_warn()  { echo -e "${YELLOW}[WARN]${NC} $*"; }
log_step()  { echo -e "${CYAN}[STEP]${NC} ${BOLD}$*${NC}"; }
log_error() { echo -e "${RED}[ERR]${NC}  $*" >&2; }

confirm() {
    local prompt="${1:-Continue?}"
    echo -e "${YELLOW}${prompt}${NC} [y/N]: "
    read -r REPLY
    [[ "$REPLY" =~ ^[Yy]$ ]]
}

die() { log_error "$*"; exit 1; }

# Check root
if [[ $EUID -ne 0 ]]; then
    die "This script must be run as root: sudo bash $0"
fi

# Detect OS
if [[ -f /etc/debian_version ]]; then
    PKG_MANAGER="apt-get"
    log_info "Detected Debian/Ubuntu system"
elif [[ -f /etc/redhat-release ]]; then
    PKG_MANAGER="yum"
    log_info "Detected RHEL/CentOS system"
else
    die "Unsupported OS. This script supports Debian/Ubuntu and RHEL/CentOS."
fi

# Config
INSTALL_DIR="/opt/studex"
REPO_URL="${REPO_URL:-https://github.com/studex-agents/studex-vm-setup.git}"
N8N_PLATFORM_PASS="$(openssl rand -base64 24)"

echo ""
echo -e "${BOLD}╔═══════════════════════════════════════════════════════════╗${NC}"
echo -e "${BOLD}║${NC}     ${CYAN}StudEx Super Agents — ORGO VM Master Setup${NC}          ${BOLD}║${NC}"
echo -e "${BOLD}╚═══════════════════════════════════════════════════════════╝${NC}"
echo ""
echo "  This script will:"
echo "  1. Install Docker Engine + Docker Compose v2"
echo "  2. Create Docker network (studex-network)"
echo "  3. Start Traefik + n8n + Landing via Docker Compose"
echo "  4. Clone studex-agents repo to /opt/studex-agents"
echo "  5. Copy tier configs to /opt/studex/config/"
echo "  6. Configure firewall (UFW)"
echo ""
echo "  Installation directory: ${INSTALL_DIR}"
echo ""

if ! confirm "Proceed with installation?"; then
    echo "Aborted."
    exit 0
fi

#===============================================================================
# STEP 1: System updates
#===============================================================================
log_step "Updating system packages..."

if [[ "$PKG_MANAGER" == "apt-get" ]]; then
    export DEBIAN_FRONTEND=noninteractive
    apt-get update -qq
    apt-get install -y -qq \
        curl \
        wget \
        gnupg \
        ca-certificates \
        lsb-release \
        software-properties-common \
        ufw \
        jq \
        unzip \
        git \
        htop \
        tree \
        certbot \
        python3-certbot-nginx \
        mailutils \
        postfix
elif [[ "$PKG_MANAGER" == "yum" ]]; then
    yum install -y -q \
        curl \
        wget \
        jq \
        unzip \
        git \
        htop \
        certbot \
        python3-certbot-nginx
fi

log_ok "System packages updated"

#===============================================================================
# STEP 2: Install Docker
#===============================================================================
log_step "Installing Docker Engine..."

if command -v docker &>/dev/null; then
    DOCKER_VERSION=$(docker --version | awk '{print $3}' | tr -d ',')
    log_ok "Docker already installed: ${DOCKER_VERSION}"
else
    if [[ "$PKG_MANAGER" == "apt-get" ]]; then
        # Add Docker GPG key + repo
        install -m 0755 -d /etc/apt/keyrings
        curl -fsSL https://download.docker.com/linux/ubuntu/gpg \
            | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
        chmod a+r /etc/apt/keyrings/docker.gpg

        echo "deb [arch=$(dpkg --print-architecture) \
signed-by=/etc/apt/keyrings/docker.gpg] \
https://download.docker.com/linux/ubuntu \
$(lsb_release -cs) stable" \
            | tee /etc/apt/sources.list.d/docker.list > /dev/null

        apt-get update -qq
        apt-get install -y -qq docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    elif [[ "$PKG_MANAGER" == "yum" ]]; then
        yum install -y -q yum-utils
        yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
        yum install -y -q docker-ce docker-ce-cli containerd.io docker-compose-plugin
    fi

    systemctl enable docker --now
    log_ok "Docker Engine installed"
fi

# Enable Docker on boot
systemctl enable docker 2>/dev/null || true

# Add docker group (for non-root docker access)
groupadd -f docker
usermod -aG docker "$SUDO_USER" 2>/dev/null || true

log_ok "Docker ready"

#===============================================================================
# STEP 3: Create base directories
#===============================================================================
log_step "Creating StudEx base directories..."

mkdir -p "${INSTALL_DIR}/config/openclaw-tier-configs"
mkdir -p "${INSTALL_DIR}/profiles"
mkdir -p "/var/www/acme"
mkdir -p "/var/www/studex/landing"

# Landing page placeholder
if [[ ! -f "/var/www/studex/landing/index.html" ]]; then
    cat > "/var/www/studex/landing/index.html" <<'LANDING_EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>StudEx Super Agents</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #333;
    }
    .container {
      background: white;
      border-radius: 16px;
      padding: 48px;
      max-width: 560px;
      width: 90%;
      box-shadow: 0 20px 60px rgba(0,0,0,0.2);
      text-align: center;
    }
    h1 { font-size: 2.2rem; margin-bottom: 8px; color: #667eea; }
    .tagline { color: #888; margin-bottom: 32px; font-size: 1.1rem; }
    .tiers { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 32px; }
    .tier {
      border: 2px solid #f0f0f0;
      border-radius: 12px;
      padding: 20px 12px;
      transition: border-color 0.2s;
    }
    .tier:hover { border-color: #667eea; }
    .tier-name { font-weight: 700; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.05em; }
    .tier-price { font-size: 1.8rem; font-weight: 700; color: #667eea; margin: 8px 0; }
    .tier-features { font-size: 0.8rem; color: #888; line-height: 1.8; text-align: left; }
    .cta {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      padding: 14px 40px;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
    }
    .footer { margin-top: 24px; font-size: 0.8rem; color: #aaa; }
    @media (max-width: 500px) { .tiers { grid-template-columns: 1fr; } }
  </style>
</head>
<body>
  <div class="container">
    <h1>🤖 StudEx Super Agents</h1>
    <p class="tagline">AI agent fleets for African businesses</p>
    <div class="tiers">
      <div class="tier">
        <div class="tier-name">Starter</div>
        <div class="tier-price">KSh 2,500</div>
        <div class="tier-features">1 AI Agent<br>5 Workflows<br>2 GB RAM<br>20 GB Storage</div>
      </div>
      <div class="tier">
        <div class="tier-name">Professional</div>
        <div class="tier-price">KSh 5,000</div>
        <div class="tier-features">4 AI Agents<br>20 Workflows<br>8 GB RAM<br>100 GB Storage<br>CRM</div>
      </div>
      <div class="tier">
        <div class="tier-name">Enterprise</div>
        <div class="tier-price">KSh 7,000</div>
        <div class="tier-features">7 AI Agents<br>Unlimited Flows<br>32 GB RAM<br>500 GB Storage<br>CRM + Analytics</div>
      </div>
    </div>
    <button class="cta" onclick="window.location='mailto:hello@studexagents.africa'">
      Get Started →
    </button>
    <p class="footer">studexagents.africa · support@studexagents.africa</p>
  </div>
</body>
</html>
LANDING_EOF
    log_ok "Landing page created"
fi

log_ok "Base directories created"

#===============================================================================
# STEP 4: Clone studex-agents repo
#===============================================================================
log_step "Cloning studex-agents repository..."

if [[ -d "/opt/studex-agents/.git" ]]; then
    log_ok "studex-agents repo already exists, pulling latest..."
    git -C /opt/studex-agents pull
elif [[ -d "/opt/studex-agents" ]]; then
    log_warn "studex-agents exists but no git — skipping clone"
else
    git clone "${REPO_URL}" /opt/studex-agents 2>/dev/null || \
        log_warn "Could not clone repo — this is fine if repo doesn't exist yet"
fi

# Copy this provisioning directory
if [[ -d "/opt/studex-vm-setup" ]]; then
    rsync -a --delete /opt/studex-vm-setup/ "${INSTALL_DIR}/" 2>/dev/null || \
        cp -r /opt/studex-vm-setup/. "${INSTALL_DIR}/"
else
    mkdir -p "${INSTALL_DIR}"
    cp -r "$(dirname "$0")"/. "${INSTALL_DIR}/"
fi

log_ok "Configuration files deployed to ${INSTALL_DIR}"

#===============================================================================
# STEP 5: Set up Traefik config
#===============================================================================
log_step "Configuring Traefik..."

TRAEFIK_DIR="/opt/studex/traefik"
mkdir -p "${TRAEFIK_DIR}/dynamic-conf"

cat > "${TRAEFIK_DIR}/traefik.yml" <<'TRFEOF'
# Traefik v3 static configuration
api:
  dashboard: true
  insecure: true

entryPoints:
  web:
    address: ":80"
  websecure:
    address: ":443"

providers:
  docker:
    endpoint: "unix:///var/run/docker.sock"
    exposedByDefault: false
    network: studex-network
    watch: true
  file:
    directory: /etc/traefik/dynamic
    watch: true

certificatesResolvers:
  letsencrypt:
    acme:
      email: ssl@studexagents.africa
      storage: /acme/acme.json
      httpChallenge:
        entryPoint: web

log:
  level: INFO
  format: json

accessLog:
  format: json
TRFEOF

# Dynamic config for rate limiting
cat > "${TRAEFIK_DIR}/dynamic-conf/middlewares.yml" <<'TRFDYNEOF'
http:
  middlewares:
    studex-rate-limit:
      rateLimit:
        average: 100
        burst: 50
        period: 1m

    studex-auth:
      basicAuth:
        users:
          - "studex:$apr1$H6uskkkW$IgXLP6ewTrSuBkTrqE8wj/"

    studex-secure-headers:
      headers:
        frameDeny: true
        contentTypeNosniff: true
        browserXssFilter: true
        referrerPolicy: "strict-origin-when-cross-origin"
        customResponseHeaders:
          X-Robots-Tag: "noindex, nofollow"
TRFDYNEOF

mkdir -p /opt/studex/env
cat > /opt/studex/env/traefik.env <<TRFENVEOF
TZ=Africa/Nairobi
HTPASSWD=\$(echo $(openssl rand -base64 16) | htpasswd -i -B -C 10 studex 2>/dev/null || echo "studex:placeholder")
N8N_PLATFORM_PASS=${N8N_PLATFORM_PASS}
N8N_LOG_LEVEL=info
TRFENVEOF

log_ok "Traefik configured"

# Landing nginx config
mkdir -p /opt/studex/landing
cat > /opt/studex/landing/nginx.conf <<'LANDINGNGINX'
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;
    try_files $uri $uri/ /index.html;
}
LANDINGNGINX

#===============================================================================
# STEP 6: Create studex-network Docker network
#===============================================================================
log_step "Creating Docker network..."

docker network create studex-network 2>/dev/null || \
    log_ok "Network studex-network already exists"

log_ok "Docker network ready"

#===============================================================================
# STEP 7: Copy tier configs
#===============================================================================
log_step "Copying tier configurations..."

cp "$(dirname "$0")/tiers.json" "${INSTALL_DIR}/config/tiers.json" 2>/dev/null || true
mkdir -p "${INSTALL_DIR}/config/openclaw-tier-configs"
for cfg in starter professional enterprise; do
    SRC="$(dirname "$0")/openclaw-tier-configs/${cfg}.json"
    [[ -f "${SRC}" ]] && cp "${SRC}" "${INSTALL_DIR}/config/openclaw-tier-configs/${cfg}.json"
done

log_ok "Tier configs deployed to ${INSTALL_DIR}/config/"

#===============================================================================
# STEP 8: Create env file for docker-compose
#===============================================================================
log_step "Creating Docker Compose environment file..."

mkdir -p /opt/studex/env

cat > /opt/studex/.env <<ENVEOF
N8N_PLATFORM_PASS=${N8N_PLATFORM_PASS}
N8N_LOG_LEVEL=info
TZ=Africa/Nairobi
COMPOSE_PROJECT_NAME=studex
ENVEOF

# Copy docker-compose.yml to install dir
cp "$(dirname "$0")/docker-compose.yml" "${INSTALL_DIR}/docker-compose.yml" 2>/dev/null || true

log_ok "Environment file created"

#===============================================================================
# STEP 9: Start Docker Compose stack
#===============================================================================
log_step "Starting Docker Compose stack..."

cd "${INSTALL_DIR}"
docker compose up -d --pull always

# Wait for containers to be healthy
log_info "Waiting for containers to become healthy..."
sleep 10

FAILED=""
for svc in traefik; do
    STATUS=$(docker inspect --format='{{.State.Health.Status}}' "studex-${svc}" 2>/dev/null || echo "unknown")
    if [[ "$STATUS" == "healthy" ]]; then
        log_ok "Container studex-${svc}: healthy"
    else
        log_warn "Container studex-${svc}: ${STATUS} (may still be starting)"
    fi
done

# Check if containers are running
RUNNING=$(docker compose ps --format json 2>/dev/null | jq -r '.Service' 2>/dev/null | sort || echo "")
log_info "Running services: ${RUNNING:-traefik (background)}"

# Pull n8n separately if it fails
docker pull n8nio/n8n:latest &>/dev/null || true

log_ok "Docker Compose stack started"

#===============================================================================
# STEP 10: Configure firewall (UFW)
#===============================================================================
log_step "Configuring firewall (UFW)..."

# Ensure SSH is allowed first
SSH_PORT=$(ss -tlnp | grep ':22' | wc -l)
if [[ $SSH_PORT -gt 0 ]]; then
    log_info "SSH detected on port 22"
fi

# Reset UFW to defaults
ufw --force reset

# Allow rules
ufw allow 22/tcp     comment 'SSH'
ufw allow 80/tcp     comment 'HTTP'
ufw allow 443/tcp    comment 'HTTPS'
ufw allow 5228/tcp   comment 'WhatsApp Business API'
ufw allow 5229/tcp   comment 'WhatsApp Business API'
ufw allow 5280/tcp   comment 'WhatsApp Business API'

# Default policy
ufw default deny incoming

# Enable UFW (non-interactive if SSH confirmed)
if [[ $SSH_PORT -gt 0 ]]; then
    echo "y" | ufw enable 2>/dev/null || ufw --force enable
else
    log_warn "SSH not detected on 22 — not enabling UFW automatically"
fi

ufw status numbered | grep -v "^$\|Status\|---\|" || true

log_ok "Firewall configured"

#===============================================================================
# STEP 11: Request wildcard SSL certificate
#===============================================================================
log_step "Provisioning Let's Encrypt SSL certificate..."

# Create ACME dir
mkdir -p /var/www/acme
chown nobody:nobody /var/www/acme

if command -v certbot &>/dev/null; then
    # Attempt wildcard cert
    certbot certonly \
        --webroot \
        -w /var/www/acme \
        -d studexagents.africa \
        -d "*.studexagents.africa" \
        --non-interactive \
        --agree-tos \
        --email ssl@studexagents.africa \
        --keep-until-expiring \
        2>/dev/null && log_ok "SSL certificate provisioned" || \
        log_warn "SSL cert not provisioned yet — run certbot manually after DNS is live"
else
    log_warn "certbot not found — install with: apt-get install certbot python3-certbot-nginx"
fi

#===============================================================================
# STEP 12: Enable log rotation
#===============================================================================
log_step "Configuring log rotation..."

cat > /etc/logrotate.d/studex <<'LOGROTATE_EOF'
/home/studex-*/logs/*.log {
    daily
    rotate 14
    compress
    delaycompress
    notifempty
    create 0640 root root
    sharedscripts
    postrotate
        docker kill -s SIGUSR1 $(docker ps -q --filter "name=studex-") 2>/dev/null || true
    endscript
}
LOGROTATE_EOF

log_ok "Log rotation configured"

#===============================================================================
# STEP 13: Create systemd service for provisioning script
# (optional — allows non-root provisioning via sudo)
#===============================================================================
log_step "Setting up provisioning sudoers rule..."

PROVISION_BIN="/opt/studex/provision.sh"
chmod +x "${PROVISION_BIN}"

# Allow members of 'studex-admin' group to run provisioning
groupadd -f studex-admin
cat > /etc/sudoers.d/studex-provision <<'SUDOERS_EOF'
# Allow studex-admin group to run provisioning scripts
%studex-admin ALL=(root) NOPASSWD: /opt/studex/provision.sh
SUDOERS_EOF
chmod 0440 /etc/sudoers.d/studex-provision

log_ok "Sudoers rule created (add users to studex-admin group)"

#===============================================================================
# STEP 14: Print summary
#===============================================================================
DOCKER_VERSION=$(docker --version 2>/dev/null | awk '{print $3}' | tr -d ',')
COMPOSE_VERSION=$(docker compose version 2>/dev/null | awk '{print $3}' || echo "v2")

echo ""
echo -e "${BOLD}╔═══════════════════════════════════════════════════════════╗${NC}"
echo -e "${BOLD}║${NC}     ${GREEN}✅ StudEx VM Setup Complete!${NC}                         ${BOLD}║${NC}"
echo -e "${BOLD}╚═══════════════════════════════════════════════════════════╝${NC}"
echo ""
echo "  📦 Docker:        ${DOCKER_VERSION}"
echo "  🔀 Compose:       ${COMPOSE_VERSION}"
echo "  🌐 Traefik:       Running (port 80/443)"
echo "  📁 Config dir:    ${INSTALL_DIR}"
echo "  🔧 Scripts:       ${INSTALL_DIR}/provision.sh"
echo ""
echo "  🔐 Platform n8n:  https://n8n.studexagents.africa"
echo "  🔑 n8n user:      studex-platform"
echo "  🔑 n8n pass:      ${N8N_PLATFORM_PASS}"
echo ""
echo -e "  ${YELLOW}⚠️  IMPORTANT — Next Steps:${NC}"
echo ""
echo "  1. Set up DNS: Add wildcard CNAME for studexagents.africa"
echo "     → *.studexagents.africa → [VM public IP]"
echo ""
echo "  2. Provision a test client:"
echo "     ${CYAN}sudo bash ${INSTALL_DIR}/provision.sh \\${NC}"
echo "     ${CYAN}    acme-corp \\${NC}"
echo "     ${CYAN}    professional \\${NC}"
echo "     ${CYAN}    admin@acmecorp.com${NC}"
echo ""
echo "  3. Provision SSL for the test client:"
echo "     ${CYAN}certbot --nginx -d acme-corp.studexagents.africa${NC}"
echo ""
echo "  4. Add admin users to studex-admin group:"
echo "     ${CYAN}usermod -aG studex-admin <username>${NC}"
echo ""
echo "  5. View logs:"
echo "     ${CYAN}docker compose -f ${INSTALL_DIR}/docker-compose.yml logs -f${NC}"
echo "     ${CYAN}docker compose -f ${INSTALL_DIR}/docker-compose.yml logs traefik${NC}"
echo ""
echo "  📚 Docs: https://docs.studexagents.africa"
echo "  💬 Support: support@studexagents.africa"
echo ""
echo "═══════════════════════════════════════════════════════════"
echo ""

exit 0