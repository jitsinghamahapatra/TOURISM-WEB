import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Compass, Shield, Heart } from 'lucide-react';
import { useLenis } from '@studio-freight/react-lenis';

export default function Home({ onSelectTour }) {
  const lenis = useLenis();
  const heroRef = useRef(null);

  // Parallax Scroll Effects for Hero Section
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroBgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroTextY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const handleBookTourClick = (tourName) => {
    onSelectTour(tourName);
    if (lenis) {
      lenis.scrollTo('#tours', { duration: 1.5 });
    } else {
      document.getElementById('tours')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const tours = [
    {
      title: 'Scottish Highlands',
      tagline: 'Mist, Monoliths & Ancient Valleys',
      image: '/tour_highlands.jpg',
      duration: '8 Days',
      price: '$4,200',
      description: 'An immersive editorial journey through the rugged wilderness, historic stone crofts, and wild red kite habitats of the Scottish Highlands.'
    },
    {
      title: 'Patagonian Peaks',
      tagline: 'Windswept Spire & Turquoise Lakes',
      image: '/tour_patagonia.jpg',
      duration: '12 Days',
      price: '$6,800',
      description: 'A slow-paced expedition to the dramatic spires of Fitz Roy and Torres del Paine, featuring boutique luxury eco-lodges.'
    },
    {
      title: 'Tuscan Hills',
      tagline: 'Morning Mist & Cypress Paths',
      image: '/tour_tuscany.jpg',
      duration: '7 Days',
      price: '$3,900',
      description: 'A walking tour along the historical pilgrim paths, tracing organic vineyards, medieval villages, and golden ridges.'
    }
  ];

  return (
    <div id="home">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        style={{
          position: 'relative',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          backgroundColor: '#1E1E1C'
        }}
      >
        {/* Parallax Background */}
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            y: heroBgY,
            opacity: 0.85,
            backgroundImage: 'url("/hero_landscape.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Overlay Gradient */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(30,30,28,0.2) 0%, rgba(30,30,28,0.7) 100%)',
          zIndex: 1
        }} />

        {/* Hero Content */}
        <motion.div
          style={{
            zIndex: 2,
            textAlign: 'center',
            color: 'var(--bg-alabaster)',
            padding: '0 1.5rem',
            y: heroTextY,
            opacity: heroOpacity
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="label-mono" style={{ color: 'var(--bg-sand)', display: 'inline-block', marginBottom: '1.5rem' }}>
              Red Kite Tourism
            </span>
          </motion.div>

          <motion.h1
            className="heading-large"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ 
              maxWidth: '1000px', 
              margin: '0 auto 2.5rem', 
              color: '#fff',
              textShadow: '0 2px 20px rgba(0,0,0,0.15)'
            }}
          >
            Wander Wisely. <br/>
            Soar Deeply.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <button 
              onClick={() => handleBookTourClick('All')}
              className="button-primary"
              style={{
                backgroundColor: 'var(--accent-terracotta)',
                borderColor: 'var(--accent-terracotta)',
                boxShadow: '0 10px 30px rgba(184, 92, 66, 0.2)'
              }}
            >
              Explore Journeys <ArrowRight size={16} />
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            bottom: '2.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 2,
            color: 'var(--bg-sand)',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem'
          }}
          onClick={() => lenis?.scrollTo('#about', { duration: 1.2 })}
        >
          <span className="label-mono" style={{ fontSize: '0.65rem' }}>Scroll to Explore</span>
          <div style={{ width: '1px', height: '40px', backgroundColor: 'var(--border-light)', opacity: 0.5 }} />
        </motion.div>
      </section>

      {/* Ethos/Philosophy Section */}
      <section id="about-intro" className="section-padding" style={{ backgroundColor: 'var(--bg-alabaster)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="grid-editorial" style={{ gridTemplateColumns: 'repeat(12, 1fr)', display: 'grid' }}>
            
            <div style={{ gridColumn: 'span 5' }} className="col-12-mobile">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="label-mono" style={{ color: 'var(--accent-terracotta)', display: 'block', marginBottom: '1.5rem' }}>
                  Our Ethos
                </span>
                <h2 className="heading-medium" style={{ color: 'var(--text-charcoal)', marginBottom: '2rem' }}>
                  Slow travel designed for the conscious mind.
                </h2>
              </motion.div>
            </div>

            <div style={{ gridColumn: '6 / span 7', display: 'flex', flexDirection: 'column', justifyContent: 'center' }} className="col-12-mobile">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="body-large" style={{ marginBottom: '1.5rem', textAlign: 'justify' }}>
                  Red Kite is named after the resilient bird of prey that returned from near-extinction to soar freely across our skylines. We believe travel should follow a similar arc: restorative, deliberate, and soaring.
                </p>
                <p className="body-normal" style={{ color: 'var(--text-muted)', textAlign: 'justify' }}>
                  We curate boutique, micro-group journeys that integrate conservation support, organic heritage gastronomy, and structural downtime. We don't rush through schedules. We pause, observe, and engage with the land.
                </p>
              </motion.div>
            </div>

          </div>

          {/* Staggered Features Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: '3rem', 
            marginTop: '6rem' 
          }} className="grid-features-mobile">
            
            {[
              { icon: <Compass size={28} />, title: 'Curated Trails', desc: 'Custom hiking and observation paths designed to bypass mainstream tourism routes.' },
              { icon: <Shield size={28} />, title: 'Micro Groups', desc: 'A strict limit of 8 travelers per tour ensures structural tranquility and authentic connections.' },
              { icon: <Heart size={28} />, title: 'Giving Back', desc: '10% of every journey package is directly routed to local raptor and landscape conservation groups.' }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  padding: '2.5rem 2rem',
                  backgroundColor: 'var(--bg-sand-light)',
                  borderRadius: '16px',
                  border: '1px solid var(--border-light)',
                  textAlign: 'left'
                }}
              >
                <div style={{ color: 'var(--accent-terracotta)', marginBottom: '1.5rem' }}>
                  {feature.icon}
                </div>
                <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                  {feature.title}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5 }}>
                  {feature.desc}
                </p>
              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* Curated Journeys Section */}
      <section id="featured-tours" className="section-padding" style={{ backgroundColor: 'var(--bg-sand-light)', borderTop: '1px solid var(--border-light)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <span className="label-mono" style={{ color: 'var(--accent-terracotta)', display: 'block', marginBottom: '1rem' }}>
              Signature Experiences
            </span>
            <h2 className="heading-medium" style={{ color: 'var(--text-charcoal)' }}>
              Select Your Sanctuary
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>
            {tours.map((tour, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(12, 1fr)',
                  gap: '3rem',
                  alignItems: 'center',
                }}
                className="grid-tour-item-mobile"
              >
                {/* Image Section */}
                <div style={{ 
                  gridColumn: index % 2 === 0 ? '1 / span 7' : '6 / span 7',
                  order: index % 2 === 0 ? 1 : 2,
                  overflow: 'hidden',
                  borderRadius: '24px',
                  height: '480px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.06)',
                  border: '1px solid var(--border-light)'
                }} className="col-12-mobile tour-image-wrapper">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      backgroundImage: `url("${tour.image}")`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      width: '100%',
                      height: '100%'
                    }}
                  />
                </div>

                {/* Text Section */}
                <div style={{ 
                  gridColumn: index % 2 === 0 ? '9 / span 4' : '1 / span 4',
                  order: index % 2 === 0 ? 2 : 1,
                  textAlign: 'left'
                }} className="col-12-mobile">
                  <span className="label-mono" style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                    {tour.duration} &middot; {tour.price}
                  </span>
                  <h3 className="heading-small" style={{ marginTop: '0.5rem', marginBottom: '0.25rem', color: 'var(--text-charcoal)' }}>
                    {tour.title}
                  </h3>
                  <p style={{ 
                    fontFamily: 'var(--font-serif)', 
                    fontStyle: 'italic', 
                    color: 'var(--accent-terracotta)',
                    fontSize: '1.05rem',
                    marginBottom: '1.5rem'
                  }}>
                    {tour.tagline}
                  </p>
                  <p className="body-normal" style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.95rem' }}>
                    {tour.description}
                  </p>
                  <button 
                    onClick={() => handleBookTourClick(tour.title)}
                    className="button-secondary"
                  >
                    Configure Booking <ArrowRight size={16} />
                  </button>
                </div>

              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Styled inline media query utilities */}
      <style>{`
        @media (max-width: 900px) {
          .col-12-mobile {
            grid-column: span 12 !important;
            order: unset !important;
          }
          .grid-features-mobile {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
          .grid-tour-item-mobile {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
          .tour-image-wrapper {
            height: 300px !important;
          }
        }
      `}</style>
    </div>
  );
}
