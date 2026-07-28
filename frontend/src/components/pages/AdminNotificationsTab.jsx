import React, { useState } from 'react';
import { 
  Send, Bell, Users, Megaphone, Clock, CheckCircle, 
  AlertCircle, Calendar, Mail, MessageSquare, Sparkles,
  TrendingUp, BarChart3, Eye, XCircle, Edit2, Trash2
} from 'lucide-react';

export default function AdminNotificationsTab({ bulkNotif, setBulkNotif }) {
  const [activeTab, setActiveTab] = useState('broadcast');
  const [message, setMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  // Sample notification history
  const [notificationHistory, setNotificationHistory] = useState([
    { 
      id: 1, 
      title: "New Placement Drive - Zoho", 
      category: "Placement News",
      audience: "All Students",
      sentAt: "2026-07-15 10:30",
      status: "Delivered",
      recipients: 482
    },
    { 
      id: 2, 
      title: "Mock Test Schedule Update", 
      category: "Exam Updates",
      audience: "CSE Only",
      sentAt: "2026-07-14 14:20",
      status: "Delivered",
      recipients: 150
    },
    { 
      id: 3, 
      title: "Interview Tips & Tricks", 
      category: "Career Advice",
      audience: "All Students",
      sentAt: "2026-07-13 09:00",
      status: "Pending",
      recipients: 0
    },
  ]);

  // Stats
  const totalNotifications = notificationHistory.length;
  const deliveredCount = notificationHistory.filter(n => n.status === 'Delivered').length;
  const pendingCount = notificationHistory.filter(n => n.status === 'Pending').length;
  const totalRecipients = notificationHistory.reduce((sum, n) => sum + n.recipients, 0);

  // Handle Broadcast
  const handleBroadcast = () => {
    if (!message) {
      alert('Please type a message!');
      return;
    }

    // Create new notification
    const newNotif = {
      id: Date.now(),
      title: message.slice(0, 30) + (message.length > 30 ? '...' : ''),
      category: bulkNotif?.category || 'PLACEMENT_NEWS',
      audience: bulkNotif?.target || 'ALL',
      sentAt: new Date().toLocaleString(),
      status: 'Pending',
      recipients: 0
    };

    setNotificationHistory([newNotif, ...notificationHistory]);
    setShowSuccess(true);
    setMessage('');

    // Reset success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  // Handle Delete Notification
  const handleDeleteNotification = (id) => {
    if (window.confirm('Are you sure you want to delete this notification?')) {
      setNotificationHistory(notificationHistory.filter(n => n.id !== id));
    }
  };

  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered': return 'success';
      case 'Pending': return 'warning';
      case 'Failed': return 'danger';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Delivered': return <CheckCircle className="text-success" style={{ width: '0.7rem', height: '0.7rem' }} />;
      case 'Pending': return <Clock className="text-warning" style={{ width: '0.7rem', height: '0.7rem' }} />;
      case 'Failed': return <XCircle className="text-danger" style={{ width: '0.7rem', height: '0.7rem' }} />;
      default: return null;
    }
  };

  return (
    <div className="animate-fadeIn">
      {/* Stats Cards */}
      <div className="row g-3 mb-4">
        {[
          { label: "Total Notifications", value: totalNotifications, color: "primary", icon: Bell },
          { label: "Delivered", value: deliveredCount, color: "success", icon: CheckCircle },
          { label: "Pending", value: pendingCount, color: "warning", icon: Clock },
          { label: "Total Recipients", value: totalRecipients, color: "info", icon: Users },
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

      {/* Tab Switcher */}
      <div className="card border-0 shadow-lg rounded-4 mb-4" style={{ background: 'rgba(20,20,30,0.6)', backdropFilter: 'blur(10px)' }}>
        <div className="card-body p-3">
          <div className="d-flex gap-2">
            <button 
              onClick={() => setActiveTab('broadcast')}
              className={`btn btn-sm px-4 py-2 rounded-pill transition-all ${
                activeTab === 'broadcast' 
                  ? 'btn-primary shadow-lg shadow-primary/20' 
                  : 'btn-outline-secondary text-secondary hover:text-white'
              }`}
              style={{ fontWeight: '600' }}
            >
              <Send style={{ width: '0.8rem', height: '0.8rem' }} className="me-1" />
              Broadcast
            </button>
            <button 
              onClick={() => setActiveTab('history')}
              className={`btn btn-sm px-4 py-2 rounded-pill transition-all ${
                activeTab === 'history' 
                  ? 'btn-primary shadow-lg shadow-primary/20' 
                  : 'btn-outline-secondary text-secondary hover:text-white'
              }`}
              style={{ fontWeight: '600' }}
            >
              <Clock style={{ width: '0.8rem', height: '0.8rem' }} className="me-1" />
              History
            </button>
          </div>
        </div>
      </div>

      {/* Broadcast Tab */}
      {activeTab === 'broadcast' && (
        <div className="card border-0 shadow-lg rounded-4" style={{ background: 'rgba(20,20,30,0.6)', backdropFilter: 'blur(10px)' }}>
          <div className="card-body p-4">
            <div className="d-flex align-items-center gap-2 mb-3">
              <div className="p-2 rounded-3" style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)' }}>
                <Megaphone className="text-primary" style={{ width: '1.2rem', height: '1.2rem' }} />
              </div>
              <h6 className="text-secondary text-uppercase fw-bold m-0" style={{ fontSize: '0.65rem' }}>Bulk Broadcast</h6>
              <span className="badge bg-primary bg-opacity-10 text-primary border border-primary ms-auto" style={{ fontSize: '0.5rem' }}>
                <Sparkles className="me-1" style={{ width: '0.5rem', height: '0.5rem' }} />
                Live
              </span>
            </div>

            {showSuccess && (
              <div className="alert alert-success d-flex align-items-center gap-2 p-2 mb-3" style={{ 
                background: 'rgba(34,197,94,0.1)',
                border: '1px solid rgba(34,197,94,0.2)',
                borderRadius: '10px',
                color: '#4ade80',
                fontSize: '0.75rem'
              }}>
                <CheckCircle style={{ width: '0.8rem', height: '0.8rem' }} />
                Notification broadcast successfully!
              </div>
            )}

            <div className="space-y-3">
              <div>
                <label className="text-secondary small fw-bold text-uppercase d-block mb-1" style={{ fontSize: '0.55rem' }}>
                  <Users className="me-1" style={{ width: '0.7rem', height: '0.7rem' }} />
                  Target Audience
                </label>
                <select 
                  className="form-select form-select-sm bg-dark text-light border-secondary focus:border-primary transition-all" 
                  value={bulkNotif?.target || 'ALL'} 
                  onChange={(e) => setBulkNotif && setBulkNotif({ ...bulkNotif, target: e.target.value })}
                  style={{ fontSize: '0.75rem' }}
                >
                  <option value="ALL">All Students</option>
                  <option value="CSE">CSE Only</option>
                  <option value="IT">IT Only</option>
                  <option value="ECE">ECE Only</option>
                </select>
                <div className="mt-1">
                  <span className="text-secondary" style={{ fontSize: '0.55rem' }}>
                    <Users className="me-1" style={{ width: '0.6rem', height: '0.6rem' }} />
                    {bulkNotif?.target === 'ALL' ? '482' : 
                     bulkNotif?.target === 'CSE' ? '150' : 
                     bulkNotif?.target === 'IT' ? '120' : '100'} students will receive this
                  </span>
                </div>
              </div>

              <div>
                <label className="text-secondary small fw-bold text-uppercase d-block mb-1" style={{ fontSize: '0.55rem' }}>
                  <Calendar className="me-1" style={{ width: '0.7rem', height: '0.7rem' }} />
                  Category
                </label>
                <select 
                  className="form-select form-select-sm bg-dark text-light border-secondary focus:border-primary transition-all" 
                  value={bulkNotif?.category || 'PLACEMENT_NEWS'} 
                  onChange={(e) => setBulkNotif && setBulkNotif({ ...bulkNotif, category: e.target.value })}
                  style={{ fontSize: '0.75rem' }}
                >
                  <option value="PLACEMENT_NEWS">Placement News</option>
                  <option value="INTERVIEW_SCHEDULE">Interview Schedule</option>
                  <option value="EXAM_UPDATES">Exam Updates</option>
                  <option value="CAREER_ADVICE">Career Advice</option>
                  <option value="SYSTEM_ALERT">System Alert</option>
                </select>
              </div>

              <div>
                <label className="text-secondary small fw-bold text-uppercase d-block mb-1" style={{ fontSize: '0.55rem' }}>
                  <MessageSquare className="me-1" style={{ width: '0.7rem', height: '0.7rem' }} />
                  Message
                </label>
                <textarea 
                  rows={4} 
                  className="form-control form-control-sm bg-dark text-light border-secondary focus:border-primary transition-all" 
                  placeholder="Type your message here..." 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{ fontSize: '0.75rem', resize: 'none' }}
                />
                <div className="text-end mt-1">
                  <span className="text-secondary" style={{ fontSize: '0.55rem' }}>
                    {message.length} characters
                  </span>
                </div>
              </div>

              <button 
                onClick={handleBroadcast}
                className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2 py-2 shadow-lg shadow-primary/20 transition-all hover:scale-105"
                style={{ borderRadius: '10px', fontWeight: '600' }}
              >
                <Send style={{ width: '0.9rem', height: '0.9rem' }} />
                Broadcast Message
              </button>

              <div className="text-center">
                <span className="text-secondary" style={{ fontSize: '0.5rem' }}>
                  <Mail className="me-1" style={{ width: '0.6rem', height: '0.6rem' }} />
                  All recipients will receive this notification via email and dashboard
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <div className="card border-0 shadow-lg rounded-4 overflow-hidden" style={{ background: 'rgba(20,20,30,0.6)', backdropFilter: 'blur(10px)' }}>
          <div className="card-body p-0">
            {notificationHistory.length === 0 ? (
              <div className="text-center p-5">
                <Bell className="text-secondary mx-auto" style={{ width: '3rem', height: '3rem' }} />
                <h6 className="text-secondary mt-3">No notifications sent</h6>
                <p className="text-secondary small">Broadcast a message to see it here</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-dark table-hover table-sm mb-0">
                  <thead className="text-secondary text-uppercase" style={{ fontSize: '0.55rem', fontWeight: 'bold' }}>
                    <tr>
                      <th className="p-3">Message</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Audience</th>
                      <th className="p-3">Sent At</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody style={{ fontSize: '0.75rem' }}>
                    {notificationHistory.map((notif, index) => (
                      <tr 
                        key={notif.id} 
                        className="transition-all hover:bg-white/5 animate-slide-up"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <td className="p-3">
                          <span className="text-light">{notif.title}</span>
                        </td>
                        <td className="p-3">
                          <span className="badge bg-primary bg-opacity-10 text-primary border border-primary">
                            {notif.category}
                          </span>
                        </td>
                        <td className="p-3">
                          <span className="badge bg-secondary bg-opacity-10 text-secondary border border-secondary">
                            {notif.audience}
                          </span>
                          {notif.recipients > 0 && (
                            <span className="d-block text-secondary" style={{ fontSize: '0.55rem' }}>
                              {notif.recipients} recipients
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-secondary" style={{ fontSize: '0.65rem' }}>
                          {notif.sentAt}
                        </td>
                        <td className="p-3">
                          <span className={`badge bg-${getStatusColor(notif.status)} bg-opacity-10 text-${getStatusColor(notif.status)} border border-${getStatusColor(notif.status)} d-inline-flex align-items-center gap-1`}>
                            {getStatusIcon(notif.status)}
                            {notif.status}
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <button 
                            onClick={() => handleDeleteNotification(notif.id)}
                            className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1 shadow-sm transition-all hover:scale-110"
                            style={{ borderRadius: '8px' }}
                          >
                            <Trash2 style={{ width: '0.7rem', height: '0.7rem' }} />
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
      )}

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        .animate-slide-up {
          animation: slide-up 0.3s ease-out forwards;
          opacity: 0;
        }
        
        .transition-all {
          transition: all 0.3s ease;
        }
        
        .hover\\:translate-y-1:hover {
          transform: translateY(-4px);
        }
        
        .hover\\:scale-105:hover {
          transform: scale(1.05);
        }
        
        .hover\\:scale-110:hover {
          transform: scale(1.1);
        }
        
        .focus\\:border-primary:focus {
          border-color: #4f46e5 !important;
        }
        
        .focus\\:outline-none:focus {
          outline: none !important;
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
        
        /* Alert */
        .alert {
          animation: fadeIn 0.3s ease-out;
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