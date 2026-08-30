# Implementation Plan - Custom Sliding-Arrow Button for Explore Packages

Implement a premium sliding-arrow hover effect on the "Explore Packages" button in the Hero section of the homepage, adapted from Uiverse.io to match the project's design language.

## User Review Required

> [!NOTE]
> The design uses `var(--accent-terracotta)` as the button background and transitions to `var(--text-charcoal)` on hover, with a white circular icon wrapper.
> We've added transition rules for the non-hover state to make sure the sliding arrows animate smoothly during both hover-in and hover-out.

## Proposed Changes

### Stylesheets

#### [MODIFY] [`src/index.css`](file:///c:/Users/jitsi/OneDrive/Desktop/RED%20KITE%20TOURISM/src/index.css)
Replace the previous bubble button styles with the custom sliding-arrow button styling, fully integrated with the site's typography and color variables.

```css
/* Custom Sliding-Arrow Explore Packages Button */
.explore-packages-btn {
  all: unset;
  cursor: pointer;
  line-height: 1;
  text-decoration: none;
  display: inline-flex;
  border: none;
  align-items: center;
  gap: 0.75rem;
  background-color: var(--accent-terracotta);
  color: #fff;
  border-radius: 10rem;
  font-family: var(--font-sans);
  font-size: 0.95rem;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  padding-left: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 10px 25px rgba(184, 92, 66, 0.2);
  z-index: 1;
}

.explore-packages-btn__icon-wrapper {
  flex-shrink: 0;
  width: 25px;
  height: 25px;
  position: relative;
  color: var(--accent-terracotta);
  background-color: #fff;
  border-radius: 50%;
  display: grid;
  place-items: center;
  overflow: hidden;
  transition: color 0.3s ease;
}

.explore-packages-btn:hover {
  background-color: var(--text-charcoal);
  box-shadow: 0 10px 25px rgba(30, 30, 28, 0.25);
  transform: translateY(-2px);
}

.explore-packages-btn:hover .explore-packages-btn__icon-wrapper {
  color: var(--text-charcoal);
}

.explore-packages-btn__icon-svg {
  transition: transform 0.3s ease-in-out;
}

.explore-packages-btn__icon-svg--copy {
  position: absolute;
  transform: translate(-150%, 150%);
  transition: transform 0.3s ease-in-out;
}

/* Hover transitions for the flying arrows */
.explore-packages-btn:hover .explore-packages-btn__icon-svg:first-child {
  transform: translate(150%, -150%);
}

.explore-packages-btn:hover .explore-packages-btn__icon-svg--copy {
  transition: transform 0.3s ease-in-out 0.1s;
  transform: translate(0);
}

/* Mobile responsive style */
@media (max-width: 768px) {
  .explore-packages-btn {
    width: 100% !important;
    justify-content: center !important;
    box-sizing: border-box;
  }
}
```

### Components

#### [MODIFY] [`src/pages/Home.jsx`](file:///c:/Users/jitsi/OneDrive/Desktop/RED%20KITE%20TOURISM/src/pages/Home.jsx)
Replace the previous button structure with the sliding-arrow markup:

```jsx
<button 
  onClick={() => handleBookTourClick('All')}
  className="explore-packages-btn hero-cta-primary"
>
  Explore Packages
  <span className="explore-packages-btn__icon-wrapper">
    <ArrowRight className="explore-packages-btn__icon-svg" size={15} />
    <ArrowRight className="explore-packages-btn__icon-svg explore-packages-btn__icon-svg--copy" size={15} />
  </span>
</button>
```

## Verification Plan

### Manual Verification
- Verify that Vite compiles successfully with the updated components and stylesheet.
- Hover over the button and verify:
  1. Background transitions from terracotta to charcoal.
  2. The icon color transitions to charcoal.
  3. The first arrow flies out top-right, and a second arrow flies in from bottom-left to replace it.
  4. Moving mouse away restores the button to its original state smoothly.
