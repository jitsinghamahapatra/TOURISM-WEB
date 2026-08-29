import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollManager from './components/ScrollManager';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import BookTour from './pages/BookTour';
import ContactUs from './pages/ContactUs';
import AdminPanel from './pages/AdminPanel';
import { ArrowUp, Mail, Compass } from 'lucide-react';
import { useLenis } from 'lenis/react';

const Instagram = ({ size = 24, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const WhatsApp = ({ size = 24, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

const Facebook = ({ size = 24, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);



const defaultTours = [
  {
    title: 'North Sikkim Valley Expedition',
    tagline: 'Glaciers, Hot Springs & Sacred Lakes',
    image: '/tour_highlands.jpg',
    duration: '6 Days',
    description: 'A journey through the high altitude fields of Lachung and Lachen, tracing the pristine path to Gurudongmar Lake. Features authentic village homestays with warm hospitality, traditional food, and stunning views.',
    bestTime: 'April - June & Oct - Dec',
    difficulty: 'Challenging Trek',
    landscape: 'Glaciers & High Valleys'
  },
  {
    title: 'Silk Route Heritage Path',
    tagline: 'Historical Hairpins & High Passes',
    image: '/tour_patagonia.jpg',
    duration: '5 Days',
    description: 'Follow the ancient trader tracks of the Silk Route through Zuluk and Nathang Valley. Stay in cozy homesteads with a beautiful Bengali touch, enjoying delicious, homely food prepared by local hosts.',
    bestTime: 'May - July & Oct - Nov',
    difficulty: 'Moderate Drive & Walk',
    landscape: 'High Passes & Hairpin Ridges'
  },
  {
    title: 'Darjeeling Tea Garden Ridge',
    tagline: 'Morning Kanchenjunga & Cypress Trails',
    image: '/tour_tuscany.jpg',
    duration: '4 Days',
    description: 'A relaxing retreat through the heritage tea estates of Darjeeling and pine trails of Kalimpong. Perfect for couples or families seeking peaceful views, local heritage walks, and comforting local cuisine.',
    bestTime: 'March - May & Oct - Dec',
    difficulty: 'Easy Walk',
    landscape: 'Pine Ridges & Tea Gardens'
  }
];

const defaultAboutContent = {
  tagline: 'Who We Are',
  storyHeading: 'Slow travel designed with local character.',
  storyParagraph1: 'Meghpiyon Tour and Travels (also known as Red Kite Tourism) builds unhurried journeys connecting conscious travelers with authentic terrains. Based out of Sarisha, Diamond Harbour, we specialize in high-quality travel arrangements in Sikkim and the North Bengal Himalayas.',
  storyParagraph2: 'We believe that travel should not be a checklist. Our packages skip mainstream tourism rushes. Instead, we coordinate complete itineraries from station pick-up to airport drop-off, providing cozy homestays, fresh homestyle local foods, and experienced mountain drivers.',
  missionTitle: 'Himalayan Conservation & Stewardship',
  missionDesc: 'We dedicate a portion of every booking receipt to regional ecosystem preservation and local community support, ensuring your footprint empowers local mountain homestead networks.'
};

const defaultContactContent = {
  ownerName: 'Mr. Amit Roy',
  phone: '081675 20539',
  email: 'meghpiyontourtravels@gmail.com',
  hours: 'Open 24 hours',
  address: 'Madon Gopal Tola, Sarisha, Diamond Harbour, West Bengal 743368',
  mapEmbedLink: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3693.896792610738!2d88.20231131495333!3d22.215200000000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02fa4af5555555%3A0xe54d24177d6ba56e!2sSarisha%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1625000000000!5m2!1sen!2sin',
  instagram: '#',
  facebook: '#',
  whatsapp: 'https://wa.me/918167520539',
  mailLink: 'mailto:meghpiyontourtravels@gmail.com'
};

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedTour, setSelectedTour] = useState(null);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const lenis = useLenis();

  // Centralized State
  const [tours, setTours] = useState(() => {
    const saved = localStorage.getItem('meghpiyon_tours');
    return saved ? JSON.parse(saved) : defaultTours;
  });

  const [aboutContent, setAboutContent] = useState(() => {
    const saved = localStorage.getItem('meghpiyon_about');
    return saved ? JSON.parse(saved) : defaultAboutContent;
  });

  const [contactContent, setContactContent] = useState(() => {
    const saved = localStorage.getItem('meghpiyon_contact');
    return saved ? JSON.parse(saved) : defaultContactContent;
  });

  const [bookingRequests, setBookingRequests] = useState(() => {
    const saved = localStorage.getItem('meghpiyon_bookings');
    return saved ? JSON.parse(saved) : [];
  });

  const [contactMessages, setContactMessages] = useState(() => {
    const saved = localStorage.getItem('meghpiyon_messages');
    return saved ? JSON.parse(saved) : [];
  });

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('meghpiyon_tours', JSON.stringify(tours));
  }, [tours]);

  useEffect(() => {
    localStorage.setItem('meghpiyon_about', JSON.stringify(aboutContent));
  }, [aboutContent]);

  useEffect(() => {
    localStorage.setItem('meghpiyon_contact', JSON.stringify(contactContent));
  }, [contactContent]);

  useEffect(() => {
    localStorage.setItem('meghpiyon_bookings', JSON.stringify(bookingRequests));
  }, [bookingRequests]);

  useEffect(() => {
    localStorage.setItem('meghpiyon_messages', JSON.stringify(contactMessages));
  }, [contactMessages]);

  // Initial site load loader
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 750);
    return () => clearTimeout(timer);
  }, []);

  // Smooth page navigation with custom loader
  const navigateToPage = (newPage) => {
    if (newPage === currentPage && !selectedTour) return;
    setIsPageLoading(true);
    setTimeout(() => {
      setCurrentPage(newPage);
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo({ top: 0 });
      }
      setIsPageLoading(false);
    }, 450);
  };

  const handleSelectTour = (tourName) => {
    setSelectedTour(tourName);
    navigateToPage('tours');
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

  // Add Handlers called by user forms
  const handleAddBookingRequest = (req) => {
    const newReq = {
      id: 'book_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      status: 'pending',
      ...req
    };
    setBookingRequests(prev => [newReq, ...prev]);
  };

  const handleAddContactMessage = (msg) => {
    const newMsg = {
      id: 'msg_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      ...msg
    };
    setContactMessages(prev => [newMsg, ...prev]);
  };

  return (
    <>
      {/* Global Page Loader Overlay */}
      <AnimatePresence>
        {isPageLoading && (
          <motion.div
            key="page-loader-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="page-loader-screen"
          >
            <div className="loader"></div>
            <div style={{ textAlign: 'center', marginTop: '0.75rem' }}>
              <p className="loader-brand-title">MEGHPIYON</p>
              <p className="loader-tagline">Slow, Conscious & Restorative Journeys</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Header Navigation */}
      <Navbar 
        currentPage={currentPage} 
        setCurrentPage={(page) => {
          if (page === 'tours') setSelectedTour(null);
          navigateToPage(page);
        }} 
      />

      {/* Main Content Sections */}
      <main style={{ width: '100%', minHeight: '80vh' }}>
        {currentPage === 'home' && (
          <Home 
            tours={tours} 
            aboutContent={aboutContent}
            onSelectTour={handleSelectTour} 
            onNavigate={navigateToPage} 
          />
        )}
        {currentPage === 'about' && (
          <AboutUs 
            aboutContent={aboutContent} 
          />
        )}
        {currentPage === 'tours' && (
          <BookTour 
            tours={tours}
            selectedTour={selectedTour} 
            onClearTourSelection={handleClearTourSelection} 
            onAddBookingRequest={handleAddBookingRequest}
          />
        )}
        {currentPage === 'contact' && (
          <ContactUs 
            contactContent={contactContent}
            onAddContactMessage={handleAddContactMessage}
          />
        )}
        {currentPage === 'admin' && (
          <AdminPanel
            tours={tours}
            onUpdateTours={setTours}
            aboutContent={aboutContent}
            onUpdateAboutContent={setAboutContent}
            contactContent={contactContent}
            onUpdateContactContent={setContactContent}
            bookingRequests={bookingRequests}
            onUpdateBookingRequests={setBookingRequests}
            contactMessages={contactMessages}
            onUpdateContactMessages={setContactMessages}
          />
        )}
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
                  alt="Meghpiyon Logo" 
                  style={{ height: '32px', width: 'auto', filter: 'invert(1) brightness(1.2)' }} 
                />
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 600, letterSpacing: '0.05em' }}>
                  MEGHPIYON
                </span>
              </div>
              <p style={{ color: '#8c877f', fontSize: '0.95rem', lineHeight: 1.6, maxWidth: '350px', marginBottom: '1.5rem' }}>
                A premium travel design studio crafting unhurried journeys in Sikkim and the North Bengal Himalayas.
              </p>
              <div style={{ fontSize: '0.85rem', color: '#8c877f', lineHeight: 1.5 }}>
                <p>{contactContent.address.split(',')[0]}, {contactContent.address.split(',')[1] || ''},</p>
                <p>{contactContent.address.split(',').slice(2).join(',') || ''}</p>
                <p style={{ marginTop: '0.5rem', fontWeight: 650, color: 'var(--bg-sand)' }}>Tel: {contactContent.phone}</p>
              </div>
            </div>

            {/* Links block 1 */}
            <div style={{ gridColumn: 'span 3' }} className="col-12-mobile">
              <h5 className="label-mono" style={{ color: '#fff', fontSize: '0.75rem', marginBottom: '1.5rem' }}>Explore</h5>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); navigateToPage('home'); }} style={{ color: '#8c877f', transition: 'color 0.3s' }} className="footer-link">Home</a>
                </li>
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); navigateToPage('about'); }} style={{ color: '#8c877f', transition: 'color 0.3s' }} className="footer-link">About Us</a>
                </li>
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); navigateToPage('tours'); }} style={{ color: '#8c877f', transition: 'color 0.3s' }} className="footer-link">Book Tour</a>
                </li>
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); navigateToPage('contact'); }} style={{ color: '#8c877f', transition: 'color 0.3s' }} className="footer-link">Contact Us</a>
                </li>
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); navigateToPage('admin'); }} style={{ color: '#8c877f', transition: 'color 0.3s', fontWeight: 600 }} className="footer-link">Admin Access</a>
                </li>
              </ul>
            </div>

            {/* Services block */}
            <div style={{ gridColumn: 'span 4' }} className="col-12-mobile">
              <h5 className="label-mono" style={{ color: '#fff', fontSize: '0.75rem', marginBottom: '1.5rem' }}>Our Services</h5>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem', color: '#8c877f' }}>
                <li>Cozy Homestays with Bengali Touches</li>
                <li>Delicious Homestyle Meals</li>
                <li>Humble, Patient & Supportive Hosts</li>
                <li>Airport / Railway Station Pickups</li>
                <li>Experienced Local Mountain Drivers</li>
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
              &copy; {new Date().getFullYear()} Meghpiyon Tour and Travels. All rights reserved. Wander Wisely.
            </div>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <a href={contactContent.whatsapp || 'https://wa.me/918167520539'} target="_blank" rel="noreferrer" title="WhatsApp" style={{ color: '#8c877f', transition: 'color 0.3s' }} className="footer-link"><WhatsApp size={18} /></a>
              <a href={contactContent.facebook || '#'} target="_blank" rel="noreferrer" title="Facebook" style={{ color: '#8c877f', transition: 'color 0.3s' }} className="footer-link"><Facebook size={18} /></a>
              <a href={contactContent.instagram || '#'} target="_blank" rel="noreferrer" title="Instagram" style={{ color: '#8c877f', transition: 'color 0.3s' }} className="footer-link"><Instagram size={18} /></a>
              <a href={contactContent.mailLink || 'mailto:meghpiyontourtravels@gmail.com'} title="Email Us" style={{ color: '#8c877f', transition: 'color 0.3s' }} className="footer-link"><Mail size={18} /></a>
              
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
