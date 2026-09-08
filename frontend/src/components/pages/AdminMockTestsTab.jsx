import React, { useState, useEffect } from 'react';
import { 
  Plus, Edit2, Trash2, Search, Filter, Eye, 
  Clock, Calendar, Users, Award, CheckCircle, 
  XCircle, AlertCircle, FileText, Sparkles, 
  Play, Pause, BarChart3, Settings, Save, Loader2,
  Trophy, TrendingUp, PieChart, Star, LayoutDashboard,
  ListChecks, Medal, LineChart, Activity, RefreshCw,
  BookOpen, HelpCircle, Hash, Timer, Target, ChevronDown, ChevronUp,
  Copy, Download, Upload, Printer, Share2
} from 'lucide-react';

const API_URL = 'http://localhost:5000/api';

export default function AdminMockTestsTab({ token }) {
  const [tests, setTests] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [results, setResults] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [activeSubTab, setActiveSubTab] = useState('tests');
  const [error, setError] = useState(null);
  const [expandedTest, setExpandedTest] = useState(null);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showBulkActionModal, setShowBulkActionModal] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const [editTest, setEditTest] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  
  const [newTest, setNewTest] = useState({
    title: '',
    description: '',
    type: 'aptitude',
    questionIds: [],
    duration: '',
    totalMarks: '',
    passingMarks: '',
    scheduledDate: '',
    difficulty: 'medium',
    status: 'draft',
    isActive: false
  });

  const [newQuestion, setNewQuestion] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    type: 'mcq',
    marks: 1,
    category: 'aptitude',
    difficulty: 'medium'
  });

  const [bulkAction, setBulkAction] = useState('');

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

  const fetchTests = async () => {
    try {
      const data = await apiCall('/tests');
      if (data.success) {
        setTests(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching tests:', error);
      setTests([]);
    }
  };

  const fetchQuestions = async () => {
    try {
      const data = await apiCall('/admin/questions');
      if (data.success) {
        setQuestions(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
      setQuestions([]);
    }
  };

  const fetchResults = async () => {
    try {
      const data = await apiCall('/tests/results');
      if (data.success) {
        setResults(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching results:', error);
      setResults([]);
    }
  };

  const fetchLeaderboard = async () => {
    try {
      const data = await apiCall('/tests/leaderboard');
      if (data.success) {
        setLeaderboard(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      setLeaderboard([]);
    }
  };

  useEffect(() => {
    if (token) {
      loadAllData();
    }
  }, [token]);

  const loadAllData = async () => {
    await Promise.all([
      fetchTests(),
      fetchQuestions(),
      fetchResults(),
      fetchLeaderboard()
    ]);
  };

  const handleAddTest = async (e) => {
    e.preventDefault();
    if (!newTest.title || !newTest.duration) {
      alert('Please fill in all required fields!');
      return;
    }

    try {
      const testData = {
        title: newTest.title,
        description: newTest.description || '',
        type: newTest.type,
        questionIds: newTest.questionIds || [],
        duration: parseInt(newTest.duration),
        totalMarks: parseInt(newTest.totalMarks) || 100,
        passingMarks: parseInt(newTest.passingMarks) || 40,
        scheduledDate: newTest.scheduledDate || null,
        difficulty: newTest.difficulty,
        status: newTest.status || 'draft',
        isActive: newTest.status === 'published'
      };

      const data = await apiCall('/tests', 'POST', testData);

      if (data.success) {
        alert('✅ Test created successfully!');
        resetNewTest();
        setShowAddModal(false);
        await fetchTests();
      }
    } catch (error) {
      alert('❌ Failed to create test: ' + error.message);
    }
  };

  const handleUpdateTest = async (e) => {
    e.preventDefault();
    if (!editTest || !editTest.title || !editTest.duration) {
      alert('Please fill in all required fields!');
      return;
    }

    try {
      const testData = {
        title: editTest.title,
        description: editTest.description || '',
        type: editTest.type,
        duration: parseInt(editTest.duration),
        totalMarks: parseInt(editTest.totalMarks) || 100,
        passingMarks: parseInt(editTest.passingMarks) || 40,
        scheduledDate: editTest.scheduledDate || null,
        difficulty: editTest.difficulty,
        status: editTest.status || 'draft',
        isActive: editTest.status === 'published'
      };

      const data = await apiCall(`/tests/${editTest._id}`, 'PUT', testData);

      if (data.success) {
        alert('✅ Test updated successfully!');
        setShowEditModal(false);
        setEditTest(null);
        await fetchTests();
      }
    } catch (error) {
      alert('❌ Failed to update test: ' + error.message);
    }
  };

  const handleDeleteTest = async () => {
    if (!deleteTarget) return;

    try {
      const data = await apiCall(`/tests/${deleteTarget}`, 'DELETE');
      if (data.success) {
        alert('✅ Test deleted successfully!');
        await fetchTests();
        setDeleteTarget(null);
        setShowDeleteConfirm(false);
      }
    } catch (error) {
      alert('❌ Failed to delete test: ' + error.message);
    }
  };

  const handlePublishTest = async (id, publish) => {
    try {
      const data = await apiCall(`/tests/${id}`, 'PUT', { isActive: publish, status: publish ? 'published' : 'draft' });
      if (data.success) {
        alert(`✅ Test ${publish ? 'published' : 'unpublished'} successfully!`);
        await fetchTests();
      }
    } catch (error) {
      alert('❌ Failed to update test status: ' + error.message);
    }
  };

  const handleDuplicateTest = async (id) => {
    try {
      const test = tests.find(t => t._id === id);
      if (!test) return;

      const duplicateData = {
        ...test,
        title: `${test.title} (Copy)`,
        status: 'draft',
        isActive: false,
        scheduledDate: null
      };
      delete duplicateData._id;
      delete duplicateData.createdAt;
      delete duplicateData.updatedAt;

      const data = await apiCall('/tests', 'POST', duplicateData);
      if (data.success) {
        alert('✅ Test duplicated successfully!');
        await fetchTests();
      }
    } catch (error) {
      alert('❌ Failed to duplicate test: ' + error.message);
    }
  };

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    if (!newQuestion.question) {
      alert('Please enter the question!');
      return;
    }

    try {
      const questionData = {
        question: newQuestion.question,
        options: newQuestion.options.filter(opt => opt.trim() !== ''),
        correctAnswer: parseInt(newQuestion.correctAnswer) || 0,
        type: newQuestion.type || 'mcq',
        marks: parseInt(newQuestion.marks) || 1,
        category: newQuestion.category || 'aptitude',
        difficulty: newQuestion.difficulty || 'medium'
      };

      const data = await apiCall('/admin/questions', 'POST', questionData);
      if (data.success) {
        alert('✅ Question added successfully!');
        setNewQuestion({
          question: '',
          options: ['', '', '', ''],
          correctAnswer: 0,
          type: 'mcq',
          marks: 1,
          category: 'aptitude',
          difficulty: 'medium'
        });
        setShowAddQuestionModal(false);
        await fetchQuestions();
      }
    } catch (error) {
      alert('❌ Failed to add question: ' + error.message);
    }
  };

  const handleDeleteQuestion = async (id) => {
    if (!window.confirm('Are you sure you want to delete this question?')) return;

    try {
      const data = await apiCall(`/admin/questions/${id}`, 'DELETE');
      if (data.success) {
        alert('✅ Question deleted successfully!');
        await fetchQuestions();
      }
    } catch (error) {
      alert('❌ Failed to delete question: ' + error.message);
    }
  };

  const handleBulkDeleteQuestions = async () => {
    if (selectedQuestions.length === 0) {
      alert('Please select questions to delete');
      return;
    }

    if (!window.confirm(`Delete ${selectedQuestions.length} selected questions?`)) return;

    try {
      const data = await apiCall('/admin/questions/bulk-delete', 'POST', { ids: selectedQuestions });
      if (data.success) {
        alert(`✅ ${selectedQuestions.length} questions deleted successfully!`);
        setSelectedQuestions([]);
        await fetchQuestions();
        setShowBulkActionModal(false);
      }
    } catch (error) {
      alert('❌ Failed to delete questions: ' + error.message);
    }
  };

  const resetNewTest = () => {
    setNewTest({
      title: '',
      description: '',
      type: 'aptitude',
      questionIds: [],
      duration: '',
      totalMarks: '',
      passingMarks: '',
      scheduledDate: '',
      difficulty: 'medium',
      status: 'draft',
      isActive: false
    });
  };

  const getStatusColor = (status) => {
    if (!status) return 'secondary';
    const s = status.toLowerCase();
    if (s === 'published' || s === 'pass') return 'success';
    if (s === 'draft') return 'warning';
    if (s === 'scheduled') return 'info';
    if (s === 'archived' || s === 'failed') return 'danger';
    return 'secondary';
  };

  const getStatusIcon = (status) => {
    if (!status) return null;
    const s = status.toLowerCase();
    if (s === 'published' || s === 'pass') return <CheckCircle style={{ width: 'clamp(0.6rem, 1vw, 0.7rem)', height: 'clamp(0.6rem, 1vw, 0.7rem)' }} />;
    if (s === 'draft') return <Edit2 style={{ width: 'clamp(0.6rem, 1vw, 0.7rem)', height: 'clamp(0.6rem, 1vw, 0.7rem)' }} />;
    if (s === 'scheduled') return <Clock style={{ width: 'clamp(0.6rem, 1vw, 0.7rem)', height: 'clamp(0.6rem, 1vw, 0.7rem)' }} />;
    if (s === 'archived' || s === 'failed') return <XCircle style={{ width: 'clamp(0.6rem, 1vw, 0.7rem)', height: 'clamp(0.6rem, 1vw, 0.7rem)' }} />;
    return null;
  };

  const getDifficultyColor = (difficulty) => {
    if (!difficulty) return 'secondary';
    const d = difficulty.toLowerCase();
    if (d === 'easy') return 'success';
    if (d === 'medium') return 'warning';
    if (d === 'hard') return 'danger';
    return 'secondary';
  };

  const getTypeLabel = (type) => {
    const types = {
      'aptitude': 'Aptitude',
      'technical': 'Technical',
      'coding': 'Coding',
      'mock': 'Mock'
    };
    return types[type] || type || 'General';
  };

  const getTypeColor = (type) => {
    const colors = {
      'aptitude': 'info',
      'technical': 'warning',
      'coding': 'success',
      'mock': 'primary'
    };
    return colors[type] || 'secondary';
  };

  const formatDate = (date) => {
    if (!date) return 'Not scheduled';
    return new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusLabel = (status) => {
    if (!status) return 'N/A';
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const totalTests = tests.length;
  const publishedTests = tests.filter(t => t.isActive === true || t.status === 'published').length;
  const draftTests = tests.filter(t => t.isActive === false || t.status === 'draft').length;
  const totalQuestionsCount = tests.reduce((sum, t) => sum + (t.questions?.length || 0), 0);
  const passedCount = results.filter(r => r.status === 'Passed' || r.status === 'Pass').length;
  const avgScore = results.length > 0 ? Math.round(results.reduce((sum, r) => sum + (r.score || 0), 0) / results.length) : 0;

  const filteredTests = tests.filter(test => {
    const status = test.isActive ? 'published' : test.status || 'draft';
    const matchesSearch = test.title?.toLowerCase().includes(searchQuery?.toLowerCase() || '') ||
                          test.type?.toLowerCase().includes(searchQuery?.toLowerCase() || '');
    const matchesStatus = filterStatus === 'ALL' || 
                          status.toLowerCase() === filterStatus.toLowerCase() ||
                          test.status?.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const subTabs = [
    { id: 'tests', label: 'Tests', icon: LayoutDashboard },
    { id: 'questions', label: 'Questions', icon: BookOpen },
    { id: 'results', label: 'Results', icon: ListChecks },
    { id: 'leaderboard', label: 'Leaderboard', icon: Medal },
    { id: 'analytics', label: 'Analytics', icon: LineChart },
  ];

  const renderTestsTab = () => (
    <>
      <div className="card border-0 shadow-sm rounded-3 rounded-md-4 mb-3 mb-md-4" style={{ background: '#ffffff', border: '1px solid #e5e7eb' }}>
        <div className="card-body p-2 p-md-3">
          <div className="d-flex flex-wrap gap-2 align-items-center">
            <div className="d-flex align-items-center gap-2 bg-white px-2 px-md-3 py-1 py-md-2 rounded-3 border border-light flex-grow-1" style={{ maxWidth: 'clamp(160px, 35vw, 300px)' }}>
              <Search className="text-secondary" style={{ 
                width: 'clamp(0.7rem, 1.1vw, 0.8rem)', 
                height: 'clamp(0.7rem, 1.1vw, 0.8rem)' 
              }} />
              <input 
                type="text" 
                className="form-control form-control-sm bg-transparent border-0 text-dark" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ 
                  fontSize: 'clamp(0.6rem, 1vw, 0.75rem)', 
                  outline: 'none', 
                  padding: '0.1rem 0' 
                }}
              />
            </div>
            <div className="d-flex align-items-center gap-1 gap-md-2 bg-white px-2 px-md-3 py-1 py-md-2 rounded-3 border border-light flex-grow-1 flex-md-grow-0">
              <Filter className="text-secondary" style={{ 
                width: 'clamp(0.6rem, 1vw, 0.7rem)', 
                height: 'clamp(0.6rem, 1vw, 0.7rem)' 
              }} />
              <select 
                className="form-select form-select-sm bg-transparent border-0 text-dark" 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                style={{ 
                  fontSize: 'clamp(0.55rem, 0.9vw, 0.75rem)', 
                  width: 'clamp(90px, 15vw, 140px)', 
                  outline: 'none', 
                  padding: '0.1rem 0.4rem' 
                }}
              >
                <option value="ALL">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="scheduled">Scheduled</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <button 
              onClick={() => { loadAllData(); }}
              className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1 shadow-sm"
              style={{ 
                fontSize: 'clamp(0.55rem, 0.9vw, 0.7rem)', 
                padding: 'clamp(0.2rem, 0.4vw, 0.3rem) clamp(0.4rem, 0.8vw, 0.6rem)' 
              }}
            >
              <RefreshCw style={{ 
                width: 'clamp(0.6rem, 1vw, 0.8rem)', 
                height: 'clamp(0.6rem, 1vw, 0.8rem)' 
              }} /> 
              <span className="d-none d-sm-inline">Refresh</span>
            </button>
          </div>
        </div>
      </div>

      {loading && filteredTests.length === 0 ? (
        <div className="text-center p-5">
          <Loader2 className="spinner-border text-primary" style={{ width: 'clamp(1.5rem, 3vw, 2rem)', height: 'clamp(1.5rem, 3vw, 2rem)' }} />
          <p className="text-secondary mt-3" style={{ fontSize: 'clamp(0.75rem, 1.2vw, 0.85rem)' }}>Loading tests...</p>
        </div>
      ) : filteredTests.length === 0 ? (
        <div className="card border-0 shadow-sm rounded-4 text-center p-3 p-md-5" style={{ background: '#ffffff', border: '1px solid #e5e7eb' }}>
          <FileText className="text-secondary mx-auto" style={{ 
            width: 'clamp(2rem, 4vw, 3rem)', 
            height: 'clamp(2rem, 4vw, 3rem)' 
          }} />
          <h6 className="text-secondary mt-3" style={{ fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>No tests found</h6>
          <p className="text-secondary small" style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)' }}>Click "Create Test" to add your first mock test</p>
          <button className="btn btn-primary btn-sm mt-2" onClick={() => setShowAddModal(true)} style={{ fontSize: 'clamp(0.65rem, 1vw, 0.75rem)' }}>
            <Plus style={{ width: 'clamp(0.6rem, 1vw, 0.8rem)', height: 'clamp(0.6rem, 1vw, 0.8rem)' }} /> Create First Test
          </button>
        </div>
      ) : (
        <div className="row g-2 g-md-3 g-lg-4">
          {filteredTests.map((test, index) => {
            const status = test.isActive ? 'published' : test.status || 'draft';
            const isExpanded = expandedTest === test._id;
            return (
              <div key={test._id || index} className="col-sm-6 col-xl-4">
                <div 
                  className="card border-0 shadow-sm rounded-3 rounded-md-4 h-100"
                  style={{ 
                    background: '#ffffff',
                    border: '1px solid #e5e7eb',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 0.125rem 0.25rem rgba(0,0,0,0.075)';
                  }}
                >
                  <div className="card-body p-3 p-md-4 d-flex flex-column">
                    <div className="d-flex flex-wrap justify-content-between align-items-start gap-2 mb-2 mb-md-3">
                      <div className="d-flex align-items-center gap-2">
                        <div className="p-1 p-md-2 rounded-3 flex-shrink-0" style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)' }}>
                          <FileText className="text-primary" style={{ 
                            width: 'clamp(0.8rem, 1.2vw, 1rem)', 
                            height: 'clamp(0.8rem, 1.2vw, 1rem)' 
                          }} />
                        </div>
                        <div className="min-w-0">
                          <h6 className="fw-bold text-dark m-0" style={{ 
                            fontSize: 'clamp(0.75rem, 1.2vw, 0.85rem)' 
                          }}>
                            {test.title}
                          </h6>
                          <span className={`badge bg-${getTypeColor(test.type)} bg-opacity-10 text-${getTypeColor(test.type)} border border-${getTypeColor(test.type)}`} 
                                style={{ fontSize: 'clamp(0.4rem, 0.6vw, 0.5rem)' }}>
                            {getTypeLabel(test.type)}
                          </span>
                        </div>
                      </div>
                      <span className={`badge bg-${getStatusColor(status)} bg-opacity-10 text-${getStatusColor(status)} border border-${getStatusColor(status)} d-inline-flex align-items-center gap-1 flex-shrink-0`} 
                            style={{ fontSize: 'clamp(0.4rem, 0.7vw, 0.55rem)' }}>
                        {getStatusIcon(status)}
                        {getStatusLabel(status)}
                      </span>
                    </div>

                    {test.description && (
                      <p className="text-secondary small mb-2" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>
                        {test.description.length > 80 ? test.description.substring(0, 80) + '...' : test.description}
                      </p>
                    )}

                    <div className="space-y-1.5 flex-grow-1">
                      <div className="d-flex flex-wrap justify-content-between p-1 p-md-1.5 rounded-3" style={{ background: 'rgba(0,0,0,0.03)' }}>
                        <span className="text-secondary small" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                          <Award style={{ width: 'clamp(0.5rem, 0.8vw, 0.7rem)', height: 'clamp(0.5rem, 0.8vw, 0.7rem)', marginRight: '0.2rem' }} /> Questions
                        </span>
                        <span className="text-dark fw-bold" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>{test.questions?.length || 0}</span>
                      </div>
                      <div className="d-flex flex-wrap justify-content-between p-1 p-md-1.5 rounded-3" style={{ background: 'rgba(0,0,0,0.03)' }}>
                        <span className="text-secondary small" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                          <Clock style={{ width: 'clamp(0.5rem, 0.8vw, 0.7rem)', height: 'clamp(0.5rem, 0.8vw, 0.7rem)', marginRight: '0.2rem' }} /> Duration
                        </span>
                        <span className="text-dark fw-bold" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>{test.duration || 0} min</span>
                      </div>
                      <div className="d-flex flex-wrap justify-content-between p-1 p-md-1.5 rounded-3" style={{ background: 'rgba(0,0,0,0.03)' }}>
                        <span className="text-secondary small" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                          <Target style={{ width: 'clamp(0.5rem, 0.8vw, 0.7rem)', height: 'clamp(0.5rem, 0.8vw, 0.7rem)', marginRight: '0.2rem' }} /> Difficulty
                        </span>
                        <span className={`text-${getDifficultyColor(test.difficulty)} fw-bold`} style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                          {test.difficulty || 'Medium'}
                        </span>
                      </div>
                      <div className="d-flex flex-wrap justify-content-between p-1 p-md-1.5 rounded-3" style={{ background: 'rgba(0,0,0,0.03)' }}>
                        <span className="text-secondary small" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                          <Hash style={{ width: 'clamp(0.5rem, 0.8vw, 0.7rem)', height: 'clamp(0.5rem, 0.8vw, 0.7rem)', marginRight: '0.2rem' }} /> Total Marks
                        </span>
                        <span className="text-primary fw-bold" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>{test.totalMarks || 100}</span>
                      </div>
                    </div>

                    {test.questions && test.questions.length > 0 && (
                      <button
                        onClick={() => setExpandedTest(isExpanded ? null : test._id)}
                        className="btn btn-sm btn-outline-secondary mt-2 d-flex align-items-center justify-content-center gap-1"
                        style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)', padding: 'clamp(0.2rem, 0.4vw, 0.3rem) clamp(0.4rem, 0.8vw, 0.6rem)' }}
                      >
                        {isExpanded ? <ChevronUp style={{ width: 'clamp(0.6rem, 1vw, 0.7rem)', height: 'clamp(0.6rem, 1vw, 0.7rem)' }} /> : <ChevronDown style={{ width: 'clamp(0.6rem, 1vw, 0.7rem)', height: 'clamp(0.6rem, 1vw, 0.7rem)' }} />}
                        {isExpanded ? 'Hide Questions' : `View ${test.questions.length} Questions`}
                      </button>
                    )}

                    {isExpanded && test.questions && (
                      <div className="mt-2 p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.03)', maxHeight: 'clamp(150px, 30vh, 200px)', overflowY: 'auto' }}>
                        {test.questions.map((q, idx) => (
                          <div key={q._id || idx} className="mb-2 pb-2 border-bottom border-light" style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                            <p className="text-dark small mb-1" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>
                              <span className="text-secondary">Q{idx + 1}:</span> {q.question}
                            </p>
                            <div className="d-flex flex-wrap gap-1 gap-md-2">
                              {q.options && q.options.map((opt, oi) => (
                                <span key={oi} className={`text-secondary small ${q.correctAnswer === oi ? 'text-success fw-bold' : ''}`} style={{ fontSize: 'clamp(0.45rem, 0.7vw, 0.55rem)' }}>
                                  {opt} {q.correctAnswer === oi && '✓'}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="mt-3 pt-2 pt-md-3 border-top border-light d-flex flex-wrap gap-2 justify-content-between align-items-center">
                      <span className="text-secondary small" style={{ fontSize: 'clamp(0.45rem, 0.7vw, 0.55rem)' }}>
                        <Calendar style={{ width: 'clamp(0.5rem, 0.7vw, 0.6rem)', height: 'clamp(0.5rem, 0.7vw, 0.6rem)', marginRight: '0.2rem' }} />
                        {test.scheduledDate ? formatDate(test.scheduledDate) : 'Not scheduled'}
                      </span>
                      <div className="d-flex gap-1">
                        <button 
                          onClick={() => { setSelectedTest(test); setShowDetailModal(true); }}
                          className="btn btn-sm btn-outline-info d-flex align-items-center gap-1 shadow-sm"
                          style={{ 
                            borderRadius: '8px', 
                            padding: 'clamp(0.1rem, 0.2vw, 0.2rem) clamp(0.2rem, 0.4vw, 0.4rem)' 
                          }}
                          title="View Details"
                        >
                          <Eye style={{ 
                            width: 'clamp(0.5rem, 0.8vw, 0.7rem)', 
                            height: 'clamp(0.5rem, 0.8vw, 0.7rem)' 
                          }} />
                        </button>
                        <button 
                          onClick={() => handleDuplicateTest(test._id)}
                          className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1 shadow-sm"
                          style={{ 
                            borderRadius: '8px', 
                            padding: 'clamp(0.1rem, 0.2vw, 0.2rem) clamp(0.2rem, 0.4vw, 0.4rem)' 
                          }}
                          title="Duplicate"
                        >
                          <Copy style={{ 
                            width: 'clamp(0.5rem, 0.8vw, 0.7rem)', 
                            height: 'clamp(0.5rem, 0.8vw, 0.7rem)' 
                          }} />
                        </button>
                        <button 
                          onClick={() => handlePublishTest(test._id, !test.isActive)}
                          className={`btn btn-sm ${test.isActive ? 'btn-outline-warning' : 'btn-outline-success'} d-flex align-items-center gap-1 shadow-sm`}
                          style={{ 
                            borderRadius: '8px', 
                            padding: 'clamp(0.1rem, 0.2vw, 0.2rem) clamp(0.2rem, 0.4vw, 0.4rem)' 
                          }}
                          title={test.isActive ? 'Unpublish' : 'Publish'}
                        >
                          {test.isActive ? <Pause style={{ 
                            width: 'clamp(0.5rem, 0.8vw, 0.7rem)', 
                            height: 'clamp(0.5rem, 0.8vw, 0.7rem)' 
                          }} /> : <Play style={{ 
                            width: 'clamp(0.5rem, 0.8vw, 0.7rem)', 
                            height: 'clamp(0.5rem, 0.8vw, 0.7rem)' 
                          }} />}
                        </button>
                        <button 
                          onClick={() => { setEditTest({ ...test }); setShowEditModal(true); }}
                          className="btn btn-sm btn-outline-warning d-flex align-items-center gap-1 shadow-sm"
                          style={{ 
                            borderRadius: '8px', 
                            padding: 'clamp(0.1rem, 0.2vw, 0.2rem) clamp(0.2rem, 0.4vw, 0.4rem)' 
                          }}
                          title="Edit"
                        >
                          <Edit2 style={{ 
                            width: 'clamp(0.5rem, 0.8vw, 0.7rem)', 
                            height: 'clamp(0.5rem, 0.8vw, 0.7rem)' 
                          }} />
                        </button>
                        <button 
                          onClick={() => { setDeleteTarget(test._id); setShowDeleteConfirm(true); }}
                          className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1 shadow-sm"
                          style={{ 
                            borderRadius: '8px', 
                            padding: 'clamp(0.1rem, 0.2vw, 0.2rem) clamp(0.2rem, 0.4vw, 0.4rem)' 
                          }}
                          disabled={loading}
                          title="Delete"
                        >
                          <Trash2 style={{ 
                            width: 'clamp(0.5rem, 0.8vw, 0.7rem)', 
                            height: 'clamp(0.5rem, 0.8vw, 0.7rem)' 
                          }} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );

  const renderQuestionsTab = () => (
    <div className="card border-0 shadow-sm rounded-3 rounded-md-4" style={{ background: '#ffffff', border: '1px solid #e5e7eb' }}>
      <div className="card-body p-3 p-md-4">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
          <h6 className="text-secondary text-uppercase fw-bold m-0" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>
            Question Bank <span className="badge bg-primary ms-2" style={{ fontSize: 'clamp(0.4rem, 0.6vw, 0.5rem)' }}>{questions.length}</span>
          </h6>
          <div className="d-flex gap-2 flex-wrap">
            {selectedQuestions.length > 0 && (
              <button 
                onClick={() => { setShowBulkActionModal(true); setBulkAction('delete'); }}
                className="btn btn-danger btn-sm d-flex align-items-center gap-1"
                style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)', padding: 'clamp(0.2rem, 0.4vw, 0.3rem) clamp(0.4rem, 0.8vw, 0.6rem)' }}
              >
                <Trash2 style={{ 
                  width: 'clamp(0.6rem, 1vw, 0.8rem)', 
                  height: 'clamp(0.6rem, 1vw, 0.8rem)' 
                }} /> Delete ({selectedQuestions.length})
              </button>
            )}
            <button 
              onClick={() => setShowAddQuestionModal(true)}
              className="btn btn-success btn-sm d-flex align-items-center gap-1"
              style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)', padding: 'clamp(0.2rem, 0.4vw, 0.3rem) clamp(0.4rem, 0.8vw, 0.6rem)' }}
            >
              <Plus style={{ 
                width: 'clamp(0.6rem, 1vw, 0.8rem)', 
                height: 'clamp(0.6rem, 1vw, 0.8rem)' 
              }} /> Add Question
            </button>
          </div>
        </div>
        {questions.length === 0 ? (
          <div className="text-center p-4">
            <HelpCircle className="text-secondary mx-auto" style={{ 
              width: 'clamp(1.5rem, 3vw, 2rem)', 
              height: 'clamp(1.5rem, 3vw, 2rem)' 
            }} />
            <p className="text-secondary small mt-2" style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)' }}>No questions available</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover table-sm">
              <thead className="text-secondary text-uppercase" style={{ fontSize: 'clamp(0.45rem, 0.7vw, 0.55rem)', fontWeight: 'bold' }}>
                <tr>
                  <th style={{ width: 'clamp(25px, 4vw, 30px)' }}>
                    <input 
                      type="checkbox" 
                      className="form-check-input border-secondary"
                      checked={selectedQuestions.length === questions.length && questions.length > 0}
                      onChange={() => {
                        if (selectedQuestions.length === questions.length) {
                          setSelectedQuestions([]);
                        } else {
                          setSelectedQuestions(questions.map(q => q._id));
                        }
                      }}
                    />
                  </th>
                  <th className="p-2 p-md-3">#</th>
                  <th className="p-2 p-md-3">Question</th>
                  <th className="p-2 p-md-3 d-none d-sm-table-cell">Type</th>
                  <th className="p-2 p-md-3 d-none d-md-table-cell">Category</th>
                  <th className="p-2 p-md-3">Difficulty</th>
                  <th className="p-2 p-md-3 d-none d-sm-table-cell">Marks</th>
                  <th className="p-2 p-md-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody style={{ fontSize: 'clamp(0.6rem, 1vw, 0.75rem)' }}>
                {questions.map((q, index) => (
                  <tr key={q._id || index} className="transition-all hover:bg-light">
                    <td>
                      <input 
                        type="checkbox" 
                        className="form-check-input border-secondary"
                        checked={selectedQuestions.includes(q._id)}
                        onChange={() => {
                          if (selectedQuestions.includes(q._id)) {
                            setSelectedQuestions(selectedQuestions.filter(id => id !== q._id));
                          } else {
                            setSelectedQuestions([...selectedQuestions, q._id]);
                          }
                        }}
                      />
                    </td>
                    <td className="p-2 p-md-3 text-secondary">{index + 1}</td>
                    <td className="p-2 p-md-3 text-dark" style={{ fontSize: 'clamp(0.6rem, 1vw, 0.7rem)' }}>
                      {q.question?.substring(0, 50)}{q.question?.length > 50 ? '...' : ''}
                    </td>
                    <td className="p-2 p-md-3 d-none d-sm-table-cell">
                      <span className={`badge bg-${q.type === 'mcq' ? 'info' : 'warning'} bg-opacity-10 text-${q.type === 'mcq' ? 'info' : 'warning'}`}
                            style={{ fontSize: 'clamp(0.4rem, 0.6vw, 0.5rem)' }}>
                        {q.type || 'mcq'}
                      </span>
                    </td>
                    <td className="p-2 p-md-3 d-none d-md-table-cell">
                      <span className="badge bg-secondary bg-opacity-10 text-secondary" style={{ fontSize: 'clamp(0.4rem, 0.6vw, 0.5rem)' }}>
                        {q.category || 'General'}
                      </span>
                    </td>
                    <td className="p-2 p-md-3">
                      <span className={`badge bg-${getDifficultyColor(q.difficulty)} bg-opacity-10 text-${getDifficultyColor(q.difficulty)}`}
                            style={{ fontSize: 'clamp(0.4rem, 0.6vw, 0.5rem)' }}>
                        {q.difficulty || 'Medium'}
                      </span>
                    </td>
                    <td className="p-2 p-md-3 text-primary fw-bold d-none d-sm-table-cell" style={{ fontSize: 'clamp(0.6rem, 1vw, 0.7rem)' }}>
                      {q.marks || 1}
                    </td>
                    <td className="p-2 p-md-3 text-center">
                      <button 
                        onClick={() => handleDeleteQuestion(q._id)}
                        className="btn btn-sm btn-outline-danger"
                        style={{ padding: 'clamp(0.1rem, 0.2vw, 0.2rem) clamp(0.2rem, 0.4vw, 0.4rem)' }}
                      >
                        <Trash2 style={{ 
                          width: 'clamp(0.5rem, 0.8vw, 0.7rem)', 
                          height: 'clamp(0.5rem, 0.8vw, 0.7rem)' 
                        }} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );

  const renderResultsTab = () => (
    <div className="card border-0 shadow-sm rounded-3 rounded-md-4" style={{ background: '#ffffff', border: '1px solid #e5e7eb' }}>
      <div className="card-body p-3 p-md-4">
        <h6 className="text-secondary text-uppercase fw-bold mb-3" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>
          Test Results <span className="badge bg-primary ms-2" style={{ fontSize: 'clamp(0.4rem, 0.6vw, 0.5rem)' }}>{results.length}</span>
        </h6>
        <div className="table-responsive">
          <table className="table table-hover table-sm">
            <thead className="text-secondary text-uppercase" style={{ fontSize: 'clamp(0.45rem, 0.7vw, 0.55rem)', fontWeight: 'bold' }}>
              <tr>
                <th className="p-2 p-md-3">Test Name</th>
                <th className="p-2 p-md-3 d-none d-sm-table-cell">Student</th>
                <th className="p-2 p-md-3">Score</th>
                <th className="p-2 p-md-3">Status</th>
                <th className="p-2 p-md-3 d-none d-md-table-cell">Date</th>
              </tr>
            </thead>
            <tbody style={{ fontSize: 'clamp(0.6rem, 1vw, 0.75rem)' }}>
              {results.map((result, index) => (
                <tr key={result.id || index} className="transition-all hover:bg-light">
                  <td className="p-2 p-md-3">{result.testName || result.test?.title || 'N/A'}</td>
                  <td className="p-2 p-md-3 text-dark d-none d-sm-table-cell">{result.student || result.studentId?.name || 'N/A'}</td>
                  <td className="p-2 p-md-3 fw-bold text-primary">{result.score || 0}%</td>
                  <td className="p-2 p-md-3">
                    <span className={`badge bg-${getStatusColor(result.status)} bg-opacity-10 text-${getStatusColor(result.status)} border border-${getStatusColor(result.status)} d-inline-flex align-items-center gap-1`}
                          style={{ fontSize: 'clamp(0.4rem, 0.6vw, 0.55rem)' }}>
                      {getStatusIcon(result.status)}
                      {result.status || 'N/A'}
                    </span>
                  </td>
                  <td className="p-2 p-md-3 text-secondary d-none d-md-table-cell" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                    {formatDate(result.date || result.createdAt)}
                  </td>
                </tr>
              ))}
              {results.length === 0 && (
                <tr><td colSpan="5" className="text-center text-secondary py-4">No results found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderLeaderboardTab = () => (
    <div className="card border-0 shadow-sm rounded-3 rounded-md-4" style={{ background: '#ffffff', border: '1px solid #e5e7eb' }}>
      <div className="card-body p-3 p-md-4">
        <h6 className="text-secondary text-uppercase fw-bold mb-3" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>
          Leaderboard <span className="badge bg-warning ms-2" style={{ fontSize: 'clamp(0.4rem, 0.6vw, 0.5rem)' }}>Top Performers</span>
        </h6>
        <div className="table-responsive">
          <table className="table table-hover table-sm">
            <thead className="text-secondary text-uppercase" style={{ fontSize: 'clamp(0.45rem, 0.7vw, 0.55rem)', fontWeight: 'bold' }}>
              <tr>
                <th className="p-2 p-md-3">Rank</th>
                <th className="p-2 p-md-3">Student</th>
                <th className="p-2 p-md-3">Best Score</th>
                <th className="p-2 p-md-3 d-none d-sm-table-cell">Tests</th>
                <th className="p-2 p-md-3 d-none d-md-table-cell">Average</th>
                <th className="p-2 p-md-3 d-none d-lg-table-cell">Status</th>
              </tr>
            </thead>
            <tbody style={{ fontSize: 'clamp(0.6rem, 1vw, 0.75rem)' }}>
              {leaderboard.map((item, index) => (
                <tr key={item.rank || index} className="transition-all hover:bg-light">
                  <td className="p-2 p-md-3">
                    <div className="d-flex align-items-center gap-2">
                      {item.rank === 1 && <Trophy className="text-warning" style={{ width: 'clamp(0.8rem, 1.2vw, 1rem)', height: 'clamp(0.8rem, 1.2vw, 1rem)' }} />}
                      {item.rank === 2 && <Medal className="text-secondary" style={{ width: 'clamp(0.8rem, 1.2vw, 1rem)', height: 'clamp(0.8rem, 1.2vw, 1rem)' }} />}
                      {item.rank === 3 && <Medal className="text-warning" style={{ width: 'clamp(0.8rem, 1.2vw, 1rem)', height: 'clamp(0.8rem, 1.2vw, 1rem)' }} />}
                      <span className="fw-bold text-dark" style={{ fontSize: 'clamp(0.6rem, 1vw, 0.7rem)' }}>#{item.rank}</span>
                    </div>
                  </td>
                  <td className="p-2 p-md-3 text-dark fw-bold" style={{ fontSize: 'clamp(0.6rem, 1vw, 0.7rem)' }}>{item.name || item.student?.name || 'N/A'}</td>
                  <td className="p-2 p-md-3 text-primary fw-bold" style={{ fontSize: 'clamp(0.6rem, 1vw, 0.7rem)' }}>{item.score || 0}%</td>
                  <td className="p-2 p-md-3 d-none d-sm-table-cell" style={{ fontSize: 'clamp(0.6rem, 1vw, 0.7rem)' }}>{item.tests || item.totalTests || 0}</td>
                  <td className="p-2 p-md-3 text-success fw-bold d-none d-md-table-cell" style={{ fontSize: 'clamp(0.6rem, 1vw, 0.7rem)' }}>{item.average || 0}%</td>
                  <td className="p-2 p-md-3 d-none d-lg-table-cell">
                    <span className="badge bg-success bg-opacity-10 text-success" style={{ fontSize: 'clamp(0.4rem, 0.6vw, 0.5rem)' }}>Active</span>
                  </td>
                </tr>
              ))}
              {leaderboard.length === 0 && (
                <tr><td colSpan="6" className="text-center text-secondary py-4">No data available</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAnalyticsTab = () => (
    <div className="row g-2 g-md-3">
      <div className="col-12 col-md-6">
        <div className="card border-0 shadow-sm rounded-3 rounded-md-4 h-100" style={{ background: '#ffffff', border: '1px solid #e5e7eb' }}>
          <div className="card-body p-3 p-md-4">
            <h6 className="text-secondary text-uppercase fw-bold mb-3" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>
              <PieChart className="me-1" style={{ 
                width: 'clamp(0.6rem, 1vw, 0.8rem)', 
                height: 'clamp(0.6rem, 1vw, 0.8rem)' 
              }} /> Test Distribution
            </h6>
            <div className="space-y-2 space-y-md-3">
              {['Aptitude', 'Technical', 'Coding', 'Mock'].map((type, i) => {
                const count = tests.filter(t => getTypeLabel(t.type) === type).length;
                const percentage = totalTests > 0 ? Math.round((count / totalTests) * 100) : 0;
                const colors = ['primary', 'success', 'warning', 'info'];
                return (
                  <div key={i}>
                    <div className="d-flex flex-wrap justify-content-between small">
                      <span className="text-secondary" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>{type}</span>
                      <span className="text-dark fw-bold" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>{count} tests ({percentage}%)</span>
                    </div>
                    <div className="progress" style={{ height: 'clamp(4px, 0.5vw, 6px)', background: 'rgba(0,0,0,0.05)' }}>
                      <div className={`progress-bar bg-${colors[i]}`} style={{ width: `${percentage}%`, borderRadius: '3px' }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 col-md-6">
        <div className="card border-0 shadow-sm rounded-3 rounded-md-4 h-100" style={{ background: '#ffffff', border: '1px solid #e5e7eb' }}>
          <div className="card-body p-3 p-md-4">
            <h6 className="text-secondary text-uppercase fw-bold mb-3" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>
              <Activity className="me-1" style={{ 
                width: 'clamp(0.6rem, 1vw, 0.8rem)', 
                height: 'clamp(0.6rem, 1vw, 0.8rem)' 
              }} /> Test Activity
            </h6>
            <div className="space-y-2">
              <div className="d-flex flex-wrap justify-content-between p-1 p-md-2 rounded-3" style={{ background: 'rgba(0,0,0,0.03)' }}>
                <span className="text-secondary" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>Total Tests Created</span>
                <span className="text-primary fw-bold" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>{totalTests}</span>
              </div>
              <div className="d-flex flex-wrap justify-content-between p-1 p-md-2 rounded-3" style={{ background: 'rgba(0,0,0,0.03)' }}>
                <span className="text-secondary" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>Published Tests</span>
                <span className="text-success fw-bold" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>{publishedTests}</span>
              </div>
              <div className="d-flex flex-wrap justify-content-between p-1 p-md-2 rounded-3" style={{ background: 'rgba(0,0,0,0.03)' }}>
                <span className="text-secondary" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>Draft Tests</span>
                <span className="text-warning fw-bold" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>{draftTests}</span>
              </div>
              <div className="d-flex flex-wrap justify-content-between p-1 p-md-2 rounded-3" style={{ background: 'rgba(0,0,0,0.03)' }}>
                <span className="text-secondary" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>Total Attempts</span>
                <span className="text-info fw-bold" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>{results.length}</span>
              </div>
              <div className="d-flex flex-wrap justify-content-between p-1 p-md-2 rounded-3" style={{ background: 'rgba(0,0,0,0.03)' }}>
                <span className="text-secondary" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>Pass Rate</span>
                <span className={`fw-bold ${results.length > 0 && (passedCount / results.length * 100) > 50 ? 'text-success' : 'text-danger'}`} 
                      style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>
                  {results.length > 0 ? Math.round((passedCount / results.length) * 100) : 0}%
                </span>
              </div>
              <div className="d-flex flex-wrap justify-content-between p-1 p-md-2 rounded-3" style={{ background: 'rgba(0,0,0,0.03)' }}>
                <span className="text-secondary" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>Average Score</span>
                <span className="text-success fw-bold" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>{avgScore}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="animate-fadeIn">
      {/* Stats Cards */}
      <div className="row g-2 g-md-3 mb-3 mb-md-4">
        {[
          { label: "Total Tests", value: totalTests, color: "primary", icon: FileText },
          { label: "Published", value: publishedTests, color: "success", icon: CheckCircle },
          { label: "Draft", value: draftTests, color: "warning", icon: Edit2 },
          { label: "Questions", value: totalQuestionsCount, color: "info", icon: Award },
          { label: "Passed", value: passedCount, color: "success", icon: Trophy },
          { label: "Avg Score", value: `${avgScore}%`, color: "primary", icon: TrendingUp },
        ].map((stat, i) => {
          const Icon = stat.icon;
          const bgColors = {
            primary: 'rgba(59,130,246,0.08)',
            success: 'rgba(34,197,94,0.08)',
            warning: 'rgba(234,179,8,0.08)',
            info: 'rgba(6,182,212,0.08)'
          };
          return (
            <div key={i} className="col-6 col-lg-2">
              <div className="card border-0 shadow-sm rounded-3 rounded-md-4 h-100" style={{ 
                background: '#ffffff', 
                border: '1px solid #e5e7eb',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              >
                <div className="card-body p-2 p-md-3">
                  <div className="d-flex align-items-center justify-content-between">
                    <span className="text-secondary fw-bold text-uppercase" style={{ fontSize: 'clamp(0.4rem, 0.6vw, 0.5rem)' }}>
                      {stat.label}
                    </span>
                    <div className={`p-1 p-md-2 rounded-3`} style={{ 
                      background: bgColors[stat.color], 
                      border: `1px solid ${bgColors[stat.color]}` 
                    }}>
                      <Icon className={`text-${stat.color}`} style={{ 
                        width: 'clamp(0.6rem, 1vw, 0.8rem)', 
                        height: 'clamp(0.6rem, 1vw, 0.8rem)' 
                      }} />
                    </div>
                  </div>
                  <h4 className={`fw-bold text-${stat.color} mb-0`} style={{ 
                    fontSize: 'clamp(0.9rem, 2vw, 1.2rem)' 
                  }}>{stat.value}</h4>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sub Tabs */}
      <div className="card border-0 shadow-sm rounded-3 rounded-md-4 mb-3 mb-md-4" style={{ background: '#ffffff', border: '1px solid #e5e7eb' }}>
        <div className="card-body p-2 p-md-3">
          <div className="d-flex flex-wrap gap-1 align-items-center">
            {subTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSubTab(tab.id)}
                  className={`btn btn-sm d-flex align-items-center gap-2 rounded-3 transition-all ${
                    activeSubTab === tab.id 
                      ? 'bg-primary text-white shadow-sm' 
                      : 'text-secondary hover-bg-light'
                  }`}
                  style={{ 
                    padding: 'clamp(0.3rem, 0.6vw, 0.5rem) clamp(0.6rem, 1.2vw, 1.2rem)', 
                    fontSize: 'clamp(0.6rem, 1vw, 0.7rem)', 
                    fontWeight: '500', 
                    border: 'none' 
                  }}
                >
                  <Icon style={{ 
                    width: 'clamp(0.7rem, 1.2vw, 0.8rem)', 
                    height: 'clamp(0.7rem, 1.2vw, 0.8rem)' 
                  }} />
                  <span className="d-none d-sm-inline">{tab.label}</span>
                </button>
              );
            })}
            <button 
              onClick={() => setShowAddModal(true)}
              className="btn btn-primary btn-sm ms-auto d-flex align-items-center gap-1 shadow-sm"
              style={{ 
                borderRadius: '10px', 
                fontWeight: '600', 
                padding: 'clamp(0.25rem, 0.5vw, 0.5rem) clamp(0.6rem, 1.2vw, 1.2rem)',
                fontSize: 'clamp(0.6rem, 1vw, 0.7rem)' 
              }}
            >
              <Plus style={{ 
                width: 'clamp(0.6rem, 1vw, 0.8rem)', 
                height: 'clamp(0.6rem, 1vw, 0.8rem)' 
              }} /> 
              <span className="d-none d-sm-inline">Create Test</span>
            </button>
          </div>
        </div>
      </div>

      {activeSubTab === 'tests' && renderTestsTab()}
      {activeSubTab === 'questions' && renderQuestionsTab()}
      {activeSubTab === 'results' && renderResultsTab()}
      {activeSubTab === 'leaderboard' && renderLeaderboardTab()}
      {activeSubTab === 'analytics' && renderAnalyticsTab()}

      {/* Add Modal */}
      {showAddModal && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ 
          zIndex: 9999, 
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(5px)',
          animation: 'fadeIn 0.3s ease',
          padding: '1rem'
        }}>
          <div className="card border-0 shadow-lg rounded-4" style={{ 
            maxWidth: 'clamp(320px, 90vw, 600px)', 
            width: '100%', 
            maxHeight: '90vh', 
            overflowY: 'auto', 
            background: '#ffffff' 
          }}>
            <div className="card-body p-3 p-md-4">
              <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3 border-bottom border-light pb-3">
                <h5 className="text-dark fw-bold m-0 d-flex align-items-center gap-2" style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)' }}>
                  <FileText className="text-primary" style={{ 
                    width: 'clamp(0.9rem, 2vw, 1.2rem)', 
                    height: 'clamp(0.9rem, 2vw, 1.2rem)' 
                  }} />
                  Create Mock Test
                </h5>
                <button onClick={() => setShowAddModal(false)} className="btn btn-close" style={{ fontSize: 'clamp(0.6rem, 1vw, 0.9rem)' }}></button>
              </div>

              <form onSubmit={handleAddTest}>
                <div className="row g-2 g-md-3">
                  <div className="col-12">
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Test Title *
                    </label>
                    <input 
                      type="text" 
                      className="form-control form-control-sm bg-white text-dark border-light" 
                      placeholder="Enter test title"
                      value={newTest.title}
                      onChange={(e) => setNewTest({ ...newTest, title: e.target.value })}
                      required
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                    />
                  </div>
                  <div className="col-12">
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Description
                    </label>
                    <textarea 
                      rows={2}
                      className="form-control form-control-sm bg-white text-dark border-light" 
                      placeholder="Test description..."
                      value={newTest.description}
                      onChange={(e) => setNewTest({ ...newTest, description: e.target.value })}
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px', resize: 'none' }}
                    />
                  </div>
                  <div className="col-6">
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Type
                    </label>
                    <select 
                      className="form-select form-select-sm bg-white text-dark border-light" 
                      value={newTest.type}
                      onChange={(e) => setNewTest({ ...newTest, type: e.target.value })}
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                    >
                      <option value="aptitude">Aptitude</option>
                      <option value="technical">Technical</option>
                      <option value="coding">Coding</option>
                      <option value="mock">Mock</option>
                    </select>
                  </div>
                  <div className="col-6">
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Difficulty
                    </label>
                    <select 
                      className="form-select form-select-sm bg-white text-dark border-light" 
                      value={newTest.difficulty}
                      onChange={(e) => setNewTest({ ...newTest, difficulty: e.target.value })}
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                  <div className="col-4">
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Duration (min) *
                    </label>
                    <input 
                      type="number" 
                      className="form-control form-control-sm bg-white text-dark border-light" 
                      placeholder="30"
                      value={newTest.duration}
                      onChange={(e) => setNewTest({ ...newTest, duration: e.target.value })}
                      required
                      min="1"
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                    />
                  </div>
                  <div className="col-4">
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Total Marks
                    </label>
                    <input 
                      type="number" 
                      className="form-control form-control-sm bg-white text-dark border-light" 
                      placeholder="100"
                      value={newTest.totalMarks}
                      onChange={(e) => setNewTest({ ...newTest, totalMarks: e.target.value })}
                      min="1"
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                    />
                  </div>
                  <div className="col-4">
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Passing Marks
                    </label>
                    <input 
                      type="number" 
                      className="form-control form-control-sm bg-white text-dark border-light" 
                      placeholder="40"
                      value={newTest.passingMarks}
                      onChange={(e) => setNewTest({ ...newTest, passingMarks: e.target.value })}
                      min="1"
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                    />
                  </div>
                  <div className="col-12">
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Question IDs
                    </label>
                    <input 
                      type="text" 
                      className="form-control form-control-sm bg-white text-dark border-light" 
                      placeholder="q1, q2, q3"
                      value={newTest.questionIds.join(', ')}
                      onChange={(e) => setNewTest({ ...newTest, questionIds: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                    />
                  </div>
                  <div className="col-12">
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Scheduled Date
                    </label>
                    <input 
                      type="datetime-local" 
                      className="form-control form-control-sm bg-white text-dark border-light" 
                      value={newTest.scheduledDate}
                      onChange={(e) => setNewTest({ ...newTest, scheduledDate: e.target.value })}
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                    />
                  </div>
                  <div className="col-12">
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Status
                    </label>
                    <select 
                      className="form-select form-select-sm bg-white text-dark border-light" 
                      value={newTest.status}
                      onChange={(e) => setNewTest({ ...newTest, status: e.target.value })}
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="scheduled">Scheduled</option>
                    </select>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-top border-light d-flex gap-2 flex-wrap">
                  <button onClick={() => setShowAddModal(false)} type="button" className="btn btn-secondary flex-grow-1" style={{ borderRadius: '10px', fontWeight: '600', fontSize: 'clamp(0.6rem, 1vw, 0.7rem)', padding: '0.35rem 0.7rem' }}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary flex-grow-1 shadow-sm" disabled={loading} style={{ borderRadius: '10px', fontWeight: '600', fontSize: 'clamp(0.6rem, 1vw, 0.7rem)', padding: '0.35rem 0.7rem' }}>
                    {loading ? <Loader2 className="spinner-border spinner-border-sm" style={{ width: 'clamp(0.6rem, 1vw, 0.8rem)', height: 'clamp(0.6rem, 1vw, 0.8rem)' }} /> : <Plus style={{ width: 'clamp(0.6rem, 1vw, 0.8rem)', height: 'clamp(0.6rem, 1vw, 0.8rem)' }} />}
                    {loading ? 'Creating...' : 'Create Test'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editTest && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ 
          zIndex: 9999, 
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(5px)',
          animation: 'fadeIn 0.3s ease',
          padding: '1rem'
        }}>
          <div className="card border-0 shadow-lg rounded-4" style={{ 
            maxWidth: 'clamp(320px, 90vw, 600px)', 
            width: '100%', 
            maxHeight: '90vh', 
            overflowY: 'auto', 
            background: '#ffffff' 
          }}>
            <div className="card-body p-3 p-md-4">
              <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3 border-bottom border-light pb-3">
                <h5 className="text-dark fw-bold m-0 d-flex align-items-center gap-2" style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)' }}>
                  <Edit2 className="text-warning" style={{ 
                    width: 'clamp(0.9rem, 2vw, 1.2rem)', 
                    height: 'clamp(0.9rem, 2vw, 1.2rem)' 
                  }} />
                  Edit Test
                </h5>
                <button onClick={() => { setShowEditModal(false); setEditTest(null); }} className="btn btn-close" style={{ fontSize: 'clamp(0.6rem, 1vw, 0.9rem)' }}></button>
              </div>

              <form onSubmit={handleUpdateTest}>
                <div className="row g-2 g-md-3">
                  <div className="col-12">
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Test Title *
                    </label>
                    <input 
                      type="text" 
                      className="form-control form-control-sm bg-white text-dark border-light" 
                      value={editTest.title}
                      onChange={(e) => setEditTest({ ...editTest, title: e.target.value })}
                      required
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                    />
                  </div>
                  <div className="col-12">
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Description
                    </label>
                    <textarea 
                      rows={2}
                      className="form-control form-control-sm bg-white text-dark border-light" 
                      value={editTest.description || ''}
                      onChange={(e) => setEditTest({ ...editTest, description: e.target.value })}
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px', resize: 'none' }}
                    />
                  </div>
                  <div className="col-6">
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Type
                    </label>
                    <select 
                      className="form-select form-select-sm bg-white text-dark border-light" 
                      value={editTest.type || 'aptitude'}
                      onChange={(e) => setEditTest({ ...editTest, type: e.target.value })}
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                    >
                      <option value="aptitude">Aptitude</option>
                      <option value="technical">Technical</option>
                      <option value="coding">Coding</option>
                      <option value="mock">Mock</option>
                    </select>
                  </div>
                  <div className="col-6">
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Difficulty
                    </label>
                    <select 
                      className="form-select form-select-sm bg-white text-dark border-light" 
                      value={editTest.difficulty || 'medium'}
                      onChange={(e) => setEditTest({ ...editTest, difficulty: e.target.value })}
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                  <div className="col-4">
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Duration (min) *
                    </label>
                    <input 
                      type="number" 
                      className="form-control form-control-sm bg-white text-dark border-light" 
                      value={editTest.duration || ''}
                      onChange={(e) => setEditTest({ ...editTest, duration: e.target.value })}
                      required
                      min="1"
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                    />
                  </div>
                  <div className="col-4">
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Total Marks
                    </label>
                    <input 
                      type="number" 
                      className="form-control form-control-sm bg-white text-dark border-light" 
                      value={editTest.totalMarks || ''}
                      onChange={(e) => setEditTest({ ...editTest, totalMarks: e.target.value })}
                      min="1"
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                    />
                  </div>
                  <div className="col-4">
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Passing Marks
                    </label>
                    <input 
                      type="number" 
                      className="form-control form-control-sm bg-white text-dark border-light" 
                      value={editTest.passingMarks || ''}
                      onChange={(e) => setEditTest({ ...editTest, passingMarks: e.target.value })}
                      min="1"
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                    />
                  </div>
                  <div className="col-12">
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Scheduled Date
                    </label>
                    <input 
                      type="datetime-local" 
                      className="form-control form-control-sm bg-white text-dark border-light" 
                      value={editTest.scheduledDate ? editTest.scheduledDate.slice(0, 16) : ''}
                      onChange={(e) => setEditTest({ ...editTest, scheduledDate: e.target.value })}
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                    />
                  </div>
                  <div className="col-12">
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Status
                    </label>
                    <select 
                      className="form-select form-select-sm bg-white text-dark border-light" 
                      value={editTest.status || 'draft'}
                      onChange={(e) => setEditTest({ ...editTest, status: e.target.value })}
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="scheduled">Scheduled</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-top border-light d-flex gap-2 flex-wrap">
                  <button onClick={() => { setShowEditModal(false); setEditTest(null); }} type="button" className="btn btn-secondary flex-grow-1" style={{ borderRadius: '10px', fontWeight: '600', fontSize: 'clamp(0.6rem, 1vw, 0.7rem)', padding: '0.35rem 0.7rem' }}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-warning flex-grow-1 shadow-sm" disabled={loading} style={{ borderRadius: '10px', fontWeight: '600', fontSize: 'clamp(0.6rem, 1vw, 0.7rem)', padding: '0.35rem 0.7rem' }}>
                    {loading ? <Loader2 className="spinner-border spinner-border-sm" style={{ width: 'clamp(0.6rem, 1vw, 0.8rem)', height: 'clamp(0.6rem, 1vw, 0.8rem)' }} /> : <Save style={{ width: 'clamp(0.6rem, 1vw, 0.8rem)', height: 'clamp(0.6rem, 1vw, 0.8rem)' }} />}
                    {loading ? 'Updating...' : 'Update Test'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedTest && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ 
          zIndex: 9999, 
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(5px)',
          animation: 'fadeIn 0.3s ease',
          padding: '1rem'
        }}>
          <div className="card border-0 shadow-lg rounded-4" style={{ 
            maxWidth: 'clamp(320px, 90vw, 600px)', 
            width: '100%', 
            maxHeight: '90vh', 
            overflowY: 'auto', 
            background: '#ffffff' 
          }}>
            <div className="card-body p-3 p-md-4">
              <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3 border-bottom border-light pb-3">
                <h5 className="text-dark fw-bold m-0 d-flex align-items-center gap-2" style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)' }}>
                  <Eye className="text-info" style={{ 
                    width: 'clamp(0.9rem, 2vw, 1.2rem)', 
                    height: 'clamp(0.9rem, 2vw, 1.2rem)' 
                  }} />
                  Test Details
                </h5>
                <button onClick={() => setShowDetailModal(false)} className="btn btn-close" style={{ fontSize: 'clamp(0.6rem, 1vw, 0.9rem)' }}></button>
              </div>

              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="d-inline-flex align-items-center justify-content-center rounded-circle flex-shrink-0" style={{ 
                  width: 'clamp(40px, 7vw, 48px)', 
                  height: 'clamp(40px, 7vw, 48px)',
                  background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                  fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                  fontWeight: 'bold',
                  color: '#fff'
                }}>
                  {selectedTest.title?.charAt(0) || 'T'}
                </div>
                <div className="min-w-0">
                  <h5 className="text-dark fw-bold m-0" style={{ fontSize: 'clamp(0.9rem, 2vw, 1.05rem)' }}>
                    {selectedTest.title}
                  </h5>
                  <span className={`badge bg-${getStatusColor(selectedTest.isActive ? 'published' : selectedTest.status)} bg-opacity-10 text-${getStatusColor(selectedTest.isActive ? 'published' : selectedTest.status)} border border-${getStatusColor(selectedTest.isActive ? 'published' : selectedTest.status)}`}
                        style={{ fontSize: 'clamp(0.45rem, 0.8vw, 0.55rem)' }}>
                    {selectedTest.isActive ? 'Published' : selectedTest.status || 'Draft'}
                  </span>
                </div>
              </div>

              {selectedTest.description && (
                <div className="mb-3 p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.03)' }}>
                  <p className="text-secondary small mb-0" style={{ fontSize: 'clamp(0.6rem, 1vw, 0.7rem)' }}>{selectedTest.description}</p>
                </div>
              )}

              <div className="space-y-2">
                <div className="d-flex flex-wrap justify-content-between p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.03)' }}>
                  <span className="text-secondary" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>
                    <Award className="me-1" style={{ 
                      width: 'clamp(0.6rem, 1vw, 0.8rem)', 
                      height: 'clamp(0.6rem, 1vw, 0.8rem)' 
                    }} /> Type
                  </span>
                  <span className={`badge bg-${getTypeColor(selectedTest.type)} bg-opacity-10 text-${getTypeColor(selectedTest.type)}`}
                        style={{ fontSize: 'clamp(0.45rem, 0.8vw, 0.55rem)' }}>
                    {getTypeLabel(selectedTest.type)}
                  </span>
                </div>
                <div className="d-flex flex-wrap justify-content-between p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.03)' }}>
                  <span className="text-secondary" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>
                    <FileText className="me-1" style={{ 
                      width: 'clamp(0.6rem, 1vw, 0.8rem)', 
                      height: 'clamp(0.6rem, 1vw, 0.8rem)' 
                    }} /> Questions
                  </span>
                  <span className="text-dark fw-bold" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>{selectedTest.questions?.length || 0}</span>
                </div>
                <div className="d-flex flex-wrap justify-content-between p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.03)' }}>
                  <span className="text-secondary" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>
                    <Clock className="me-1" style={{ 
                      width: 'clamp(0.6rem, 1vw, 0.8rem)', 
                      height: 'clamp(0.6rem, 1vw, 0.8rem)' 
                    }} /> Duration
                  </span>
                  <span className="text-dark fw-bold" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>{selectedTest.duration || 0} min</span>
                </div>
                <div className="d-flex flex-wrap justify-content-between p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.03)' }}>
                  <span className="text-secondary" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>
                    <Target className="me-1" style={{ 
                      width: 'clamp(0.6rem, 1vw, 0.8rem)', 
                      height: 'clamp(0.6rem, 1vw, 0.8rem)' 
                    }} /> Difficulty
                  </span>
                  <span className={`text-${getDifficultyColor(selectedTest.difficulty)} fw-bold`} style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>
                    {selectedTest.difficulty || 'Medium'}
                  </span>
                </div>
                <div className="d-flex flex-wrap justify-content-between p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.03)' }}>
                  <span className="text-secondary" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>
                    <Hash className="me-1" style={{ 
                      width: 'clamp(0.6rem, 1vw, 0.8rem)', 
                      height: 'clamp(0.6rem, 1vw, 0.8rem)' 
                    }} /> Total Marks
                  </span>
                  <span className="text-primary fw-bold" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>{selectedTest.totalMarks || 100}</span>
                </div>
                {selectedTest.passingMarks && (
                  <div className="d-flex flex-wrap justify-content-between p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.03)' }}>
                    <span className="text-secondary" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>
                      <CheckCircle className="me-1" style={{ 
                        width: 'clamp(0.6rem, 1vw, 0.8rem)', 
                        height: 'clamp(0.6rem, 1vw, 0.8rem)' 
                      }} /> Passing Marks
                    </span>
                    <span className="text-success fw-bold" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>{selectedTest.passingMarks}</span>
                  </div>
                )}
                <div className="d-flex flex-wrap justify-content-between p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.03)' }}>
                  <span className="text-secondary" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>
                    <Calendar className="me-1" style={{ 
                      width: 'clamp(0.6rem, 1vw, 0.8rem)', 
                      height: 'clamp(0.6rem, 1vw, 0.8rem)' 
                    }} /> Scheduled
                  </span>
                  <span className="text-dark" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>
                    {selectedTest.scheduledDate ? formatDate(selectedTest.scheduledDate) : 'Not scheduled'}
                  </span>
                </div>
                <div className="d-flex flex-wrap justify-content-between p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.03)' }}>
                  <span className="text-secondary" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>
                    <Clock className="me-1" style={{ 
                      width: 'clamp(0.6rem, 1vw, 0.8rem)', 
                      height: 'clamp(0.6rem, 1vw, 0.8rem)' 
                    }} /> Created
                  </span>
                  <span className="text-dark" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>{formatDate(selectedTest.createdAt)}</span>
                </div>
              </div>

              {selectedTest.questions && selectedTest.questions.length > 0 && (
                <div className="mt-3">
                  <h6 className="text-secondary text-uppercase fw-bold" style={{ fontSize: 'clamp(0.45rem, 0.7vw, 0.55rem)' }}>
                    Questions ({selectedTest.questions.length})
                  </h6>
                  <div className="space-y-2 mt-2" style={{ maxHeight: 'clamp(150px, 25vh, 200px)', overflowY: 'auto' }}>
                    {selectedTest.questions.map((q, idx) => (
                      <div key={q._id || idx} className="p-2 rounded-3" style={{ background: 'rgba(0,0,0,0.03)' }}>
                        <p className="text-dark small mb-1" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>
                          <span className="text-secondary">Q{idx + 1}:</span> {q.question}
                        </p>
                        <div className="d-flex flex-wrap gap-1 gap-md-2">
                          {q.options && q.options.map((opt, oi) => (
                            <span key={oi} className={`text-secondary small ${q.correctAnswer === oi ? 'text-success fw-bold' : ''}`} style={{ fontSize: 'clamp(0.45rem, 0.7vw, 0.55rem)' }}>
                              {opt} {q.correctAnswer === oi && '✓'}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-3 pt-3 border-top border-light d-flex gap-2 flex-wrap">
                <button onClick={() => setShowDetailModal(false)} className="btn btn-secondary flex-grow-1" style={{ borderRadius: '10px', fontWeight: '600', fontSize: 'clamp(0.6rem, 1vw, 0.7rem)', padding: '0.35rem 0.7rem' }}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Question Modal */}
      {showAddQuestionModal && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ 
          zIndex: 9999, 
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(5px)',
          animation: 'fadeIn 0.3s ease',
          padding: '1rem'
        }}>
          <div className="card border-0 shadow-lg rounded-4" style={{ 
            maxWidth: 'clamp(320px, 90vw, 600px)', 
            width: '100%', 
            maxHeight: '90vh', 
            overflowY: 'auto', 
            background: '#ffffff' 
          }}>
            <div className="card-body p-3 p-md-4">
              <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3 border-bottom border-light pb-3">
                <h5 className="text-dark fw-bold m-0 d-flex align-items-center gap-2" style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)' }}>
                  <BookOpen className="text-success" style={{ 
                    width: 'clamp(0.9rem, 2vw, 1.2rem)', 
                    height: 'clamp(0.9rem, 2vw, 1.2rem)' 
                  }} />
                  Add Question
                </h5>
                <button onClick={() => setShowAddQuestionModal(false)} className="btn btn-close" style={{ fontSize: 'clamp(0.6rem, 1vw, 0.9rem)' }}></button>
              </div>

              <form onSubmit={handleAddQuestion}>
                <div className="row g-2 g-md-3">
                  <div className="col-12">
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Question *
                    </label>
                    <textarea 
                      rows={2}
                      className="form-control form-control-sm bg-white text-dark border-light" 
                      placeholder="Enter question"
                      value={newQuestion.question}
                      onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                      required
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px', resize: 'none' }}
                    />
                  </div>
                  <div className="col-12">
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Options
                    </label>
                    {[0, 1, 2, 3].map((i) => (
                      <input 
                        key={i}
                        type="text" 
                        className="form-control form-control-sm bg-white text-dark border-light mb-1" 
                        placeholder={`Option ${String.fromCharCode(65 + i)}`}
                        value={newQuestion.options[i]}
                        onChange={(e) => {
                          const newOptions = [...newQuestion.options];
                          newOptions[i] = e.target.value;
                          setNewQuestion({ ...newQuestion, options: newOptions });
                        }}
                        style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                      />
                    ))}
                  </div>
                  <div className="col-6">
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Correct Answer
                    </label>
                    <select 
                      className="form-select form-select-sm bg-white text-dark border-light" 
                      value={newQuestion.correctAnswer}
                      onChange={(e) => setNewQuestion({ ...newQuestion, correctAnswer: parseInt(e.target.value) })}
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                    >
                      {[0, 1, 2, 3].map((i) => (
                        <option key={i} value={i}>Option {String.fromCharCode(65 + i)}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-6">
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Marks
                    </label>
                    <input 
                      type="number" 
                      className="form-control form-control-sm bg-white text-dark border-light" 
                      value={newQuestion.marks}
                      onChange={(e) => setNewQuestion({ ...newQuestion, marks: parseInt(e.target.value) || 1 })}
                      min="1"
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                    />
                  </div>
                  <div className="col-6">
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Category
                    </label>
                    <select 
                      className="form-select form-select-sm bg-white text-dark border-light" 
                      value={newQuestion.category}
                      onChange={(e) => setNewQuestion({ ...newQuestion, category: e.target.value })}
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                    >
                      <option value="aptitude">Aptitude</option>
                      <option value="technical">Technical</option>
                      <option value="coding">Coding</option>
                      <option value="logical">Logical</option>
                      <option value="verbal">Verbal</option>
                    </select>
                  </div>
                  <div className="col-6">
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Difficulty
                    </label>
                    <select 
                      className="form-select form-select-sm bg-white text-dark border-light" 
                      value={newQuestion.difficulty}
                      onChange={(e) => setNewQuestion({ ...newQuestion, difficulty: e.target.value })}
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-top border-light d-flex gap-2 flex-wrap">
                  <button onClick={() => setShowAddQuestionModal(false)} type="button" className="btn btn-secondary flex-grow-1" style={{ borderRadius: '10px', fontWeight: '600', fontSize: 'clamp(0.6rem, 1vw, 0.7rem)', padding: '0.35rem 0.7rem' }}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-success flex-grow-1 shadow-sm" disabled={loading} style={{ borderRadius: '10px', fontWeight: '600', fontSize: 'clamp(0.6rem, 1vw, 0.7rem)', padding: '0.35rem 0.7rem' }}>
                    {loading ? <Loader2 className="spinner-border spinner-border-sm" style={{ width: 'clamp(0.6rem, 1vw, 0.8rem)', height: 'clamp(0.6rem, 1vw, 0.8rem)' }} /> : <Plus style={{ width: 'clamp(0.6rem, 1vw, 0.8rem)', height: 'clamp(0.6rem, 1vw, 0.8rem)' }} />}
                    {loading ? 'Adding...' : 'Add Question'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {showDeleteConfirm && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ 
          zIndex: 9999, 
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(5px)',
          animation: 'fadeIn 0.3s ease',
          padding: '1rem'
        }}>
          <div className="card border-0 shadow-lg rounded-4" style={{ 
            maxWidth: 'clamp(320px, 85vw, 400px)', 
            width: '100%', 
            background: '#ffffff' 
          }}>
            <div className="card-body p-3 p-md-4 text-center">
              <div className="mb-3">
                <div className="bg-danger bg-opacity-10 p-3 rounded-circle d-inline-flex border border-danger border-opacity-25">
                  <AlertCircle className="text-danger" style={{ 
                    width: 'clamp(1.5rem, 4vw, 2rem)', 
                    height: 'clamp(1.5rem, 4vw, 2rem)' 
                  }} />
                </div>
              </div>
              <h5 className="text-dark fw-bold" style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)' }}>Delete Test</h5>
              <p className="text-secondary small mb-3" style={{ fontSize: 'clamp(0.65rem, 1.2vw, 0.75rem)' }}>Are you sure you want to delete this test? This action cannot be undone.</p>
              <div className="d-flex gap-2">
                <button onClick={() => { setShowDeleteConfirm(false); setDeleteTarget(null); }} className="btn btn-secondary flex-grow-1" style={{ fontSize: 'clamp(0.6rem, 1vw, 0.7rem)', padding: '0.35rem 0.7rem' }}>
                  Cancel
                </button>
                <button onClick={handleDeleteTest} className="btn btn-danger flex-grow-1" disabled={loading} style={{ fontSize: 'clamp(0.6rem, 1vw, 0.7rem)', padding: '0.35rem 0.7rem' }}>
                  {loading ? <Loader2 className="spinner-border spinner-border-sm" style={{ width: 'clamp(0.6rem, 1vw, 0.8rem)', height: 'clamp(0.6rem, 1vw, 0.8rem)' }} /> : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Action Modal */}
      {showBulkActionModal && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ 
          zIndex: 9999, 
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(5px)',
          animation: 'fadeIn 0.3s ease',
          padding: '1rem'
        }}>
          <div className="card border-0 shadow-lg rounded-4" style={{ 
            maxWidth: 'clamp(320px, 85vw, 400px)', 
            width: '100%', 
            background: '#ffffff' 
          }}>
            <div className="card-body p-3 p-md-4 text-center">
              <div className="mb-3">
                <div className="bg-danger bg-opacity-10 p-3 rounded-circle d-inline-flex border border-danger border-opacity-25">
                  <AlertCircle className="text-danger" style={{ 
                    width: 'clamp(1.5rem, 4vw, 2rem)', 
                    height: 'clamp(1.5rem, 4vw, 2rem)' 
                  }} />
                </div>
              </div>
              <h5 className="text-dark fw-bold" style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)' }}>Delete Selected Questions</h5>
              <p className="text-secondary small mb-3" style={{ fontSize: 'clamp(0.65rem, 1.2vw, 0.75rem)' }}>Are you sure you want to delete {selectedQuestions.length} selected questions? This action cannot be undone.</p>
              <div className="d-flex gap-2">
                <button onClick={() => { setShowBulkActionModal(false); setBulkAction(''); }} className="btn btn-secondary flex-grow-1" style={{ fontSize: 'clamp(0.6rem, 1vw, 0.7rem)', padding: '0.35rem 0.7rem' }}>
                  Cancel
                </button>
                <button onClick={handleBulkDeleteQuestions} className="btn btn-danger flex-grow-1" disabled={loading} style={{ fontSize: 'clamp(0.6rem, 1vw, 0.7rem)', padding: '0.35rem 0.7rem' }}>
                  {loading ? <Loader2 className="spinner-border spinner-border-sm" style={{ width: 'clamp(0.6rem, 1vw, 0.8rem)', height: 'clamp(0.6rem, 1vw, 0.8rem)' }} /> : 'Delete All'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        .transition-all {
          transition: all 0.3s ease;
        }
        
        .hover\\:translate-y-2:hover {
          transform: translateY(-8px);
        }
        
        .hover\\:scale-105:hover {
          transform: scale(1.05);
        }
        
        .space-y-2 > * + * {
          margin-top: 0.5rem;
        }
        
        .space-y-3 > * + * {
          margin-top: 0.75rem;
        }
        
        .card {
          transition: all 0.3s ease;
        }
        
        .card:hover {
          box-shadow: 0 10px 30px rgba(0,0,0,0.1) !important;
        }
        
        .form-control, .form-select {
          transition: all 0.3s ease;
        }
        
        .form-control:focus, .form-select:focus {
          border-color: rgba(79, 70, 229, 0.5) !important;
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1) !important;
        }

        .min-w-0 {
          min-width: 0;
        }
        
        .spinner-border {
          animation: spinner-border 0.75s linear infinite;
        }
        
        @keyframes spinner-border {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 576px) {
          .card-body {
            padding: 0.75rem !important;
          }
          .gap-1 {
            gap: 0.25rem !important;
          }
          .btn {
            padding: 0.15rem 0.3rem !important;
          }
          .badge {
            padding: 0.1rem 0.3rem !important;
          }
          .rounded-3 {
            border-radius: 8px !important;
          }
          .rounded-md-4 {
            border-radius: 10px !important;
          }
        }

        @media (min-width: 768px) and (max-width: 991px) {
          .card-body {
            padding: 1rem !important;
          }
        }
        
        ::-webkit-scrollbar {
          width: 4px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.05);
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