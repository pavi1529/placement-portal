import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, LogIn, UserPlus, ArrowLeft, GraduationCap, User, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function AuthPortal() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(localStorage.getItem('temp_selected_role') || 'student');
  const [authMode, setAuthMode] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem('temp_selected_role');
    if (role) setSelectedRole(role);
  }, []);

  const API_BASE_URL = 'http://localhost:5000/api/auth';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    const endpoint = authMode === 'login' ? `${API_BASE_URL}/login` : `${API_BASE_URL}/register`;
    
    const payload = {
      email: formData.email,
      password: formData.password,
      role: selectedRole,
      ...(authMode === 'signup' && { name: formData.name })
    };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed. Check credentials.');
      }

      localStorage.setItem('placement_token', data.token || 'mock_token_2026');
      localStorage.setItem('user_role', selectedRole);

      if (selectedRole === 'admin') {
        navigate('/admin-terminal');
      } else {
        navigate('/student-dashboard');
      }

    } catch (err) {
      setErrorMsg(err.message || 'Server connection error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 text-light p-2 p-md-3" style={{ 
      background: 'radial-gradient(circle at top right, #070a13, #020617, #0f172a)' 
    }}>
      <button 
        onClick={() => authMode ? setAuthMode(null) : navigate('/')} 
        className="btn btn-link text-muted position-absolute top-0 start-0 m-2 m-md-4 text-decoration-none"
        style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.9rem)' }}
      >
        <ArrowLeft className="d-inline" style={{ width: 'clamp(0.8rem, 1.5vw, 1rem)', height: 'clamp(0.8rem, 1.5vw, 1rem)' }} /> 
        <span className="d-none d-sm-inline">{authMode ? 'Back to Selection' : 'Back to Home'}</span>
      </button>

      <div className="w-100 px-2 px-sm-3" style={{ maxWidth: 'clamp(320px, 90vw, 450px)' }}>
        <div className="p-3 p-sm-4 rounded-3 rounded-md-4 border shadow-lg" style={{ 
          backgroundColor: 'rgba(15, 23, 42, 0.4)', 
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.05)'
        }}>
          {/* Header */}
          <div className="text-center mb-3 mb-sm-4">
            <div className="d-inline-flex p-2 p-sm-3 rounded-circle mb-2 text-white" style={{ 
              background: selectedRole === 'admin' 
                ? 'linear-gradient(135deg, #06b6d4, #0891b2)' 
                : 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
              width: 'clamp(50px, 10vw, 64px)',
              height: 'clamp(50px, 10vw, 64px)',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ShieldCheck className="d-inline" style={{ 
                width: 'clamp(1.5rem, 3vw, 2rem)', 
                height: 'clamp(1.5rem, 3vw, 2rem)' 
              }} />
            </div>
            <h3 className="fw-bold text-uppercase" style={{ 
              fontSize: 'clamp(1.1rem, 3vw, 1.5rem)' 
            }}>
              {selectedRole === 'admin' ? 'Admin Terminal' : 'Student Interface'}
            </h3>
            <p className="text-secondary small" style={{ fontSize: 'clamp(0.6rem, 1vw, 0.75rem)' }}>
              {selectedRole === 'admin' ? 'Manage the placement portal' : 'Access your placement dashboard'}
            </p>
          </div>

          {/* Role Toggle */}
          <div className="d-flex gap-1 gap-md-2 mb-3 mb-sm-4 p-1 rounded-3" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <button
              onClick={() => {
                setSelectedRole('student');
                localStorage.setItem('temp_selected_role', 'student');
                setAuthMode(null);
                setErrorMsg('');
              }}
              className={`flex-grow-1 py-1 py-sm-2 rounded-2 border-0 fw-bold transition-all ${selectedRole === 'student' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-secondary bg-transparent'}`}
              style={{ fontSize: 'clamp(0.6rem, 1vw, 0.7rem)' }}
            >
              <GraduationCap className="d-inline me-1" style={{ 
                width: 'clamp(0.7rem, 1.2vw, 0.8rem)', 
                height: 'clamp(0.7rem, 1.2vw, 0.8rem)' 
              }} />
              Student
            </button>
            <button
              onClick={() => {
                setSelectedRole('admin');
                localStorage.setItem('temp_selected_role', 'admin');
                setAuthMode(null);
                setErrorMsg('');
              }}
              className={`flex-grow-1 py-1 py-sm-2 rounded-2 border-0 fw-bold transition-all ${selectedRole === 'admin' ? 'bg-info text-white shadow-lg shadow-info/20' : 'text-secondary bg-transparent'}`}
              style={{ fontSize: 'clamp(0.6rem, 1vw, 0.7rem)' }}
            >
              <ShieldCheck className="d-inline me-1" style={{ 
                width: 'clamp(0.7rem, 1.2vw, 0.8rem)', 
                height: 'clamp(0.7rem, 1.2vw, 0.8rem)' 
              }} />
              Admin
            </button>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="alert alert-danger py-1 py-sm-2 text-center small mb-2 mb-sm-3" style={{ 
              borderRadius: '10px',
              fontSize: 'clamp(0.65rem, 1vw, 0.75rem)',
              padding: 'clamp(0.3rem, 0.8vw, 0.5rem) clamp(0.8rem, 1.5vw, 1rem)'
            }}>
              {errorMsg}
            </div>
          )}

          {/* Auth Mode Selection */}
          {authMode === null ? (
            <div className="d-flex flex-column gap-2 gap-sm-3 py-2 py-sm-3">
              <button 
                onClick={() => setAuthMode('login')} 
                className="btn py-2 py-sm-3 fw-bold text-white transition-all hover:scale-105"
                style={{ 
                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                  borderRadius: '10px',
                  fontSize: 'clamp(0.8rem, 1.2vw, 0.9rem)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(59,130,246,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <LogIn className="d-inline me-2" style={{ 
                  width: 'clamp(0.9rem, 1.5vw, 1rem)', 
                  height: 'clamp(0.9rem, 1.5vw, 1rem)' 
                }} /> 
                {selectedRole === 'admin' ? 'Admin Login' : 'Student Login'}
              </button>
              <button 
                onClick={() => setAuthMode('signup')} 
                className="btn py-2 py-sm-3 fw-bold text-light transition-all hover:scale-105"
                style={{ 
                  backgroundColor: 'rgba(30, 41, 59, 0.6)',
                  border: '1px solid rgba(59,130,246,0.3)',
                  borderRadius: '10px',
                  fontSize: 'clamp(0.8rem, 1.2vw, 0.9rem)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(59,130,246,0.6)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(59,130,246,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(59,130,246,0.3)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <UserPlus className="d-inline me-2 text-primary" style={{ 
                  width: 'clamp(0.9rem, 1.5vw, 1rem)', 
                  height: 'clamp(0.9rem, 1.5vw, 1rem)' 
                }} /> 
                {selectedRole === 'admin' ? 'Admin Register' : 'Student Sign Up'}
              </button>
            </div>
          ) : (
            /* Login/Signup Form */
            <form onSubmit={handleSubmit}>
              {authMode === 'signup' && (
                <div className="mb-2 mb-sm-3">
                  <label className="small fw-bold" style={{ fontSize: 'clamp(0.6rem, 1vw, 0.7rem)' }}>
                    <User className="d-inline me-1" style={{ 
                      width: 'clamp(0.7rem, 1.2vw, 0.8rem)', 
                      height: 'clamp(0.7rem, 1.2vw, 0.8rem)' 
                    }} />
                    Full Name
                  </label>
                  <input 
                    type="text" 
                    required 
                    className="form-control bg-dark text-white" 
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    style={{ 
                      fontSize: 'clamp(0.8rem, 1.2vw, 0.9rem)',
                      borderRadius: '10px',
                      padding: 'clamp(0.4rem, 0.8vw, 0.6rem) clamp(0.8rem, 1.5vw, 1rem)'
                    }}
                    placeholder="Enter your full name"
                  />
                </div>
              )}
              <div className="mb-2 mb-sm-3">
                <label className="small fw-bold" style={{ fontSize: 'clamp(0.6rem, 1vw, 0.7rem)' }}>
                  <Mail className="d-inline me-1" style={{ 
                    width: 'clamp(0.7rem, 1.2vw, 0.8rem)', 
                    height: 'clamp(0.7rem, 1.2vw, 0.8rem)' 
                  }} />
                  Email Address
                </label>
                <input 
                  type="email" 
                  required 
                  className="form-control bg-dark text-white" 
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  style={{ 
                    fontSize: 'clamp(0.8rem, 1.2vw, 0.9rem)',
                    borderRadius: '10px',
                    padding: 'clamp(0.4rem, 0.8vw, 0.6rem) clamp(0.8rem, 1.5vw, 1rem)'
                  }}
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-3 mb-sm-4">
                <label className="small fw-bold" style={{ fontSize: 'clamp(0.6rem, 1vw, 0.7rem)' }}>
                  <Lock className="d-inline me-1" style={{ 
                    width: 'clamp(0.7rem, 1.2vw, 0.8rem)', 
                    height: 'clamp(0.7rem, 1.2vw, 0.8rem)' 
                  }} />
                  Password
                </label>
                <div className="position-relative">
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    required 
                    className="form-control bg-dark text-white" 
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    style={{ 
                      fontSize: 'clamp(0.8rem, 1.2vw, 0.9rem)',
                      borderRadius: '10px',
                      padding: 'clamp(0.4rem, 0.8vw, 0.6rem) clamp(2.5rem, 4vw, 3rem) clamp(0.4rem, 0.8vw, 0.6rem) clamp(0.8rem, 1.5vw, 1rem)'
                    }}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="btn btn-sm position-absolute text-secondary"
                    style={{ 
                      right: 'clamp(4px, 0.8vw, 8px)', 
                      top: '50%', 
                      transform: 'translateY(-50%)',
                      padding: 'clamp(0.1rem, 0.3vw, 0.2rem) clamp(0.3rem, 0.6vw, 0.5rem)'
                    }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff style={{ 
                        width: 'clamp(0.8rem, 1.2vw, 0.9rem)', 
                        height: 'clamp(0.8rem, 1.2vw, 0.9rem)' 
                      }} />
                    ) : (
                      <Eye style={{ 
                        width: 'clamp(0.8rem, 1.2vw, 0.9rem)', 
                        height: 'clamp(0.8rem, 1.2vw, 0.9rem)' 
                      }} />
                    )}
                  </button>
                </div>
              </div>
              <button 
                type="submit" 
                className="btn w-100 fw-bold py-2 py-sm-3 transition-all hover:scale-105"
                style={{ 
                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                  color: 'white',
                  borderRadius: '12px',
                  fontSize: 'clamp(0.8rem, 1.2vw, 0.9rem)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(59,130,246,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                }}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" style={{ 
                      width: 'clamp(0.8rem, 1.2vw, 1rem)', 
                      height: 'clamp(0.8rem, 1.2vw, 1rem)' 
                    }}></span>
                    Processing...
                  </>
                ) : (
                  authMode === 'login' ? 'Execute Login' : 'Register Identity'
                )}
              </button>

              {/* Back to selection */}
              <div className="text-center mt-2 mt-sm-3">
                <button
                  type="button"
                  className="btn btn-link text-secondary text-decoration-none p-0"
                  style={{ fontSize: 'clamp(0.6rem, 1vw, 0.7rem)' }}
                  onClick={() => setAuthMode(null)}
                >
                  <ArrowLeft className="d-inline me-1" style={{ 
                    width: 'clamp(0.6rem, 1vw, 0.7rem)', 
                    height: 'clamp(0.6rem, 1vw, 0.7rem)' 
                  }} />
                  Back to options
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        .transition-all {
          transition: all 0.3s ease;
        }
        .hover\\:scale-105:hover {
          transform: scale(1.05);
        }
        .form-control {
          background-color: rgba(0,0,0,0.3) !important;
          border: 1px solid rgba(255,255,255,0.1);
          color: #ffffff !important;
        }
        .form-control:focus {
          border-color: rgba(59,130,246,0.5) !important;
          box-shadow: 0 0 0 3px rgba(59,130,246,0.1) !important;
          background-color: rgba(0,0,0,0.4) !important;
        }
        .form-control::placeholder {
          color: rgba(255,255,255,0.3) !important;
        }

        @keyframes spinner-border {
          to { transform: rotate(360deg); }
        }
        .spinner-border {
          animation: spinner-border 0.75s linear infinite;
        }

        @media (max-width: 576px) {
          .rounded-3 {
            border-radius: 8px !important;
          }
          .rounded-md-4 {
            border-radius: 10px !important;
          }
        }
      `}</style>
    </div>
  );
}