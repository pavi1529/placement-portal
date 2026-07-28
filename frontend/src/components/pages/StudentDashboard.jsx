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
import Job from './Job';  // ✅ Added Job import

// ✅ API URL
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
    <div className="container-fluid min-vh-100" style={{ background: '#ffffff' }}>
      <div className="row g-0">
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          onLogout={onLogout} 
        />
        
        <main className="col-md-9 col-lg-10 ms-md-auto p-0">
          <TopNavbar 
            activeTab={activeTab} 
            sidebarOpen={sidebarOpen} 
            setSidebarOpen={setSidebarOpen}
          />
          
          <div className="p-4" style={{ maxWidth: '1200px', margin: '0 auto', color: '#1a1a2e' }}>
            {/* Header section */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h3 className="fw-bold text-dark text-capitalize m-0">{activeTab.replace('-', ' ')}</h3>
                <small className="text-secondary">Welcome back, {studentProfile.name}</small>
              </div>
              <div className="badge bg-light border border-secondary text-primary px-3 py-2 rounded-pill">
                {studentProfile.dept}
              </div>
            </div>

            {/* Main Content Container */}
            <div className="p-4" style={{ 
              background: '#f8f9fa', 
              borderRadius: '16px',
              border: '1px solid #e9ecef',
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
            }}>
              {activeTab === 'dashboard' && <Dashboard />}
              {activeTab === 'profile' && <Profile studentProfile={studentProfile} />}
              {activeTab === 'drives' && <PlacementDrives jobDrives={jobDrives || []} />}
              {activeTab === 'mock' && <MockTests />}
              {activeTab === 'coding' && <Coding />}
              {activeTab === 'applications' && <Applications applications={applications || []} />}
              {activeTab === 'notifications' && <Notifications notifications={notifications || []} />}
              
              {/* ✅ Companies Tab */}
              {activeTab === 'companies' && <Companies token={token} />}
              
              {/* ✅ Jobs Tab - NEW */}
              {activeTab === 'jobs' && <Job token={token} />}
              
              {activeTab === 'reports' && <Reports />}
              {activeTab === 'settings' && <Settings studentProfile={studentProfile} />}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}