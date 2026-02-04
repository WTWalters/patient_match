# Railway Deployment Setup

## Subdomain Configuration

### 1. Create New Service in Railway

1. Go to your Railway dashboard
2. Click **New Project** → **Empty Project** (or add to existing project)
3. Click **Add Service** → **Empty Service**
4. Name it `caretaker-match`

### 2. Connect GitHub Repo (Recommended)

1. Push the `patient_match` folder to a GitHub repo
2. In Railway service settings, connect the repo
3. Railway will auto-deploy on push to main

**Or deploy manually:**
```bash
# Install Railway CLI if needed
npm install -g @railway/cli

# Login
railway login

# Link to project
railway link

# Deploy
railway up
```

### 3. Configure Build Settings

In Railway service **Settings** → **Build**:

```
Build Command: npm run build
Start Command: npm run preview -- --host 0.0.0.0 --port $PORT
```

Or for static hosting, use the **Static** deployment option and set:
```
Build Command: npm run build
Publish Directory: dist
```

### 4. Add Custom Domain

1. In Railway service **Settings** → **Networking** → **Custom Domain**
2. Add: `caretaker.neuralnexusstrategies.ai`
3. Railway will give you a CNAME target

### 5. DNS Configuration

In your domain registrar (wherever neuralnexusstrategies.ai is managed):

Add a CNAME record:
```
Type: CNAME
Name: caretaker
Target: <railway-provided-target>.railway.app
TTL: 300
```

### 6. SSL

Railway automatically provisions SSL certificates for custom domains. Give it 5-10 minutes after DNS propagates.

---

## Environment Variables (For Later)

When we add backend:
```
DATABASE_URL=<railway-postgres-url>
API_SECRET=<generate-secure-key>
NODE_ENV=production
```

---

## Verify Deployment

Once deployed, test:
1. `https://caretaker.neuralnexusstrategies.ai` - should load app
2. Add to iPad home screen - should feel like native app
3. Test offline indicator (PWA service worker)
