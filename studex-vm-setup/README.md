# StudEx Super Agents — ORGO VM Provisioning Guide

> Complete infrastructure setup and client provisioning documentation for the StudEx multi-tenant AI agent platform on ORGO AI VM.

---

## 🏗️ Architecture Overview

```
Internet
    │
    ├── DNS: *.studexagents.africa → ORGO VM (public IP)
    │
    ├── Port 80/443 (nginx / Traefik)
    │   ├── Landing page (studexagents.africa)
    │   └── Reverse proxy per-client (studex-{id}.studexagents.africa)
    │
    ├── Docker (studex-network)
    │   ├── traefik (reverse proxy + Let's Encrypt)
    │   ├── n8n (per-client container, unique port)
    │   └── (future) openclaw gateway per client
    │
    └── System users: studex-{client-id}
        ├── ~/.config/openclaw/gateway.json
        ├── ~/.config/whatsapp.json
        └── ~/n8n/ (persistent volume)
```

---

## 📁 Repository Structure

```
/workspace/studex-vm-setup/
├── setup-studex-vm.sh           # Master first-time VM setup
├── provision.sh                 # Per-client provisioning script
├── docker-compose.yml           # n8n + Traefik stack template
├── nginx-studex.conf            # Master nginx reverse proxy config
├── tiers.json                   # Tier definitions & pricing
├── openclaw-tier-configs/       # OpenClaw gateway configs per tier
│   ├── starter.json
│   ├── professional.json
│   └── enterprise.json
└── README.md                    # This file
```

---

## 🚀 Initial VM Setup (One-Time)

Run this **once** on a fresh ORGO VM:

```bash
# Clone the provisioning repo
git clone https://github.com/studex-agents/studex-vm-setup.git /opt/studex-vm-setup
cd /opt/studex-vm-setup

# Run as root — sets up the entire base platform
sudo bash setup-studex-vm.sh
```

`setup-studex-vm.sh` will:
1. Install Docker Engine + Docker Compose v2
2. Create the `studex-network` Docker network
3. Start Traefik with Let's Encrypt ACME configuration
4. Clone the `studex-agents` repo to `/opt/studex-agents`
5. Configure firewall (UFW): SSH (22), HTTP (80), HTTPS (443), WhatsApp (443, 5228)
6. Create base directories: `/opt/studex/config/`
7. Print success summary with next steps

---

## 👥 Provisioning a New Client

After initial setup, provision new clients with:

```bash
sudo bash /opt/studex/provision.sh \
    <client_id> \
    <tier> \
    <email> \
    [whatsapp_token] \
    [whatsapp_phone]
```

### Arguments

| Argument | Required | Description |
|---|---|---|
| `client_id` | ✅ | Unique ID (alphanumeric, hyphens). Used in domain: `{id}.studexagents.africa` |
| `tier` | ✅ | `starter` \| `professional` \| `enterprise` |
| `email` | ✅ | Client admin email for onboarding email |
| `whatsapp_token` | ❌ | WhatsApp Business API access token |
| `whatsapp_phone` | ❌ | WhatsApp Business phone number ID |

### Example

```bash
sudo bash /opt/studex/provision.sh \
    acme-corp \
    professional \
    admin@acmecorp.com \
    "EAAxxxxxxxxxxxx" \
    "123456789012345"
```

### What Happens

1. **User account** `studex-acme-corp` created with home at `/home/studex-acme-corp`
2. **OpenClaw tier config** deployed to `~/.config/openclaw/gateway.json`
3. **n8n container** deployed via docker-compose, accessible at `https://acme-corp.studexagents.africa`
4. **WhatsApp credentials** saved to `~/.config/whatsapp.json`
5. **nginx site** created and enabled at `/etc/nginx/sites-enabled/studex-acme-corp.conf`
6. **Monitoring cron** set up (CPU/RAM/n8n health check every 5 min)
7. **Onboarding email** sent to client with credentials and next steps

---

## 📊 Tier Comparison

| Feature | Starter | Professional | Enterprise |
|---|---|---|---|
| Price (KES/month) | 2,500 | 5,000 | 7,000 |
| Agents | 1 | 4 | 7 |
| RAM | 2 GB | 8 GB | 32 GB |
| Storage | 20 GB | 100 GB | 500 GB |
| n8n Workflows | 5 | 20 | Unlimited |
| WhatsApp API | ✅ | ✅ | ✅ |
| CRM Integration | ❌ | ✅ | ✅ |
| Analytics | ❌ | ❌ | ✅ |
| Dedicated VM | ❌ | ❌ | ✅ |

---

## 🌐 DNS Configuration

For each new client, add a CNAME record:

```
Type    Name                    Value
CNAME   {client-id}             studexagents.africa
```

