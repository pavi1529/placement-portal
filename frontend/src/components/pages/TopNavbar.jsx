import React, { useState, useEffect } from 'react';
import { 
  Menu, User, Bell, Settings, LogOut, 
  Search, Sparkles, Shield,
  ChevronDown, X
} from 'lucide-react';

export default function TopNavbar({ 
  activeTab, 
  sidebarOpen, 
  setSidebarOpen, 
  onLogout,
  studentName = 'Student',
  notifications = 0
}) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning ☀️';
    if (hour < 17) return 'Good Afternoon 🌤️';
    return 'Good Evening 🌙';
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showProfileMenu) setShowProfileMenu(false);
      if (showNotifications) setShowNotifications(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showProfileMenu, showNotifications]);

  return (
    <header 
      className="border-bottom p-2 p-md-3 d-flex justify-content-between align-items-center sticky-top"
      style={{ 
        zIndex: 999,
        background: 'linear-gradient(90deg, #1a237e, #283593, #303f9f, #3949ab)',
        borderColor: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(20px)',
        minHeight: '60px'
      }}
    >
      {/* LEFT SECTION */}
      <div className="d-flex align-items-center gap-2 gap-md-3 flex-shrink-0">
        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)} 
          className="d-md-none btn btn-sm p-2 rounded-3 text-white"
          style={{ 
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.15)',
            transition: 'all 0.3s ease',
            color: '#ffffff',
            width: '38px',
            height: '38px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        {/* Brand / Title - Mobile */}
        <div className="d-flex d-md-none align-items-center gap-2">
          <div className="p-1 rounded-3" style={{ 
            background: 'rgba(255,255,255,0.15)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <Sparkles size={14} color="#ffffff" />
          </div>
          <span className="text-white fw-bold" style={{ fontSize: '0.75rem' }}>
            Student Portal
          </span>
        </div>

        {/* Brand - Desktop */}
        <div className="d-none d-md-flex align-items-center gap-2">
          <div className="p-1.5 rounded-3" style={{ 
            background: 'rgba(255,255,255,0.15)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <Sparkles size={14} color="#ffffff" />
          </div>
          <h6 className="text-white text-uppercase fw-bold m-0" style={{ fontSize: '0.6rem', letterSpacing: '0.05em', opacity: 0.9 }}>
            Student Module
          </h6>
        </div>

        {/* Active Tab Badge - Hide on mobile */}
        <span 
          className="badge text-uppercase px-3 py-2 shadow-sm d-none d-sm-inline-block"
          style={{ 
            fontSize: '0.55rem',
            fontWeight: '600',
            background: 'rgba(255,255,255,0.2)',
            color: '#ffffff',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            letterSpacing: '0.03em',
            border: '1px solid rgba(255,255,255,0.15)'
          }}
        >
          {activeTab}
        </span>

        {/* Greeting - Desktop */}
        <div className="d-none d-lg-flex align-items-center gap-2">
          <span className="text-white" style={{ fontSize: '0.6rem', opacity: 0.8 }}>
            {getGreeting()}
          </span>
          <span className="text-white fw-bold" style={{ fontSize: '0.6rem' }}>
            {studentName}
          </span>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="d-flex align-items-center gap-1 gap-md-2 flex-shrink-0">
        {/* Search Bar - Desktop */}
        <div className="d-none d-md-flex align-items-center gap-2 px-3 py-1.5 rounded-3" style={{ 
          background: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.15)',
          transition: 'all 0.3s ease',
          maxWidth: '180px'
        }}>
          <Search size={14} style={{ opacity: 0.7, color: '#ffffff' }} />
          <input 
            type="text" 
            className="form-control form-control-sm bg-transparent border-0 text-white p-0"
            placeholder="Search..."
            style={{ 
              fontSize: '0.65rem', 
              outline: 'none',
              color: '#ffffff',
              width: '100px'
            }}
          />
        </div>

        {/* Search Button - Mobile */}
        <button 
          onClick={() => setSearchOpen(!searchOpen)}
          className="d-md-none btn btn-sm p-2 rounded-3 text-white"
          style={{ 
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.15)',
            width: '38px',
            height: '38px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Search size={16} color="#ffffff" />
        </button>

        {/* Mobile Search Bar - Expandable */}
        {searchOpen && isMobile && (
          <div 
            className="position-absolute top-100 start-0 end-0 p-2"
            style={{ 
              zIndex: 1000,
              background: 'rgba(26,35,126,0.95)',
              backdropFilter: 'blur(10px)',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              animation: 'slideDown 0.2s ease-out'
            }}
          >
            <div className="d-flex align-items-center gap-2 px-3 py-2 rounded-3" style={{ 
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.15)'
            }}>
              <Search size={16} style={{ opacity: 0.7, color: '#ffffff' }} />
              <input 
                type="text" 
                className="form-control bg-transparent border-0 text-white p-0"
                placeholder="Search..."
                autoFocus
                style={{ 
                  fontSize: '0.9rem', 
                  outline: 'none',
                  color: '#ffffff'
                }}
              />
              <button 
                onClick={() => setSearchOpen(false)}
                className="btn btn-sm p-1 text-white"
                style={{ background: 'transparent', border: 'none' }}
              >
                <X size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Online Status - Hide on mobile */}
        <div className="d-none d-lg-flex align-items-center gap-1 px-2 py-1 rounded-3" style={{ 
          background: 'rgba(34, 197, 94, 0.15)',
          border: '1px solid rgba(34, 197, 94, 0.25)'
        }}>
          <span className="d-inline-block rounded-circle bg-success" style={{ width: '0.35rem', height: '0.35rem', animation: 'pulse 2s infinite' }}></span>
          <span className="text-white" style={{ fontSize: '0.5rem', fontWeight: '600' }}>Online</span>
        </div>

        {/* Notifications */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setShowNotifications(!showNotifications);
            setShowProfileMenu(false);
          }}
          className="btn btn-sm p-2 rounded-3 position-relative text-white"
          style={{ 
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.15)',
            transition: 'all 0.3s ease',
            width: '38px',
            height: '38px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Bell size={16} color="#ffffff" />
          {notifications > 0 && (
            <span className="position-absolute top-0 end-0 translate-middle badge rounded-circle bg-danger p-1" style={{ fontSize: '0.5rem', minWidth: '0.8rem' }}>
              {notifications > 9 ? '9+' : notifications}
            </span>
          )}
        </button>

        {/* Notifications Dropdown */}
        {showNotifications && (
          <div 
            className="position-absolute top-100 end-0 mt-2 p-2 rounded-3 shadow-lg"
            style={{ 
              minWidth: 'clamp(280px, 80vw, 320px)',
              maxHeight: '400px',
              overflowY: 'auto',
              background: 'rgba(20,20,30,0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.05)',
              zIndex: 1000,
              animation: 'slideDown 0.2s ease-out',
              right: '10px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-3 py-2 border-bottom d-flex justify-content-between align-items-center" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
              <span className="text-light fw-bold" style={{ fontSize: '0.75rem' }}>Notifications</span>
              <span className="text-secondary" style={{ fontSize: '0.55rem', cursor: 'pointer' }}>Mark all read</span>
            </div>
            <div className="p-2">
              {[1, 2, 3].map((item) => (
                <div key={item} className="d-flex align-items-center gap-2 p-2 rounded-3" style={{ 
                  background: 'rgba(255,255,255,0.03)',
                  marginBottom: '0.3rem'
                }}>
                  <div className="rounded-circle p-1" style={{ background: 'rgba(79,70,229,0.2)' }}>
                    <Bell size={12} color="#818cf8" />
                  </div>
                  <div className="flex-grow-1">
                    <div className="text-light" style={{ fontSize: '0.7rem' }}>
                      New job posted: {item === 1 ? 'Google' : item === 2 ? 'Microsoft' : 'Amazon'}
                    </div>
                    <div className="text-secondary" style={{ fontSize: '0.55rem' }}>
                      {item === 1 ? '2 hours ago' : item === 2 ? '5 hours ago' : '1 day ago'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Profile */}
        <div className="position-relative">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="d-flex align-items-center gap-1 gap-md-2 btn p-1 rounded-3 text-white"
            style={{ 
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.15)',
              transition: 'all 0.3s ease',
              padding: '0.15rem 0.4rem 0.15rem 0.15rem'
            }}
          >
            <div className="d-flex align-items-center justify-content-center rounded-circle" style={{
              width: 'clamp(30px, 5vw, 36px)',
              height: 'clamp(30px, 5vw, 36px)',
              background: 'rgba(255,255,255,0.2)',
              fontSize: 'clamp(0.6rem, 1.5vw, 0.75rem)',
              fontWeight: 'bold',
              color: '#ffffff',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              {studentName?.charAt(0) || 'S'}
            </div>
            <div className="d-none d-sm-block text-start">
              <span className="text-white d-block" style={{ fontSize: 'clamp(0.5rem, 1.2vw, 0.6rem)', fontWeight: '500', lineHeight: '1.2' }}>
                {studentName.length > 12 ? studentName.substring(0, 12) + '...' : studentName}
              </span>
              <span className="text-white" style={{ fontSize: '0.45rem', lineHeight: '1.2', opacity: 0.7 }}>
                Student
              </span>
            </div>
            <ChevronDown size={14} style={{ opacity: 0.7, color: '#ffffff' }} />
          </button>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div 
              className="position-absolute top-100 end-0 mt-2 p-2 rounded-3 shadow-lg"
              style={{ 
                minWidth: 'clamp(200px, 60vw, 220px)',
                background: 'rgba(20,20,30,0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.05)',
                zIndex: 1000,
                animation: 'slideDown 0.2s ease-out'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-3 py-2 border-bottom" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                <span className="text-light fw-bold d-block" style={{ fontSize: '0.75rem' }}>{studentName}</span>
                <span className="text-secondary" style={{ fontSize: '0.55rem' }}>Student Account</span>
              </div>
              <button 
                className="w-100 d-flex align-items-center gap-2 px-3 py-2 rounded-3 btn btn-sm text-start"
                style={{ 
                  background: 'transparent',
                  border: 'none',
                  color: '#94a3b8',
                  transition: 'all 0.2s ease',
                  fontSize: '0.7rem'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <User size={14} color="#94a3b8" />
                <span>Profile</span>
              </button>
              <button 
                className="w-100 d-flex align-items-center gap-2 px-3 py-2 rounded-3 btn btn-sm text-start"
                style={{ 
                  background: 'transparent',
                  border: 'none',
                  color: '#94a3b8',
                  transition: 'all 0.2s ease',
                  fontSize: '0.7rem'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <Settings size={14} color="#94a3b8" />
                <span>Settings</span>
              </button>
              <button 
                className="w-100 d-flex align-items-center gap-2 px-3 py-2 rounded-3 btn btn-sm text-start"
                style={{ 
                  background: 'transparent',
                  border: 'none',
                  color: '#f87171',
                  transition: 'all 0.2s ease',
                  fontSize: '0.7rem'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                onClick={onLogout}
              >
                <LogOut size={14} color="#f87171" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>

        {/* Role Badge - Hide on mobile */}
        <span className="badge bg-white text-dark border border-white rounded-pill px-3 py-2 d-none d-lg-flex align-items-center" style={{ fontSize: '0.5rem', fontWeight: 'bold' }}>
          <Shield size={10} style={{ marginRight: '0.3rem', color: '#000' }} />
          Student
        </span>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .form-control:focus {
          box-shadow: none !important;
          outline: none !important;
        }
        
        .form-control::placeholder {
          color: rgba(255,255,255,0.5) !important;
        }

        /* Custom scrollbar for dropdown */
        ::-webkit-scrollbar {
          width: 3px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.15);
          border-radius: 10px;
        }
      `}</style>
    </header>
  );
}