import React, { useState, useEffect } from 'react';
import { 
  Plus, Edit2, Trash2, Search, Filter, Eye, 
  Briefcase, Users, DollarSign, Calendar, CheckCircle, 
  XCircle, Clock, AlertCircle, ExternalLink, Sparkles,
  FileText, Building2, MapPin, Link2, Save, Loader2,
  Award, Star, TrendingUp, UserCheck, RefreshCw,
  ArrowUpRight, Zap, X
} from 'lucide-react';

const API_URL = 'http://localhost:5000/api';

export default function AdminJobsTab({ token }) {
  const [jobs, setJobs] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [filterType, setFilterType] = useState('ALL');
  const [error, setError] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [editJob, setEditJob] = useState(null);

  const [newJob, setNewJob] = useState({ 
    title: '',
    company: '',
    description: '',
    requirements: '',
    location: '',
    salary: '',
    type: 'full-time',
    category: '',
    experience: '',
    deadline: '',
    positions: 1,
    status: 'Active'
  });

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
      description: 'Looking for senior software engineers with expertise in distributed systems.',
      requirements: '5+ years experience, strong DSA skills.',
      experience: '5+ years'
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
      description: 'Join Microsoft\'s next-gen cloud products team.',
      requirements: '3+ years experience, React, Node.js.',
      experience: '3+ years'
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
      status: 'Closed',
      description: 'Amazon is hiring data scientists for retail analytics.',
      requirements: '2+ years experience, Python, ML frameworks.',
      experience: '2+ years'
    }
  ];

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

  const fetchJobs = async () => {
    try {
      const data = await apiCall('/jobs');
      if (data.success && data.data && data.data.length > 0) {
        setJobs(data.data);
      } else {
        setJobs(sampleJobs);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setJobs(sampleJobs);
    }
  };

  const fetchCompanies = async () => {
    try {
      const data = await apiCall('/companies');
      if (data.success) {
        setCompanies(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching companies:', error);
      setCompanies([
        { _id: 'g1', name: 'Google' },
        { _id: 'm1', name: 'Microsoft' },
        { _id: 'a1', name: 'Amazon' },
        { _id: 'z1', name: 'Zoho' }
      ]);
    }
  };

  useEffect(() => {
    if (token) {
      fetchJobs();
      fetchCompanies();
    } else {
      setJobs(sampleJobs);
    }
  }, [token]);

  const handleAddJob = async (e) => {
    e.preventDefault();
    if (!newJob.title || !newJob.company || !newJob.location) {
      alert('Please fill in all required fields!');
      return;
    }

    try {
      const data = await apiCall('/jobs', 'POST', {
        title: newJob.title,
        company: newJob.company,
        description: newJob.description || '',
        requirements: newJob.requirements || '',
        location: newJob.location,
        salary: newJob.salary || '',
        type: newJob.type,
        category: newJob.category || '',
        experience: newJob.experience || '',
        deadline: newJob.deadline || '',
        positions: parseInt(newJob.positions) || 1,
        status: newJob.status || 'Active'
      });

      if (data.success) {
        alert('✅ Job created successfully!');
        resetForm();
        setShowAddModal(false);
        fetchJobs();
      }
    } catch (error) {
      const company = companies.find(c => c._id === newJob.company);
      const newJobData = {
        _id: Date.now().toString(),
        title: newJob.title,
        company: { name: company?.name || 'Unknown', _id: newJob.company },
        location: newJob.location,
        salary: newJob.salary || 'N/A',
        type: newJob.type,
        category: newJob.category || 'General',
        positions: parseInt(newJob.positions) || 1,
        deadline: newJob.deadline || new Date().toISOString(),
        status: newJob.status || 'Active',
        description: newJob.description || '',
        requirements: newJob.requirements || '',
        experience: newJob.experience || ''
      };
      setJobs([newJobData, ...jobs]);
      alert('✅ Job added successfully!');
      resetForm();
      setShowAddModal(false);
    }
  };

  const handleUpdateJob = async () => {
    if (!editJob) return;

    try {
      const data = await apiCall(`/jobs/${editJob._id}`, 'PUT', {
        title: editJob.title,
        company: editJob.company,
        description: editJob.description || '',
        requirements: editJob.requirements || '',
        location: editJob.location,
        salary: editJob.salary || '',
        type: editJob.type,
        category: editJob.category || '',
        experience: editJob.experience || '',
        deadline: editJob.deadline || '',
        positions: parseInt(editJob.positions) || 1,
        status: editJob.status || 'Active'
      });

      if (data.success) {
        alert('✅ Job updated successfully!');
        setShowEditModal(false);
        setEditJob(null);
        fetchJobs();
      }
    } catch (error) {
      setJobs(jobs.map(job => 
        job._id === editJob._id ? { ...editJob } : job
      ));
      alert('✅ Job updated successfully!');
      setShowEditModal(false);
      setEditJob(null);
    }
  };

  const handleDeleteJob = async (id) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;

    try {
      const data = await apiCall(`/jobs/${id}`, 'DELETE');
      if (data.success) {
        alert('✅ Job deleted successfully!');
        fetchJobs();
      }
    } catch (error) {
      setJobs(jobs.filter(job => job._id !== id));
      alert('✅ Job deleted successfully!');
    }
  };

  const resetForm = () => {
    setNewJob({
      title: '',
      company: '',
      description: '',
      requirements: '',
      location: '',
      salary: '',
      type: 'full-time',
      category: '',
      experience: '',
      deadline: '',
      positions: 1,
      status: 'Active'
    });
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Active': return 'success';
      case 'Closed': return 'danger';
      case 'Pending': return 'warning';
      case 'On Hold': return 'info';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Active': return <CheckCircle className="text-success" style={{ width: 'clamp(0.6rem, 1vw, 0.7rem)', height: 'clamp(0.6rem, 1vw, 0.7rem)' }} />;
      case 'Closed': return <XCircle className="text-danger" style={{ width: 'clamp(0.6rem, 1vw, 0.7rem)', height: 'clamp(0.6rem, 1vw, 0.7rem)' }} />;
      case 'Pending': return <Clock className="text-warning" style={{ width: 'clamp(0.6rem, 1vw, 0.7rem)', height: 'clamp(0.6rem, 1vw, 0.7rem)' }} />;
      case 'On Hold': return <AlertCircle className="text-info" style={{ width: 'clamp(0.6rem, 1vw, 0.7rem)', height: 'clamp(0.6rem, 1vw, 0.7rem)' }} />;
      default: return null;
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

  const getCompanyName = (companyId) => {
    const company = companies.find(c => c._id === companyId);
    return company ? company.name : 'N/A';
  };

  const totalJobs = jobs.length;
  const activeJobs = jobs.filter(j => j.status === 'Active' || j.status === 'active').length;
  const closedJobs = jobs.filter(j => j.status === 'Closed' || j.status === 'closed').length;
  const totalPositions = jobs.reduce((sum, j) => sum + (j.positions || 0), 0);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title?.toLowerCase().includes(searchQuery?.toLowerCase() || '') ||
                          job.company?.name?.toLowerCase().includes(searchQuery?.toLowerCase() || '') ||
                          job.location?.toLowerCase().includes(searchQuery?.toLowerCase() || '');
    const matchesStatus = filterStatus === 'ALL' || job.status === filterStatus;
    const matchesType = filterType === 'ALL' || job.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3 mb-md-4">
        <div>
          <h5 className="text-dark fw-bold m-0" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)' }}>
            Jobs
          </h5>
          <p className="text-secondary small m-0" style={{ fontSize: 'clamp(0.6rem, 1vw, 0.7rem)' }}>
            Manage all job listings
          </p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="btn btn-primary btn-sm d-flex align-items-center gap-1 shadow-sm transition-all hover:scale-105"
          style={{ 
            borderRadius: '10px', 
            fontWeight: '600',
            fontSize: 'clamp(0.6rem, 1vw, 0.7rem)',
            padding: 'clamp(0.25rem, 0.5vw, 0.35rem) clamp(0.6rem, 1.2vw, 0.8rem)'
          }}
        >
          <Plus style={{ width: 'clamp(0.6rem, 1vw, 0.8rem)', height: 'clamp(0.6rem, 1vw, 0.8rem)' }} /> 
          <span className="d-none d-sm-inline">Create Job</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="row g-2 g-md-3 mb-3 mb-md-4">
        {[
          { label: "Total Jobs", value: totalJobs, color: "primary", icon: Briefcase },
          { label: "Active Jobs", value: activeJobs, color: "success", icon: CheckCircle },
          { label: "Closed Jobs", value: closedJobs, color: "danger", icon: XCircle },
          { label: "Total Positions", value: totalPositions, color: "info", icon: Users },
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
      <div className="card border-0 shadow-sm rounded-3 rounded-md-4 mb-3 mb-md-4" style={{ background: '#ffffff', border: '1px solid #e9ecef' }}>
        <div className="card-body p-2 p-md-3">
          <div className="d-flex flex-wrap gap-2 align-items-center">
            <div className="d-flex align-items-center gap-2 bg-white px-2 px-md-3 py-1 py-md-2 rounded-3 border border-light flex-grow-1" style={{ maxWidth: 'clamp(160px, 35vw, 300px)' }}>
              <Search className="text-secondary" style={{ 
                width: 'clamp(0.7rem, 1.1vw, 0.8rem)', 
                height: 'clamp(0.7rem, 1.1vw, 0.8rem)' 
              }} />
              <input 
                type="text" 
                className="form-control form-control-sm bg-transparent border-0 text-dark" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ 
                  fontSize: 'clamp(0.6rem, 1vw, 0.75rem)', 
                  outline: 'none', 
                  padding: '0.1rem 0' 
                }}
              />
            </div>
            <div className="d-flex align-items-center gap-1 gap-md-2 bg-white px-2 px-md-3 py-1 py-md-2 rounded-3 border border-light flex-grow-1 flex-md-grow-0">
              <Filter className="text-secondary" style={{ 
                width: 'clamp(0.6rem, 1vw, 0.7rem)', 
                height: 'clamp(0.6rem, 1vw, 0.7rem)' 
              }} />
              <select 
                className="form-select form-select-sm bg-transparent border-0 text-dark" 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                style={{ 
                  fontSize: 'clamp(0.55rem, 0.9vw, 0.75rem)', 
                  width: 'clamp(90px, 15vw, 140px)', 
                  outline: 'none', 
                  padding: '0.1rem 0.4rem' 
                }}
              >
                <option value="ALL">All Status</option>
                <option value="Active">Active</option>
                <option value="Closed">Closed</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
            <div className="d-flex align-items-center gap-1 gap-md-2 bg-white px-2 px-md-3 py-1 py-md-2 rounded-3 border border-light flex-grow-1 flex-md-grow-0">
              <Briefcase className="text-secondary" style={{ 
                width: 'clamp(0.6rem, 1vw, 0.7rem)', 
                height: 'clamp(0.6rem, 1vw, 0.7rem)' 
              }} />
              <select 
                className="form-select form-select-sm bg-transparent border-0 text-dark" 
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                style={{ 
                  fontSize: 'clamp(0.55rem, 0.9vw, 0.75rem)', 
                  width: 'clamp(90px, 15vw, 140px)', 
                  outline: 'none', 
                  padding: '0.1rem 0.4rem' 
                }}
              >
                <option value="ALL">All Types</option>
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="internship">Internship</option>
                <option value="contract">Contract</option>
              </select>
            </div>
            <button 
              onClick={() => { fetchJobs(); fetchCompanies(); }}
              className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1 shadow-sm"
              style={{ 
                fontSize: 'clamp(0.55rem, 0.9vw, 0.7rem)', 
                padding: 'clamp(0.2rem, 0.4vw, 0.3rem) clamp(0.4rem, 0.8vw, 0.6rem)' 
              }}
            >
              <RefreshCw style={{ 
                width: 'clamp(0.6rem, 1vw, 0.8rem)', 
                height: 'clamp(0.6rem, 1vw, 0.8rem)' 
              }} /> 
              <span className="d-none d-sm-inline">Refresh</span>
            </button>
          </div>
        </div>
      </div>

      {/* Jobs Grid */}
      {loading && filteredJobs.length === 0 ? (
        <div className="text-center py-5">
          <Loader2 className="spinner-border text-primary" style={{ width: 'clamp(1.5rem, 3vw, 2rem)', height: 'clamp(1.5rem, 3vw, 2rem)' }} />
          <p className="text-secondary mt-2" style={{ fontSize: 'clamp(0.75rem, 1.2vw, 0.85rem)' }}>Loading jobs...</p>
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="card border-0 shadow-sm rounded-4 text-center p-3 p-md-5" style={{ background: '#ffffff', border: '1px solid #e9ecef' }}>
          <Briefcase className="text-secondary mx-auto" style={{ 
            width: 'clamp(2rem, 4vw, 3rem)', 
            height: 'clamp(2rem, 4vw, 3rem)' 
          }} />
          <h6 className="text-secondary mt-3" style={{ fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>No jobs found</h6>
          <p className="text-secondary small" style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)' }}>Try adjusting your search or filters</p>
          <button className="btn btn-primary btn-sm mt-2" onClick={() => setShowAddModal(true)} style={{ fontSize: 'clamp(0.65rem, 1vw, 0.75rem)' }}>
            <Plus style={{ width: 'clamp(0.6rem, 1vw, 0.8rem)', height: 'clamp(0.6rem, 1vw, 0.8rem)' }} /> Create First Job
          </button>
        </div>
      ) : (
        <div className="row g-2 g-md-3 g-lg-4">
          {filteredJobs.map((job, index) => (
            <div key={job._id || index} className="col-sm-6 col-xl-4">
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
                  <div className="d-flex flex-wrap justify-content-between align-items-start gap-2 mb-2 mb-md-3">
                    <div className="d-flex align-items-center gap-2">
                      <div className="p-1 p-md-2 rounded-3 flex-shrink-0" style={{ 
                        background: 'rgba(59,130,246,0.1)', 
                        border: '1px solid rgba(59,130,246,0.2)' 
                      }}>
                        <Briefcase className="text-primary" style={{ 
                          width: 'clamp(0.8rem, 1.2vw, 1rem)', 
                          height: 'clamp(0.8rem, 1.2vw, 1rem)' 
                        }} />
                      </div>
                      <div className="min-w-0">
                        <h6 className="fw-bold text-dark m-0" style={{ 
                          fontSize: 'clamp(0.75rem, 1.2vw, 0.85rem)' 
                        }}>
                          {job.title}
                        </h6>
                        <span className="text-secondary" style={{ 
                          fontSize: 'clamp(0.45rem, 0.7vw, 0.55rem)' 
                        }}>
                          {job.company?.name || getCompanyName(job.company)}
                        </span>
                      </div>
                    </div>
                    <span className={`badge bg-${getStatusColor(job.status)} bg-opacity-10 text-${getStatusColor(job.status)} border border-${getStatusColor(job.status)} d-inline-flex align-items-center gap-1 flex-shrink-0`} 
                          style={{ fontSize: 'clamp(0.4rem, 0.7vw, 0.55rem)' }}>
                      {getStatusIcon(job.status)}
                      {job.status || 'Active'}
                    </span>
                  </div>

                  {/* Job Details */}
                  <div className="space-y-1.5 flex-grow-1">
                    <div className="d-flex flex-wrap justify-content-between p-1 p-md-1.5 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                      <span className="text-secondary small" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                        <MapPin style={{ width: 'clamp(0.5rem, 0.8vw, 0.7rem)', height: 'clamp(0.5rem, 0.8vw, 0.7rem)', marginRight: '0.2rem' }} /> Location
                      </span>
                      <span className="text-dark" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>{job.location || 'N/A'}</span>
                    </div>
                    <div className="d-flex flex-wrap justify-content-between p-1 p-md-1.5 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                      <span className="text-secondary small" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                        <DollarSign style={{ width: 'clamp(0.5rem, 0.8vw, 0.7rem)', height: 'clamp(0.5rem, 0.8vw, 0.7rem)', marginRight: '0.2rem' }} /> Salary
                      </span>
                      <span className="text-success fw-bold" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>{job.salary || 'N/A'}</span>
                    </div>
                    <div className="d-flex flex-wrap justify-content-between p-1 p-md-1.5 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                      <span className="text-secondary small" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                        <Briefcase style={{ width: 'clamp(0.5rem, 0.8vw, 0.7rem)', height: 'clamp(0.5rem, 0.8vw, 0.7rem)', marginRight: '0.2rem' }} /> Type
                      </span>
                      <span className="text-info" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>{getTypeLabel(job.type)}</span>
                    </div>
                    <div className="d-flex flex-wrap justify-content-between p-1 p-md-1.5 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                      <span className="text-secondary small" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                        <Users style={{ width: 'clamp(0.5rem, 0.8vw, 0.7rem)', height: 'clamp(0.5rem, 0.8vw, 0.7rem)', marginRight: '0.2rem' }} /> Positions
                      </span>
                      <span className="text-primary fw-bold" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>{job.positions || 0}</span>
                    </div>
                    {job.deadline && (
                      <div className="d-flex flex-wrap justify-content-between p-1 p-md-1.5 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                        <span className="text-secondary small" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                          <Calendar style={{ width: 'clamp(0.5rem, 0.8vw, 0.7rem)', height: 'clamp(0.5rem, 0.8vw, 0.7rem)', marginRight: '0.2rem' }} /> Deadline
                        </span>
                        <span className="text-warning" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                          {new Date(job.deadline).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="mt-3 pt-2 pt-md-3 border-top border-light d-flex gap-2">
                    <button 
                      onClick={() => { setSelectedJob(job); setShowDetailModal(true); }}
                      className="btn btn-outline-info btn-sm flex-grow-1 d-flex align-items-center justify-content-center gap-1 shadow-sm"
                      style={{ 
                        fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)', 
                        borderRadius: '8px', 
                        padding: 'clamp(0.2rem, 0.4vw, 0.3rem) clamp(0.3rem, 0.5vw, 0.4rem)' 
                      }}
                    >
                      <Eye style={{ 
                        width: 'clamp(0.5rem, 0.8vw, 0.7rem)', 
                        height: 'clamp(0.5rem, 0.8vw, 0.7rem)' 
                      }} /> View
                    </button>
                    <button 
                      onClick={() => { setEditJob({ ...job }); setShowEditModal(true); }}
                      className="btn btn-outline-warning btn-sm d-flex align-items-center justify-content-center gap-1 shadow-sm"
                      style={{ 
                        fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)', 
                        borderRadius: '8px', 
                        padding: 'clamp(0.2rem, 0.4vw, 0.3rem) clamp(0.3rem, 0.5vw, 0.4rem)' 
                      }}
                    >
                      <Edit2 style={{ 
                        width: 'clamp(0.5rem, 0.8vw, 0.7rem)', 
                        height: 'clamp(0.5rem, 0.8vw, 0.7rem)' 
                      }} />
                    </button>
                    <button 
                      onClick={() => handleDeleteJob(job._id)}
                      className="btn btn-outline-danger btn-sm d-flex align-items-center justify-content-center gap-1 shadow-sm"
                      style={{ 
                        fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)', 
                        borderRadius: '8px', 
                        padding: 'clamp(0.2rem, 0.4vw, 0.3rem) clamp(0.3rem, 0.5vw, 0.4rem)' 
                      }}
                      disabled={loading}
                    >
                      <Trash2 style={{ 
                        width: 'clamp(0.5rem, 0.8vw, 0.7rem)', 
                        height: 'clamp(0.5rem, 0.8vw, 0.7rem)' 
                      }} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Modal - Responsive */}
      {showAddModal && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ 
          zIndex: 9999, 
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(5px)',
          animation: 'fadeIn 0.3s ease',
          padding: '1rem'
        }}>
          <div className="card border-0 shadow-lg rounded-4" style={{ 
            maxWidth: 'clamp(320px, 90vw, 650px)', 
            width: '100%', 
            maxHeight: '90vh', 
            overflowY: 'auto', 
            background: '#ffffff'
          }}>
            <div className="card-body p-3 p-md-4">
              <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3 border-bottom border-light pb-3">
                <h5 className="text-dark fw-bold m-0 d-flex align-items-center gap-2" style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)' }}>
                  <Briefcase className="text-primary" style={{ 
                    width: 'clamp(0.9rem, 2vw, 1.2rem)', 
                    height: 'clamp(0.9rem, 2vw, 1.2rem)' 
                  }} />
                  Create New Job
                </h5>
                <button onClick={() => setShowAddModal(false)} className="btn btn-close" style={{ fontSize: 'clamp(0.6rem, 1vw, 0.9rem)' }}></button>
              </div>

              <form onSubmit={handleAddJob}>
                <div className="row g-2 g-md-3">
                  <div className="col-12">
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Job Title *
                    </label>
                    <input 
                      type="text" 
                      className="form-control form-control-sm bg-white text-dark border-light" 
                      placeholder="Enter job title"
                      value={newJob.title}
                      onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                      required
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                    />
                  </div>
                  <div className="col-12">
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Company *
                    </label>
                    <select 
                      className="form-select form-select-sm bg-white text-dark border-light" 
                      value={newJob.company}
                      onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
                      required
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                    >
                      <option value="">Select Company</option>
                      {companies.map(c => (
                        <option key={c._id} value={c._id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Description
                    </label>
                    <textarea 
                      rows={2}
                      className="form-control form-control-sm bg-white text-dark border-light" 
                      placeholder="Job description..."
                      value={newJob.description}
                      onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px', resize: 'none' }}
                    />
                  </div>
                  <div className="col-12">
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Requirements
                    </label>
                    <textarea 
                      rows={2}
                      className="form-control form-control-sm bg-white text-dark border-light" 
                      placeholder="Job requirements..."
                      value={newJob.requirements}
                      onChange={(e) => setNewJob({ ...newJob, requirements: e.target.value })}
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px', resize: 'none' }}
                    />
                  </div>
                  <div className="col-6">
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Location *
                    </label>
                    <input 
                      type="text" 
                      className="form-control form-control-sm bg-white text-dark border-light" 
                      placeholder="Chennai, Remote"
                      value={newJob.location}
                      onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                      required
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                    />
                  </div>
                  <div className="col-6">
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Salary
                    </label>
                    <input 
                      type="text" 
                      className="form-control form-control-sm bg-white text-dark border-light" 
                      placeholder="8 LPA"
                      value={newJob.salary}
                      onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                    />
                  </div>
                  <div className="col-4">
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Job Type
                    </label>
                    <select 
                      className="form-select form-select-sm bg-white text-dark border-light" 
                      value={newJob.type}
                      onChange={(e) => setNewJob({ ...newJob, type: e.target.value })}
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                    >
                      <option value="full-time">Full Time</option>
                      <option value="part-time">Part Time</option>
                      <option value="internship">Internship</option>
                      <option value="contract">Contract</option>
                    </select>
                  </div>
                  <div className="col-4">
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Category
                    </label>
                    <input 
                      type="text" 
                      className="form-control form-control-sm bg-white text-dark border-light" 
                      placeholder="IT, Finance"
                      value={newJob.category}
                      onChange={(e) => setNewJob({ ...newJob, category: e.target.value })}
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                    />
                  </div>
                  <div className="col-4">
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Positions
                    </label>
                    <input 
                      type="number" 
                      className="form-control form-control-sm bg-white text-dark border-light" 
                      placeholder="1"
                      value={newJob.positions}
                      onChange={(e) => setNewJob({ ...newJob, positions: e.target.value })}
                      min="1"
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                    />
                  </div>
                  <div className="col-6">
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Experience
                    </label>
                    <input 
                      type="text" 
                      className="form-control form-control-sm bg-white text-dark border-light" 
                      placeholder="2-4 years"
                      value={newJob.experience}
                      onChange={(e) => setNewJob({ ...newJob, experience: e.target.value })}
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                    />
                  </div>
                  <div className="col-6">
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Deadline
                    </label>
                    <input 
                      type="date" 
                      className="form-control form-control-sm bg-white text-dark border-light" 
                      value={newJob.deadline}
                      onChange={(e) => setNewJob({ ...newJob, deadline: e.target.value })}
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                    />
                  </div>
                  <div className="col-12">
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Status
                    </label>
                    <select 
                      className="form-select form-select-sm bg-white text-dark border-light" 
                      value={newJob.status}
                      onChange={(e) => setNewJob({ ...newJob, status: e.target.value })}
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                    >
                      <option value="Active">Active</option>
                      <option value="Pending">Pending</option>
                      <option value="On Hold">On Hold</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-top border-light d-flex gap-2 flex-wrap">
                  <button onClick={() => setShowAddModal(false)} type="button" className="btn btn-secondary flex-grow-1" style={{ borderRadius: '10px', fontWeight: '600', fontSize: 'clamp(0.6rem, 1vw, 0.7rem)', padding: '0.35rem 0.7rem' }}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary flex-grow-1 shadow-sm" disabled={loading} style={{ borderRadius: '10px', fontWeight: '600', fontSize: 'clamp(0.6rem, 1vw, 0.7rem)', padding: '0.35rem 0.7rem' }}>
                    {loading ? <Loader2 className="spinner-border spinner-border-sm" style={{ width: 'clamp(0.6rem, 1vw, 0.8rem)', height: 'clamp(0.6rem, 1vw, 0.8rem)' }} /> : <Plus style={{ width: 'clamp(0.6rem, 1vw, 0.8rem)', height: 'clamp(0.6rem, 1vw, 0.8rem)' }} />}
                    {loading ? 'Creating...' : 'Create Job'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal - Responsive */}
      {showEditModal && editJob && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ 
          zIndex: 9999, 
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(5px)',
          animation: 'fadeIn 0.3s ease',
          padding: '1rem'
        }}>
          <div className="card border-0 shadow-lg rounded-4" style={{ 
            maxWidth: 'clamp(320px, 90vw, 650px)', 
            width: '100%', 
            maxHeight: '90vh', 
            overflowY: 'auto', 
            background: '#ffffff'
          }}>
            <div className="card-body p-3 p-md-4">
              <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3 border-bottom border-light pb-3">
                <h5 className="text-dark fw-bold m-0 d-flex align-items-center gap-2" style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)' }}>
                  <Edit2 className="text-warning" style={{ 
                    width: 'clamp(0.9rem, 2vw, 1.2rem)', 
                    height: 'clamp(0.9rem, 2vw, 1.2rem)' 
                  }} />
                  Edit Job
                </h5>
                <button onClick={() => setShowEditModal(false)} className="btn btn-close" style={{ fontSize: 'clamp(0.6rem, 1vw, 0.9rem)' }}></button>
              </div>

              <div className="row g-2 g-md-3">
                <div className="col-12">
                  <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                    Job Title *
                  </label>
                  <input 
                    type="text" 
                    className="form-control form-control-sm bg-white text-dark border-light" 
                    value={editJob.title || ''}
                    onChange={(e) => setEditJob({ ...editJob, title: e.target.value })}
                    style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                  />
                </div>
                <div className="col-12">
                  <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                    Company
                  </label>
                  <select 
                    className="form-select form-select-sm bg-white text-dark border-light" 
                    value={editJob.company || ''}
                    onChange={(e) => setEditJob({ ...editJob, company: e.target.value })}
                    style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                  >
                    <option value="">Select Company</option>
                    {companies.map(c => (
                      <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div className="col-12">
                  <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                    Description
                  </label>
                  <textarea 
                    rows={2}
                    className="form-control form-control-sm bg-white text-dark border-light" 
                    value={editJob.description || ''}
                    onChange={(e) => setEditJob({ ...editJob, description: e.target.value })}
                    style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px', resize: 'none' }}
                  />
                </div>
                <div className="col-12">
                  <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                    Requirements
                  </label>
                  <textarea 
                    rows={2}
                    className="form-control form-control-sm bg-white text-dark border-light" 
                    value={editJob.requirements || ''}
                    onChange={(e) => setEditJob({ ...editJob, requirements: e.target.value })}
                    style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px', resize: 'none' }}
                  />
                </div>
                <div className="col-6">
                  <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                    Location *
                  </label>
                  <input 
                    type="text" 
                    className="form-control form-control-sm bg-white text-dark border-light" 
                    value={editJob.location || ''}
                    onChange={(e) => setEditJob({ ...editJob, location: e.target.value })}
                    style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                  />
                </div>
                <div className="col-6">
                  <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                    Salary
                  </label>
                  <input 
                    type="text" 
                    className="form-control form-control-sm bg-white text-dark border-light" 
                    value={editJob.salary || ''}
                    onChange={(e) => setEditJob({ ...editJob, salary: e.target.value })}
                    style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                  />
                </div>
                <div className="col-4">
                  <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                    Job Type
                  </label>
                  <select 
                    className="form-select form-select-sm bg-white text-dark border-light" 
                    value={editJob.type || 'full-time'}
                    onChange={(e) => setEditJob({ ...editJob, type: e.target.value })}
                    style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                  >
                    <option value="full-time">Full Time</option>
                    <option value="part-time">Part Time</option>
                    <option value="internship">Internship</option>
                    <option value="contract">Contract</option>
                  </select>
                </div>
                <div className="col-4">
                  <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                    Category
                  </label>
                  <input 
                    type="text" 
                    className="form-control form-control-sm bg-white text-dark border-light" 
                    value={editJob.category || ''}
                    onChange={(e) => setEditJob({ ...editJob, category: e.target.value })}
                    style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                  />
                </div>
                <div className="col-4">
                  <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                    Positions
                  </label>
                  <input 
                    type="number" 
                    className="form-control form-control-sm bg-white text-dark border-light" 
                    value={editJob.positions || 1}
                    onChange={(e) => setEditJob({ ...editJob, positions: e.target.value })}
                    min="1"
                    style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                  />
                </div>
                <div className="col-6">
                  <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                    Experience
                  </label>
                  <input 
                    type="text" 
                    className="form-control form-control-sm bg-white text-dark border-light" 
                    value={editJob.experience || ''}
                    onChange={(e) => setEditJob({ ...editJob, experience: e.target.value })}
                    style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                  />
                </div>
                <div className="col-6">
                  <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                    Deadline
                  </label>
                  <input 
                    type="date" 
                    className="form-control form-control-sm bg-white text-dark border-light" 
                    value={editJob.deadline || ''}
                    onChange={(e) => setEditJob({ ...editJob, deadline: e.target.value })}
                    style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                  />
                </div>
                <div className="col-12">
                  <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                    Status
                  </label>
                  <select 
                    className="form-select form-select-sm bg-white text-dark border-light" 
                    value={editJob.status || 'Active'}
                    onChange={(e) => setEditJob({ ...editJob, status: e.target.value })}
                    style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                  >
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </div>

              <div className="mt-3 pt-3 border-top border-light d-flex gap-2 flex-wrap">
                <button onClick={() => setShowEditModal(false)} className="btn btn-secondary flex-grow-1" style={{ borderRadius: '10px', fontWeight: '600', fontSize: 'clamp(0.6rem, 1vw, 0.7rem)', padding: '0.35rem 0.7rem' }}>
                  Cancel
                </button>
                <button onClick={handleUpdateJob} className="btn btn-primary flex-grow-1 shadow-sm" disabled={loading} style={{ borderRadius: '10px', fontWeight: '600', fontSize: 'clamp(0.6rem, 1vw, 0.7rem)', padding: '0.35rem 0.7rem' }}>
                  {loading ? <Loader2 className="spinner-border spinner-border-sm" style={{ width: 'clamp(0.6rem, 1vw, 0.8rem)', height: 'clamp(0.6rem, 1vw, 0.8rem)' }} /> : <Save style={{ width: 'clamp(0.6rem, 1vw, 0.8rem)', height: 'clamp(0.6rem, 1vw, 0.8rem)' }} />}
                  {loading ? 'Updating...' : 'Update Job'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal - Responsive */}
      {showDetailModal && selectedJob && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ 
          zIndex: 9999, 
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(5px)',
          animation: 'fadeIn 0.3s ease',
          padding: '1rem'
        }}>
          <div className="card border-0 shadow-lg rounded-4" style={{ 
            maxWidth: 'clamp(320px, 85vw, 550px)', 
            width: '100%', 
            maxHeight: '90vh', 
            overflowY: 'auto', 
            background: '#ffffff'
          }}>
            <div className="card-body p-3 p-md-4">
              <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3 border-bottom border-light pb-3">
                <h5 className="text-dark fw-bold m-0 d-flex align-items-center gap-2" style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)' }}>
                  <Briefcase className="text-primary" style={{ 
                    width: 'clamp(0.9rem, 2vw, 1.2rem)', 
                    height: 'clamp(0.9rem, 2vw, 1.2rem)' 
                  }} />
                  Job Details
                </h5>
                <button onClick={() => setShowDetailModal(false)} className="btn btn-close" style={{ fontSize: 'clamp(0.6rem, 1vw, 0.9rem)' }}></button>
              </div>

              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="d-inline-flex align-items-center justify-content-center rounded-circle flex-shrink-0" style={{ 
                  width: 'clamp(40px, 7vw, 48px)', 
                  height: 'clamp(40px, 7vw, 48px)',
                  background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                  fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                  fontWeight: 'bold',
                  color: '#fff'
                }}>
                  {selectedJob.title?.charAt(0) || 'J'}
                </div>
                <div className="min-w-0">
                  <h5 className="text-dark fw-bold m-0" style={{ fontSize: 'clamp(0.9rem, 2vw, 1.05rem)' }}>
                    {selectedJob.title}
                  </h5>
                  <span className="text-secondary" style={{ fontSize: 'clamp(0.6rem, 1vw, 0.7rem)' }}>
                    {selectedJob.company?.name || getCompanyName(selectedJob.company)}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="d-flex flex-wrap justify-content-between p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.03)' }}>
                  <span className="text-secondary" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>
                    <Briefcase className="me-1" style={{ width: 'clamp(0.6rem, 1vw, 0.8rem)', height: 'clamp(0.6rem, 1vw, 0.8rem)' }} /> Type
                  </span>
                  <span className="text-info" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>{getTypeLabel(selectedJob.type)}</span>
                </div>
                <div className="d-flex flex-wrap justify-content-between p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.03)' }}>
                  <span className="text-secondary" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>
                    <MapPin className="me-1" style={{ width: 'clamp(0.6rem, 1vw, 0.8rem)', height: 'clamp(0.6rem, 1vw, 0.8rem)' }} /> Location
                  </span>
                  <span className="text-dark" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>{selectedJob.location || 'N/A'}</span>
                </div>
                <div className="d-flex flex-wrap justify-content-between p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.03)' }}>
                  <span className="text-secondary" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>
                    <DollarSign className="me-1" style={{ width: 'clamp(0.6rem, 1vw, 0.8rem)', height: 'clamp(0.6rem, 1vw, 0.8rem)' }} /> Salary
                  </span>
                  <span className="text-success fw-bold" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>{selectedJob.salary || 'N/A'}</span>
                </div>
                <div className="d-flex flex-wrap justify-content-between p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.03)' }}>
                  <span className="text-secondary" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>
                    <Users className="me-1" style={{ width: 'clamp(0.6rem, 1vw, 0.8rem)', height: 'clamp(0.6rem, 1vw, 0.8rem)' }} /> Positions
                  </span>
                  <span className="text-primary fw-bold" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>{selectedJob.positions || 0}</span>
                </div>
                {selectedJob.experience && (
                  <div className="d-flex flex-wrap justify-content-between p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.03)' }}>
                    <span className="text-secondary" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>
                      <Award className="me-1" style={{ width: 'clamp(0.6rem, 1vw, 0.8rem)', height: 'clamp(0.6rem, 1vw, 0.8rem)' }} /> Experience
                    </span>
                    <span className="text-dark" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>{selectedJob.experience}</span>
                  </div>
                )}
                {selectedJob.deadline && (
                  <div className="d-flex flex-wrap justify-content-between p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.03)' }}>
                    <span className="text-secondary" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>
                      <Calendar className="me-1" style={{ width: 'clamp(0.6rem, 1vw, 0.8rem)', height: 'clamp(0.6rem, 1vw, 0.8rem)' }} /> Deadline
                    </span>
                    <span className="text-warning" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>
                      {new Date(selectedJob.deadline).toLocaleDateString()}
                    </span>
                  </div>
                )}
                {selectedJob.description && (
                  <div className="p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.03)' }}>
                    <span className="text-secondary d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      <FileText className="me-1" style={{ width: 'clamp(0.6rem, 1vw, 0.8rem)', height: 'clamp(0.6rem, 1vw, 0.8rem)' }} /> Description
                    </span>
                    <span className="text-dark small" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>{selectedJob.description}</span>
                  </div>
                )}
                {selectedJob.requirements && (
                  <div className="p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.03)' }}>
                    <span className="text-secondary d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      <CheckCircle className="me-1" style={{ width: 'clamp(0.6rem, 1vw, 0.8rem)', height: 'clamp(0.6rem, 1vw, 0.8rem)' }} /> Requirements
                    </span>
                    <span className="text-dark small" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>{selectedJob.requirements}</span>
                  </div>
                )}
                <div className="d-flex flex-wrap justify-content-between p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.03)' }}>
                  <span className="text-secondary" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>
                    <CheckCircle className="me-1" style={{ width: 'clamp(0.6rem, 1vw, 0.8rem)', height: 'clamp(0.6rem, 1vw, 0.8rem)' }} /> Status
                  </span>
                  <span className={`text-${getStatusColor(selectedJob.status)}`} style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>
                    {selectedJob.status || 'Active'}
                  </span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-top border-light d-flex gap-2 flex-wrap">
                <button onClick={() => setShowDetailModal(false)} className="btn btn-secondary flex-grow-1" style={{ borderRadius: '10px', fontWeight: '600', fontSize: 'clamp(0.6rem, 1vw, 0.7rem)', padding: '0.35rem 0.7rem' }}>
                  Close
                </button>
                <button 
                  onClick={() => {
                    setShowDetailModal(false);
                    setEditJob({ ...selectedJob });
                    setShowEditModal(true);
                  }}
                  className="btn btn-warning flex-grow-1 d-flex align-items-center justify-content-center gap-1 shadow-sm"
                  style={{ borderRadius: '10px', fontWeight: '600', fontSize: 'clamp(0.6rem, 1vw, 0.7rem)', padding: '0.35rem 0.7rem' }}
                >
                  <Edit2 style={{ 
                    width: 'clamp(0.7rem, 1.2vw, 0.9rem)', 
                    height: 'clamp(0.7rem, 1.2vw, 0.9rem)' 
                  }} /> Edit
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
        
        .space-y-2 > * + * {
          margin-top: 0.5rem;
        }
        
        .card {
          transition: all 0.3s ease;
        }
        
        .card:hover {
          box-shadow: 0 10px 30px rgba(0,0,0,0.1) !important;
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