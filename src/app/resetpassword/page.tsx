'use client'

import React, { useState, useEffect } from 'react';
import { Calculator, Sparkles, Lock, Eye, EyeOff, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function ResetPasswordPage() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [validSession, setValidSession] = useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        // Check if we have a valid reset session
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                setValidSession(true);
            } else {
                // If no session, redirect to forgot password page
                router.push('/forgot-password');
            }
        };

        checkSession();
    }, [router]);

    const validatePassword = (pass: string) => {
        if (pass.length < 8) {
            return 'Password must be at least 8 characters long';
        }
        if (!/(?=.*[a-z])/.test(pass)) {
            return 'Password must contain at least one lowercase letter';
        }
        if (!/(?=.*[A-Z])/.test(pass)) {
            return 'Password must contain at least one uppercase letter';
        }
        if (!/(?=.*\d)/.test(pass)) {
            return 'Password must contain at least one number';
        }
        return null;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate passwords
        const passwordError = validatePassword(password);
        if (passwordError) {
            setError(passwordError);
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const { error } = await supabase.auth.updateUser({
                password: password
            });

            if (error) throw error;

            setSuccess(true);

            // Redirect to login after a short delay
            setTimeout(() => {
                router.push('/login');
            }, 3000);

        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('An error occurred while updating your password');
            }
        } finally {
            setLoading(false);
        }
    };

    if (!validSession) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-emerald-600" />
                    <p className="text-gray-600">Verifying reset link...</p>
                </div>
            </div>
        );
    }

    if (success) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-emerald-200/20 to-green-200/20 rounded-full blur-2xl animate-pulse [animation-duration:3s]" />
                    <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-emerald-200/20 to-teal-200/20 rounded-full blur-2xl animate-pulse [animation-duration:4s]" />
                </div>

                {/* Header */}
                <header className="relative z-10 border-b border-gray-200/50 bg-white/70 backdrop-blur-xl">
                    <div className="container mx-auto px-4 py-6 flex items-center justify-center">
                        <div className="flex items-center space-x-3 group">
                            <div className="relative">
                                <Calculator className="h-10 w-10 text-green-600 group-hover:text-green-700 transition-colors duration-300" />
                                <Sparkles className="h-4 w-4 text-amber-500 absolute -top-1 -right-1 animate-pulse" />
                            </div>
                            <Link href='/' >
                                <h1 className="text-3xl font-black bg-gradient-to-r from-gray-800 to-green-700 bg-clip-text text-transparent">
                                    SplitMate
                                </h1>
                            </Link>
                        </div>
                    </div>
                </header>

                {/* Success State */}
                <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] px-4 py-12">
                    <div className="w-full max-w-md">
                        <div className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-3xl p-8 shadow-2xl text-center">
                            <div className="mb-6">
                                <div className="flex justify-center mb-4">
                                    <div className="p-3 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full">
                                        <CheckCircle className="h-8 w-8 text-white" />
                                    </div>
                                </div>
                                <h2 className="text-3xl font-black text-gray-800 mb-3">
                                    Password Updated!
                                </h2>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    Your password has been successfully updated. You'll be redirected to the login page shortly.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <Link href="/login">
                                    <Button className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 border-0 shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 text-white">
                                        Continue to Login
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-emerald-200/20 to-green-200/20 rounded-full blur-2xl animate-pulse [animation-duration:3s]" />
                <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-emerald-200/20 to-teal-200/20 rounded-full blur-2xl animate-pulse [animation-duration:4s]" />
            </div>

            {/* Header */}
            <header className="relative z-10 border-b border-gray-200/50 bg-white/70 backdrop-blur-xl">
                <div className="container mx-auto px-4 py-6 flex items-center justify-center">
                    <div className="flex items-center space-x-3 group">
                        <div className="relative">
                            <Calculator className="h-10 w-10 text-green-600 group-hover:text-green-700 transition-colors duration-300" />
                            <Sparkles className="h-4 w-4 text-amber-500 absolute -top-1 -right-1 animate-pulse" />
                        </div>
                        <h1 className="text-3xl font-black bg-gradient-to-r from-gray-800 to-green-700 bg-clip-text text-transparent">
                            SplitMate
                        </h1>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] px-4 py-12">
                <div className="w-full max-w-md">
                    {/* Reset Password Card */}
                    <div className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-3xl p-8 shadow-2xl">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <h2 className="text-4xl font-black text-gray-800 mb-3">
                                Set New Password
                            </h2>
                            <p className="text-gray-600 text-lg">
                                Choose a strong password for your account
                            </p>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                                <p className="text-red-600 text-sm">{error}</p>
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* New Password Field */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    New Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your new password"
                                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 disabled:opacity-50"
                                        disabled={loading}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                                        disabled={loading}
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password Field */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Confirm New Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Confirm your new password"
                                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 disabled:opacity-50"
                                        disabled={loading}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                                        disabled={loading}
                                    >
                                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Password Requirements */}
                            <div className="text-sm text-gray-500">
                                <p className="mb-2 font-medium">Password must contain:</p>
                                <ul className="space-y-1">
                                    <li className={`flex items-center ${password.length >= 8 ? 'text-emerald-600' : 'text-gray-500'}`}>
                                        <div className={`w-2 h-2 rounded-full mr-2 ${password.length >= 8 ? 'bg-emerald-600' : 'bg-gray-300'}`} />
                                        At least 8 characters
                                    </li>
                                    <li className={`flex items-center ${/(?=.*[a-z])/.test(password) ? 'text-emerald-600' : 'text-gray-500'}`}>
                                        <div className={`w-2 h-2 rounded-full mr-2 ${/(?=.*[a-z])/.test(password) ? 'bg-emerald-600' : 'bg-gray-300'}`} />
                                        One lowercase letter
                                    </li>
                                    <li className={`flex items-center ${/(?=.*[A-Z])/.test(password) ? 'text-emerald-600' : 'text-gray-500'}`}>
                                        <div className={`w-2 h-2 rounded-full mr-2 ${/(?=.*[A-Z])/.test(password) ? 'bg-emerald-600' : 'bg-gray-300'}`} />
                                        One uppercase letter
                                    </li>
                                    <li className={`flex items-center ${/(?=.*\d)/.test(password) ? 'text-emerald-600' : 'text-gray-500'}`}>
                                        <div className={`w-2 h-2 rounded-full mr-2 ${/(?=.*\d)/.test(password) ? 'bg-emerald-600' : 'bg-gray-300'}`} />
                                        One number
                                    </li>
                                </ul>
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 text-lg bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 border-0 shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        Updating Password...
                                    </div>
                                ) : (
                                    'Update Password'
                                )}
                            </Button>
                        </form>
                    </div>

                    {/* Footer Note */}
                    <p className="text-center text-sm text-gray-500 mt-6">
                        Your password will be securely encrypted and stored
                    </p>
                </div>
            </div>
        </div>
    );
}