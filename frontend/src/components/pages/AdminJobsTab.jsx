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
      case 'Active': return <CheckCircle className="text-success" style={{ width: '0.7rem', height: '0.7rem' }} />;
      case 'Closed': return <XCircle className="text-danger" style={{ width: '0.7rem', height: '0.7rem' }} />;
      case 'Pending': return <Clock className="text-warning" style={{ width: '0.7rem', height: '0.7rem' }} />;
      case 'On Hold': return <AlertCircle className="text-info" style={{ width: '0.7rem', height: '0.7rem' }} />;
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
     
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h5 className="text-dark fw-bold m-0">Jobs</h5>
          <p className="text-secondary small m-0">Manage all job listings</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="btn btn-primary btn-sm d-flex align-items-center gap-1 shadow-sm transition-all hover:scale-105"
          style={{ borderRadius: '10px', fontWeight: '600' }}
        >
          <Plus style={{ width: '0.8rem', height: '0.8rem' }} /> Create Job
        </button>
      </div>

     
      <div className="row g-3 mb-4">
        {[
          { label: "Total Jobs", value: totalJobs, color: "primary", icon: Briefcase },
          { label: "Active Jobs", value: activeJobs, color: "success", icon: CheckCircle },
          { label: "Closed Jobs", value: closedJobs, color: "danger", icon: XCircle },
          { label: "Total Positions", value: totalPositions, color: "info", icon: Users },
        ].map((stat, i) => {
          const Icon = stat.icon;
          const bgColors = {
            primary: 'rgba(59,130,246,0.1)',
            success: 'rgba(34,197,94,0.1)',
            danger: 'rgba(239,68,68,0.1)',
            info: 'rgba(6,182,212,0.1)'
          };
          return (
            <div key={i} className="col-6 col-lg-3">
              <div className="card border-0 shadow-sm rounded-4 h-100 transition-all hover:translate-y-1" style={{ background: '#ffffff' }}>
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

     
      <div className="card border-0 shadow-sm rounded-4 mb-4" style={{ background: '#ffffff' }}>
        <div className="card-body p-3">
          <div className="d-flex flex-wrap gap-3 align-items-center">
            <div className="d-flex align-items-center gap-2 bg-white px-3 py-2 rounded-3 border border-light flex-grow-1" style={{ maxWidth: '300px' }}>
              <Search className="text-secondary" style={{ width: '0.8rem', height: '0.8rem' }} />
              <input 
                type="text" 
                className="form-control form-control-sm bg-transparent border-0 text-dark" 
                placeholder="Search jobs..." 
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
                <option value="Active">Active</option>
                <option value="Closed">Closed</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
            <div className="d-flex align-items-center gap-2 bg-white px-3 py-2 rounded-3 border border-light">
              <Briefcase className="text-secondary" style={{ width: '0.7rem', height: '0.7rem' }} />
              <select 
                className="form-select form-select-sm bg-transparent border-0 text-dark" 
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                style={{ fontSize: '0.75rem', width: '140px', outline: 'none' }}
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
              className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1 shadow-sm transition-all hover:scale-105"
            >
              <RefreshCw style={{ width: '0.8rem', height: '0.8rem' }} /> Refresh
            </button>
          </div>
        </div>
      </div>

     
      {loading && filteredJobs.length === 0 ? (
        <div className="text-center py-5">
          <Loader2 className="spinner-border text-primary" style={{ width: '2rem', height: '2rem' }} />
          <p className="text-secondary mt-2">Loading jobs...</p>
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="card border-0 shadow-sm rounded-4 text-center p-5" style={{ background: '#ffffff' }}>
          <Briefcase className="text-secondary mx-auto" style={{ width: '3rem', height: '3rem' }} />
          <h6 className="text-secondary mt-3">No jobs found</h6>
          <p className="text-secondary small">Try adjusting your search or filters</p>
          <button className="btn btn-primary btn-sm mt-2" onClick={() => setShowAddModal(true)}>
            <Plus style={{ width: '0.8rem', height: '0.8rem' }} /> Create First Job
          </button>
        </div>
      ) : (
        <div className="row g-4">
          {filteredJobs.map((job, index) => (
            <div key={job._id || index} className="col-md-6 col-lg-4">
              <div 
                className="card border-0 shadow-sm rounded-4 h-100 transition-all hover:translate-y-2"
                style={{ 
                  background: '#ffffff',
                  animation: `slideUp ${0.3 + index * 0.05}s ease-out forwards`
                }}
              >
                <div className="card-body p-4 d-flex flex-column">
                 
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div className="d-flex align-items-center gap-2">
                      <div className="p-2 rounded-3" style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)' }}>
                        <Briefcase className="text-primary" style={{ width: '1rem', height: '1rem' }} />
                      </div>
                      <div>
                        <h6 className="fw-bold text-dark m-0" style={{ fontSize: '0.85rem' }}>{job.title}</h6>
                        <span className="text-secondary" style={{ fontSize: '0.55rem' }}>{job.company?.name || getCompanyName(job.company)}</span>
                      </div>
                    </div>
                    <span className={`badge bg-${getStatusColor(job.status)} bg-opacity-10 text-${getStatusColor(job.status)} border border-${getStatusColor(job.status)} d-inline-flex align-items-center gap-1`} style={{ fontSize: '0.55rem' }}>
                      {getStatusIcon(job.status)}
                      {job.status || 'Active'}
                    </span>
                  </div>

                 
                  <div className="space-y-2 flex-grow-1">
                    <div className="d-flex justify-content-between p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.03)' }}>
                      <span className="text-secondary small"><MapPin style={{ width: '0.7rem', height: '0.7rem', marginRight: '0.3rem' }} /> Location</span>
                      <span className="text-dark">{job.location || 'N/A'}</span>
                    </div>
                    <div className="d-flex justify-content-between p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.03)' }}>
                      <span className="text-secondary small"><DollarSign style={{ width: '0.7rem', height: '0.7rem', marginRight: '0.3rem' }} /> Salary</span>
                      <span className="text-success fw-bold">{job.salary || 'N/A'}</span>
                    </div>
                    <div className="d-flex justify-content-between p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.03)' }}>
                      <span className="text-secondary small"><Briefcase style={{ width: '0.7rem', height: '0.7rem', marginRight: '0.3rem' }} /> Type</span>
                      <span className="text-info">{getTypeLabel(job.type)}</span>
                    </div>
                    <div className="d-flex justify-content-between p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.03)' }}>
                      <span className="text-secondary small"><Users style={{ width: '0.7rem', height: '0.7rem', marginRight: '0.3rem' }} /> Positions</span>
                      <span className="text-primary fw-bold">{job.positions || 0}</span>
                    </div>
                    {job.deadline && (
                      <div className="d-flex justify-content-between p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.03)' }}>
                        <span className="text-secondary small"><Calendar style={{ width: '0.7rem', height: '0.7rem', marginRight: '0.3rem' }} /> Deadline</span>
                        <span className="text-warning">{new Date(job.deadline).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-3 pt-3 border-top border-light d-flex gap-2">
                    <button 
                      onClick={() => { setSelectedJob(job); setShowDetailModal(true); }}
                      className="btn btn-outline-info btn-sm flex-grow-1 d-flex align-items-center justify-content-center gap-1 shadow-sm transition-all hover:scale-105"
                      style={{ fontSize: '0.65rem', borderRadius: '8px' }}
                    >
                      <Eye style={{ width: '0.7rem', height: '0.7rem' }} /> View
                    </button>
                    <button 
                      onClick={() => { setEditJob({ ...job }); setShowEditModal(true); }}
                      className="btn btn-outline-warning btn-sm d-flex align-items-center justify-content-center gap-1 shadow-sm transition-all hover:scale-105"
                      style={{ fontSize: '0.65rem', borderRadius: '8px' }}
                    >
                      <Edit2 style={{ width: '0.7rem', height: '0.7rem' }} />
                    </button>
                    <button 
                      onClick={() => handleDeleteJob(job._id)}
                      className="btn btn-outline-danger btn-sm d-flex align-items-center justify-content-center gap-1 shadow-sm transition-all hover:scale-105"
                      style={{ fontSize: '0.65rem', borderRadius: '8px' }}
                      disabled={loading}
                    >
                      <Trash2 style={{ width: '0.7rem', height: '0.7rem' }} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

     
      {showAddModal && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ 
          zIndex: 9999, 
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(5px)',
          animation: 'fadeIn 0.3s ease'
        }}>
          <div className="card border-0 shadow-lg rounded-4" style={{ 
            maxWidth: '650px', 
            width: '95%', 
            maxHeight: '90vh', 
            overflowY: 'auto', 
            background: '#ffffff'
          }}>
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-3 border-bottom border-light pb-3">
                <h5 className="text-dark fw-bold m-0 d-flex align-items-center gap-2">
                  <Briefcase className="text-primary" style={{ width: '1.2rem', height: '1.2rem' }} />
                  Create New Job
                </h5>
                <button 
                  onClick={() => setShowAddModal(false)} 
                  className="btn btn-close"
                ></button>
              </div>

              <form onSubmit={handleAddJob}>
                <div className="row g-3">
                  <div className="col-12">
                    <label className="text-secondary small fw-bold d-block mb-1">Job Title *</label>
                    <input 
                      type="text" 
                      className="form-control form-control-sm bg-white text-dark border-light" 
                      placeholder="Enter job title"
                      value={newJob.title}
                      onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                      required
                      style={{ fontSize: '0.8rem' }}
                    />
                  </div>
                  <div className="col-12">
                    <label className="text-secondary small fw-bold d-block mb-1">Company *</label>
                    <select 
                      className="form-select form-select-sm bg-white text-dark border-light" 
                      value={newJob.company}
                      onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
                      required
                      style={{ fontSize: '0.8rem' }}
                    >
                      <option value="">Select Company</option>
                      {companies.map(c => (
                        <option key={c._id} value={c._id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="text-secondary small fw-bold d-block mb-1">Description</label>
                    <textarea 
                      rows={3}
                      className="form-control form-control-sm bg-white text-dark border-light" 
                      placeholder="Job description..."
                      value={newJob.description}
                      onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                      style={{ fontSize: '0.8rem', resize: 'none' }}
                    />
                  </div>
                  <div className="col-12">
                    <label className="text-secondary small fw-bold d-block mb-1">Requirements</label>
                    <textarea 
                      rows={2}
                      className="form-control form-control-sm bg-white text-dark border-light" 
                      placeholder="Job requirements..."
                      value={newJob.requirements}
                      onChange={(e) => setNewJob({ ...newJob, requirements: e.target.value })}
                      style={{ fontSize: '0.8rem', resize: 'none' }}
                    />
                  </div>
                  <div className="col-6">
                    <label className="text-secondary small fw-bold d-block mb-1">Location *</label>
                    <input 
                      type="text" 
                      className="form-control form-control-sm bg-white text-dark border-light" 
                      placeholder="Chennai, Remote"
                      value={newJob.location}
                      onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                      required
                      style={{ fontSize: '0.8rem' }}
                    />
                  </div>
                  <div className="col-6">
                    <label className="text-secondary small fw-bold d-block mb-1">Salary</label>
                    <input 
                      type="text" 
                      className="form-control form-control-sm bg-white text-dark border-light" 
                      placeholder="8 LPA"
                      value={newJob.salary}
                      onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
                      style={{ fontSize: '0.8rem' }}
                    />
                  </div>
                  <div className="col-4">
                    <label className="text-secondary small fw-bold d-block mb-1">Job Type</label>
                    <select 
                      className="form-select form-select-sm bg-white text-dark border-light" 
                      value={newJob.type}
                      onChange={(e) => setNewJob({ ...newJob, type: e.target.value })}
                      style={{ fontSize: '0.8rem' }}
                    >
                      <option value="full-time">Full Time</option>
                      <option value="part-time">Part Time</option>
                      <option value="internship">Internship</option>
                      <option value="contract">Contract</option>
                    </select>
                  </div>
                  <div className="col-4">
                    <label className="text-secondary small fw-bold d-block mb-1">Category</label>
                    <input 
                      type="text" 
                      className="form-control form-control-sm bg-white text-dark border-light" 
                      placeholder="IT, Finance"
                      value={newJob.category}
                      onChange={(e) => setNewJob({ ...newJob, category: e.target.value })}
                      style={{ fontSize: '0.8rem' }}
                    />
                  </div>
                  <div className="col-4">
                    <label className="text-secondary small fw-bold d-block mb-1">Positions</label>
                    <input 
                      type="number" 
                      className="form-control form-control-sm bg-white text-dark border-light" 
                      placeholder="1"
                      value={newJob.positions}
                      onChange={(e) => setNewJob({ ...newJob, positions: e.target.value })}
                      min="1"
                      style={{ fontSize: '0.8rem' }}
                    />
                  </div>
                  <div className="col-6">
                    <label className="text-secondary small fw-bold d-block mb-1">Experience</label>
                    <input 
                      type="text" 
                      className="form-control form-control-sm bg-white text-dark border-light" 
                      placeholder="2-4 years"
                      value={newJob.experience}
                      onChange={(e) => setNewJob({ ...newJob, experience: e.target.value })}
                      style={{ fontSize: '0.8rem' }}
                    />
                  </div>
                  <div className="col-6">
                    <label className="text-secondary small fw-bold d-block mb-1">Deadline</label>
                    <input 
                      type="date" 
                      className="form-control form-control-sm bg-white text-dark border-light" 
                      value={newJob.deadline}
                      onChange={(e) => setNewJob({ ...newJob, deadline: e.target.value })}
                      style={{ fontSize: '0.8rem' }}
                    />
                  </div>
                  <div className="col-12">
                    <label className="text-secondary small fw-bold d-block mb-1">Status</label>
                    <select 
                      className="form-select form-select-sm bg-white text-dark border-light" 
                      value={newJob.status}
                      onChange={(e) => setNewJob({ ...newJob, status: e.target.value })}
                      style={{ fontSize: '0.8rem' }}
                    >
                      <option value="Active">Active</option>
                      <option value="Pending">Pending</option>
                      <option value="On Hold">On Hold</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-top border-light d-flex gap-2">
                  <button 
                    onClick={() => setShowAddModal(false)} 
                    type="button" 
                    className="btn btn-secondary flex-grow-1"
                    style={{ borderRadius: '10px', fontWeight: '600' }}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary flex-grow-1 shadow-sm transition-all hover:scale-105" 
                    disabled={loading}
                    style={{ borderRadius: '10px', fontWeight: '600' }}
                  >
                    {loading ? <Loader2 className="spinner-border spinner-border-sm" style={{ width: '0.8rem', height: '0.8rem' }} /> : <Plus style={{ width: '0.8rem', height: '0.8rem' }} />}
                    {loading ? 'Creating...' : 'Create Job'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      
      {showEditModal && editJob && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ 
          zIndex: 9999, 
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(5px)',
          animation: 'fadeIn 0.3s ease'
        }}>
          <div className="card border-0 shadow-lg rounded-4" style={{ 
            maxWidth: '650px', 
            width: '95%', 
            maxHeight: '90vh', 
            overflowY: 'auto', 
            background: '#ffffff'
          }}>
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-3 border-bottom border-light pb-3">
                <h5 className="text-dark fw-bold m-0 d-flex align-items-center gap-2">
                  <Edit2 className="text-warning" style={{ width: '1.2rem', height: '1.2rem' }} />
                  Edit Job
                </h5>
                <button onClick={() => setShowEditModal(false)} className="btn btn-close"></button>
              </div>

              <div className="row g-3">
                <div className="col-12">
                  <label className="text-secondary small fw-bold d-block mb-1">Job Title *</label>
                  <input 
                    type="text" 
                    className="form-control form-control-sm bg-white text-dark border-light" 
                    value={editJob.title || ''}
                    onChange={(e) => setEditJob({ ...editJob, title: e.target.value })}
                    style={{ fontSize: '0.8rem' }}
                  />
                </div>
                <div className="col-12">
                  <label className="text-secondary small fw-bold d-block mb-1">Company</label>
                  <select 
                    className="form-select form-select-sm bg-white text-dark border-light" 
                    value={editJob.company || ''}
                    onChange={(e) => setEditJob({ ...editJob, company: e.target.value })}
                    style={{ fontSize: '0.8rem' }}
                  >
                    <option value="">Select Company</option>
                    {companies.map(c => (
                      <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div className="col-12">
                  <label className="text-secondary small fw-bold d-block mb-1">Description</label>
                  <textarea 
                    rows={3}
                    className="form-control form-control-sm bg-white text-dark border-light" 
                    value={editJob.description || ''}
                    onChange={(e) => setEditJob({ ...editJob, description: e.target.value })}
                    style={{ fontSize: '0.8rem', resize: 'none' }}
                  />
                </div>
                <div className="col-12">
                  <label className="text-secondary small fw-bold d-block mb-1">Requirements</label>
                  <textarea 
                    rows={2}
                    className="form-control form-control-sm bg-white text-dark border-light" 
                    value={editJob.requirements || ''}
                    onChange={(e) => setEditJob({ ...editJob, requirements: e.target.value })}
                    style={{ fontSize: '0.8rem', resize: 'none' }}
                  />
                </div>
                <div className="col-6">
                  <label className="text-secondary small fw-bold d-block mb-1">Location *</label>
                  <input 
                    type="text" 
                    className="form-control form-control-sm bg-white text-dark border-light" 
                    value={editJob.location || ''}
                    onChange={(e) => setEditJob({ ...editJob, location: e.target.value })}
                    style={{ fontSize: '0.8rem' }}
                  />
                </div>
                <div className="col-6">
                  <label className="text-secondary small fw-bold d-block mb-1">Salary</label>
                  <input 
                    type="text" 
                    className="form-control form-control-sm bg-white text-dark border-light" 
                    value={editJob.salary || ''}
                    onChange={(e) => setEditJob({ ...editJob, salary: e.target.value })}
                    style={{ fontSize: '0.8rem' }}
                  />
                </div>
                <div className="col-4">
                  <label className="text-secondary small fw-bold d-block mb-1">Job Type</label>
                  <select 
                    className="form-select form-select-sm bg-white text-dark border-light" 
                    value={editJob.type || 'full-time'}
                    onChange={(e) => setEditJob({ ...editJob, type: e.target.value })}
                    style={{ fontSize: '0.8rem' }}
                  >
                    <option value="full-time">Full Time</option>
                    <option value="part-time">Part Time</option>
                    <option value="internship">Internship</option>
                    <option value="contract">Contract</option>
                  </select>
                </div>
                <div className="col-4">
                  <label className="text-secondary small fw-bold d-block mb-1">Category</label>
                  <input 
                    type="text" 
                    className="form-control form-control-sm bg-white text-dark border-light" 
                    value={editJob.category || ''}
                    onChange={(e) => setEditJob({ ...editJob, category: e.target.value })}
                    style={{ fontSize: '0.8rem' }}
                  />
                </div>
                <div className="col-4">
                  <label className="text-secondary small fw-bold d-block mb-1">Positions</label>
                  <input 
                    type="number" 
                    className="form-control form-control-sm bg-white text-dark border-light" 
                    value={editJob.positions || 1}
                    onChange={(e) => setEditJob({ ...editJob, positions: e.target.value })}
                    min="1"
                    style={{ fontSize: '0.8rem' }}
                  />
                </div>
                <div className="col-6">
                  <label className="text-secondary small fw-bold d-block mb-1">Experience</label>
                  <input 
                    type="text" 
                    className="form-control form-control-sm bg-white text-dark border-light" 
                    value={editJob.experience || ''}
                    onChange={(e) => setEditJob({ ...editJob, experience: e.target.value })}
                    style={{ fontSize: '0.8rem' }}
                  />
                </div>
                <div className="col-6">
                  <label className="text-secondary small fw-bold d-block mb-1">Deadline</label>
                  <input 
                    type="date" 
                    className="form-control form-control-sm bg-white text-dark border-light" 
                    value={editJob.deadline || ''}
                    onChange={(e) => setEditJob({ ...editJob, deadline: e.target.value })}
                    style={{ fontSize: '0.8rem' }}
                  />
                </div>
                <div className="col-12">
                  <label className="text-secondary small fw-bold d-block mb-1">Status</label>
                  <select 
                    className="form-select form-select-sm bg-white text-dark border-light" 
                    value={editJob.status || 'Active'}
                    onChange={(e) => setEditJob({ ...editJob, status: e.target.value })}
                    style={{ fontSize: '0.8rem' }}
                  >
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </div>

              <div className="mt-3 pt-3 border-top border-light d-flex gap-2">
                <button onClick={() => setShowEditModal(false)} className="btn btn-secondary flex-grow-1" style={{ borderRadius: '10px', fontWeight: '600' }}>Cancel</button>
                <button onClick={handleUpdateJob} className="btn btn-primary flex-grow-1 shadow-sm transition-all hover:scale-105" disabled={loading} style={{ borderRadius: '10px', fontWeight: '600' }}>
                  {loading ? <Loader2 className="spinner-border spinner-border-sm" style={{ width: '0.8rem', height: '0.8rem' }} /> : <Save style={{ width: '0.8rem', height: '0.8rem' }} />}
                  {loading ? 'Updating...' : 'Update Job'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      
      {showDetailModal && selectedJob && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ 
          zIndex: 9999, 
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(5px)',
          animation: 'fadeIn 0.3s ease'
        }}>
          <div className="card border-0 shadow-lg rounded-4" style={{ maxWidth: '550px', width: '95%', maxHeight: '90vh', overflowY: 'auto', background: '#ffffff' }}>
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-3 border-bottom border-light pb-3">
                <h5 className="text-dark fw-bold m-0 d-flex align-items-center gap-2">
                  <Briefcase className="text-primary" style={{ width: '1.2rem', height: '1.2rem' }} />
                  Job Details
                </h5>
                <button onClick={() => setShowDetailModal(false)} className="btn btn-close"></button>
              </div>

              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="d-inline-flex align-items-center justify-content-center rounded-circle" style={{ 
                  width: '48px', height: '48px',
                  background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  color: '#fff'
                }}>
                  {selectedJob.title?.charAt(0) || 'J'}
                </div>
                <div>
                  <h5 className="text-dark fw-bold m-0">{selectedJob.title}</h5>
                  <span className="text-secondary">{selectedJob.company?.name || getCompanyName(selectedJob.company)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="d-flex justify-content-between p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.03)' }}>
                  <span className="text-secondary"><Briefcase className="me-1" style={{ width: '0.8rem', height: '0.8rem' }} /> Type</span>
                  <span className="text-info">{getTypeLabel(selectedJob.type)}</span>
                </div>
                <div className="d-flex justify-content-between p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.03)' }}>
                  <span className="text-secondary"><MapPin className="me-1" style={{ width: '0.8rem', height: '0.8rem' }} /> Location</span>
                  <span className="text-dark">{selectedJob.location || 'N/A'}</span>
                </div>
                <div className="d-flex justify-content-between p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.03)' }}>
                  <span className="text-secondary"><DollarSign className="me-1" style={{ width: '0.8rem', height: '0.8rem' }} /> Salary</span>
                  <span className="text-success fw-bold">{selectedJob.salary || 'N/A'}</span>
                </div>
                <div className="d-flex justify-content-between p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.03)' }}>
                  <span className="text-secondary"><Users className="me-1" style={{ width: '0.8rem', height: '0.8rem' }} /> Positions</span>
                  <span className="text-primary fw-bold">{selectedJob.positions || 0}</span>
                </div>
                {selectedJob.experience && (
                  <div className="d-flex justify-content-between p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.03)' }}>
                    <span className="text-secondary"><Award className="me-1" style={{ width: '0.8rem', height: '0.8rem' }} /> Experience</span>
                    <span className="text-dark">{selectedJob.experience}</span>
                  </div>
                )}
                {selectedJob.deadline && (
                  <div className="d-flex justify-content-between p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.03)' }}>
                    <span className="text-secondary"><Calendar className="me-1" style={{ width: '0.8rem', height: '0.8rem' }} /> Deadline</span>
                    <span className="text-warning">{new Date(selectedJob.deadline).toLocaleDateString()}</span>
                  </div>
                )}
                {selectedJob.description && (
                  <div className="p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.03)' }}>
                    <span className="text-secondary d-block mb-1"><FileText className="me-1" style={{ width: '0.8rem', height: '0.8rem' }} /> Description</span>
                    <span className="text-dark small">{selectedJob.description}</span>
                  </div>
                )}
                {selectedJob.requirements && (
                  <div className="p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.03)' }}>
                    <span className="text-secondary d-block mb-1"><CheckCircle className="me-1" style={{ width: '0.8rem', height: '0.8rem' }} /> Requirements</span>
                    <span className="text-dark small">{selectedJob.requirements}</span>
                  </div>
                )}
                <div className="d-flex justify-content-between p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.03)' }}>
                  <span className="text-secondary"><CheckCircle className="me-1" style={{ width: '0.8rem', height: '0.8rem' }} /> Status</span>
                  <span className={`text-${getStatusColor(selectedJob.status)}`}>{selectedJob.status || 'Active'}</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-top border-light d-flex gap-2">
                <button onClick={() => setShowDetailModal(false)} className="btn btn-secondary flex-grow-1" style={{ borderRadius: '10px', fontWeight: '600' }}>Close</button>
                <button 
                  onClick={() => {
                    setShowDetailModal(false);
                    setEditJob({ ...selectedJob });
                    setShowEditModal(true);
                  }}
                  className="btn btn-warning flex-grow-1 d-flex align-items-center justify-content-center gap-1 shadow-sm transition-all hover:scale-105"
                  style={{ borderRadius: '10px', fontWeight: '600' }}
                >
                  <Edit2 style={{ width: '0.9rem', height: '0.9rem' }} /> Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

     
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
        
        .spinner-border {
          animation: spinner-border 0.75s linear infinite;
        }
        
        @keyframes spinner-border {
          to { transform: rotate(360deg); }
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