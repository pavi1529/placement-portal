import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { 
  Building2, Users, Briefcase, Award, Code2, 
  Send, FileText, UserCheck, Settings, LogOut, 
  Plus, Trash2, Edit2, Search, Filter, 
  BarChart3, HelpCircle, Save, Globe, Sparkles, 
  GraduationCap, LayoutDashboard, User, BookOpen, 
  Bell, Lock, Mail, Upload, ArrowUpRight, 
  AlertCircle, Clock, ArrowLeft, ArrowRight, 
  ChevronRight, Target, Star, TrendingUp, CheckCircle,
  Menu, X, Activity, Shield, Crown, Rocket, Calendar, Eye,
  XCircle, Check, AlertTriangle, Info, RefreshCw, 
  Mail as MailIcon, Phone, MapPin, Globe as GlobeIcon,
  Briefcase as BriefcaseIcon, GraduationCap as GradIcon,
  Users as UsersIcon, Award as AwardIcon, Code,
  PieChart, Download, Printer, Share2, Bookmark,
  Clock as ClockIcon, CheckCircle as CheckIcon,
  XCircle as XIcon, AlertTriangle as AlertIcon,
  Play, StopCircle, Timer, List, FileCode, ClipboardList,
  BarChart, PieChart as PieChartIcon, UserCircle,
  Settings as SettingsIcon, LogOut as LogOutIcon,
  Terminal, Cpu, GitBranch, Layers, Zap, 
  Upload as UploadIcon, Download as DownloadIcon,
  Coffee, Moon, Sun, Cloud, Database, Server,
  Shield as ShieldIcon, Lock as LockIcon,
  DollarSign, MapPin as MapPinIcon, Home, Monitor, Wifi,
  Calendar as CalendarIcon, Users as UsersIcon2,
  ExternalLink, Heart, Bookmark as BookmarkIcon, Link,
  Megaphone, MessageSquare, AlertOctagon, CheckSquare,
  FileSpreadsheet, BadgeCheck, UsersRound, BriefcaseBusiness,
  CheckCheck, XSquare, ClockArrowUp, FilePlus2,
  Trophy, Medal, LineChart, Activity as ActivityIcon,
  ListChecks, Clipboard, Timer as TimerIcon,
  Layers as LayersIcon, Hash, Grid, Zap as ZapIcon,
  PlusCircle
} from 'lucide-react';


import AdminJobsTab from './AdminJobsTab';
import AdminMockTestsTab from './AdminMockTestsTab';
import AdminQuestionsTab from './AdminQuestionsTab';

const API_URL = 'http://localhost:5000/api';

