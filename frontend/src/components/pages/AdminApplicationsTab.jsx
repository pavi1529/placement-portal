import React, { useState } from 'react';
import { 
  Users, Search, Filter, Eye, CheckCircle, 
  XCircle, AlertCircle, Clock, Award, Briefcase,
  UserCheck, UserX, UserPlus, Calendar, TrendingUp,
  ArrowUpRight, ArrowDownRight, Sparkles, Plus,
  Trash2, Edit2, Save, X, HelpCircle, FileText,
  User, Mail, Phone, MapPin, Building, GraduationCap,
  UserCircle, AtSign
} from 'lucide-react';

export default function AdminApplicationsTab({ students, handleShortlist }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showAddApplicationModal, setShowAddApplicationModal] = useState(false);
  const [newApplication, setNewApplication] = useState({
    name: '',
    email: '',
    phone: '',
    department: 'CSE',
    year: '3rd Year',
    cgpa: '',
    appliedFor: '',
    status: 'Applied'
  });

  // Sample data if students prop is empty
  const sampleStudents = [
    { id: 1, name: 'Pavithra C', dept: 'CSE', status: 'Selected' },
    { id: 2, name: 'John Doe', dept: 'IT', status: 'Shortlisted' },
    { id: 3, name: 'Jane Smith', dept: 'ECE', status: 'Applied' },
    { id: 4, name: 'Raj Kumar', dept: 'CSE', status: 'Rejected' },
  ];

  const displayStudents = students?.length > 0 ? students : sampleStudents;

  const totalApplications = displayStudents.length;
  const selectedCount = displayStudents.filter(s => s.status === 'Selected').length;
  const shortlistedCount = displayStudents.filter(s => s.status === 'Shortlisted').length;
  const appliedCount = displayStudents.filter(s => s.status === 'Applied').length;
  const rejectedCount = displayStudents.filter(s => s.status === 'Rejected').length;

  const filteredStudents = displayStudents.filter(student => {
    const matchesSearch = student.name?.toLowerCase().includes(searchQuery?.toLowerCase() || '') ||
                          student.dept?.toLowerCase().includes(searchQuery?.toLowerCase() || '');
    const matchesStatus = filterStatus === 'ALL' || student.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusConfig = (status) => {
    switch(status) {
      case 'Selected': return { color: 'success', icon: CheckCircle, bg: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.2)' };
      case 'Shortlisted': return { color: 'info', icon: AlertCircle, bg: 'rgba(6,182,212,0.1)', border: 'rgba(6,182,212,0.2)' };
      case 'Applied': return { color: 'warning', icon: Clock, bg: 'rgba(234,179,8,0.1)', border: 'rgba(234,179,8,0.2)' };
      case 'Rejected': return { color: 'danger', icon: XCircle, bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.2)' };
      default: return { color: 'secondary', icon: AlertCircle, bg: 'rgba(148,163,184,0.1)', border: 'rgba(148,163,184,0.2)' };
    }
  };

  const handleViewStudent = (student) => {
    setSelectedStudent(student);
    setShowDetailModal(true);
  };

  const handleAddApplication = () => {
    if (!newApplication.name || !newApplication.email) {
      alert('Please fill in all required fields!');
      return;
    }
    alert('✅ Application added successfully!');
    setNewApplication({
      name: '',
      email: '',
      phone: '',
      department: 'CSE',
      year: '3rd Year',
      cgpa: '',
      appliedFor: '',
      status: 'Applied'
    });
    setShowAddApplicationModal(false);
  };

  return (
    <div className="animate-fadeIn">
      {/* Stats Cards - Responsive */}
      <div className="row g-2 g-md-3 mb-3 mb-md-4">
        {[
          { label: "Total Applications", value: totalApplications, color: "primary", icon: Users },
          { label: "Selected", value: selectedCount, color: "success", icon: CheckCircle },
          { label: "Shortlisted", value: shortlistedCount, color: "info", icon: AlertCircle },
          { label: "Applied", value: appliedCount, color: "warning", icon: Clock },
          { label: "Rejected", value: rejectedCount, color: "danger", icon: XCircle },
        ].map((stat, i) => {
          const Icon = stat.icon;
          const bgColors = {
            primary: 'rgba(59,130,246,0.08)',
            success: 'rgba(34,197,94,0.08)',
            info: 'rgba(6,182,212,0.08)',
            warning: 'rgba(234,179,8,0.08)',
            danger: 'rgba(239,68,68,0.08)'
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
                    <span className="text-secondary fw-bold text-uppercase" style={{ fontSize: 'clamp(0.4rem, 0.7vw, 0.55rem)' }}>
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

      {/* Search & Filter - Responsive */}
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
                  width: 'clamp(90px, 15vw, 140px)', 
                  outline: 'none', 
                  padding: '0.1rem 0.4rem',
                  color: '#ffffff !important'
                }}
              >
                <option value="ALL" style={{ background: '#1a1a2e', color: '#ffffff' }}>All Status</option>
                <option value="Selected" style={{ background: '#1a1a2e', color: '#ffffff' }}>Selected</option>
                <option value="Shortlisted" style={{ background: '#1a1a2e', color: '#ffffff' }}>Shortlisted</option>
                <option value="Applied" style={{ background: '#1a1a2e', color: '#ffffff' }}>Applied</option>
                <option value="Rejected" style={{ background: '#1a1a2e', color: '#ffffff' }}>Rejected</option>
              </select>
            </div>
            <button 
              onClick={() => setShowAddApplicationModal(true)}
              className="btn btn-primary btn-sm d-flex align-items-center gap-1 shadow-lg shadow-primary/20"
              style={{ 
                borderRadius: '10px', 
                fontWeight: '600',
                fontSize: 'clamp(0.6rem, 1vw, 0.7rem)',
                padding: 'clamp(0.2rem, 0.5vw, 0.3rem) clamp(0.6rem, 1.2vw, 0.8rem)'
              }}
            >
              <Plus style={{ 
                width: 'clamp(0.7rem, 1.2vw, 0.9rem)', 
                height: 'clamp(0.7rem, 1.2vw, 0.9rem)' 
              }} />
              <span className="d-none d-sm-inline">Add New</span>
            </button>
          </div>
        </div>
      </div>

      {/* Table - Responsive */}
      <div className="card border-0 shadow-sm rounded-3 rounded-md-4 overflow-hidden" style={{ 
        background: 'rgba(20,20,30,0.6)', 
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.05)'
      }}>
        <div className="table-responsive">
          <table className="table table-dark table-hover table-sm mb-0">
            <thead className="text-secondary text-uppercase" style={{ 
              fontSize: 'clamp(0.45rem, 0.7vw, 0.55rem)', 
              fontWeight: 'bold' 
            }}>
              <tr>
                <th className="p-2 p-md-3">Student</th>
                <th className="p-2 p-md-3 d-none d-sm-table-cell">Department</th>
                <th className="p-2 p-md-3">Status</th>
                <th className="p-2 p-md-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody style={{ fontSize: 'clamp(0.65rem, 1vw, 0.75rem)' }}>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student, index) => {
                  const statusConfig = getStatusConfig(student.status);
                  const StatusIcon = statusConfig.icon;
                  return (
                    <tr 
                      key={student.id} 
                      className="transition-all hover:bg-white/5"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <td className="p-2 p-md-3">
                        <div className="d-flex align-items-center gap-2">
                          <div className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0" style={{ 
                            width: 'clamp(28px, 4vw, 32px)', 
                            height: 'clamp(28px, 4vw, 32px)',
                            background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                            fontSize: 'clamp(0.6rem, 1vw, 0.7rem)',
                            fontWeight: 'bold',
                            color: '#fff'
                          }}>
                            {student.name?.charAt(0) || 'S'}
                          </div>
                          <div className="min-w-0">
                            <span className="fw-bold text-light d-block text-truncate" style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)' }}>
                              {student.name}
                            </span>
                            <span className="text-secondary d-block d-sm-none" style={{ fontSize: 'clamp(0.45rem, 0.7vw, 0.55rem)' }}>
                              {student.dept}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="p-2 p-md-3 d-none d-sm-table-cell">
                        <span className="badge bg-secondary bg-opacity-10 text-secondary border border-secondary" style={{ fontSize: 'clamp(0.45rem, 0.7vw, 0.55rem)' }}>
                          {student.dept}
                        </span>
                      </td>
                      <td className="p-2 p-md-3">
                        <span className={`badge bg-${statusConfig.color} bg-opacity-10 text-${statusConfig.color} border border-${statusConfig.color} d-inline-flex align-items-center gap-1 px-2 px-md-3 py-1 py-md-2`} style={{ 
                          fontSize: 'clamp(0.4rem, 0.7vw, 0.55rem)' 
                        }}>
                          <StatusIcon style={{ 
                            width: 'clamp(0.5rem, 0.8vw, 0.7rem)', 
                            height: 'clamp(0.5rem, 0.8vw, 0.7rem)' 
                          }} />
                          {student.status}
                        </span>
                      </td>
                      <td className="p-2 p-md-3 text-center">
                        <div className="d-flex gap-1 justify-content-center flex-wrap">
                          <button 
                            onClick={() => handleViewStudent(student)}
                            className="btn btn-sm btn-outline-info d-flex align-items-center gap-1 shadow-sm"
                            style={{ 
                              borderRadius: '8px',
                              fontSize: 'clamp(0.45rem, 0.7vw, 0.55rem)',
                              padding: 'clamp(0.15rem, 0.3vw, 0.25rem) clamp(0.3rem, 0.5vw, 0.4rem)'
                            }}
                          >
                            <Eye style={{ 
                              width: 'clamp(0.5rem, 0.8vw, 0.7rem)', 
                              height: 'clamp(0.5rem, 0.8vw, 0.7rem)' 
                            }} />
                          </button>
                          <button 
                            onClick={() => handleShortlist && handleShortlist(student.id, 'Shortlisted')} 
                            className="btn btn-sm btn-outline-info d-flex align-items-center gap-1 shadow-sm"
                            style={{ 
                              borderRadius: '8px',
                              fontSize: 'clamp(0.45rem, 0.7vw, 0.55rem)',
                              padding: 'clamp(0.15rem, 0.3vw, 0.25rem) clamp(0.3rem, 0.5vw, 0.4rem)'
                            }}
                          >
                            <UserCheck style={{ 
                              width: 'clamp(0.5rem, 0.8vw, 0.7rem)', 
                              height: 'clamp(0.5rem, 0.8vw, 0.7rem)' 
                            }} />
                            <span className="d-none d-sm-inline" style={{ fontSize: 'clamp(0.4rem, 0.6vw, 0.55rem)' }}>Shortlist</span>
                          </button>
                          <button 
                            onClick={() => handleShortlist && handleShortlist(student.id, 'Selected')} 
                            className="btn btn-sm btn-outline-success d-flex align-items-center gap-1 shadow-sm"
                            style={{ 
                              borderRadius: '8px',
                              fontSize: 'clamp(0.45rem, 0.7vw, 0.55rem)',
                              padding: 'clamp(0.15rem, 0.3vw, 0.25rem) clamp(0.3rem, 0.5vw, 0.4rem)'
                            }}
                          >
                            <UserPlus style={{ 
                              width: 'clamp(0.5rem, 0.8vw, 0.7rem)', 
                              height: 'clamp(0.5rem, 0.8vw, 0.7rem)' 
                            }} />
                            <span className="d-none d-sm-inline" style={{ fontSize: 'clamp(0.4rem, 0.6vw, 0.55rem)' }}>Select</span>
                          </button>
                          <button 
                            onClick={() => handleShortlist && handleShortlist(student.id, 'Rejected')} 
                            className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1 shadow-sm"
                            style={{ 
                              borderRadius: '8px',
                              fontSize: 'clamp(0.45rem, 0.7vw, 0.55rem)',
                              padding: 'clamp(0.15rem, 0.3vw, 0.25rem) clamp(0.3rem, 0.5vw, 0.4rem)'
                            }}
                          >
                            <UserX style={{ 
                              width: 'clamp(0.5rem, 0.8vw, 0.7rem)', 
                              height: 'clamp(0.5rem, 0.8vw, 0.7rem)' 
                            }} />
                            <span className="d-none d-sm-inline" style={{ fontSize: 'clamp(0.4rem, 0.6vw, 0.55rem)' }}>Reject</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="4" className="text-center p-3 p-md-5 text-secondary">
                    <Users className="mx-auto" style={{ 
                      width: 'clamp(2rem, 4vw, 3rem)', 
                      height: 'clamp(2rem, 4vw, 3rem)' 
                    }} />
                    <p className="mt-2" style={{ fontSize: 'clamp(0.85rem, 1.5vw, 0.95rem)' }}>No applications found</p>
                    <p className="small" style={{ fontSize: 'clamp(0.65rem, 1vw, 0.75rem)' }}>Try adjusting your search or filters</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal - Responsive */}
      {showDetailModal && selectedStudent && (
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
            maxWidth: 'clamp(320px, 85vw, 500px)', 
            width: '100%', 
            background: 'rgba(20,20,30,0.95)', 
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.05)'
          }}
          onClick={(e) => e.stopPropagation()}
          >
            <div className="card-body p-3 p-md-4">
              <div className="d-flex justify-content-between align-items-center mb-3 border-bottom border-secondary pb-3">
                <h5 className="text-light fw-bold m-0 d-flex align-items-center gap-2" style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)' }}>
                  <Users className="text-primary" style={{ 
                    width: 'clamp(0.9rem, 2vw, 1.2rem)', 
                    height: 'clamp(0.9rem, 2vw, 1.2rem)' 
                  }} />
                  Application Details
                </h5>
                <button onClick={() => setShowDetailModal(false)} className="btn btn-close btn-close-white" style={{ fontSize: 'clamp(0.6rem, 1vw, 0.9rem)' }}></button>
              </div>

              <div className="text-center mb-3">
                <div className="d-inline-flex align-items-center justify-content-center rounded-circle" style={{ 
                  width: 'clamp(50px, 10vw, 64px)', 
                  height: 'clamp(50px, 10vw, 64px)',
                  background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                  fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
                  fontWeight: 'bold',
                  color: '#fff'
                }}>
                  {selectedStudent.name?.charAt(0) || 'S'}
                </div>
                <h5 className="text-light fw-bold mt-2" style={{ fontSize: 'clamp(0.9rem, 2vw, 1.05rem)' }}>
                  {selectedStudent.name}
                </h5>
                <span className="text-secondary small" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                  ID: #{selectedStudent.id}
                </span>
              </div>

              <div className="space-y-2">
                <div className="d-flex flex-wrap justify-content-between p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <span className="text-secondary" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>
                    <Award className="me-1" style={{ width: 'clamp(0.6rem, 1vw, 0.8rem)', height: 'clamp(0.6rem, 1vw, 0.8rem)' }} /> 
                    Department
                  </span>
                  <span className="text-light" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>{selectedStudent.dept}</span>
                </div>
                <div className="d-flex flex-wrap justify-content-between p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <span className="text-secondary" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>
                    <UserCheck className="me-1" style={{ width: 'clamp(0.6rem, 1vw, 0.8rem)', height: 'clamp(0.6rem, 1vw, 0.8rem)' }} /> 
                    Status
                  </span>
                  <span className={`text-${getStatusConfig(selectedStudent.status).color} fw-bold`} style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>
                    {selectedStudent.status}
                  </span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-top border-secondary">
                <label className="text-secondary small fw-bold d-block mb-2" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                  Quick Actions
                </label>
                <div className="d-flex gap-2 flex-wrap">
                  <button 
                    onClick={() => {
                      handleShortlist && handleShortlist(selectedStudent.id, 'Shortlisted');
                      setShowDetailModal(false);
                    }}
                    className="btn btn-info btn-sm flex-grow-1 d-flex align-items-center justify-content-center gap-1 shadow-sm"
                    style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)', padding: '0.25rem 0.4rem' }}
                  >
                    <UserCheck style={{ 
                      width: 'clamp(0.6rem, 1vw, 0.8rem)', 
                      height: 'clamp(0.6rem, 1vw, 0.8rem)' 
                    }} /> Shortlist
                  </button>
                  <button 
                    onClick={() => {
                      handleShortlist && handleShortlist(selectedStudent.id, 'Selected');
                      setShowDetailModal(false);
                    }}
                    className="btn btn-success btn-sm flex-grow-1 d-flex align-items-center justify-content-center gap-1 shadow-sm"
                    style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)', padding: '0.25rem 0.4rem' }}
                  >
                    <UserPlus style={{ 
                      width: 'clamp(0.6rem, 1vw, 0.8rem)', 
                      height: 'clamp(0.6rem, 1vw, 0.8rem)' 
                    }} /> Select
                  </button>
                  <button 
                    onClick={() => {
                      handleShortlist && handleShortlist(selectedStudent.id, 'Rejected');
                      setShowDetailModal(false);
                    }}
                    className="btn btn-danger btn-sm flex-grow-1 d-flex align-items-center justify-content-center gap-1 shadow-sm"
                    style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)', padding: '0.25rem 0.4rem' }}
                  >
                    <UserX style={{ 
                      width: 'clamp(0.6rem, 1vw, 0.8rem)', 
                      height: 'clamp(0.6rem, 1vw, 0.8rem)' 
                    }} /> Reject
                  </button>
                </div>
              </div>

              <div className="mt-3 pt-3 border-top border-secondary">
                <button onClick={() => setShowDetailModal(false)} className="btn btn-secondary w-100" style={{ fontSize: 'clamp(0.6rem, 1vw, 0.7rem)', padding: '0.35rem 0.7rem' }}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Application Modal - Responsive */}
      {showAddApplicationModal && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ 
          zIndex: 9999, 
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(10px)',
          animation: 'fadeIn 0.3s ease',
          padding: '1rem'
        }}
        onClick={() => setShowAddApplicationModal(false)}
        >
          <div className="card border-0 shadow-2xl rounded-4" style={{ 
            maxWidth: 'clamp(320px, 90vw, 600px)', 
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
              <div className="d-flex justify-content-between align-items-center mb-3 border-bottom border-secondary pb-3">
                <h5 className="text-light fw-bold m-0 d-flex align-items-center gap-2" style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)' }}>
                  <FileText className="text-primary" style={{ 
                    width: 'clamp(0.9rem, 2vw, 1.2rem)', 
                    height: 'clamp(0.9rem, 2vw, 1.2rem)' 
                  }} />
                  Add New Application
                </h5>
                <button 
                  onClick={() => setShowAddApplicationModal(false)} 
                  className="btn btn-close btn-close-white"
                  style={{ fontSize: 'clamp(0.6rem, 1vw, 0.9rem)' }}
                ></button>
              </div>

              <div className="row g-2 g-md-3">
                <div className="col-12">
                  <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                    Full Name *
                  </label>
                  <input 
                    type="text" 
                    className="form-control form-control-sm bg-dark text-light border-secondary" 
                    placeholder="Enter student name"
                    value={newApplication.name}
                    onChange={(e) => setNewApplication({ ...newApplication, name: e.target.value })}
                    style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                  />
                </div>

                <div className="col-12">
                  <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                    Email Address *
                  </label>
                  <input 
                    type="email" 
                    className="form-control form-control-sm bg-dark text-light border-secondary" 
                    placeholder="student@email.com"
                    value={newApplication.email}
                    onChange={(e) => setNewApplication({ ...newApplication, email: e.target.value })}
                    style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                  />
                </div>

                <div className="col-6">
                  <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                    Phone Number
                  </label>
                  <input 
                    type="text" 
                    className="form-control form-control-sm bg-dark text-light border-secondary" 
                    placeholder="+91 9876543210"
                    value={newApplication.phone}
                    onChange={(e) => setNewApplication({ ...newApplication, phone: e.target.value })}
                    style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                  />
                </div>

                <div className="col-6">
                  <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                    CGPA
                  </label>
                  <input 
                    type="text" 
                    className="form-control form-control-sm bg-dark text-light border-secondary" 
                    placeholder="8.5"
                    value={newApplication.cgpa}
                    onChange={(e) => setNewApplication({ ...newApplication, cgpa: e.target.value })}
                    style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                  />
                </div>

                <div className="col-6">
                  <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                    Department
                  </label>
                  <select 
                    className="form-select form-select-sm bg-dark text-light border-secondary" 
                    value={newApplication.department}
                    onChange={(e) => setNewApplication({ ...newApplication, department: e.target.value })}
                    style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                  >
                    <option value="CSE">Computer Science</option>
                    <option value="IT">Information Technology</option>
                    <option value="ECE">Electronics & Communication</option>
                    <option value="EEE">Electrical & Electronics</option>
                    <option value="MECH">Mechanical</option>
                    <option value="CIVIL">Civil</option>
                  </select>
                </div>

                <div className="col-6">
                  <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                    Year
                  </label>
                  <select 
                    className="form-select form-select-sm bg-dark text-light border-secondary" 
                    value={newApplication.year}
                    onChange={(e) => setNewApplication({ ...newApplication, year: e.target.value })}
                    style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                  >
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
                </div>

                <div className="col-12">
                  <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                    Applied For
                  </label>
                  <input 
                    type="text" 
                    className="form-control form-control-sm bg-dark text-light border-secondary" 
                    placeholder="Position / Job Title"
                    value={newApplication.appliedFor}
                    onChange={(e) => setNewApplication({ ...newApplication, appliedFor: e.target.value })}
                    style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                  />
                </div>

                <div className="col-12">
                  <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                    Status
                  </label>
                  <select 
                    className="form-select form-select-sm bg-dark text-light border-secondary" 
                    value={newApplication.status}
                    onChange={(e) => setNewApplication({ ...newApplication, status: e.target.value })}
                    style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                  >
                    <option value="Applied">Applied</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Selected">Selected</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>

              <div className="mt-3 pt-3 border-top border-secondary d-flex gap-2 flex-wrap">
                <button 
                  onClick={() => setShowAddApplicationModal(false)} 
                  className="btn btn-secondary flex-grow-1"
                  style={{ 
                    borderRadius: '10px', 
                    fontWeight: '600',
                    fontSize: 'clamp(0.6rem, 1vw, 0.7rem)',
                    padding: '0.35rem 0.7rem'
                  }}
                >
                  Cancel
                </button>
                <button 
                  onClick={handleAddApplication}
                  className="btn btn-primary flex-grow-1 d-flex align-items-center justify-content-center gap-1 shadow-lg shadow-primary/20"
                  style={{ 
                    borderRadius: '10px', 
                    fontWeight: '600',
                    fontSize: 'clamp(0.6rem, 1vw, 0.7rem)',
                    padding: '0.35rem 0.7rem'
                  }}
                >
                  <Plus style={{ 
                    width: 'clamp(0.7rem, 1.2vw, 0.9rem)', 
                    height: 'clamp(0.7rem, 1.2vw, 0.9rem)' 
                  }} />
                  Add Application
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
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        .transition-all {
          transition: all 0.3s ease;
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

        /* Card Styles */
        .card {
          transition: all 0.3s ease;
        }
        
        /* Form Controls */
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