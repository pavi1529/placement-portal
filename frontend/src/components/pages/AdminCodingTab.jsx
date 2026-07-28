import React, { useState } from 'react';
import { 
  Plus, Trash2, Edit2, Search, Filter, Eye, 
  Code2, Terminal, Award, Clock, Users, CheckCircle,
  XCircle, AlertCircle, Sparkles, Play, BookOpen,
  GitBranch, Cpu, Database, Globe
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
      case 'Easy': return <CheckCircle className="text-success" style={{ width: '0.7rem', height: '0.7rem' }} />;
      case 'Medium': return <AlertCircle className="text-warning" style={{ width: '0.7rem', height: '0.7rem' }} />;
      case 'Hard': return <XCircle className="text-danger" style={{ width: '0.7rem', height: '0.7rem' }} />;
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
      
      <div className="row g-3 mb-4">
        {[
          { label: "Total Challenges", value: totalChallenges, color: "primary", icon: Code2 },
          { label: "Active", value: activeChallenges, color: "success", icon: CheckCircle },
          { label: "Draft", value: draftChallenges, color: "warning", icon: Edit2 },
          { label: "Submissions", value: totalSubmissions, color: "info", icon: Users },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="col-6 col-lg-3">
              <div className="card border-0 shadow-lg rounded-4 h-100 transition-all hover:translate-y-1" style={{ background: 'rgba(20,20,30,0.6)', backdropFilter: 'blur(10px)' }}>
                <div className="card-body p-3">
                  <div className="d-flex align-items-center justify-content-between">
                    <span className="text-secondary small fw-bold text-uppercase" style={{ fontSize: '0.55rem' }}>{stat.label}</span>
                    <div className={`p-2 rounded-3`} style={{ background: `rgba(var(--bs-${stat.color}-rgb), 0.1)`, border: `1px solid rgba(var(--bs-${stat.color}-rgb), 0.2)` }}>
                      <Icon className={`text-${stat.color}`} style={{ width: '0.9rem', height: '0.9rem' }} />
                    </div>
                  </div>
                  <h4 className={`fw-bold text-${stat.color} mb-0`} style={{ fontSize: '1.5rem' }}>{stat.value}</h4>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      
      <div className="card border-0 shadow-lg rounded-4 mb-4" style={{ background: 'rgba(20,20,30,0.6)', backdropFilter: 'blur(10px)' }}>
        <div className="card-body p-3">
          <div className="d-flex flex-wrap gap-3 align-items-center">
            <div className="d-flex align-items-center gap-2 bg-dark px-3 py-2 rounded-3 border border-secondary flex-grow-1 transition-all focus-within:border-primary" style={{ maxWidth: '300px' }}>
              <Search className="text-secondary" style={{ width: '0.8rem', height: '0.8rem' }} />
              <input 
                type="text" 
                className="form-control form-control-sm bg-transparent border-0 text-light focus:outline-none" 
                placeholder="Search challenges..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ fontSize: '0.75rem' }}
              />
            </div>
            <div className="d-flex align-items-center gap-2 bg-dark px-3 py-2 rounded-3 border border-secondary">
              <Filter className="text-secondary" style={{ width: '0.7rem', height: '0.7rem' }} />
              <select 
                className="form-select form-select-sm bg-transparent border-0 text-light focus:outline-none" 
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value)}
                style={{ fontSize: '0.75rem', width: '140px' }}
              >
                <option value="ALL">All Difficulty</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
            <button 
              onClick={() => setShowAddModal(true)}
              className="btn btn-primary ms-auto d-flex align-items-center gap-1 shadow-lg shadow-primary/20 transition-all hover:scale-105"
              style={{ borderRadius: '10px', fontWeight: '600', padding: '0.5rem 1.2rem' }}
            >
              <Plus style={{ width: '0.8rem', height: '0.8rem' }} /> Add Challenge
            </button>
          </div>
        </div>
      </div>

     
      {filteredChallenges.length === 0 ? (
        <div className="card border-0 shadow-lg rounded-4 text-center p-5" style={{ background: 'rgba(20,20,30,0.6)', backdropFilter: 'blur(10px)' }}>
          <Code2 className="text-secondary mx-auto" style={{ width: '3rem', height: '3rem' }} />
          <h6 className="text-secondary mt-3">No challenges found</h6>
          <p className="text-secondary small">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="row g-4">
          {filteredChallenges.map((challenge, index) => (
            <div key={challenge.id} className="col-md-6 col-lg-4">
              <div 
                className="card border-0 shadow-lg rounded-4 h-100 transition-all hover:translate-y-2 animate-slide-up"
                style={{ 
                  background: 'rgba(20,20,30,0.6)', 
                  backdropFilter: 'blur(10px)',
                  animationDelay: `${index * 80}ms`
                }}
              >
                <div className="card-body p-4 d-flex flex-column">
                  {/* Challenge Header */}
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div className="d-flex align-items-center gap-2">
                      <div className="p-2 rounded-3" style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)' }}>
                        <Code2 className="text-primary" style={{ width: '1rem', height: '1rem' }} />
                      </div>
                      <h6 className="fw-bold text-light m-0" style={{ fontSize: '0.85rem' }}>{challenge.title}</h6>
                    </div>
                    <span className={`badge bg-${getDifficultyColor(challenge.difficulty)} bg-opacity-10 text-${getDifficultyColor(challenge.difficulty)} border border-${getDifficultyColor(challenge.difficulty)} d-inline-flex align-items-center gap-1`}>
                      {getDifficultyIcon(challenge.difficulty)}
                      {challenge.difficulty}
                    </span>
                  </div>

                  {/* Challenge Details */}
                  <div className="space-y-2 flex-grow-1">
                    <div className="d-flex justify-content-between p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                      <span className="text-secondary small"><Terminal className="me-1" style={{ width: '0.7rem', height: '0.7rem' }} /> Language</span>
                      <span className="text-light fw-bold" style={{ color: getLanguageColor(challenge.language) }}>
                        {challenge.language}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                      <span className="text-secondary small"><BookOpen className="me-1" style={{ width: '0.7rem', height: '0.7rem' }} /> Category</span>
                      <span className="text-light fw-bold">{challenge.category}</span>
                    </div>
                    <div className="d-flex justify-content-between p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                      <span className="text-secondary small"><Clock className="me-1" style={{ width: '0.7rem', height: '0.7rem' }} /> Time</span>
                      <span className="text-light fw-bold">{challenge.timeComplexity}</span>
                    </div>
                    <div className="d-flex justify-content-between p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                      <span className="text-secondary small"><Database className="me-1" style={{ width: '0.7rem', height: '0.7rem' }} /> Space</span>
                      <span className="text-light fw-bold">{challenge.spaceComplexity}</span>
                    </div>
                    {challenge.submissions > 0 && (
                      <div className="d-flex justify-content-between p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                        <span className="text-secondary small"><Users className="me-1" style={{ width: '0.7rem', height: '0.7rem' }} /> Success Rate</span>
                        <span className="text-success fw-bold">{challenge.successRate}%</span>
                      </div>
                    )}
                    <div className="d-flex justify-content-between p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                      <span className="text-secondary small"><CheckCircle className="me-1" style={{ width: '0.7rem', height: '0.7rem' }} /> Status</span>
                      <span className={`text-${getStatusColor(challenge.status)} fw-bold`}>{challenge.status}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-3 pt-3 border-top border-secondary d-flex justify-content-between align-items-center">
                    <span className="text-secondary small" style={{ fontSize: '0.55rem' }}>
                      <Calendar className="me-1" style={{ width: '0.6rem', height: '0.6rem' }} />
                      {challenge.created}
                    </span>
                    <div className="d-flex gap-1">
                      <button 
                        onClick={() => handleViewChallenge(challenge)}
                        className="btn btn-sm btn-outline-info d-flex align-items-center gap-1 shadow-sm transition-all hover:scale-105"
                        style={{ borderRadius: '8px' }}
                      >
                        <Eye style={{ width: '0.7rem', height: '0.7rem' }} />
                      </button>
                      <button 
                        onClick={() => handleEditChallenge(challenge)}
                        className="btn btn-sm btn-outline-warning d-flex align-items-center gap-1 shadow-sm transition-all hover:scale-105"
                        style={{ borderRadius: '8px' }}
                      >
                        <Edit2 style={{ width: '0.7rem', height: '0.7rem' }} />
                      </button>
                      <button 
                        onClick={() => handleDeleteChallenge(challenge.id)}
                        className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1 shadow-sm transition-all hover:scale-105"
                        style={{ borderRadius: '8px' }}
                      >
                        <Trash2 style={{ width: '0.7rem', height: '0.7rem' }} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

     
      {showAddModal && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ 
          zIndex: 9999, 
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(10px)',
          animation: 'fadeIn 0.3s ease'
        }}>
          <div className="card border-0 shadow-2xl rounded-4" style={{ maxWidth: '550px', width: '95%', background: 'rgba(20,20,30,0.95)', backdropFilter: 'blur(20px)' }}>
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-3 border-bottom border-secondary pb-3">
                <h5 className="text-light fw-bold m-0 d-flex align-items-center gap-2">
                  <Code2 className="text-primary" style={{ width: '1.2rem', height: '1.2rem' }} />
                  Add Coding Challenge
                </h5>
                <button onClick={() => setShowAddModal(false)} className="btn btn-close btn-close-white"></button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-secondary small fw-bold d-block mb-1">Challenge Title *</label>
                  <input 
                    type="text" 
                    className="form-control form-control-sm bg-dark text-light border-secondary focus:border-primary transition-all" 
                    placeholder="Enter challenge title"
                    value={newChallenge.title}
                    onChange={(e) => setNewChallenge({ ...newChallenge, title: e.target.value })}
                  />
                </div>
                <div className="row g-2">
                  <div className="col-6">
                    <label className="text-secondary small fw-bold d-block mb-1">Difficulty</label>
                    <select 
                      className="form-select form-select-sm bg-dark text-light border-secondary focus:border-primary transition-all" 
                      value={newChallenge.difficulty}
                      onChange={(e) => setNewChallenge({ ...newChallenge, difficulty: e.target.value })}
                    >
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>
                  <div className="col-6">
                    <label className="text-secondary small fw-bold d-block mb-1">Category</label>
                    <select 
                      className="form-select form-select-sm bg-dark text-light border-secondary focus:border-primary transition-all" 
                      value={newChallenge.category}
                      onChange={(e) => setNewChallenge({ ...newChallenge, category: e.target.value })}
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
                    <label className="text-secondary small fw-bold d-block mb-1">Language</label>
                    <select 
                      className="form-select form-select-sm bg-dark text-light border-secondary focus:border-primary transition-all" 
                      value={newChallenge.language}
                      onChange={(e) => setNewChallenge({ ...newChallenge, language: e.target.value })}
                    >
                      <option value="Python">Python</option>
                      <option value="Java">Java</option>
                      <option value="C++">C++</option>
                      <option value="C">C</option>
                      <option value="JavaScript">JavaScript</option>
                    </select>
                  </div>
                  <div className="col-6">
                    <label className="text-secondary small fw-bold d-block mb-1">Status</label>
                    <select 
                      className="form-select form-select-sm bg-dark text-light border-secondary focus:border-primary transition-all" 
                      value={newChallenge.status}
                      onChange={(e) => setNewChallenge({ ...newChallenge, status: e.target.value })}
                    >
                      <option value="Draft">Draft</option>
                      <option value="Active">Active</option>
                      <option value="Archived">Archived</option>
                    </select>
                  </div>
                </div>
                <div className="row g-2">
                  <div className="col-6">
                    <label className="text-secondary small fw-bold d-block mb-1">Time Complexity *</label>
                    <input 
                      type="text" 
                      className="form-control form-control-sm bg-dark text-light border-secondary focus:border-primary transition-all" 
                      placeholder="e.g., O(N log N)"
                      value={newChallenge.timeComplexity}
                      onChange={(e) => setNewChallenge({ ...newChallenge, timeComplexity: e.target.value })}
                    />
                  </div>
                  <div className="col-6">
                    <label className="text-secondary small fw-bold d-block mb-1">Space Complexity *</label>
                    <input 
                      type="text" 
                      className="form-control form-control-sm bg-dark text-light border-secondary focus:border-primary transition-all" 
                      placeholder="e.g., O(N)"
                      value={newChallenge.spaceComplexity}
                      onChange={(e) => setNewChallenge({ ...newChallenge, spaceComplexity: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-secondary small fw-bold d-block mb-1">Description</label>
                  <textarea 
                    rows={2}
                    className="form-control form-control-sm bg-dark text-light border-secondary focus:border-primary transition-all" 
                    placeholder="Challenge description..."
                    value={newChallenge.description}
                    onChange={(e) => setNewChallenge({ ...newChallenge, description: e.target.value })}
                  />
                </div>
              </div>

              <div className="mt-3 pt-3 border-top border-secondary d-flex gap-2">
                <button onClick={() => setShowAddModal(false)} className="btn btn-secondary flex-grow-1">Cancel</button>
                <button onClick={handleAddChallenge} className="btn btn-primary flex-grow-1 shadow-lg shadow-primary/20 transition-all hover:scale-105">
                  <Plus style={{ width: '0.8rem', height: '0.8rem' }} className="me-1" /> Add Challenge
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      
      {showEditModal && editChallenge && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ 
          zIndex: 9999, 
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(10px)',
          animation: 'fadeIn 0.3s ease'
        }}>
          <div className="card border-0 shadow-2xl rounded-4" style={{ maxWidth: '550px', width: '95%', background: 'rgba(20,20,30,0.95)', backdropFilter: 'blur(20px)' }}>
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-3 border-bottom border-secondary pb-3">
                <h5 className="text-light fw-bold m-0 d-flex align-items-center gap-2">
                  <Edit2 className="text-warning" style={{ width: '1.2rem', height: '1.2rem' }} />
                  Edit Challenge
                </h5>
                <button onClick={() => setShowEditModal(false)} className="btn btn-close btn-close-white"></button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-secondary small fw-bold d-block mb-1">Challenge Title *</label>
                  <input 
                    type="text" 
                    className="form-control form-control-sm bg-dark text-light border-secondary focus:border-primary transition-all" 
                    value={editChallenge.title}
                    onChange={(e) => setEditChallenge({ ...editChallenge, title: e.target.value })}
                  />
                </div>
                <div className="row g-2">
                  <div className="col-6">
                    <label className="text-secondary small fw-bold d-block mb-1">Difficulty</label>
                    <select 
                      className="form-select form-select-sm bg-dark text-light border-secondary focus:border-primary transition-all" 
                      value={editChallenge.difficulty}
                      onChange={(e) => setEditChallenge({ ...editChallenge, difficulty: e.target.value })}
                    >
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>
                  <div className="col-6">
                    <label className="text-secondary small fw-bold d-block mb-1">Category</label>
                    <select 
                      className="form-select form-select-sm bg-dark text-light border-secondary focus:border-primary transition-all" 
                      value={editChallenge.category}
                      onChange={(e) => setEditChallenge({ ...editChallenge, category: e.target.value })}
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
                    <label className="text-secondary small fw-bold d-block mb-1">Language</label>
                    <select 
                      className="form-select form-select-sm bg-dark text-light border-secondary focus:border-primary transition-all" 
                      value={editChallenge.language}
                      onChange={(e) => setEditChallenge({ ...editChallenge, language: e.target.value })}
                    >
                      <option value="Python">Python</option>
                      <option value="Java">Java</option>
                      <option value="C++">C++</option>
                      <option value="C">C</option>
                      <option value="JavaScript">JavaScript</option>
                    </select>
                  </div>
                  <div className="col-6">
                    <label className="text-secondary small fw-bold d-block mb-1">Status</label>
                    <select 
                      className="form-select form-select-sm bg-dark text-light border-secondary focus:border-primary transition-all" 
                      value={editChallenge.status}
                      onChange={(e) => setEditChallenge({ ...editChallenge, status: e.target.value })}
                    >
                      <option value="Draft">Draft</option>
                      <option value="Active">Active</option>
                      <option value="Archived">Archived</option>
                    </select>
                  </div>
                </div>
                <div className="row g-2">
                  <div className="col-6">
                    <label className="text-secondary small fw-bold d-block mb-1">Time Complexity *</label>
                    <input 
                      type="text" 
                      className="form-control form-control-sm bg-dark text-light border-secondary focus:border-primary transition-all" 
                      value={editChallenge.timeComplexity}
                      onChange={(e) => setEditChallenge({ ...editChallenge, timeComplexity: e.target.value })}
                    />
                  </div>
                  <div className="col-6">
                    <label className="text-secondary small fw-bold d-block mb-1">Space Complexity *</label>
                    <input 
                      type="text" 
                      className="form-control form-control-sm bg-dark text-light border-secondary focus:border-primary transition-all" 
                      value={editChallenge.spaceComplexity}
                      onChange={(e) => setEditChallenge({ ...editChallenge, spaceComplexity: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-secondary small fw-bold d-block mb-1">Description</label>
                  <textarea 
                    rows={2}
                    className="form-control form-control-sm bg-dark text-light border-secondary focus:border-primary transition-all" 
                    value={editChallenge.description}
                    onChange={(e) => setEditChallenge({ ...editChallenge, description: e.target.value })}
                  />
                </div>
              </div>

              <div className="mt-3 pt-3 border-top border-secondary d-flex gap-2">
                <button onClick={() => setShowEditModal(false)} className="btn btn-secondary flex-grow-1">Cancel</button>
                <button onClick={handleUpdateChallenge} className="btn btn-warning flex-grow-1 shadow-lg shadow-warning/20 transition-all hover:scale-105">
                  <Save style={{ width: '0.8rem', height: '0.8rem' }} className="me-1" /> Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

     
      {showDetailModal && selectedChallenge && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ 
          zIndex: 9999, 
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(10px)',
          animation: 'fadeIn 0.3s ease'
        }}>
          <div className="card border-0 shadow-2xl rounded-4" style={{ maxWidth: '550px', width: '95%', background: 'rgba(20,20,30,0.95)', backdropFilter: 'blur(20px)' }}>
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-3 border-bottom border-secondary pb-3">
                <h5 className="text-light fw-bold m-0 d-flex align-items-center gap-2">
                  <Code2 className="text-primary" style={{ width: '1.2rem', height: '1.2rem' }} />
                  Challenge Details
                </h5>
                <button onClick={() => setShowDetailModal(false)} className="btn btn-close btn-close-white"></button>
              </div>

              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="d-inline-flex align-items-center justify-content-center rounded-circle" style={{ 
                  width: '48px', height: '48px',
                  background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  color: '#fff'
                }}>
                  {selectedChallenge.title.charAt(0)}
                </div>
                <div>
                  <h5 className="text-light fw-bold m-0">{selectedChallenge.title}</h5>
                  <span className={`badge bg-${getDifficultyColor(selectedChallenge.difficulty)} bg-opacity-10 text-${getDifficultyColor(selectedChallenge.difficulty)} border border-${getDifficultyColor(selectedChallenge.difficulty)}`}>
                    {selectedChallenge.difficulty}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="d-flex justify-content-between p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <span className="text-secondary"><Terminal className="me-1" style={{ width: '0.8rem', height: '0.8rem' }} /> Language</span>
                  <span className="text-light fw-bold" style={{ color: getLanguageColor(selectedChallenge.language) }}>
                    {selectedChallenge.language}
                  </span>
                </div>
                <div className="d-flex justify-content-between p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <span className="text-secondary"><BookOpen className="me-1" style={{ width: '0.8rem', height: '0.8rem' }} /> Category</span>
                  <span className="text-light fw-bold">{selectedChallenge.category}</span>
                </div>
                <div className="d-flex justify-content-between p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <span className="text-secondary"><Clock className="me-1" style={{ width: '0.8rem', height: '0.8rem' }} /> Time Complexity</span>
                  <span className="text-light fw-bold">{selectedChallenge.timeComplexity}</span>
                </div>
                <div className="d-flex justify-content-between p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <span className="text-secondary"><Database className="me-1" style={{ width: '0.8rem', height: '0.8rem' }} /> Space Complexity</span>
                  <span className="text-light fw-bold">{selectedChallenge.spaceComplexity}</span>
                </div>
                <div className="d-flex justify-content-between p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <span className="text-secondary"><CheckCircle className="me-1" style={{ width: '0.8rem', height: '0.8rem' }} /> Status</span>
                  <span className={`text-${getStatusColor(selectedChallenge.status)} fw-bold`}>{selectedChallenge.status}</span>
                </div>
                {selectedChallenge.submissions > 0 && (
                  <>
                    <div className="d-flex justify-content-between p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                      <span className="text-secondary"><Users className="me-1" style={{ width: '0.8rem', height: '0.8rem' }} /> Submissions</span>
                      <span className="text-primary fw-bold">{selectedChallenge.submissions}</span>
                    </div>
                    <div className="d-flex justify-content-between p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                      <span className="text-secondary"><Award className="me-1" style={{ width: '0.8rem', height: '0.8rem' }} /> Success Rate</span>
                      <span className="text-success fw-bold">{selectedChallenge.successRate}%</span>
                    </div>
                  </>
                )}
                {selectedChallenge.description && (
                  <div className="p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <span className="text-secondary d-block mb-1"><FileText className="me-1" style={{ width: '0.8rem', height: '0.8rem' }} /> Description</span>
                    <span className="text-light small">{selectedChallenge.description}</span>
                  </div>
                )}
                <div className="d-flex justify-content-between p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <span className="text-secondary"><Calendar className="me-1" style={{ width: '0.8rem', height: '0.8rem' }} /> Created</span>
                  <span className="text-light">{selectedChallenge.created}</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-top border-secondary d-flex gap-2">
                <button onClick={() => setShowDetailModal(false)} className="btn btn-secondary w-100">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

     
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
        
        .animate-slide-up {
          animation: slide-up 0.4s ease-out forwards;
          opacity: 0;
        }
        
        .transition-all {
          transition: all 0.3s ease;
        }
        
        .hover\\:translate-y-1:hover {
          transform: translateY(-4px);
        }
        
        .hover\\:translate-y-2:hover {
          transform: translateY(-8px);
        }
        
        .hover\\:scale-105:hover {
          transform: scale(1.05);
        }
        
        .focus\\:border-primary:focus {
          border-color: #4f46e5 !important;
        }
        
        .focus\\:outline-none:focus {
          outline: none !important;
        }
        
        .space-y-2 > * + * {
          margin-top: 0.5rem;
        }
        
        .space-y-3 > * + * {
          margin-top: 0.75rem;
        }
        
        /* Card Styles */
        .card {
          transition: all 0.3s ease;
        }
        
        .card:hover {
          box-shadow: 0 20px 40px rgba(0,0,0,0.4) !important;
        }
        
        /* Form Controls */
        .form-control, .form-select {
          transition: all 0.3s ease;
        }
        
        .form-control:focus, .form-select:focus {
          border-color: rgba(79, 70, 229, 0.5) !important;
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1) !important;
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
      `}</style>
    </div>
  );
}