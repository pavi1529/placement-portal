import React, { useState } from 'react';
import { 
  Mail, Save, Lock, User, Bell, Shield, 
  Eye, EyeOff, CheckCircle, AlertCircle,
  Smartphone, Key, Globe, Moon, Sun,
  Sparkles, ArrowRight, RefreshCw
} from 'lucide-react';

export default function Settings({ studentProfile }) {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [settings, setSettings] = useState({
    email: studentProfile?.email || 'student@example.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorAuth: false,
    emailNotifications: true,
    darkMode: true
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = () => {
    setIsSaving(true);
    setSaveSuccess(false);
    
    // Simulate save
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }, 1500);
  };

  // Password strength indicator
  const getPasswordStrength = (password) => {
    if (!password) return { label: 'None', color: 'secondary', width: '0%' };
    if (password.length < 6) return { label: 'Weak', color: 'danger', width: '25%' };
    if (password.length < 10) return { label: 'Medium', color: 'warning', width: '50%' };
    if (password.length < 14) return { label: 'Strong', color: 'info', width: '75%' };
    return { label: 'Very Strong', color: 'success', width: '100%' };
  };

  const strength = getPasswordStrength(settings.newPassword);

  return (
    <div className="animate-fadeIn">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          {/* Main Settings Card */}
          <div 
            className="card border-0 shadow-lg rounded-3 rounded-md-4 overflow-hidden"
            style={{ 
              background: '#ffffff',
              border: '1px solid #e9ecef',
              boxShadow: '0 8px 30px rgba(0,0,0,0.06)'
            }}
          >
            <div className="card-body p-3 p-md-4 p-lg-5">
              {/* Header */}
              <div className="d-flex flex-wrap align-items-center gap-3 mb-3 mb-md-4 pb-3 border-bottom" style={{ borderColor: '#e9ecef !important' }}>
                <div className="p-2 p-md-3 rounded-3 flex-shrink-0" style={{ 
                  background: 'rgba(59, 130, 246, 0.08)', 
                  border: '1px solid rgba(59, 130, 246, 0.12)' 
                }}>
                  <Shield className="text-primary" style={{ 
                    width: 'clamp(1.2rem, 3vw, 1.5rem)', 
                    height: 'clamp(1.2rem, 3vw, 1.5rem)' 
                  }} />
                </div>
                <div className="flex-grow-1 min-w-0">
                  <h5 className="fw-bold text-dark m-0" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)' }}>
                    Security Settings
                  </h5>
                  <p className="text-secondary small m-0" style={{ fontSize: 'clamp(0.6rem, 1vw, 0.7rem)' }}>
                    Manage your account security and preferences
                  </p>
                </div>
                <Sparkles className="text-warning flex-shrink-0" style={{ 
                  width: 'clamp(0.8rem, 1.5vw, 1rem)', 
                  height: 'clamp(0.8rem, 1.5vw, 1rem)' 
                }} />
              </div>

              {/* Success Message */}
              {saveSuccess && (
                <div className="alert alert-success d-flex align-items-center gap-2 p-2 p-md-3 mb-3 mb-md-4" style={{ 
                  background: 'rgba(34, 197, 94, 0.08)',
                  border: '1px solid rgba(34, 197, 94, 0.15)',
                  borderRadius: '12px',
                  color: '#16a34a'
                }}>
                  <CheckCircle style={{ width: 'clamp(0.8rem, 1.5vw, 1rem)', height: 'clamp(0.8rem, 1.5vw, 1rem)' }} />
                  <span style={{ fontSize: 'clamp(0.65rem, 1vw, 0.75rem)' }}>Settings updated successfully!</span>
                </div>
              )}

              {/* Email Section */}
              <div className="mb-3 mb-md-4">
                <label className="text-secondary small fw-bold text-uppercase d-block mb-2" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)', letterSpacing: '0.05em' }}>
                  <Mail className="me-1" style={{ width: 'clamp(0.6rem, 1vw, 0.7rem)', height: 'clamp(0.6rem, 1vw, 0.7rem)' }} />
                  Email Address
                </label>
                <div className="d-flex flex-wrap align-items-center gap-2 p-2 p-md-3 rounded-3" style={{ 
                  background: 'rgba(0,0,0,0.02)',
                  border: '1px solid #e9ecef',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e9ecef';
                }}
                >
                  <Mail className="text-secondary flex-shrink-0" style={{ 
                    width: 'clamp(0.8rem, 1.5vw, 0.9rem)', 
                    height: 'clamp(0.8rem, 1.5vw, 0.9rem)' 
                  }} />
                  <input 
                    type="email" 
                    name="email"
                    value={settings.email}
                    onChange={handleInputChange}
                    className="form-control form-control-sm bg-transparent border-0 text-dark flex-grow-1" 
                    style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', minWidth: '120px' }}
                  />
                  <span className="badge bg-primary bg-opacity-10 text-primary border border-primary flex-shrink-0" style={{ fontSize: 'clamp(0.4rem, 0.7vw, 0.5rem)' }}>
                    Verified
                  </span>
                </div>
              </div>

              {/* Password Section */}
              <div className="mb-3 mb-md-4">
                <label className="text-secondary small fw-bold text-uppercase d-block mb-2" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)', letterSpacing: '0.05em' }}>
                  <Lock className="me-1" style={{ width: 'clamp(0.6rem, 1vw, 0.7rem)', height: 'clamp(0.6rem, 1vw, 0.7rem)' }} />
                  Change Password
                </label>
                
                {/* Current Password */}
                <div className="d-flex align-items-center gap-2 p-2 p-md-3 rounded-3 mb-2" style={{ 
                  background: 'rgba(0,0,0,0.02)',
                  border: '1px solid #e9ecef',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e9ecef';
                }}
                >
                  <Lock className="text-secondary flex-shrink-0" style={{ 
                    width: 'clamp(0.8rem, 1.5vw, 0.9rem)', 
                    height: 'clamp(0.8rem, 1.5vw, 0.9rem)' 
                  }} />
                  <input 
                    type={showCurrentPassword ? 'text' : 'password'}
                    name="currentPassword"
                    value={settings.currentPassword}
                    onChange={handleInputChange}
                    placeholder="Current Password" 
                    className="form-control form-control-sm bg-transparent border-0 text-dark flex-grow-1" 
                    style={{ fontSize: 'clamp(0.65rem, 1vw, 0.75rem)', minWidth: '100px' }}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="btn btn-sm p-0 text-secondary flex-shrink-0"
                    style={{ background: 'transparent', border: 'none' }}
                  >
                    {showCurrentPassword ? (
                      <EyeOff style={{ width: 'clamp(0.7rem, 1.2vw, 0.8rem)', height: 'clamp(0.7rem, 1.2vw, 0.8rem)' }} />
                    ) : (
                      <Eye style={{ width: 'clamp(0.7rem, 1.2vw, 0.8rem)', height: 'clamp(0.7rem, 1.2vw, 0.8rem)' }} />
                    )}
                  </button>
                </div>

                {/* New Password */}
                <div className="d-flex align-items-center gap-2 p-2 p-md-3 rounded-3 mb-2" style={{ 
                  background: 'rgba(0,0,0,0.02)',
                  border: '1px solid #e9ecef',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e9ecef';
                }}
                >
                  <Key className="text-secondary flex-shrink-0" style={{ 
                    width: 'clamp(0.8rem, 1.5vw, 0.9rem)', 
                    height: 'clamp(0.8rem, 1.5vw, 0.9rem)' 
                  }} />
                  <input 
                    type={showNewPassword ? 'text' : 'password'}
                    name="newPassword"
                    value={settings.newPassword}
                    onChange={handleInputChange}
                    placeholder="New Password" 
                    className="form-control form-control-sm bg-transparent border-0 text-dark flex-grow-1" 
                    style={{ fontSize: 'clamp(0.65rem, 1vw, 0.75rem)', minWidth: '100px' }}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="btn btn-sm p-0 text-secondary flex-shrink-0"
                    style={{ background: 'transparent', border: 'none' }}
                  >
                    {showNewPassword ? (
                      <EyeOff style={{ width: 'clamp(0.7rem, 1.2vw, 0.8rem)', height: 'clamp(0.7rem, 1.2vw, 0.8rem)' }} />
                    ) : (
                      <Eye style={{ width: 'clamp(0.7rem, 1.2vw, 0.8rem)', height: 'clamp(0.7rem, 1.2vw, 0.8rem)' }} />
                    )}
                  </button>
                </div>

                {/* Password Strength */}
                {settings.newPassword && (
                  <div className="px-1 px-md-2 mb-2">
                    <div className="d-flex flex-wrap justify-content-between align-items-center gap-1 mb-1">
                      <span className="text-secondary" style={{ fontSize: 'clamp(0.45rem, 0.7vw, 0.55rem)' }}>Password Strength:</span>
                      <span className={`text-${strength.color}`} style={{ fontSize: 'clamp(0.45rem, 0.7vw, 0.55rem)', fontWeight: 'bold' }}>
                        {strength.label}
                      </span>
                    </div>
                    <div className="rounded-pill" style={{ height: 'clamp(3px, 0.4vw, 4px)', background: 'rgba(0,0,0,0.05)' }}>
                      <div 
                        className={`bg-${strength.color} rounded-pill h-100 transition-all duration-500`}
                        style={{ width: strength.width }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Confirm Password */}
                <div className="d-flex align-items-center gap-2 p-2 p-md-3 rounded-3" style={{ 
                  background: 'rgba(0,0,0,0.02)',
                  border: '1px solid #e9ecef',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e9ecef';
                }}
                >
                  <CheckCircle className="text-secondary flex-shrink-0" style={{ 
                    width: 'clamp(0.8rem, 1.5vw, 0.9rem)', 
                    height: 'clamp(0.8rem, 1.5vw, 0.9rem)' 
                  }} />
                  <input 
                    type="password"
                    name="confirmPassword"
                    value={settings.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm New Password" 
                    className="form-control form-control-sm bg-transparent border-0 text-dark flex-grow-1" 
                    style={{ fontSize: 'clamp(0.65rem, 1vw, 0.75rem)', minWidth: '100px' }}
                  />
                  {settings.confirmPassword && settings.newPassword === settings.confirmPassword && (
                    <CheckCircle className="text-success flex-shrink-0" style={{ 
                      width: 'clamp(0.7rem, 1.2vw, 0.8rem)', 
                      height: 'clamp(0.7rem, 1.2vw, 0.8rem)' 
                    }} />
                  )}
                  {settings.confirmPassword && settings.newPassword !== settings.confirmPassword && (
                    <AlertCircle className="text-danger flex-shrink-0" style={{ 
                      width: 'clamp(0.7rem, 1.2vw, 0.8rem)', 
                      height: 'clamp(0.7rem, 1.2vw, 0.8rem)' 
                    }} />
                  )}
                </div>
              </div>

              {/* Preferences Section */}
              <div className="mb-3 mb-md-4">
                <label className="text-secondary small fw-bold text-uppercase d-block mb-2" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)', letterSpacing: '0.05em' }}>
                  <User className="me-1" style={{ width: 'clamp(0.6rem, 1vw, 0.7rem)', height: 'clamp(0.6rem, 1vw, 0.7rem)' }} />
                  Preferences
                </label>
                
                <div className="space-y-2">
                  {[
                    { id: 'twoFactorAuth', label: 'Two-Factor Authentication', icon: Smartphone, description: 'Add an extra layer of security' },
                    { id: 'emailNotifications', label: 'Email Notifications', icon: Bell, description: 'Receive important updates via email' },
                    { id: 'darkMode', label: 'Dark Mode', icon: Moon, description: 'Enable dark theme' },
                  ].map((pref) => {
                    const Icon = pref.icon;
                    return (
                      <div key={pref.id} className="d-flex flex-wrap align-items-center gap-2 gap-md-3 p-2 p-md-3 rounded-3" style={{ 
                        background: 'rgba(0,0,0,0.02)',
                        border: '1px solid #e9ecef',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(0,0,0,0.04)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(0,0,0,0.02)';
                      }}
                      >
                        <div className="p-1 p-md-2 rounded-3 flex-shrink-0" style={{ background: 'rgba(59, 130, 246, 0.05)' }}>
                          <Icon className="text-secondary" style={{ 
                            width: 'clamp(0.8rem, 1.5vw, 0.9rem)', 
                            height: 'clamp(0.8rem, 1.5vw, 0.9rem)' 
                          }} />
                        </div>
                        <div className="flex-grow-1 min-w-0">
                          <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
                            <span className="text-dark small fw-medium" style={{ fontSize: 'clamp(0.65rem, 1vw, 0.75rem)' }}>
                              {pref.label}
                            </span>
                            <div className="form-check form-switch m-0 flex-shrink-0">
                              <input 
                                className="form-check-input"
                                type="checkbox"
                                id={pref.id}
                                name={pref.id}
                                checked={settings[pref.id]}
                                onChange={handleInputChange}
                                style={{ 
                                  cursor: 'pointer',
                                  backgroundColor: settings[pref.id] ? '#3b82f6' : '#d1d5db',
                                  borderColor: settings[pref.id] ? '#3b82f6' : '#d1d5db',
                                  width: 'clamp(32px, 6vw, 40px)',
                                  height: 'clamp(18px, 3vw, 22px)'
                                }}
                              />
                            </div>
                          </div>
                          <span className="text-secondary" style={{ fontSize: 'clamp(0.45rem, 0.7vw, 0.55rem)' }}>
                            {pref.description}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Save Button */}
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2 py-2 py-md-3 rounded-3 fw-bold"
                style={{ 
                  fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 8px 30px rgba(59, 130, 246, 0.15)'
                }}
                onMouseEnter={(e) => {
                  if (!isSaving) {
                    e.currentTarget.style.transform = 'scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(59, 130, 246, 0.25)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(59, 130, 246, 0.15)';
                }}
              >
                {isSaving ? (
                  <>
                    <span className="spinner-border spinner-border-sm" style={{ width: 'clamp(0.7rem, 1.2vw, 0.8rem)', height: 'clamp(0.7rem, 1.2vw, 0.8rem)' }}></span>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save style={{ width: 'clamp(0.8rem, 1.5vw, 0.9rem)', height: 'clamp(0.8rem, 1.5vw, 0.9rem)' }} />
                    <span className="d-none d-sm-inline">Update Settings</span>
                    <span className="d-sm-none">Update</span>
                    <ArrowRight style={{ width: 'clamp(0.7rem, 1.2vw, 0.8rem)', height: 'clamp(0.7rem, 1.2vw, 0.8rem)' }} />
                  </>
                )}
              </button>

              {/* Footer */}
              <div className="mt-3 mt-md-4 pt-2 pt-md-3 border-top text-center" style={{ borderColor: '#e9ecef !important' }}>
                <span className="text-secondary" style={{ fontSize: 'clamp(0.45rem, 0.7vw, 0.5rem)' }}>
                  <RefreshCw className="me-1" style={{ width: 'clamp(0.5rem, 0.8vw, 0.6rem)', height: 'clamp(0.5rem, 0.8vw, 0.6rem)' }} />
                  Last updated: Today at 14:30
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }

        .form-check-input {
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .form-check-input:checked {
          background-color: #3b82f6 !important;
          border-color: #3b82f6 !important;
        }
        
        .form-check-input:focus {
          box-shadow: none !important;
        }

        .space-y-2 > * + * {
          margin-top: 0.5rem;
        }

        .transition-all {
          transition: all 0.3s ease;
        }

        .min-w-0 {
          min-width: 0;
        }

        /* Responsive overrides */
        @media (max-width: 576px) {
          .card-body {
            padding: 0.75rem !important;
          }
          .gap-1 {
            gap: 0.25rem !important;
          }
          .btn {
            padding: 0.3rem 0.5rem !important;
          }
          .badge {
            padding: 0.1rem 0.35rem !important;
          }
          .rounded-3 {
            border-radius: 8px !important;
          }
          .rounded-md-4 {
            border-radius: 10px !important;
          }
          .form-check-input {
            width: 32px !important;
            height: 18px !important;
          }
        }

        @media (min-width: 768px) and (max-width: 991px) {
          .card-body {
            padding: 1rem !important;
          }
        }

        /* Scrollbar */
        ::-webkit-scrollbar {
          width: 4px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.05);
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.3);
          border-radius: 10px;
        }

        /* Spinner */
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