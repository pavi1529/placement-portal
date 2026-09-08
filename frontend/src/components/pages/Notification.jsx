import React, { useState } from 'react';
import { 
  Bell, AlertCircle, CheckCircle, Clock, Calendar, 
  Briefcase, Award, Users, Mail, Star, Sparkles,
  Filter, Search, ChevronRight, X, Info, MessageSquare
} from 'lucide-react';

export default function Notifications() {
  const [filterType, setFilterType] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const notifications = [
    { 
      id: 1,
      type: "Placements Pipeline", 
      msg: "PayPal integration opened tracking candidates.", 
      time: "July 14, 2026 15:30",
      icon: Briefcase,
      color: "primary",
      read: false,
      priority: "High"
    },
    { 
      id: 2,
      type: "Test Announcement", 
      msg: "Aptitude validation screening mock session active.", 
      time: "July 13, 2026 09:00",
      icon: Award,
      color: "warning",
      read: true,
      priority: "Medium"
    },
    { 
      id: 3,
      type: "Interview Schedule", 
      msg: "Cognizant virtual technical interview published.", 
      time: "July 12, 2026 11:45",
      icon: Calendar,
      color: "info",
      read: false,
      priority: "High"
    },
    { 
      id: 4,
      type: "Application Update", 
      msg: "Your application for Zoho has been shortlisted.", 
      time: "July 11, 2026 14:20",
      icon: Users,
      color: "success",
      read: true,
      priority: "Medium"
    },
    { 
      id: 5,
      type: "System Alert", 
      msg: "New coding challenge available in Python section.", 
      time: "July 10, 2026 10:00",
      icon: MessageSquare,
      color: "danger",
      read: false,
      priority: "Low"
    },
  ];

  // Stats
  const stats = [
    { label: "Total", value: notifications.length, icon: Bell, color: "primary" },
    { label: "Unread", value: notifications.filter(n => !n.read).length, icon: AlertCircle, color: "danger" },
    { label: "Today", value: notifications.filter(n => n.time.includes("July 14")).length, icon: Clock, color: "warning" },
    { label: "New", value: notifications.filter(n => n.priority === "High" && !n.read).length, icon: Star, color: "success" },
  ];

  // Filter notifications
  const filteredNotifications = notifications.filter(notif => {
    const matchesType = filterType === 'ALL' || notif.type === filterType;
    const matchesSearch = notif.msg.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          notif.type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  // Get unique types for filter
  const types = ['ALL', ...new Set(notifications.map(n => n.type))];

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return 'danger';
      case 'Medium': return 'warning';
      case 'Low': return 'info';
      default: return 'secondary';
    }
  };

  return (
    <div className="animate-fadeIn">
      {/* Stats Cards - Responsive */}
      <div className="row g-2 g-md-3 mb-3 mb-md-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="col-6 col-lg-3">
              <div 
                className="card border-0 shadow-sm rounded-3 rounded-md-4 overflow-hidden h-100"
                style={{ 
                  background: '#ffffff',
                  border: '1px solid #e9ecef',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.05)';
                }}
              >
                <div className="card-body p-2 p-md-3">
                  <div className="d-flex align-items-center justify-content-between">
                    <span className="text-secondary fw-bold text-uppercase" style={{ 
                      fontSize: 'clamp(0.4rem, 0.7vw, 0.55rem)' 
                    }}>
                      {stat.label}
                    </span>
                    <div 
                      className="p-1 p-md-1.5 rounded-3"
                      style={{ 
                        background: `rgba(var(--bs-${stat.color}-rgb), 0.08)`,
                        border: `1px solid rgba(var(--bs-${stat.color}-rgb), 0.12)`
                      }}
                    >
                      <Icon className={`text-${stat.color}`} style={{ 
                        width: 'clamp(0.7rem, 1.2vw, 0.9rem)', 
                        height: 'clamp(0.7rem, 1.2vw, 0.9rem)' 
                      }} />
                    </div>
                  </div>
                  <h4 className={`fw-bold text-${stat.color} mb-0`} style={{ 
                    fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)' 
                  }}>
                    {stat.value}
                  </h4>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Search and Filter - Responsive */}
      <div 
        className="card border-0 shadow-sm rounded-3 rounded-md-4 overflow-hidden mb-3 mb-md-4"
        style={{ 
          background: '#ffffff',
          border: '1px solid #e9ecef',
          boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
        }}
      >
        <div className="card-body p-2 p-md-3">
          <div className="d-flex flex-wrap gap-2 align-items-center">
            <div className="flex-grow-1 d-flex align-items-center gap-2 px-2 px-md-3 py-1 py-md-2 rounded-3" style={{ 
              background: 'rgba(0,0,0,0.03)',
              border: '1px solid #e9ecef',
              transition: 'all 0.3s ease',
              maxWidth: 'clamp(180px, 40vw, 300px)'
            }}>
              <Search className="text-secondary" style={{ 
                width: 'clamp(0.7rem, 1.2vw, 0.9rem)', 
                height: 'clamp(0.7rem, 1.2vw, 0.9rem)' 
              }} />
              <input 
                type="text" 
                className="form-control form-control-sm bg-transparent border-0 text-dark" 
                placeholder="Search..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ 
                  fontSize: 'clamp(0.6rem, 1vw, 0.75rem)',
                  outline: 'none',
                  padding: '0.1rem 0'
                }}
              />
            </div>

            <select 
              className="form-select form-select-sm bg-white text-dark border-light flex-grow-1 flex-md-grow-0"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              style={{ 
                fontSize: 'clamp(0.6rem, 1vw, 0.7rem)',
                borderRadius: '10px',
                borderColor: '#e9ecef',
                background: 'rgba(255,255,255,0.9)',
                minWidth: 'clamp(120px, 20vw, 160px)',
                padding: 'clamp(0.3rem, 0.8vw, 0.5rem) clamp(0.5rem, 1.5vw, 0.8rem)'
              }}
            >
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            <button className="btn btn-sm d-flex align-items-center justify-content-center" style={{ 
              background: 'rgba(0,0,0,0.03)',
              border: '1px solid #e9ecef',
              color: '#6b7280',
              borderRadius: '10px',
              padding: 'clamp(0.3rem, 0.8vw, 0.5rem) clamp(0.4rem, 1vw, 0.8rem)',
              transition: 'all 0.3s ease',
              width: 'clamp(32px, 6vw, 38px)',
              height: 'clamp(32px, 6vw, 38px)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(0,0,0,0.06)';
              e.currentTarget.style.color = '#1a1a2e';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(0,0,0,0.03)';
              e.currentTarget.style.color = '#6b7280';
            }}
            >
              <Filter style={{ 
                width: 'clamp(0.7rem, 1.2vw, 0.8rem)', 
                height: 'clamp(0.7rem, 1.2vw, 0.8rem)' 
              }} />
            </button>
          </div>
        </div>
      </div>

      {/* Notifications List - Responsive */}
      {filteredNotifications.length === 0 ? (
        <div 
          className="card border-0 shadow-sm rounded-4 overflow-hidden text-center p-3 p-md-5"
          style={{ 
            background: '#ffffff',
            border: '1px solid #e9ecef',
          }}
        >
          <Bell className="text-secondary mx-auto" style={{ 
            width: 'clamp(2rem, 4vw, 3rem)', 
            height: 'clamp(2rem, 4vw, 3rem)' 
          }} />
          <h6 className="text-secondary mt-3" style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1rem)' }}>
            No notifications found
          </h6>
          <p className="text-secondary small" style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)' }}>
            Try adjusting your search or filters
          </p>
        </div>
      ) : (
        <div className="row g-2 g-md-3">
          {filteredNotifications.map((notif, index) => {
            const Icon = notif.icon;
            return (
              <div key={notif.id} className="col-12">
                <div 
                  className="card border-0 shadow-sm rounded-3 rounded-md-4 overflow-hidden animate-slide-up"
                  style={{ 
                    animationDelay: `${index * 100}ms`,
                    background: notif.read ? '#f8f9fa' : '#ffffff',
                    border: `1px solid ${notif.read ? '#e9ecef' : `rgba(var(--bs-${notif.color}-rgb), 0.15)`}`,
                    transition: 'all 0.4s ease',
                    boxShadow: notif.read ? '0 2px 10px rgba(0,0,0,0.03)' : '0 2px 15px rgba(59, 130, 246, 0.05)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateX(4px)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.boxShadow = notif.read ? '0 2px 10px rgba(0,0,0,0.03)' : '0 2px 15px rgba(59, 130, 246, 0.05)';
                  }}
                >
                  <div className="card-body p-3 p-md-4">
                    <div className="d-flex gap-2 gap-md-3">
                      {/* Icon */}
                      <div 
                        className="p-1 p-md-2 rounded-3 d-flex align-items-center justify-content-center flex-shrink-0"
                        style={{ 
                          width: 'clamp(32px, 6vw, 44px)',
                          height: 'clamp(32px, 6vw, 44px)',
                          background: `rgba(var(--bs-${notif.color}-rgb), 0.08)`,
                          border: `1px solid rgba(var(--bs-${notif.color}-rgb), 0.12)`,
                          flexShrink: 0
                        }}
                      >
                        <Icon className={`text-${notif.color}`} style={{ 
                          width: 'clamp(0.9rem, 1.5vw, 1.2rem)', 
                          height: 'clamp(0.9rem, 1.5vw, 1.2rem)' 
                        }} />
                      </div>

                      {/* Content */}
                      <div className="flex-grow-1 min-w-0">
                        <div className="d-flex flex-wrap justify-content-between align-items-start gap-1 gap-md-2">
                          <div className="min-w-0 flex-grow-1">
                            <div className="d-flex flex-wrap align-items-center gap-1 gap-md-2">
                              <span className={`fw-bold text-${notif.color}`} style={{ 
                                fontSize: 'clamp(0.6rem, 1vw, 0.7rem)' 
                              }}>
                                {notif.type}
                              </span>
                              {!notif.read && (
                                <span className="badge bg-danger bg-opacity-10 text-danger border border-danger" style={{ 
                                  fontSize: 'clamp(0.35rem, 0.6vw, 0.45rem)', 
                                  padding: '0.1rem 0.4rem' 
                                }}>
                                  New
                                </span>
                              )}
                              <span className={`badge bg-${getPriorityColor(notif.priority)} bg-opacity-10 text-${getPriorityColor(notif.priority)} border border-${getPriorityColor(notif.priority)}`} style={{ 
                                fontSize: 'clamp(0.35rem, 0.6vw, 0.45rem)', 
                                padding: '0.1rem 0.4rem' 
                              }}>
                                {notif.priority}
                              </span>
                            </div>
                            <p className="text-dark small mb-0" style={{ 
                              fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)',
                              wordBreak: 'break-word'
                            }}>
                              {notif.msg}
                            </p>
                          </div>
                          <div className="d-flex flex-column align-items-end gap-1 flex-shrink-0">
                            <span className="text-secondary" style={{ 
                              fontSize: 'clamp(0.45rem, 0.8vw, 0.55rem)' 
                            }}>
                              <Clock className="me-1" style={{ 
                                width: 'clamp(0.5rem, 0.8vw, 0.6rem)', 
                                height: 'clamp(0.5rem, 0.8vw, 0.6rem)' 
                              }} />
                              {notif.time}
                            </span>
                            {!notif.read && (
                              <span className="d-inline-block rounded-circle bg-primary" style={{ 
                                width: 'clamp(4px, 0.5vw, 6px)', 
                                height: 'clamp(4px, 0.5vw, 6px)' 
                              }}></span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }

        .animate-slide-up {
          animation: slide-up 0.4s ease-out forwards;
          opacity: 0;
        }

        .transition-all {
          transition: all 0.3s ease;
        }

        /* Card hover glow effect */
        .card {
          position: relative;
        }

        .card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 16px;
          padding: 1px;
          background: linear-gradient(135deg, rgba(0,0,0,0.04), transparent);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        /* Responsive overrides */
        @media (max-width: 576px) {
          .card-body {
            padding: 0.75rem !important;
          }
          .gap-1 {
            gap: 0.25rem !important;
          }
          .badge {
            padding: 0.1rem 0.35rem !important;
          }
          .btn-sm {
            padding: 0.2rem 0.4rem !important;
          }
          .rounded-3 {
            border-radius: 8px !important;
          }
          .rounded-md-4 {
            border-radius: 10px !important;
          }
        }

        @media (min-width: 768px) and (max-width: 991px) {
          .card-body {
            padding: 1rem !important;
          }
        }

        /* Scrollbar */
        ::-webkit-scrollbar {
          width: 4px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.05);
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.3);
          border-radius: 10px;
        }

        /* Select dropdown */
        .form-select {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e") !important;
          background-repeat: no-repeat !important;
          background-position: right 0.75rem center !important;
          background-size: 16px 12px !important;
          appearance: none !important;
          -webkit-appearance: none !important;
        }

        .form-select option {
          background: #ffffff;
          color: #1a1a2e;
        }

        .min-w-0 {
          min-width: 0;
        }
      `}</style>
    </div>
  );
}