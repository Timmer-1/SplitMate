'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Receipt,
    ArrowUpRight,
    ArrowDownLeft,
    Filter,
    Search,
    Calendar,
    Users,
    DollarSign,
    CheckCircle,
    Clock,
    X,
    MoreVertical,
    Download,
    Eye,
    Calculator,
    Sparkles,
    ArrowLeft
} from 'lucide-react';

interface Transaction {
    id: number;
    type: 'expense' | 'settlement';
    description: string;
    amount: number;
    group: string;
    date: string;
    time: string;
    participants: number;
    status: 'settled' | 'pending' | 'completed' | 'partially_settled';
    category: string;
    paidBy: string;
    yourShare: number;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
}

const TransactionsPage: React.FC = () => {
    const router = useRouter();
    const [filterType, setFilterType] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    // Mock transaction data including both expenses and settlements
    const allTransactions: Transaction[] = [
        {
            id: 1,
            type: 'expense',
            description: "Dinner at Luigi's",
            amount: 84.50,
            group: "Weekend Trip",
            date: "2024-12-08",
            time: "2 hours ago",
            participants: 4,
            status: 'settled',
            category: 'Food & Dining',
            paidBy: 'You',
            yourShare: 21.13,
            icon: Receipt,
            color: 'from-emerald-500 to-teal-600'
        },
        {
            id: 2,
            type: 'settlement',
            description: "John paid you for Uber ride",
            amount: 16.00,
            group: "Weekend Trip",
            date: "2024-12-08",
            time: "3 hours ago",
            participants: 2,
            status: 'completed',
            category: 'Settlement',
            paidBy: 'John Smith',
            yourShare: 16.00,
            icon: DollarSign,
            color: 'from-green-500 to-emerald-600'
        },
        {
            id: 3,
            type: 'expense',
            description: "Uber to Airport",
            amount: 32.00,
            group: "Business Trip",
            date: "2024-12-08",
            time: "5 hours ago",
            participants: 2,
            status: 'pending',
            category: 'Transportation',
            paidBy: 'You',
            yourShare: 16.00,
            icon: Receipt,
            color: 'from-blue-500 to-cyan-600'
        },
        {
            id: 4,
            type: 'settlement',
            description: "You paid Sarah for coffee",
            amount: 9.38,
            group: "Office Team",
            date: "2024-12-07",
            time: "1 day ago",
            participants: 2,
            status: 'completed',
            category: 'Settlement',
            paidBy: 'You',
            yourShare: -9.38,
            icon: DollarSign,
            color: 'from-purple-500 to-indigo-600'
        },
        {
            id: 5,
            type: 'expense',
            description: "Coffee Run",
            amount: 18.75,
            group: "Office Team",
            date: "2024-12-07",
            time: "1 day ago",
            participants: 6,
            status: 'partially_settled',
            category: 'Food & Dining',
            paidBy: 'Sarah',
            yourShare: 3.13,
            icon: Receipt,
            color: 'from-amber-500 to-orange-600'
        },
        {
            id: 6,
            type: 'expense',
            description: "Movie Tickets",
            amount: 45.00,
            group: "Date Night",
            date: "2024-12-06",
            time: "2 days ago",
            participants: 2,
            status: 'settled',
            category: 'Entertainment',
            paidBy: 'You',
            yourShare: 22.50,
            icon: Receipt,
            color: 'from-pink-500 to-rose-600'
        },
        {
            id: 7,
            type: 'settlement',
            description: "Emma paid you for groceries",
            amount: 28.45,
            group: "Roommates",
            date: "2024-12-05",
            time: "3 days ago",
            participants: 3,
            status: 'completed',
            category: 'Settlement',
            paidBy: 'Emma Wilson',
            yourShare: 28.45,
            icon: DollarSign,
            color: 'from-teal-500 to-green-600'
        },
        {
            id: 8,
            type: 'expense',
            description: "Grocery Shopping",
            amount: 127.80,
            group: "Roommates",
            date: "2024-12-05",
            time: "3 days ago",
            participants: 3,
            status: 'pending',
            category: 'Food & Dining',
            paidBy: 'You',
            yourShare: 42.60,
            icon: Receipt,
            color: 'from-green-500 to-teal-600'
        }
    ];

    // Filter transactions based on selected filters
    const filteredTransactions = allTransactions.filter(transaction => {
        const matchesType = filterType === 'all' || transaction.type === filterType;
        const matchesStatus = filterStatus === 'all' || transaction.status === filterStatus;
        const matchesSearch = transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            transaction.group.toLowerCase().includes(searchQuery.toLowerCase()) ||
            transaction.category.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesType && matchesStatus && matchesSearch;
    });

    const getStatusColor = (status: Transaction['status']): string => {
        switch (status) {
            case 'completed':
            case 'settled':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'partially_settled':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            default:
                return 'bg-slate-100 text-slate-800 border-slate-200';
        }
    };

    const getStatusIcon = (status: Transaction['status']): React.ComponentType<{ className?: string }> => {
        switch (status) {
            case 'completed':
            case 'settled':
                return CheckCircle;
            case 'pending':
                return Clock;
            case 'partially_settled':
                return Clock;
            default:
                return Clock;
        }
    };

    const formatAmount = (amount: number, yourShare: number, type: Transaction['type']): string => {
        if (type === 'settlement') {
            return yourShare > 0 ? `+$${Math.abs(yourShare).toFixed(2)}` : `-$${Math.abs(yourShare).toFixed(2)}`;
        }
        return `$${amount.toFixed(2)}`;
    };

    const getAmountColor = (yourShare: number, type: Transaction['type']): string => {
        if (type === 'settlement') {
            return yourShare > 0 ? 'text-green-600' : 'text-red-600';
        }
        return 'text-slate-800';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
            {/* Header */}
            <header className="border-b border-slate-200/60 bg-white/80 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo and Back Button */}
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => router.push('/dashboard')}
                                className="p-2 hover:bg-slate-100 rounded-lg transition-colors flex items-center space-x-2 text-slate-600 hover:text-slate-800"
                            >
                                <ArrowLeft className="h-5 w-5" />
                                <span className="text-sm font-medium">Back to Dashboard</span>
                            </button>
                            <div className="flex items-center space-x-3">
                                <div className="relative">
                                    <Calculator className="h-8 w-8 text-emerald-600" />
                                    <Sparkles className="h-3 w-3 text-amber-500 absolute -top-1 -right-1 animate-pulse" />
                                </div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                                    SplitMate
                                </h1>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-4">
                            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                                <Download className="h-5 w-5 text-slate-600" />
                            </button>
                            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                                <MoreVertical className="h-5 w-5 text-slate-600" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Page Header */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-slate-800 mb-2">All Transactions</h2>
                    <p className="text-slate-600">Track all your expenses and settlements in one place</p>
                </div>

                {/* Filters and Search */}
                <div className="bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-6 mb-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-6">
                        {/* Search */}
                        <div className="relative flex-1 max-w-md">
                            <Search className="h-5 w-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Search transactions..."
                                value={searchQuery}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                            />
                        </div>

                        {/* Filter Buttons */}
                        <div className="flex items-center space-x-4">
                            <div className="flex bg-slate-100/50 rounded-lg p-1">
                                {['all', 'expense', 'settlement'].map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => setFilterType(type)}
                                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filterType === type
                                            ? 'bg-white text-emerald-600 shadow-sm'
                                            : 'text-slate-600 hover:text-slate-800'
                                            }`}
                                    >
                                        {type === 'all' ? 'All' : type === 'expense' ? 'Expenses' : 'Settlements'}
                                    </button>
                                ))}
                            </div>

                            <div className="flex bg-slate-100/50 rounded-lg p-1">
                                {['all', 'pending', 'settled', 'completed'].map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => setFilterStatus(status)}
                                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filterStatus === status
                                            ? 'bg-white text-emerald-600 shadow-sm'
                                            : 'text-slate-600 hover:text-slate-800'
                                            }`}
                                    >
                                        {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="p-3 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <Filter className="h-5 w-5 text-slate-600" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Transactions List */}
                <div className="bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-2xl overflow-hidden">
                    <div className="divide-y divide-slate-200/50">
                        {filteredTransactions.map((transaction) => {
                            const StatusIcon = getStatusIcon(transaction.status);
                            const TransactionIcon = transaction.icon;

                            return (
                                <div
                                    key={transaction.id}
                                    className="p-6 hover:bg-slate-50/50 transition-colors group cursor-pointer"
                                >
                                    <div className="flex items-center justify-between">
                                        {/* Left Side - Transaction Info */}
                                        <div className="flex items-center space-x-4">
                                            {/* Icon */}
                                            <div className={`w-12 h-12 bg-gradient-to-br ${transaction.color} rounded-xl flex items-center justify-center`}>
                                                <TransactionIcon className="h-6 w-6 text-white" />
                                            </div>

                                            {/* Details */}
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-3 mb-1">
                                                    <h3 className="font-semibold text-slate-800 group-hover:text-emerald-600 transition-colors">
                                                        {transaction.description}
                                                    </h3>
                                                    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${getStatusColor(transaction.status)}`}>
                                                        <StatusIcon className="h-3 w-3 mr-1" />
                                                        {transaction.status.replace('_', ' ')}
                                                    </span>
                                                </div>

                                                <div className="flex items-center space-x-4 text-sm text-slate-500">
                                                    <span className="flex items-center space-x-1">
                                                        <Users className="h-3 w-3" />
                                                        <span>{transaction.group}</span>
                                                    </span>
                                                    <span>•</span>
                                                    <span>{transaction.participants} people</span>
                                                    <span>•</span>
                                                    <span>{transaction.category}</span>
                                                    <span>•</span>
                                                    <span>{transaction.time}</span>
                                                </div>

                                                {transaction.type === 'expense' && (
                                                    <div className="mt-1 text-xs text-slate-400">
                                                        Paid by {transaction.paidBy} • Your share: ${Math.abs(transaction.yourShare).toFixed(2)}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Right Side - Amount and Actions */}
                                        <div className="flex items-center space-x-4">
                                            <div className="text-right">
                                                <p className={`text-lg font-bold ${getAmountColor(transaction.yourShare, transaction.type)}`}>
                                                    {formatAmount(transaction.amount, transaction.yourShare, transaction.type)}
                                                </p>
                                                <p className="text-xs text-slate-500">
                                                    {transaction.type === 'settlement'
                                                        ? (transaction.yourShare > 0 ? 'You received' : 'You paid')
                                                        : `Total: $${transaction.amount.toFixed(2)}`
                                                    }
                                                </p>
                                            </div>

                                            <button className="p-2 opacity-0 group-hover:opacity-100 hover:bg-slate-100 rounded-lg transition-all">
                                                <Eye className="h-4 w-4 text-slate-600" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {filteredTransactions.length === 0 && (
                        <div className="p-12 text-center">
                            <Receipt className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-slate-800 mb-2">No transactions found</h3>
                            <p className="text-slate-500">Try adjusting your filters or search criteria</p>
                        </div>
                    )}
                </div>

                {/* Summary Footer */}
                {filteredTransactions.length > 0 && (
                    <div className="mt-8 bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-slate-800">
                                    {filteredTransactions.filter(t => t.type === 'expense').length}
                                </p>
                                <p className="text-sm text-slate-500">Expenses</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-slate-800">
                                    {filteredTransactions.filter(t => t.type === 'settlement').length}
                                </p>
                                <p className="text-sm text-slate-500">Settlements</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-emerald-600">
                                    ${filteredTransactions
                                        .filter(t => t.type === 'expense')
                                        .reduce((sum, t) => sum + t.amount, 0)
                                        .toFixed(2)}
                                </p>
                                <p className="text-sm text-slate-500">Total Expenses</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TransactionsPage;