> **Note:** Wildcard DNS (`*.studexagents.africa → studexagents.africa`) covers all clients automatically.

---

## 🔒 SSL / Let's Encrypt

After provisioning a new client and DNS is live:

```bash
# Provision SSL certificate
certbot certonly --nginx \
    -d {client-id}.studexagents.africa \
    --non-interactive --agree-tos \
    --email ssl@studexagents.africa

# Then uncomment the HTTPS block in the client's nginx conf:
vim /etc/nginx/sites-available/studex-{client-id}.conf
systemctl reload nginx
```

Or use Traefik's automatic Let's Encrypt (already configured in `docker-compose.yml`).

---

## 📧 Email Configuration

The provisioning script sends an onboarding HTML email. Ensure `mailutils` + Postfix is installed on the VM:

```bash
apt-get install -y mailutils postfix
# Choose "Internet Site" during postfix setup
echo "studexagents.africa" > /etc/mailname
systemctl restart postfix
```

Test with:
```bash
echo "Test" | mail -s "Test" admin@studexagents.africa
```

---

## 🔧 Common Operations

### Restart a client's n8n
```bash
docker compose -f /home/studex-{client-id}/docker-compose.yml restart
```

### View a client's logs
```bash
docker logs studex-n8n-{client-id}
tail -f /home/studex-{client-id}/logs/agent-activity.log
```

### Deprovision (remove client)
```bash
# Stop container
docker compose -f /home/studex-{client-id}/docker-compose.yml down -v

# Remove nginx site
rm /etc/nginx/sites-enabled/studex-{client-id}.conf
rm /etc/nginx/sites-available/studex-{client-id}.conf
nginx -t && systemctl reload nginx

# Remove user (careful!)
userdel -r studex-{client-id}
```

### Upgrade n8n for a client
```bash
docker compose -f /home/studex-{client-id}/docker-compose.yml pull
docker compose -f /home/studex-{client-id}/docker-compose.yml up -d
```

### Check all client containers
```bash
docker ps --filter "name=studex-n8n-"
```

### Check disk usage per client
```bash
du -sh /home/studex-*/
```

---

## 🔥 Firewall (UFW) Rules

Set up by `setup-studex-vm.sh`:

```bash
ufw allow 22/tcp    comment 'SSH'
ufw allow 80/tcp    comment 'HTTP'
ufw allow 443/tcp   comment 'HTTPS'
ufw allow 5228/tcp  comment 'WhatsApp Business API'
ufw allow 5229/tcp  comment 'WhatsApp Business API'
ufw allow 5280/tcp  comment 'WhatsApp Business API'
ufw default deny incoming
```

> **Warning:** Ensure port 22 is allowed before enabling UFW, or you'll lock yourself out!

---

## 📁 Directory Layout

```
/opt/studex/
├── config/
│   ├── tiers.json
│   └── openclaw-tier-configs/
│       ├── starter.json
│       ├── professional.json
│       └── enterprise.json
└── profiles/           # (reserved for future per-client profiles)

/home/studex-{client-id}/
├── .config/
│   ├── openclaw/gateway.json
│   └── whatsapp.json
├── n8n/
│   ├── data/          # n8n database + credentials
│   └── files/         # uploaded workflow files
├── logs/
│   └── agent-activity.log
├── monitoring/
│   └── agent-monitor.sh
├── docker-compose.yml
└── onboard.sh         # client's first-run script
```

---

## 🆘 Troubleshooting

### n8n container won't start
```bash
docker logs studex-n8n-{client-id}
docker compose -f /home/studex-{client-id}/docker-compose.yml config  # validate
```

### nginx 502 Bad Gateway
```bash
# Check if n8n container is running
docker ps | grep studex-n8n

# Check nginx error logs
tail /var/log/nginx/studex-error.log

# Verify port binding
ss -tlnp | grep {client_port}
```

### DNS not resolving
```bash
dig {client-id}.studexagents.africa
# Allow 5-10 minutes for DNS propagation
```

### Traefik not routing
```bash
docker logs traefik
# Ensure client containers have Traefik labels
docker inspect studex-n8n-{client-id} | jq '.[0].Labels'
```

---

## 🔄 Updating Tier Configs

Edit tier configs and redeploy without reprovisioning:

```bash
# Update a client's OpenClaw config
jq '...' /opt/studex/config/openclaw-tier-configs/{tier}.json \
    > /home/studex-{client-id}/.config/openclaw/gateway.json

# Reload OpenClaw gateway (per client)
systemctl restart openclaw@studex-{client-id}
```

---

## 📞 Support

- **Docs:** https://docs.studexagents.africa
- **Email:** support@studexagents.africa
- **Provisioning Issues:** Open an issue at github.com/studex-agents/studex-vm-setup