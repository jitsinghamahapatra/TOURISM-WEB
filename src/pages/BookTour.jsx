import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, Phone, Users, CheckCircle, ArrowRight, Clock, Star, MapPin, Feather, ArrowLeft } from 'lucide-react';

export default function BookTour({ selectedTour, onClearTourSelection, tours: toursProp, onAddBookingRequest }) {
  // Merge admin-provided tours (from props) with default local fallback structure
  const defaultTours = [
    {
      id: 'north-sikkim',
      title: 'North Sikkim Valley Expedition',
      tagline: 'Glaciers, Hot Springs & Sacred Lakes',
      priceType: 'request',
      price: '',
      difficulty: 'Challenging Trek',
      badge: 'TREK',
      landscape: 'Glaciers & High Valleys',
      duration: '6 Days',
      bestTime: 'April - June & Oct - Dec',
      images: ['/tour_highlands.jpg', '/hero_landscape.jpg', '/tour_patagonia.jpg'],
      description: 'A journey through the high altitude fields of Lachung and Lachen, tracing the pristine path to Gurudongmar Lake. Features authentic village homestays with warm hospitality, traditional food, and stunning views.',
      spotsRemaining: 3,
      dates: ['Apr 10 - Apr 15, 2027', 'May 05 - May 10, 2027', 'Oct 12 - Oct 17, 2027']
    },
    {
      id: 'east-sikkim',
      title: 'Silk Route Heritage Path',
      tagline: 'Historical Hairpins & High Passes',
      priceType: 'request',
      price: '',
      difficulty: 'Moderate Walk',
      badge: 'WALK',
      landscape: 'Winding Passes & Ridges',
      duration: '5 Days',
      bestTime: 'May - November',
      images: ['/tour_patagonia.jpg', '/hero_landscape.jpg', '/tour_tuscany.jpg'],
      description: 'Follow the ancient trader tracks of the Silk Route through Zuluk and Nathang Valley. Stay in cozy homesteads with a beautiful Bengali touch, enjoying delicious, homely food prepared by local hosts.',
      spotsRemaining: 2,
      dates: ['May 12 - May 17, 2027', 'Jun 20 - Jun 25, 2027', 'Nov 08 - Nov 13, 2027']
    },
    {
      id: 'darjeeling-kalimpong',
      title: 'Darjeeling Tea Garden Ridge',
      tagline: 'Morning Kanchenjunga & Cypress Trails',
      priceType: 'request',
      price: '',
      difficulty: 'Leisurely Walk',
      badge: 'WALK',
      landscape: 'Tea Estates & Mountain Ridges',
      duration: '4 Days',
      bestTime: 'March - May & Oct - Dec',
      images: ['/tour_tuscany.jpg', '/hero_landscape.jpg', '/tour_highlands.jpg'],
      description: 'A relaxing retreat through the heritage tea estates of Darjeeling and pine trails of Kalimpong. Perfect for couples or families seeking peaceful views, local heritage walks, and comforting local cuisine.',
      spotsRemaining: 4,
      dates: ['Mar 18 - Mar 22, 2027', 'May 10 - May 14, 2027', 'Oct 20 - Oct 24, 2027']
    }
  ];

  // Map admin-panel tours (which may lack images/dates) onto full format
  const tours = (toursProp && toursProp.length > 0)
    ? toursProp.map((t, i) => {
        const fallback = defaultTours[i] || defaultTours[i % defaultTours.length] || defaultTours[0];
        // Ensure at least 2 gallery images so dual-thumbnail gallery and carousel controls always show
        let imgs = (Array.isArray(t.images) && t.images.length > 0)
          ? [...t.images]
          : (t.image ? [t.image] : [...fallback.images]);
        
        if (imgs.length === 1) {
          const complementary = fallback.images.find(img => img !== imgs[0]) || '/hero_landscape.jpg';
          imgs.push(complementary);
        }

        return {
          ...fallback,
          ...t,
          id: t.id || `tour-${i}`,
          title: t.title || fallback.title,
          tagline: t.tagline || fallback.tagline,
          priceType: t.priceType || (t.price ? 'fixed' : 'request'),
          price: t.price || '',
          difficulty: t.difficulty || fallback.difficulty,
          badge: (t.difficulty || fallback.difficulty || '').toLowerCase().includes('challenging') ? 'TREK' : 'WALK',
          landscape: t.landscape || fallback.landscape,
          duration: t.duration || fallback.duration,
          bestTime: t.bestTime || fallback.bestTime,
          images: imgs,
          image: t.image || imgs[0] || fallback.image,
          description: t.description || fallback.description,
          spotsRemaining: t.spotsRemaining || fallback.spotsRemaining || 4,
          dates: t.dates || fallback.dates || ['Flexible — contact us to arrange your preferred dates']
        };
      })
    : defaultTours;

  // Routing View State: 'collection' | 'detail'
  const [view, setView] = useState('collection');
  const [activeTourIndex, setActiveTourIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Sync selectedTour from parent component state (e.g. Home clicks)
  useEffect(() => {
    if (selectedTour && selectedTour !== 'All') {
      const idx = tours.findIndex(t => t.title.toLowerCase().includes(selectedTour.toLowerCase()));
      if (idx !== -1) {
        setActiveTourIndex(idx);
        setActiveImageIndex(0);
        setView('detail');
      }
    } else {
      setView('collection');
    }
  }, [selectedTour]);

  const activeTour = tours[activeTourIndex];

  // Booking Form State
  const [formData, setFormData] = useState({
    date: '',
    fullName: '',
    phone: '',
    description: ''
  });
  const [guests, setGuests] = useState(1);

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({});

  // Reset form values when active tour changes
  useEffect(() => {
    if (activeTour) {
      setFormData(prev => ({
        ...prev,
        date: '',
        fullName: '',
        phone: '',
        description: ''
      }));
      setGuests(1);
      setActiveImageIndex(0);
      setFormErrors({});
    }
  }, [activeTourIndex]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const incrementGuests = () => setGuests(prev => prev + 1);
  const decrementGuests = () => setGuests(prev => Math.max(1, prev - 1));

  const validateForm = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = 'Please enter your name';
    if (!formData.phone.trim()) {
      errors.phone = 'Please enter your phone number';
    } else if (!/^\+?[0-9\s\-()]{7,20}$/.test(formData.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }
    if (!formData.date) {
      errors.date = 'Please select your travel date from the calendar';
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    // Simulate booking transmission
    setTimeout(() => {
      const refId = `MP-${Math.floor(100000 + Math.random() * 900000)}`;
      // Save to admin panel
      if (onAddBookingRequest) {
        onAddBookingRequest({
          id: refId,
          tourName: activeTour.title,
          tourPrice: activeTour.priceType === 'fixed' && activeTour.price ? activeTour.price : 'Rate on Request',
          userName: formData.fullName,
          phone: formData.phone,
          guests: guests,
          date: formData.date,
          description: formData.description || '',
          status: 'pending',
          submittedAt: new Date().toISOString()
        });
      }
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setBookingDetails({
        id: refId,
        tourTitle: activeTour.title,
        guests: guests,
        ...formData
      });
    }, 1800);
  };

  // Categories for Sidebar Filtering
  const categories = [
    { id: 'All', label: 'All Pieces' },
    { id: 'Moderate', label: 'Moderate Walks' },
    { id: 'Challenging', label: 'Challenging Treks' },
    { id: 'Leisurely', label: 'Leisurely Walks' }
  ];

  // Filtering Logic
  const filteredTours = categoryFilter === 'All' 
    ? tours 
    : tours.filter(t => t.difficulty.toLowerCase().includes(categoryFilter.toLowerCase()));

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--bg-alabaster)', minHeight: '100vh', paddingTop: '120px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
        
        <AnimatePresence mode="wait">
          {view === 'collection' ? (
            
            /* VIEW 1: COLLECTION CATALOGUE VIEW (Image 2 layout) */
            <motion.div
              key="collection-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Collection Header */}
              <div style={{ marginBottom: '4rem', textAlign: 'left' }}>
                <h1 style={{ 
                  fontFamily: 'var(--font-sans)', 
                  fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', 
                  fontWeight: 800, 
                  color: 'var(--text-charcoal)',
                  marginBottom: '1rem',
                  letterSpacing: '-0.02em'
                }}>
                  Collection.
                </h1>
                <p className="body-large" style={{ color: 'var(--text-muted)', maxWidth: '650px', fontWeight: 400 }}>
                  Our complete catalogue of minimalist and modern slow journeys, designed to elevate your connection with the terrain.
                </p>
              </div>

              {/* Sidebar + Catalog Content Row */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '240px 1fr', 
                gap: '4rem',
                alignItems: 'start'
              }} className="grid-catalog-mobile">
                
                {/* Left Sidebar Filter Categories */}
                <div style={{ position: 'sticky', top: '120px' }} className="catalog-sidebar-mobile">
                  <span className="label-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '1.25rem', fontWeight: 600, letterSpacing: '0.08em' }}>
                    CATEGORIES
                  </span>
                  
                  <div className="categories-pill-container">
                    {categories.map(cat => {
                      const isActive = categoryFilter === cat.id;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => setCategoryFilter(cat.id)}
                          className={`category-pill-btn ${isActive ? 'active' : ''}`}
                        >
                          {cat.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Right Product Grid */}
                <div>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(3, 1fr)', 
                    gap: '2.5rem' 
                  }} className="grid-products-mobile">
                    {filteredTours.map((t) => {
                      // Find matching tour index in original list
                      const tourIndex = tours.findIndex(original => original.id === t.id);
                      return (
                        <div 
                          key={t.id}
                          onClick={() => {
                            setActiveTourIndex(tourIndex);
                            setView('detail');
                          }}
                          style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', textAlign: 'left' }}
                          className="catalog-product-card"
                        >
                          {/* Image Box */}
                          <div style={{ 
                            position: 'relative', 
                            overflow: 'hidden', 
                            borderRadius: '4px',
                            backgroundColor: 'var(--bg-sand-light)',
                            aspectRatio: '4/5',
                            marginBottom: '1.25rem',
                            border: '1px solid var(--border-light)'
                          }}>
                            {/* Black Category Badge */}
                            <span style={{
                              position: 'absolute',
                              top: '12px',
                              left: '12px',
                              zIndex: 10,
                              backgroundColor: 'var(--text-charcoal)',
                              color: 'var(--bg-alabaster)',
                              padding: '0.35rem 0.75rem',
                              fontSize: '0.7rem',
                              fontWeight: '600',
                              letterSpacing: '0.1em',
                              borderRadius: '2px',
                              fontFamily: 'var(--font-sans)'
                            }}>
                              {t.badge}
                            </span>

                            {/* Zooming Image */}
                            <motion.div
                              whileHover={{ scale: 1.06 }}
                              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                              style={{
                                backgroundImage: `url("${t.images[0]}")`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                width: '100%',
                                height: '100%'
                              }}
                            />
                          </div>

                          {/* Info Text */}
                          <h3 style={{ 
                            fontFamily: 'var(--font-serif)', 
                            fontSize: '1.3rem', 
                            fontWeight: '500', 
                            color: 'var(--text-charcoal)',
                            marginBottom: '0.25rem',
                            lineHeight: '1.2'
                          }}>
                            {t.title}
                          </h3>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                            <span>{t.duration}</span>
                            <span style={{ 
                              fontWeight: '700', 
                              color: t.priceType === 'fixed' && t.price ? '#15803d' : 'var(--accent-terracotta)',
                              fontSize: t.priceType === 'fixed' && t.price ? '0.95rem' : '0.85rem'
                            }}>
                              {t.priceType === 'fixed' && t.price ? t.price : 'Rates on Request'}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            </motion.div>
          ) : (
            
            /* VIEW 2: PRODUCT DETAIL VIEW (Image 1 layout) */
            <motion.div
              key="detail-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Back button */}
              <button
                onClick={() => {
                  setView('collection');
                  onClearTourSelection();
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  color: 'var(--text-muted)',
                  marginBottom: '2.5rem',
                  padding: '0.5rem 0',
                  fontWeight: '500',
                  transition: 'color 0.2s'
                }}
                className="back-btn-hover"
              >
                <ArrowLeft size={16} /> Back to Collection
              </button>

              {/* 12-Column Grid */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(12, 1fr)', 
                gap: '4rem',
                alignItems: 'start'
              }} className="grid-booking-layout">
                
                {/* LEFT SIDE: Image Gallery & Clickable thumbnails */}
                <div style={{ gridColumn: 'span 7' }} className="col-12-mobile">
                  
                  {/* Large Main Active Image */}
                  <div style={{ 
                    overflow: 'hidden', 
                    borderRadius: '4px', 
                    height: '520px', 
                    backgroundColor: 'var(--bg-sand-light)',
                    border: '1px solid var(--border-light)',
                    boxShadow: '0 20px 45px rgba(0,0,0,0.03)',
                    marginBottom: '1.5rem',
                    position: 'relative'
                  }} className="main-detail-image-box">
                    <motion.div
                      key={activeTour.id + '-' + activeImageIndex}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      style={{
                        backgroundImage: `url("${activeTour.images[activeImageIndex]}")`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        width: '100%',
                        height: '100%'
                      }}
                    />
                    {/* Prev/Next Arrow Buttons */}
                    {activeTour.images.length > 1 && (
                      <>
                        <button
                          onClick={() => setActiveImageIndex(i => (i - 1 + activeTour.images.length) % activeTour.images.length)}
                          style={{
                            position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)',
                            width: '40px', height: '40px', borderRadius: '50%',
                            backgroundColor: 'rgba(255,255,255,0.85)', border: 'none',
                            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)', transition: 'all 0.2s',
                            color: 'var(--text-charcoal)', fontSize: '1.2rem', fontWeight: 700
                          }}
                          className="img-nav-btn"
                          aria-label="Previous image"
                        >‹</button>
                        <button
                          onClick={() => setActiveImageIndex(i => (i + 1) % activeTour.images.length)}
                          style={{
                            position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)',
                            width: '40px', height: '40px', borderRadius: '50%',
                            backgroundColor: 'rgba(255,255,255,0.85)', border: 'none',
                            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)', transition: 'all 0.2s',
                            color: 'var(--text-charcoal)', fontSize: '1.2rem', fontWeight: 700
                          }}
                          className="img-nav-btn"
                          aria-label="Next image"
                        >›</button>
                        {/* Image counter */}
                        <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', backgroundColor: 'rgba(0,0,0,0.5)', color: '#fff', fontSize: '0.75rem', fontWeight: 600, padding: '0.25rem 0.6rem', borderRadius: '50px' }}>
                          {activeImageIndex + 1} / {activeTour.images.length}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Thumbnail Selector Row */}
                  <div style={{ 
                    display: 'flex', 
                    gap: '1rem', 
                    width: '100%' 
                  }}>
                    {activeTour.images.map((img, idx) => (
                      <div
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        style={{
                          flex: 1,
                          aspectRatio: '4/3',
                          borderRadius: '4px',
                          overflow: 'hidden',
                          cursor: 'pointer',
                          backgroundColor: 'var(--bg-sand-light)',
                          border: activeImageIndex === idx ? '2px solid var(--text-charcoal)' : '1px solid var(--border-light)',
                          transition: 'border 0.2s',
                          boxShadow: '0 5px 15px rgba(0,0,0,0.02)'
                        }}
                      >
                        <div
                          style={{
                            backgroundImage: `url("${img}")`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            width: '100%',
                            height: '100%'
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Trust Badge / Details Box */}
                  <div style={{ 
                    backgroundColor: 'var(--bg-sand-light)', 
                    borderRadius: '8px', 
                    padding: '2rem', 
                    border: '1px solid var(--border-light)',
                    marginTop: '2.5rem',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1.25rem',
                    textAlign: 'left'
                  }}>
                    <Feather size={24} style={{ color: 'var(--accent-terracotta)', flexShrink: 0, marginTop: '0.2rem' }} />
                    <div>
                      <h5 style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', fontWeight: 600, color: 'var(--text-charcoal)', marginBottom: '0.4rem' }}>
                        Personalized Journey & Homestay Guarantee
                      </h5>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                        Tailored directly to your group size. Your homestays, fresh homely meals, and mountain transfers are coordinated end-to-end with local hosts for an authentic, peaceful experience.
                      </p>
                    </div>
                  </div>

                </div>

                {/* RIGHT SIDE: Product Description, Details & Purchase Form */}
                <div style={{ gridColumn: 'span 5', textAlign: 'left' }} className="col-12-mobile">
                  
                  {/* Tour Header */}
                  <div style={{ marginBottom: '2rem' }}>
                    <h1 style={{ 
                      fontFamily: 'var(--font-sans)', 
                      fontSize: '2.5rem', 
                      fontWeight: 850, 
                      color: 'var(--text-charcoal)',
                      lineHeight: 1.1,
                      letterSpacing: '-0.02em',
                      marginBottom: '0.5rem'
                    }}>
                      {activeTour.title}
                    </h1>
                    <span className="label-mono" style={{ fontSize: '0.75rem', color: 'var(--accent-terracotta)', display: 'block', fontWeight: 600 }}>
                      {activeTour.tagline}
                    </span>
                    
                    {/* Price Block (Dynamic Price or On Request) */}
                    <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'baseline', gap: '0.75rem', flexWrap: 'wrap' }}>
                      <span style={{ 
                        fontFamily: 'var(--font-sans)', 
                        fontSize: '1.45rem', 
                        fontWeight: '800', 
                        color: activeTour.priceType === 'fixed' && activeTour.price ? '#15803d' : 'var(--accent-terracotta)',
                        letterSpacing: activeTour.priceType === 'fixed' && activeTour.price ? '-0.01em' : '0.05em',
                        textTransform: activeTour.priceType === 'fixed' && activeTour.price ? 'none' : 'uppercase'
                      }}>
                        {activeTour.priceType === 'fixed' && activeTour.price ? activeTour.price : 'Rates on Request'}
                      </span>
                      {activeTour.priceType === 'fixed' && activeTour.price && (
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', backgroundColor: 'var(--bg-sand)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 600 }}>
                          All-inclusive itinerary
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Core Specs Grid */}
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1fr 1fr', 
                    gap: '1.25rem 1rem', 
                    marginBottom: '2rem',
                    borderTop: '1px solid var(--border-light)',
                    borderBottom: '1px solid var(--border-light)',
                    padding: '1.5rem 0'
                  }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.05em' }}>Tour Time</span>
                      <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-charcoal)', marginTop: '0.15rem' }}>{activeTour.duration}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.05em' }}>Best Time</span>
                      <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-charcoal)', marginTop: '0.15rem' }}>{activeTour.bestTime}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.05em' }}>Difficulty</span>
                      <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-charcoal)', marginTop: '0.15rem' }}>{activeTour.difficulty}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.05em' }}>Landscape</span>
                      <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-charcoal)', marginTop: '0.15rem' }}>{activeTour.landscape}</span>
                    </div>
                  </div>

                  {/* Long Description */}
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>
                    {activeTour.description}
                  </p>

                  {/* Interactive Booking widget Form */}
                  <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '2rem' }}>
                    
                    <form onSubmit={handleSubmit}>
                      
                      {/* Name input - LAIBA style underline */}
                      <div className="form-group" style={{ marginBottom: '1.75rem' }}>
                        <label className="form-label" style={{ fontWeight: 600, fontSize: '0.75rem' }}>FULL NAME</label>
                        <input
                          type="text"
                          name="fullName"
                          placeholder="Enter your name"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="form-input"
                          style={{ 
                            borderBottom: formErrors.fullName ? '1px solid var(--accent-terracotta)' : '1px solid var(--text-charcoal)', 
                            fontSize: '1.05rem', 
                            padding: '0.5rem 0',
                            fontWeight: '500'
                          }}
                        />
                        {formErrors.fullName && <span style={{ color: 'var(--accent-terracotta)', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>{formErrors.fullName}</span>}
                      </div>

                      {/* Phone Input - LAIBA style underline */}
                      <div className="form-group" style={{ marginBottom: '1.75rem' }}>
                        <label className="form-label" style={{ fontWeight: 600, fontSize: '0.75rem' }}>PHONE NUMBER</label>
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Enter phone number"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="form-input"
                          style={{ 
                            borderBottom: formErrors.phone ? '1px solid var(--accent-terracotta)' : '1px solid var(--text-charcoal)', 
                            fontSize: '1.05rem', 
                            padding: '0.5rem 0',
                            fontWeight: '500'
                          }}
                        />
                        {formErrors.phone && <span style={{ color: 'var(--accent-terracotta)', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>{formErrors.phone}</span>}
                      </div>

                      {/* Date Picker — calendar */}
                      <div className="form-group" style={{ marginBottom: '1.75rem' }}>
                        <label className="form-label" style={{ fontWeight: 600, fontSize: '0.75rem' }}>CHOOSE DATE FROM CALENDAR</label>
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          min={new Date().toISOString().split('T')[0]}
                          className="form-input date-picker-input"
                          style={{ 
                            borderBottom: formErrors.date ? '1px solid var(--accent-terracotta)' : '1px solid var(--text-charcoal)', 
                            fontSize: '1.05rem', 
                            padding: '0.5rem 0',
                            fontWeight: '500',
                            width: '100%',
                            cursor: 'pointer'
                          }}
                        />
                        {formErrors.date && <span style={{ color: 'var(--accent-terracotta)', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>{formErrors.date}</span>}
                      </div>

                      {/* Description / Special Requests optional */}
                      <div className="form-group" style={{ marginBottom: '1.75rem' }}>
                        <label className="form-label" style={{ fontWeight: 600, fontSize: '0.75rem' }}>DESCRIPTION / EXTRA NOTES (OPTIONAL)</label>
                        <textarea
                          name="description"
                          rows={2}
                          placeholder="Tell us about any accessibility needs or special homestay requests..."
                          value={formData.description}
                          onChange={handleInputChange}
                          className="form-input"
                          style={{ 
                            borderBottom: '1px solid var(--text-charcoal)', 
                            fontSize: '1.05rem', 
                            padding: '0.5rem 0',
                            fontWeight: '500',
                            resize: 'none'
                          }}
                        />
                      </div>

                      {/* Number of People */}
                      <div className="form-group" style={{ marginBottom: '1.75rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                          <label className="form-label" style={{ fontWeight: 600, fontSize: '0.75rem', margin: 0 }}>
                            TOTAL PEOPLE
                          </label>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            Min: 1 (No maximum limit)
                          </span>
                        </div>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                          <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid var(--text-charcoal)', borderRadius: '4px', backgroundColor: '#fff', overflow: 'hidden' }}>
                            <button 
                              type="button" 
                              onClick={decrementGuests}
                              style={{ width: '42px', height: '42px', border: 'none', background: '#f5f5f5', cursor: 'pointer', fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-charcoal)' }}
                            >
                              -
                            </button>
                            <input
                              type="number"
                              name="guests"
                              min="1"
                              value={guests}
                              onChange={e => {
                                const val = parseInt(e.target.value);
                                setGuests(isNaN(val) ? 1 : Math.max(1, val));
                              }}
                              style={{ 
                                width: '70px', 
                                height: '42px', 
                                border: 'none', 
                                textAlign: 'center', 
                                fontWeight: '700', 
                                fontSize: '1.15rem', 
                                color: 'var(--text-charcoal)',
                                outline: 'none'
                              }}
                            />
                            <button 
                              type="button" 
                              onClick={incrementGuests}
                              style={{ width: '42px', height: '42px', border: 'none', background: '#f5f5f5', cursor: 'pointer', fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-charcoal)' }}
                            >
                              +
                            </button>
                          </div>
                          <span style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-charcoal)' }}>
                            {guests === 1 ? 'Person' : 'People'}
                          </span>
                        </div>
                      </div>

                      {/* Urgent Spots Remaining (LAIBA style red banner text) */}
                      <div style={{ 
                        color: '#E53E3E', 
                        fontFamily: 'var(--font-sans)', 
                        fontSize: '0.8rem', 
                        fontWeight: '700', 
                        letterSpacing: '0.05em', 
                        marginBottom: '2rem',
                        textTransform: 'uppercase'
                      }}>
                        ONLY {activeTour.spotsRemaining} SPOTS REMAINING
                      </div>

                      {/* Submit Button with blob loader */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="ecommerce-cta-btn"
                        style={{
                          width: '100%',
                          backgroundColor: 'var(--text-charcoal)',
                          color: 'var(--bg-alabaster)',
                          padding: '1.25rem 2rem',
                          fontSize: '0.95rem',
                          fontWeight: '600',
                          border: 'none',
                          cursor: isSubmitting ? 'not-allowed' : 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.75rem',
                          transition: 'background-color 0.2s, transform 0.2s',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          position: 'relative',
                          overflow: 'hidden'
                        }}
                      >
                        {isSubmitting ? (
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <span className="book-loader" />
                            Sending...
                          </span>
                        ) : (
                          <><ArrowRight size={16} /> Request Reservation</>
                        )}
                      </button>

                    </form>
                  </div>

                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Success Confirmation Modal */}
      <AnimatePresence>
        {submitSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(30, 30, 28, 0.4)',
              backdropFilter: 'blur(8px)',
              zIndex: 99,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem'
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{
                backgroundColor: 'var(--bg-alabaster)',
                maxWidth: '550px',
                width: '100%',
                borderRadius: '4px',
                padding: '3rem 2.5rem',
                border: '1px solid var(--border-light)',
                textAlign: 'center',
                boxShadow: '0 30px 60px rgba(0,0,0,0.1)'
              }}
            >
              <div style={{ color: 'var(--accent-terracotta)', display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <CheckCircle size={56} />
              </div>
              <span className="label-mono" style={{ color: 'var(--accent-terracotta)', fontWeight: 600 }}>Request Transmitted</span>
              <h3 className="heading-small" style={{ marginTop: '0.5rem', marginBottom: '1.5rem', fontWeight: 600 }}>
                Booking Request Logged
              </h3>
              
              <div style={{ 
                textAlign: 'left', 
                backgroundColor: 'var(--bg-sand-light)', 
                padding: '1.5rem', 
                borderRadius: '4px',
                fontSize: '0.9rem',
                lineHeight: 1.5,
                color: 'var(--text-charcoal)',
                marginBottom: '2rem',
                border: '1px solid var(--border-light)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--border-light)', paddingBottom: '0.75rem', marginBottom: '0.75rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Ticket Reference</span>
                  <span style={{ fontWeight: 600 }}>{bookingDetails.id}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Journey</span>
                  <span>{bookingDetails.tourTitle}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Date Selected</span>
                  <span>{bookingDetails.date}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Name</span>
                  <span>{bookingDetails.fullName}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Phone</span>
                  <span>{bookingDetails.phone}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Total People</span>
                  <span>{bookingDetails.guests} {parseInt(bookingDetails.guests) === 1 ? 'Person' : 'People'}</span>
                </div>
                {bookingDetails.description && (
                  <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: '0.5rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Description/Requests:</span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic', marginTop: '0.25rem' }}>{bookingDetails.description}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px dashed var(--border-light)', fontWeight: 600, color: 'var(--accent-terracotta)' }}>
                  <span>Pricing Details</span>
                  <span>Discuss during contact</span>
                </div>
              </div>

              <p className="body-normal" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
                We have received your booking inquiry. Our slow travel curators will contact you at <strong>{bookingDetails.phone}</strong> to discuss homestay pricing details.
              </p>

              <button
                onClick={() => {
                  setSubmitSuccess(false);
                  setView('collection');
                  onClearTourSelection();
                }}
                className="button-primary"
                style={{ width: '100%', borderRadius: '2px' }}
              >
                Return to Shop
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .back-btn-hover:hover {
          color: var(--text-charcoal) !important;
        }
        .ecommerce-cta-btn:hover {
          background-color: var(--accent-terracotta) !important;
        }

        /* Categories Navigation Styling */
        .categories-pill-container {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }
        .category-pill-btn {
          border: none;
          background: transparent;
          font-family: var(--font-sans);
          font-size: 1.05rem;
          font-weight: 400;
          color: var(--text-muted);
          cursor: pointer;
          text-align: left;
          padding: 0.35rem 0;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          position: relative;
        }
        .category-pill-btn:hover {
          color: var(--text-charcoal);
        }
        .category-pill-btn.active {
          font-weight: 600;
          color: var(--text-charcoal);
        }
        .category-pill-btn.active::before {
          content: "";
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--accent-terracotta);
          position: absolute;
          left: -14px;
        }

        @media (max-width: 900px) {
          .grid-catalog-mobile {
            grid-template-columns: 1fr !important;
            gap: 1.75rem !important;
          }
          .catalog-sidebar-mobile {
            position: relative !important;
            top: 0 !important;
            margin-bottom: 0.5rem;
            min-width: 0 !important;
            width: 100% !important;
          }
          .categories-pill-container {
            flex-direction: row !important;
            overflow-x: auto !important;
            gap: 0.5rem !important;
            padding: 0.25rem 0.25rem 0.65rem 0 !important;
            scrollbar-width: none !important;
            -ms-overflow-style: none !important;
            -webkit-overflow-scrolling: touch !important;
          }
          .categories-pill-container::-webkit-scrollbar {
            display: none !important;
            width: 0 !important;
            height: 0 !important;
          }
          .category-pill-btn {
            padding: 0.55rem 1.15rem !important;
            border-radius: 50px !important;
            font-size: 0.85rem !important;
            font-weight: 500 !important;
            white-space: nowrap !important;
            background-color: var(--bg-sand-light) !important;
            border: 1px solid var(--border-light) !important;
            color: var(--text-charcoal) !important;
            flex-shrink: 0 !important;
            text-align: center !important;
            justify-content: center !important;
          }
          .category-pill-btn.active {
            background-color: var(--text-charcoal) !important;
            color: #ffffff !important;
            border-color: var(--text-charcoal) !important;
            box-shadow: 0 4px 12px rgba(0,0,0,0.12) !important;
          }
          .category-pill-btn.active::before {
            display: none !important;
          }
          .grid-products-mobile {
            grid-template-columns: 1fr 1fr !important;
            gap: 1.5rem !important;
          }
          .grid-booking-layout {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .col-12-mobile {
            grid-column: 1 / -1 !important;
          }
          .main-detail-image-box {
            height: 320px !important;
          }
        }
        .img-nav-btn:hover {
          background-color: rgba(255,255,255,1) !important;
          box-shadow: 0 6px 18px rgba(0,0,0,0.2) !important;
          transform: translateY(-50%) scale(1.1) !important;
        }
        @media (max-width: 600px) {
          .grid-products-mobile {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
}
