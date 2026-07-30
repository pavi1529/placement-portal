import React, { useState } from 'react';
import { 
  Building2, Mail, Lock, Eye, EyeOff, LogIn, AlertCircle,
  UserPlus, User, GraduationCap, ShieldCheck, ArrowRight,
  CheckCircle, XCircle, Loader2
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function LoginPage({ onLogin }) {
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Student Registration State
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
  
  // Admin Login State
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [adminData, setAdminData] = useState({ email: '', password: '' });
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminError, setAdminError] = useState('');
  const [showAdminPassword, setShowAdminPassword] = useState(false);

  const handleStudentLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      console.log('🔐 Student Login Attempt:', email);

      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email, 
          password,
          role: 'student' 
        }),
      });

      const data = await response.json();
      console.log('📦 Student Login Response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      if (data.success) {
        // Store user data
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data));
        localStorage.setItem('userRole', 'student');
        localStorage.setItem('userId', data.data.id);
        localStorage.setItem('userEmail', data.data.email);
        localStorage.setItem('userName', data.data.name);

        setSuccess('✅ Login successful! Redirecting...');

        if (onLogin) {
          onLogin(data.data);
        }

        setTimeout(() => {
          window.location.href = '/student-dashboard';
        }, 1000);
      }
    } catch (error) {
      console.error('❌ Student Login Error:', error);
      setError(error.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };


  const handleStudentRegister = async (e) => {
    e.preventDefault();
    setRegisterError('');
    setRegisterSuccess('');
    setRegisterLoading(true);

    // Validation
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
        setRegisterSuccess('✅ Registration successful! Please login.');
        setRegisterData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          department: 'CSE',
          cgpa: ''
        });
        
        // Auto-fill login form
        setEmail(registerData.email);
        
        // Switch to login mode after 2 seconds
        setTimeout(() => {
          setIsRegisterMode(false);
          setRegisterSuccess('');
        }, 2000);
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
    setAdminError('');
    setAdminLoading(true);

    try {
      console.log('🔐 Admin Login Attempt:', adminData.email);

      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: adminData.email,
          password: adminData.password,
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

        if (onLogin) {
          onLogin(data.data);
        }

        setTimeout(() => {
          window.location.href = '/admin-dashboard';
        }, 500);
      }
    } catch (error) {
      console.error('❌ Admin Login Error:', error);
      setAdminError(error.message || 'Invalid admin credentials');
    } finally {
      setAdminLoading(false);
    }
  };

 
  const renderStudentLoginForm = () => (
    <form onSubmit={handleStudentLogin}>
      <div className="mb-3">
        <label className="text-secondary small fw-bold d-block mb-1">Email Address</label>
        <div className="position-relative">
          <Mail className="position-absolute text-secondary" style={{ left: '12px', top: '50%', transform: 'translateY(-50%)', width: '0.9rem', height: '0.9rem' }} />
          <input
            type="email"
            className="form-control form-control-lg bg-dark text-light border-secondary ps-5"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ fontSize: '0.9rem', padding: '0.7rem 1rem', borderRadius: '12px' }}
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="text-secondary small fw-bold d-block mb-1">Password</label>
        <div className="position-relative">
          <Lock className="position-absolute text-secondary" style={{ left: '12px', top: '50%', transform: 'translateY(-50%)', width: '0.9rem', height: '0.9rem' }} />
          <input
            type={showPassword ? 'text' : 'password'}
            className="form-control form-control-lg bg-dark text-light border-secondary ps-5"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ fontSize: '0.9rem', padding: '0.7rem 1rem', borderRadius: '12px' }}
          />
          <button
            type="button"
            className="btn btn-sm position-absolute text-secondary"
            style={{ right: '8px', top: '50%', transform: 'translateY(-50%)' }}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff style={{ width: '0.9rem', height: '0.9rem' }} /> : <Eye style={{ width: '0.9rem', height: '0.9rem' }} />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-primary w-100 py-3 fw-bold shadow-lg shadow-primary/20 transition-all hover:scale-105"
        disabled={loading}
        style={{ borderRadius: '12px', fontSize: '0.9rem' }}
      >
        {loading ? (
          <Loader2 className="spinner-border spinner-border-sm me-2" style={{ width: '1rem', height: '1rem' }} />
        ) : (
          <LogIn className="me-2" style={{ width: '1rem', height: '1rem' }} />
        )}
        {loading ? 'Signing in...' : 'Student Login'}
      </button>

      <div className="mt-3 text-center">
        <button
          type="button"
          className="btn btn-link text-secondary text-decoration-none p-0"
          style={{ fontSize: '0.8rem' }}
          onClick={() => {
            setIsRegisterMode(true);
            setError('');
            setSuccess('');
          }}
        >
          <UserPlus style={{ width: '0.8rem', height: '0.8rem' }} className="me-1" />
          Don't have an account? Sign up
        </button>
      </div>
    </form>
  );

  const renderStudentRegisterForm = () => (
    <form onSubmit={handleStudentRegister}>
      <div className="mb-3">
        <label className="text-secondary small fw-bold d-block mb-1">Full Name *</label>
        <div className="position-relative">
          <User className="position-absolute text-secondary" style={{ left: '12px', top: '50%', transform: 'translateY(-50%)', width: '0.9rem', height: '0.9rem' }} />
          <input
            type="text"
            className="form-control form-control-lg bg-dark text-light border-secondary ps-5"
            placeholder="Enter your full name"
            value={registerData.name}
            onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
            required
            style={{ fontSize: '0.9rem', padding: '0.7rem 1rem', borderRadius: '12px' }}
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="text-secondary small fw-bold d-block mb-1">Email Address *</label>
        <div className="position-relative">
          <Mail className="position-absolute text-secondary" style={{ left: '12px', top: '50%', transform: 'translateY(-50%)', width: '0.9rem', height: '0.9rem' }} />
          <input
            type="email"
            className="form-control form-control-lg bg-dark text-light border-secondary ps-5"
            placeholder="Enter your email"
            value={registerData.email}
            onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
            required
            style={{ fontSize: '0.9rem', padding: '0.7rem 1rem', borderRadius: '12px' }}
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="text-secondary small fw-bold d-block mb-1">Password *</label>
        <div className="position-relative">
          <Lock className="position-absolute text-secondary" style={{ left: '12px', top: '50%', transform: 'translateY(-50%)', width: '0.9rem', height: '0.9rem' }} />
          <input
            type={showRegisterPassword ? 'text' : 'password'}
            className="form-control form-control-lg bg-dark text-light border-secondary ps-5"
            placeholder="Enter password (min 6 chars)"
            value={registerData.password}
            onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
            required
            minLength="6"
            style={{ fontSize: '0.9rem', padding: '0.7rem 1rem', borderRadius: '12px' }}
          />
          <button
            type="button"
            className="btn btn-sm position-absolute text-secondary"
            style={{ right: '8px', top: '50%', transform: 'translateY(-50%)' }}
            onClick={() => setShowRegisterPassword(!showRegisterPassword)}
          >
            {showRegisterPassword ? <EyeOff style={{ width: '0.9rem', height: '0.9rem' }} /> : <Eye style={{ width: '0.9rem', height: '0.9rem' }} />}
          </button>
        </div>
      </div>

      <div className="mb-3">
        <label className="text-secondary small fw-bold d-block mb-1">Confirm Password *</label>
        <div className="position-relative">
          <Lock className="position-absolute text-secondary" style={{ left: '12px', top: '50%', transform: 'translateY(-50%)', width: '0.9rem', height: '0.9rem' }} />
          <input
            type="password"
            className="form-control form-control-lg bg-dark text-light border-secondary ps-5"
            placeholder="Confirm your password"
            value={registerData.confirmPassword}
            onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
            required
            style={{ fontSize: '0.9rem', padding: '0.7rem 1rem', borderRadius: '12px' }}
          />
        </div>
      </div>

      <div className="row g-2 mb-3">
        <div className="col-6">
          <label className="text-secondary small fw-bold d-block mb-1">Department</label>
          <select
            className="form-select form-select-lg bg-dark text-light border-secondary"
            value={registerData.department}
            onChange={(e) => setRegisterData({...registerData, department: e.target.value})}
            style={{ fontSize: '0.8rem', borderRadius: '12px' }}
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
          <label className="text-secondary small fw-bold d-block mb-1">CGPA</label>
          <input
            type="number"
            step="0.01"
            className="form-control form-control-lg bg-dark text-light border-secondary"
            placeholder="8.5"
            value={registerData.cgpa}
            onChange={(e) => setRegisterData({...registerData, cgpa: e.target.value})}
            style={{ fontSize: '0.9rem', padding: '0.7rem 1rem', borderRadius: '12px' }}
          />
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-success w-100 py-3 fw-bold shadow-lg shadow-success/20 transition-all hover:scale-105"
        disabled={registerLoading}
        style={{ borderRadius: '12px', fontSize: '0.9rem' }}
      >
        {registerLoading ? (
          <Loader2 className="spinner-border spinner-border-sm me-2" style={{ width: '1rem', height: '1rem' }} />
        ) : (
          <UserPlus className="me-2" style={{ width: '1rem', height: '1rem' }} />
        )}
        {registerLoading ? 'Registering...' : 'Create Account'}
      </button>

      <div className="mt-3 text-center">
        <button
          type="button"
          className="btn btn-link text-secondary text-decoration-none p-0"
          style={{ fontSize: '0.8rem' }}
          onClick={() => {
            setIsRegisterMode(false);
            setRegisterError('');
            setRegisterSuccess('');
          }}
        >
          <ArrowRight style={{ width: '0.8rem', height: '0.8rem' }} className="me-1" />
          Back to Login
        </button>
      </div>
    </form>
  );

 
  const renderAdminLoginForm = () => (
    <form onSubmit={handleAdminLogin}>
      <div className="mb-3">
        <label className="text-secondary small fw-bold d-block mb-1">Admin Email</label>
        <div className="position-relative">
          <Mail className="position-absolute text-secondary" style={{ left: '12px', top: '50%', transform: 'translateY(-50%)', width: '0.9rem', height: '0.9rem' }} />
          <input
            type="email"
            className="form-control form-control-lg bg-dark text-light border-secondary ps-5"
            placeholder="Enter admin email"
            value={adminData.email}
            onChange={(e) => setAdminData({...adminData, email: e.target.value})}
            required
            style={{ fontSize: '0.9rem', padding: '0.7rem 1rem', borderRadius: '12px' }}
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="text-secondary small fw-bold d-block mb-1">Admin Password</label>
        <div className="position-relative">
          <Lock className="position-absolute text-secondary" style={{ left: '12px', top: '50%', transform: 'translateY(-50%)', width: '0.9rem', height: '0.9rem' }} />
          <input
            type={showAdminPassword ? 'text' : 'password'}
            className="form-control form-control-lg bg-dark text-light border-secondary ps-5"
            placeholder="Enter admin password"
            value={adminData.password}
            onChange={(e) => setAdminData({...adminData, password: e.target.value})}
            required
            style={{ fontSize: '0.9rem', padding: '0.7rem 1rem', borderRadius: '12px' }}
          />
          <button
            type="button"
            className="btn btn-sm position-absolute text-secondary"
            style={{ right: '8px', top: '50%', transform: 'translateY(-50%)' }}
            onClick={() => setShowAdminPassword(!showAdminPassword)}
          >
            {showAdminPassword ? <EyeOff style={{ width: '0.9rem', height: '0.9rem' }} /> : <Eye style={{ width: '0.9rem', height: '0.9rem' }} />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-info w-100 py-3 fw-bold shadow-lg shadow-info/20 transition-all hover:scale-105"
        disabled={adminLoading}
        style={{ borderRadius: '12px', fontSize: '0.9rem', background: 'linear-gradient(135deg, #06b6d4, #0891b2)', border: 'none' }}
      >
        {adminLoading ? (
          <Loader2 className="spinner-border spinner-border-sm me-2" style={{ width: '1rem', height: '1rem' }} />
        ) : (
          <ShieldCheck className="me-2" style={{ width: '1rem', height: '1rem' }} />
        )}
        {adminLoading ? 'Verifying...' : 'Admin Login'}
      </button>

      <div className="mt-3 text-center">
        <small className="text-secondary" style={{ fontSize: '0.6rem' }}>
          Test: admin@gmail.com / admin123
        </small>
      </div>
    </form>
  );

 
  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center p-3" style={{
      background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #0f3460 100%)'
    }}>
      <div className="card border-0 shadow-lg rounded-4 p-4 p-md-5" style={{
        maxWidth: '480px',
        width: '100%',
        background: 'rgba(20,20,30,0.9)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.05)'
      }}>
        {/* Header */}
        <div className="text-center mb-4">
          <div className="bg-primary bg-gradient p-3 rounded-circle d-inline-flex text-white shadow-lg shadow-primary/20" style={{ width: '64px', height: '64px' }}>
            <Building2 className="mx-auto" style={{ width: '2rem', height: '2rem' }} />
          </div>
          <h4 className="text-light fw-bold mt-3">
            {isAdminMode ? 'Admin Access' : isRegisterMode ? 'Create Account' : 'Welcome Back'}
          </h4>
          <p className="text-secondary small">
            {isAdminMode 
              ? 'Secure admin login to manage the portal' 
              : isRegisterMode 
                ? 'Register to access the placement portal' 
                : 'Sign in to continue to your dashboard'}
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="d-flex gap-2 mb-4 p-1 rounded-3" style={{ background: 'rgba(255,255,255,0.05)' }}>
          <button
            onClick={() => {
              setIsAdminMode(false);
              setIsRegisterMode(false);
              setError('');
              setSuccess('');
              setRegisterError('');
              setRegisterSuccess('');
              setAdminError('');
            }}
            className={`flex-grow-1 py-2 rounded-2 border-0 fw-bold transition-all ${!isAdminMode ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-secondary bg-transparent'}`}
            style={{ fontSize: '0.7rem' }}
          >
            <GraduationCap style={{ width: '0.8rem', height: '0.8rem' }} className="me-1" />
            Student
          </button>
          <button
            onClick={() => {
              setIsAdminMode(true);
              setIsRegisterMode(false);
              setError('');
              setSuccess('');
              setRegisterError('');
              setRegisterSuccess('');
              setAdminError('');
            }}
            className={`flex-grow-1 py-2 rounded-2 border-0 fw-bold transition-all ${isAdminMode ? 'bg-info text-white shadow-lg shadow-info/20' : 'text-secondary bg-transparent'}`}
            style={{ fontSize: '0.7rem' }}
          >
            <ShieldCheck style={{ width: '0.8rem', height: '0.8rem' }} className="me-1" />
            Admin
          </button>
        </div>

        {/* Messages */}
        {error && (
          <div className="alert alert-danger alert-sm d-flex align-items-center gap-2 py-2" style={{ borderRadius: '10px' }}>
            <AlertCircle style={{ width: '0.9rem', height: '0.9rem' }} />
            {error}
          </div>
        )}

        {success && (
          <div className="alert alert-success alert-sm d-flex align-items-center gap-2 py-2" style={{ borderRadius: '10px' }}>
            <CheckCircle style={{ width: '0.9rem', height: '0.9rem' }} />
            {success}
          </div>
        )}

        {registerError && (
          <div className="alert alert-danger alert-sm d-flex align-items-center gap-2 py-2" style={{ borderRadius: '10px' }}>
            <AlertCircle style={{ width: '0.9rem', height: '0.9rem' }} />
            {registerError}
          </div>
        )}

        {registerSuccess && (
          <div className="alert alert-success alert-sm d-flex align-items-center gap-2 py-2" style={{ borderRadius: '10px' }}>
            <CheckCircle style={{ width: '0.9rem', height: '0.9rem' }} />
            {registerSuccess}
          </div>
        )}

        {adminError && (
          <div className="alert alert-danger alert-sm d-flex align-items-center gap-2 py-2" style={{ borderRadius: '10px' }}>
            <AlertCircle style={{ width: '0.9rem', height: '0.9rem' }} />
            {adminError}
          </div>
        )}

        {/* Forms */}
        {isAdminMode ? renderAdminLoginForm() : (
          isRegisterMode ? renderStudentRegisterForm() : renderStudentLoginForm()
        )}

        {/* Demo Credentials - Show only for Student Login */}
        {!isAdminMode && !isRegisterMode && (
          <div className="mt-4 p-3 rounded-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <p className="text-secondary small text-center mb-2">Demo Credentials</p>
            <div className="d-flex flex-wrap gap-2 justify-content-center">
              <span className="badge bg-dark text-secondary border border-secondary" style={{ fontSize: '0.55rem' }}>
                Student: pavi@gmail.com / 123456
              </span>
              <span className="badge bg-dark text-secondary border border-secondary" style={{ fontSize: '0.55rem' }}>
                Admin: admin@gmail.com / admin123
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}