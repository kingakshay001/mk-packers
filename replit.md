# MK Packers & Movers

A professional packers and movers business website for MK Packers & Movers, Gurugram. Includes a booking form with city autocomplete, OTP verification via Fast2SMS, and WhatsApp redirect after verification.

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

## Hosting Options

### Option 1 — Replit Deploy (Recommended — Full Stack)
Click the **Deploy** button in Replit. Both the frontend and OTP API server go live at a `.replit.app` domain instantly. No extra configuration needed.

### Option 2 — Vercel / Netlify (Frontend Only)
Build the static site and deploy:

```bash
BASE_PATH=/ PORT=4000 pnpm --filter @workspace/mk-packers run build
# Output: artifacts/mk-packers/dist/public/
```

Upload the `dist/public/` folder to Vercel, Netlify, or GitHub Pages.  
**Note:** OTP SMS won't work without a backend. Host the API separately on Render.com or Railway.

### Option 3 — GitHub Pages (Frontend Only, Static)
Same as Option 2. Push `dist/public/` contents to the `gh-pages` branch.

---

## Dev Commands

```bash
# Run API server only
PORT=8080 pnpm --filter @workspace/api-server run dev

# Run frontend only (in another terminal)
PORT=5173 BASE_PATH=/ pnpm --filter @workspace/mk-packers run dev

# Build frontend for production
BASE_PATH=/ PORT=4000 pnpm --filter @workspace/mk-packers run build

# Typecheck everything
pnpm run typecheck
```

---

## Stack

- **Frontend:** React + Vite + Tailwind CSS + shadcn/ui + Framer Motion
- **Backend:** Express 5 (Node.js 24)
- **OTP SMS:** Fast2SMS API
- **Routing:** pnpm workspaces monorepo

## Where Things Live

- `artifacts/mk-packers/` — React frontend (the website)
- `artifacts/api-server/` — Express backend (OTP send/verify API)
- `artifacts/mk-packers/src/App.tsx` — All page sections and booking form
- `artifacts/api-server/src/routes/otp.ts` — OTP send + verify endpoints
- `artifacts/mk-packers/public/mk-logo.png` — Company logo

## Company Details

- **Name:** MK Packers & Movers
- **Phone:** 9728391081
- **Email:** mkpackersandmovers24@gmail.com
- **Address:** House No. 210A, Gali No. 5, Om Nagar Krishna Chowk, Gurugram - 122001 (Hr.)

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `FAST2SMS_API_KEY` | Yes (for SMS) | Fast2SMS API key for OTP delivery |
| `PORT` | Auto-set | API server port (default 8080 locally) |

## User Preferences

- Hindi/English mixed communication preferred
- Website should serve all of India (not just Gurugram)
- OTP must be verified before WhatsApp redirect
- All customer booking details sent to WhatsApp 9728391081
