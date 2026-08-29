# Meghpiyon Tour & Travels

> Authentic Himalayan journeys — Sikkim, Darjeeling & the Silk Route  
> Built with React + Vite | Ready for Vercel deployment

---

## ?? Deploy to Vercel (One-Click)

### Option A — Vercel Dashboard (Recommended)
1. Push this project to a GitHub repository
2. Go to [vercel.com](https://vercel.com) ? **New Project**
3. Import your GitHub repository
4. Vercel auto-detects **Vite** — no configuration needed
5. Click **Deploy** — done!

### Option B — Vercel CLI
```bash
npm install -g vercel
vercel login
vercel --prod
```

---

## ?? Local Development

```bash
npm install
npm run dev          # Start dev server ? http://localhost:5173
npm run build        # Production build ? dist/
npm run preview      # Preview production build locally
```

---

## ?? Admin Panel
- Navigate to the site and scroll to the footer ? click **Admin Access**
- Default password: `123456`
- Change password from the **Security** tab inside the panel

## ?? Project Structure
```
public/              # Static assets (images, logo)
src/
  components/        # Navbar, ScrollManager
  pages/             # Home, AboutUs, BookTour, ContactUs, AdminPanel
  App.jsx            # Root state, routing, footer
  index.css          # Global design tokens & styles
index.html           # SEO meta tags, Open Graph
vercel.json          # Vercel SPA routing + cache headers
vite.config.js       # Optimised build with chunk splitting
```
