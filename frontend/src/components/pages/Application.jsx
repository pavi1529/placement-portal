import React, { useState } from 'react';
import { 
  CheckCircle, XCircle, Clock, AlertCircle, Eye, User,
  Briefcase, Building2, Calendar, ArrowUpRight, 
  Search, Filter, Loader2, TrendingUp, Award,
  UserCheck, UserX, UserPlus, Sparkles, Zap,
  Heart, Bookmark, Share2, ExternalLink, RefreshCw,
  Mail, MapPin, DollarSign, GraduationCap
} from 'lucide-react';

export default function Applications({ applications = [] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [selectedApp, setSelectedApp] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const sampleApplications = [
    {
      _id: '1',
      student: {
        name: 'Pavi Student',
        email: 'pavi@gmail.com',
        department: 'CSE',
        cgpa: 8.5,
        phone: '+91 9876543210'
      },
      job: {
        title: 'Software Engineer',
        company: { 
          name: 'Google',
          location: 'Bangalore, India',
          tier: 'Product'
        },
        salary: '₹25 LPA',
        type: 'full-time'
      },
      status: 'Selected',
      appliedDate: '2026-07-20',
      interviewDate: '2026-08-10',
      notes: 'Excellent performance in technical rounds. Selected for final offer.'
    },
    {
      _id: '2',
      student: {
        name: 'Pavi Student',
        email: 'pavi@gmail.com',
        department: 'CSE',
        cgpa: 8.5,
        phone: '+91 9876543210'
      },
      job: {
        title: 'Full Stack Developer',
        company: { 
          name: 'Microsoft',
          location: 'Hyderabad, India',
          tier: 'Product'
        },
        salary: '₹22 LPA',
        type: 'full-time'
      },
      status: 'Shortlisted',
      appliedDate: '2026-07-18',
      interviewDate: '2026-08-12',
      notes: 'Awaiting final HR round. Technical rounds cleared.'
    },
    {
      _id: '3',
      student: {
        name: 'Pavi Student',
        email: 'pavi@gmail.com',
        department: 'CSE',
        cgpa: 8.5,
        phone: '+91 9876543210'
      },
      job: {
        title: 'SDE-1',
        company: { 
          name: 'Amazon',
          location: 'Chennai, India',
          tier: 'Product'
        },
        salary: '₹20 LPA',
        type: 'full-time'
      },
      status: 'Applied',
      appliedDate: '2026-07-22',
      interviewDate: null,
      notes: 'Application under review. Shortlisting in progress.'
    },
    {
      _id: '4',
      student: {
        name: 'Pavi Student',
        email: 'pavi@gmail.com',
        department: 'CSE',
        cgpa: 8.5,
        phone: '+91 9876543210'
      },
      job: {
        title: 'Member Technical Staff',
        company: { 
          name: 'Zoho',
          location: 'Chennai, India',
          tier: 'Product'
        },
        salary: '₹15 LPA',
        type: 'full-time'
      },
      status: 'Rejected',
      appliedDate: '2026-07-15',
      interviewDate: '2026-08-05',
      notes: 'Position filled. Good effort in interview.'
    },
    {
      _id: '5',
      student: {
        name: 'Pavi Student',
        email: 'pavi@gmail.com',
        department: 'CSE',
        cgpa: 8.5,
        phone: '+91 9876543210'
      },
      job: {
        title: 'Software Engineer Intern',
        company: { 
          name: 'PayPal',
          location: 'Bangalore, India',
          tier: 'Product'
        },
        salary: '₹12 LPA',
        type: 'internship'
      },
      status: 'Applied',
      appliedDate: '2026-07-25',
      interviewDate: null,
      notes: 'Awaiting response from hiring team.'
    }
  ];

  const displayApplications = applications?.length > 0 ? applications : sampleApplications;

  const filteredApplications = displayApplications.filter(app => {
    const matchesSearch = app?.student?.name?.toLowerCase().includes(searchQuery?.toLowerCase() || '') ||
                          app?.job?.company?.name?.toLowerCase().includes(searchQuery?.toLowerCase() || '') ||
                          app?.job?.title?.toLowerCase().includes(searchQuery?.toLowerCase() || '');
    const matchesStatus = filterStatus === 'ALL' || app?.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalApplications = displayApplications.length;
  const selectedCount = displayApplications.filter(a => a?.status === 'Selected').length;
  const shortlistedCount = displayApplications.filter(a => a?.status === 'Shortlisted').length;
  const appliedCount = displayApplications.filter(a => a?.status === 'Applied').length;
  const rejectedCount = displayApplications.filter(a => a?.status === 'Rejected').length;

  const getStatusColor = (status) => {
    switch(status) {
      case 'Selected': return 'success';
      case 'Shortlisted': return 'info';
      case 'Applied': return 'warning';
      case 'Rejected': return 'danger';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Selected': return <CheckCircle className="text-success" style={{ width: 'clamp(0.6rem, 1vw, 0.7rem)', height: 'clamp(0.6rem, 1vw, 0.7rem)' }} />;
      case 'Shortlisted': return <Clock className="text-info" style={{ width: 'clamp(0.6rem, 1vw, 0.7rem)', height: 'clamp(0.6rem, 1vw, 0.7rem)' }} />;
      case 'Applied': return <Clock className="text-warning" style={{ width: 'clamp(0.6rem, 1vw, 0.7rem)', height: 'clamp(0.6rem, 1vw, 0.7rem)' }} />;
      case 'Rejected': return <XCircle className="text-danger" style={{ width: 'clamp(0.6rem, 1vw, 0.7rem)', height: 'clamp(0.6rem, 1vw, 0.7rem)' }} />;
      default: return <AlertCircle className="text-secondary" style={{ width: 'clamp(0.6rem, 1vw, 0.7rem)', height: 'clamp(0.6rem, 1vw, 0.7rem)' }} />;
    }
  };

  const getStatusBadgeBg = (status) => {
    switch(status) {
      case 'Selected': return 'rgba(34,197,94,0.08)';
      case 'Shortlisted': return 'rgba(6,182,212,0.08)';
      case 'Applied': return 'rgba(234,179,8,0.08)';
      case 'Rejected': return 'rgba(239,68,68,0.08)';
      default: return 'rgba(148,163,184,0.08)';
    }
  };

  const getStatusBorder = (status) => {
    switch(status) {
      case 'Selected': return 'rgba(34,197,94,0.2)';
      case 'Shortlisted': return 'rgba(6,182,212,0.2)';
      case 'Applied': return 'rgba(234,179,8,0.2)';
      case 'Rejected': return 'rgba(239,68,68,0.2)';
      default: return 'rgba(148,163,184,0.2)';
    }
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric'
    });
  };

  const getCompanyColor = (name) => {
    const colors = {
      'Google': '#4285F4',
      'Microsoft': '#00A4EF',
      'Amazon': '#FF9900',
      'Zoho': '#E4252D',
      'PayPal': '#003087',
      'Cognizant': '#1A4C7A',
      'Freshworks': '#FF6D00',
      'Deloitte': '#0033A0'
    };
    return colors[name] || '#4f46e5';
  };

  const getCompanyInitial = (name) => {
    return name?.charAt(0) || 'C';
  };

  const handleViewDetails = (app) => {
    setSelectedApp(app);
    setShowDetails(true);
  };

  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3 mb-md-4">
        <div>
          <h5 className="text-dark fw-bold m-0" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)' }}>
            Applications
          </h5>
          <p className="text-secondary small m-0" style={{ fontSize: 'clamp(0.6rem, 1vw, 0.7rem)' }}>
            Track your job applications and status
          </p>
        </div>
        <div className="d-flex align-items-center gap-2">
          <span className="badge bg-success bg-opacity-10 text-success border border-success px-2 px-md-3 py-1 py-md-2" style={{ fontSize: 'clamp(0.5rem, 0.9vw, 0.6rem)' }}>
            <Sparkles style={{ width: 'clamp(0.5rem, 0.8vw, 0.7rem)', height: 'clamp(0.5rem, 0.8vw, 0.7rem)', marginRight: '0.2rem' }} />
            {totalApplications} Applications
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row g-2 g-md-3 mb-3 mb-md-4">
        {[
          { label: "Total", value: totalApplications, color: "primary", icon: User },
          { label: "Selected", value: selectedCount, color: "success", icon: CheckCircle },
          { label: "Shortlisted", value: shortlistedCount, color: "info", icon: Clock },
          { label: "Applied", value: appliedCount, color: "warning", icon: AlertCircle },
          { label: "Rejected", value: rejectedCount, color: "danger", icon: XCircle },
        ].map((stat, i) => {
          const Icon = stat.icon;
          const bgColors = {
            primary: 'rgba(59,130,246,0.08)',
            success: 'rgba(34,197,94,0.08)',
            info: 'rgba(6,182,212,0.08)',
            warning: 'rgba(234,179,8,0.08)',
            danger: 'rgba(239,68,68,0.08)'
          };
          return (
            <div key={i} className="col-6 col-lg">
              <div className="card border-0 shadow-sm rounded-3 rounded-md-4 h-100" style={{ background: '#ffffff', border: '1px solid #e9ecef', transition: 'all 0.3s ease' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 0.125rem 0.25rem rgba(0,0,0,0.075)';
                }}
              >
                <div className="card-body p-2 p-md-3">
                  <div className="d-flex align-items-center justify-content-between">
                    <span className="text-secondary fw-bold text-uppercase" style={{ fontSize: 'clamp(0.4rem, 0.7vw, 0.5rem)' }}>{stat.label}</span>
                    <div className={`p-1 p-md-2 rounded-3`} style={{ background: bgColors[stat.color], border: `1px solid ${bgColors[stat.color]}` }}>
                      <Icon className={`text-${stat.color}`} style={{ width: 'clamp(0.7rem, 1.2vw, 0.9rem)', height: 'clamp(0.7rem, 1.2vw, 0.9rem)' }} />
                    </div>
                  </div>
                  <h4 className={`fw-bold text-${stat.color} mb-0`} style={{ fontSize: 'clamp(1rem, 2.5vw, 1.5rem)' }}>{stat.value}</h4>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Search & Filter */}
      <div className="card border-0 shadow-sm rounded-3 rounded-md-4 mb-3 mb-md-4" style={{ background: '#ffffff', border: '1px solid #e9ecef' }}>
        <div className="card-body p-2 p-md-3">
          <div className="d-flex flex-wrap gap-2 align-items-center">
            <div className="d-flex align-items-center gap-2 bg-white px-2 px-md-3 py-1 py-md-2 rounded-3 border border-light flex-grow-1" style={{ maxWidth: 'clamp(160px, 35vw, 300px)' }}>
              <Search className="text-secondary" style={{ width: 'clamp(0.7rem, 1.1vw, 0.8rem)', height: 'clamp(0.7rem, 1.1vw, 0.8rem)' }} />
              <input 
                type="text" 
                className="form-control form-control-sm bg-transparent border-0 text-dark" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ fontSize: 'clamp(0.6rem, 1vw, 0.75rem)', outline: 'none', padding: '0.1rem 0' }}
              />
            </div>
            <div className="d-flex align-items-center gap-1 gap-md-2 bg-white px-2 px-md-3 py-1 py-md-2 rounded-3 border border-light flex-grow-1 flex-md-grow-0">
              <Filter className="text-secondary" style={{ width: 'clamp(0.6rem, 1vw, 0.7rem)', height: 'clamp(0.6rem, 1vw, 0.7rem)' }} />
              <select 
                className="form-select form-select-sm bg-transparent border-0 text-dark" 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.75rem)', width: 'clamp(90px, 15vw, 140px)', outline: 'none', padding: '0.1rem 0.4rem' }}
              >
                <option value="ALL">All Status</option>
                <option value="Applied">Applied</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="Selected">Selected</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <span className="text-secondary small ms-auto d-none d-md-block" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.65rem)' }}>
              {filteredApplications.length} applications
            </span>
          </div>
        </div>
      </div>

      {/* Applications Grid */}
      {filteredApplications.length === 0 ? (
        <div className="card border-0 shadow-sm rounded-4 text-center p-3 p-md-5" style={{ background: '#ffffff', border: '1px solid #e9ecef' }}>
          <Briefcase className="text-secondary mx-auto" style={{ width: 'clamp(2rem, 4vw, 3rem)', height: 'clamp(2rem, 4vw, 3rem)' }} />
          <h6 className="text-secondary mt-3" style={{ fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>No applications found</h6>
          <p className="text-secondary small" style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)' }}>You haven't applied to any jobs yet</p>
          <button className="btn btn-primary btn-sm mt-2" style={{ fontSize: 'clamp(0.65rem, 1vw, 0.75rem)' }}>
            <Briefcase style={{ width: 'clamp(0.6rem, 1vw, 0.8rem)', height: 'clamp(0.6rem, 1vw, 0.8rem)' }} className="me-1" />
            Browse Jobs
          </button>
        </div>
      ) : (
        <div className="row g-2 g-md-3 g-lg-4">
          {filteredApplications.map((app, index) => {
            const statusColor = getStatusColor(app?.status);
            const statusBg = getStatusBadgeBg(app?.status);
            const statusBorder = getStatusBorder(app?.status);
            const companyColor = getCompanyColor(app?.job?.company?.name);
            const companyInitial = getCompanyInitial(app?.job?.company?.name);
            
            return (
              <div key={app?._id || index} className="col-sm-6 col-xl-4">
                <div 
                  className="card border-0 shadow-sm rounded-3 rounded-md-4 h-100"
                  style={{ 
                    background: '#ffffff',
                    border: '1px solid #e9ecef',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 0.125rem 0.25rem rgba(0,0,0,0.075)';
                  }}
                >
                  <div className="card-body p-3 p-md-4 d-flex flex-column">
                    {/* Company Header */}
                    <div className="d-flex align-items-start gap-2 gap-md-3 mb-2 mb-md-3">
                      <div className="d-flex align-items-center justify-content-center rounded-3 flex-shrink-0" style={{ 
                        width: 'clamp(36px, 6vw, 44px)', 
                        height: 'clamp(36px, 6vw, 44px)',
                        background: companyColor,
                        fontSize: 'clamp(0.8rem, 1.5vw, 1rem)',
                        fontWeight: 'bold',
                        color: '#fff',
                        boxShadow: `0 4px 15px ${companyColor}40`
                      }}>
                        {companyInitial}
                      </div>
                      <div className="flex-grow-1 min-w-0">
                        <h6 className="fw-bold text-dark m-0 text-truncate" style={{ fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)' }}>
                          {app?.job?.company?.name || 'N/A'}
                        </h6>
                        <span className="text-secondary d-flex align-items-center gap-1" style={{ fontSize: 'clamp(0.45rem, 0.8vw, 0.55rem)' }}>
                          <Briefcase style={{ width: 'clamp(0.5rem, 0.8vw, 0.6rem)', height: 'clamp(0.5rem, 0.8vw, 0.6rem)' }} /> 
                          {app?.job?.title || 'N/A'}
                        </span>
                      </div>
                      <div className="position-relative flex-shrink-0">
                        <div className={`p-1 p-md-1.5 rounded-circle`} style={{ 
                          background: statusBg,
                          border: `2px solid ${statusBorder}`,
                          boxShadow: `0 0 20px ${statusBorder}`
                        }}>
                          {getStatusIcon(app?.status)}
                        </div>
                      </div>
                    </div>

                    {/* Application Details */}
                    <div className="space-y-1.5 flex-grow-1">
                      <div className="d-flex align-items-center gap-2 p-1 p-md-1.5 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                        <User className="text-primary" style={{ width: 'clamp(0.6rem, 1vw, 0.7rem)', height: 'clamp(0.6rem, 1vw, 0.7rem)' }} />
                        <span className="text-secondary small flex-grow-1" style={{ fontSize: 'clamp(0.5rem, 0.9vw, 0.6rem)' }}>Student</span>
                        <span className="text-dark" style={{ fontSize: 'clamp(0.55rem, 1vw, 0.65rem)' }}>{app?.student?.name || 'N/A'}</span>
                      </div>
                      <div className="d-flex align-items-center gap-2 p-1 p-md-1.5 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                        <Calendar className="text-warning" style={{ width: 'clamp(0.6rem, 1vw, 0.7rem)', height: 'clamp(0.6rem, 1vw, 0.7rem)' }} />
                        <span className="text-secondary small flex-grow-1" style={{ fontSize: 'clamp(0.5rem, 0.9vw, 0.6rem)' }}>Applied</span>
                        <span className="text-dark" style={{ fontSize: 'clamp(0.55rem, 1vw, 0.65rem)' }}>{formatDate(app?.appliedDate)}</span>
                      </div>
                      {app?.interviewDate && (
                        <div className="d-flex align-items-center gap-2 p-1 p-md-1.5 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                          <Clock className="text-info" style={{ width: 'clamp(0.6rem, 1vw, 0.7rem)', height: 'clamp(0.6rem, 1vw, 0.7rem)' }} />
                          <span className="text-secondary small flex-grow-1" style={{ fontSize: 'clamp(0.5rem, 0.9vw, 0.6rem)' }}>Interview</span>
                          <span className="text-dark" style={{ fontSize: 'clamp(0.55rem, 1vw, 0.65rem)' }}>{formatDate(app?.interviewDate)}</span>
                        </div>
                      )}
                    </div>

                    {/* Status Badge & View Button */}
                    <div className="mt-3 pt-2 pt-md-3 border-top border-light d-flex flex-wrap align-items-center justify-content-between gap-2">
                      <span className={`badge bg-${statusColor} bg-opacity-10 text-${statusColor} border border-${statusColor} d-inline-flex align-items-center gap-1 px-2 px-md-3 py-1 py-md-2`} style={{ fontSize: 'clamp(0.45rem, 0.8vw, 0.55rem)' }}>
                        {getStatusIcon(app?.status)}
                        {app?.status || 'Pending'}
                      </span>
                      <button 
                        onClick={() => handleViewDetails(app)}
                        className="btn btn-outline-info btn-sm d-flex align-items-center justify-content-center gap-1 shadow-sm transition-all hover:scale-105"
                        style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)', borderRadius: '8px', padding: '0.25rem 0.4rem' }}
                      >
                        <Eye style={{ width: 'clamp(0.5rem, 0.8vw, 0.7rem)', height: 'clamp(0.5rem, 0.8vw, 0.7rem)' }} /> View
                      </button>
                    </div>

                    {/* Notes */}
                    {app?.notes && (
                      <div className="mt-2">
                        <p className="text-secondary small mb-0" style={{ fontSize: 'clamp(0.45rem, 0.7vw, 0.55rem)' }}>
                          <Sparkles style={{ width: 'clamp(0.3rem, 0.5vw, 0.4rem)', height: 'clamp(0.3rem, 0.5vw, 0.4rem)', marginRight: '0.1rem' }} />
                          {app.notes}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Details Modal */}
      {showDetails && selectedApp && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ 
          zIndex: 9999, 
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(5px)',
          padding: '1rem'
        }}
        onClick={() => {
          setShowDetails(false);
          setSelectedApp(null);
        }}
        >
          <div className="card border-0 shadow-lg rounded-4" style={{ 
            maxWidth: 'clamp(320px, 85vw, 550px)', 
            width: '100%', 
            maxHeight: '90vh', 
            overflowY: 'auto', 
            background: '#ffffff'
          }}
          onClick={(e) => e.stopPropagation()}
          >
            <div className="card-body p-3 p-md-4">
              <div className="d-flex justify-content-between align-items-center mb-3 border-bottom border-light pb-3">
                <h5 className="text-dark fw-bold m-0 d-flex align-items-center gap-2" style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)' }}>
                  <Briefcase className="text-primary" style={{ width: 'clamp(0.9rem, 2vw, 1.2rem)', height: 'clamp(0.9rem, 2vw, 1.2rem)' }} />
                  Application Details
                </h5>
                <button 
                  onClick={() => {
                    setShowDetails(false);
                    setSelectedApp(null);
                  }} 
                  className="btn btn-close"
                  style={{ fontSize: 'clamp(0.6rem, 1vw, 0.9rem)' }}
                ></button>
              </div>

              {/* Company Header */}
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="d-flex align-items-center justify-content-center rounded-3 flex-shrink-0" style={{ 
                  width: 'clamp(40px, 7vw, 48px)', 
                  height: 'clamp(40px, 7vw, 48px)',
                  background: getCompanyColor(selectedApp?.job?.company?.name),
                  fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                  fontWeight: 'bold',
                  color: '#fff'
                }}>
                  {getCompanyInitial(selectedApp?.job?.company?.name)}
                </div>
                <div className="min-w-0">
                  <h5 className="text-dark fw-bold m-0" style={{ fontSize: 'clamp(0.85rem, 2vw, 1.05rem)' }}>
                    {selectedApp?.job?.company?.name || 'N/A'}
                  </h5>
                  <span className="text-secondary" style={{ fontSize: 'clamp(0.6rem, 1.2vw, 0.7rem)' }}>
                    {selectedApp?.job?.title || 'N/A'}
                  </span>
                </div>
              </div>

              {/* Status */}
              <div className="text-center mb-3 p-2 p-md-3 rounded-3" style={{ 
                background: getStatusBadgeBg(selectedApp?.status),
                border: `2px solid ${getStatusBorder(selectedApp?.status)}`
              }}>
                <div className="d-flex align-items-center justify-content-center gap-2 flex-wrap">
                  {getStatusIcon(selectedApp?.status)}
                  <span className={`fw-bold text-${getStatusColor(selectedApp?.status)}`} style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.85rem)' }}>
                    {selectedApp?.status || 'Pending'}
                  </span>
                </div>
              </div>

              {/* Student Details */}
              <h6 className="text-secondary text-uppercase fw-bold mb-2" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                <User style={{ width: 'clamp(0.7rem, 1.2vw, 0.8rem)', height: 'clamp(0.7rem, 1.2vw, 0.8rem)' }} className="me-1" />
                Student Information
              </h6>
              <div className="space-y-2 mb-3">
                <div className="d-flex flex-wrap justify-content-between p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                  <span className="text-secondary small" style={{ fontSize: 'clamp(0.5rem, 0.9vw, 0.6rem)' }}>Name</span>
                  <span className="text-dark" style={{ fontSize: 'clamp(0.55rem, 1vw, 0.65rem)' }}>{selectedApp?.student?.name || 'N/A'}</span>
                </div>
                <div className="d-flex flex-wrap justify-content-between p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                  <span className="text-secondary small" style={{ fontSize: 'clamp(0.5rem, 0.9vw, 0.6rem)' }}>Email</span>
                  <span className="text-dark" style={{ fontSize: 'clamp(0.55rem, 1vw, 0.65rem)' }}>{selectedApp?.student?.email || 'N/A'}</span>
                </div>
                <div className="d-flex flex-wrap justify-content-between p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                  <span className="text-secondary small" style={{ fontSize: 'clamp(0.5rem, 0.9vw, 0.6rem)' }}>Department</span>
                  <span className="text-dark" style={{ fontSize: 'clamp(0.55rem, 1vw, 0.65rem)' }}>{selectedApp?.student?.department || 'N/A'}</span>
                </div>
                <div className="d-flex flex-wrap justify-content-between p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                  <span className="text-secondary small" style={{ fontSize: 'clamp(0.5rem, 0.9vw, 0.6rem)' }}>CGPA</span>
                  <span className="text-primary fw-bold" style={{ fontSize: 'clamp(0.55rem, 1vw, 0.65rem)' }}>{selectedApp?.student?.cgpa || 'N/A'}</span>
                </div>
              </div>

              {/* Job Details */}
              <h6 className="text-secondary text-uppercase fw-bold mb-2" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                <Briefcase style={{ width: 'clamp(0.7rem, 1.2vw, 0.8rem)', height: 'clamp(0.7rem, 1.2vw, 0.8rem)' }} className="me-1" />
                Job Information
              </h6>
              <div className="space-y-2 mb-3">
                <div className="d-flex flex-wrap justify-content-between p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                  <span className="text-secondary small" style={{ fontSize: 'clamp(0.5rem, 0.9vw, 0.6rem)' }}>Position</span>
                  <span className="text-dark" style={{ fontSize: 'clamp(0.55rem, 1vw, 0.65rem)' }}>{selectedApp?.job?.title || 'N/A'}</span>
                </div>
                <div className="d-flex flex-wrap justify-content-between p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                  <span className="text-secondary small" style={{ fontSize: 'clamp(0.5rem, 0.9vw, 0.6rem)' }}>Location</span>
                  <span className="text-dark" style={{ fontSize: 'clamp(0.55rem, 1vw, 0.65rem)' }}>{selectedApp?.job?.company?.location || 'N/A'}</span>
                </div>
                <div className="d-flex flex-wrap justify-content-between p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                  <span className="text-secondary small" style={{ fontSize: 'clamp(0.5rem, 0.9vw, 0.6rem)' }}>Salary</span>
                  <span className="text-success fw-bold" style={{ fontSize: 'clamp(0.55rem, 1vw, 0.65rem)' }}>{selectedApp?.job?.salary || 'N/A'}</span>
                </div>
                <div className="d-flex flex-wrap justify-content-between p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                  <span className="text-secondary small" style={{ fontSize: 'clamp(0.5rem, 0.9vw, 0.6rem)' }}>Type</span>
                  <span className="text-dark" style={{ fontSize: 'clamp(0.55rem, 1vw, 0.65rem)' }}>{selectedApp?.job?.type || 'N/A'}</span>
                </div>
              </div>

              {/* Timeline */}
              <h6 className="text-secondary text-uppercase fw-bold mb-2" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                <Clock style={{ width: 'clamp(0.7rem, 1.2vw, 0.8rem)', height: 'clamp(0.7rem, 1.2vw, 0.8rem)' }} className="me-1" />
                Application Timeline
              </h6>
              <div className="space-y-2 mb-3">
                <div className="d-flex flex-wrap justify-content-between p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                  <span className="text-secondary small" style={{ fontSize: 'clamp(0.5rem, 0.9vw, 0.6rem)' }}>Applied Date</span>
                  <span className="text-dark" style={{ fontSize: 'clamp(0.55rem, 1vw, 0.65rem)' }}>{formatDate(selectedApp?.appliedDate)}</span>
                </div>
                {selectedApp?.interviewDate && (
                  <div className="d-flex flex-wrap justify-content-between p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                    <span className="text-secondary small" style={{ fontSize: 'clamp(0.5rem, 0.9vw, 0.6rem)' }}>Interview Date</span>
                    <span className="text-dark" style={{ fontSize: 'clamp(0.55rem, 1vw, 0.65rem)' }}>{formatDate(selectedApp?.interviewDate)}</span>
                  </div>
                )}
              </div>

              {/* Notes */}
              {selectedApp?.notes && (
                <div className="p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                  <span className="text-secondary d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.9vw, 0.6rem)' }}>Notes</span>
                  <span className="text-dark small" style={{ fontSize: 'clamp(0.55rem, 1vw, 0.65rem)' }}>{selectedApp.notes}</span>
                </div>
              )}

              {/* Actions */}
              <div className="mt-3 pt-3 border-top border-light d-flex gap-2 flex-wrap">
                <button 
                  onClick={() => {
                    setShowDetails(false);
                    setSelectedApp(null);
                  }} 
                  className="btn btn-secondary flex-grow-1"
                  style={{ fontSize: 'clamp(0.6rem, 1vw, 0.7rem)', padding: '0.35rem 0.7rem' }}
                >
                  Close
                </button>
                <button className="btn btn-primary flex-grow-1 d-flex align-items-center justify-content-center gap-1" style={{ fontSize: 'clamp(0.6rem, 1vw, 0.7rem)', padding: '0.35rem 0.7rem' }}>
                  <ExternalLink style={{ width: 'clamp(0.7rem, 1.2vw, 0.9rem)', height: 'clamp(0.7rem, 1.2vw, 0.9rem)' }} /> View Job
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
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
        
        .space-y-1.5 > * + * {
          margin-top: 0.375rem;
        }
        
        .space-y-2 > * + * {
          margin-top: 0.5rem;
        }
        
        .card {
          transition: all 0.3s ease;
        }
        
        .card:hover {
          box-shadow: 0 10px 30px rgba(0,0,0,0.08) !important;
        }
        
        .form-control, .form-select {
          transition: all 0.3s ease;
        }
        
        .form-control:focus, .form-select:focus {
          border-color: rgba(79, 70, 229, 0.5) !important;
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1) !important;
        }
        
        .min-w-0 {
          min-width: 0;
        }
        
        .text-truncate {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        @media (max-width: 576px) {
          .card-body {
            padding: 0.75rem !important;
          }
          .gap-1 {
            gap: 0.25rem !important;
          }
          .btn {
            padding: 0.2rem 0.4rem !important;
          }
          .badge {
            padding: 0.1rem 0.35rem !important;
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