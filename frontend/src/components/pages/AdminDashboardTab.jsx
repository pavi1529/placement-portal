import React from 'react';
import { Users, Building2, Briefcase, HelpCircle, Award, BarChart3 } from 'lucide-react';

export default function AdminDashboardTab() {
  return (
    <div className="animate-fadeIn">
      {/* Stats Cards - Responsive */}
      <div className="row g-2 g-md-3 mb-3 mb-md-4">
        {[
          { title: "Students", val: "482", desc: "Registered", icon: Users, color: "primary" },
          { title: "Companies", val: "48", desc: "Active", icon: Building2, color: "success" },
          { title: "Jobs", val: "12", desc: "Open", icon: Briefcase, color: "info" },
          { title: "Questions", val: "1.2K", desc: "In database", icon: HelpCircle, color: "warning" },
          { title: "Tests", val: "24", desc: "Executed", icon: Award, color: "danger" },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="col-6 col-lg">
              <div className="card border-0 shadow-sm rounded-3 rounded-md-4 h-100" style={{ 
                background: 'rgba(20,20,30,0.6)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.05)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              >
                <div className="card-body p-2 p-md-3">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span className="text-secondary fw-bold text-uppercase" style={{ 
                      fontSize: 'clamp(0.4rem, 0.6vw, 0.55rem)' 
                    }}>
                      {stat.title}
                    </span>
                    <div className={`p-1 p-md-2 rounded-3`} style={{ 
                      background: `rgba(var(--bs-${stat.color}-rgb), 0.1)`, 
                      border: `1px solid rgba(var(--bs-${stat.color}-rgb), 0.15)` 
                    }}>
                      <Icon className={`text-${stat.color}`} style={{ 
                        width: 'clamp(0.7rem, 1.2vw, 1rem)', 
                        height: 'clamp(0.7rem, 1.2vw, 1rem)' 
                      }} />
                    </div>
                  </div>
                  <p className={`h4 fw-bold mb-0 text-${stat.color}`} style={{ 
                    fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)' 
                  }}>{stat.val}</p>
                  <span className="text-secondary small" style={{ 
                    fontSize: 'clamp(0.5rem, 0.7vw, 0.6rem)' 
                  }}>{stat.desc}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Chart & Metrics - Responsive */}
      <div className="row g-2 g-md-3 mt-1 mt-md-2">
        {/* Placement Success Rate Chart */}
        <div className="col-12 col-lg-8">
          <div className="card border-0 shadow-sm rounded-3 rounded-md-4" style={{ 
            background: 'rgba(20,20,30,0.6)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            <div className="card-body p-3 p-md-4">
              <h6 className="text-secondary text-uppercase fw-bold mb-3" style={{ 
                fontSize: 'clamp(0.55rem, 0.8vw, 0.65rem)' 
              }}>
                <BarChart3 style={{ 
                  width: 'clamp(0.7rem, 1.2vw, 0.9rem)', 
                  height: 'clamp(0.7rem, 1.2vw, 0.9rem)' 
                }} className="me-2 d-inline" />
                Placement Success Rate
              </h6>
              <div className="d-flex align-items-end justify-content-between gap-1 gap-md-2" style={{ 
                height: 'clamp(100px, 25vh, 130px)',
                padding: 'clamp(0.3rem, 0.5vw, 0.5rem)',
                background: 'rgba(0,0,0,0.2)',
                borderRadius: '8px'
              }}>
                {[35, 48, 62, 75, 85, 92].map((bar, i) => (
                  <div key={i} className="flex-grow-1 d-flex flex-column align-items-center gap-1">
                    <div 
                      className="w-100 rounded-top transition-all"
                      style={{ 
                        height: `${bar}%`, 
                        minHeight: 'clamp(15px, 3vw, 20px)',
                        background: `linear-gradient(180deg, ${i % 2 === 0 ? '#4f46e5' : '#7c3aed'}, ${i % 2 === 0 ? '#6366f1' : '#8b5cf6'})`,
                        borderRadius: '4px 4px 0 0',
                        boxShadow: `0 4px 15px rgba(79, 70, 229, 0.2)`,
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scaleY(1.08)';
                        e.currentTarget.style.boxShadow = '0 8px 30px rgba(79, 70, 229, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scaleY(1)';
                        e.currentTarget.style.boxShadow = '0 4px 15px rgba(79, 70, 229, 0.2)';
                      }}
                    >
                      <div className="text-center text-white fw-bold" style={{ 
                        fontSize: 'clamp(0.35rem, 0.6vw, 0.5rem)', 
                        paddingTop: '2px' 
                      }}>
                        {bar}%
                      </div>
                    </div>
                    <span className="text-secondary font-monospace fw-bold" style={{ 
                      fontSize: 'clamp(0.4rem, 0.6vw, 0.5rem)' 
                    }}>
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
          <div className="card border-0 shadow-sm rounded-3 rounded-md-4 h-100" style={{ 
            background: 'rgba(20,20,30,0.6)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            <div className="card-body p-3 p-md-4">
              <h6 className="text-secondary text-uppercase fw-bold mb-3" style={{ 
                fontSize: 'clamp(0.55rem, 0.8vw, 0.65rem)' 
              }}>
                Quick Metrics
              </h6>
              <div className="space-y-2">
                {[
                  { label: "Applications", value: "312", color: "primary" },
                  { label: "Shortlisted", value: "184", color: "info" },
                  { label: "Selected", value: "142", color: "success" },
                ].map((metric, i) => (
                  <div 
                    key={i} 
                    className="p-2 p-md-3 rounded-3 transition-all"
                    style={{ 
                      background: 'rgba(0,0,0,0.2)',
                      border: '1px solid rgba(255,255,255,0.05)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                      e.currentTarget.style.transform = 'translateX(4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(0,0,0,0.2)';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    <div className="d-flex justify-content-between small fw-bold">
                      <span className="text-secondary" style={{ 
                        fontSize: 'clamp(0.6rem, 0.9vw, 0.7rem)' 
                      }}>{metric.label}</span>
                      <span className={`text-${metric.color} font-monospace`} style={{ 
                        fontSize: 'clamp(0.65rem, 1vw, 0.75rem)' 
                      }}>{metric.value}</span>
                    </div>
                  </div>
                ))}
              </div>
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
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        .transition-all {
          transition: all 0.3s ease;
        }
        
        .space-y-2 > * + * {
          margin-top: 0.5rem;
        }

        /* Card Styles */
        .card {
          transition: all 0.3s ease;
        }
        
        .card:hover {
          box-shadow: 0 10px 30px rgba(0,0,0,0.3) !important;
        }

        /* Scrollbar */
        ::-webkit-scrollbar {
          width: 4px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.05);
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(79, 70, 229, 0.3);
          border-radius: 10px;
        }

        @media (max-width: 576px) {
          .card-body {
            padding: 0.75rem !important;
          }
          .gap-1 {
            gap: 0.25rem !important;
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