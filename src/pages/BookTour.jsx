import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, Mail, Users, CheckCircle, ArrowRight } from 'lucide-react';

export default function BookTour({ selectedTour, onClearTourSelection }) {
  const tours = [
    {
      id: 'highlands',
      title: 'Scottish Highlands',
      difficulty: 'Moderate Walk',
      landscape: 'Alpine & Valleys',
      price: 4200,
      dates: ['May 12 - May 19, 2027', 'Jun 05 - Jun 12, 2027', 'Sep 18 - Sep 25, 2027']
    },
    {
      id: 'patagonia',
      title: 'Patagonian Peaks',
      difficulty: 'Challenging Trek',
      landscape: 'Glacial & Peaks',
      price: 6800,
      dates: ['Jan 10 - Jan 22, 2027', 'Feb 14 - Feb 26, 2027', 'Mar 08 - Mar 20, 2027']
    },
    {
      id: 'tuscany',
      title: 'Tuscan Hills',
      difficulty: 'Leisurely Walk',
      landscape: 'Countryside & Ridges',
      price: 3900,
      dates: ['Apr 18 - Apr 25, 2027', 'May 22 - May 29, 2027', 'Oct 02 - Oct 09, 2027']
    }
  ];

  const [activeFilter, setActiveFilter] = useState('All');
  const [formData, setFormData] = useState({
    tour: '',
    date: '',
    guests: '1',
    fullName: '',
    email: '',
    notes: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({});

  // Sync selectedTour from parent component state (e.g. Home clicks)
  useEffect(() => {
    if (selectedTour && selectedTour !== 'All') {
      const matched = tours.find(t => t.title.toLowerCase().includes(selectedTour.toLowerCase()));
      if (matched) {
        setFormData(prev => ({
          ...prev,
          tour: matched.title,
          date: matched.dates[0]
        }));
      }
    }
  }, [selectedTour]);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      // Auto-update date to first available if tour changes
      if (name === 'tour') {
        const matched = tours.find(t => t.title === value);
        updated.date = matched ? matched.dates[0] : '';
      }
      return updated;
    });

    // Clear error
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.tour) errors.tour = 'Please select a journey';
    if (!formData.date) errors.date = 'Please select a date';
    if (!formData.fullName.trim()) errors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please provide a valid email';
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
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setBookingDetails({
        id: `RK-${Math.floor(100000 + Math.random() * 900000)}`,
        ...formData,
        price: tours.find(t => t.title === formData.tour)?.price * parseInt(formData.guests)
      });
      // Clear selections
      setFormData({
        tour: '',
        date: '',
        guests: '1',
        fullName: '',
        email: '',
        notes: ''
      });
      onClearTourSelection();
    }, 1800);
  };

  const filteredTours = activeFilter === 'All' 
    ? tours 
    : tours.filter(t => t.difficulty.toLowerCase().includes(activeFilter.toLowerCase()) || t.landscape.toLowerCase().includes(activeFilter.toLowerCase()));

  const selectedTourData = tours.find(t => t.title === formData.tour);

  return (
    <section id="tours" className="section-padding" style={{ backgroundColor: 'var(--bg-sand-light)', borderTop: '1px solid var(--border-light)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="label-mono" style={{ color: 'var(--accent-terracotta)', display: 'block', marginBottom: '1rem' }}>
            Reservation Desk
          </span>
          <h2 className="heading-medium" style={{ color: 'var(--text-charcoal)' }}>
            Configure Your Journey
          </h2>
          <p className="body-large" style={{ marginTop: '1rem', maxWidth: '600px', margin: '1rem auto 0' }}>
            Book your placement in our micro-groups. Secure early bookings for 2027.
          </p>
        </div>

        {/* Filters */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '1rem', 
          marginBottom: '3rem',
          flexWrap: 'wrap'
        }}>
          {['All', 'Walk', 'Trek', 'Valleys', 'Glacial', 'Countryside'].map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilterChange(filter)}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: '50px',
                border: '1px solid',
                borderColor: activeFilter === filter ? 'var(--text-charcoal)' : 'var(--border-light)',
                backgroundColor: activeFilter === filter ? 'var(--text-charcoal)' : 'transparent',
                color: activeFilter === filter ? 'var(--bg-alabaster)' : 'var(--text-muted)',
                fontSize: '0.85rem',
                cursor: 'pointer',
                fontWeight: 500,
                transition: 'all 0.3s ease'
              }}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Interactive Booking Container */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(12, 1fr)', 
          gap: '3rem',
          alignItems: 'start'
        }} className="grid-booking-mobile">
          
          {/* Quick Select Panel */}
          <div style={{ gridColumn: 'span 5' }} className="col-12-mobile">
            <span className="label-mono" style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '1.5rem' }}>
              Quick Selection
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {filteredTours.map((t) => (
                <motion.div
                  key={t.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      tour: t.title,
                      date: t.dates[0]
                    }));
                    if (formErrors.tour) setFormErrors(prev => ({ ...prev, tour: '' }));
                  }}
                  style={{
                    backgroundColor: formData.tour === t.title ? 'var(--bg-sand)' : 'var(--bg-alabaster)',
                    border: '1px solid',
                    borderColor: formData.tour === t.title ? 'var(--accent-terracotta)' : 'var(--border-light)',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s, border-color 0.3s'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-charcoal)' }}>
                      {t.title}
                    </h4>
                    <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--accent-terracotta)' }}>
                      ${t.price}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.75rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <span>{t.difficulty}</span>
                    <span>&bull;</span>
                    <span>{t.landscape}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Form Panel */}
          <div style={{ 
            gridColumn: '6 / span 7',
            backgroundColor: 'var(--bg-alabaster)',
            padding: '3rem 2.5rem',
            borderRadius: '24px',
            border: '1px solid var(--border-light)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.02)'
          }} className="col-12-mobile">
            
            <form onSubmit={handleSubmit}>
              {/* Tour Selection */}
              <div className="form-group">
                <label className="form-label">Select Sanctuary Journey</label>
                <select
                  name="tour"
                  value={formData.tour}
                  onChange={handleInputChange}
                  className="form-input"
                  style={{ appearance: 'none', cursor: 'pointer', backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=%27http://www.w3.org/2000/svg%27 width=%2724%27 height=%2724%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%231c1b18%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27><polyline points=%276 9 12 15 18 9%27></polyline></svg>")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right center', backgroundSize: '16px' }}
                >
                  <option value="" disabled>-- Select a Journey --</option>
                  {tours.map(t => (
                    <option key={t.id} value={t.title}>{t.title} (${t.price} pp)</option>
                  ))}
                </select>
                {formErrors.tour && <span style={{ color: 'var(--accent-terracotta)', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>{formErrors.tour}</span>}
              </div>

              {/* Date Selection */}
              <div className="form-group">
                <label className="form-label">Select Date Window (2027)</label>
                <select
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="form-input"
                  disabled={!formData.tour}
                  style={{ appearance: 'none', cursor: formData.tour ? 'pointer' : 'not-allowed', opacity: formData.tour ? 1 : 0.6 }}
                >
                  <option value="" disabled>-- Choose Available Window --</option>
                  {selectedTourData?.dates.map(date => (
                    <option key={date} value={date}>{date}</option>
                  ))}
                </select>
                {formErrors.date && <span style={{ color: 'var(--accent-terracotta)', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>{formErrors.date}</span>}
              </div>

              {/* Number of Guests */}
              <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                <div>
                  <label className="form-label">Number of Guests</label>
                  <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid var(--border-light)' }}>
                    <Users size={16} style={{ marginRight: '0.75rem', color: 'var(--text-muted)' }} />
                    <select
                      name="guests"
                      value={formData.guests}
                      onChange={handleInputChange}
                      className="form-input"
                      style={{ border: 'none', padding: '0.85rem 0' }}
                    >
                      {[1, 2, 3, 4].map(n => (
                        <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Full Name */}
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid var(--border-light)' }}>
                  <User size={16} style={{ marginRight: '0.75rem', color: 'var(--text-muted)' }} />
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Enter your name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="form-input"
                    style={{ border: 'none', padding: '0.85rem 0' }}
                  />
                </div>
                {formErrors.fullName && <span style={{ color: 'var(--accent-terracotta)', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>{formErrors.fullName}</span>}
              </div>

              {/* Email Address */}
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid var(--border-light)' }}>
                  <Mail size={16} style={{ marginRight: '0.75rem', color: 'var(--text-muted)' }} />
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                    style={{ border: 'none', padding: '0.85rem 0' }}
                  />
                </div>
                {formErrors.email && <span style={{ color: 'var(--accent-terracotta)', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>{formErrors.email}</span>}
              </div>

              {/* Notes */}
              <div className="form-group">
                <label className="form-label">Dietary / Physical Accessibility Notes</label>
                <textarea
                  name="notes"
                  rows={2}
                  placeholder="Optional preferences..."
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="form-input"
                  style={{ resize: 'none' }}
                />
              </div>

              {/* Price Calculation Display */}
              {selectedTourData && (
                <div style={{
                  backgroundColor: 'var(--bg-sand-light)',
                  padding: '1.25rem',
                  borderRadius: '12px',
                  marginBottom: '2rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.95rem'
                }}>
                  <span style={{ color: 'var(--text-muted)' }}>Estimated Investment</span>
                  <span style={{ fontWeight: 600, color: 'var(--text-charcoal)', fontSize: '1.1rem' }}>
                    ${selectedTourData.price * parseInt(formData.guests)} USD
                  </span>
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="button-primary"
                style={{ width: '100%', cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
              >
                {isSubmitting ? 'Securing Spot...' : 'Request Reservation'} <ArrowRight size={16} />
              </button>

            </form>

          </div>
        </div>

      </div>

      {/* Success Confirmation Modal Overlay */}
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
                borderRadius: '28px',
                padding: '3rem 2.5rem',
                border: '1px solid var(--border-light)',
                textAlign: 'center',
                boxShadow: '0 30px 60px rgba(0,0,0,0.1)'
              }}
            >
              <div style={{ color: 'var(--accent-terracotta)', display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <CheckCircle size={56} />
              </div>
              <span className="label-mono" style={{ color: 'var(--accent-terracotta)' }}>Reservation Requested</span>
              <h3 className="heading-small" style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }}>
                Flight Spot Secured
              </h3>
              
              <div style={{ 
                textAlign: 'left', 
                backgroundColor: 'var(--bg-sand-light)', 
                padding: '1.5rem', 
                borderRadius: '16px',
                fontSize: '0.9rem',
                lineHeight: 1.5,
                color: 'var(--text-charcoal)',
                marginBottom: '2rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--border-light)', paddingBottom: '0.75rem', marginBottom: '0.75rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Ticket Reference</span>
                  <span style={{ fontWeight: 600 }}>{bookingDetails.id}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Journey</span>
                  <span>{bookingDetails.tour}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Window</span>
                  <span>{bookingDetails.date}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Travellers</span>
                  <span>{bookingDetails.guests} {parseInt(bookingDetails.guests) === 1 ? 'Person' : 'People'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px dashed var(--border-light)', fontWeight: 600, color: 'var(--accent-terracotta)' }}>
                  <span>Total Cost</span>
                  <span>${bookingDetails.price} USD</span>
                </div>
              </div>

              <p className="body-normal" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
                We have sent confirmation logistics and local guide bios to <strong>{bookingDetails.email}</strong>. Our conservation partners in the region have been notified.
              </p>

              <button
                onClick={() => setSubmitSuccess(false)}
                className="button-primary"
                style={{ width: '100%' }}
              >
                Close Window
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .grid-booking-mobile {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
