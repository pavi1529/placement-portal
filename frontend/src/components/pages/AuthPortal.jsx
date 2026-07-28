import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, LogIn, UserPlus, ArrowLeft } from 'lucide-react';

export default function AuthPortal() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(localStorage.getItem('temp_selected_role') || 'student');
  const [authMode, setAuthMode] = useState(null); 
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

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
    
    // FIX: Payload-la 'role' koodave anuppanum, appo thaan backend-ku theriyum
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

      // Success - Save data and redirect
      localStorage.setItem('placement_token', data.token || 'mock_token_2026');
      localStorage.setItem('user_role', selectedRole);

      // REDIRECT LOGIC
      if (selectedRole === 'admin') {
        navigate('/admin-terminal');
      } else {
        navigate('/student-dashboard'); // Ippo correct-ah dashboard-kku pogum
      }

    } catch (err) {
      setErrorMsg(err.message || 'Server connection error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 text-light" style={{ background: 'radial-gradient(circle at top right, #070a13, #020617, #0f172a)' }}>
      <button onClick={() => authMode ? setAuthMode(null) : navigate('/')} className="btn btn-link text-muted position-absolute top-0 start-0 m-4 text-decoration-none">
        <ArrowLeft className="w-4 h-4" /> {authMode ? 'Back to Selection' : 'Back to Home'}
      </button>

      <div className="w-100 px-3" style={{ maxWidth: '450px' }}>
        <div className="p-4 rounded border shadow-lg" style={{ backgroundColor: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(20px)' }}>
          <div className="text-center mb-4">
            <div className="d-inline-flex p-3 rounded mb-2 text-white" style={{ background: selectedRole === 'admin' ? 'linear-gradient(135deg, #06b6d4, #0891b2)' : 'linear-gradient(135deg, #3b82f6, #1d4ed8)' }}>
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="fw-bold text-uppercase">{selectedRole === 'admin' ? 'Admin Terminal' : 'Student Interface'}</h3>
          </div>

          {errorMsg && <div className="alert alert-danger py-2 text-center small mb-3">{errorMsg}</div>}

          {authMode === null ? (
            <div className="d-flex flex-column gap-3 py-3">
              <button onClick={() => setAuthMode('login')} className="btn py-3 fw-bold text-white" style={{ background: '#3b82f6', borderRadius: '10px' }}>
                <LogIn className="w-5 h-5 d-inline me-2" /> {selectedRole === 'admin' ? 'Admin Login' : 'Student Login'}
              </button>
              <button onClick={() => setAuthMode('signup')} className="btn py-3 fw-bold text-light" style={{ backgroundColor: 'rgba(30, 41, 59, 0.6)', border: '1px solid #3b82f6', borderRadius: '10px' }}>
                <UserPlus className="w-5 h-5 text-primary d-inline me-2" /> {selectedRole === 'admin' ? 'Admin Register' : 'Student Sign Up'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {authMode === 'signup' && (
                <div className="mb-3">
                  <label className="small fw-bold">Full Name</label>
                  <input type="text" required className="form-control bg-dark text-white" onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
              )}
              <div className="mb-3">
                <label className="small fw-bold">Email Address</label>
                <input type="email" required className="form-control bg-dark text-white" onChange={(e) => setFormData({...formData, email: e.target.value})} />
              </div>
              <div className="mb-4">
                <label className="small fw-bold">Password</label>
                <input type="password" required className="form-control bg-dark text-white" onChange={(e) => setFormData({...formData, password: e.target.value})} />
              </div>
              <button type="submit" className="btn w-100 fw-bold py-2" style={{ background: '#3b82f6', color: 'white' }}>
                {loading ? 'Processing...' : authMode === 'login' ? 'Execute Login' : 'Register Identity'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}