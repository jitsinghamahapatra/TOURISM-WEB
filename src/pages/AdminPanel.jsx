import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, LogOut, CheckCircle, XCircle, Plus, Edit2, Trash2, Mail, Compass, Settings, Image, KeyRound, Users, ChevronDown, ChevronUp, Upload, X } from 'lucide-react';

export default function AdminPanel({
  tours,
  onUpdateTours,
  aboutContent,
  onUpdateAboutContent,
  contactContent,
  onUpdateContactContent,
  bookingRequests,
  onUpdateBookingRequests,
  contactMessages,
  onUpdateContactMessages
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState(() => localStorage.getItem('meghpiyon_admin_pass') || '123456');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState('bookings');

  // Tour editing states
  const [editingTourIdx, setEditingTourIdx] = useState(null);
  const [tourForm, setTourForm] = useState({
    title: '', tagline: '', image: '', images: [], duration: '',
    description: '', bestTime: '', difficulty: '', landscape: '',
    priceType: 'request',
    price: ''
  });
  const [isTourFormOpen, setIsTourFormOpen] = useState(false);
  const [imageMode, setImageMode] = useState('url'); // 'url' | 'upload'
  const fileInputRef = useRef(null);

  // Password change states
  const [pwOld, setPwOld] = useState('');
  const [pwNew, setPwNew] = useState('');
  const [pwConfirm, setPwConfirm] = useState('');
  const [pwMsg, setPwMsg] = useState({ text: '', ok: false });

  // Team member editing
  const [teamEditIdx, setTeamEditIdx] = useState(null);
  const [teamForm, setTeamForm] = useState({ name: '', role: '', desc: '', specialty: '' });
  const [isTeamFormOpen, setIsTeamFormOpen] = useState(false);

  // Password verification
  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === adminPassword) {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect password. Please try again.');
    }
  };

  // Change password
  const handleChangePassword = (e) => {
    e.preventDefault();
    if (pwOld !== adminPassword) {
      setPwMsg({ text: 'Current password is incorrect.', ok: false });
      return;
    }
    if (pwNew.length < 4) {
      setPwMsg({ text: 'New password must be at least 4 characters.', ok: false });
      return;
    }
    if (pwNew !== pwConfirm) {
      setPwMsg({ text: 'New passwords do not match.', ok: false });
      return;
    }
    setAdminPassword(pwNew);
    localStorage.setItem('meghpiyon_admin_pass', pwNew);
    setPwOld(''); setPwNew(''); setPwConfirm('');
    setPwMsg({ text: 'Password updated successfully!', ok: true });
    setTimeout(() => setPwMsg({ text: '', ok: false }), 4000);
  };

  // Manage Bookings
  const updateBookingStatus = (id, status) => {
    const updated = bookingRequests.map(req => req.id === id ? { ...req, status } : req);
    onUpdateBookingRequests(updated);
  };
  const deleteBooking = (id) => {
    if (window.confirm('Delete this booking request?')) {
      onUpdateBookingRequests(bookingRequests.filter(r => r.id !== id));
    }
  };

  // Manage Messages
  const deleteMessage = (id) => {
    if (window.confirm('Delete this message?')) {
      onUpdateContactMessages(contactMessages.filter(m => m.id !== id));
    }
  };

  // Manage Tours
  const handleOpenTourForm = (idx = null) => {
    if (idx !== null) {
      setEditingTourIdx(idx);
      const t = tours[idx];
      const defaultGalleryMap = [
        ['/tour_highlands.jpg', '/hero_landscape.jpg', '/tour_patagonia.jpg'],
        ['/tour_patagonia.jpg', '/hero_landscape.jpg', '/tour_tuscany.jpg'],
        ['/tour_tuscany.jpg', '/hero_landscape.jpg', '/tour_highlands.jpg']
      ];
      const fallbackImgs = defaultGalleryMap[idx % defaultGalleryMap.length] || defaultGalleryMap[0];
      let existingImgs = (Array.isArray(t.images) && t.images.length > 0)
        ? [...t.images]
        : (t.image ? [t.image] : fallbackImgs);
      
      if (existingImgs.length === 1 && fallbackImgs) {
        const extra = fallbackImgs.find(x => x !== existingImgs[0]);
        if (extra) existingImgs.push(extra);
      }

      setTourForm({
        ...t,
        priceType: t.priceType || (t.price ? 'fixed' : 'request'),
        price: t.price || '',
        image: t.image || existingImgs[0],
        images: existingImgs
      });
    } else {
      setEditingTourIdx(null);
      setTourForm({
        title: '', tagline: '', image: '', images: [], duration: '',
        description: '', bestTime: '', difficulty: '', landscape: '',
        priceType: 'request',
        price: ''
      });
    }
    setIsTourFormOpen(true);
    setImageMode('url');
  };

  const handleTourFormChange = (e) => {
    const { name, value } = e.target;
    setTourForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAddImageUrl = () => {
    const url = tourForm._urlInput?.trim();
    if (url) {
      setTourForm(prev => ({ ...prev, images: [...prev.images, url], image: prev.images.length === 0 ? url : prev.image, _urlInput: '' }));
    }
  };

  const handleUploadImages = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setTourForm(prev => ({
          ...prev,
          images: [...prev.images, ev.target.result],
          image: prev.images.length === 0 ? ev.target.result : prev.image
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImageFromTour = (idx) => {
    setTourForm(prev => {
      const newImgs = prev.images.filter((_, i) => i !== idx);
      return { ...prev, images: newImgs, image: newImgs[0] || '' };
    });
  };

  const handleTourSubmit = (e) => {
    e.preventDefault();
    const finalTour = {
      ...tourForm,
      priceType: tourForm.priceType || 'request',
      price: tourForm.priceType === 'fixed' ? (tourForm.price || '').trim() : '',
      image: tourForm.images[0] || tourForm.image || '',
      images: tourForm.images.length > 0 ? tourForm.images : (tourForm.image ? [tourForm.image] : [])
    };
    let updated = [...tours];
    if (editingTourIdx !== null) {
      updated[editingTourIdx] = finalTour;
    } else {
      updated.push(finalTour);
    }
    onUpdateTours(updated);
    setIsTourFormOpen(false);
    setEditingTourIdx(null);
  };

  const handleDeleteTour = (idx) => {
    if (window.confirm(`Delete "${tours[idx].title}"?`)) {
      onUpdateTours(tours.filter((_, i) => i !== idx));
    }
  };

  // Content Change Handlers
  const handleAboutChange = (e) => {
    const { name, value } = e.target;
    onUpdateAboutContent({ ...aboutContent, [name]: value });
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    onUpdateContactContent({ ...contactContent, [name]: value });
  };

  // Team member management
  const teamMembers = aboutContent.teamMembers || [
    { name: 'Meghpiyon Tour & Travels', role: 'Tour Operator', desc: 'Trusted by families, couples and groups for seamless Sikkim and North Bengal travel.', specialty: 'Sikkim & Darjeeling' },
    { name: 'Our Homestay Hosts', role: 'Bengali Heritage Partners', desc: 'Local families who open their warmly themed, Bengali-named rooms to our guests.', specialty: 'Cozy Homesteads' },
    { name: 'Mountain Drivers', role: 'High-Altitude Specialists', desc: 'Experienced drivers who know every hairpin turn across the Silk Route and North Sikkim.', specialty: 'Road Safety Experts' }
  ];

  const handleOpenTeamForm = (idx = null) => {
    if (idx !== null) {
      setTeamEditIdx(idx);
      setTeamForm(teamMembers[idx]);
    } else {
      setTeamEditIdx(null);
      setTeamForm({ name: '', role: '', desc: '', specialty: '' });
    }
    setIsTeamFormOpen(true);
  };

  const handleTeamSubmit = (e) => {
    e.preventDefault();
    const updated = [...teamMembers];
    if (teamEditIdx !== null) {
      updated[teamEditIdx] = teamForm;
    } else {
      updated.push(teamForm);
    }
    onUpdateAboutContent({ ...aboutContent, teamMembers: updated });
    setIsTeamFormOpen(false);
    setTeamEditIdx(null);
  };

  const handleDeleteTeamMember = (idx) => {
    if (window.confirm(`Remove "${teamMembers[idx].name}"?`)) {
      onUpdateAboutContent({ ...aboutContent, teamMembers: teamMembers.filter((_, i) => i !== idx) });
    }
  };

  /* ─── LOGIN SCREEN ─── */
  if (!isAuthenticated) {
    return (
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-sand-light)', padding: '2rem', paddingTop: '100px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ backgroundColor: 'var(--bg-alabaster)', padding: '3rem 2.5rem', borderRadius: '16px', border: '1px solid var(--border-light)', width: '100%', maxWidth: '420px', textAlign: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}
        >
          <div style={{ display: 'inline-flex', padding: '1rem', backgroundColor: 'var(--bg-sand)', borderRadius: '50%', marginBottom: '1.5rem', color: 'var(--accent-terracotta)' }}>
            <Lock size={28} />
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--text-charcoal)', marginBottom: '0.5rem', fontWeight: 500 }}>Admin Access</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>Meghpiyon Tour & Travels — Secure Dashboard</p>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ textAlign: 'left' }}>
              <label style={styles.formLabel}>Password</label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter password"
                style={styles.formInput}
                autoFocus
              />
              {authError && <span style={{ color: 'var(--accent-terracotta)', fontSize: '0.8rem', display: 'block', marginTop: '0.5rem' }}>{authError}</span>}
            </div>
            <button type="submit" className="button-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}>
              Sign In
            </button>
          </form>
        </motion.div>
      </section>
    );
  }

  const tabs = [
    { id: 'bookings', label: `Reservations (${bookingRequests.length})`, icon: <CheckCircle size={15} /> },
    { id: 'messages', label: `Messages (${contactMessages.length})`, icon: <Mail size={15} /> },
    { id: 'tours', label: 'Manage Tours', icon: <Compass size={15} /> },
    { id: 'content', label: 'Edit Content', icon: <Settings size={15} /> },
    { id: 'team', label: 'Our Partners', icon: <Users size={15} /> },
    { id: 'security', label: 'Security', icon: <KeyRound size={15} /> },
  ];

  /* ─── DASHBOARD SCREEN ─── */
  return (
    <section style={{ minHeight: '100vh', backgroundColor: 'var(--bg-alabaster)', paddingTop: '80px', paddingBottom: '6rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1.5rem' }}>
          <div>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-terracotta)', fontFamily: 'monospace' }}>System Control</span>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--text-charcoal)', fontWeight: 500, margin: '0.25rem 0' }}>Admin Dashboard</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>Manage tours, content, bookings and site settings.</p>
          </div>
          <button onClick={() => setIsAuthenticated(false)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'transparent', border: '1px solid var(--border-light)', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 500, color: 'var(--text-charcoal)', fontSize: '0.85rem' }}>
            <LogOut size={15} /> Sign Out
          </button>
        </div>

        {/* Tab Bar */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', overflowX: 'auto', paddingBottom: '0.25rem', flexWrap: 'wrap' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                border: activeTab === tab.id ? 'none' : '1px solid var(--border-light)',
                backgroundColor: activeTab === tab.id ? 'var(--text-charcoal)' : 'transparent',
                color: activeTab === tab.id ? '#fff' : 'var(--text-muted)',
                cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
                fontWeight: 500,
                fontSize: '0.82rem',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s'
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* ── TAB: Reservations ── */}
        {activeTab === 'bookings' && (
          <div style={styles.tabCard}>
            <h3 style={styles.tabTitle}>Tour Booking Requests</h3>
            {bookingRequests.length === 0 ? (
              <p style={{ color: 'var(--text-muted)' }}>No reservation requests submitted yet.</p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--border-light)', textAlign: 'left' }}>
                      {['Ref ID', 'Tour', 'Guest', 'Phone', 'Guests', 'Date', 'Status', 'Actions'].map(h => (
                        <th key={h} style={{ padding: '0.75rem 0.5rem', fontWeight: 700, color: 'var(--text-charcoal)', whiteSpace: 'nowrap' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {bookingRequests.map(req => (
                      <tr key={req.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                        <td style={styles.td}><code style={{ fontSize: '0.75rem', backgroundColor: 'var(--bg-sand)', padding: '0.15rem 0.4rem', borderRadius: '4px' }}>{(req.id || '').slice(-8)}</code></td>
                        <td style={styles.td}>{req.tourName}</td>
                        <td style={styles.td}>{req.userName}</td>
                        <td style={styles.td}>{req.phone}</td>
                        <td style={{ ...styles.td, textAlign: 'center' }}>{req.guests}</td>
                        <td style={styles.td}>{req.date}</td>
                        <td style={styles.td}>
                          <span style={{ padding: '0.2rem 0.6rem', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 700, backgroundColor: req.status === 'accepted' ? '#dcfce7' : req.status === 'rejected' ? '#fee2e2' : '#fef9c3', color: req.status === 'accepted' ? '#166534' : req.status === 'rejected' ? '#991b1b' : '#854d0e' }}>
                            {req.status || 'pending'}
                          </span>
                        </td>
                        <td style={{ ...styles.td, whiteSpace: 'nowrap' }}>
                          {req.status !== 'accepted' && (
                            <button onClick={() => updateBookingStatus(req.id, 'accepted')} style={styles.actionBtn('#166534')} title="Accept">
                              <CheckCircle size={14} />
                            </button>
                          )}
                          {req.status !== 'rejected' && (
                            <button onClick={() => updateBookingStatus(req.id, 'rejected')} style={styles.actionBtn('#991b1b')} title="Reject">
                              <XCircle size={14} />
                            </button>
                          )}
                          <button onClick={() => deleteBooking(req.id)} style={styles.actionBtn('#6b7280')} title="Delete">
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ── TAB: Messages ── */}
        {activeTab === 'messages' && (
          <div style={styles.tabCard}>
            <h3 style={styles.tabTitle}>Inbound Messages</h3>
            {contactMessages.length === 0 ? (
              <p style={{ color: 'var(--text-muted)' }}>No messages received yet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {contactMessages.map(msg => (
                  <div key={msg.id} style={{ backgroundColor: 'var(--bg-alabaster)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border-light)', textAlign: 'left', position: 'relative' }}>
                    <button onClick={() => deleteMessage(msg.id)} style={{ position: 'absolute', top: '1rem', right: '1rem', border: 'none', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer' }}><Trash2 size={15} /></button>
                    <div style={{ fontSize: '0.75rem', color: 'var(--accent-terracotta)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.4rem' }}>{msg.inquiry || 'General Inquiry'}</div>
                    <h4 style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-charcoal)', marginBottom: '0.15rem' }}>{msg.fullName}</h4>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block', marginBottom: '1rem' }}>Email: <a href={`mailto:${msg.email}`} style={{ color: 'var(--accent-terracotta)' }}>{msg.email}</a></span>
                    <p style={{ color: 'var(--text-charcoal)', fontSize: '0.92rem', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>"{msg.message}"</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── TAB: Manage Tours ── */}
        {activeTab === 'tours' && (
          <div style={styles.tabCard}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
              <h3 style={styles.tabTitle}>Tour Catalog</h3>
              {!isTourFormOpen && (
                <button onClick={() => handleOpenTourForm()} className="button-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.55rem 1.2rem', fontSize: '0.85rem' }}>
                  <Plus size={16} /> Add New Tour
                </button>
              )}
            </div>

            {/* Tour Add/Edit Form */}
            <AnimatePresence>
              {isTourFormOpen && (
                <motion.form
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleTourSubmit}
                  style={{ backgroundColor: 'var(--bg-alabaster)', padding: '2rem', borderRadius: '8px', border: '1px solid var(--border-light)', marginBottom: '2.5rem', textAlign: 'left' }}
                >
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--text-charcoal)', marginBottom: '1.5rem', fontWeight: 600 }}>
                    {editingTourIdx !== null ? `Edit: ${tourForm.title || 'Tour'}` : 'Create New Tour'}
                  </h4>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }} className="grid-contact-mobile">
                    {[
                      { label: 'Tour Title', name: 'title', placeholder: 'e.g. North Sikkim Valley Expedition' },
                      { label: 'Tagline / Subtitle', name: 'tagline', placeholder: 'e.g. Glaciers, Hot Springs & Lakes' },
                      { label: 'Duration', name: 'duration', placeholder: 'e.g. 6 Days' },
                      { label: 'Best Time to Visit', name: 'bestTime', placeholder: 'e.g. April - June & Oct - Dec' },
                      { label: 'Difficulty Level', name: 'difficulty', placeholder: 'e.g. Challenging Trek' },
                      { label: 'Landscape Type', name: 'landscape', placeholder: 'e.g. Glaciers & High Valleys' },
                    ].map(f => (
                      <div key={f.name}>
                        <label style={styles.formLabel}>{f.label}</label>
                        <input type="text" name={f.name} value={tourForm[f.name] || ''} onChange={handleTourFormChange} style={styles.formInput} placeholder={f.placeholder} required={f.name === 'title'} />
                      </div>
                    ))}
                  </div>

                  {/* Pricing Option Section */}
                  <div style={{ marginTop: '1.25rem', backgroundColor: 'var(--bg-sand-light)', padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
                    <label style={{ ...styles.formLabel, marginBottom: '0.75rem' }}>Pricing Option</label>
                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: tourForm.priceType === 'fixed' ? '1rem' : '0' }}>
                      <button
                        type="button"
                        onClick={() => setTourForm(p => ({ ...p, priceType: 'request' }))}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.55rem 1.1rem',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          backgroundColor: tourForm.priceType === 'request' ? 'var(--text-charcoal)' : 'var(--bg-alabaster)',
                          color: tourForm.priceType === 'request' ? '#fff' : 'var(--text-charcoal)',
                          border: '1px solid ' + (tourForm.priceType === 'request' ? 'var(--text-charcoal)' : 'var(--border-light)'),
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          transition: 'all 0.2s'
                        }}
                      >
                        <span style={{ fontSize: '1rem' }}>💬</span> Rate on Request
                      </button>

                      <button
                        type="button"
                        onClick={() => setTourForm(p => ({ ...p, priceType: 'fixed', price: p.price || '₹14,999 / person' }))}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.55rem 1.1rem',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          backgroundColor: tourForm.priceType === 'fixed' ? 'var(--text-charcoal)' : 'var(--bg-alabaster)',
                          color: tourForm.priceType === 'fixed' ? '#fff' : 'var(--text-charcoal)',
                          border: '1px solid ' + (tourForm.priceType === 'fixed' ? 'var(--text-charcoal)' : 'var(--border-light)'),
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          transition: 'all 0.2s'
                        }}
                      >
                        <span style={{ fontSize: '1rem' }}>🏷️</span> Custom / Fixed Price
                      </button>
                    </div>

                    {tourForm.priceType === 'request' ? (
                      <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                        ℹ️ This tour will display <strong>"Rates on Request"</strong> on collection & detail pages. Pricing will be calculated and provided on inquiry.
                      </p>
                    ) : (
                      <div style={{ marginTop: '0.75rem' }}>
                        <label style={{ ...styles.formLabel, fontSize: '0.75rem', marginBottom: '0.35rem' }}>Package Price / Rate</label>
                        <input
                          type="text"
                          name="price"
                          value={tourForm.price || ''}
                          onChange={handleTourFormChange}
                          placeholder="e.g. ₹14,999 / person or ₹18,000"
                          style={styles.formInput}
                          required={tourForm.priceType === 'fixed'}
                        />
                        <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Quick templates:</span>
                          {['₹11,999 / person', '₹14,999 / person', '₹18,500 / person', '₹25,000 / couple'].map(tpl => (
                            <button
                              key={tpl}
                              type="button"
                              onClick={() => setTourForm(p => ({ ...p, price: tpl }))}
                              style={{
                                fontSize: '0.72rem',
                                padding: '0.2rem 0.5rem',
                                borderRadius: '4px',
                                border: '1px solid var(--border-light)',
                                backgroundColor: 'var(--bg-alabaster)',
                                color: 'var(--accent-terracotta)',
                                cursor: 'pointer',
                                fontWeight: 500
                              }}
                            >
                              {tpl}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div style={{ marginTop: '1.25rem' }}>
                    <label style={styles.formLabel}>Description</label>
                    <textarea name="description" rows={4} value={tourForm.description || ''} onChange={handleTourFormChange} style={{ ...styles.formInput, resize: 'vertical' }} placeholder="Highlight key experiences, homestay details, food, and route info." />
                  </div>

                  {/* Image section */}
                  <div style={{ marginTop: '1.5rem', backgroundColor: 'var(--bg-sand-light)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
                    <label style={{ ...styles.formLabel, marginBottom: '1rem' }}>Tour Images</label>

                    {/* Mode toggle */}
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
                      {['url', 'upload'].map(m => (
                        <button key={m} type="button" onClick={() => setImageMode(m)} style={{ padding: '0.4rem 1rem', borderRadius: '50px', border: '1px solid var(--border-light)', backgroundColor: imageMode === m ? 'var(--text-charcoal)' : 'transparent', color: imageMode === m ? '#fff' : 'var(--text-muted)', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}>
                          {m === 'url' ? '🔗 Add by URL' : '📁 Upload File'}
                        </button>
                      ))}
                    </div>

                    {imageMode === 'url' && (
                      <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <input
                          type="text"
                          value={tourForm._urlInput || ''}
                          onChange={e => setTourForm(p => ({ ...p, _urlInput: e.target.value }))}
                          onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddImageUrl())}
                          placeholder="Paste image URL and press Add"
                          style={{ ...styles.formInput, flex: 1 }}
                        />
                        <button type="button" onClick={handleAddImageUrl} style={{ padding: '0.6rem 1.2rem', backgroundColor: 'var(--text-charcoal)', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
                          + Add
                        </button>
                      </div>
                    )}

                    {imageMode === 'upload' && (
                      <div>
                        <input type="file" accept="image/*" multiple ref={fileInputRef} onChange={handleUploadImages} style={{ display: 'none' }} />
                        <button type="button" onClick={() => fileInputRef.current?.click()} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.25rem', border: '2px dashed var(--border-light)', borderRadius: '8px', backgroundColor: 'transparent', cursor: 'pointer', color: 'var(--text-muted)', fontFamily: 'var(--font-sans)', fontSize: '0.88rem', width: '100%', justifyContent: 'center' }}>
                          <Upload size={18} /> Click to select images (multiple allowed)
                        </button>
                      </div>
                    )}

                    {/* Quick Preset Images */}
                    <div style={{ marginTop: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>+ Quick Scenic Photos:</span>
                      {[
                        { label: '🏔️ Highlands', url: '/tour_highlands.jpg' },
                        { label: '🌄 Valley Fog', url: '/hero_landscape.jpg' },
                        { label: '🛣️ Silk Route', url: '/tour_patagonia.jpg' },
                        { label: '🍃 Tea Estates', url: '/tour_tuscany.jpg' },
                      ].map(preset => (
                        <button
                          key={preset.url}
                          type="button"
                          onClick={() => {
                            if (!tourForm.images.includes(preset.url)) {
                              setTourForm(prev => ({
                                ...prev,
                                images: [...prev.images, preset.url],
                                image: prev.images.length === 0 ? preset.url : prev.image
                              }));
                            }
                          }}
                          style={{
                            fontSize: '0.72rem',
                            padding: '0.2rem 0.5rem',
                            borderRadius: '4px',
                            border: '1px solid var(--border-light)',
                            backgroundColor: '#fff',
                            color: 'var(--text-charcoal)',
                            cursor: 'pointer',
                            fontWeight: 500
                          }}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>

                    {/* Image previews */}
                    {tourForm.images && tourForm.images.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1.25rem' }}>
                        {tourForm.images.map((img, i) => (
                          <div key={i} style={{ position: 'relative', width: '100px', height: '75px', borderRadius: '6px', overflow: 'hidden', border: i === 0 ? '2px solid var(--accent-terracotta)' : '1px solid var(--border-light)' }}>
                            <img src={img} alt={`img-${i}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { e.target.src = ''; e.target.style.display = 'none'; }} />
                            <button type="button" onClick={() => removeImageFromTour(i)} style={{ position: 'absolute', top: '2px', right: '2px', backgroundColor: 'rgba(0,0,0,0.6)', color: '#fff', border: 'none', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: 0 }}>
                              <X size={10} />
                            </button>
                            {i === 0 && <span style={{ position: 'absolute', bottom: '2px', left: '2px', backgroundColor: 'var(--accent-terracotta)', color: '#fff', fontSize: '0.6rem', fontWeight: 700, padding: '0.1rem 0.3rem', borderRadius: '2px' }}>COVER</span>}
                          </div>
                        ))}
                      </div>
                    )}
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.75rem' }}>First image is used as the cover. Drag order is preserved.</p>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                    <button type="submit" className="button-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.85rem' }}>Save Tour</button>
                    <button type="button" onClick={() => { setIsTourFormOpen(false); setEditingTourIdx(null); }} style={{ padding: '0.6rem 1.5rem', backgroundColor: 'transparent', border: '1px solid var(--border-light)', borderRadius: '50px', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontWeight: 500, color: 'var(--text-charcoal)', fontSize: '0.85rem' }}>
                      Cancel
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Tours Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
              {tours.map((tour, idx) => {
                const coverImg = (tour.images && tour.images[0]) || tour.image || '';
                const isFixedPrice = tour.priceType === 'fixed' && tour.price;
                return (
                  <div key={idx} style={{ backgroundColor: 'var(--bg-alabaster)', borderRadius: '8px', border: '1px solid var(--border-light)', overflow: 'hidden', textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ height: '160px', backgroundImage: `url("${coverImg}")`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative', backgroundColor: 'var(--bg-sand)' }}>
                      <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', backgroundColor: 'rgba(30,30,28,0.8)', color: '#fff', fontSize: '0.7rem', fontWeight: 700, padding: '0.2rem 0.5rem', borderRadius: '4px' }}>{tour.duration}</div>
                      {tour.images && tour.images.length > 1 && (
                        <div style={{ position: 'absolute', bottom: '0.75rem', right: '0.75rem', backgroundColor: 'rgba(30,30,28,0.7)', color: '#fff', fontSize: '0.7rem', padding: '0.15rem 0.4rem', borderRadius: '4px' }}>+{tour.images.length - 1} photos</div>
                      )}
                    </div>
                    <div style={{ padding: '1.25rem', flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.25rem' }}>
                        <h4 style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-charcoal)', margin: 0, lineHeight: 1.25 }}>{tour.title}</h4>
                      </div>
                      <p style={{ fontStyle: 'italic', color: 'var(--accent-terracotta)', fontSize: '0.85rem', margin: 0 }}>{tour.tagline}</p>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                        <span style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          padding: '0.2rem 0.5rem',
                          borderRadius: '4px',
                          backgroundColor: isFixedPrice ? '#dcfce7' : 'var(--bg-sand)',
                          color: isFixedPrice ? '#15803d' : 'var(--accent-terracotta)',
                          display: 'inline-block'
                        }}>
                          {isFixedPrice ? `🏷️ ${tour.price}` : '💬 Rate on Request'}
                        </span>
                      </div>

                      <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                        <span>⏱ {tour.bestTime}</span>
                        <span>🏔 {tour.difficulty}</span>
                      </div>
                      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-light)' }}>
                        <button onClick={() => handleOpenTourForm(idx)} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', border: 'none', background: 'transparent', color: 'var(--accent-terracotta)', cursor: 'pointer', fontWeight: 600, fontSize: '0.82rem', padding: 0 }}>
                          <Edit2 size={13} /> Edit
                        </button>
                        <button onClick={() => handleDeleteTour(idx)} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', border: 'none', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer', fontWeight: 600, fontSize: '0.82rem', padding: 0 }}>
                          <Trash2 size={13} /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── TAB: Edit Content ── */}
        {activeTab === 'content' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {/* About Us */}
            <div style={styles.tabCard}>
              <h3 style={styles.tabTitle}>About Us — Story Content</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', textAlign: 'left' }}>
                <div><label style={styles.formLabel}>Header Tagline</label><input type="text" name="tagline" value={aboutContent.tagline || ''} onChange={handleAboutChange} style={styles.formInput} /></div>
                <div><label style={styles.formLabel}>Main Story Heading</label><input type="text" name="storyHeading" value={aboutContent.storyHeading || ''} onChange={handleAboutChange} style={styles.formInput} /></div>
                <div><label style={styles.formLabel}>Story Paragraph 1</label><textarea name="storyParagraph1" rows={4} value={aboutContent.storyParagraph1 || ''} onChange={handleAboutChange} style={{ ...styles.formInput, resize: 'vertical' }} /></div>
                <div><label style={styles.formLabel}>Story Paragraph 2</label><textarea name="storyParagraph2" rows={4} value={aboutContent.storyParagraph2 || ''} onChange={handleAboutChange} style={{ ...styles.formInput, resize: 'vertical' }} /></div>
                <div><label style={styles.formLabel}>Mission Title</label><input type="text" name="missionTitle" value={aboutContent.missionTitle || ''} onChange={handleAboutChange} style={styles.formInput} /></div>
                <div><label style={styles.formLabel}>Mission Description</label><textarea name="missionDesc" rows={3} value={aboutContent.missionDesc || ''} onChange={handleAboutChange} style={{ ...styles.formInput, resize: 'vertical' }} /></div>
              </div>
            </div>

            {/* Contact Details */}
            <div style={styles.tabCard}>
              <h3 style={styles.tabTitle}>Contact Details & Location</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', textAlign: 'left' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }} className="grid-contact-mobile">
                  <div><label style={styles.formLabel}>Owner / Proprietor Name</label><input type="text" name="ownerName" value={contactContent.ownerName || ''} onChange={handleContactChange} style={styles.formInput} /></div>
                  <div><label style={styles.formLabel}>Phone Helpline</label><input type="text" name="phone" value={contactContent.phone || ''} onChange={handleContactChange} style={styles.formInput} /></div>
                  <div><label style={styles.formLabel}>Email Address</label><input type="email" name="email" value={contactContent.email || ''} onChange={handleContactChange} style={styles.formInput} /></div>
                  <div><label style={styles.formLabel}>Operating Hours</label><input type="text" name="hours" value={contactContent.hours || ''} onChange={handleContactChange} style={styles.formInput} /></div>
                </div>
                <div><label style={styles.formLabel}>Head Office Address</label><input type="text" name="address" value={contactContent.address || ''} onChange={handleContactChange} style={styles.formInput} /></div>
                <div>
                  <label style={styles.formLabel}>Google Maps Embed Link (src URL only)</label>
                  <textarea name="mapEmbedLink" rows={3} value={contactContent.mapEmbedLink || ''} onChange={handleContactChange} style={{ ...styles.formInput, resize: 'vertical' }} placeholder="https://www.google.com/maps/embed?..." />
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div style={styles.tabCard}>
              <h3 style={styles.tabTitle}>Social Links (Footer)</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', textAlign: 'left' }} className="grid-contact-mobile">
                <div><label style={styles.formLabel}>📸 Instagram URL</label><input type="text" name="instagram" value={contactContent.instagram || ''} onChange={handleContactChange} style={styles.formInput} placeholder="https://instagram.com/..." /></div>
                <div><label style={styles.formLabel}>📘 Facebook URL</label><input type="text" name="facebook" value={contactContent.facebook || ''} onChange={handleContactChange} style={styles.formInput} placeholder="https://facebook.com/..." /></div>
                <div><label style={styles.formLabel}>💬 WhatsApp Number URL</label><input type="text" name="whatsapp" value={contactContent.whatsapp || ''} onChange={handleContactChange} style={styles.formInput} placeholder="https://wa.me/918167520539" /></div>
                <div><label style={styles.formLabel}>✉️ Mail Link</label><input type="text" name="mailLink" value={contactContent.mailLink || ''} onChange={handleContactChange} style={styles.formInput} placeholder="mailto:..." /></div>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB: Our Partners / Team ── */}
        {activeTab === 'team' && (
          <div style={styles.tabCard}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={styles.tabTitle}>Our Partners — About Us Page</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>These cards appear in the "The People Behind Your Journey" section on the About Us page.</p>
              </div>
              {!isTeamFormOpen && (
                <button onClick={() => handleOpenTeamForm()} className="button-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.55rem 1.2rem', fontSize: '0.85rem' }}>
                  <Plus size={16} /> Add Member
                </button>
              )}
            </div>

            <AnimatePresence>
              {isTeamFormOpen && (
                <motion.form
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleTeamSubmit}
                  style={{ backgroundColor: 'var(--bg-sand-light)', padding: '1.75rem', borderRadius: '8px', border: '1px solid var(--border-light)', marginBottom: '2rem', textAlign: 'left' }}
                >
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--text-charcoal)', marginBottom: '1.25rem', fontWeight: 600 }}>
                    {teamEditIdx !== null ? 'Edit Team Member' : 'Add New Partner / Team Member'}
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="grid-contact-mobile">
                    <div><label style={styles.formLabel}>Name</label><input type="text" required value={teamForm.name} onChange={e => setTeamForm(p => ({ ...p, name: e.target.value }))} style={styles.formInput} placeholder="e.g. Amit Roy" /></div>
                    <div><label style={styles.formLabel}>Role / Title</label><input type="text" value={teamForm.role} onChange={e => setTeamForm(p => ({ ...p, role: e.target.value }))} style={styles.formInput} placeholder="e.g. Proprietor & Tour Organizer" /></div>
                    <div><label style={styles.formLabel}>Specialty Tag</label><input type="text" value={teamForm.specialty} onChange={e => setTeamForm(p => ({ ...p, specialty: e.target.value }))} style={styles.formInput} placeholder="e.g. Sikkim & Darjeeling" /></div>
                  </div>
                  <div style={{ marginTop: '1rem' }}>
                    <label style={styles.formLabel}>Description</label>
                    <textarea rows={3} value={teamForm.desc} onChange={e => setTeamForm(p => ({ ...p, desc: e.target.value }))} style={{ ...styles.formInput, resize: 'vertical' }} placeholder="Brief description about this member or entity..." />
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '1.25rem' }}>
                    <button type="submit" className="button-primary" style={{ padding: '0.55rem 1.2rem', fontSize: '0.85rem' }}>Save</button>
                    <button type="button" onClick={() => { setIsTeamFormOpen(false); setTeamEditIdx(null); }} style={{ padding: '0.55rem 1.2rem', backgroundColor: 'transparent', border: '1px solid var(--border-light)', borderRadius: '50px', cursor: 'pointer', fontWeight: 500, color: 'var(--text-charcoal)', fontSize: '0.85rem' }}>Cancel</button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {teamMembers.map((m, idx) => (
                <div key={idx} style={{ backgroundColor: 'var(--bg-sand-light)', borderRadius: '10px', padding: '1.5rem', border: '1px solid var(--border-light)', textAlign: 'left' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--accent-terracotta)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{m.specialty}</span>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-charcoal)', margin: '0.4rem 0 0.1rem' }}>{m.name}</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.75rem' }}>{m.role}</p>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1rem' }}>{m.desc}</p>
                  <div style={{ display: 'flex', gap: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-light)' }}>
                    <button onClick={() => handleOpenTeamForm(idx)} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', border: 'none', background: 'transparent', color: 'var(--accent-terracotta)', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem', padding: 0 }}><Edit2 size={13} /> Edit</button>
                    <button onClick={() => handleDeleteTeamMember(idx)} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', border: 'none', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem', padding: 0 }}><Trash2 size={13} /> Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB: Security ── */}
        {activeTab === 'security' && (
          <div style={styles.tabCard}>
            <h3 style={styles.tabTitle}>Change Admin Password</h3>
            <form onSubmit={handleChangePassword} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '480px', textAlign: 'left' }}>
              <div>
                <label style={styles.formLabel}>Current Password</label>
                <input type="password" value={pwOld} onChange={e => setPwOld(e.target.value)} style={styles.formInput} placeholder="Enter current password" required />
              </div>
              <div>
                <label style={styles.formLabel}>New Password</label>
                <input type="password" value={pwNew} onChange={e => setPwNew(e.target.value)} style={styles.formInput} placeholder="Enter new password (min 4 chars)" required />
              </div>
              <div>
                <label style={styles.formLabel}>Confirm New Password</label>
                <input type="password" value={pwConfirm} onChange={e => setPwConfirm(e.target.value)} style={styles.formInput} placeholder="Re-enter new password" required />
              </div>
              {pwMsg.text && (
                <div style={{ padding: '0.75rem 1rem', borderRadius: '6px', backgroundColor: pwMsg.ok ? '#dcfce7' : '#fee2e2', color: pwMsg.ok ? '#166534' : '#991b1b', fontSize: '0.88rem', fontWeight: 600 }}>
                  {pwMsg.text}
                </div>
              )}
              <button type="submit" className="button-primary" style={{ padding: '0.65rem 1.5rem', alignSelf: 'flex-start' }}>
                Update Password
              </button>
            </form>
          </div>
        )}

      </div>
    </section>
  );
}

const styles = {
  formLabel: {
    fontSize: '0.75rem',
    fontWeight: 700,
    display: 'block',
    marginBottom: '0.4rem',
    color: 'var(--text-charcoal)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  formInput: {
    width: '100%',
    padding: '0.75rem 1rem',
    border: '1px solid var(--border-light)',
    borderRadius: '6px',
    backgroundColor: 'var(--bg-alabaster)',
    color: 'var(--text-charcoal)',
    fontFamily: 'var(--font-sans)',
    fontSize: '0.92rem',
    boxSizing: 'border-box'
  },
  tabCard: {
    backgroundColor: 'var(--bg-sand-light)',
    padding: '2rem',
    borderRadius: '12px',
    border: '1px solid var(--border-light)'
  },
  tabTitle: {
    fontFamily: 'var(--font-serif)',
    fontSize: '1.35rem',
    color: 'var(--text-charcoal)',
    marginBottom: '1.5rem',
    fontWeight: 500
  },
  td: {
    padding: '0.65rem 0.5rem',
    color: 'var(--text-charcoal)',
    verticalAlign: 'middle',
    fontSize: '0.85rem'
  },
  actionBtn: (color) => ({
    border: 'none',
    background: 'transparent',
    color,
    cursor: 'pointer',
    padding: '0.25rem',
    marginRight: '0.25rem'
  })
};
