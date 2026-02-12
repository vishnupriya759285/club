# Deployment Guide

## Quick Deployment Steps

### Option 1: Deploy Backend and Frontend Separately (Recommended)

#### Backend Deployment (Render.com - Free)
1. Go to https://render.com
2. Sign up/Login
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Name**: club-attendance-backend
   - **Root Directory**: backend
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
6. Add Environment Variables:
   - `MONGODB_URI`: your MongoDB connection string
   - `JWT_SECRET`: a strong random string
   - `CORS_ORIGIN`: your Vercel frontend URL (e.g., https://your-app.vercel.app)
7. Click "Create Web Service"
8. Copy the deployed URL (e.g., https://club-attendance-backend.onrender.com)

#### Frontend Deployment (Vercel)
1. Go to https://vercel.com
2. Import your GitHub repository
3. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: frontend
   - **Build Command**: `npm run build`
   - **Output Directory**: dist
4. Add Environment Variable:
   - `VITE_API_URL`: Your backend URL from Render + /api
     (e.g., https://club-attendance-backend.onrender.com/api)
5. Click "Deploy"

### Option 2: Quick Fix for Current Deployment

If you want to keep using the current Vercel deployment, update the project settings:

1. Go to your Vercel project settings
2. Under "General" → "Build & Development Settings":
   - **Framework Preset**: Vite
   - **Root Directory**: frontend
   - **Build Command**: `npm run build`
   - **Output Directory**: dist
3. Redeploy

## Environment Variables

### Backend (.env)
```
PORT=5000
NODE_ENV=production
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
JWT_EXPIRE=7d
CORS_ORIGIN=https://your-frontend-url.vercel.app
```

### Frontend (.env.production)
```
VITE_API_URL=https://your-backend-url/api
```

## Testing Deployment

1. Visit your frontend URL
2. Try to register a new user
3. Check if login works
4. Verify all features are functional
