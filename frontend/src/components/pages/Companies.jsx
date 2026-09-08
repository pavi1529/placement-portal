import React, { useState, useEffect } from 'react';
import { 
  Building2, MapPin, Globe, Mail, Phone, Users, 
  Search, Filter, Star, Briefcase, TrendingUp,
  Award, CheckCircle, ExternalLink, Loader2,
  Heart, Share2, Link, Sparkles, Zap, Crown,
  Clock, Calendar, DollarSign, Code, Layers,
  Bookmark, Eye, ArrowUpRight, RefreshCw
} from 'lucide-react';

const API_URL = 'http://localhost:5000/api';

export default function Companies({ token }) {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTier, setFilterTier] = useState('ALL');
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [bookmarkedCompanies, setBookmarkedCompanies] = useState([]);

  const sampleCompanies = [
    {
      _id: '1',
      name: 'Google',
      tier: 'Product',
      industry: 'Technology',
      location: 'Bangalore, India',
      email: 'careers@google.com',
      phone: '+91 9876543210',
      website: 'https://google.com',
      description: 'Global technology company specializing in internet services and products.',
      minCgpa: '8.0',
      openRoles: 15,
      color: '#4285F4',
      highlights: ['Top Tier', 'Global Presence', 'Great Culture']
    },
    {
      _id: '2',
      name: 'Microsoft',
      tier: 'Product',
      industry: 'Technology',
      location: 'Hyderabad, India',
      email: 'hr@microsoft.com',
      phone: '+91 9876543211',
      website: 'https://microsoft.com',
      description: 'Microsoft Corporation is an American multinational technology corporation.',
      minCgpa: '7.5',
      openRoles: 10,
      color: '#00A4EF',
      highlights: ['Fortune 500', 'Innovation Leader', 'Great Benefits']
    },
    {
      _id: '3',
      name: 'Amazon',
      tier: 'Product',
      industry: 'E-commerce',
      location: 'Chennai, India',
      email: 'hr@amazon.com',
      phone: '+91 9876543212',
      website: 'https://amazon.com',
      description: 'Amazon is a multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.',
      minCgpa: '7.0',
      openRoles: 20,
      color: '#FF9900',
      highlights: ['Market Leader', 'Fast Growth', 'Diverse Roles']
    },
    {
      _id: '4',
      name: 'Zoho',
      tier: 'Product',
      industry: 'Software',
      location: 'Chennai, India',
      email: 'careers@zoho.com',
      phone: '+91 9876543213',
      website: 'https://zoho.com',
      description: 'Zoho Corporation is an Indian multinational technology company that makes computer software and web-based business tools.',
      minCgpa: '7.0',
      openRoles: 8,
      color: '#E4252D',
      highlights: ['Product Based', 'Employee Friendly', 'Good Work Life']
    },
    {
      _id: '5',
      name: 'PayPal',
      tier: 'Product',
      industry: 'Fintech',
      location: 'Bangalore, India',
      email: 'careers@paypal.com',
      phone: '+91 9876543214',
      website: 'https://paypal.com',
      description: 'PayPal is an American company operating a worldwide online payments system.',
      minCgpa: '8.0',
      openRoles: 5,
      color: '#003087',
      highlights: ['Fintech Leader', 'Global Brand', 'Good Compensation']
    },
    {
      _id: '6',
      name: 'Cognizant',
      tier: 'Services',
      industry: 'IT Services',
      location: 'Multiple Locations',
      email: 'hr@cognizant.com',
      phone: '+91 9876543215',
      website: 'https://cognizant.com',
      description: 'Cognizant is an American multinational technology company that provides IT services, including digital, technology, consulting, and operations services.',
      minCgpa: '6.0',
      openRoles: 50,
      color: '#1A4C7A',
      highlights: ['Global Leader', 'Training Focus', 'Large Hiring']
    },
    {
      _id: '7',
      name: 'Freshworks',
      tier: 'Product',
      industry: 'SaaS',
      location: 'Chennai, India',
      email: 'careers@freshworks.com',
      phone: '+91 9876543216',
      website: 'https://freshworks.com',
      description: 'Freshworks is a customer engagement software company that provides CRM, support, and marketing solutions.',
      minCgpa: '7.0',
      openRoles: 12,
      color: '#FF6D00',
      highlights: ['NASDAQ Listed', 'Product Based', 'Innovative']
    },
    {
      _id: '8',
      name: 'Deloitte',
      tier: 'Services',
      industry: 'Consulting',
      location: 'Mumbai, India',
      email: 'hr@deloitte.com',
      phone: '+91 9876543217',
      website: 'https://deloitte.com',
      description: 'Deloitte is a multinational professional services network that provides audit, consulting, tax, and advisory services.',
      minCgpa: '7.5',
      openRoles: 30,
      color: '#0033A0',
      highlights: ['Big 4', 'Global Network', 'Professional Growth']
    },
    {
      _id: '9',
      name: 'Infosys',
      tier: 'Services',
      industry: 'IT Services',
      location: 'Pune, India',
      email: 'hr@infosys.com',
      phone: '+91 9876543218',
      website: 'https://infosys.com',
      description: 'Infosys is an Indian multinational information technology company that provides business consulting, information technology and outsourcing services.',
      minCgpa: '6.0',
      openRoles: 100,
      color: '#0033A0',
      highlights: ['Global Presence', 'Training Programs', 'Large Campus']
    },
    {
      _id: '10',
      name: 'TCS',
      tier: 'Services',
      industry: 'IT Services',
      location: 'Mumbai, India',
      email: 'hr@tcs.com',
      phone: '+91 9876543219',
      website: 'https://tcs.com',
      description: 'Tata Consultancy Services is an Indian multinational information technology services and consulting company.',
      minCgpa: '6.0',
      openRoles: 75,
      color: '#0D6E9E',
      highlights: ['Tata Group', 'Global Leader', 'Stable Career']
    }
  ];

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/companies`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      
      if (data.success && data.data && data.data.length > 0) {
        setCompanies(data.data);
      } else {
        setCompanies(sampleCompanies);
      }
    } catch (error) {
      console.error('Error fetching companies:', error);
      setCompanies(sampleCompanies);
    } finally {
      setLoading(false);
    }
  };

  const toggleBookmark = (companyId) => {
    if (bookmarkedCompanies.includes(companyId)) {
      setBookmarkedCompanies(bookmarkedCompanies.filter(id => id !== companyId));
    } else {
      setBookmarkedCompanies([...bookmarkedCompanies, companyId]);
    }
  };

  const isBookmarked = (companyId) => {
    return bookmarkedCompanies.includes(companyId);
  };

  useEffect(() => {
    if (token) {
      fetchCompanies();
    } else {
      setCompanies(sampleCompanies);
    }
  }, [token]);

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company?.name?.toLowerCase().includes(searchQuery?.toLowerCase() || '') ||
                          company?.industry?.toLowerCase().includes(searchQuery?.toLowerCase() || '') ||
                          company?.location?.toLowerCase().includes(searchQuery?.toLowerCase() || '');
    const matchesTier = filterTier === 'ALL' || company?.tier === filterTier;
    return matchesSearch && matchesTier;
  });

  const totalCompanies = companies.length;
  const productCompanies = companies.filter(c => c?.tier === 'Product').length;
  const serviceCompanies = companies.filter(c => c?.tier === 'Services').length;
  const startupCompanies = companies.filter(c => c?.tier === 'Startup').length;
  const totalOpenRoles = companies.reduce((sum, c) => sum + (c?.openRoles || 0), 0);

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
      case 'Product': return <Star className="text-primary" style={{ width: 'clamp(0.6rem, 1vw, 0.7rem)', height: 'clamp(0.6rem, 1vw, 0.7rem)' }} />;
      case 'Services': return <Briefcase className="text-success" style={{ width: 'clamp(0.6rem, 1vw, 0.7rem)', height: 'clamp(0.6rem, 1vw, 0.7rem)' }} />;
      case 'Startup': return <TrendingUp className="text-warning" style={{ width: 'clamp(0.6rem, 1vw, 0.7rem)', height: 'clamp(0.6rem, 1vw, 0.7rem)' }} />;
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
      'Deloitte': '#0033A0',
      'Infosys': '#0033A0',
      'TCS': '#0D6E9E'
    };
    return colors[name] || '#4f46e5';
  };

  const getCompanyInitial = (name) => {
    return name?.charAt(0) || 'C';
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <Loader2 className="spinner-border text-primary" style={{ width: 'clamp(1.5rem, 3vw, 2rem)', height: 'clamp(1.5rem, 3vw, 2rem)' }} />
        <p className="text-secondary mt-2" style={{ fontSize: 'clamp(0.75rem, 1.2vw, 0.85rem)' }}>Loading companies...</p>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3 mb-md-4">
        <div>
          <h5 className="text-dark fw-bold m-0" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)' }}>
            Partner Companies
          </h5>
          <p className="text-secondary small m-0" style={{ fontSize: 'clamp(0.6rem, 1vw, 0.7rem)' }}>
            Connect with top companies hiring fresh talent
          </p>
        </div>
        <div className="d-flex align-items-center gap-2">
          <span className="badge bg-success bg-opacity-10 text-success border border-success px-2 px-md-3 py-1 py-md-2" style={{ fontSize: 'clamp(0.5rem, 0.9vw, 0.6rem)' }}>
            <Zap style={{ width: 'clamp(0.5rem, 0.8vw, 0.7rem)', height: 'clamp(0.5rem, 0.8vw, 0.7rem)', marginRight: '0.2rem' }} />
            {totalOpenRoles} Open Roles
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row g-2 g-md-3 mb-3 mb-md-4">
        {[
          { label: "Total Companies", value: totalCompanies, color: "primary", icon: Building2 },
          { label: "Product", value: productCompanies, color: "primary", icon: Star },
          { label: "Services", value: serviceCompanies, color: "success", icon: Briefcase },
          { label: "Startups", value: startupCompanies, color: "warning", icon: TrendingUp },
          { label: "Open Roles", value: totalOpenRoles, color: "info", icon: Users },
        ].map((stat, i) => {
          const Icon = stat.icon;
          const bgColors = {
            primary: 'rgba(59,130,246,0.08)',
            success: 'rgba(34,197,94,0.08)',
            warning: 'rgba(234,179,8,0.08)',
            info: 'rgba(6,182,212,0.08)'
          };
          return (
            <div key={i} className="col-6 col-lg">
              <div className="card border-0 shadow-sm rounded-3 rounded-md-4 h-100" style={{ background: '#ffffff', border: '1px solid #e9ecef', transition: 'all 0.3s ease' }}
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

      {/* Search & Filter */}
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
                value={filterTier}
                onChange={(e) => setFilterTier(e.target.value)}
                style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.75rem)', width: 'clamp(90px, 15vw, 140px)', outline: 'none', padding: '0.1rem 0.4rem' }}
              >
                <option value="ALL">All Tiers</option>
                <option value="Product">Product</option>
                <option value="Services">Services</option>
                <option value="Startup">Startup</option>
              </select>
            </div>
            <button 
              className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1 shadow-sm"
              onClick={fetchCompanies}
              style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.7rem)', padding: '0.2rem 0.5rem' }}
            >
              <RefreshCw style={{ width: 'clamp(0.6rem, 1vw, 0.8rem)', height: 'clamp(0.6rem, 1vw, 0.8rem)' }} /> 
              <span className="d-none d-sm-inline">Refresh</span>
            </button>
            <span className="text-secondary small ms-auto d-none d-md-block" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.65rem)' }}>
              {filteredCompanies.length} companies
            </span>
          </div>
        </div>
      </div>

      {/* Companies Grid */}
      {filteredCompanies.length === 0 ? (
        <div className="card border-0 shadow-sm rounded-4 text-center p-3 p-md-5" style={{ background: '#ffffff', border: '1px solid #e9ecef' }}>
          <Building2 className="text-secondary mx-auto" style={{ width: 'clamp(2rem, 4vw, 3rem)', height: 'clamp(2rem, 4vw, 3rem)' }} />
          <h6 className="text-secondary mt-3" style={{ fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>No companies found</h6>
          <p className="text-secondary small" style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)' }}>Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="row g-2 g-md-3 g-lg-4">
          {filteredCompanies.map((company, index) => {
            const isBookmarkedCompany = isBookmarked(company?._id);
            const companyColor = getCompanyColor(company?.name);
            const companyInitial = getCompanyInitial(company?.name);
            
            return (
              <div key={company?._id || index} className="col-sm-6 col-xl-4">
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
                    {/* Company Logo & Header */}
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
                        <h6 className="fw-bold text-dark m-0 text-truncate" style={{ fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)' }}>
                          {company?.name}
                        </h6>
                        <span className="text-secondary d-flex align-items-center gap-1" style={{ fontSize: 'clamp(0.45rem, 0.8vw, 0.55rem)' }}>
                          <MapPin style={{ width: 'clamp(0.5rem, 0.8vw, 0.6rem)', height: 'clamp(0.5rem, 0.8vw, 0.6rem)' }} /> 
                          {company?.location || 'N/A'}
                        </span>
                      </div>
                      <button 
                        onClick={() => toggleBookmark(company?._id)}
                        className="btn btn-sm p-0 transition-all hover:scale-110 flex-shrink-0"
                        style={{ background: 'transparent', border: 'none' }}
                      >
                        {isBookmarkedCompany ? (
                          <Heart className="text-danger" style={{ width: 'clamp(0.7rem, 1.2vw, 0.9rem)', height: 'clamp(0.7rem, 1.2vw, 0.9rem)', fill: '#ef4444' }} />
                        ) : (
                          <Heart className="text-secondary" style={{ width: 'clamp(0.7rem, 1.2vw, 0.9rem)', height: 'clamp(0.7rem, 1.2vw, 0.9rem)' }} />
                        )}
                      </button>
                    </div>

                    {/* Company Details */}
                    <div className="space-y-1.5 flex-grow-1">
                      <div className="d-flex align-items-center gap-2 p-1 p-md-1.5 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                        <Briefcase className="text-primary" style={{ width: 'clamp(0.6rem, 1vw, 0.7rem)', height: 'clamp(0.6rem, 1vw, 0.7rem)' }} />
                        <span className="text-secondary small flex-grow-1" style={{ fontSize: 'clamp(0.5rem, 0.9vw, 0.6rem)' }}>Industry</span>
                        <span className="text-dark fw-bold" style={{ fontSize: 'clamp(0.55rem, 1vw, 0.65rem)' }}>{company?.industry || 'N/A'}</span>
                      </div>
                      <div className="d-flex align-items-center gap-2 p-1 p-md-1.5 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                        <Award className="text-warning" style={{ width: 'clamp(0.6rem, 1vw, 0.7rem)', height: 'clamp(0.6rem, 1vw, 0.7rem)' }} />
                        <span className="text-secondary small flex-grow-1" style={{ fontSize: 'clamp(0.5rem, 0.9vw, 0.6rem)' }}>Min CGPA</span>
                        <span className="text-primary fw-bold" style={{ fontSize: 'clamp(0.55rem, 1vw, 0.65rem)' }}>{company?.minCgpa || 'N/A'}+</span>
                      </div>
                      <div className="d-flex align-items-center gap-2 p-1 p-md-1.5 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                        <Users className="text-success" style={{ width: 'clamp(0.6rem, 1vw, 0.7rem)', height: 'clamp(0.6rem, 1vw, 0.7rem)' }} />
                        <span className="text-secondary small flex-grow-1" style={{ fontSize: 'clamp(0.5rem, 0.9vw, 0.6rem)' }}>Open Roles</span>
                        <span className="text-success fw-bold" style={{ fontSize: 'clamp(0.55rem, 1vw, 0.65rem)' }}>{company?.openRoles || 0}</span>
                      </div>
                    </div>

                    {/* Highlights */}
                    {company?.highlights && company.highlights.length > 0 && (
                      <div className="mt-2">
                        <div className="d-flex flex-wrap gap-1">
                          {company.highlights.slice(0, 3).map((highlight, i) => (
                            <span key={i} className="badge bg-light text-secondary border border-light" style={{ fontSize: 'clamp(0.35rem, 0.6vw, 0.45rem)' }}>
                              <Sparkles style={{ width: 'clamp(0.3rem, 0.5vw, 0.4rem)', height: 'clamp(0.3rem, 0.5vw, 0.4rem)', marginRight: '0.1rem' }} />
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tier Badge & Actions */}
                    <div className="mt-3 pt-2 pt-md-3 border-top border-light d-flex gap-2">
                      <span className={`badge bg-${getTierColor(company?.tier)} bg-opacity-10 text-${getTierColor(company?.tier)} border border-${getTierColor(company?.tier)} d-flex align-items-center gap-1`} style={{ fontSize: 'clamp(0.4rem, 0.7vw, 0.5rem)' }}>
                        {getTierIcon(company?.tier)} {company?.tier || 'N/A'}
                      </span>
                      <button 
                        onClick={() => { setSelectedCompany(company); setShowDetails(true); }}
                        className="btn btn-outline-primary btn-sm flex-grow-1 d-flex align-items-center justify-content-center gap-1 shadow-sm ms-auto"
                        style={{ fontSize: 'clamp(0.45rem, 0.7vw, 0.6rem)', borderRadius: '8px', padding: '0.25rem 0.4rem' }}
                      >
                        <Eye style={{ width: 'clamp(0.5rem, 0.8vw, 0.7rem)', height: 'clamp(0.5rem, 0.8vw, 0.7rem)' }} /> 
                        <span className="d-none d-sm-inline">View Details</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Company Details Modal */}
      {showDetails && selectedCompany && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ 
          zIndex: 9999, 
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(5px)',
          padding: '1rem'
        }}
        onClick={() => setShowDetails(false)}
        >
          <div className="card border-0 shadow-lg rounded-4" style={{ 
            maxWidth: 'clamp(320px, 85vw, 550px)', 
            width: '100%', 
            maxHeight: '90vh', 
            overflowY: 'auto', 
            background: '#ffffff'
          }}
          onClick={(e) => e.stopPropagation()}
          >
            <div className="card-body p-3 p-md-4">
              <div className="d-flex justify-content-between align-items-center mb-3 border-bottom border-light pb-3">
                <h5 className="text-dark fw-bold m-0 d-flex align-items-center gap-2" style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)' }}>
                  <Building2 className="text-primary" style={{ width: 'clamp(0.9rem, 2vw, 1.2rem)', height: 'clamp(0.9rem, 2vw, 1.2rem)' }} />
                  Company Details
                </h5>
                <button onClick={() => setShowDetails(false)} className="btn btn-close" style={{ fontSize: 'clamp(0.6rem, 1vw, 0.9rem)' }}></button>
              </div>

              {/* Company Header */}
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
                <h5 className="text-dark fw-bold mt-2" style={{ fontSize: 'clamp(0.9rem, 2vw, 1.05rem)' }}>
                  {selectedCompany?.name}
                </h5>
                <div className="d-flex align-items-center justify-content-center gap-2 flex-wrap">
                  <span className={`badge bg-${getTierColor(selectedCompany?.tier)} bg-opacity-10 text-${getTierColor(selectedCompany?.tier)} border border-${getTierColor(selectedCompany?.tier)}`}
                        style={{ fontSize: 'clamp(0.45rem, 0.8vw, 0.55rem)' }}>
                    {selectedCompany?.tier}
                  </span>
                  <span className="badge bg-light text-secondary border border-light" style={{ fontSize: 'clamp(0.45rem, 0.8vw, 0.55rem)' }}>
                    {selectedCompany?.industry || 'N/A'}
                  </span>
                </div>
              </div>

              {/* Details Grid */}
              <div className="row g-2 mb-3">
                <div className="col-6">
                  <div className="p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                    <span className="text-secondary small d-block" style={{ fontSize: 'clamp(0.4rem, 0.7vw, 0.55rem)' }}>Location</span>
                    <span className="text-dark" style={{ fontSize: 'clamp(0.55rem, 1vw, 0.65rem)' }}>{selectedCompany?.location || 'N/A'}</span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                    <span className="text-secondary small d-block" style={{ fontSize: 'clamp(0.4rem, 0.7vw, 0.55rem)' }}>Min CGPA</span>
                    <span className="text-primary fw-bold" style={{ fontSize: 'clamp(0.55rem, 1vw, 0.65rem)' }}>{selectedCompany?.minCgpa || 'N/A'}+</span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                    <span className="text-secondary small d-block" style={{ fontSize: 'clamp(0.4rem, 0.7vw, 0.55rem)' }}>Open Roles</span>
                    <span className="text-success fw-bold" style={{ fontSize: 'clamp(0.55rem, 1vw, 0.65rem)' }}>{selectedCompany?.openRoles || 0}</span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                    <span className="text-secondary small d-block" style={{ fontSize: 'clamp(0.4rem, 0.7vw, 0.55rem)' }}>Phone</span>
                    <span className="text-dark" style={{ fontSize: 'clamp(0.55rem, 1vw, 0.65rem)' }}>{selectedCompany?.phone || 'N/A'}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              {selectedCompany?.description && (
                <div className="mb-2 p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                  <span className="text-secondary small d-block" style={{ fontSize: 'clamp(0.4rem, 0.7vw, 0.55rem)' }}>Description</span>
                  <p className="text-dark small mb-0" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>{selectedCompany.description}</p>
                </div>
              )}

              {/* Contact */}
              <div className="space-y-2">
                {selectedCompany?.email && (
                  <div className="d-flex flex-wrap align-items-center gap-2 p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                    <Mail className="text-info" style={{ width: 'clamp(0.7rem, 1.2vw, 0.8rem)', height: 'clamp(0.7rem, 1.2vw, 0.8rem)' }} />
                    <span className="text-secondary small flex-grow-1" style={{ fontSize: 'clamp(0.5rem, 0.9vw, 0.6rem)' }}>Email</span>
                    <span className="text-dark small" style={{ fontSize: 'clamp(0.5rem, 0.9vw, 0.6rem)' }}>{selectedCompany.email}</span>
                  </div>
                )}
                {selectedCompany?.website && (
                  <div className="d-flex flex-wrap align-items-center gap-2 p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.02)' }}>
                    <Globe className="text-primary" style={{ width: 'clamp(0.7rem, 1.2vw, 0.8rem)', height: 'clamp(0.7rem, 1.2vw, 0.8rem)' }} />
                    <span className="text-secondary small flex-grow-1" style={{ fontSize: 'clamp(0.5rem, 0.9vw, 0.6rem)' }}>Website</span>
                    <a href={selectedCompany.website} target="_blank" rel="noopener noreferrer" className="text-primary small text-decoration-none" style={{ fontSize: 'clamp(0.5rem, 0.9vw, 0.6rem)' }}>
                      Visit <ExternalLink style={{ width: 'clamp(0.5rem, 0.8vw, 0.6rem)', height: 'clamp(0.5rem, 0.8vw, 0.6rem)' }} />
                    </a>
                  </div>
                )}
              </div>

              {/* Highlights */}
              {selectedCompany?.highlights && selectedCompany.highlights.length > 0 && (
                <div className="mt-2">
                  <span className="text-secondary small d-block" style={{ fontSize: 'clamp(0.4rem, 0.7vw, 0.55rem)' }}>Highlights</span>
                  <div className="d-flex flex-wrap gap-1 mt-1">
                    {selectedCompany.highlights.map((highlight, i) => (
                      <span key={i} className="badge bg-light text-secondary border border-light" style={{ fontSize: 'clamp(0.45rem, 0.7vw, 0.55rem)' }}>
                        <Sparkles style={{ width: 'clamp(0.4rem, 0.7vw, 0.6rem)', height: 'clamp(0.4rem, 0.7vw, 0.6rem)', marginRight: '0.1rem' }} />
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="mt-3 pt-3 border-top border-light d-flex gap-2 flex-wrap">
                <button onClick={() => setShowDetails(false)} className="btn btn-secondary flex-grow-1" style={{ fontSize: 'clamp(0.6rem, 1vw, 0.7rem)', padding: '0.35rem 0.7rem' }}>
                  Close
                </button>
                <button className="btn btn-primary flex-grow-1 d-flex align-items-center justify-content-center gap-1" style={{ fontSize: 'clamp(0.6rem, 1vw, 0.7rem)', padding: '0.35rem 0.7rem' }}>
                  <ExternalLink style={{ width: 'clamp(0.7rem, 1.2vw, 0.9rem)', height: 'clamp(0.7rem, 1.2vw, 0.9rem)' }} /> 
                  Visit Website
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

        /* Responsive overrides */
        @media (max-width: 576px) {
          .card-body {
            padding: 0.75rem !important;
          }
          .gap-1 {
            gap: 0.25rem !important;
          }
          .btn {
            padding: 0.2rem 0.4rem !important;
          }
          .badge {
            padding: 0.1rem 0.35rem !important;
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