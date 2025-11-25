# TinyLink Deployment Guide

Complete deployment instructions for TinyLink URL shortener on Render (backend) + Vercel (frontend) + MongoDB Atlas.

## 🗄️ Database Setup (MongoDB Atlas)

### 1. Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up for free account
3. Create new project: "TinyLink"

### 2. Create Database Cluster
1. Click "Build a Database"
2. Choose "M0 Sandbox" (Free tier)
3. Select cloud provider and region
4. Name cluster: "tinylink-cluster"
5. Click "Create Cluster"

### 3. Configure Database Access
1. Go to "Database Access" in left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Username: `tinylink-user`
5. Generate secure password (save it!)
6. Database User Privileges: "Read and write to any database"
7. Click "Add User"

### 4. Configure Network Access
1. Go to "Network Access" in left sidebar
2. Click "Add IP Address"
3. Choose "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

### 5. Get Connection String
1. Go to "Database" in left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Select "Node.js" driver
5. Copy connection string
6. Replace `<password>` with your user password
7. Replace `<dbname>` with `tinylink`

Example connection string:
```
mongodb+srv://tinylink-user:YOUR_PASSWORD@tinylink-cluster.abc123.mongodb.net/tinylink?retryWrites=true&w=majority
```

## 🖥️ Backend Deployment (Render)

### 1. Prepare Repository
1. Push your code to GitHub
2. Ensure `backend/package.json` points at `src/index.js`:
```json
{
  "main": "src/index.js",
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js"
  }
}
```

