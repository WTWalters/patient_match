# Railway Deployment Guide - CareTaker Match

## Step 1: Subdomain Setup

### DNS Configuration
Add a CNAME record in your domain registrar (wherever neuralnexusstrategies.ai is managed):

```
Type: CNAME
Name: caretaker
Value: <your-railway-app>.up.railway.app
TTL: 300 (or Auto)
```

Result: `caretaker.neuralnexusstrategies.ai` → Railway

### Railway Custom Domain
1. Go to your Railway project
2. Settings → Domains → Add Custom Domain
3. Enter: `caretaker.neuralnexusstrategies.ai`
4. Railway will verify the CNAME and provision SSL automatically

---

## Step 2: Project Setup (Railway)

### Option A: Connect GitHub Repo
1. Push `patient_match` to GitHub
2. In Railway: New Project → Deploy from GitHub
3. Select the repo
4. Railway auto-detects Vite and configures build

### Option B: Railway CLI
```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

---

## Environment Variables (for later)
```
NODE_ENV=production
VITE_API_URL=https://caretaker.neuralnexusstrategies.ai/api
```

---

## Build Settings
Railway should auto-detect, but if needed:
- Build Command: `npm run build`
- Start Command: `npm run preview` (or serve static from `dist/`)
- Output Directory: `dist`
