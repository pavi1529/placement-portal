import React, { useState } from 'react';
import { 
  Plus, Trash2, Edit2, Search, Filter, Eye, 
  Code2, Terminal, Award, Clock, Users, CheckCircle,
  XCircle, AlertCircle, Sparkles, Play, BookOpen,
  GitBranch, Cpu, Database, Globe, FileText, Save, Calendar
} from 'lucide-react';

export default function AdminCodingTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('ALL');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState(null);

  const [challenges, setChallenges] = useState([
    { 
      id: 1, 
      title: "Dynamic Array Intersection", 
      difficulty: "Hard",
      category: "Arrays",
      language: "Python",
      timeComplexity: "O(N log N)",
      spaceComplexity: "O(N)",
      status: "Active",
      submissions: 45,
      successRate: 68,
      created: "2026-07-15"
    },
    { 
      id: 2, 
      title: "Two Sum Problem", 
      difficulty: "Easy",
      category: "Arrays",
      language: "Java",
      timeComplexity: "O(N)",
      spaceComplexity: "O(N)",
      status: "Active",
      submissions: 120,
      successRate: 85,
      created: "2026-07-14"
    },
    { 
      id: 3, 
      title: "Binary Tree Level Order", 
      difficulty: "Medium",
      category: "Trees",
      language: "C++",
      timeComplexity: "O(N)",
      spaceComplexity: "O(N)",
      status: "Draft",
      submissions: 0,
      successRate: 0,
      created: "2026-07-13"
    },
    { 
      id: 4, 
      title: "Merge Sort Implementation", 
      difficulty: "Medium",
      category: "Sorting",
      language: "Python",
      timeComplexity: "O(N log N)",
      spaceComplexity: "O(N)",
      status: "Active",
      submissions: 78,
      successRate: 72,
      created: "2026-07-12"
    },
    { 
      id: 5, 
      title: "Reverse Linked List", 
      difficulty: "Easy",
      category: "Linked Lists",
      language: "C",
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      status: "Active",
      submissions: 95,
      successRate: 90,
      created: "2026-07-11"
    },
  ]);

  const [newChallenge, setNewChallenge] = useState({
    title: '',
    difficulty: 'Medium',
    category: 'Arrays',
    language: 'Python',
    timeComplexity: '',
    spaceComplexity: '',
    status: 'Draft',
    description: ''
  });

  const [editChallenge, setEditChallenge] = useState(null);

  const totalChallenges = challenges.length;
  const activeChallenges = challenges.filter(c => c.status === 'Active').length;
  const draftChallenges = challenges.filter(c => c.status === 'Draft').length;
  const totalSubmissions = challenges.reduce((sum, c) => sum + c.submissions, 0);

  const filteredChallenges = challenges.filter(challenge => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          challenge.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          challenge.language.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = filterDifficulty === 'ALL' || challenge.difficulty === filterDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  const handleAddChallenge = () => {
    if (!newChallenge.title || !newChallenge.timeComplexity || !newChallenge.spaceComplexity) {
      alert('Please fill in all required fields!');
      return;
    }
    const challenge = {
      id: Date.now(),
      ...newChallenge,
      submissions: 0,
      successRate: 0,
      created: new Date().toISOString().split('T')[0]
    };
    setChallenges([...challenges, challenge]);
    setNewChallenge({
      title: '',
      difficulty: 'Medium',
      category: 'Arrays',
      language: 'Python',
      timeComplexity: '',
      spaceComplexity: '',
      status: 'Draft',
      description: ''
    });
    setShowAddModal(false);
  };

  const handleEditChallenge = (challenge) => {
    setEditChallenge({ ...challenge });
    setShowEditModal(true);
  };

  const handleUpdateChallenge = () => {
    setChallenges(challenges.map(c => c.id === editChallenge.id ? editChallenge : c));
    setShowEditModal(false);
    setEditChallenge(null);
  };

  const handleDeleteChallenge = (id) => {
    if (window.confirm('Are you sure you want to delete this coding challenge?')) {
      setChallenges(challenges.filter(c => c.id !== id));
    }
  };

  const handleViewChallenge = (challenge) => {
    setSelectedChallenge(challenge);
    setShowDetailModal(true);
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return 'success';
      case 'Medium': return 'warning';
      case 'Hard': return 'danger';
      default: return 'secondary';
    }
  };

  const getDifficultyIcon = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return <CheckCircle className="text-success" style={{ width: 'clamp(0.6rem, 1vw, 0.7rem)', height: 'clamp(0.6rem, 1vw, 0.7rem)' }} />;
      case 'Medium': return <AlertCircle className="text-warning" style={{ width: 'clamp(0.6rem, 1vw, 0.7rem)', height: 'clamp(0.6rem, 1vw, 0.7rem)' }} />;
      case 'Hard': return <XCircle className="text-danger" style={{ width: 'clamp(0.6rem, 1vw, 0.7rem)', height: 'clamp(0.6rem, 1vw, 0.7rem)' }} />;
      default: return null;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Active': return 'success';
      case 'Draft': return 'warning';
      case 'Archived': return 'danger';
      default: return 'secondary';
    }
  };

  const getLanguageColor = (language) => {
    switch(language) {
      case 'Python': return '#3776ab';
      case 'Java': return '#f89820';
      case 'C++': return '#00599c';
      case 'C': return '#6c5ce7';
      case 'JavaScript': return '#f7df1e';
      default: return '#94a3b8';
    }
  };

  return (
    <div className="animate-fadeIn">
      {/* Stats Cards - Responsive */}
      <div className="row g-2 g-md-3 mb-3 mb-md-4">
        {[
          { label: "Total Challenges", value: totalChallenges, color: "primary", icon: Code2 },
          { label: "Active", value: activeChallenges, color: "success", icon: CheckCircle },
          { label: "Draft", value: draftChallenges, color: "warning", icon: Edit2 },
          { label: "Submissions", value: totalSubmissions, color: "info", icon: Users },
        ].map((stat, i) => {
          const Icon = stat.icon;
          const bgColors = {
            primary: 'rgba(59,130,246,0.08)',
            success: 'rgba(34,197,94,0.08)',
            warning: 'rgba(234,179,8,0.08)',
            info: 'rgba(6,182,212,0.08)'
          };
          return (
            <div key={i} className="col-6 col-lg-3">
              <div className="card border-0 shadow-sm rounded-3 rounded-md-4 h-100" style={{ 
                background: 'rgba(20,20,30,0.6)', 
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.05)',
                transition: 'all 0.3s ease'
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div className="card-body p-2 p-md-3">
                  <div className="d-flex align-items-center justify-content-between">
                    <span className="text-secondary fw-bold text-uppercase" style={{ fontSize: 'clamp(0.4rem, 0.7vw, 0.55rem)' }}>
                      {stat.label}
                    </span>
                    <div className={`p-1 p-md-2 rounded-3`} style={{ 
                      background: bgColors[stat.color], 
                      border: `1px solid ${bgColors[stat.color]}` 
                    }}>
                      <Icon className={`text-${stat.color}`} style={{ 
                        width: 'clamp(0.7rem, 1.2vw, 0.9rem)', 
                        height: 'clamp(0.7rem, 1.2vw, 0.9rem)' 
                      }} />
                    </div>
                  </div>
                  <h4 className={`fw-bold text-${stat.color} mb-0`} style={{ 
                    fontSize: 'clamp(1rem, 2.5vw, 1.5rem)' 
                  }}>{stat.value}</h4>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Search & Filter - Responsive */}
      <div className="card border-0 shadow-sm rounded-3 rounded-md-4 mb-3 mb-md-4" style={{ 
        background: 'rgba(20,20,30,0.6)', 
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.05)'
      }}>
        <div className="card-body p-2 p-md-3">
          <div className="d-flex flex-wrap gap-2 align-items-center">
            <div className="d-flex align-items-center gap-2 bg-dark px-2 px-md-3 py-1 py-md-2 rounded-3 border border-secondary flex-grow-1" style={{ 
              maxWidth: 'clamp(160px, 35vw, 300px)',
              borderColor: 'rgba(255,255,255,0.1) !important'
            }}>
              <Search className="text-secondary" style={{ 
                width: 'clamp(0.7rem, 1.1vw, 0.8rem)', 
                height: 'clamp(0.7rem, 1.1vw, 0.8rem)' 
              }} />
              <input 
                type="text" 
                className="form-control form-control-sm bg-transparent border-0 text-light" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ 
                  fontSize: 'clamp(0.6rem, 1vw, 0.75rem)', 
                  outline: 'none', 
                  padding: '0.1rem 0',
                  color: '#ffffff !important'
                }}
              />
            </div>
            <div className="d-flex align-items-center gap-1 gap-md-2 bg-dark px-2 px-md-3 py-1 py-md-2 rounded-3 border border-secondary flex-grow-1 flex-md-grow-0" style={{
              borderColor: 'rgba(255,255,255,0.1) !important'
            }}>
              <Filter className="text-secondary" style={{ 
                width: 'clamp(0.6rem, 1vw, 0.7rem)', 
                height: 'clamp(0.6rem, 1vw, 0.7rem)' 
              }} />
              <select 
                className="form-select form-select-sm bg-transparent border-0 text-light" 
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value)}
                style={{ 
                  fontSize: 'clamp(0.55rem, 0.9vw, 0.75rem)', 
                  width: 'clamp(90px, 15vw, 140px)', 
                  outline: 'none', 
                  padding: '0.1rem 0.4rem',
                  color: '#ffffff !important'
                }}
              >
                <option value="ALL" style={{ background: '#1a1a2e', color: '#ffffff' }}>All Difficulty</option>
                <option value="Easy" style={{ background: '#1a1a2e', color: '#ffffff' }}>Easy</option>
                <option value="Medium" style={{ background: '#1a1a2e', color: '#ffffff' }}>Medium</option>
                <option value="Hard" style={{ background: '#1a1a2e', color: '#ffffff' }}>Hard</option>
              </select>
            </div>
            <button 
              onClick={() => setShowAddModal(true)}
              className="btn btn-primary btn-sm d-flex align-items-center gap-1 shadow-lg shadow-primary/20"
              style={{ 
                borderRadius: '10px', 
                fontWeight: '600',
                fontSize: 'clamp(0.6rem, 1vw, 0.7rem)',
                padding: 'clamp(0.2rem, 0.5vw, 0.3rem) clamp(0.6rem, 1.2vw, 0.8rem)'
              }}
            >
              <Plus style={{ 
                width: 'clamp(0.7rem, 1.2vw, 0.9rem)', 
                height: 'clamp(0.7rem, 1.2vw, 0.9rem)' 
              }} />
              <span className="d-none d-sm-inline">Add Challenge</span>
            </button>
          </div>
        </div>
      </div>

      {/* Challenges Grid - Responsive */}
      {filteredChallenges.length === 0 ? (
        <div className="card border-0 shadow-sm rounded-4 text-center p-3 p-md-5" style={{ 
          background: 'rgba(20,20,30,0.6)', 
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.05)'
        }}>
          <Code2 className="text-secondary mx-auto" style={{ 
            width: 'clamp(2rem, 4vw, 3rem)', 
            height: 'clamp(2rem, 4vw, 3rem)' 
          }} />
          <h6 className="text-secondary mt-3" style={{ fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>No challenges found</h6>
          <p className="text-secondary small" style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)' }}>Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="row g-2 g-md-3 g-lg-4">
          {filteredChallenges.map((challenge, index) => (
            <div key={challenge.id} className="col-sm-6 col-xl-4">
              <div 
                className="card border-0 shadow-sm rounded-3 rounded-md-4 h-100"
                style={{ 
                  background: 'rgba(20,20,30,0.6)', 
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div className="card-body p-3 p-md-4 d-flex flex-column">
                  {/* Challenge Header */}
                  <div className="d-flex flex-wrap justify-content-between align-items-start gap-2 mb-2 mb-md-3">
                    <div className="d-flex align-items-center gap-2">
                      <div className="p-1 p-md-2 rounded-3 flex-shrink-0" style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)' }}>
                        <Code2 className="text-primary" style={{ 
                          width: 'clamp(0.8rem, 1.2vw, 1rem)', 
                          height: 'clamp(0.8rem, 1.2vw, 1rem)' 
                        }} />
                      </div>
                      <h6 className="fw-bold text-light m-0" style={{ 
                        fontSize: 'clamp(0.75rem, 1.2vw, 0.85rem)' 
                      }}>
                        {challenge.title}
                      </h6>
                    </div>
                    <span className={`badge bg-${getDifficultyColor(challenge.difficulty)} bg-opacity-10 text-${getDifficultyColor(challenge.difficulty)} border border-${getDifficultyColor(challenge.difficulty)} d-inline-flex align-items-center gap-1 flex-shrink-0`}
                          style={{ fontSize: 'clamp(0.4rem, 0.7vw, 0.5rem)' }}>
                      {getDifficultyIcon(challenge.difficulty)}
                      {challenge.difficulty}
                    </span>
                  </div>

                  {/* Challenge Details */}
                  <div className="space-y-1.5 flex-grow-1">
                    <div className="d-flex flex-wrap justify-content-between p-1 p-md-1.5 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                      <span className="text-secondary small" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                        <Terminal className="me-1" style={{ width: 'clamp(0.6rem, 0.9vw, 0.7rem)', height: 'clamp(0.6rem, 0.9vw, 0.7rem)' }} /> Language
                      </span>
                      <span className="text-light fw-bold" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)', color: getLanguageColor(challenge.language) }}>
                        {challenge.language}
                      </span>
                    </div>
                    <div className="d-flex flex-wrap justify-content-between p-1 p-md-1.5 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                      <span className="text-secondary small" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                        <BookOpen className="me-1" style={{ width: 'clamp(0.6rem, 0.9vw, 0.7rem)', height: 'clamp(0.6rem, 0.9vw, 0.7rem)' }} /> Category
                      </span>
                      <span className="text-light fw-bold" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>{challenge.category}</span>
                    </div>
                    <div className="d-flex flex-wrap justify-content-between p-1 p-md-1.5 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                      <span className="text-secondary small" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                        <Clock className="me-1" style={{ width: 'clamp(0.6rem, 0.9vw, 0.7rem)', height: 'clamp(0.6rem, 0.9vw, 0.7rem)' }} /> Time
                      </span>
                      <span className="text-light fw-bold" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>{challenge.timeComplexity}</span>
                    </div>
                    <div className="d-flex flex-wrap justify-content-between p-1 p-md-1.5 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                      <span className="text-secondary small" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                        <Database className="me-1" style={{ width: 'clamp(0.6rem, 0.9vw, 0.7rem)', height: 'clamp(0.6rem, 0.9vw, 0.7rem)' }} /> Space
                      </span>
                      <span className="text-light fw-bold" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>{challenge.spaceComplexity}</span>
                    </div>
                    {challenge.submissions > 0 && (
                      <div className="d-flex flex-wrap justify-content-between p-1 p-md-1.5 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                        <span className="text-secondary small" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                          <Users className="me-1" style={{ width: 'clamp(0.6rem, 0.9vw, 0.7rem)', height: 'clamp(0.6rem, 0.9vw, 0.7rem)' }} /> Success Rate
                        </span>
                        <span className="text-success fw-bold" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>{challenge.successRate}%</span>
                      </div>
                    )}
                    <div className="d-flex flex-wrap justify-content-between p-1 p-md-1.5 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                      <span className="text-secondary small" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                        <CheckCircle className="me-1" style={{ width: 'clamp(0.6rem, 0.9vw, 0.7rem)', height: 'clamp(0.6rem, 0.9vw, 0.7rem)' }} /> Status
                      </span>
                      <span className={`text-${getStatusColor(challenge.status)} fw-bold`} style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                        {challenge.status}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-3 pt-2 pt-md-3 border-top border-secondary d-flex flex-wrap justify-content-between align-items-center gap-2">
                    <span className="text-secondary small" style={{ fontSize: 'clamp(0.45rem, 0.7vw, 0.55rem)' }}>
                      <Calendar className="me-1" style={{ width: 'clamp(0.5rem, 0.7vw, 0.6rem)', height: 'clamp(0.5rem, 0.7vw, 0.6rem)' }} />
                      {challenge.created}
                    </span>
                    <div className="d-flex gap-1">
                      <button 
                        onClick={() => handleViewChallenge(challenge)}
                        className="btn btn-sm btn-outline-info d-flex align-items-center gap-1 shadow-sm"
                        style={{ 
                          borderRadius: '8px',
                          fontSize: 'clamp(0.4rem, 0.6vw, 0.5rem)',
                          padding: 'clamp(0.12rem, 0.25vw, 0.2rem) clamp(0.25rem, 0.4vw, 0.35rem)'
                        }}
                      >
                        <Eye style={{ 
                          width: 'clamp(0.5rem, 0.8vw, 0.7rem)', 
                          height: 'clamp(0.5rem, 0.8vw, 0.7rem)' 
                        }} />
                      </button>
                      <button 
                        onClick={() => handleEditChallenge(challenge)}
                        className="btn btn-sm btn-outline-warning d-flex align-items-center gap-1 shadow-sm"
                        style={{ 
                          borderRadius: '8px',
                          fontSize: 'clamp(0.4rem, 0.6vw, 0.5rem)',
                          padding: 'clamp(0.12rem, 0.25vw, 0.2rem) clamp(0.25rem, 0.4vw, 0.35rem)'
                        }}
                      >
                        <Edit2 style={{ 
                          width: 'clamp(0.5rem, 0.8vw, 0.7rem)', 
                          height: 'clamp(0.5rem, 0.8vw, 0.7rem)' 
                        }} />
                      </button>
                      <button 
                        onClick={() => handleDeleteChallenge(challenge.id)}
                        className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1 shadow-sm"
                        style={{ 
                          borderRadius: '8px',
                          fontSize: 'clamp(0.4rem, 0.6vw, 0.5rem)',
                          padding: 'clamp(0.12rem, 0.25vw, 0.2rem) clamp(0.25rem, 0.4vw, 0.35rem)'
                        }}
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
          ))}
        </div>
      )}

      {/* Add Challenge Modal - Responsive */}
      {showAddModal && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ 
          zIndex: 9999, 
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(10px)',
          animation: 'fadeIn 0.3s ease',
          padding: '1rem'
        }}>
          <div className="card border-0 shadow-2xl rounded-4" style={{ 
            maxWidth: 'clamp(320px, 90vw, 550px)', 
            width: '100%', 
            maxHeight: '90vh', 
            overflowY: 'auto', 
            background: 'rgba(20,20,30,0.95)', 
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            <div className="card-body p-3 p-md-4">
              <div className="d-flex justify-content-between align-items-center mb-3 border-bottom border-secondary pb-3">
                <h5 className="text-light fw-bold m-0 d-flex align-items-center gap-2" style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)' }}>
                  <Code2 className="text-primary" style={{ 
                    width: 'clamp(0.9rem, 2vw, 1.2rem)', 
                    height: 'clamp(0.9rem, 2vw, 1.2rem)' 
                  }} />
                  Add Coding Challenge
                </h5>
                <button onClick={() => setShowAddModal(false)} className="btn btn-close btn-close-white" style={{ fontSize: 'clamp(0.6rem, 1vw, 0.9rem)' }}></button>
              </div>

              <div className="space-y-2 space-y-md-3">
                <div>
                  <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                    Challenge Title *
                  </label>
                  <input 
                    type="text" 
                    className="form-control form-control-sm bg-dark text-light border-secondary" 
                    placeholder="Enter challenge title"
                    value={newChallenge.title}
                    onChange={(e) => setNewChallenge({ ...newChallenge, title: e.target.value })}
                    style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                  />
                </div>
                <div className="row g-2">
                  <div className="col-6">
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Difficulty
                    </label>
                    <select 
                      className="form-select form-select-sm bg-dark text-light border-secondary" 
                      value={newChallenge.difficulty}
                      onChange={(e) => setNewChallenge({ ...newChallenge, difficulty: e.target.value })}
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                    >
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>
                  <div className="col-6">
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Category
                    </label>
                    <select 
                      className="form-select form-select-sm bg-dark text-light border-secondary" 
                      value={newChallenge.category}
                      onChange={(e) => setNewChallenge({ ...newChallenge, category: e.target.value })}
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                    >
                      <option value="Arrays">Arrays</option>
                      <option value="Strings">Strings</option>
                      <option value="Trees">Trees</option>
                      <option value="Graphs">Graphs</option>
                      <option value="Sorting">Sorting</option>
                      <option value="Linked Lists">Linked Lists</option>
                      <option value="DP">Dynamic Programming</option>
                    </select>
                  </div>
                </div>
                <div className="row g-2">
                  <div className="col-6">
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Language
                    </label>
                    <select 
                      className="form-select form-select-sm bg-dark text-light border-secondary" 
                      value={newChallenge.language}
                      onChange={(e) => setNewChallenge({ ...newChallenge, language: e.target.value })}
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                    >
                      <option value="Python">Python</option>
                      <option value="Java">Java</option>
                      <option value="C++">C++</option>
                      <option value="C">C</option>
                      <option value="JavaScript">JavaScript</option>
                    </select>
                  </div>
                  <div className="col-6">
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Status
                    </label>
                    <select 
                      className="form-select form-select-sm bg-dark text-light border-secondary" 
                      value={newChallenge.status}
                      onChange={(e) => setNewChallenge({ ...newChallenge, status: e.target.value })}
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                    >
                      <option value="Draft">Draft</option>
                      <option value="Active">Active</option>
                      <option value="Archived">Archived</option>
                    </select>
                  </div>
                </div>
                <div className="row g-2">
                  <div className="col-6">
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Time Complexity *
                    </label>
                    <input 
                      type="text" 
                      className="form-control form-control-sm bg-dark text-light border-secondary" 
                      placeholder="e.g., O(N log N)"
                      value={newChallenge.timeComplexity}
                      onChange={(e) => setNewChallenge({ ...newChallenge, timeComplexity: e.target.value })}
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                    />
                  </div>
                  <div className="col-6">
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Space Complexity *
                    </label>
                    <input 
                      type="text" 
                      className="form-control form-control-sm bg-dark text-light border-secondary" 
                      placeholder="e.g., O(N)"
                      value={newChallenge.spaceComplexity}
                      onChange={(e) => setNewChallenge({ ...newChallenge, spaceComplexity: e.target.value })}
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                    Description
                  </label>
                  <textarea 
                    rows={2}
                    className="form-control form-control-sm bg-dark text-light border-secondary" 
                    placeholder="Challenge description..."
                    value={newChallenge.description}
                    onChange={(e) => setNewChallenge({ ...newChallenge, description: e.target.value })}
                    style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                  />
                </div>
              </div>

              <div className="mt-3 pt-3 border-top border-secondary d-flex gap-2 flex-wrap">
                <button onClick={() => setShowAddModal(false)} className="btn btn-secondary flex-grow-1" style={{ fontSize: 'clamp(0.6rem, 1vw, 0.7rem)', padding: '0.35rem 0.7rem' }}>
                  Cancel
                </button>
                <button onClick={handleAddChallenge} className="btn btn-primary flex-grow-1 d-flex align-items-center justify-content-center gap-1 shadow-lg shadow-primary/20" style={{ fontSize: 'clamp(0.6rem, 1vw, 0.7rem)', padding: '0.35rem 0.7rem' }}>
                  <Plus style={{ width: 'clamp(0.7rem, 1.2vw, 0.9rem)', height: 'clamp(0.7rem, 1.2vw, 0.9rem)' }} className="me-1" /> Add Challenge
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Challenge Modal - Responsive */}
      {showEditModal && editChallenge && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ 
          zIndex: 9999, 
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(10px)',
          animation: 'fadeIn 0.3s ease',
          padding: '1rem'
        }}>
          <div className="card border-0 shadow-2xl rounded-4" style={{ 
            maxWidth: 'clamp(320px, 90vw, 550px)', 
            width: '100%', 
            maxHeight: '90vh', 
            overflowY: 'auto', 
            background: 'rgba(20,20,30,0.95)', 
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            <div className="card-body p-3 p-md-4">
              <div className="d-flex justify-content-between align-items-center mb-3 border-bottom border-secondary pb-3">
                <h5 className="text-light fw-bold m-0 d-flex align-items-center gap-2" style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)' }}>
                  <Edit2 className="text-warning" style={{ 
                    width: 'clamp(0.9rem, 2vw, 1.2rem)', 
                    height: 'clamp(0.9rem, 2vw, 1.2rem)' 
                  }} />
                  Edit Challenge
                </h5>
                <button onClick={() => setShowEditModal(false)} className="btn btn-close btn-close-white" style={{ fontSize: 'clamp(0.6rem, 1vw, 0.9rem)' }}></button>
              </div>

              <div className="space-y-2 space-y-md-3">
                <div>
                  <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                    Challenge Title *
                  </label>
                  <input 
                    type="text" 
                    className="form-control form-control-sm bg-dark text-light border-secondary" 
                    value={editChallenge.title}
                    onChange={(e) => setEditChallenge({ ...editChallenge, title: e.target.value })}
                    style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                  />
                </div>
                <div className="row g-2">
                  <div className="col-6">
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Difficulty
                    </label>
                    <select 
                      className="form-select form-select-sm bg-dark text-light border-secondary" 
                      value={editChallenge.difficulty}
                      onChange={(e) => setEditChallenge({ ...editChallenge, difficulty: e.target.value })}
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                    >
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>
                  <div className="col-6">
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Category
                    </label>
                    <select 
                      className="form-select form-select-sm bg-dark text-light border-secondary" 
                      value={editChallenge.category}
                      onChange={(e) => setEditChallenge({ ...editChallenge, category: e.target.value })}
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                    >
                      <option value="Arrays">Arrays</option>
                      <option value="Strings">Strings</option>
                      <option value="Trees">Trees</option>
                      <option value="Graphs">Graphs</option>
                      <option value="Sorting">Sorting</option>
                      <option value="Linked Lists">Linked Lists</option>
                      <option value="DP">Dynamic Programming</option>
                    </select>
                  </div>
                </div>
                <div className="row g-2">
                  <div className="col-6">
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Language
                    </label>
                    <select 
                      className="form-select form-select-sm bg-dark text-light border-secondary" 
                      value={editChallenge.language}
                      onChange={(e) => setEditChallenge({ ...editChallenge, language: e.target.value })}
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                    >
                      <option value="Python">Python</option>
                      <option value="Java">Java</option>
                      <option value="C++">C++</option>
                      <option value="C">C</option>
                      <option value="JavaScript">JavaScript</option>
                    </select>
                  </div>
                  <div className="col-6">
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Status
                    </label>
                    <select 
                      className="form-select form-select-sm bg-dark text-light border-secondary" 
                      value={editChallenge.status}
                      onChange={(e) => setEditChallenge({ ...editChallenge, status: e.target.value })}
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                    >
                      <option value="Draft">Draft</option>
                      <option value="Active">Active</option>
                      <option value="Archived">Archived</option>
                    </select>
                  </div>
                </div>
                <div className="row g-2">
                  <div className="col-6">
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Time Complexity *
                    </label>
                    <input 
                      type="text" 
                      className="form-control form-control-sm bg-dark text-light border-secondary" 
                      value={editChallenge.timeComplexity}
                      onChange={(e) => setEditChallenge({ ...editChallenge, timeComplexity: e.target.value })}
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                    />
                  </div>
                  <div className="col-6">
                    <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      Space Complexity *
                    </label>
                    <input 
                      type="text" 
                      className="form-control form-control-sm bg-dark text-light border-secondary" 
                      value={editChallenge.spaceComplexity}
                      onChange={(e) => setEditChallenge({ ...editChallenge, spaceComplexity: e.target.value })}
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                    Description
                  </label>
                  <textarea 
                    rows={2}
                    className="form-control form-control-sm bg-dark text-light border-secondary" 
                    value={editChallenge.description}
                    onChange={(e) => setEditChallenge({ ...editChallenge, description: e.target.value })}
                    style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', borderRadius: '10px' }}
                  />
                </div>
              </div>

              <div className="mt-3 pt-3 border-top border-secondary d-flex gap-2 flex-wrap">
                <button onClick={() => setShowEditModal(false)} className="btn btn-secondary flex-grow-1" style={{ fontSize: 'clamp(0.6rem, 1vw, 0.7rem)', padding: '0.35rem 0.7rem' }}>
                  Cancel
                </button>
                <button onClick={handleUpdateChallenge} className="btn btn-warning flex-grow-1 d-flex align-items-center justify-content-center gap-1 shadow-lg shadow-warning/20" style={{ fontSize: 'clamp(0.6rem, 1vw, 0.7rem)', padding: '0.35rem 0.7rem' }}>
                  <Save style={{ width: 'clamp(0.7rem, 1.2vw, 0.9rem)', height: 'clamp(0.7rem, 1.2vw, 0.9rem)' }} className="me-1" /> Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal - Responsive */}
      {showDetailModal && selectedChallenge && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ 
          zIndex: 9999, 
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(10px)',
          animation: 'fadeIn 0.3s ease',
          padding: '1rem'
        }}>
          <div className="card border-0 shadow-2xl rounded-4" style={{ 
            maxWidth: 'clamp(320px, 90vw, 550px)', 
            width: '100%', 
            maxHeight: '90vh', 
            overflowY: 'auto', 
            background: 'rgba(20,20,30,0.95)', 
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            <div className="card-body p-3 p-md-4">
              <div className="d-flex justify-content-between align-items-center mb-3 border-bottom border-secondary pb-3">
                <h5 className="text-light fw-bold m-0 d-flex align-items-center gap-2" style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)' }}>
                  <Code2 className="text-primary" style={{ 
                    width: 'clamp(0.9rem, 2vw, 1.2rem)', 
                    height: 'clamp(0.9rem, 2vw, 1.2rem)' 
                  }} />
                  Challenge Details
                </h5>
                <button onClick={() => setShowDetailModal(false)} className="btn btn-close btn-close-white" style={{ fontSize: 'clamp(0.6rem, 1vw, 0.9rem)' }}></button>
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
                  {selectedChallenge.title.charAt(0)}
                </div>
                <div className="min-w-0">
                  <h5 className="text-light fw-bold m-0" style={{ fontSize: 'clamp(0.9rem, 2vw, 1.05rem)' }}>
                    {selectedChallenge.title}
                  </h5>
                  <span className={`badge bg-${getDifficultyColor(selectedChallenge.difficulty)} bg-opacity-10 text-${getDifficultyColor(selectedChallenge.difficulty)} border border-${getDifficultyColor(selectedChallenge.difficulty)}`}
                        style={{ fontSize: 'clamp(0.45rem, 0.8vw, 0.55rem)' }}>
                    {selectedChallenge.difficulty}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="d-flex flex-wrap justify-content-between p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <span className="text-secondary" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>
                    <Terminal className="me-1" style={{ width: 'clamp(0.7rem, 1.2vw, 0.8rem)', height: 'clamp(0.7rem, 1.2vw, 0.8rem)' }} /> Language
                  </span>
                  <span className="text-light fw-bold" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)', color: getLanguageColor(selectedChallenge.language) }}>
                    {selectedChallenge.language}
                  </span>
                </div>
                <div className="d-flex flex-wrap justify-content-between p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <span className="text-secondary" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>
                    <BookOpen className="me-1" style={{ width: 'clamp(0.7rem, 1.2vw, 0.8rem)', height: 'clamp(0.7rem, 1.2vw, 0.8rem)' }} /> Category
                  </span>
                  <span className="text-light fw-bold" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>{selectedChallenge.category}</span>
                </div>
                <div className="d-flex flex-wrap justify-content-between p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <span className="text-secondary" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>
                    <Clock className="me-1" style={{ width: 'clamp(0.7rem, 1.2vw, 0.8rem)', height: 'clamp(0.7rem, 1.2vw, 0.8rem)' }} /> Time Complexity
                  </span>
                  <span className="text-light fw-bold" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>{selectedChallenge.timeComplexity}</span>
                </div>
                <div className="d-flex flex-wrap justify-content-between p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <span className="text-secondary" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>
                    <Database className="me-1" style={{ width: 'clamp(0.7rem, 1.2vw, 0.8rem)', height: 'clamp(0.7rem, 1.2vw, 0.8rem)' }} /> Space Complexity
                  </span>
                  <span className="text-light fw-bold" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>{selectedChallenge.spaceComplexity}</span>
                </div>
                <div className="d-flex flex-wrap justify-content-between p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <span className="text-secondary" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>
                    <CheckCircle className="me-1" style={{ width: 'clamp(0.7rem, 1.2vw, 0.8rem)', height: 'clamp(0.7rem, 1.2vw, 0.8rem)' }} /> Status
                  </span>
                  <span className={`text-${getStatusColor(selectedChallenge.status)} fw-bold`} style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>
                    {selectedChallenge.status}
                  </span>
                </div>
                {selectedChallenge.submissions > 0 && (
                  <>
                    <div className="d-flex flex-wrap justify-content-between p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                      <span className="text-secondary" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>
                        <Users className="me-1" style={{ width: 'clamp(0.7rem, 1.2vw, 0.8rem)', height: 'clamp(0.7rem, 1.2vw, 0.8rem)' }} /> Submissions
                      </span>
                      <span className="text-primary fw-bold" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>{selectedChallenge.submissions}</span>
                    </div>
                    <div className="d-flex flex-wrap justify-content-between p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                      <span className="text-secondary" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>
                        <Award className="me-1" style={{ width: 'clamp(0.7rem, 1.2vw, 0.8rem)', height: 'clamp(0.7rem, 1.2vw, 0.8rem)' }} /> Success Rate
                      </span>
                      <span className="text-success fw-bold" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>{selectedChallenge.successRate}%</span>
                    </div>
                  </>
                )}
                {selectedChallenge.description && (
                  <div className="p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <span className="text-secondary d-block mb-1" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                      <FileText className="me-1" style={{ width: 'clamp(0.7rem, 1.2vw, 0.8rem)', height: 'clamp(0.7rem, 1.2vw, 0.8rem)' }} /> Description
                    </span>
                    <span className="text-light small" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>{selectedChallenge.description}</span>
                  </div>
                )}
                <div className="d-flex flex-wrap justify-content-between p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <span className="text-secondary" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>
                    <Calendar className="me-1" style={{ width: 'clamp(0.7rem, 1.2vw, 0.8rem)', height: 'clamp(0.7rem, 1.2vw, 0.8rem)' }} /> Created
                  </span>
                  <span className="text-light" style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.65rem)' }}>{selectedChallenge.created}</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-top border-secondary">
                <button onClick={() => setShowDetailModal(false)} className="btn btn-secondary w-100" style={{ fontSize: 'clamp(0.6rem, 1vw, 0.7rem)', padding: '0.35rem 0.7rem' }}>
                  Close
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
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        .transition-all {
          transition: all 0.3s ease;
        }
        
        .space-y-2 > * + * {
          margin-top: 0.5rem;
        }
        
        .space-y-3 > * + * {
          margin-top: 0.75rem;
        }

        .min-w-0 {
          min-width: 0;
        }
        
        /* Card Styles */
        .card {
          transition: all 0.3s ease;
        }
        
        /* Form Controls */
        .form-control, .form-select {
          transition: all 0.3s ease;
          background-color: rgba(0,0,0,0.3) !important;
          border: 1px solid rgba(255,255,255,0.1);
          color: #ffffff !important;
        }
        
        .form-control:focus, .form-select:focus {
          border-color: rgba(79, 70, 229, 0.5) !important;
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1) !important;
          background-color: rgba(0,0,0,0.4) !important;
        }
        
        .form-control::placeholder {
          color: rgba(255,255,255,0.3) !important;
        }

        /* Scrollbar */
        ::-webkit-scrollbar {
          width: 4px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.05);
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(79, 70, 229, 0.3);
          border-radius: 10px;
        }

        @media (max-width: 576px) {
          .rounded-3 {
            border-radius: 8px !important;
          }
          .rounded-md-4 {
            border-radius: 10px !important;
          }
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
        }

        @media (min-width: 768px) and (max-width: 991px) {
          .card-body {
            padding: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
}