### 2. Create Render Account
1. Go to [Render](https://render.com)
2. Sign up with GitHub account
3. Authorize Render to access repositories

### 3. Deploy Backend Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure service:
   - **Name**: `tinylink-backend`
   - **Environment**: `Node`
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### 4. Set Environment Variables
In Render dashboard, go to Environment tab and add:

```env
MONGODB_URI=mongodb+srv://tinylink-user:YOUR_PASSWORD@tinylink-cluster.abc123.mongodb.net/tinylink?retryWrites=true&w=majority
NODE_ENV=production
BASE_URL=https://tinylink-backend.onrender.com
PORT=5000
```

### 5. Deploy
1. Click "Create Web Service"
2. Wait for deployment (5-10 minutes)
3. Test health endpoint: `https://your-app.onrender.com/healthz`

### 6. Custom Domain (Optional)
1. Go to Settings → Custom Domains
2. Add your domain
3. Configure DNS records as instructed

## 🌐 Frontend Deployment (Vercel)

### 1. Prepare Frontend
1. Ensure `frontend/package.json` has build script:
```json
{
  "scripts": {
    "build": "react-scripts build"
  }
}
```

### 2. Create Vercel Account
1. Go to [Vercel](https://vercel.com)
2. Sign up with GitHub account
3. Authorize Vercel to access repositories

### 3. Deploy Frontend
1. Click "New Project"
2. Import your GitHub repository
3. Configure project:
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`

### 4. Set Environment Variables
In Vercel dashboard, go to Settings → Environment Variables:

```env
REACT_APP_API_URL=https://tinylink-backend.onrender.com
REACT_APP_BASE_URL=https://tinylink-backend.onrender.com
```

### 5. Deploy
1. Click "Deploy"
2. Wait for deployment (2-5 minutes)
3. Test your app at the provided URL

### 6. Custom Domain (Optional)
1. Go to Settings → Domains
2. Add your domain
3. Configure DNS records as instructed

## 🔧 Post-Deployment Configuration

### 1. Update CORS Settings
Update `backend/src/index.js` CORS configuration:

```javascript
app.use(cors({
  origin: [
    'https://your-frontend-domain.vercel.app',
    'http://localhost:3000' // Keep for local development
  ],
  credentials: true
}));
```

### 2. Test Full Application
1. Visit your frontend URL
2. Create a test short link
3. Verify redirect works: `https://your-backend.onrender.com/test-code`
4. Check analytics and deletion

### 3. Monitor Performance
1. **Render**: Check logs and metrics in dashboard
2. **Vercel**: Monitor function executions and bandwidth
3. **MongoDB Atlas**: Monitor database performance

## 🚨 Troubleshooting

### Common Issues

#### Backend Won't Start
- Check environment variables are set correctly
- Verify MongoDB connection string
- Check Render logs for specific errors

#### Frontend Can't Connect to Backend
- Verify `REACT_APP_API_URL` is correct
- Check CORS configuration
- Ensure backend is deployed and running

#### Database Connection Failed
- Verify MongoDB Atlas IP whitelist includes 0.0.0.0/0
- Check database user permissions
- Validate connection string format

#### Redirects Not Working
- Ensure redirect route is last in Express routing
- Check that short codes are being generated correctly
- Verify database is storing links properly

### Debug Commands

**Check backend health:**
```bash
curl https://your-backend.onrender.com/healthz
```

**Test API endpoints:**
```bash
# Create link
curl -X POST https://your-backend.onrender.com/api/links \
  -H "Content-Type: application/json" \
  -d '{"targetUrl": "https://example.com"}'

# Get all links
curl https://your-backend.onrender.com/api/links
```

## 📊 Monitoring & Maintenance

### 1. Set Up Monitoring
- **Render**: Enable auto-deploy on git push
- **Vercel**: Enable automatic deployments
- **MongoDB Atlas**: Set up alerts for database usage

### 2. Backup Strategy
- MongoDB Atlas automatically backs up data
- Keep your code in version control
- Document environment variables securely

### 3. Performance Optimization
- **Backend**: Enable compression middleware
- **Frontend**: Optimize bundle size with code splitting
- **Database**: Add indexes for frequently queried fields

### 4. Security Considerations
- Regularly update dependencies
- Use environment variables for all secrets
- Enable HTTPS only in production
- Implement rate limiting for API endpoints

## 🔄 CI/CD Pipeline (Optional)

### GitHub Actions Example
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy TinyLink

on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Render
        # Render auto-deploys on git push
        run: echo "Backend will auto-deploy"

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        # Vercel auto-deploys on git push
        run: echo "Frontend will auto-deploy"
```

## 📝 Environment Variables Summary

### Backend (.env)
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/tinylink?retryWrites=true&w=majority
NODE_ENV=production
BASE_URL=https://your-backend.onrender.com
PORT=5000
```

### Frontend (.env)
```env
REACT_APP_API_URL=https://your-backend.onrender.com
REACT_APP_BASE_URL=https://your-backend.onrender.com
```

## ✅ Deployment Checklist

### Pre-Deployment
- [ ] Code is committed and pushed to GitHub
- [ ] Environment variables are documented
- [ ] Database schema is finalized
- [ ] API endpoints are tested locally

### MongoDB Atlas
- [ ] Cluster created and configured
- [ ] Database user created with proper permissions
- [ ] Network access configured (0.0.0.0/0)
- [ ] Connection string obtained and tested

### Backend (Render)
- [ ] Service created and configured
- [ ] Environment variables set
- [ ] Build and start commands configured
- [ ] Deployment successful
- [ ] Health endpoint accessible

### Frontend (Vercel)
- [ ] Project imported and configured
- [ ] Environment variables set
- [ ] Build configuration correct
- [ ] Deployment successful
- [ ] App loads without errors

### Post-Deployment
- [ ] Full application flow tested
- [ ] CORS configured correctly
- [ ] Custom domains configured (if applicable)
- [ ] Monitoring set up
- [ ] Documentation updated with live URLs

## 🎯 Success Criteria

Your deployment is successful when:
1. ✅ Frontend loads at Vercel URL
2. ✅ Backend health check returns `{"ok": true, "version": "1.0"}`
3. ✅ You can create short links through the UI
4. ✅ Short links redirect correctly
5. ✅ Click analytics are tracked
6. ✅ Links can be deleted
7. ✅ Search functionality works
8. ✅ Mobile responsive design works

## 📞 Support Resources

- **Render Documentation**: https://render.com/docs
- **Vercel Documentation**: https://vercel.com/docs
- **MongoDB Atlas Documentation**: https://docs.atlas.mongodb.com
- **React Documentation**: https://reactjs.org/docs
- **Express.js Documentation**: https://expressjs.com