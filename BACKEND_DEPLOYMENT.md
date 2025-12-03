# Backend Deployment Guide

## Quick Setup

Your frontend is now configured to work with a separate backend API. Follow these steps:

### 1. Deploy Your Backend

**Option A: Deploy to Render (Recommended - Free)**

1. Go to [render.com](https://render.com) and sign up
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `portfolio-backend`
   - **Root Directory**: Leave empty (uses root)
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Environment**: Node
5. Add environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: A random secret string
   - `PORT`: 3000 (or any port)
   - `NODE_ENV`: production
6. Click "Create Web Service"
7. Copy your deployed URL (e.g., `https://portfolio-backend-xxxx.onrender.com`)

**Option B: Deploy to Railway**

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Add environment variables (same as above)
6. Deploy and copy the URL

### 2. Update Frontend Configuration

Edit `client/.env.production`:

```env
VITE_API_URL=https://your-backend-url.onrender.com
```

Replace `https://your-backend-url.onrender.com` with your actual backend URL from step 1.

### 3. Update Backend for CORS

Make sure your backend allows requests from your GitHub Pages URL. Check `server/express.js` or wherever CORS is configured:

```javascript
import cors from "cors";

const corsOptions = {
  origin: ["http://localhost:5173", "https://fostersql.github.io"],
  credentials: true,
};

app.use(cors(corsOptions));
```

### 4. Redeploy

```powershell
# Commit changes
git add .
git commit -m "Configure API for production deployment"
git push origin master
```

## Environment Variables

### Local Development (`.env.development`)

```
VITE_API_URL=http://localhost:3000
```

### Production (`.env.production`)

```
VITE_API_URL=https://your-backend-url.com
```

## Backend Environment Variables

Set these in your hosting service:

- `MONGODB_URI`: Your MongoDB Atlas connection string
- `JWT_SECRET`: Random secret for JWT tokens
- `PORT`: 3000 (or provider default)
- `NODE_ENV`: production

## Testing

### Test Locally

```powershell
cd client
npm run dev
```

### Test Production Build

```powershell
cd client
npm run build
npm run preview
```

## Troubleshooting

**API calls failing:**

- Check browser console for CORS errors
- Verify `VITE_API_URL` in `.env.production`
- Ensure backend CORS allows GitHub Pages origin
- Check backend is running (visit backend URL in browser)

**Environment variables not working:**

- Rebuild the frontend after changing `.env` files
- Variables must start with `VITE_` to be accessible
- Clear browser cache

**MongoDB connection issues:**

- Verify MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
- Check connection string includes username/password
- Ensure database user has read/write permissions

## Alternative: Keep Backend Local

If you don't want to deploy the backend yet, you can:

1. Run backend locally: `npm run dev` (in root directory)
2. Use a tunnel service like [ngrok](https://ngrok.com):
   ```powershell
   ngrok http 3000
   ```
3. Update `.env.production` with the ngrok URL

**Note**: ngrok URLs change each time, so this is only for testing.
