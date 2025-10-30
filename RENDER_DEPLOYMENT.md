# Deploying Timetable Management System to Render

This guide will help you deploy your full-stack application (Node.js/Express backend + React frontend) as a **single combined service** on Render.

## Architecture

Your app is configured to run as **one web service** where:
- Backend (Express) serves the API routes (`/api/*`)
- Backend also serves the built React frontend for all other routes
- This saves resources and uses only 1 free tier slot

## Prerequisites

1. **GitHub Account** - Your code must be in a GitHub repository
2. **Render Account** - Sign up at [render.com](https://render.com)
3. **MongoDB Atlas** - A cloud MongoDB database (free tier available at [mongodb.com/atlas](https://www.mongodb.com/atlas))

## Step 1: Prepare Your MongoDB Database

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas) and create a free account
2. Create a new cluster (use the free M0 tier)
3. Create a database user with username and password
4. Add `0.0.0.0/0` to IP Access List (allows connections from anywhere)
5. Get your connection string (it looks like: `mongodb+srv://username:password@cluster.mongodb.net/dbname`)

## Step 2: Push Your Code to GitHub

If you haven't already:

```bash
git init
git add .
git commit -m "Initial commit for Render deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

## Step 3: Deploy on Render

### Option A: Using Blueprint (Recommended - Automatic)

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New"** → **"Blueprint"**
3. Connect your GitHub repository
4. Render will automatically detect the `render.yaml` file
5. Click **"Apply"**
6. Set the environment variable:
   - **MONGO_URI**: Your MongoDB connection string from Step 1
7. Wait 5-10 minutes for build to complete
8. Your app will be live at: `https://timetable-app.onrender.com`

### Option B: Manual Deployment

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `timetable-app`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: Leave empty (uses project root)
   - **Runtime**: `Node`
   - **Build Command**: `cd frontend && npm install && npm run build && cd ../backend && npm install && npm run build`
   - **Start Command**: `cd backend && npm start`
   - **Plan**: Free
5. Add Environment Variables:
   - **MONGO_URI**: Your MongoDB connection string
   - **NODE_ENV**: `production`
6. Click **"Create Web Service"**
7. Wait for deployment to complete (5-10 minutes)
8. Your app will be live at the provided URL

## Step 4: Access Your Application

Once deployed, you'll have a single URL (e.g., `https://timetable-app.onrender.com`) that serves:
- **Frontend**: Root path and all UI routes
- **Backend API**: `/api/*` endpoints
- **Health Check**: `/api/health`

## Important Notes

### Free Tier Limitations:
- **Backend services spin down after 15 minutes of inactivity**
- First request after inactivity may take 30-60 seconds (cold start)
- 750 hours/month of runtime (sufficient for one service)

### Troubleshooting:

1. **Build fails**: Check the build logs in Render dashboard
2. **Backend not connecting to MongoDB**: Verify MONGO_URI is correct and IP whitelist includes `0.0.0.0/0`
3. **404 errors on refresh**: The backend is configured to serve `index.html` for all non-API routes (React Router support)
4. **API not working**: Verify all API routes start with `/api/` prefix

### Monitoring:

- Check logs in Render dashboard under each service
- Use the `/api/health` endpoint to verify backend is running
- Monitor MongoDB Atlas for database connections

## Updating Your Deployment

Render automatically redeploys when you push to your GitHub repository:

```bash
git add .
git commit -m "Your changes"
git push origin main
```

## Cost Optimization

- **Single web service** combines frontend + backend (uses 1 free tier slot)
- Use MongoDB Atlas free tier (M0)
- Total cost: **$0/month**
- More efficient than deploying separately

## Support

If you encounter issues:
1. Check Render logs for error messages
2. Verify all environment variables are set correctly
3. Ensure MongoDB connection string is valid
4. Check that your GitHub repository is up to date
