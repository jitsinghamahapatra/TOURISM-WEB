import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Award, Feather, ArrowUpRight } from 'lucide-react';

export default function AboutUs() {
  const guides = [
    {
      name: 'Ewan Macleod',
      role: 'Ornithologist & Lead Tracker',
      desc: 'With 15 years tracing raptor flight paths in the Cairngorms, Ewan translates the language of the skies for our Scottish groups.',
      specialty: 'Highland Raptors'
    },
    {
      name: 'Sofia Alarcon',
      role: 'Ecology Coordinator',
      desc: 'Sofia leads our Patagonia projects, studying organic soil restoration and managing our eco-lodge partnerships.',
      specialty: 'Conservation Biology'
    },
    {
      name: 'Matteo Ghiberti',
      role: 'Slow Walk Connoisseur',
      desc: 'An archaeologist and sommelier, Matteo guides our Tuscan walking paths, weaving heritage stories into daily treks.',
      specialty: 'Etruscan History'
    }
  ];

  return (
    <section id="about" className="section-padding" style={{ backgroundColor: 'var(--bg-alabaster)', borderTop: '1px solid var(--border-light)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header Block */}
        <div style={{ textAlign: 'left', marginBottom: '5rem' }}>
          <span className="label-mono" style={{ color: 'var(--accent-terracotta)', display: 'block', marginBottom: '1rem' }}>
            Our Heritage
          </span>
          <h2 className="heading-medium" style={{ color: 'var(--text-charcoal)', maxWidth: '800px', marginBottom: '2rem' }}>
            Restoring the relationship between traveller and terrain.
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
                Red Kite Tourism was founded in 2018 with a simple realization: the faster tourism moves, the less we actually see.
              </h3>
              <p className="body-normal" style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', textAlign: 'justify' }}>
                We observed that modern holidays had become checklists. Under the guise of exploration, travelers were rushing from one landmark to another, leaving destinations depleted and returning home exhausted.
              </p>
              <p className="body-normal" style={{ color: 'var(--text-muted)', textAlign: 'justify' }}>
                Named after the red kite bird—whose majestic wings and broad flight spans symbolize graceful, unhurried exploration—we set out to establish a travel design studio. We wanted to build journeys that allow travelers to land softly and soar deeply.
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
                The 10% Raptor & Meadow Reclamation Fund
              </h4>
              <p className="body-normal" style={{ color: 'var(--text-charcoal)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                We believe in leaving a physical trace of positive impact. Red Kite does not write checks to generic offsets. Instead, 10% of every journey's cost goes to targeted environmental project pools:
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
                  <Feather size={16} style={{ color: 'var(--accent-terracotta)' }} /> Raptor nest protection and feeding stations.
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Leaf size={16} style={{ color: 'var(--accent-terracotta)' }} /> Seed banking and indigenous meadow replanting.
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Award size={16} style={{ color: 'var(--accent-terracotta)' }} /> Sponsoring training for local rural guide networks.
                </li>
              </ul>
            </motion.div>
          </div>

        </div>

        {/* Guides Gallery */}
        <div style={{ marginTop: '8rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="label-mono" style={{ color: 'var(--accent-terracotta)', display: 'block', marginBottom: '1rem' }}>
              Your Companions
            </span>
            <h2 className="heading-small" style={{ color: 'var(--text-charcoal)' }}>
              Ethical Storytellers
            </h2>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: '2.5rem' 
          }} className="grid-guides-mobile">
            {guides.map((guide, idx) => (
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
                    {guide.specialty}
                  </span>
                  <h4 style={{ 
                    fontFamily: 'var(--font-sans)', 
                    fontSize: '1.25rem', 
                    fontWeight: 600, 
                    marginTop: '0.5rem',
                    marginBottom: '0.25rem',
                    color: 'var(--text-charcoal)' 
                  }}>
                    {guide.name}
                  </h4>
                  <p style={{ 
                    fontFamily: 'var(--font-sans)', 
                    fontSize: '0.85rem', 
                    color: 'var(--text-muted)',
                    marginBottom: '1.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    {guide.role}
                  </p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5 }}>
                    {guide.desc}
                  </p>
                </div>
                <div style={{ 
                  marginTop: '2rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.25rem',
                  fontSize: '0.85rem',
                  color: 'var(--accent-terracotta)',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}>
                  Read Journal <ArrowUpRight size={14} />
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
        }
      `}</style>
    </section>
  );
}
