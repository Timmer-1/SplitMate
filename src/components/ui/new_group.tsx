'use client'

import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

interface NewGroupProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (groupData: GroupFormData) => void;
}

export interface GroupFormData {
    name: string;
    description: string;
}

const NewGroup: React.FC<NewGroupProps> = ({ isOpen, onClose, onSubmit }) => {
    const dialogRef = useRef<HTMLDivElement>(null);

    // Form state
    const [groupForm, setGroupForm] = useState<GroupFormData>({
        name: '',
        description: ''
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
            setGroupForm({
                name: '',
                description: ''
            });
        }
    }, [isOpen]);

    const handleFormChange = (field: string, value: string) => {
        setGroupForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = () => {
        if (groupForm.name.trim()) {
            onSubmit(groupForm);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div ref={dialogRef} className="bg-white rounded-2xl p-6 w-full max-w-md">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-slate-800">Create New Group</h3>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        <X className="h-5 w-5 text-slate-500" />
                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Group Name
                        </label>
                        <input
                            type="text"
                            value={groupForm.name}
                            onChange={(e) => handleFormChange('name', e.target.value)}
                            placeholder="Enter group name..."
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                            autoFocus
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Description (Optional)
                        </label>
                        <input
                            type="text"
                            value={groupForm.description}
                            onChange={(e) => handleFormChange('description', e.target.value)}
                            placeholder="What's this group for?"
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                        />
                    </div>
                </div>

                <div className="flex items-center space-x-3 mt-8">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-medium transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={!groupForm.name.trim()}
                        className="flex-1 py-3 px-4 bg-gradient-to-r from-emerald-600 to-green-700 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-emerald-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Create Group
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewGroup;
