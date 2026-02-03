# 🚀 Quick Start Guide

Deploy in 5 simple steps - about 40 minutes total.

---

## Prerequisites

Have ready:

- GitHub account (https://github.com)
- Render account (https://render.com)
- Command Prompt/Terminal

---

## Step 1: Push to GitHub (5 min)

```bash
cd your-project-folder
git init
git add .
git commit -m "Initial commit: Library Management System"
git remote add origin https://github.com/YOUR-USERNAME/library-GASC.git
git branch -M main
git push -u origin main
```

---

## Step 2: Deploy Frontend (10 min)

1. Go to https://render.com → **"New +"** → **"Web Service"**
2. Select your `library-GASC` repository
3. Fill in:
   - **Name**: `library-gasc-frontend`
   - **Environment**: `Node`
   - **Build**: `npm install && npm run build`
   - **Start**: `npm run start`
4. Click **"Deploy"** and wait
5. Copy the frontend URL (e.g., `https://library-gasc-frontend.onrender.com`)

---

## Step 3: Deploy Backend (10 min)

1. In Render, click **"New +"** → **"Web Service"** again
2. Select `library-GASC` repository
3. Fill in:
   - **Name**: `library-gasc-backend`
   - **Environment**: `Node`
   - **Build**: `npm install`
   - **Start**: `npx json-server --watch src/db.json --port $PORT`
4. Click **"Deploy"** and wait
5. Copy the backend URL

---

## Step 4: Connect Services (3 min)

1. Go to frontend service → **Environment**
2. Add environment variable:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://your-backend-url.onrender.com`
3. Click **"Save"** (auto-redeploys)

---

## Step 5: Test (2 min)

Visit: https://library-gasc-frontend.onrender.com

Verify:

- ✅ Page loads
- ✅ Dashboard shows data
- ✅ Can add books
- ✅ Can borrow/return books

---

## Done! 🎉

Your app is live!

- **Frontend**: https://library-gasc-frontend.onrender.com
- **Backend**: https://library-gasc-backend.onrender.com

---

## Making Changes

Every time you update code:

```bash
git add .
git commit -m "your message"
git push
```

Render auto-deploys automatically!

---

## Need Help?

See other files in this folder for detailed guides.
