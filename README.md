<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/277c8c8d-08ad-4a3e-b9e0-5aade8c061eb

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to Vercel

This is a static Vite + React app. To deploy on [Vercel](https://vercel.com):

1. Import the repository in Vercel (New Project → Import Git Repository).
2. Vercel will auto-detect Vite, but the build settings are also defined in [`vercel.json`](./vercel.json):
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
3. SPA routing (all routes serve `index.html`) and security/cache headers are already configured in `vercel.json`.
4. If you use the Gemini API, add `GEMINI_API_KEY` as an Environment Variable in the Vercel project settings.
