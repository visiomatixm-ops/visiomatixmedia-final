#!/usr/bin/env bash
set -euo pipefail

# default_user_chat.sh
# Phase-1 ready: create session (POST /api/chat/start) and send initial message (POST /api/chat/send)
# Produces: logs/default_user-YYYYMMDD.log and logs/default_user-YYYYMMDD.json

API="http://localhost:8080/api"
USERNAME="defaultuser"
PASSWORD="default123"
RETRY=5
RETRY_WAIT=2
LOG_DIR="./logs"
mkdir -p "$LOG_DIR"

timestamp() { date +"%Y-%m-%d %H:%M:%S"; }
file_ts()   { date +"%Y%m%d"; }

LOG_FILE="$LOG_DIR/default_user-$(file_ts).log"
JSON_FILE="$LOG_DIR/default_user-$(file_ts).json"

# Colors
C_INFO="\033[1;34m"   # blue
C_SUCCESS="\033[1;32m" # green
C_ERROR="\033[1;31m"  # red
C_RESET="\033[0m"

log()    { echo -e "${C_INFO}[INFO]${C_RESET} $(timestamp) $1"; printf "%s %s\n" "$(timestamp)" "$1" >> "$LOG_FILE"; }
success(){ echo -e "${C_SUCCESS}[SUCCESS]${C_RESET} $(timestamp) $1"; printf "%s %s\n" "$(timestamp)" "$1" >> "$LOG_FILE"; }
error()  { echo -e "${C_ERROR}[ERROR]${C_RESET} $(timestamp) $1"; printf "%s %s\n" "$(timestamp)" "$1" >> "$LOG_FILE"; }

json_write() {
  # $1 = event, $2 = status, $3 = details (string or JSON)
  jq -n --arg ts "$(timestamp)" --arg e "$1" --arg s "$2" --arg d "$3" \
    '{timestamp:$ts,event:$e,status:$s,details:$d}' >> "$JSON_FILE"
}

# check jq
if ! command -v jq >/dev/null 2>&1; then
  echo -e "${C_ERROR}[ERROR]${C_RESET} $(timestamp) 'jq' is required. Install jq and re-run." >&2
  exit 1
fi

echo "=== Default User CLI ===" | tee -a "$LOG_FILE"
log "Attempting login as $USERNAME"

# LOGIN with retries
count=0
TOKEN=""
while [ $count -lt $RETRY ]; do
  RESP=$(curl -sS -X POST "$API/users/login" \
    -H "Content-Type: application/json" \
    -d "{\"username\":\"$USERNAME\",\"password\":\"$PASSWORD\"}" ) || true

  TOKEN=$(echo "$RESP" | jq -r '.token // empty' || true)
  if [[ -n "$TOKEN" ]]; then
    success "Login successful. Token acquired."
    json_write "login" "success" "token-acquired"
    break
  else
    error "Login attempt $((count+1)) failed: $(echo "$RESP" | jq -c '.' 2>/dev/null || echo "$RESP")"
    json_write "login" "failure" "$(echo "$RESP" | jq -c '.' 2>/dev/null || echo "$RESP")"
    count=$((count+1))
    sleep $RETRY_WAIT
  fi
done

if [[ -z "$TOKEN" ]]; then
  error "All login attempts failed. Exiting."
  exit 2
fi

# CREATE / GET SESSION via POST /api/chat/start
log "Starting/Getting chat session with agent"
START_BODY="{\"sender\":\"$USERNAME\",\"receiver\":\"agent\"}"
count=0
SESSION_JSON=""
while [ $count -lt $RETRY ]; do
  SESSION_JSON=$(curl -sS -X POST "$API/chat/start" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d "$START_BODY" ) || true

  # expect an object with id
  SESSION_ID=$(echo "$SESSION_JSON" | jq -r '.id // empty' || true)
  if [[ -n "$SESSION_ID" ]]; then
    success "Session created/retrieved id=$SESSION_ID"
    printf "%s\n" "$SESSION_JSON" | jq '.' >> "$LOG_FILE"
    json_write "create_session" "success" "$(echo "$SESSION_JSON" | jq -c '.')"
    break
  else
    error "Create session attempt $((count+1)) failed: $(echo "$SESSION_JSON" | jq -c '.' 2>/dev/null || echo "$SESSION_JSON")"
    json_write "create_session" "failure" "$(echo "$SESSION_JSON" | jq -c '.' 2>/dev/null || echo "$SESSION_JSON")"
    count=$((count+1))
    sleep $RETRY_WAIT
  fi
done

if [[ -z "$SESSION_ID" ]]; then
  error "Failed to create chat session after retries. Exiting."
  exit 3
fi

# SEND initial message via POST /api/chat/send
log "Sending initial message to sessionId=$SESSION_ID"
MSG_BODY=$(jq -n --arg s "$USERNAME" --arg r "agent" --arg c "Hi agent, I need help with my account." \
  '{sender:$s, receiver:$r, content:$c, messageType:"TEXT"}' )

count=0
SEND_RESP=""
while [ $count -lt $RETRY ]; do
  SEND_RESP=$(curl -sS -X POST "$API/chat/send" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d "$MSG_BODY" ) || true

  MSG_ID=$(echo "$SEND_RESP" | jq -r '.id // empty' || true)
  if [[ -n "$MSG_ID" ]]; then
    success "Message sent id=$MSG_ID"
    json_write "send_message" "success" "$(echo "$SEND_RESP" | jq -c '.')"
    break
  else
    error "Send message attempt $((count+1)) failed: $(echo "$SEND_RESP" | jq -c '.' 2>/dev/null || echo "$SEND_RESP")"
    json_write "send_message" "failure" "$(echo "$SEND_RESP" | jq -c '.' 2>/dev/null || echo "$SEND_RESP")"
    count=$((count+1))
    sleep $RETRY_WAIT
  fi
done

if [[ -z "$MSG_ID" ]]; then
  error "Failed to send message after retries."
  exit 4
fi

success "Default user flow complete."
echo "=== Done ===" | tee -a "$LOG_FILE"
