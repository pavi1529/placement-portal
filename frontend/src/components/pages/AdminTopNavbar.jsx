import React, { useState } from 'react';
import { 
  Bell, Search, User, Settings, HelpCircle, 
  Menu, X, ChevronDown, Calendar, Clock,
  Shield, Zap, Sparkles, Crown, Globe, LogOut
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
        padding: 'clamp(0.5rem, 1.5vh, 0.75rem) clamp(0.75rem, 2vw, 1.5rem)',
        minHeight: 'clamp(56px, 8vh, 64px)'
      }}
    >
      {/* Left Section */}
      <div className="d-flex align-items-center gap-2 gap-md-3">
        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="d-md-none btn btn-sm p-1 rounded-3 text-secondary hover:text-white transition-all"
          style={{ 
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.05)',
            width: 'clamp(32px, 5vw, 36px)',
            height: 'clamp(32px, 5vw, 36px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
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
            <X style={{ width: 'clamp(0.9rem, 1.5vw, 1rem)', height: 'clamp(0.9rem, 1.5vw, 1rem)' }} />
          ) : (
            <Menu style={{ width: 'clamp(0.9rem, 1.5vw, 1rem)', height: 'clamp(0.9rem, 1.5vw, 1rem)' }} />
          )}
        </button>

        {/* Module Info */}
        <div className="d-flex align-items-center gap-2">
          <div className="p-1 p-md-1.5 rounded-3 d-none d-sm-flex" style={{ 
            background: 'rgba(59, 130, 246, 0.1)',
            border: '1px solid rgba(59, 130, 246, 0.2)'
          }}>
            <Shield className="text-primary" style={{ 
              width: 'clamp(0.7rem, 1.2vw, 0.9rem)', 
              height: 'clamp(0.7rem, 1.2vw, 0.9rem)' 
            }} />
          </div>
          <h6 className="text-secondary text-uppercase fw-bold m-0 d-none d-sm-block" style={{ 
            fontSize: 'clamp(0.45rem, 0.7vw, 0.6rem)', 
            letterSpacing: '0.1em',
            fontWeight: '700'
          }}>
            Admin
          </h6>
          <span 
            className="badge text-uppercase px-2 px-md-3 py-1 py-md-1.5 shadow-lg"
            style={{ 
              fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              color: '#ffffff',
              borderRadius: '20px',
              boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)',
              letterSpacing: '0.05em',
              whiteSpace: 'nowrap'
            }}
          >
            <span className="d-none d-sm-inline">{activeTab}</span>
            <span className="d-sm-none">{activeTab.substring(0, 3)}</span>
            <span className="d-inline-block ms-1">
              <Sparkles style={{ 
                width: 'clamp(0.5rem, 0.8vw, 0.6rem)', 
                height: 'clamp(0.5rem, 0.8vw, 0.6rem)' 
              }} />
            </span>
          </span>
        </div>
      </div>

      {/* Right Section */}
      <div className="d-flex align-items-center gap-1 gap-md-2">
        {/* Search Button */}
        <button 
          onClick={() => setShowSearch(!showSearch)}
          className="btn btn-sm p-1 p-md-2 rounded-3 text-secondary hover:text-white transition-all d-none d-sm-flex"
          style={{ 
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.05)',
            width: 'clamp(30px, 5vw, 36px)',
            height: 'clamp(30px, 5vw, 36px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
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
          <Search style={{ 
            width: 'clamp(0.8rem, 1.2vw, 0.9rem)', 
            height: 'clamp(0.8rem, 1.2vw, 0.9rem)' 
          }} />
        </button>

        {/* Search Bar - Expanded */}
        {showSearch && (
          <div className="d-flex align-items-center gap-2 px-2 px-md-3 py-1 py-md-1.5 rounded-3 animate-slide-in" style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            maxWidth: 'clamp(140px, 40vw, 200px)',
            transition: 'all 0.3s ease'
          }}>
            <Search className="text-secondary" style={{ 
              width: 'clamp(0.7rem, 1vw, 0.8rem)', 
              height: 'clamp(0.7rem, 1vw, 0.8rem)' 
            }} />
            <input 
              type="text" 
              className="form-control form-control-sm bg-transparent border-0 text-light" 
              placeholder="Search..." 
              style={{ 
                fontSize: 'clamp(0.6rem, 0.9vw, 0.7rem)', 
                width: 'clamp(80px, 25vw, 120px)',
                padding: '0.1rem 0'
              }}
              autoFocus
            />
          </div>
        )}

        {/* Notifications */}
        <div className="position-relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="btn btn-sm p-1 p-md-2 rounded-3 text-secondary hover:text-white transition-all position-relative"
            style={{ 
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.05)',
              width: 'clamp(30px, 5vw, 36px)',
              height: 'clamp(30px, 5vw, 36px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
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
            <Bell style={{ 
              width: 'clamp(0.8rem, 1.2vw, 0.9rem)', 
              height: 'clamp(0.8rem, 1.2vw, 0.9rem)' 
            }} />
            {unreadCount > 0 && (
              <span className="position-absolute top-0 end-0 translate-middle badge rounded-pill bg-danger" style={{ 
                fontSize: 'clamp(0.35rem, 0.6vw, 0.45rem)',
                padding: 'clamp(0.1rem, 0.2vw, 0.15rem) clamp(0.3rem, 0.5vw, 0.4rem)',
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
                width: 'clamp(280px, 85vw, 320px)',
                maxWidth: '95vw',
                background: 'rgba(15, 23, 42, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.05)',
                maxHeight: '400px',
                overflowY: 'auto',
                zIndex: 1000,
                right: '0'
              }}
            >
              <div className="d-flex flex-wrap justify-content-between align-items-center px-2 py-2 border-bottom" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                <span className="text-light fw-bold" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>Notifications</span>
                <span className="text-secondary" style={{ fontSize: 'clamp(0.4rem, 0.7vw, 0.5rem)', cursor: 'pointer' }}>Mark all read</span>
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
                  <div className="flex-grow-1 min-w-0">
                    <span className="text-light" style={{ fontSize: 'clamp(0.55rem, 0.8vw, 0.65rem)' }}>{notif.title}</span>
                    <span className="text-secondary d-flex align-items-center" style={{ fontSize: 'clamp(0.4rem, 0.6vw, 0.5rem)' }}>
                      <Clock className="me-1" style={{ width: 'clamp(0.4rem, 0.6vw, 0.5rem)', height: 'clamp(0.4rem, 0.6vw, 0.5rem)' }} />
                      {notif.time}
                    </span>
                  </div>
                  {!notif.read && (
                    <span className="rounded-circle bg-primary mt-1 flex-shrink-0" style={{ width: '6px', height: '6px' }}></span>
                  )}
                </div>
              ))}
              <div className="text-center pt-2 border-top" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                <span className="text-secondary" style={{ fontSize: 'clamp(0.4rem, 0.6vw, 0.5rem)', cursor: 'pointer' }}>View all notifications</span>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="position-relative">
          <button 
            onClick={() => setShowProfile(!showProfile)}
            className="d-flex align-items-center gap-1 gap-md-2 btn btn-sm p-1 rounded-3 transition-all"
            style={{ 
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.05)',
              padding: 'clamp(0.1rem, 0.3vw, 0.2rem) clamp(0.3rem, 0.8vw, 0.5rem) clamp(0.1rem, 0.3vw, 0.2rem) clamp(0.15rem, 0.3vw, 0.2rem)'
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
            <div className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0" style={{
              width: 'clamp(24px, 4vw, 28px)',
              height: 'clamp(24px, 4vw, 28px)',
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)',
              fontWeight: 'bold',
              color: '#fff'
            }}>
              A
            </div>
            <span className="text-light d-none d-sm-inline" style={{ 
              fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)', 
              fontWeight: '500' 
            }}>Admin</span>
            <ChevronDown className="text-secondary flex-shrink-0" style={{ 
              width: 'clamp(0.6rem, 1vw, 0.7rem)', 
              height: 'clamp(0.6rem, 1vw, 0.7rem)' 
            }} />
          </button>

          {/* Profile Dropdown */}
          {showProfile && (
            <div 
              className="position-absolute end-0 mt-2 p-2 rounded-3 shadow-2xl animate-slide-down"
              style={{
                width: 'clamp(180px, 60vw, 220px)',
                background: 'rgba(15, 23, 42, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.05)',
                zIndex: 1000,
                right: '0'
              }}
            >
              <div className="text-center p-2 border-bottom" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                <div className="d-flex align-items-center justify-content-center rounded-circle mx-auto" style={{
                  width: 'clamp(36px, 6vw, 40px)',
                  height: 'clamp(36px, 6vw, 40px)',
                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                  fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)',
                  fontWeight: 'bold',
                  color: '#fff'
                }}>
                  A
                </div>
                <span className="text-light d-block" style={{ 
                  fontSize: 'clamp(0.6rem, 1vw, 0.7rem)', 
                  fontWeight: '600' 
                }}>System Root Admin</span>
                <span className="text-secondary" style={{ 
                  fontSize: 'clamp(0.4rem, 0.6vw, 0.5rem)' 
                }}>admin@system.edu</span>
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
                        fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)',
                        textAlign: 'left'
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
                      <Icon style={{ 
                        width: 'clamp(0.7rem, 1vw, 0.8rem)', 
                        height: 'clamp(0.7rem, 1vw, 0.8rem)' 
                      }} />
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
                    fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)',
                    textAlign: 'left'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <LogOut style={{ 
                    width: 'clamp(0.7rem, 1vw, 0.8rem)', 
                    height: 'clamp(0.7rem, 1vw, 0.8rem)' 
                  }} />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Status Badges - Hide on mobile/tablet */}
        <div className="d-none d-xl-flex align-items-center gap-2">
          <span 
            className="badge px-2 px-md-3 py-1 py-md-1.5 rounded-pill"
            style={{ 
              fontSize: 'clamp(0.4rem, 0.6vw, 0.5rem)',
              fontWeight: '600',
              background: 'rgba(34, 197, 94, 0.1)',
              color: '#4ade80',
              border: '1px solid rgba(34, 197, 94, 0.2)'
            }}
          >
            <span className="d-inline-block rounded-circle bg-success me-1" style={{ 
              width: 'clamp(0.25rem, 0.4vw, 0.35rem)', 
              height: 'clamp(0.25rem, 0.4vw, 0.35rem)' 
            }}></span>
            Online
          </span>
          <span 
            className="badge px-2 px-md-3 py-1 py-md-1.5 rounded-pill d-none d-lg-inline-block"
            style={{ 
              fontSize: 'clamp(0.4rem, 0.6vw, 0.5rem)',
              fontWeight: '600',
              background: 'rgba(255,255,255,0.03)',
              color: '#94a3b8',
              border: '1px solid rgba(255,255,255,0.05)'
            }}
          >
            <Crown className="me-1" style={{ 
              width: 'clamp(0.5rem, 0.8vw, 0.6rem)', 
              height: 'clamp(0.5rem, 0.8vw, 0.6rem)' 
            }} />
            Admin
          </span>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-md-none"
          style={{ zIndex: 998 }}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* CSS Animations */}
      <style>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
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

        .min-w-0 {
          min-width: 0;
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
        
        .form-control:focus {
          border-color: rgba(59, 130, 246, 0.5) !important;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
          outline: none !important;
        }

        @media (max-width: 576px) {
          .shadow-2xl {
            box-shadow: 0 4px 20px rgba(0,0,0,0.4) !important;
          }
        }
      `}</style>
    </header>
  );
}