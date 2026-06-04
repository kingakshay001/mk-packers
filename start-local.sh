#!/bin/bash
# MK Packers & Movers — Local Development Starter
# Usage: bash start-local.sh

set -e

echo "============================================"
echo "  MK Packers & Movers — Local Dev Server"
echo "============================================"

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

# Install dependencies
echo ""
echo "Installing dependencies..."
pnpm install

# Check FAST2SMS_API_KEY
if [ -z "$FAST2SMS_API_KEY" ]; then
  if [ -f ".env" ]; then
    export $(grep -v '^#' .env | xargs)
  fi
fi

if [ -z "$FAST2SMS_API_KEY" ]; then
  echo ""
  echo "WARNING: FAST2SMS_API_KEY is not set."
  echo "  OTP SMS will not be delivered to customers."
  echo "  Set it in .env file or export it before running this script."
  echo ""
fi

echo ""
echo "Starting API server on http://localhost:8080 ..."
PORT=8080 pnpm --filter @workspace/api-server run dev &
API_PID=$!

# Give API time to start
sleep 4

echo ""
echo "Starting frontend on http://localhost:5173 ..."
echo ""
echo "Website is ready! Open: http://localhost:5173"
echo "API running at:         http://localhost:8080/api"
echo ""
echo "Press Ctrl+C to stop."
echo ""

PORT=5173 BASE_PATH=/ pnpm --filter @workspace/mk-packers run dev

# Cleanup API server on exit
kill $API_PID 2>/dev/null || true
