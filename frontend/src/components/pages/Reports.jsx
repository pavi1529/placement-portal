// src/components/pages/Reports.jsx
import React, { useState, useEffect } from 'react';
import { 
  BarChart3, TrendingUp, Award, Users, Clock, 
  CheckCircle, XCircle, FileText, Download, 
  Calendar, Eye, Star, Target, LineChart,
  PieChart, Activity, Zap, Sparkles, Medal,
  Trophy, BookOpen, GraduationCap, Briefcase,
  UserCheck, AlertCircle, Info, RefreshCw,
  ChevronDown, ChevronUp, Filter, Search,
  Printer, Share2, Mail, Settings, MoreVertical,
  PercentCircle, Brain, Code, Layers, BarChart,
  PieChart as PieChartIcon, ListChecks, Medal as MedalIcon,
  TrendingUp as TrendingUpIcon, Award as AwardIcon,
  ClipboardCheck, FileBarChart, ChartLine
} from 'lucide-react';

export default function Reports() {
  const [loading, setLoading] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [expandedSections, setExpandedSections] = useState({
    overview: true,
    tests: true,
    applications: true,
    skills: true,
    achievements: true
  });

  
  const [report] = useState({
    student: {
      name: 'John Doe',
      rollNumber: '2021001',
      department: 'Computer Science & Engineering',
      cgpa: 8.92,
      year: 4
    },
    overview: {
      totalTests: 12,
      completedTests: 10,
      avgScore: 76.5,
      highestScore: 92,
      passRate: 85,
      rank: 15,
      totalStudents: 120
    },
    testPerformance: {
      categoryWise: [
        { name: 'Aptitude', score: 82, attempts: 8, pass: 7, icon: Brain },
        { name: 'Technical', score: 74, attempts: 6, pass: 5, icon: Code },
        { name: 'Coding', score: 70, attempts: 5, pass: 3, icon: Layers },
        { name: 'Logical', score: 80, attempts: 4, pass: 4, icon: ListChecks },
      ],
      recentTests: [
        { name: 'Aptitude Mock 3', date: '2026-07-20', score: 85, status: 'Passed', duration: '30 min' },
        { name: 'Coding Challenge 2', date: '2026-07-18', score: 72, status: 'Passed', duration: '45 min' },
        { name: 'Technical Assessment', date: '2026-07-15', score: 58, status: 'Failed', duration: '30 min' },
        { name: 'DBMS Test', date: '2026-07-12', score: 90, status: 'Passed', duration: '20 min' },
        { name: 'Java OOP Test', date: '2026-07-10', score: 78, status: 'Passed', duration: '25 min' },
      ]
    },
    applications: {
      total: 15,
      pending: 3,
      shortlisted: 5,
      selected: 2,
      rejected: 5,
      companies: [
        { name: 'Google', status: 'Selected', date: '2026-07-25', package: '25 LPA' },
        { name: 'Microsoft', status: 'Shortlisted', date: '2026-07-20', package: '22 LPA' },
        { name: 'Amazon', status: 'Rejected', date: '2026-07-15', package: '20 LPA' },
        { name: 'PayPal', status: 'Shortlisted', date: '2026-07-10', package: '12 LPA' },
        { name: 'Zoho', status: 'Selected', date: '2026-07-05', package: '15 LPA' },
      ]
    },
    skills: {
      current: ['ReactJS', 'Node.js', 'Python', 'SQL', 'Data Structures', 'Java'],
      recommended: ['AWS', 'Docker', 'TypeScript', 'Spring Boot', 'MongoDB', 'Redux']
    },
    achievements: [
      { title: 'Top 10% in Aptitude Test', date: '2026-07-20', icon: '🏆' },
      { title: 'Completed 10+ Mock Tests', date: '2026-07-18', icon: '⭐' },
      { title: 'Scored 92% in DBMS Test', date: '2026-07-12', icon: '🎯' },
      { title: 'Selected at Zoho Corporation', date: '2026-07-05', icon: '🎉' },
    ]
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const getStatusColor = (status) => {
    const colors = {
      'Passed': 'success',
      'Failed': 'danger',
      'Selected': 'success',
      'Shortlisted': 'warning',
      'Rejected': 'danger',
      'Pending': 'info'
    };
    return colors[status] || 'secondary';
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Passed': return <CheckCircle size={14} className="text-success" />;
      case 'Failed': return <XCircle size={14} className="text-danger" />;
      case 'Selected': return <CheckCircle size={14} className="text-success" />;
      case 'Shortlisted': return <Star size={14} className="text-warning" />;
      case 'Rejected': return <XCircle size={14} className="text-danger" />;
      default: return <Clock size={14} className="text-info" />;
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="text-secondary mt-3">Loading reports...</p>
      </div>
    );
  }

  const { student, overview, testPerformance, applications, skills, achievements } = report;

  return (
    <div className="animate-fadeIn">
  
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
          <h5 className="text-dark fw-bold m-0 d-flex align-items-center gap-2">
            <BarChart3 size={20} className="text-primary" />
            Student Performance 🎯
          </h5>
          <p className="text-secondary small m-0">Aptitude, Mock, Coding analytics</p>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-primary btn-sm d-flex align-items-center gap-1 shadow-sm transition-all hover:scale-105">
            <FileText size={14} /> Generate PDF
          </button>
          <button className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1">
            <Printer size={14} />
          </button>
          <button className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1">
            <Share2 size={14} />
          </button>
        </div>
      </div>

     
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card border-0 shadow-sm rounded-4 h-100 transition-all hover:translate-y-1" style={{ background: '#ffffff', border: '1px solid #e9ecef' }}>
            <div className="card-body p-3">
              <div className="d-flex align-items-center gap-3">
                <div className="bg-primary bg-opacity-10 p-2 rounded-3">
                  <GraduationCap size={20} className="text-primary" />
                </div>
                <div>
                  <span className="text-secondary small d-block">CGPA</span>
                  <h5 className="text-primary fw-bold m-0">{student.cgpa}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm rounded-4 h-100 transition-all hover:translate-y-1" style={{ background: '#ffffff', border: '1px solid #e9ecef' }}>
            <div className="card-body p-3">
              <div className="d-flex align-items-center gap-3">
                <div className="bg-success bg-opacity-10 p-2 rounded-3">
                  <CheckCircle size={20} className="text-success" />
                </div>
                <div>
                  <span className="text-secondary small d-block">Tests Completed</span>
                  <h5 className="text-success fw-bold m-0">{overview.completedTests}/{overview.totalTests}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm rounded-4 h-100 transition-all hover:translate-y-1" style={{ background: '#ffffff', border: '1px solid #e9ecef' }}>
            <div className="card-body p-3">
              <div className="d-flex align-items-center gap-3">
                <div className="bg-warning bg-opacity-10 p-2 rounded-3">
                  <TrendingUp size={20} className="text-warning" />
                </div>
                <div>
                  <span className="text-secondary small d-block">Avg Score</span>
                  <h5 className="text-warning fw-bold m-0">{overview.avgScore}%</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm rounded-4 h-100 transition-all hover:translate-y-1" style={{ background: '#ffffff', border: '1px solid #e9ecef' }}>
            <div className="card-body p-3">
              <div className="d-flex align-items-center gap-3">
                <div className="bg-info bg-opacity-10 p-2 rounded-3">
                  <Award size={20} className="text-info" />
                </div>
                <div>
                  <span className="text-secondary small d-block">Rank</span>
                  <h5 className="text-info fw-bold m-0">#{overview.rank}/{overview.totalStudents}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <div className="card border-0 shadow-sm rounded-4 mb-4" style={{ background: '#ffffff', border: '1px solid #e9ecef' }}>
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h6 className="text-secondary text-uppercase fw-bold m-0 d-flex align-items-center gap-2" style={{ fontSize: '0.65rem' }}>
              <BarChart size={14} />
              Performance Analytics
            </h6>
            <div className="d-flex gap-2">
              <select 
                className="form-select form-select-sm bg-white text-dark border-light" 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                style={{ fontSize: '0.7rem', width: '120px' }}
              >
                <option value="all">All Time</option>
                <option value="month">This Month</option>
                <option value="week">This Week</option>
              </select>
              <button 
                className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1"
                onClick={() => toggleSection('overview')}
              >
                {expandedSections.overview ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
            </div>
          </div>

          {expandedSections.overview && (
            <div className="row g-3">
              {testPerformance.categoryWise.map((cat, i) => {
                const Icon = cat.icon || BarChart3;
                const barColor = cat.score >= 80 ? 'success' : cat.score >= 60 ? 'warning' : 'danger';
                return (
                  <div key={i} className="col-md-3">
                    <div className="p-3 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <Icon size={16} className="text-primary" />
                        <span className="text-secondary small fw-bold">{cat.name}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-1">
                        <span className="text-dark small fw-bold">{cat.score}%</span>
                        <span className="text-secondary small">{cat.pass}/{cat.attempts} passed</span>
                      </div>
                      <div className="progress" style={{ height: '6px', background: 'rgba(0,0,0,0.05)' }}>
                        <div className={`progress-bar bg-${barColor}`} style={{ width: `${cat.score}%`, borderRadius: '3px' }}></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      
      <div className="card border-0 shadow-sm rounded-4 mb-4" style={{ background: '#ffffff', border: '1px solid #e9ecef' }}>
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h6 className="text-secondary text-uppercase fw-bold m-0 d-flex align-items-center gap-2" style={{ fontSize: '0.65rem' }}>
              <ClipboardCheck size={14} />
              Recent Tests
            </h6>
            <button 
              className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1"
              onClick={() => toggleSection('tests')}
            >
              {expandedSections.tests ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          </div>

          {expandedSections.tests && (
            <div className="table-responsive">
              <table className="table table-hover table-sm mb-0">
                <thead className="text-secondary text-uppercase" style={{ fontSize: '0.55rem', fontWeight: '600' }}>
                  <tr>
                    <th>Test Name</th>
                    <th>Date</th>
                    <th>Duration</th>
                    <th>Score</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody style={{ fontSize: '0.75rem' }}>
                  {testPerformance.recentTests.map((test, idx) => (
                    <tr key={idx} className="transition-all hover:bg-light">
                      <td className="text-dark">{test.name}</td>
                      <td className="text-secondary">{test.date}</td>
                      <td className="text-secondary">{test.duration}</td>
                      <td className={`fw-bold ${test.score >= 70 ? 'text-success' : 'text-danger'}`}>
                        {test.score}%
                      </td>
                      <td>
                        <span className={`badge bg-${getStatusColor(test.status)} bg-opacity-10 text-${getStatusColor(test.status)} border border-${getStatusColor(test.status)} d-inline-flex align-items-center gap-1`}>
                          {getStatusIcon(test.status)}
                          {test.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

    
      <div className="card border-0 shadow-sm rounded-4 mb-4" style={{ background: '#ffffff', border: '1px solid #e9ecef' }}>
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h6 className="text-secondary text-uppercase fw-bold m-0 d-flex align-items-center gap-2" style={{ fontSize: '0.65rem' }}>
              <Briefcase size={14} />
              Application Status
            </h6>
            <button 
              className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1"
              onClick={() => toggleSection('applications')}
            >
              {expandedSections.applications ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          </div>

          {expandedSections.applications && (
            <>
              <div className="row g-2 mb-3">
                <div className="col-3">
                  <div className="text-center p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                    <span className="text-secondary small d-block">Total</span>
                    <span className="text-primary fw-bold">{applications.total}</span>
                  </div>
                </div>
                <div className="col-3">
                  <div className="text-center p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                    <span className="text-secondary small d-block">Pending</span>
                    <span className="text-warning fw-bold">{applications.pending}</span>
                  </div>
                </div>
                <div className="col-3">
                  <div className="text-center p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                    <span className="text-secondary small d-block">Shortlisted</span>
                    <span className="text-primary fw-bold">{applications.shortlisted}</span>
                  </div>
                </div>
                <div className="col-3">
                  <div className="text-center p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                    <span className="text-secondary small d-block">Selected</span>
                    <span className="text-success fw-bold">{applications.selected}</span>
                  </div>
                </div>
              </div>

              <div className="table-responsive">
                <table className="table table-hover table-sm mb-0">
                  <thead className="text-secondary text-uppercase" style={{ fontSize: '0.55rem', fontWeight: '600' }}>
                    <tr>
                      <th>Company</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Package</th>
                    </tr>
                  </thead>
                  <tbody style={{ fontSize: '0.75rem' }}>
                    {applications.companies.map((company, idx) => (
                      <tr key={idx} className="transition-all hover:bg-light">
                        <td className="text-dark fw-bold">{company.name}</td>
                        <td>
                          <span className={`badge bg-${getStatusColor(company.status)} bg-opacity-10 text-${getStatusColor(company.status)} border border-${getStatusColor(company.status)} d-inline-flex align-items-center gap-1`}>
                            {getStatusIcon(company.status)}
                            {company.status}
                          </span>
                        </td>
                        <td className="text-secondary">{company.date}</td>
                        <td className="text-primary">{company.package}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>

      
      <div className="card border-0 shadow-sm rounded-4 mb-4" style={{ background: '#ffffff', border: '1px solid #e9ecef' }}>
        <div className="card-body p-4">
          <h6 className="text-secondary text-uppercase fw-bold mb-3 d-flex align-items-center gap-2" style={{ fontSize: '0.65rem' }}>
            <Target size={14} />
            Skills & Recommendations
          </h6>

          <div className="row g-3">
            <div className="col-md-6">
              <span className="text-secondary small d-block mb-2">
                <CheckCircle size={12} className="text-success me-1" />
                Current Skills
              </span>
              <div className="d-flex flex-wrap gap-1">
                {skills.current.map((skill, i) => (
                  <span key={i} className="badge bg-success bg-opacity-20 text-success border border-success px-2 py-1" style={{ fontSize: '0.65rem' }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="col-md-6">
              <span className="text-secondary small d-block mb-2">
                <TrendingUp size={12} className="text-warning me-1" />
                Recommended Skills
              </span>
              <div className="d-flex flex-wrap gap-1">
                {skills.recommended.map((skill, i) => (
                  <span key={i} className="badge bg-warning bg-opacity-20 text-warning border border-warning px-2 py-1" style={{ fontSize: '0.65rem' }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

     
      <div className="card border-0 shadow-sm rounded-4" style={{ background: '#ffffff', border: '1px solid #e9ecef' }}>
        <div className="card-body p-4">
          <h6 className="text-secondary text-uppercase fw-bold mb-3 d-flex align-items-center gap-2" style={{ fontSize: '0.65rem' }}>
            <Trophy size={14} />
            Achievements
          </h6>

          <div className="row g-3">
            {achievements.map((achievement, i) => (
              <div key={i} className="col-md-3 col-6">
                <div className="p-3 rounded-3 text-center transition-all hover:translate-y-1" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.04)' }}>
                  <div className="display-6 mb-2" style={{ fontSize: '2rem' }}>{achievement.icon}</div>
                  <p className="text-dark small mb-1" style={{ fontSize: '0.7rem' }}>{achievement.title}</p>
                  <span className="text-secondary" style={{ fontSize: '0.55rem' }}>{achievement.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

     
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
        .transition-all {
          transition: all 0.3s ease;
        }
        .hover\\:translate-y-1:hover {
          transform: translateY(-4px);
        }
        .hover\\:scale-105:hover {
          transform: scale(1.05);
        }
        .card {
          transition: all 0.3s ease;
        }
        .card:hover {
          box-shadow: 0 10px 30px rgba(0,0,0,0.08) !important;
        }
        .table > :not(caption) > * > * {
          background-color: transparent;
          color: #1a1a2e;
        }
        .table-hover > tbody > tr:hover > * {
          background-color: rgba(0,0,0,0.02);
        }
        .form-control:focus, .form-select:focus {
          border-color: rgba(79, 70, 229, 0.5) !important;
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1) !important;
        }
        ::-webkit-scrollbar {
          width: 4px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.05);
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(79, 70, 229, 0.3);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}