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

  const drives = Array.isArray(jobDrives) && jobDrives.length > 0 ? jobDrives : sampleDrives;

  const toggleBookmark = (driveId) => {
    setBookmarkedDrives(prev => 
      prev.includes(driveId) 
        ? prev.filter(id => id !== driveId)
        : [...prev, driveId]
    );
  };

  const viewDriveDetails = (drive) => {
    setSelectedDrive(drive);
    setShowDetailModal(true);
  };

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
      case 'Selected': return <CheckCircle className="text-success" style={{ width: 'clamp(0.5rem, 0.8vw, 0.7rem)', height: 'clamp(0.5rem, 0.8vw, 0.7rem)' }} />;
      case 'Rejected': return <XCircle className="text-danger" style={{ width: 'clamp(0.5rem, 0.8vw, 0.7rem)', height: 'clamp(0.5rem, 0.8vw, 0.7rem)' }} />;
      case 'Shortlisted': return <UserCheck className="text-warning" style={{ width: 'clamp(0.5rem, 0.8vw, 0.7rem)', height: 'clamp(0.5rem, 0.8vw, 0.7rem)' }} />;
      case 'Applied': return <Clock className="text-info" style={{ width: 'clamp(0.5rem, 0.8vw, 0.7rem)', height: 'clamp(0.5rem, 0.8vw, 0.7rem)' }} />;
      case 'Eligible': return <Sparkles className="text-success" style={{ width: 'clamp(0.5rem, 0.8vw, 0.7rem)', height: 'clamp(0.5rem, 0.8vw, 0.7rem)' }} />;
      default: return null;
    }
  };

  const getWorkModeIcon = (mode) => {
    const modeStr = getSafeString(mode);
    switch(modeStr) {
      case 'Onsite': return <Building2 className="text-primary" style={{ width: 'clamp(0.5rem, 0.8vw, 0.7rem)', height: 'clamp(0.5rem, 0.8vw, 0.7rem)' }} />;
      case 'Hybrid': return <Monitor className="text-info" style={{ width: 'clamp(0.5rem, 0.8vw, 0.7rem)', height: 'clamp(0.5rem, 0.8vw, 0.7rem)' }} />;
      case 'Remote': return <Wifi className="text-success" style={{ width: 'clamp(0.5rem, 0.8vw, 0.7rem)', height: 'clamp(0.5rem, 0.8vw, 0.7rem)' }} />;
      default: return <Home className="text-secondary" style={{ width: 'clamp(0.5rem, 0.8vw, 0.7rem)', height: 'clamp(0.5rem, 0.8vw, 0.7rem)' }} />;
    }
  };

  return (
    <div className="animate-fadeIn">
      {/* Welcome Section */}
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3 mb-md-4">
        <div>
          <h5 className="text-dark fw-bold m-0" style={{ fontSize: 'clamp(0.95rem, 2.2vw, 1.25rem)' }}>
            Placement Drives
          </h5>
          <p className="text-secondary small m-0" style={{ fontSize: 'clamp(0.55rem, 1vw, 0.75rem)' }}>
            Find and apply to top company drives
          </p>
        </div>
        <div className="d-flex align-items-center gap-2">
          <span className="badge bg-success bg-opacity-10 text-success border border-success px-2 px-md-3 py-1 py-md-2" style={{ fontSize: 'clamp(0.45rem, 0.8vw, 0.6rem)' }}>
            <Sparkles style={{ width: 'clamp(0.4rem, 0.7vw, 0.7rem)', height: 'clamp(0.4rem, 0.7vw, 0.7rem)', marginRight: '0.15rem' }} />
            {eligibleCount} New
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row g-2 g-md-3 mb-3 mb-md-4">
        {[
          { label: "Total", value: totalDrives, color: "primary", icon: Briefcase },
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
            <div key={i} className="col-6 col-md">
              <div className="card border-0 shadow-sm rounded-3 rounded-md-4 h-100" style={{ 
                background: '#ffffff', 
                border: '1px solid #e9ecef', 
                transition: 'all 0.3s ease' 
              }}
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
                    <span className="text-secondary fw-bold text-uppercase" style={{ 
                      fontSize: 'clamp(0.35rem, 0.6vw, 0.5rem)', 
                      letterSpacing: '0.03em' 
                    }}>
                      {stat.label}
                    </span>
                    <div className={`p-1 p-md-2 rounded-3`} style={{ background: bgColors[stat.color], border: `1px solid ${bgColors[stat.color]}` }}>
                      <Icon className={`text-${stat.color}`} style={{ 
                        width: 'clamp(0.6rem, 1.2vw, 0.9rem)', 
                        height: 'clamp(0.6rem, 1.2vw, 0.9rem)' 
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
      <div className="card border-0 shadow-sm rounded-3 rounded-md-4 mb-3 mb-md-4" style={{ background: '#ffffff', border: '1px solid #e9ecef' }}>
        <div className="card-body p-2 p-md-3">
          <div className="d-flex flex-wrap gap-2 align-items-center">
            <div className="d-flex align-items-center gap-2 bg-white px-2 px-md-3 py-1 py-md-2 rounded-3 border border-light flex-grow-1" style={{ maxWidth: 'clamp(160px, 35vw, 300px)' }}>
              <Search className="text-secondary" style={{ 
                width: 'clamp(0.6rem, 1vw, 0.8rem)', 
                height: 'clamp(0.6rem, 1vw, 0.8rem)' 
              }} />
              <input 
                type="text" 
                className="form-control form-control-sm bg-transparent border-0 text-dark" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ 
                  fontSize: 'clamp(0.55rem, 1vw, 0.75rem)', 
                  outline: 'none', 
                  padding: '0.1rem 0' 
                }}
              />
            </div>
            <div className="d-flex align-items-center gap-1 gap-md-2 bg-white px-2 px-md-3 py-1 py-md-2 rounded-3 border border-light flex-grow-1 flex-md-grow-0">
              <Filter className="text-secondary" style={{ 
                width: 'clamp(0.5rem, 0.9vw, 0.7rem)', 
                height: 'clamp(0.5rem, 0.9vw, 0.7rem)' 
              }} />
              <select 
                className="form-select form-select-sm bg-transparent border-0 text-dark" 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                style={{ 
                  fontSize: 'clamp(0.5rem, 0.9vw, 0.75rem)', 
                  width: 'clamp(65px, 12vw, 120px)', 
                  outline: 'none', 
                  padding: '0.1rem 0.4rem' 
                }}
              >
                <option value="ALL">Status</option>
                <option value="Eligible">Eligible</option>
                <option value="Applied">Applied</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="Selected">Selected</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <div className="d-flex align-items-center gap-1 gap-md-2 bg-white px-2 px-md-3 py-1 py-md-2 rounded-3 border border-light flex-grow-1 flex-md-grow-0">
              <Building2 className="text-secondary" style={{ 
                width: 'clamp(0.5rem, 0.9vw, 0.7rem)', 
                height: 'clamp(0.5rem, 0.9vw, 0.7rem)' 
              }} />
              <select 
                className="form-select form-select-sm bg-transparent border-0 text-dark" 
                value={filterWorkMode}
                onChange={(e) => setFilterWorkMode(e.target.value)}
                style={{ 
                  fontSize: 'clamp(0.5rem, 0.9vw, 0.75rem)', 
                  width: 'clamp(65px, 12vw, 110px)', 
                  outline: 'none', 
                  padding: '0.1rem 0.4rem' 
                }}
              >
                <option value="ALL">Mode</option>
                <option value="Onsite">Onsite</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
            <span className="text-secondary small ms-auto d-none d-md-block" style={{ 
              fontSize: 'clamp(0.5rem, 0.8vw, 0.65rem)' 
            }}>
              {filteredDrives.length} found
            </span>
          </div>
        </div>
      </div>

      {/* Drives Cards Grid */}
      {filteredDrives.length === 0 ? (
        <div className="card border-0 shadow-sm rounded-4 text-center p-3 p-md-5" style={{ background: '#ffffff', border: '1px solid #e9ecef' }}>
          <Briefcase className="text-secondary mx-auto" style={{ 
            width: 'clamp(2rem, 4vw, 3rem)', 
            height: 'clamp(2rem, 4vw, 3rem)' 
          }} />
          <h6 className="text-secondary mt-3" style={{ fontSize: 'clamp(0.85rem, 1.8vw, 1rem)' }}>
            No drives found
          </h6>
          <p className="text-secondary small" style={{ fontSize: 'clamp(0.65rem, 1vw, 0.8rem)' }}>
            Try adjusting your search or filters
          </p>
        </div>
      ) : (
        <div className="row g-2 g-md-3 g-lg-4">
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
            const minCgpaStr = getSafeString(drive?.minCgpa);
            
            return (
              <div key={drive?.id || index} className="col-sm-6 col-xl-4">
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
                    {/* Header */}
                    <div className="d-flex align-items-start gap-2 gap-md-3 mb-2 mb-md-3">
                      <div className="d-flex align-items-center justify-content-center rounded-3 flex-shrink-0" style={{ 
                        width: 'clamp(32px, 5vw, 48px)', 
                        height: 'clamp(32px, 5vw, 48px)',
                        background: drive?.color || 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                        fontSize: 'clamp(0.8rem, 1.5vw, 1.2rem)',
                        fontWeight: 'bold',
                        color: '#fff'
                      }}>
                        {companyInitial}
                      </div>
                      <div className="flex-grow-1 min-w-0">
                        <h6 className="fw-bold text-dark m-0" style={{ 
                          fontSize: 'clamp(0.75rem, 1.3vw, 0.95rem)' 
                        }}>
                          {getDisplayText(companyName)}
                        </h6>
                        <span className="text-secondary" style={{ 
                          fontSize: 'clamp(0.45rem, 0.8vw, 0.6rem)' 
                        }}>
                          {getDisplayText(roleName)}
                        </span>
                        <div className="d-flex align-items-center gap-1 mt-1 flex-wrap">
                          <span className="badge bg-light text-secondary border border-light d-inline-flex align-items-center gap-1" style={{ 
                            fontSize: 'clamp(0.35rem, 0.6vw, 0.5rem)' 
                          }}>
                            {getWorkModeIcon(workMode)}
                            {getDisplayText(workMode)}
                          </span>
                          <span className="badge bg-light text-secondary border border-light d-inline-flex align-items-center gap-1" style={{ 
                            fontSize: 'clamp(0.35rem, 0.6vw, 0.5rem)' 
                          }}>
                            <GraduationCap style={{ 
                              width: 'clamp(0.35rem, 0.6vw, 0.6rem)', 
                              height: 'clamp(0.35rem, 0.6vw, 0.6rem)' 
                            }} />
                            {getDisplayText(minCgpaStr)}+
                          </span>
                        </div>
                      </div>
                      <div className="d-flex flex-column align-items-end gap-1 flex-shrink-0">
                        <button 
                          onClick={() => toggleBookmark(drive.id)}
                          className="btn btn-sm p-0"
                          style={{ background: 'transparent', border: 'none' }}
                        >
                          {isBookmarked ? (
                            <Heart className="text-danger" style={{ 
                              width: 'clamp(0.6rem, 1vw, 0.9rem)', 
                              height: 'clamp(0.6rem, 1vw, 0.9rem)', 
                              fill: '#ef4444' 
                            }} />
                          ) : (
                            <Heart className="text-secondary" style={{ 
                              width: 'clamp(0.6rem, 1vw, 0.9rem)', 
                              height: 'clamp(0.6rem, 1vw, 0.9rem)' 
                            }} />
                          )}
                        </button>
                        <span 
                          className={`badge bg-${getStatusColor(status)} bg-opacity-10 text-${getStatusColor(status)} border border-${getStatusColor(status)} d-inline-flex align-items-center gap-1`}
                          style={{ 
                            fontSize: 'clamp(0.35rem, 0.6vw, 0.5rem)', 
                            padding: '0.12rem 0.25rem' 
                          }}
                        >
                          {getStatusIcon(status)}
                          {getDisplayText(status)}
                        </span>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-1.5 flex-grow-1">
                      <div className="d-flex align-items-center gap-2 p-1 p-md-1.5 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                        <DollarSign className="text-primary" style={{ 
                          width: 'clamp(0.5rem, 0.8vw, 0.7rem)', 
                          height: 'clamp(0.5rem, 0.8vw, 0.7rem)' 
                        }} />
                        <span className="text-secondary small flex-grow-1" style={{ 
                          fontSize: 'clamp(0.45rem, 0.7vw, 0.6rem)' 
                        }}>Package</span>
                        <span className="text-primary fw-bold" style={{ 
                          fontSize: 'clamp(0.5rem, 0.9vw, 0.7rem)' 
                        }}>{getDisplayText(packageStr)}</span>
                      </div>
                      <div className="d-flex align-items-center gap-2 p-1 p-md-1.5 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                        <MapPin className="text-info" style={{ 
                          width: 'clamp(0.5rem, 0.8vw, 0.7rem)', 
                          height: 'clamp(0.5rem, 0.8vw, 0.7rem)' 
                        }} />
                        <span className="text-secondary small flex-grow-1" style={{ 
                          fontSize: 'clamp(0.45rem, 0.7vw, 0.6rem)' 
                        }}>Location</span>
                        <span className="text-dark" style={{ 
                          fontSize: 'clamp(0.5rem, 0.8vw, 0.65rem)' 
                        }}>{getDisplayText(locationStr)}</span>
                      </div>
                      <div className="d-flex align-items-center gap-2 p-1 p-md-1.5 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                        <Calendar className="text-warning" style={{ 
                          width: 'clamp(0.5rem, 0.8vw, 0.7rem)', 
                          height: 'clamp(0.5rem, 0.8vw, 0.7rem)' 
                        }} />
                        <span className="text-secondary small flex-grow-1" style={{ 
                          fontSize: 'clamp(0.45rem, 0.7vw, 0.6rem)' 
                        }}>Deadline</span>
                        <span className="text-dark" style={{ 
                          fontSize: 'clamp(0.5rem, 0.8vw, 0.65rem)' 
                        }}>{getDisplayText(deadlineStr)}</span>
                      </div>
                      <div className="d-flex align-items-center gap-2 p-1 p-md-1.5 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                        <Users className="text-success" style={{ 
                          width: 'clamp(0.5rem, 0.8vw, 0.7rem)', 
                          height: 'clamp(0.5rem, 0.8vw, 0.7rem)' 
                        }} />
                        <span className="text-secondary small flex-grow-1" style={{ 
                          fontSize: 'clamp(0.45rem, 0.7vw, 0.6rem)' 
                        }}>Openings</span>
                        <span className="text-dark" style={{ 
                          fontSize: 'clamp(0.5rem, 0.8vw, 0.65rem)' 
                        }}>{getDisplayText(openingsStr)}</span>
                      </div>
                    </div>

                    {/* Skills Tags */}
                    {drive?.requiredSkills && drive.requiredSkills.length > 0 && (
                      <div className="mt-2">
                        <div className="d-flex flex-wrap gap-1">
                          {drive.requiredSkills.slice(0, 3).map((skill, i) => (
                            <span key={i} className="badge bg-light text-secondary border border-light" style={{ 
                              fontSize: 'clamp(0.3rem, 0.6vw, 0.45rem)' 
                            }}>
                              <Code style={{ 
                                width: 'clamp(0.3rem, 0.6vw, 0.5rem)', 
                                height: 'clamp(0.3rem, 0.6vw, 0.5rem)', 
                                marginRight: '0.1rem' 
                              }} />
                              {getDisplayText(skill)}
                            </span>
                          ))}
                          {drive.requiredSkills.length > 3 && (
                            <span className="badge bg-light text-secondary border border-light" style={{ 
                              fontSize: 'clamp(0.3rem, 0.6vw, 0.45rem)' 
                            }}>
                              +{drive.requiredSkills.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="mt-3 pt-2 pt-md-3 border-top border-light d-flex gap-2">
                      <button 
                        onClick={() => viewDriveDetails(drive)}
                        className="btn btn-outline-info btn-sm flex-grow-1 d-flex align-items-center justify-content-center gap-1"
                        style={{ 
                          borderRadius: '8px', 
                          fontSize: 'clamp(0.45rem, 0.7vw, 0.6rem)', 
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
                        className={`btn btn-sm flex-grow-1 d-flex align-items-center justify-content-center gap-1 ${status === 'Selected' ? 'btn-success' : status === 'Applied' ? 'btn-secondary' : 'btn-primary'}`}
                        style={{ 
                          borderRadius: '8px', 
                          fontSize: 'clamp(0.45rem, 0.7vw, 0.6rem)', 
                          fontWeight: '600', 
                          padding: '0.25rem 0.4rem' 
                        }}
                        disabled={status === 'Selected' || status === 'Applied'}
                      >
                        {status === 'Selected' ? (
                          <><CheckCircle style={{ 
                            width: 'clamp(0.5rem, 0.8vw, 0.7rem)', 
                            height: 'clamp(0.5rem, 0.8vw, 0.7rem)' 
                          }} /> Selected</>
                        ) : status === 'Applied' ? (
                          <><Clock style={{ 
                            width: 'clamp(0.5rem, 0.8vw, 0.7rem)', 
                            height: 'clamp(0.5rem, 0.8vw, 0.7rem)' 
                          }} /> Applied</>
                        ) : status === 'Shortlisted' ? (
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

      {/* Detail Modal */}
      {showDetailModal && selectedDrive && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ 
          zIndex: 9999, 
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(5px)',
          padding: '1rem'
        }}
        onClick={() => setShowDetailModal(false)}
        >
          <div className="card border-0 shadow-lg rounded-4" style={{ 
            maxWidth: 'clamp(320px, 85vw, 700px)', 
            width: '100%', 
            maxHeight: '90vh', 
            overflowY: 'auto', 
            background: '#ffffff'
          }}
          onClick={(e) => e.stopPropagation()}
          >
            <div className="card-body p-3 p-md-4">
              <div className="d-flex justify-content-between align-items-center mb-3 border-bottom border-light pb-3">
                <h5 className="text-dark fw-bold m-0 d-flex align-items-center gap-2" style={{ 
                  fontSize: 'clamp(0.9rem, 2vw, 1.25rem)' 
                }}>
                  <Briefcase className="text-primary" style={{ 
                    width: 'clamp(0.8rem, 1.5vw, 1.2rem)', 
                    height: 'clamp(0.8rem, 1.5vw, 1.2rem)' 
                  }} />
                  Drive Details
                </h5>
                <button onClick={() => setShowDetailModal(false)} className="btn btn-close" style={{ 
                  fontSize: 'clamp(0.6rem, 1vw, 0.9rem)' 
                }}></button>
              </div>

              {/* Company Header */}
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="d-flex align-items-center justify-content-center rounded-3 flex-shrink-0" style={{ 
                  width: 'clamp(36px, 6vw, 56px)', 
                  height: 'clamp(36px, 6vw, 56px)',
                  background: selectedDrive?.color || 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                  fontSize: 'clamp(0.9rem, 2vw, 1.4rem)',
                  fontWeight: 'bold',
                  color: '#fff'
                }}>
                  {getSafeString(getCompanyName(selectedDrive?.company)).charAt(0) || 'C'}
                </div>
                <div className="min-w-0">
                  <h5 className="text-dark fw-bold m-0" style={{ 
                    fontSize: 'clamp(0.85rem, 1.8vw, 1.1rem)' 
                  }}>
                    {getDisplayText(getCompanyName(selectedDrive?.company))}
                  </h5>
                  <span className="text-secondary" style={{ 
                    fontSize: 'clamp(0.5rem, 1vw, 0.7rem)' 
                  }}>
                    {getDisplayText(getRoleName(selectedDrive?.role))}
                  </span>
                  <div className="d-flex align-items-center gap-2 mt-1 flex-wrap">
                    <span className={`badge bg-${getStatusColor(selectedDrive?.status)} bg-opacity-10 text-${getStatusColor(selectedDrive?.status)} border border-${getStatusColor(selectedDrive?.status)} d-inline-flex align-items-center gap-1`}
                          style={{ fontSize: 'clamp(0.4rem, 0.7vw, 0.55rem)' }}>
                      {getStatusIcon(selectedDrive?.status)}
                      {getDisplayText(selectedDrive?.status)}
                    </span>
                    <span className="badge bg-light text-secondary border border-light d-inline-flex align-items-center gap-1"
                          style={{ fontSize: 'clamp(0.4rem, 0.7vw, 0.55rem)' }}>
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
                    <span className="text-secondary small d-block" style={{ 
                      fontSize: 'clamp(0.35rem, 0.6vw, 0.55rem)' 
                    }}>Package</span>
                    <span className="text-primary fw-bold" style={{ 
                      fontSize: 'clamp(0.55rem, 1vw, 0.8rem)' 
                    }}>{getDisplayText(selectedDrive?.package)}</span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                    <span className="text-secondary small d-block" style={{ 
                      fontSize: 'clamp(0.35rem, 0.6vw, 0.55rem)' 
                    }}>Location</span>
                    <span className="text-dark" style={{ 
                      fontSize: 'clamp(0.55rem, 1vw, 0.75rem)' 
                    }}>{getDisplayText(selectedDrive?.location)}</span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                    <span className="text-secondary small d-block" style={{ 
                      fontSize: 'clamp(0.35rem, 0.6vw, 0.55rem)' 
                    }}>Min CGPA</span>
                    <span className="text-dark" style={{ 
                      fontSize: 'clamp(0.55rem, 1vw, 0.75rem)' 
                    }}>{getDisplayText(selectedDrive?.minCgpa)}+</span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                    <span className="text-secondary small d-block" style={{ 
                      fontSize: 'clamp(0.35rem, 0.6vw, 0.55rem)' 
                    }}>Openings</span>
                    <span className="text-dark" style={{ 
                      fontSize: 'clamp(0.55rem, 1vw, 0.75rem)' 
                    }}>{getDisplayText(selectedDrive?.openings)}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              {selectedDrive?.description && (
                <div className="mb-2 p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                  <span className="text-secondary small d-block" style={{ 
                    fontSize: 'clamp(0.35rem, 0.6vw, 0.55rem)' 
                  }}>Description</span>
                  <p className="text-secondary small mb-0" style={{ 
                    fontSize: 'clamp(0.5rem, 0.9vw, 0.7rem)' 
                  }}>{getDisplayText(selectedDrive.description)}</p>
                </div>
              )}

              {/* Skills */}
              {selectedDrive?.requiredSkills && selectedDrive.requiredSkills.length > 0 && (
                <div className="mb-2">
                  <span className="text-secondary small d-block" style={{ 
                    fontSize: 'clamp(0.35rem, 0.6vw, 0.55rem)' 
                  }}>Required Skills</span>
                  <div className="d-flex flex-wrap gap-1 mt-1">
                    {selectedDrive.requiredSkills.map((skill, i) => (
                      <span key={i} className="badge bg-warning bg-opacity-10 text-warning border border-warning" style={{ 
                        fontSize: 'clamp(0.4rem, 0.7vw, 0.55rem)' 
                      }}>
                        <Code style={{ 
                          width: 'clamp(0.35rem, 0.6vw, 0.6rem)', 
                          height: 'clamp(0.35rem, 0.6vw, 0.6rem)', 
                          marginRight: '0.15rem' 
                        }} />
                        {getDisplayText(skill)}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-3 pt-3 border-top border-light d-flex flex-wrap gap-2">
                <button 
                  className={`btn btn-sm flex-grow-1 d-flex align-items-center justify-content-center gap-1 ${selectedDrive?.status === 'Selected' ? 'btn-success' : selectedDrive?.status === 'Applied' ? 'btn-secondary' : 'btn-primary'}`}
                  style={{ 
                    borderRadius: '10px', 
                    fontWeight: '600', 
                    fontSize: 'clamp(0.5rem, 0.9vw, 0.7rem)', 
                    padding: '0.35rem 0.7rem' 
                  }}
                  disabled={selectedDrive?.status === 'Selected' || selectedDrive?.status === 'Applied'}
                >
                  {selectedDrive?.status === 'Selected' ? (
                    <><CheckCircle style={{ 
                      width: 'clamp(0.6rem, 1vw, 0.9rem)', 
                      height: 'clamp(0.6rem, 1vw, 0.9rem)' 
                    }} /> Selected</>
                  ) : selectedDrive?.status === 'Applied' ? (
                    <><Clock style={{ 
                      width: 'clamp(0.6rem, 1vw, 0.9rem)', 
                      height: 'clamp(0.6rem, 1vw, 0.9rem)' 
                    }} /> Applied</>
                  ) : selectedDrive?.status === 'Shortlisted' ? (
                    <><UserCheck style={{ 
                      width: 'clamp(0.6rem, 1vw, 0.9rem)', 
                      height: 'clamp(0.6rem, 1vw, 0.9rem)' 
                    }} /> Shortlisted</>
                  ) : (
                    <><ExternalLink style={{ 
                      width: 'clamp(0.6rem, 1vw, 0.9rem)', 
                      height: 'clamp(0.6rem, 1vw, 0.9rem)' 
                    }} /> Apply Now</>
                  )}
                </button>
                <button className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1" style={{ 
                  borderRadius: '10px', 
                  fontSize: 'clamp(0.45rem, 0.8vw, 0.65rem)', 
                  padding: '0.35rem 0.7rem' 
                }}>
                  <Download style={{ 
                    width: 'clamp(0.6rem, 1vw, 0.9rem)', 
                    height: 'clamp(0.6rem, 1vw, 0.9rem)' 
                  }} /> JD
                </button>
                <button className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1" style={{ 
                  borderRadius: '10px', 
                  fontSize: 'clamp(0.45rem, 0.8vw, 0.65rem)', 
                  padding: '0.35rem 0.7rem' 
                }}>
                  <Bell style={{ 
                    width: 'clamp(0.6rem, 1vw, 0.9rem)', 
                    height: 'clamp(0.6rem, 1vw, 0.9rem)' 
                  }} /> Remind
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
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        .transition-all {
          transition: all 0.3s ease;
        }
        
        .space-y-1.5 > * + * {
          margin-top: 0.375rem;
        }
        
        .card {
          transition: all 0.3s ease;
        }
        
        .min-w-0 {
          min-width: 0;
        }

        /* Responsive adjustments */
        @media (max-width: 576px) {
          .card-body {
            padding: 0.65rem !important;
          }
          .gap-1 {
            gap: 0.2rem !important;
          }
          .badge {
            padding: 0.12rem 0.35rem !important;
          }
          .btn-sm {
            padding: 0.15rem 0.4rem !important;
          }
          .rounded-3 {
            border-radius: 8px !important;
          }
          .rounded-md-4 {
            border-radius: 10px !important;
          }
        }

        @media (min-width: 576px) and (max-width: 767px) {
          .col-sm-6 {
            flex: 0 0 50%;
            max-width: 50%;
          }
        }

        @media (min-width: 768px) and (max-width: 991px) {
          .card-body {
            padding: 0.9rem !important;
          }
          .col-md {
            flex: 1 0 0%;
          }
        }

        @media (min-width: 992px) and (max-width: 1199px) {
          .col-xl-4 {
            flex: 0 0 33.333333%;
            max-width: 33.333333%;
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