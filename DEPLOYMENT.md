# Restaurant Management System - Deployment Guide

## 🚀 Render Deployment Instructions

### Prerequisites
1. GitHub account with your code repository
2. Render account (free tier available)
3. MongoDB Atlas account (free tier available)

### Step 1: Setup MongoDB Atlas
1. Create a MongoDB Atlas account at https://www.mongodb.com/atlas
2. Create a new cluster (free tier M0)
3. Create a database user with read/write permissions
4. Get your connection string (replace `<password>` with your actual password)
5. Whitelist all IP addresses (0.0.0.0/0) for Render deployment

### Step 2: Deploy Backend API
1. Push your code to GitHub
2. Go to Render Dashboard → New → Web Service
3. Connect your GitHub repository
4. Select `restaurant-backend` folder
5. Configure:
   - **Name**: `restaurant-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

6. Add Environment Variables:
   - `NODE_ENV`: `production`
   - `MONGODB_URI`: `your-mongodb-atlas-connection-string`
   - `PORT`: `5000` (optional, Render sets this automatically)

7. Deploy and wait for completion
8. Note your backend URL: `https://restaurant-backend-xxxx.onrender.com`

### Step 3: Seed Production Database
1. Once backend is deployed, run the seed command:
   ```bash
   # In your local terminal, update the MongoDB URI in .env.production
   # Then run:
   npm run seed:prod
   ```
   Or use Render's shell feature to run the seed command on the deployed service.

### Step 4: Deploy Admin Frontend
1. In Render Dashboard → New → Static Site
2. Connect your GitHub repository
3. Select `restaurant-frontend` folder
4. Configure:
   - **Name**: `restaurant-admin-frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`

5. Add Environment Variables:
   - `REACT_APP_API_URL`: `https://your-backend-url.onrender.com/api`

6. Deploy and note your admin URL

### Step 5: Deploy User App
1. In Render Dashboard → New → Static Site
2. Connect your GitHub repository
3. Select `restaurant-user-app` folder
4. Configure:
   - **Name**: `restaurant-user-app`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`

5. Add Environment Variables:
   - `REACT_APP_API_URL`: `https://your-backend-url.onrender.com/api`

6. Deploy and note your user app URL

## 📱 Application URLs
After deployment, you'll have:
- **Backend API**: `https://restaurant-backend-xxxx.onrender.com`
- **Admin Dashboard**: `https://restaurant-admin-frontend-xxxx.onrender.com`
- **User App**: `https://restaurant-user-app-xxxx.onrender.com`

## 🔧 Production Features
- ✅ Clean codebase (removed debug logs and test files)
- ✅ Environment-specific configurations
- ✅ Production-ready database seeding
- ✅ CORS configured for cross-origin requests
- ✅ Error handling and logging
- ✅ Optimized build configurations

## 🛠️ Post-Deployment
1. Test all functionality on the deployed applications
2. Update environment variables if needed
3. Monitor application logs in Render dashboard
4. Set up custom domains if required

## 📊 System Architecture
```
User App (Static) ←→ Backend API (Node.js) ←→ MongoDB Atlas
Admin Dashboard (Static) ←→ Backend API (Node.js) ←→ MongoDB Atlas
```

## 🔒 Security Notes
- Environment variables are securely stored in Render
- MongoDB connection uses SSL/TLS encryption
- CORS is configured to allow your frontend domains
- No sensitive data is exposed in client-side code

## 📞 Support
If you encounter issues during deployment:
1. Check Render deployment logs
2. Verify environment variables are set correctly
3. Ensure MongoDB Atlas is accessible
4. Check CORS configuration if API calls fail