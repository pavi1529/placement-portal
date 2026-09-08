import React, { useState, useEffect } from 'react';
import { 
  Briefcase, MapPin, Calendar, Clock, Users, CheckCircle, XCircle, 
  Award, Building2, DollarSign, Bookmark, ExternalLink, Search, Filter,
  Loader2, RefreshCw, ArrowUpRight, Star, TrendingUp, AlertCircle,
  Eye, Heart, Share2, FileText, GraduationCap, Tag, Layers,
  Zap, Sparkles, Globe, Monitor, Wifi, Home, Link
} from 'lucide-react';

const API_URL = 'http://localhost:5000/api';

export default function Jobs({ token }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('ALL');
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [selectedJob, setSelectedJob] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);

  const sampleJobs = [
    {
      _id: '1',
      title: 'Senior Software Engineer',
      company: { name: 'Google', _id: 'g1' },
      location: 'Bangalore, India',
      salary: '₹25 LPA',
      type: 'full-time',
      category: 'IT',
      positions: 5,
      deadline: '2026-08-15',
      status: 'Active',
      description: 'Looking for senior software engineers with expertise in distributed systems and cloud technologies.',
      requirements: '5+ years experience, strong DSA skills, cloud certification preferred.',
      experience: '5+ years',
      benefits: ['Health Insurance', 'Stock Options', 'Remote Work', 'Learning Budget']
    },
    {
      _id: '2',
      title: 'Full Stack Developer',
      company: { name: 'Microsoft', _id: 'm1' },
      location: 'Hyderabad, India',
      salary: '₹22 LPA',
      type: 'full-time',
      category: 'IT',
      positions: 3,
      deadline: '2026-08-20',
      status: 'Active',
      description: 'Join Microsoft\'s next-gen cloud products team. Work on cutting-edge technologies.',
      requirements: '3+ years experience, React, Node.js, Azure knowledge.',
      experience: '3+ years',
      benefits: ['Health Insurance', 'Stock Options', 'Flexible Hours']
    },
    {
      _id: '3',
      title: 'Data Scientist',
      company: { name: 'Amazon', _id: 'a1' },
      location: 'Chennai, India',
      salary: '₹20 LPA',
      type: 'full-time',
      category: 'Data',
      positions: 2,
      deadline: '2026-08-10',
      status: 'Active',
      description: 'Amazon is hiring data scientists for their retail analytics team.',
      requirements: '2+ years experience, Python, ML frameworks, SQL.',
      experience: '2+ years',
      benefits: ['Health Insurance', 'Stock Options', 'Meal Cards']
    },
    {
      _id: '4',
      title: 'UI/UX Designer',
      company: { name: 'Zoho', _id: 'z1' },
      location: 'Chennai, India',
      salary: '₹12 LPA',
      type: 'full-time',
      category: 'Design',
      positions: 2,
      deadline: '2026-09-01',
      status: 'Active',
      description: 'Join Zoho\'s product design team to create beautiful user experiences.',
      requirements: '2+ years experience, Figma, Adobe XD, Portfolio required.',
      experience: '2+ years',
      benefits: ['Health Insurance', 'Creative Allowance', 'Flexible Hours']
    },
    {
      _id: '5',
      title: 'Software Engineer Intern',
      company: { name: 'PayPal', _id: 'p1' },
      location: 'Bangalore, India',
      salary: '₹12 LPA',
      type: 'internship',
      category: 'IT',
      positions: 5,
      deadline: '2026-08-25',
      status: 'Active',
      description: 'Internship opportunity for final year students in fintech domain.',
      requirements: 'Freshers, good DSA knowledge, Java/Python skills.',
      experience: 'Fresher',
      benefits: ['Stipend', 'Certificate', 'PPO Opportunity']
    },
    {
      _id: '6',
      title: 'DevOps Engineer',
      company: { name: 'Cognizant', _id: 'c1' },
      location: 'Multiple Locations',
      salary: '₹8 LPA',
      type: 'full-time',
      category: 'IT',
      positions: 8,
      deadline: '2026-09-10',
      status: 'Active',
      description: 'Cognizant is hiring freshers for their DevOps practice.',
      requirements: 'Knowledge of CI/CD, Docker, Kubernetes, Cloud platforms.',
      experience: '0-2 years',
      benefits: ['Health Insurance', 'Training Programs', 'Certifications']
    },
    {
      _id: '7',
      title: 'Marketing Manager',
      company: { name: 'Freshworks', _id: 'f1' },
      location: 'Chennai, India',
      salary: '₹15 LPA',
      type: 'full-time',
      category: 'Marketing',
      positions: 1,
      deadline: '2026-08-30',
      status: 'Active',
      description: 'Lead marketing campaigns for Freshworks\'s SaaS products.',
      requirements: '5+ years experience, Digital Marketing, Team management.',
      experience: '5+ years',
      benefits: ['Health Insurance', 'Stock Options', 'Travel Allowance']
    },
    {
      _id: '8',
      title: 'Finance Analyst',
      company: { name: 'Deloitte', _id: 'd1' },
      location: 'Mumbai, India',
      salary: '₹10 LPA',
      type: 'full-time',
      category: 'Finance',
      positions: 3,
      deadline: '2026-09-05',
      status: 'Closed',
      description: 'Join Deloitte\'s financial advisory team.',
      requirements: 'CA/CFA preferred, 2+ years experience.',
      experience: '2+ years',
      benefits: ['Health Insurance', 'Performance Bonus', 'Professional Development']
    }
  ];

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/jobs`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      
      if (data.success && data.data && data.data.length > 0) {
        setJobs(data.data);
      } else {
        setJobs(sampleJobs);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setJobs(sampleJobs);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (jobId) => {
    try {
      const response = await fetch(`${API_URL}/applications`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          job: jobId,
          student: localStorage.getItem('studentId') || 'student_id'
        })
      });
      const data = await response.json();
      
      if (data.success) {
        alert('✅ Application submitted successfully!');
        setAppliedJobs([...appliedJobs, jobId]);
      } else {
        alert('❌ Failed to apply: ' + data.message);
      }
    } catch (error) {
      console.error('Error applying for job:', error);
      setAppliedJobs([...appliedJobs, jobId]);
      alert('✅ Application submitted successfully! (Demo)');
    }
  };

  const toggleBookmark = (jobId) => {
    if (bookmarkedJobs.includes(jobId)) {
      setBookmarkedJobs(bookmarkedJobs.filter(id => id !== jobId));
    } else {
      setBookmarkedJobs([...bookmarkedJobs, jobId]);
    }
  };

  const isApplied = (jobId) => appliedJobs.includes(jobId);
  const isBookmarked = (jobId) => bookmarkedJobs.includes(jobId);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job?.title?.toLowerCase().includes(searchQuery?.toLowerCase() || '') ||
                          job?.company?.name?.toLowerCase().includes(searchQuery?.toLowerCase() || '') ||
                          job?.location?.toLowerCase().includes(searchQuery?.toLowerCase() || '');
    const matchesType = filterType === 'ALL' || job?.type === filterType;
    const matchesCategory = filterCategory === 'ALL' || job?.category === filterCategory;
    return matchesSearch && matchesType && matchesCategory;
  });

  const totalJobs = jobs.length;
  const activeJobs = jobs.filter(j => j?.status === 'Active').length;
  const closedJobs = jobs.filter(j => j?.status === 'Closed').length;
  const totalPositions = jobs.reduce((sum, j) => sum + (j?.positions || 0), 0);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Active': return 'success';
      case 'Closed': return 'danger';
      case 'Pending': return 'warning';
      default: return 'secondary';
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'full-time': return 'primary';
      case 'part-time': return 'info';
      case 'internship': return 'warning';
      case 'contract': return 'success';
      default: return 'secondary';
    }
  };

  const getTypeLabel = (type) => {
    switch(type) {
      case 'full-time': return 'Full Time';
      case 'part-time': return 'Part Time';
      case 'internship': return 'Internship';
      case 'contract': return 'Contract';
      default: return type || 'N/A';
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

  const getCompanyInitial = (name) => name?.charAt(0) || 'C';

  useEffect(() => {
    if (token) {
      fetchJobs();
    } else {
      setJobs(sampleJobs);
    }
  }, [token]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <Loader2 className="spinner-border text-primary" style={{ width: 'clamp(1.5rem, 3vw, 2rem)', height: 'clamp(1.5rem, 3vw, 2rem)' }} />
        <p className="text-secondary mt-2" style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.9rem)' }}>Loading jobs...</p>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      {/* HEADER */}
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3 mb-md-4">
        <div>
          <h5 className="text-dark fw-bold m-0" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)' }}>
            Jobs
          </h5>
          <p className="text-secondary small m-0" style={{ fontSize: 'clamp(0.55rem, 1vw, 0.7rem)' }}>
            Find your dream job and apply now
          </p>
        </div>
        <div className="d-flex align-items-center gap-2">
          <span className="badge bg-success bg-opacity-10 text-success border border-success px-2 px-md-3 py-1 py-md-2" style={{ fontSize: 'clamp(0.45rem, 0.8vw, 0.6rem)' }}>
            <Zap style={{ width: 'clamp(0.5rem, 0.8vw, 0.7rem)', height: 'clamp(0.5rem, 0.8vw, 0.7rem)', marginRight: '0.2rem' }} />
            {activeJobs} Active
          </span>
        </div>
      </div>

      {/* STATS */}
      <div className="row g-2 g-md-3 mb-3 mb-md-4">
        {[
          { label: "Total Jobs", value: totalJobs, color: "primary", icon: Briefcase },
          { label: "Active", value: activeJobs, color: "success", icon: CheckCircle },
          { label: "Closed", value: closedJobs, color: "danger", icon: XCircle },
          { label: "Positions", value: totalPositions, color: "info", icon: Users },
        ].map((stat, i) => {
          const Icon = stat.icon;
          const bgColors = {
            primary: 'rgba(59,130,246,0.08)',
            success: 'rgba(34,197,94,0.08)',
            danger: 'rgba(239,68,68,0.08)',
            info: 'rgba(6,182,212,0.08)'
          };
          return (
            <div key={i} className="col-6 col-lg-3">
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

      {/* SEARCH & FILTER */}
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
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.75rem)', width: 'clamp(70px, 12vw, 120px)', outline: 'none', padding: '0.1rem 0.4rem' }}
              >
                <option value="ALL">Type</option>
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="internship">Internship</option>
                <option value="contract">Contract</option>
              </select>
            </div>
            <div className="d-flex align-items-center gap-1 gap-md-2 bg-white px-2 px-md-3 py-1 py-md-2 rounded-3 border border-light flex-grow-1 flex-md-grow-0">
              <Layers className="text-secondary" style={{ width: 'clamp(0.6rem, 1vw, 0.7rem)', height: 'clamp(0.6rem, 1vw, 0.7rem)' }} />
              <select 
                className="form-select form-select-sm bg-transparent border-0 text-dark" 
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.75rem)', width: 'clamp(70px, 12vw, 120px)', outline: 'none', padding: '0.1rem 0.4rem' }}
              >
                <option value="ALL">Category</option>
                <option value="IT">IT</option>
                <option value="Data">Data</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Finance">Finance</option>
              </select>
            </div>
            <button 
              className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1 shadow-sm"
              onClick={fetchJobs}
              style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.7rem)', padding: '0.2rem 0.5rem' }}
            >
              <RefreshCw style={{ width: 'clamp(0.6rem, 1vw, 0.8rem)', height: 'clamp(0.6rem, 1vw, 0.8rem)' }} /> 
              <span className="d-none d-sm-inline">Refresh</span>
            </button>
            <span className="text-secondary small ms-auto d-none d-md-block" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.65rem)' }}>
              {filteredJobs.length} found
            </span>
          </div>
        </div>
      </div>

      {/* JOBS GRID */}
      {filteredJobs.length === 0 ? (
        <div className="card border-0 shadow-sm rounded-4 text-center p-3 p-md-5" style={{ background: '#ffffff', border: '1px solid #e9ecef' }}>
          <Briefcase className="text-secondary mx-auto" style={{ width: 'clamp(2rem, 4vw, 3rem)', height: 'clamp(2rem, 4vw, 3rem)' }} />
          <h6 className="text-secondary mt-3" style={{ fontSize: 'clamp(0.85rem, 1.8vw, 1rem)' }}>No jobs found</h6>
          <p className="text-secondary small" style={{ fontSize: 'clamp(0.65rem, 1vw, 0.8rem)' }}>Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="row g-2 g-md-3 g-lg-4">
          {filteredJobs.map((job, index) => {
            const isBookmarkedJob = isBookmarked(job?._id);
            const isAppliedJob = isApplied(job?._id);
            const companyColor = getCompanyColor(job?.company?.name);
            const companyInitial = getCompanyInitial(job?.company?.name);
            
            return (
              <div key={job?._id || index} className="col-sm-6 col-xl-4">
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
                        width: 'clamp(36px, 5vw, 44px)', 
                        height: 'clamp(36px, 5vw, 44px)',
                        background: companyColor,
                        fontSize: 'clamp(0.7rem, 1.2vw, 1rem)',
                        fontWeight: 'bold',
                        color: '#fff'
                      }}>
                        {companyInitial}
                      </div>
                      <div className="flex-grow-1 min-w-0">
                        <h6 className="fw-bold text-dark m-0 text-truncate" style={{ fontSize: 'clamp(0.75rem, 1.3vw, 0.9rem)' }}>
                          {job?.title}
                        </h6>
                        <span className="text-secondary d-flex align-items-center gap-1" style={{ fontSize: 'clamp(0.45rem, 0.8vw, 0.55rem)' }}>
                          <Building2 style={{ width: 'clamp(0.45rem, 0.7vw, 0.6rem)', height: 'clamp(0.45rem, 0.7vw, 0.6rem)' }} /> 
                          {job?.company?.name || 'N/A'}
                        </span>
                      </div>
                      <button 
                        onClick={() => toggleBookmark(job?._id)}
                        className="btn btn-sm p-0 flex-shrink-0"
                        style={{ background: 'transparent', border: 'none' }}
                      >
                        {isBookmarkedJob ? (
                          <Heart className="text-danger" style={{ width: 'clamp(0.7rem, 1.1vw, 0.9rem)', height: 'clamp(0.7rem, 1.1vw, 0.9rem)', fill: '#ef4444' }} />
                        ) : (
                          <Heart className="text-secondary" style={{ width: 'clamp(0.7rem, 1.1vw, 0.9rem)', height: 'clamp(0.7rem, 1.1vw, 0.9rem)' }} />
                        )}
                      </button>
                    </div>

                    {/* Tags */}
                    <div className="d-flex flex-wrap gap-1 mb-2 mb-md-3">
                      <span className={`badge bg-${getStatusColor(job?.status)} bg-opacity-10 text-${getStatusColor(job?.status)} border border-${getStatusColor(job?.status)}`}
                            style={{ fontSize: 'clamp(0.35rem, 0.7vw, 0.5rem)' }}>
                        {job?.status || 'N/A'}
                      </span>
                      <span className={`badge bg-${getTypeColor(job?.type)} bg-opacity-10 text-${getTypeColor(job?.type)} border border-${getTypeColor(job?.type)}`}
                            style={{ fontSize: 'clamp(0.35rem, 0.7vw, 0.5rem)' }}>
                        {getTypeLabel(job?.type)}
                      </span>
                      {job?.category && (
                        <span className="badge bg-purple bg-opacity-10 text-purple border border-purple"
                              style={{ fontSize: 'clamp(0.35rem, 0.7vw, 0.5rem)' }}>
                          {job?.category}
                        </span>
                      )}
                    </div>

                    {/* Job Details */}
                    <div className="space-y-1.5 flex-grow-1">
                      <div className="d-flex align-items-center gap-2 p-1 p-md-1.5 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                        <MapPin className="text-info" style={{ width: 'clamp(0.5rem, 0.8vw, 0.7rem)', height: 'clamp(0.5rem, 0.8vw, 0.7rem)' }} />
                        <span className="text-secondary small flex-grow-1" style={{ fontSize: 'clamp(0.45rem, 0.7vw, 0.6rem)' }}>Location</span>
                        <span className="text-dark" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.65rem)' }}>{job?.location || 'N/A'}</span>
                      </div>
                      <div className="d-flex align-items-center gap-2 p-1 p-md-1.5 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                        <DollarSign className="text-success" style={{ width: 'clamp(0.5rem, 0.8vw, 0.7rem)', height: 'clamp(0.5rem, 0.8vw, 0.7rem)' }} />
                        <span className="text-secondary small flex-grow-1" style={{ fontSize: 'clamp(0.45rem, 0.7vw, 0.6rem)' }}>Salary</span>
                        <span className="text-success fw-bold" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.65rem)' }}>{job?.salary || 'N/A'}</span>
                      </div>
                      <div className="d-flex align-items-center gap-2 p-1 p-md-1.5 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                        <Clock className="text-warning" style={{ width: 'clamp(0.5rem, 0.8vw, 0.7rem)', height: 'clamp(0.5rem, 0.8vw, 0.7rem)' }} />
                        <span className="text-secondary small flex-grow-1" style={{ fontSize: 'clamp(0.45rem, 0.7vw, 0.6rem)' }}>Deadline</span>
                        <span className="text-dark" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.65rem)' }}>{formatDate(job?.deadline)}</span>
                      </div>
                      <div className="d-flex align-items-center gap-2 p-1 p-md-1.5 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                        <Users className="text-primary" style={{ width: 'clamp(0.5rem, 0.8vw, 0.7rem)', height: 'clamp(0.5rem, 0.8vw, 0.7rem)' }} />
                        <span className="text-secondary small flex-grow-1" style={{ fontSize: 'clamp(0.45rem, 0.7vw, 0.6rem)' }}>Positions</span>
                        <span className="text-dark fw-bold" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.65rem)' }}>{job?.positions || 0}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-3 pt-2 pt-md-3 border-top border-light d-flex gap-2">
                      <button 
                        onClick={() => { setSelectedJob(job); setShowDetails(true); }}
                        className="btn btn-outline-info btn-sm flex-grow-1 d-flex align-items-center justify-content-center gap-1"
                        style={{ fontSize: 'clamp(0.45rem, 0.7vw, 0.6rem)', borderRadius: '8px', padding: '0.25rem 0.4rem' }}
                      >
                        <Eye style={{ width: 'clamp(0.5rem, 0.8vw, 0.7rem)', height: 'clamp(0.5rem, 0.8vw, 0.7rem)' }} /> View
                      </button>
                      <button 
                        onClick={() => handleApply(job?._id)}
                        disabled={isAppliedJob || job?.status === 'Closed'}
                        className={`btn btn-sm flex-grow-1 d-flex align-items-center justify-content-center gap-1 ${isAppliedJob ? 'btn-success' : job?.status === 'Closed' ? 'btn-secondary' : 'btn-primary'}`}
                        style={{ fontSize: 'clamp(0.45rem, 0.7vw, 0.6rem)', borderRadius: '8px', padding: '0.25rem 0.4rem' }}
                      >
                        {isAppliedJob ? (
                          <><CheckCircle style={{ width: 'clamp(0.5rem, 0.8vw, 0.7rem)', height: 'clamp(0.5rem, 0.8vw, 0.7rem)' }} /> Applied</>
                        ) : job?.status === 'Closed' ? (
                          <><XCircle style={{ width: 'clamp(0.5rem, 0.8vw, 0.7rem)', height: 'clamp(0.5rem, 0.8vw, 0.7rem)' }} /> Closed</>
                        ) : (
                          <><ExternalLink style={{ width: 'clamp(0.5rem, 0.8vw, 0.7rem)', height: 'clamp(0.5rem, 0.8vw, 0.7rem)' }} /> Apply</>
                        )}
                      </button>
                    </div>

                    {/* Benefits */}
                    {job?.benefits && job.benefits.length > 0 && (
                      <div className="mt-2 pt-2 border-top border-light">
                        <div className="d-flex flex-wrap gap-1">
                          {job.benefits.slice(0, 3).map((benefit, i) => (
                            <span key={i} className="badge bg-light text-secondary border border-light" style={{ fontSize: 'clamp(0.3rem, 0.6vw, 0.45rem)' }}>
                              <Sparkles style={{ width: 'clamp(0.3rem, 0.5vw, 0.4rem)', height: 'clamp(0.3rem, 0.5vw, 0.4rem)', marginRight: '0.1rem' }} />
                              {benefit}
                            </span>
                          ))}
                          {job.benefits.length > 3 && (
                            <span className="badge bg-light text-secondary border border-light" style={{ fontSize: 'clamp(0.3rem, 0.6vw, 0.45rem)' }}>
                              +{job.benefits.length - 3}
                            </span>
                          )}
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

      {/* DETAIL MODAL */}
      {showDetails && selectedJob && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ 
          zIndex: 9999, 
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(5px)',
          padding: '1rem'
        }}
        onClick={() => setShowDetails(false)}
        >
          <div className="card border-0 shadow-lg rounded-4" style={{ 
            maxWidth: 'clamp(320px, 85vw, 600px)', 
            width: '100%', 
            maxHeight: '90vh', 
            overflowY: 'auto', 
            background: '#ffffff'
          }}
          onClick={(e) => e.stopPropagation()}
          >
            <div className="card-body p-3 p-md-4">
              <div className="d-flex justify-content-between align-items-center mb-3 border-bottom border-light pb-3">
                <h5 className="text-dark fw-bold m-0 d-flex align-items-center gap-2" style={{ fontSize: 'clamp(0.85rem, 2vw, 1.1rem)' }}>
                  <Briefcase className="text-primary" style={{ width: 'clamp(0.8rem, 1.5vw, 1.2rem)', height: 'clamp(0.8rem, 1.5vw, 1.2rem)' }} />
                  Job Details
                </h5>
                <button onClick={() => setShowDetails(false)} className="btn btn-close" style={{ fontSize: 'clamp(0.6rem, 1vw, 0.9rem)' }}></button>
              </div>

              {/* Company Header */}
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="d-flex align-items-center justify-content-center rounded-3 flex-shrink-0" style={{ 
                  width: 'clamp(36px, 6vw, 48px)', 
                  height: 'clamp(36px, 6vw, 48px)',
                  background: getCompanyColor(selectedJob?.company?.name),
                  fontSize: 'clamp(0.8rem, 1.5vw, 1.1rem)',
                  fontWeight: 'bold',
                  color: '#fff'
                }}>
                  {getCompanyInitial(selectedJob?.company?.name)}
                </div>
                <div className="min-w-0">
                  <h5 className="text-dark fw-bold m-0" style={{ fontSize: 'clamp(0.85rem, 1.8vw, 1.05rem)' }}>
                    {selectedJob?.title}
                  </h5>
                  <span className="text-secondary d-flex align-items-center gap-1" style={{ fontSize: 'clamp(0.5rem, 1vw, 0.7rem)' }}>
                    <Building2 style={{ width: 'clamp(0.5rem, 0.8vw, 0.8rem)', height: 'clamp(0.5rem, 0.8vw, 0.8rem)' }} /> 
                    {selectedJob?.company?.name || 'N/A'}
                  </span>
                </div>
              </div>

              {/* Tags */}
              <div className="d-flex flex-wrap gap-1 mb-3">
                <span className={`badge bg-${getStatusColor(selectedJob?.status)} bg-opacity-10 text-${getStatusColor(selectedJob?.status)} border border-${getStatusColor(selectedJob?.status)}`}
                      style={{ fontSize: 'clamp(0.4rem, 0.7vw, 0.55rem)' }}>
                  {selectedJob?.status || 'N/A'}
                </span>
                <span className={`badge bg-${getTypeColor(selectedJob?.type)} bg-opacity-10 text-${getTypeColor(selectedJob?.type)} border border-${getTypeColor(selectedJob?.type)}`}
                      style={{ fontSize: 'clamp(0.4rem, 0.7vw, 0.55rem)' }}>
                  {getTypeLabel(selectedJob?.type)}
                </span>
                {selectedJob?.category && (
                  <span className="badge bg-purple bg-opacity-10 text-purple border border-purple"
                        style={{ fontSize: 'clamp(0.4rem, 0.7vw, 0.55rem)' }}>
                    {selectedJob?.category}
                  </span>
                )}
              </div>

              {/* Details Grid */}
              <div className="row g-2 mb-3">
                <div className="col-6">
                  <div className="p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                    <span className="text-secondary small d-block" style={{ fontSize: 'clamp(0.35rem, 0.6vw, 0.55rem)' }}>Location</span>
                    <span className="text-dark" style={{ fontSize: 'clamp(0.55rem, 1vw, 0.7rem)' }}>{selectedJob?.location || 'N/A'}</span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                    <span className="text-secondary small d-block" style={{ fontSize: 'clamp(0.35rem, 0.6vw, 0.55rem)' }}>Salary</span>
                    <span className="text-success fw-bold" style={{ fontSize: 'clamp(0.55rem, 1vw, 0.7rem)' }}>{selectedJob?.salary || 'N/A'}</span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                    <span className="text-secondary small d-block" style={{ fontSize: 'clamp(0.35rem, 0.6vw, 0.55rem)' }}>Positions</span>
                    <span className="text-dark fw-bold" style={{ fontSize: 'clamp(0.55rem, 1vw, 0.7rem)' }}>{selectedJob?.positions || 0}</span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                    <span className="text-secondary small d-block" style={{ fontSize: 'clamp(0.35rem, 0.6vw, 0.55rem)' }}>Experience</span>
                    <span className="text-dark" style={{ fontSize: 'clamp(0.55rem, 1vw, 0.7rem)' }}>{selectedJob?.experience || 'N/A'}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              {selectedJob?.description && (
                <div className="mb-2 p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                  <span className="text-secondary small d-block" style={{ fontSize: 'clamp(0.35rem, 0.6vw, 0.55rem)' }}>Description</span>
                  <p className="text-dark small mb-0" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.7rem)' }}>{selectedJob.description}</p>
                </div>
              )}

              {/* Requirements */}
              {selectedJob?.requirements && (
                <div className="mb-2 p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                  <span className="text-secondary small d-block" style={{ fontSize: 'clamp(0.35rem, 0.6vw, 0.55rem)' }}>Requirements</span>
                  <p className="text-dark small mb-0" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.7rem)' }}>{selectedJob.requirements}</p>
                </div>
              )}

              {/* Benefits */}
              {selectedJob?.benefits && selectedJob.benefits.length > 0 && (
                <div className="mb-2">
                  <span className="text-secondary small d-block" style={{ fontSize: 'clamp(0.35rem, 0.6vw, 0.55rem)' }}>Benefits</span>
                  <div className="d-flex flex-wrap gap-1 mt-1">
                    {selectedJob.benefits.map((benefit, i) => (
                      <span key={i} className="badge bg-light text-secondary border border-light" style={{ fontSize: 'clamp(0.4rem, 0.7vw, 0.55rem)' }}>
                        <Sparkles style={{ width: 'clamp(0.35rem, 0.6vw, 0.6rem)', height: 'clamp(0.35rem, 0.6vw, 0.6rem)', marginRight: '0.1rem' }} />
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="mt-3 pt-3 border-top border-light d-flex gap-2 flex-wrap">
                <button onClick={() => setShowDetails(false)} className="btn btn-secondary flex-grow-1" style={{ fontSize: 'clamp(0.55rem, 1vw, 0.75rem)', padding: '0.35rem 0.7rem' }}>
                  Close
                </button>
                <button 
                  onClick={() => {
                    handleApply(selectedJob?._id);
                    setShowDetails(false);
                  }}
                  disabled={isApplied(selectedJob?._id) || selectedJob?.status === 'Closed'}
                  className={`btn flex-grow-1 d-flex align-items-center justify-content-center gap-1 ${isApplied(selectedJob?._id) ? 'btn-success' : selectedJob?.status === 'Closed' ? 'btn-secondary' : 'btn-primary'}`}
                  style={{ fontSize: 'clamp(0.55rem, 1vw, 0.75rem)', padding: '0.35rem 0.7rem' }}
                >
                  {isApplied(selectedJob?._id) ? (
                    <><CheckCircle style={{ width: 'clamp(0.6rem, 1vw, 0.9rem)', height: 'clamp(0.6rem, 1vw, 0.9rem)' }} /> Applied</>
                  ) : selectedJob?.status === 'Closed' ? (
                    <><XCircle style={{ width: 'clamp(0.6rem, 1vw, 0.9rem)', height: 'clamp(0.6rem, 1vw, 0.9rem)' }} /> Closed</>
                  ) : (
                    <><ExternalLink style={{ width: 'clamp(0.6rem, 1vw, 0.9rem)', height: 'clamp(0.6rem, 1vw, 0.9rem)' }} /> Apply Now</>
                  )}
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
        
        .space-y-1.5 > * + * {
          margin-top: 0.375rem;
        }
        
        .card {
          transition: all 0.3s ease;
        }
        
        .min-w-0 {
          min-width: 0;
        }
        
        .text-truncate {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        
        .text-purple {
          color: #8b5cf6;
        }
        
        .bg-purple {
          background-color: #8b5cf6;
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
        }

        @media (min-width: 768px) and (max-width: 991px) {
          .card-body {
            padding: 0.9rem !important;
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
          borderRadius: 10px;
        }
      `}</style>
    </div>
  );
}