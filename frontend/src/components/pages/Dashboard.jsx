import React from 'react';
import { Send, Building2, Award, Code2, BarChart3, TrendingUp, Briefcase, Users, Calendar, Clock, Sparkles } from 'lucide-react';

export default function Dashboard() {
  const recentDrives = [
    { company: "Zoho", role: "Member Technical Staff", package: "8.5 LPA", status: "Eligible", color: "success", date: "Jul 28, 2026" },
    { company: "Cognizant", role: "GenC Elevate", package: "4.5 LPA", status: "Applied", color: "warning", date: "Jul 30, 2026" },
    { company: "PayPal", role: "Software Engineer Intern", package: "12 LPA", status: "Shortlisted", color: "info", date: "Expired" },
  ];

  const stats = [
    { title: "Applications", val: "482", desc: "Submitted", icon: Send, color: "primary" },
    { title: "Companies", val: "48", desc: "Active", icon: Building2, color: "success" },
    { title: "Mock Tests", val: "24", desc: "Executed", icon: Award, color: "danger" },
    { title: "Coding", val: "1.2K", desc: "Problems", icon: Code2, color: "warning" },
  ];

  return (
    <div>
      {/* Stats Cards - Responsive Grid */}
      <div className="row g-2 g-md-3 g-lg-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="col-6 col-lg-3">
              <div 
                className="card border-0 shadow-sm rounded-3 rounded-lg-4 overflow-hidden h-100"
                style={{ 
                  background: '#ffffff',
                  border: '1px solid #e9ecef',
                  transition: 'all 0.3s ease',
                }}
              >
                <div className="card-body p-3 p-md-4">
                  <div className="d-flex align-items-center justify-content-between mb-2 mb-md-3">
                    <span className="text-secondary fw-bold text-uppercase" style={{ fontSize: 'clamp(0.5rem, 1.2vw, 0.6rem)', letterSpacing: '0.05em' }}>
                      {stat.title}
                    </span>
                    <div 
                      className="p-1 p-md-2 rounded-3 d-flex align-items-center justify-content-center"
                      style={{ 
                        background: `rgba(var(--bs-${stat.color}-rgb), 0.08)`,
                        border: `1px solid rgba(var(--bs-${stat.color}-rgb), 0.12)`,
                      }}
                    >
                      <Icon className={`text-${stat.color}`} style={{ width: 'clamp(0.9rem, 2vw, 1.2rem)', height: 'clamp(0.9rem, 2vw, 1.2rem)' }} />
                    </div>
                  </div>
                  
                  <h2 className={`fw-bold mb-0 text-${stat.color}`} style={{ fontSize: 'clamp(1.3rem, 4vw, 2.2rem)', letterSpacing: '-0.02em' }}>
                    {stat.val}
                  </h2>
                  
                  <span className="text-secondary" style={{ fontSize: 'clamp(0.6rem, 1.2vw, 0.7rem)' }}>{stat.desc}</span>
                  
                  {/* Progress Bar */}
                  <div className="mt-2 mt-md-3" style={{ height: '2px', background: 'rgba(0,0,0,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
                    <div 
                      className={`bg-${stat.color}`}
                      style={{ 
                        width: `${Math.floor(Math.random() * 30 + 70)}%`,
                        height: '100%',
                        borderRadius: '10px',
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Chart & Quick Metrics - Responsive */}
      <div className="row g-2 g-md-3 g-lg-4 mt-2 mt-md-3">
        {/* Placement Success Rate */}
        <div className="col-12 col-lg-8">
          <div 
            className="card border-0 shadow-sm rounded-3 rounded-lg-4 overflow-hidden"
            style={{ 
              background: '#ffffff',
              border: '1px solid #e9ecef',
            }}
          >
            <div className="card-body p-3 p-md-4">
              <div className="d-flex align-items-center gap-2 mb-3 mb-md-4">
                <div className="p-1 p-md-2 rounded-3" style={{ background: 'rgba(59, 130, 246, 0.08)' }}>
                  <BarChart3 className="text-primary" style={{ width: 'clamp(0.9rem, 2vw, 1.2rem)', height: 'clamp(0.9rem, 2vw, 1.2rem)' }} />
                </div>
                <h6 className="text-secondary fw-bold text-uppercase m-0" style={{ fontSize: 'clamp(0.55rem, 1.2vw, 0.65rem)', letterSpacing: '0.05em' }}>
                  Placement Success Rate
                </h6>
                <span className="ms-auto text-secondary" style={{ fontSize: 'clamp(0.5rem, 1vw, 0.6rem)' }}>
                  <Clock className="d-inline me-1" style={{ width: 'clamp(0.5rem, 1vw, 0.7rem)', height: 'clamp(0.5rem, 1vw, 0.7rem)' }} />
                  Updated
                </span>
              </div>
              
              <div className="d-flex align-items-end justify-content-between gap-1 gap-md-2" style={{ height: 'clamp(100px, 20vh, 150px)' }}>
                {[35, 48, 62, 75, 85, 92].map((bar, i) => (
                  <div key={i} className="flex-grow-1 d-flex flex-column align-items-center gap-1 gap-md-2">
                    <div 
                      className="w-100 rounded-top transition-all"
                      style={{ 
                        height: `${bar}%`, 
                        minHeight: '15px',
                        background: `linear-gradient(180deg, ${i % 2 === 0 ? '#3b82f6' : '#8b5cf6'}, ${i % 2 === 0 ? '#6366f1' : '#a78bfa'})`,
                        borderRadius: '4px 4px 0 0',
                        boxShadow: '0 2px 10px rgba(59, 130, 246, 0.2)',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <div className="text-center text-white fw-bold" style={{ fontSize: 'clamp(0.35rem, 0.8vw, 0.5rem)', paddingTop: '2px' }}>
                        {bar}%
                      </div>
                    </div>
                    <span className="text-secondary font-monospace fw-bold" style={{ fontSize: 'clamp(0.45rem, 1vw, 0.6rem)' }}>
                      {2021 + i}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Metrics */}
        <div className="col-12 col-lg-4">
          <div 
            className="card border-0 shadow-sm rounded-3 rounded-lg-4 overflow-hidden h-100"
            style={{ 
              background: '#ffffff',
              border: '1px solid #e9ecef',
            }}
          >
            <div className="card-body p-3 p-md-4">
              <div className="d-flex align-items-center gap-2 mb-3 mb-md-4">
                <div className="p-1 p-md-2 rounded-3" style={{ background: 'rgba(234, 179, 8, 0.08)' }}>
                  <TrendingUp className="text-warning" style={{ width: 'clamp(0.9rem, 2vw, 1.2rem)', height: 'clamp(0.9rem, 2vw, 1.2rem)' }} />
                </div>
                <h6 className="text-secondary fw-bold text-uppercase m-0" style={{ fontSize: 'clamp(0.55rem, 1.2vw, 0.65rem)', letterSpacing: '0.05em' }}>
                  Quick Metrics
                </h6>
              </div>
              
              {[
                { label: "Applications", value: "312", color: "primary", icon: Send },
                { label: "Shortlisted", value: "184", color: "info", icon: Users },
                { label: "Selected", value: "142", color: "success", icon: Award },
              ].map((metric, i) => {
                const Icon = metric.icon;
                return (
                  <div 
                    key={i} 
                    className="d-flex justify-content-between align-items-center p-2 p-md-3 rounded-3 mb-1 mb-md-2"
                    style={{ 
                      background: 'rgba(0,0,0,0.02)',
                      border: '1px solid rgba(0,0,0,0.05)',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <div className="d-flex align-items-center gap-2">
                      <Icon className={`text-${metric.color}`} style={{ width: 'clamp(0.7rem, 1.5vw, 0.9rem)', height: 'clamp(0.7rem, 1.5vw, 0.9rem)' }} />
                      <span className="small fw-medium text-secondary" style={{ fontSize: 'clamp(0.6rem, 1.2vw, 0.7rem)' }}>
                        {metric.label}
                      </span>
                    </div>
                    <span className={`fw-bold text-${metric.color}`} style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)' }}>
                      {metric.value}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Placement Drives - Responsive */}
      <div className="row g-2 g-md-3 g-lg-4 mt-2 mt-md-3">
        <div className="col-12">
          <div 
            className="card border-0 shadow-sm rounded-3 rounded-lg-4 overflow-hidden"
            style={{ 
              background: '#ffffff',
              border: '1px solid #e9ecef',
            }}
          >
            <div className="card-body p-3 p-md-4">
              <div className="d-flex align-items-center gap-2 mb-3 mb-md-4">
                <div className="p-1 p-md-2 rounded-3" style={{ background: 'rgba(16, 185, 129, 0.08)' }}>
                  <Briefcase className="text-success" style={{ width: 'clamp(0.9rem, 2vw, 1.2rem)', height: 'clamp(0.9rem, 2vw, 1.2rem)' }} />
                </div>
                <h6 className="text-secondary fw-bold text-uppercase m-0" style={{ fontSize: 'clamp(0.55rem, 1.2vw, 0.65rem)', letterSpacing: '0.05em' }}>
                  Recent Placement Drives
                </h6>
                <span className="ms-auto text-secondary" style={{ fontSize: 'clamp(0.5rem, 1vw, 0.6rem)' }}>
                  <Calendar className="d-inline me-1" style={{ width: 'clamp(0.5rem, 1vw, 0.7rem)', height: 'clamp(0.5rem, 1vw, 0.7rem)' }} />
                  Upcoming
                </span>
              </div>
              
              <div className="row g-2 g-md-3">
                {recentDrives.map((job, i) => (
                  <div key={i} className="col-12 col-md-4">
                    <div 
                      className="p-2 p-md-3 rounded-3 h-100"
                      style={{ 
                        background: 'rgba(0,0,0,0.02)',
                        border: '1px solid rgba(0,0,0,0.05)',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <div className="d-flex flex-wrap justify-content-between align-items-start gap-2">
                        <div className="flex-grow-1">
                          <h6 className="fw-bold text-dark m-0 d-flex align-items-center" style={{ fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)' }}>
                            {job.company}
                            <Sparkles className="d-inline text-warning ms-1" style={{ width: 'clamp(0.5rem, 1vw, 0.7rem)', height: 'clamp(0.5rem, 1vw, 0.7rem)' }} />
                          </h6>
                          <p className="small text-secondary mb-1" style={{ fontSize: 'clamp(0.6rem, 1.2vw, 0.7rem)' }}>{job.role}</p>
                          <span className="text-success fw-bold" style={{ fontSize: 'clamp(0.6rem, 1.2vw, 0.7rem)' }}>{job.package}</span>
                        </div>
                        <div className="text-end flex-shrink-0">
                          <span className={`badge bg-${job.color} bg-opacity-10 text-${job.color} border border-${job.color} d-block`} 
                                style={{ fontSize: 'clamp(0.5rem, 1vw, 0.65rem)' }}>
                            {job.status}
                          </span>
                          <div className="text-secondary mt-1" style={{ fontSize: 'clamp(0.45rem, 0.8vw, 0.55rem)' }}>
                            {job.date}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
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

        .animate-slide-up {
          animation: slide-up 0.4s ease-out forwards;
          opacity: 0;
        }

        /* Mobile responsive overrides */
        @media (max-width: 576px) {
          .card-body {
            padding: 0.75rem !important;
          }
          .gap-1 {
            gap: 0.25rem !important;
          }
        }

        @media (min-width: 768px) and (max-width: 991px) {
          .card-body {
            padding: 1rem !important;
          }
        }

        /* Card hover effect */
        .card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.08) !important;
        }

        /* Badge colors */
        .bg-success {
          background-color: #d1fae5 !important;
        }
        .text-success {
          color: #065f46 !important;
        }
        .border-success {
          border-color: #34d399 !important;
        }
        
        .bg-warning {
          background-color: #fef3c7 !important;
        }
        .text-warning {
          color: #92400e !important;
        }
        .border-warning {
          border-color: #fbbf24 !important;
        }
        
        .bg-info {
          background-color: #dbeafe !important;
        }
        .text-info {
          color: #1e40af !important;
        }
        .border-info {
          border-color: #60a5fa !important;
        }
      `}</style>
    </div>
  );
}