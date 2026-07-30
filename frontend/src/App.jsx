import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import LandingPage from './components/pages/LandingPage';
import AdminDashboard from './components/pages/AdminDashboard';
import StudentDashboard from './components/pages/StudentDashboard';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function App() {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '' 
  });
  
  const [isAdmin, setIsAdmin] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

 
  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    const studentToken = localStorage.getItem('studentToken');
    
    console.log('🔍 Checking Auth...');
    console.log('Admin Token:', adminToken ? '✅ Present' : '❌ Not Found');
    console.log('Student Token:', studentToken ? '✅ Present' : '❌ Not Found');
    
    if (adminToken) {
      setIsAdmin(true);
    } else if (studentToken) {
      setIsStudent(true);
    }
    
    setLoading(false);
  }, []);

 
  const handleStudentLogin = async (data) => {
    console.log('🎓 Student Login Callback Received:', data);
    
    // ✅ Token already saved in LandingPage
    // Just update state
    setIsStudent(true);
    
    // ✅ Redirect to student dashboard
    window.location.href = '/student-dashboard';
  };

 
  const handleStudentSignup = async (data) => {
    console.log('🎓 Student Signup Callback Received:', data);
    
   
    setIsStudent(true);
    window.location.href = '/student-dashboard';
  };

  const handleAdminLogin = async (data) => {
    console.log('👑 Admin Login Success:', data);
    setIsAdmin(true);
    window.location.href = '/admin-dashboard';
  };

 
  const handleLogout = () => {
    console.log('👋 Logging out...');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('studentToken');
    localStorage.removeItem('adminName');
    localStorage.removeItem('studentName');
    localStorage.removeItem('adminEmail');
    localStorage.removeItem('studentEmail');
    setIsAdmin(false);
    setIsStudent(false);
    window.location.href = '/';
  };


  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: '#0a0a0f' }}>
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-secondary mt-3">Loading...</p>
        </div>
      </div>
    );
  }


  
  // ✅ If Admin logged in - Show Admin Dashboard
  if (isAdmin) {
    console.log('👑 Rendering Admin Dashboard');
    return <AdminDashboard onLogout={handleLogout} />;
  }

  // ✅ If Student logged in - Show Student Dashboard
  if (isStudent) {
    console.log('🎓 Rendering Student Dashboard');
    return <StudentDashboard onLogout={handleLogout} />;
  }

  // ✅ Show Landing Page
  console.log('🏠 Rendering Landing Page');
  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <LandingPage 
              onLoginClick={handleStudentLogin}
              onSignUpClick={handleStudentSignup}
              onAdminLoginSuccess={handleAdminLogin}
              setFormData={setFormData}
              formData={formData}
              loading={loading}
              error={error}
              apiUrl={API_URL}
            />
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;