export default function AdminDashboard({ onLogout }) {
 
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('ALL');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [editingCompany, setEditingCompany] = useState(null);
  const [editingNotification, setEditingNotification] = useState(null);
  const [editingApplication, setEditingApplication] = useState(null);

  const token = localStorage.getItem('adminToken');


  const [students, setStudents] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [tests, setTests] = useState([]);
  const [applications, setApplications] = useState([]);
  const [reports, setReports] = useState([]);
  const [adminProfile, setAdminProfile] = useState({
    name: 'Admin',
    email: 'admin@gmail.com',
    role: 'admin'
  });

  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCompanies: 0,
    totalJobs: 0,
    totalApplications: 0,
    totalTests: 0,
    totalQuestions: 0
  });

 
  const [newStudent, setNewStudent] = useState({ 
    name: '', email: '', password: 'Student@123',
    department: 'CSE', cgpa: '', phone: '', year: ''
  });

  const [newCompany, setNewCompany] = useState({
    name: '', email: '', phone: '', address: '',
    website: '', description: '', industry: 'Technology',
    tier: 'Product', minCgpa: '7.0', openRoles: ''
  });

  const [newJob, setNewJob] = useState({
    title: '', company: '', description: '', requirements: '',
    location: '', salary: '', type: 'full-time', category: '',
    experience: '', deadline: '', positions: 1
  });

 
  const [newNotification, setNewNotification] = useState({
    title: '',
    message: '',
    type: 'info',
    target: 'all',
    priority: 'medium',
    link: '',
    expiresAt: ''
  });

  const [notificationFilters, setNotificationFilters] = useState({
    type: 'all',
    priority: 'all',
    status: 'all'
  });

 
  const [newApplication, setNewApplication] = useState({
    studentId: '',
    jobId: '',
    studentName: '',
    studentEmail: '',
    jobTitle: '',
    company: '',
    status: 'pending',
    appliedDate: new Date().toISOString().split('T')[0],
    resume: '',
    coverLetter: '',
    cgpa: '',
    department: '',
    year: '',
    remarks: ''
  });

  const [applicationFilters, setApplicationFilters] = useState({
    status: 'all',
    department: 'all',
    dateFrom: '',
    dateTo: ''
  });

  const [selectedApplications, setSelectedApplications] = useState([]);
  const [showBulkActionModal, setShowBulkActionModal] = useState(false);
  const [bulkAction, setBulkAction] = useState('');

  const [newTest, setNewTest] = useState({
    title: '', description: '', type: 'aptitude',
    duration: 30, totalMarks: 100, passingMarks: 40,
    scheduledDate: '', questions: []
  });

  const [reportFilters, setReportFilters] = useState({
    type: 'placement', department: 'ALL', fromDate: '', toDate: ''
  });

  const [selectedCategory, setSelectedCategory] = useState('All');

  
  const apiCall = async (endpoint, method = 'GET', data = null) => {
    try {
      setLoading(true);
      
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
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminName');
          if (onLogout) onLogout();
        }
        throw new Error(result.message || 'API call failed');
      }
      
      return result;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

 
  const fetchDashboardStats = async () => {
    try {
      const data = await apiCall('/admin/dashboard');
      if (data.success) {
        setStats({
          totalStudents: data.data.stats.totalStudents || 0,
          totalCompanies: data.data.stats.totalCompanies || 0,
          totalJobs: data.data.stats.totalJobs || 0,
          totalApplications: data.data.stats.totalApplications || 0,
          totalTests: data.data.stats.totalTests || 0,
          totalQuestions: data.data.stats.totalQuestions || 0
        });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchStudents = async () => {
    try {
      const data = await apiCall('/admin/students');
      if (data.success) {
        setStudents(data.data || []);
      } else {
        setStudents([]);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
      setStudents([]);
    }
  };

  const fetchCompanies = async () => {
    try {
      const data = await apiCall('/admin/companies');
      if (data.success) setCompanies(data.data || []);
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  const fetchJobs = async () => {
    try {
      const data = await apiCall('/jobs');
      if (data.success) {
        setJobs(data.data || []);
      } else {
        setJobs([]);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setJobs([]);
    }
  };

  const fetchQuestions = async () => {
    try {
      const data = await apiCall('/admin/questions');
      if (data.success) {
        setQuestions(data.data || []);
        setStats(prev => ({
          ...prev,
          totalQuestions: data.data?.length || 0
        }));
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
      setQuestions([]);
    }
  };

  const fetchNotifications = async () => {
    try {
      const data = await apiCall('/notifications');
      if (data.success) setNotifications(data.data || []);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setNotifications([]);
    }
  };

 
  const handleAddNotification = async (e) => {
    e.preventDefault();
    
    if (!newNotification.title || !newNotification.message) {
      alert('Please fill in title and message!');
      return;
    }

    try {
      setLoading(true);
      const data = await apiCall('/notifications', 'POST', {
        title: newNotification.title,
        message: newNotification.message,
        type: newNotification.type || 'info',
        target: newNotification.target || 'all',
        priority: newNotification.priority || 'medium',
        link: newNotification.link || '',
        expiresAt: newNotification.expiresAt || null
      });

      if (data.success) {
        alert('✅ Notification sent successfully!');
        await fetchNotifications();
        setNewNotification({
          title: '',
          message: '',
          type: 'info',
          target: 'all',
          priority: 'medium',
          link: '',
          expiresAt: ''
        });
        setShowAddModal(false);
      } else {
        alert('❌ Failed to send notification: ' + data.message);
      }
    } catch (error) {
      alert('❌ Failed to send notification: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditNotification = (notification) => {
    setEditingNotification(notification);
    setNewNotification({
      title: notification.title || '',
      message: notification.message || '',
      type: notification.type || 'info',
      target: notification.target || 'all',
      priority: notification.priority || 'medium',
      link: notification.link || '',
      expiresAt: notification.expiresAt ? notification.expiresAt.split('T')[0] : ''
    });
    setShowEditModal(true);
  };

  const handleUpdateNotification = async (e) => {
    e.preventDefault();
    
    if (!newNotification.title || !newNotification.message) {
      alert('Please fill in title and message!');
      return;
    }

    try {
      setLoading(true);
      const data = await apiCall(`/notifications/${editingNotification._id}`, 'PUT', {
        title: newNotification.title,
        message: newNotification.message,
        type: newNotification.type || 'info',
        target: newNotification.target || 'all',
        priority: newNotification.priority || 'medium',
        link: newNotification.link || '',
        expiresAt: newNotification.expiresAt || null,
        isActive: true
      });

      if (data.success) {
        alert('✅ Notification updated successfully!');
        await fetchNotifications();
        setNewNotification({
          title: '',
          message: '',
          type: 'info',
          target: 'all',
          priority: 'medium',
          link: '',
          expiresAt: ''
        });
        setEditingNotification(null);
        setShowEditModal(false);
      } else {
        alert('❌ Failed to update notification: ' + data.message);
      }
    } catch (error) {
        alert('❌ Failed to update notification: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNotification = async (id) => {
    if (!window.confirm('Are you sure you want to delete this notification?')) return;

    try {
      const data = await apiCall(`/notifications/${id}`, 'DELETE');
      if (data.success) {
        alert('✅ Notification deleted successfully!');
        await fetchNotifications();
      } else {
        alert('❌ Failed to delete notification: ' + data.message);
      }
    } catch (error) {
      alert('❌ Failed to delete notification: ' + error.message);
    }
  };

  const handleToggleNotificationStatus = async (id, currentStatus) => {
    try {
      const data = await apiCall(`/notifications/${id}/toggle`, 'PUT', {
        isActive: !currentStatus
      });
      if (data.success) {
        await fetchNotifications();
      }
    } catch (error) {
      alert('❌ Failed to toggle notification status: ' + error.message);
    }
  };

 
  const fetchApplications = async () => {
    try {
      const data = await apiCall('/admin/applications');
      if (data.success) {
        setApplications(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
      setApplications([]);
    }
  };

  const handleAddApplication = async (e) => {
    e.preventDefault();
    
    if (!newApplication.studentId || !newApplication.jobId) {
      alert('Please select both student and job!');
      return;
    }

    try {
      setLoading(true);
      const data = await apiCall('/admin/applications', 'POST', {
        studentId: newApplication.studentId,
        jobId: newApplication.jobId,
        status: newApplication.status || 'pending',
        appliedDate: newApplication.appliedDate || new Date().toISOString().split('T')[0],
        resume: newApplication.resume || '',
        coverLetter: newApplication.coverLetter || '',
        remarks: newApplication.remarks || ''
      });

      if (data.success) {
        alert('✅ Application submitted successfully!');
        await fetchApplications();
        await fetchDashboardStats();
        setNewApplication({
          studentId: '',
          jobId: '',
          studentName: '',
          studentEmail: '',
          jobTitle: '',
          company: '',
          status: 'pending',
          appliedDate: new Date().toISOString().split('T')[0],
          resume: '',
          coverLetter: '',
          cgpa: '',
          department: '',
          year: '',
          remarks: ''
        });
        setShowAddModal(false);
      } else {
        alert('❌ Failed to submit application: ' + data.message);
      }
    } catch (error) {
      alert('❌ Failed to submit application: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditApplication = (application) => {
    setEditingApplication(application);
    setNewApplication({
      studentId: application.studentId?._id || application.studentId || '',
      jobId: application.jobId?._id || application.jobId || '',
      studentName: application.studentId?.name || application.studentName || '',
      studentEmail: application.studentId?.email || application.studentEmail || '',
      jobTitle: application.jobId?.title || application.jobTitle || '',
      company: application.jobId?.company || application.company || '',
      status: application.status || 'pending',
      appliedDate: application.appliedDate ? application.appliedDate.split('T')[0] : new Date().toISOString().split('T')[0],
      resume: application.resume || '',
      coverLetter: application.coverLetter || '',
      cgpa: application.cgpa || '',
      department: application.department || '',
      year: application.year || '',
      remarks: application.remarks || ''
    });
    setShowEditModal(true);
  };

  const handleUpdateApplication = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      const data = await apiCall(`/admin/applications/${editingApplication._id}`, 'PUT', {
        status: newApplication.status,
        resume: newApplication.resume || '',
        coverLetter: newApplication.coverLetter || '',
        remarks: newApplication.remarks || ''
      });

      if (data.success) {
        alert('✅ Application updated successfully!');
        await fetchApplications();
        await fetchDashboardStats();
        setNewApplication({
          studentId: '',
          jobId: '',
          studentName: '',
          studentEmail: '',
          jobTitle: '',
          company: '',
          status: 'pending',
          appliedDate: new Date().toISOString().split('T')[0],
          resume: '',
          coverLetter: '',
          cgpa: '',
          department: '',
          year: '',
          remarks: ''
        });
        setEditingApplication(null);
        setShowEditModal(false);
      } else {
        alert('❌ Failed to update application: ' + data.message);
      }
    } catch (error) {
      alert('❌ Failed to update application: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteApplication = async (id) => {
    if (!window.confirm('Are you sure you want to delete this application?')) return;

    try {
      const data = await apiCall(`/admin/applications/${id}`, 'DELETE');
      if (data.success) {
        alert('✅ Application deleted successfully!');
        await fetchApplications();
        await fetchDashboardStats();
      } else {
        alert('❌ Failed to delete application: ' + data.message);
      }
    } catch (error) {
      alert('❌ Failed to delete application: ' + error.message);
    }
  };

  const handleBulkUpdateStatus = async (status) => {
    if (selectedApplications.length === 0) {
      alert('Please select applications to update');
      return;
    }

    if (!window.confirm(`Update ${selectedApplications.length} applications to "${status}"?`)) return;

    try {
      setLoading(true);
      const data = await apiCall('/admin/applications/bulk-update', 'POST', {
        ids: selectedApplications,
        status: status
      });

      if (data.success) {
        alert(`✅ ${selectedApplications.length} applications updated to "${status}"!`);
        await fetchApplications();
        setSelectedApplications([]);
        setShowBulkActionModal(false);
      } else {
        alert('❌ Failed to update applications: ' + data.message);
      }
    } catch (error) {
      alert('❌ Failed to update applications: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBulkDeleteApplications = async () => {
    if (selectedApplications.length === 0) {
      alert('Please select applications to delete');
      return;
    }

    if (!window.confirm(`Delete ${selectedApplications.length} selected applications?`)) return;

    try {
      setLoading(true);
      const data = await apiCall('/admin/applications/bulk-delete', 'POST', {
        ids: selectedApplications
      });

      if (data.success) {
        alert(`✅ ${selectedApplications.length} applications deleted!`);
        await fetchApplications();
        setSelectedApplications([]);
        setShowBulkActionModal(false);
      } else {
        alert('❌ Failed to delete applications: ' + data.message);
      }
    } catch (error) {
      alert('❌ Failed to delete applications: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectApplication = (id) => {
    setSelectedApplications(prev => 
      prev.includes(id) 
        ? prev.filter(appId => appId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAllApplications = () => {
    if (selectedApplications.length === filteredApplications.length) {
      setSelectedApplications([]);
    } else {
      setSelectedApplications(filteredApplications.map(app => app._id));
    }
  };

  const fetchTests = async () => {
    try {
      const data = await apiCall('/tests');
      if (data.success) setTests(data.data || []);
    } catch (error) {
      console.error('Error fetching tests:', error);
      setTests([]);
    }
  };

  const fetchReports = async () => {
    try {
      const data = await apiCall('/admin/reports');
      if (data.success) setReports(data.data || []);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  const fetchAdminProfile = async () => {
    try {
      const data = await apiCall('/admin/profile');
      if (data.success) setAdminProfile(data.data || {});
    } catch (error) {
      console.error('Error fetching admin profile:', error);
    }
  };

  const refreshAllData = () => {
    setRefreshTrigger(prev => prev + 1);
  };

 
  const handleAddStudent = async (e) => {
    e.preventDefault();
    if (!newStudent.name || !newStudent.email || !newStudent.cgpa) {
      alert('Please fill all required fields');
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
        role: 'student'
      });

      if (data.success) {
        alert('✅ Student added successfully!');
        await fetchStudents();
        await fetchDashboardStats();
        setNewStudent({ name: '', email: '', password: 'Student@123', department: 'CSE', cgpa: '', phone: '', year: '' });
        setShowAddModal(false);
      }
    } catch (error) {
      alert('❌ Failed to add student: ' + error.message);
    }
  };

  const handleDeleteStudent = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;
    try {
      const data = await apiCall(`/admin/students/${id}`, 'DELETE');
      if (data.success) {
        alert('✅ Student deleted successfully!');
        await fetchStudents();
        await fetchDashboardStats();
      }
    } catch (error) {
      alert('❌ Failed to delete student: ' + error.message);
    }
  };

  const handleEditStudent = async (e) => {
    e.preventDefault();
    try {
      const data = await apiCall(`/admin/students/${editingItem._id}`, 'PUT', editingItem);
      if (data.success) {
        alert('✅ Student updated successfully!');
        await fetchStudents();
        await fetchDashboardStats();
        setShowEditModal(false);
        setEditingItem(null);
      }
    } catch (error) {
      alert('❌ Failed to update student: ' + error.message);
    }
  };

 
  const handleAddCompany = async (e) => {
    e.preventDefault();
    if (!newCompany.name || !newCompany.email) {
      alert('Please fill in all required fields!');
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      
      const response = await fetch(`${API_URL}/admin/companies`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: newCompany.name,
          email: newCompany.email,
          phone: newCompany.phone || '',
          address: newCompany.address || '',
          website: newCompany.website || '',
          description: newCompany.description || '',
          industry: newCompany.industry || 'Technology',
          tier: newCompany.tier || 'Product',
          minCgpa: newCompany.minCgpa || '7.0',
          openRoles: parseInt(newCompany.openRoles) || 0
        })
      });

      const data = await response.json();
      
      if (data.success) {
        alert('✅ Company added successfully!');
        await fetchCompanies();
        await fetchDashboardStats();
        setNewCompany({
          name: '', email: '', phone: '', address: '',
          website: '', description: '', industry: 'Technology',
          tier: 'Product', minCgpa: '7.0', openRoles: ''
        });
        setShowAddModal(false);
      } else {
        alert('❌ ' + data.message);
      }
    } catch (error) {
      console.error('Error adding company:', error);
      alert('❌ Failed to add company: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditCompany = (company) => {
    setEditingCompany(company);
    setNewCompany({
      name: company.name,
      email: company.email,
      phone: company.phone || '',
      address: company.address || '',
      website: company.website || '',
      description: company.description || '',
      industry: company.industry || 'Technology',
      tier: company.tier || 'Product',
      minCgpa: company.minCgpa || '7.0',
      openRoles: company.openRoles || ''
    });
    setShowAddModal(true);
  };

  const handleUpdateCompany = async (e) => {
    e.preventDefault();
    if (!newCompany.name || !newCompany.email) {
      alert('Please fill in all required fields!');
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      
      const response = await fetch(`${API_URL}/admin/companies/${editingCompany._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: newCompany.name,
          email: newCompany.email,
          phone: newCompany.phone || '',
          address: newCompany.address || '',
          website: newCompany.website || '',
          description: newCompany.description || '',
          industry: newCompany.industry || 'Technology',
          tier: newCompany.tier || 'Product',
          minCgpa: newCompany.minCgpa || '7.0',
          openRoles: parseInt(newCompany.openRoles) || 0
        })
      });

      const data = await response.json();
      
      if (data.success) {
        alert('✅ Company updated successfully!');
        await fetchCompanies();
        await fetchDashboardStats();
        setNewCompany({
          name: '', email: '', phone: '', address: '',
          website: '', description: '', industry: 'Technology',
          tier: 'Product', minCgpa: '7.0', openRoles: ''
        });
        setEditingCompany(null);
        setShowAddModal(false);
      } else {
        alert('❌ ' + data.message);
      }
    } catch (error) {
      console.error('Error updating company:', error);
      alert('❌ Failed to update company: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCompany = async (id) => {
    if (!window.confirm('Are you sure you want to delete this company?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/admin/companies/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      
      if (data.success) {
        alert('✅ Company deleted successfully!');
        await fetchCompanies();
        await fetchDashboardStats();
      } else {
        alert('❌ ' + data.message);
      }
    } catch (error) {
      console.error('Error deleting company:', error);
      alert('❌ Failed to delete company: ' + error.message);
    }
  };


  const handleGenerateReport = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      const data = await apiCall('/admin/reports/generate', 'POST', reportFilters);
      
      if (data.success) {
        alert('✅ Report generated successfully!');
        await fetchReports();
      } else {
        alert('❌ Failed to generate report: ' + data.message);
      }
    } catch (error) {
      alert('❌ Failed to generate report: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      const data = await apiCall('/admin/profile', 'PUT', {
        name: adminProfile.name,
        email: adminProfile.email
      });
      
      if (data.success) {
        alert('✅ Profile updated successfully!');
        await fetchAdminProfile();
      } else {
        alert('❌ Failed to update profile: ' + data.message);
      }
    } catch (error) {
      alert('❌ Failed to update profile: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

 
  useEffect(() => {
    if (!token) {
      if (onLogout) onLogout();
      return;
    }

    const loadAllData = async () => {
      await Promise.all([
        fetchDashboardStats(),
        fetchStudents(),
        fetchCompanies(),
        fetchJobs(),
        fetchQuestions(),
        fetchNotifications(),
        fetchTests(),
        fetchApplications(),
        fetchReports(),
        fetchAdminProfile()
      ]);
    };
    loadAllData();
  }, [refreshTrigger]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'dashboard') {
      fetchDashboardStats();
      fetchStudents();
      fetchJobs();
      fetchApplications();
      fetchTests();
      fetchQuestions();
    } else if (tab === 'students') fetchStudents();
    else if (tab === 'companies') fetchCompanies();
    else if (tab === 'jobs') fetchJobs();
    else if (tab === 'questions') fetchQuestions();
    else if (tab === 'notifications') fetchNotifications();
    else if (tab === 'mocktests') fetchTests();
    else if (tab === 'applications') fetchApplications();
    else if (tab === 'reports') fetchReports();
    else if (tab === 'profile') fetchAdminProfile();
  };

 
  const handleLogout = () => {
    setShowLogoutModal(false);
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminName');
    if (onLogout) onLogout();
  };

 
  const filteredStudents = students
    .filter(s => deptFilter === 'ALL' || s.department === deptFilter)
    .filter(s => s.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                  s.email?.toLowerCase().includes(searchQuery.toLowerCase()));

  const filteredNotifications = notifications.filter(n => {
    if (notificationFilters.type !== 'all' && n.type !== notificationFilters.type) return false;
    if (notificationFilters.priority !== 'all' && n.priority !== notificationFilters.priority) return false;
    if (notificationFilters.status !== 'all') {
      if (notificationFilters.status === 'active' && !n.isActive) return false;
      if (notificationFilters.status === 'inactive' && n.isActive) return false;
    }
    return true;
  });

  const filteredApplications = applications.filter(app => {
    if (applicationFilters.status !== 'all' && app.status !== applicationFilters.status) return false;
    if (applicationFilters.department !== 'all' && app.department !== applicationFilters.department) return false;
    
    if (applicationFilters.dateFrom && app.appliedDate) {
      const appDate = new Date(app.appliedDate);
      const fromDate = new Date(applicationFilters.dateFrom);
      if (appDate < fromDate) return false;
    }
    if (applicationFilters.dateTo && app.appliedDate) {
      const appDate = new Date(app.appliedDate);
      const toDate = new Date(applicationFilters.dateTo);
      if (appDate > toDate) return false;
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const studentName = app.studentId?.name?.toLowerCase() || app.studentName?.toLowerCase() || '';
      const jobTitle = app.jobId?.title?.toLowerCase() || app.jobTitle?.toLowerCase() || '';
      const company = app.jobId?.company?.toLowerCase() || app.company?.toLowerCase() || '';
      const email = app.studentId?.email?.toLowerCase() || app.studentEmail?.toLowerCase() || '';
      
      return studentName.includes(query) || 
             jobTitle.includes(query) || 
             company.includes(query) || 
             email.includes(query);
    }
    
    return true;
  });

 
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'companies', label: 'Companies', icon: Building2 },
    { id: 'jobs', label: 'Jobs', icon: Briefcase },
    { id: 'questions', label: 'Questions', icon: HelpCircle },
    { id: 'mocktests', label: 'Mock Tests', icon: Award },
    { id: 'applications', label: 'Applications', icon: UserCheck },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'profile', label: 'Profile', icon: Settings },
  ];

 
  const openAddModal = () => {
    if (activeTab === 'applications') {
      setNewApplication({
        studentId: '',
        jobId: '',
        studentName: '',
        studentEmail: '',
        jobTitle: '',
        company: '',
        status: 'pending',
        appliedDate: new Date().toISOString().split('T')[0],
        resume: '',
        coverLetter: '',
        cgpa: '',
        department: '',
        year: '',
        remarks: ''
      });
      setEditingApplication(null);
    } else if (activeTab === 'notifications') {
      setNewNotification({
        title: '',
        message: '',
        type: 'info',
        target: 'all',
        priority: 'medium',
        link: '',
        expiresAt: ''
      });
      setEditingNotification(null);
    } else if (activeTab === 'students') {
      setNewStudent({ 
        name: '', email: '', password: 'Student@123',
        department: 'CSE', cgpa: '', phone: '', year: ''
      });
    } else if (activeTab === 'companies') {
      setNewCompany({
        name: '', email: '', phone: '', address: '',
        website: '', description: '', industry: 'Technology',
        tier: 'Product', minCgpa: '7.0', openRoles: ''
      });
      setEditingCompany(null);
    }
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
    setNewNotification({
      title: '',
      message: '',
      type: 'info',
      target: 'all',
      priority: 'medium',
      link: '',
      expiresAt: ''
    });
    setNewApplication({
      studentId: '',
      jobId: '',
      studentName: '',
      studentEmail: '',
      jobTitle: '',
      company: '',
      status: 'pending',
      appliedDate: new Date().toISOString().split('T')[0],
      resume: '',
      coverLetter: '',
      cgpa: '',
      department: '',
      year: '',
      remarks: ''
    });
    setEditingApplication(null);
    setEditingNotification(null);
    setEditingCompany(null);
  };

  const openEditModal = (item) => { setEditingItem(item); setShowEditModal(true); };
  
  const closeEditModal = () => { 
    setShowEditModal(false); 
    setEditingItem(null);
    setEditingNotification(null);
    setEditingApplication(null);
    setNewNotification({
      title: '',
      message: '',
      type: 'info',
      target: 'all',
      priority: 'medium',
      link: '',
      expiresAt: ''
    });
    setNewApplication({
      studentId: '',
      jobId: '',
      studentName: '',
      studentEmail: '',
      jobTitle: '',
      company: '',
      status: 'pending',
      appliedDate: new Date().toISOString().split('T')[0],
      resume: '',
      coverLetter: '',
      cgpa: '',
      department: '',
      year: '',
      remarks: ''
    });
  };
  
  const openDetailsModal = (item) => { setSelectedItem(item); setShowDetailsModal(true); };
  const closeDetailsModal = () => { setShowDetailsModal(false); setSelectedItem(null); };

 
  const getStatusBadge = (status) => {
    const statusMap = {
      'pending': 'warning',
      'reviewing': 'info',
      'shortlisted': 'primary',
      'selected': 'success',
      'rejected': 'danger',
      'withdrawn': 'secondary',
      'interview': 'info',
      'offer': 'success'
    };
    return statusMap[status?.toLowerCase()] || 'secondary';
  };

  const getStatusLabel = (status) => {
    const statusMap = {
      'pending': '⏳ Pending',
      'reviewing': '🔍 Reviewing',
      'shortlisted': '⭐ Shortlisted',
      'selected': '✅ Selected',
      'rejected': '❌ Rejected',
      'withdrawn': '↩️ Withdrawn',
      'interview': '🎯 Interview',
      'offer': '🎉 Offer Made'
    };
    return statusMap[status?.toLowerCase()] || status || 'N/A';
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric'
    });
  };

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'info': return <Info style={{ width: '0.8rem', height: '0.8rem' }} />;
      case 'success': return <CheckCircle style={{ width: '0.8rem', height: '0.8rem' }} />;
      case 'warning': return <AlertTriangle style={{ width: '0.8rem', height: '0.8rem' }} />;
      case 'error': return <AlertCircle style={{ width: '0.8rem', height: '0.8rem' }} />;
      default: return <Bell style={{ width: '0.8rem', height: '0.8rem' }} />;
    }
  };

  const getNotificationColor = (type) => {
    switch(type) {
      case 'info': return 'primary';
      case 'success': return 'success';
      case 'warning': return 'warning';
      case 'error': return 'danger';
      default: return 'secondary';
    }
  };

  const getPriorityBadge = (priority) => {
    const colors = {
      'low': 'secondary',
      'medium': 'info',
      'high': 'warning',
      'urgent': 'danger'
    };
    return colors[priority] || 'secondary';
  };

 
  const renderModalContent = () => {
    // Application Form
    if (activeTab === 'applications') {
      return (
        <form onSubmit={editingApplication ? handleUpdateApplication : handleAddApplication}>
          <div className="row g-3">
            {/* Student Select */}
            <div className="col-12">
              <label className="form-label text-light small">Student *</label>
              <select 
                className="form-select bg-dark text-light border-secondary" 
                value={newApplication.studentId || ''} 
                onChange={(e) => {
                  const student = students.find(s => s._id === e.target.value);
                  setNewApplication({
                    ...newApplication,
                    studentId: e.target.value,
                    studentName: student?.name || '',
                    studentEmail: student?.email || '',
                    cgpa: student?.cgpa || '',
                    department: student?.department || '',
                    year: student?.year || ''
                  });
                }} 
                required
              >
                <option value="">Select Student</option>
                {students && students.length > 0 ? (
                  students.map((student) => (
                    <option key={student._id || student.id} value={student._id || student.id}>
                      {String(student.name || 'Unnamed')} - {String(student.email || '')} ({String(student.department || 'N/A')})
                    </option>
                  ))
                ) : (
                  <option value="" disabled>No students available</option>
                )}
              </select>
            </div>

           
            <div className="col-12">
              <label className="form-label text-light small">Job *</label>
              <select 
                className="form-select bg-dark text-light border-secondary" 
                value={newApplication.jobId || ''} 
                onChange={(e) => {
                  const job = jobs.find(j => j._id === e.target.value);
                  setNewApplication({
                    ...newApplication,
                    jobId: e.target.value,
                    jobTitle: job?.title || '',
                    company: job?.company || ''
                  });
                }} 
                required
              >
                <option value="">Select Job</option>
                {jobs && jobs.length > 0 ? (
                  jobs.map((job) => (
                    <option key={job._id || job.id} value={job._id || job.id}>
                      {String(job.title || 'Untitled')} - {String(job.company || 'N/A')}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>No jobs available</option>
                )}
              </select>
            </div>

          
            <div className="col-md-6">
              <label className="form-label text-light small">Status</label>
              <select 
                className="form-select bg-dark text-light border-secondary" 
                value={newApplication.status || 'pending'} 
                onChange={e => setNewApplication({...newApplication, status: e.target.value})}
              >
                <option value="pending">⏳ Pending</option>
                <option value="reviewing">🔍 Reviewing</option>
                <option value="shortlisted">⭐ Shortlisted</option>
                <option value="interview">🎯 Interview</option>
                <option value="selected">✅ Selected</option>
                <option value="offer">🎉 Offer Made</option>
                <option value="rejected">❌ Rejected</option>
                <option value="withdrawn">↩️ Withdrawn</option>
              </select>
            </div>

          
            <div className="col-md-6">
              <label className="form-label text-light small">Applied Date</label>
              <input 
                type="date" 
                className="form-control bg-dark text-light border-secondary" 
                value={newApplication.appliedDate || ''} 
                onChange={e => setNewApplication({...newApplication, appliedDate: e.target.value})} 
              />
            </div>

           
            <div className="col-12">
              <label className="form-label text-light small">Resume Link</label>
              <input 
                type="text" 
                className="form-control bg-dark text-light border-secondary" 
                value={newApplication.resume || ''} 
                onChange={e => setNewApplication({...newApplication, resume: e.target.value})} 
                placeholder="https://drive.google.com/..." 
              />
            </div>

           
            <div className="col-12">
              <label className="form-label text-light small">Cover Letter</label>
              <textarea 
                rows={2} 
                className="form-control bg-dark text-light border-secondary" 
                value={newApplication.coverLetter || ''} 
                onChange={e => setNewApplication({...newApplication, coverLetter: e.target.value})} 
                placeholder="Brief cover letter..." 
              />
            </div>

           
            <div className="col-12">
              <label className="form-label text-light small">Remarks / Notes</label>
              <textarea 
                rows={2} 
                className="form-control bg-dark text-light border-secondary" 
                value={newApplication.remarks || ''} 
                onChange={e => setNewApplication({...newApplication, remarks: e.target.value})} 
                placeholder="Admin notes..." 
              />
            </div>

            
            {newApplication.studentName && (
              <div className="col-12">
                <div className="bg-dark p-3 rounded-3 border border-secondary">
                  <h6 className="text-secondary small text-uppercase fw-bold mb-2">Student Details</h6>
                  <div className="row g-2">
                    <div className="col-6">
                      <span className="text-secondary small">Name:</span>
                      <span className="text-light ms-2">{String(newApplication.studentName || 'N/A')}</span>
                    </div>
                    <div className="col-6">
                      <span className="text-secondary small">Email:</span>
                      <span className="text-light ms-2">{String(newApplication.studentEmail || 'N/A')}</span>
                    </div>
                    <div className="col-6">
                      <span className="text-secondary small">Department:</span>
                      <span className="text-light ms-2">{String(newApplication.department || 'N/A')}</span>
                    </div>
                    <div className="col-6">
                      <span className="text-secondary small">CGPA:</span>
                      <span className="text-light ms-2">{String(newApplication.cgpa || 'N/A')}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="d-flex gap-2 justify-content-end mt-4">
            <button type="button" className="btn btn-secondary" onClick={closeAddModal}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-1" role="status"></span>
                  Submitting...
                </>
              ) : (
                editingApplication ? <><Edit2 style={{ width: '0.8rem', height: '0.8rem' }} /> Update</> : 
                <><FilePlus2 style={{ width: '0.8rem', height: '0.8rem' }} /> Submit</>
              )}
            </button>
          </div>
        </form>
      );
    } 
    
    else if (activeTab === 'notifications') {
      return (
        <form onSubmit={editingNotification ? handleUpdateNotification : handleAddNotification}>
          <div className="row g-3">
            <div className="col-12">
              <label className="form-label text-light small">Title *</label>
              <input type="text" className="form-control bg-dark text-light border-secondary" 
                value={newNotification.title} onChange={e => setNewNotification({...newNotification, title: e.target.value})} 
                placeholder="Enter notification title" required />
            </div>
            <div className="col-12">
              <label className="form-label text-light small">Message *</label>
              <textarea rows={3} className="form-control bg-dark text-light border-secondary" 
                value={newNotification.message} onChange={e => setNewNotification({...newNotification, message: e.target.value})} 
                placeholder="Enter notification message" required />
            </div>
            <div className="col-md-4">
              <label className="form-label text-light small">Type</label>
              <select className="form-select bg-dark text-light border-secondary"
                value={newNotification.type} onChange={e => setNewNotification({...newNotification, type: e.target.value})}>
                <option value="info">📘 Info</option>
                <option value="success">✅ Success</option>
                <option value="warning">⚠️ Warning</option>
                <option value="error">❌ Error</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label text-light small">Priority</label>
              <select className="form-select bg-dark text-light border-secondary"
                value={newNotification.priority} onChange={e => setNewNotification({...newNotification, priority: e.target.value})}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">🚨 Urgent</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label text-light small">Target Audience</label>
              <select className="form-select bg-dark text-light border-secondary"
                value={newNotification.target} onChange={e => setNewNotification({...newNotification, target: e.target.value})}>
                <option value="all">All Students</option>
                <option value="CSE">CSE Department</option>
                <option value="ECE">ECE Department</option>
                <option value="EEE">EEE Department</option>
                <option value="MECH">MECH Department</option>
                <option value="IT">IT Department</option>
              </select>
            </div>
            <div className="col-12">
              <label className="form-label text-light small">Link (Optional)</label>
              <input type="text" className="form-control bg-dark text-light border-secondary" 
                value={newNotification.link} onChange={e => setNewNotification({...newNotification, link: e.target.value})} 
                placeholder="https://example.com" />
            </div>
            <div className="col-12">
              <label className="form-label text-light small">Expires At (Optional)</label>
              <input type="date" className="form-control bg-dark text-light border-secondary" 
                value={newNotification.expiresAt} onChange={e => setNewNotification({...newNotification, expiresAt: e.target.value})} />
            </div>
          </div>
          <div className="d-flex gap-2 justify-content-end mt-4">
            <button type="button" className="btn btn-secondary" onClick={closeAddModal}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? <span className="spinner-border spinner-border-sm"></span> : 
                (editingNotification ? <><Edit2 style={{ width: '0.8rem', height: '0.8rem' }} /> Update</> : 
                <><Send style={{ width: '0.8rem', height: '0.8rem' }} /> Send</>)}
            </button>
          </div>
        </form>
      );
    } 
   
    else if (activeTab === 'students') {
      return (
        <form onSubmit={handleAddStudent}>
          <div className="row g-3">
            <div className="col-12">
              <label className="form-label text-light small">Full Name *</label>
              <input type="text" className="form-control bg-dark text-light border-secondary" 
                value={newStudent.name} onChange={e => setNewStudent({...newStudent, name: e.target.value})} required />
            </div>
            <div className="col-12">
              <label className="form-label text-light small">Email *</label>
              <input type="email" className="form-control bg-dark text-light border-secondary" 
                value={newStudent.email} onChange={e => setNewStudent({...newStudent, email: e.target.value})} required />
            </div>
            <div className="col-6">
              <label className="form-label text-light small">Department *</label>
              <select className="form-select bg-dark text-light border-secondary" 
                value={newStudent.department} onChange={e => setNewStudent({...newStudent, department: e.target.value})} required>
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="EEE">EEE</option>
                <option value="MECH">MECH</option>
                <option value="CIVIL">CIVIL</option>
                <option value="IT">IT</option>
              </select>
            </div>
            <div className="col-6">
              <label className="form-label text-light small">CGPA *</label>
              <input type="number" step="0.01" className="form-control bg-dark text-light border-secondary" 
                value={newStudent.cgpa} onChange={e => setNewStudent({...newStudent, cgpa: e.target.value})} required />
            </div>
            <div className="col-6">
              <label className="form-label text-light small">Phone</label>
              <input type="text" className="form-control bg-dark text-light border-secondary" 
                value={newStudent.phone} onChange={e => setNewStudent({...newStudent, phone: e.target.value})} />
            </div>
            <div className="col-6">
              <label className="form-label text-light small">Year</label>
              <input type="number" className="form-control bg-dark text-light border-secondary" 
                value={newStudent.year} onChange={e => setNewStudent({...newStudent, year: e.target.value})} />
            </div>
          </div>
          <div className="d-flex gap-2 justify-content-end mt-4">
            <button type="button" className="btn btn-secondary" onClick={closeAddModal}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? <span className="spinner-border spinner-border-sm"></span> : 'Add Student'}
            </button>
          </div>
        </form>
      );
    } 
   
    else if (activeTab === 'companies') {
      return (
        <form onSubmit={editingCompany ? handleUpdateCompany : handleAddCompany}>
          <div className="row g-3">
            <div className="col-12">
              <label className="form-label text-light small">Company Name *</label>
              <input type="text" className="form-control bg-dark text-light border-secondary" 
                value={newCompany.name} onChange={e => setNewCompany({...newCompany, name: e.target.value})} required />
            </div>
            <div className="col-12">
              <label className="form-label text-light small">Email *</label>
              <input type="email" className="form-control bg-dark text-light border-secondary" 
                value={newCompany.email} onChange={e => setNewCompany({...newCompany, email: e.target.value})} required />
            </div>
            <div className="col-6">
              <label className="form-label text-light small">Phone</label>
              <input type="text" className="form-control bg-dark text-light border-secondary" 
                value={newCompany.phone} onChange={e => setNewCompany({...newCompany, phone: e.target.value})} />
            </div>
            <div className="col-6">
              <label className="form-label text-light small">Industry</label>
              <select className="form-select bg-dark text-light border-secondary"
                value={newCompany.industry} onChange={e => setNewCompany({...newCompany, industry: e.target.value})}>
                <option value="Technology">Technology</option>
                <option value="E-commerce">E-commerce</option>
                <option value="Finance">Finance</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Services">Services</option>
              </select>
            </div>
            <div className="col-6">
              <label className="form-label text-light small">Tier</label>
              <select className="form-select bg-dark text-light border-secondary"
                value={newCompany.tier} onChange={e => setNewCompany({...newCompany, tier: e.target.value})}>
                <option value="Product">Product</option>
                <option value="Services">Services</option>
                <option value="Startup">Startup</option>
              </select>
            </div>
            <div className="col-6">
              <label className="form-label text-light small">Min CGPA</label>
              <input type="text" className="form-control bg-dark text-light border-secondary" 
                value={newCompany.minCgpa} onChange={e => setNewCompany({...newCompany, minCgpa: e.target.value})} />
            </div>
            <div className="col-6">
              <label className="form-label text-light small">Open Roles</label>
              <input type="number" className="form-control bg-dark text-light border-secondary" 
                value={newCompany.openRoles} onChange={e => setNewCompany({...newCompany, openRoles: e.target.value})} />
            </div>
            <div className="col-12">
              <label className="form-label text-light small">Address</label>
              <input type="text" className="form-control bg-dark text-light border-secondary" 
                value={newCompany.address} onChange={e => setNewCompany({...newCompany, address: e.target.value})} />
            </div>
            <div className="col-12">
              <label className="form-label text-light small">Website</label>
              <input type="text" className="form-control bg-dark text-light border-secondary" 
                value={newCompany.website} onChange={e => setNewCompany({...newCompany, website: e.target.value})} />
            </div>
            <div className="col-12">
              <label className="form-label text-light small">Description</label>
              <textarea rows={2} className="form-control bg-dark text-light border-secondary" 
                value={newCompany.description} onChange={e => setNewCompany({...newCompany, description: e.target.value})} />
            </div>
          </div>
          <div className="d-flex gap-2 justify-content-end mt-4">
            <button type="button" className="btn btn-secondary" onClick={() => {
              setShowAddModal(false);
              setEditingCompany(null);
              setNewCompany({ name: '', email: '', phone: '', address: '', website: '', description: '', industry: 'Technology', tier: 'Product', minCgpa: '7.0', openRoles: '' });
            }}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? <span className="spinner-border spinner-border-sm"></span> : (editingCompany ? 'Update' : 'Add') + ' Company'}
            </button>
          </div>
        </form>
      );
    }
    return null;
  };

  
  return (
    <div className="container-fluid p-0" style={{ minHeight: '100vh', background: '#ffffff' }}>
      <div className="row g-0">
        
       
        <aside className={`col-md-3 col-lg-2 border-end border-light position-fixed h-100 shadow-sm transition-all ${sidebarOpen ? 'd-block' : 'd-none d-md-block'}`} 
               style={{ 
                 top: 0, 
                 left: 0, 
                 zIndex: 1000, 
                 width: '280px',
                 background: 'linear-gradient(180deg, #1a237e, #283593, #303f9f, #3949ab)'
               }}>
          <div className="p-3">
            <div className="d-flex align-items-center gap-2 mb-4 border-bottom border-light pb-3" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
              <div className="bg-white bg-opacity-20 p-2 rounded text-white shadow-sm">
                <Building2 style={{ width: '1.2rem', height: '1.2rem' }} />
              </div>
              <div>
                <h6 className="fw-black text-uppercase text-white m-0" 
                    style={{ 
                      fontSize: '0.9rem', 
                      letterSpacing: '0.05em',
                      fontFamily: "'Inter', 'Arial Black', sans-serif"
                    }}>
                  CONTROL PANEL
                </h6>
                <span className="text-white-50 small text-uppercase fw-bold" 
                      style={{ 
                        fontSize: '0.55rem', 
                        letterSpacing: '0.1em',
                        fontFamily: "'Inter', 'Arial Black', sans-serif"
                      }}>
                  ADMIN ROOT
                </span>
              </div>
            </div>

            <nav className="nav flex-column gap-1">
              {navItems.map((tab) => {
                const Icon = tab.icon;
                const getBadge = () => {
                  if (tab.id === 'applications') {
                    const pending = applications.filter(a => a.status === 'pending').length;
                    return pending > 0 ? <span className="badge bg-danger rounded-pill ms-auto" style={{ fontSize: '0.5rem' }}>{pending}</span> : null;
                  }
                  if (tab.id === 'notifications') {
                    const active = notifications.filter(n => n.isActive !== false).length;
                    return active > 0 ? <span className="badge bg-danger rounded-pill ms-auto" style={{ fontSize: '0.5rem' }}>{active}</span> : null;
                  }
                  if (tab.id === 'questions') {
                    const count = questions.length;
                    return count > 0 ? <span className="badge bg-primary rounded-pill ms-auto" style={{ fontSize: '0.5rem' }}>{count}</span> : null;
                  }
                  return null;
                };
                return (
                  <button
                    key={tab.id}
                    onClick={() => { handleTabChange(tab.id); setSidebarOpen(false); }}
                    className={`btn btn-sm text-start d-flex align-items-center gap-2 rounded-3 transition-all ${
                      activeTab === tab.id 
                        ? 'bg-white text-primary shadow-sm' 
                        : 'text-white-50 hover-bg-white-10'
                    }`}
                    style={{ 
                      padding: '0.6rem 0.75rem', 
                      fontSize: '0.75rem', 
                      fontWeight: '500', 
                      border: 'none',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <Icon style={{ width: '1rem', height: '1rem' }} />
                    {tab.label}
                    {getBadge()}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-3 border-top border-light position-absolute bottom-0 w-100" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            <div className="d-flex gap-2">
              <button onClick={refreshAllData} className="btn btn-light flex-grow-1 d-flex align-items-center justify-content-center gap-1 shadow-sm transition-all hover:scale-105"
                style={{ borderRadius: '10px', fontWeight: '600', fontSize: '0.7rem', padding: '0.6rem', color: '#1a237e' }}>
                <RefreshCw style={{ width: '0.8rem', height: '0.8rem' }} /> Refresh
              </button>
              <button onClick={() => setShowLogoutModal(true)} className="btn btn-danger d-flex align-items-center justify-content-center gap-1 shadow-sm transition-all hover:scale-105"
                style={{ borderRadius: '10px', fontWeight: '600', fontSize: '0.7rem', padding: '0.6rem', width: '40%' }}>
                <LogOut style={{ width: '0.8rem', height: '0.8rem' }} />
              </button>
            </div>
          </div>
        </aside>

       
        <main className="col-md-9 col-lg-10 ms-md-auto p-0" style={{ marginLeft: 'auto' }}>
          
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="d-md-none btn btn-light border position-fixed top-0 start-0 m-3 z-50"
            style={{ zIndex: 999 }}>
            <Menu style={{ width: '1.2rem', height: '1.2rem' }} />
          </button>

         
          <header className="p-3 d-flex justify-content-between align-items-center sticky-top shadow-sm" 
            style={{ 
              zIndex: 999,
              background: 'linear-gradient(90deg, #1a237e, #283593, #303f9f, #3949ab)',
              borderBottom: '1px solid rgba(255,255,255,0.1)'
            }}>
            <div className="d-flex align-items-center gap-2">
              <h6 className="text-white-50 text-uppercase fw-bold m-0" style={{ fontSize: '0.65rem' }}></h6>
              <span className="badge bg-white text-primary text-uppercase shadow-sm" style={{ fontSize: '0.65rem', fontWeight: 'bold' }}>{activeTab}</span>
              {loading && <span className="badge bg-warning text-dark ms-2"><span className="spinner-border spinner-border-sm me-1" role="status"></span>Loading...</span>}
            </div>
            <div className="d-flex align-items-center gap-2">
              {activeTab !== 'dashboard' && activeTab !== 'reports' && activeTab !== 'profile' && activeTab !== 'mocktests' && activeTab !== 'questions' && (
                <button onClick={openAddModal} className="btn btn-light btn-sm d-flex align-items-center gap-1 shadow-sm transition-all hover:scale-105" style={{ color: '#1a237e', fontWeight: '600' }}>
                  <Plus style={{ width: '0.8rem', height: '0.8rem' }} /> Add New
                </button>
              )}
              <span className="badge bg-light text-dark border border-light rounded-pill px-3 py-2" style={{ fontSize: '0.55rem', fontWeight: 'bold' }}>
                Admin
              </span>
            </div>
          </header>

         
          <div className="p-3 p-md-4" style={{ maxWidth: '1400px', margin: '0 auto' }}>

           
            {activeTab === 'dashboard' && (
              <div className="animate-fadeIn">
                <div className="row g-3">
                  {[
                    { title: "Total Students", val: stats.totalStudents, icon: Users, color: "primary" },
                    { title: "Companies", val: stats.totalCompanies, icon: Building2, color: "success" },
                    { title: "Active Jobs", val: stats.totalJobs, icon: Briefcase, color: "info" },
                    { title: "Applications", val: stats.totalApplications, icon: UserCheck, color: "warning" },
                    { title: "Mock Tests", val: stats.totalTests, icon: Award, color: "danger" },
                    { title: "Questions", val: stats.totalQuestions, icon: HelpCircle, color: "purple" },
                  ].map((stat, i) => {
                    const Icon = stat.icon;
                    const bgColors = {
                      primary: 'rgba(59,130,246,0.1)',
                      success: 'rgba(34,197,94,0.1)',
                      info: 'rgba(6,182,212,0.1)',
                      warning: 'rgba(234,179,8,0.1)',
                      danger: 'rgba(239,68,68,0.1)',
                      purple: 'rgba(139,92,246,0.1)'
                    };
                    return (
                      <div key={i} className="col-6 col-lg-4 col-xl-2">
                        <div 
                          className="card border-0 shadow-sm rounded-4 h-100 transition-all hover:translate-y-1 cursor-pointer"
                          style={{ background: '#ffffff', cursor: 'pointer' }}
                          onClick={() => {
                            const tabMap = {
                              'Total Students': 'students',
                              'Companies': 'companies',
                              'Active Jobs': 'jobs',
                              'Applications': 'applications',
                              'Mock Tests': 'mocktests',
                              'Questions': 'questions'
                            };
                            const targetTab = tabMap[stat.title];
                            if (targetTab) handleTabChange(targetTab);
                          }}
                        >
                          <div className="card-body p-3">
                            <div className="d-flex align-items-center justify-content-between mb-2">
                              <span className="text-secondary small fw-bold text-uppercase" style={{ fontSize: '0.5rem' }}>{stat.title}</span>
                              <div className={`p-2 rounded-3`} style={{ background: bgColors[stat.color], border: `1px solid ${bgColors[stat.color]}` }}>
                                <Icon className={`text-${stat.color}`} style={{ width: '0.9rem', height: '0.9rem' }} />
                              </div>
                            </div>
                            <p className={`h4 fw-bold mb-0 text-${stat.color}`}>{stat.val || 0}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

           
            {activeTab === 'students' && (
              <div className="animate-fadeIn">
                <div className="card border-0 shadow-sm rounded-4 overflow-hidden" style={{ background: '#ffffff' }}>
                  <div className="p-3 border-bottom border-light d-flex flex-wrap gap-2 align-items-center justify-content-between" style={{ background: '#f8f9fa' }}>
                    <div className="d-flex align-items-center gap-2">
                      <span className="text-secondary small fw-bold">Total: {filteredStudents.length}</span>
                      <div className="bg-white px-2 py-1 rounded-3 border border-light">
                        <Search className="text-secondary" style={{ width: '0.8rem', height: '0.8rem' }} />
                        <input type="text" className="form-control form-control-sm bg-transparent border-0 text-dark d-inline-block" 
                          placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} 
                          style={{ fontSize: '0.75rem', width: '150px' }} />
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <Filter className="text-secondary" style={{ width: '0.7rem', height: '0.7rem' }} />
                      <select className="form-select form-select-sm bg-white text-dark border-light" 
                        value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)}
                        style={{ fontSize: '0.75rem', width: 'auto' }}>
                        <option value="ALL">All Departments</option>
                        <option value="CSE">CSE</option>
                        <option value="IT">IT</option>
                        <option value="ECE">ECE</option>
                      </select>
                    </div>
                  </div>

                  <div className="table-responsive">
                    <table className="table table-hover table-sm mb-0">
                      <thead className="text-secondary text-uppercase" style={{ fontSize: '0.55rem', fontWeight: 'bold' }}>
                        <tr><th className="p-3">Student</th><th className="p-3">Email</th><th className="p-3">Dept</th><th className="p-3">CGPA</th><th className="p-3 text-center">Actions</th></tr>
                      </thead>
                      <tbody style={{ fontSize: '0.75rem' }}>
                        {filteredStudents.map(student => (
                          <tr key={student._id} className="transition-all hover:bg-light">
                            <td className="p-3"><span className="fw-bold text-dark">{student.name}</span>
                              <span className="text-secondary d-block" style={{ fontSize: '0.55rem' }}>@{student.username || student.email.split('@')[0]}</span></td>
                            <td className="p-3 text-secondary">{student.email}</td>
                            <td className="p-3">{student.department || 'N/A'}</td>
                            <td className="p-3 fw-bold text-primary">{student.cgpa || 'N/A'}</td>
                            <td className="p-3 text-center">
                              <div className="d-flex gap-1 justify-content-center">
                                <button onClick={() => openDetailsModal(student)} className="btn btn-outline-info btn-sm shadow-sm transition-all hover:scale-110"
                                  style={{ padding: '0.2rem 0.4rem' }} title="View Details">
                                  <Eye style={{ width: '0.7rem', height: '0.7rem' }} />
                                </button>
                                <button onClick={() => openEditModal(student)} className="btn btn-outline-warning btn-sm shadow-sm transition-all hover:scale-110"
                                  style={{ padding: '0.2rem 0.4rem' }} title="Edit">
                                  <Edit2 style={{ width: '0.7rem', height: '0.7rem' }} />
                                </button>
                                <button onClick={() => handleDeleteStudent(student._id)} className="btn btn-outline-danger btn-sm shadow-sm transition-all hover:scale-110"
                                  style={{ padding: '0.2rem 0.4rem' }} disabled={loading} title="Delete">
                                  <Trash2 style={{ width: '0.7rem', height: '0.7rem' }} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {filteredStudents.length === 0 && (
                          <tr><td colSpan="5" className="text-center text-secondary py-4">
                            <div className="py-3"><div className="display-6 mb-2">📭</div><p>No students found</p>
                            <button className="btn btn-primary btn-sm" onClick={openAddModal}>Add First Student</button></div>
                          </td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            
            {activeTab === 'companies' && (
              <div className="animate-fadeIn">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h6 className="text-secondary text-uppercase fw-bold m-0" style={{ fontSize: '0.65rem' }}>
                      Partner Companies <span className="badge bg-primary ms-2">{companies.length}</span>
                    </h6>
                    <p className="text-secondary small m-0">Manage all partner companies</p>
                  </div>
                  <button 
                    className="btn btn-primary btn-sm d-flex align-items-center gap-1 shadow-sm transition-all hover:scale-105"
                    onClick={() => {
                      setEditingCompany(null);
                      setNewCompany({ name: '', email: '', phone: '', address: '', website: '', description: '', industry: 'Technology', tier: 'Product', minCgpa: '7.0', openRoles: '' });
                      setShowAddModal(true);
                    }}
                    style={{ borderRadius: '10px', fontWeight: '600' }}>
                    <Plus style={{ width: '0.8rem', height: '0.8rem' }} /> Add Company
                  </button>
                </div>

                <div className="row g-3">
                  {companies.length === 0 ? (
                    <div className="col-12">
                      <div className="card border-0 shadow-sm rounded-4 text-center p-5" style={{ background: '#ffffff' }}>
                        <Building2 className="text-secondary mx-auto" style={{ width: '3rem', height: '3rem' }} />
                        <h6 className="text-secondary mt-3">No companies found</h6>
                        <p className="text-secondary small">Click "Add Company" to register a new company</p>
                      </div>
                    </div>
                  ) : (
                    companies.map((company, index) => (
                      <div key={company._id || index} className="col-md-6 col-lg-4">
                        <div className="card border-0 shadow-sm rounded-4 h-100 transition-all hover:translate-y-1" style={{ background: '#ffffff' }}>
                          <div className="card-body p-4 d-flex flex-column">
                            <div className="d-flex justify-content-between align-items-start mb-2">
                              <div>
                                <h6 className="fw-bold text-dark m-0">{company.name}</h6>
                                <span className="badge bg-primary bg-opacity-10 text-primary border border-primary" style={{ fontSize: '0.5rem' }}>
                                  {company.industry || 'General'}
                                </span>
                              </div>
                              <div className="d-flex gap-1">
                                <button onClick={() => handleEditCompany(company)} className="btn btn-outline-warning btn-sm shadow-sm transition-all hover:scale-110"
                                  style={{ padding: '0.2rem 0.4rem' }} title="Edit">
                                  <Edit2 style={{ width: '0.6rem', height: '0.6rem' }} />
                                </button>
                                <button onClick={() => handleDeleteCompany(company._id)} className="btn btn-outline-danger btn-sm shadow-sm transition-all hover:scale-110"
                                  style={{ padding: '0.2rem 0.4rem' }} title="Delete">
                                  <Trash2 style={{ width: '0.6rem', height: '0.6rem' }} />
                                </button>
                              </div>
                            </div>
                            <div className="mt-2 flex-grow-1">
                              <p className="small text-secondary mb-1"><MailIcon style={{ width: '0.7rem', height: '0.7rem' }} className="me-1" />{company.email}</p>
                              <p className="small text-secondary mb-1"><Phone style={{ width: '0.7rem', height: '0.7rem' }} className="me-1" />{company.phone || 'N/A'}</p>
                              <p className="small text-secondary mb-1"><MapPin style={{ width: '0.7rem', height: '0.7rem' }} className="me-1" />{company.address || 'N/A'}</p>
                              <p className="small text-secondary mb-1"><Award style={{ width: '0.7rem', height: '0.7rem' }} className="me-1" />Min CGPA: <span className="text-primary fw-bold">{company.minCgpa || 'N/A'}</span></p>
                              <p className="small text-secondary mb-1"><Users style={{ width: '0.7rem', height: '0.7rem' }} className="me-1" />Open Roles: <span className="text-success fw-bold">{company.openRoles || 0}</span></p>
                              {company.website && (
                                <a href={company.website} target="_blank" rel="noopener noreferrer" className="small text-primary text-decoration-none">
                                  <GlobeIcon style={{ width: '0.7rem', height: '0.7rem' }} className="me-1" />Website
                                </a>
                              )}
                            </div>
                            {company.description && (
                              <div className="mt-2 pt-2 border-top border-light">
                                <p className="small text-secondary mb-0" style={{ fontSize: '0.6rem' }}>{company.description.substring(0, 80)}...</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

           
            {activeTab === 'jobs' && (
              <AdminJobsTab token={token} />
            )}

           
            {activeTab === 'questions' && (
              <AdminQuestionsTab token={token} />
            )}

            
            {activeTab === 'mocktests' && (
              <AdminMockTestsTab token={token} />
            )}

           
            {activeTab === 'notifications' && (
              <div className="animate-fadeIn">
                {/* Notification Stats */}
                <div className="row g-2 mb-3">
                  <div className="col-6 col-md-3">
                    <div className="card border-0 shadow-sm rounded-4" style={{ background: '#ffffff' }}>
                      <div className="card-body p-3">
                        <div className="d-flex justify-content-between">
                          <span className="text-secondary small fw-bold text-uppercase" style={{ fontSize: '0.5rem' }}>Total</span>
                          <Bell style={{ width: '0.9rem', height: '0.9rem', color: '#6b7280' }} />
                        </div>
                        <h4 className="text-dark fw-bold mb-0">{notifications.length}</h4>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="card border-0 shadow-sm rounded-4" style={{ background: '#ffffff' }}>
                      <div className="card-body p-3">
                        <div className="d-flex justify-content-between">
                          <span className="text-secondary small fw-bold text-uppercase" style={{ fontSize: '0.5rem' }}>Active</span>
                          <CheckCircle style={{ width: '0.9rem', height: '0.9rem', color: '#22c55e' }} />
                        </div>
                        <h4 className="text-success fw-bold mb-0">{notifications.filter(n => n.isActive !== false).length}</h4>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="card border-0 shadow-sm rounded-4" style={{ background: '#ffffff' }}>
                      <div className="card-body p-3">
                        <div className="d-flex justify-content-between">
                          <span className="text-secondary small fw-bold text-uppercase" style={{ fontSize: '0.5rem' }}>Urgent</span>
                          <AlertCircle style={{ width: '0.9rem', height: '0.9rem', color: '#ef4444' }} />
                        </div>
                        <h4 className="text-danger fw-bold mb-0">{notifications.filter(n => n.priority === 'urgent' && n.isActive !== false).length}</h4>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="card border-0 shadow-sm rounded-4" style={{ background: '#ffffff' }}>
                      <div className="card-body p-3">
                        <div className="d-flex justify-content-between">
                          <span className="text-secondary small fw-bold text-uppercase" style={{ fontSize: '0.5rem' }}>Expired</span>
                          <Clock style={{ width: '0.9rem', height: '0.9rem', color: '#6b7280' }} />
                        </div>
                        <h4 className="text-secondary fw-bold mb-0">{notifications.filter(n => n.isActive === false).length}</h4>
                      </div>
                    </div>
                  </div>
                </div>

               
                <div className="card border-0 shadow-sm rounded-4 mb-3" style={{ background: '#ffffff' }}>
                  <div className="card-body p-3">
                    <div className="d-flex flex-wrap gap-2 align-items-center">
                      <div className="d-flex align-items-center gap-2 bg-white px-3 py-2 rounded-3 border border-light">
                        <Filter style={{ width: '0.7rem', height: '0.7rem', color: '#6b7280' }} />
                        <select className="form-select form-select-sm bg-transparent border-0 text-dark" 
                          value={notificationFilters.type} onChange={(e) => setNotificationFilters({...notificationFilters, type: e.target.value})}
                          style={{ fontSize: '0.7rem', width: '100px' }}>
                          <option value="all">All Types</option>
                          <option value="info">Info</option>
                          <option value="success">Success</option>
                          <option value="warning">Warning</option>
                          <option value="error">Error</option>
                        </select>
                      </div>
                      <div className="d-flex align-items-center gap-2 bg-white px-3 py-2 rounded-3 border border-light">
                        <AlertTriangle style={{ width: '0.7rem', height: '0.7rem', color: '#6b7280' }} />
                        <select className="form-select form-select-sm bg-transparent border-0 text-dark" 
                          value={notificationFilters.priority} onChange={(e) => setNotificationFilters({...notificationFilters, priority: e.target.value})}
                          style={{ fontSize: '0.7rem', width: '100px' }}>
                          <option value="all">All Priority</option>
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                          <option value="urgent">Urgent</option>
                        </select>
                      </div>
                      <div className="d-flex align-items-center gap-2 bg-white px-3 py-2 rounded-3 border border-light">
                        <Activity style={{ width: '0.7rem', height: '0.7rem', color: '#6b7280' }} />
                        <select className="form-select form-select-sm bg-transparent border-0 text-dark" 
                          value={notificationFilters.status} onChange={(e) => setNotificationFilters({...notificationFilters, status: e.target.value})}
                          style={{ fontSize: '0.7rem', width: '100px' }}>
                          <option value="all">All Status</option>
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </div>
                      <button 
                        className="btn btn-primary btn-sm d-flex align-items-center gap-1 ms-auto shadow-sm transition-all hover:scale-105"
                        onClick={() => {
                          setEditingNotification(null);
                          setNewNotification({
                            title: '',
                            message: '',
                            type: 'info',
                            target: 'all',
                            priority: 'medium',
                            link: '',
                            expiresAt: ''
                          });
                          setShowAddModal(true);
                        }}
                        style={{ borderRadius: '8px', fontWeight: '600' }}>
                        <Plus style={{ width: '0.7rem', height: '0.7rem' }} /> Send Notification
                      </button>
                    </div>
                  </div>
                </div>

                
                <div className="card border-0 shadow-sm rounded-4" style={{ background: '#ffffff' }}>
                  <div className="card-body p-4">
                    {filteredNotifications.length === 0 ? (
                      <div className="text-center py-5">
                        <Bell className="text-secondary mx-auto" style={{ width: '3rem', height: '3rem' }} />
                        <h6 className="text-secondary mt-3">No notifications found</h6>
                        <p className="text-secondary small">Create your first notification to communicate with students</p>
                        <button 
                          className="btn btn-primary btn-sm mt-2"
                          onClick={() => {
                            setEditingNotification(null);
                            setNewNotification({
                              title: '',
                              message: '',
                              type: 'info',
                              target: 'all',
                              priority: 'medium',
                              link: '',
                              expiresAt: ''
                            });
                            setShowAddModal(true);
                          }}>
                          <Plus style={{ width: '0.7rem', height: '0.7rem' }} className="me-1" /> Send First Notification
                        </button>
                      </div>
                    ) : (
                      filteredNotifications.map((notification) => (
                        <div key={notification._id} 
                          className={`p-3 rounded-3 border mb-2 transition-all hover:border-primary ${notification.isActive !== false ? 'border-light' : 'border-light opacity-50'}`}
                          style={{ background: '#f8f9fa' }}>
                          <div className="d-flex justify-content-between align-items-start">
                            <div className="flex-grow-1 me-2">
                              <div className="d-flex flex-wrap gap-2 mb-1 align-items-center">
                                <span className={`badge bg-${getNotificationColor(notification.type)} bg-opacity-20 text-${getNotificationColor(notification.type)} border border-${getNotificationColor(notification.type)}`}>
                                  {getNotificationIcon(notification.type)} {notification.type}
                                </span>
                                <span className={`badge bg-${getPriorityBadge(notification.priority)} bg-opacity-20 text-${getPriorityBadge(notification.priority)} border border-${getPriorityBadge(notification.priority)}`}>
                                  {notification.priority}
                                </span>
                                <span className="badge bg-secondary bg-opacity-20 text-secondary border border-secondary">
                                  {notification.target}
                                </span>
                                <span className={`badge ${notification.isActive !== false ? 'bg-success bg-opacity-20 text-success border border-success' : 'bg-secondary bg-opacity-20 text-secondary border border-secondary'}`}>
                                  {notification.isActive !== false ? 'Active' : 'Inactive'}
                                </span>
                                <span className="badge bg-light text-secondary border border-light" style={{ fontSize: '0.5rem' }}>
                                  {formatDate(notification.createdAt)}
                                </span>
                              </div>
                              <h6 className="text-dark fw-bold mb-1">{notification.title}</h6>
                              <p className="text-secondary small mb-1">{notification.message}</p>
                              {notification.link && (
                                <a href={notification.link} target="_blank" rel="noopener noreferrer" className="text-primary small text-decoration-none">
                                  <Link style={{ width: '0.7rem', height: '0.7rem' }} className="me-1" />
                                  {notification.link}
                                </a>
                              )}
                              {notification.expiresAt && (
                                <div className="text-secondary small mt-1">
                                  <Clock style={{ width: '0.6rem', height: '0.6rem' }} className="me-1" />
                                  Expires: {formatDate(notification.expiresAt)}
                                </div>
                              )}
                            </div>
                            <div className="d-flex gap-1 flex-shrink-0">
                              <button 
                                onClick={() => handleToggleNotificationStatus(notification._id, notification.isActive)}
                                className={`btn btn-sm ${notification.isActive !== false ? 'btn-outline-secondary' : 'btn-outline-success'} shadow-sm transition-all hover:scale-110`}
                                style={{ padding: '0.2rem 0.4rem' }}
                                title={notification.isActive !== false ? 'Deactivate' : 'Activate'}>
                                {notification.isActive !== false ? 
                                  <XCircle style={{ width: '0.6rem', height: '0.6rem' }} /> : 
                                  <CheckCircle style={{ width: '0.6rem', height: '0.6rem' }} />}
                              </button>
                              <button 
                                onClick={() => handleEditNotification(notification)}
                                className="btn btn-outline-warning btn-sm shadow-sm transition-all hover:scale-110"
                                style={{ padding: '0.2rem 0.4rem' }}
                                title="Edit">
                                <Edit2 style={{ width: '0.6rem', height: '0.6rem' }} />
                              </button>
                              <button 
                                onClick={() => handleDeleteNotification(notification._id)}
                                className="btn btn-outline-danger btn-sm shadow-sm transition-all hover:scale-110"
                                style={{ padding: '0.2rem 0.4rem' }}
                                title="Delete">
                                <Trash2 style={{ width: '0.6rem', height: '0.6rem' }} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}

            
            {activeTab === 'applications' && (
              <div className="animate-fadeIn">
                <div className="row g-2 mb-3">
                  <div className="col-6 col-md-3">
                    <div className="card border-0 shadow-sm rounded-4" style={{ background: '#ffffff' }}>
                      <div className="card-body p-3">
                        <div className="d-flex justify-content-between">
                          <span className="text-secondary small fw-bold text-uppercase" style={{ fontSize: '0.5rem' }}>Total</span>
                          <FileSpreadsheet style={{ width: '0.9rem', height: '0.9rem', color: '#6b7280' }} />
                        </div>
                        <h4 className="text-dark fw-bold mb-0">{applications.length}</h4>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="card border-0 shadow-sm rounded-4" style={{ background: '#ffffff' }}>
                      <div className="card-body p-3">
                        <div className="d-flex justify-content-between">
                          <span className="text-secondary small fw-bold text-uppercase" style={{ fontSize: '0.5rem' }}>Pending</span>
                          <Clock style={{ width: '0.9rem', height: '0.9rem', color: '#eab308' }} />
                        </div>
                        <h4 className="text-warning fw-bold mb-0">{applications.filter(a => a.status === 'pending').length}</h4>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="card border-0 shadow-sm rounded-4" style={{ background: '#ffffff' }}>
                      <div className="card-body p-3">
                        <div className="d-flex justify-content-between">
                          <span className="text-secondary small fw-bold text-uppercase" style={{ fontSize: '0.5rem' }}>Shortlisted</span>
                          <Star style={{ width: '0.9rem', height: '0.9rem', color: '#3b82f6' }} />
                        </div>
                        <h4 className="text-primary fw-bold mb-0">{applications.filter(a => a.status === 'shortlisted' || a.status === 'interview').length}</h4>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="card border-0 shadow-sm rounded-4" style={{ background: '#ffffff' }}>
                      <div className="card-body p-3">
                        <div className="d-flex justify-content-between">
                          <span className="text-secondary small fw-bold text-uppercase" style={{ fontSize: '0.5rem' }}>Selected</span>
                          <BadgeCheck style={{ width: '0.9rem', height: '0.9rem', color: '#22c55e' }} />
                        </div>
                        <h4 className="text-success fw-bold mb-0">{applications.filter(a => a.status === 'selected' || a.status === 'offer').length}</h4>
                      </div>
                    </div>
                  </div>
                </div>

                
                <div className="card border-0 shadow-sm rounded-4 mb-3" style={{ background: '#ffffff' }}>
                  <div className="card-body p-3">
                    <div className="d-flex flex-wrap gap-2 align-items-center">
                      <div className="d-flex align-items-center gap-2 bg-white px-3 py-2 rounded-3 border border-light">
                        <Filter style={{ width: '0.7rem', height: '0.7rem', color: '#6b7280' }} />
                        <select className="form-select form-select-sm bg-transparent border-0 text-dark" 
                          value={applicationFilters.status} onChange={(e) => setApplicationFilters({...applicationFilters, status: e.target.value})}
                          style={{ fontSize: '0.7rem', width: '120px' }}>
                          <option value="all">All Status</option>
                          <option value="pending">Pending</option>
                          <option value="reviewing">Reviewing</option>
                          <option value="shortlisted">Shortlisted</option>
                          <option value="interview">Interview</option>
                          <option value="selected">Selected</option>
                          <option value="offer">Offer Made</option>
                          <option value="rejected">Rejected</option>
                          <option value="withdrawn">Withdrawn</option>
                        </select>
                      </div>
                      <div className="d-flex align-items-center gap-2 bg-white px-3 py-2 rounded-3 border border-light">
                        <UsersIcon style={{ width: '0.7rem', height: '0.7rem', color: '#6b7280' }} />
                        <select className="form-select form-select-sm bg-transparent border-0 text-dark" 
                          value={applicationFilters.department} onChange={(e) => setApplicationFilters({...applicationFilters, department: e.target.value})}
                          style={{ fontSize: '0.7rem', width: '100px' }}>
                          <option value="all">All Dept</option>
                          <option value="CSE">CSE</option>
                          <option value="ECE">ECE</option>
                          <option value="IT">IT</option>
                          <option value="MECH">MECH</option>
                        </select>
                      </div>
                      <div className="d-flex align-items-center gap-2 bg-white px-3 py-2 rounded-3 border border-light">
                        <Calendar style={{ width: '0.7rem', height: '0.7rem', color: '#6b7280' }} />
                        <input type="date" className="form-control form-control-sm bg-transparent border-0 text-dark" 
                          value={applicationFilters.dateFrom} onChange={(e) => setApplicationFilters({...applicationFilters, dateFrom: e.target.value})}
                          style={{ fontSize: '0.7rem', width: '120px' }} />
                      </div>
                      <div className="d-flex align-items-center gap-2 bg-white px-3 py-2 rounded-3 border border-light">
                        <Calendar style={{ width: '0.7rem', height: '0.7rem', color: '#6b7280' }} />
                        <input type="date" className="form-control form-control-sm bg-transparent border-0 text-dark" 
                          value={applicationFilters.dateTo} onChange={(e) => setApplicationFilters({...applicationFilters, dateTo: e.target.value})}
                          style={{ fontSize: '0.7rem', width: '120px' }} />
                      </div>

                      
                      {selectedApplications.length > 0 && (
                        <div className="d-flex align-items-center gap-2 ms-auto">
                          <span className="text-secondary small fw-bold">{selectedApplications.length} selected</span>
                          <button 
                            className="btn btn-success btn-sm d-flex align-items-center gap-1 shadow-sm transition-all hover:scale-105"
                            onClick={() => {
                              setBulkAction('shortlisted');
                              setShowBulkActionModal(true);
                            }}
                            style={{ borderRadius: '6px', fontSize: '0.65rem' }}>
                            <Star style={{ width: '0.6rem', height: '0.6rem' }} /> Shortlist
                          </button>
                          <button 
                            className="btn btn-info btn-sm d-flex align-items-center gap-1 shadow-sm transition-all hover:scale-105"
                            onClick={() => {
                              setBulkAction('interview');
                              setShowBulkActionModal(true);
                            }}
                            style={{ borderRadius: '6px', fontSize: '0.65rem' }}>
                            <Users style={{ width: '0.6rem', height: '0.6rem' }} /> Interview
                          </button>
                          <button 
                            className="btn btn-primary btn-sm d-flex align-items-center gap-1 shadow-sm transition-all hover:scale-105"
                            onClick={() => {
                              setBulkAction('selected');
                              setShowBulkActionModal(true);
                            }}
                            style={{ borderRadius: '6px', fontSize: '0.65rem' }}>
                            <BadgeCheck style={{ width: '0.6rem', height: '0.6rem' }} /> Select
                          </button>
                          <button 
                            className="btn btn-danger btn-sm d-flex align-items-center gap-1 shadow-sm transition-all hover:scale-105"
                            onClick={() => {
                              setBulkAction('rejected');
                              setShowBulkActionModal(true);
                            }}
                            style={{ borderRadius: '6px', fontSize: '0.65rem' }}>
                            <XCircle style={{ width: '0.6rem', height: '0.6rem' }} /> Reject
                          </button>
                          <button 
                            className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1 shadow-sm transition-all hover:scale-105"
                            onClick={() => setShowBulkActionModal(true)}
                            style={{ borderRadius: '6px', fontSize: '0.65rem' }}>
                            <Trash2 style={{ width: '0.6rem', height: '0.6rem' }} /> Delete
                          </button>
                        </div>
                      )}

                      
                      <button 
                        className="btn btn-primary btn-sm d-flex align-items-center gap-1 ms-auto shadow-sm transition-all hover:scale-105"
                        onClick={() => {
                          setEditingApplication(null);
                          setNewApplication({
                            studentId: '',
                            jobId: '',
                            studentName: '',
                            studentEmail: '',
                            jobTitle: '',
                            company: '',
                            status: 'pending',
                            appliedDate: new Date().toISOString().split('T')[0],
                            resume: '',
                            coverLetter: '',
                            cgpa: '',
                            department: '',
                            year: '',
                            remarks: ''
                          });
                          setShowAddModal(true);
                        }}
                        style={{ borderRadius: '8px', fontWeight: '600' }}>
                        <Plus style={{ width: '0.7rem', height: '0.7rem' }} /> Add Application
                      </button>
                    </div>
                  </div>
                </div>

               
                <div className="card border-0 shadow-sm rounded-4" style={{ background: '#ffffff' }}>
                  <div className="card-body p-4">
                    {filteredApplications.length === 0 ? (
                      <div className="text-center py-5">
                        <FileSpreadsheet className="text-secondary mx-auto" style={{ width: '3rem', height: '3rem' }} />
                        <h6 className="text-secondary mt-3">No applications found</h6>
                        <p className="text-secondary small">Start tracking student applications for jobs</p>
                        <button 
                          className="btn btn-primary btn-sm mt-2"
                          onClick={() => {
                            setEditingApplication(null);
                            setNewApplication({
                              studentId: '',
                              jobId: '',
                              studentName: '',
                              studentEmail: '',
                              jobTitle: '',
                              company: '',
                              status: 'pending',
                              appliedDate: new Date().toISOString().split('T')[0],
                              resume: '',
                              coverLetter: '',
                              cgpa: '',
                              department: '',
                              year: '',
                              remarks: ''
                            });
                            setShowAddModal(true);
                          }}>
                          <Plus style={{ width: '0.7rem', height: '0.7rem' }} className="me-1" /> Add First Application
                        </button>
                      </div>
                    ) : (
                      <div className="table-responsive">
                        <table className="table table-hover table-sm mb-0">
                          <thead className="text-secondary text-uppercase" style={{ fontSize: '0.55rem', fontWeight: 'bold' }}>
                            <tr>
                              <th style={{ width: '30px' }}>
                                <input 
                                  type="checkbox" 
                                  className="form-check-input border-secondary"
                                  checked={selectedApplications.length === filteredApplications.length && filteredApplications.length > 0}
                                  onChange={handleSelectAllApplications}
                                />
                              </th>
                              <th>Student</th>
                              <th>Job</th>
                              <th>Company</th>
                              <th>Status</th>
                              <th>Applied Date</th>
                              <th style={{ textAlign: 'center' }}>Actions</th>
                            </tr>
                          </thead>
                          <tbody style={{ fontSize: '0.75rem' }}>
                            {filteredApplications.map((app) => (
                              <tr key={app._id} className="transition-all hover:bg-light">
                                <td>
                                  <input 
                                    type="checkbox" 
                                    className="form-check-input border-secondary"
                                    checked={selectedApplications.includes(app._id)}
                                    onChange={() => handleSelectApplication(app._id)}
                                  />
                                </td>
                                <td>
                                  <div className="fw-bold text-dark">{app.studentId?.name || app.studentName || 'N/A'}</div>
                                  <div className="text-secondary" style={{ fontSize: '0.55rem' }}>{app.studentId?.email || app.studentEmail || ''}</div>
                                  <div className="text-secondary" style={{ fontSize: '0.55rem' }}>{app.studentId?.department || app.department || ''} • CGPA: {app.studentId?.cgpa || app.cgpa || 'N/A'}</div>
                                </td>
                                <td>
                                  <div className="text-dark">{app.jobId?.title || app.jobTitle || 'N/A'}</div>
                                  <div className="text-secondary" style={{ fontSize: '0.55rem' }}>{app.jobId?.category || ''}</div>
                                </td>
                                <td className="text-dark">{app.jobId?.company || app.company || 'N/A'}</td>
                                <td>
                                  <span className={`badge bg-${getStatusBadge(app.status)} bg-opacity-20 text-${getStatusBadge(app.status)} border border-${getStatusBadge(app.status)}`}>
                                    {getStatusLabel(app.status)}
                                  </span>
                                </td>
                                <td className="text-secondary">{formatDate(app.appliedDate)}</td>
                                <td>
                                  <div className="d-flex gap-1 justify-content-center">
                                    <button 
                                      onClick={() => openDetailsModal(app)}
                                      className="btn btn-outline-info btn-sm shadow-sm transition-all hover:scale-110"
                                      style={{ padding: '0.2rem 0.4rem' }}
                                      title="View Details">
                                      <Eye style={{ width: '0.6rem', height: '0.6rem' }} />
                                    </button>
                                    <button 
                                      onClick={() => handleEditApplication(app)}
                                      className="btn btn-outline-warning btn-sm shadow-sm transition-all hover:scale-110"
                                      style={{ padding: '0.2rem 0.4rem' }}
                                      title="Edit">
                                      <Edit2 style={{ width: '0.6rem', height: '0.6rem' }} />
                                    </button>
                                    <button 
                                      onClick={() => handleDeleteApplication(app._id)}
                                      className="btn btn-outline-danger btn-sm shadow-sm transition-all hover:scale-110"
                                      style={{ padding: '0.2rem 0.4rem' }}
                                      title="Delete">
                                      <Trash2 style={{ width: '0.6rem', height: '0.6rem' }} />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

          
            {activeTab === 'reports' && (
              <div className="animate-fadeIn">
                <div className="card border-0 shadow-sm rounded-4" style={{ background: '#ffffff' }}>
                  <div className="card-body p-4">
                    <h6 className="text-secondary text-uppercase fw-bold mb-3" style={{ fontSize: '0.65rem' }}>
                      <FileText style={{ width: '0.9rem', height: '0.9rem' }} className="me-2" />
                      Generate Reports
                    </h6>
                    <form onSubmit={handleGenerateReport}>
                      <div className="row g-3">
                        <div className="col-md-3">
                          <label className="form-label text-dark small">Report Type</label>
                          <select className="form-select bg-white text-dark border-light" 
                            value={reportFilters.type} onChange={e => setReportFilters({...reportFilters, type: e.target.value})}>
                            <option value="placement">Placement Report</option>
                            <option value="student">Student Report</option>
                            <option value="company">Company Report</option>
                            <option value="test">Test Report</option>
                          </select>
                        </div>
                        <div className="col-md-3">
                          <label className="form-label text-dark small">Department</label>
                          <select className="form-select bg-white text-dark border-light" 
                            value={reportFilters.department} onChange={e => setReportFilters({...reportFilters, department: e.target.value})}>
                            <option value="ALL">All Departments</option>
                            <option value="CSE">CSE</option>
                            <option value="ECE">ECE</option>
                            <option value="IT">IT</option>
                            <option value="MECH">MECH</option>
                          </select>
                        </div>
                        <div className="col-md-3">
                          <label className="form-label text-dark small">From Date</label>
                          <input type="date" className="form-control bg-white text-dark border-light" 
                            value={reportFilters.fromDate} onChange={e => setReportFilters({...reportFilters, fromDate: e.target.value})} />
                        </div>
                        <div className="col-md-3">
                          <label className="form-label text-dark small">To Date</label>
                          <input type="date" className="form-control bg-white text-dark border-light" 
                            value={reportFilters.toDate} onChange={e => setReportFilters({...reportFilters, toDate: e.target.value})} />
                        </div>
                      </div>
                      <div className="mt-4 d-flex gap-2">
                        <button type="submit" className="btn btn-primary d-flex align-items-center gap-2 shadow-sm transition-all hover:scale-105" disabled={loading}>
                          {loading ? <span className="spinner-border spinner-border-sm"></span> : <FileText style={{ width: '1rem', height: '1rem' }} />}
                          Generate Report
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}

          
            {activeTab === 'profile' && (
              <div className="animate-fadeIn">
                <div className="card border-0 shadow-sm rounded-4" style={{ background: '#ffffff' }}>
                  <div className="card-body p-4">
                    <div className="text-center mb-4">
                      <div className="bg-primary bg-opacity-10 p-4 rounded-circle d-inline-flex border border-primary border-opacity-25">
                        <UserCircle className="text-primary" style={{ width: '4rem', height: '4rem' }} />
                      </div>
                      <h5 className="text-dark fw-bold mt-3">{adminProfile.name}</h5>
                      <span className="badge bg-primary bg-opacity-20 text-primary border border-primary">{adminProfile.role}</span>
                    </div>
                    <form onSubmit={handleUpdateProfile}>
                      <div className="row g-3">
                        <div className="col-12">
                          <label className="form-label text-dark small">Name</label>
                          <input type="text" className="form-control bg-white text-dark border-light" 
                            value={adminProfile.name} onChange={e => setAdminProfile({...adminProfile, name: e.target.value})} required />
                        </div>
                        <div className="col-12">
                          <label className="form-label text-dark small">Email</label>
                          <input type="email" className="form-control bg-white text-dark border-light" 
                            value={adminProfile.email} onChange={e => setAdminProfile({...adminProfile, email: e.target.value})} required />
                        </div>
                        <div className="col-12">
                          <label className="form-label text-dark small">Role</label>
                          <input type="text" className="form-control bg-white text-dark border-light" 
                            value={adminProfile.role} disabled style={{ opacity: 0.6, cursor: 'not-allowed' }} />
                        </div>
                      </div>
                      <div className="mt-4 d-flex gap-2 justify-content-end">
                        <button type="submit" className="btn btn-primary d-flex align-items-center gap-2 shadow-sm transition-all hover:scale-105" disabled={loading}>
                          {loading ? <span className="spinner-border spinner-border-sm"></span> : <Save style={{ width: '1rem', height: '1rem' }} />}
                          Update Profile
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}

          </div>
        </main>
      </div>

     
      {showAddModal && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" 
             style={{ zIndex: 9999, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(5px)' }}>
          <div className="card border-0 shadow-lg rounded-4 p-4" style={{ maxWidth: '600px', width: '95%', maxHeight: '90vh', overflowY: 'auto', background: '#ffffff' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="text-dark fw-bold m-0">
                {activeTab === 'notifications' ? (
                  editingNotification ? <><Edit2 style={{ width: '1rem', height: '1rem' }} className="me-2" /> Edit Notification</> : 
                  <><Send style={{ width: '1rem', height: '1rem' }} className="me-2" /> Send Notification</>
                ) : activeTab === 'applications' ? (
                  editingApplication ? <><Edit2 style={{ width: '1rem', height: '1rem' }} className="me-2" /> Edit Application</> : 
                  <><FilePlus2 style={{ width: '1rem', height: '1rem' }} className="me-2" /> Add Application</>
                ) : activeTab === 'students' ? (
                  <>Add New Student</>
                ) : activeTab === 'companies' ? (
                  editingCompany ? <><Edit2 style={{ width: '1rem', height: '1rem' }} className="me-2" /> Edit Company</> : 
                  <><Building2 style={{ width: '1rem', height: '1rem' }} className="me-2" /> Add Company</>
                ) : (
                  <>Add New {activeTab.slice(0, -1)}</>
                )}
              </h5>
              <button className="btn btn-close" onClick={closeAddModal}></button>
            </div>
            
            
            {renderModalContent()}
          </div>
        </div>
      )}

      
      {showBulkActionModal && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" 
             style={{ zIndex: 9999, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(5px)' }}>
          <div className="card border-0 shadow-lg rounded-4 p-4" style={{ maxWidth: '450px', width: '95%', background: '#ffffff' }}>
            <div className="text-center mb-4">
              <div className="bg-primary bg-opacity-10 p-3 rounded-circle d-inline-flex border border-primary border-opacity-25 mb-3">
                <UsersRound style={{ width: '2rem', height: '2rem', color: '#3b82f6' }} />
              </div>
              <h5 className="text-dark fw-bold">Bulk Action</h5>
              <p className="text-secondary small">
                {selectedApplications.length} applications selected
                {bulkAction && bulkAction !== 'delete' && ` - Update to "${bulkAction}"`}
                {bulkAction === 'delete' && ` - Delete selected applications`}
              </p>
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-secondary flex-grow-1 transition-all hover:scale-105"
                onClick={() => { setShowBulkActionModal(false); setBulkAction(''); }}
                style={{ borderRadius: '10px', fontWeight: '600', padding: '0.6rem' }}>
                Cancel
              </button>
              {bulkAction && bulkAction !== 'delete' ? (
                <button className="btn btn-primary flex-grow-1 transition-all hover:scale-105"
                  onClick={() => handleBulkUpdateStatus(bulkAction)}
                  style={{ borderRadius: '10px', fontWeight: '600', padding: '0.6rem' }}>
                  Update Status
                </button>
              ) : (
                <button className="btn btn-danger flex-grow-1 transition-all hover:scale-105"
                  onClick={handleBulkDeleteApplications}
                  style={{ borderRadius: '10px', fontWeight: '600', padding: '0.6rem' }}>
                  Delete All
                </button>
              )}
            </div>
          </div>
        </div>
      )}

     
      {showLogoutModal && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ 
          zIndex: 9999, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(5px)'
        }}>
          <div className="card border-0 shadow-lg rounded-4 p-5" style={{ maxWidth: '420px', width: '90%', background: '#ffffff' }}>
            <div className="text-center mb-4">
              <div className="bg-danger bg-opacity-10 p-3 rounded-circle d-inline-flex border border-danger border-opacity-25 mb-3">
                <LogOut className="text-danger" style={{ width: '2rem', height: '2rem' }} />
              </div>
              <h5 className="text-dark fw-bold">Disconnect Session?</h5>
              <p className="text-secondary small mb-0">You will be redirected to the landing page.</p>
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-secondary flex-grow-1 transition-all hover:scale-105"
                onClick={() => setShowLogoutModal(false)}
                style={{ borderRadius: '10px', fontWeight: '600', padding: '0.6rem' }}>
                Cancel
              </button>
              <button className="btn btn-danger flex-grow-1 transition-all hover:scale-105"
                onClick={handleLogout}
                style={{ borderRadius: '10px', fontWeight: '600', padding: '0.6rem' }}>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
        .transition-all { transition: all 0.3s ease; }
        .hover\\:translate-y-1:hover { transform: translateY(-4px); }
        .hover\\:scale-105:hover { transform: scale(1.05); }
        .card { transition: all 0.3s ease; }
        .card:hover { box-shadow: 0 10px 30px rgba(0,0,0,0.1) !important; }
        .form-control:focus, .form-select:focus {
          border-color: rgba(79, 70, 229, 0.5) !important;
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1) !important;
        }
        .text-purple { color: #8b5cf6; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: rgba(0,0,0,0.05); border-radius: 10px; }
        ::-webkit-scrollbar-thumb { background: rgba(79, 70, 229, 0.3); border-radius: 10px; }
        .bg-purple { background: #8b5cf6; }
        .border-purple { border-color: #8b5cf6; }
        .form-check-input:checked {
          background-color: #4f46e5;
          border-color: #4f46e5;
        }
        .cursor-pointer { cursor: pointer; }
        .text-white-50 { color: rgba(255,255,255,0.7); }
        .hover-bg-white-10:hover { background: rgba(255,255,255,0.1); }
      `}</style>
    </div>
  );
}