# GitHub Pages Deployment Guide

## Automatic Deployment (Recommended)

Your portfolio is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Setup Steps:

1. **Enable GitHub Pages in your repository:**

   - Go to your repository on GitHub
   - Click on **Settings** > **Pages**
   - Under "Source", select **GitHub Actions**

2. **Push your code:**

   ```bash
   git add .
   git commit -m "Add GitHub Pages deployment"
   git push origin master
   ```

3. **Deployment will start automatically:**
   - GitHub Actions will build and deploy your site
   - Check the **Actions** tab to monitor the deployment
   - Your site will be live at: `https://fostersql.github.io/portfolio/`

## Manual Deployment

If you prefer to deploy manually:

```bash
cd client
npm run deploy
```

This will:

1. Build the production version
2. Push the build to the `gh-pages` branch
3. GitHub will automatically serve it

## Configuration

The following files are configured for GitHub Pages:

- **client/package.json**: Contains `homepage` URL and deployment scripts
- **client/vite.config.js**: Has `base: "/portfolio/"` for correct asset paths
- **.github/workflows/deploy.yml**: GitHub Actions workflow for automatic deployment

## Troubleshooting

**404 Errors on Routes:**

- GitHub Pages doesn't support client-side routing by default
- Add a `404.html` that redirects to `index.html` for single-page apps

**Assets Not Loading:**

- Verify `base: "/portfolio/"` in `vite.config.js`
- Check that `homepage` in `package.json` matches your repository name

## Backend API Note

⚠️ **Important**: The backend server APIs won't work on GitHub Pages since it only serves static files.

For full functionality with backend:

- Consider deploying the backend separately (Heroku, Railway, Render, etc.)
- Update API URLs in your client code to point to the deployed backend
- Or deploy the full stack application to a service that supports Node.js servers

## View Your Site

Once deployed, your portfolio will be available at:
**https://fostersql.github.io/portfolio/**
