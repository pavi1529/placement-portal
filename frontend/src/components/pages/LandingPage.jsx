import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, GraduationCap, UserCheck, ArrowRight, Award, 
  Sparkles, Globe, Building2, Users, Briefcase, Code2,
  Zap, Target, Star, TrendingUp, CheckCircle, Crown,
  Rocket, Brain, BookOpen, Calendar, Lock, Shield,
  ChevronRight, Heart, Zap as ZapIcon, Coffee, LayoutDashboard,
  BarChart3, Settings, Play, Circle, Loader2,
  AlertCircle, Eye, EyeOff, Mail, User, LogIn, UserPlus,
  XCircle, Check
} from 'lucide-react';

const API_URL = 'http://localhost:5000/api';

export default function LandingPage({ 
  onLoginClick, 
  onSignUpClick, 
  onAdminLoginSuccess, 
  setFormData,
  formData,
  loading: parentLoading,
  error: parentError
}) {
 
  const [isAdminFormOpen, setIsAdminFormOpen] = useState(false);
  const [isStudentFormOpen, setIsStudentFormOpen] = useState(true);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [adminData, setAdminData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [studentError, setStudentError] = useState('');
  const [studentSuccess, setStudentSuccess] = useState('');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [adminLoading, setAdminLoading] = useState(false);
  const [studentLoading, setStudentLoading] = useState(false);
  const [showStudentPassword, setShowStudentPassword] = useState(false);
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  
  // Student Login State
  const [studentLoginData, setStudentLoginData] = useState({
    email: '',
    password: ''
  });

  // Student Register State
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    department: 'CSE',
    cgpa: ''
  });
  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerError, setRegisterError] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState('');
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);

  useEffect(() => {
    setStudentError('');
    setErrorMessage('');
    setStudentSuccess('');
    setRegisterError('');
    setRegisterSuccess('');
  }, [isLoginMode, isRegisterMode]);

  // Check auth - only redirect on specific paths
  useEffect(() => {
    const path = window.location.pathname;
    
    if (path === '/' || path === '/landing' || path === '/login') {
      setIsCheckingAuth(false);
      return;
    }

    const token = localStorage.getItem('token');
    const adminToken = localStorage.getItem('adminToken');
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (token || adminToken) {
      if (user && user.role === 'admin') {
        window.location.href = '/admin-dashboard';
      } else if (user && user.role === 'student') {
        window.location.href = '/student-dashboard';
      }
    }
    
    setIsCheckingAuth(false);
  }, []);

 
  const handleStudentLogin = async (e) => {
    e.preventDefault();
    setStudentError('');
    setStudentSuccess('');
    setStudentLoading(true);

    if (!studentLoginData.email || !studentLoginData.password) {
      setStudentError('Please fill in email and password!');
      setStudentLoading(false);
      return;
    }

    try {
      const email = String(studentLoginData.email).trim();
      const password = String(studentLoginData.password);

      console.log('🔐 Student Login Attempt:', email);

      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          role: 'student'
        }),
      });

      const data = await response.json();
      console.log('📦 Student Login Response:', data);

      if (!response.ok) {
        if (response.status === 401) {
          setStudentError('❌ Invalid email or password. Please check your credentials or sign up.');
        } else {
          throw new Error(data.message || 'Login failed');
        }
        setStudentLoading(false);
        return;
      }

      if (data.success) {
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('studentToken', data.data.token);
        localStorage.setItem('studentName', data.data.name);
        localStorage.setItem('studentEmail', data.data.email);
        localStorage.setItem('userRole', 'student');
        localStorage.setItem('userId', data.data.id);
        localStorage.setItem('user', JSON.stringify(data.data));

        setStudentSuccess('✅ Login successful! Redirecting...');

        setTimeout(() => {
          window.location.href = '/student-dashboard';
        }, 1000);
      }
    } catch (error) {
      console.error('❌ Student Login Error:', error);
      setStudentError(error.message || 'Invalid email or password');
    } finally {
      setStudentLoading(false);
    }
  };


  const handleStudentRegister = async (e) => {
    e.preventDefault();
    setRegisterError('');
    setRegisterSuccess('');
    setRegisterLoading(true);

    if (!registerData.name || !registerData.email || !registerData.password) {
      setRegisterError('Please fill in all required fields');
      setRegisterLoading(false);
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      setRegisterError('Passwords do not match');
      setRegisterLoading(false);
      return;
    }

    if (registerData.password.length < 6) {
      setRegisterError('Password must be at least 6 characters');
      setRegisterLoading(false);
      return;
    }

    try {
      console.log('📝 Student Registration:', registerData.email);

      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: registerData.name,
          email: registerData.email,
          password: registerData.password,
          role: 'student',
          department: registerData.department || 'CSE',
          cgpa: parseFloat(registerData.cgpa) || 0
        }),
      });

      const data = await response.json();
      console.log('📦 Register Response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      if (data.success) {
        setRegisterSuccess('✅ Registration successful! Please login with your credentials.');
        setRegisterData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          department: 'CSE',
          cgpa: ''
        });
        
        setStudentLoginData({
          email: registerData.email,
          password: ''
        });
        
        setTimeout(() => {
          setIsRegisterMode(false);
          setIsLoginMode(true);
          setRegisterSuccess('');
          setStudentSuccess('✅ Account created! Please login with your credentials.');
        }, 1500);
      }
    } catch (error) {
      console.error('❌ Register Error:', error);
      setRegisterError(error.message || 'Registration failed');
    } finally {
      setRegisterLoading(false);
    }
  };

 
  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setAdminLoading(true);

    if (!adminData.email || !adminData.password) {
      setErrorMessage('Please fill in all fields!');
      setAdminLoading(false);
      return;
    }

    try {
      const email = String(adminData.email).trim();
      const password = String(adminData.password);

      console.log('🔐 Admin Login Attempt:', email);

      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          role: 'admin'
        }),
      });

      const data = await response.json();
      console.log('📦 Admin Login Response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Invalid admin credentials');
      }

      if (data.success) {
        localStorage.setItem('adminToken', data.data.token);
        localStorage.setItem('adminName', data.data.name);
        localStorage.setItem('adminEmail', data.data.email);
        localStorage.setItem('userRole', 'admin');
        localStorage.setItem('userId', data.data.id);
        localStorage.setItem('user', JSON.stringify(data.data));

        if (onAdminLoginSuccess) {
          onAdminLoginSuccess(data.data);
        }

        setTimeout(() => {
          window.location.href = '/admin-dashboard';
        }, 500);
      }
    } catch (error) {
      console.error('❌ Admin Login Error:', error);
      setErrorMessage(error.message || 'Invalid admin credentials');
    } finally {
      setAdminLoading(false);
    }
  };

 
  const renderStudentLoginForm = () => (
    <form onSubmit={handleStudentLogin} className="vstack gap-2">
      <div className="position-relative">
        <Mail className="position-absolute" style={{ 
          left: '10px', top: '50%', transform: 'translateY(-50%)', 
          width: '0.8rem', height: '0.8rem', color: '#6c757d' 
        }} />
        <input 
          type="email" 
          className="form-control form-control-sm bg-dark text-light border-secondary ps-5" 
          placeholder="Email Address *" 
          value={studentLoginData.email}
          onChange={(e) => setStudentLoginData({...studentLoginData, email: e.target.value})} 
          required 
          style={{ fontSize: '0.75rem', borderRadius: '10px', borderColor: 'rgba(255,255,255,0.06)' }}
        />
      </div>
      <div className="position-relative">
        <Lock className="position-absolute" style={{ 
          left: '10px', top: '50%', transform: 'translateY(-50%)', 
          width: '0.8rem', height: '0.8rem', color: '#6c757d' 
        }} />
        <input 
          type={showStudentPassword ? 'text' : 'password'} 
          className="form-control form-control-sm bg-dark text-light border-secondary ps-5" 
          placeholder="Password *" 
          value={studentLoginData.password}
          onChange={(e) => setStudentLoginData({...studentLoginData, password: e.target.value})} 
          required 
          style={{ fontSize: '0.75rem', borderRadius: '10px', borderColor: 'rgba(255,255,255,0.06)' }}
        />
        <button
          type="button"
          className="btn btn-sm position-absolute text-secondary"
          style={{ right: '8px', top: '50%', transform: 'translateY(-50%)' }}
          onClick={() => setShowStudentPassword(!showStudentPassword)}
        >
          {showStudentPassword ? <EyeOff style={{ width: '0.8rem', height: '0.8rem' }} /> : <Eye style={{ width: '0.8rem', height: '0.8rem' }} />}
        </button>
      </div>
      <button 
        type="submit" 
        className="btn btn-primary w-100 fw-bold py-2 rounded-pill"
        style={{ 
          fontSize: '0.75rem',
          background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
          border: 'none',
          boxShadow: '0 8px 30px rgba(59, 130, 246, 0.3)',
          transition: 'all 0.3s ease',
          opacity: studentLoading ? 0.7 : 1
        }}
        disabled={studentLoading}
      >
        {studentLoading ? (
          <>
            <Loader2 className="spinner-border spinner-border-sm me-1" style={{ width: '0.8rem', height: '0.8rem' }} />
            Logging in...
          </>
        ) : (
          <>
            <LogIn className="me-1" style={{ width: '0.8rem', height: '0.8rem' }} />
            Login to Dashboard
          </>
        )}
      </button>
      <div className="text-center mt-1">
        <button 
          type="button"
          className="btn btn-link text-secondary p-0"
          style={{ fontSize: '0.6rem', textDecoration: 'none' }}
          onClick={() => { 
            setIsRegisterMode(true); 
            setIsLoginMode(false);
            setStudentError('');
            setStudentSuccess('');
            setRegisterError('');
            setRegisterSuccess('');
          }}
        >
          <UserPlus style={{ width: '0.7rem', height: '0.7rem' }} className="me-1" />
          Don't have an account? Sign up
        </button>
      </div>
    </form>
  );

  
  const renderStudentRegisterForm = () => (
    <form onSubmit={handleStudentRegister} className="vstack gap-2">
      <div className="position-relative">
        <User className="position-absolute" style={{ 
          left: '10px', top: '50%', transform: 'translateY(-50%)', 
          width: '0.8rem', height: '0.8rem', color: '#6c757d' 
        }} />
        <input 
          type="text" 
          className="form-control form-control-sm bg-dark text-light border-secondary ps-5" 
          placeholder="Full Name *" 
          value={registerData.name}
          onChange={(e) => setRegisterData({...registerData, name: e.target.value})} 
          required 
          style={{ fontSize: '0.75rem', borderRadius: '10px', borderColor: 'rgba(255,255,255,0.06)' }}
        />
      </div>
      <div className="position-relative">
        <Mail className="position-absolute" style={{ 
          left: '10px', top: '50%', transform: 'translateY(-50%)', 
          width: '0.8rem', height: '0.8rem', color: '#6c757d' 
        }} />
        <input 
          type="email" 
          className="form-control form-control-sm bg-dark text-light border-secondary ps-5" 
          placeholder="Email Address *" 
          value={registerData.email}
          onChange={(e) => setRegisterData({...registerData, email: e.target.value})} 
          required 
          style={{ fontSize: '0.75rem', borderRadius: '10px', borderColor: 'rgba(255,255,255,0.06)' }}
        />
      </div>
      <div className="position-relative">
        <Lock className="position-absolute" style={{ 
          left: '10px', top: '50%', transform: 'translateY(-50%)', 
          width: '0.8rem', height: '0.8rem', color: '#6c757d' 
        }} />
        <input 
          type={showRegisterPassword ? 'text' : 'password'} 
          className="form-control form-control-sm bg-dark text-light border-secondary ps-5" 
          placeholder="Password * (min 6 chars)" 
          value={registerData.password}
          onChange={(e) => setRegisterData({...registerData, password: e.target.value})} 
          required 
          minLength="6"
          style={{ fontSize: '0.75rem', borderRadius: '10px', borderColor: 'rgba(255,255,255,0.06)' }}
        />
        <button
          type="button"
          className="btn btn-sm position-absolute text-secondary"
          style={{ right: '8px', top: '50%', transform: 'translateY(-50%)' }}
          onClick={() => setShowRegisterPassword(!showRegisterPassword)}
        >
          {showRegisterPassword ? <EyeOff style={{ width: '0.8rem', height: '0.8rem' }} /> : <Eye style={{ width: '0.8rem', height: '0.8rem' }} />}
        </button>
      </div>
      <div className="position-relative">
        <Lock className="position-absolute" style={{ 
          left: '10px', top: '50%', transform: 'translateY(-50%)', 
          width: '0.8rem', height: '0.8rem', color: '#6c757d' 
        }} />
        <input 
          type="password" 
          className="form-control form-control-sm bg-dark text-light border-secondary ps-5" 
          placeholder="Confirm Password *" 
          value={registerData.confirmPassword}
          onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})} 
          required 
          style={{ fontSize: '0.75rem', borderRadius: '10px', borderColor: 'rgba(255,255,255,0.06)' }}
        />
      </div>
      <div className="row g-1">
        <div className="col-6">
          <select 
            className="form-select form-select-sm bg-dark text-light border-secondary"
            value={registerData.department}
            onChange={(e) => setRegisterData({...registerData, department: e.target.value})}
            style={{ fontSize: '0.65rem', borderRadius: '10px' }}
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
          <input 
            type="number" 
            step="0.01"
            className="form-control form-control-sm bg-dark text-light border-secondary" 
            placeholder="CGPA" 
            value={registerData.cgpa}
            onChange={(e) => setRegisterData({...registerData, cgpa: e.target.value})}
            style={{ fontSize: '0.75rem', borderRadius: '10px', borderColor: 'rgba(255,255,255,0.06)' }}
          />
        </div>
      </div>
      <button 
        type="submit" 
        className="btn btn-success w-100 fw-bold py-2 rounded-pill"
        style={{ 
          fontSize: '0.75rem',
          background: 'linear-gradient(135deg, #22c55e, #16a34a)',
          border: 'none',
          boxShadow: '0 8px 30px rgba(34, 197, 94, 0.3)',
          transition: 'all 0.3s ease',
          opacity: registerLoading ? 0.7 : 1
        }}
        disabled={registerLoading}
      >
        {registerLoading ? (
          <>
            <Loader2 className="spinner-border spinner-border-sm me-1" style={{ width: '0.8rem', height: '0.8rem' }} />
            Creating Account...
          </>
        ) : (
          <>
            <UserPlus className="me-1" style={{ width: '0.8rem', height: '0.8rem' }} />
            Create Account
          </>
        )}
      </button>
      <div className="text-center mt-1">
        <button 
          type="button"
          className="btn btn-link text-secondary p-0"
          style={{ fontSize: '0.6rem', textDecoration: 'none' }}
          onClick={() => { 
            setIsRegisterMode(false); 
            setIsLoginMode(true);
            setRegisterError('');
            setRegisterSuccess('');
            setStudentError('');
            setStudentSuccess('');
          }}
        >
          <ArrowRight style={{ width: '0.7rem', height: '0.7rem' }} className="me-1" />
          Back to Login
        </button>
      </div>
    </form>
  );

 
  const renderAdminForm = () => (
    <form onSubmit={handleAdminLogin} className="vstack gap-2">
      <div className="position-relative">
        <Mail className="position-absolute" style={{ 
          left: '10px', top: '50%', transform: 'translateY(-50%)', 
          width: '0.8rem', height: '0.8rem', color: '#6c757d' 
        }} />
        <input 
          type="email" 
          className="form-control form-control-sm bg-dark text-light border-secondary ps-5" 
          placeholder="Admin Email" 
          value={adminData.email} 
          onChange={e => setAdminData({...adminData, email: e.target.value})} 
          required 
          style={{ fontSize: '0.75rem', borderRadius: '10px', borderColor: 'rgba(255,255,255,0.06)' }}
        />
      </div>
      <div className="position-relative">
        <Lock className="position-absolute" style={{ 
          left: '10px', top: '50%', transform: 'translateY(-50%)', 
          width: '0.8rem', height: '0.8rem', color: '#6c757d' 
        }} />
        <input 
          type={showAdminPassword ? 'text' : 'password'} 
          className="form-control form-control-sm bg-dark text-light border-secondary ps-5" 
          placeholder="Admin Password" 
          value={adminData.password} 
          onChange={e => setAdminData({...adminData, password: e.target.value})} 
          required 
          style={{ fontSize: '0.75rem', borderRadius: '10px', borderColor: 'rgba(255,255,255,0.06)' }}
        />
        <button
          type="button"
          className="btn btn-sm position-absolute text-secondary"
          style={{ right: '8px', top: '50%', transform: 'translateY(-50%)' }}
          onClick={() => setShowAdminPassword(!showAdminPassword)}
        >
          {showAdminPassword ? <EyeOff style={{ width: '0.8rem', height: '0.8rem' }} /> : <Eye style={{ width: '0.8rem', height: '0.8rem' }} />}
        </button>
      </div>
      <button 
        type="submit" 
        className="btn btn-info w-100 fw-bold py-2 rounded-pill"
        style={{ 
          fontSize: '0.75rem',
          background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
          border: 'none',
          boxShadow: '0 8px 30px rgba(6, 182, 212, 0.3)',
          transition: 'all 0.3s ease',
          opacity: adminLoading ? 0.7 : 1
        }}
        disabled={adminLoading}
      >
        {adminLoading ? (
          <>
            <Loader2 className="spinner-border spinner-border-sm me-1" style={{ width: '0.8rem', height: '0.8rem' }} />
            Verifying...
          </>
        ) : (
          <>
            <ShieldCheck className="me-1" style={{ width: '0.8rem', height: '0.8rem' }} />
            Verify & Access
          </>
        )}
      </button>
      <div className="text-center mt-1">
        <small className="text-secondary" style={{ fontSize: '0.45rem' }}>
          Test: admin@gmail.com / admin123
        </small>
      </div>
    </form>
  );

  
  const stats = [
    { icon: Users, label: "Students Placed", value: "482+", color: "#3b82f6", bg: "rgba(59,130,246,0.15)" },
    { icon: Building2, label: "Partner Companies", value: "48+", color: "#22c55e", bg: "rgba(34,197,94,0.15)" },
    { icon: Briefcase, label: "Job Openings", value: "12+", color: "#eab308", bg: "rgba(234,179,8,0.15)" },
    { icon: Award, label: "Tests Conducted", value: "24+", color: "#8b5cf6", bg: "rgba(139,92,246,0.15)" },
  ];

  const features = [
    { icon: Shield, label: "Secure Access", desc: "Role-based authentication" },
    { icon: ZapIcon, label: "Fast Management", desc: "Quick CRUD operations" },
    { icon: TrendingUp, label: "Analytics", desc: "Real-time insights" },
    { icon: BarChart3, label: "Statistics", desc: "Comprehensive data" },
  ];

 
  if (parentLoading || isCheckingAuth) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: '#e3f2fd' }}>
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-secondary mt-3">Loading...</p>
        </div>
      </div>
    );
  }

 
  return (
    <div className="min-vh-100 d-flex flex-column text-light position-relative overflow-hidden"
      style={{ 
        background: 'linear-gradient(135deg, #e3f2fd, #bbdefb, #90caf9, #64b5f6)',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
      }}
    >
      {/* Animated Background */}
      <div className="position-absolute w-100 h-100" style={{ zIndex: 0 }}>
        <div className="position-absolute rounded-circle" style={{ 
          width: '600px', height: '600px', 
          background: 'radial-gradient(circle, rgba(255,255,255,0.3), transparent 70%)',
          top: '-200px', right: '-200px',
          animation: 'float-slow 12s ease-in-out infinite'
        }}></div>
        <div className="position-absolute rounded-circle" style={{ 
          width: '400px', height: '400px', 
          background: 'radial-gradient(circle, rgba(255,255,255,0.2), transparent 70%)',
          bottom: '-100px', left: '-100px',
          animation: 'float-slow 15s ease-in-out infinite reverse'
        }}></div>
        <div className="position-absolute" style={{
          top: '20%', left: '5%',
          animation: 'float 15s ease-in-out infinite'
        }}>
          <Sparkles className="text-blue-400/20" style={{ width: '4rem', height: '4rem' }} />
        </div>
        <div className="position-absolute" style={{
          bottom: '25%', right: '8%',
          animation: 'float 20s ease-in-out infinite reverse'
        }}>
          <Globe className="text-blue-500/15" style={{ width: '5rem', height: '5rem' }} />
        </div>
      </div>

      {/* Header with Block Text */}
      <header className="navbar navbar-dark py-3 px-4 position-relative" style={{ zIndex: 1 }}>
        <div className="container d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-3">
            <div className="p-2.5 rounded-3 text-white d-flex align-items-center justify-content-center shadow-lg" 
              style={{ 
                background: 'linear-gradient(135deg, #1a73e8, #4a90d9)',
                boxShadow: '0 8px 30px rgba(26, 115, 232, 0.3)'
              }}
            >
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              {/* BLOCK TEXT - PLACEMENT PORTAL */}
              <div className="navbar-brand mb-0 h1 fw-black tracking-wider text-white" 
                style={{ 
                  fontSize: '1.8rem', 
                  fontWeight: '900',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  fontFamily: "'Inter', 'Arial Black', sans-serif",
                  textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
                }}
              >
                PLACEMENT PORTAL
              </div>
              {/* BLOCK TEXT - INTEGRATED PLACEMENT SYSTEM */}
              <div className="d-block text-white-50" 
                style={{ 
                  fontSize: '0.65rem', 
                  letterSpacing: '0.2em',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  fontFamily: "'Inter', 'Arial Black', sans-serif",
                }}
              >
                
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center gap-2">
            {(localStorage.getItem('token') || localStorage.getItem('adminToken')) && (
              <button 
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
                className="btn btn-outline-danger btn-sm px-3 py-1"
                style={{ fontSize: '0.6rem', borderRadius: '8px' }}
              >
                Logout
              </button>
            )}
            <span className="badge px-3 py-2 rounded-pill" style={{ 
              background: 'rgba(34, 197, 94, 0.2)',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              color: '#1b7a34',
              fontSize: '0.6rem'
            }}>
              <span className="d-inline-block rounded-circle bg-success me-1" style={{ width: '0.4rem', height: '0.4rem' }}></span>
              Live
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container my-auto py-4 position-relative" style={{ zIndex: 1 }}>
        <div className="row align-items-center g-5">
          {/* Left Section - Hero */}
          <div className="col-lg-6 text-center text-lg-start">
            <div className="d-inline-flex align-items-center gap-2 mb-4 px-3 py-2 rounded-pill" 
              style={{ 
                background: 'rgba(26, 115, 232, 0.15)',
                border: '1px solid rgba(26, 115, 232, 0.2)'
              }}
            >
              <Award className="text-primary" style={{ width: '0.9rem', height: '0.9rem' }} />
              <span className="text-primary" style={{ fontSize: '0.65rem', fontWeight: '600', letterSpacing: '0.05em' }}>
                Integrated Placement System
              </span>
            </div>
            
            <h1 className="display-3 fw-black mb-4" style={{ lineHeight: '1.1', color: '#0a1e3c' }}>
              Bridge The Gap <br/> 
              Between <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">Talent & Industry</span>
            </h1>
            
            <p className="lead mb-4" style={{ color: '#1a3a5c', fontSize: '1.1rem', maxWidth: '500px' }}>
              A unified secure deployment routing matrix connecting elite students with global opportunities.
            </p>

            {/* Features */}
            <div className="d-flex flex-wrap gap-2 mb-4">
              {features.map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <div key={i} className="d-flex align-items-center gap-1.5 px-3 py-1.5 rounded-3" style={{
                    background: 'rgba(255,255,255,0.5)',
                    border: '1px solid rgba(255,255,255,0.8)',
                    transition: 'all 0.3s ease'
                  }}>
                    <Icon className="text-primary" style={{ width: '0.7rem', height: '0.7rem' }} />
                    <span className="text-dark" style={{ fontSize: '0.55rem', fontWeight: '500' }}>{feature.label}</span>
                  </div>
                );
              })}
            </div>

            {/* Stats */}
            <div className="d-flex flex-wrap gap-4 mt-3">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className="d-flex align-items-center gap-2">
                    <div className="p-2 rounded-3" style={{ 
                      background: 'rgba(255,255,255,0.6)',
                      border: `1px solid rgba(0,0,0,0.08)`
                    }}>
                      <Icon style={{ width: '1rem', height: '1rem', color: stat.color }} />
                    </div>
                    <div>
                      <h5 className="fw-bold m-0" style={{ fontSize: '1.1rem', color: '#0a1e3c' }}>{stat.value}</h5>
                      <span className="text-secondary" style={{ fontSize: '0.5rem', fontWeight: '500' }}>{stat.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Section - Forms */}
          <div className="col-lg-5 offset-lg-1">
            <div className="p-4 rounded-4 border shadow-2xl" 
              style={{ 
                background: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.8)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
              }}
            >
              {/* Student Gateway */}
              <div 
                className="card border-0 mb-4 overflow-hidden shadow-lg"
                style={{ 
                  background: hoveredCard === 'student' 
                    ? 'rgba(26, 115, 232, 0.08)' 
                    : 'rgba(255, 255, 255, 0.5)',
                  border: `2px solid ${isStudentFormOpen ? 'rgba(26, 115, 232, 0.3)' : 'rgba(0,0,0,0.06)'}`,
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: isStudentFormOpen 
                    ? '0 8px 40px rgba(26, 115, 232, 0.15)' 
                    : '0 4px 25px rgba(0,0,0,0.05)',
                  borderRadius: '16px',
                  backdropFilter: 'blur(10px)',
                  padding: '0.25rem'
                }}
                onMouseEnter={() => setHoveredCard('student')}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="card-body d-flex align-items-center gap-4 py-4 px-4" 
                  style={{ cursor: 'pointer' }} 
                  onClick={() => setIsStudentFormOpen(!isStudentFormOpen)}
                >
                  <div className="p-3 rounded-3 d-flex align-items-center justify-content-center" style={{ 
                    background: 'linear-gradient(135deg, rgba(26, 115, 232, 0.2), rgba(26, 115, 232, 0.05))',
                    border: '2px solid rgba(26, 115, 232, 0.2)',
                    boxShadow: '0 4px 20px rgba(26, 115, 232, 0.1), inset 0 1px 0 rgba(255,255,255,0.2)',
                    width: '64px',
                    height: '64px',
                    transition: 'all 0.3s ease',
                    transform: isStudentFormOpen ? 'scale(1.1)' : 'scale(1)',
                    flexShrink: 0
                  }}>
                    <GraduationCap className="text-primary" style={{ 
                      width: '2rem', 
                      height: '2rem',
                      filter: 'drop-shadow(0 2px 8px rgba(26, 115, 232, 0.3))'
                    }} />
                  </div>
                  <div className="flex-grow-1">
                    <h5 className="card-title mb-1 fw-bold d-flex align-items-center gap-2" style={{ fontSize: '1.1rem', color: '#0a1e3c' }}>
                      Student Gateway
                      <span className="badge bg-primary bg-opacity-10 text-primary border border-primary" style={{ fontSize: '0.45rem', padding: '0.25rem 0.6rem' }}>Active</span>
                    </h5>
                    <span className="text-secondary" style={{ fontSize: '0.6rem' }}>Access placements, tests, and opportunities</span>
                  </div>
                  <ArrowRight className="text-primary" style={{ 
                    width: '1.2rem', height: '1.2rem',
                    transform: isStudentFormOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                    transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                  }} />
                </div>
                
                {isStudentFormOpen && (
                  <div className="px-4 pb-4 pt-2 border-top" style={{ borderColor: 'rgba(0,0,0,0.05)' }}>
                    {studentError && (
                      <div className="alert alert-danger p-2 small text-center mb-3 d-flex align-items-center gap-2" style={{ 
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        color: '#991b1b',
                        borderRadius: '10px'
                      }}>
                        <AlertCircle style={{ width: '0.8rem', height: '0.8rem' }} />
                        {studentError}
                      </div>
                    )}
                    {studentSuccess && (
                      <div className="alert alert-success p-2 small text-center mb-3 d-flex align-items-center gap-2" style={{ 
                        background: 'rgba(34, 197, 94, 0.1)',
                        border: '1px solid rgba(34, 197, 94, 0.2)',
                        color: '#166534',
                        borderRadius: '10px'
                      }}>
                        <Check style={{ width: '0.8rem', height: '0.8rem' }} />
                        {studentSuccess}
                      </div>
                    )}
                    {registerError && (
                      <div className="alert alert-danger p-2 small text-center mb-3 d-flex align-items-center gap-2" style={{ 
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        color: '#991b1b',
                        borderRadius: '10px'
                      }}>
                        <AlertCircle style={{ width: '0.8rem', height: '0.8rem' }} />
                        {registerError}
                      </div>
                    )}
                    {registerSuccess && (
                      <div className="alert alert-success p-2 small text-center mb-3 d-flex align-items-center gap-2" style={{ 
                        background: 'rgba(34, 197, 94, 0.1)',
                        border: '1px solid rgba(34, 197, 94, 0.2)',
                        color: '#166534',
                        borderRadius: '10px'
                      }}>
                        <Check style={{ width: '0.8rem', height: '0.8rem' }} />
                        {registerSuccess}
                      </div>
                    )}
                    {isRegisterMode ? renderStudentRegisterForm() : renderStudentLoginForm()}
                  </div>
                )}
              </div>

              {/* Admin Terminal */}
              <div 
                className="card border-0 overflow-hidden shadow-lg"
                style={{ 
                  background: hoveredCard === 'admin' 
                    ? 'rgba(6, 182, 212, 0.08)' 
                    : 'rgba(255, 255, 255, 0.5)',
                  border: `2px solid ${isAdminFormOpen ? 'rgba(6, 182, 212, 0.3)' : 'rgba(0,0,0,0.06)'}`,
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: isAdminFormOpen 
                    ? '0 8px 40px rgba(6, 182, 212, 0.15)' 
                    : '0 4px 25px rgba(0,0,0,0.05)',
                  borderRadius: '16px',
                  backdropFilter: 'blur(10px)',
                  padding: '0.25rem'
                }}
                onMouseEnter={() => setHoveredCard('admin')}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="card-body d-flex align-items-center gap-4 py-4 px-4" 
                  style={{ cursor: 'pointer' }} 
                  onClick={() => setIsAdminFormOpen(!isAdminFormOpen)}
                >
                  <div className="p-3 rounded-3 d-flex align-items-center justify-content-center" style={{ 
                    background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(6, 182, 212, 0.05))',
                    border: '2px solid rgba(6, 182, 212, 0.2)',
                    boxShadow: '0 4px 20px rgba(6, 182, 212, 0.1), inset 0 1px 0 rgba(255,255,255,0.2)',
                    width: '64px',
                    height: '64px',
                    transition: 'all 0.3s ease',
                    transform: isAdminFormOpen ? 'scale(1.1)' : 'scale(1)',
                    flexShrink: 0
                  }}>
                    <UserCheck className="text-cyan-600" style={{ 
                      width: '2rem', 
                      height: '2rem',
                      filter: 'drop-shadow(0 2px 8px rgba(6, 182, 212, 0.3))'
                    }} />
                  </div>
                  <div className="flex-grow-1">
                    <h5 className="card-title mb-1 fw-bold d-flex align-items-center gap-2" style={{ fontSize: '1.1rem', color: '#0a1e3c' }}>
                      Admin Terminal
                      <span className="badge bg-cyan-400 bg-opacity-10 text-cyan-600 border border-cyan-400" style={{ fontSize: '0.45rem', padding: '0.25rem 0.6rem' }}>Secure</span>
                    </h5>
                    <span className="text-secondary" style={{ fontSize: '0.6rem' }}>Manage students, companies, jobs and more</span>
                  </div>
                  <ArrowRight className="text-cyan-600" style={{ 
                    width: '1.2rem', height: '1.2rem',
                    transform: isAdminFormOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                    transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                  }} />
                </div>
                
                {isAdminFormOpen && (
                  <div className="px-4 pb-4 pt-2 border-top" style={{ borderColor: 'rgba(0,0,0,0.05)' }}>
                    {errorMessage && (
                      <div className="alert alert-danger p-2 small text-center mb-3 d-flex align-items-center gap-2" style={{ 
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        color: '#991b1b',
                        borderRadius: '10px'
                      }}>
                        <AlertCircle style={{ width: '0.8rem', height: '0.8rem' }} />
                        {errorMessage}
                      </div>
                    )}
                    {renderAdminForm()}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="mt-4 pt-3 border-top" style={{ borderColor: 'rgba(0,0,0,0.05)' }}>
                <div className="d-flex justify-content-center gap-5">
                  <span className="text-secondary d-flex align-items-center gap-2" style={{ fontSize: '0.55rem', fontWeight: '500' }}>
                    <div className="p-1.5 rounded-circle" style={{ background: 'rgba(26,115,232,0.1)', border: '1px solid rgba(26,115,232,0.2)' }}>
                      <Lock style={{ width: '0.8rem', height: '0.8rem' }} className="text-primary" />
                    </div>
                    Secure
                  </span>
                  <span className="text-secondary d-flex align-items-center gap-2" style={{ fontSize: '0.55rem', fontWeight: '500' }}>
                    <div className="p-1.5 rounded-circle" style={{ background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.2)' }}>
                      <Shield style={{ width: '0.8rem', height: '0.8rem' }} className="text-cyan-600" />
                    </div>
                    Encrypted
                  </span>
                  <span className="text-secondary d-flex align-items-center gap-2" style={{ fontSize: '0.55rem', fontWeight: '500' }}>
                    <div className="p-1.5 rounded-circle" style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)' }}>
                      <CheckCircle style={{ width: '0.8rem', height: '0.8rem' }} className="text-success" />
                    </div>
                    Protected
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-30px) scale(1.05); }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .card {
          animation: slideUp 0.6s ease-out forwards;
        }

        .card:nth-child(1) { animation-delay: 0.1s; }
        .card:nth-child(2) { animation-delay: 0.2s; }

        ::-webkit-scrollbar {
          width: 4px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.03);
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(26, 115, 232, 0.3);
          border-radius: 10px;
        }

        .form-control:focus {
          border-color: rgba(26, 115, 232, 0.5) !important;
          box-shadow: 0 0 0 3px rgba(26, 115, 232, 0.1) !important;
          outline: none !important;
        }

        .card {
          position: relative;
        }

        .card::after {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: 16px;
          padding: 1px;
          background: linear-gradient(135deg, rgba(26, 115, 232, 0.1), transparent);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .card:hover::after {
          opacity: 1;
        }

        .spinner-border {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Text color overrides for light theme */
        .text-light {
          color: #0a1e3c !important;
        }

        .bg-dark {
          background-color: #f0f7ff !important;
        }

        .text-secondary {
          color: #4a6a85 !important;
        }

        .border-secondary {
          border-color: rgba(0,0,0,0.1) !important;
        }

        .form-control {
          background-color: rgba(255,255,255,0.9) !important;
          color: #0a1e3c !important;
        }

        .form-control::placeholder {
          color: #7a9ab5 !important;
        }

        .btn-link.text-secondary {
          color: #4a6a85 !important;
        }

        .btn-link.text-secondary:hover {
          color: #0a1e3c !important;
        }
      `}</style>
    </div>
  );
}