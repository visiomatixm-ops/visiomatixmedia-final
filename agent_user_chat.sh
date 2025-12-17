#!/usr/bin/env bash
set -euo pipefail

# agent_user_chat.sh
# Phase-1 ready: login as agent, wait for session/history, poll messages, allow reply (sends via /api/chat/send)
# Produces: logs/agent_user-YYYYMMDD.log and logs/agent_user-YYYYMMDD.json

API="http://localhost:8080/api"
USERNAME="agent"
PASSWORD="agent123"
POLL_INTERVAL=3
RETRY=6
RETRY_WAIT=2
LOG_DIR="./logs"
mkdir -p "$LOG_DIR"

timestamp() { date +"%Y-%m-%d %H:%M:%S"; }
file_ts()   { date +"%Y%m%d"; }

LOG_FILE="$LOG_DIR/agent_user-$(file_ts).log"
JSON_FILE="$LOG_DIR/agent_user-$(file_ts).json"

C_INFO="\033[1;34m"
C_SUCCESS="\033[1;32m"
C_ERROR="\033[1;31m"
C_RESET="\033[0m"

log()    { echo -e "${C_INFO}[INFO]${C_RESET} $(timestamp) $1"; printf "%s %s\n" "$(timestamp)" "$1" >> "$LOG_FILE"; }
success(){ echo -e "${C_SUCCESS}[SUCCESS]${C_RESET} $(timestamp) $1"; printf "%s %s\n" "$(timestamp)" "$1" >> "$LOG_FILE"; }
error()  { echo -e "${C_ERROR}[ERROR]${C_RESET} $(timestamp) $1"; printf "%s %s\n" "$(timestamp)" "$1" >> "$LOG_FILE"; }

json_write() {
  jq -n --arg ts "$(timestamp)" --arg e "$1" --arg s "$2" --arg d "$3" \
    '{timestamp:$ts,event:$e,status:$s,details:$d}' >> "$JSON_FILE"
}

if ! command -v jq >/dev/null 2>&1; then
  echo -e "${C_ERROR}[ERROR]${C_RESET} $(timestamp) 'jq' is required. Install jq and re-run." >&2
  exit 1
fi

echo "=== Starting Agent Chat CLI ===" | tee -a "$LOG_FILE"
log "Logging in as $USERNAME"

# login retries
count=0
TOKEN=""
while [ $count -lt $RETRY ]; do
  R=$(curl -sS -X POST "$API/users/login" -H "Content-Type: application/json" \
    -d "{\"username\":\"$USERNAME\",\"password\":\"$PASSWORD\"}" ) || true

  TOKEN=$(echo "$R" | jq -r '.token // empty' || true)
  if [[ -n "$TOKEN" ]]; then
    success "Login successful. Token acquired."
    json_write "login" "success" "token-acquired"
    break
  else
    error "Login attempt $((count+1)) failed: $(echo "$R" | jq -c '.' 2>/dev/null || echo "$R")"
    json_write "login" "failure" "$(echo "$R" | jq -c '.' 2>/dev/null || echo "$R")"
    count=$((count+1)); sleep $RETRY_WAIT
  fi
done

if [[ -z "$TOKEN" ]]; then
  error "All login attempts failed. Exiting."
  exit 2
fi

# WAIT for session between agent and defaultuser by polling history
log "Waiting for chat session with defaultuser..."
while true; do
  HIST=$(curl -sS -H "Authorization: Bearer $TOKEN" \
    "$API/chat/history?sender=agent&receiver=defaultuser" ) || true

  # Expect [] (no messages) or array
  # If session exists but no messages, the controller returns [] per current impl
  if [[ "$HIST" != "[]" && -n "$HIST" ]]; then
    success "Detected chat history / session between agent and defaultuser"
    printf "%s\n" "$HIST" | jq '.' >> "$LOG_FILE" 2>/dev/null || true
    json_write "detect_session" "success" "$(echo "$HIST" | jq -c '.' 2>/dev/null || echo "$HIST")"
    break
  fi

  # poll until default user creates session + sends a message
  sleep $POLL_INTERVAL
done

# Enter simple REPL for sending messages
success "You may type replies now. Press Ctrl+C to quit."
while true; do
  printf "\n${C_INFO}[AGENT]${C_RESET} Type message: "
  if ! read -r MSG; then
    echo; error "Input closed. Exiting."; exit 0
  fi
  [[ -z "${MSG// }" ]] && { log "Empty message ignored."; continue; }

  PAYLOAD=$(jq -n --arg s "$USERNAME" --arg r "defaultuser" --arg c "$MSG" '{sender:$s,receiver:$r,content:$c,messageType:"TEXT"}')
  S_RESP=$(curl -sS -X POST "$API/chat/send" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d "$PAYLOAD" ) || true

  MID=$(echo "$S_RESP" | jq -r '.id // empty' || true)
  if [[ -n "$MID" ]]; then
    success "Message sent id=$MID"
    json_write "send_message" "success" "$(echo "$S_RESP" | jq -c '.')"
  else
    error "Failed to send message: $(echo "$S_RESP" | jq -c '.' 2>/dev/null || echo "$S_RESP")"
    json_write "send_message" "failure" "$(echo "$S_RESP" | jq -c '.' 2>/dev/null || echo "$S_RESP")"
  fi

  # fetch recent history to show to agent
  log "Fetching latest history..."
  LATEST=$(curl -sS -H "Authorization: Bearer $TOKEN" \
    "$API/chat/history?sender=agent&receiver=defaultuser" ) || true

  if [[ -n "$LATEST" ]]; then
    echo "$LATEST" | jq -r '.[] | "\(.sentAt) \(.sender.username): \(.content)"' 2>/dev/null || echo "$LATEST"
    printf "%s\n" "$LATEST" | jq '.' >> "$LOG_FILE" 2>/dev/null || true
  fi
done
