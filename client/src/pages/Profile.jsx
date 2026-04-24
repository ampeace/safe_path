import React from 'react';
import { ArrowLeft, User as UserIcon, Phone, MapPin, LogOut, Sun, Moon } from 'lucide-react';
import './Profile.css';

const Profile = ({ onNavigateToHome, onLogout, isDarkMode, toggleTheme }) => {
  // Mock user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 8900",
    bloodGroup: "O+"
  };

  const emergencyContacts = [
    { name: "Jane Doe", relation: "Spouse", phone: "+1 987 654 3210" },
    { name: "Robert Smith", relation: "Brother", phone: "+1 555 123 4567" }
  ];

  return (
    <div className="profile-container fade-in-app">
      <nav className="glass-panel navbar">
        <div className="nav-brand" style={{ cursor: 'pointer' }} onClick={onNavigateToHome}>
          Safe<span className="brand-accent">Path</span>
        </div>
        <div style={{ display: 'flex', gap: '1rem', marginLeft: 'auto' }}>
          <button className="auth-submit-btn nav-btn" onClick={toggleTheme} style={{ background: 'transparent', border: '1px solid var(--text-secondary)', color: 'var(--text-primary)' }}>
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="auth-submit-btn nav-btn btn-danger" onClick={onLogout} title="Log Out">
            <LogOut size={18} />
          </button>
        </div>
      </nav>

      <div className="profile-layout">
        <button className="back-btn" onClick={onNavigateToHome}>
          <ArrowLeft size={20} /> Back to Dashboard
        </button>
        
        {/* Golden Ratio Layout Container */}
        <div className="golden-ratio-container">
          
          {/* Minor Section: User Details (1 part) */}
          <section className="profile-sidebar glass-panel">
            <div className="avatar-section">
              <div className="avatar-placeholder">
                <UserIcon size={64} />
              </div>
              <h2>{user.name}</h2>
              <p className="text-secondary">{user.email}</p>
            </div>
            
            <div className="user-details">
              <div className="detail-item">
                <Phone size={18} className="text-brand" />
                <span>{user.phone}</span>
              </div>
              <div className="detail-item">
                <MapPin size={18} className="text-brand" />
                <span>Primary Location set</span>
              </div>
              <div className="detail-item blood-group">
                <strong>Blood Group:</strong> <span>{user.bloodGroup}</span>
              </div>
            </div>
            
            <button className="auth-submit-btn edit-btn">Edit Profile</button>
          </section>

          {/* Major Section: Emergency Contacts & Info (1.618 parts) */}
          <section className="profile-main glass-panel">
            <div className="section-header">
              <h2>Emergency Contacts</h2>
              <button className="add-contact-btn">+ Add New</button>
            </div>
            
            <div className="contacts-list">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="contact-card">
                  <div className="contact-info">
                    <h3>{contact.name}</h3>
                    <span className="relation-badge">{contact.relation}</span>
                  </div>
                  <div className="contact-action">
                    <a href={`tel:${contact.phone}`} className="call-btn">
                      <Phone size={16} /> Call
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="section-header" style={{ marginTop: '2rem' }}>
              <h2>Saved Safe Routes</h2>
            </div>
            <div className="saved-routes-placeholder">
              <p className="text-secondary">No saved routes yet. Plan a route on the dashboard to save it.</p>
            </div>
          </section>
          
        </div>
      </div>
    </div>
  );
};

export default Profile;
