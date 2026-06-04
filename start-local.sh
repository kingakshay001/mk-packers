#!/bin/bash
# ==============================================
#  MK Packers & Movers — Local Development
#  Usage:  bash start-local.sh
#          bash start-local.sh --single   (single combined server)
# ==============================================
set -e

SINGLE_MODE=false
if [[ "$1" == "--single" ]]; then
  SINGLE_MODE=true
fi

# Load .env if present
if [ -f ".env" ]; then
  export $(grep -v '^#' .env | xargs)
fi

# Check Node.js
if ! command -v node &> /dev/null; then
  echo "ERROR: Node.js not found. Install from https://nodejs.org (v20 or newer)"
  exit 1
fi

# Check pnpm
if ! command -v pnpm &> /dev/null; then
  echo "Installing pnpm..."
  npm install -g pnpm
fi

echo ""
echo "Installing dependencies..."
pnpm install

if [ -z "$FAST2SMS_API_KEY" ]; then
  echo ""
  echo "WARNING: FAST2SMS_API_KEY not set — OTP SMS will not be delivered."
  echo "  Add it to a .env file: FAST2SMS_API_KEY=your_key"
  echo ""
fi

if [ "$SINGLE_MODE" = true ]; then
  # -----------------------------------------------
  # SINGLE SERVER MODE (production-like, one port)
  # -----------------------------------------------
  echo "Building combined server..."
  bash build-combined.sh

  echo ""
  echo "Starting combined server on http://localhost:3000 ..."
  echo "(API + frontend served from a single Express server)"
  echo ""
  PORT=3000 NODE_ENV=production node artifacts/api-server/dist/index.mjs

else
  # -----------------------------------------------
  # DEV MODE (two processes, hot reload)
  # -----------------------------------------------
  echo "Starting API server on http://localhost:8080 ..."
  PORT=8080 pnpm --filter @workspace/api-server run dev &
  API_PID=$!

  sleep 4

  echo ""
  echo "Starting frontend dev server on http://localhost:5173 ..."
  echo ""
  echo "Open: http://localhost:5173"
  echo "API:  http://localhost:8080/api"
  echo ""
  echo "Tip: for a single combined server, run: bash start-local.sh --single"
  echo ""
  echo "Press Ctrl+C to stop."
  echo ""
  PORT=5173 BASE_PATH=/ pnpm --filter @workspace/mk-packers run dev

  kill $API_PID 2>/dev/null || true
fi
