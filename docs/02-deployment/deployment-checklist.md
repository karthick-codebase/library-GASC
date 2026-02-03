# 📋 Deployment Checklist

Step-by-step deployment with checkboxes.

---

## Before You Start

- [ ] GitHub account created (https://github.com)
- [ ] Render account created (https://render.com)
- [ ] Git installed on computer
- [ ] Node.js 18+ installed
- [ ] Project folder open in terminal

---

## Step 1: Push to GitHub (5 min)

### 1.1 Create GitHub Repository

- [ ] Go to https://github.com/new
- [ ] Repository name: `library-GASC`
- [ ] Click "Create repository"

### 1.2 Push Code

- [ ] Open Command Prompt/Terminal
- [ ] Navigate to project folder
- [ ] Run these commands:

```bash
git init
git add .
git commit -m "Initial commit: Library Management System"
git remote add origin https://github.com/YOUR-USERNAME/library-GASC.git
git branch -M main
git push -u origin main
```

- [ ] Verify code appears on GitHub website

---

## Step 2: Deploy Frontend (10 min)

- [ ] Go to https://render.com
- [ ] Click **"New +"** → **"Web Service"**
- [ ] Select GitHub repo `library-GASC`
- [ ] Fill in:
  - [ ] Name: `library-gasc-frontend`
  - [ ] Environment: `Node`
  - [ ] Build: `npm install && npm run build`
  - [ ] Start: `npm run start`
- [ ] Click **"Deploy"**
- [ ] Wait for deployment (3-5 min)
- [ ] Copy frontend URL: ******\_\_\_\_******

---

## Step 3: Deploy Backend (10 min)

- [ ] Click **"New +"** → **"Web Service"**
- [ ] Select GitHub repo `library-GASC` again
- [ ] Fill in:
  - [ ] Name: `library-gasc-backend`
  - [ ] Environment: `Node`
  - [ ] Build: `npm install`
  - [ ] Start: `npx json-server --watch src/db.json --port $PORT`
- [ ] Click **"Deploy"**
- [ ] Wait for deployment (2-3 min)
- [ ] Copy backend URL: ******\_\_\_\_******

---

## Step 4: Connect Services (3 min)

- [ ] Go to frontend service → **Environment**
- [ ] Add new environment variable:
  - [ ] Key: `VITE_API_URL`
  - [ ] Value: `https://your-backend-url.onrender.com`
- [ ] Click **"Save"**
- [ ] Wait for auto-redeploy

---

## Step 5: Test (2 min)

- [ ] Visit frontend URL
- [ ] Check:
  - [ ] Page loads without blank screen
  - [ ] Dashboard displays statistics
  - [ ] Books load from database
  - [ ] Can add a test book
  - [ ] Can borrow a book
  - [ ] Can return a book
  - [ ] No red errors in console (F12)

---

## Final Checklist

- [ ] Code is on GitHub
- [ ] Frontend is live
- [ ] Backend is live
- [ ] Frontend can reach backend
- [ ] All features work
- [ ] No console errors

---

## If Something Goes Wrong

**Frontend shows blank page?**

- [ ] Check VITE_API_URL in environment variables
- [ ] Check backend URL is correct
- [ ] Open browser console (F12) for errors

**API calls failing?**

- [ ] Verify backend service is running
- [ ] Check backend URL by visiting it
- [ ] Verify VITE_API_URL matches exactly

**Deployment failed?**

- [ ] Check Render logs
- [ ] Verify render.yaml syntax
- [ ] Ensure all dependencies in package.json

---

## Success! 🎉

Your app is deployed and live!

**Frontend**: https://library-gasc-frontend.onrender.com  
**Backend**: https://library-gasc-backend.onrender.com

---

## Future Changes

```bash
# Make changes to files
# Then:
git add .
git commit -m "description"
git push

# Render auto-deploys automatically!
```

---

**Estimated Total Time**: ~40 minutes

**Next Step**: See other docs for detailed information!
