# Stilllight Gallery

A responsive photography portfolio built with React, Vite, and modern CSS.

## Run locally

```bash
npm install
npm run dev
```

Vite prints the local URL after the server starts (normally `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

The static production site is generated in `dist/`.

## Deploy

Deploy the project to a static hosting provider such as Vercel or Netlify. Set the build command to `npm run build` and the publish/output directory to `dist`. No server-side runtime or environment variables are required.

Photography is loaded from Unsplash, and the selected theme is saved in the browser's local storage.
