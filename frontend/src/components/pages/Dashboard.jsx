import React from 'react';
import { Send, Building2, Award, Code2, BarChart3, TrendingUp, Briefcase, Users, Calendar, Clock, Sparkles } from 'lucide-react';

export default function Dashboard() {
  // Sample data for recent drives
  const recentDrives = [
    { company: "Zoho", role: "Member Technical Staff", package: "8.5 LPA", status: "Eligible", color: "success", date: "Jul 28, 2026" },
    { company: "Cognizant", role: "GenC Elevate", package: "4.5 LPA", status: "Applied", color: "warning", date: "Jul 30, 2026" },
    { company: "PayPal", role: "Software Engineer Intern", package: "12 LPA", status: "Shortlisted", color: "info", date: "Expired" },
  ];

  const stats = [
    { title: "Applications", val: "482", desc: "Submitted", icon: Send, color: "primary", gradient: "from-blue-500 to-indigo-500" },
    { title: "Companies", val: "48", desc: "Active", icon: Building2, color: "success", gradient: "from-emerald-500 to-teal-500" },
    { title: "Mock Tests", val: "24", desc: "Executed", icon: Award, color: "danger", gradient: "from-rose-500 to-red-500" },
    { title: "Coding", val: "1.2K", desc: "Problems", icon: Code2, color: "warning", gradient: "from-amber-500 to-orange-500" },
  ];

  return (
    <div>
      {/* Stats Cards - Premium Design */}
      <div className="row g-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="col-6 col-lg-3">
              <div 
                className="card border-0 shadow-lg rounded-4 overflow-hidden h-100 animate-slide-up"
                style={{ 
                  animationDelay: `${i * 100}ms`,
                  background: '#ffffff',
                  border: '1px solid #e9ecef',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.06)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px) scale(1.01)';
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.1)';
                  e.currentTarget.style.borderColor = `rgba(59, 130, 246, 0.3)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.06)';
                  e.currentTarget.style.borderColor = '#e9ecef';
                }}
              >
                {/* Animated gradient overlay */}
                <div 
                  className="position-absolute top-0 start-0 w-100 h-100 opacity-10"
                  style={{
                    background: `linear-gradient(135deg, var(--bs-${stat.color}), var(--bs-${stat.color}-light))`,
                    animation: 'pulse-slow 3s ease-in-out infinite'
                  }}
                ></div>
                
                <div className="card-body p-4 position-relative">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <span className="text-secondary fw-bold text-uppercase tracking-wider" style={{ fontSize: '0.6rem', letterSpacing: '0.1em' }}>
                      {stat.title}
                    </span>
                    <div 
                      className="p-2 rounded-3 d-flex align-items-center justify-content-center"
                      style={{ 
                        background: `rgba(var(--bs-${stat.color}-rgb), 0.08)`,
                        border: `1px solid rgba(var(--bs-${stat.color}-rgb), 0.12)`,
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <Icon className={`text-${stat.color}`} style={{ width: '1.2rem', height: '1.2rem' }} />
                    </div>
                  </div>
                  
                  <h2 className={`fw-bold mb-1 text-${stat.color}`} style={{ fontSize: '2.2rem', letterSpacing: '-0.02em' }}>
                    {stat.val}
                  </h2>
                  
                  <span className="text-secondary" style={{ fontSize: '0.7rem' }}>{stat.desc}</span>
                  
                  {/* Animated progress bar */}
                  <div className="mt-3" style={{ height: '3px', background: 'rgba(0,0,0,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
                    <div 
                      className={`bg-${stat.color}`}
                      style={{ 
                        width: `${Math.floor(Math.random() * 30 + 70)}%`,
                        height: '100%',
                        borderRadius: '10px',
                        background: `linear-gradient(90deg, var(--bs-${stat.color}), var(--bs-${stat.color}-light))`,
                        animation: 'progress-glow 2s ease-in-out infinite'
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Chart & Quick Metrics */}
      <div className="row g-4 mt-3">
        {/* Placement Success Rate - Premium Card */}
        <div className="col-lg-8">
          <div 
            className="card border-0 shadow-lg rounded-4 overflow-hidden h-100 animate-slide-up"
            style={{ 
              animationDelay: '200ms',
              background: '#ffffff',
              border: '1px solid #e9ecef',
              boxShadow: '0 8px 30px rgba(0,0,0,0.06)'
            }}
          >
            <div className="card-body p-4">
              <div className="d-flex align-items-center gap-2 mb-4">
                <div className="p-2 rounded-3" style={{ background: 'rgba(59, 130, 246, 0.08)' }}>
                  <BarChart3 className="text-primary" style={{ width: '1.2rem', height: '1.2rem' }} />
                </div>
                <h6 className="text-secondary fw-bold text-uppercase m-0" style={{ fontSize: '0.65rem', letterSpacing: '0.1em' }}>
                  Placement Success Rate
                </h6>
                <span className="ms-auto text-secondary" style={{ fontSize: '0.7rem' }}>
                  <Clock className="d-inline me-1" style={{ width: '0.7rem', height: '0.7rem' }} />
                  Updated
                </span>
              </div>
              
              <div className="d-flex align-items-end justify-content-between gap-3" style={{ height: '150px' }}>
                {[35, 48, 62, 75, 85, 92].map((bar, i) => (
                  <div key={i} className="flex-grow-1 d-flex flex-column align-items-center gap-2 group">
                    <div 
                      className="w-100 rounded-top transition-all duration-500"
                      style={{ 
                        height: `${bar}%`, 
                        minHeight: '20px',
                        background: `linear-gradient(180deg, ${i % 2 === 0 ? '#3b82f6' : '#8b5cf6'}, ${i % 2 === 0 ? '#6366f1' : '#a78bfa'})`,
                        borderRadius: '8px 8px 0 0',
                        boxShadow: `0 4px 20px rgba(59, 130, 246, 0.2)`,
                        transition: 'all 0.5s ease',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scaleY(1.08)';
                        e.currentTarget.style.boxShadow = '0 8px 40px rgba(59, 130, 246, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scaleY(1)';
                        e.currentTarget.style.boxShadow = '0 4px 20px rgba(59, 130, 246, 0.2)';
                      }}
                    >
                      <div className="text-center text-white fw-bold" style={{ fontSize: '0.5rem', paddingTop: '4px' }}>
                        {bar}%
                      </div>
                    </div>
                    <span className="text-secondary font-monospace fw-bold" style={{ fontSize: '0.6rem' }}>
                      {2021 + i}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Metrics - Premium Card */}
        <div className="col-lg-4">
          <div 
            className="card border-0 shadow-lg rounded-4 overflow-hidden h-100 animate-slide-up"
            style={{ 
              animationDelay: '300ms',
              background: '#ffffff',
              border: '1px solid #e9ecef',
              boxShadow: '0 8px 30px rgba(0,0,0,0.06)'
            }}
          >
            <div className="card-body p-4">
              <div className="d-flex align-items-center gap-2 mb-4">
                <div className="p-2 rounded-3" style={{ background: 'rgba(234, 179, 8, 0.08)' }}>
                  <TrendingUp className="text-warning" style={{ width: '1.2rem', height: '1.2rem' }} />
                </div>
                <h6 className="text-secondary fw-bold text-uppercase m-0" style={{ fontSize: '0.65rem', letterSpacing: '0.1em' }}>
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
                    className="d-flex justify-content-between align-items-center p-3 rounded-3 mb-2"
                    style={{ 
                      background: 'rgba(0,0,0,0.02)',
                      border: '1px solid rgba(0,0,0,0.05)',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(0,0,0,0.04)';
                      e.currentTarget.style.transform = 'translateX(6px)';
                      e.currentTarget.style.borderColor = `rgba(var(--bs-${metric.color}-rgb), 0.2)`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(0,0,0,0.02)';
                      e.currentTarget.style.transform = 'translateX(0)';
                      e.currentTarget.style.borderColor = 'rgba(0,0,0,0.05)';
                    }}
                  >
                    <div className="d-flex align-items-center gap-2">
                      <Icon className={`text-${metric.color}`} style={{ width: '0.9rem', height: '0.9rem' }} />
                      <span className="small fw-medium text-secondary">{metric.label}</span>
                    </div>
                    <span className={`fw-bold text-${metric.color}`} style={{ fontSize: '1.1rem' }}>
                      {metric.value}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Placement Drives - Premium Card */}
      <div className="row g-4 mt-3">
        <div className="col-12">
          <div 
            className="card border-0 shadow-lg rounded-4 overflow-hidden animate-slide-up"
            style={{ 
              animationDelay: '400ms',
              background: '#ffffff',
              border: '1px solid #e9ecef',
              boxShadow: '0 8px 30px rgba(0,0,0,0.06)'
            }}
          >
            <div className="card-body p-4">
              <div className="d-flex align-items-center gap-2 mb-4">
                <div className="p-2 rounded-3" style={{ background: 'rgba(16, 185, 129, 0.08)' }}>
                  <Briefcase className="text-success" style={{ width: '1.2rem', height: '1.2rem' }} />
                </div>
                <h6 className="text-secondary fw-bold text-uppercase m-0" style={{ fontSize: '0.65rem', letterSpacing: '0.1em' }}>
                  Recent Placement Drives
                </h6>
                <span className="ms-auto text-secondary" style={{ fontSize: '0.6rem' }}>
                  <Calendar className="d-inline me-1" style={{ width: '0.7rem', height: '0.7rem' }} />
                  Upcoming
                </span>
              </div>
              
              <div className="row g-3">
                {recentDrives.map((job, i) => (
                  <div key={i} className="col-md-4">
                    <div 
                      className="p-3 rounded-3 h-100"
                      style={{ 
                        background: 'rgba(0,0,0,0.02)',
                        border: '1px solid rgba(0,0,0,0.05)',
                        transition: 'all 0.4s ease',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(0,0,0,0.04)';
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)';
                        e.currentTarget.style.borderColor = `rgba(var(--bs-${job.color}-rgb), 0.2)`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(0,0,0,0.02)';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.borderColor = 'rgba(0,0,0,0.05)';
                      }}
                    >
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h6 className="fw-bold text-dark m-0" style={{ fontSize: '0.9rem' }}>
                            {job.company}
                            <Sparkles className="d-inline text-warning ms-1" style={{ width: '0.7rem', height: '0.7rem' }} />
                          </h6>
                          <p className="small text-secondary mb-1">{job.role}</p>
                          <span className="text-success fw-bold" style={{ fontSize: '0.7rem' }}>{job.package}</span>
                        </div>
                        <div className="text-end">
                          <span className={`badge bg-${job.color} bg-opacity-10 text-${job.color} border border-${job.color}`}>
                            {job.status}
                          </span>
                          <div className="text-secondary mt-1" style={{ fontSize: '0.55rem' }}>
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

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.05; }
          50% { opacity: 0.15; }
        }

        @keyframes progress-glow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
          opacity: 0;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.05);
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.3);
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.5);
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
      `}</style>
    </div>
  );
}