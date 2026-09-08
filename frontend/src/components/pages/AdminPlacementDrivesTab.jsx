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
      case 'Selected': return <CheckCircle className="text-success" style={{ width: 'clamp(0.6rem, 1vw, 0.7rem)', height: 'clamp(0.6rem, 1vw, 0.7rem)' }} />;
      case 'Rejected': return <XCircle className="text-danger" style={{ width: 'clamp(0.6rem, 1vw, 0.7rem)', height: 'clamp(0.6rem, 1vw, 0.7rem)' }} />;
      case 'Shortlisted': return <UserCheck className="text-warning" style={{ width: 'clamp(0.6rem, 1vw, 0.7rem)', height: 'clamp(0.6rem, 1vw, 0.7rem)' }} />;
      case 'Applied': return <Clock className="text-info" style={{ width: 'clamp(0.6rem, 1vw, 0.7rem)', height: 'clamp(0.6rem, 1vw, 0.7rem)' }} />;
      case 'Eligible': return <Sparkles className="text-success" style={{ width: 'clamp(0.6rem, 1vw, 0.7rem)', height: 'clamp(0.6rem, 1vw, 0.7rem)' }} />;
      default: return null;
    }
  };

  const getWorkModeIcon = (mode) => {
    switch(mode) {
      case 'Onsite': return <Building2 className="text-primary" style={{ width: 'clamp(0.6rem, 1vw, 0.7rem)', height: 'clamp(0.6rem, 1vw, 0.7rem)' }} />;
      case 'Hybrid': return <Monitor className="text-info" style={{ width: 'clamp(0.6rem, 1vw, 0.7rem)', height: 'clamp(0.6rem, 1vw, 0.7rem)' }} />;
      case 'Remote': return <Wifi className="text-success" style={{ width: 'clamp(0.6rem, 1vw, 0.7rem)', height: 'clamp(0.6rem, 1vw, 0.7rem)' }} />;
      default: return <Home className="text-secondary" style={{ width: 'clamp(0.6rem, 1vw, 0.7rem)', height: 'clamp(0.6rem, 1vw, 0.7rem)' }} />;
    }
  };

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
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3 mb-md-4">
        <div>
          <h5 className="text-light fw-bold m-0" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)' }}>
            Placement Drives
          </h5>
          <p className="text-secondary small m-0" style={{ fontSize: 'clamp(0.6rem, 1vw, 0.7rem)' }}>
            Find and apply to top company drives
          </p>
        </div>
        <div className="d-flex align-items-center gap-2">
          <span className="badge bg-success bg-opacity-10 text-success border border-success px-2 px-md-3 py-1 py-md-2" style={{ fontSize: 'clamp(0.5rem, 0.9vw, 0.6rem)' }}>
            <Sparkles style={{ width: 'clamp(0.5rem, 0.8vw, 0.7rem)', height: 'clamp(0.5rem, 0.8vw, 0.7rem)', marginRight: '0.2rem' }} />
            {stats.eligible || 0} New
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row g-2 g-md-3 mb-3 mb-md-4">
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
                    <span className="text-secondary fw-bold text-uppercase" style={{ fontSize: 'clamp(0.4rem, 0.7vw, 0.5rem)' }}>
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

      {/* Search & Filter */}
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
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                style={{ 
                  fontSize: 'clamp(0.55rem, 0.9vw, 0.75rem)', 
                  width: 'clamp(90px, 15vw, 120px)', 
                  outline: 'none', 
                  padding: '0.1rem 0.4rem',
                  color: '#ffffff !important'
                }}
              >
                <option value="ALL" style={{ background: '#1a1a2e', color: '#ffffff' }}>All Status</option>
                <option value="Eligible" style={{ background: '#1a1a2e', color: '#ffffff' }}>Eligible</option>
                <option value="Applied" style={{ background: '#1a1a2e', color: '#ffffff' }}>Applied</option>
                <option value="Shortlisted" style={{ background: '#1a1a2e', color: '#ffffff' }}>Shortlisted</option>
                <option value="Selected" style={{ background: '#1a1a2e', color: '#ffffff' }}>Selected</option>
                <option value="Rejected" style={{ background: '#1a1a2e', color: '#ffffff' }}>Rejected</option>
              </select>
            </div>
            <div className="d-flex align-items-center gap-1 gap-md-2 bg-dark px-2 px-md-3 py-1 py-md-2 rounded-3 border border-secondary flex-grow-1 flex-md-grow-0" style={{
              borderColor: 'rgba(255,255,255,0.1) !important'
            }}>
              <Building2 className="text-secondary" style={{ 
                width: 'clamp(0.6rem, 1vw, 0.7rem)', 
                height: 'clamp(0.6rem, 1vw, 0.7rem)' 
              }} />
              <select 
                className="form-select form-select-sm bg-transparent border-0 text-light" 
                value={filterWorkMode}
                onChange={(e) => setFilterWorkMode(e.target.value)}
                style={{ 
                  fontSize: 'clamp(0.55rem, 0.9vw, 0.75rem)', 
                  width: 'clamp(80px, 12vw, 110px)', 
                  outline: 'none', 
                  padding: '0.1rem 0.4rem',
                  color: '#ffffff !important'
                }}
              >
                <option value="ALL" style={{ background: '#1a1a2e', color: '#ffffff' }}>All Modes</option>
                <option value="Onsite" style={{ background: '#1a1a2e', color: '#ffffff' }}>Onsite</option>
                <option value="Hybrid" style={{ background: '#1a1a2e', color: '#ffffff' }}>Hybrid</option>
                <option value="Remote" style={{ background: '#1a1a2e', color: '#ffffff' }}>Remote</option>
              </select>
            </div>
            <span className="text-secondary small ms-auto d-none d-md-block" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.65rem)' }}>
              {filteredDrives.length} found
            </span>
          </div>
        </div>
      </div>

      {/* Drives Cards Grid */}
      {filteredDrives.length === 0 ? (
        <div className="card border-0 shadow-sm rounded-4 text-center p-3 p-md-5" style={{ 
          background: 'rgba(20,20,30,0.6)', 
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.05)'
        }}>
          <Briefcase className="text-secondary mx-auto" style={{ 
            width: 'clamp(2rem, 4vw, 3rem)', 
            height: 'clamp(2rem, 4vw, 3rem)' 
          }} />
          <h6 className="text-secondary mt-3" style={{ fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>No drives found</h6>
          <p className="text-secondary small" style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)' }}>Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="row g-2 g-md-3 g-lg-4">
          {filteredDrives.map((drive, index) => {
            const companyInitial = drive?.company?.charAt(0) || 'C';
            
            return (
              <div key={drive?._id || index} className="col-sm-6 col-xl-4">
                <div 
                  className="card border-0 shadow-sm rounded-3 rounded-md-4 h-100"
                  style={{ 
                    background: 'rgba(20,20,30,0.6)', 
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.05)',
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
                      <div className="d-flex align-items-center justify-content-center rounded-3 flex-shrink-0" style={{ 
                        width: 'clamp(36px, 6vw, 48px)', 
                        height: 'clamp(36px, 6vw, 48px)',
                        background: drive?.color || 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                        fontSize: 'clamp(0.9rem, 1.5vw, 1.2rem)',
                        fontWeight: 'bold',
                        color: '#fff'
                      }}>
                        {companyInitial}
                      </div>
                      <div className="flex-grow-1 min-w-0">
                        <h6 className="fw-bold text-light m-0" style={{ 
                          fontSize: 'clamp(0.8rem, 1.5vw, 0.95rem)' 
                        }}>
                          {drive?.company}
                        </h6>
                        <span className="text-secondary" style={{ 
                          fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' 
                        }}>
                          {drive?.role}
                        </span>
                        <div className="d-flex flex-wrap align-items-center gap-1 mt-1">
                          <span className="badge bg-dark text-secondary border border-secondary d-inline-flex align-items-center gap-1" style={{ 
                            fontSize: 'clamp(0.4rem, 0.6vw, 0.5rem)' 
                          }}>
                            {getWorkModeIcon(drive?.workMode)}
                            {drive?.workMode || 'N/A'}
                          </span>
                          <span className="badge bg-dark text-secondary border border-secondary d-inline-flex align-items-center gap-1" style={{ 
                            fontSize: 'clamp(0.4rem, 0.6vw, 0.5rem)' 
                          }}>
                            <GraduationCap style={{ 
                              width: 'clamp(0.4rem, 0.6vw, 0.6rem)', 
                              height: 'clamp(0.4rem, 0.6vw, 0.6rem)' 
                            }} />
                            {drive?.minCgpa || 'N/A'}+
                          </span>
                        </div>
                      </div>
                      <div className="d-flex flex-column align-items-end gap-1 flex-shrink-0">
                        <span 
                          className={`badge bg-${getStatusColor(drive?.status)} bg-opacity-10 text-${getStatusColor(drive?.status)} border border-${getStatusColor(drive?.status)} d-inline-flex align-items-center gap-1`}
                          style={{ 
                            fontSize: 'clamp(0.4rem, 0.6vw, 0.5rem)', 
                            padding: '0.15rem 0.3rem' 
                          }}
                        >
                          {getStatusIcon(drive?.status)}
                          {drive?.status || 'N/A'}
                        </span>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-1.5 flex-grow-1">
                      <div className="d-flex flex-wrap justify-content-between align-items-center p-1 p-md-1.5 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                        <span className="text-secondary small" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                          <DollarSign className="text-primary" style={{ 
                            width: 'clamp(0.5rem, 0.8vw, 0.7rem)', 
                            height: 'clamp(0.5rem, 0.8vw, 0.7rem)' 
                          }} /> Package
                        </span>
                        <span className="text-primary fw-bold" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.7rem)' }}>
                          {drive?.package || 'N/A'}
                        </span>
                      </div>
                      <div className="d-flex flex-wrap justify-content-between align-items-center p-1 p-md-1.5 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                        <span className="text-secondary small" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                          <MapPin className="text-info" style={{ 
                            width: 'clamp(0.5rem, 0.8vw, 0.7rem)', 
                            height: 'clamp(0.5rem, 0.8vw, 0.7rem)' 
                          }} /> Location
                        </span>
                        <span className="text-light" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>
                          {drive?.location || 'N/A'}
                        </span>
                      </div>
                      <div className="d-flex flex-wrap justify-content-between align-items-center p-1 p-md-1.5 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                        <span className="text-secondary small" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                          <Calendar className="text-warning" style={{ 
                            width: 'clamp(0.5rem, 0.8vw, 0.7rem)', 
                            height: 'clamp(0.5rem, 0.8vw, 0.7rem)' 
                          }} /> Deadline
                        </span>
                        <span className="text-light" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>
                          {drive?.regDeadline ? new Date(drive.regDeadline).toLocaleDateString() : 'N/A'}
                        </span>
                      </div>
                      <div className="d-flex flex-wrap justify-content-between align-items-center p-1 p-md-1.5 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                        <span className="text-secondary small" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                          <Users className="text-success" style={{ 
                            width: 'clamp(0.5rem, 0.8vw, 0.7rem)', 
                            height: 'clamp(0.5rem, 0.8vw, 0.7rem)' 
                          }} /> Openings
                        </span>
                        <span className="text-light" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>
                          {drive?.openings || 'N/A'}
                        </span>
                      </div>
                    </div>

                    {/* Skills Tags */}
                    {drive?.requiredSkills && drive.requiredSkills.length > 0 && (
                      <div className="mt-2">
                        <div className="d-flex flex-wrap gap-1">
                          {drive.requiredSkills.slice(0, 3).map((skill, i) => (
                            <span key={i} className="badge bg-dark text-secondary border border-secondary" style={{ 
                              fontSize: 'clamp(0.35rem, 0.6vw, 0.45rem)' 
                            }}>
                              <Code style={{ 
                                width: 'clamp(0.4rem, 0.6vw, 0.5rem)', 
                                height: 'clamp(0.4rem, 0.6vw, 0.5rem)', 
                                marginRight: '0.1rem' 
                              }} />
                              {skill}
                            </span>
                          ))}
                          {drive.requiredSkills.length > 3 && (
                            <span className="badge bg-dark text-secondary border border-secondary" style={{ 
                              fontSize: 'clamp(0.35rem, 0.6vw, 0.45rem)' 
                            }}>
                              +{drive.requiredSkills.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="mt-3 pt-2 pt-md-3 border-top border-secondary d-flex gap-2">
                      <button 
                        onClick={() => { setSelectedDrive(drive); setShowDetailModal(true); }}
                        className="btn btn-outline-info btn-sm flex-grow-1 d-flex align-items-center justify-content-center gap-1"
                        style={{ 
                          borderRadius: '8px', 
                          fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)', 
                          fontWeight: '600', 
                          padding: '0.25rem 0.4rem' 
                        }}
                      >
                        <Eye style={{ 
                          width: 'clamp(0.5rem, 0.8vw, 0.7rem)', 
                          height: 'clamp(0.5rem, 0.8vw, 0.7rem)' 
                        }} /> View
                      </button>
                      <button 
                        onClick={() => handleApply(drive._id)}
                        className={`btn btn-sm flex-grow-1 d-flex align-items-center justify-content-center gap-1 ${drive?.status === 'Selected' ? 'btn-success' : drive?.status === 'Applied' ? 'btn-secondary' : 'btn-primary'}`}
                        style={{ 
                          borderRadius: '8px', 
                          fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)', 
                          fontWeight: '600', 
                          padding: '0.25rem 0.4rem' 
                        }}
                        disabled={drive?.status === 'Selected' || drive?.status === 'Applied' || drive?.status === 'Shortlisted'}
                      >
                        {drive?.status === 'Selected' ? (
                          <><CheckCircle style={{ 
                            width: 'clamp(0.5rem, 0.8vw, 0.7rem)', 
                            height: 'clamp(0.5rem, 0.8vw, 0.7rem)' 
                          }} /> Selected</>
                        ) : drive?.status === 'Applied' ? (
                          <><Clock style={{ 
                            width: 'clamp(0.5rem, 0.8vw, 0.7rem)', 
                            height: 'clamp(0.5rem, 0.8vw, 0.7rem)' 
                          }} /> Applied</>
                        ) : drive?.status === 'Shortlisted' ? (
                          <><UserCheck style={{ 
                            width: 'clamp(0.5rem, 0.8vw, 0.7rem)', 
                            height: 'clamp(0.5rem, 0.8vw, 0.7rem)' 
                          }} /> Shortlisted</>
                        ) : (
                          <><ExternalLink style={{ 
                            width: 'clamp(0.5rem, 0.8vw, 0.7rem)', 
                            height: 'clamp(0.5rem, 0.8vw, 0.7rem)' 
                          }} /> Apply</>
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

      {/* Detail Modal - Responsive */}
      {showDetailModal && selectedDrive && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ 
          zIndex: 9999, 
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(10px)',
          animation: 'fadeIn 0.3s ease',
          padding: '1rem'
        }}
        onClick={() => setShowDetailModal(false)}
        >
          <div className="card border-0 shadow-2xl rounded-4" style={{ 
            maxWidth: 'clamp(320px, 90vw, 700px)', 
            width: '100%', 
            maxHeight: '90vh', 
            overflowY: 'auto', 
            background: 'rgba(20,20,30,0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.05)'
          }}
          onClick={(e) => e.stopPropagation()}
          >
            <div className="card-body p-3 p-md-4">
              <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3 border-bottom border-secondary pb-3">
                <h5 className="text-light fw-bold m-0 d-flex align-items-center gap-2" style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)' }}>
                  <Briefcase className="text-primary" style={{ 
                    width: 'clamp(0.9rem, 2vw, 1.2rem)', 
                    height: 'clamp(0.9rem, 2vw, 1.2rem)' 
                  }} />
                  Drive Details
                </h5>
                <button onClick={() => setShowDetailModal(false)} className="btn btn-close btn-close-white" style={{ fontSize: 'clamp(0.6rem, 1vw, 0.9rem)' }}></button>
              </div>

              {/* Company Header */}
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="d-flex align-items-center justify-content-center rounded-3 flex-shrink-0" style={{ 
                  width: 'clamp(44px, 8vw, 56px)', 
                  height: 'clamp(44px, 8vw, 56px)',
                  background: selectedDrive?.color || 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                  fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                  fontWeight: 'bold',
                  color: '#fff'
                }}>
                  {selectedDrive?.company?.charAt(0) || 'C'}
                </div>
                <div className="min-w-0">
                  <h5 className="text-light fw-bold m-0" style={{ fontSize: 'clamp(0.9rem, 2vw, 1.05rem)' }}>
                    {selectedDrive?.company}
                  </h5>
                  <span className="text-secondary" style={{ fontSize: 'clamp(0.6rem, 1.2vw, 0.7rem)' }}>
                    {selectedDrive?.role}
                  </span>
                  <div className="d-flex flex-wrap align-items-center gap-2 mt-1">
                    <span className={`badge bg-${getStatusColor(selectedDrive?.status)} bg-opacity-10 text-${getStatusColor(selectedDrive?.status)} border border-${getStatusColor(selectedDrive?.status)} d-inline-flex align-items-center gap-1`}
                          style={{ fontSize: 'clamp(0.45rem, 0.8vw, 0.55rem)' }}>
                      {getStatusIcon(selectedDrive?.status)}
                      {selectedDrive?.status}
                    </span>
                    <span className="badge bg-dark text-secondary border border-secondary d-inline-flex align-items-center gap-1"
                          style={{ fontSize: 'clamp(0.45rem, 0.8vw, 0.55rem)' }}>
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
                    <span className="text-secondary small d-block" style={{ fontSize: 'clamp(0.45rem, 0.7vw, 0.55rem)' }}>
                      Package
                    </span>
                    <span className="text-primary fw-bold" style={{ fontSize: 'clamp(0.6rem, 1.2vw, 0.7rem)' }}>
                      {selectedDrive?.package || 'N/A'}
                    </span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <span className="text-secondary small d-block" style={{ fontSize: 'clamp(0.45rem, 0.7vw, 0.55rem)' }}>
                      Location
                    </span>
                    <span className="text-light" style={{ fontSize: 'clamp(0.6rem, 1.2vw, 0.7rem)' }}>
                      {selectedDrive?.location || 'N/A'}
                    </span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <span className="text-secondary small d-block" style={{ fontSize: 'clamp(0.45rem, 0.7vw, 0.55rem)' }}>
                      Min CGPA
                    </span>
                    <span className="text-light" style={{ fontSize: 'clamp(0.6rem, 1.2vw, 0.7rem)' }}>
                      {selectedDrive?.minCgpa || 'N/A'}+
                    </span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <span className="text-secondary small d-block" style={{ fontSize: 'clamp(0.45rem, 0.7vw, 0.55rem)' }}>
                      Openings
                    </span>
                    <span className="text-light" style={{ fontSize: 'clamp(0.6rem, 1.2vw, 0.7rem)' }}>
                      {selectedDrive?.openings || 'N/A'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              {selectedDrive?.description && (
                <div className="mb-2 p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <span className="text-secondary small d-block" style={{ fontSize: 'clamp(0.45rem, 0.7vw, 0.55rem)' }}>
                    Description
                  </span>
                  <p className="text-secondary small mb-0" style={{ fontSize: 'clamp(0.6rem, 1vw, 0.7rem)' }}>
                    {selectedDrive.description}
                  </p>
                </div>
              )}

              {/* Skills */}
              {selectedDrive?.requiredSkills && selectedDrive.requiredSkills.length > 0 && (
                <div className="mb-2">
                  <span className="text-secondary small d-block" style={{ fontSize: 'clamp(0.45rem, 0.7vw, 0.55rem)' }}>
                    Required Skills
                  </span>
                  <div className="d-flex flex-wrap gap-1 mt-1">
                    {selectedDrive.requiredSkills.map((skill, i) => (
                      <span key={i} className="badge bg-warning bg-opacity-10 text-warning border border-warning" style={{ 
                        fontSize: 'clamp(0.45rem, 0.7vw, 0.55rem)' 
                      }}>
                        <Code style={{ 
                          width: 'clamp(0.4rem, 0.7vw, 0.6rem)', 
                          height: 'clamp(0.4rem, 0.7vw, 0.6rem)', 
                          marginRight: '0.1rem' 
                        }} />
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-3 pt-3 border-top border-secondary d-flex flex-wrap gap-2">
                <button 
                  onClick={() => handleApply(selectedDrive._id)}
                  className={`btn btn-sm flex-grow-1 d-flex align-items-center justify-content-center gap-1 ${selectedDrive?.status === 'Selected' ? 'btn-success' : selectedDrive?.status === 'Applied' ? 'btn-secondary' : 'btn-primary'}`}
                  style={{ 
                    borderRadius: '10px', 
                    fontWeight: '600',
                    fontSize: 'clamp(0.6rem, 1vw, 0.7rem)',
                    padding: '0.35rem 0.7rem'
                  }}
                  disabled={selectedDrive?.status === 'Selected' || selectedDrive?.status === 'Applied' || selectedDrive?.status === 'Shortlisted'}
                >
                  {selectedDrive?.status === 'Selected' ? (
                    <><CheckCircle style={{ 
                      width: 'clamp(0.7rem, 1.2vw, 0.9rem)', 
                      height: 'clamp(0.7rem, 1.2vw, 0.9rem)' 
                    }} /> Selected</>
                  ) : selectedDrive?.status === 'Applied' ? (
                    <><Clock style={{ 
                      width: 'clamp(0.7rem, 1.2vw, 0.9rem)', 
                      height: 'clamp(0.7rem, 1.2vw, 0.9rem)' 
                    }} /> Applied</>
                  ) : selectedDrive?.status === 'Shortlisted' ? (
                    <><UserCheck style={{ 
                      width: 'clamp(0.7rem, 1.2vw, 0.9rem)', 
                      height: 'clamp(0.7rem, 1.2vw, 0.9rem)' 
                    }} /> Shortlisted</>
                  ) : (
                    <><ExternalLink style={{ 
                      width: 'clamp(0.7rem, 1.2vw, 0.9rem)', 
                      height: 'clamp(0.7rem, 1.2vw, 0.9rem)' 
                    }} /> Apply</>
                  )}
                </button>
                <button className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1" style={{ 
                  borderRadius: '10px',
                  fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)',
                  padding: '0.3rem 0.6rem'
                }}>
                  <Download style={{ 
                    width: 'clamp(0.7rem, 1.2vw, 0.9rem)', 
                    height: 'clamp(0.7rem, 1.2vw, 0.9rem)' 
                  }} /> JD
                </button>
                <button className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1" style={{ 
                  borderRadius: '10px',
                  fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)',
                  padding: '0.3rem 0.6rem'
                }}>
                  <Bell style={{ 
                    width: 'clamp(0.7rem, 1.2vw, 0.9rem)', 
                    height: 'clamp(0.7rem, 1.2vw, 0.9rem)' 
                  }} /> Remind
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS */}
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

        .min-w-0 {
          min-width: 0;
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