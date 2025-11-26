# 🔧 Fix Frontend Build Error on Render

## ❌ The Error
```
Could not find a required file.
  Name: index.html
  Searched in: /opt/render/project/src/frontend/public
```

## 🔍 Root Cause
Render is looking in the **wrong directory**. The error shows it's searching in `/opt/render/project/src/frontend/public`, which means the **Root Directory** setting is incorrect.

## ✅ Solution: Fix Render Configuration

### Step 1: Go to Your Frontend Static Site on Render
1. Log into [Render Dashboard](https://dashboard.render.com)
2. Click on your **frontend static site** service

### Step 2: Go to Settings
1. Click on **"Settings"** tab in the left sidebar
2. Scroll down to **"Build & Deploy"** section

### Step 3: Fix Root Directory
**IMPORTANT:** The Root Directory must be set to exactly:
```
frontend
```

**NOT:**
- ❌ `src/frontend`
- ❌ `./frontend`
- ❌ (empty/blank)
- ❌ `frontend/`

### Step 4: Verify Build Command
Make sure Build Command is:
```
npm install && npm run build
```

### Step 5: Verify Publish Directory
Make sure Publish Directory is:
```
build
```

### Step 6: Save and Redeploy
1. Click **"Save Changes"** at the bottom
2. Go to **"Manual Deploy"** tab
3. Click **"Deploy latest commit"**
4. Wait for deployment to complete

## 📋 Complete Frontend Configuration Checklist

When creating/editing your Static Site on Render, use these **exact** settings:

| Setting | Value |
|---------|-------|
| **Name** | `tinylink-frontend` (or any name you prefer) |
| **Environment** | `Static Site` |
| **Branch** | `main` (or your default branch) |
| **Root Directory** | `frontend` ⚠️ **MUST BE EXACTLY THIS** |
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `build` |

## 🔐 Environment Variables

In the **"Environment"** tab, add:

| Key | Value |
|-----|-------|
| `REACT_APP_API_URL` | `https://acs-cc1l.onrender.com` (your backend URL) |
| `REACT_APP_BASE_URL` | `https://acs-cc1l.onrender.com` (your backend URL) |

## ✅ After Fixing

Once you save and redeploy, you should see:
```
✓ Creating an optimized production build...
✓ Compiled successfully.
✓ Build successful 🎉
```

## 🧪 Test Your Deployment

1. Visit your frontend URL (provided by Render)
2. You should see the TinyLink dashboard
3. Try creating a short link
4. Verify it works end-to-end

## 🆘 Still Having Issues?

If the error persists:

1. **Double-check Root Directory**: It must be exactly `frontend` (no spaces, no slashes)
2. **Check your repo structure**: Make sure `frontend/public/index.html` exists in your GitHub repo
3. **View build logs**: Click on the failed deployment to see detailed error messages
4. **Try manual deploy**: Sometimes automatic deploys can have caching issues

## 📸 Visual Guide

When setting Root Directory in Render:
- ✅ Type: `frontend`
- ❌ Don't type: `./frontend` or `/frontend` or `src/frontend`

The Root Directory field should look like this:
```
[frontend]
```

Not like this:
```
[src/frontend]  ❌
[./frontend]    ❌
[/frontend]     ❌
```

