import React, { useState } from 'react';
import { 
  Bell, Search, User, Settings, HelpCircle, 
  Menu, X, ChevronDown, Calendar, Clock,
  Shield, Zap, Sparkles, Crown, Globe
} from 'lucide-react';

export default function AdminTopNavbar({ activeTab }) {
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Sample notifications
  const notifications = [
    { id: 1, title: "New student registered", time: "5 min ago", read: false },
    { id: 2, title: "Zoho drive updated", time: "1 hour ago", read: false },
    { id: 3, title: "Mock test results published", time: "3 hours ago", read: true },
    { id: 4, title: "System update completed", time: "5 hours ago", read: true },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header 
      className="sticky-top d-flex justify-content-between align-items-center shadow-2xl"
      style={{ 
        zIndex: 999,
        background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #0f0f1a 100%)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        backdropFilter: 'blur(20px)',
        padding: '0.75rem 1.5rem',
        minHeight: '64px'
      }}
    >
      {/* Left Section */}
      <div className="d-flex align-items-center gap-3">
        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="d-md-none btn btn-sm p-1 rounded-3 text-secondary hover:text-white transition-all"
          style={{ 
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.05)',
            width: '36px',
            height: '36px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
            e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
          }}
        >
          {isMobileMenuOpen ? (
            <X style={{ width: '1rem', height: '1rem' }} />
          ) : (
            <Menu style={{ width: '1rem', height: '1rem' }} />
          )}
        </button>

        {/* Module Info */}
        <div className="d-flex align-items-center gap-2">
          <div className="p-1.5 rounded-3 d-none d-sm-flex" style={{ 
            background: 'rgba(59, 130, 246, 0.1)',
            border: '1px solid rgba(59, 130, 246, 0.2)'
          }}>
            <Shield className="text-primary" style={{ width: '0.9rem', height: '0.9rem' }} />
          </div>
          <h6 className="text-secondary text-uppercase fw-bold m-0" style={{ 
            fontSize: '0.6rem', 
            letterSpacing: '0.1em',
            fontWeight: '700'
          }}>
            
          </h6>
          <span 
            className="badge text-uppercase px-3 py-1.5 shadow-lg"
            style={{ 
              fontSize: '0.6rem',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              color: '#ffffff',
              borderRadius: '20px',
              boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)',
              letterSpacing: '0.05em'
            }}
          >
            {activeTab}
            <span className="d-inline-block ms-1">
              <Sparkles style={{ width: '0.6rem', height: '0.6rem' }} />
            </span>
          </span>
        </div>
      </div>

      {/* Right Section */}
      <div className="d-flex align-items-center gap-2">
        {/* Search Button */}
        <button 
          onClick={() => setShowSearch(!showSearch)}
          className="btn btn-sm p-2 rounded-3 text-secondary hover:text-white transition-all d-none d-sm-flex"
          style={{ 
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.05)',
            width: '36px',
            height: '36px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
            e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
          }}
        >
          <Search style={{ width: '0.9rem', height: '0.9rem' }} />
        </button>

        {/* Search Bar - Expanded */}
        {showSearch && (
          <div className="d-flex align-items-center gap-2 px-3 py-1.5 rounded-3 animate-slide-in" style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            maxWidth: '200px',
            transition: 'all 0.3s ease'
          }}>
            <Search className="text-secondary" style={{ width: '0.8rem', height: '0.8rem' }} />
            <input 
              type="text" 
              className="form-control form-control-sm bg-transparent border-0 text-light" 
              placeholder="Search..." 
              style={{ fontSize: '0.7rem', width: '120px' }}
              autoFocus
            />
          </div>
        )}

        {/* Notifications */}
        <div className="position-relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="btn btn-sm p-2 rounded-3 text-secondary hover:text-white transition-all position-relative"
            style={{ 
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.05)',
              width: '36px',
              height: '36px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
              e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
            }}
          >
            <Bell style={{ width: '0.9rem', height: '0.9rem' }} />
            {unreadCount > 0 && (
              <span className="position-absolute top-0 end-0 translate-middle badge rounded-pill bg-danger" style={{ 
                fontSize: '0.45rem',
                padding: '0.15rem 0.4rem',
                boxShadow: '0 4px 10px rgba(239, 68, 68, 0.3)',
                animation: 'pulse-badge 2s ease-in-out infinite'
              }}>
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div 
              className="position-absolute end-0 mt-2 p-2 rounded-3 shadow-2xl animate-slide-down"
              style={{
                width: '320px',
                background: 'rgba(15, 23, 42, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.05)',
                maxHeight: '400px',
                overflowY: 'auto',
                zIndex: 1000
              }}
            >
              <div className="d-flex justify-content-between align-items-center px-2 py-2 border-bottom" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                <span className="text-light fw-bold" style={{ fontSize: '0.65rem' }}>Notifications</span>
                <span className="text-secondary" style={{ fontSize: '0.5rem', cursor: 'pointer' }}>Mark all read</span>
              </div>
              {notifications.map(notif => (
                <div 
                  key={notif.id} 
                  className="d-flex gap-2 p-2 rounded-2 mt-1 transition-all hover-bg-light"
                  style={{ 
                    background: notif.read ? 'transparent' : 'rgba(59, 130, 246, 0.05)',
                    cursor: 'pointer',
                    borderLeft: notif.read ? '2px solid transparent' : '2px solid #3b82f6'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = notif.read ? 'transparent' : 'rgba(59, 130, 246, 0.05)';
                  }}
                >
                  <div className="flex-grow-1">
                    <span className="text-light" style={{ fontSize: '0.65rem' }}>{notif.title}</span>
                    <span className="text-secondary d-block" style={{ fontSize: '0.5rem' }}>
                      <Clock className="me-1" style={{ width: '0.5rem', height: '0.5rem' }} />
                      {notif.time}
                    </span>
                  </div>
                  {!notif.read && (
                    <span className="rounded-circle bg-primary mt-1" style={{ width: '6px', height: '6px' }}></span>
                  )}
                </div>
              ))}
              <div className="text-center pt-2 border-top" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                <span className="text-secondary" style={{ fontSize: '0.5rem', cursor: 'pointer' }}>View all notifications</span>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="position-relative">
          <button 
            onClick={() => setShowProfile(!showProfile)}
            className="d-flex align-items-center gap-2 btn btn-sm p-1 rounded-3 transition-all"
            style={{ 
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.05)',
              padding: '0.2rem 0.5rem 0.2rem 0.2rem'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
              e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
            }}
          >
            <div className="d-flex align-items-center justify-content-center rounded-circle" style={{
              width: '28px',
              height: '28px',
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              fontSize: '0.6rem',
              fontWeight: 'bold',
              color: '#fff'
            }}>
              A
            </div>
            <span className="text-light d-none d-sm-inline" style={{ fontSize: '0.6rem', fontWeight: '500' }}>Admin</span>
            <ChevronDown className="text-secondary" style={{ width: '0.7rem', height: '0.7rem' }} />
          </button>

          {/* Profile Dropdown */}
          {showProfile && (
            <div 
              className="position-absolute end-0 mt-2 p-2 rounded-3 shadow-2xl animate-slide-down"
              style={{
                width: '220px',
                background: 'rgba(15, 23, 42, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.05)',
                zIndex: 1000
              }}
            >
              <div className="text-center p-2 border-bottom" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                <div className="d-flex align-items-center justify-content-center rounded-circle mx-auto" style={{
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                  color: '#fff'
                }}>
                  A
                </div>
                <span className="text-light d-block" style={{ fontSize: '0.7rem', fontWeight: '600' }}>System Root Admin</span>
                <span className="text-secondary" style={{ fontSize: '0.5rem' }}>admin@system.edu</span>
              </div>
              <div className="mt-1">
                {[
                  { icon: User, label: 'My Profile' },
                  { icon: Settings, label: 'Settings' },
                  { icon: HelpCircle, label: 'Help' },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <button 
                      key={i}
                      className="w-100 d-flex align-items-center gap-2 p-2 rounded-2 transition-all hover-bg-light"
                      style={{ 
                        background: 'transparent',
                        border: 'none',
                        color: '#94a3b8',
                        fontSize: '0.6rem'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                        e.currentTarget.style.color = '#ffffff';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = '#94a3b8';
                      }}
                    >
                      <Icon style={{ width: '0.8rem', height: '0.8rem' }} />
                      {item.label}
                    </button>
                  );
                })}
              </div>
              <div className="border-top mt-1 pt-1" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                <button 
                  className="w-100 d-flex align-items-center gap-2 p-2 rounded-2 transition-all"
                  style={{ 
                    background: 'transparent',
                    border: 'none',
                    color: '#f87171',
                    fontSize: '0.6rem'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <LogOut style={{ width: '0.8rem', height: '0.8rem' }} />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Status Badges */}
        <div className="d-none d-lg-flex align-items-center gap-2">
          <span 
            className="badge px-3 py-1.5 rounded-pill"
            style={{ 
              fontSize: '0.5rem',
              fontWeight: '600',
              background: 'rgba(34, 197, 94, 0.1)',
              color: '#4ade80',
              border: '1px solid rgba(34, 197, 94, 0.2)'
            }}
          >
            <span className="d-inline-block rounded-circle bg-success me-1" style={{ width: '0.35rem', height: '0.35rem' }}></span>
            Online
          </span>
          <span 
            className="badge px-3 py-1.5 rounded-pill"
            style={{ 
              fontSize: '0.5rem',
              fontWeight: '600',
              background: 'rgba(255,255,255,0.03)',
              color: '#94a3b8',
              border: '1px solid rgba(255,255,255,0.05)'
            }}
          >
            <Crown className="me-1" style={{ width: '0.6rem', height: '0.6rem' }} />
            Admin
          </span>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes pulse-badge {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        .animate-slide-down {
          animation: slide-down 0.2s ease-out forwards;
        }
        
        .animate-slide-in {
          animation: slide-in 0.2s ease-out forwards;
        }
        
        .transition-all {
          transition: all 0.3s ease;
        }
        
        .hover-bg-light:hover {
          background: rgba(255,255,255,0.03) !important;
        }
        
        /* Scrollbar for notifications */
        .overflow-y-auto::-webkit-scrollbar {
          width: 3px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.02);
          border-radius: 10px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.3);
          border-radius: 10px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.5);
        }
        
        /* Form control focus */
        .form-control:focus {
          border-color: rgba(59, 130, 246, 0.5) !important;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
          outline: none !important;
        }
      `}</style>
    </header>
  );
}