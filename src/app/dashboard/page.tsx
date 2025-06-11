'use client'

import React, { useState, useEffect, useRef } from 'react';
import {
  Calculator,
  Plus,
  Users,
  Receipt,
  TrendingUp,
  Bell,
  Filter,
  MoreVertical,
  ArrowUpRight,
  ArrowDownLeft,
  Sparkles,
  PieChart,
} from 'lucide-react';
import ProfileDropdown from '@/components/ui/profile';
import AddExpense, { ExpenseFormData } from '@/components/ui/add_expense';
import NewGroup, { GroupFormData } from '@/components/ui/new_group';
import Link from 'next/link';

const Dashboard = () => {
  // Mock data
  const recentTransactions = [
    { id: 1, description: "Dinner at Luigi's", amount: 84.50, group: "Weekend Trip", date: "2 hours ago", type: "expense", participants: 4 },
    { id: 2, description: "Uber to Airport", amount: 32.00, group: "Business Trip", date: "5 hours ago", type: "expense", participants: 2 },
    { id: 3, description: "Coffee Run", amount: 18.75, group: "Office Team", date: "1 day ago", type: "expense", participants: 6 },
    { id: 4, description: "Movie Tickets", amount: 45.00, group: "Date Night", date: "2 days ago", type: "expense", participants: 2 }
  ];

  const groups = [
    { id: 1, name: "Weekend Trip", members: 4, balance: -23.50, color: "from-emerald-500 to-teal-600" },
    { id: 2, name: "Office Team", members: 6, balance: 15.75, color: "from-blue-500 to-cyan-600" },
    { id: 3, name: "Business Trip", members: 2, balance: -16.00, color: "from-purple-500 to-indigo-600" },
    { id: 4, name: "Date Night", members: 2, balance: 22.50, color: "from-pink-500 to-rose-600" }
  ];

  const stats = [
    { label: "Total Expenses", value: "$2,847.50", change: "+12.5%", trend: "up" },
    { label: "You Owe", value: "$128.75", change: "-5.2%", trend: "down" },
    { label: "Owed to You", value: "$245.30", change: "+8.1%", trend: "up" },
    { label: "Active Groups", value: "8", change: "+2", trend: "up" }
  ];

  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const createDialogRef = useRef<HTMLDivElement>(null);
  const [showAddExpenseDialog, setShowAddExpenseDialog] = useState(false);
  const addExpenseDialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (createDialogRef.current && !createDialogRef.current.contains(event.target as Node)) {
        setShowCreateDialog(false);
      }
    };
    if (showCreateDialog) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCreateDialog]);

  const handleCreateGroup = (groupData: GroupFormData) => {
    console.log('Creating group:', groupData);
    // Here you would typically send the data to your API
  };

  const handleAddExpense = () => {
    setShowAddExpenseDialog(true);
  };

  const handleExpenseSubmit = (expenseData: ExpenseFormData) => {
    console.log('Creating expense:', expenseData);
    // Here you would typically send the data to your API
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <header className="border-b border-slate-200/60 bg-white/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Calculator className="h-8 w-8 text-emerald-600" />
                <Sparkles className="h-3 w-3 text-amber-500 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-slate-800 to-emerald-700 bg-clip-text text-transparent">
                SplitMate
              </h1>
            </div>

            {/* Search & Actions */}
            <div className="flex items-center space-x-4">


              <button className="p-2 hover:bg-slate-100 rounded-xl transition-colors relative">
                <Bell className="h-5 w-5 text-slate-600" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse"></span>
              </button>
              <button
                onClick={handleAddExpense}
                className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-4 py-2 rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span className="font-medium">Add Expense</span>
              </button>
              <ProfileDropdown />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Welcome back, Alex! 👋</h2>
          <p className="text-slate-600">Here's what's happening with your expenses today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-6 hover:shadow-lg hover:shadow-slate-200/50 transition-all">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-slate-600">{stat.label}</p>
                {stat.trend === 'up' ?
                  <ArrowUpRight className="h-4 w-4 text-emerald-500" /> :
                  <ArrowDownLeft className="h-4 w-4 text-red-500" />
                }
              </div>
              <div className="flex items-baseline space-x-2">
                <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                <span className={`text-xs font-medium ${stat.trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Transactions */}
          <div className="lg:col-span-2">
            <div className="bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-800">Recent Transactions</h3>
                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                    <Filter className="h-4 w-4 text-slate-600" />
                  </button>
                  <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                    <MoreVertical className="h-4 w-4 text-slate-600" />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-xl hover:bg-slate-100/50 transition-colors group">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                        <Receipt className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800 group-hover:text-emerald-600 transition-colors">
                          {transaction.description}
                        </p>
                        <div className="flex items-center space-x-2 text-sm text-slate-500">
                          <span>{transaction.group}</span>
                          <span>•</span>
                          <Users className="h-3 w-3" />
                          <span>{transaction.participants} people</span>
                          <span>•</span>
                          <span>{transaction.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-slate-800">${transaction.amount}</p>
                      <p className="text-xs text-slate-500">You paid</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="w-full mt-4 py-3 text-emerald-600 hover:text-emerald-700 font-medium transition-colors block text-center">
                <Link href="/transaction">
                  View All Transactions
                </Link>
              </div>
            </div>
          </div>

          {/* Groups & Quick Actions */}
          <div className="space-y-6">
            {/* Active Groups */}
            <div className="bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-800">Your Groups</h3>
                <Link href="/groups" className="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors">
                  View All
                </Link>
              </div>

              <div className="space-y-3">
                {groups.map((group) => (
                  <div key={group.id} className="flex items-center justify-between p-3 bg-slate-50/50 rounded-xl hover:bg-slate-100/50 transition-colors group cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 bg-gradient-to-br ${group.color} rounded-lg flex items-center justify-center`}>
                        <Users className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-800 group-hover:text-emerald-600 transition-colors">
                          {group.name}
                        </p>
                        <p className="text-xs text-slate-500">{group.members} members</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold text-sm ${group.balance < 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                        {group.balance < 0 ? '-' : '+'}${Math.abs(group.balance)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-slate-800 mb-6">Quick Actions</h3>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleAddExpense}
                  className="p-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl text-white hover:shadow-lg hover:shadow-emerald-500/25 transition-all group"
                >
                  <Plus className="h-5 w-5 mb-2 group-hover:scale-110 transition-transform" />
                  <p className="text-sm font-medium">Add Expense</p>
                </button>

                <button
                  onClick={() => setShowCreateDialog(true)}
                  className="p-4 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl text-white hover:shadow-lg hover:shadow-blue-500/25 transition-all group"
                >
                  <Users className="h-5 w-5 mb-2 group-hover:scale-110 transition-transform" />
                  <p className="text-sm font-medium">New Group</p>
                </button>

                <button className="p-4 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl text-white hover:shadow-lg hover:shadow-purple-500/25 transition-all group">
                  <PieChart className="h-5 w-5 mb-2 group-hover:scale-110 transition-transform" />
                  <p className="text-sm font-medium">Analytics</p>
                </button>

                <button className="p-4 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl text-white hover:shadow-lg hover:shadow-orange-500/25 transition-all group">
                  <TrendingUp className="h-5 w-5 mb-2 group-hover:scale-110 transition-transform" />
                  <p className="text-sm font-medium">Settle Up</p>
                </button>
              </div>
            </div>

            {/* Balance Summary */}
            <div className="bg-gradient-to-br from-emerald-600 to-green-700 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Net Balance</h3>
                <Sparkles className="h-5 w-5 animate-pulse" />
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-emerald-100">You're owed</p>
                  <p className="text-2xl font-bold">$245.30</p>
                </div>

                <div className="w-full bg-emerald-500/30 rounded-full h-2">
                  <div className="bg-white h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>

                <p className="text-xs text-emerald-100">
                  Great! You're ahead by $116.55 this month
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Expense Dialog */}
      <AddExpense
        isOpen={showAddExpenseDialog}
        onClose={() => setShowAddExpenseDialog(false)}
        onSubmit={handleExpenseSubmit}
        groups={groups}
      />

      {/* Create Group Dialog */}
      <NewGroup
        isOpen={showCreateDialog}
        onClose={() => setShowCreateDialog(false)}
        onSubmit={handleCreateGroup}
      />
    </div>
  );
};

export default Dashboard;