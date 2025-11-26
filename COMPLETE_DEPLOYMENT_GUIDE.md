# 🚀 Complete End-to-End Deployment Guide for TinyLink

## 📚 Table of Contents
1. [Understanding .env vs .env.example](#understanding-env-files)
2. [Step-by-Step Backend Deployment](#backend-deployment)
3. [Step-by-Step Frontend Deployment](#frontend-deployment)
4. [Post-Deployment Configuration](#post-deployment)
5. [Troubleshooting](#troubleshooting)

---

## 🔐 Understanding .env vs .env.example {#understanding-env-files}

### What is `.env.example`?
- **Purpose**: A **template file** that shows what environment variables are needed
- **Contains**: Placeholder values (like `your-backend.onrender.com`)
- **Location**: In your GitHub repository (committed to Git)
- **Use**: Documentation for other developers (and yourself) to know what variables to set

### What is `.env`?
- **Purpose**: Contains your **actual secret values** (database passwords, API keys, real URLs)
- **Contains**: Real values (like `https://acs-cc1l.onrender.com`)
- **Location**: On your local machine (NOT in GitHub - it's in `.gitignore`)
- **Use**: Used by your application when running locally

### Key Differences

| Aspect | `.env.example` | `.env` |
|--------|----------------|--------|
| **In Git?** | ✅ Yes (committed) | ❌ No (in .gitignore) |
| **Contains Secrets?** | ❌ No (placeholders only) | ✅ Yes (real values) |
| **When to Update?** | When you add new required variables | Every time you deploy or change config |
| **Used by App?** | ❌ Never | ✅ Yes (locally) |

### Example

**`.env.example` (in GitHub):**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tinylink
BASE_URL=https://your-backend.onrender.com
CLIENT_URL=https://your-frontend.onrender.com
```

**`.env` (on your laptop, NOT in GitHub):**
```env
MONGODB_URI=mongodb+srv://lokesh:actualpassword@cluster.mongodb.net/tinylink
BASE_URL=https://acs-cc1l.onrender.com
CLIENT_URL=https://your-actual-frontend-url.onrender.com
```

---

## 🖥️ Step-by-Step Backend Deployment {#backend-deployment}

### Prerequisites
- ✅ Code pushed to GitHub: `https://github.com/revallalokesh/ACS`
- ✅ MongoDB Atlas database ready
- ✅ Render account created

### Step 1: Create Backend Web Service

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** button (top right)
3. Select **"Web Service"**

### Step 2: Connect GitHub Repository

1. Click **"Connect GitHub"** or **"Connect account"**
2. Authorize Render to access your repositories
3. Search for: `ACS` or `revallalokesh/ACS`
4. Click **"Connect"** next to your repository

### Step 3: Configure Backend Service

Fill in these **exact** settings:

| Field | Value |
|-------|-------|
| **Name** | `tinylink-backend` (or any name) |
| **Region** | Choose closest to you (e.g., Singapore) |
| **Branch** | `main` |
| **Root Directory** | `backend` ⚠️ **IMPORTANT** |
| **Runtime** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |

**Visual Guide:**
```
Name: [tinylink-backend]
Region: [Singapore ▼]
Branch: [main ▼]
Root Directory: [backend]  ← Type exactly "backend"
Build Command: [npm install]
Start Command: [npm start]
```

### Step 4: Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"** and add these:

| Key | Value | Notes |
|-----|-------|-------|
| `MONGODB_URI` | `mongodb+srv://lokeshrevalla3_db_user:lokesh@za.gkamdby.mongodb.net/tinylink?retryWrites=true&w=majority` | Your MongoDB connection string |
| `BASE_URL` | `https://acs-cc1l.onrender.com` | Your backend URL (you'll get this after deployment) |
| `CLIENT_URL` | `http://localhost:3000` | Temporary - update after frontend deploys |
| `NODE_ENV` | `production` | |
| `PORT` | `5000` | (Optional - Render sets this automatically) |

**Important Notes:**
- `BASE_URL` will be provided by Render after deployment (like `https://acs-cc1l.onrender.com`)
- `CLIENT_URL` should initially be `http://localhost:3000` for CORS, then update to your frontend URL later

### Step 5: Deploy Backend

1. Scroll down and click **"Create Web Service"**
2. Wait 5-10 minutes for deployment
3. You'll see: `Your service is live 🎉`
4. Copy your backend URL (e.g., `https://acs-cc1l.onrender.com`)

### Step 6: Test Backend

1. Visit: `https://acs-cc1l.onrender.com/healthz`
2. Should return: `{"ok": true, "version": "1.0"}`
3. ✅ Backend is working!

---

## 🌐 Step-by-Step Frontend Deployment {#frontend-deployment}

### Step 1: Create Frontend Static Site

1. In Render Dashboard, click **"New +"**
2. Select **"Static Site"**

### Step 2: Connect Same Repository

1. Select the same repository: `revallalokesh/ACS`
2. Click **"Connect"**

### Step 3: Configure Frontend Service

Fill in these **exact** settings:

| Field | Value |
|-------|-------|
| **Name** | `tinylink-frontend` |
| **Branch** | `main` |
| **Root Directory** | `frontend` ⚠️ **MUST BE EXACTLY "frontend"** |
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `build` |

**⚠️ CRITICAL: Root Directory**
- ✅ Correct: `frontend`
- ❌ Wrong: `src/frontend`
- ❌ Wrong: `./frontend`
- ❌ Wrong: (empty)

**Visual Guide:**
```
Name: [tinylink-frontend]
Branch: [main ▼]
Root Directory: [frontend]  ← Type exactly "frontend" (no slashes, no src/)
Build Command: [npm install && npm run build]
Publish Directory: [build]
```

### Step 4: Add Frontend Environment Variables

Click **"Advanced"** → **"Add Environment Variable"**:

| Key | Value |
|-----|-------|
| `REACT_APP_API_URL` | `https://acs-cc1l.onrender.com` | Your backend URL |
| `REACT_APP_BASE_URL` | `https://acs-cc1l.onrender.com` | Your backend URL |

**Note:** These are the URLs where your backend is deployed.

### Step 5: Deploy Frontend

1. Click **"Create Static Site"**
2. Wait 3-5 minutes for build
3. You should see: `Build successful 🎉`
4. Copy your frontend URL (e.g., `https://tinylink-frontend.onrender.com`)

### Step 6: Test Frontend

1. Visit your frontend URL
2. You should see the TinyLink dashboard
3. Try creating a short link
4. ✅ Frontend is working!

---

## 🔄 Post-Deployment Configuration {#post-deployment}

### Step 1: Update Backend CORS

Now that both are deployed, update the backend to allow your frontend:

1. Go to your **backend service** on Render
2. Click **"Environment"** tab
3. Find `CLIENT_URL` variable
4. Click **"Edit"** (pencil icon)
5. Change value from `http://localhost:3000` to your actual frontend URL:
   ```
   https://tinylink-frontend.onrender.com
   ```
6. Click **"Save Changes"**
7. Render will automatically redeploy

### Step 2: Test Full Application

1. **Create a link:**
   - Go to your frontend URL
   - Enter a URL (e.g., `https://google.com`)
   - Click "Create Short Link"

2. **Test redirect:**
   - Copy the short URL (e.g., `https://acs-cc1l.onrender.com/abc123`)
   - Open in new tab
   - Should redirect to original URL

3. **Check statistics:**
   - Click on the link code in dashboard
   - Should show click count and stats

4. **Test delete:**
   - Delete a link
   - Try accessing the short URL
   - Should return 404

---

## ❓ Do I Need to Update .env Files After Deployment?

### Short Answer: **NO** (for Render deployment)

### Detailed Explanation:

#### For Render Deployment:
- ❌ **Don't update `.env` files** - Render doesn't use them
- ✅ **Update Environment Variables in Render Dashboard** instead
- The `.env` files are only for **local development** on your laptop

#### When You DO Update .env Files:

**1. Local Development:**
- If you want to test locally against the deployed backend
- Update your **local** `.env` file:
  ```env
  REACT_APP_API_URL=https://acs-cc1l.onrender.com
  REACT_APP_BASE_URL=https://acs-cc1l.onrender.com
  ```

**2. .env.example (Optional):**
- Only update if you add new required variables
- Keep placeholder values (not real URLs)
- This is just documentation

### Summary Table:

| File | When to Update | What to Update |
|------|----------------|----------------|
| **Local `.env`** | When testing locally | Real URLs for local testing |
| **Render Environment Variables** | After deployment | Real URLs for production |
| **`.env.example`** | When adding new variables | Keep placeholders |

---

## 🐛 Troubleshooting {#troubleshooting}

### Error: "Could not find index.html"

**Problem:** Root Directory is wrong

**Solution:**
1. Go to Frontend Static Site → Settings
2. Check **Root Directory** is exactly: `frontend`
3. Save and redeploy

### Error: "Build failed"

**Check:**
1. View build logs in Render
2. Look for specific error messages
3. Common issues:
   - Missing dependencies → Check `package.json`
   - Wrong Node version → Render uses Node 22 by default
   - Build command wrong → Should be `npm install && npm run build`

### Error: "CORS policy blocked"

**Problem:** Frontend URL not in backend CORS whitelist

**Solution:**
1. Go to Backend → Environment
2. Update `CLIENT_URL` to your frontend URL
3. Redeploy backend

### Error: "Cannot connect to backend"

**Check:**
1. Backend is deployed and running
2. `REACT_APP_API_URL` matches backend URL exactly
3. No trailing slashes in URLs
4. Test backend health: `https://your-backend.onrender.com/healthz`

### Frontend Shows Blank Page

**Check:**
1. Open browser console (F12)
2. Look for JavaScript errors
3. Check Network tab for failed API calls
4. Verify environment variables are set correctly

---

## ✅ Final Checklist

After deployment, verify:

- [ ] Backend health check works: `/healthz` returns `{"ok": true}`
- [ ] Frontend loads without errors
- [ ] Can create short links
- [ ] Short links redirect correctly
- [ ] Click counts increment
- [ ] Statistics page works
- [ ] Delete functionality works
- [ ] Search/filter works
- [ ] Mobile responsive

---

## 📞 Quick Reference

### Your Current URLs:
- **Backend:** `https://acs-cc1l.onrender.com`
- **Frontend:** (will be provided after deployment)

### Important Files:
- **Backend Root:** `backend/`
- **Frontend Root:** `frontend/`
- **Backend Entry:** `backend/src/index.js`
- **Frontend Build:** `frontend/build/`

### Environment Variables Summary:

**Backend (Render):**
- `MONGODB_URI`
- `BASE_URL`
- `CLIENT_URL`
- `NODE_ENV=production`

**Frontend (Render):**
- `REACT_APP_API_URL`
- `REACT_APP_BASE_URL`

---

## 🎉 Success!

Once everything is deployed:
1. ✅ Backend is live and responding
2. ✅ Frontend is live and loading
3. ✅ Full application works end-to-end
4. ✅ Ready for submission!

Good luck with your Aganitha assignment! 🚀

