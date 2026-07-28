import React from 'react';
import { 
  Menu, User, Bell, Settings, LogOut, 
  Search, Sparkles, Shield, Crown,
  ChevronDown, Circle, Clock, Zap
} from 'lucide-react';

export default function TopNavbar({ 
  activeTab, 
  sidebarOpen, 
  setSidebarOpen, 
  onLogout,
  studentName = 'Student',
  notifications = 0
}) {
  const [showProfileMenu, setShowProfileMenu] = React.useState(false);
  const [showNotifications, setShowNotifications] = React.useState(false);

  // Get current time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <header 
      className="border-bottom p-3 d-flex justify-content-between align-items-center sticky-top shadow-lg"
      style={{ 
        zIndex: 999,
        background: 'linear-gradient(90deg, #1a237e, #283593, #303f9f, #3949ab)',
        borderColor: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(20px)',
      }}
    >
     
      <div className="d-flex align-items-center gap-3">
        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)} 
          className="d-md-none btn btn-sm p-2 rounded-3 text-white hover-scale"
          style={{ 
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.15)',
            transition: 'all 0.3s ease',
            color: '#ffffff'
          }}
        >
          <Menu style={{ width: '1.1rem', height: '1.1rem' }} />
        </button>

        {/* Module Label */}
        <div className="d-flex align-items-center gap-2">
          <div className="d-none d-md-flex align-items-center gap-2">
            <div className="p-1.5 rounded-3" style={{ 
              background: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <Sparkles className="text-white" style={{ width: '0.8rem', height: '0.8rem' }} />
            </div>
            <h6 className="text-white text-uppercase fw-bold m-0" style={{ fontSize: '0.6rem', letterSpacing: '0.05em', opacity: 0.9 }}>
              Student Module
            </h6>
            <span className="text-white" style={{ fontSize: '0.6rem' }}></span>
          </div>
          <span 
            className="badge text-uppercase px-3 py-2 shadow-sm"
            style={{ 
              fontSize: '0.6rem',
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
        </div>

        {/* Welcome Message */}
        <div className="d-none d-lg-flex align-items-center gap-2">
          <span className="text-white" style={{ fontSize: '0.6rem', opacity: 0.8 }}>
            {getGreeting()}
          </span>
          <span className="text-white fw-bold" style={{ fontSize: '0.6rem' }}>
            {studentName}
          </span>
        </div>
      </div>

     
      <div className="d-flex align-items-center gap-2">
        {/* Search Bar - Desktop */}
        <div className="d-none d-md-flex align-items-center gap-2 px-3 py-1.5 rounded-3" style={{ 
          background: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.15)',
          transition: 'all 0.3s ease',
          maxWidth: '180px'
        }}>
          <Search className="text-white" style={{ width: '0.8rem', height: '0.8rem', opacity: 0.7 }} />
          <input 
            type="text" 
            className="form-control form-control-sm bg-transparent border-0 text-white p-0"
            placeholder="Search..."
            style={{ 
              fontSize: '0.65rem', 
              outline: 'none',
              color: '#ffffff'
            }}
          />
        </div>

        {/* Quick Status */}
        <div className="d-none d-lg-flex align-items-center gap-1 px-2 py-1 rounded-3" style={{ 
          background: 'rgba(34, 197, 94, 0.15)',
          border: '1px solid rgba(34, 197, 94, 0.25)'
        }}>
          <span className="d-inline-block rounded-circle bg-success" style={{ width: '0.35rem', height: '0.35rem', animation: 'pulse 2s infinite' }}></span>
          <span className="text-white" style={{ fontSize: '0.5rem', fontWeight: '600' }}>Online</span>
        </div>

        {/* Notifications */}
        <button 
          onClick={() => setShowNotifications(!showNotifications)}
          className="btn btn-sm p-2 rounded-3 position-relative hover-scale"
          style={{ 
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.15)',
            transition: 'all 0.3s ease',
            color: '#ffffff'
          }}
        >
          <Bell style={{ width: '0.9rem', height: '0.9rem' }} className="text-white" />
          {notifications > 0 && (
            <span className="position-absolute top-0 end-0 translate-middle badge rounded-circle bg-danger p-1" style={{ fontSize: '0.5rem', minWidth: '0.8rem' }}>
              {notifications > 9 ? '9+' : notifications}
            </span>
          )}
        </button>

        {/* Profile Menu */}
        <div className="position-relative">
          <button 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="d-flex align-items-center gap-2 btn p-1 rounded-3 hover-scale"
            style={{ 
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.15)',
              transition: 'all 0.3s ease',
              padding: '0.2rem 0.6rem 0.2rem 0.2rem',
              color: '#ffffff'
            }}
          >
            <div className="d-flex align-items-center justify-content-center rounded-circle" style={{
              width: '28px',
              height: '28px',
              background: 'rgba(255,255,255,0.2)',
              fontSize: '0.65rem',
              fontWeight: 'bold',
              color: '#ffffff',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              {studentName?.charAt(0) || 'S'}
            </div>
            <div className="d-none d-md-block text-start">
              <span className="text-white d-block" style={{ fontSize: '0.6rem', fontWeight: '500', lineHeight: '1.2' }}>
                {studentName}
              </span>
              <span className="text-white" style={{ fontSize: '0.45rem', lineHeight: '1.2', opacity: 0.7 }}>
                Student
              </span>
            </div>
            <ChevronDown className="text-white" style={{ width: '0.7rem', height: '0.7rem', opacity: 0.7 }} />
          </button>

          {/* Dropdown Menu */}
          {showProfileMenu && (
            <div 
              className="position-absolute top-100 end-0 mt-2 p-2 rounded-3 shadow-lg"
              style={{ 
                minWidth: '220px',
                background: 'rgba(20,20,30,0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.05)',
                zIndex: 1000,
                animation: 'slideDown 0.2s ease-out'
              }}
            >
              <div className="px-3 py-2 border-bottom" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                <span className="text-light fw-bold d-block" style={{ fontSize: '0.75rem' }}>{studentName}</span>
                <span className="text-secondary" style={{ fontSize: '0.55rem' }}>Student Account</span>
              </div>
              <button 
                className="w-100 d-flex align-items-center gap-2 px-3 py-2 rounded-3 btn btn-sm text-start hover-bg"
                style={{ 
                  background: 'transparent',
                  border: 'none',
                  color: '#94a3b8',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <User style={{ width: '0.8rem', height: '0.8rem' }} />
                <span style={{ fontSize: '0.7rem' }}>Profile</span>
              </button>
              <button 
                className="w-100 d-flex align-items-center gap-2 px-3 py-2 rounded-3 btn btn-sm text-start hover-bg"
                style={{ 
                  background: 'transparent',
                  border: 'none',
                  color: '#94a3b8',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <Settings style={{ width: '0.8rem', height: '0.8rem' }} />
                <span style={{ fontSize: '0.7rem' }}>Settings</span>
              </button>
              <button 
                className="w-100 d-flex align-items-center gap-2 px-3 py-2 rounded-3 btn btn-sm text-start hover-bg"
                style={{ 
                  background: 'transparent',
                  border: 'none',
                  color: '#f87171',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                onClick={onLogout}
              >
                <LogOut style={{ width: '0.8rem', height: '0.8rem' }} />
                <span style={{ fontSize: '0.7rem' }}>Logout</span>
              </button>
            </div>
          )}
        </div>

        {/* Role Badge */}
        <span className="badge bg-white text-dark border border-white rounded-pill px-3 py-2 d-none d-sm-flex" style={{ fontSize: '0.5rem', fontWeight: 'bold' }}>
          <Shield style={{ width: '0.6rem', height: '0.6rem', marginRight: '0.3rem' }} />
          Student
        </span>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .hover-scale {
          transition: transform 0.2s ease;
        }
        
        .hover-scale:hover {
          transform: scale(1.05);
        }
        
        .hover-bg {
          transition: background 0.2s ease;
        }
        
        .form-control:focus {
          box-shadow: none !important;
          outline: none !important;
        }
        
        .form-control::placeholder {
          color: rgba(255,255,255,0.5) !important;
        }
        
        ::-webkit-scrollbar {
          width: 2px;
        }
        
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.3);
          border-radius: 10px;
        }
      `}</style>
    </header>
  );
}