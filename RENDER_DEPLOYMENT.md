# 🚀 Deploy TinyLink to Render - Complete Guide

## 📋 Prerequisites
- GitHub account with your code pushed
- MongoDB Atlas database ready
- Render account (free tier available)

## 🔧 STEP 1: Prepare Backend for Render

### ✅ Backend Structure (Already Done)
```
backend/
├── src/
│   ├── index.js          # Main server file
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── middleware/
├── package.json          # Updated for Render
└── .env.example
```

### ✅ Package.json Configuration (Already Updated)
```json
{
  "main": "src/index.js",
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js"
  }
}
```

## 🚀 STEP 2: Deploy Backend to Render

### 2.1 Create Web Service
1. Go to [render.com](https://render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository: `https://github.com/revallalokesh/ACS`

### 2.2 Configure Service Settings
```
Name: tinylink-backend
Environment: Node
Region: Singapore (closest to India)
Branch: main
Root Directory: backend
Build Command: npm install
Start Command: npm start
```

### 2.3 Add Environment Variables
Click **"Environment"** and add these variables:

| Key | Value |
|-----|-------|
| `MONGODB_URI` | `mongodb+srv://lokeshrevalla3_db_user:lokesh@za.gkamdby.mongodb.net/tinylink?retryWrites=true&w=majority&appName=ZA` |
| `BASE_URL` | `https://tinylink-backend.onrender.com` (will be your actual URL) |
| `CLIENT_URL` | `https://tinylink-frontend.onrender.com` (will be your frontend URL) |
| `NODE_ENV` | `production` |

### 2.4 Deploy
1. Click **"Create Web Service"**
2. Wait for deployment (5-10 minutes)
3. Your backend will be available at: `https://tinylink-backend.onrender.com`

## 🌐 STEP 3: Deploy Frontend to Render

### 3.1 Create Static Site
1. Go to Render dashboard
2. Click **"New +"** → **"Static Site"**
3. Connect same GitHub repository

### 3.2 Configure Static Site Settings
```
Name: tinylink-frontend
Environment: Static Site
Branch: main
Root Directory: frontend
Build Command: npm install && npm run build
Publish Directory: build
```

### 3.3 Add Environment Variables
| Key | Value |
|-----|-------|
| `REACT_APP_API_URL` | `https://tinylink-backend.onrender.com` |
| `REACT_APP_BASE_URL` | `https://tinylink-backend.onrender.com` |

### 3.4 Deploy Frontend
1. Click **"Create Static Site"**
2. Wait for build and deployment
3. Your frontend will be available at: `https://tinylink-frontend.onrender.com`

## 🔄 STEP 4: Update Backend CORS

After frontend deployment, update your backend environment variable:

1. Go to your backend service on Render
2. Update `CLIENT_URL` to your actual frontend URL
3. Redeploy backend

## ✅ STEP 5: Test Your Deployment

### Backend Health Check
Visit: `https://tinylink-backend.onrender.com/healthz`
Should return: `{"ok": true, "version": "1.0"}`

### Frontend Test
1. Visit your frontend URL
2. Create a short link
3. Test the redirect functionality
4. Check statistics page

## 🔧 Troubleshooting

### Common Issues:

**1. Backend Won't Start**
- Check environment variables are set correctly
- Verify MongoDB connection string
- Check Render logs for specific errors

**2. CORS Errors**
- Ensure `CLIENT_URL` matches your frontend domain exactly
- Check both HTTP and HTTPS protocols

**3. Database Connection Failed**
- Verify MongoDB Atlas allows connections from `0.0.0.0/0`
- Check username/password in connection string
- Ensure database user has proper permissions

**4. Frontend Can't Connect to Backend**
- Verify `REACT_APP_API_URL` is set correctly
- Check backend is deployed and accessible
- Ensure no trailing slashes in URLs

## 📱 Final URLs

After successful deployment:
- **Backend**: `https://tinylink-backend.onrender.com`
- **Frontend**: `https://tinylink-frontend.onrender.com`
- **Health Check**: `https://tinylink-backend.onrender.com/healthz`

## 🎯 Production Checklist

- [ ] Backend deployed and health check passes
- [ ] Frontend deployed and loads correctly
- [ ] Can create short links
- [ ] Redirect functionality works
- [ ] Statistics update correctly
- [ ] Search and filter work
- [ ] Copy to clipboard functions
- [ ] Delete functionality works
- [ ] Mobile responsive design works

## 💡 Pro Tips

1. **Free Tier Limitations**: Render free tier sleeps after 15 minutes of inactivity
2. **Custom Domains**: You can add custom domains in Render settings
3. **Monitoring**: Use Render's built-in monitoring and logs
4. **Updates**: Push to GitHub main branch to auto-deploy
5. **Environment**: Keep production environment variables secure

Your TinyLink application is now live and ready for use! 🎉