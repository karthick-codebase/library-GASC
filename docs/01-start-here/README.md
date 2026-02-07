# 🚀 Quick Start

Everything you need to get deployed in 40 minutes.

---

## 5 Simple Steps

1. **Prepare** - Have GitHub & Render accounts (2 min)
2. **Push to GitHub** - 4 git commands (5 min)
3. **Deploy Frontend** - Click and wait (10 min)
4. **Deploy Backend** - Click and wait (10 min)
5. **Connect & Test** - Set env variable (3 min)

---

## Command Reference

```bash
# Step 2: Push to GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/karthick-codebase/library-GASC.git
git branch -M main
git push -u origin main
```

---

## Render Setup

**Frontend Service**

- Name: `library-gasc-frontend`
- Build: `npm install && npm run build`
- Start: `npm run start`

**Backend Service**

- Name: `library-gasc-backend`
- Build: `npm install`
- Start: `npx json-server --watch src/db.json --port $PORT`

---

## After Deployment

Frontend: https://library-gasc-frontend.onrender.com  
Backend: https://library-gasc-backend.onrender.com

---

**Total Time**: ~40 minutes  
**Next**: See detailed guides in this folder or parent `SETUP_GUIDE.md`
