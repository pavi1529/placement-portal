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


  const totalApplications = students.length;
  const selectedCount = students.filter(s => s.status === 'Selected').length;
  const shortlistedCount = students.filter(s => s.status === 'Shortlisted').length;
  const appliedCount = students.filter(s => s.status === 'Applied').length;
  const rejectedCount = students.filter(s => s.status === 'Rejected').length;

 
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          student.dept.toLowerCase().includes(searchQuery.toLowerCase());
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
     
      <div className="row g-3 mb-4">
        {[
          { label: "Total Applications", value: totalApplications, color: "primary", icon: Users },
          { label: "Selected", value: selectedCount, color: "success", icon: CheckCircle },
          { label: "Shortlisted", value: shortlistedCount, color: "info", icon: AlertCircle },
          { label: "Applied", value: appliedCount, color: "warning", icon: Clock },
          { label: "Rejected", value: rejectedCount, color: "danger", icon: XCircle },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="col-6 col-lg">
              <div className="card border-0 shadow-lg rounded-4 h-100 transition-all hover:translate-y-1" style={{ background: 'rgba(20,20,30,0.6)', backdropFilter: 'blur(10px)' }}>
                <div className="card-body p-3">
                  <div className="d-flex align-items-center justify-content-between">
                    <span className="text-secondary small fw-bold text-uppercase" style={{ fontSize: '0.55rem' }}>{stat.label}</span>
                    <div className={`p-2 rounded-3`} style={{ background: `rgba(var(--bs-${stat.color}-rgb), 0.1)`, border: `1px solid rgba(var(--bs-${stat.color}-rgb), 0.2)` }}>
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
            <div className="d-flex align-items-center gap-2 bg-dark px-3 py-2 rounded-3 border border-secondary flex-grow-1 transition-all focus-within:border-primary" style={{ maxWidth: '300px' }}>
              <Search className="text-secondary" style={{ width: '0.8rem', height: '0.8rem' }} />
              <input 
                type="text" 
                className="form-control form-control-sm bg-transparent border-0 text-light focus:outline-none" 
                placeholder="Search students..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ fontSize: '0.75rem' }}
              />
            </div>
            <div className="d-flex align-items-center gap-2 bg-dark px-3 py-2 rounded-3 border border-secondary">
              <Filter className="text-secondary" style={{ width: '0.7rem', height: '0.7rem' }} />
              <select 
                className="form-select form-select-sm bg-transparent border-0 text-light focus:outline-none" 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                style={{ fontSize: '0.75rem', width: '140px' }}
              >
                <option value="ALL">All Status</option>
                <option value="Selected">Selected</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="Applied">Applied</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <button 
              onClick={() => setShowAddApplicationModal(true)}
              className="btn btn-primary btn-sm d-flex align-items-center gap-1 ms-auto shadow-lg shadow-primary/20 transition-all hover:scale-105"
              style={{ borderRadius: '10px', fontWeight: '600' }}
            >
              <Plus style={{ width: '0.9rem', height: '0.9rem' }} />
              Add New Application
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
                <th className="p-3">Department</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody style={{ fontSize: '0.75rem' }}>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student, index) => {
                  const statusConfig = getStatusConfig(student.status);
                  const StatusIcon = statusConfig.icon;
                  return (
                    <tr 
                      key={student.id} 
                      className="transition-all hover:bg-white/5 animate-slide-up"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <td className="p-3">
                        <div className="d-flex align-items-center gap-2">
                          <div className="d-flex align-items-center justify-content-center rounded-circle" style={{ 
                            width: '32px', height: '32px',
                            background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                            fontSize: '0.7rem',
                            fontWeight: 'bold',
                            color: '#fff'
                          }}>
                            {student.name.charAt(0)}
                          </div>
                          <div>
                            <span className="fw-bold text-light">{student.name}</span>
                            <span className="text-secondary d-block" style={{ fontSize: '0.55rem' }}>ID: #{student.id}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <span className="badge bg-secondary bg-opacity-10 text-secondary border border-secondary">
                          {student.dept}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className={`badge bg-${statusConfig.color} bg-opacity-10 text-${statusConfig.color} border border-${statusConfig.color} d-inline-flex align-items-center gap-1 px-3 py-2`}>
                          <StatusIcon style={{ width: '0.7rem', height: '0.7rem' }} />
                          {student.status}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <div className="d-flex gap-1 justify-content-center flex-wrap">
                          <button 
                            onClick={() => handleViewStudent(student)}
                            className="btn btn-sm btn-outline-info d-flex align-items-center gap-1 shadow-sm transition-all hover:scale-110"
                            style={{ borderRadius: '8px' }}
                          >
                            <Eye style={{ width: '0.7rem', height: '0.7rem' }} />
                          </button>
                          <button 
                            onClick={() => handleShortlist && handleShortlist(student.id, 'Shortlisted')} 
                            className="btn btn-sm btn-outline-info d-flex align-items-center gap-1 shadow-sm transition-all hover:scale-110"
                            style={{ borderRadius: '8px' }}
                          >
                            <UserCheck style={{ width: '0.7rem', height: '0.7rem' }} />
                            <span style={{ fontSize: '0.55rem' }}>Shortlist</span>
                          </button>
                          <button 
                            onClick={() => handleShortlist && handleShortlist(student.id, 'Selected')} 
                            className="btn btn-sm btn-outline-success d-flex align-items-center gap-1 shadow-sm transition-all hover:scale-110"
                            style={{ borderRadius: '8px' }}
                          >
                            <UserPlus style={{ width: '0.7rem', height: '0.7rem' }} />
                            <span style={{ fontSize: '0.55rem' }}>Select</span>
                          </button>
                          <button 
                            onClick={() => handleShortlist && handleShortlist(student.id, 'Rejected')} 
                            className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1 shadow-sm transition-all hover:scale-110"
                            style={{ borderRadius: '8px' }}
                          >
                            <UserX style={{ width: '0.7rem', height: '0.7rem' }} />
                            <span style={{ fontSize: '0.55rem' }}>Reject</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="4" className="text-center p-5 text-secondary">
                    <Users className="mx-auto" style={{ width: '3rem', height: '3rem' }} />
                    <p className="mt-2">No applications found</p>
                    <p className="small">Try adjusting your search or filters</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

     
      {showDetailModal && selectedStudent && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ 
          zIndex: 9999, 
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(10px)',
          animation: 'fadeIn 0.3s ease'
        }}>
          <div className="card border-0 shadow-2xl rounded-4" style={{ maxWidth: '500px', width: '95%', background: 'rgba(20,20,30,0.95)', backdropFilter: 'blur(20px)' }}>
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-3 border-bottom border-secondary pb-3">
                <h5 className="text-light fw-bold m-0 d-flex align-items-center gap-2">
                  <Users className="text-primary" style={{ width: '1.2rem', height: '1.2rem' }} />
                  Application Details
                </h5>
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
                  {selectedStudent.name.charAt(0)}
                </div>
                <h5 className="text-light fw-bold mt-2">{selectedStudent.name}</h5>
                <span className="text-secondary small">ID: #{selectedStudent.id}</span>
              </div>

              <div className="space-y-2">
                <div className="d-flex justify-content-between p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <span className="text-secondary"><Award className="me-1" style={{ width: '0.8rem', height: '0.8rem' }} /> Department</span>
                  <span className="text-light">{selectedStudent.dept}</span>
                </div>
                <div className="d-flex justify-content-between p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <span className="text-secondary"><UserCheck className="me-1" style={{ width: '0.8rem', height: '0.8rem' }} /> Status</span>
                  <span className={`text-${getStatusConfig(selectedStudent.status).color} fw-bold`}>
                    {selectedStudent.status}
                  </span>
                </div>
                <div className="d-flex justify-content-between p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <span className="text-secondary"><Calendar className="me-1" style={{ width: '0.8rem', height: '0.8rem' }} /> Applied Date</span>
                  <span className="text-light">2026-07-15</span>
                </div>
                <div className="d-flex justify-content-between p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <span className="text-secondary"><Briefcase className="me-1" style={{ width: '0.8rem', height: '0.8rem' }} /> Applied For</span>
                  <span className="text-light">Member Technical Staff</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-top border-secondary">
                <label className="text-secondary small fw-bold d-block mb-2">Quick Actions</label>
                <div className="d-flex gap-2">
                  <button 
                    onClick={() => {
                      handleShortlist && handleShortlist(selectedStudent.id, 'Shortlisted');
                      setShowDetailModal(false);
                    }}
                    className="btn btn-info btn-sm flex-grow-1 d-flex align-items-center justify-content-center gap-1 shadow-sm transition-all hover:scale-105"
                  >
                    <UserCheck style={{ width: '0.8rem', height: '0.8rem' }} /> Shortlist
                  </button>
                  <button 
                    onClick={() => {
                      handleShortlist && handleShortlist(selectedStudent.id, 'Selected');
                      setShowDetailModal(false);
                    }}
                    className="btn btn-success btn-sm flex-grow-1 d-flex align-items-center justify-content-center gap-1 shadow-sm transition-all hover:scale-105"
                  >
                    <UserPlus style={{ width: '0.8rem', height: '0.8rem' }} /> Select
                  </button>
                  <button 
                    onClick={() => {
                      handleShortlist && handleShortlist(selectedStudent.id, 'Rejected');
                      setShowDetailModal(false);
                    }}
                    className="btn btn-danger btn-sm flex-grow-1 d-flex align-items-center justify-content-center gap-1 shadow-sm transition-all hover:scale-105"
                  >
                    <UserX style={{ width: '0.8rem', height: '0.8rem' }} /> Reject
                  </button>
                </div>
              </div>

              <div className="mt-3 pt-3 border-top border-secondary d-flex gap-2">
                <button onClick={() => setShowDetailModal(false)} className="btn btn-secondary w-100">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      
      {showAddApplicationModal && (
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
                  <FileText className="text-primary" style={{ width: '1.2rem', height: '1.2rem' }} />
                  Add New Application
                </h5>
                <button 
                  onClick={() => setShowAddApplicationModal(false)} 
                  className="btn btn-close btn-close-white"
                ></button>
              </div>

              <div className="row g-3">
                <div className="col-12">
                  <label className="text-secondary small fw-bold d-block mb-1">Full Name *</label>
                  <input 
                    type="text" 
                    className="form-control form-control-sm bg-dark text-light border-secondary" 
                    placeholder="Enter student name"
                    value={newApplication.name}
                    onChange={(e) => setNewApplication({ ...newApplication, name: e.target.value })}
                    style={{ fontSize: '0.8rem' }}
                  />
                </div>

                <div className="col-12">
                  <label className="text-secondary small fw-bold d-block mb-1">Email Address *</label>
                  <input 
                    type="email" 
                    className="form-control form-control-sm bg-dark text-light border-secondary" 
                    placeholder="student@email.com"
                    value={newApplication.email}
                    onChange={(e) => setNewApplication({ ...newApplication, email: e.target.value })}
                    style={{ fontSize: '0.8rem' }}
                  />
                </div>

                <div className="col-6">
                  <label className="text-secondary small fw-bold d-block mb-1">Phone Number</label>
                  <input 
                    type="text" 
                    className="form-control form-control-sm bg-dark text-light border-secondary" 
                    placeholder="+91 9876543210"
                    value={newApplication.phone}
                    onChange={(e) => setNewApplication({ ...newApplication, phone: e.target.value })}
                    style={{ fontSize: '0.8rem' }}
                  />
                </div>

                <div className="col-6">
                  <label className="text-secondary small fw-bold d-block mb-1">CGPA</label>
                  <input 
                    type="text" 
                    className="form-control form-control-sm bg-dark text-light border-secondary" 
                    placeholder="8.5"
                    value={newApplication.cgpa}
                    onChange={(e) => setNewApplication({ ...newApplication, cgpa: e.target.value })}
                    style={{ fontSize: '0.8rem' }}
                  />
                </div>

                <div className="col-6">
                  <label className="text-secondary small fw-bold d-block mb-1">Department</label>
                  <select 
                    className="form-select form-select-sm bg-dark text-light border-secondary" 
                    value={newApplication.department}
                    onChange={(e) => setNewApplication({ ...newApplication, department: e.target.value })}
                    style={{ fontSize: '0.8rem' }}
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
                  <label className="text-secondary small fw-bold d-block mb-1">Year</label>
                  <select 
                    className="form-select form-select-sm bg-dark text-light border-secondary" 
                    value={newApplication.year}
                    onChange={(e) => setNewApplication({ ...newApplication, year: e.target.value })}
                    style={{ fontSize: '0.8rem' }}
                  >
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
                </div>

                <div className="col-12">
                  <label className="text-secondary small fw-bold d-block mb-1">Applied For</label>
                  <input 
                    type="text" 
                    className="form-control form-control-sm bg-dark text-light border-secondary" 
                    placeholder="Position / Job Title"
                    value={newApplication.appliedFor}
                    onChange={(e) => setNewApplication({ ...newApplication, appliedFor: e.target.value })}
                    style={{ fontSize: '0.8rem' }}
                  />
                </div>

                <div className="col-12">
                  <label className="text-secondary small fw-bold d-block mb-1">Status</label>
                  <select 
                    className="form-select form-select-sm bg-dark text-light border-secondary" 
                    value={newApplication.status}
                    onChange={(e) => setNewApplication({ ...newApplication, status: e.target.value })}
                    style={{ fontSize: '0.8rem' }}
                  >
                    <option value="Applied">Applied</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Selected">Selected</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>

              <div className="mt-3 pt-3 border-top border-secondary d-flex gap-2">
                <button 
                  onClick={() => setShowAddApplicationModal(false)} 
                  className="btn btn-secondary flex-grow-1"
                  style={{ borderRadius: '10px', fontWeight: '600' }}
                >
                  Cancel
                </button>
                <button 
                  onClick={handleAddApplication}
                  className="btn btn-primary flex-grow-1 d-flex align-items-center justify-content-center gap-1 shadow-lg shadow-primary/20 transition-all hover:scale-105"
                  style={{ borderRadius: '10px', fontWeight: '600' }}
                >
                  <Plus style={{ width: '0.9rem', height: '0.9rem' }} />
                  Add Application
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
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        .animate-slide-up {
          animation: slide-up 0.3s ease-out forwards;
          opacity: 0;
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
        
        .focus\\:border-primary:focus {
          border-color: #4f46e5 !important;
        }
        
        .focus\\:outline-none:focus {
          outline: none !important;
        }
        
        .space-y-2 > * + * {
          margin-top: 0.5rem;
        }
        
        /* Card Styles */
        .card {
          transition: all 0.3s ease;
        }
        
        .card:hover {
          box-shadow: 0 20px 40px rgba(0,0,0,0.4) !important;
        }
        
        /* Form Controls */
        .form-control, .form-select {
          transition: all 0.3s ease;
        }
        
        .form-control:focus, .form-select:focus {
          border-color: rgba(79, 70, 229, 0.5) !important;
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1) !important;
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
      `}</style>
    </div>
  );
}