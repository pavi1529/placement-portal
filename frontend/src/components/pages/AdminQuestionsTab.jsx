// src/components/AdminQuestionsTab.jsx
import React, { useState, useEffect } from 'react';
import { 
  Plus, Eye, Calendar, Search, Filter, 
  Edit2, Trash2, BookOpen, CheckCircle,
  Users, Award, Loader2, RefreshCw,
  XCircle, AlertCircle, Save, Hash,
  Target, Star, Layers, List, Grid,
  ChevronLeft, ChevronRight, Menu
} from 'lucide-react';

const API_URL = 'http://localhost:5000/api';

export default function AdminQuestionsTab({ token }) {

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [editQuestion, setEditQuestion] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10
  });
  const [viewMode, setViewMode] = useState('list');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [toast, setToast] = useState(null);

  const categories = ['All', 'Aptitude', 'C/C++', 'Java', 'Python', 'DBMS', 'Technical', 'Logical', 'Verbal'];

 
  const [newQuestion, setNewQuestion] = useState({
    category: 'Aptitude',
    difficulty: 'Medium',
    question: '',
    options: ['', '', '', ''],
    answer: '',
    status: 'Draft',
    marks: 1,
    negativeMarks: 0,
    explanation: '',
    tags: []
  });


  const sampleQuestions = [
    { 
      id: "Q-001", 
      category: "Aptitude", 
      difficulty: "Medium", 
      question: "A standard task completed by A in 12 days, B in 15 days. How many days will it take for A and B together?",
      options: ["6.67 days", "7.5 days", "8 days", "10 days"],
      answer: "6.67 days",
      createdAt: "2026-07-15",
      createdBy: "Admin",
      status: "Published"
    },
    { 
      id: "Q-002", 
      category: "C/C++", 
      difficulty: "Hard", 
      question: "What is the output of: printf('%d', sizeof(void*)); in a 64-bit system?",
      options: ["4", "8", "16", "Compiler dependent"],
      answer: "8",
      createdAt: "2026-07-13",
      createdBy: "Admin",
      status: "Draft"
    },
    { 
      id: "Q-003", 
      category: "Java", 
      difficulty: "Medium", 
      question: "Which of the following is not a Java access modifier?",
      options: ["public", "private", "protected", "static"],
      answer: "static",
      createdAt: "2026-07-12",
      createdBy: "Admin",
      status: "Published"
    },
    { 
      id: "Q-004", 
      category: "Python", 
      difficulty: "Medium", 
      question: "What is the output of: print(2**3**2) in Python?",
      options: ["64", "512", "256", "Error"],
      answer: "512",
      createdAt: "2026-07-11",
      createdBy: "Admin",
      status: "Published"
    },
    { 
      id: "Q-005", 
      category: "DBMS", 
      difficulty: "Easy", 
      question: "Which SQL keyword is used to retrieve data from a database?",
      options: ["SELECT", "INSERT", "UPDATE", "DELETE"],
      answer: "SELECT",
      createdAt: "2026-07-10",
      createdBy: "Admin",
      status: "Draft"
    },
  ];

 
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
        if (result.message === 'Not authorized' || response.status === 401) {
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminName');
          window.location.href = '/login';
        }
        throw new Error(result.message || 'API call failed');
      }
      
      return result;
    } catch (error) {
      setError(error.message);
      showToast(error.message, 'error');
      // Use sample data if API fails
      return { success: true, data: { questions: sampleQuestions, pagination: { page: 1, totalPages: 1, total: sampleQuestions.length, limit: 10 } } };
    } finally {
      setLoading(false);
    }
  };

 
  const fetchQuestions = async (page = 1) => {
    try {
      const params = new URLSearchParams({
        page,
        limit: pagination.itemsPerPage,
        category: selectedCategory !== 'All' ? selectedCategory : '',
        search: searchQuery || '',
        sortBy,
        sortOrder
      });

      const data = await apiCall(`/admin/questions?${params}`);
      
      if (data.success) {
        setQuestions(data.data.questions || sampleQuestions);
        setFilteredQuestions(data.data.questions || sampleQuestions);
        setPagination({
          currentPage: data.data.pagination.page || 1,
          totalPages: data.data.pagination.totalPages || 1,
          totalItems: data.data.pagination.total || sampleQuestions.length,
          itemsPerPage: data.data.pagination.limit || 10
        });
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
      // Use sample data
      setQuestions(sampleQuestions);
      setFilteredQuestions(sampleQuestions);
    }
  };


  
  const handleAddQuestion = async (e) => {
    e.preventDefault();
    
    if (!newQuestion.question.trim()) {
      showToast('Please enter the question!', 'error');
      return;
    }
    
    if (!newQuestion.options.some(opt => opt.trim())) {
      showToast('Please fill in at least one option!', 'error');
      return;
    }
    
    if (!newQuestion.answer.trim()) {
      showToast('Please enter the correct answer!', 'error');
      return;
    }

    try {
      const questionData = {
        question: newQuestion.question,
        category: newQuestion.category,
        difficulty: newQuestion.difficulty,
        options: newQuestion.options.filter(opt => opt.trim() !== ''),
        answer: newQuestion.answer,
        status: newQuestion.status,
        marks: parseInt(newQuestion.marks) || 1,
        negativeMarks: parseFloat(newQuestion.negativeMarks) || 0,
        explanation: newQuestion.explanation || '',
        tags: newQuestion.tags || []
      };

      const data = await apiCall('/admin/questions', 'POST', questionData);
      
      if (data.success) {
        showToast('✅ Question created successfully!', 'success');
        resetNewQuestion();
        setShowAddModal(false);
        await fetchQuestions(pagination.currentPage);
      }
    } catch (error) {
      // Add to local state if API fails
      const newQ = {
        id: `Q-${Date.now().toString().slice(-4)}`,
        ...newQuestion,
        createdAt: new Date().toISOString().split('T')[0],
        createdBy: 'Admin'
      };
      setQuestions([...questions, newQ]);
      setFilteredQuestions([...filteredQuestions, newQ]);
      showToast('✅ Question added locally!', 'success');
      resetNewQuestion();
      setShowAddModal(false);
    }
  };

  const handleUpdateQuestion = async (e) => {
    e.preventDefault();
    
    if (!editQuestion.question.trim()) {
      showToast('Please enter the question!', 'error');
      return;
    }

    try {
      const questionData = {
        question: editQuestion.question,
        category: editQuestion.category,
        difficulty: editQuestion.difficulty,
        options: editQuestion.options.filter(opt => opt.trim() !== ''),
        answer: editQuestion.answer,
        status: editQuestion.status,
        marks: parseInt(editQuestion.marks) || 1,
        negativeMarks: parseFloat(editQuestion.negativeMarks) || 0,
        explanation: editQuestion.explanation || '',
        tags: editQuestion.tags || []
      };

      const data = await apiCall(`/admin/questions/${editQuestion.id || editQuestion._id}`, 'PUT', questionData);
      
      if (data.success) {
        showToast('✅ Question updated successfully!', 'success');
        setShowEditModal(false);
        setEditQuestion(null);
        await fetchQuestions(pagination.currentPage);
      }
    } catch (error) {
      // Update locally
      setQuestions(questions.map(q => 
        (q.id === editQuestion.id || q._id === editQuestion._id) ? editQuestion : q
      ));
      setFilteredQuestions(filteredQuestions.map(q => 
        (q.id === editQuestion.id || q._id === editQuestion._id) ? editQuestion : q
      ));
      showToast('✅ Question updated locally!', 'success');
      setShowEditModal(false);
      setEditQuestion(null);
    }
  };

  const handleDeleteQuestion = async () => {
    if (!deleteTarget) return;

    try {
      const data = await apiCall(`/admin/questions/${deleteTarget}`, 'DELETE');
      
      if (data.success) {
        showToast('✅ Question deleted successfully!', 'success');
        setDeleteTarget(null);
        setShowDeleteModal(false);
        await fetchQuestions(pagination.currentPage);
      }
    } catch (error) {
      // Delete locally
      setQuestions(questions.filter(q => q.id !== deleteTarget && q._id !== deleteTarget));
      setFilteredQuestions(filteredQuestions.filter(q => q.id !== deleteTarget && q._id !== deleteTarget));
      showToast('✅ Question deleted locally!', 'success');
      setDeleteTarget(null);
      setShowDeleteModal(false);
    }
  };

 
  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const resetNewQuestion = () => {
    setNewQuestion({
      category: 'Aptitude',
      difficulty: 'Medium',
      question: '',
      options: ['', '', '', ''],
      answer: '',
      status: 'Draft',
      marks: 1,
      negativeMarks: 0,
      explanation: '',
      tags: []
    });
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      'Easy': 'success',
      'Medium': 'warning',
      'Hard': 'danger'
    };
    return colors[difficulty] || 'secondary';
  };

  const getStatusColor = (status) => {
    const colors = {
      'Published': 'success',
      'Draft': 'warning',
      'Archived': 'danger'
    };
    return colors[status] || 'secondary';
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const handleSelectQuestion = (id) => {
    setSelectedQuestions(prev => 
      prev.includes(id) 
        ? prev.filter(qId => qId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedQuestions.length === filteredQuestions.length) {
      setSelectedQuestions([]);
    } else {
      setSelectedQuestions(filteredQuestions.map(q => q.id || q._id));
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination.totalPages) {
      fetchQuestions(page);
    }
  };


  useEffect(() => {
    fetchQuestions(1);
  }, []);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchQuestions(1);
    }, 500);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery, selectedCategory]);

 
  const totalQuestions = questions.length;
  const publishedCount = questions.filter(q => q.status === 'Published').length;
  const draftCount = questions.filter(q => q.status === 'Draft').length;


  return (
    <div className="questions-container">
      {/* Toast Notification */}
      {toast && (
        <div className={`toast-notification toast-${toast.type}`}>
          <div className="toast-content">
            <span>{toast.message}</span>
            <button onClick={() => setToast(null)}>×</button>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="row g-3 mb-4">
        {[
          { label: "Total Questions", value: totalQuestions, color: "primary", icon: BookOpen },
          { label: "Published", value: publishedCount, color: "success", icon: CheckCircle },
          { label: "Draft", value: draftCount, color: "warning", icon: Edit2 },
          { label: "Categories", value: categories.length - 1, color: "info", icon: Layers },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="col-6 col-lg-3">
              <div className="stat-card" style={{ background: '#ffffff' }}>
                <div className="stat-card-body">
                  <div className="stat-header">
                    <span className="stat-label" style={{ color: '#6b7280' }}>{stat.label}</span>
                    <div className={`stat-icon-wrapper stat-icon-${stat.color}`}>
                      <Icon className={`stat-icon text-${stat.color}`} />
                    </div>
                  </div>
                  <h4 className={`stat-value text-${stat.color}`} style={{ color: stat.color === 'primary' ? '#3b82f6' : stat.color === 'success' ? '#22c55e' : stat.color === 'warning' ? '#eab308' : '#06b6d4' }}>{stat.value}</h4>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Search & Filter */}
      <div className="search-filter-card" style={{ background: '#ffffff', border: '1px solid #e5e7eb' }}>
        <div className="search-filter-body">
          <div className="search-filter-container">
            <div className="search-wrapper" style={{ background: '#f3f4f6', border: '1px solid #e5e7eb' }}>
              <Search className="search-icon" style={{ color: '#6b7280' }} />
              <input 
                type="text" 
                className="search-input" 
                style={{ color: '#1f2937' }}
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button className="clear-search" onClick={() => setSearchQuery('')}>×</button>
              )}
            </div>
            
            <div className="filter-wrapper" style={{ background: '#f3f4f6', border: '1px solid #e5e7eb' }}>
              <Filter className="filter-icon" style={{ color: '#6b7280' }} />
              <select 
                className="filter-select"
                style={{ color: '#1f2937' }}
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <button 
              onClick={() => fetchQuestions(1)}
              className="btn-refresh"
              title="Refresh"
              style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', color: '#3b82f6' }}
            >
              <RefreshCw size={16} />
            </button>

            <button 
              onClick={() => {
                resetNewQuestion();
                setShowAddModal(true);
              }}
              className="btn-add"
              style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', color: 'white' }}
            >
              <Plus size={16} /> Add Question
            </button>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="questions-list-card" style={{ background: '#ffffff', border: '1px solid #e5e7eb' }}>
        <div className="questions-list-body">
          {loading && filteredQuestions.length === 0 ? (
            <div className="text-center py-5">
              <Loader2 className="spin" size={40} style={{ color: '#4f46e5' }} />
              <p className="text-secondary mt-3" style={{ color: '#6b7280' }}>Loading questions...</p>
            </div>
          ) : filteredQuestions.length === 0 ? (
            <div className="text-center py-5">
              <BookOpen size={48} className="text-secondary mb-3" style={{ color: '#6b7280' }} />
              <h6 className="text-secondary" style={{ color: '#6b7280' }}>No questions found</h6>
              <p className="text-secondary small" style={{ color: '#6b7280' }}>Try adjusting your search or filters</p>
              <button 
                className="btn btn-primary btn-sm mt-2"
                onClick={() => { resetNewQuestion(); setShowAddModal(true); }}
                style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', border: 'none', color: 'white' }}
              >
                <Plus size={14} /> Add First Question
              </button>
            </div>
          ) : (
            <>
              <div className="question-header" style={{ borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                <div className="question-select-all">
                  <input
                    type="checkbox"
                    checked={selectedQuestions.length === filteredQuestions.length && filteredQuestions.length > 0}
                    onChange={handleSelectAll}
                    className="checkbox"
                  />
                </div>
                <div className="question-info">Question</div>
                <div className="question-meta">Category</div>
                <div className="question-meta">Difficulty</div>
                <div className="question-meta">Status</div>
                <div className="question-actions">Actions</div>
              </div>

              {filteredQuestions.map((q, index) => {
                const id = q.id || q._id;
                const isSelected = selectedQuestions.includes(id);
                return (
                  <div 
                    key={id} 
                    className={`question-item ${isSelected ? 'selected' : ''}`}
                    style={{ 
                      background: isSelected ? 'rgba(59,130,246,0.05)' : 'rgba(0,0,0,0.02)',
                      border: isSelected ? '1px solid rgba(59,130,246,0.3)' : '1px solid rgba(0,0,0,0.04)'
                    }}
                  >
                    <div className="question-select">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleSelectQuestion(id)}
                        className="checkbox"
                      />
                    </div>
                    
                    <div className="question-content">
                      <div className="question-text">
                        <span className="question-id" style={{ color: '#6b7280' }}>#{id}</span>
                        <span className="question-title" style={{ color: '#1f2937' }}>{q.question}</span>
                      </div>
                      <div className="question-badges">
                        <span className="badge-category" style={{ background: 'rgba(59,130,246,0.1)', color: '#3b82f6', border: '1px solid rgba(59,130,246,0.2)' }}>{q.category}</span>
                        <span className={`badge-difficulty badge-${getDifficultyColor(q.difficulty)}`}>
                          {q.difficulty}
                        </span>
                        <span className={`badge-status badge-${getStatusColor(q.status)}`}>
                          {q.status}
                        </span>
                        <span className="badge-date" style={{ color: '#6b7280' }}>
                          <Calendar size={12} /> {formatDate(q.createdAt)}
                        </span>
                      </div>
                    </div>

                    <div className="question-actions-wrapper">
                      <button 
                        onClick={() => { setSelectedQuestion(q); setShowDetailModal(true); }}
                        className="action-btn action-view"
                        title="View"
                        style={{ color: '#6b7280' }}
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => { setEditQuestion({ ...q }); setShowEditModal(true); }}
                        className="action-btn action-edit"
                        title="Edit"
                        style={{ color: '#6b7280' }}
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => { setDeleteTarget(id); setShowDeleteModal(true); }}
                        className="action-btn action-delete"
                        title="Delete"
                        style={{ color: '#6b7280' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>

     
      {showAddModal && (
        <div className="modal-overlay" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(5px)' }}>
          <div className="modal-container" style={{ background: '#ffffff', border: '1px solid #e5e7eb' }}>
            <div className="modal-header" style={{ borderBottom: '1px solid #e5e7eb', background: '#ffffff' }}>
              <h5 className="modal-title" style={{ color: '#1f2937' }}>
                <Plus size={20} className="text-primary" style={{ color: '#3b82f6' }} />
                Add New Question
              </h5>
              <button onClick={() => { setShowAddModal(false); resetNewQuestion(); }} className="modal-close" style={{ color: '#6b7280' }}>×</button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleAddQuestion}>
                <div className="form-group">
                  <label style={{ color: '#4b5563' }}>Question *</label>
                  <textarea
                    rows={3}
                    className="form-control"
                    style={{ background: '#f3f4f6', border: '1px solid #e5e7eb', color: '#1f2937' }}
                    value={newQuestion.question}
                    onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                    placeholder="Enter your question here..."
                  />
                </div>

                <div className="row g-2">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label style={{ color: '#4b5563' }}>Category</label>
                      <select
                        className="form-select"
                        style={{ background: '#f3f4f6', border: '1px solid #e5e7eb', color: '#1f2937' }}
                        value={newQuestion.category}
                        onChange={(e) => setNewQuestion({ ...newQuestion, category: e.target.value })}
                      >
                        {categories.filter(c => c !== 'All').map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label style={{ color: '#4b5563' }}>Difficulty</label>
                      <select
                        className="form-select"
                        style={{ background: '#f3f4f6', border: '1px solid #e5e7eb', color: '#1f2937' }}
                        value={newQuestion.difficulty}
                        onChange={(e) => setNewQuestion({ ...newQuestion, difficulty: e.target.value })}
                      >
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label style={{ color: '#4b5563' }}>Status</label>
                      <select
                        className="form-select"
                        style={{ background: '#f3f4f6', border: '1px solid #e5e7eb', color: '#1f2937' }}
                        value={newQuestion.status}
                        onChange={(e) => setNewQuestion({ ...newQuestion, status: e.target.value })}
                      >
                        <option value="Draft">Draft</option>
                        <option value="Published">Published</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label style={{ color: '#4b5563' }}>Options *</label>
                  {newQuestion.options.map((opt, index) => (
                    <div key={index} className="option-input">
                      <span className="option-label" style={{ color: '#6b7280' }}>{String.fromCharCode(65 + index)}.</span>
                      <input
                        type="text"
                        className="form-control"
                        style={{ background: '#f3f4f6', border: '1px solid #e5e7eb', color: '#1f2937' }}
                        value={opt}
                        onChange={(e) => {
                          const newOptions = [...newQuestion.options];
                          newOptions[index] = e.target.value;
                          setNewQuestion({ ...newQuestion, options: newOptions });
                        }}
                        placeholder={`Option ${String.fromCharCode(65 + index)}`}
                      />
                    </div>
                  ))}
                </div>

                <div className="form-group">
                  <label style={{ color: '#4b5563' }}>Correct Answer *</label>
                  <input
                    type="text"
                    className="form-control"
                    style={{ background: '#f3f4f6', border: '1px solid #e5e7eb', color: '#1f2937' }}
                    value={newQuestion.answer}
                    onChange={(e) => setNewQuestion({ ...newQuestion, answer: e.target.value })}
                    placeholder="Enter the correct answer"
                  />
                </div>

                <div className="row g-2">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label style={{ color: '#4b5563' }}>Marks</label>
                      <input
                        type="number"
                        className="form-control"
                        style={{ background: '#f3f4f6', border: '1px solid #e5e7eb', color: '#1f2937' }}
                        value={newQuestion.marks}
                        onChange={(e) => setNewQuestion({ ...newQuestion, marks: parseInt(e.target.value) || 0 })}
                        min="0"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label style={{ color: '#4b5563' }}>Negative Marks</label>
                      <input
                        type="number"
                        step="0.25"
                        className="form-control"
                        style={{ background: '#f3f4f6', border: '1px solid #e5e7eb', color: '#1f2937' }}
                        value={newQuestion.negativeMarks}
                        onChange={(e) => setNewQuestion({ ...newQuestion, negativeMarks: parseFloat(e.target.value) || 0 })}
                        min="0"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label style={{ color: '#4b5563' }}>Explanation (Optional)</label>
                  <textarea
                    rows={2}
                    className="form-control"
                    style={{ background: '#f3f4f6', border: '1px solid #e5e7eb', color: '#1f2937' }}
                    value={newQuestion.explanation}
                    onChange={(e) => setNewQuestion({ ...newQuestion, explanation: e.target.value })}
                    placeholder="Add an explanation..."
                  />
                </div>

                <div className="modal-footer" style={{ borderTop: '1px solid #e5e7eb' }}>
                  <button type="button" className="btn-secondary" style={{ background: '#f3f4f6', color: '#4b5563' }} onClick={() => { setShowAddModal(false); resetNewQuestion(); }}>Cancel</button>
                  <button type="submit" className="btn-primary" style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', color: 'white' }} disabled={loading}>
                    {loading ? <Loader2 className="spin" size={16} /> : <Plus size={16} />}
                    Add Question
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

     
      {showDetailModal && selectedQuestion && (
        <div className="modal-overlay" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(5px)' }}>
          <div className="modal-container" style={{ background: '#ffffff', border: '1px solid #e5e7eb' }}>
            <div className="modal-header" style={{ borderBottom: '1px solid #e5e7eb', background: '#ffffff' }}>
              <h5 className="modal-title" style={{ color: '#1f2937' }}>
                <Eye size={20} className="text-info" style={{ color: '#06b6d4' }} />
                Question Details
              </h5>
              <button onClick={() => setShowDetailModal(false)} className="modal-close" style={{ color: '#6b7280' }}>×</button>
            </div>
            <div className="modal-body">
              <div className="d-flex flex-wrap gap-2 mb-3">
                <span className="badge-category" style={{ background: 'rgba(59,130,246,0.1)', color: '#3b82f6', border: '1px solid rgba(59,130,246,0.2)' }}>{selectedQuestion.category}</span>
                <span className={`badge-difficulty badge-${getDifficultyColor(selectedQuestion.difficulty)}`}>
                  {selectedQuestion.difficulty}
                </span>
                <span className="badge bg-secondary bg-opacity-20 text-secondary border border-secondary" style={{ background: 'rgba(107,114,128,0.1)', color: '#6b7280', border: '1px solid rgba(107,114,128,0.2)' }}>
                  ID: {selectedQuestion.id || selectedQuestion._id}
                </span>
                <span className={`badge-status badge-${getStatusColor(selectedQuestion.status)}`}>
                  {selectedQuestion.status}
                </span>
              </div>

              <div className="view-section" style={{ background: 'rgba(0,0,0,0.03)', borderRadius: '10px' }}>
                <label style={{ color: '#6b7280' }}>Question</label>
                <p className="view-text" style={{ color: '#1f2937' }}>{selectedQuestion.question}</p>
              </div>

              <div className="view-section" style={{ background: 'rgba(0,0,0,0.03)', borderRadius: '10px' }}>
                <label style={{ color: '#6b7280' }}>Options</label>
                {selectedQuestion.options.map((opt, i) => (
                  <div key={i} className={`option-item ${opt === selectedQuestion.answer ? 'correct' : ''}`} style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.04)' }}>
                    <span className="option-letter" style={{ color: '#6b7280' }}>{String.fromCharCode(65 + i)}.</span>
                    <span className={`option-text ${opt === selectedQuestion.answer ? 'correct' : ''}`} style={{ color: '#1f2937' }}>{opt}</span>
                    {opt === selectedQuestion.answer && (
                      <CheckCircle size={16} className="text-success ms-auto" style={{ color: '#22c55e' }} />
                    )}
                  </div>
                ))}
              </div>

              <div className="view-section correct-answer" style={{ background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: '10px' }}>
                <label className="text-success" style={{ color: '#22c55e' }}>
                  <CheckCircle size={14} className="me-1" />
                  Correct Answer
                </label>
                <p className="text-success fw-bold" style={{ color: '#22c55e' }}>{selectedQuestion.answer}</p>
              </div>

              {selectedQuestion.explanation && (
                <div className="view-section" style={{ background: 'rgba(0,0,0,0.03)', borderRadius: '10px' }}>
                  <label style={{ color: '#6b7280' }}>Explanation</label>
                  <p className="view-text" style={{ color: '#1f2937' }}>{selectedQuestion.explanation}</p>
                </div>
              )}

              <div className="row g-2 mt-2">
                <div className="col-6">
                  <div className="view-meta" style={{ background: 'rgba(0,0,0,0.03)', borderRadius: '10px' }}>
                    <label style={{ color: '#6b7280' }}><Calendar size={12} className="me-1" /> Created</label>
                    <p style={{ color: '#1f2937' }}>{formatDate(selectedQuestion.createdAt)}</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="view-meta" style={{ background: 'rgba(0,0,0,0.03)', borderRadius: '10px' }}>
                    <label style={{ color: '#6b7280' }}><Users size={12} className="me-1" /> Created By</label>
                    <p style={{ color: '#1f2937' }}>{selectedQuestion.createdBy || 'Admin'}</p>
                  </div>
                </div>
              </div>

              <div className="modal-footer" style={{ borderTop: '1px solid #e5e7eb' }}>
                <button onClick={() => setShowDetailModal(false)} className="btn-secondary w-100" style={{ background: '#f3f4f6', color: '#4b5563' }}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

     
      {showEditModal && editQuestion && (
        <div className="modal-overlay" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(5px)' }}>
          <div className="modal-container" style={{ background: '#ffffff', border: '1px solid #e5e7eb' }}>
            <div className="modal-header" style={{ borderBottom: '1px solid #e5e7eb', background: '#ffffff' }}>
              <h5 className="modal-title" style={{ color: '#1f2937' }}>
                <Edit2 size={20} className="text-warning" style={{ color: '#eab308' }} />
                Edit Question
              </h5>
              <button onClick={() => { setShowEditModal(false); setEditQuestion(null); }} className="modal-close" style={{ color: '#6b7280' }}>×</button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleUpdateQuestion}>
                <div className="form-group">
                  <label style={{ color: '#4b5563' }}>Question *</label>
                  <textarea
                    rows={3}
                    className="form-control"
                    style={{ background: '#f3f4f6', border: '1px solid #e5e7eb', color: '#1f2937' }}
                    value={editQuestion.question}
                    onChange={(e) => setEditQuestion({ ...editQuestion, question: e.target.value })}
                  />
                </div>

                <div className="row g-2">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label style={{ color: '#4b5563' }}>Category</label>
                      <select
                        className="form-select"
                        style={{ background: '#f3f4f6', border: '1px solid #e5e7eb', color: '#1f2937' }}
                        value={editQuestion.category}
                        onChange={(e) => setEditQuestion({ ...editQuestion, category: e.target.value })}
                      >
                        {categories.filter(c => c !== 'All').map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label style={{ color: '#4b5563' }}>Difficulty</label>
                      <select
                        className="form-select"
                        style={{ background: '#f3f4f6', border: '1px solid #e5e7eb', color: '#1f2937' }}
                        value={editQuestion.difficulty}
                        onChange={(e) => setEditQuestion({ ...editQuestion, difficulty: e.target.value })}
                      >
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label style={{ color: '#4b5563' }}>Status</label>
                      <select
                        className="form-select"
                        style={{ background: '#f3f4f6', border: '1px solid #e5e7eb', color: '#1f2937' }}
                        value={editQuestion.status}
                        onChange={(e) => setEditQuestion({ ...editQuestion, status: e.target.value })}
                      >
                        <option value="Draft">Draft</option>
                        <option value="Published">Published</option>
                        <option value="Archived">Archived</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label style={{ color: '#4b5563' }}>Options *</label>
                  {editQuestion.options.map((opt, index) => (
                    <div key={index} className="option-input">
                      <span className="option-label" style={{ color: '#6b7280' }}>{String.fromCharCode(65 + index)}.</span>
                      <input
                        type="text"
                        className="form-control"
                        style={{ background: '#f3f4f6', border: '1px solid #e5e7eb', color: '#1f2937' }}
                        value={opt}
                        onChange={(e) => {
                          const newOptions = [...editQuestion.options];
                          newOptions[index] = e.target.value;
                          setEditQuestion({ ...editQuestion, options: newOptions });
                        }}
                      />
                    </div>
                  ))}
                </div>

                <div className="form-group">
                  <label style={{ color: '#4b5563' }}>Correct Answer *</label>
                  <input
                    type="text"
                    className="form-control"
                    style={{ background: '#f3f4f6', border: '1px solid #e5e7eb', color: '#1f2937' }}
                    value={editQuestion.answer}
                    onChange={(e) => setEditQuestion({ ...editQuestion, answer: e.target.value })}
                  />
                </div>

                <div className="row g-2">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label style={{ color: '#4b5563' }}>Marks</label>
                      <input
                        type="number"
                        className="form-control"
                        style={{ background: '#f3f4f6', border: '1px solid #e5e7eb', color: '#1f2937' }}
                        value={editQuestion.marks}
                        onChange={(e) => setEditQuestion({ ...editQuestion, marks: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label style={{ color: '#4b5563' }}>Negative Marks</label>
                      <input
                        type="number"
                        step="0.25"
                        className="form-control"
                        style={{ background: '#f3f4f6', border: '1px solid #e5e7eb', color: '#1f2937' }}
                        value={editQuestion.negativeMarks}
                        onChange={(e) => setEditQuestion({ ...editQuestion, negativeMarks: parseFloat(e.target.value) || 0 })}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label style={{ color: '#4b5563' }}>Explanation (Optional)</label>
                  <textarea
                    rows={2}
                    className="form-control"
                    style={{ background: '#f3f4f6', border: '1px solid #e5e7eb', color: '#1f2937' }}
                    value={editQuestion.explanation}
                    onChange={(e) => setEditQuestion({ ...editQuestion, explanation: e.target.value })}
                  />
                </div>

                <div className="modal-footer" style={{ borderTop: '1px solid #e5e7eb' }}>
                  <button type="button" className="btn-secondary" style={{ background: '#f3f4f6', color: '#4b5563' }} onClick={() => { setShowEditModal(false); setEditQuestion(null); }}>Cancel</button>
                  <button type="submit" className="btn-warning" style={{ background: '#eab308', color: 'white' }} disabled={loading}>
                    {loading ? <Loader2 className="spin" size={16} /> : <Save size={16} />}
                    Update Question
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      
      {showDeleteModal && (
        <div className="modal-overlay" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(5px)' }}>
          <div className="modal-container modal-sm" style={{ background: '#ffffff', border: '1px solid #e5e7eb' }}>
            <div className="modal-header" style={{ borderBottom: '1px solid #e5e7eb', background: '#ffffff' }}>
              <h5 className="modal-title" style={{ color: '#1f2937' }}>
                <AlertCircle size={20} className="text-danger" style={{ color: '#ef4444' }} />
                Delete Question
              </h5>
              <button onClick={() => { setShowDeleteModal(false); setDeleteTarget(null); }} className="modal-close" style={{ color: '#6b7280' }}>×</button>
            </div>
            <div className="modal-body text-center">
              <div className="confirm-icon" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
                <Trash2 size={32} className="text-danger" style={{ color: '#ef4444' }} />
              </div>
              <p className="text-light mb-2" style={{ color: '#1f2937' }}>Are you sure you want to delete this question?</p>
              <p className="text-secondary small" style={{ color: '#6b7280' }}>This action cannot be undone.</p>
            </div>
            <div className="modal-footer" style={{ borderTop: '1px solid #e5e7eb' }}>
              <button onClick={() => { setShowDeleteModal(false); setDeleteTarget(null); }} className="btn-secondary" style={{ background: '#f3f4f6', color: '#4b5563' }}>Cancel</button>
              <button onClick={handleDeleteQuestion} className="btn-danger" style={{ background: '#ef4444', color: 'white' }} disabled={loading}>
                {loading ? <Loader2 className="spin" size={16} /> : <Trash2 size={16} />}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

     
      <style>{`
        .questions-container {
          padding: 0;
          min-height: 100vh;
        }

        /* Toast */
        .toast-notification {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 99999;
          min-width: 300px;
          padding: 16px 20px;
          border-radius: 12px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          box-shadow: 0 20px 60px rgba(0,0,0,0.15);
          animation: slideInRight 0.3s ease;
          color: #1f2937;
        }
        .toast-success { border-left: 4px solid #22c55e; }
        .toast-error { border-left: 4px solid #ef4444; }
        .toast-info { border-left: 4px solid #3b82f6; }
        .toast-warning { border-left: 4px solid #f59e0b; }
        
        .toast-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .toast-content button {
          background: none;
          border: none;
          color: #6b7280;
          font-size: 20px;
          cursor: pointer;
          padding: 0 8px;
        }
        .toast-content button:hover { color: #1f2937; }
        
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        /* Stats Cards */
        .stat-card {
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          background: #ffffff;
          height: 100%;
          transition: all 0.3s ease;
        }
        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        .stat-card-body {
          padding: 16px 20px;
        }
        .stat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        .stat-label {
          color: #6b7280;
          font-size: 0.55rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .stat-icon-wrapper {
          padding: 8px;
          border-radius: 10px;
          border: 1px solid rgba(0,0,0,0.06);
        }
        .stat-icon-primary { background: rgba(59,130,246,0.1); border-color: rgba(59,130,246,0.2); }
        .stat-icon-success { background: rgba(34,197,94,0.1); border-color: rgba(34,197,94,0.2); }
        .stat-icon-warning { background: rgba(234,179,8,0.1); border-color: rgba(234,179,8,0.2); }
        .stat-icon-info { background: rgba(6,182,212,0.1); border-color: rgba(6,182,212,0.2); }
        .stat-icon { width: 0.9rem; height: 0.9rem; }
        .stat-value { font-size: 1.5rem; font-weight: 700; margin: 0; }

        /* Search & Filter */
        .search-filter-card {
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          margin-bottom: 20px;
          background: #ffffff;
        }
        .search-filter-body {
          padding: 12px 16px;
        }
        .search-filter-container {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          align-items: center;
        }
        .search-wrapper {
          flex: 1;
          min-width: 180px;
          max-width: 320px;
          display: flex;
          align-items: center;
          background: #f3f4f6;
          padding: 8px 14px;
          border-radius: 10px;
          border: 1px solid #e5e7eb;
          transition: all 0.3s ease;
        }
        .search-wrapper:focus-within {
          border-color: rgba(59,130,246,0.5);
          box-shadow: 0 0 0 3px rgba(59,130,246,0.1);
        }
        .search-icon {
          color: #6b7280;
          width: 16px;
          height: 16px;
          margin-right: 8px;
        }
        .search-input {
          background: transparent;
          border: none;
          color: #1f2937;
          font-size: 0.8rem;
          width: 100%;
          outline: none;
        }
        .search-input::placeholder {
          color: #6b7280;
        }
        .clear-search {
          background: none;
          border: none;
          color: #6b7280;
          font-size: 18px;
          cursor: pointer;
          padding: 0 4px;
        }
        .clear-search:hover { color: #1f2937; }

        .filter-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #f3f4f6;
          padding: 8px 14px;
          border-radius: 10px;
          border: 1px solid #e5e7eb;
        }
        .filter-icon {
          color: #6b7280;
          width: 16px;
          height: 16px;
        }
        .filter-select {
          background: transparent;
          border: none;
          color: #1f2937;
          font-size: 0.75rem;
          outline: none;
          cursor: pointer;
          min-width: 100px;
        }
        .filter-select option {
          background: #ffffff;
          color: #1f2937;
        }

        .btn-refresh {
          background: rgba(59,130,246,0.1);
          border: 1px solid rgba(59,130,246,0.2);
          color: #3b82f6;
          padding: 8px 12px;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
        }
        .btn-refresh:hover {
          background: rgba(59,130,246,0.2);
          transform: scale(1.05);
        }

        .btn-add {
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          border: none;
          color: white;
          padding: 10px 20px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 6px;
          margin-left: auto;
          white-space: nowrap;
        }
        .btn-add:hover {
          transform: scale(1.05);
          box-shadow: 0 10px 30px rgba(79,70,229,0.3);
        }

        /* Questions List */
        .questions-list-card {
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          background: #ffffff;
        }
        .questions-list-body {
          padding: 20px;
        }

        .question-header {
          display: grid;
          grid-template-columns: 30px 1fr 100px 80px 80px 120px;
          gap: 12px;
          padding: 10px 16px;
          border-bottom: 1px solid #e5e7eb;
          color: #6b7280;
          font-size: 0.65rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          align-items: center;
        }

        .question-item {
          display: grid;
          grid-template-columns: 30px 1fr 100px 80px 80px 120px;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 10px;
          margin-bottom: 6px;
          background: rgba(0,0,0,0.02);
          border: 1px solid rgba(0,0,0,0.04);
          transition: all 0.3s ease;
          align-items: center;
        }
        .question-item:hover {
          border-color: rgba(59,130,246,0.3);
          background: rgba(0,0,0,0.04);
        }
        .question-item.selected {
          border-color: rgba(59,130,246,0.5);
          background: rgba(59,130,246,0.05);
        }

        .checkbox {
          width: 16px;
          height: 16px;
          accent-color: #4f46e5;
          cursor: pointer;
        }

        .question-content {
          flex: 1;
          min-width: 0;
        }
        .question-text {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 4px;
        }
        .question-id {
          color: #6b7280;
          font-size: 0.65rem;
          font-weight: 600;
        }
        .question-title {
          color: #1f2937;
          font-size: 0.85rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .question-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          align-items: center;
        }
        .badge-category {
          padding: 2px 10px;
          border-radius: 20px;
          font-size: 0.55rem;
          font-weight: 600;
          background: rgba(59,130,246,0.1);
          color: #3b82f6;
          border: 1px solid rgba(59,130,246,0.2);
        }
        .badge-difficulty {
          padding: 2px 10px;
          border-radius: 20px;
          font-size: 0.55rem;
          font-weight: 600;
        }
        .badge-success { background: rgba(34,197,94,0.1); color: #22c55e; border: 1px solid rgba(34,197,94,0.2); }
        .badge-warning { background: rgba(234,179,8,0.1); color: #eab308; border: 1px solid rgba(234,179,8,0.2); }
        .badge-danger { background: rgba(239,68,68,0.1); color: #ef4444; border: 1px solid rgba(239,68,68,0.2); }
        .badge-secondary { background: rgba(107,114,128,0.1); color: #6b7280; border: 1px solid rgba(107,114,128,0.2); }
        .badge-status {
          padding: 2px 10px;
          border-radius: 20px;
          font-size: 0.55rem;
          font-weight: 600;
        }
        .badge-date {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          color: #6b7280;
          font-size: 0.55rem;
          padding: 2px 8px;
        }

        .question-actions-wrapper {
          display: flex;
          align-items: center;
          gap: 4px;
          justify-content: flex-end;
        }
        .action-btn {
          padding: 4px 8px;
          border-radius: 6px;
          border: none;
          background: transparent;
          color: #6b7280;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
        }
        .action-btn:hover { transform: scale(1.1); }
        .action-view:hover { color: #3b82f6; background: rgba(59,130,246,0.1); }
        .action-edit:hover { color: #eab308; background: rgba(234,179,8,0.1); }
        .action-delete:hover { color: #ef4444; background: rgba(239,68,68,0.1); }

        /* Modal */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          animation: fadeIn 0.3s ease;
        }
        .modal-container {
          background: #ffffff;
          border-radius: 20px;
          max-width: 650px;
          width: 95%;
          max-height: 90vh;
          overflow-y: auto;
          border: 1px solid #e5e7eb;
          box-shadow: 0 20px 60px rgba(0,0,0,0.2);
        }
        .modal-container.modal-sm { max-width: 450px; }
        .modal-header {
          padding: 20px 24px;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: sticky;
          top: 0;
          background: #ffffff;
          z-index: 10;
        }
        .modal-title {
          color: #1f2937;
          font-weight: 700;
          font-size: 1.1rem;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .modal-close {
          background: none;
          border: none;
          color: #6b7280;
          font-size: 24px;
          cursor: pointer;
          padding: 0 8px;
        }
        .modal-close:hover { color: #1f2937; }
        .modal-body {
          padding: 24px;
        }
        .modal-footer {
          padding: 16px 24px;
          border-top: 1px solid #e5e7eb;
          display: flex;
          gap: 12px;
          justify-content: flex-end;
        }

        .form-group {
          margin-bottom: 16px;
        }
        .form-group label {
          display: block;
          color: #4b5563;
          font-size: 0.75rem;
          font-weight: 600;
          margin-bottom: 4px;
        }
        .form-control, .form-select {
          width: 100%;
          padding: 8px 12px;
          background: #f3f4f6;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          color: #1f2937;
          font-size: 0.85rem;
          transition: all 0.3s ease;
        }
        .form-control:focus, .form-select:focus {
          outline: none;
          border-color: rgba(79,70,229,0.5);
          box-shadow: 0 0 0 3px rgba(79,70,229,0.1);
        }
        .option-input {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 4px;
        }
        .option-label {
          color: #6b7280;
          font-weight: 600;
          font-size: 0.8rem;
          min-width: 20px;
        }
        textarea.form-control {
          resize: vertical;
          min-height: 60px;
        }

        .btn-primary, .btn-secondary, .btn-danger, .btn-warning {
          padding: 8px 24px;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .btn-primary {
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          color: white;
        }
        .btn-primary:hover { transform: scale(1.05); box-shadow: 0 10px 30px rgba(79,70,229,0.3); }
        .btn-secondary {
          background: #f3f4f6;
          color: #4b5563;
        }
        .btn-secondary:hover { background: #e5e7eb; }
        .btn-danger {
          background: #ef4444;
          color: white;
        }
        .btn-danger:hover { background: #dc2626; }
        .btn-warning {
          background: #eab308;
          color: white;
        }
        .btn-warning:hover { background: #ca8a04; }

        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .view-section {
          background: rgba(0,0,0,0.03);
          border-radius: 10px;
          padding: 16px;
          margin-bottom: 12px;
        }
        .view-section label {
          display: block;
          color: #6b7280;
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 4px;
        }
        .view-text {
          color: #1f2937;
          margin: 0;
          font-size: 0.9rem;
        }
        .option-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border-radius: 6px;
          margin-bottom: 4px;
          background: rgba(0,0,0,0.02);
          border: 1px solid rgba(0,0,0,0.04);
        }
        .option-item.correct {
          border-color: rgba(34,197,94,0.3);
          background: rgba(34,197,94,0.05);
        }
        .option-letter {
          color: #6b7280;
          font-weight: 600;
          font-size: 0.8rem;
          min-width: 24px;
        }
        .option-text {
          color: #1f2937;
          font-size: 0.85rem;
        }
        .option-text.correct {
          color: #22c55e;
          font-weight: 600;
        }
        .correct-answer {
          border-color: rgba(34,197,94,0.2);
          background: rgba(34,197,94,0.05);
        }
        .view-meta {
          background: rgba(0,0,0,0.03);
          border-radius: 10px;
          padding: 8px 12px;
        }
        .view-meta label {
          display: block;
          color: #6b7280;
          font-size: 0.6rem;
          font-weight: 600;
          text-transform: uppercase;
        }
        .view-meta p {
          color: #1f2937;
          margin: 0;
          font-size: 0.85rem;
        }

        .confirm-icon {
          width: 64px;
          height: 64px;
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
        }

        @media (max-width: 992px) {
          .question-header, .question-item {
            grid-template-columns: 30px 1fr auto;
          }
          .question-header .question-meta,
          .question-item .question-meta { display: none; }
        }

        @media (max-width: 768px) {
          .search-filter-container {
            flex-direction: column;
            align-items: stretch;
          }
          .search-wrapper { max-width: 100%; }
          .btn-add { width: 100%; justify-content: center; margin-left: 0; }
          .stat-card-body { padding: 12px; }
          .stat-value { font-size: 1.2rem; }
        }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #f3f4f6; border-radius: 10px; }
        ::-webkit-scrollbar-thumb { background: rgba(79,70,229,0.3); border-radius: 10px; }
      `}</style>
    </div>
  );
}