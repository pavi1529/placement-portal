import React, { useState, useEffect } from 'react';
import { 
  Plus, Trash2, Search, Filter, Edit2, Eye, User, 
  Mail, Phone, Award, CheckCircle, XCircle, AlertCircle, 
  Clock, Save, Loader, X, GraduationCap, Building2, 
  Briefcase, FileText, Bell, Settings, LayoutDashboard,
  ArrowUpRight, TrendingUp, Users, UserCheck
} from 'lucide-react';

const API_URL = 'http://localhost:5000/api';

export default function AdminStudentsTab({ token }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('ALL');
  const [error, setError] = useState(null);
  
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [editStudent, setEditStudent] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  
  const [newStudent, setNewStudent] = useState({ 
    name: '', 
    email: '', 
    password: 'Student@123',
    department: 'CSE', 
    cgpa: '', 
    phone: '', 
    year: '',
    status: 'Applied'
  });

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

  const fetchStudents = async () => {
    try {
      const data = await apiCall('/admin/students');
      if (data.success) {
        setStudents(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchStudents();
    }
  }, [token]);

  const handleAddStudent = async (e) => {
    e.preventDefault();
    if (!newStudent.name || !newStudent.email || !newStudent.cgpa) {
      alert('Please fill in all required fields!');
      return;
    }

    try {
      const data = await apiCall('/admin/students', 'POST', {
        name: newStudent.name,
        email: newStudent.email,
        password: newStudent.password || 'Student@123',
        department: newStudent.department,
        cgpa: parseFloat(newStudent.cgpa),
        phone: newStudent.phone || '',
        year: parseInt(newStudent.year) || 1,
        status: newStudent.status || 'Applied',
        role: 'student'
      });

      if (data.success) {
        alert('✅ Student added successfully!');
        setNewStudent({ 
          name: '', email: '', password: 'Student@123',
          department: 'CSE', cgpa: '', phone: '', year: '', status: 'Applied'
        });
        setShowAddModal(false);
        fetchStudents();
      }
    } catch (error) {
      alert('❌ Failed to add student: ' + error.message);
    }
  };

  const handleUpdateStudent = async () => {
    if (!editStudent) return;

    try {
      const data = await apiCall(`/admin/students/${editStudent._id}`, 'PUT', {
        name: editStudent.name,
        email: editStudent.email,
        department: editStudent.department,
        cgpa: parseFloat(editStudent.cgpa),
        phone: editStudent.phone || '',
        year: parseInt(editStudent.year) || 1,
        status: editStudent.status || 'Applied'
      });

      if (data.success) {
        alert('✅ Student updated successfully!');
        setShowEditModal(false);
        setEditStudent(null);
        fetchStudents();
      }
    } catch (error) {
      alert('❌ Failed to update student: ' + error.message);
    }
  };

  const handleDeleteStudent = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;

    try {
      const data = await apiCall(`/admin/students/${id}`, 'DELETE');
      if (data.success) {
        alert('✅ Student deleted successfully!');
        fetchStudents();
      }
    } catch (error) {
      alert('❌ Failed to delete student: ' + error.message);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Selected': return 'success';
      case 'Shortlisted': return 'info';
      case 'Applied': return 'warning';
      case 'Rejected': return 'danger';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Selected': return <CheckCircle className="text-success" style={{ width: 'clamp(0.6rem, 1vw, 0.7rem)', height: 'clamp(0.6rem, 1vw, 0.7rem)' }} />;
      case 'Shortlisted': return <AlertCircle className="text-info" style={{ width: 'clamp(0.6rem, 1vw, 0.7rem)', height: 'clamp(0.6rem, 1vw, 0.7rem)' }} />;
      case 'Applied': return <Clock className="text-warning" style={{ width: 'clamp(0.6rem, 1vw, 0.7rem)', height: 'clamp(0.6rem, 1vw, 0.7rem)' }} />;
      case 'Rejected': return <XCircle className="text-danger" style={{ width: 'clamp(0.6rem, 1vw, 0.7rem)', height: 'clamp(0.6rem, 1vw, 0.7rem)' }} />;
      default: return null;
    }
  };

  const filteredStudents = students
    .filter(s => deptFilter === 'ALL' || s.department === deptFilter)
    .filter(s => s.name?.toLowerCase().includes(searchQuery?.toLowerCase() || '') ||
                  s.email?.toLowerCase().includes(searchQuery?.toLowerCase() || ''));

  const totalStudents = students.length;
  const selectedCount = students.filter(s => s.status === 'Selected').length;
  const shortlistedCount = students.filter(s => s.status === 'Shortlisted').length;
  const appliedCount = students.filter(s => s.status === 'Applied').length;

  return (
    <div className="animate-fadeIn">
      {/* Stats Cards - Responsive */}
      <div className="row g-2 g-md-3 mb-3 mb-md-4">
        {[
          { label: "Total Students", value: totalStudents, color: "primary", icon: Users, bg: "rgba(59,130,246,0.15)" },
          { label: "Selected", value: selectedCount, color: "success", icon: CheckCircle, bg: "rgba(34,197,94,0.15)" },
          { label: "Shortlisted", value: shortlistedCount, color: "info", icon: AlertCircle, bg: "rgba(6,182,212,0.15)" },
          { label: "Applied", value: appliedCount, color: "warning", icon: Clock, bg: "rgba(234,179,8,0.15)" },
        ].map((stat, i) => {
          const Icon = stat.icon;
          const bgColors = {
            primary: 'rgba(59,130,246,0.08)',
            success: 'rgba(34,197,94,0.08)',
            info: 'rgba(6,182,212,0.08)',
            warning: 'rgba(234,179,8,0.08)'
          };
          return (
            <div key={i} className="col-6 col-lg-3">
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
                value={deptFilter}
                onChange={(e) => setDeptFilter(e.target.value)}
                style={{ 
                  fontSize: 'clamp(0.55rem, 0.9vw, 0.75rem)', 
                  width: 'clamp(90px, 15vw, 140px)', 
                  outline: 'none', 
                  padding: '0.1rem 0.4rem',
                  color: '#ffffff !important'
                }}
              >
                <option value="ALL" style={{ background: '#1a1a2e', color: '#ffffff' }}>All Departments</option>
                <option value="CSE" style={{ background: '#1a1a2e', color: '#ffffff' }}>CSE</option>
                <option value="IT" style={{ background: '#1a1a2e', color: '#ffffff' }}>IT</option>
                <option value="ECE" style={{ background: '#1a1a2e', color: '#ffffff' }}>ECE</option>
                <option value="EEE" style={{ background: '#1a1a2e', color: '#ffffff' }}>EEE</option>
                <option value="MECH" style={{ background: '#1a1a2e', color: '#ffffff' }}>MECH</option>
              </select>
            </div>
            <button 
              onClick={() => setShowAddModal(true)}
              className="btn btn-primary btn-sm d-flex align-items-center gap-1 ms-auto shadow-lg shadow-primary/20"
              style={{ 
                borderRadius: '10px', 
                fontWeight: '600',
                fontSize: 'clamp(0.6rem, 1vw, 0.75rem)',
                padding: 'clamp(0.2rem, 0.5vw, 0.3rem) clamp(0.6rem, 1.2vw, 0.8rem)'
              }}
            >
              <Plus style={{ 
                width: 'clamp(0.6rem, 1vw, 0.8rem)', 
                height: 'clamp(0.6rem, 1vw, 0.8rem)' 
              }} /> 
              <span className="d-none d-sm-inline">Add Student</span>
            </button>
          </div>
        </div>
      </div>

      {/* Students Table - Responsive */}
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
                <th className="p-2 p-md-3 d-none d-sm-table-cell">Email</th>
                <th className="p-2 p-md-3 d-none d-md-table-cell">Department</th>
                <th className="p-2 p-md-3">CGPA</th>
                <th className="p-2 p-md-3 d-none d-sm-table-cell">Status</th>
                <th className="p-2 p-md-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody style={{ fontSize: 'clamp(0.65rem, 1vw, 0.75rem)' }}>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center p-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="text-secondary mt-2" style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)' }}>Loading students...</p>
                  </td>
                </tr>
              ) : filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center p-3 p-md-5 text-secondary">
                    <Users className="mx-auto" style={{ 
                      width: 'clamp(2rem, 4vw, 3rem)', 
                      height: 'clamp(2rem, 4vw, 3rem)' 
                    }} />
                    <p className="mt-2" style={{ fontSize: 'clamp(0.85rem, 1.5vw, 0.95rem)' }}>No students found</p>
                    <button className="btn btn-primary btn-sm mt-2" onClick={() => setShowAddModal(true)} style={{ fontSize: 'clamp(0.65rem, 1vw, 0.75rem)' }}>
                      <Plus style={{ 
                        width: 'clamp(0.6rem, 1vw, 0.8rem)', 
                        height: 'clamp(0.6rem, 1vw, 0.8rem)' 
                      }} /> Add First Student
                    </button>
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student, index) => (
                  <tr key={student._id} className="transition-all hover:bg-white/5">
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
                        <div>
                          <span className="fw-bold text-light" style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)' }}>
                            {student.name}
                          </span>
                          <span className="text-secondary d-block d-sm-none" style={{ fontSize: 'clamp(0.45rem, 0.7vw, 0.55rem)' }}>
                            {student.email}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="p-2 p-md-3 text-secondary d-none d-sm-table-cell" style={{ fontSize: 'clamp(0.6rem, 1vw, 0.7rem)' }}>
                      {student.email}
                    </td>
                    <td className="p-2 p-md-3 d-none d-md-table-cell">
                      <span className="badge bg-secondary bg-opacity-10 text-secondary border border-secondary" style={{ fontSize: 'clamp(0.45rem, 0.7vw, 0.55rem)' }}>
                        {student.department || 'N/A'}
                      </span>
                    </td>
                    <td className="p-2 p-md-3">
                      <span className="fw-bold text-primary" style={{ fontSize: 'clamp(0.65rem, 1vw, 0.75rem)' }}>
                        {student.cgpa || 'N/A'}
                      </span>
                    </td>
                    <td className="p-2 p-md-3 d-none d-sm-table-cell">
                      <span className={`badge bg-${getStatusColor(student.status)} bg-opacity-10 text-${getStatusColor(student.status)} border border-${getStatusColor(student.status)} d-inline-flex align-items-center gap-1`}
                            style={{ fontSize: 'clamp(0.4rem, 0.6vw, 0.55rem)' }}>
                        {getStatusIcon(student.status)}
                        {student.status || 'Applied'}
                      </span>
                    </td>
                    <td className="p-2 p-md-3 text-center">
                      <div className="d-flex gap-1 justify-content-center flex-wrap">
                        <button 
                          onClick={() => { setSelectedStudent(student); setShowDetailModal(true); }} 
                          className="btn btn-sm btn-outline-info d-flex align-items-center gap-1 shadow-sm"
                          style={{ 
                            borderRadius: '8px', 
                            padding: 'clamp(0.1rem, 0.2vw, 0.2rem) clamp(0.2rem, 0.4vw, 0.4rem)' 
                          }}
                        >
                          <Eye style={{ 
                            width: 'clamp(0.5rem, 0.8vw, 0.7rem)', 
                            height: 'clamp(0.5rem, 0.8vw, 0.7rem)' 
                          }} />
                        </button>
                        <button 
                          onClick={() => { setEditStudent({ ...student }); setShowEditModal(true); }} 
                          className="btn btn-sm btn-outline-warning d-flex align-items-center gap-1 shadow-sm"
                          style={{ 
                            borderRadius: '8px', 
                            padding: 'clamp(0.1rem, 0.2vw, 0.2rem) clamp(0.2rem, 0.4vw, 0.4rem)' 
                          }}
                        >
                          <Edit2 style={{ 
                            width: 'clamp(0.5rem, 0.8vw, 0.7rem)', 
                            height: 'clamp(0.5rem, 0.8vw, 0.7rem)' 
                          }} />
                        </button>
                        <button 
                          onClick={() => handleDeleteStudent(student._id)} 
                          className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1 shadow-sm"
                          style={{ 
                            borderRadius: '8px', 
                            padding: 'clamp(0.1rem, 0.2vw, 0.2rem) clamp(0.2rem, 0.4vw, 0.4rem)' 
                          }}
                          disabled={loading}
                        >
                          <Trash2 style={{ 
                            width: 'clamp(0.5rem, 0.8vw, 0.7rem)', 
                            height: 'clamp(0.5rem, 0.8vw, 0.7rem)' 
                          }} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

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
            maxWidth: 'clamp(320px, 90vw, 550px)', 
            width: '100%', 
            maxHeight: '90vh', 
            overflowY: 'auto', 
            background: 'rgba(20,20,30,0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            <div className="card-body p-3 p-md-4">
              <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3 border-bottom border-secondary pb-3">
                <h5 className="text-light fw-bold m-0 d-flex align-items-center gap-2" style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)' }}>
                  <User className="text-primary" style={{ 
                    width: 'clamp(0.9rem, 2vw, 1.2rem)', 
                    height: 'clamp(0.9rem, 2vw, 1.2rem)' 
                  }} />
                  Add New Student
                </h5>
                <button onClick={() => setShowAddModal(false)} className="btn btn-close btn-close-white" style={{ fontSize: 'clamp(0.6rem, 1vw, 0.9rem)' }}></button>
              </div>

              <form onSubmit={handleAddStudent}>
                <div className="mb-2 mb-md-3">
                  <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                    Full Name *
                  </label>
                  <input 
                    type="text" 
                    className="form-control form-control-sm bg-dark text-light border-secondary" 
                    placeholder="Enter name"
                    value={newStudent.name}
                    onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                    required
                    style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                  />
                </div>
                <div className="mb-2 mb-md-3">
                  <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                    Email *
                  </label>
                  <input 
                    type="email" 
                    className="form-control form-control-sm bg-dark text-light border-secondary" 
                    placeholder="Enter email"
                    value={newStudent.email}
                    onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                    required
                    style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                  />
                </div>
                <div className="mb-2 mb-md-3">
                  <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                    Password
                  </label>
                  <input 
                    type="password" 
                    className="form-control form-control-sm bg-dark text-light border-secondary" 
                    placeholder="Enter password"
                    value={newStudent.password}
                    onChange={(e) => setNewStudent({ ...newStudent, password: e.target.value })}
                    style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                  />
                </div>
                <div className="row g-2 mb-2 mb-md-3">
                  <div className="col-6">
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Department *
                    </label>
                    <select 
                      className="form-select form-select-sm bg-dark text-light border-secondary" 
                      value={newStudent.department}
                      onChange={(e) => setNewStudent({ ...newStudent, department: e.target.value })}
                      required
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                    >
                      <option value="CSE">CSE</option>
                      <option value="IT">IT</option>
                      <option value="ECE">ECE</option>
                      <option value="EEE">EEE</option>
                      <option value="MECH">MECH</option>
                      <option value="CIVIL">CIVIL</option>
                    </select>
                  </div>
                  <div className="col-6">
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      CGPA *
                    </label>
                    <input 
                      type="number" step="0.01" 
                      className="form-control form-control-sm bg-dark text-light border-secondary" 
                      placeholder="e.g., 8.5"
                      value={newStudent.cgpa}
                      onChange={(e) => setNewStudent({ ...newStudent, cgpa: e.target.value })}
                      required
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                    />
                  </div>
                </div>
                <div className="row g-2 mb-2 mb-md-3">
                  <div className="col-6">
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Phone
                    </label>
                    <input 
                      type="text" 
                      className="form-control form-control-sm bg-dark text-light border-secondary" 
                      placeholder="Enter phone"
                      value={newStudent.phone}
                      onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                    />
                  </div>
                  <div className="col-6">
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Year
                    </label>
                    <input 
                      type="number" 
                      className="form-control form-control-sm bg-dark text-light border-secondary" 
                      placeholder="1-4"
                      value={newStudent.year}
                      onChange={(e) => setNewStudent({ ...newStudent, year: e.target.value })}
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                    />
                  </div>
                </div>
                <div className="mb-2 mb-md-3">
                  <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                    Status
                  </label>
                  <select 
                    className="form-select form-select-sm bg-dark text-light border-secondary" 
                    value={newStudent.status}
                    onChange={(e) => setNewStudent({ ...newStudent, status: e.target.value })}
                    style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                  >
                    <option value="Applied">Applied</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Selected">Selected</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                <div className="mt-3 pt-3 border-top border-secondary d-flex gap-2 flex-wrap">
                  <button onClick={() => setShowAddModal(false)} type="button" className="btn btn-secondary flex-grow-1" style={{ borderRadius: '10px', fontWeight: '600', fontSize: 'clamp(0.6rem, 1vw, 0.7rem)', padding: '0.35rem 0.7rem' }}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary flex-grow-1 shadow-lg shadow-primary/20" disabled={loading} style={{ borderRadius: '10px', fontWeight: '600', fontSize: 'clamp(0.6rem, 1vw, 0.7rem)', padding: '0.35rem 0.7rem' }}>
                    {loading ? <span className="spinner-border spinner-border-sm" style={{ width: 'clamp(0.6rem, 1vw, 0.8rem)', height: 'clamp(0.6rem, 1vw, 0.8rem)' }}></span> : <Plus style={{ width: 'clamp(0.6rem, 1vw, 0.8rem)', height: 'clamp(0.6rem, 1vw, 0.8rem)' }} />}
                    {loading ? 'Adding...' : 'Add Student'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal - Responsive */}
      {showDetailModal && selectedStudent && (
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
              <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3 border-bottom border-secondary pb-3">
                <h5 className="text-light fw-bold m-0" style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)' }}>
                  Student Details
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
              </div>

              <div className="space-y-2">
                <div className="d-flex flex-wrap justify-content-between p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <span className="text-secondary" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>
                    <Mail className="me-1" style={{ 
                      width: 'clamp(0.6rem, 1vw, 0.8rem)', 
                      height: 'clamp(0.6rem, 1vw, 0.8rem)' 
                    }} /> Email
                  </span>
                  <span className="text-light" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>
                    {selectedStudent.email || 'N/A'}
                  </span>
                </div>
                <div className="d-flex flex-wrap justify-content-between p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <span className="text-secondary" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>
                    <Phone className="me-1" style={{ 
                      width: 'clamp(0.6rem, 1vw, 0.8rem)', 
                      height: 'clamp(0.6rem, 1vw, 0.8rem)' 
                    }} /> Phone
                  </span>
                  <span className="text-light" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>
                    {selectedStudent.phone || 'N/A'}
                  </span>
                </div>
                <div className="d-flex flex-wrap justify-content-between p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <span className="text-secondary" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>
                    <GraduationCap className="me-1" style={{ 
                      width: 'clamp(0.6rem, 1vw, 0.8rem)', 
                      height: 'clamp(0.6rem, 1vw, 0.8rem)' 
                    }} /> Department
                  </span>
                  <span className="text-light" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>
                    {selectedStudent.department || 'N/A'}
                  </span>
                </div>
                <div className="d-flex flex-wrap justify-content-between p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <span className="text-secondary" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>
                    <Award className="me-1" style={{ 
                      width: 'clamp(0.6rem, 1vw, 0.8rem)', 
                      height: 'clamp(0.6rem, 1vw, 0.8rem)' 
                    }} /> CGPA
                  </span>
                  <span className="text-primary fw-bold" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>
                    {selectedStudent.cgpa || 'N/A'}
                  </span>
                </div>
                <div className="d-flex flex-wrap justify-content-between p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <span className="text-secondary" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>
                    <Clock className="me-1" style={{ 
                      width: 'clamp(0.6rem, 1vw, 0.8rem)', 
                      height: 'clamp(0.6rem, 1vw, 0.8rem)' 
                    }} /> Year
                  </span>
                  <span className="text-light" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>
                    {selectedStudent.year || 'N/A'}
                  </span>
                </div>
                <div className="d-flex flex-wrap justify-content-between p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <span className="text-secondary" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>
                    <CheckCircle className="me-1" style={{ 
                      width: 'clamp(0.6rem, 1vw, 0.8rem)', 
                      height: 'clamp(0.6rem, 1vw, 0.8rem)' 
                    }} /> Status
                  </span>
                  <span className={`text-${getStatusColor(selectedStudent.status)}`} style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>
                    {selectedStudent.status || 'N/A'}
                  </span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-top border-secondary">
                <button onClick={() => setShowDetailModal(false)} className="btn btn-secondary w-100" style={{ borderRadius: '10px', fontWeight: '600', fontSize: 'clamp(0.6rem, 1vw, 0.7rem)', padding: '0.35rem 0.7rem' }}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal - Responsive */}
      {showEditModal && editStudent && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ 
          zIndex: 9999, 
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(10px)',
          animation: 'fadeIn 0.3s ease',
          padding: '1rem'
        }}>
          <div className="card border-0 shadow-2xl rounded-4" style={{ 
            maxWidth: 'clamp(320px, 90vw, 550px)', 
            width: '100%', 
            maxHeight: '90vh', 
            overflowY: 'auto', 
            background: 'rgba(20,20,30,0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            <div className="card-body p-3 p-md-4">
              <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3 border-bottom border-secondary pb-3">
                <h5 className="text-light fw-bold m-0 d-flex align-items-center gap-2" style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)' }}>
                  <Edit2 className="text-warning" style={{ 
                    width: 'clamp(0.9rem, 2vw, 1.2rem)', 
                    height: 'clamp(0.9rem, 2vw, 1.2rem)' 
                  }} />
                  Edit Student
                </h5>
                <button onClick={() => setShowEditModal(false)} className="btn btn-close btn-close-white" style={{ fontSize: 'clamp(0.6rem, 1vw, 0.9rem)' }}></button>
              </div>

              <div className="mb-2 mb-md-3">
                <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                  Full Name *
                </label>
                <input 
                  type="text" 
                  className="form-control form-control-sm bg-dark text-light border-secondary" 
                  value={editStudent.name || ''}
                  onChange={(e) => setEditStudent({ ...editStudent, name: e.target.value })}
                  style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                />
              </div>
              <div className="mb-2 mb-md-3">
                <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                  Email *
                </label>
                <input 
                  type="email" 
                  className="form-control form-control-sm bg-dark text-light border-secondary" 
                  value={editStudent.email || ''}
                  onChange={(e) => setEditStudent({ ...editStudent, email: e.target.value })}
                  style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                />
              </div>
              <div className="row g-2 mb-2 mb-md-3">
                <div className="col-6">
                  <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                    Department *
                  </label>
                  <select 
                    className="form-select form-select-sm bg-dark text-light border-secondary" 
                    value={editStudent.department || 'CSE'}
                    onChange={(e) => setEditStudent({ ...editStudent, department: e.target.value })}
                    style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                  >
                    <option value="CSE">CSE</option>
                    <option value="IT">IT</option>
                    <option value="ECE">ECE</option>
                    <option value="EEE">EEE</option>
                    <option value="MECH">MECH</option>
                    <option value="CIVIL">CIVIL</option>
                  </select>
                </div>
                <div className="col-6">
                  <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                    CGPA *
                  </label>
                  <input 
                    type="number" step="0.01" 
                    className="form-control form-control-sm bg-dark text-light border-secondary" 
                    value={editStudent.cgpa || ''}
                    onChange={(e) => setEditStudent({ ...editStudent, cgpa: e.target.value })}
                    style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                  />
                </div>
              </div>
              <div className="row g-2 mb-2 mb-md-3">
                <div className="col-6">
                  <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                    Phone
                  </label>
                  <input 
                    type="text" 
                    className="form-control form-control-sm bg-dark text-light border-secondary" 
                    value={editStudent.phone || ''}
                    onChange={(e) => setEditStudent({ ...editStudent, phone: e.target.value })}
                    style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                  />
                </div>
                <div className="col-6">
                  <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                    Year
                  </label>
                  <input 
                    type="number" 
                    className="form-control form-control-sm bg-dark text-light border-secondary" 
                    value={editStudent.year || ''}
                    onChange={(e) => setEditStudent({ ...editStudent, year: e.target.value })}
                    style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                  />
                </div>
              </div>
              <div className="mb-2 mb-md-3">
                <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                  Status
                </label>
                <select 
                  className="form-select form-select-sm bg-dark text-light border-secondary" 
                  value={editStudent.status || 'Applied'}
                  onChange={(e) => setEditStudent({ ...editStudent, status: e.target.value })}
                  style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                >
                  <option value="Applied">Applied</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Selected">Selected</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div className="mt-3 pt-3 border-top border-secondary d-flex gap-2 flex-wrap">
                <button onClick={() => setShowEditModal(false)} className="btn btn-secondary flex-grow-1" style={{ borderRadius: '10px', fontWeight: '600', fontSize: 'clamp(0.6rem, 1vw, 0.7rem)', padding: '0.35rem 0.7rem' }}>
                  Cancel
                </button>
                <button onClick={handleUpdateStudent} className="btn btn-primary flex-grow-1 shadow-lg shadow-primary/20" disabled={loading} style={{ borderRadius: '10px', fontWeight: '600', fontSize: 'clamp(0.6rem, 1vw, 0.7rem)', padding: '0.35rem 0.7rem' }}>
                  {loading ? <span className="spinner-border spinner-border-sm" style={{ width: 'clamp(0.6rem, 1vw, 0.8rem)', height: 'clamp(0.6rem, 1vw, 0.8rem)' }}></span> : <Save style={{ width: 'clamp(0.6rem, 1vw, 0.8rem)', height: 'clamp(0.6rem, 1vw, 0.8rem)' }} />}
                  {loading ? 'Updating...' : 'Update Student'}
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
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        .transition-all {
          transition: all 0.3s ease;
        }
        
        .hover\\:translate-y-1:hover {
          transform: translateY(-4px);
        }
        
        .hover\\:scale-105:hover {
          transform: scale(1.05);
        }
        
        .hover\\:scale-110:hover {
          transform: scale(1.1);
        }
        
        .space-y-2 > * + * {
          margin-top: 0.5rem;
        }

        .min-w-0 {
          min-width: 0;
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
        
        .spinner-border {
          animation: spinner-border 0.75s linear infinite;
        }
        
        @keyframes spinner-border {
          to { transform: rotate(360deg); }
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