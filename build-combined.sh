#!/bin/bash
# =====================================================
#  MK Packers & Movers — Combined Production Build
#  Output: artifacts/api-server/dist/
#    - dist/index.mjs   → Express server (API + static)
#    - dist/public/     → React frontend
# =====================================================
set -e

echo "======================================================"
echo "  MK Packers — Full-Stack Production Build"
echo "======================================================"

# Install dependencies if needed
echo ""
echo "[1/3] Installing dependencies..."
pnpm install

# Step 1: Build the Express backend first (this cleans dist/)
echo ""
echo "[2/3] Building Express backend..."
pnpm --filter @workspace/api-server run build
echo "      Backend built → artifacts/api-server/dist/index.mjs"

# Step 2: Build the React frontend INTO api-server/dist/public/
#         (Backend is already built so dist/ now exists cleanly)
echo ""
echo "[3/3] Building React frontend..."
BUILD_OUTDIR="../api-server/dist/public" \
  BASE_PATH="/" \
  PORT="4000" \
  NODE_ENV="production" \
  pnpm --filter @workspace/mk-packers run build

echo "      Frontend built → artifacts/api-server/dist/public/"

echo ""
echo "======================================================"
echo "  Build complete!"
echo "  Output folder: artifacts/api-server/dist/"
echo ""
echo "  To run the combined server:"
echo "    PORT=3000 NODE_ENV=production FAST2SMS_API_KEY=xxx \\"
echo "    node artifacts/api-server/dist/index.mjs"
echo ""
echo "  Then open: http://localhost:3000"
echo "======================================================"
