import React from 'react';
import { 
  LayoutDashboard, User, Briefcase, Building2, Award, Code2,
  UserCheck, Bell, FileText, Settings, LogOut,
  Sparkles, Zap, GraduationCap
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, onLogout, sidebarOpen, setSidebarOpen }) {
  // Unique color scheme for each icon
  const getIconColor = (id) => {
    const colors = {
      'dashboard': 'text-blue-400',
      'profile': 'text-purple-400',
      'drives': 'text-emerald-400',
      'jobs': 'text-cyan-400',
      'companies': 'text-indigo-400',
      'mock': 'text-amber-400',
      'coding': 'text-rose-400',
      'applications': 'text-teal-400',
      'notifications': 'text-pink-400',
      'reports': 'text-orange-400',
      'settings': 'text-gray-400'
    };
    return colors[id] || 'text-gray-400';
  };

  const getTabIcon = (id, active) => {
    const iconSize = active ? 18 : 16;
    const colorClass = getIconColor(id);
    
    const icons = {
      'dashboard': <LayoutDashboard size={iconSize} className={`${colorClass} transition-all duration-300 ${active ? 'scale-110' : ''}`} />,
      'profile': <User size={iconSize} className={`${colorClass} transition-all duration-300 ${active ? 'scale-110' : ''}`} />,
      'drives': <Briefcase size={iconSize} className={`${colorClass} transition-all duration-300 ${active ? 'scale-110' : ''}`} />,
      'jobs': <Briefcase size={iconSize} className={`${colorClass} transition-all duration-300 ${active ? 'scale-110' : ''}`} />,
      'companies': <Building2 size={iconSize} className={`${colorClass} transition-all duration-300 ${active ? 'scale-110' : ''}`} />,
      'mock': <Award size={iconSize} className={`${colorClass} transition-all duration-300 ${active ? 'scale-110' : ''}`} />,
      'coding': <Code2 size={iconSize} className={`${colorClass} transition-all duration-300 ${active ? 'scale-110' : ''}`} />,
      'applications': <UserCheck size={iconSize} className={`${colorClass} transition-all duration-300 ${active ? 'scale-110' : ''}`} />,
      'notifications': <Bell size={iconSize} className={`${colorClass} transition-all duration-300 ${active ? 'scale-110' : ''}`} />,
      'reports': <FileText size={iconSize} className={`${colorClass} transition-all duration-300 ${active ? 'scale-110' : ''}`} />,
      'settings': <Settings size={iconSize} className={`${colorClass} transition-all duration-300 ${active ? 'scale-110' : ''}`} />
    };
    return icons[id] || icons['dashboard'];
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'drives', label: 'Placement Drives', icon: Briefcase },
    { id: 'jobs', label: 'Jobs', icon: Briefcase },
    { id: 'companies', label: 'Companies', icon: Building2 },
    { id: 'mock', label: 'Mock Tests', icon: Award },
    { id: 'coding', label: 'Coding', icon: Code2 },
    { id: 'applications', label: 'Applications', icon: UserCheck },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Close sidebar function
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    if (setSidebarOpen) setSidebarOpen(false);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="d-lg-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
          style={{ zIndex: 1040 }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`${sidebarOpen ? 'd-flex' : 'd-none d-lg-flex'} flex-column`}
        style={{ 
          position: 'fixed',
          top: 0, 
          left: 0, 
          bottom: 0,
          zIndex: 1050, 
          width: '280px',
          background: 'linear-gradient(180deg, #1a237e 0%, #283593 30%, #303f9f 60%, #3949ab 100%)',
          borderRight: '1px solid rgba(255,255,255,0.06)',
          boxShadow: '4px 0 30px rgba(0,0,0,0.5)',
          transition: 'transform 0.3s ease'
        }}
      >
        {/* Decorative Background Elements */}
        <div className="position-absolute top-0 start-0 w-100 h-100 overflow-hidden" style={{ pointerEvents: 'none', opacity: 0.15 }}>
          <div className="position-absolute rounded-circle" style={{ 
            width: '200px', 
            height: '200px', 
            background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)',
            top: '-50px',
            right: '-80px'
          }}></div>
          <div className="position-absolute rounded-circle" style={{ 
            width: '150px', 
            height: '150px', 
            background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)',
            bottom: '100px',
            left: '-60px'
          }}></div>
        </div>

        {/* Close button for mobile */}
        <button 
          className="d-lg-none position-absolute top-0 end-0 m-3 bg-transparent border-0"
          onClick={() => setSidebarOpen(false)}
          style={{ color: 'white', fontSize: '1.5rem', zIndex: 1 }}
        >
          <i className="bi bi-x-lg"></i>
        </button>

        {/* Header */}
        <div className="p-3 position-relative" style={{ zIndex: 1, flexShrink: 0 }}>
          <div className="d-flex align-items-center gap-3 mb-4 border-bottom pb-3" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <div className="d-flex align-items-center justify-content-center rounded-3 position-relative" style={{ 
              width: '48px', 
              height: '48px',
              background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
              boxShadow: '0 8px 32px rgba(79,70,229,0.4)',
            }}>
              <GraduationCap size={24} className="text-white" />
              <div className="position-absolute top-0 end-0 mt-n1 me-n1">
                <span className="badge bg-warning rounded-circle p-1" style={{ fontSize: '0.4rem' }}>
                  <Zap size={8} className="text-dark" />
                </span>
              </div>
            </div>
            <div>
              <h6 className="fw-bold text-uppercase m-0" style={{ 
                fontSize: '0.7rem',
                background: 'linear-gradient(135deg, #e0e7ff, #c7d2fe)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Student Portal
              </h6>
              <span className="text-white-50 small text-uppercase fw-bold" style={{ fontSize: '0.5rem', letterSpacing: '0.5px' }}>
                Placement System
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="px-3 position-relative" style={{ 
          zIndex: 1, 
          flex: 1, 
          overflowY: 'auto',
          overflowX: 'hidden',
          minHeight: 0
        }}>
          <nav className="nav flex-column gap-1">
            {navItems.map((tab) => {
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`btn btn-sm text-start d-flex align-items-center gap-3 rounded-3 transition-all position-relative overflow-hidden ${
                    isActive ? 'text-primary shadow-lg' : 'text-white-50 hover:text-white'
                  }`}
                  style={{ 
                    padding: '0.65rem 0.85rem', 
                    fontSize: '0.75rem', 
                    fontWeight: '500', 
                    border: 'none',
                    background: isActive ? 'white' : 'rgba(255,255,255,0.04)',
                    boxShadow: isActive ? '0 4px 20px rgba(255,255,255,0.4)' : 'none',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    width: '100%',
                    color: isActive ? '#1a237e' : 'rgba(255,255,255,0.7)'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                      e.currentTarget.style.transform = 'translateX(4px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }
                  }}
                >
                  {/* Active Indicator */}
                  {isActive && (
                    <div className="position-absolute start-0 top-0 h-100" style={{ 
                      width: '3px',
                      background: '#1a237e',
                      borderRadius: '0 2px 2px 0',
                      boxShadow: '0 0 20px rgba(26,35,126,0.4)'
                    }}></div>
                  )}
                  
                  {/* Icon */}
                  <div className="d-flex align-items-center justify-content-center position-relative" style={{ 
                    width: '28px', 
                    height: '28px',
                  }}>
                    {getTabIcon(tab.id, isActive)}
                    {isActive && (
                      <div className="position-absolute rounded-circle" style={{
                        width: '32px',
                        height: '32px',
                        background: 'rgba(26,35,126,0.15)',
                        animation: 'pulse-glow 2s ease-in-out infinite'
                      }}></div>
                    )}
                  </div>
                  
                  <span className="flex-grow-1" style={{ 
                    letterSpacing: '0.3px',
                    fontWeight: isActive ? '600' : '400',
                    color: isActive ? '#1a237e' : 'rgba(255,255,255,0.7)'
                  }}>
                    {tab.label}
                  </span>
                  
                  {isActive && (
                    <span className="badge bg-primary bg-opacity-10 rounded-pill px-2 py-0" style={{ fontSize: '0.5rem' }}>
                      <Sparkles size={10} className="text-primary" />
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer - Disconnect Button */}
        <div className="p-3 border-top position-relative" style={{ 
          zIndex: 1,
          flexShrink: 0,
          borderColor: 'rgba(255,255,255,0.08)',
          background: 'rgba(0,0,0,0.2)'
        }}>
          <button 
            onClick={onLogout}
            className="btn w-100 d-flex align-items-center justify-content-center gap-2 transition-all hover:scale-105 position-relative overflow-hidden"
            style={{ 
              borderRadius: '10px', 
              fontWeight: '600', 
              fontSize: '0.75rem', 
              padding: '0.7rem',
              background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
              color: '#ffffff',
              boxShadow: '0 4px 20px rgba(220,38,38,0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(220,38,38,0.5)';
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(220,38,38,0.3)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <LogOut size={16} className="transition-all" />
            <span>Disconnect</span>
            <div className="position-absolute top-0 start-0 w-100 h-100" style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)',
              pointerEvents: 'none'
            }}></div>
          </button>
          
          <div className="text-center mt-2">
            <span className="text-white-50" style={{ fontSize: '0.45rem', opacity: 0.5 }}>
              v2.0.1 • Student Portal
            </span>
          </div>
        </div>

        {/* Animations */}
        <style>{`
          @keyframes pulse-glow {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 0.6; transform: scale(1.2); }
          }
          
          .transition-all {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
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
          
          ::-webkit-scrollbar-thumb:hover {
            background: rgba(255,255,255,0.25);
          }

          .text-white-50 {
            color: rgba(255, 255, 255, 0.7) !important;
          }
        `}</style>
      </aside>
    </>
  );
}