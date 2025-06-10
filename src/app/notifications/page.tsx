'use client'

import React, { useState } from 'react';
import { 
  Calculator, 
  Sparkles, 
  Bell, 
  Filter, 
  MoreVertical,
  Check,
  X,
  DollarSign,
  Users,
  Receipt,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowLeft,
  Settings,
  Trash2,
  Eye,
  EyeOff
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotificationsPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showRead, setShowRead] = useState(true);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'expense_added',
      title: 'New expense added',
      message: 'Sarah added "Dinner at Luigi\'s" ($84.50) to Weekend Trip',
      time: '2 hours ago',
      read: false,
      icon: Receipt,
      color: 'from-emerald-500 to-teal-600',
      group: 'Weekend Trip',
      amount: 84.50,
      actionable: true
    },
    {
      id: 2,
      type: 'payment_request',
      title: 'Payment request',
      message: 'Mike is requesting $32.00 for the Uber ride',
      time: '4 hours ago',
      read: false,
      icon: DollarSign,
      color: 'from-blue-500 to-cyan-600',
      group: 'Business Trip',
      amount: 32.00,
      actionable: true
    },
    {
      id: 3,
      type: 'settlement',
      title: 'Settlement completed',
      message: 'You received $45.25 from Alex for Office Team expenses',
      time: '6 hours ago',
      read: false,
      icon: CheckCircle,
      color: 'from-green-500 to-emerald-600',
      group: 'Office Team',
      amount: 45.25,
      actionable: false
    },
    {
      id: 4,
      type: 'group_invite',
      title: 'Group invitation',
      message: 'Emma invited you to join "Summer Vacation" group',
      time: '1 day ago',
      read: false,
      icon: Users,
      color: 'from-purple-500 to-indigo-600',
      group: 'Summer Vacation',
      actionable: true
    },
    {
      id: 5,
      type: 'reminder',
      title: 'Payment reminder',
      message: 'Reminder: You owe $18.75 to Coffee Fund group',
      time: '1 day ago',
      read: true,
      icon: Clock,
      color: 'from-orange-500 to-red-600',
      group: 'Coffee Fund',
      amount: 18.75,
      actionable: true
    },
    {
      id: 6,
      type: 'expense_updated',
      title: 'Expense updated',
      message: 'Tom updated the amount for "Movie Tickets" from $40.00 to $45.00',
      time: '2 days ago',
      read: true,
      icon: AlertCircle,
      color: 'from-yellow-500 to-orange-600',
      group: 'Date Night',
      amount: 45.00,
      actionable: false
    },
    {
      id: 7,
      type: 'group_created',
      title: 'New group created',
      message: 'You created a new group "Holiday Planning" with 5 members',
      time: '3 days ago',
      read: true,
      icon: Users,
      color: 'from-pink-500 to-rose-600',
      group: 'Holiday Planning',
      actionable: false
    }
  ]);

  const filters = [
    { id: 'all', label: 'All', count: notifications.length },
    { id: 'unread', label: 'Unread', count: notifications.filter(n => !n.read).length },
    { id: 'expenses', label: 'Expenses', count: notifications.filter(n => n.type.includes('expense')).length },
    { id: 'payments', label: 'Payments', count: notifications.filter(n => n.type.includes('payment') || n.type.includes('settlement')).length },
    { id: 'groups', label: 'Groups', count: notifications.filter(n => n.type.includes('group')).length }
  ];

  const filteredNotifications = notifications.filter(notification => {
    if (!showRead && notification.read) return false;
    
    switch (selectedFilter) {
      case 'unread':
        return !notification.read;
      case 'expenses':
        return notification.type.includes('expense');
      case 'payments':
        return notification.type.includes('payment') || notification.type.includes('settlement') || notification.type.includes('reminder');
      case 'groups':
        return notification.type.includes('group');
      default:
        return true;
    }
  });

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const getActionButtons = (notification: any) => {
    switch (notification.type) {
      case 'expense_added':
        return (
          <div className="flex gap-2 mt-3">
            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
              View Details
            </Button>
          </div>
        );
      case 'payment_request':
        return (
          <div className="flex gap-2 mt-3">
            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
              Pay Now
            </Button>
            <Button size="sm" variant="outline" className="border-gray-300">
              Decline
            </Button>
          </div>
        );
      case 'group_invite':
        return (
          <div className="flex gap-2 mt-3">
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
              Accept
            </Button>
            <Button size="sm" variant="outline" className="border-gray-300">
              Decline
            </Button>
          </div>
        );
      case 'reminder':
        return (
          <div className="flex gap-2 mt-3">
            <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-white">
              Pay Now
            </Button>
            <Button size="sm" variant="outline" className="border-gray-300">
              Remind Later
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <header className="border-b border-slate-200/60 bg-white/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo & Back */}
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" className="p-2 hover:bg-slate-100 rounded-xl">
                  <ArrowLeft className="h-5 w-5 text-slate-600" />
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Calculator className="h-8 w-8 text-emerald-600" />
                  <Sparkles className="h-3 w-3 text-amber-500 absolute -top-1 -right-1 animate-pulse" />
                </div>
                <h1 className="text-2xl font-black bg-gradient-to-r from-slate-800 to-emerald-700 bg-clip-text text-transparent">
                  SplitMate
                </h1>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowRead(!showRead)}
                className="border-slate-300 text-slate-600 hover:bg-slate-50"
              >
                {showRead ? <Eye className="h-4 w-4 mr-2" /> : <EyeOff className="h-4 w-4 mr-2" />}
                {showRead ? 'Hide Read' : 'Show Read'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={markAllAsRead}
                className="border-slate-300 text-slate-600 hover:bg-slate-50"
              >
                <Check className="h-4 w-4 mr-2" />
                Mark All Read
              </Button>
              <Button variant="ghost" className="p-2 hover:bg-slate-100 rounded-xl">
                <Settings className="h-5 w-5 text-slate-600" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="relative">
              <Bell className="h-8 w-8 text-emerald-600" />
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                  {notifications.filter(n => !n.read).length}
                </span>
              )}
            </div>
            <h2 className="text-3xl font-bold text-slate-800">Notifications</h2>
          </div>
          <p className="text-slate-600">Stay updated with your expenses and group activities</p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex space-x-1 bg-slate-100/50 p-1 rounded-xl">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-2 ${
                    selectedFilter === filter.id
                      ? 'bg-white text-emerald-600 shadow-sm'
                      : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <span>{filter.label}</span>
                  {filter.count > 0 && (
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      selectedFilter === filter.id
                        ? 'bg-emerald-100 text-emerald-600'
                        : 'bg-slate-200 text-slate-600'
                    }`}>
                      {filter.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">No notifications</h3>
              <p className="text-slate-600">
                {selectedFilter === 'all' 
                  ? "You're all caught up! No new notifications."
                  : `No ${selectedFilter} notifications at the moment.`
                }
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => {
              const IconComponent = notification.icon;
              return (
                <div
                  key={notification.id}
                  className={`bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-6 hover:shadow-lg hover:shadow-slate-200/50 transition-all group ${
                    !notification.read ? 'ring-2 ring-emerald-500/20' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      {/* Icon */}
                      <div className={`w-10 h-10 bg-gradient-to-br ${notification.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <IconComponent className="h-5 w-5 text-white" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-semibold text-slate-800 group-hover:text-emerald-600 transition-colors">
                                {notification.title}
                              </h3>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                              )}
                            </div>
                            <p className="text-slate-600 mb-2">{notification.message}</p>
                            
                            {/* Meta Info */}
                            <div className="flex items-center space-x-4 text-sm text-slate-500">
                              <span>{notification.time}</span>
                              {notification.group && (
                                <>
                                  <span>•</span>
                                  <span className="text-emerald-600 font-medium">{notification.group}</span>
                                </>
                              )}
                              {notification.amount && (
                                <>
                                  <span>•</span>
                                  <span className="font-semibold text-slate-700">${notification.amount}</span>
                                </>
                              )}
                            </div>

                            {/* Action Buttons */}
                            {notification.actionable && getActionButtons(notification)}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions Menu */}
                    <div className="flex items-center space-x-2 ml-4">
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                          className="p-2 hover:bg-slate-100 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                        >
                          <Check className="h-4 w-4 text-slate-600" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteNotification(notification.id)}
                        className="p-2 hover:bg-red-50 hover:text-red-600 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Load More */}
        {filteredNotifications.length > 0 && (
          <div className="text-center mt-8">
            <Button variant="outline" className="border-slate-300 text-slate-600 hover:bg-slate-50">
              Load More Notifications
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}