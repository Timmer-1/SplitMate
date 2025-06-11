'use client'

import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

interface Group {
    id: number;
    name: string;
    members: number;
    balance: number;
    color: string;
}

interface AddExpenseProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (expenseData: ExpenseFormData) => void;
    groups: Group[];
}

export interface ExpenseFormData {
    description: string;
    amount: string;
    category: string;
    groupId: string;
    date: string;
    paidBy: string;
    splitMethod: string;
}

const AddExpense: React.FC<AddExpenseProps> = ({ isOpen, onClose, onSubmit, groups }) => {
    const dialogRef = useRef<HTMLDivElement>(null);

    // Expense categories
    const expenseCategories = [
        'Food & Dining',
        'Transportation',
        'Entertainment',
        'Shopping',
        'Accommodation',
        'Groceries',
        'Utilities',
        'Gas/Fuel',
        'Healthcare',
        'Education',
        'Travel',
        'Other'
    ];

    // Form state
    const [expenseForm, setExpenseForm] = useState<ExpenseFormData>({
        description: '',
        amount: '',
        category: '',
        groupId: '',
        date: new Date().toISOString().split('T')[0], // Today's date
        paidBy: 'you', // Default to current user
        splitMethod: 'equal'
    });

    // Handle click outside to close dialog
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    // Reset form when dialog opens
    useEffect(() => {
        if (isOpen) {
            setExpenseForm({
                description: '',
                amount: '',
                category: '',
                groupId: '',
                date: new Date().toISOString().split('T')[0],
                paidBy: 'you',
                splitMethod: 'equal'
            });
        }
    }, [isOpen]);

    const handleFormChange = (field: string, value: string) => {
        setExpenseForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = () => {
        if (expenseForm.description.trim() && expenseForm.amount && expenseForm.category && expenseForm.groupId) {
            onSubmit(expenseForm);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div ref={dialogRef} className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-slate-800">Add New Expense</h3>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        <X className="h-5 w-5 text-slate-500" />
                    </button>
                </div>

                <div className="space-y-4">
                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Description
                        </label>
                        <input
                            type="text"
                            value={expenseForm.description}
                            onChange={(e) => handleFormChange('description', e.target.value)}
                            placeholder="What did you spend on?"
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                            autoFocus
                        />
                    </div>

                    {/* Amount */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Amount
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 font-medium">$</span>
                            <input
                                type="number"
                                step="0.01"
                                value={expenseForm.amount}
                                onChange={(e) => handleFormChange('amount', e.target.value)}
                                placeholder="0.00"
                                className="w-full pl-8 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                            />
                        </div>
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Category
                        </label>
                        <select
                            value={expenseForm.category}
                            onChange={(e) => handleFormChange('category', e.target.value)}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                        >
                            <option value="">Select a category</option>
                            {expenseCategories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Group Selection */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Group
                        </label>
                        <select
                            value={expenseForm.groupId}
                            onChange={(e) => handleFormChange('groupId', e.target.value)}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                        >
                            <option value="">Select a group</option>
                            {groups.map((group) => (
                                <option key={group.id} value={group.id.toString()}>
                                    {group.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Date */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Date
                        </label>
                        <input
                            type="date"
                            value={expenseForm.date}
                            onChange={(e) => handleFormChange('date', e.target.value)}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                        />
                    </div>

                    {/* Who Paid */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Who Paid?
                        </label>
                        <select
                            value={expenseForm.paidBy}
                            onChange={(e) => handleFormChange('paidBy', e.target.value)}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                        >
                            <option value="you">You</option>
                            <option value="other">Someone else</option>
                        </select>
                    </div>

                    {/* Split Method */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Split Method
                        </label>
                        <select
                            value={expenseForm.splitMethod}
                            onChange={(e) => handleFormChange('splitMethod', e.target.value)}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                        >
                            <option value="equal">Split equally</option>
                            <option value="exact">Enter exact amounts</option>
                            <option value="percentage">Split by percentage</option>
                        </select>
                    </div>

                    {/* Additional info based on split method */}
                    {expenseForm.splitMethod !== 'equal' && (
                        <div className="p-4 bg-slate-50 rounded-xl">
                            <p className="text-sm text-slate-600">
                                {expenseForm.splitMethod === 'exact'
                                    ? 'You can specify exact amounts for each person in the next step.'
                                    : 'You can set percentage splits for each person in the next step.'
                                }
                            </p>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-3 mt-8">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-medium transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={!expenseForm.description.trim() || !expenseForm.amount || !expenseForm.category || !expenseForm.groupId}
                        className="flex-1 py-3 px-4 bg-gradient-to-r from-emerald-600 to-green-700 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-emerald-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Add Expense
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddExpense;
