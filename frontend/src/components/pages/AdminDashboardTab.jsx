import React from 'react';
import { Users, Building2, Briefcase, HelpCircle, Award, BarChart3 } from 'lucide-react';

export default function AdminDashboardTab() {
  return (
    <div>
      <div className="row g-3">
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
              <div className="bg-dark border border-secondary p-3 rounded-4 shadow-lg h-100" style={{ background: 'rgba(20,20,30,0.6)' }}>
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <span className="text-secondary small fw-bold text-uppercase" style={{ fontSize: '0.55rem' }}>{stat.title}</span>
                  <div className={`bg-${stat.color} bg-opacity-10 p-2 rounded-3 border border-${stat.color} border-opacity-10`}>
                    <Icon className={`text-${stat.color}`} style={{ width: '1rem', height: '1rem' }} />
                  </div>
                </div>
                <p className={`h4 fw-bold mb-1 text-${stat.color}`}>{stat.val}</p>
                <span className="text-secondary small" style={{ fontSize: '0.6rem' }}>{stat.desc}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="row g-3 mt-2">
        <div className="col-lg-8">
          <div className="bg-dark border border-secondary p-4 rounded-4 shadow-lg" style={{ background: 'rgba(20,20,30,0.6)' }}>
            <h6 className="text-secondary text-uppercase fw-bold mb-3" style={{ fontSize: '0.65rem' }}>Placement Success Rate</h6>
            <div className="bg-dark p-3 rounded-3 d-flex align-items-end justify-content-between gap-2" style={{ height: '130px', background: 'rgba(0,0,0,0.3)' }}>
              {[35, 48, 62, 75, 85, 92].map((bar, i) => (
                <div key={i} className="flex-grow-1 d-flex flex-column align-items-center gap-1">
                  <div className="w-100 bg-primary bg-gradient rounded-top" style={{ height: `${bar}%`, minHeight: '10px' }}></div>
                  <span className="text-secondary small font-monospace fw-bold" style={{ fontSize: '0.5rem' }}>202{i+1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="bg-dark border border-secondary p-4 rounded-4 shadow-lg h-100" style={{ background: 'rgba(20,20,30,0.6)' }}>
            <h6 className="text-secondary text-uppercase fw-bold mb-3" style={{ fontSize: '0.65rem' }}>Quick Metrics</h6>
            <div className="bg-dark p-3 rounded-3 mb-2" style={{ background: 'rgba(0,0,0,0.3)' }}>
              <div className="d-flex justify-content-between small fw-bold">
                <span className="text-secondary">Applications</span>
                <span className="text-primary font-monospace">312</span>
              </div>
            </div>
            <div className="bg-dark p-3 rounded-3 mb-2" style={{ background: 'rgba(0,0,0,0.3)' }}>
              <div className="d-flex justify-content-between small fw-bold">
                <span className="text-secondary">Shortlisted</span>
                <span className="text-info font-monospace">184</span>
              </div>
            </div>
            <div className="bg-dark p-3 rounded-3" style={{ background: 'rgba(0,0,0,0.3)' }}>
              <div className="d-flex justify-content-between small fw-bold">
                <span className="text-secondary">Selected</span>
                <span className="text-success font-monospace">142</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}