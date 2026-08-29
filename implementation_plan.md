# Implementation Plan: Red Kite Tourism Website

Create a premium, editorial-style React website for **Red Kite Tourism**, featuring a Home page, Book Tour page, About Us page, and Contact Us page. The website will incorporate **Minimalism, Organic Modernism, and Editorial Design** aesthetics with smooth scrolling powered by **Lenis** and full viewport/scroll animations powered by **Framer Motion**.

---

## User Review Required

> [!IMPORTANT]
> **Design Language & Assets**:
> We will adopt a warm, earthy color palette:
> - Primary Background: `#FAF8F5` (Warm Alabaster)
> - Primary Text: `#1E1E1C` (Charcoal)
> - Primary Accent: `#B85C42` (Terracotta Red)
> - Secondary Accent: `#E2DDD5` (Raw Sand)
> We will load **Playfair Display** (for elegant editorial headings) and **Inter** (for clean body text) from Google Fonts. Let us know if you have other typeface preferences.

---

## Open Questions

1. **Tour Packages**: Do you have specific destinations or themes in mind for the "Book Tour" page (e.g., wild bird watching, alpine trekking, coastal escapes), or should we curate 3–4 standard organic tours?
2. **Animation Feel**: Would you prefer full page-by-page snap scrolling (CSS scroll snapping) or fluid scrolling with elements fading/scaling in as they enter the screen? (We recommend fluid scrolling with Lenis + Framer Motion scroll reveals for a premium editorial feel).

---

## Proposed Changes

We will build the application using Vite + React. 

### Core Dependencies
- `lenis`: Modern smooth scroll library.
- `@lenis/react`: Lenis wrapper for React.
- `framer-motion`: High-fidelity animation library.
- `lucide-react`: Modern icons.

---

### Components & Styling

#### [NEW] [index.css](file:///c:/Users/jitsi/OneDrive/Desktop/rk2/src/index.css)
Establish the design system:
- CSS variables for colors (alabaster, charcoal, terracotta, raw sand).
- Custom font imports (Playfair Display, Inter).
- Global reset and Lenis smooth scrolling rules.
- Editorial layout utilities.

#### [NEW] [ScrollManager.jsx](file:///c:/Users/jitsi/OneDrive/Desktop/rk2/src/components/ScrollManager.jsx)
Integrate `@lenis/react` at the root level to handle smooth scrolling across all pages.

#### [NEW] [Navbar.jsx](file:///c:/Users/jitsi/OneDrive/Desktop/rk2/src/components/Navbar.jsx)
Sleek, minimal navigation header that hides/reveals on scroll, featuring an organic layout and page controls.

#### [NEW] [Home.jsx](file:///c:/Users/jitsi/OneDrive/Desktop/rk2/src/pages/Home.jsx)
- **Hero Section**: Huge bold serif text, immersive nature backgrounds, parallax scroll effects, scroll indicator.
- **Ethos Section**: Multi-column magazine layout, soft organic transitions, showing how Red Kite represents eco-conscious boutique tourism.
- **Curated Journeys Section**: Selected signature tour previews with elegant card hover reveals and horizontal entries.

#### [NEW] [BookTour.jsx](file:///c:/Users/jitsi/OneDrive/Desktop/rk2/src/pages/BookTour.jsx)
- Interactive grid of premium tours (e.g., *Shetland Highlands flight*, *Tuscan Hills walk*, *Patagonian Peaks*).
- Filtering system based on landscape types.
- A minimalist booking form that slides in organically, capturing dates, travelers, and personal details in a high-end interface.

#### [NEW] [AboutUs.jsx](file:///c:/Users/jitsi/OneDrive/Desktop/rk2/src/pages/AboutUs.jsx)
- "Our Story" formatted as an editorial column.
- Storytellers/guides gallery with warm organic hover scaling.
- Conservation ethos block (highlighting the preservation of the Red Kite bird and natural habitats).

#### [NEW] [ContactUs.jsx](file:///c:/Users/jitsi/OneDrive/Desktop/rk2/src/pages/ContactUs.jsx)
- Minimalist input form with floating labels and custom underline borders.
- Contact layout containing location coordinates, email, and social handles in an editorial column grid.
- Visual maps styled with organic coordinates.

#### [NEW] [App.jsx](file:///c:/Users/jitsi/OneDrive/Desktop/rk2/src/App.jsx)
Integrate all pages with smooth transitions. Since the site is a single-page flow with sub-sections (or tabbed/routed views), we will build it as a seamless, high-fidelity Single Page App with a header switching active views or scrolling to sections. A unified page state with smooth fades is standard for editorial websites.

---

## Verification Plan

### Automated Verification
- Verify code compiles without errors: `npm run build`
- Start local development server: `npm run dev` and perform browser-based testing.

### Manual Verification
- Verify smooth scrolling (Lenis) on desktop and mobile viewports.
- Confirm Framer Motion scroll animations trigger accurately as elements cross the viewport threshold.
- Check form submissions (validation, simulated success state).
- Check responsive styles from mobile to wide desktop resolutions.
