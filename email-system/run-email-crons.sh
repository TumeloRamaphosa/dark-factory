#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# OGRE Email Cron Runner — Dark Factory
# Reads queue files and sends formatted emails via send-email.js
#
# Usage:
#   ./run-email-crons.sh morning    ← Morning brief
#   ./run-email-crons.sh evening     ← Evening digest
#   ./run-email-crons.sh research    ← Global research brief
#   ./run-email-crons.sh all         ← Send all three
#
# Cron examples (SA timezone):
#   0 6  * * * cd /workspace/email-system && ./run-email-crons.sh morning  >> /workspace/email-system/email.log 2>&1
#   0 18 * * * cd /workspace/email-system && ./run-email-crons.sh evening >> /workspace/email-system/email.log 2>&1
#   0 3  * * * cd /workspace/email-system && ./run-email-crons.sh research >> /workspace/email-system/email.log 2>&1
# ─────────────────────────────────────────────────────────────────────────────

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
EMAIL_SYSTEM_DIR="${SCRIPT_DIR}"
EMAIL_QUEUE_DIR="${EMAIL_QUEUE_DIR:-/workspace/email-queue}"
LOG_FILE="${EMAIL_SYSTEM_DIR}/email.log"

# Load env from .env or .env.guide
load_env() {
  for env_file in "${EMAIL_SYSTEM_DIR}/.env" "${EMAIL_SYSTEM_DIR}/.env.guide"; do
    if [[ -f "$env_file" ]]; then
      while IFS='=' read -r key value; do
        # Skip comments and empty lines
        [[ "$key" =~ ^[[:space:]]*# ]] && continue
        [[ -z "$key" ]] && continue
        # Trim whitespace
        key=$(echo "$key" | xargs)
        value=$(echo "$value" | xargs | sed 's/^["'"'"']//;s/["'"'"']$//')
        [[ -z "$key" ]] && continue
        # Only set if not already set
        [[ -z "${!key:-}" ]] && export "$key=$value"
      done < "$env_file"
      echo "[$(date '+%Y-%m-%d %H:%M:%S')] [INFO] Loaded env from $(basename $env_file)" >> "$LOG_FILE"
      break
    fi
  done
}

# Log to file and stdout
log() {
  local level="$1"; shift
  local msg="$*"
  local ts=$(date '+%Y-%m-%d %H:%M:%S')
  echo "[$ts] [$level] $msg" | tee -a "$LOG_FILE"
}

# Check if a queue file exists for today or yesterday
find_queue_file() {
  local type="$1"
  local today_ts=$(date '+%Y-%m-%d')
  local yest_ts=$(date -d 'yesterday' '+%Y-%m-%d')

  for datestamp in "$today_ts" "$yest_ts"; do
    local file="${EMAIL_QUEUE_DIR}/${type}-${datestamp}.txt"
    if [[ -f "$file" ]]; then
      echo "$file"
      return 0
    fi
  done
  return 1
}

# Check credentials
check_credentials() {
  if [[ -z "${EMAIL_PASS:-}" ]] || [[ "$EMAIL_PASS" == "YOUR_APP_PASSWORD_HERE" ]]; then
    log "WARN" "EMAIL_PASS not set. Set it in ${EMAIL_SYSTEM_DIR}/.env or .env.guide"
    log "WARN" "See ${EMAIL_SYSTEM_DIR}/SETUP-GMAIL.md for setup instructions."
    return 1
  fi
  return 0
}

# Run a named email send via Node.js
run_send() {
  local command="$1"
  log "INFO" "Running email send: $command"

  if ! node "${EMAIL_SYSTEM_DIR}/send-email.js" "$command" >> "$LOG_FILE" 2>&1; then
    log "ERROR" "Failed to send: $command"
    return 1
  fi

  log "INFO" "Completed: $command"
  return 0
}

# ── Main ─────────────────────────────────────────────────────────────────────
load_env

log "INFO" "═══════════════════════════════════"
log "INFO" "OGRE Email Cron Runner — started"
log "INFO" "Command: ${1:-help}"
log "INFO" "═══════════════════════════════════"

if ! check_credentials; then
  log "WARN" "No credentials — aborting. Configure EMAIL_PASS first."
  exit 1
fi

case "${1:-}" in
  morning)
    run_send "morning"
    ;;

  evening)
    run_send "evening"
    ;;

  research)
    run_send "research"
    ;;

  all)
    log "INFO" "Sending all three briefs..."
    run_send "morning"  || log "ERROR" "morning failed"
    run_send "evening"  || log "ERROR" "evening failed"
    run_send "research"  || log "ERROR" "research failed"
    log "INFO" "All sends complete."
    ;;

  test)
    run_send "test"
    ;;

  *)
    echo "OGRE Email Cron Runner"
    echo "───────────────────────────────────"
    echo "Usage: $0 <command>"
    echo ""
    echo "Commands:"
    echo "  morning  — Morning brief  (06:00 SA) → Tumelo"
    echo "  evening  — Evening digest (18:00 SA) → info@"
    echo "  research — Global research (03:00 SA) → Tumelo"
    echo "  all      — Send all three briefs"
    echo "  test     — Send test email to self"
    echo ""
    echo "Cron examples (in crontab -e):"
    echo "  0 6  * * * cd /workspace/email-system && ./run-email-crons.sh morning  >> email.log 2>&1"
    echo "  0 18 * * * cd /workspace/email-system && ./run-email-crons.sh evening >> email.log 2>&1"
    echo "  0 3  * * * cd /workspace/email-system && ./run-email-crons.sh research >> email.log 2>&1"
    echo ""
    echo "Note: Script auto-loads credentials from .env or .env.guide"
    ;;
esac
