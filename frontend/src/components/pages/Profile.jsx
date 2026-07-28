import React from 'react';
import { 
  User, Mail, GraduationCap, Award, Code2, Briefcase, 
  Calendar, MapPin, Star, TrendingUp, Upload, Edit3, 
  Crown, Sparkles, Clock  // ✅ Clock imported
} from 'lucide-react';

export default function Profile({ studentProfile }) {
 
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
    <div>
     
      <div 
        className="card border-0 shadow-lg rounded-4 overflow-hidden animate-slide-up"
        style={{ 
          animationDelay: '100ms',
          background: '#ffffff',
          border: '1px solid #e9ecef',
          boxShadow: '0 8px 30px rgba(0,0,0,0.06)'
        }}
      >
        <div className="card-body p-4">
          {/* Header with Avatar */}
          <div className="d-flex flex-wrap align-items-center gap-4 border-bottom border-light pb-4">
            <div className="position-relative">
              <div 
                className="rounded-4 d-flex align-items-center justify-content-center"
                style={{ 
                  width: '80px', 
                  height: '80px',
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
                <span className="text-white fw-bold" style={{ fontSize: '2rem' }}>
                  {studentProfile.name.charAt(0)}
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
                  <Upload className="text-secondary" style={{ width: '0.8rem', height: '0.8rem' }} />
                </button>
              </div>
            </div>

            <div className="flex-grow-1">
              <div className="d-flex align-items-center gap-2">
                <h3 className="fw-bold text-dark m-0">{studentProfile.name}</h3>
                <Sparkles className="text-warning" style={{ width: '1rem', height: '1rem' }} />
                <span className="badge bg-success bg-opacity-10 text-success border border-success ms-2">
                  <span className="d-inline-block rounded-circle bg-success me-1" style={{ width: '0.4rem', height: '0.4rem' }}></span>
                  Active
                </span>
              </div>
              <div className="d-flex flex-wrap gap-3 mt-1">
                <span className="text-secondary small d-flex align-items-center gap-1">
                  <Mail className="text-primary" style={{ width: '0.8rem', height: '0.8rem' }} />
                  {studentProfile.email}
                </span>
                <span className="text-secondary small d-flex align-items-center gap-1">
                  <GraduationCap className="text-success" style={{ width: '0.8rem', height: '0.8rem' }} />
                  {studentProfile.dept}
                </span>
                <span className="text-secondary small d-flex align-items-center gap-1">
                  <Award className="text-warning" style={{ width: '0.8rem', height: '0.8rem' }} />
                  CGPA: <span className="text-success fw-bold">{studentProfile.cgpa}</span>
                </span>
              </div>
            </div>

            <button 
              className="btn btn-outline-primary btn-sm px-3 py-2 rounded-3 d-flex align-items-center gap-1"
              style={{ 
                borderColor: 'rgba(59, 130, 246, 0.3)',
                transition: 'all 0.3s ease'
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
              <Edit3 style={{ width: '0.8rem', height: '0.8rem' }} />
              <span style={{ fontSize: '0.7rem' }}>Edit Profile</span>
            </button>
          </div>

          {/* Profile Details - Grid Layout */}
          <div className="row g-4 mt-2">
            {/* Personal Details Card */}
            <div className="col-md-6">
              <div 
                className="p-3 rounded-3 h-100"
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
                <h6 className="text-primary fw-bold text-uppercase mb-3" style={{ fontSize: '0.6rem', letterSpacing: '0.1em' }}>
                  <User className="d-inline me-1" style={{ width: '0.8rem', height: '0.8rem' }} />
                  Personal Details
                </h6>
                <div className="space-y-2">
                  {[
                    { label: "Full Name", value: studentProfile.name, icon: User },
                    { label: "Email Address", value: studentProfile.email, icon: Mail },
                    { label: "Department", value: studentProfile.dept, icon: GraduationCap },
                    { label: "CGPA", value: studentProfile.cgpa, icon: Award, color: "text-success" },
                  ].map((item, i) => (
                    <div 
                      key={i} 
                      className="d-flex justify-content-between align-items-center py-2 border-bottom"
                      style={{ borderColor: 'rgba(0,0,0,0.05) !important' }}
                    >
                      <span className="text-secondary small d-flex align-items-center gap-1">
                        <item.icon className="text-secondary" style={{ width: '0.7rem', height: '0.7rem' }} />
                        {item.label}
                      </span>
                      <span className={`text-dark small fw-medium ${item.color || ''}`}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Skills Card */}
            <div className="col-md-6">
              <div 
                className="p-3 rounded-3 h-100"
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
                <h6 className="text-purple-400 fw-bold text-uppercase mb-3" style={{ fontSize: '0.6rem', letterSpacing: '0.1em', color: '#7c3aed' }}>
                  <Code2 className="d-inline me-1" style={{ width: '0.8rem', height: '0.8rem' }} />
                  Technical Skills
                </h6>
                <div className="d-flex flex-wrap gap-2 mb-3">
                  {studentProfile.skills.map((skill, i) => (
                    <span 
                      key={i} 
                      className="badge px-3 py-2 rounded-3"
                      style={{ 
                        background: 'rgba(59, 130, 246, 0.08)',
                        color: '#3b82f6',
                        border: '1px solid rgba(59, 130, 246, 0.15)',
                        fontSize: '0.6rem',
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

                <div className="border-top border-light pt-3">
                  <span className="text-secondary small d-block mb-2">Resume</span>
                  <div 
                    className="d-flex justify-content-between align-items-center p-2 rounded-3"
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
                    <span className="text-secondary small font-monospace">resume_2026.pdf</span>
                    <button 
                      className="btn btn-sm text-primary"
                      style={{ 
                        fontSize: '0.6rem',
                        transition: 'all 0.3s ease'
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

     
      <div className="row g-4 mt-3">
        {/* Achievements Card */}
        <div className="col-md-6">
          <div 
            className="card border-0 shadow-lg rounded-4 overflow-hidden animate-slide-up"
            style={{ 
              animationDelay: '200ms',
              background: '#ffffff',
              border: '1px solid #e9ecef',
              boxShadow: '0 8px 30px rgba(0,0,0,0.06)'
            }}
          >
            <div className="card-body p-4">
              <h6 className="text-warning fw-bold text-uppercase mb-3" style={{ fontSize: '0.6rem', letterSpacing: '0.1em' }}>
                <Award className="d-inline me-1" style={{ width: '0.8rem', height: '0.8rem' }} />
                Achievements
              </h6>
              {achievements.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={i} 
                    className="d-flex align-items-center gap-3 p-2 rounded-3 mb-2"
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
                      className="p-2 rounded-3"
                      style={{ 
                        background: 'rgba(234, 179, 8, 0.08)',
                        border: '1px solid rgba(234, 179, 8, 0.15)'
                      }}
                    >
                      <Icon className="text-warning" style={{ width: '0.9rem', height: '0.9rem' }} />
                    </div>
                    <div className="flex-grow-1">
                      <span className="text-dark small fw-medium">{item.title}</span>
                      <span className="text-secondary d-block" style={{ fontSize: '0.6rem' }}>{item.year}</span>
                    </div>
                    <Sparkles className="text-warning" style={{ width: '0.7rem', height: '0.7rem' }} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recent Activity Card */}
        <div className="col-md-6">
          <div 
            className="card border-0 shadow-lg rounded-4 overflow-hidden animate-slide-up"
            style={{ 
              animationDelay: '300ms',
              background: '#ffffff',
              border: '1px solid #e9ecef',
              boxShadow: '0 8px 30px rgba(0,0,0,0.06)'
            }}
          >
            <div className="card-body p-4">
              <h6 className="text-info fw-bold text-uppercase mb-3" style={{ fontSize: '0.6rem', letterSpacing: '0.1em' }}>
                <Clock className="d-inline me-1" style={{ width: '0.8rem', height: '0.8rem' }} />
                Recent Activity
              </h6>
              {recentActivities.map((item, i) => (
                <div 
                  key={i} 
                  className="d-flex align-items-center gap-3 p-2 rounded-3 mb-2"
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
                    className="p-2 rounded-3"
                    style={{ 
                      background: 'rgba(6, 182, 212, 0.08)',
                      border: '1px solid rgba(6, 182, 212, 0.15)'
                    }}
                  >
                    <Briefcase className="text-info" style={{ width: '0.9rem', height: '0.9rem' }} />
                  </div>
                  <div className="flex-grow-1">
                    <span className="text-dark small fw-medium">{item.action}</span>
                    <span className="text-secondary d-block" style={{ fontSize: '0.6rem' }}>{item.date}</span>
                  </div>
                  <span 
                    className="badge"
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
                      fontSize: '0.55rem'
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

      {/* Add CSS Animations */}
      <style>{`
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

        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
          opacity: 0;
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
      `}</style>
    </div>
  );
}