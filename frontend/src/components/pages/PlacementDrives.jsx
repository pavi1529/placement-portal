import React, { useState } from 'react';
import { 
  Briefcase, MapPin, Calendar, Clock, Users, CheckCircle, XCircle, 
  Award, Building2, FileText, Filter, Search, TrendingUp,
  UserCheck, UserX, Sparkles, Link, ExternalLink, Star,
  Bookmark, Download, Bell, Hash, GraduationCap, ClipboardList,
  Code, ListChecks, Calendar as CalendarIcon, Clock as ClockIcon,
  Home, Monitor, Wifi, Eye, Heart, Share2, Mail, Phone,
  DollarSign, Map, Tag, Layers, Zap
} from 'lucide-react';

export default function PlacementDrives({ jobDrives = [] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [filterWorkMode, setFilterWorkMode] = useState('ALL');
  const [bookmarkedDrives, setBookmarkedDrives] = useState([]);
  const [selectedDrive, setSelectedDrive] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  
  const getSafeString = (value) => {
    if (value === null || value === undefined) return '';
    if (typeof value === 'string') return value;
    if (typeof value === 'number') return String(value);
    if (typeof value === 'object') {
      // If it's an object with a name or title property, extract it
      if (value.name) return String(value.name);
      if (value.title) return String(value.title);
      if (value.label) return String(value.label);
      try {
        return JSON.stringify(value);
      } catch {
        return '';
      }
    }
    return String(value);
  };

 
  const getDisplayText = (value, fallback = 'N/A') => {
    const str = getSafeString(value);
    return str || fallback;
  };

 
  const getCompanyName = (company) => {
    if (!company) return 'N/A';
    if (typeof company === 'string') return company;
    if (typeof company === 'object') {
      return company.name || company.company || company.label || 'N/A';
    }
    return String(company);
  };


  const getRoleName = (role) => {
    if (!role) return 'N/A';
    if (typeof role === 'string') return role;
    if (typeof role === 'object') {
      return role.title || role.role || role.name || 'N/A';
    }
    return String(role);
  };

 
  const sampleDrives = [
    {
      id: 1,
      company: "Google",
      role: "Software Engineer",
      package: "₹25 LPA",
      location: "Bangalore, India",
      workMode: "Hybrid",
      eligibleDepts: ["CSE", "IT", "ECE"],
      minCgpa: "8.0",
      eligibleBatch: "2026",
      selectionProcess: ["Aptitude Test", "Technical Interview", "HR Interview"],
      regDeadline: "2026-08-15",
      driveDate: "2026-08-20",
      driveTime: "10:00 AM",
      openings: 15,
      description: "Looking for passionate software engineers with strong problem-solving skills.",
      requiredSkills: ["Data Structures", "Algorithms", "Python", "Java"],
      eligibilityCriteria: "B.Tech in CSE/IT with 8.0+ CGPA",
      status: "Eligible",
      color: "#4285F4"
    },
    {
      id: 2,
      company: "Microsoft",
      role: "Full Stack Developer",
      package: "₹22 LPA",
      location: "Hyderabad, India",
      workMode: "Hybrid",
      eligibleDepts: ["CSE", "IT", "ECE"],
      minCgpa: "7.5",
      eligibleBatch: "2026",
      selectionProcess: ["Online Test", "Technical Interview", "Manager Interview"],
      regDeadline: "2026-08-20",
      driveDate: "2026-08-25",
      driveTime: "11:00 AM",
      openings: 10,
      description: "Seeking talented developers for Microsoft's next-gen cloud products.",
      requiredSkills: ["React", "Node.js", "TypeScript", "Azure"],
      eligibilityCriteria: "B.Tech in CSE/IT with 7.5+ CGPA",
      status: "Applied",
      color: "#00A4EF"
    },
    {
      id: 3,
      company: "Amazon",
      role: "SDE-1",
      package: "₹20 LPA",
      location: "Chennai, India",
      workMode: "Onsite",
      eligibleDepts: ["CSE", "IT", "ECE", "EEE"],
      minCgpa: "7.0",
      eligibleBatch: "2026",
      selectionProcess: ["Aptitude Test", "Technical Interview", "HR Interview"],
      regDeadline: "2026-08-10",
      driveDate: "2026-08-15",
      driveTime: "09:00 AM",
      openings: 20,
      description: "Amazon is hiring freshers for SDE roles.",
      requiredSkills: ["Java", "Spring Boot", "AWS", "Docker"],
      eligibilityCriteria: "B.Tech with 7.0+ CGPA",
      status: "Shortlisted",
      color: "#FF9900"
    },
    {
      id: 4,
      company: "Zoho",
      role: "Member Technical Staff",
      package: "₹15 LPA",
      location: "Chennai, India",
      workMode: "Onsite",
      eligibleDepts: ["CSE", "IT"],
      minCgpa: "7.0",
      eligibleBatch: "2026",
      selectionProcess: ["Aptitude Test", "Technical Interview", "HR Interview"],
      regDeadline: "2026-09-01",
      driveDate: "2026-09-05",
      driveTime: "10:30 AM",
      openings: 8,
      description: "Join Zoho's innovative R&D team.",
      requiredSkills: ["Java", "SQL", "OOP", "Data Structures"],
      eligibilityCriteria: "B.Tech in CSE/IT with 7.0+ CGPA",
      status: "Selected",
      color: "#E4252D"
    },
    {
      id: 5,
      company: "PayPal",
      role: "Software Engineer Intern",
      package: "₹12 LPA",
      location: "Bangalore, India",
      workMode: "Hybrid",
      eligibleDepts: ["CSE", "IT", "ECE"],
      minCgpa: "8.0",
      eligibleBatch: "2026",
      selectionProcess: ["Aptitude Test", "Technical Interview", "HR Interview"],
      regDeadline: "2026-08-25",
      driveDate: "2026-08-30",
      driveTime: "11:00 AM",
      openings: 5,
      description: "Internship opportunity in fintech domain.",
      requiredSkills: ["Java", "Spring", "REST APIs", "SQL"],
      eligibilityCriteria: "B.Tech with 8.0+ CGPA",
      status: "Eligible",
      color: "#003087"
    }
  ];

  // Use provided data or fallback
  const drives = Array.isArray(jobDrives) && jobDrives.length > 0 ? jobDrives : sampleDrives;

  // Toggle bookmark
  const toggleBookmark = (driveId) => {
    setBookmarkedDrives(prev => 
      prev.includes(driveId) 
        ? prev.filter(id => id !== driveId)
        : [...prev, driveId]
    );
  };

  // View drive details
  const viewDriveDetails = (drive) => {
    setSelectedDrive(drive);
    setShowDetailModal(true);
  };

  // Filter drives - with safe string conversion
  const filteredDrives = drives.filter(drive => {
    const companyStr = getSafeString(getCompanyName(drive?.company)).toLowerCase();
    const roleStr = getSafeString(getRoleName(drive?.role)).toLowerCase();
    const searchStr = getSafeString(searchQuery).toLowerCase();
    const statusStr = getSafeString(drive?.status);
    const workModeStr = getSafeString(drive?.workMode);
    
    const matchesSearch = companyStr.includes(searchStr) || roleStr.includes(searchStr);
    const matchesStatus = filterStatus === 'ALL' || statusStr === filterStatus;
    const matchesWorkMode = filterWorkMode === 'ALL' || workModeStr === filterWorkMode;
    
    return matchesSearch && matchesStatus && matchesWorkMode;
  });

  // Stats
  const totalDrives = drives.length;
  const eligibleCount = drives.filter(d => getSafeString(d?.status) === 'Eligible').length;
  const appliedCount = drives.filter(d => getSafeString(d?.status) === 'Applied').length;
  const shortlistedCount = drives.filter(d => getSafeString(d?.status) === 'Shortlisted').length;
  const selectedCount = drives.filter(d => getSafeString(d?.status) === 'Selected').length;

  const getStatusColor = (status) => {
    const statusStr = getSafeString(status);
    switch(statusStr) {
      case 'Eligible': return 'success';
      case 'Applied': return 'info';
      case 'Shortlisted': return 'warning';
      case 'Selected': return 'success';
      case 'Rejected': return 'danger';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status) => {
    const statusStr = getSafeString(status);
    switch(statusStr) {
      case 'Selected': return <CheckCircle className="text-success" style={{ width: '0.7rem', height: '0.7rem' }} />;
      case 'Rejected': return <XCircle className="text-danger" style={{ width: '0.7rem', height: '0.7rem' }} />;
      case 'Shortlisted': return <UserCheck className="text-warning" style={{ width: '0.7rem', height: '0.7rem' }} />;
      case 'Applied': return <Clock className="text-info" style={{ width: '0.7rem', height: '0.7rem' }} />;
      case 'Eligible': return <Sparkles className="text-success" style={{ width: '0.7rem', height: '0.7rem' }} />;
      default: return null;
    }
  };

  const getWorkModeIcon = (mode) => {
    const modeStr = getSafeString(mode);
    switch(modeStr) {
      case 'Onsite': return <Building2 className="text-primary" style={{ width: '0.7rem', height: '0.7rem' }} />;
      case 'Hybrid': return <Monitor className="text-info" style={{ width: '0.7rem', height: '0.7rem' }} />;
      case 'Remote': return <Wifi className="text-success" style={{ width: '0.7rem', height: '0.7rem' }} />;
      default: return <Home className="text-secondary" style={{ width: '0.7rem', height: '0.7rem' }} />;
    }
  };

  return (
    <div className="animate-fadeIn">
      {/* Welcome Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h5 className="text-dark fw-bold m-0">Placement Drives</h5>
          <p className="text-secondary small m-0">Find and apply to top company drives</p>
        </div>
        <div className="d-flex align-items-center gap-2">
          <span className="badge bg-success bg-opacity-10 text-success border border-success px-3 py-2">
            <Sparkles style={{ width: '0.7rem', height: '0.7rem', marginRight: '0.3rem' }} />
            {eligibleCount} New Opportunities
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row g-3 mb-4">
        {[
          { label: "Total Drives", value: totalDrives, color: "primary", icon: Briefcase },
          { label: "Eligible", value: eligibleCount, color: "success", icon: Sparkles },
          { label: "Applied", value: appliedCount, color: "info", icon: Clock },
          { label: "Shortlisted", value: shortlistedCount, color: "warning", icon: UserCheck },
          { label: "Selected", value: selectedCount, color: "success", icon: Award },
        ].map((stat, i) => {
          const Icon = stat.icon;
          const bgColors = {
            primary: 'rgba(59,130,246,0.08)',
            success: 'rgba(34,197,94,0.08)',
            info: 'rgba(6,182,212,0.08)',
            warning: 'rgba(234,179,8,0.08)'
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

      {/* Search & Filter */}
      <div className="card border-0 shadow-sm rounded-4 mb-4" style={{ background: '#ffffff', border: '1px solid #e9ecef' }}>
        <div className="card-body p-3">
          <div className="d-flex flex-wrap gap-3 align-items-center">
            <div className="d-flex align-items-center gap-2 bg-white px-3 py-2 rounded-3 border border-light flex-grow-1" style={{ maxWidth: '300px' }}>
              <Search className="text-secondary" style={{ width: '0.8rem', height: '0.8rem' }} />
              <input 
                type="text" 
                className="form-control form-control-sm bg-transparent border-0 text-dark" 
                placeholder="Search companies..." 
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
            <div className="d-flex align-items-center gap-2 bg-white px-3 py-2 rounded-3 border border-light">
              <Building2 className="text-secondary" style={{ width: '0.7rem', height: '0.7rem' }} />
              <select 
                className="form-select form-select-sm bg-transparent border-0 text-dark" 
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
        <div className="card border-0 shadow-sm rounded-4 text-center p-5" style={{ background: '#ffffff', border: '1px solid #e9ecef' }}>
          <Briefcase className="text-secondary mx-auto" style={{ width: '3rem', height: '3rem' }} />
          <h6 className="text-secondary mt-3">No drives found</h6>
          <p className="text-secondary small">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="row g-4">
          {filteredDrives.map((drive, index) => {
            const isBookmarked = bookmarkedDrives.includes(drive.id);
            
            
            const companyName = getCompanyName(drive?.company);
            const roleName = getRoleName(drive?.role);
            const companyInitial = getSafeString(companyName).charAt(0) || 'C';
            const status = getSafeString(drive?.status);
            const workMode = getSafeString(drive?.workMode);
            const packageStr = getSafeString(drive?.package);
            const locationStr = getSafeString(drive?.location);
            const deadlineStr = getSafeString(drive?.regDeadline);
            const openingsStr = getSafeString(drive?.openings);
            const descriptionStr = getSafeString(drive?.description);
            const minCgpaStr = getSafeString(drive?.minCgpa);
            
            return (
              <div key={drive?.id || index} className="col-md-6 col-lg-4">
                <div 
                  className="card border-0 shadow-sm rounded-4 h-100 transition-all hover:translate-y-2"
                  style={{ 
                    background: '#ffffff',
                    border: '1px solid #e9ecef',
                    animation: `slideUp ${0.3 + index * 0.05}s ease-out forwards`
                  }}
                >
                  <div className="card-body p-4 d-flex flex-column">
                    {/* Header - Company Logo & Status */}
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
                        {/* ✅ FIXED: Using getDisplayText for safe rendering */}
                        <h6 className="fw-bold text-dark m-0" style={{ fontSize: '0.95rem' }}>
                          {getDisplayText(companyName)}
                        </h6>
                        <span className="text-secondary" style={{ fontSize: '0.6rem' }}>
                          {getDisplayText(roleName)}
                        </span>
                        <div className="d-flex align-items-center gap-1 mt-1 flex-wrap">
                          <span className="badge bg-light text-secondary border border-light d-inline-flex align-items-center gap-1" style={{ fontSize: '0.5rem' }}>
                            {getWorkModeIcon(workMode)}
                            {getDisplayText(workMode)}
                          </span>
                          <span className="badge bg-light text-secondary border border-light d-inline-flex align-items-center gap-1" style={{ fontSize: '0.5rem' }}>
                            <GraduationCap style={{ width: '0.6rem', height: '0.6rem' }} />
                            {getDisplayText(minCgpaStr)}+
                          </span>
                        </div>
                      </div>
                      <div className="d-flex flex-column align-items-end gap-1 flex-shrink-0">
                        <button 
                          onClick={() => toggleBookmark(drive.id)}
                          className="btn btn-sm p-0 transition-all hover:scale-110"
                          style={{ background: 'transparent', border: 'none' }}
                        >
                          {isBookmarked ? (
                            <Heart className="text-danger" style={{ width: '0.9rem', height: '0.9rem', fill: '#ef4444' }} />
                          ) : (
                            <Heart className="text-secondary" style={{ width: '0.9rem', height: '0.9rem' }} />
                          )}
                        </button>
                        <span 
                          className={`badge bg-${getStatusColor(status)} bg-opacity-10 text-${getStatusColor(status)} border border-${getStatusColor(status)} d-inline-flex align-items-center gap-1`}
                          style={{ fontSize: '0.5rem', padding: '0.2rem 0.4rem' }}
                        >
                          {getStatusIcon(status)}
                          {getDisplayText(status)}
                        </span>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-1.5 flex-grow-1">
                      <div className="d-flex align-items-center gap-2 p-1.5 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                        <DollarSign className="text-primary" style={{ width: '0.7rem', height: '0.7rem' }} />
                        <span className="text-secondary small flex-grow-1" style={{ fontSize: '0.6rem' }}>Package</span>
                        <span className="text-primary fw-bold" style={{ fontSize: '0.7rem' }}>{getDisplayText(packageStr)}</span>
                      </div>
                      <div className="d-flex align-items-center gap-2 p-1.5 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                        <MapPin className="text-info" style={{ width: '0.7rem', height: '0.7rem' }} />
                        <span className="text-secondary small flex-grow-1" style={{ fontSize: '0.6rem' }}>Location</span>
                        <span className="text-dark" style={{ fontSize: '0.65rem' }}>{getDisplayText(locationStr)}</span>
                      </div>
                      <div className="d-flex align-items-center gap-2 p-1.5 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                        <Calendar className="text-warning" style={{ width: '0.7rem', height: '0.7rem' }} />
                        <span className="text-secondary small flex-grow-1" style={{ fontSize: '0.6rem' }}>Deadline</span>
                        <span className="text-dark" style={{ fontSize: '0.65rem' }}>{getDisplayText(deadlineStr)}</span>
                      </div>
                      <div className="d-flex align-items-center gap-2 p-1.5 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                        <Users className="text-success" style={{ width: '0.7rem', height: '0.7rem' }} />
                        <span className="text-secondary small flex-grow-1" style={{ fontSize: '0.6rem' }}>Openings</span>
                        <span className="text-dark" style={{ fontSize: '0.65rem' }}>{getDisplayText(openingsStr)}</span>
                      </div>
                    </div>

                    {/* Skills Tags */}
                    {drive?.requiredSkills && drive.requiredSkills.length > 0 && (
                      <div className="mt-2">
                        <div className="d-flex flex-wrap gap-1">
                          {drive.requiredSkills.slice(0, 3).map((skill, i) => (
                            <span key={i} className="badge bg-light text-secondary border border-light" style={{ fontSize: '0.45rem' }}>
                              <Code style={{ width: '0.5rem', height: '0.5rem', marginRight: '0.2rem' }} />
                              {getDisplayText(skill)}
                            </span>
                          ))}
                          {drive.requiredSkills.length > 3 && (
                            <span className="badge bg-light text-secondary border border-light" style={{ fontSize: '0.45rem' }}>
                              +{drive.requiredSkills.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="mt-3 pt-3 border-top border-light d-flex gap-2">
                      <button 
                        onClick={() => viewDriveDetails(drive)}
                        className="btn btn-outline-info btn-sm flex-grow-1 d-flex align-items-center justify-content-center gap-1 transition-all hover:scale-105"
                        style={{ borderRadius: '8px', fontSize: '0.6rem', fontWeight: '600' }}
                      >
                        <Eye style={{ width: '0.7rem', height: '0.7rem' }} /> View Details
                      </button>
                      <button 
                        className={`btn btn-sm flex-grow-1 d-flex align-items-center justify-content-center gap-1 transition-all hover:scale-105 ${status === 'Selected' ? 'btn-success' : status === 'Applied' ? 'btn-secondary' : 'btn-primary'}`}
                        style={{ borderRadius: '8px', fontSize: '0.6rem', fontWeight: '600' }}
                        disabled={status === 'Selected' || status === 'Applied'}
                      >
                        {status === 'Selected' ? (
                          <><CheckCircle style={{ width: '0.7rem', height: '0.7rem' }} /> Selected</>
                        ) : status === 'Applied' ? (
                          <><Clock style={{ width: '0.7rem', height: '0.7rem' }} /> Applied</>
                        ) : status === 'Shortlisted' ? (
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
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(5px)',
          animation: 'fadeIn 0.3s ease'
        }}>
          <div className="card border-0 shadow-lg rounded-4" style={{ 
            maxWidth: '700px', 
            width: '95%', 
            maxHeight: '90vh', 
            overflowY: 'auto', 
            background: '#ffffff'
          }}>
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-3 border-bottom border-light pb-3">
                <h5 className="text-dark fw-bold m-0 d-flex align-items-center gap-2">
                  <Briefcase className="text-primary" style={{ width: '1.2rem', height: '1.2rem' }} />
                  Drive Details
                </h5>
                <button onClick={() => setShowDetailModal(false)} className="btn btn-close"></button>
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
                  {getSafeString(getCompanyName(selectedDrive?.company)).charAt(0) || 'C'}
                </div>
                <div>
                  <h5 className="text-dark fw-bold m-0">{getDisplayText(getCompanyName(selectedDrive?.company))}</h5>
                  <span className="text-secondary" style={{ fontSize: '0.7rem' }}>{getDisplayText(getRoleName(selectedDrive?.role))}</span>
                  <div className="d-flex align-items-center gap-2 mt-1 flex-wrap">
                    <span className={`badge bg-${getStatusColor(selectedDrive?.status)} bg-opacity-10 text-${getStatusColor(selectedDrive?.status)} border border-${getStatusColor(selectedDrive?.status)} d-inline-flex align-items-center gap-1`}>
                      {getStatusIcon(selectedDrive?.status)}
                      {getDisplayText(selectedDrive?.status)}
                    </span>
                    <span className="badge bg-light text-secondary border border-light d-inline-flex align-items-center gap-1">
                      {getWorkModeIcon(selectedDrive?.workMode)}
                      {getDisplayText(selectedDrive?.workMode)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Details Grid */}
              <div className="row g-2 mb-3">
                <div className="col-6">
                  <div className="p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                    <span className="text-secondary small d-block" style={{ fontSize: '0.55rem' }}>Package</span>
                    <span className="text-primary fw-bold">{getDisplayText(selectedDrive?.package)}</span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                    <span className="text-secondary small d-block" style={{ fontSize: '0.55rem' }}>Location</span>
                    <span className="text-dark">{getDisplayText(selectedDrive?.location)}</span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                    <span className="text-secondary small d-block" style={{ fontSize: '0.55rem' }}>Min CGPA</span>
                    <span className="text-dark">{getDisplayText(selectedDrive?.minCgpa)}+</span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                    <span className="text-secondary small d-block" style={{ fontSize: '0.55rem' }}>Eligible Batch</span>
                    <span className="text-dark">{getDisplayText(selectedDrive?.eligibleBatch)}</span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                    <span className="text-secondary small d-block" style={{ fontSize: '0.55rem' }}>Openings</span>
                    <span className="text-dark">{getDisplayText(selectedDrive?.openings)}</span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                    <span className="text-secondary small d-block" style={{ fontSize: '0.55rem' }}>Drive Date</span>
                    <span className="text-dark">{getDisplayText(selectedDrive?.driveDate)}</span>
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
                        {getDisplayText(dept)}
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
                        {getDisplayText(step)}
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
                        {getDisplayText(skill)}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              {selectedDrive?.description && (
                <div className="mb-2 p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                  <span className="text-secondary small d-block" style={{ fontSize: '0.55rem' }}>Job Description</span>
                  <p className="text-secondary small mb-0" style={{ fontSize: '0.7rem' }}>{getDisplayText(selectedDrive.description)}</p>
                </div>
              )}

              {/* Eligibility Criteria */}
              {selectedDrive?.eligibilityCriteria && (
                <div className="mb-2 p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                  <span className="text-secondary small d-block" style={{ fontSize: '0.55rem' }}>Eligibility Criteria</span>
                  <p className="text-secondary small mb-0" style={{ fontSize: '0.7rem' }}>{getDisplayText(selectedDrive.eligibilityCriteria)}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-3 pt-3 border-top border-light d-flex flex-wrap gap-2">
                <button 
                  className={`btn btn-sm flex-grow-1 d-flex align-items-center justify-content-center gap-1 ${selectedDrive?.status === 'Selected' ? 'btn-success' : selectedDrive?.status === 'Applied' ? 'btn-secondary' : 'btn-primary'}`}
                  style={{ borderRadius: '10px', fontWeight: '600' }}
                  disabled={selectedDrive?.status === 'Selected' || selectedDrive?.status === 'Applied'}
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
        
        .hover\\:scale-110:hover {
          transform: scale(1.1);
        }
        
        .space-y-1.5 > * + * {
          margin-top: 0.375rem;
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