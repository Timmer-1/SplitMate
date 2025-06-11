'use client'
import React, { useState, useRef, useEffect } from 'react';
import {
    Users,
    Plus,
    Search,
    Filter,
    MoreVertical,
    Calculator,
    Sparkles,
    Bell,
    ArrowUpRight,
    ArrowDownLeft,
    X
} from 'lucide-react';
import ProfileDropdown from '@/components/ui/profile';
import NewGroup, { GroupFormData } from '@/components/ui/new_group';
import Link from 'next/link';

const GroupsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showCreateDialog, setShowCreateDialog] = useState(false);
    const [showFilterDialog, setShowFilterDialog] = useState(false);
    const filterDialogRef = useRef<HTMLDivElement>(null);
    const [filters, setFilters] = useState({
        balance: 'all',
        members: 'all',
        activity: 'all',
    });
    const [tempFilters, setTempFilters] = useState(filters);

    // Add click outside handler
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (filterDialogRef.current && !filterDialogRef.current.contains(event.target as Node)) {
                setShowFilterDialog(false);
                setTempFilters(filters); // Reset temp filters when closing
            }
        };

        if (showFilterDialog) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showFilterDialog, filters]);

    // Update tempFilters when opening the dialog
    useEffect(() => {
        if (showFilterDialog) {
            setTempFilters(filters);
        }
    }, [showFilterDialog, filters]);

    // Mock data for existing groups
    const groups = [
        {
            id: 1,
            name: "Weekend Trip",
            members: 4,
            balance: -23.50,
            color: "from-emerald-500 to-teal-600",
            description: "San Francisco getaway",
            lastActivity: "2 hours ago",
            totalExpenses: 847.50
        },
        {
            id: 2,
            name: "Office Team",
            members: 6,
            balance: 15.75,
            color: "from-blue-500 to-cyan-600",
            description: "Team lunches & events",
            lastActivity: "5 hours ago",
            totalExpenses: 234.25
        },
        {
            id: 3,
            name: "Business Trip",
            members: 2,
            balance: -16.00,
            color: "from-purple-500 to-indigo-600",
            description: "NYC conference",
            lastActivity: "1 day ago",
            totalExpenses: 1205.75
        },
        {
            id: 4,
            name: "Date Night",
            members: 2,
            balance: 22.50,
            color: "from-pink-500 to-rose-600",
            description: "Dinners & activities",
            lastActivity: "2 days ago",
            totalExpenses: 156.80
        },
        {
            id: 5,
            name: "Roommates",
            members: 3,
            balance: 45.20,
            color: "from-orange-500 to-red-600",
            description: "Shared household expenses",
            lastActivity: "3 days ago",
            totalExpenses: 892.30
        },
        {
            id: 6,
            name: "Book Club",
            members: 8,
            balance: -8.75,
            color: "from-indigo-500 to-purple-600",
            description: "Monthly meetups",
            lastActivity: "1 week ago",
            totalExpenses: 67.50
        }
        ,
        {
            id: 7,
            name: "Book Club",
            members: 8,
            balance: -8.75,
            color: "from-indigo-500 to-purple-600",
            description: "Monthly meetups",
            lastActivity: "1 week ago",
            totalExpenses: 67.50
        }
        ,
        {
            id: 8,
            name: "Book Club",
            members: 8,
            balance: -8.75,
            color: "from-indigo-500 to-purple-600",
            description: "Monthly meetups",
            lastActivity: "1 week ago",
            totalExpenses: 67.50
        }
        ,
        {
            id: 9,
            name: "Book Club",
            members: 8,
            balance: -8.75,
            color: "from-indigo-500 to-purple-600",
            description: "Monthly meetups",
            lastActivity: "1 week ago",
            totalExpenses: 67.50
        }
        ,
        {
            id: 10,
            name: "Book Club",
            members: 8,
            balance: -8.75,
            color: "from-indigo-500 to-purple-600",
            description: "Monthly meetups",
            lastActivity: "1 week ago",
            totalExpenses: 67.50
        }
    ];

    const filteredGroups = groups.filter(group => {
        // Search filter
        const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            group.description.toLowerCase().includes(searchTerm.toLowerCase());

        // Balance filter
        const matchesBalance = filters.balance === 'all' ||
            (filters.balance === 'positive' && group.balance > 0) ||
            (filters.balance === 'negative' && group.balance < 0);

        // Members filter
        const matchesMembers = filters.members === 'all' ||
            (filters.members === 'small' && group.members <= 2) ||
            (filters.members === 'medium' && group.members > 2 && group.members <= 4) ||
            (filters.members === 'large' && group.members > 4);

        // Activity filter (simplified for demo)
        const matchesActivity = filters.activity === 'all' ||
            (filters.activity === 'today' && group.lastActivity.includes('hours ago')) ||
            (filters.activity === 'week' && (group.lastActivity.includes('day') || group.lastActivity.includes('week'))) ||
            (filters.activity === 'month' && group.lastActivity.includes('month'));

        return matchesSearch && matchesBalance && matchesMembers && matchesActivity;
    });

    const handleCreateGroup = (groupData: GroupFormData) => {
        console.log('Creating group:', groupData);
        // Here you would typically send the data to your API
    };

    const handleFilterChange = (filterType: string, value: string) => {
        setTempFilters(prev => ({
            ...prev,
            [filterType]: value
        }));
    };

    const clearFilters = () => {
        setTempFilters({
            balance: 'all',
            members: 'all',
            activity: 'all'
        });
    };

    const applyFilters = () => {
        setFilters(tempFilters);
        setShowFilterDialog(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
            {/* Header */}
            <header className="border-b border-slate-200/60 bg-white/80 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center space-x-3">
                            <Link href="/dashboard">
                                <div className="relative">
                                    <Calculator className="h-8 w-8 text-emerald-600" />
                                    <Sparkles className="h-3 w-3 text-amber-500 absolute -top-1 -right-1 animate-pulse" />
                                </div>
                            </Link>

                            <Link href="/dashboard">
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                                    SplitMate
                                </h1>
                            </Link>
                        </div>

                        {/* Header Actions */}
                        <div className="flex items-center space-x-4">
                            <button className="relative p-2 text-slate-600 hover:text-slate-800 transition-colors">
                                <Bell className="h-5 w-5" />
                                <span className="absolute top-1 right-1 h-2 w-2 bg-emerald-500 rounded-full"></span>
                            </button>

                            <ProfileDropdown />
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Page Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-800 mb-2">Your Groups</h2>
                        <p className="text-slate-600">Manage all your expense groups in one place</p>
                    </div>

                    <button
                        onClick={() => setShowCreateDialog(true)}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-700 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-emerald-500/25 transition-all group"
                    >
                        <Plus className="h-5 w-5 group-hover:scale-110 transition-transform" />
                        Create New Group
                    </button>
                </div>

                {/* Search and Filters */}
                <div className="flex items-center space-x-4 mb-8">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search groups..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                        />
                    </div>

                    <button
                        onClick={() => setShowFilterDialog(true)}
                        className="px-4 py-3 bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-xl text-slate-600 hover:text-slate-800 transition-colors"
                    >
                        <Filter className="h-5 w-5" />
                    </button>
                </div>

                {/* Groups Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredGroups.map((group) => (
                        <div
                            key={group.id}
                            className="bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-6 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300 group cursor-pointer"
                        >
                            {/* Group Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <div className={`w-12 h-12 bg-gradient-to-br ${group.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                        <Users className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">
                                            {group.name}
                                        </h3>
                                        <p className="text-sm text-slate-500">{group.description}</p>
                                    </div>
                                </div>

                                <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                                    <MoreVertical className="h-4 w-4" />
                                </button>
                            </div>

                            {/* Group Stats */}
                            <div className="space-y-3 mb-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-slate-500">Members</span>
                                    <span className="text-sm font-medium text-slate-700">{group.members} people</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-slate-500">Total Expenses</span>
                                    <span className="text-sm font-medium text-slate-700">${group.totalExpenses}</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-slate-500">Your Balance</span>
                                    <div className="flex items-center space-x-1">
                                        {group.balance < 0 ? (
                                            <ArrowDownLeft className="h-3 w-3 text-red-500" />
                                        ) : (
                                            <ArrowUpRight className="h-3 w-3 text-emerald-500" />
                                        )}
                                        <span className={`text-sm font-bold ${group.balance < 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                                            {group.balance < 0 ? '-' : '+'}${Math.abs(group.balance)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Last Activity */}
                            <div className="text-xs text-slate-400 border-t border-slate-200/50 pt-3">
                                Last activity: {group.lastActivity}
                            </div>

                            {/* Quick Actions */}
                            <div className="flex items-center space-x-2 mt-4">
                                <button className="flex-1 py-2 px-3 bg-slate-100/50 hover:bg-slate-200/50 rounded-lg text-sm font-medium text-slate-600 transition-colors">
                                    View Details
                                </button>
                                <button className="p-2 bg-emerald-100/50 hover:bg-emerald-200/50 rounded-lg text-emerald-600 transition-colors">
                                    <Plus className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredGroups.length === 0 && searchTerm && (
                    <div className="text-center py-12">
                        <Users className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-slate-600 mb-2">No groups found</h3>
                        <p className="text-slate-500">Try adjusting your search terms</p>
                    </div>
                )}
            </div>

            {/* Create Group Dialog */}
            <NewGroup
                isOpen={showCreateDialog}
                onClose={() => setShowCreateDialog(false)}
                onSubmit={handleCreateGroup}
            />

            {/* Filter Dialog */}
            {showFilterDialog && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div ref={filterDialogRef} className="bg-white rounded-2xl p-6 w-full max-w-md">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-slate-800">Filter Groups</h3>
                            <button
                                onClick={() => {
                                    setShowFilterDialog(false);
                                    setTempFilters(filters); // Reset temp filters when closing
                                }}
                                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <X className="h-5 w-5 text-slate-500" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {/* Balance Filter */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Balance
                                </label>
                                <select
                                    value={tempFilters.balance}
                                    onChange={(e) => handleFilterChange('balance', e.target.value)}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                                >
                                    <option value="all">All Balances</option>
                                    <option value="positive">Positive Balance</option>
                                    <option value="negative">Negative Balance</option>
                                </select>
                            </div>

                            {/* Members Filter */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Group Size
                                </label>
                                <select
                                    value={tempFilters.members}
                                    onChange={(e) => handleFilterChange('members', e.target.value)}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                                >
                                    <option value="all">All Sizes</option>
                                    <option value="small">Small (1-2 members)</option>
                                    <option value="medium">Medium (3-4 members)</option>
                                    <option value="large">Large (5+ members)</option>
                                </select>
                            </div>

                            {/* Activity Filter */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Last Activity
                                </label>
                                <select
                                    value={tempFilters.activity}
                                    onChange={(e) => handleFilterChange('activity', e.target.value)}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                                >
                                    <option value="all">All Time</option>
                                    <option value="today">Today</option>
                                    <option value="week">This Week</option>
                                    <option value="month">This Month</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3 mt-6">
                            <button
                                onClick={clearFilters}
                                className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-medium transition-colors"
                            >
                                Clear Filters
                            </button>
                            <button
                                onClick={applyFilters}
                                className="flex-1 py-3 px-4 bg-gradient-to-r from-emerald-600 to-green-700 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-emerald-500/25 transition-all"
                            >
                                Apply Filters
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GroupsPage;