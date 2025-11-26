# 🔧 Update Render Environment Variables with Your URLs

## 📋 Your Current URLs

- **Backend URL:** `https://acs-1.onrender.com`
- **Frontend URL:** `https://acs-cc1l.onrender.com`

---

## 🔧 Step 1: Update Frontend Environment Variables

### Go to Frontend Static Site on Render

1. Log into [Render Dashboard](https://dashboard.render.com)
2. Click on your **Frontend Static Site** service (the one with URL `acs-cc1l.onrender.com`)
3. Click on **"Environment"** tab in the left sidebar

### Update These Variables

| Variable Name | Current Value | New Value |
|---------------|---------------|-----------|
| `REACT_APP_API_URL` | (may be wrong) | `https://acs-1.onrender.com` |
| `REACT_APP_BASE_URL` | (may be wrong) | `https://acs-1.onrender.com` |

**Steps:**
1. Find `REACT_APP_API_URL` in the list
2. Click the **pencil icon** (Edit) or **"Add Environment Variable"** if it doesn't exist
3. Set value to: `https://acs-1.onrender.com`
4. Click **"Save Changes"**
5. Repeat for `REACT_APP_BASE_URL`

**Important:** 
- ✅ Use `https://` (not `http://`)
- ✅ No trailing slash at the end
- ✅ Exact match: `https://acs-1.onrender.com`

---

## 🔧 Step 2: Update Backend CORS Settings

### Go to Backend Web Service on Render

1. In Render Dashboard, click on your **Backend Web Service** (the one with URL `acs-1.onrender.com`)
2. Click on **"Environment"** tab

### Update CLIENT_URL Variable

| Variable Name | Current Value | New Value |
|---------------|---------------|-----------|
| `CLIENT_URL` | (may be `http://localhost:3000`) | `https://acs-cc1l.onrender.com` |

**Steps:**
1. Find `CLIENT_URL` in the list
2. Click the **pencil icon** (Edit)
3. Change value to: `https://acs-cc1l.onrender.com`
4. Click **"Save Changes"**

**Important:**
- ✅ This allows your frontend to make API calls to the backend
- ✅ Render will automatically redeploy after saving

---

## 🔧 Step 3: Verify Backend BASE_URL

### Check Backend Environment Variable

In your **Backend Web Service** → **Environment** tab, verify:

| Variable Name | Should Be |
|---------------|-----------|
| `BASE_URL` | `https://acs-1.onrender.com` |

If it's different or missing, update it to match your backend URL.

---

## ✅ Step 4: Test Your Configuration

### Test Backend Health Check

Visit: [https://acs-1.onrender.com/healthz](https://acs-1.onrender.com/healthz)

Should return:
```json
{"ok": true, "version": "1.0"}
```

### Test Frontend

1. Visit: [https://acs-cc1l.onrender.com](https://acs-cc1l.onrender.com)
2. You should see the TinyLink dashboard
3. Try creating a short link
4. If you see errors in browser console, check:
   - Frontend environment variables are set correctly
   - Backend CORS is allowing the frontend URL

### Test Full Flow

1. **Create a link:**
   - Go to frontend: `https://acs-cc1l.onrender.com`
   - Enter URL: `https://google.com`
   - Click "Create Short Link"

2. **Test redirect:**
   - Copy the short URL (e.g., `https://acs-1.onrender.com/abc123`)
   - Open in new tab
   - Should redirect to `https://google.com`

3. **Check statistics:**
   - Click on the link code in dashboard
   - Should show click count and stats

---

## 🐛 Troubleshooting

### Error: "Network Error" or "CORS Error"

**Problem:** Backend CORS not allowing frontend URL

**Solution:**
1. Go to Backend → Environment
2. Verify `CLIENT_URL` is exactly: `https://acs-cc1l.onrender.com`
3. Save and wait for redeploy (2-3 minutes)

### Error: "Failed to fetch" or "Cannot connect to API"

**Problem:** Frontend pointing to wrong backend URL

**Solution:**
1. Go to Frontend → Environment
2. Verify `REACT_APP_API_URL` is exactly: `https://acs-1.onrender.com`
3. Save and wait for rebuild (3-5 minutes)

### Frontend Shows Old Data

**Problem:** Browser cache or environment variables not updated

**Solution:**
1. Hard refresh browser: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. Clear browser cache
3. Wait 5 minutes after updating environment variables for rebuild to complete

---

## 📝 Quick Reference

### Environment Variables Summary

**Frontend (Static Site):**
```env
REACT_APP_API_URL=https://acs-1.onrender.com
REACT_APP_BASE_URL=https://acs-1.onrender.com
```

**Backend (Web Service):**
```env
MONGODB_URI=your-mongodb-connection-string
BASE_URL=https://acs-1.onrender.com
CLIENT_URL=https://acs-cc1l.onrender.com
NODE_ENV=production
PORT=5000
```

### Your Live URLs

- **Backend:** [https://acs-1.onrender.com](https://acs-1.onrender.com)
- **Frontend:** [https://acs-cc1l.onrender.com](https://acs-cc1l.onrender.com)
- **Health Check:** [https://acs-1.onrender.com/healthz](https://acs-1.onrender.com/healthz)

---

## ✅ Checklist

After updating, verify:

- [ ] Frontend `REACT_APP_API_URL` = `https://acs-1.onrender.com`
- [ ] Frontend `REACT_APP_BASE_URL` = `https://acs-1.onrender.com`
- [ ] Backend `CLIENT_URL` = `https://acs-cc1l.onrender.com`
- [ ] Backend `BASE_URL` = `https://acs-1.onrender.com`
- [ ] Backend health check works
- [ ] Frontend loads without errors
- [ ] Can create short links
- [ ] Redirects work correctly
- [ ] No CORS errors in browser console

---

## 🎉 Done!

Once all environment variables are updated and both services have redeployed, your TinyLink application should be fully functional!

**Note:** After updating environment variables, Render automatically redeploys:
- **Backend:** Usually takes 2-3 minutes
- **Frontend:** Usually takes 3-5 minutes (needs to rebuild)

Wait for both to finish deploying before testing.

