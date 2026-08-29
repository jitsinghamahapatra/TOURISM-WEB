import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Award, Feather, Home, Utensils, Car, ArrowUpRight } from 'lucide-react';

export default function AboutUs({ aboutContent }) {
  const teamMembers = aboutContent?.teamMembers || [
    {
      name: 'Meghpiyon Tour & Travels',
      role: 'Tour Operator',
      desc: 'Trusted by families, couples and groups for seamless Sikkim and North Bengal travel. Providing end-to-end arrangements with personal care and humble hospitality.',
      specialty: 'Sikkim & Darjeeling'
    },
    {
      name: 'Our Homestay Hosts',
      role: 'Bengali Heritage Partners',
      desc: 'Local families who open their warmly themed, Bengali-named rooms to our guests. They prepare fresh homestyle meals and treat every traveler as family.',
      specialty: 'Cozy Homesteads'
    },
    {
      name: 'Mountain Drivers',
      role: 'High-Altitude Specialists',
      desc: 'Experienced drivers who know every hairpin turn across the Silk Route and North Sikkim high passes. They prioritize your safety and comfort above all else.',
      specialty: 'Road Safety Experts'
    }
  ];

  return (
    <section id="about" className="section-padding" style={{ backgroundColor: 'var(--bg-alabaster)', borderTop: '1px solid var(--border-light)', paddingTop: '120px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header Block */}
        <div style={{ textAlign: 'left', marginBottom: '5rem' }}>
          <span className="label-mono" style={{ color: 'var(--accent-terracotta)', display: 'block', marginBottom: '1rem' }}>
            Our Heritage
          </span>
          <h2 className="heading-medium" style={{ color: 'var(--text-charcoal)', maxWidth: '800px', marginBottom: '2rem' }}>
            {aboutContent?.storyHeading || 'Slow travel designed with local character.'}
          </h2>
          <div style={{ width: '80px', height: '1px', backgroundColor: 'var(--accent-terracotta)' }} />
        </div>

        {/* Editorial Story Layout */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(12, 1fr)', 
          gap: '3rem',
          marginBottom: '6rem'
        }} className="grid-about-story-mobile">
          
          <div style={{ gridColumn: 'span 6' }} className="col-12-mobile">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 style={{ 
                fontFamily: 'var(--font-serif)', 
                fontSize: '1.8rem', 
                fontWeight: '400',
                color: 'var(--text-charcoal)',
                marginBottom: '2rem',
                lineHeight: 1.4
              }}>
                {aboutContent?.storyParagraph1 || 'Meghpiyon Tour and Travels builds unhurried journeys connecting conscious travelers with authentic Himalayan terrains.'}
              </h3>
              <p className="body-normal" style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', textAlign: 'justify' }}>
                {aboutContent?.storyParagraph2 || 'We coordinate complete itineraries from station pick-up to airport drop-off, providing cozy homestays, fresh homestyle local foods, and experienced mountain drivers.'}
              </p>
            </motion.div>
          </div>

          <div style={{ gridColumn: '7 / span 6' }} className="col-12-mobile">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                backgroundColor: 'var(--bg-sand)',
                padding: '3rem 2.5rem',
                borderRadius: '24px',
                border: '1px solid var(--border-light)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <span className="label-mono" style={{ color: 'var(--accent-terracotta)', display: 'block', marginBottom: '1.5rem' }}>
                Our Pledge
              </span>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', marginBottom: '1.5rem', fontWeight: 400 }}>
                {aboutContent?.missionTitle || 'Himalayan Conservation & Stewardship'}
              </h4>
              <p className="body-normal" style={{ color: 'var(--text-charcoal)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                {aboutContent?.missionDesc || 'We dedicate a portion of every booking to regional ecosystem preservation and local community support.'}
              </p>
              <ul style={{ 
                listStyle: 'none', 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '1rem',
                fontSize: '0.9rem',
                color: 'var(--text-muted)'
              }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Home size={16} style={{ color: 'var(--accent-terracotta)' }} /> Authentic Bengali-themed homestay networks.
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Utensils size={16} style={{ color: 'var(--accent-terracotta)' }} /> Local food traditions and homestyle cooking.
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Car size={16} style={{ color: 'var(--accent-terracotta)' }} /> Support for experienced mountain driver communities.
                </li>
              </ul>
            </motion.div>
          </div>

        </div>

        {/* Team Gallery */}
        <div style={{ marginTop: '8rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="label-mono" style={{ color: 'var(--accent-terracotta)', display: 'block', marginBottom: '1rem' }}>
              Our Partners
            </span>
            <h2 className="heading-small" style={{ color: 'var(--text-charcoal)' }}>
              The People Behind Your Journey
            </h2>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: '2.5rem' 
          }} className="grid-guides-mobile">
            {teamMembers.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  border: '1px solid var(--border-light)',
                  padding: '2.5rem 2rem',
                  borderRadius: '20px',
                  backgroundColor: 'var(--bg-sand-light)',
                  textAlign: 'left',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <span className="label-mono" style={{ fontSize: '0.7rem', color: 'var(--accent-terracotta)' }}>
                    {member.specialty}
                  </span>
                  <h4 style={{ 
                    fontFamily: 'var(--font-sans)', 
                    fontSize: '1.25rem', 
                    fontWeight: 600, 
                    marginTop: '0.5rem',
                    marginBottom: '0.25rem',
                    color: 'var(--text-charcoal)' 
                  }}>
                    {member.name}
                  </h4>
                  <p style={{ 
                    fontFamily: 'var(--font-sans)', 
                    fontSize: '0.85rem', 
                    color: 'var(--text-muted)',
                    marginBottom: '1.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    {member.role}
                  </p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5 }}>
                    {member.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .grid-about-story-mobile {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .grid-guides-mobile {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
          .col-12-mobile {
            grid-column: 1 / -1 !important;
          }
        }
      `}</style>
    </section>
  );
}
