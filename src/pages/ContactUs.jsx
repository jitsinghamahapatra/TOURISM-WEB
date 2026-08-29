import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Compass } from 'lucide-react';

export default function ContactUs() {
  const offices = [
    {
      city: 'Edinburgh Outpost',
      address: '14 Royal Terrace, EH7 5AB',
      coords: '55.9576° N, 3.1793° W',
      tel: '+44 131 556 9088'
    },
    {
      city: 'El Chaltén Basecamp',
      address: 'Avenida San Martín 420, Patagonia',
      coords: '49.3315° S, 72.8858° W',
      tel: '+54 2962 493011'
    },
    {
      city: 'Florence Writing Room',
      address: 'Via de\' Bardi 28, 50125 Firenze',
      coords: '43.7663° N, 11.2584° E',
      tel: '+39 055 234 1144'
    }
  ];

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    inquiry: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const err = {};
    if (!formData.fullName.trim()) err.fullName = 'Please supply your name';
    if (!formData.email.trim()) {
      err.email = 'Please supply your email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      err.email = 'Please provide a valid email';
    }
    if (!formData.message.trim()) err.message = 'Please provide a message';
    return err;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    if (Object.keys(err).length > 0) {
      setErrors(err);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setFormData({
        fullName: '',
        email: '',
        inquiry: '',
        message: ''
      });
      setTimeout(() => setSuccess(false), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="section-padding" style={{ backgroundColor: 'var(--bg-alabaster)', borderTop: '1px solid var(--border-light)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'left', marginBottom: '5rem' }}>
          <span className="label-mono" style={{ color: 'var(--accent-terracotta)', display: 'block', marginBottom: '1rem' }}>
            Get in Touch
          </span>
          <h2 className="heading-medium" style={{ color: 'var(--text-charcoal)', maxWidth: '800px', marginBottom: '2rem' }}>
            Write to us from where you stand.
          </h2>
          <div style={{ width: '80px', height: '1px', backgroundColor: 'var(--accent-terracotta)' }} />
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(12, 1fr)', 
          gap: '4rem',
          alignItems: 'start'
        }} className="grid-contact-mobile">
          
          {/* Coordinates and physical nodes */}
          <div style={{ gridColumn: 'span 5' }} className="col-12-mobile">
            <span className="label-mono" style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '2rem' }}>
              Base Stations
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              {offices.map((office, idx) => (
                <div key={idx} style={{ textAlign: 'left', borderLeft: '1px solid var(--border-light)', paddingLeft: '1.5rem' }}>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 400, color: 'var(--text-charcoal)' }}>
                    {office.city}
                  </h4>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem', 
                    fontSize: '0.8rem', 
                    fontFamily: 'monospace', 
                    color: 'var(--accent-terracotta)',
                    marginTop: '0.25rem',
                    marginBottom: '0.75rem' 
                  }}>
                    <Compass size={12} /> {office.coords}
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                    {office.address}
                  </p>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-charcoal)', fontWeight: 500 }}>
                    {office.tel}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Form wrapper */}
          <div style={{ 
            gridColumn: '6 / span 7',
            backgroundColor: 'var(--bg-sand-light)',
            padding: '3.5rem 3rem',
            borderRadius: '24px',
            border: '1px solid var(--border-light)'
          }} className="col-12-mobile">
            
            <form onSubmit={handleFormSubmit}>
              
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Your Name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="form-input"
                />
                {errors.fullName && <span style={{ color: 'var(--accent-terracotta)', fontSize: '0.8rem', display: 'block', marginTop: '0.25rem' }}>{errors.fullName}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="hello@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                />
                {errors.email && <span style={{ color: 'var(--accent-terracotta)', fontSize: '0.8rem', display: 'block', marginTop: '0.25rem' }}>{errors.email}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Inquiry Nature</label>
                <select
                  name="inquiry"
                  value={formData.inquiry}
                  onChange={handleInputChange}
                  className="form-input"
                  style={{ appearance: 'none', cursor: 'pointer', backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=%27http://www.w3.org/2000/svg%27 width=%2724%27 height=%2724%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%231c1b18%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27><polyline points=%276 9 12 15 18 9%27></polyline></svg>")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right center', backgroundSize: '16px' }}
                >
                  <option value="">General Wanderlust Questions</option>
                  <option value="press">Editorial & Press</option>
                  <option value="partnership">Conservation & Restoration Alliances</option>
                  <option value="custom">Private Group Bookings</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Tell us what you seek in slow travel..."
                  value={formData.message}
                  onChange={handleInputChange}
                  className="form-input"
                  style={{ resize: 'none' }}
                />
                {errors.message && <span style={{ color: 'var(--accent-terracotta)', fontSize: '0.8rem', display: 'block', marginTop: '0.25rem' }}>{errors.message}</span>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="button-primary"
                style={{ width: '100%', cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
              >
                {isSubmitting ? 'Sending Transmission...' : 'Send Message'} <Send size={14} />
              </button>

              <AnimatePresence>
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    style={{
                      marginTop: '1.5rem',
                      padding: '1rem',
                      borderRadius: '12px',
                      backgroundColor: 'var(--bg-alabaster)',
                      border: '1px solid var(--accent-terracotta)',
                      color: 'var(--accent-terracotta)',
                      fontSize: '0.9rem',
                      fontWeight: 500
                    }}
                  >
                    Transmission received. We will respond within one solar cycle.
                  </motion.div>
                )}
              </AnimatePresence>

            </form>

          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .grid-contact-mobile {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
