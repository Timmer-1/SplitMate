'use client'

import React, { useState } from 'react';
import { 
  Calculator, 
  Sparkles, 
  User,  
  Lock, 
  Bell, 
  Shield, 
  CreditCard,
  Globe,
  Camera,
  Save,
  ArrowLeft,
  Edit,
  Eye,
  EyeOff,
  Loader2,
  Check,
  X
} from 'lucide-react';
import Link from 'next/link';

type BillingCycle = 'monthly' | 'yearly';
type PlanId = 'free' | 'premium';
type NotificationSettingKey = 'emailNotifications' | 'pushNotifications' | 'expenseReminders' | 'groupInvites' | 'paymentReminders' | 'weeklyDigest';

const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  const [currentPlan, setCurrentPlan] = useState<PlanId>('free');
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('yearly');

  const subscriptionPlans = [
    {
      id: 'free' as const,
      name: 'Free',
      description: 'Perfect for getting started',
      price: { monthly: 0, yearly: 0 },
      features: [
        'Up to 3 groups',
        'Basic expense tracking',
        'Simple split calculations',
        'Mobile app access',
        'Email support'
      ],
      limitations: [
        'Limited to 10 expenses per month',
        'No advanced analytics',
        'No receipt scanning'
      ]
    },
    {
      id: 'premium' as const,
      name: 'Premium',
      description: 'Everything you need to split like a pro',
      price: { monthly: 9.99, yearly: 7.99 },
      features: [
        'Unlimited groups',
        'Advanced expense tracking',
        'Smart categorization',
        'Receipt scanning with AI',
        'Detailed analytics & reports',
        'Multiple currencies',
        'Expense templates',
        'Priority support',
        'Export to CSV/PDF',
        'Custom expense categories'
      ],
      limitations: []
    }
  ];
  const [profileData, setProfileData] = useState({
    fullName: 'Alex Chen',
    email: 'alex@example.com',
    phoneNumber: '+1 (555) 123-4567',
    bio: 'Splitting expenses since 2024! Love traveling and sharing great experiences with friends.',
    location: 'San Francisco, CA',
    joinDate: 'January 2024'
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    expenseReminders: true,
    groupInvites: true,
    paymentReminders: false,
    weeklyDigest: true
  });

  // Profile sections
  const sections = [
    { id: 'profile', label: 'Profile Info', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'preferences', label: 'Preferences', icon: Globe }
  ];

  // Handlers with proper types
  const handleProfileUpdate = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handlePasswordUpdate = (field: string, value: string) => {
    setPasswordData(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationToggle = (setting: NotificationSettingKey) => {
    setNotificationSettings(prev => ({ ...prev, [setting]: !prev[setting] }));
  };

  const handleSave = async () => {
    setLoading(true);
    setSaveStatus('');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSaveStatus('success');
    setIsEditing(false);
    setLoading(false);
    
    // Clear success message after 3 seconds
    setTimeout(() => setSaveStatus(''), 3000);
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setSaveStatus('error');
      return;
    }
    
    setLoading(true);
    setSaveStatus('');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSaveStatus('password-success');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setLoading(false);
    
    setTimeout(() => setSaveStatus(''), 3000);
  };

  const handlePlanChange = async (planId: PlanId) => {
    setLoading(true);
    setSaveStatus('');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setCurrentPlan(planId);
    setSaveStatus('plan-success');
    setLoading(false);
    
    setTimeout(() => setSaveStatus(''), 3000);
  };

  const getCurrentPlan = () => subscriptionPlans.find(plan => plan.id === currentPlan);

  const getDiscountPercentage = () => {
    const premiumPlan = subscriptionPlans.find(p => p.id === 'premium');
    if (!premiumPlan) return 0;
    
    const monthlyPrice = premiumPlan.price.monthly;
    const yearlyPrice = premiumPlan.price.yearly;
    const yearlyTotal = yearlyPrice * 12;
    const monthlyTotal = monthlyPrice * 12;
    
    return Math.round(((monthlyTotal - yearlyTotal) / monthlyTotal) * 100);
  };

  // Render different sections
  const renderProfileSection = () => (
    <div className="space-y-6">
      {/* Profile Picture */}
      <div className="text-center">
        <div className="relative inline-block">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face"
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover ring-4 ring-emerald-500/20"
          />
          <button className="absolute bottom-2 right-2 p-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-colors shadow-lg">
            <Camera className="h-4 w-4" />
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-2">Click to update profile picture</p>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            value={profileData.fullName}
            onChange={(e) => handleProfileUpdate('fullName', e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 disabled:bg-gray-50 disabled:text-gray-600"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
          <input
            type="email"
            value={profileData.email}
            onChange={(e) => handleProfileUpdate('email', e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 disabled:bg-gray-50 disabled:text-gray-600"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
          <input
            type="tel"
            value={profileData.phoneNumber}
            onChange={(e) => handleProfileUpdate('phoneNumber', e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 disabled:bg-gray-50 disabled:text-gray-600"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
          <input
            type="text"
            value={profileData.location}
            onChange={(e) => handleProfileUpdate('location', e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 disabled:bg-gray-50 disabled:text-gray-600"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Bio</label>
        <textarea
          value={profileData.bio}
          onChange={(e) => handleProfileUpdate('bio', e.target.value)}
          disabled={!isEditing}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 disabled:bg-gray-50 disabled:text-gray-600 resize-none"
          placeholder="Tell us a bit about yourself..."
        />
      </div>

      <div className="bg-gray-50 rounded-xl p-4">
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Member since:</span> {profileData.joinDate}
        </p>
      </div>
    </div>
  );

  const renderSecuritySection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Change Password</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                value={passwordData.currentPassword}
                onChange={(e) => handlePasswordUpdate('currentPassword', e.target.value)}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showCurrentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type={showNewPassword ? 'text' : 'password'}
                value={passwordData.newPassword}
                onChange={(e) => handlePasswordUpdate('newPassword', e.target.value)}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={passwordData.confirmPassword}
                onChange={(e) => handlePasswordUpdate('confirmPassword', e.target.value)}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                placeholder="Confirm new password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <button
            onClick={handlePasswordChange}
            disabled={loading || !passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
            className="bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Shield className="h-4 w-4" />}
            Update Password
          </button>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Two-Factor Authentication</h3>
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="font-medium text-emerald-800">2FA Enabled</p>
            <p className="text-sm text-emerald-600">Your account is protected with two-factor authentication</p>
          </div>
          <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm">
            Manage
          </button>
        </div>
      </div>
    </div>
  );

  const renderBillingSection = () => (
    <div className="space-y-8">
      {/* Current Plan Status */}
      <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-emerald-800">Current Plan</h3>
            <p className="text-emerald-600">
              {getCurrentPlan()?.name} Plan - {getCurrentPlan()?.description}
            </p>
            {currentPlan === 'premium' && (
              <p className="text-sm text-emerald-600 mt-1">
                Next billing: {billingCycle === 'monthly' ? 'Monthly' : 'Yearly'} - 
                ${getCurrentPlan()?.price[billingCycle]}/{billingCycle === 'yearly' ? 'month' : 'month'}
              </p>
            )}
          </div>
          <div className="text-right">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800">
              {currentPlan === 'free' ? 'Free Plan' : 'Premium'}
            </div>
            {currentPlan === 'premium' && (
              <p className="text-xs text-emerald-600 mt-1">Active until Dec 2024</p>
            )}
          </div>
        </div>
      </div>

      {/* Plan Comparison */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Available Plans</h3>
          {currentPlan === 'free' && (
            <div className="bg-white border border-gray-200 rounded-xl p-2">
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                    billingCycle === 'monthly'
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle('yearly')}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all relative ${
                    billingCycle === 'yearly'
                      ? 'bg-emerald-600 text-white'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Yearly
                  {getDiscountPercentage() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs px-1.5 py-0.5 rounded-full font-bold">
                      -{getDiscountPercentage()}%
                    </span>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {subscriptionPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative border-2 rounded-2xl p-6 transition-all ${
                plan.id === currentPlan
                  ? 'border-emerald-500 bg-emerald-50/50 shadow-lg shadow-emerald-500/20'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
              }`}
            >
              {plan.id === 'premium' && currentPlan === 'free' && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    Recommended
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h4 className="text-xl font-bold text-gray-800 mb-2">{plan.name}</h4>
                <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                
                {plan.price[billingCycle] === 0 ? (
                  <div className="text-3xl font-black text-gray-800">Free</div>
                ) : (
                  <div className="flex items-baseline justify-center space-x-1">
                    <span className="text-3xl font-black text-gray-800">
                      ${plan.price[billingCycle]}
                    </span>
                    <span className="text-gray-600 text-sm">/month</span>
                  </div>
                )}
                
                {billingCycle === 'yearly' && plan.price.yearly > 0 && (
                  <div className="text-xs text-gray-500 mt-1">
                    Billed annually (${(plan.price.yearly * 12).toFixed(2)}/year)
                  </div>
                )}
              </div>

              <div className="space-y-3 mb-6">
                {plan.features.slice(0, 5).map((feature, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <Check className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
                {plan.features.length > 5 && (
                  <p className="text-xs text-gray-500 pl-6">
                    +{plan.features.length - 5} more features
                  </p>
                )}
              </div>

              {plan.id === currentPlan ? (
                <div className="w-full py-3 bg-emerald-100 text-emerald-800 rounded-xl text-center font-semibold">
                  Current Plan
                </div>
              ) : (
                <button
                  onClick={() => handlePlanChange(plan.id)}
                  disabled={loading}
                  className={`w-full py-3 rounded-xl font-semibold transition-all disabled:opacity-50 ${
                    plan.id === 'premium'
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg hover:shadow-emerald-500/25'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Processing...
                    </div>
                  ) : plan.id === 'premium' ? (
                    'Upgrade to Premium'
                  ) : (
                    'Downgrade to Free'
                  )}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Payment Method (only show if premium) */}
      {currentPlan === 'premium' && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Method</h3>
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded flex items-center justify-center">
                  <CreditCard className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">•••• •••• •••• 4242</p>
                  <p className="text-sm text-gray-600">Expires 12/26</p>
                </div>
              </div>
              <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm">
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Billing History */}
      {currentPlan === 'premium' && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Billing History</h3>
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            {[
              { date: 'Dec 1, 2024', amount: '$95.88', status: 'Paid', period: 'Annual subscription' },
              { date: 'Dec 1, 2023', amount: '$95.88', status: 'Paid', period: 'Annual subscription' },
            ].map((invoice, index) => (
              <div key={index} className="flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0">
                <div>
                  <p className="font-medium text-gray-800">{invoice.period}</p>
                  <p className="text-sm text-gray-600">{invoice.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-800">{invoice.amount}</p>
                  <div className="flex items-center space-x-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {invoice.status}
                    </span>
                    <button className="text-emerald-600 hover:text-emerald-700 text-xs">
                      Download
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cancel Subscription (only show if premium) */}
      {currentPlan === 'premium' && (
        <div className="border-t pt-6">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-red-800 mb-2">Cancel Subscription</h3>
            <p className="text-red-600 text-sm mb-4">
              Your subscription will remain active until the end of your current billing period.
            </p>
            <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium">
              Cancel Subscription
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderNotificationsSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Notification Preferences</h3>
        <div className="space-y-4">
          {Object.entries(notificationSettings).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="font-medium text-gray-800 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </p>
                <p className="text-sm text-gray-600">
                  {key === 'emailNotifications' && 'Receive notifications via email'}
                  {key === 'pushNotifications' && 'Receive push notifications on your device'}
                  {key === 'expenseReminders' && 'Get reminded about pending expenses'}
                  {key === 'groupInvites' && 'Notifications for group invitations'}
                  {key === 'paymentReminders' && 'Reminders for overdue payments'}
                  {key === 'weeklyDigest' && 'Weekly summary of your expenses'}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => handleNotificationToggle(key as NotificationSettingKey)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <header className="border-b border-slate-200/60 bg-white/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <button className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                <ArrowLeft className="h-5 w-5 text-slate-600" />
              </button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Calculator className="h-8 w-8 text-emerald-600" />
                  <Sparkles className="h-3 w-3 text-amber-500 absolute -top-1 -right-1 animate-pulse" />
                </div>
                <Link href="/dashboard">
                <h1 className="text-2xl font-black bg-gradient-to-r from-slate-800 to-emerald-700 bg-clip-text text-transparent">
                  SplitMate
                </h1>
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {activeSection === 'profile' && (
                <div className="flex items-center space-x-2">
                  {isEditing ? (
                    <>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors flex items-center gap-2"
                      >
                        <X className="h-4 w-4" />
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        disabled={loading}
                        className="bg-emerald-600 text-white px-4 py-2 rounded-xl hover:bg-emerald-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                      >
                        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                        Save Changes
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="bg-emerald-600 text-white px-4 py-2 rounded-xl hover:bg-emerald-700 transition-colors flex items-center gap-2"
                    >
                      <Edit className="h-4 w-4" />
                      Edit Profile
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-6 sticky top-32">
              <div className="text-center mb-6">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face"
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-3 ring-4 ring-emerald-500/20"
                />
                <h3 className="font-bold text-slate-800">{profileData.fullName}</h3>
                <p className="text-sm text-slate-500">{profileData.email}</p>
              </div>

              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                      activeSection === section.id
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <section.icon className="h-5 w-5" />
                    <span className="font-medium">{section.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-8">
              {/* Success/Error Messages */}
              {saveStatus === 'success' && (
                <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3">
                  <Check className="h-5 w-5 text-emerald-600" />
                  <p className="text-emerald-700 font-medium">Profile updated successfully!</p>
                </div>
              )}

              {saveStatus === 'password-success' && (
                <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3">
                  <Check className="h-5 w-5 text-emerald-600" />
                  <p className="text-emerald-700 font-medium">Password updated successfully!</p>
                </div>
              )}

              {saveStatus === 'plan-success' && (
                <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3">
                  <Check className="h-5 w-5 text-emerald-600" />
                  <p className="text-emerald-700 font-medium">Subscription plan updated successfully!</p>
                </div>
              )}

              {saveStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
                  <X className="h-5 w-5 text-red-600" />
                  <p className="text-red-700 font-medium">Passwords do not match!</p>
                </div>
              )}

              {/* Section Headers */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-800 mb-2">
                  {sections.find(s => s.id === activeSection)?.label}
                </h2>
                <p className="text-slate-600">
                  {activeSection === 'profile' && 'Manage your personal information and profile settings'}
                  {activeSection === 'security' && 'Keep your account secure with strong passwords and 2FA'}
                  {activeSection === 'notifications' && 'Choose how you want to be notified about activities'}
                  {activeSection === 'billing' && 'Manage your subscription and billing information'}
                  {activeSection === 'preferences' && 'Customize your SplitMate experience'}
                </p>
              </div>

              {/* Dynamic Content */}
              {activeSection === 'profile' && renderProfileSection()}
              {activeSection === 'security' && renderSecuritySection()}
              {activeSection === 'notifications' && renderNotificationsSection()}
              {activeSection === 'billing' && renderBillingSection()}
              {activeSection === 'preferences' && (
                <div className="text-center py-12">
                  <Globe className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">Preferences</h3>
                  <p className="text-slate-600">Customize your app experience and settings</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;