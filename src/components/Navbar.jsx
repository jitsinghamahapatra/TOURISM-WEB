import React, { useState, useEffect } from 'react';
import { useLenis } from 'lenis/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar({ currentPage, setCurrentPage }) {
  const lenis = useLenis();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'tours', label: 'Book Tour' },
    { id: 'contact', label: 'Contact Us' }
  ];

  // Track scroll position to change background transparency
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = lenis ? lenis.scroll : window.scrollY;
      setIsScrolled(scrollY > 50);
    };

    if (lenis) {
      lenis.on('scroll', handleScroll);
    } else {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (lenis) {
        lenis.off('scroll', handleScroll);
      } else {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [lenis]);

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    setCurrentPage(id);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: 'padding 0.4s ease',
          padding: isScrolled ? '0.75rem 2rem' : '1.25rem 3rem',
        }}
        className={`${isScrolled ? 'glass-panel' : ''} nav-header`}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '1400px',
          margin: '0 auto',
          width: '100%',
        }}>
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('home')} 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.75rem', 
              cursor: 'pointer',
              userSelect: 'none'
            }}
          >
            <img 
              src="/logo.png" 
              alt="Red Kite Logo" 
              style={{ 
                height: '38px', 
                width: 'auto',
                objectFit: 'contain'
              }} 
            />
            <span style={{ 
              fontFamily: 'var(--font-serif)', 
              fontSize: '1.25rem', 
              fontWeight: '600',
              letterSpacing: '0.05em',
              color: 'var(--text-charcoal)'
            }}>
              MEGHPIYON
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2.5rem',
          }} className="desktop-only">
            {navItems.map((item) => (
              <div 
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{ 
                  position: 'relative', 
                  cursor: 'pointer',
                  padding: '0.5rem 0',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  color: currentPage === item.id ? 'var(--text-charcoal)' : 'var(--text-muted)',
                  transition: 'color 0.3s ease'
                }}
              >
                {item.label}
                {currentPage === item.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '1px',
                      backgroundColor: 'var(--accent-terracotta)',
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </div>
            ))}
          </nav>

          {/* Right CTA */}
          <div className="desktop-only">
            <button 
              onClick={() => handleNavClick('tours')}
              className="button-primary"
              style={{
                padding: '0.7rem 1.5rem',
                fontSize: '0.85rem'
              }}
            >
              Book Journeys <ArrowUpRight size={14} />
            </button>
          </div>

          {/* Mobile Menu Icon */}
          <div 
            className="mobile-only" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ 
              cursor: 'pointer', 
              color: 'var(--text-charcoal)',
              padding: '0.5rem'
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: '60px',
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'var(--bg-alabaster)',
              zIndex: 49,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '2.5rem',
              padding: '2rem'
            }}
          >
            {navItems.map((item) => (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '2rem',
                  color: currentPage === item.id ? 'var(--accent-terracotta)' : 'var(--text-charcoal)',
                  cursor: 'pointer'
                }}
              >
                {item.label}
              </motion.div>
            ))}
            <button 
              onClick={() => handleNavClick('tours')}
              className="button-primary"
              style={{ marginTop: '2rem' }}
            >
              Book Journeys <ArrowUpRight size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Responsive Utilities CSS in React */}
      <style>{`
        .mobile-only {
          display: none;
        }
        @media (max-width: 768px) {
          .desktop-only {
            display: none !important;
          }
          .mobile-only {
            display: block;
          }
          .nav-header {
            padding: 0.75rem 1rem !important;
          }
        }
      `}</style>
    </>
  );
}
