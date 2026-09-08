import React from 'react';
import { 
  User, Mail, GraduationCap, Award, Code2, Briefcase, 
  Calendar, MapPin, Star, TrendingUp, Upload, Edit3, 
  Crown, Sparkles, Clock
} from 'lucide-react';

export default function Profile({ studentProfile }) {
  // Default profile if not provided
  const profile = studentProfile || {
    name: 'Pavithra C',
    email: 'pavithra@example.com',
    dept: 'Computer Science & Engineering',
    cgpa: '8.92',
    skills: ['ReactJS', 'Node.js', 'Python', 'SQL', 'Data Structures']
  };

  const achievements = [
    { title: "Top Performer", year: "2025", icon: Award },
    { title: "Best Project", year: "2024", icon: Star },
    { title: "Dean's List", year: "2023", icon: Crown },
  ];

  const recentActivities = [
    { action: "Applied to Zoho", date: "2 days ago", status: "Pending" },
    { action: "Completed Mock Test", date: "5 days ago", status: "Completed" },
    { action: "Updated Resume", date: "1 week ago", status: "Done" },
  ];

  return (
    <div className="animate-fadeIn">
      {/* Main Profile Card */}
      <div 
        className="card border-0 shadow-lg rounded-3 rounded-md-4 overflow-hidden animate-slide-up"
        style={{ 
          animationDelay: '100ms',
          background: '#ffffff',
          border: '1px solid #e9ecef',
          boxShadow: '0 8px 30px rgba(0,0,0,0.06)'
        }}
      >
        <div className="card-body p-3 p-md-4">
          {/* Header with Avatar */}
          <div className="d-flex flex-wrap align-items-center gap-3 gap-md-4 border-bottom border-light pb-3 pb-md-4">
            <div className="position-relative">
              <div 
                className="rounded-4 d-flex align-items-center justify-content-center"
                style={{ 
                  width: 'clamp(60px, 12vw, 80px)', 
                  height: 'clamp(60px, 12vw, 80px)',
                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                  boxShadow: '0 8px 30px rgba(59, 130, 246, 0.3)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05) rotate(-2deg)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(59, 130, 246, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1) rotate(0)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(59, 130, 246, 0.3)';
                }}
              >
                <span className="text-white fw-bold" style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)' }}>
                  {profile.name?.charAt(0) || 'P'}
                </span>
                <button 
                  className="position-absolute bottom-0 end-0 p-1 rounded-circle border-0"
                  style={{ 
                    background: 'rgba(255,255,255,0.9)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(0,0,0,0.1)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(59, 130, 246, 0.9)';
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.9)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <Upload className="text-secondary" style={{ width: 'clamp(0.6rem, 1vw, 0.8rem)', height: 'clamp(0.6rem, 1vw, 0.8rem)' }} />
                </button>
              </div>
            </div>

            <div className="flex-grow-1 min-w-0">
              <div className="d-flex flex-wrap align-items-center gap-2">
                <h3 className="fw-bold text-dark m-0" style={{ fontSize: 'clamp(1.1rem, 3vw, 1.5rem)' }}>
                  {profile.name}
                </h3>
                <Sparkles className="text-warning" style={{ width: 'clamp(0.8rem, 1.5vw, 1rem)', height: 'clamp(0.8rem, 1.5vw, 1rem)' }} />
                <span className="badge bg-success bg-opacity-10 text-success border border-success ms-2" style={{ fontSize: 'clamp(0.45rem, 0.8vw, 0.55rem)' }}>
                  <span className="d-inline-block rounded-circle bg-success me-1" style={{ width: 'clamp(0.3rem, 0.5vw, 0.4rem)', height: 'clamp(0.3rem, 0.5vw, 0.4rem)' }}></span>
                  Active
                </span>
              </div>
              <div className="d-flex flex-wrap gap-2 gap-md-3 mt-1">
                <span className="text-secondary small d-flex align-items-center gap-1" style={{ fontSize: 'clamp(0.55rem, 1vw, 0.65rem)' }}>
                  <Mail className="text-primary" style={{ width: 'clamp(0.6rem, 1vw, 0.8rem)', height: 'clamp(0.6rem, 1vw, 0.8rem)' }} />
                  {profile.email}
                </span>
                <span className="text-secondary small d-flex align-items-center gap-1" style={{ fontSize: 'clamp(0.55rem, 1vw, 0.65rem)' }}>
                  <GraduationCap className="text-success" style={{ width: 'clamp(0.6rem, 1vw, 0.8rem)', height: 'clamp(0.6rem, 1vw, 0.8rem)' }} />
                  {profile.dept}
                </span>
                <span className="text-secondary small d-flex align-items-center gap-1" style={{ fontSize: 'clamp(0.55rem, 1vw, 0.65rem)' }}>
                  <Award className="text-warning" style={{ width: 'clamp(0.6rem, 1vw, 0.8rem)', height: 'clamp(0.6rem, 1vw, 0.8rem)' }} />
                  CGPA: <span className="text-success fw-bold">{profile.cgpa}</span>
                </span>
              </div>
            </div>

            <button 
              className="btn btn-outline-primary btn-sm px-2 px-md-3 py-1 py-md-2 rounded-3 d-flex align-items-center gap-1"
              style={{ 
                borderColor: 'rgba(59, 130, 246, 0.3)',
                transition: 'all 0.3s ease',
                fontSize: 'clamp(0.6rem, 1vw, 0.7rem)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <Edit3 style={{ width: 'clamp(0.7rem, 1.2vw, 0.8rem)', height: 'clamp(0.7rem, 1.2vw, 0.8rem)' }} />
              <span className="d-none d-sm-inline">Edit Profile</span>
            </button>
          </div>

          {/* Profile Details - Grid Layout */}
          <div className="row g-3 g-md-4 mt-1 mt-md-2">
            {/* Personal Details Card */}
            <div className="col-12 col-md-6">
              <div 
                className="p-2 p-md-3 rounded-3 h-100"
                style={{ 
                  background: 'rgba(0,0,0,0.02)',
                  border: '1px solid rgba(0,0,0,0.06)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0,0,0,0.04)';
                  e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(0,0,0,0.02)';
                  e.currentTarget.style.borderColor = 'rgba(0,0,0,0.06)';
                }}
              >
                <h6 className="text-primary fw-bold text-uppercase mb-2 mb-md-3" style={{ fontSize: 'clamp(0.5rem, 0.9vw, 0.6rem)', letterSpacing: '0.1em' }}>
                  <User className="d-inline me-1" style={{ width: 'clamp(0.7rem, 1.2vw, 0.8rem)', height: 'clamp(0.7rem, 1.2vw, 0.8rem)' }} />
                  Personal Details
                </h6>
                <div className="space-y-2">
                  {[
                    { label: "Full Name", value: profile.name, icon: User },
                    { label: "Email Address", value: profile.email, icon: Mail },
                    { label: "Department", value: profile.dept, icon: GraduationCap },
                    { label: "CGPA", value: profile.cgpa, icon: Award, color: "text-success" },
                  ].map((item, i) => (
                    <div 
                      key={i} 
                      className="d-flex flex-wrap justify-content-between align-items-center py-1 py-md-2 border-bottom"
                      style={{ borderColor: 'rgba(0,0,0,0.05) !important' }}
                    >
                      <span className="text-secondary small d-flex align-items-center gap-1" style={{ fontSize: 'clamp(0.5rem, 0.9vw, 0.6rem)' }}>
                        <item.icon className="text-secondary" style={{ width: 'clamp(0.6rem, 1vw, 0.7rem)', height: 'clamp(0.6rem, 1vw, 0.7rem)' }} />
                        {item.label}
                      </span>
                      <span className={`text-dark small fw-medium ${item.color || ''}`} style={{ fontSize: 'clamp(0.5rem, 0.9vw, 0.6rem)', wordBreak: 'break-all' }}>
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Skills Card */}
            <div className="col-12 col-md-6">
              <div 
                className="p-2 p-md-3 rounded-3 h-100"
                style={{ 
                  background: 'rgba(0,0,0,0.02)',
                  border: '1px solid rgba(0,0,0,0.06)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0,0,0,0.04)';
                  e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(0,0,0,0.02)';
                  e.currentTarget.style.borderColor = 'rgba(0,0,0,0.06)';
                }}
              >
                <h6 className="fw-bold text-uppercase mb-2 mb-md-3" style={{ fontSize: 'clamp(0.5rem, 0.9vw, 0.6rem)', letterSpacing: '0.1em', color: '#7c3aed' }}>
                  <Code2 className="d-inline me-1" style={{ width: 'clamp(0.7rem, 1.2vw, 0.8rem)', height: 'clamp(0.7rem, 1.2vw, 0.8rem)' }} />
                  Technical Skills
                </h6>
                <div className="d-flex flex-wrap gap-1 gap-md-2 mb-2 mb-md-3">
                  {profile.skills?.map((skill, i) => (
                    <span 
                      key={i} 
                      className="badge px-2 px-md-3 py-1 py-md-2 rounded-3"
                      style={{ 
                        background: 'rgba(59, 130, 246, 0.08)',
                        color: '#3b82f6',
                        border: '1px solid rgba(59, 130, 246, 0.15)',
                        fontSize: 'clamp(0.5rem, 0.9vw, 0.6rem)',
                        transition: 'all 0.3s ease',
                        cursor: 'default'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(59, 130, 246, 0.15)';
                        e.currentTarget.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(59, 130, 246, 0.08)';
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="border-top border-light pt-2 pt-md-3">
                  <span className="text-secondary small d-block mb-1 mb-md-2" style={{ fontSize: 'clamp(0.5rem, 0.9vw, 0.6rem)' }}>Resume</span>
                  <div 
                    className="d-flex flex-wrap justify-content-between align-items-center p-2 rounded-3"
                    style={{ 
                      background: 'rgba(0,0,0,0.02)',
                      border: '1px dashed rgba(0,0,0,0.1)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)';
                    }}
                  >
                    <span className="text-secondary small font-monospace" style={{ fontSize: 'clamp(0.5rem, 0.9vw, 0.6rem)' }}>
                      resume_2026.pdf
                    </span>
                    <button 
                      className="btn btn-sm text-primary"
                      style={{ 
                        fontSize: 'clamp(0.5rem, 0.9vw, 0.6rem)',
                        transition: 'all 0.3s ease',
                        padding: '0.15rem 0.5rem'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      Upload New
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements & Activity - Responsive Grid */}
      <div className="row g-3 g-md-4 mt-2 mt-md-3">
        {/* Achievements Card */}
        <div className="col-12 col-md-6">
          <div 
            className="card border-0 shadow-lg rounded-3 rounded-md-4 overflow-hidden animate-slide-up"
            style={{ 
              animationDelay: '200ms',
              background: '#ffffff',
              border: '1px solid #e9ecef',
              boxShadow: '0 8px 30px rgba(0,0,0,0.06)'
            }}
          >
            <div className="card-body p-3 p-md-4">
              <h6 className="text-warning fw-bold text-uppercase mb-2 mb-md-3" style={{ fontSize: 'clamp(0.5rem, 0.9vw, 0.6rem)', letterSpacing: '0.1em' }}>
                <Award className="d-inline me-1" style={{ width: 'clamp(0.7rem, 1.2vw, 0.8rem)', height: 'clamp(0.7rem, 1.2vw, 0.8rem)' }} />
                Achievements
              </h6>
              {achievements.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={i} 
                    className="d-flex align-items-center gap-2 gap-md-3 p-2 rounded-3 mb-1 mb-md-2"
                    style={{ 
                      background: 'rgba(0,0,0,0.02)',
                      border: '1px solid rgba(0,0,0,0.05)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(0,0,0,0.04)';
                      e.currentTarget.style.transform = 'translateX(4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(0,0,0,0.02)';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    <div 
                      className="p-1 p-md-2 rounded-3"
                      style={{ 
                        background: 'rgba(234, 179, 8, 0.08)',
                        border: '1px solid rgba(234, 179, 8, 0.15)'
                      }}
                    >
                      <Icon className="text-warning" style={{ width: 'clamp(0.7rem, 1.2vw, 0.9rem)', height: 'clamp(0.7rem, 1.2vw, 0.9rem)' }} />
                    </div>
                    <div className="flex-grow-1 min-w-0">
                      <span className="text-dark small fw-medium" style={{ fontSize: 'clamp(0.6rem, 1vw, 0.7rem)' }}>{item.title}</span>
                      <span className="text-secondary d-block" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>{item.year}</span>
                    </div>
                    <Sparkles className="text-warning flex-shrink-0" style={{ width: 'clamp(0.6rem, 1vw, 0.7rem)', height: 'clamp(0.6rem, 1vw, 0.7rem)' }} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recent Activity Card */}
        <div className="col-12 col-md-6">
          <div 
            className="card border-0 shadow-lg rounded-3 rounded-md-4 overflow-hidden animate-slide-up"
            style={{ 
              animationDelay: '300ms',
              background: '#ffffff',
              border: '1px solid #e9ecef',
              boxShadow: '0 8px 30px rgba(0,0,0,0.06)'
            }}
          >
            <div className="card-body p-3 p-md-4">
              <h6 className="text-info fw-bold text-uppercase mb-2 mb-md-3" style={{ fontSize: 'clamp(0.5rem, 0.9vw, 0.6rem)', letterSpacing: '0.1em' }}>
                <Clock className="d-inline me-1" style={{ width: 'clamp(0.7rem, 1.2vw, 0.8rem)', height: 'clamp(0.7rem, 1.2vw, 0.8rem)' }} />
                Recent Activity
              </h6>
              {recentActivities.map((item, i) => (
                <div 
                  key={i} 
                  className="d-flex flex-wrap align-items-center gap-2 p-2 rounded-3 mb-1 mb-md-2"
                  style={{ 
                    background: 'rgba(0,0,0,0.02)',
                    border: '1px solid rgba(0,0,0,0.05)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(0,0,0,0.04)';
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(0,0,0,0.02)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <div 
                    className="p-1 p-md-2 rounded-3 flex-shrink-0"
                    style={{ 
                      background: 'rgba(6, 182, 212, 0.08)',
                      border: '1px solid rgba(6, 182, 212, 0.15)'
                    }}
                  >
                    <Briefcase className="text-info" style={{ width: 'clamp(0.7rem, 1.2vw, 0.9rem)', height: 'clamp(0.7rem, 1.2vw, 0.9rem)' }} />
                  </div>
                  <div className="flex-grow-1 min-w-0">
                    <span className="text-dark small fw-medium" style={{ fontSize: 'clamp(0.6rem, 1vw, 0.7rem)' }}>{item.action}</span>
                    <span className="text-secondary d-block" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>{item.date}</span>
                  </div>
                  <span 
                    className="badge flex-shrink-0"
                    style={{ 
                      background: item.status === 'Completed' || item.status === 'Done' 
                        ? 'rgba(34, 197, 94, 0.08)' 
                        : 'rgba(234, 179, 8, 0.08)',
                      color: item.status === 'Completed' || item.status === 'Done' 
                        ? '#16a34a' 
                        : '#ca8a04',
                      border: `1px solid ${item.status === 'Completed' || item.status === 'Done' 
                        ? 'rgba(34, 197, 94, 0.15)' 
                        : 'rgba(234, 179, 8, 0.15)'}`,
                      fontSize: 'clamp(0.45rem, 0.8vw, 0.55rem)',
                      padding: '0.15rem 0.5rem'
                    }}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
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
          animation: slide-up 0.6s ease-out forwards;
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

        .space-y-2 > * + * {
          margin-top: 0.5rem;
        }

        .min-w-0 {
          min-width: 0;
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
            padding: 0.15rem 0.4rem !important;
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
      `}</style>
    </div>
  );
}