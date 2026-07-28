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
  
  // Modal states
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [editStudent, setEditStudent] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Form states
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
      alert('Failed to fetch students from database');
    }
  };

  // Load students on mount
  useEffect(() => {
    if (token) {
      fetchStudents();
    }
  }, [token]);

 
  
  // ✅ ADD STUDENT
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

  // ✅ UPDATE STUDENT
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

  // ✅ DELETE STUDENT
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
      case 'Selected': return <CheckCircle className="text-success" style={{ width: '0.7rem', height: '0.7rem' }} />;
      case 'Shortlisted': return <AlertCircle className="text-info" style={{ width: '0.7rem', height: '0.7rem' }} />;
      case 'Applied': return <Clock className="text-warning" style={{ width: '0.7rem', height: '0.7rem' }} />;
      case 'Rejected': return <XCircle className="text-danger" style={{ width: '0.7rem', height: '0.7rem' }} />;
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
    
      <div className="row g-3 mb-4">
        {[
          { label: "Total Students", value: totalStudents, color: "primary", icon: Users, bg: "rgba(59,130,246,0.15)" },
          { label: "Selected", value: selectedCount, color: "success", icon: CheckCircle, bg: "rgba(34,197,94,0.15)" },
          { label: "Shortlisted", value: shortlistedCount, color: "info", icon: AlertCircle, bg: "rgba(6,182,212,0.15)" },
          { label: "Applied", value: appliedCount, color: "warning", icon: Clock, bg: "rgba(234,179,8,0.15)" },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="col-6 col-lg-3">
              <div className="card border-0 shadow-lg rounded-4 h-100 transition-all hover:translate-y-1" style={{ background: 'rgba(20,20,30,0.6)', backdropFilter: 'blur(10px)' }}>
                <div className="card-body p-3">
                  <div className="d-flex align-items-center justify-content-between">
                    <span className="text-secondary small fw-bold text-uppercase" style={{ fontSize: '0.55rem' }}>{stat.label}</span>
                    <div className={`p-2 rounded-3`} style={{ background: stat.bg, border: `1px solid ${stat.bg}` }}>
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
                placeholder="Search students..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ fontSize: '0.75rem', outline: 'none' }}
              />
            </div>
            <div className="d-flex align-items-center gap-2 bg-dark px-3 py-2 rounded-3 border border-secondary">
              <Filter className="text-secondary" style={{ width: '0.7rem', height: '0.7rem' }} />
              <select 
                className="form-select form-select-sm bg-transparent border-0 text-light" 
                value={deptFilter}
                onChange={(e) => setDeptFilter(e.target.value)}
                style={{ fontSize: '0.75rem', width: '140px', outline: 'none' }}
              >
                <option value="ALL">All Departments</option>
                <option value="CSE">CSE</option>
                <option value="IT">IT</option>
                <option value="ECE">ECE</option>
                <option value="EEE">EEE</option>
                <option value="MECH">MECH</option>
              </select>
            </div>
            <button 
              onClick={() => setShowAddModal(true)}
              className="btn btn-primary ms-auto d-flex align-items-center gap-1 shadow-lg shadow-primary/20 transition-all hover:scale-105"
              style={{ borderRadius: '10px', fontWeight: '600', padding: '0.5rem 1.2rem', fontSize: '0.75rem' }}
            >
              <Plus style={{ width: '0.8rem', height: '0.8rem' }} /> Add Student
            </button>
          </div>
        </div>
      </div>

     
      <div className="card border-0 shadow-lg rounded-4 overflow-hidden" style={{ background: 'rgba(20,20,30,0.6)', backdropFilter: 'blur(10px)' }}>
        <div className="table-responsive">
          <table className="table table-dark table-hover table-sm mb-0">
            <thead className="text-secondary text-uppercase" style={{ fontSize: '0.55rem', fontWeight: 'bold' }}>
              <tr>
                <th className="p-3">Student</th>
                <th className="p-3">Email</th>
                <th className="p-3">Department</th>
                <th className="p-3">CGPA</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody style={{ fontSize: '0.75rem' }}>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center p-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="text-secondary mt-2">Loading students...</p>
                  </td>
                </tr>
              ) : filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center p-5 text-secondary">
                    <Users className="mx-auto" style={{ width: '3rem', height: '3rem' }} />
                    <p className="mt-2">No students found</p>
                    <button className="btn btn-primary btn-sm mt-2" onClick={() => setShowAddModal(true)}>
                      <Plus style={{ width: '0.8rem', height: '0.8rem' }} /> Add First Student
                    </button>
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student, index) => (
                  <tr key={student._id} className="transition-all hover:bg-white/5">
                    <td className="p-3">
                      <div className="d-flex align-items-center gap-2">
                        <div className="d-flex align-items-center justify-content-center rounded-circle" style={{ 
                          width: '32px', height: '32px',
                          background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                          fontSize: '0.7rem',
                          fontWeight: 'bold',
                          color: '#fff'
                        }}>
                          {student.name?.charAt(0) || 'S'}
                        </div>
                        <div>
                          <span className="fw-bold text-light">{student.name}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 text-secondary">{student.email}</td>
                    <td className="p-3">
                      <span className="badge bg-secondary bg-opacity-10 text-secondary border border-secondary">
                        {student.department || 'N/A'}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="fw-bold text-primary">{student.cgpa || 'N/A'}</span>
                    </td>
                    <td className="p-3">
                      <span className={`badge bg-${getStatusColor(student.status)} bg-opacity-10 text-${getStatusColor(student.status)} border border-${getStatusColor(student.status)} d-inline-flex align-items-center gap-1`}>
                        {getStatusIcon(student.status)}
                        {student.status || 'Applied'}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <div className="d-flex gap-1 justify-content-center">
                        <button 
                          onClick={() => { setSelectedStudent(student); setShowDetailModal(true); }} 
                          className="btn btn-sm btn-outline-info d-flex align-items-center gap-1 shadow-sm transition-all hover:scale-110"
                          style={{ borderRadius: '8px', padding: '0.2rem 0.4rem' }}
                        >
                          <Eye style={{ width: '0.7rem', height: '0.7rem' }} />
                        </button>
                        <button 
                          onClick={() => { setEditStudent({ ...student }); setShowEditModal(true); }} 
                          className="btn btn-sm btn-outline-warning d-flex align-items-center gap-1 shadow-sm transition-all hover:scale-110"
                          style={{ borderRadius: '8px', padding: '0.2rem 0.4rem' }}
                        >
                          <Edit2 style={{ width: '0.7rem', height: '0.7rem' }} />
                        </button>
                        <button 
                          onClick={() => handleDeleteStudent(student._id)} 
                          className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1 shadow-sm transition-all hover:scale-110"
                          style={{ borderRadius: '8px', padding: '0.2rem 0.4rem' }}
                          disabled={loading}
                        >
                          <Trash2 style={{ width: '0.7rem', height: '0.7rem' }} />
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

     
      {showAddModal && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ 
          zIndex: 9999, 
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(10px)',
          animation: 'fadeIn 0.3s ease'
        }}>
          <div className="card border-0 shadow-2xl rounded-4" style={{ maxWidth: '550px', width: '95%', maxHeight: '90vh', overflowY: 'auto', background: 'rgba(20,20,30,0.95)' }}>
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-3 border-bottom border-secondary pb-3">
                <h5 className="text-light fw-bold m-0 d-flex align-items-center gap-2">
                  <User className="text-primary" style={{ width: '1.2rem', height: '1.2rem' }} />
                  Add New Student
                </h5>
                <button onClick={() => setShowAddModal(false)} className="btn btn-close btn-close-white"></button>
              </div>

              <form onSubmit={handleAddStudent}>
                <div className="mb-3">
                  <label className="text-secondary small fw-bold d-block mb-1">Full Name *</label>
                  <input 
                    type="text" 
                    className="form-control form-control-sm bg-dark text-light border-secondary" 
                    placeholder="Enter name"
                    value={newStudent.name}
                    onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="text-secondary small fw-bold d-block mb-1">Email *</label>
                  <input 
                    type="email" 
                    className="form-control form-control-sm bg-dark text-light border-secondary" 
                    placeholder="Enter email"
                    value={newStudent.email}
                    onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="text-secondary small fw-bold d-block mb-1">Password</label>
                  <input 
                    type="password" 
                    className="form-control form-control-sm bg-dark text-light border-secondary" 
                    placeholder="Enter password"
                    value={newStudent.password}
                    onChange={(e) => setNewStudent({ ...newStudent, password: e.target.value })}
                  />
                </div>
                <div className="row g-2 mb-3">
                  <div className="col-6">
                    <label className="text-secondary small fw-bold d-block mb-1">Department *</label>
                    <select 
                      className="form-select form-select-sm bg-dark text-light border-secondary" 
                      value={newStudent.department}
                      onChange={(e) => setNewStudent({ ...newStudent, department: e.target.value })}
                      required
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
                    <label className="text-secondary small fw-bold d-block mb-1">CGPA *</label>
                    <input 
                      type="number" step="0.01" 
                      className="form-control form-control-sm bg-dark text-light border-secondary" 
                      placeholder="e.g., 8.5"
                      value={newStudent.cgpa}
                      onChange={(e) => setNewStudent({ ...newStudent, cgpa: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="row g-2 mb-3">
                  <div className="col-6">
                    <label className="text-secondary small fw-bold d-block mb-1">Phone</label>
                    <input 
                      type="text" 
                      className="form-control form-control-sm bg-dark text-light border-secondary" 
                      placeholder="Enter phone"
                      value={newStudent.phone}
                      onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                    />
                  </div>
                  <div className="col-6">
                    <label className="text-secondary small fw-bold d-block mb-1">Year</label>
                    <input 
                      type="number" 
                      className="form-control form-control-sm bg-dark text-light border-secondary" 
                      placeholder="1-4"
                      value={newStudent.year}
                      onChange={(e) => setNewStudent({ ...newStudent, year: e.target.value })}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="text-secondary small fw-bold d-block mb-1">Status</label>
                  <select 
                    className="form-select form-select-sm bg-dark text-light border-secondary" 
                    value={newStudent.status}
                    onChange={(e) => setNewStudent({ ...newStudent, status: e.target.value })}
                  >
                    <option value="Applied">Applied</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Selected">Selected</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                <div className="mt-3 pt-3 border-top border-secondary d-flex gap-2">
                  <button onClick={() => setShowAddModal(false)} type="button" className="btn btn-secondary flex-grow-1">Cancel</button>
                  <button type="submit" className="btn btn-primary flex-grow-1 shadow-lg shadow-primary/20 transition-all hover:scale-105" disabled={loading}>
                    {loading ? <span className="spinner-border spinner-border-sm"></span> : <Plus style={{ width: '0.8rem', height: '0.8rem' }} />}
                    {loading ? 'Adding...' : 'Add Student'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

    
      {showDetailModal && selectedStudent && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ 
          zIndex: 9999, 
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(10px)',
          animation: 'fadeIn 0.3s ease'
        }}>
          <div className="card border-0 shadow-2xl rounded-4" style={{ maxWidth: '500px', width: '95%', maxHeight: '90vh', overflowY: 'auto', background: 'rgba(20,20,30,0.95)' }}>
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-3 border-bottom border-secondary pb-3">
                <h5 className="text-light fw-bold m-0">Student Details</h5>
                <button onClick={() => setShowDetailModal(false)} className="btn btn-close btn-close-white"></button>
              </div>
              
              <div className="text-center mb-3">
                <div className="d-inline-flex align-items-center justify-content-center rounded-circle" style={{ 
                  width: '64px', height: '64px',
                  background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: '#fff'
                }}>
                  {selectedStudent.name?.charAt(0) || 'S'}
                </div>
                <h5 className="text-light fw-bold mt-2">{selectedStudent.name}</h5>
              </div>

              <div className="space-y-2">
                <div className="d-flex justify-content-between p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <span className="text-secondary"><Mail className="me-1" style={{ width: '0.8rem', height: '0.8rem' }} /> Email</span>
                  <span className="text-light">{selectedStudent.email || 'N/A'}</span>
                </div>
                <div className="d-flex justify-content-between p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <span className="text-secondary"><Phone className="me-1" style={{ width: '0.8rem', height: '0.8rem' }} /> Phone</span>
                  <span className="text-light">{selectedStudent.phone || 'N/A'}</span>
                </div>
                <div className="d-flex justify-content-between p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <span className="text-secondary"><GraduationCap className="me-1" style={{ width: '0.8rem', height: '0.8rem' }} /> Department</span>
                  <span className="text-light">{selectedStudent.department || 'N/A'}</span>
                </div>
                <div className="d-flex justify-content-between p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <span className="text-secondary"><Award className="me-1" style={{ width: '0.8rem', height: '0.8rem' }} /> CGPA</span>
                  <span className="text-primary fw-bold">{selectedStudent.cgpa || 'N/A'}</span>
                </div>
                <div className="d-flex justify-content-between p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <span className="text-secondary"><Clock className="me-1" style={{ width: '0.8rem', height: '0.8rem' }} /> Year</span>
                  <span className="text-light">{selectedStudent.year || 'N/A'}</span>
                </div>
                <div className="d-flex justify-content-between p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <span className="text-secondary"><CheckCircle className="me-1" style={{ width: '0.8rem', height: '0.8rem' }} /> Status</span>
                  <span className={`text-${getStatusColor(selectedStudent.status)}`}>{selectedStudent.status || 'N/A'}</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-top border-secondary d-flex gap-2">
                <button onClick={() => setShowDetailModal(false)} className="btn btn-secondary w-100">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

     
      {showEditModal && editStudent && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ 
          zIndex: 9999, 
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(10px)',
          animation: 'fadeIn 0.3s ease'
        }}>
          <div className="card border-0 shadow-2xl rounded-4" style={{ maxWidth: '550px', width: '95%', maxHeight: '90vh', overflowY: 'auto', background: 'rgba(20,20,30,0.95)' }}>
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-3 border-bottom border-secondary pb-3">
                <h5 className="text-light fw-bold m-0 d-flex align-items-center gap-2">
                  <Edit2 className="text-warning" style={{ width: '1.2rem', height: '1.2rem' }} />
                  Edit Student
                </h5>
                <button onClick={() => setShowEditModal(false)} className="btn btn-close btn-close-white"></button>
              </div>

              <div className="mb-3">
                <label className="text-secondary small fw-bold d-block mb-1">Full Name *</label>
                <input 
                  type="text" 
                  className="form-control form-control-sm bg-dark text-light border-secondary" 
                  value={editStudent.name || ''}
                  onChange={(e) => setEditStudent({ ...editStudent, name: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="text-secondary small fw-bold d-block mb-1">Email *</label>
                <input 
                  type="email" 
                  className="form-control form-control-sm bg-dark text-light border-secondary" 
                  value={editStudent.email || ''}
                  onChange={(e) => setEditStudent({ ...editStudent, email: e.target.value })}
                />
              </div>
              <div className="row g-2 mb-3">
                <div className="col-6">
                  <label className="text-secondary small fw-bold d-block mb-1">Department *</label>
                  <select 
                    className="form-select form-select-sm bg-dark text-light border-secondary" 
                    value={editStudent.department || 'CSE'}
                    onChange={(e) => setEditStudent({ ...editStudent, department: e.target.value })}
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
                  <label className="text-secondary small fw-bold d-block mb-1">CGPA *</label>
                  <input 
                    type="number" step="0.01" 
                    className="form-control form-control-sm bg-dark text-light border-secondary" 
                    value={editStudent.cgpa || ''}
                    onChange={(e) => setEditStudent({ ...editStudent, cgpa: e.target.value })}
                  />
                </div>
              </div>
              <div className="row g-2 mb-3">
                <div className="col-6">
                  <label className="text-secondary small fw-bold d-block mb-1">Phone</label>
                  <input 
                    type="text" 
                    className="form-control form-control-sm bg-dark text-light border-secondary" 
                    value={editStudent.phone || ''}
                    onChange={(e) => setEditStudent({ ...editStudent, phone: e.target.value })}
                  />
                </div>
                <div className="col-6">
                  <label className="text-secondary small fw-bold d-block mb-1">Year</label>
                  <input 
                    type="number" 
                    className="form-control form-control-sm bg-dark text-light border-secondary" 
                    value={editStudent.year || ''}
                    onChange={(e) => setEditStudent({ ...editStudent, year: e.target.value })}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="text-secondary small fw-bold d-block mb-1">Status</label>
                <select 
                  className="form-select form-select-sm bg-dark text-light border-secondary" 
                  value={editStudent.status || 'Applied'}
                  onChange={(e) => setEditStudent({ ...editStudent, status: e.target.value })}
                >
                  <option value="Applied">Applied</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Selected">Selected</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div className="mt-3 pt-3 border-top border-secondary d-flex gap-2">
                <button onClick={() => setShowEditModal(false)} className="btn btn-secondary flex-grow-1">Cancel</button>
                <button onClick={handleUpdateStudent} className="btn btn-primary flex-grow-1 shadow-lg shadow-primary/20 transition-all hover:scale-105" disabled={loading}>
                  {loading ? <span className="spinner-border spinner-border-sm"></span> : <Save style={{ width: '0.8rem', height: '0.8rem' }} />}
                  {loading ? 'Updating...' : 'Update Student'}
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