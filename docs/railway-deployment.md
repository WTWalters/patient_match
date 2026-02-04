# Railway Deployment Guide

## Subdomain Setup

### 1. Create New Service in Railway

1. Go to your Railway dashboard
2. Create a new project or add a service to existing project
3. Choose "Empty Service" (we'll connect GitHub later)

### 2. Configure Custom Domain

In Railway service settings → Domains:
- Add custom domain: `caretaker.neuralnexusstrategies.ai`

### 3. DNS Configuration

Add a CNAME record in your domain registrar:

```
Type: CNAME
Name: caretaker
Value: <your-railway-service>.up.railway.app
TTL: 300
```

### 4. Environment Variables

Set in Railway dashboard:

```
NODE_ENV=production
VITE_APP_NAME=CareTaker Match
VITE_APP_VERSION=0.1.0
```

### 5. Build Settings

Railway will auto-detect, but if needed:

```
Build Command: npm run build
Start Command: npm run preview
Output Directory: dist
```

---

## Deployment Options

### Option A: GitHub Integration (Recommended)
1. Push code to GitHub repo
2. Connect repo to Railway service
3. Auto-deploys on every push to main

### Option B: Railway CLI
```bash
# Install CLI
npm install -g @railway/cli

# Login
railway login

# Link to project
railway link

# Deploy
railway up
```

---

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

Dev server runs at: `http://localhost:5173`

---

## PWA Testing

### On Desktop
1. Open Chrome DevTools → Application → Service Workers
2. Check "Update on reload" during development

### On iPad (Tom's Testing)
1. Open Safari → `caretaker.neuralnexusstrategies.ai`
2. Tap Share button → "Add to Home Screen"
3. App icon appears on home screen
4. Opens in full-screen mode (no Safari UI)

### Offline Testing
1. Load the app once
2. Enable Airplane mode
3. App should still function (form flow, local storage)
