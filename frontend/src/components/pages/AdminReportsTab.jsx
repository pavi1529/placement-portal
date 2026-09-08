import React, { useState } from 'react';
import { 
  FileText, Download, TrendingUp, BarChart3, PieChart, 
  Users, Award, Code2, Calendar, Clock, CheckCircle,
  Sparkles, Eye, Printer, Share2, FileSpreadsheet,
  FileBarChart, FilePieChart, FileCode, Filter,
  Search, ChevronDown, ChevronUp, AlertCircle
} from 'lucide-react';

export default function AdminReportsTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('ALL');
  const [expandedReport, setExpandedReport] = useState(null);
  const [generatingReport, setGeneratingReport] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const reports = [
    { 
      id: 1,
      title: "Student Performance", 
      desc: "Aptitude, Mock, Coding analytics", 
      icon: TrendingUp,
      color: "primary",
      bgColor: "rgba(59, 130, 246, 0.1)",
      borderColor: "rgba(59, 130, 246, 0.2)",
      lastGenerated: "2 days ago",
      pages: 4,
      type: "Performance",
      size: "2.4 MB",
      status: "Available"
    },
    { 
      id: 2,
      title: "Placement Statistics", 
      desc: "Selection rates by department", 
      icon: PieChart,
      color: "success",
      bgColor: "rgba(34, 197, 94, 0.1)",
      borderColor: "rgba(34, 197, 94, 0.2)",
      lastGenerated: "5 days ago",
      pages: 6,
      type: "Statistics",
      size: "3.8 MB",
      status: "Available"
    },
    { 
      id: 3,
      title: "Mock Test Reports", 
      desc: "Score breakdowns and analysis", 
      icon: Award,
      color: "warning",
      bgColor: "rgba(234, 179, 8, 0.1)",
      borderColor: "rgba(234, 179, 8, 0.2)",
      lastGenerated: "1 week ago",
      pages: 3,
      type: "Assessment",
      size: "1.2 MB",
      status: "Available"
    },
    { 
      id: 4,
      title: "Coding Sandbox Logs", 
      desc: "Compiler and execution logs", 
      icon: Code2,
      color: "danger",
      bgColor: "rgba(239, 68, 68, 0.1)",
      borderColor: "rgba(239, 68, 68, 0.2)",
      lastGenerated: "3 days ago",
      pages: 8,
      type: "Technical",
      size: "5.6 MB",
      status: "Generating"
    },
    { 
      id: 5,
      title: "Company-wise Analysis", 
      desc: "Hiring patterns and preferences", 
      icon: Users,
      color: "info",
      bgColor: "rgba(6, 182, 212, 0.1)",
      borderColor: "rgba(6, 182, 212, 0.2)",
      lastGenerated: "4 days ago",
      pages: 5,
      type: "Statistics",
      size: "4.1 MB",
      status: "Available"
    },
    { 
      id: 6,
      title: "Monthly Progress Report", 
      desc: "Overall student progress metrics", 
      icon: BarChart3,
      color: "purple",
      bgColor: "rgba(139, 92, 246, 0.1)",
      borderColor: "rgba(139, 92, 246, 0.2)",
      lastGenerated: "1 day ago",
      pages: 10,
      type: "Performance",
      size: "7.2 MB",
      status: "Available"
    },
  ];

  const totalReports = reports.length;
  const availableReports = reports.filter(r => r.status === 'Available').length;
  const generatingReports = reports.filter(r => r.status === 'Generating').length;
  const totalPages = reports.reduce((sum, r) => sum + r.pages, 0);

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          report.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'ALL' || report.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleGeneratePDF = (reportId) => {
    setGeneratingReport(reportId);
    
    setTimeout(() => {
      setGeneratingReport(null);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 2000);
  };

  const toggleExpand = (reportId) => {
    setExpandedReport(expandedReport === reportId ? null : reportId);
  };

  const getIconColor = (color) => {
    const colors = {
      primary: '#3b82f6',
      success: '#22c55e',
      warning: '#eab308',
      danger: '#ef4444',
      info: '#06b6d4',
      purple: '#8b5cf6'
    };
    return colors[color] || colors.primary;
  };

  return (
    <div className="animate-fadeIn">
      {/* Stats Cards - Responsive */}
      <div className="row g-2 g-md-3 mb-3 mb-md-4">
        {[
          { label: "Total Reports", value: totalReports, color: "primary", icon: FileText },
          { label: "Available", value: availableReports, color: "success", icon: CheckCircle },
          { label: "Generating", value: generatingReports, color: "warning", icon: Clock },
          { label: "Total Pages", value: totalPages, color: "info", icon: FileSpreadsheet },
        ].map((stat, i) => {
          const Icon = stat.icon;
          const bgColors = {
            primary: 'rgba(59,130,246,0.08)',
            success: 'rgba(34,197,94,0.08)',
            warning: 'rgba(234,179,8,0.08)',
            info: 'rgba(6,182,212,0.08)'
          };
          return (
            <div key={i} className="col-6 col-lg-3">
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
                  <div className="d-flex align-items-center justify-content-between">
                    <span className="text-secondary fw-bold text-uppercase" style={{ fontSize: 'clamp(0.4rem, 0.7vw, 0.55rem)' }}>
                      {stat.label}
                    </span>
                    <div className={`p-1 p-md-2 rounded-3`} style={{ 
                      background: bgColors[stat.color], 
                      border: `1px solid ${bgColors[stat.color]}` 
                    }}>
                      <Icon className={`text-${stat.color}`} style={{ 
                        width: 'clamp(0.7rem, 1.2vw, 0.9rem)', 
                        height: 'clamp(0.7rem, 1.2vw, 0.9rem)' 
                      }} />
                    </div>
                  </div>
                  <h4 className={`fw-bold text-${stat.color} mb-0`} style={{ 
                    fontSize: 'clamp(1rem, 2.5vw, 1.5rem)' 
                  }}>{stat.value}</h4>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="alert alert-success d-flex align-items-center gap-2 p-2 p-md-3 mb-3 mb-md-4" style={{ 
          background: 'rgba(34,197,94,0.1)',
          border: '1px solid rgba(34,197,94,0.2)',
          borderRadius: '10px',
          color: '#4ade80',
          fontSize: 'clamp(0.65rem, 1vw, 0.75rem)',
          animation: 'slideUp 0.3s ease'
        }}>
          <CheckCircle style={{ 
            width: 'clamp(0.7rem, 1.2vw, 0.8rem)', 
            height: 'clamp(0.7rem, 1.2vw, 0.8rem)' 
          }} />
          Report generated successfully! Download ready.
        </div>
      )}

      {/* Search & Filter - Responsive */}
      <div className="card border-0 shadow-sm rounded-3 rounded-md-4 mb-3 mb-md-4" style={{ 
        background: 'rgba(20,20,30,0.6)', 
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.05)'
      }}>
        <div className="card-body p-2 p-md-3">
          <div className="d-flex flex-wrap gap-2 align-items-center">
            <div className="d-flex align-items-center gap-2 bg-dark px-2 px-md-3 py-1 py-md-2 rounded-3 border border-secondary flex-grow-1" style={{ 
              maxWidth: 'clamp(160px, 35vw, 300px)',
              borderColor: 'rgba(255,255,255,0.1) !important'
            }}>
              <Search className="text-secondary" style={{ 
                width: 'clamp(0.7rem, 1.1vw, 0.8rem)', 
                height: 'clamp(0.7rem, 1.1vw, 0.8rem)' 
              }} />
              <input 
                type="text" 
                className="form-control form-control-sm bg-transparent border-0 text-light" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ 
                  fontSize: 'clamp(0.6rem, 1vw, 0.75rem)', 
                  outline: 'none', 
                  padding: '0.1rem 0',
                  color: '#ffffff !important'
                }}
              />
            </div>
            <div className="d-flex align-items-center gap-1 gap-md-2 bg-dark px-2 px-md-3 py-1 py-md-2 rounded-3 border border-secondary flex-grow-1 flex-md-grow-0" style={{
              borderColor: 'rgba(255,255,255,0.1) !important'
            }}>
              <Filter className="text-secondary" style={{ 
                width: 'clamp(0.6rem, 1vw, 0.7rem)', 
                height: 'clamp(0.6rem, 1vw, 0.7rem)' 
              }} />
              <select 
                className="form-select form-select-sm bg-transparent border-0 text-light" 
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                style={{ 
                  fontSize: 'clamp(0.55rem, 0.9vw, 0.75rem)', 
                  width: 'clamp(90px, 15vw, 140px)', 
                  outline: 'none', 
                  padding: '0.1rem 0.4rem',
                  color: '#ffffff !important'
                }}
              >
                <option value="ALL" style={{ background: '#1a1a2e', color: '#ffffff' }}>All Types</option>
                <option value="Performance" style={{ background: '#1a1a2e', color: '#ffffff' }}>Performance</option>
                <option value="Statistics" style={{ background: '#1a1a2e', color: '#ffffff' }}>Statistics</option>
                <option value="Assessment" style={{ background: '#1a1a2e', color: '#ffffff' }}>Assessment</option>
                <option value="Technical" style={{ background: '#1a1a2e', color: '#ffffff' }}>Technical</option>
              </select>
            </div>
            <span className="text-secondary small ms-auto d-none d-md-block" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.65rem)' }}>
              {filteredReports.length} reports
            </span>
          </div>
        </div>
      </div>

      {/* Reports Grid - Responsive */}
      {filteredReports.length === 0 ? (
        <div className="card border-0 shadow-sm rounded-4 text-center p-3 p-md-5" style={{ 
          background: 'rgba(20,20,30,0.6)', 
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.05)'
        }}>
          <FileText className="text-secondary mx-auto" style={{ 
            width: 'clamp(2rem, 4vw, 3rem)', 
            height: 'clamp(2rem, 4vw, 3rem)' 
          }} />
          <h6 className="text-secondary mt-3" style={{ fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>No reports found</h6>
          <p className="text-secondary small" style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)' }}>Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="row g-2 g-md-3 g-lg-4">
          {filteredReports.map((report, index) => {
            const Icon = report.icon;
            const isExpanded = expandedReport === report.id;
            const isGenerating = generatingReport === report.id;

            return (
              <div key={report.id} className="col-sm-6 col-xl-4">
                <div 
                  className="card border-0 shadow-sm rounded-3 rounded-md-4 h-100"
                  style={{ 
                    background: 'rgba(20,20,30,0.6)', 
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${report.borderColor}`,
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div className="card-body p-3 p-md-4 d-flex flex-column">
                    {/* Header */}
                    <div className="d-flex align-items-start gap-2 gap-md-3 mb-2 mb-md-3">
                      <div 
                        className="p-2 p-md-3 rounded-3 d-flex align-items-center justify-content-center flex-shrink-0"
                        style={{ 
                          background: report.bgColor,
                          border: `1px solid ${report.borderColor}`,
                          width: 'clamp(40px, 6vw, 52px)',
                          height: 'clamp(40px, 6vw, 52px)'
                        }}
                      >
                        <Icon className={`text-${report.color}`} style={{ 
                          width: 'clamp(1rem, 2vw, 1.3rem)', 
                          height: 'clamp(1rem, 2vw, 1.3rem)' 
                        }} />
                      </div>
                      <div className="flex-grow-1 min-w-0">
                        <h6 className="fw-bold text-light m-0" style={{ 
                          fontSize: 'clamp(0.75rem, 1.2vw, 0.85rem)' 
                        }}>
                          {report.title}
                        </h6>
                        <span className="text-secondary" style={{ 
                          fontSize: 'clamp(0.45rem, 0.7vw, 0.55rem)' 
                        }}>{report.type}</span>
                        <div className="d-flex flex-wrap gap-1 mt-1">
                          <span className={`badge bg-${report.color} bg-opacity-10 text-${report.color} border border-${report.color}`} style={{ 
                            fontSize: 'clamp(0.35rem, 0.6vw, 0.45rem)' 
                          }}>
                            {report.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-secondary small flex-grow-1" style={{ 
                      fontSize: 'clamp(0.6rem, 1vw, 0.7rem)' 
                    }}>
                      {report.desc}
                    </p>

                    {/* Meta Info */}
                    <div className="d-flex flex-wrap gap-1 gap-md-2 mb-2 mb-md-3 pt-2 border-top" style={{ borderColor: 'rgba(255,255,255,0.05) !important' }}>
                      <span className="text-secondary d-flex align-items-center gap-1" style={{ 
                        fontSize: 'clamp(0.45rem, 0.7vw, 0.55rem)' 
                      }}>
                        <FileText style={{ 
                          width: 'clamp(0.5rem, 0.7vw, 0.6rem)', 
                          height: 'clamp(0.5rem, 0.7vw, 0.6rem)' 
                        }} />
                        {report.pages} pages
                      </span>
                      <span className="text-secondary d-flex align-items-center gap-1" style={{ 
                        fontSize: 'clamp(0.45rem, 0.7vw, 0.55rem)' 
                      }}>
                        <Clock style={{ 
                          width: 'clamp(0.5rem, 0.7vw, 0.6rem)', 
                          height: 'clamp(0.5rem, 0.7vw, 0.6rem)' 
                        }} />
                        {report.lastGenerated}
                      </span>
                      <span className="text-secondary d-flex align-items-center gap-1" style={{ 
                        fontSize: 'clamp(0.45rem, 0.7vw, 0.55rem)' 
                      }}>
                        <FileSpreadsheet style={{ 
                          width: 'clamp(0.5rem, 0.7vw, 0.6rem)', 
                          height: 'clamp(0.5rem, 0.7vw, 0.6rem)' 
                        }} />
                        {report.size}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="d-flex gap-2">
                      <button 
                        onClick={() => handleGeneratePDF(report.id)}
                        disabled={isGenerating || report.status === 'Generating'}
                        className="btn flex-grow-1 d-flex align-items-center justify-content-center gap-1"
                        style={{ 
                          background: `linear-gradient(135deg, ${getIconColor(report.color)}, ${getIconColor(report.color)}dd)`,
                          border: 'none',
                          color: '#ffffff',
                          fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)',
                          fontWeight: '600',
                          padding: 'clamp(0.3rem, 0.6vw, 0.5rem)',
                          borderRadius: '10px',
                          transition: 'all 0.3s ease',
                          opacity: isGenerating || report.status === 'Generating' ? 0.6 : 1
                        }}
                        onMouseEnter={(e) => {
                          if (!isGenerating && report.status !== 'Generating') {
                            e.currentTarget.style.transform = 'scale(1.03)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                      >
                        {isGenerating ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-1" style={{ 
                              width: 'clamp(0.6rem, 1vw, 0.7rem)', 
                              height: 'clamp(0.6rem, 1vw, 0.7rem)' 
                            }}></span>
                            <span className="d-none d-sm-inline">Generating...</span>
                          </>
                        ) : report.status === 'Generating' ? (
                          <>
                            <Clock style={{ 
                              width: 'clamp(0.6rem, 1vw, 0.7rem)', 
                              height: 'clamp(0.6rem, 1vw, 0.7rem)' 
                            }} />
                            <span className="d-none d-sm-inline">In Progress</span>
                          </>
                        ) : (
                          <>
                            <Download style={{ 
                              width: 'clamp(0.6rem, 1vw, 0.7rem)', 
                              height: 'clamp(0.6rem, 1vw, 0.7rem)' 
                            }} />
                            <span className="d-none d-sm-inline">Generate PDF</span>
                          </>
                        )}
                      </button>
                      
                      <button 
                        onClick={() => toggleExpand(report.id)}
                        className="btn d-flex align-items-center justify-content-center flex-shrink-0"
                        style={{ 
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.06)',
                          color: '#94a3b8',
                          padding: 'clamp(0.3rem, 0.6vw, 0.5rem)',
                          borderRadius: '10px',
                          transition: 'all 0.3s ease',
                          width: 'clamp(32px, 5vw, 38px)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                          e.currentTarget.style.color = '#ffffff';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                          e.currentTarget.style.color = '#94a3b8';
                        }}
                      >
                        {isExpanded ? (
                          <ChevronUp style={{ 
                            width: 'clamp(0.7rem, 1.2vw, 0.8rem)', 
                            height: 'clamp(0.7rem, 1.2vw, 0.8rem)' 
                          }} />
                        ) : (
                          <ChevronDown style={{ 
                            width: 'clamp(0.7rem, 1.2vw, 0.8rem)', 
                            height: 'clamp(0.7rem, 1.2vw, 0.8rem)' 
                          }} />
                        )}
                      </button>
                    </div>

                    {/* Expanded Details */}
                    {isExpanded && (
                      <div className="mt-3 pt-3 border-top" style={{ borderColor: 'rgba(255,255,255,0.05) !important' }}>
                        <div className="space-y-2">
                          <div className="d-flex flex-wrap justify-content-between p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                            <span className="text-secondary" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>Report Type</span>
                            <span className="text-light" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>{report.type}</span>
                          </div>
                          <div className="d-flex flex-wrap justify-content-between p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                            <span className="text-secondary" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>Total Pages</span>
                            <span className="text-light" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>{report.pages}</span>
                          </div>
                          <div className="d-flex flex-wrap justify-content-between p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                            <span className="text-secondary" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>File Size</span>
                            <span className="text-light" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>{report.size}</span>
                          </div>
                          <div className="d-flex flex-wrap justify-content-between p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                            <span className="text-secondary" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>Last Generated</span>
                            <span className="text-light" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>{report.lastGenerated}</span>
                          </div>
                          <div className="d-flex flex-wrap justify-content-between p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                            <span className="text-secondary" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>Status</span>
                            <span className={`text-${report.status === 'Available' ? 'success' : 'warning'}`} style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                              {report.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* CSS */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
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
        
        .hover\\:translate-y-1:hover {
          transform: translateY(-4px);
        }
        
        .hover\\:translate-y-2:hover {
          transform: translateY(-8px);
        }
        
        .hover\\:scale-105:hover {
          transform: scale(1.05);
        }
        
        .focus\\:border-primary:focus {
          border-color: #4f46e5 !important;
        }
        
        .focus\\:outline-none:focus {
          outline: none !important;
        }
        
        .space-y-2 > * + * {
          margin-top: 0.5rem;
        }

        .min-w-0 {
          min-width: 0;
        }
        
        /* Card Styles */
        .card {
          transition: all 0.3s ease;
        }
        
        .card:hover {
          box-shadow: 0 20px 40px rgba(0,0,0,0.4) !important;
        }
        
        /* Form Controls */
        .form-control, .form-select {
          transition: all 0.3s ease;
          background-color: rgba(0,0,0,0.3) !important;
          border: 1px solid rgba(255,255,255,0.1);
          color: #ffffff !important;
        }
        
        .form-control:focus, .form-select:focus {
          border-color: rgba(79, 70, 229, 0.5) !important;
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1) !important;
          background-color: rgba(0,0,0,0.4) !important;
        }
        
        .form-control::placeholder {
          color: rgba(255,255,255,0.3) !important;
        }
        
        /* Spinner */
        .spinner-border {
          animation: spinner-border 0.75s linear infinite;
        }
        
        @keyframes spinner-border {
          to { transform: rotate(360deg); }
        }
        
        /* Alert */
        .alert {
          animation: slideUp 0.3s ease-out;
        }

        @media (max-width: 576px) {
          .card-body {
            padding: 0.75rem !important;
          }
          .gap-1 {
            gap: 0.25rem !important;
          }
          .btn {
            padding: 0.15rem 0.3rem !important;
          }
          .badge {
            padding: 0.1rem 0.3rem !important;
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
      `}</style>
    </div>
  );
}