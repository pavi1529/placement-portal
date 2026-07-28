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
      case 'Selected': return <CheckCircle className="text-success" style={{ width: '0.7rem', height: '0.7rem' }} />;
      case 'Shortlisted': return <Clock className="text-info" style={{ width: '0.7rem', height: '0.7rem' }} />;
      case 'Applied': return <Clock className="text-warning" style={{ width: '0.7rem', height: '0.7rem' }} />;
      case 'Rejected': return <XCircle className="text-danger" style={{ width: '0.7rem', height: '0.7rem' }} />;
      default: return <AlertCircle className="text-secondary" style={{ width: '0.7rem', height: '0.7rem' }} />;
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

  const getStatusGlow = (status) => {
    switch(status) {
      case 'Selected': return '0 0 20px rgba(34,197,94,0.1)';
      case 'Shortlisted': return '0 0 20px rgba(6,182,212,0.1)';
      case 'Applied': return '0 0 20px rgba(234,179,8,0.1)';
      case 'Rejected': return '0 0 20px rgba(239,68,68,0.1)';
      default: return 'none';
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
     
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h5 className="text-dark fw-bold m-0">Applications</h5>
          <p className="text-secondary small m-0">Track your job applications and status</p>
        </div>
        <div className="d-flex align-items-center gap-2">
          <span className="badge bg-success bg-opacity-10 text-success border border-success px-3 py-2">
            <Sparkles style={{ width: '0.7rem', height: '0.7rem', marginRight: '0.3rem' }} />
            {totalApplications} Applications
          </span>
        </div>
      </div>

     
      <div className="row g-3 mb-4">
        {[
          { label: "Total Applications", value: totalApplications, color: "primary", icon: User },
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
              <div className="card border-0 shadow-sm rounded-4 h-100 transition-all hover:translate-y-1" style={{ background: '#ffffff', border: '1px solid #e9ecef' }}>
                <div className="card-body p-3">
                  <div className="d-flex align-items-center justify-content-between">
                    <span className="text-secondary small fw-bold text-uppercase" style={{ fontSize: '0.5rem' }}>{stat.label}</span>
                    <div className={`p-2 rounded-3`} style={{ background: bgColors[stat.color], border: `1px solid ${bgColors[stat.color]}` }}>
                      <Icon className={`text-${stat.color}`} style={{ width: '0.9rem', height: '0.9rem' }} />
                    </div>
                  </div>
                  <h4 className={`fw-bold text-${stat.color} mb-0`} style={{ fontSize: '1.5rem' }}>{stat.value}</h4>
                </div>
              </div>
            </div>
          );
        })}
      </div>

     
      <div className="card border-0 shadow-sm rounded-4 mb-4" style={{ background: '#ffffff', border: '1px solid #e9ecef' }}>
        <div className="card-body p-3">
          <div className="d-flex flex-wrap gap-3 align-items-center">
            <div className="d-flex align-items-center gap-2 bg-white px-3 py-2 rounded-3 border border-light flex-grow-1" style={{ maxWidth: '300px' }}>
              <Search className="text-secondary" style={{ width: '0.8rem', height: '0.8rem' }} />
              <input 
                type="text" 
                className="form-control form-control-sm bg-transparent border-0 text-dark" 
                placeholder="Search applications..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ fontSize: '0.75rem', outline: 'none' }}
              />
            </div>
            <div className="d-flex align-items-center gap-2 bg-white px-3 py-2 rounded-3 border border-light">
              <Filter className="text-secondary" style={{ width: '0.7rem', height: '0.7rem' }} />
              <select 
                className="form-select form-select-sm bg-transparent border-0 text-dark" 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                style={{ fontSize: '0.75rem', width: '140px', outline: 'none' }}
              >
                <option value="ALL">All Status</option>
                <option value="Applied">Applied</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="Selected">Selected</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <span className="text-secondary small ms-auto">{filteredApplications.length} applications</span>
          </div>
        </div>
      </div>

      
      {filteredApplications.length === 0 ? (
        <div className="card border-0 shadow-sm rounded-4 text-center p-5" style={{ background: '#ffffff', border: '1px solid #e9ecef' }}>
          <Briefcase className="text-secondary mx-auto" style={{ width: '3rem', height: '3rem' }} />
          <h6 className="text-secondary mt-3">No applications found</h6>
          <p className="text-secondary small">You haven't applied to any jobs yet</p>
          <button className="btn btn-primary btn-sm mt-2">
            <Briefcase style={{ width: '0.8rem', height: '0.8rem' }} className="me-1" />
            Browse Jobs
          </button>
        </div>
      ) : (
        <div className="row g-4">
          {filteredApplications.map((app, index) => {
            const statusColor = getStatusColor(app?.status);
            const statusBg = getStatusBadgeBg(app?.status);
            const statusBorder = getStatusBorder(app?.status);
            const statusGlow = getStatusGlow(app?.status);
            const companyColor = getCompanyColor(app?.job?.company?.name);
            const companyInitial = getCompanyInitial(app?.job?.company?.name);
            
            return (
              <div key={app?._id || index} className="col-md-6 col-lg-4">
                <div 
                  className="card border-0 shadow-sm rounded-4 h-100 transition-all hover:translate-y-2"
                  style={{ 
                    background: '#ffffff',
                    border: '1px solid #e9ecef',
                    animation: `slideUp ${0.3 + index * 0.05}s ease-out forwards`
                  }}
                >
                  <div className="card-body p-4 d-flex flex-column">
                    {/* Company Header */}
                    <div className="d-flex align-items-center gap-3 mb-3">
                      <div className="d-flex align-items-center justify-content-center rounded-3 flex-shrink-0" style={{ 
                        width: '44px', 
                        height: '44px',
                        background: companyColor,
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        color: '#fff',
                        boxShadow: `0 4px 15px ${companyColor}40`
                      }}>
                        {companyInitial}
                      </div>
                      <div className="flex-grow-1 min-w-0">
                        <h6 className="fw-bold text-dark m-0 text-truncate">{app?.job?.company?.name || 'N/A'}</h6>
                        <span className="text-secondary d-flex align-items-center gap-1" style={{ fontSize: '0.55rem' }}>
                          <Briefcase style={{ width: '0.6rem', height: '0.6rem' }} /> 
                          {app?.job?.title || 'N/A'}
                        </span>
                      </div>
                      <div className="position-relative">
                        <div className={`p-1.5 rounded-circle`} style={{ 
                          background: statusBg,
                          border: `2px solid ${statusBorder}`,
                          boxShadow: statusGlow
                        }}>
                          {getStatusIcon(app?.status)}
                        </div>
                      </div>
                    </div>

                    {/* Application Details */}
                    <div className="space-y-1.5 flex-grow-1">
                      <div className="d-flex align-items-center gap-2 p-1.5 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                        <User className="text-primary" style={{ width: '0.7rem', height: '0.7rem' }} />
                        <span className="text-secondary small flex-grow-1" style={{ fontSize: '0.6rem' }}>Student</span>
                        <span className="text-dark" style={{ fontSize: '0.65rem' }}>{app?.student?.name || 'N/A'}</span>
                      </div>
                      <div className="d-flex align-items-center gap-2 p-1.5 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                        <Calendar className="text-warning" style={{ width: '0.7rem', height: '0.7rem' }} />
                        <span className="text-secondary small flex-grow-1" style={{ fontSize: '0.6rem' }}>Applied</span>
                        <span className="text-dark" style={{ fontSize: '0.65rem' }}>{formatDate(app?.appliedDate)}</span>
                      </div>
                      {app?.interviewDate && (
                        <div className="d-flex align-items-center gap-2 p-1.5 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                          <Clock className="text-info" style={{ width: '0.7rem', height: '0.7rem' }} />
                          <span className="text-secondary small flex-grow-1" style={{ fontSize: '0.6rem' }}>Interview</span>
                          <span className="text-dark" style={{ fontSize: '0.65rem' }}>{formatDate(app?.interviewDate)}</span>
                        </div>
                      )}
                    </div>

                    {/* Status Badge & View Button */}
                    <div className="mt-3 pt-3 border-top border-light d-flex align-items-center justify-content-between">
                      <span className={`badge bg-${statusColor} bg-opacity-10 text-${statusColor} border border-${statusColor} d-inline-flex align-items-center gap-1 px-3 py-2`} style={{ fontSize: '0.55rem' }}>
                        {getStatusIcon(app?.status)}
                        {app?.status || 'Pending'}
                      </span>
                      <button 
                        onClick={() => handleViewDetails(app)}
                        className="btn btn-outline-info btn-sm d-flex align-items-center justify-content-center gap-1 shadow-sm transition-all hover:scale-105"
                        style={{ fontSize: '0.6rem', borderRadius: '8px' }}
                      >
                        <Eye style={{ width: '0.7rem', height: '0.7rem' }} /> View
                      </button>
                    </div>

                    {/* Notes */}
                    {app?.notes && (
                      <div className="mt-2">
                        <p className="text-secondary small mb-0" style={{ fontSize: '0.55rem' }}>
                          <Sparkles style={{ width: '0.4rem', height: '0.4rem', marginRight: '0.2rem' }} />
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

      
      {showDetails && selectedApp && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ 
          zIndex: 9999, 
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(5px)',
          animation: 'fadeIn 0.3s ease'
        }}>
          <div className="card border-0 shadow-lg rounded-4" style={{ 
            maxWidth: '550px', 
            width: '95%', 
            maxHeight: '90vh', 
            overflowY: 'auto', 
            background: '#ffffff'
          }}>
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-3 border-bottom border-light pb-3">
                <h5 className="text-dark fw-bold m-0 d-flex align-items-center gap-2">
                  <Briefcase className="text-primary" style={{ width: '1.2rem', height: '1.2rem' }} />
                  Application Details
                </h5>
                <button 
                  onClick={() => {
                    setShowDetails(false);
                    setSelectedApp(null);
                  }} 
                  className="btn btn-close"
                ></button>
              </div>

              {/* Company Header */}
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="d-flex align-items-center justify-content-center rounded-3" style={{ 
                  width: '48px', 
                  height: '48px',
                  background: getCompanyColor(selectedApp?.job?.company?.name),
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  color: '#fff'
                }}>
                  {getCompanyInitial(selectedApp?.job?.company?.name)}
                </div>
                <div>
                  <h5 className="text-dark fw-bold m-0">{selectedApp?.job?.company?.name || 'N/A'}</h5>
                  <span className="text-secondary" style={{ fontSize: '0.7rem' }}>{selectedApp?.job?.title || 'N/A'}</span>
                </div>
              </div>

              {/* Status */}
              <div className="text-center mb-3 p-3 rounded-3" style={{ 
                background: getStatusBadgeBg(selectedApp?.status),
                border: `2px solid ${getStatusBorder(selectedApp?.status)}`
              }}>
                <div className="d-flex align-items-center justify-content-center gap-2">
                  {getStatusIcon(selectedApp?.status)}
                  <span className={`fw-bold text-${getStatusColor(selectedApp?.status)}`}>
                    {selectedApp?.status || 'Pending'}
                  </span>
                </div>
              </div>

              {/* Student Details */}
              <h6 className="text-secondary text-uppercase fw-bold mb-2" style={{ fontSize: '0.6rem' }}>
                <User style={{ width: '0.8rem', height: '0.8rem' }} className="me-1" />
                Student Information
              </h6>
              <div className="space-y-2 mb-3">
                <div className="d-flex justify-content-between p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                  <span className="text-secondary small">Name</span>
                  <span className="text-dark">{selectedApp?.student?.name || 'N/A'}</span>
                </div>
                <div className="d-flex justify-content-between p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                  <span className="text-secondary small">Email</span>
                  <span className="text-dark">{selectedApp?.student?.email || 'N/A'}</span>
                </div>
                <div className="d-flex justify-content-between p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                  <span className="text-secondary small">Department</span>
                  <span className="text-dark">{selectedApp?.student?.department || 'N/A'}</span>
                </div>
                <div className="d-flex justify-content-between p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                  <span className="text-secondary small">CGPA</span>
                  <span className="text-primary fw-bold">{selectedApp?.student?.cgpa || 'N/A'}</span>
                </div>
              </div>

              {/* Job Details */}
              <h6 className="text-secondary text-uppercase fw-bold mb-2" style={{ fontSize: '0.6rem' }}>
                <Briefcase style={{ width: '0.8rem', height: '0.8rem' }} className="me-1" />
                Job Information
              </h6>
              <div className="space-y-2 mb-3">
                <div className="d-flex justify-content-between p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                  <span className="text-secondary small">Position</span>
                  <span className="text-dark">{selectedApp?.job?.title || 'N/A'}</span>
                </div>
                <div className="d-flex justify-content-between p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                  <span className="text-secondary small">Location</span>
                  <span className="text-dark">{selectedApp?.job?.company?.location || 'N/A'}</span>
                </div>
                <div className="d-flex justify-content-between p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                  <span className="text-secondary small">Salary</span>
                  <span className="text-success fw-bold">{selectedApp?.job?.salary || 'N/A'}</span>
                </div>
                <div className="d-flex justify-content-between p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                  <span className="text-secondary small">Type</span>
                  <span className="text-dark">{selectedApp?.job?.type || 'N/A'}</span>
                </div>
              </div>

              {/* Application Timeline */}
              <h6 className="text-secondary text-uppercase fw-bold mb-2" style={{ fontSize: '0.6rem' }}>
                <Clock style={{ width: '0.8rem', height: '0.8rem' }} className="me-1" />
                Application Timeline
              </h6>
              <div className="space-y-2 mb-3">
                <div className="d-flex justify-content-between p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                  <span className="text-secondary small">Applied Date</span>
                  <span className="text-dark">{formatDate(selectedApp?.appliedDate)}</span>
                </div>
                {selectedApp?.interviewDate && (
                  <div className="d-flex justify-content-between p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                    <span className="text-secondary small">Interview Date</span>
                    <span className="text-dark">{formatDate(selectedApp?.interviewDate)}</span>
                  </div>
                )}
              </div>

              {/* Notes */}
              {selectedApp?.notes && (
                <div className="p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                  <span className="text-secondary d-block mb-1" style={{ fontSize: '0.6rem' }}>Notes</span>
                  <span className="text-dark small">{selectedApp.notes}</span>
                </div>
              )}

              {/* Actions */}
              <div className="mt-3 pt-3 border-top border-light d-flex gap-2">
                <button 
                  onClick={() => {
                    setShowDetails(false);
                    setSelectedApp(null);
                  }} 
                  className="btn btn-secondary flex-grow-1"
                >
                  Close
                </button>
                <button className="btn btn-primary flex-grow-1 d-flex align-items-center justify-content-center gap-1">
                  <ExternalLink style={{ width: '0.9rem', height: '0.9rem' }} /> View Job
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