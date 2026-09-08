import React, { useState } from 'react';
import { 
  Save, User, Mail, Lock, Shield, Key, 
  Eye, EyeOff, CheckCircle, AlertCircle,
  UserCheck, Crown, Sparkles, Globe,
  Calendar, Activity, Smartphone, Fingerprint
} from 'lucide-react';

export default function AdminProfileTab() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');

  const [profile, setProfile] = useState({
    fullName: 'System Root Admin',
    email: 'admin@system.edu',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    role: 'Super Admin',
    lastLogin: '2026-07-17 14:30',
    twoFactorAuth: true,
    notificationsEnabled: true
  });

  const getPasswordStrength = (password) => {
    if (!password) return { label: 'None', color: 'secondary', width: '0%' };
    if (password.length < 6) return { label: 'Weak', color: 'danger', width: '25%' };
    if (password.length < 10) return { label: 'Medium', color: 'warning', width: '50%' };
    if (password.length < 14) return { label: 'Strong', color: 'info', width: '75%' };
    return { label: 'Very Strong', color: 'success', width: '100%' };
  };

  const strength = getPasswordStrength(profile.newPassword);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setSaveError('');
  };

  const handleSave = () => {
    if (!profile.fullName || !profile.email) {
      setSaveError('Full Name and Email are required!');
      return;
    }

    if (profile.newPassword && profile.newPassword !== profile.confirmPassword) {
      setSaveError('Passwords do not match!');
      return;
    }

    if (profile.newPassword && profile.newPassword.length < 6) {
      setSaveError('Password must be at least 6 characters!');
      return;
    }

    setIsSaving(true);
    setSaveError('');
    setSaveSuccess(false);

    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setProfile(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
      
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="animate-fadeIn">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8 col-xl-7">
          {/* Main Profile Card */}
          <div className="card border-0 shadow-xl rounded-3 rounded-md-4 overflow-hidden" style={{ 
            background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.95))',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.06)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.4)'
          }}>
            <div className="card-body p-3 p-md-4 p-lg-5">
              {/* Header */}
              <div className="d-flex flex-wrap align-items-center gap-3 mb-3 mb-md-4 pb-3 border-bottom" style={{ borderColor: 'rgba(255,255,255,0.05) !important' }}>
                <div className="p-2 p-md-3 rounded-3 flex-shrink-0" style={{ 
                  background: 'rgba(59, 130, 246, 0.1)', 
                  border: '1px solid rgba(59, 130, 246, 0.2)' 
                }}>
                  <Shield className="text-primary" style={{ 
                    width: 'clamp(1.2rem, 2.5vw, 1.5rem)', 
                    height: 'clamp(1.2rem, 2.5vw, 1.5rem)' 
                  }} />
                </div>
                <div className="flex-grow-1 min-w-0">
                  <h5 className="fw-bold text-light m-0" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)' }}>
                    Admin Profile
                  </h5>
                  <p className="text-secondary small m-0" style={{ fontSize: 'clamp(0.6rem, 1vw, 0.7rem)' }}>
                    Manage your account settings and preferences
                  </p>
                </div>
                <div className="d-flex align-items-center gap-2 flex-shrink-0">
                  <span className="badge bg-success bg-opacity-10 text-success border border-success" style={{ 
                    fontSize: 'clamp(0.4rem, 0.6vw, 0.5rem)' 
                  }}>
                    <span className="d-inline-block rounded-circle bg-success me-1" style={{ 
                      width: 'clamp(0.2rem, 0.3vw, 0.3rem)', 
                      height: 'clamp(0.2rem, 0.3vw, 0.3rem)' 
                    }}></span>
                    <span className="d-none d-sm-inline">Online</span>
                  </span>
                  <Sparkles className="text-warning" style={{ 
                    width: 'clamp(0.8rem, 1.5vw, 1rem)', 
                    height: 'clamp(0.8rem, 1.5vw, 1rem)' 
                  }} />
                </div>
              </div>

              {/* Success Message */}
              {saveSuccess && (
                <div className="alert alert-success d-flex align-items-center gap-2 p-2 p-md-3 mb-3 mb-md-4" style={{ 
                  background: 'rgba(34, 197, 94, 0.1)',
                  border: '1px solid rgba(34, 197, 94, 0.2)',
                  borderRadius: '12px',
                  color: '#4ade80',
                  animation: 'slideUp 0.3s ease'
                }}>
                  <CheckCircle style={{ 
                    width: 'clamp(0.8rem, 1.5vw, 1rem)', 
                    height: 'clamp(0.8rem, 1.5vw, 1rem)' 
                  }} />
                  <span style={{ fontSize: 'clamp(0.65rem, 1vw, 0.75rem)' }}>Profile updated successfully!</span>
                </div>
              )}

              {/* Error Message */}
              {saveError && (
                <div className="alert alert-danger d-flex align-items-center gap-2 p-2 p-md-3 mb-3 mb-md-4" style={{ 
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  borderRadius: '12px',
                  color: '#f87171',
                  animation: 'slideUp 0.3s ease'
                }}>
                  <AlertCircle style={{ 
                    width: 'clamp(0.8rem, 1.5vw, 1rem)', 
                    height: 'clamp(0.8rem, 1.5vw, 1rem)' 
                  }} />
                  <span style={{ fontSize: 'clamp(0.65rem, 1vw, 0.75rem)' }}>{saveError}</span>
                </div>
              )}

              {/* Profile Info Card */}
              <div className="d-flex flex-wrap align-items-center gap-3 p-2 p-md-3 rounded-3 mb-3 mb-md-4" style={{ 
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.05)'
              }}>
                <div className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0" style={{ 
                  width: 'clamp(44px, 8vw, 56px)', 
                  height: 'clamp(44px, 8vw, 56px)',
                  background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                  fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
                  fontWeight: 'bold',
                  color: '#fff',
                  boxShadow: '0 8px 25px rgba(79, 70, 229, 0.3)'
                }}>
                  {profile.fullName.charAt(0)}
                </div>
                <div className="flex-grow-1 min-w-0">
                  <h6 className="text-light fw-bold m-0 d-flex flex-wrap align-items-center gap-2" style={{ fontSize: 'clamp(0.9rem, 2vw, 1.05rem)' }}>
                    {profile.fullName}
                    <Crown className="text-warning" style={{ 
                      width: 'clamp(0.7rem, 1.2vw, 0.9rem)', 
                      height: 'clamp(0.7rem, 1.2vw, 0.9rem)' 
                    }} />
                  </h6>
                  <span className="text-secondary" style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)' }}>
                    <UserCheck className="me-1" style={{ 
                      width: 'clamp(0.5rem, 0.8vw, 0.6rem)', 
                      height: 'clamp(0.5rem, 0.8vw, 0.6rem)' 
                    }} />
                    {profile.role}
                  </span>
                  <div className="d-flex flex-wrap gap-2 mt-1">
                    <span className="text-secondary" style={{ fontSize: 'clamp(0.45rem, 0.7vw, 0.5rem)' }}>
                      <Calendar className="me-1" style={{ 
                        width: 'clamp(0.4rem, 0.6vw, 0.5rem)', 
                        height: 'clamp(0.4rem, 0.6vw, 0.5rem)' 
                      }} />
                      Last login: {profile.lastLogin}
                    </span>
                  </div>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-3">
                {/* Full Name */}
                <div>
                  <label className="text-secondary fw-bold text-uppercase d-block mb-1" style={{ 
                    fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)', 
                    letterSpacing: '0.05em' 
                  }}>
                    <User className="me-1" style={{ 
                      width: 'clamp(0.6rem, 1vw, 0.7rem)', 
                      height: 'clamp(0.6rem, 1vw, 0.7rem)' 
                    }} />
                    Full Name *
                  </label>
                  <div className="d-flex align-items-center gap-2 p-2 p-md-3 rounded-3" style={{ 
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                  }}
                  >
                    <User className="text-secondary flex-shrink-0" style={{ 
                      width: 'clamp(0.8rem, 1.2vw, 0.9rem)', 
                      height: 'clamp(0.8rem, 1.2vw, 0.9rem)' 
                    }} />
                    <input 
                      type="text" 
                      name="fullName"
                      value={profile.fullName}
                      onChange={handleInputChange}
                      className="form-control form-control-sm bg-transparent border-0 text-light" 
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)' }}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="text-secondary fw-bold text-uppercase d-block mb-1" style={{ 
                    fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)', 
                    letterSpacing: '0.05em' 
                  }}>
                    <Mail className="me-1" style={{ 
                      width: 'clamp(0.6rem, 1vw, 0.7rem)', 
                      height: 'clamp(0.6rem, 1vw, 0.7rem)' 
                    }} />
                    Email Address *
                  </label>
                  <div className="d-flex align-items-center gap-2 p-2 p-md-3 rounded-3" style={{ 
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                  }}
                  >
                    <Mail className="text-secondary flex-shrink-0" style={{ 
                      width: 'clamp(0.8rem, 1.2vw, 0.9rem)', 
                      height: 'clamp(0.8rem, 1.2vw, 0.9rem)' 
                    }} />
                    <input 
                      type="email" 
                      name="email"
                      value={profile.email}
                      onChange={handleInputChange}
                      className="form-control form-control-sm bg-transparent border-0 text-light" 
                      style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)' }}
                    />
                    <span className="badge bg-success bg-opacity-10 text-success border border-success flex-shrink-0" style={{ 
                      fontSize: 'clamp(0.4rem, 0.6vw, 0.5rem)' 
                    }}>
                      Verified
                    </span>
                  </div>
                </div>

                {/* Change Password */}
                <div>
                  <label className="text-secondary fw-bold text-uppercase d-block mb-1" style={{ 
                    fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)', 
                    letterSpacing: '0.05em' 
                  }}>
                    <Lock className="me-1" style={{ 
                      width: 'clamp(0.6rem, 1vw, 0.7rem)', 
                      height: 'clamp(0.6rem, 1vw, 0.7rem)' 
                    }} />
                    Change Password
                  </label>
                  
                  {/* Current Password */}
                  <div className="d-flex align-items-center gap-2 p-2 p-md-3 rounded-3 mb-2" style={{ 
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                  }}
                  >
                    <Lock className="text-secondary flex-shrink-0" style={{ 
                      width: 'clamp(0.8rem, 1.2vw, 0.9rem)', 
                      height: 'clamp(0.8rem, 1.2vw, 0.9rem)' 
                    }} />
                    <input 
                      type={showCurrentPassword ? 'text' : 'password'}
                      name="currentPassword"
                      value={profile.currentPassword}
                      onChange={handleInputChange}
                      placeholder="Current Password" 
                      className="form-control form-control-sm bg-transparent border-0 text-light" 
                      style={{ fontSize: 'clamp(0.65rem, 1vw, 0.75rem)' }}
                    />
                    <button 
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="btn btn-sm p-0 text-secondary flex-shrink-0"
                      style={{ background: 'transparent', border: 'none' }}
                    >
                      {showCurrentPassword ? (
                        <EyeOff style={{ 
                          width: 'clamp(0.7rem, 1.2vw, 0.8rem)', 
                          height: 'clamp(0.7rem, 1.2vw, 0.8rem)' 
                        }} />
                      ) : (
                        <Eye style={{ 
                          width: 'clamp(0.7rem, 1.2vw, 0.8rem)', 
                          height: 'clamp(0.7rem, 1.2vw, 0.8rem)' 
                        }} />
                      )}
                    </button>
                  </div>

                  {/* New Password */}
                  <div className="d-flex align-items-center gap-2 p-2 p-md-3 rounded-3 mb-2" style={{ 
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                  }}
                  >
                    <Key className="text-secondary flex-shrink-0" style={{ 
                      width: 'clamp(0.8rem, 1.2vw, 0.9rem)', 
                      height: 'clamp(0.8rem, 1.2vw, 0.9rem)' 
                    }} />
                    <input 
                      type={showNewPassword ? 'text' : 'password'}
                      name="newPassword"
                      value={profile.newPassword}
                      onChange={handleInputChange}
                      placeholder="New Password" 
                      className="form-control form-control-sm bg-transparent border-0 text-light" 
                      style={{ fontSize: 'clamp(0.65rem, 1vw, 0.75rem)' }}
                    />
                    <button 
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="btn btn-sm p-0 text-secondary flex-shrink-0"
                      style={{ background: 'transparent', border: 'none' }}
                    >
                      {showNewPassword ? (
                        <EyeOff style={{ 
                          width: 'clamp(0.7rem, 1.2vw, 0.8rem)', 
                          height: 'clamp(0.7rem, 1.2vw, 0.8rem)' 
                        }} />
                      ) : (
                        <Eye style={{ 
                          width: 'clamp(0.7rem, 1.2vw, 0.8rem)', 
                          height: 'clamp(0.7rem, 1.2vw, 0.8rem)' 
                        }} />
                      )}
                    </button>
                  </div>

                  {/* Password Strength */}
                  {profile.newPassword && (
                    <div className="px-2 mb-2">
                      <div className="d-flex flex-wrap justify-content-between align-items-center gap-1 mb-1">
                        <span className="text-secondary" style={{ fontSize: 'clamp(0.45rem, 0.7vw, 0.55rem)' }}>
                          Password Strength:
                        </span>
                        <span className={`text-${strength.color}`} style={{ 
                          fontSize: 'clamp(0.45rem, 0.7vw, 0.55rem)', 
                          fontWeight: 'bold' 
                        }}>
                          {strength.label}
                        </span>
                      </div>
                      <div className="rounded-pill" style={{ 
                        height: 'clamp(3px, 0.4vw, 4px)', 
                        background: 'rgba(255,255,255,0.05)' 
                      }}>
                        <div 
                          className={`bg-${strength.color} rounded-pill h-100 transition-all duration-500`}
                          style={{ width: strength.width }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Confirm Password */}
                  <div className="d-flex align-items-center gap-2 p-2 p-md-3 rounded-3" style={{ 
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                  }}
                  >
                    <CheckCircle className="text-secondary flex-shrink-0" style={{ 
                      width: 'clamp(0.8rem, 1.2vw, 0.9rem)', 
                      height: 'clamp(0.8rem, 1.2vw, 0.9rem)' 
                    }} />
                    <input 
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={profile.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm New Password" 
                      className="form-control form-control-sm bg-transparent border-0 text-light" 
                      style={{ fontSize: 'clamp(0.65rem, 1vw, 0.75rem)' }}
                    />
                    <button 
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="btn btn-sm p-0 text-secondary flex-shrink-0"
                      style={{ background: 'transparent', border: 'none' }}
                    >
                      {showConfirmPassword ? (
                        <EyeOff style={{ 
                          width: 'clamp(0.7rem, 1.2vw, 0.8rem)', 
                          height: 'clamp(0.7rem, 1.2vw, 0.8rem)' 
                        }} />
                      ) : (
                        <Eye style={{ 
                          width: 'clamp(0.7rem, 1.2vw, 0.8rem)', 
                          height: 'clamp(0.7rem, 1.2vw, 0.8rem)' 
                        }} />
                      )}
                    </button>
                    {profile.confirmPassword && profile.newPassword === profile.confirmPassword && (
                      <CheckCircle className="text-success flex-shrink-0" style={{ 
                        width: 'clamp(0.7rem, 1.2vw, 0.8rem)', 
                        height: 'clamp(0.7rem, 1.2vw, 0.8rem)' 
                      }} />
                    )}
                    {profile.confirmPassword && profile.newPassword !== profile.confirmPassword && (
                      <AlertCircle className="text-danger flex-shrink-0" style={{ 
                        width: 'clamp(0.7rem, 1.2vw, 0.8rem)', 
                        height: 'clamp(0.7rem, 1.2vw, 0.8rem)' 
                      }} />
                    )}
                  </div>
                </div>

                {/* Preferences */}
                <div className="pt-2">
                  <label className="text-secondary fw-bold text-uppercase d-block mb-2" style={{ 
                    fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)', 
                    letterSpacing: '0.05em' 
                  }}>
                    <Activity className="me-1" style={{ 
                      width: 'clamp(0.6rem, 1vw, 0.7rem)', 
                      height: 'clamp(0.6rem, 1vw, 0.7rem)' 
                    }} />
                    Preferences
                  </label>
                  
                  <div className="space-y-2">
                    {[
                      { id: 'twoFactorAuth', label: 'Two-Factor Authentication', icon: Smartphone, description: 'Add an extra layer of security' },
                      { id: 'notificationsEnabled', label: 'Email Notifications', icon: Globe, description: 'Receive important updates via email' },
                    ].map((pref) => {
                      const Icon = pref.icon;
                      return (
                        <div key={pref.id} className="d-flex flex-wrap align-items-center gap-2 gap-md-3 p-2 p-md-3 rounded-3" style={{ 
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.06)',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                        }}
                        >
                          <div className="p-1 p-md-2 rounded-3 flex-shrink-0" style={{ background: 'rgba(59, 130, 246, 0.05)' }}>
                            <Icon className="text-secondary" style={{ 
                              width: 'clamp(0.7rem, 1.2vw, 0.9rem)', 
                              height: 'clamp(0.7rem, 1.2vw, 0.9rem)' 
                            }} />
                          </div>
                          <div className="flex-grow-1 min-w-0">
                            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
                              <span className="text-light small fw-medium" style={{ fontSize: 'clamp(0.65rem, 1vw, 0.75rem)' }}>
                                {pref.label}
                              </span>
                              <div className="form-check form-switch m-0 flex-shrink-0">
                                <input 
                                  className="form-check-input"
                                  type="checkbox"
                                  id={pref.id}
                                  name={pref.id}
                                  checked={profile[pref.id]}
                                  onChange={handleInputChange}
                                  style={{ 
                                    cursor: 'pointer',
                                    backgroundColor: profile[pref.id] ? '#3b82f6' : 'rgba(255,255,255,0.2)',
                                    borderColor: profile[pref.id] ? '#3b82f6' : 'rgba(255,255,255,0.2)',
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
                  className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2 py-2 py-md-3 rounded-3 fw-bold mt-3"
                  style={{ 
                    fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 8px 30px rgba(59, 130, 246, 0.2)'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSaving) {
                      e.currentTarget.style.transform = 'scale(1.02)';
                      e.currentTarget.style.boxShadow = '0 12px 40px rgba(59, 130, 246, 0.3)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(59, 130, 246, 0.2)';
                  }}
                >
                  {isSaving ? (
                    <>
                      <span className="spinner-border spinner-border-sm" style={{ 
                        width: 'clamp(0.7rem, 1.2vw, 0.8rem)', 
                        height: 'clamp(0.7rem, 1.2vw, 0.8rem)' 
                      }}></span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save style={{ 
                        width: 'clamp(0.8rem, 1.2vw, 0.9rem)', 
                        height: 'clamp(0.8rem, 1.2vw, 0.9rem)' 
                      }} />
                      <span className="d-none d-sm-inline">Update Profile</span>
                      <span className="d-sm-none">Update</span>
                    </>
                  )}
                </button>

                {/* Footer */}
                <div className="mt-3 pt-3 border-top text-center" style={{ borderColor: 'rgba(255,255,255,0.05) !important' }}>
                  <span className="text-secondary" style={{ fontSize: 'clamp(0.4rem, 0.6vw, 0.5rem)' }}>
                    <Fingerprint className="me-1" style={{ 
                      width: 'clamp(0.5rem, 0.8vw, 0.6rem)', 
                      height: 'clamp(0.5rem, 0.8vw, 0.6rem)' 
                    }} />
                    All changes are encrypted and secure
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(-10px); }
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
        
        .space-y-2 > * + * {
          margin-top: 0.5rem;
        }
        
        .space-y-3 > * + * {
          margin-top: 0.75rem;
        }

        .min-w-0 {
          min-width: 0;
        }
        
        /* Form Controls */
        .form-control, .form-select {
          transition: all 0.3s ease;
          background-color: transparent !important;
          color: #ffffff !important;
        }
        
        .form-control:focus, .form-select:focus {
          border-color: transparent !important;
          box-shadow: none !important;
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
        
        /* Alert */
        .alert {
          animation: slideUp 0.3s ease-out;
        }
        
        /* Spinner */
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
            padding: 0.25rem 0.5rem !important;
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