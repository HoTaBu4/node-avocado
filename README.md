# Avocado Node Demo

Small Node.js project that manually renders HTML templates for a fictional avocado store. It uses Express to serve HTML templates from `templates/` and fills them with product data from `dev-data/data.json`.

## Prerequisites
- Node.js 18+

## Local development
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the dev server (with live reload):
   ```bash
   npm run dev
   ```
   or run once:
   ```bash
   npm start
   ```
3. Visit `http://localhost:8000/overview` for the product grid, `http://localhost:8000/product?id=0` for a single product, or `http://localhost:8000/api` to inspect the raw data.

## Deployment options
- GitHub Pages only serves static files and cannot run this Node.js server as-is.
- To deploy to GitHub Pages you would need to pre-render the HTML and publish the static output, or reimplement the logic in client-side JavaScript.
- For a hosted Node.js server, consider services like Render, Railway, Fly.io, or Vercel (Serverless Functions) instead.

## Deploying to Vercel
1. Push the repository to GitHub (or another Git provider that Vercel supports).
2. Connect the repository in the Vercel dashboard and import the project.
3. Vercel reads `vercel.json`, builds `api/index.js` with `@vercel/node`, and routes every request to the serverless handler.
4. After the deployment completes, your app will be available at `https://<project-name>.vercel.app/overview`.
5. For local parity you can use `vercel dev` or rely on `npm run dev`.
