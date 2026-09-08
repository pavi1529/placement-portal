import React, { useState, useEffect } from 'react';
import { 
  Building2, Plus, Trash2, Edit2, Search, Filter,
  Mail, Phone, MapPin, Globe, Users, Award,
  Eye, RefreshCw, XCircle, CheckCircle, Loader2,
  ArrowUpRight, Sparkles, Zap, TrendingUp, Save
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
      case 'Product': return <Award className="text-primary" style={{ width: 'clamp(0.5rem, 0.8vw, 0.6rem)', height: 'clamp(0.5rem, 0.8vw, 0.6rem)' }} />;
      case 'Services': return <Users className="text-success" style={{ width: 'clamp(0.5rem, 0.8vw, 0.6rem)', height: 'clamp(0.5rem, 0.8vw, 0.6rem)' }} />;
      case 'Startup': return <TrendingUp className="text-warning" style={{ width: 'clamp(0.5rem, 0.8vw, 0.6rem)', height: 'clamp(0.5rem, 0.8vw, 0.6rem)' }} />;
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
      {/* Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3 mb-md-4">
        <div>
          <h5 className="text-light fw-bold m-0" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)' }}>
            Companies
          </h5>
          <p className="text-secondary small m-0" style={{ fontSize: 'clamp(0.6rem, 1vw, 0.7rem)' }}>
            Manage all partner companies
          </p>
        </div>
        <button 
          className="btn btn-primary btn-sm d-flex align-items-center gap-1 shadow-lg shadow-primary/20"
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
          style={{ 
            borderRadius: '10px', 
            fontWeight: '600',
            fontSize: 'clamp(0.6rem, 1vw, 0.7rem)',
            padding: 'clamp(0.3rem, 0.6vw, 0.4rem) clamp(0.6rem, 1.2vw, 0.8rem)'
          }}
        >
          <Plus style={{ 
            width: 'clamp(0.7rem, 1.2vw, 0.8rem)', 
            height: 'clamp(0.7rem, 1.2vw, 0.8rem)' 
          }} /> 
          <span className="d-none d-sm-inline">Add Company</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="row g-2 g-md-3 mb-3 mb-md-4">
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
                value={filterTier}
                onChange={(e) => setFilterTier(e.target.value)}
                style={{ 
                  fontSize: 'clamp(0.55rem, 0.9vw, 0.75rem)', 
                  width: 'clamp(90px, 15vw, 140px)', 
                  outline: 'none', 
                  padding: '0.1rem 0.4rem',
                  color: '#ffffff !important'
                }}
              >
                <option value="ALL" style={{ background: '#1a1a2e', color: '#ffffff' }}>All Tiers</option>
                <option value="Product" style={{ background: '#1a1a2e', color: '#ffffff' }}>Product</option>
                <option value="Services" style={{ background: '#1a1a2e', color: '#ffffff' }}>Services</option>
                <option value="Startup" style={{ background: '#1a1a2e', color: '#ffffff' }}>Startup</option>
              </select>
            </div>
            <button 
              className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1 shadow-sm"
              onClick={fetchCompanies}
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
            <span className="text-secondary small ms-auto d-none d-md-block" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.65rem)' }}>
              {filteredCompanies.length} companies
            </span>
          </div>
        </div>
      </div>

      {/* Companies Grid */}
      {loading && companies.length === 0 ? (
        <div className="text-center py-5">
          <Loader2 className="spinner-border text-primary" style={{ width: 'clamp(1.5rem, 3vw, 2rem)', height: 'clamp(1.5rem, 3vw, 2rem)' }} />
          <p className="text-secondary mt-2" style={{ fontSize: 'clamp(0.75rem, 1.2vw, 0.85rem)' }}>Loading companies...</p>
        </div>
      ) : filteredCompanies.length === 0 ? (
        <div className="card border-0 shadow-sm rounded-4 text-center p-3 p-md-5" style={{ 
          background: 'rgba(20,20,30,0.6)', 
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.05)'
        }}>
          <Building2 className="text-secondary mx-auto" style={{ 
            width: 'clamp(2rem, 4vw, 3rem)', 
            height: 'clamp(2rem, 4vw, 3rem)' 
          }} />
          <h6 className="text-secondary mt-3" style={{ fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>No companies found</h6>
          <p className="text-secondary small" style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)' }}>Click "Add Company" to register a new company</p>
        </div>
      ) : (
        <div className="row g-2 g-md-3 g-lg-4">
          {filteredCompanies.map((company, index) => {
            const companyColor = getCompanyColor(company?.name);
            const companyInitial = getCompanyInitial(company?.name);
            
            return (
              <div key={company._id || index} className="col-sm-6 col-xl-4">
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
                    {/* Company Header */}
                    <div className="d-flex align-items-start gap-2 gap-md-3 mb-2 mb-md-3">
                      <div className="d-flex align-items-center justify-content-center rounded-3 flex-shrink-0" style={{ 
                        width: 'clamp(36px, 6vw, 48px)', 
                        height: 'clamp(36px, 6vw, 48px)',
                        background: companyColor,
                        fontSize: 'clamp(0.9rem, 1.5vw, 1.2rem)',
                        fontWeight: 'bold',
                        color: '#fff',
                        boxShadow: `0 4px 15px ${companyColor}40`
                      }}>
                        {companyInitial}
                      </div>
                      <div className="flex-grow-1 min-w-0">
                        <h6 className="fw-bold text-light m-0 text-truncate" style={{ fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)' }}>
                          {company?.name}
                        </h6>
                        <div className="d-flex flex-wrap gap-1 mt-1">
                          <span className={`badge bg-${getTierColor(company?.tier)} bg-opacity-10 text-${getTierColor(company?.tier)} border border-${getTierColor(company?.tier)} d-flex align-items-center gap-1`} style={{ fontSize: 'clamp(0.35rem, 0.6vw, 0.45rem)' }}>
                            {getTierIcon(company?.tier)}
                            {company?.tier || 'N/A'}
                          </span>
                          <span className="badge bg-secondary bg-opacity-20 text-secondary border border-secondary" style={{ fontSize: 'clamp(0.35rem, 0.6vw, 0.45rem)' }}>
                            {company?.industry || 'General'}
                          </span>
                        </div>
                      </div>
                      <div className="d-flex gap-1 flex-shrink-0">
                        <button 
                          onClick={() => handleViewCompany(company)}
                          className="btn btn-outline-info btn-sm shadow-sm"
                          style={{ 
                            padding: 'clamp(0.12rem, 0.25vw, 0.2rem) clamp(0.25rem, 0.4vw, 0.35rem)',
                            fontSize: 'clamp(0.4rem, 0.6vw, 0.5rem)',
                            borderRadius: '6px'
                          }}
                          title="View Details"
                        >
                          <Eye style={{ 
                            width: 'clamp(0.5rem, 0.8vw, 0.6rem)', 
                            height: 'clamp(0.5rem, 0.8vw, 0.6rem)' 
                          }} />
                        </button>
                        <button 
                          onClick={() => handleEditCompany(company)}
                          className="btn btn-outline-warning btn-sm shadow-sm"
                          style={{ 
                            padding: 'clamp(0.12rem, 0.25vw, 0.2rem) clamp(0.25rem, 0.4vw, 0.35rem)',
                            fontSize: 'clamp(0.4rem, 0.6vw, 0.5rem)',
                            borderRadius: '6px'
                          }}
                          title="Edit"
                        >
                          <Edit2 style={{ 
                            width: 'clamp(0.5rem, 0.8vw, 0.6rem)', 
                            height: 'clamp(0.5rem, 0.8vw, 0.6rem)' 
                          }} />
                        </button>
                        <button 
                          onClick={() => handleDeleteCompany(company._id)}
                          className="btn btn-outline-danger btn-sm shadow-sm"
                          style={{ 
                            padding: 'clamp(0.12rem, 0.25vw, 0.2rem) clamp(0.25rem, 0.4vw, 0.35rem)',
                            fontSize: 'clamp(0.4rem, 0.6vw, 0.5rem)',
                            borderRadius: '6px'
                          }}
                          title="Delete"
                        >
                          <Trash2 style={{ 
                            width: 'clamp(0.5rem, 0.8vw, 0.6rem)', 
                            height: 'clamp(0.5rem, 0.8vw, 0.6rem)' 
                          }} />
                        </button>
                      </div>
                    </div>

                    {/* Company Details */}
                    <div className="space-y-1.5 flex-grow-1">
                      <div className="d-flex flex-wrap justify-content-between align-items-center p-1 p-md-1.5 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                        <span className="text-secondary small" style={{ fontSize: 'clamp(0.45rem, 0.7vw, 0.55rem)' }}>
                          <Mail className="me-1" style={{ 
                            width: 'clamp(0.5rem, 0.8vw, 0.6rem)', 
                            height: 'clamp(0.5rem, 0.8vw, 0.6rem)' 
                          }} /> Email
                        </span>
                        <span className="text-light" style={{ fontSize: 'clamp(0.45rem, 0.7vw, 0.55rem)' }}>{company?.email}</span>
                      </div>
                      <div className="d-flex flex-wrap justify-content-between align-items-center p-1 p-md-1.5 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                        <span className="text-secondary small" style={{ fontSize: 'clamp(0.45rem, 0.7vw, 0.55rem)' }}>
                          <Phone className="me-1" style={{ 
                            width: 'clamp(0.5rem, 0.8vw, 0.6rem)', 
                            height: 'clamp(0.5rem, 0.8vw, 0.6rem)' 
                          }} /> Phone
                        </span>
                        <span className="text-light" style={{ fontSize: 'clamp(0.45rem, 0.7vw, 0.55rem)' }}>{company?.phone || 'N/A'}</span>
                      </div>
                      <div className="d-flex flex-wrap justify-content-between align-items-center p-1 p-md-1.5 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                        <span className="text-secondary small" style={{ fontSize: 'clamp(0.45rem, 0.7vw, 0.55rem)' }}>
                          <Award className="me-1" style={{ 
                            width: 'clamp(0.5rem, 0.8vw, 0.6rem)', 
                            height: 'clamp(0.5rem, 0.8vw, 0.6rem)' 
                          }} /> Min CGPA
                        </span>
                        <span className="text-primary fw-bold" style={{ fontSize: 'clamp(0.45rem, 0.7vw, 0.55rem)' }}>{company?.minCgpa || 'N/A'}</span>
                      </div>
                      <div className="d-flex flex-wrap justify-content-between align-items-center p-1 p-md-1.5 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                        <span className="text-secondary small" style={{ fontSize: 'clamp(0.45rem, 0.7vw, 0.55rem)' }}>
                          <Users className="me-1" style={{ 
                            width: 'clamp(0.5rem, 0.8vw, 0.6rem)', 
                            height: 'clamp(0.5rem, 0.8vw, 0.6rem)' 
                          }} /> Open Roles
                        </span>
                        <span className="text-success fw-bold" style={{ fontSize: 'clamp(0.45rem, 0.7vw, 0.55rem)' }}>{company?.openRoles || 0}</span>
                      </div>
                      {company?.address && (
                        <div className="d-flex flex-wrap justify-content-between align-items-center p-1 p-md-1.5 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                          <span className="text-secondary small" style={{ fontSize: 'clamp(0.45rem, 0.7vw, 0.55rem)' }}>
                            <MapPin className="me-1" style={{ 
                              width: 'clamp(0.5rem, 0.8vw, 0.6rem)', 
                              height: 'clamp(0.5rem, 0.8vw, 0.6rem)' 
                            }} /> Location
                          </span>
                          <span className="text-light" style={{ fontSize: 'clamp(0.45rem, 0.7vw, 0.55rem)' }}>{company?.address}</span>
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    {company?.description && (
                      <div className="mt-2 pt-2 border-top border-secondary">
                        <p className="text-secondary small mb-0" style={{ fontSize: 'clamp(0.45rem, 0.7vw, 0.55rem)' }}>
                          {company.description.substring(0, 60)}...
                        </p>
                      </div>
                    )}

                    {/* Website */}
                    {company?.website && (
                      <div className="mt-1">
                        <a href={company.website} target="_blank" rel="noopener noreferrer" 
                           className="text-primary text-decoration-none small d-flex align-items-center gap-1" style={{ fontSize: 'clamp(0.45rem, 0.7vw, 0.55rem)' }}>
                          <Globe style={{ 
                            width: 'clamp(0.5rem, 0.8vw, 0.6rem)', 
                            height: 'clamp(0.5rem, 0.8vw, 0.6rem)' 
                          }} />
                          Visit Website <ArrowUpRight style={{ 
                            width: 'clamp(0.4rem, 0.6vw, 0.5rem)', 
                            height: 'clamp(0.4rem, 0.6vw, 0.5rem)' 
                          }} />
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

      {/* Add Modal - Responsive */}
      {showAddModal && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ 
          zIndex: 9999, 
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(10px)',
          animation: 'fadeIn 0.3s ease',
          padding: '1rem'
        }}>
          <div className="card border-0 shadow-2xl rounded-4" style={{ 
            maxWidth: 'clamp(320px, 90vw, 600px)', 
            width: '100%', 
            maxHeight: '90vh', 
            overflowY: 'auto', 
            background: 'rgba(20,20,30,0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            <div className="card-body p-3 p-md-4">
              <div className="d-flex justify-content-between align-items-center mb-3 border-bottom border-secondary pb-3">
                <h5 className="text-light fw-bold m-0 d-flex align-items-center gap-2" style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)' }}>
                  <Building2 className="text-primary" style={{ 
                    width: 'clamp(0.9rem, 2vw, 1.2rem)', 
                    height: 'clamp(0.9rem, 2vw, 1.2rem)' 
                  }} />
                  Add New Company
                </h5>
                <button onClick={() => setShowAddModal(false)} className="btn btn-close btn-close-white" style={{ fontSize: 'clamp(0.6rem, 1vw, 0.9rem)' }}></button>
              </div>

              <form onSubmit={handleAddCompany}>
                <div className="row g-2 g-md-3">
                  <div className="col-12">
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Company Name *
                    </label>
                    <input 
                      type="text" 
                      className="form-control form-control-sm bg-dark text-light border-secondary" 
                      placeholder="Enter company name"
                      value={newCompany.name}
                      onChange={(e) => setNewCompany({...newCompany, name: e.target.value})}
                      required
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                    />
                  </div>
                  <div className="col-12">
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Email *
                    </label>
                    <input 
                      type="email" 
                      className="form-control form-control-sm bg-dark text-light border-secondary" 
                      placeholder="hr@company.com"
                      value={newCompany.email}
                      onChange={(e) => setNewCompany({...newCompany, email: e.target.value})}
                      required
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                    />
                  </div>
                  <div className="col-6">
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Phone
                    </label>
                    <input 
                      type="text" 
                      className="form-control form-control-sm bg-dark text-light border-secondary" 
                      placeholder="+91 9876543210"
                      value={newCompany.phone}
                      onChange={(e) => setNewCompany({...newCompany, phone: e.target.value})}
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                    />
                  </div>
                  <div className="col-6">
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Industry
                    </label>
                    <select 
                      className="form-select form-select-sm bg-dark text-light border-secondary"
                      value={newCompany.industry}
                      onChange={(e) => setNewCompany({...newCompany, industry: e.target.value})}
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
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
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Tier
                    </label>
                    <select 
                      className="form-select form-select-sm bg-dark text-light border-secondary"
                      value={newCompany.tier}
                      onChange={(e) => setNewCompany({...newCompany, tier: e.target.value})}
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                    >
                      <option value="Product">Product</option>
                      <option value="Services">Services</option>
                      <option value="Startup">Startup</option>
                    </select>
                  </div>
                  <div className="col-6">
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Min CGPA
                    </label>
                    <input 
                      type="text" 
                      className="form-control form-control-sm bg-dark text-light border-secondary" 
                      placeholder="7.0"
                      value={newCompany.minCgpa}
                      onChange={(e) => setNewCompany({...newCompany, minCgpa: e.target.value})}
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                    />
                  </div>
                  <div className="col-6">
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Open Roles
                    </label>
                    <input 
                      type="number" 
                      className="form-control form-control-sm bg-dark text-light border-secondary" 
                      placeholder="0"
                      value={newCompany.openRoles}
                      onChange={(e) => setNewCompany({...newCompany, openRoles: e.target.value})}
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                    />
                  </div>
                  <div className="col-12">
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Address
                    </label>
                    <input 
                      type="text" 
                      className="form-control form-control-sm bg-dark text-light border-secondary" 
                      placeholder="City, Country"
                      value={newCompany.address}
                      onChange={(e) => setNewCompany({...newCompany, address: e.target.value})}
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                    />
                  </div>
                  <div className="col-12">
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Website
                    </label>
                    <input 
                      type="text" 
                      className="form-control form-control-sm bg-dark text-light border-secondary" 
                      placeholder="https://company.com"
                      value={newCompany.website}
                      onChange={(e) => setNewCompany({...newCompany, website: e.target.value})}
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                    />
                  </div>
                  <div className="col-12">
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Description
                    </label>
                    <textarea 
                      rows={2}
                      className="form-control form-control-sm bg-dark text-light border-secondary" 
                      placeholder="Company description..."
                      value={newCompany.description}
                      onChange={(e) => setNewCompany({...newCompany, description: e.target.value})}
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px', resize: 'none' }}
                    />
                  </div>
                </div>

                <div className="mt-3 pt-3 border-top border-secondary d-flex gap-2 flex-wrap">
                  <button onClick={() => setShowAddModal(false)} type="button" className="btn btn-secondary flex-grow-1" style={{ fontSize: 'clamp(0.6rem, 1vw, 0.7rem)', padding: '0.35rem 0.7rem' }}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary flex-grow-1 shadow-lg shadow-primary/20" style={{ fontSize: 'clamp(0.6rem, 1vw, 0.7rem)', padding: '0.35rem 0.7rem' }} disabled={loading}>
                    {loading ? <Loader2 className="spinner-border spinner-border-sm" style={{ width: 'clamp(0.6rem, 1vw, 0.8rem)', height: 'clamp(0.6rem, 1vw, 0.8rem)' }} /> : <Plus style={{ width: 'clamp(0.7rem, 1.2vw, 0.8rem)', height: 'clamp(0.7rem, 1.2vw, 0.8rem)' }} />}
                    {loading ? 'Adding...' : 'Add Company'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal - Responsive */}
      {showEditModal && editingCompany && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ 
          zIndex: 9999, 
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(10px)',
          animation: 'fadeIn 0.3s ease',
          padding: '1rem'
        }}>
          <div className="card border-0 shadow-2xl rounded-4" style={{ 
            maxWidth: 'clamp(320px, 90vw, 600px)', 
            width: '100%', 
            maxHeight: '90vh', 
            overflowY: 'auto', 
            background: 'rgba(20,20,30,0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            <div className="card-body p-3 p-md-4">
              <div className="d-flex justify-content-between align-items-center mb-3 border-bottom border-secondary pb-3">
                <h5 className="text-light fw-bold m-0 d-flex align-items-center gap-2" style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)' }}>
                  <Edit2 className="text-warning" style={{ 
                    width: 'clamp(0.9rem, 2vw, 1.2rem)', 
                    height: 'clamp(0.9rem, 2vw, 1.2rem)' 
                  }} />
                  Edit Company
                </h5>
                <button onClick={() => setShowEditModal(false)} className="btn btn-close btn-close-white" style={{ fontSize: 'clamp(0.6rem, 1vw, 0.9rem)' }}></button>
              </div>

              <form onSubmit={handleUpdateCompany}>
                <div className="row g-2 g-md-3">
                  <div className="col-12">
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Company Name *
                    </label>
                    <input 
                      type="text" 
                      className="form-control form-control-sm bg-dark text-light border-secondary" 
                      placeholder="Enter company name"
                      value={newCompany.name}
                      onChange={(e) => setNewCompany({...newCompany, name: e.target.value})}
                      required
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                    />
                  </div>
                  <div className="col-12">
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Email *
                    </label>
                    <input 
                      type="email" 
                      className="form-control form-control-sm bg-dark text-light border-secondary" 
                      placeholder="hr@company.com"
                      value={newCompany.email}
                      onChange={(e) => setNewCompany({...newCompany, email: e.target.value})}
                      required
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                    />
                  </div>
                  <div className="col-6">
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Phone
                    </label>
                    <input 
                      type="text" 
                      className="form-control form-control-sm bg-dark text-light border-secondary" 
                      placeholder="+91 9876543210"
                      value={newCompany.phone}
                      onChange={(e) => setNewCompany({...newCompany, phone: e.target.value})}
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                    />
                  </div>
                  <div className="col-6">
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Industry
                    </label>
                    <select 
                      className="form-select form-select-sm bg-dark text-light border-secondary"
                      value={newCompany.industry}
                      onChange={(e) => setNewCompany({...newCompany, industry: e.target.value})}
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
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
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Tier
                    </label>
                    <select 
                      className="form-select form-select-sm bg-dark text-light border-secondary"
                      value={newCompany.tier}
                      onChange={(e) => setNewCompany({...newCompany, tier: e.target.value})}
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                    >
                      <option value="Product">Product</option>
                      <option value="Services">Services</option>
                      <option value="Startup">Startup</option>
                    </select>
                  </div>
                  <div className="col-6">
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Min CGPA
                    </label>
                    <input 
                      type="text" 
                      className="form-control form-control-sm bg-dark text-light border-secondary" 
                      placeholder="7.0"
                      value={newCompany.minCgpa}
                      onChange={(e) => setNewCompany({...newCompany, minCgpa: e.target.value})}
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                    />
                  </div>
                  <div className="col-6">
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Open Roles
                    </label>
                    <input 
                      type="number" 
                      className="form-control form-control-sm bg-dark text-light border-secondary" 
                      placeholder="0"
                      value={newCompany.openRoles}
                      onChange={(e) => setNewCompany({...newCompany, openRoles: e.target.value})}
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                    />
                  </div>
                  <div className="col-12">
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Address
                    </label>
                    <input 
                      type="text" 
                      className="form-control form-control-sm bg-dark text-light border-secondary" 
                      placeholder="City, Country"
                      value={newCompany.address}
                      onChange={(e) => setNewCompany({...newCompany, address: e.target.value})}
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                    />
                  </div>
                  <div className="col-12">
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Website
                    </label>
                    <input 
                      type="text" 
                      className="form-control form-control-sm bg-dark text-light border-secondary" 
                      placeholder="https://company.com"
                      value={newCompany.website}
                      onChange={(e) => setNewCompany({...newCompany, website: e.target.value})}
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                    />
                  </div>
                  <div className="col-12">
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Description
                    </label>
                    <textarea 
                      rows={2}
                      className="form-control form-control-sm bg-dark text-light border-secondary" 
                      placeholder="Company description..."
                      value={newCompany.description}
                      onChange={(e) => setNewCompany({...newCompany, description: e.target.value})}
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px', resize: 'none' }}
                    />
                  </div>
                </div>

                <div className="mt-3 pt-3 border-top border-secondary d-flex gap-2 flex-wrap">
                  <button onClick={() => setShowEditModal(false)} type="button" className="btn btn-secondary flex-grow-1" style={{ fontSize: 'clamp(0.6rem, 1vw, 0.7rem)', padding: '0.35rem 0.7rem' }}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary flex-grow-1 shadow-lg shadow-primary/20" style={{ fontSize: 'clamp(0.6rem, 1vw, 0.7rem)', padding: '0.35rem 0.7rem' }} disabled={loading}>
                    {loading ? <Loader2 className="spinner-border spinner-border-sm" style={{ width: 'clamp(0.6rem, 1vw, 0.8rem)', height: 'clamp(0.6rem, 1vw, 0.8rem)' }} /> : <Save style={{ width: 'clamp(0.7rem, 1.2vw, 0.8rem)', height: 'clamp(0.7rem, 1.2vw, 0.8rem)' }} />}
                    {loading ? 'Updating...' : 'Update Company'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal - Responsive */}
      {showDetailsModal && selectedCompany && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ 
          zIndex: 9999, 
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(10px)',
          animation: 'fadeIn 0.3s ease',
          padding: '1rem'
        }}>
          <div className="card border-0 shadow-2xl rounded-4" style={{ 
            maxWidth: 'clamp(320px, 85vw, 500px)', 
            width: '100%', 
            maxHeight: '90vh', 
            overflowY: 'auto', 
            background: 'rgba(20,20,30,0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            <div className="card-body p-3 p-md-4">
              <div className="d-flex justify-content-between align-items-center mb-3 border-bottom border-secondary pb-3">
                <h5 className="text-light fw-bold m-0 d-flex align-items-center gap-2" style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)' }}>
                  <Building2 className="text-primary" style={{ 
                    width: 'clamp(0.9rem, 2vw, 1.2rem)', 
                    height: 'clamp(0.9rem, 2vw, 1.2rem)' 
                  }} />
                  Company Details
                </h5>
                <button onClick={() => setShowDetailsModal(false)} className="btn btn-close btn-close-white" style={{ fontSize: 'clamp(0.6rem, 1vw, 0.9rem)' }}></button>
              </div>

              <div className="text-center mb-3">
                <div className="d-inline-flex align-items-center justify-content-center rounded-circle" style={{ 
                  width: 'clamp(50px, 10vw, 64px)', 
                  height: 'clamp(50px, 10vw, 64px)',
                  background: getCompanyColor(selectedCompany?.name),
                  fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
                  fontWeight: 'bold',
                  color: '#fff',
                  boxShadow: `0 4px 20px ${getCompanyColor(selectedCompany?.name)}50`
                }}>
                  {getCompanyInitial(selectedCompany?.name)}
                </div>
                <h5 className="text-light fw-bold mt-2" style={{ fontSize: 'clamp(0.9rem, 2vw, 1.05rem)' }}>
                  {selectedCompany?.name}
                </h5>
                <div className="d-flex align-items-center justify-content-center gap-2 flex-wrap">
                  <span className={`badge bg-${getTierColor(selectedCompany?.tier)} bg-opacity-10 text-${getTierColor(selectedCompany?.tier)} border border-${getTierColor(selectedCompany?.tier)}`}
                        style={{ fontSize: 'clamp(0.45rem, 0.8vw, 0.55rem)' }}>
                    {selectedCompany?.tier}
                  </span>
                  <span className="badge bg-secondary bg-opacity-20 text-secondary border border-secondary" style={{ fontSize: 'clamp(0.45rem, 0.8vw, 0.55rem)' }}>
                    {selectedCompany?.industry || 'N/A'}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="d-flex flex-wrap justify-content-between p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <span className="text-secondary" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>
                    <Mail className="me-1" style={{ 
                      width: 'clamp(0.7rem, 1.2vw, 0.8rem)', 
                      height: 'clamp(0.7rem, 1.2vw, 0.8rem)' 
                    }} /> Email
                  </span>
                  <span className="text-light" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>{selectedCompany?.email}</span>
                </div>
                <div className="d-flex flex-wrap justify-content-between p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <span className="text-secondary" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>
                    <Phone className="me-1" style={{ 
                      width: 'clamp(0.7rem, 1.2vw, 0.8rem)', 
                      height: 'clamp(0.7rem, 1.2vw, 0.8rem)' 
                    }} /> Phone
                  </span>
                  <span className="text-light" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>{selectedCompany?.phone || 'N/A'}</span>
                </div>
                <div className="d-flex flex-wrap justify-content-between p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <span className="text-secondary" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>
                    <MapPin className="me-1" style={{ 
                      width: 'clamp(0.7rem, 1.2vw, 0.8rem)', 
                      height: 'clamp(0.7rem, 1.2vw, 0.8rem)' 
                    }} /> Address
                  </span>
                  <span className="text-light" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>{selectedCompany?.address || 'N/A'}</span>
                </div>
                <div className="d-flex flex-wrap justify-content-between p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <span className="text-secondary" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>
                    <Globe className="me-1" style={{ 
                      width: 'clamp(0.7rem, 1.2vw, 0.8rem)', 
                      height: 'clamp(0.7rem, 1.2vw, 0.8rem)' 
                    }} /> Website
                  </span>
                  {selectedCompany?.website ? (
                    <a href={selectedCompany.website} target="_blank" rel="noopener noreferrer" className="text-primary text-decoration-none small" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>
                      Visit
                    </a>
                  ) : (
                    <span className="text-light" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>N/A</span>
                  )}
                </div>
                <div className="d-flex flex-wrap justify-content-between p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <span className="text-secondary" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>
                    <Award className="me-1" style={{ 
                      width: 'clamp(0.7rem, 1.2vw, 0.8rem)', 
                      height: 'clamp(0.7rem, 1.2vw, 0.8rem)' 
                    }} /> Min CGPA
                  </span>
                  <span className="text-primary fw-bold" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>{selectedCompany?.minCgpa || 'N/A'}</span>
                </div>
                <div className="d-flex flex-wrap justify-content-between p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <span className="text-secondary" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>
                    <Users className="me-1" style={{ 
                      width: 'clamp(0.7rem, 1.2vw, 0.8rem)', 
                      height: 'clamp(0.7rem, 1.2vw, 0.8rem)' 
                    }} /> Open Roles
                  </span>
                  <span className="text-success fw-bold" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>{selectedCompany?.openRoles || 0}</span>
                </div>
                {selectedCompany?.description && (
                  <div className="p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <span className="text-secondary d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Description
                    </span>
                    <span className="text-light small" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>{selectedCompany.description}</span>
                  </div>
                )}
              </div>

              <div className="mt-3 pt-3 border-top border-secondary d-flex gap-2 flex-wrap">
                <button onClick={() => setShowDetailsModal(false)} className="btn btn-secondary flex-grow-1" style={{ fontSize: 'clamp(0.6rem, 1vw, 0.7rem)', padding: '0.35rem 0.7rem' }}>
                  Close
                </button>
                <button 
                  onClick={() => {
                    setShowDetailsModal(false);
                    handleEditCompany(selectedCompany);
                  }}
                  className="btn btn-warning flex-grow-1 d-flex align-items-center justify-content-center gap-1 shadow-lg shadow-warning/20"
                  style={{ fontSize: 'clamp(0.6rem, 1vw, 0.7rem)', padding: '0.35rem 0.7rem' }}
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
        
        .space-y-1.5 > * + * {
          margin-top: 0.375rem;
        }
        
        .space-y-2 > * + * {
          margin-top: 0.5rem;
        }

        .min-w-0 {
          min-width: 0;
        }
        
        .text-truncate {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        
        .card {
          transition: all 0.3s ease;
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

        /* Scrollbar */
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

        @media (max-width: 576px) {
          .rounded-3 {
            border-radius: 8px !important;
          }
          .rounded-md-4 {
            border-radius: 10px !important;
          }
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
        }

        @media (min-width: 768px) and (max-width: 991px) {
          .card-body {
            padding: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
}