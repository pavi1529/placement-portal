import React, { useState, useEffect } from 'react';
import { 
  Clock, Award, CheckCircle, XCircle, AlertCircle, 
  Play, Pause, SkipForward, SkipBack, 
  LayoutDashboard, ListChecks, Medal, TrendingUp,
  Loader2, RefreshCw
} from 'lucide-react';

const API_URL = 'http://localhost:5000/api';

export default function MockTests() {
 
  const [activeTab, setActiveTab] = useState('easy');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Questions
  const [easyQuestions, setEasyQuestions] = useState([]);
  const [mediumQuestions, setMediumQuestions] = useState([]);
  const [hardQuestions, setHardQuestions] = useState([]);
  
  // Test State
  const [testActive, setTestActive] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(1800);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  
  // Results
  const [results, setResults] = useState({ correct: 0, wrong: 0, unanswered: 0, total: 0, score: 0 });

 
  const token = localStorage.getItem('studentToken');

 
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

 
  const fetchQuestions = async (difficulty) => {
    try {
      const data = await apiCall(`/admin/questions`);
      if (data.success) {
        const allQuestions = data.data || [];
        const filtered = allQuestions.filter(q => 
          q.difficulty?.toLowerCase() === difficulty.toLowerCase()
        );
        return filtered;
      }
      return [];
    } catch (error) {
      console.error(`Error fetching ${difficulty} questions:`, error);
      return getFallbackQuestions(difficulty);
    }
  };

 
  const getFallbackQuestions = (difficulty) => {
    const allQuestions = {
      easy: [
        { _id: '1', question: "What is the full form of URL?", category: "Technical", difficulty: "Easy", options: ["Uniform Resource Locator", "Universal Resource Locator", "Uniform Resource Link", "Universal Resource Link"], correctAnswer: "Uniform Resource Locator" },
        { _id: '2', question: "Which data structure uses LIFO principle?", category: "Technical", difficulty: "Easy", options: ["Queue", "Stack", "Array", "Linked List"], correctAnswer: "Stack" },
        { _id: '3', question: "What does CPU stand for?", category: "Technical", difficulty: "Easy", options: ["Central Processing Unit", "Computer Processing Unit", "Central Program Unit", "Computer Program Unit"], correctAnswer: "Central Processing Unit" }
      ],
      medium: [
        { _id: '4', question: "What is the time complexity of binary search?", category: "Technical", difficulty: "Medium", options: ["O(n)", "O(log n)", "O(n log n)", "O(n²)"], correctAnswer: "O(log n)" }
      ],
      hard: [
        { _id: '5', question: "What is the time complexity of building a heap of n elements?", category: "Technical", difficulty: "Hard", options: ["O(n log n)", "O(n)", "O(log n)", "O(n²)"], correctAnswer: "O(n)" }
      ]
    };
    return allQuestions[difficulty] || [];
  };

 
  const loadAllQuestions = async () => {
    setLoading(true);
    try {
      const [easy, medium, hard] = await Promise.all([
        fetchQuestions('easy'),
        fetchQuestions('medium'),
        fetchQuestions('hard')
      ]);
      
      setEasyQuestions(easy.length > 0 ? easy : getFallbackQuestions('easy'));
      setMediumQuestions(medium.length > 0 ? medium : getFallbackQuestions('medium'));
      setHardQuestions(hard.length > 0 ? hard : getFallbackQuestions('hard'));
    } catch (error) {
      console.error('Error loading questions:', error);
    } finally {
      setLoading(false);
    }
  };

 
  const getCurrentQuestions = () => {
    switch(activeTab) {
      case 'easy': return easyQuestions;
      case 'medium': return mediumQuestions;
      case 'hard': return hardQuestions;
      default: return easyQuestions;
    }
  };

  const currentQuestions = getCurrentQuestions();
  const totalQuestions = currentQuestions.length;
  const currentQuestion = currentQuestions[currentQuestionIndex] || null;


  const getDifficultyColor = (difficulty) => {
    const d = difficulty?.toLowerCase() || 'medium';
    if (d === 'easy') return 'success';
    if (d === 'medium') return 'warning';
    if (d === 'hard') return 'danger';
    return 'secondary';
  };

  const getTabIcon = (tab) => {
    if (tab === 'easy') return <CheckCircle className="text-success" style={{ width: '0.8rem', height: '0.8rem' }} />;
    if (tab === 'medium') return <AlertCircle className="text-warning" style={{ width: '0.8rem', height: '0.8rem' }} />;
    if (tab === 'hard') return <XCircle className="text-danger" style={{ width: '0.8rem', height: '0.8rem' }} />;
    return null;
  };

 
  
  // ✅ Option Select - Fixed
  const handleOptionSelect = (optionIndex) => {
    if (!testActive) {
      alert('Please start the test first!');
      return;
    }
    setSelectedOption(optionIndex);
    setAnswers({ ...answers, [currentQuestionIndex]: optionIndex });
  };

  // ✅ Next Button - Fixed
  const handleNext = () => {
    if (!testActive) {
      alert('Please start the test first!');
      return;
    }
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(answers[currentQuestionIndex + 1] || null);
    } else {
      alert('This is the last question! Click Submit to finish.');
    }
  };

  // ✅ Previous Button - Fixed
  const handlePrevious = () => {
    if (!testActive) {
      alert('Please start the test first!');
      return;
    }
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption(answers[currentQuestionIndex - 1] || null);
    }
  };

  // ✅ Submit Test - Fixed
  const handleSubmit = () => {
    if (!window.confirm('Are you sure you want to submit the test?')) return;

    let correct = 0;
    let wrong = 0;
    let unanswered = 0;

    currentQuestions.forEach((q, index) => {
      if (answers[index] === undefined) {
        unanswered++;
      } else if (answers[index] === q.correctAnswer || answers[index] === q.correct) {
        correct++;
      } else {
        wrong++;
      }
    });

    const total = currentQuestions.length;
    const score = total > 0 ? Math.round((correct / total) * 100) : 0;

    setResults({ correct, wrong, unanswered, total, score });
    setShowResults(true);
    setTestActive(false);
  };

  // ✅ Start Test - Fixed
  const handleStartTest = () => {
    setShowResults(false);
    setTestActive(true);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setSelectedOption(null);
    setTimeLeft(currentQuestions.length * 60 || 1800); // 1 min per question
  };

  // ✅ Tab Change - Fixed
  const handleTabChange = (tab) => {
    if (testActive) {
      if (!window.confirm('Test in progress. Switching tab will reset the test. Continue?')) return;
    }
    setActiveTab(tab);
    setTestActive(false);
    setShowResults(false);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setSelectedOption(null);
    setTimeLeft(1800);
  };


  useEffect(() => {
    let timer;
    if (testActive && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && testActive) {
      setTestActive(false);
      alert('Time is up! Submitting automatically...');
      handleSubmit();
    }
    return () => clearInterval(timer);
  }, [testActive, timeLeft]);

 
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

 
  useEffect(() => {
    loadAllQuestions();
  }, []);

 
  return (
    <div className="animate-fadeIn">
      {/* ==================== TABS ==================== */}
      <div className="card border-0 shadow-sm rounded-4 mb-4" style={{ background: '#ffffff', border: '1px solid #e9ecef' }}>
        <div className="card-body p-2">
          <div className="d-flex gap-2">
            {['easy', 'medium', 'hard'].map((tab) => {
              const counts = {
                easy: easyQuestions.length,
                medium: mediumQuestions.length,
                hard: hardQuestions.length
              };
              const colors = {
                easy: 'success',
                medium: 'warning',
                hard: 'danger'
              };
              return (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`btn btn-sm flex-grow-1 d-flex align-items-center justify-content-center gap-2 rounded-3 transition-all ${
                    activeTab === tab 
                      ? `btn-${colors[tab]} shadow-sm` 
                      : 'btn-outline-secondary text-secondary'
                  }`}
                  style={{ 
                    padding: '0.6rem 1rem', 
                    fontSize: '0.75rem', 
                    fontWeight: '600',
                    border: activeTab === tab ? 'none' : '1px solid #e9ecef'
                  }}
                >
                  {getTabIcon(tab)}
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  <span className="badge bg-light text-dark rounded-pill ms-1" style={{ fontSize: '0.55rem' }}>
                    {counts[tab]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {loading && (
        <div className="text-center p-5">
          <Loader2 className="spinner-border text-primary" style={{ width: '2rem', height: '2rem' }} />
          <p className="text-secondary mt-2">Loading questions...</p>
        </div>
      )}

      
      {!loading && totalQuestions === 0 && (
        <div className="card border-0 shadow-sm rounded-4 text-center p-5" style={{ background: '#ffffff', border: '1px solid #e9ecef' }}>
          <div className="display-6 mb-3">📝</div>
          <h5 className="text-dark">No Questions Available</h5>
          <p className="text-secondary small">No {activeTab} questions found in database</p>
          <button className="btn btn-primary btn-sm mt-2" onClick={loadAllQuestions}>
            <RefreshCw style={{ width: '0.8rem', height: '0.8rem' }} className="me-1" /> Refresh
          </button>
        </div>
      )}

     
      {!loading && totalQuestions > 0 && (
        <>
          {/* Test Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h5 className="text-dark fw-bold m-0">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Mock Test
              </h5>
              <p className="text-secondary small m-0">{totalQuestions} Questions</p>
            </div>
            <div className="d-flex align-items-center gap-3">
              <div className="badge bg-light text-dark border border-light px-3 py-2 rounded-pill">
                <Clock className="me-1" style={{ width: '0.8rem', height: '0.8rem' }} />
                {formatTime(timeLeft)}
              </div>
              {testActive && (
                <span className="badge bg-success bg-opacity-10 text-success border border-success">
                  <span className="d-inline-block rounded-circle bg-success me-1" style={{ width: '0.4rem', height: '0.4rem' }}></span>
                  Live
                </span>
              )}
              {!testActive && !showResults && (
                <span className="badge bg-secondary bg-opacity-10 text-secondary border border-secondary">
                  <Pause className="me-1" style={{ width: '0.6rem', height: '0.6rem' }} />
                  Paused
                </span>
              )}
              <span className="badge bg-primary bg-opacity-20 text-primary border border-primary">
                {currentQuestionIndex + 1}/{totalQuestions}
              </span>
            </div>
          </div>

          
          {showResults ? (
            <div className="card border-0 shadow-sm rounded-4" style={{ background: '#ffffff', border: '1px solid #e9ecef' }}>
              <div className="card-body p-4 text-center">
                <h5 className="text-dark fw-bold mb-4">Test Results</h5>
                
                <div className="position-relative d-inline-block mb-4">
                  <div className="rounded-circle d-flex align-items-center justify-content-center" style={{
                    width: '120px', height: '120px',
                    background: `conic-gradient(#4f46e5 ${results.score * 3.6}deg, rgba(0,0,0,0.05) 0deg)`,
                    border: '4px solid rgba(79,70,229,0.2)'
                  }}>
                    <div className="rounded-circle d-flex align-items-center justify-content-center flex-column" style={{
                      width: '100px', height: '100px',
                      background: '#ffffff'
                    }}>
                      <span className="display-5 fw-bold text-primary">{results.score}%</span>
                      <span className="text-secondary small">Score</span>
                    </div>
                  </div>
                </div>

                <div className="row g-3 mb-4">
                  <div className="col-4">
                    <div className="p-3 rounded-3" style={{ background: 'rgba(34,197,94,0.08)' }}>
                      <CheckCircle className="text-success" style={{ width: '1.5rem', height: '1.5rem' }} />
                      <h4 className="text-success fw-bold mt-2">{results.correct}</h4>
                      <span className="text-secondary small">Correct</span>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="p-3 rounded-3" style={{ background: 'rgba(239,68,68,0.08)' }}>
                      <XCircle className="text-danger" style={{ width: '1.5rem', height: '1.5rem' }} />
                      <h4 className="text-danger fw-bold mt-2">{results.wrong}</h4>
                      <span className="text-secondary small">Wrong</span>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="p-3 rounded-3" style={{ background: 'rgba(234,179,8,0.08)' }}>
                      <AlertCircle className="text-warning" style={{ width: '1.5rem', height: '1.5rem' }} />
                      <h4 className="text-warning fw-bold mt-2">{results.unanswered}</h4>
                      <span className="text-secondary small">Unanswered</span>
                    </div>
                  </div>
                </div>

                <div className="d-flex gap-2 justify-content-center">
                  <button className="btn btn-primary shadow-sm transition-all hover:scale-105" onClick={handleStartTest}>
                    <Play style={{ width: '0.8rem', height: '0.8rem' }} className="me-1" /> Retry Test
                  </button>
                  <button className="btn btn-outline-secondary transition-all hover:scale-105" onClick={() => {
                    setShowResults(false);
                    setCurrentQuestionIndex(0);
                  }}>
                    <ListChecks style={{ width: '0.8rem', height: '0.8rem' }} className="me-1" /> Review
                  </button>
                </div>
              </div>
            </div>
          ) : (
            
            <>
              <div className="card border-0 shadow-sm rounded-4 mb-4" style={{ background: '#ffffff', border: '1px solid #e9ecef' }}>
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-secondary small">
                      Question {currentQuestionIndex + 1} of {totalQuestions}
                    </span>
                    <div className="d-flex gap-2">
                      <span className={`badge bg-${getDifficultyColor(currentQuestion?.difficulty)} bg-opacity-10 text-${getDifficultyColor(currentQuestion?.difficulty)} border border-${getDifficultyColor(currentQuestion?.difficulty)}`}>
                        {currentQuestion?.difficulty || 'Medium'}
                      </span>
                      <span className="badge bg-primary bg-opacity-20 text-primary border border-primary">
                        {currentQuestion?.category || 'General'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Question Text */}
                  <h6 className="text-dark mb-3">{currentQuestion?.question || 'No question available'}</h6>
                  
                  {/* ✅ Options - FIXED: Clickable only when testActive */}
                  <div className="space-y-2">
                    {currentQuestion?.options?.map((option, index) => {
                      const isSelected = selectedOption === index;
                      const isAnswered = answers[currentQuestionIndex] !== undefined;
                      
                      return (
                        <div 
                          key={index}
                          className={`p-3 rounded-3 border cursor-pointer transition-all ${
                            isSelected ? 'border-primary bg-primary bg-opacity-10' : 
                            isAnswered && answers[currentQuestionIndex] === index ? 'border-success bg-success bg-opacity-10' :
                            'border-light hover:border-primary'
                          }`}
                          onClick={() => handleOptionSelect(index)}
                          style={{ 
                            cursor: testActive ? 'pointer' : 'not-allowed',
                            background: isSelected ? 'rgba(59,130,246,0.05)' : 
                                      isAnswered && answers[currentQuestionIndex] === index ? 'rgba(34,197,94,0.05)' :
                                      'rgba(0,0,0,0.01)',
                            opacity: testActive ? 1 : 0.7
                          }}
                        >
                          <span className="text-dark">{String.fromCharCode(65 + index)}. {option}</span>
                          {isSelected && testActive && (
                            <CheckCircle className="float-end text-primary" style={{ width: '1rem', height: '1rem' }} />
                          )}
                          {!testActive && isAnswered && answers[currentQuestionIndex] === index && (
                            <CheckCircle className="float-end text-success" style={{ width: '1rem', height: '1rem' }} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* ==================== CONTROLS - FIXED ==================== */}
              <div className="d-flex justify-content-between align-items-center">
                <button 
                  className="btn btn-outline-secondary d-flex align-items-center gap-1 shadow-sm transition-all hover:scale-105"
                  onClick={handlePrevious}
                  disabled={!testActive || currentQuestionIndex === 0}
                >
                  <SkipBack style={{ width: '0.8rem', height: '0.8rem' }} /> Previous
                </button>
                
                <div className="d-flex gap-2">
                  {!testActive && !showResults && (
                    <button 
                      className="btn btn-primary d-flex align-items-center gap-1 shadow-sm transition-all hover:scale-105"
                      onClick={handleStartTest}
                    >
                      <Play style={{ width: '0.8rem', height: '0.8rem' }} /> Start Test
                    </button>
                  )}
                  
                  {testActive && (
                    <>
                      <button 
                        className="btn btn-outline-secondary d-flex align-items-center gap-1 shadow-sm transition-all hover:scale-105"
                        onClick={() => setTestActive(false)}
                      >
                        <Pause style={{ width: '0.8rem', height: '0.8rem' }} /> Pause
                      </button>
                      <button 
                        className="btn btn-success d-flex align-items-center gap-1 shadow-sm transition-all hover:scale-105"
                        onClick={handleSubmit}
                      >
                        <Award style={{ width: '0.8rem', height: '0.8rem' }} /> Submit Test
                      </button>
                    </>
                  )}
                </div>

                <button 
                  className="btn btn-outline-primary d-flex align-items-center gap-1 shadow-sm transition-all hover:scale-105"
                  onClick={handleNext}
                  disabled={!testActive || currentQuestionIndex === totalQuestions - 1}
                >
                  Next <SkipForward style={{ width: '0.8rem', height: '0.8rem' }} />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="mt-3">
                <div className="d-flex justify-content-between small text-secondary">
                  <span>Progress</span>
                  <span>{totalQuestions > 0 ? Math.round((Object.keys(answers).length / totalQuestions) * 100) : 0}%</span>
                </div>
                <div className="progress" style={{ height: '4px', background: 'rgba(0,0,0,0.05)' }}>
                  <div 
                    className="progress-bar bg-primary" 
                    style={{ 
                      width: `${totalQuestions > 0 ? (Object.keys(answers).length / totalQuestions) * 100 : 0}%`,
                      borderRadius: '2px'
                    }}
                  ></div>
                </div>
              </div>
            </>
          )}
        </>
      )}

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        .transition-all {
          transition: all 0.3s ease;
        }
        
        .hover\\:scale-105:hover {
          transform: scale(1.05);
        }
        
        .cursor-pointer {
          cursor: pointer;
        }
        
        .space-y-2 > * + * {
          margin-top: 0.5rem;
        }
        
        .card {
          transition: all 0.3s ease;
        }
        
        .card:hover {
          box-shadow: 0 10px 30px rgba(0,0,0,0.08) !important;
        }
        
        .border-primary {
          border-color: #4f46e5 !important;
        }
        
        .border-success {
          border-color: #22c55e !important;
        }
        
        .btn-success {
          background: linear-gradient(135deg, #22c55e, #16a34a) !important;
          border: none !important;
        }
        
        .btn-success:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 30px rgba(34,197,94,0.3) !important;
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #4f46e5, #7c3aed) !important;
          border: none !important;
        }
        
        .btn-primary:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 30px rgba(79,70,229,0.3) !important;
        }
        
        ::-webkit-scrollbar {
          width: 4px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.05);
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(79,70,229,0.3);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}