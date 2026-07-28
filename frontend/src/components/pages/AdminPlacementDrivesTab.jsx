import React, { useState, useEffect } from 'react';
import { 
  Briefcase, MapPin, Calendar, Clock, Users, CheckCircle, XCircle, 
  Award, Building2, FileText, Filter, Search, TrendingUp,
  UserCheck, UserX, Sparkles, Link, ExternalLink, Star,
  Bookmark, Download, Bell, Hash, GraduationCap, ClipboardList,
  Code, ListChecks, Calendar as CalendarIcon, Clock as ClockIcon,
  Home, Monitor, Wifi, Eye, Heart, Share2, Mail, Phone,
  DollarSign, Map as MapIcon, Tag, Layers, Zap
} from 'lucide-react';

const API_URL = 'http://localhost:5000/api';

export default function StudentPlacementDrives({ token }) {
  const [drives, setDrives] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [filterWorkMode, setFilterWorkMode] = useState('ALL');
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalDrives: 0,
    eligible: 0,
    applied: 0,
    shortlisted: 0,
    selected: 0
  });
  const [selectedDrive, setSelectedDrive] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [studentId, setStudentId] = useState(localStorage.getItem('studentId'));

 
  const apiCall = async (endpoint, method = 'GET', data = null) => {
    try {
      setLoading(true);
      setError(null);
      
      const options = {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };
      
      if (data) {
        options.body = JSON.stringify(data);
      }
      
      const response = await fetch(`${API_URL}${endpoint}`, options);
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'API call failed');
      }
      
      return result;
    } catch (error) {
      setError(error.message);
      console.error('API Error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };


  const fetchDrives = async () => {
    try {
      const data = await apiCall('/placement-drives');
      if (data.success) {
        setDrives(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching drives:', error);
      setDrives([]);
    }
  };

  const fetchStats = async () => {
    try {
      const data = await apiCall('/placement-drives/stats');
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  // Load data on mount
  useEffect(() => {
    if (token) {
      fetchDrives();
      fetchStats();
    }
  }, [token]);


  const handleApply = async (driveId) => {
    if (!studentId) {
      alert('Please login first!');
      return;
    }

    try {
      const data = await apiCall(`/placement-drives/${driveId}/apply`, 'POST', { studentId });
      if (data.success) {
        alert('✅ Application submitted successfully!');
        fetchDrives();
        fetchStats();
      }
    } catch (error) {
      alert('❌ Failed to apply: ' + error.message);
    }
  };

 
  const getStatusColor = (status) => {
    switch(status) {
      case 'Eligible': return 'success';
      case 'Applied': return 'info';
      case 'Shortlisted': return 'warning';
      case 'Selected': return 'success';
      case 'Rejected': return 'danger';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Selected': return <CheckCircle className="text-success" style={{ width: '0.7rem', height: '0.7rem' }} />;
      case 'Rejected': return <XCircle className="text-danger" style={{ width: '0.7rem', height: '0.7rem' }} />;
      case 'Shortlisted': return <UserCheck className="text-warning" style={{ width: '0.7rem', height: '0.7rem' }} />;
      case 'Applied': return <Clock className="text-info" style={{ width: '0.7rem', height: '0.7rem' }} />;
      case 'Eligible': return <Sparkles className="text-success" style={{ width: '0.7rem', height: '0.7rem' }} />;
      default: return null;
    }
  };

  const getWorkModeIcon = (mode) => {
    switch(mode) {
      case 'Onsite': return <Building2 className="text-primary" style={{ width: '0.7rem', height: '0.7rem' }} />;
      case 'Hybrid': return <Monitor className="text-info" style={{ width: '0.7rem', height: '0.7rem' }} />;
      case 'Remote': return <Wifi className="text-success" style={{ width: '0.7rem', height: '0.7rem' }} />;
      default: return <Home className="text-secondary" style={{ width: '0.7rem', height: '0.7rem' }} />;
    }
  };

  // Filter drives
  const filteredDrives = drives.filter(drive => {
    const matchesSearch = drive?.company?.toLowerCase().includes(searchQuery?.toLowerCase() || '') ||
                          drive?.role?.toLowerCase().includes(searchQuery?.toLowerCase() || '');
    const matchesStatus = filterStatus === 'ALL' || drive?.status === filterStatus;
    const matchesWorkMode = filterWorkMode === 'ALL' || drive?.workMode === filterWorkMode;
    return matchesSearch && matchesStatus && matchesWorkMode;
  });

 
  return (
    <div className="animate-fadeIn">
      {/* Welcome Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h5 className="text-light fw-bold m-0">Placement Drives</h5>
          <p className="text-secondary small m-0">Find and apply to top company drives</p>
        </div>
        <div className="d-flex align-items-center gap-2">
          <span className="badge bg-success bg-opacity-10 text-success border border-success px-3 py-2">
            <Sparkles style={{ width: '0.7rem', height: '0.7rem', marginRight: '0.3rem' }} />
            {stats.eligible || 0} New Opportunities
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row g-3 mb-4">
        {[
          { label: "Total Drives", value: stats.totalDrives || 0, color: "primary", icon: Briefcase },
          { label: "Eligible", value: stats.eligible || 0, color: "success", icon: Sparkles },
          { label: "Applied", value: stats.applied || 0, color: "info", icon: Clock },
          { label: "Shortlisted", value: stats.shortlisted || 0, color: "warning", icon: UserCheck },
          { label: "Selected", value: stats.selected || 0, color: "success", icon: Award },
        ].map((stat, i) => {
          const Icon = stat.icon;
          const bgColors = {
            primary: 'rgba(59,130,246,0.15)',
            success: 'rgba(34,197,94,0.15)',
            info: 'rgba(6,182,212,0.15)',
            warning: 'rgba(234,179,8,0.15)'
          };
          return (
            <div key={i} className="col-6 col-lg">
              <div className="card border-0 shadow-lg rounded-4 h-100 transition-all hover:translate-y-1" style={{ background: 'rgba(20,20,30,0.6)', backdropFilter: 'blur(10px)' }}>
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

      {/* Search & Filter */}
      <div className="card border-0 shadow-lg rounded-4 mb-4" style={{ background: 'rgba(20,20,30,0.6)', backdropFilter: 'blur(10px)' }}>
        <div className="card-body p-3">
          <div className="d-flex flex-wrap gap-3 align-items-center">
            <div className="d-flex align-items-center gap-2 bg-dark px-3 py-2 rounded-3 border border-secondary flex-grow-1" style={{ maxWidth: '300px' }}>
              <Search className="text-secondary" style={{ width: '0.8rem', height: '0.8rem' }} />
              <input 
                type="text" 
                className="form-control form-control-sm bg-transparent border-0 text-light" 
                placeholder="Search companies..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ fontSize: '0.75rem', outline: 'none' }}
              />
            </div>
            <div className="d-flex align-items-center gap-2 bg-dark px-3 py-2 rounded-3 border border-secondary">
              <Filter className="text-secondary" style={{ width: '0.7rem', height: '0.7rem' }} />
              <select 
                className="form-select form-select-sm bg-transparent border-0 text-light" 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                style={{ fontSize: '0.75rem', width: '120px', outline: 'none' }}
              >
                <option value="ALL">All Status</option>
                <option value="Eligible">Eligible</option>
                <option value="Applied">Applied</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="Selected">Selected</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <div className="d-flex align-items-center gap-2 bg-dark px-3 py-2 rounded-3 border border-secondary">
              <Building2 className="text-secondary" style={{ width: '0.7rem', height: '0.7rem' }} />
              <select 
                className="form-select form-select-sm bg-transparent border-0 text-light" 
                value={filterWorkMode}
                onChange={(e) => setFilterWorkMode(e.target.value)}
                style={{ fontSize: '0.75rem', width: '110px', outline: 'none' }}
              >
                <option value="ALL">All Modes</option>
                <option value="Onsite">Onsite</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
            <span className="text-secondary small ms-auto">{filteredDrives.length} drives found</span>
          </div>
        </div>
      </div>

      {/* Drives Cards Grid */}
      {filteredDrives.length === 0 ? (
        <div className="card border-0 shadow-lg rounded-4 text-center p-5" style={{ background: 'rgba(20,20,30,0.6)', backdropFilter: 'blur(10px)' }}>
          <Briefcase className="text-secondary mx-auto" style={{ width: '3rem', height: '3rem' }} />
          <h6 className="text-secondary mt-3">No drives found</h6>
          <p className="text-secondary small">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="row g-4">
          {filteredDrives.map((drive, index) => {
            const companyInitial = drive?.company?.charAt(0) || 'C';
            
            return (
              <div key={drive?._id || index} className="col-md-6 col-lg-4">
                <div 
                  className="card border-0 shadow-lg rounded-4 h-100 transition-all hover:translate-y-2"
                  style={{ 
                    background: 'rgba(20,20,30,0.6)', 
                    backdropFilter: 'blur(10px)',
                    animation: `slideUp ${0.3 + index * 0.05}s ease-out forwards`
                  }}
                >
                  <div className="card-body p-4 d-flex flex-column">
                    {/* Header */}
                    <div className="d-flex align-items-start gap-3 mb-3">
                      <div className="d-flex align-items-center justify-content-center rounded-3 flex-shrink-0" style={{ 
                        width: '48px', 
                        height: '48px',
                        background: drive?.color || 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        color: '#fff'
                      }}>
                        {companyInitial}
                      </div>
                      <div className="flex-grow-1 min-w-0">
                        <h6 className="fw-bold text-light m-0" style={{ fontSize: '0.95rem' }}>{drive?.company}</h6>
                        <span className="text-secondary" style={{ fontSize: '0.6rem' }}>{drive?.role}</span>
                        <div className="d-flex align-items-center gap-1 mt-1 flex-wrap">
                          <span className="badge bg-dark text-secondary border border-secondary d-inline-flex align-items-center gap-1" style={{ fontSize: '0.5rem' }}>
                            {getWorkModeIcon(drive?.workMode)}
                            {drive?.workMode || 'N/A'}
                          </span>
                          <span className="badge bg-dark text-secondary border border-secondary d-inline-flex align-items-center gap-1" style={{ fontSize: '0.5rem' }}>
                            <GraduationCap style={{ width: '0.6rem', height: '0.6rem' }} />
                            {drive?.minCgpa || 'N/A'}+ CGPA
                          </span>
                        </div>
                      </div>
                      <div className="d-flex flex-column align-items-end gap-1 flex-shrink-0">
                        <span 
                          className={`badge bg-${getStatusColor(drive?.status)} bg-opacity-10 text-${getStatusColor(drive?.status)} border border-${getStatusColor(drive?.status)} d-inline-flex align-items-center gap-1`}
                          style={{ fontSize: '0.5rem', padding: '0.2rem 0.4rem' }}
                        >
                          {getStatusIcon(drive?.status)}
                          {drive?.status || 'N/A'}
                        </span>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-1.5 flex-grow-1">
                      <div className="d-flex align-items-center gap-2 p-1.5 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                        <DollarSign className="text-primary" style={{ width: '0.7rem', height: '0.7rem' }} />
                        <span className="text-secondary small flex-grow-1" style={{ fontSize: '0.6rem' }}>Package</span>
                        <span className="text-primary fw-bold" style={{ fontSize: '0.7rem' }}>{drive?.package || 'N/A'}</span>
                      </div>
                      <div className="d-flex align-items-center gap-2 p-1.5 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                        <MapPin className="text-info" style={{ width: '0.7rem', height: '0.7rem' }} />
                        <span className="text-secondary small flex-grow-1" style={{ fontSize: '0.6rem' }}>Location</span>
                        <span className="text-light" style={{ fontSize: '0.65rem' }}>{drive?.location || 'N/A'}</span>
                      </div>
                      <div className="d-flex align-items-center gap-2 p-1.5 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                        <Calendar className="text-warning" style={{ width: '0.7rem', height: '0.7rem' }} />
                        <span className="text-secondary small flex-grow-1" style={{ fontSize: '0.6rem' }}>Deadline</span>
                        <span className="text-light" style={{ fontSize: '0.65rem' }}>{drive?.regDeadline ? new Date(drive.regDeadline).toLocaleDateString() : 'N/A'}</span>
                      </div>
                      <div className="d-flex align-items-center gap-2 p-1.5 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                        <Users className="text-success" style={{ width: '0.7rem', height: '0.7rem' }} />
                        <span className="text-secondary small flex-grow-1" style={{ fontSize: '0.6rem' }}>Openings</span>
                        <span className="text-light" style={{ fontSize: '0.65rem' }}>{drive?.openings || 'N/A'}</span>
                      </div>
                    </div>

                    {/* Skills Tags */}
                    {drive?.requiredSkills && drive.requiredSkills.length > 0 && (
                      <div className="mt-2">
                        <div className="d-flex flex-wrap gap-1">
                          {drive.requiredSkills.slice(0, 3).map((skill, i) => (
                            <span key={i} className="badge bg-dark text-secondary border border-secondary" style={{ fontSize: '0.45rem' }}>
                              <Code style={{ width: '0.5rem', height: '0.5rem', marginRight: '0.2rem' }} />
                              {skill}
                            </span>
                          ))}
                          {drive.requiredSkills.length > 3 && (
                            <span className="badge bg-dark text-secondary border border-secondary" style={{ fontSize: '0.45rem' }}>
                              +{drive.requiredSkills.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="mt-3 pt-3 border-top border-secondary d-flex gap-2">
                      <button 
                        onClick={() => { setSelectedDrive(drive); setShowDetailModal(true); }}
                        className="btn btn-outline-info btn-sm flex-grow-1 d-flex align-items-center justify-content-center gap-1 transition-all hover:scale-105"
                        style={{ borderRadius: '8px', fontSize: '0.6rem', fontWeight: '600' }}
                      >
                        <Eye style={{ width: '0.7rem', height: '0.7rem' }} /> View Details
                      </button>
                      <button 
                        onClick={() => handleApply(drive._id)}
                        className={`btn btn-sm flex-grow-1 d-flex align-items-center justify-content-center gap-1 transition-all hover:scale-105 ${drive?.status === 'Selected' ? 'btn-success' : drive?.status === 'Applied' ? 'btn-secondary' : 'btn-primary'}`}
                        style={{ borderRadius: '8px', fontSize: '0.6rem', fontWeight: '600' }}
                        disabled={drive?.status === 'Selected' || drive?.status === 'Applied' || drive?.status === 'Shortlisted'}
                      >
                        {drive?.status === 'Selected' ? (
                          <><CheckCircle style={{ width: '0.7rem', height: '0.7rem' }} /> Selected</>
                        ) : drive?.status === 'Applied' ? (
                          <><Clock style={{ width: '0.7rem', height: '0.7rem' }} /> Applied</>
                        ) : drive?.status === 'Shortlisted' ? (
                          <><UserCheck style={{ width: '0.7rem', height: '0.7rem' }} /> Shortlisted</>
                        ) : (
                          <><ExternalLink style={{ width: '0.7rem', height: '0.7rem' }} /> Apply Now</>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

     
      {showDetailModal && selectedDrive && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ 
          zIndex: 9999, 
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(10px)',
          animation: 'fadeIn 0.3s ease'
        }}>
          <div className="card border-0 shadow-2xl rounded-4" style={{ 
            maxWidth: '700px', 
            width: '95%', 
            maxHeight: '90vh', 
            overflowY: 'auto', 
            background: 'rgba(20,20,30,0.95)',
            backdropFilter: 'blur(20px)'
          }}>
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-3 border-bottom border-secondary pb-3">
                <h5 className="text-light fw-bold m-0 d-flex align-items-center gap-2">
                  <Briefcase className="text-primary" style={{ width: '1.2rem', height: '1.2rem' }} />
                  Drive Details
                </h5>
                <button onClick={() => setShowDetailModal(false)} className="btn btn-close btn-close-white"></button>
              </div>

              {/* Company Header */}
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="d-flex align-items-center justify-content-center rounded-3" style={{ 
                  width: '56px', 
                  height: '56px',
                  background: selectedDrive?.color || 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                  fontSize: '1.4rem',
                  fontWeight: 'bold',
                  color: '#fff'
                }}>
                  {selectedDrive?.company?.charAt(0) || 'C'}
                </div>
                <div>
                  <h5 className="text-light fw-bold m-0">{selectedDrive?.company}</h5>
                  <span className="text-secondary" style={{ fontSize: '0.7rem' }}>{selectedDrive?.role}</span>
                  <div className="d-flex align-items-center gap-2 mt-1 flex-wrap">
                    <span className={`badge bg-${getStatusColor(selectedDrive?.status)} bg-opacity-10 text-${getStatusColor(selectedDrive?.status)} border border-${getStatusColor(selectedDrive?.status)} d-inline-flex align-items-center gap-1`}>
                      {getStatusIcon(selectedDrive?.status)}
                      {selectedDrive?.status}
                    </span>
                    <span className="badge bg-dark text-secondary border border-secondary d-inline-flex align-items-center gap-1">
                      {getWorkModeIcon(selectedDrive?.workMode)}
                      {selectedDrive?.workMode}
                    </span>
                  </div>
                </div>
              </div>

              {/* Details Grid */}
              <div className="row g-2 mb-3">
                <div className="col-6">
                  <div className="p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <span className="text-secondary small d-block" style={{ fontSize: '0.55rem' }}>Package</span>
                    <span className="text-primary fw-bold">{selectedDrive?.package || 'N/A'}</span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <span className="text-secondary small d-block" style={{ fontSize: '0.55rem' }}>Location</span>
                    <span className="text-light">{selectedDrive?.location || 'N/A'}</span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <span className="text-secondary small d-block" style={{ fontSize: '0.55rem' }}>Min CGPA</span>
                    <span className="text-light">{selectedDrive?.minCgpa || 'N/A'}+</span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <span className="text-secondary small d-block" style={{ fontSize: '0.55rem' }}>Eligible Batch</span>
                    <span className="text-light">{selectedDrive?.eligibleBatch || 'N/A'}</span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <span className="text-secondary small d-block" style={{ fontSize: '0.55rem' }}>Openings</span>
                    <span className="text-light">{selectedDrive?.openings || 'N/A'}</span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <span className="text-secondary small d-block" style={{ fontSize: '0.55rem' }}>Drive Date</span>
                    <span className="text-light">{selectedDrive?.driveDate ? new Date(selectedDrive.driveDate).toLocaleDateString() : 'N/A'}</span>
                  </div>
                </div>
              </div>

              {/* Eligible Departments */}
              {selectedDrive?.eligibleDepts && selectedDrive.eligibleDepts.length > 0 && (
                <div className="mb-2">
                  <span className="text-secondary small d-block" style={{ fontSize: '0.55rem' }}>Eligible Departments</span>
                  <div className="d-flex flex-wrap gap-1 mt-1">
                    {selectedDrive.eligibleDepts.map((dept, i) => (
                      <span key={i} className="badge bg-primary bg-opacity-10 text-primary border border-primary" style={{ fontSize: '0.55rem' }}>
                        {dept}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Selection Process */}
              {selectedDrive?.selectionProcess && selectedDrive.selectionProcess.length > 0 && (
                <div className="mb-2">
                  <span className="text-secondary small d-block" style={{ fontSize: '0.55rem' }}>Selection Process</span>
                  <div className="d-flex flex-wrap gap-1 mt-1">
                    {selectedDrive.selectionProcess.map((step, i) => (
                      <span key={i} className="badge bg-info bg-opacity-10 text-info border border-info" style={{ fontSize: '0.55rem' }}>
                        <ListChecks style={{ width: '0.6rem', height: '0.6rem', marginRight: '0.2rem' }} />
                        {step}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Required Skills */}
              {selectedDrive?.requiredSkills && selectedDrive.requiredSkills.length > 0 && (
                <div className="mb-2">
                  <span className="text-secondary small d-block" style={{ fontSize: '0.55rem' }}>Required Skills</span>
                  <div className="d-flex flex-wrap gap-1 mt-1">
                    {selectedDrive.requiredSkills.map((skill, i) => (
                      <span key={i} className="badge bg-warning bg-opacity-10 text-warning border border-warning" style={{ fontSize: '0.55rem' }}>
                        <Code style={{ width: '0.6rem', height: '0.6rem', marginRight: '0.2rem' }} />
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              {selectedDrive?.description && (
                <div className="mb-2 p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <span className="text-secondary small d-block" style={{ fontSize: '0.55rem' }}>Job Description</span>
                  <p className="text-secondary small mb-0" style={{ fontSize: '0.7rem' }}>{selectedDrive.description}</p>
                </div>
              )}

              {/* Eligibility Criteria */}
              {selectedDrive?.eligibilityCriteria && (
                <div className="mb-2 p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <span className="text-secondary small d-block" style={{ fontSize: '0.55rem' }}>Eligibility Criteria</span>
                  <p className="text-secondary small mb-0" style={{ fontSize: '0.7rem' }}>{selectedDrive.eligibilityCriteria}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-3 pt-3 border-top border-secondary d-flex flex-wrap gap-2">
                <button 
                  onClick={() => handleApply(selectedDrive._id)}
                  className={`btn btn-sm flex-grow-1 d-flex align-items-center justify-content-center gap-1 ${selectedDrive?.status === 'Selected' ? 'btn-success' : selectedDrive?.status === 'Applied' ? 'btn-secondary' : 'btn-primary'}`}
                  style={{ borderRadius: '10px', fontWeight: '600' }}
                  disabled={selectedDrive?.status === 'Selected' || selectedDrive?.status === 'Applied' || selectedDrive?.status === 'Shortlisted'}
                >
                  {selectedDrive?.status === 'Selected' ? (
                    <><CheckCircle style={{ width: '0.9rem', height: '0.9rem' }} /> Selected</>
                  ) : selectedDrive?.status === 'Applied' ? (
                    <><Clock style={{ width: '0.9rem', height: '0.9rem' }} /> Applied</>
                  ) : selectedDrive?.status === 'Shortlisted' ? (
                    <><UserCheck style={{ width: '0.9rem', height: '0.9rem' }} /> Shortlisted</>
                  ) : (
                    <><ExternalLink style={{ width: '0.9rem', height: '0.9rem' }} /> Apply Now</>
                  )}
                </button>
                <button className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1" style={{ borderRadius: '10px' }}>
                  <Download style={{ width: '0.9rem', height: '0.9rem' }} /> JD
                </button>
                <button className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1" style={{ borderRadius: '10px' }}>
                  <Bell style={{ width: '0.9rem', height: '0.9rem' }} /> Remind
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
        
        .card {
          transition: all 0.3s ease;
        }
        
        .card:hover {
          box-shadow: 0 20px 40px rgba(0,0,0,0.4) !important;
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