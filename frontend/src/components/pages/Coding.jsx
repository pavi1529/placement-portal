import React, { useState } from 'react';
import { 
  Code2, Terminal, Award, Clock, CheckCircle, Play, 
  ArrowRight, Zap, Brain, TrendingUp, Star, Sparkles, 
  BookOpen, Filter, Search, X, Maximize2, Minimize2,
  Send, RefreshCw, AlertCircle, Check, Copy
} from 'lucide-react';

export default function Coding() {
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [showCodeEditor, setShowCodeEditor] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState('Python');

 
  const problems = [
    
    { 
      id: 1, 
      title: "Reverse a String", 
      difficulty: "Easy", 
      category: "Strings", 
      language: "C",
      completed: true, 
      progress: 100, 
      desc: "Reverse a given string using pointers and array manipulation.",
      question: "Write a C program to reverse a given string using pointers without using any library function.",
      example: "Input: 'hello'\nOutput: 'olleh'",
      constraints: "1 ≤ string length ≤ 1000",
      sampleInput: "hello",
      sampleOutput: "olleh",
      starterCode: `#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char str[1000];\n    printf("Enter a string: ");\n    scanf("%s", str);\n    \n    // Write your code here\n    \n    return 0;\n}`
    },
    { 
      id: 2, 
      title: "Matrix Multiplication", 
      difficulty: "Medium", 
      category: "Arrays", 
      language: "C",
      completed: false, 
      progress: 30, 
      desc: "Multiply two matrices using nested loops and pointer arithmetic.",
      question: "Write a C program to multiply two matrices using nested loops.",
      example: "Input: matrix1=[[1,2],[3,4]], matrix2=[[5,6],[7,8]]\nOutput: [[19,22],[43,50]]",
      constraints: "1 ≤ matrix size ≤ 100",
      sampleInput: "2\n1 2\n3 4\n5 6\n7 8",
      sampleOutput: "19 22\n43 50",
      starterCode: `#include <stdio.h>\n\nint main() {\n    int a[10][10], b[10][10], result[10][10];\n    int r1, c1, r2, c2;\n    \n    printf("Enter rows and columns for first matrix: ");\n    scanf("%d %d", &r1, &c1);\n    \n    printf("Enter rows and columns for second matrix: ");\n    scanf("%d %d", &r2, &c2);\n    \n    // Write your code here\n    \n    return 0;\n}`
    },
    { 
      id: 3, 
      title: "Binary Search Implementation", 
      difficulty: "Medium", 
      category: "Algorithms", 
      language: "C",
      completed: false, 
      progress: 45, 
      desc: "Implement binary search algorithm on sorted integer array.",
      question: "Write a C program to implement binary search on a sorted array.",
      example: "Input: arr=[1,3,5,7,9], target=5\nOutput: Found at index 2",
      constraints: "1 ≤ array size ≤ 1000",
      sampleInput: "1 3 5 7 9\n5",
      sampleOutput: "Found at index 2",
      starterCode: `#include <stdio.h>\n\nint binarySearch(int arr[], int left, int right, int target) {\n    // Write your code here\n}\n\nint main() {\n    int arr[100], n, target;\n    printf("Enter array size: ");\n    scanf("%d", &n);\n    // Write your code here\n    return 0;\n}`
    },

   
    { 
      id: 4, 
      title: "Two Sum Problem", 
      difficulty: "Easy", 
      category: "Arrays", 
      language: "C++",
      completed: false, 
      progress: 60, 
      desc: "Find two numbers that add up to a target using hashmap.",
      question: "Write a C++ program to find two numbers in an array that sum to a target value.",
      example: "Input: nums=[2,7,11,15], target=9\nOutput: [0,1]",
      constraints: "1 ≤ array size ≤ 1000",
      sampleInput: "2 7 11 15\n9",
      sampleOutput: "[0,1]",
      starterCode: `#include <iostream>\n#include <vector>\n#include <unordered_map>\nusing namespace std;\n\nvector<int> twoSum(vector<int>& nums, int target) {\n    // Write your code here\n}\n\nint main() {\n    vector<int> nums = {2, 7, 11, 15};\n    int target = 9;\n    // Write your code here\n    return 0;\n}`
    },
    { 
      id: 5, 
      title: "Binary Tree Level Order", 
      difficulty: "Medium", 
      category: "Trees", 
      language: "C++",
      completed: false, 
      progress: 45, 
      desc: "Traverse binary tree level by level using queue data structure.",
      question: "Write a C++ program to perform level order traversal of a binary tree.",
      example: "Input: 1->2,1->3\nOutput: [[1],[2,3]]",
      constraints: "1 ≤ number of nodes ≤ 1000",
      sampleInput: "1 2 3",
      sampleOutput: "[[1],[2,3]]",
      starterCode: `#include <iostream>\n#include <vector>\n#include <queue>\nusing namespace std;\n\nstruct TreeNode {\n    int val;\n    TreeNode* left;\n    TreeNode* right;\n};\n\nvector<vector<int>> levelOrder(TreeNode* root) {\n    // Write your code here\n}\n\nint main() {\n    // Write your code here\n    return 0;\n}`
    },
    { 
      id: 6, 
      title: "Merge Sort Implementation", 
      difficulty: "Medium", 
      category: "Sorting", 
      language: "C++",
      completed: false, 
      progress: 78, 
      desc: "Implement merge sort algorithm using vectors and recursion.",
      question: "Write a C++ program to implement merge sort using vectors.",
      example: "Input: [5,2,4,6,1,3]\nOutput: [1,2,3,4,5,6]",
      constraints: "1 ≤ array size ≤ 1000",
      sampleInput: "5 2 4 6 1 3",
      sampleOutput: "1 2 3 4 5 6",
      starterCode: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid merge(vector<int>& arr, int left, int mid, int right) {\n    // Write your code here\n}\n\nvoid mergeSort(vector<int>& arr, int left, int right) {\n    // Write your code here\n}\n\nint main() {\n    vector<int> arr = {5, 2, 4, 6, 1, 3};\n    // Write your code here\n    return 0;\n}`
    },

   
    { 
      id: 7, 
      title: "Fibonacci - DP", 
      difficulty: "Easy", 
      category: "DP", 
      language: "Java",
      completed: false, 
      progress: 30, 
      desc: "Optimize Fibonacci with DP using memoization in Java.",
      question: "Write a Java program to find nth Fibonacci number using DP with memoization.",
      example: "Input: n=6\nOutput: 8",
      constraints: "1 ≤ n ≤ 100",
      sampleInput: "6",
      sampleOutput: "8",
      starterCode: `import java.util.*;\n\npublic class Main {\n    public static int fib(int n, int[] memo) {\n        // Write your code here\n    }\n    \n    public static void main(String[] args) {\n        int n = 6;\n        // Write your code here\n    }\n}`
    },
    { 
      id: 8, 
      title: "HashMap Implementation", 
      difficulty: "Hard", 
      category: "Data Structures", 
      language: "Java",
      completed: false, 
      progress: 20, 
      desc: "Implement custom HashMap with collision handling using chaining.",
      question: "Write a Java program to implement a custom HashMap with collision handling.",
      example: "Input: put('key1','value1'), get('key1')\nOutput: 'value1'",
      constraints: "1 ≤ number of entries ≤ 1000",
      sampleInput: "key1 value1",
      sampleOutput: "value1",
      starterCode: `import java.util.*;\n\nclass CustomHashMap<K, V> {\n    // Write your code here\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        // Write your code here\n    }\n}`
    },
    { 
      id: 9, 
      title: "Exception Handling", 
      difficulty: "Medium", 
      category: "Core Java", 
      language: "Java",
      completed: false, 
      progress: 55, 
      desc: "Practice try-catch-finally blocks and custom exceptions.",
      question: "Write a Java program to demonstrate try-catch-finally with custom exception.",
      example: "Input: age=15\nOutput: InvalidAgeException: Age must be 18+",
      constraints: "Age between 0-150",
      sampleInput: "15",
      sampleOutput: "InvalidAgeException: Age must be 18+",
      starterCode: `class InvalidAgeException extends Exception {\n    // Write your code here\n}\n\npublic class Main {\n    public static void validate(int age) throws InvalidAgeException {\n        // Write your code here\n    }\n    \n    public static void main(String[] args) {\n        // Write your code here\n    }\n}`
    },

   
    { 
      id: 10, 
      title: "Reverse k-group array", 
      difficulty: "Hard", 
      category: "Data Structures", 
      language: "Python",
      completed: false, 
      progress: 64, 
      desc: "Reverse nodes in k-group using linked pointer manipulation.",
      question: "Write a Python program to reverse nodes in k-groups in a linked list.",
      example: "Input: 1->2->3->4->5, k=3\nOutput: 3->2->1->5->4",
      constraints: "1 ≤ nodes ≤ 1000",
      sampleInput: "1 2 3 4 5 3",
      sampleOutput: "3 2 1 5 4",
      starterCode: `class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef reverseKGroup(head, k):\n    # Write your code here\n    pass\n\ndef main():\n    # Write your code here\n    pass\n\nif __name__ == "__main__":\n    main()`
    },
    { 
      id: 11, 
      title: "List Comprehension", 
      difficulty: "Easy", 
      category: "Python", 
      language: "Python",
      completed: true, 
      progress: 100, 
      desc: "Practice Python list comprehensions with conditional logic.",
      question: "Write a Python program to generate squares of even numbers using list comprehension.",
      example: "Input: [1,2,3,4,5]\nOutput: [4,16]",
      constraints: "1 ≤ list size ≤ 100",
      sampleInput: "1 2 3 4 5",
      sampleOutput: "[4,16]",
      starterCode: `def get_even_squares(numbers):\n    # Write your code here\n    pass\n\ndef main():\n    numbers = [1, 2, 3, 4, 5]\n    result = get_even_squares(numbers)\n    print(result)\n\nif __name__ == "__main__":\n    main()`
    },
    { 
      id: 12, 
      title: "Decorators Implementation", 
      difficulty: "Medium", 
      category: "Python", 
      language: "Python",
      completed: false, 
      progress: 70, 
      desc: "Create custom decorators for function logging and timing.",
      question: "Write a Python program to create a decorator that logs function execution time.",
      example: "Input: function call\nOutput: 'Function took X seconds'",
      constraints: "Any function",
      sampleInput: "my_func()",
      sampleOutput: "my_func took 0.001 seconds",
      starterCode: `import time\n\ndef timer_decorator(func):\n    # Write your code here\n    pass\n\n@timer_decorator\ndef my_function():\n    time.sleep(0.5)\n    print("Function executed")\n\ndef main():\n    my_function()\n\nif __name__ == "__main__":\n    main()`
    },

   
    { 
      id: 13, 
      title: "Join Queries Practice", 
      difficulty: "Medium", 
      category: "SQL", 
      language: "SQL",
      completed: false, 
      progress: 40, 
      desc: "Practice INNER JOIN, LEFT JOIN, RIGHT JOIN queries.",
      question: "Write a SQL query to join employees and departments tables.",
      example: "Input: employees.dept_id = departments.id\nOutput: Combined result",
      constraints: "1 ≤ records ≤ 1000",
      sampleInput: "SELECT * FROM employees JOIN departments ON employees.dept_id = departments.id",
      sampleOutput: "employee_id, name, department_name",
      starterCode: `-- Write your SQL query here\n-- Tables: employees(id, name, dept_id, salary)\n-- departments(id, dept_name)\n\n-- Example query:\nSELECT \n    e.id,\n    e.name,\n    e.salary,\n    d.dept_name\nFROM employees e\n-- Add your JOIN conditions here`
    },
    { 
      id: 14, 
      title: "Subquery Optimization", 
      difficulty: "Hard", 
      category: "SQL", 
      language: "SQL",
      completed: false, 
      progress: 25, 
      desc: "Optimize complex queries using subqueries and CTEs.",
      question: "Write a SQL query using subquery to find employees with salary > average.",
      example: "Input: SELECT * FROM employees WHERE salary > (SELECT AVG(salary) FROM employees)",
      constraints: "1 ≤ records ≤ 1000",
      sampleInput: "SELECT * FROM employees WHERE salary > (SELECT AVG(salary) FROM employees)",
      sampleOutput: "High salary employees",
      starterCode: `-- Write your SQL query here\n-- Find employees with salary above average\n\n-- Using subquery:\nSELECT \n    id,\n    name,\n    salary\nFROM employees\n-- Write your query here`
    },
    { 
      id: 15, 
      title: "Group By & Aggregate", 
      difficulty: "Easy", 
      category: "SQL", 
      language: "SQL",
      completed: false, 
      progress: 60, 
      desc: "Practice GROUP BY with COUNT, SUM, AVG, MAX, MIN functions.",
      question: "Write a SQL query to find count of employees per department.",
      example: "Input: SELECT department, COUNT(*) FROM employees GROUP BY department",
      constraints: "1 ≤ records ≤ 1000",
      sampleInput: "SELECT department, COUNT(*) FROM employees GROUP BY department",
      sampleOutput: "IT: 10, HR: 5",
      starterCode: `-- Write your SQL query here\n-- Group by department and count employees\n\nSELECT \n    department,\n    COUNT(*) as employee_count,\n    AVG(salary) as avg_salary\nFROM employees\n-- Write your query here`
    },
  ];

  // Get unique languages
  const languages = ['All', 'C', 'C++', 'Java', 'Python', 'SQL'];

  // Filter problems
  const filteredProblems = problems.filter(problem => {
    const matchesLanguage = selectedLanguage === 'All' || problem.language === selectedLanguage;
    const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          problem.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesLanguage && matchesSearch;
  });

  // Stats
  const totalProblems = filteredProblems.length;
  const solvedProblems = filteredProblems.filter(p => p.completed).length;
  const progressPercentage = totalProblems > 0 ? Math.round((solvedProblems / totalProblems) * 100) : 0;

  const stats = [
    { label: "Solved", value: solvedProblems, icon: CheckCircle, color: "success" },
    { label: "Total", value: totalProblems, icon: Code2, color: "primary" },
    { label: "Progress", value: `${progressPercentage}%`, icon: Zap, color: "warning" },
    { label: "Languages", value: languages.length - 1, icon: Terminal, color: "info" },
  ];

  const getDifficultyColor = (diff) => {
    switch(diff) {
      case 'Easy': return 'success';
      case 'Medium': return 'warning';
      case 'Hard': return 'danger';
      default: return 'secondary';
    }
  };

  const getDifficultyIcon = (diff) => {
    switch(diff) {
      case 'Easy': return <Star className="text-success" style={{ width: '0.7rem', height: '0.7rem' }} />;
      case 'Medium': return <TrendingUp className="text-warning" style={{ width: '0.7rem', height: '0.7rem' }} />;
      case 'Hard': return <Zap className="text-danger" style={{ width: '0.7rem', height: '0.7rem' }} />;
      default: return null;
    }
  };

  // Language color mapping
  const getLanguageColor = (lang) => {
    switch(lang) {
      case 'C': return '#6c5ce7';
      case 'C++': return '#00599c';
      case 'Java': return '#f89820';
      case 'Python': return '#3776ab';
      case 'SQL': return '#4479a1';
      default: return '#94a3b8';
    }
  };

  const handleLaunchProblem = (problem) => {
    setSelectedProblem(problem);
    setCode(problem.starterCode || '// Write your code here');
    setOutput('');
    setActiveLanguage(problem.language === 'C' ? 'C' : 
                       problem.language === 'C++' ? 'C++' : 
                       problem.language === 'Java' ? 'Java' : 
                       problem.language === 'Python' ? 'Python' : 'Python');
    setShowQuestionModal(true);
    setShowCodeEditor(false);
  };

  const handleStartCoding = () => {
    setShowQuestionModal(false);
    setShowCodeEditor(true);
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setOutput('');
    
    // Simulate code execution
    setTimeout(() => {
      if (selectedProblem) {
        let outputText = `✅ Program executed successfully!\n\n`;
        outputText += `📤 Output:\n`;
        outputText += `${selectedProblem.sampleOutput || 'Output will appear here'}\n\n`;
        outputText += `⏱️ Execution time: 0.0${Math.floor(Math.random() * 50 + 10)}s\n`;
        outputText += `📊 Memory used: ${Math.floor(Math.random() * 5 + 2)} MB`;
        setOutput(outputText);
      } else {
        setOutput('❌ Error: No program to run');
      }
      setIsRunning(false);
    }, 1500);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    alert('Code copied to clipboard!');
  };

  const handleResetCode = () => {
    if (selectedProblem) {
      setCode(selectedProblem.starterCode || '// Write your code here');
      setOutput('');
    }
  };

  return (
    <div>
      {/* Stats Cards */}
      <div className="row g-3 mb-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="col-6 col-lg-3">
              <div 
                className="card border-0 shadow-sm rounded-4 overflow-hidden"
                style={{ 
                  background: '#ffffff',
                  border: '1px solid #e9ecef',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.05)';
                }}
              >
                <div className="card-body p-3">
                  <div className="d-flex align-items-center justify-content-between">
                    <span className="text-secondary small fw-bold text-uppercase" style={{ fontSize: '0.55rem' }}>
                      {stat.label}
                    </span>
                    <div 
                      className="p-1.5 rounded-3"
                      style={{ 
                        background: `rgba(var(--bs-${stat.color}-rgb), 0.08)`,
                        border: `1px solid rgba(var(--bs-${stat.color}-rgb), 0.12)`
                      }}
                    >
                      <Icon className={`text-${stat.color}`} style={{ width: '0.9rem', height: '0.9rem' }} />
                    </div>
                  </div>
                  <h4 className={`fw-bold text-${stat.color} mb-0`} style={{ fontSize: '1.5rem' }}>
                    {stat.value}
                  </h4>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Language Filter */}
      <div 
        className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4"
        style={{ 
          background: '#ffffff',
          border: '1px solid #e9ecef',
          boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
        }}
      >
        <div className="card-body p-3">
          <div className="d-flex flex-wrap gap-2 align-items-center">
            <div className="d-flex align-items-center gap-2 me-2">
              <Terminal className="text-primary" style={{ width: '0.9rem', height: '0.9rem' }} />
              <span className="text-secondary small fw-bold">Languages:</span>
            </div>
            
            {languages.map((lang, idx) => (
              <button 
                key={idx}
                onClick={() => setSelectedLanguage(lang)}
                className={`btn btn-sm px-3 py-1.5 rounded-3 transition-all duration-300 ${
                  selectedLanguage === lang 
                    ? 'text-white shadow-sm' 
                    : 'text-secondary hover:text-dark'
                }`}
                style={{ 
                  background: selectedLanguage === lang 
                    ? lang === 'All' 
                      ? 'linear-gradient(135deg, #3b82f6, #8b5cf6)' 
                      : getLanguageColor(lang)
                    : 'rgba(0,0,0,0.03)',
                  border: selectedLanguage === lang 
                    ? 'none' 
                    : '1px solid #e9ecef',
                  fontSize: '0.6rem',
                  fontWeight: 'bold',
                  color: selectedLanguage === lang ? '#ffffff' : '#6b7280'
                }}
              >
                {lang}
              </button>
            ))}

            {/* Search */}
            <div className="flex-grow-1 d-flex align-items-center gap-2 px-3 py-1.5 rounded-3 ms-2" style={{ 
              background: 'rgba(0,0,0,0.03)',
              border: '1px solid #e9ecef',
              maxWidth: '250px'
            }}>
              <Search className="text-secondary" style={{ width: '0.8rem', height: '0.8rem' }} />
              <input 
                type="text" 
                className="form-control form-control-sm bg-transparent border-0 text-dark" 
                placeholder="Search problems..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ fontSize: '0.7rem' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Problems List */}
      {filteredProblems.length === 0 ? (
        <div 
          className="card border-0 shadow-sm rounded-4 overflow-hidden text-center p-5"
          style={{ 
            background: '#ffffff',
            border: '1px solid #e9ecef',
          }}
        >
          <Code2 className="text-secondary mx-auto" style={{ width: '3rem', height: '3rem' }} />
          <h6 className="text-secondary mt-3">No problems found</h6>
          <p className="text-secondary small">Try selecting a different language or search term</p>
        </div>
      ) : (
        <div className="row g-3">
          {filteredProblems.map((problem, index) => (
            <div key={problem.id} className="col-12">
              <div 
                className="card border-0 shadow-sm rounded-4 overflow-hidden animate-slide-up"
                style={{ 
                  animationDelay: `${index * 50}ms`,
                  background: '#ffffff',
                  border: `1px solid ${problem.completed ? 'rgba(34, 197, 94, 0.2)' : '#e9ecef'}`,
                  transition: 'all 0.4s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px) scale(1.005)';
                  e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.08)';
                  e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.05)';
                  e.currentTarget.style.borderColor = problem.completed ? 'rgba(34, 197, 94, 0.2)' : '#e9ecef';
                }}
              >
                <div className="card-body p-4">
                  <div className="d-flex flex-wrap justify-content-between align-items-start gap-3">
                    <div className="flex-grow-1">
                      <div className="d-flex align-items-center gap-3 mb-2">
                        {problem.completed && (
                          <CheckCircle className="text-success" style={{ width: '1rem', height: '1rem' }} />
                        )}
                        <h6 className={`fw-bold m-0 ${problem.completed ? 'text-success' : 'text-dark'}`}>
                          {problem.title}
                        </h6>
                        <span className="badge px-2 py-1" style={{ 
                          background: `${getLanguageColor(problem.language)}25`,
                          color: getLanguageColor(problem.language),
                          border: `1px solid ${getLanguageColor(problem.language)}40`,
                          fontSize: '0.5rem'
                        }}>
                          {problem.language}
                        </span>
                        <Sparkles className="text-warning" style={{ width: '0.7rem', height: '0.7rem' }} />
                      </div>
                      <div className="d-flex flex-wrap gap-2">
                        <span className={`badge bg-${getDifficultyColor(problem.difficulty)} bg-opacity-10 text-${getDifficultyColor(problem.difficulty)} border border-${getDifficultyColor(problem.difficulty)} d-flex align-items-center gap-1 px-2 py-1`}>
                          {getDifficultyIcon(problem.difficulty)}
                          {problem.difficulty}
                        </span>
                        <span className="badge px-2 py-1" style={{ background: 'rgba(6, 182, 212, 0.08)', color: '#0891b2', border: '1px solid rgba(6, 182, 212, 0.12)' }}>
                          <BookOpen className="me-1" style={{ width: '0.6rem', height: '0.6rem' }} />
                          {problem.category}
                        </span>
                      </div>
                      <p className="text-secondary small mt-2 mb-0">{problem.desc}</p>
                    </div>

                    <div className="d-flex flex-column align-items-end gap-2">
                      <div className="d-flex align-items-center gap-2 w-100">
                        <span className="text-secondary" style={{ fontSize: '0.55rem' }}>
                          {problem.progress}%
                        </span>
                        <div className="rounded-pill" style={{ width: '80px', height: '4px', background: 'rgba(0,0,0,0.05)' }}>
                          <div 
                            className="rounded-pill h-100"
                            style={{ 
                              width: `${problem.progress}%`,
                              background: problem.completed 
                                ? 'linear-gradient(90deg, #22c55e, #4ade80)' 
                                : 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                              transition: 'width 0.5s ease'
                            }}
                          ></div>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleLaunchProblem(problem)}
                        className={`btn btn-sm px-4 py-2 rounded-3 d-flex align-items-center gap-1 ${
                          problem.completed ? 'btn-success' : 'btn-primary'
                        }`}
                        style={{ 
                          fontWeight: '600',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                      >
                        {problem.completed ? (
                          <>
                            <CheckCircle style={{ width: '0.7rem', height: '0.7rem' }} />
                            Completed
                          </>
                        ) : (
                          <>
                            <Play style={{ width: '0.7rem', height: '0.7rem' }} />
                            Launch
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

     
      {showQuestionModal && selectedProblem && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ 
            zIndex: 9999, 
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(5px)',
            animation: 'fadeIn 0.3s ease'
          }}
        >
          <div 
            className="bg-white border border-light rounded-4 shadow-xl"
            style={{ 
              maxWidth: isFullScreen ? '100%' : '800px',
              width: isFullScreen ? '100%' : '90%',
              height: isFullScreen ? '100%' : 'auto',
              maxHeight: isFullScreen ? '100%' : '80vh',
              margin: isFullScreen ? '0' : '20px',
              animation: 'slideUp 0.3s ease',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Modal Header */}
            <div className="p-4 border-bottom border-light d-flex justify-content-between align-items-center" style={{ background: 'rgba(0,0,0,0.02)' }}>
              <div className="d-flex align-items-center gap-3">
                <div 
                  className="p-2 rounded-3"
                  style={{ 
                    background: `${getLanguageColor(selectedProblem.language)}25`,
                    border: `1px solid ${getLanguageColor(selectedProblem.language)}40`
                  }}
                >
                  <Code2 className="text-primary" style={{ width: '1.2rem', height: '1.2rem' }} />
                </div>
                <div>
                  <h6 className="text-dark fw-bold m-0">{selectedProblem.title}</h6>
                  <div className="d-flex gap-2 mt-1">
                    <span className="badge px-2 py-0.5" style={{ 
                      background: `${getLanguageColor(selectedProblem.language)}25`,
                      color: getLanguageColor(selectedProblem.language),
                      border: `1px solid ${getLanguageColor(selectedProblem.language)}40`,
                      fontSize: '0.5rem'
                    }}>
                      {selectedProblem.language}
                    </span>
                    <span className={`badge bg-${getDifficultyColor(selectedProblem.difficulty)} bg-opacity-10 text-${getDifficultyColor(selectedProblem.difficulty)} border border-${getDifficultyColor(selectedProblem.difficulty)}`} style={{ fontSize: '0.5rem' }}>
                      {selectedProblem.difficulty}
                    </span>
                  </div>
                </div>
              </div>
              <div className="d-flex gap-2">
                <button 
                  onClick={() => setIsFullScreen(!isFullScreen)}
                  className="btn btn-sm text-secondary hover:text-dark"
                  style={{ background: 'transparent', border: 'none' }}
                >
                  {isFullScreen ? (
                    <Minimize2 style={{ width: '1rem', height: '1rem' }} />
                  ) : (
                    <Maximize2 style={{ width: '1rem', height: '1rem' }} />
                  )}
                </button>
                <button 
                  onClick={() => setShowQuestionModal(false)}
                  className="btn btn-sm text-secondary hover:text-dark"
                  style={{ background: 'transparent', border: 'none' }}
                >
                  <X style={{ width: '1.2rem', height: '1.2rem' }} />
                </button>
              </div>
            </div>

            {/* Modal Body - Question Content */}
            <div className="p-4 overflow-auto" style={{ flex: 1 }}>
              {/* Question */}
              <div className="mb-4">
                <h6 className="text-primary fw-bold text-uppercase" style={{ fontSize: '0.6rem', letterSpacing: '0.05em' }}>
                  <Brain className="me-1" style={{ width: '0.8rem', height: '0.8rem' }} />
                  Question
                </h6>
                <p className="text-dark" style={{ fontSize: '0.9rem' }}>{selectedProblem.question}</p>
              </div>

              {/* Example */}
              {selectedProblem.example && (
                <div className="mb-3">
                  <h6 className="text-secondary fw-bold text-uppercase" style={{ fontSize: '0.6rem', letterSpacing: '0.05em' }}>
                    Example
                  </h6>
                  <div className="bg-light p-3 rounded-3" style={{ border: '1px solid #e9ecef' }}>
                    <pre className="text-secondary mb-0" style={{ fontSize: '0.8rem', fontFamily: 'monospace' }}>
                      {selectedProblem.example}
                    </pre>
                  </div>
                </div>
              )}

              {/* Sample Input/Output */}
              <div className="row g-3">
                {selectedProblem.sampleInput && (
                  <div className="col-md-6">
                    <h6 className="text-secondary fw-bold text-uppercase" style={{ fontSize: '0.6rem', letterSpacing: '0.05em' }}>
                      Sample Input
                    </h6>
                    <div className="bg-light p-3 rounded-3" style={{ border: '1px solid #e9ecef' }}>
                      <pre className="text-success mb-0" style={{ fontSize: '0.8rem', fontFamily: 'monospace' }}>
                        {selectedProblem.sampleInput}
                      </pre>
                    </div>
                  </div>
                )}
                {selectedProblem.sampleOutput && (
                  <div className="col-md-6">
                    <h6 className="text-secondary fw-bold text-uppercase" style={{ fontSize: '0.6rem', letterSpacing: '0.05em' }}>
                      Sample Output
                    </h6>
                    <div className="bg-light p-3 rounded-3" style={{ border: '1px solid #e9ecef' }}>
                      <pre className="text-info mb-0" style={{ fontSize: '0.8rem', fontFamily: 'monospace' }}>
                        {selectedProblem.sampleOutput}
                      </pre>
                    </div>
                  </div>
                )}
              </div>

              {/* Constraints */}
              {selectedProblem.constraints && (
                <div className="mt-3">
                  <h6 className="text-secondary fw-bold text-uppercase" style={{ fontSize: '0.6rem', letterSpacing: '0.05em' }}>
                    Constraints
                  </h6>
                  <div className="bg-light p-3 rounded-3" style={{ border: '1px solid #e9ecef' }}>
                    <p className="text-warning mb-0" style={{ fontSize: '0.8rem' }}>{selectedProblem.constraints}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3 border-top border-light d-flex justify-content-end gap-2" style={{ background: 'rgba(0,0,0,0.02)' }}>
              <button 
                onClick={() => setShowQuestionModal(false)}
                className="btn btn-secondary btn-sm px-4"
              >
                Close
              </button>
              <button 
                onClick={handleStartCoding}
                className="btn btn-primary btn-sm px-4 d-flex align-items-center gap-1"
              >
                <Play style={{ width: '0.8rem', height: '0.8rem' }} />
                Start Coding
              </button>
            </div>
          </div>
        </div>
      )}

   
      {showCodeEditor && selectedProblem && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ 
            zIndex: 9998, 
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(5px)',
            animation: 'fadeIn 0.3s ease'
          }}
        >
          <div 
            className="bg-white border border-light rounded-4 shadow-xl"
            style={{ 
              maxWidth: isFullScreen ? '100%' : '1200px',
              width: isFullScreen ? '100%' : '95%',
              height: isFullScreen ? '100%' : '90vh',
              margin: isFullScreen ? '0' : '20px',
              animation: 'slideUp 0.3s ease',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Editor Header */}
            <div className="p-3 border-bottom border-light d-flex justify-content-between align-items-center" style={{ background: 'rgba(0,0,0,0.02)' }}>
              <div className="d-flex align-items-center gap-3">
                <div 
                  className="p-2 rounded-3"
                  style={{ 
                    background: `${getLanguageColor(selectedProblem.language)}25`,
                    border: `1px solid ${getLanguageColor(selectedProblem.language)}40`
                  }}
                >
                  <Code2 className="text-primary" style={{ width: '1rem', height: '1rem' }} />
                </div>
                <div>
                  <h6 className="text-dark fw-bold m-0" style={{ fontSize: '0.9rem' }}>{selectedProblem.title}</h6>
                  <span className="text-secondary" style={{ fontSize: '0.65rem' }}>Code Editor</span>
                </div>
              </div>
              <div className="d-flex gap-2">
                <select 
                  className="form-select form-select-sm bg-white text-dark border-light"
                  value={activeLanguage}
                  onChange={(e) => setActiveLanguage(e.target.value)}
                  style={{ 
                    fontSize: '0.65rem',
                    borderRadius: '8px',
                    width: '120px',
                    borderColor: '#e9ecef'
                  }}
                >
                  <option value="C">C</option>
                  <option value="C++">C++</option>
                  <option value="Java">Java</option>
                  <option value="Python">Python</option>
                  <option value="SQL">SQL</option>
                </select>
                <button 
                  onClick={handleResetCode}
                  className="btn btn-sm text-secondary hover:text-dark"
                  style={{ background: 'rgba(0,0,0,0.03)', border: '1px solid #e9ecef' }}
                >
                  <RefreshCw style={{ width: '0.8rem', height: '0.8rem' }} />
                </button>
                <button 
                  onClick={handleCopyCode}
                  className="btn btn-sm text-secondary hover:text-dark"
                  style={{ background: 'rgba(0,0,0,0.03)', border: '1px solid #e9ecef' }}
                >
                  <Copy style={{ width: '0.8rem', height: '0.8rem' }} />
                </button>
                <button 
                  onClick={() => setIsFullScreen(!isFullScreen)}
                  className="btn btn-sm text-secondary hover:text-dark"
                  style={{ background: 'rgba(0,0,0,0.03)', border: '1px solid #e9ecef' }}
                >
                  {isFullScreen ? (
                    <Minimize2 style={{ width: '0.8rem', height: '0.8rem' }} />
                  ) : (
                    <Maximize2 style={{ width: '0.8rem', height: '0.8rem' }} />
                  )}
                </button>
                <button 
                  onClick={() => { setShowCodeEditor(false); setShowQuestionModal(false); }}
                  className="btn btn-sm text-secondary hover:text-dark"
                  style={{ background: 'rgba(0,0,0,0.03)', border: '1px solid #e9ecef' }}
                >
                  <X style={{ width: '1rem', height: '1rem' }} />
                </button>
              </div>
            </div>

            {/* Editor Body */}
            <div className="row g-0 flex-1" style={{ flex: 1, minHeight: '300px' }}>
              {/* Code Editor */}
              <div className="col-md-7 p-3" style={{ background: '#f8f9fa' }}>
                <div className="d-flex gap-2 mb-2">
                  <span className="text-secondary" style={{ fontSize: '0.6rem' }}>Line 1</span>
                </div>
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-100 h-100 border-0"
                  style={{ 
                    background: 'transparent',
                    color: '#1a1a2e',
                    fontFamily: 'monospace',
                    fontSize: '0.85rem',
                    resize: 'none',
                    outline: 'none',
                    minHeight: '300px',
                    lineHeight: '1.6'
                  }}
                  spellCheck="false"
                />
              </div>

              {/* Output Panel */}
              <div className="col-md-5 p-3 border-start border-light" style={{ background: 'rgba(0,0,0,0.02)' }}>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-secondary fw-bold" style={{ fontSize: '0.65rem' }}>
                    <Terminal className="me-1" style={{ width: '0.7rem', height: '0.7rem' }} />
                    Output
                  </span>
                  {output && (
                    <button 
                      onClick={() => setOutput('')}
                      className="btn btn-sm text-secondary"
                      style={{ background: 'transparent', border: 'none', fontSize: '0.55rem' }}
                    >
                      Clear
                    </button>
                  )}
                </div>
                <div 
                  className="p-3 rounded-3"
                  style={{ 
                    background: 'rgba(0,0,0,0.02)',
                    border: '1px solid #e9ecef',
                    minHeight: '250px',
                    maxHeight: '400px',
                    overflow: 'auto',
                    fontFamily: 'monospace',
                    fontSize: '0.8rem',
                    color: '#6b7280'
                  }}
                >
                  {output || 'Run your code to see output here...'}
                </div>
              </div>
            </div>

            {/* Editor Footer */}
            <div className="p-3 border-top border-light d-flex justify-content-between align-items-center" style={{ background: 'rgba(0,0,0,0.02)' }}>
              <span className="text-secondary" style={{ fontSize: '0.55rem' }}>
                {activeLanguage} • {selectedProblem.language}
              </span>
              <div className="d-flex gap-2">
                <button 
                  onClick={() => { setShowCodeEditor(false); setShowQuestionModal(true); }}
                  className="btn btn-secondary btn-sm px-3"
                >
                  Back
                </button>
                <button 
                  onClick={handleRunCode}
                  disabled={isRunning}
                  className="btn btn-success btn-sm px-4 d-flex align-items-center gap-1"
                >
                  {isRunning ? (
                    <>
                      <span className="spinner-border spinner-border-sm" style={{ width: '0.7rem', height: '0.7rem' }}></span>
                      Running...
                    </>
                  ) : (
                    <>
                      <Send style={{ width: '0.7rem', height: '0.7rem' }} />
                      Run Code
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-slide-up {
          animation: slide-up 0.4s ease-out forwards;
          opacity: 0;
        }

        .card {
          position: relative;
        }

        .card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 16px;
          padding: 1px;
          background: linear-gradient(135deg, rgba(0,0,0,0.04), transparent);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        .overflow-auto::-webkit-scrollbar {
          width: 6px;
        }

        .overflow-auto::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.03);
          border-radius: 10px;
        }

        .overflow-auto::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.3);
          border-radius: 10px;
        }

        textarea {
          scrollbar-width: thin;
        }

        textarea::-webkit-scrollbar {
          width: 6px;
        }

        textarea::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.03);
        }

        textarea::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.3);
          border-radius: 10px;
        }

        .spinner-border {
          animation: spinner-border 0.75s linear infinite;
        }

        @keyframes spinner-border {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}