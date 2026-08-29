import React, { useState } from 'react';
import ScrollManager from './components/ScrollManager';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import BookTour from './pages/BookTour';
import ContactUs from './pages/ContactUs';
import { ArrowUp, Mail, Compass } from 'lucide-react';
import { useLenis } from '@studio-freight/react-lenis';

const Instagram = ({ size = 24, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const Twitter = ({ size = 24, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

function AppContent() {
  const [selectedTour, setSelectedTour] = useState(null);
  const lenis = useLenis();

  const handleSelectTour = (tourName) => {
    setSelectedTour(tourName);
  };

  const handleClearTourSelection = () => {
    setSelectedTour(null);
  };

  const handleScrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Global Header Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main style={{ width: '100%' }}>
        {/* Home Section */}
        <Home onSelectTour={handleSelectTour} />

        {/* About Us Section */}
        <AboutUs />

        {/* Book Tour Section */}
        <BookTour 
          selectedTour={selectedTour} 
          onClearTourSelection={handleClearTourSelection} 
        />

        {/* Contact Us Section */}
        <ContactUs />
      </main>

      {/* Premium Editorial Footer */}
      <footer style={{
        backgroundColor: 'var(--bg-dark-charcoal)',
        color: 'var(--bg-sand)',
        padding: '5rem 3rem 2rem',
        borderTop: '1px solid var(--border-dark)',
        fontFamily: 'var(--font-sans)',
        textAlign: 'left'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          {/* Main Footer Row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '3rem',
            marginBottom: '4rem'
          }} className="grid-footer-mobile">
            {/* Brand block */}
            <div style={{ gridColumn: 'span 5' }} className="col-12-mobile">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <img 
                  src="/logo.png" 
                  alt="Red Kite Logo" 
                  style={{ height: '32px', width: 'auto', filter: 'invert(1) brightness(1.2)' }} 
                />
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 500, letterSpacing: '0.05em' }}>
                  RED KITE
                </span>
              </div>
              <p style={{ color: '#8c877f', fontSize: '0.95rem', lineHeight: 1.6, maxWidth: '350px' }}>
                A boutique travel design studio crafting unhurried Journeys for the conscious traveler. We trace flight paths, land softly, and give back to local raptor conservation.
              </p>
            </div>

            {/* Links block 1 */}
            <div style={{ gridColumn: 'span 3' }} className="col-12-mobile">
              <h5 className="label-mono" style={{ color: '#fff', fontSize: '0.75rem', marginBottom: '1.5rem' }}>Explore</h5>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
                <li>
                  <a href="#home" onClick={(e) => { e.preventDefault(); lenis?.scrollTo('#home'); }} style={{ color: '#8c877f', transition: 'color 0.3s' }} className="footer-link">Home</a>
                </li>
                <li>
                  <a href="#about" onClick={(e) => { e.preventDefault(); lenis?.scrollTo('#about'); }} style={{ color: '#8c877f', transition: 'color 0.3s' }} className="footer-link">About Us</a>
                </li>
                <li>
                  <a href="#tours" onClick={(e) => { e.preventDefault(); lenis?.scrollTo('#tours'); }} style={{ color: '#8c877f', transition: 'color 0.3s' }} className="footer-link">Book Tour</a>
                </li>
                <li>
                  <a href="#contact" onClick={(e) => { e.preventDefault(); lenis?.scrollTo('#contact'); }} style={{ color: '#8c877f', transition: 'color 0.3s' }} className="footer-link">Contact Us</a>
                </li>
              </ul>
            </div>

            {/* Conservation Network Block */}
            <div style={{ gridColumn: 'span 4' }} className="col-12-mobile">
              <h5 className="label-mono" style={{ color: '#fff', fontSize: '0.75rem', marginBottom: '1.5rem' }}>Conservation Partners</h5>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem', color: '#8c877f' }}>
                <li>Royal Society for the Protection of Birds (RSPB)</li>
                <li>Scottish Natural Heritage Alliance</li>
                <li>Fundación Patagonia Conservación</li>
                <li>Tuscan Soil and Birdlife Trust</li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: '1px', backgroundColor: 'var(--border-dark)', marginBottom: '2rem' }} />

          {/* Sub-Footer Row */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.85rem',
            color: '#8c877f',
            flexWrap: 'wrap',
            gap: '1.5rem'
          }}>
            <div>
              &copy; {new Date().getFullYear()} Red Kite Tourism. All rights reserved. Wander Wisely.
            </div>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <a href="#" style={{ color: '#8c877f', transition: 'color 0.3s' }} className="footer-link"><Instagram size={18} /></a>
              <a href="#" style={{ color: '#8c877f', transition: 'color 0.3s' }} className="footer-link"><Twitter size={18} /></a>
              <a href="#" style={{ color: '#8c877f', transition: 'color 0.3s' }} className="footer-link"><Mail size={18} /></a>
              
              {/* Back to top button */}
              <button
                onClick={handleScrollToTop}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'var(--border-dark)',
                  color: 'var(--bg-sand)',
                  border: 'none',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50px',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                className="back-to-top-btn"
              >
                <ArrowUp size={16} />
              </button>
            </div>
          </div>
        </div>

        <style>{`
          .footer-link:hover {
            color: var(--accent-terracotta) !important;
          }
          .back-to-top-btn:hover {
            background-color: var(--accent-terracotta) !important;
            color: #fff !important;
          }
          @media (max-width: 768px) {
            .grid-footer-mobile {
              grid-template-columns: 1fr !important;
              gap: 2rem !important;
            }
          }
        `}</style>
      </footer>
    </>
  );
}

function App() {
  return (
    <ScrollManager>
      <AppContent />
    </ScrollManager>
  );
}

export default App;
