# MK Packers & Movers

A professional packers and movers business website for MK Packers & Movers, Gurugram. Includes a booking form with city autocomplete, OTP verification via Fast2SMS, and WhatsApp redirect after verification.

---

## Quick Start — Local Machine

**Requirements:** Node.js 20+, pnpm (auto-installed by the script)

```bash
# 1. Clone / download the project
# 2. Create a .env file (see below)
# 3. Run the startup script
bash start-local.sh
```

Then open **http://localhost:5173** in your browser.

### .env file (create in project root)

```
FAST2SMS_API_KEY=your_fast2sms_api_key_here
```

Get a free API key at https://fast2sms.com  
Then complete "Website Verification" in their OTP Message menu to activate OTP sending.

---

## Combined Server (Single Host — Any Platform)

Build frontend + backend into **one server** that can be hosted anywhere:

```bash
bash build-combined.sh
```

This creates `artifacts/api-server/dist/` with:
- `dist/index.mjs` — Express server (serves API + React frontend)
- `dist/public/` — Built React frontend files

Run it:

```bash
PORT=3000 NODE_ENV=production FAST2SMS_API_KEY=your_key \
  node artifacts/api-server/dist/index.mjs
```

Open **http://localhost:3000** — everything from one port!

Or use the startup script:

```bash
bash start-local.sh --single
```

---

## Hosting Options

### Option 1 — Replit Deploy (Recommended)
Click the **Deploy** button in Replit. Frontend + OTP API go live at a `.replit.app` domain instantly.

### Option 2 — Render.com (Free Tier Available)
1. Push code to GitHub
2. Connect repo to [render.com](https://render.com)
3. Render auto-detects `render.yaml` — set `FAST2SMS_API_KEY` env var in dashboard
4. Click **Deploy** — done!

### Option 3 — Railway.app
1. Push code to GitHub
2. Connect repo to [railway.app](https://railway.app)
3. Set `NODE_ENV=production` and `FAST2SMS_API_KEY` env vars
4. Build command: `bash build-combined.sh`
5. Start command: `node artifacts/api-server/dist/index.mjs`

### Option 4 — Heroku / Fly.io / Any Node.js Host
Use the included `Procfile`:
- Build command: `bash build-combined.sh`
- Start command: `web: node artifacts/api-server/dist/index.mjs`
- Set `FAST2SMS_API_KEY` env var in the hosting dashboard

### Option 5 — Vercel / Netlify (Frontend Only, Static)
Build the static site and deploy:

```bash
BASE_PATH=/ PORT=4000 pnpm --filter @workspace/mk-packers run build
```

Upload `artifacts/mk-packers/dist/public/` to Vercel/Netlify.  
**Note:** OTP SMS won't work without a backend. Host the API separately.

---

## Dev Commands

```bash
# Run API server only
PORT=8080 pnpm --filter @workspace/api-server run dev

# Run frontend only (in another terminal)
PORT=5173 BASE_PATH=/ pnpm --filter @workspace/mk-packers run dev

# Combined production build (frontend + backend in one)
bash build-combined.sh

# Typecheck everything
pnpm run typecheck
```

---

## Stack

- **Frontend:** React + Vite + Tailwind CSS + shadcn/ui + Framer Motion
- **Backend:** Express 5 (Node.js 20+)
- **OTP SMS:** Fast2SMS API
- **Routing:** pnpm workspaces monorepo

## Where Things Live

- `artifacts/mk-packers/` — React frontend (the website)
- `artifacts/api-server/` — Express backend (OTP send/verify API)
- `artifacts/mk-packers/src/App.tsx` — All page sections and booking form
- `artifacts/api-server/src/routes/otp.ts` — OTP send + verify endpoints
- `artifacts/api-server/src/app.ts` — Express app (also serves static frontend in production)
- `artifacts/mk-packers/public/mk-logo.png` — Company logo
- `build-combined.sh` — Builds frontend + backend into one deployable folder
- `render.yaml` — Render.com deployment config
- `Procfile` — Heroku / Fly.io deployment config

## Company Details

- **Name:** MK Packers & Movers
- **Phone:** 9728391081
- **Email:** mkpackersandmovers24@gmail.com
- **Address:** House No. 210A, Gali No. 5, Om Nagar Krishna Chowk, Gurugram - 122001 (Hr.)

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `FAST2SMS_API_KEY` | Yes (for SMS) | Fast2SMS API key for OTP delivery |
| `PORT` | Auto-set | Server port (default 3000 in combined mode) |
| `NODE_ENV` | Yes (prod) | Set to `production` for combined server |

## User Preferences

- Hindi/English mixed communication preferred
- Website should serve all of India (not just Gurugram)
- OTP must be verified before WhatsApp redirect
- All customer booking details sent to WhatsApp 9728391081
