import React, { useState, useEffect } from 'react';
import { 
  Building2, Plus, Trash2, Edit2, Search, Filter,
  Mail, Phone, MapPin, Globe, Users, Award,
  Eye, RefreshCw, XCircle, CheckCircle, Loader2,
  ArrowUpRight, Sparkles, Zap, TrendingUp
} from 'lucide-react';

const API_URL = 'http://localhost:5000/api';

export default function AdminCompaniesTab({ token }) {

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTier, setFilterTier] = useState('ALL');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [error, setError] = useState(null);

  const [newCompany, setNewCompany] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    website: '',
    description: '',
    industry: 'Technology',
    tier: 'Product',
    minCgpa: '7.0',
    openRoles: ''
  });

  
  const fetchCompanies = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_URL}/admin/companies`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      console.log('📦 Companies response:', data);
      
      if (data.success) {
        setCompanies(data.data || []);
      } else {
        setError(data.message || 'Failed to fetch companies');
      }
    } catch (error) {
      console.error('Error fetching companies:', error);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

 
  const handleAddCompany = async (e) => {
    e.preventDefault();
    if (!newCompany.name || !newCompany.email) {
      alert('Please fill in all required fields!');
      return;
    }

    try {
      setLoading(true);
      
      const response = await fetch(`${API_URL}/admin/companies`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: newCompany.name,
          email: newCompany.email,
          phone: newCompany.phone || '',
          address: newCompany.address || '',
          website: newCompany.website || '',
          description: newCompany.description || '',
          industry: newCompany.industry || 'Technology',
          tier: newCompany.tier || 'Product',
          minCgpa: newCompany.minCgpa || '7.0',
          openRoles: parseInt(newCompany.openRoles) || 0
        })
      });

      const data = await response.json();
      
      if (data.success) {
        alert('✅ Company added successfully!');
        await fetchCompanies();
        setNewCompany({
          name: '',
          email: '',
          phone: '',
          address: '',
          website: '',
          description: '',
          industry: 'Technology',
          tier: 'Product',
          minCgpa: '7.0',
          openRoles: ''
        });
        setShowAddModal(false);
      } else {
        alert('❌ ' + data.message);
      }
    } catch (error) {
      console.error('Error adding company:', error);
      alert('❌ Failed to add company: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

 
  const handleEditCompany = (company) => {
    setEditingCompany(company);
    setNewCompany({
      name: company.name || '',
      email: company.email || '',
      phone: company.phone || '',
      address: company.address || '',
      website: company.website || '',
      description: company.description || '',
      industry: company.industry || 'Technology',
      tier: company.tier || 'Product',
      minCgpa: company.minCgpa || '7.0',
      openRoles: company.openRoles || ''
    });
    setShowEditModal(true);
  };

  const handleUpdateCompany = async (e) => {
    e.preventDefault();
    if (!newCompany.name || !newCompany.email) {
      alert('Please fill in all required fields!');
      return;
    }

    try {
      setLoading(true);
      
      const response = await fetch(`${API_URL}/admin/companies/${editingCompany._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: newCompany.name,
          email: newCompany.email,
          phone: newCompany.phone || '',
          address: newCompany.address || '',
          website: newCompany.website || '',
          description: newCompany.description || '',
          industry: newCompany.industry || 'Technology',
          tier: newCompany.tier || 'Product',
          minCgpa: newCompany.minCgpa || '7.0',
          openRoles: parseInt(newCompany.openRoles) || 0
        })
      });

      const data = await response.json();
      
      if (data.success) {
        alert('✅ Company updated successfully!');
        await fetchCompanies();
        setNewCompany({
          name: '',
          email: '',
          phone: '',
          address: '',
          website: '',
          description: '',
          industry: 'Technology',
          tier: 'Product',
          minCgpa: '7.0',
          openRoles: ''
        });
        setEditingCompany(null);
        setShowEditModal(false);
      } else {
        alert('❌ ' + data.message);
      }
    } catch (error) {
      console.error('Error updating company:', error);
      alert('❌ Failed to update company: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCompany = async (id) => {
    if (!window.confirm('Are you sure you want to delete this company?')) return;

    try {
      setLoading(true);
      
      const response = await fetch(`${API_URL}/admin/companies/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        alert('✅ Company deleted successfully!');
        await fetchCompanies();
      } else {
        alert('❌ ' + data.message);
      }
    } catch (error) {
      console.error('Error deleting company:', error);
      alert('❌ Failed to delete company: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

 
  const handleViewCompany = (company) => {
    setSelectedCompany(company);
    setShowDetailsModal(true);
  };

 
  const getTierColor = (tier) => {
    switch(tier) {
      case 'Product': return 'primary';
      case 'Services': return 'success';
      case 'Startup': return 'warning';
      default: return 'secondary';
    }
  };

  const getTierIcon = (tier) => {
    switch(tier) {
      case 'Product': return <Award className="text-primary" style={{ width: '0.6rem', height: '0.6rem' }} />;
      case 'Services': return <Users className="text-success" style={{ width: '0.6rem', height: '0.6rem' }} />;
      case 'Startup': return <TrendingUp className="text-warning" style={{ width: '0.6rem', height: '0.6rem' }} />;
      default: return null;
    }
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

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company?.name?.toLowerCase().includes(searchQuery?.toLowerCase() || '') ||
                          company?.email?.toLowerCase().includes(searchQuery?.toLowerCase() || '') ||
                          company?.industry?.toLowerCase().includes(searchQuery?.toLowerCase() || '');
    const matchesTier = filterTier === 'ALL' || company?.tier === filterTier;
    return matchesSearch && matchesTier;
  });

  
  const totalCompanies = companies.length;
  const productCompanies = companies.filter(c => c?.tier === 'Product').length;
  const serviceCompanies = companies.filter(c => c?.tier === 'Services').length;
  const startupCompanies = companies.filter(c => c?.tier === 'Startup').length;
  const totalOpenRoles = companies.reduce((sum, c) => sum + (c?.openRoles || 0), 0);

 
  useEffect(() => {
    if (token) {
      fetchCompanies();
    }
  }, [token]);


  return (
    <div className="animate-fadeIn">
     
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h5 className="text-light fw-bold m-0">Companies</h5>
          <p className="text-secondary small m-0">Manage all partner companies</p>
        </div>
        <button 
          className="btn btn-primary btn-sm d-flex align-items-center gap-1 shadow-lg shadow-primary/20 transition-all hover:scale-105"
          onClick={() => {
            setEditingCompany(null);
            setNewCompany({
              name: '',
              email: '',
              phone: '',
              address: '',
              website: '',
              description: '',
              industry: 'Technology',
              tier: 'Product',
              minCgpa: '7.0',
              openRoles: ''
            });
            setShowAddModal(true);
          }}
          style={{ borderRadius: '10px', fontWeight: '600' }}
        >
          <Plus style={{ width: '0.8rem', height: '0.8rem' }} /> Add Company
        </button>
      </div>

     
      <div className="row g-3 mb-4">
        {[
          { label: "Total Companies", value: totalCompanies, color: "primary", icon: Building2 },
          { label: "Product", value: productCompanies, color: "primary", icon: Award },
          { label: "Services", value: serviceCompanies, color: "success", icon: Users },
          { label: "Startups", value: startupCompanies, color: "warning", icon: TrendingUp },
          { label: "Open Roles", value: totalOpenRoles, color: "info", icon: Zap },
        ].map((stat, i) => {
          const Icon = stat.icon;
          const bgColors = {
            primary: 'rgba(59,130,246,0.15)',
            success: 'rgba(34,197,94,0.15)',
            warning: 'rgba(234,179,8,0.15)',
            info: 'rgba(6,182,212,0.15)'
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
                value={filterTier}
                onChange={(e) => setFilterTier(e.target.value)}
                style={{ fontSize: '0.75rem', width: '140px', outline: 'none' }}
              >
                <option value="ALL">All Tiers</option>
                <option value="Product">Product</option>
                <option value="Services">Services</option>
                <option value="Startup">Startup</option>
              </select>
            </div>
            <button 
              className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1 shadow-sm transition-all hover:scale-105"
              onClick={fetchCompanies}
            >
              <RefreshCw style={{ width: '0.8rem', height: '0.8rem' }} /> Refresh
            </button>
            <span className="text-secondary small ms-auto">{filteredCompanies.length} companies</span>
          </div>
        </div>
      </div>

     
      {loading && companies.length === 0 ? (
        <div className="text-center py-5">
          <Loader2 className="spinner-border text-primary" style={{ width: '2rem', height: '2rem' }} />
          <p className="text-secondary mt-2">Loading companies...</p>
        </div>
      ) : filteredCompanies.length === 0 ? (
        <div className="card border-0 shadow-lg rounded-4 text-center p-5" style={{ background: 'rgba(20,20,30,0.6)', backdropFilter: 'blur(10px)' }}>
          <Building2 className="text-secondary mx-auto" style={{ width: '3rem', height: '3rem' }} />
          <h6 className="text-secondary mt-3">No companies found</h6>
          <p className="text-secondary small">Click "Add Company" to register a new company</p>
        </div>
      ) : (
        <div className="row g-4">
          {filteredCompanies.map((company, index) => {
            const companyColor = getCompanyColor(company?.name);
            const companyInitial = getCompanyInitial(company?.name);
            
            return (
              <div key={company._id || index} className="col-md-6 col-lg-4">
                <div 
                  className="card border-0 shadow-lg rounded-4 h-100 transition-all hover:translate-y-2"
                  style={{ 
                    background: 'rgba(20,20,30,0.6)', 
                    backdropFilter: 'blur(10px)',
                    animation: `slideUp ${0.3 + index * 0.05}s ease-out forwards`
                  }}
                >
                  <div className="card-body p-4 d-flex flex-column">
                    
                    <div className="d-flex align-items-center gap-3 mb-3">
                      <div className="d-flex align-items-center justify-content-center rounded-3 flex-shrink-0" style={{ 
                        width: '48px', 
                        height: '48px',
                        background: companyColor,
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        color: '#fff',
                        boxShadow: `0 4px 15px ${companyColor}40`
                      }}>
                        {companyInitial}
                      </div>
                      <div className="flex-grow-1 min-w-0">
                        <h6 className="fw-bold text-light m-0 text-truncate">{company?.name}</h6>
                        <span className={`badge bg-${getTierColor(company?.tier)} bg-opacity-10 text-${getTierColor(company?.tier)} border border-${getTierColor(company?.tier)} d-flex align-items-center gap-1`} style={{ fontSize: '0.45rem' }}>
                          {getTierIcon(company?.tier)}
                          {company?.tier || 'N/A'}
                        </span>
                        <span className="badge bg-secondary bg-opacity-20 text-secondary border border-secondary ms-1" style={{ fontSize: '0.4rem' }}>
                          {company?.industry || 'General'}
                        </span>
                      </div>
                      <div className="d-flex gap-1">
                        <button 
                          onClick={() => handleViewCompany(company)}
                          className="btn btn-outline-info btn-sm shadow-sm transition-all hover:scale-110"
                          style={{ padding: '0.2rem 0.4rem' }}
                          title="View Details"
                        >
                          <Eye style={{ width: '0.6rem', height: '0.6rem' }} />
                        </button>
                        <button 
                          onClick={() => handleEditCompany(company)}
                          className="btn btn-outline-warning btn-sm shadow-sm transition-all hover:scale-110"
                          style={{ padding: '0.2rem 0.4rem' }}
                          title="Edit"
                        >
                          <Edit2 style={{ width: '0.6rem', height: '0.6rem' }} />
                        </button>
                        <button 
                          onClick={() => handleDeleteCompany(company._id)}
                          className="btn btn-outline-danger btn-sm shadow-sm transition-all hover:scale-110"
                          style={{ padding: '0.2rem 0.4rem' }}
                          title="Delete"
                        >
                          <Trash2 style={{ width: '0.6rem', height: '0.6rem' }} />
                        </button>
                      </div>
                    </div>

                   
                    <div className="space-y-1.5 flex-grow-1">
                      <div className="d-flex align-items-center gap-2 p-1.5 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                        <Mail className="text-secondary" style={{ width: '0.6rem', height: '0.6rem' }} />
                        <span className="text-secondary small flex-grow-1" style={{ fontSize: '0.55rem' }}>Email</span>
                        <span className="text-light" style={{ fontSize: '0.6rem' }}>{company?.email}</span>
                      </div>
                      <div className="d-flex align-items-center gap-2 p-1.5 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                        <Phone className="text-secondary" style={{ width: '0.6rem', height: '0.6rem' }} />
                        <span className="text-secondary small flex-grow-1" style={{ fontSize: '0.55rem' }}>Phone</span>
                        <span className="text-light" style={{ fontSize: '0.6rem' }}>{company?.phone || 'N/A'}</span>
                      </div>
                      <div className="d-flex align-items-center gap-2 p-1.5 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                        <Award className="text-secondary" style={{ width: '0.6rem', height: '0.6rem' }} />
                        <span className="text-secondary small flex-grow-1" style={{ fontSize: '0.55rem' }}>Min CGPA</span>
                        <span className="text-primary fw-bold" style={{ fontSize: '0.6rem' }}>{company?.minCgpa || 'N/A'}</span>
                      </div>
                      <div className="d-flex align-items-center gap-2 p-1.5 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                        <Users className="text-secondary" style={{ width: '0.6rem', height: '0.6rem' }} />
                        <span className="text-secondary small flex-grow-1" style={{ fontSize: '0.55rem' }}>Open Roles</span>
                        <span className="text-success fw-bold" style={{ fontSize: '0.6rem' }}>{company?.openRoles || 0}</span>
                      </div>
                      {company?.address && (
                        <div className="d-flex align-items-center gap-2 p-1.5 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                          <MapPin className="text-secondary" style={{ width: '0.6rem', height: '0.6rem' }} />
                          <span className="text-secondary small flex-grow-1" style={{ fontSize: '0.55rem' }}>Location</span>
                          <span className="text-light" style={{ fontSize: '0.6rem' }}>{company?.address}</span>
                        </div>
                      )}
                    </div>

                   
                    {company?.description && (
                      <div className="mt-2 pt-2 border-top border-secondary">
                        <p className="text-secondary small mb-0" style={{ fontSize: '0.55rem' }}>
                          {company.description.substring(0, 80)}...
                        </p>
                      </div>
                    )}

                   
                    {company?.website && (
                      <div className="mt-2">
                        <a href={company.website} target="_blank" rel="noopener noreferrer" 
                           className="text-primary text-decoration-none small d-flex align-items-center gap-1" style={{ fontSize: '0.55rem' }}>
                          <Globe style={{ width: '0.6rem', height: '0.6rem' }} />
                          Visit Website <ArrowUpRight style={{ width: '0.5rem', height: '0.5rem' }} />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

     
      {showAddModal && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ 
          zIndex: 9999, 
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(10px)',
          animation: 'fadeIn 0.3s ease'
        }}>
          <div className="card border-0 shadow-2xl rounded-4" style={{ 
            maxWidth: '600px', 
            width: '95%', 
            maxHeight: '90vh', 
            overflowY: 'auto', 
            background: 'rgba(20,20,30,0.95)',
            backdropFilter: 'blur(20px)'
          }}>
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-3 border-bottom border-secondary pb-3">
                <h5 className="text-light fw-bold m-0 d-flex align-items-center gap-2">
                  <Building2 className="text-primary" style={{ width: '1.2rem', height: '1.2rem' }} />
                  Add New Company
                </h5>
                <button onClick={() => setShowAddModal(false)} className="btn btn-close btn-close-white"></button>
              </div>

              <form onSubmit={handleAddCompany}>
                <div className="row g-3">
                  <div className="col-12">
                    <label className="text-secondary small fw-bold d-block mb-1">Company Name *</label>
                    <input 
                      type="text" 
                      className="form-control form-control-sm bg-dark text-light border-secondary" 
                      placeholder="Enter company name"
                      value={newCompany.name}
                      onChange={(e) => setNewCompany({...newCompany, name: e.target.value})}
                      required
                      style={{ fontSize: '0.8rem' }}
                    />
                  </div>
                  <div className="col-12">
                    <label className="text-secondary small fw-bold d-block mb-1">Email *</label>
                    <input 
                      type="email" 
                      className="form-control form-control-sm bg-dark text-light border-secondary" 
                      placeholder="hr@company.com"
                      value={newCompany.email}
                      onChange={(e) => setNewCompany({...newCompany, email: e.target.value})}
                      required
                      style={{ fontSize: '0.8rem' }}
                    />
                  </div>
                  <div className="col-6">
                    <label className="text-secondary small fw-bold d-block mb-1">Phone</label>
                    <input 
                      type="text" 
                      className="form-control form-control-sm bg-dark text-light border-secondary" 
                      placeholder="+91 9876543210"
                      value={newCompany.phone}
                      onChange={(e) => setNewCompany({...newCompany, phone: e.target.value})}
                      style={{ fontSize: '0.8rem' }}
                    />
                  </div>
                  <div className="col-6">
                    <label className="text-secondary small fw-bold d-block mb-1">Industry</label>
                    <select 
                      className="form-select form-select-sm bg-dark text-light border-secondary"
                      value={newCompany.industry}
                      onChange={(e) => setNewCompany({...newCompany, industry: e.target.value})}
                      style={{ fontSize: '0.8rem' }}
                    >
                      <option value="Technology">Technology</option>
                      <option value="E-commerce">E-commerce</option>
                      <option value="Finance">Finance</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Education">Education</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Services">Services</option>
                    </select>
                  </div>
                  <div className="col-6">
                    <label className="text-secondary small fw-bold d-block mb-1">Tier</label>
                    <select 
                      className="form-select form-select-sm bg-dark text-light border-secondary"
                      value={newCompany.tier}
                      onChange={(e) => setNewCompany({...newCompany, tier: e.target.value})}
                      style={{ fontSize: '0.8rem' }}
                    >
                      <option value="Product">Product</option>
                      <option value="Services">Services</option>
                      <option value="Startup">Startup</option>
                    </select>
                  </div>
                  <div className="col-6">
                    <label className="text-secondary small fw-bold d-block mb-1">Min CGPA</label>
                    <input 
                      type="text" 
                      className="form-control form-control-sm bg-dark text-light border-secondary" 
                      placeholder="7.0"
                      value={newCompany.minCgpa}
                      onChange={(e) => setNewCompany({...newCompany, minCgpa: e.target.value})}
                      style={{ fontSize: '0.8rem' }}
                    />
                  </div>
                  <div className="col-6">
                    <label className="text-secondary small fw-bold d-block mb-1">Open Roles</label>
                    <input 
                      type="number" 
                      className="form-control form-control-sm bg-dark text-light border-secondary" 
                      placeholder="0"
                      value={newCompany.openRoles}
                      onChange={(e) => setNewCompany({...newCompany, openRoles: e.target.value})}
                      style={{ fontSize: '0.8rem' }}
                    />
                  </div>
                  <div className="col-6">
                    <label className="text-secondary small fw-bold d-block mb-1">Address</label>
                    <input 
                      type="text" 
                      className="form-control form-control-sm bg-dark text-light border-secondary" 
                      placeholder="City, Country"
                      value={newCompany.address}
                      onChange={(e) => setNewCompany({...newCompany, address: e.target.value})}
                      style={{ fontSize: '0.8rem' }}
                    />
                  </div>
                  <div className="col-12">
                    <label className="text-secondary small fw-bold d-block mb-1">Website</label>
                    <input 
                      type="text" 
                      className="form-control form-control-sm bg-dark text-light border-secondary" 
                      placeholder="https://company.com"
                      value={newCompany.website}
                      onChange={(e) => setNewCompany({...newCompany, website: e.target.value})}
                      style={{ fontSize: '0.8rem' }}
                    />
                  </div>
                  <div className="col-12">
                    <label className="text-secondary small fw-bold d-block mb-1">Description</label>
                    <textarea 
                      rows={2}
                      className="form-control form-control-sm bg-dark text-light border-secondary" 
                      placeholder="Company description..."
                      value={newCompany.description}
                      onChange={(e) => setNewCompany({...newCompany, description: e.target.value})}
                      style={{ fontSize: '0.8rem', resize: 'none' }}
                    />
                  </div>
                </div>

                <div className="mt-3 pt-3 border-top border-secondary d-flex gap-2">
                  <button onClick={() => setShowAddModal(false)} type="button" className="btn btn-secondary flex-grow-1">Cancel</button>
                  <button type="submit" className="btn btn-primary flex-grow-1 shadow-lg shadow-primary/20 transition-all hover:scale-105" disabled={loading}>
                    {loading ? <Loader2 className="spinner-border spinner-border-sm" style={{ width: '0.8rem', height: '0.8rem' }} /> : <Plus style={{ width: '0.8rem', height: '0.8rem' }} />}
                    {loading ? 'Adding...' : 'Add Company'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

     
      {showEditModal && editingCompany && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ 
          zIndex: 9999, 
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(10px)',
          animation: 'fadeIn 0.3s ease'
        }}>
          <div className="card border-0 shadow-2xl rounded-4" style={{ 
            maxWidth: '600px', 
            width: '95%', 
            maxHeight: '90vh', 
            overflowY: 'auto', 
            background: 'rgba(20,20,30,0.95)',
            backdropFilter: 'blur(20px)'
          }}>
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-3 border-bottom border-secondary pb-3">
                <h5 className="text-light fw-bold m-0 d-flex align-items-center gap-2">
                  <Edit2 className="text-warning" style={{ width: '1.2rem', height: '1.2rem' }} />
                  Edit Company
                </h5>
                <button onClick={() => setShowEditModal(false)} className="btn btn-close btn-close-white"></button>
              </div>

              <form onSubmit={handleUpdateCompany}>
                <div className="row g-3">
                  <div className="col-12">
                    <label className="text-secondary small fw-bold d-block mb-1">Company Name *</label>
                    <input 
                      type="text" 
                      className="form-control form-control-sm bg-dark text-light border-secondary" 
                      placeholder="Enter company name"
                      value={newCompany.name}
                      onChange={(e) => setNewCompany({...newCompany, name: e.target.value})}
                      required
                      style={{ fontSize: '0.8rem' }}
                    />
                  </div>
                  <div className="col-12">
                    <label className="text-secondary small fw-bold d-block mb-1">Email *</label>
                    <input 
                      type="email" 
                      className="form-control form-control-sm bg-dark text-light border-secondary" 
                      placeholder="hr@company.com"
                      value={newCompany.email}
                      onChange={(e) => setNewCompany({...newCompany, email: e.target.value})}
                      required
                      style={{ fontSize: '0.8rem' }}
                    />
                  </div>
                  <div className="col-6">
                    <label className="text-secondary small fw-bold d-block mb-1">Phone</label>
                    <input 
                      type="text" 
                      className="form-control form-control-sm bg-dark text-light border-secondary" 
                      placeholder="+91 9876543210"
                      value={newCompany.phone}
                      onChange={(e) => setNewCompany({...newCompany, phone: e.target.value})}
                      style={{ fontSize: '0.8rem' }}
                    />
                  </div>
                  <div className="col-6">
                    <label className="text-secondary small fw-bold d-block mb-1">Industry</label>
                    <select 
                      className="form-select form-select-sm bg-dark text-light border-secondary"
                      value={newCompany.industry}
                      onChange={(e) => setNewCompany({...newCompany, industry: e.target.value})}
                      style={{ fontSize: '0.8rem' }}
                    >
                      <option value="Technology">Technology</option>
                      <option value="E-commerce">E-commerce</option>
                      <option value="Finance">Finance</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Education">Education</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Services">Services</option>
                    </select>
                  </div>
                  <div className="col-6">
                    <label className="text-secondary small fw-bold d-block mb-1">Tier</label>
                    <select 
                      className="form-select form-select-sm bg-dark text-light border-secondary"
                      value={newCompany.tier}
                      onChange={(e) => setNewCompany({...newCompany, tier: e.target.value})}
                      style={{ fontSize: '0.8rem' }}
                    >
                      <option value="Product">Product</option>
                      <option value="Services">Services</option>
                      <option value="Startup">Startup</option>
                    </select>
                  </div>
                  <div className="col-6">
                    <label className="text-secondary small fw-bold d-block mb-1">Min CGPA</label>
                    <input 
                      type="text" 
                      className="form-control form-control-sm bg-dark text-light border-secondary" 
                      placeholder="7.0"
                      value={newCompany.minCgpa}
                      onChange={(e) => setNewCompany({...newCompany, minCgpa: e.target.value})}
                      style={{ fontSize: '0.8rem' }}
                    />
                  </div>
                  <div className="col-6">
                    <label className="text-secondary small fw-bold d-block mb-1">Open Roles</label>
                    <input 
                      type="number" 
                      className="form-control form-control-sm bg-dark text-light border-secondary" 
                      placeholder="0"
                      value={newCompany.openRoles}
                      onChange={(e) => setNewCompany({...newCompany, openRoles: e.target.value})}
                      style={{ fontSize: '0.8rem' }}
                    />
                  </div>
                  <div className="col-6">
                    <label className="text-secondary small fw-bold d-block mb-1">Address</label>
                    <input 
                      type="text" 
                      className="form-control form-control-sm bg-dark text-light border-secondary" 
                      placeholder="City, Country"
                      value={newCompany.address}
                      onChange={(e) => setNewCompany({...newCompany, address: e.target.value})}
                      style={{ fontSize: '0.8rem' }}
                    />
                  </div>
                  <div className="col-12">
                    <label className="text-secondary small fw-bold d-block mb-1">Website</label>
                    <input 
                      type="text" 
                      className="form-control form-control-sm bg-dark text-light border-secondary" 
                      placeholder="https://company.com"
                      value={newCompany.website}
                      onChange={(e) => setNewCompany({...newCompany, website: e.target.value})}
                      style={{ fontSize: '0.8rem' }}
                    />
                  </div>
                  <div className="col-12">
                    <label className="text-secondary small fw-bold d-block mb-1">Description</label>
                    <textarea 
                      rows={2}
                      className="form-control form-control-sm bg-dark text-light border-secondary" 
                      placeholder="Company description..."
                      value={newCompany.description}
                      onChange={(e) => setNewCompany({...newCompany, description: e.target.value})}
                      style={{ fontSize: '0.8rem', resize: 'none' }}
                    />
                  </div>
                </div>

                <div className="mt-3 pt-3 border-top border-secondary d-flex gap-2">
                  <button onClick={() => setShowEditModal(false)} type="button" className="btn btn-secondary flex-grow-1">Cancel</button>
                  <button type="submit" className="btn btn-primary flex-grow-1 shadow-lg shadow-primary/20 transition-all hover:scale-105" disabled={loading}>
                    {loading ? <Loader2 className="spinner-border spinner-border-sm" style={{ width: '0.8rem', height: '0.8rem' }} /> : <Save style={{ width: '0.8rem', height: '0.8rem' }} />}
                    {loading ? 'Updating...' : 'Update Company'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      
      {showDetailsModal && selectedCompany && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ 
          zIndex: 9999, 
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(10px)',
          animation: 'fadeIn 0.3s ease'
        }}>
          <div className="card border-0 shadow-2xl rounded-4" style={{ 
            maxWidth: '500px', 
            width: '95%', 
            maxHeight: '90vh', 
            overflowY: 'auto', 
            background: 'rgba(20,20,30,0.95)',
            backdropFilter: 'blur(20px)'
          }}>
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-3 border-bottom border-secondary pb-3">
                <h5 className="text-light fw-bold m-0 d-flex align-items-center gap-2">
                  <Building2 className="text-primary" style={{ width: '1.2rem', height: '1.2rem' }} />
                  Company Details
                </h5>
                <button onClick={() => setShowDetailsModal(false)} className="btn btn-close btn-close-white"></button>
              </div>

              <div className="text-center mb-3">
                <div className="d-inline-flex align-items-center justify-content-center rounded-circle" style={{ 
                  width: '64px', height: '64px',
                  background: getCompanyColor(selectedCompany?.name),
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: '#fff',
                  boxShadow: `0 4px 20px ${getCompanyColor(selectedCompany?.name)}50`
                }}>
                  {getCompanyInitial(selectedCompany?.name)}
                </div>
                <h5 className="text-light fw-bold mt-2">{selectedCompany?.name}</h5>
                <div className="d-flex align-items-center justify-content-center gap-2 flex-wrap">
                  <span className={`badge bg-${getTierColor(selectedCompany?.tier)} bg-opacity-10 text-${getTierColor(selectedCompany?.tier)} border border-${getTierColor(selectedCompany?.tier)}`}>
                    {selectedCompany?.tier}
                  </span>
                  <span className="badge bg-secondary bg-opacity-20 text-secondary border border-secondary">
                    {selectedCompany?.industry || 'N/A'}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="d-flex justify-content-between p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <span className="text-secondary"><Mail className="me-1" style={{ width: '0.8rem', height: '0.8rem' }} /> Email</span>
                  <span className="text-light">{selectedCompany?.email}</span>
                </div>
                <div className="d-flex justify-content-between p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <span className="text-secondary"><Phone className="me-1" style={{ width: '0.8rem', height: '0.8rem' }} /> Phone</span>
                  <span className="text-light">{selectedCompany?.phone || 'N/A'}</span>
                </div>
                <div className="d-flex justify-content-between p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <span className="text-secondary"><MapPin className="me-1" style={{ width: '0.8rem', height: '0.8rem' }} /> Address</span>
                  <span className="text-light">{selectedCompany?.address || 'N/A'}</span>
                </div>
                <div className="d-flex justify-content-between p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <span className="text-secondary"><Globe className="me-1" style={{ width: '0.8rem', height: '0.8rem' }} /> Website</span>
                  {selectedCompany?.website ? (
                    <a href={selectedCompany.website} target="_blank" rel="noopener noreferrer" className="text-primary text-decoration-none small">
                      Visit
                    </a>
                  ) : (
                    <span className="text-light">N/A</span>
                  )}
                </div>
                <div className="d-flex justify-content-between p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <span className="text-secondary"><Award className="me-1" style={{ width: '0.8rem', height: '0.8rem' }} /> Min CGPA</span>
                  <span className="text-primary fw-bold">{selectedCompany?.minCgpa || 'N/A'}</span>
                </div>
                <div className="d-flex justify-content-between p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <span className="text-secondary"><Users className="me-1" style={{ width: '0.8rem', height: '0.8rem' }} /> Open Roles</span>
                  <span className="text-success fw-bold">{selectedCompany?.openRoles || 0}</span>
                </div>
                {selectedCompany?.description && (
                  <div className="p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <span className="text-secondary d-block mb-1">Description</span>
                    <span className="text-light small">{selectedCompany.description}</span>
                  </div>
                )}
              </div>

              <div className="mt-3 pt-3 border-top border-secondary d-flex gap-2">
                <button onClick={() => setShowDetailsModal(false)} className="btn btn-secondary flex-grow-1">Close</button>
                <button 
                  onClick={() => {
                    setShowDetailsModal(false);
                    handleEditCompany(selectedCompany);
                  }}
                  className="btn btn-warning flex-grow-1 d-flex align-items-center justify-content-center gap-1 shadow-lg shadow-warning/20 transition-all hover:scale-105"
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
        
        .text-truncate {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
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