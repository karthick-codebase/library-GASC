# 🆘 Troubleshooting Guide

Common issues and solutions.

---

## Frontend Issues

### Blank Page

**Problem**: Frontend URL shows blank page

**Solution**:

1. Open browser console (Press F12)
2. Check for red error messages
3. Verify `VITE_API_URL` environment variable is set
4. Ensure backend URL is correct
5. Restart frontend service in Render

### Page Loads But No Data

**Problem**: Page shows but books don't load

**Solution**:

1. Check backend URL is correct
2. Visit backend URL directly: `https://your-backend.onrender.com/books`
3. Should show JSON array of books
4. If not, backend service failed

### Errors in Console

**Problem**: F12 console shows red errors

**Solution**:

1. Check error message
2. If "Cannot GET /books" → Backend URL wrong
3. If "Network error" → Backend not running
4. If "401/403" → Permissions issue

---

## Backend Issues

### Service Won't Deploy

**Problem**: Backend service fails to deploy

**Solution**:

1. Check render.yaml syntax
2. Verify package.json has all dependencies
3. Check build command: `npm install`
4. Check start command has correct PORT variable

### Can't Connect to Database

**Problem**: Backend crashes on startup

**Solution**:

1. Verify src/db.json exists
2. Check db.json is valid JSON
3. Verify start command: `npx json-server --watch src/db.json --port $PORT`
4. Check file permissions

---

## API Connection Issues

### Frontend Can't Reach Backend

**Problem**: API calls fail with 404/500

**Solution**:

1. Verify frontend environment variable `VITE_API_URL`
2. Copy exact backend URL (no trailing slash)
3. Test: Visit backend URL in browser
4. Should see `/books` endpoint works
5. Redeploy frontend service

### Slow API Responses

**Problem**: API calls take too long

**Solution**:

1. Free tier Render services sleep after 15 min of inactivity
2. First request after sleep takes longer
3. Upgrade to paid tier for faster performance

---

## Git/GitHub Issues

### Can't Push to GitHub

**Problem**: `git push` fails

**Solution**:

```bash
# Check remote is correct
git remote -v

# Should show: origin https://github.com/YOUR-USERNAME/library-GASC.git

# If wrong, fix it
git remote set-url origin https://github.com/YOUR-USERNAME/library-GASC.git

# Try push again
git push -u origin main
```

### Permission Denied

**Problem**: "Permission denied" error

**Solution**:

1. Verify GitHub credentials
2. Check SSH keys if using SSH
3. Use HTTPS URL instead of SSH
4. Verify repository access

---

## Deployment Issues

### Changes Not Showing Live

**Problem**: Pushed code but changes don't appear

**Solution**:

1. Wait 2-3 minutes for redeploy
2. Check Render dashboard for deployment status
3. Hard refresh browser (Ctrl+Shift+R)
4. Check no build errors in Render logs

### Build Fails After Push

**Problem**: Deployment fails

**Solution**:

1. Check Render logs for error message
2. Common issues:
   - Missing dependency → Add to package.json
   - Syntax error → Check recent changes
   - Environment variable missing → Add in Render
3. Fix locally, git push again

---

## Quick Fixes

| Issue           | Quick Fix                             |
| --------------- | ------------------------------------- |
| Frontend blank  | Check browser console F12             |
| API failing     | Verify backend URL                    |
| Deployment slow | Free tier sleeps - upgrade or wait    |
| Can't push      | Check git remote with `git remote -v` |
| No data shows   | Verify src/db.json has data           |
| Service crashes | Check Render logs                     |

---

## Getting Help

If nothing works:

1. **Check Render Logs**
   - Render Dashboard → Service → Logs
   - Shows exact error

2. **Check Browser Console**
   - Press F12
   - Network tab shows API calls

3. **Verify Files**
   - render.yaml exists
   - .env.example exists
   - src/db.json has data
   - package.json correct

4. **Ask for Help**
   - Check README.md
   - Search online for error message
   - Check Render documentation

---

**Most Common**: Environment variables not set correctly. Double-check `VITE_API_URL`!
