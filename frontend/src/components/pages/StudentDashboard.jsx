import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import Dashboard from './Dashboard';
import Profile from './Profile';
import PlacementDrives from './PlacementDrives';
import MockTests from './MockTest';
import Coding from './Coding';
import Applications from './Application';
import Notifications from './Notification';
import Reports from './Reports';
import Settings from './Setting';
import Companies from './Companies';
import Job from './Job';

const API_URL = 'http://localhost:5000/api';

export default function StudentDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [studentProfile, setStudentProfile] = useState({
    name: '',
    username: '',
    email: '',
    dept: '',
    cgpa: '0',
    skills: []
  });

  const [jobDrives, setJobDrives] = useState([]);
  const [applications, setApplications] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const token = localStorage.getItem('studentToken');

  const apiCall = async (endpoint, method = 'GET', data = null) => {
    try {
      setLoading(true);
      setError('');
      
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
        if (result.message === 'Not authorized' || response.status === 401) {
          localStorage.removeItem('studentToken');
          localStorage.removeItem('studentName');
          localStorage.removeItem('studentEmail');
          if (onLogout) onLogout();
          window.location.href = '/login';
        }
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

  const fetchStudentProfile = async () => {
    try {
      const name = localStorage.getItem('studentName') || 'Student';
      const email = localStorage.getItem('studentEmail') || '';
      
      setStudentProfile({
        name: name,
        username: email.split('@')[0] || 'student',
        email: email,
        dept: 'Computer Science & Engineering',
        cgpa: '8.92',
        skills: ['ReactJS', 'Node.js', 'Python', 'SQL', 'Data Structures']
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchJobDrives = async () => {
    try {
      console.log('📤 Fetching Job Drives...');
      const data = await apiCall('/jobs');
      console.log('📦 Job Drives Response:', data);
      
      if (data.success && data.data && data.data.length > 0) {
        setJobDrives(data.data);
        console.log('✅ Job Drives loaded:', data.data.length);
      } else {
        console.log('⚠️ No job drives from API, using fallback data');
        setJobDrives([
          { 
            id: 1, 
            company: "Zoho", 
            role: "Member Technical Staff", 
            package: "8.5 LPA", 
            type: "Product", 
            deadline: "July 28, 2026", 
            status: "Eligible", 
            desc: "Core software product developments utilizing advanced DS and system architecture layers." 
          },
          { 
            id: 2, 
            company: "Cognizant", 
            role: "GenC Elevate", 
            package: "4.5 LPA", 
            type: "Services", 
            deadline: "July 30, 2026", 
            status: "Applied", 
            desc: "Enterprise cloud integration services framework architecture workflows." 
          },
          { 
            id: 3, 
            company: "PayPal", 
            role: "Software Engineer Intern", 
            package: "12 LPA", 
            type: "Product", 
            deadline: "Expired", 
            status: "Shortlisted", 
            desc: "High scalability transaction payload validation processing system algorithms." 
          }
        ]);
      }
    } catch (error) {
      console.error('❌ Error fetching jobs:', error);
      setJobDrives([]);
    }
  };

  const fetchApplications = async () => {
    try {
      console.log('📤 Fetching Applications...');
      const data = await apiCall('/applications');
      console.log('📦 Applications Response:', data);
      
      if (data.success && data.data && data.data.length > 0) {
        setApplications(data.data);
        console.log('✅ Applications loaded:', data.data.length);
      } else {
        console.log('⚠️ No applications found');
        setApplications([]);
      }
    } catch (error) {
      console.error('❌ Error fetching applications:', error);
      setApplications([]);
    }
  };

  const fetchNotifications = async () => {
    try {
      console.log('📤 Fetching Notifications...');
      const data = await apiCall('/notifications');
      console.log('📦 Notifications Response:', data);
      
      if (data.success && data.data && data.data.length > 0) {
        setNotifications(data.data);
        console.log('✅ Notifications loaded:', data.data.length);
      } else {
        console.log('⚠️ No notifications found');
        setNotifications([]);
      }
    } catch (error) {
      console.error('❌ Error fetching notifications:', error);
      setNotifications([]);
    }
  };

  useEffect(() => {
    if (!token) {
      if (onLogout) onLogout();
      window.location.href = '/login';
      return;
    }

    console.log('🔍 Student logged in, loading data...');
    
    const loadAllData = async () => {
      await Promise.all([
        fetchStudentProfile(),
        fetchJobDrives(),
        fetchApplications(),
        fetchNotifications()
      ]);
      console.log('✅ All data loaded successfully!');
    };
    loadAllData();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: '#ffffff' }}>
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-secondary mt-3">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid min-vh-100 p-0" style={{ background: '#ffffff' }}>
      <div className="row g-0">
        {/* Sidebar - Desktop */}
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          onLogout={onLogout}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        
        {/* Main Content */}
        <main className="col-lg-10 col-xl-10 ms-lg-auto p-0" style={{ marginLeft: '16.666%' }}>
          <TopNavbar 
            activeTab={activeTab} 
            sidebarOpen={sidebarOpen} 
            setSidebarOpen={setSidebarOpen}
            studentName={studentProfile.name}
          />
          
          <div className="p-3 p-md-4" style={{ maxWidth: '1200px', margin: '0 auto', color: '#1a1a2e' }}>
            {/* Header section */}
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
              <div>
                <h3 className="fw-bold text-dark text-capitalize m-0" style={{ fontSize: 'clamp(1.2rem, 4vw, 1.8rem)' }}>
                  {activeTab.replace('-', ' ')}
                </h3>
                <small className="text-secondary">Welcome back, {studentProfile.name}</small>
              </div>
              <div className="badge bg-light border border-secondary text-primary px-3 py-2 rounded-pill mt-2 mt-sm-0">
                {studentProfile.dept}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="alert alert-danger alert-dismissible fade show" role="alert">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                {error}
                <button type="button" className="btn-close" onClick={() => setError('')}></button>
              </div>
            )}

            {/* Main Content Container */}
            <div className="p-3 p-md-4" style={{ 
              background: '#f8f9fa', 
              borderRadius: '16px',
              border: '1px solid #e9ecef',
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
              minHeight: '400px'
            }}>
              {activeTab === 'dashboard' && <Dashboard studentProfile={studentProfile} jobDrives={jobDrives} />}
              {activeTab === 'profile' && <Profile studentProfile={studentProfile} />}
              {activeTab === 'drives' && <PlacementDrives jobDrives={jobDrives || []} />}
              {activeTab === 'mock' && <MockTests />}
              {activeTab === 'coding' && <Coding />}
              {activeTab === 'applications' && <Applications applications={applications || []} />}
              {activeTab === 'notifications' && <Notifications notifications={notifications || []} />}
              {activeTab === 'companies' && <Companies token={token} />}
              {activeTab === 'jobs' && <Job token={token} />}
              {activeTab === 'reports' && <Reports />}
              {activeTab === 'settings' && <Settings studentProfile={studentProfile} />}
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="d-lg-none fixed-bottom bg-white border-top py-2" style={{ zIndex: 999 }}>
        <div className="d-flex justify-content-around">
          {['dashboard', 'jobs', 'applications', 'profile'].map((tab) => (
            <div
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                color: activeTab === tab ? '#0d6efd' : '#6c757d',
                cursor: 'pointer',
                padding: '0.25rem 0.5rem',
                fontSize: '0.7rem',
                transition: 'all 0.2s'
              }}
            >
              <i className={`bi ${tab === 'dashboard' ? 'bi-grid-fill' : 
                tab === 'jobs' ? 'bi-briefcase-fill' : 
                tab === 'applications' ? 'bi-file-earmark-text-fill' : 
                'bi-person-fill'}`}
                style={{ fontSize: '1.4rem' }}
              ></i>
              <span className="mt-1" style={{ fontSize: '0.6rem', textTransform: 'capitalize' }}>
                {tab === 'dashboard' ? 'Home' : 
                 tab === 'jobs' ? 'Jobs' : 
                 tab === 'applications' ? 'Apps' : 
                 'Profile'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile menu overlay */}
      <style>{`
        @media (max-width: 991px) {
          .sidebar-desktop {
            display: none;
          }
          main {
            margin-left: 0 !important;
            padding-bottom: 70px !important;
          }
        }
        @media (min-width: 992px) {
          .mobile-bottom-nav {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}