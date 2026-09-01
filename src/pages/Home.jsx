import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Compass, Shield, Heart, Star, Check, HelpCircle, ChevronDown, ChevronUp, MapPin, Coffee, Car, ShieldAlert, Award } from 'lucide-react';
import { useLenis } from 'lenis/react';

export default function Home({ tours, aboutContent, onSelectTour, onNavigate }) {
  const lenis = useLenis();
  const heroRef = useRef(null);

  // FAQ Accordion State
  const [activeFaq, setActiveFaq] = useState(null);

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
    onNavigate('tours');
  };

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };


  const testimonials = [
    {
      name: 'Ipsita Naskar',
      badge: 'Local Guide · 14 reviews',
      rating: 5,
      time: '7 months ago',
      content: 'Our recent trip was truly memorable, and the homestay played a big role in that. The rooms had a beautiful Bengali touch with unique names, and the food was absolutely tasty and homely. The hosts were very humble, patient, and always supportive.'
    },
    {
      name: 'Amiya Roy',
      badge: 'Local Guide · 16 reviews',
      time: '6 months ago',
      rating: 5,
      content: 'We visited north and east sikkim with meghpiyon tour and travels recently and have a very nice experience. The arrangement is very nice at a reasonable price from pick up at railway station on arrival to drop at airport at the end of trip.'
    },
    {
      name: 'Arindam Guha',
      badge: '2 reviews',
      time: '8 months ago',
      rating: 5,
      content: 'Excellent service and smooth travel planning. The agent was very responsive, well-organized, and ensured everything went perfectly. Highly recommended.'
    }
  ];

  const pillars = [
    {
      icon: <ShieldAlert size={24} />,
      title: 'Safety Priority',
      desc: 'Gradual acclimatization schedules and oxygen monitoring kits for high-altitude passes.'
    },
    {
      icon: <Coffee size={24} />,
      title: 'Homely Gastronomy',
      desc: 'Fresh, hygienic, and comforting Bengali and local dishes cooked fresh daily.'
    },
    {
      icon: <MapPin size={24} />,
      title: 'Cozy Bengali Touches',
      desc: 'Tastefully named rooms highlighting heritage culture, hosted by friendly local families.'
    },
    {
      icon: <Heart size={24} />,
      title: 'Humble Local Hosts',
      desc: 'Our homestay partners are incredibly patient, supportive, and always ready to help.'
    },
    {
      icon: <Car size={24} />,
      title: 'Experienced Mountain Drivers',
      desc: 'Seasoned mountain professionals navigating Sikkim steep hairpins with absolute safety.'
    },
    {
      icon: <Award size={24} />,
      title: 'Value for Money',
      desc: 'Premium homestays, private transfers, and customized plans at highly reasonable rates.'
    }
  ];

  const steps = [
    {
      num: '01',
      title: 'Select Destination',
      desc: 'Browse our signature Sikkim and Bengal packages to find your ideal route.'
    },
    {
      num: '02',
      title: 'Send Inquiry',
      desc: 'Provide your name and phone number on the Book Tour page. No upfront costs.'
    },
    {
      num: '03',
      title: 'Custom Alignment',
      desc: 'Our curators call you back to tailor homestays, meals, and pickup details.'
    },
    {
      num: '04',
      title: 'Wander Safely',
      desc: 'Arrive at the station/airport; we coordinate transport and stays from start to finish.'
    }
  ];

  const faqs = [
    {
      q: 'What makes Meghpiyon homestays unique?',
      a: 'Our homestays are located in authentic local villages in Sikkim and Darjeeling. They feature beautifully decorated rooms with a unique Bengali touch, named uniquely after local flowers and landmarks. The hosts are warm, humble families who prepare delicious homely meals.'
    },
    {
      q: 'What food arrangements are included in the packages?',
      a: 'We focus on healthy, fresh, homestyle Bengali and regional foods. You will be served freshly-cooked breakfast, lunch, and dinner (warm rice, dal, fresh local vegetables, fish/egg/chicken curry, and homestyle snacks) prepared cleanly by our homestay hosts.'
    },
    {
      q: 'How do pickups and drop-offs work?',
      a: 'We coordinate end-to-end transport starting from NJP Railway Station, Siliguri Junction, or Bagdogra Airport. A dedicated car and an experienced mountain driver will remain with you from pickup to final drop-off at the end of the trip.'
    },
    {
      q: 'How is safety managed for high-altitude paths like Gurudongmar Lake?',
      a: 'Safety is our absolute priority. We design itineraries with gradual altitude transitions to help you acclimatize. Our local drivers are extremely experienced with high-altitude roads. We also help secure all necessary Sikkim travel permits.'
    },
    {
      q: 'How do we discuss custom itineraries and pricing?',
      a: 'Since our packages are customized to your group size, travel dates, and homestay choices, we do not write prices online. Simply request a quote by entering your name and phone number on our Book Tour page. A curator will call you back to discuss pricing and options.'
    }
  ];

  return (
    <div id="home">
      {/* 1. HERO BANNER SECTION */}
      <section 
        ref={heroRef}
        style={{
          position: 'relative',
          height: '100svh',
          minHeight: '580px',
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
            opacity: 0.8,
            backgroundImage: 'url("/hero_landscape.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
          }}
        />

        {/* Overlay Dark Gradient */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(30,30,28,0.3) 0%, rgba(30,30,28,0.8) 100%)',
          zIndex: 1
        }} />

        {/* Hero content */}
        <motion.div
          style={{
            zIndex: 2,
            textAlign: 'center',
            color: 'var(--bg-alabaster)',
            padding: '0 1.25rem',
            width: '100%',
            maxWidth: '1100px',
            y: heroTextY,
            opacity: heroOpacity
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="label-mono" style={{ color: 'var(--bg-sand)', display: 'inline-block', marginBottom: '1.25rem', fontSize: '0.8rem', letterSpacing: '0.12em' }}>
              Meghpiyon Tour & Travels
            </span>
          </motion.div>

          <motion.h1
            className="heading-large hero-heading"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ 
              margin: '0 auto 2rem', 
              color: '#fff',
              textShadow: '0 2px 25px rgba(0,0,0,0.3)',
              fontSize: 'clamp(2rem, 7vw, 6.5rem)',
              lineHeight: '1.1'
            }}
          >
            Unhurried Journeys. <br/>
            Soar into the Himalayas.
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            style={{ color: 'rgba(250,248,245,0.75)', fontSize: 'clamp(0.9rem, 2.5vw, 1.15rem)', marginBottom: '2rem', fontWeight: 300, lineHeight: 1.6 }}
          >
            Authentic Sikkim & North Bengal journeys — from Sarisha to Gurudongmar.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', gap: '0.875rem', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <button 
              onClick={() => handleBookTourClick('All')}
              className="explore-packages-btn hero-cta-primary"
            >
              Explore Packages
              <span className="explore-packages-btn__icon-wrapper">
                <ArrowUpRight className="explore-packages-btn__icon-svg" size={15} />
                <ArrowUpRight className="explore-packages-btn__icon-svg explore-packages-btn__icon-svg--copy" size={15} />
              </span>
            </button>
            <button 
              onClick={() => onNavigate('contact')}
              className="button-secondary hero-cta-secondary"
              style={{
                borderColor: 'rgba(250, 248, 245, 0.4)',
                color: 'var(--bg-alabaster)',
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(4px)'
              }}
            >
              Contact Curators
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator — hidden on very small screens */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            bottom: '2rem',
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
          className="scroll-indicator"
          onClick={() => {
            const introSection = document.getElementById('about-intro');
            if (introSection) {
              introSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          <span className="label-mono" style={{ fontSize: '0.6rem' }}>Scroll to Explore</span>
          <div style={{ width: '1px', height: '40px', backgroundColor: 'var(--border-light)', opacity: 0.5 }} />
        </motion.div>
      </section>

      {/* 2. OUR HERITAGE & MISSION SECTION (Meghpiyon & Red Kite) */}
      <section id="about-intro" className="section-padding" style={{ backgroundColor: 'var(--bg-alabaster)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '3rem', marginBottom: '6rem' }} className="grid-editorial">
            
            <div style={{ gridColumn: 'span 5' }} className="col-12-mobile">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="label-mono" style={{ color: 'var(--accent-terracotta)', display: 'block', marginBottom: '1.5rem', fontWeight: 600 }}>
                  {aboutContent.tagline}
                </span>
                <h2 className="heading-medium" style={{ color: 'var(--text-charcoal)', marginBottom: '2rem', lineHeight: '1.2' }}>
                  {aboutContent.storyHeading}
                </h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1.5rem' }}>
                  <Star size={16} style={{ color: '#F59E0B', fill: '#F59E0B' }} />
                  <span style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-charcoal)' }}>
                    4.8 / 5 Rating on Google Maps
                  </span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>(23 Reviews)</span>
                </div>
              </motion.div>
            </div>

            <div style={{ gridColumn: '6 / span 7', display: 'flex', flexDirection: 'column', justifyContent: 'center' }} className="col-12-mobile">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="body-large" style={{ marginBottom: '1.5rem', textAlign: 'justify', color: 'var(--text-charcoal)', fontWeight: 300 }}>
                  {aboutContent.storyParagraph1}
                </p>
                <p className="body-normal" style={{ color: 'var(--text-muted)', textAlign: 'justify', lineHeight: 1.7 }}>
                  {aboutContent.storyParagraph2}
                </p>
              </motion.div>
            </div>

          </div>

          {/* 3. KEY SERVICE FACILITIES GRID (Pillars expanded to 6 items) */}
          <div style={{ textAlign: 'center', marginBottom: '3.5rem', marginTop: '2rem' }}>
            <span className="label-mono" style={{ color: 'var(--accent-terracotta)', display: 'block', marginBottom: '1rem', fontWeight: 600 }}>
              Our Foundations
            </span>
            <h2 className="heading-small" style={{ color: 'var(--text-charcoal)' }}>
              Core Pillars of Our Service
            </h2>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: '2.5rem',
            marginBottom: '4rem'
          }} className="grid-features-mobile">
            {pillars.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  padding: '2.5rem 2rem',
                  backgroundColor: 'var(--bg-sand-light)',
                  borderRadius: '4px',
                  border: '1px solid var(--border-light)',
                  textAlign: 'left'
                }}
              >
                <div style={{ color: 'var(--accent-terracotta)', marginBottom: '1.25rem' }}>
                  {feature.icon}
                </div>
                <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.15rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--text-charcoal)' }}>
                  {feature.title}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. HOW IT WORKS SECTION (Step by Step travel journey) */}
      <section style={{ backgroundColor: 'var(--bg-sand-light)', padding: '6rem 2rem', borderTop: '1px solid var(--border-light)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
            <span className="label-mono" style={{ color: 'var(--accent-terracotta)', display: 'block', marginBottom: '0.75rem', fontWeight: 600 }}>
              The Pathway
            </span>
            <h2 className="heading-medium" style={{ color: 'var(--text-charcoal)' }}>
              How Your Journey Unfolds
            </h2>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(4, 1fr)', 
            gap: '2rem' 
          }} className="grid-steps-mobile">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
                style={{ textAlign: 'left', position: 'relative' }}
              >
                <div style={{ 
                  fontFamily: 'var(--font-sans)', 
                  fontSize: '3rem', 
                  fontWeight: 800, 
                  color: 'transparent',
                  WebkitTextStroke: '1px var(--border-dark)',
                  lineHeight: '1',
                  marginBottom: '1rem',
                  opacity: 0.3
                }}>
                  {step.num}
                </div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-charcoal)', marginBottom: '0.5rem' }}>
                  {step.title}
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. HOMESTAY GALLERY SECTION (Visual showcase) */}
      <section style={{ backgroundColor: 'var(--bg-alabaster)', padding: '6rem 2rem', borderTop: '1px solid var(--border-light)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
            <span className="label-mono" style={{ color: 'var(--accent-terracotta)', display: 'block', marginBottom: '0.75rem', fontWeight: 600 }}>
              Virtual Showcase
            </span>
            <h2 className="heading-medium" style={{ color: 'var(--text-charcoal)' }}>
              Himalayan Homestay Vibe
            </h2>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: '2rem' 
          }} className="grid-features-mobile">
            {[
              { title: 'Bengali Named Rooms', desc: 'Decorated with traditional heritage motifs and cozy layouts.', img: '/tour_highlands.jpg' },
              { title: 'Scenic Mountain Vistas', desc: 'Step out onto balconies overlooking deep valley clouds.', img: '/hero_landscape.jpg' },
              { title: 'Fresh Organic Gardens', desc: 'Fresh ingredients sourced locally from village kitchen plots.', img: '/tour_tuscany.jpg' }
            ].map((item, idx) => (
              <div 
                key={idx} 
                style={{ 
                  borderRadius: '4px', 
                  overflow: 'hidden', 
                  backgroundColor: 'var(--bg-sand-light)',
                  border: '1px solid var(--border-light)',
                  textAlign: 'left'
                }}
              >
                <div style={{ overflow: 'hidden', height: '240px' }}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                    style={{
                      backgroundImage: `url("${item.img}")`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      width: '100%',
                      height: '100%'
                    }}
                  />
                </div>
                <div style={{ padding: '1.75rem' }}>
                  <h4 style={{ fontWeight: 700, color: 'var(--text-charcoal)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>
                    {item.title}
                  </h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. SIGNATURE JOURNEYS (Sikkim themed, no prices) */}
      <section id="featured-tours" className="section-padding" style={{ backgroundColor: 'var(--bg-sand-light)', borderTop: '1px solid var(--border-light)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
            <span className="label-mono" style={{ color: 'var(--accent-terracotta)', display: 'block', marginBottom: '1rem', fontWeight: 600 }}>
              Signature Experiences
            </span>
            <h2 className="heading-medium" style={{ color: 'var(--text-charcoal)' }}>
              Explore Our Sikkim & Bengal Packages
            </h2>
            <p className="body-normal" style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              Custom quote and pricing parameters provided upon reservation request.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '7rem' }}>
            {tours.map((tour, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(12, 1fr)',
                  gap: '4rem',
                  alignItems: 'center',
                }}
                className="grid-tour-item-mobile"
              >
                {/* Image Section */}
                <div style={{ 
                  gridColumn: index % 2 === 0 ? '1 / span 7' : '6 / span 7',
                  order: index % 2 === 0 ? 1 : 2,
                  overflow: 'hidden',
                  borderRadius: '4px',
                  height: '460px',
                  boxShadow: '0 20px 45px rgba(0,0,0,0.04)',
                  border: '1px solid var(--border-light)'
                }} className="col-12-mobile tour-image-wrapper">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      backgroundImage: `url("${tour.image || (tour.images && tour.images[0]) || '/tour_highlands.jpg'}")`,
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
                  <span className="label-mono" style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600 }}>
                    {tour.duration} &middot; {tour.priceType === 'fixed' && tour.price ? tour.price : 'Rates on Request'}
                  </span>
                  <h3 className="heading-small" style={{ marginTop: '0.5rem', marginBottom: '0.25rem', color: 'var(--text-charcoal)', fontWeight: 600 }}>
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
                  <p className="body-normal" style={{ color: 'var(--text-muted)', marginBottom: '2.25rem', fontSize: '0.95rem', lineHeight: 1.6 }}>
                    {tour.description}
                  </p>
                  <button 
                    onClick={() => handleBookTourClick(tour.title)}
                    className="btn-diagonal-slide"
                  >
                    View & Configure <ArrowRight size={14} />
                  </button>
                </div>

              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. GOOGLE MAPS REVIEWS TESTIMONIALS */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-alabaster)', borderTop: '1px solid var(--border-light)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <span className="label-mono" style={{ color: 'var(--accent-terracotta)', display: 'block', marginBottom: '1rem', fontWeight: 600 }}>
              Guest Feedback
            </span>
            <h2 className="heading-medium" style={{ color: 'var(--text-charcoal)' }}>
              Memories Shared by Our Guests
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem', marginTop: '1rem' }}>
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={18} style={{ color: '#F59E0B', fill: '#F59E0B' }} />
              ))}
              <span style={{ fontWeight: 700, marginLeft: '0.5rem', color: 'var(--text-charcoal)' }}>4.8 / 5</span>
              <span style={{ color: 'var(--text-muted)' }}>(23 Reviews on Google Maps)</span>
            </div>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: '2rem' 
          }} className="grid-features-mobile">
            {testimonials.map((test, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
                style={{
                  backgroundColor: 'var(--bg-sand-light)',
                  padding: '2.5rem 2rem',
                  borderRadius: '4px',
                  border: '1px solid var(--border-light)',
                  textAlign: 'left',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.01)'
                }}
              >
                <div>
                  <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1rem' }}>
                    {[1, 2, 3, 4, 5].map((st) => (
                      <Star key={st} size={14} style={{ color: '#F59E0B', fill: '#F59E0B' }} />
                    ))}
                  </div>
                  <p style={{ color: 'var(--text-charcoal)', fontSize: '0.95rem', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '2rem' }}>
                    "{test.content}"
                  </p>
                </div>
                <div>
                  <h4 style={{ fontWeight: 650, fontSize: '1rem', color: 'var(--text-charcoal)', marginBottom: '0.15rem' }}>
                    {test.name}
                  </h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {test.badge} &bull; {test.time}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. INTERACTIVE FAQ SECTION (Expandable accordions) */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-sand-light)', borderTop: '1px solid var(--border-light)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
            <span className="label-mono" style={{ color: 'var(--accent-terracotta)', display: 'block', marginBottom: '1rem', fontWeight: 600 }}>
              FAQ Details
            </span>
            <h2 className="heading-medium" style={{ color: 'var(--text-charcoal)' }}>
              Common Inquiries
            </h2>
            <p className="body-normal" style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              Everything you need to know about our slow homestay journeys.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                style={{
                  backgroundColor: 'var(--bg-alabaster)',
                  borderRadius: '4px',
                  border: '1px solid var(--border-light)',
                  overflow: 'hidden',
                  textAlign: 'left'
                }}
              >
                {/* Accordion Trigger Header */}
                <button
                  onClick={() => toggleFaq(idx)}
                  style={{
                    width: '100%',
                    padding: '1.5rem 2rem',
                    border: 'none',
                    background: 'transparent',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    color: 'var(--text-charcoal)'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textAlign: 'left' }}>
                    <HelpCircle size={20} style={{ color: 'var(--accent-terracotta)', flexShrink: 0 }} />
                    {faq.q}
                  </span>
                  {activeFaq === idx ? <ChevronUp size={18} style={{ color: 'var(--text-muted)' }} /> : <ChevronDown size={18} style={{ color: 'var(--text-muted)' }} />}
                </button>

                {/* Accordion Content Box */}
                <AnimatePresence initial={false}>
                  {activeFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{ 
                        padding: '0 2rem 2rem 3.5rem', 
                        color: 'var(--text-muted)', 
                        fontSize: '0.95rem', 
                        lineHeight: 1.6 
                      }}>
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Styled inline media query utilities */}
      <style>{`
        @media (max-width: 900px) {
          .col-12-mobile {
            grid-column: 1 / -1 !important;
            order: unset !important;
          }
          .grid-editorial {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
          .grid-features-mobile {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
          .grid-steps-mobile {
            grid-template-columns: 1fr 1fr !important;
            gap: 2rem !important;
          }
          .grid-tour-item-mobile {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .tour-image-wrapper {
            height: 300px !important;
          }
        }
        @media (max-width: 600px) {
          .grid-steps-mobile {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
        }

        /* ── HERO MOBILE FIXES ── */
        @media (max-width: 768px) {
          .hero-heading {
            font-size: clamp(1.9rem, 9vw, 3rem) !important;
            line-height: 1.15 !important;
            margin-bottom: 1.25rem !important;
          }
          .hero-subtitle {
            font-size: 0.9rem !important;
            margin-bottom: 1.5rem !important;
            padding: 0 0.5rem;
          }
          .hero-cta-primary,
          .hero-cta-secondary {
            width: 100% !important;
            justify-content: center !important;
            padding: 0.85rem 1.5rem !important;
            font-size: 0.9rem !important;
          }
          .scroll-indicator {
            display: none !important;
          }
        }
        @media (max-width: 480px) {
          .hero-heading {
            font-size: clamp(1.7rem, 10vw, 2.5rem) !important;
          }
        }
      `}</style>
    </div>
  );
}
