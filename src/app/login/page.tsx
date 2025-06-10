'use client'

import React, { useState } from 'react';
import { Calculator, Sparkles, Eye, EyeOff, Mail, Lock, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase'
import Link from 'next/link';

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (error) throw error;

            // Redirect to dashboard or home page
            window.location.href = '/dashboard';

            // For demo purposes
            console.log('Login attempt:', { email, password });
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('An error occurred during login');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-emerald-200/20 to-green-200/20 rounded-full blur-2xl animate-pulse [animation-duration:3s]" />
                <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-emerald-200/20 to-teal-200/20 rounded-full blur-2xl animate-pulse [animation-duration:4s]" />
            </div>

            {/* Header */}
            <header className="relative z-10 border-b border-gray-200/50 bg-white/70 backdrop-blur-xl">
                <div className="container mx-auto px-4 py-6 flex items-center justify-between">
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
                    <div className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link href='/signup' >
                            <button className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors">
                                Sign up
                            </button>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] px-4 py-12">
                <div className="w-full max-w-md">
                    {/* Login Card */}
                    <div className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-3xl p-8 shadow-2xl">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <h2 className="text-4xl font-black text-gray-800 mb-3">
                                Welcome Back
                            </h2>
                            <p className="text-gray-600 text-lg">
                                Hi, Welcome back 👋
                            </p>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                                <p className="text-red-600 text-sm">{error}</p>
                            </div>
                        )}

                        {/* Login Form */}
                        <div className="space-y-6">
                            {/* Email Field */}
                            <div>
                                <div className="block text-sm font-semibold text-gray-700 mb-2">
                                    Email
                                </div>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="E.g. johndoe@email.com"
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 disabled:opacity-50"
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div>
                                <div className="block text-sm font-semibold text-gray-700 mb-2">
                                    Password
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 disabled:opacity-50"
                                        disabled={loading}
                                    />
                                    <button
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                                        disabled={loading}
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Forgot Password */}
                            <div className="flex justify-end">
                                <Link href='/forgotpassword' >
                                    <button
                                        className="text-sm text-emerald-600 hover:text-emerald-700 font-semibold transition-colors disabled:opacity-50"
                                        disabled={loading}
                                    >
                                        Forgot Password?
                                    </button>
                                </Link>
                            </div>

                            {/* Login Button */}
                            <Button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="w-full py-3 text-lg bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 border-0 shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        Signing in...
                                    </div>
                                ) : (
                                    'Login'
                                )}
                            </Button>
                        </div>

                        {/* Sign Up Link */}
                        <div className="text-center mt-6">
                            <p className="text-gray-600">
                                Not registered yet?{' '}
                                <Link href='/signup' >
                                    <button className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors" >
                                        Create an account →
                                    </button>
                                </Link>
                            </p>
                        </div>
                    </div>

                    {/* Footer Note */}
                    <p className="text-center text-sm text-gray-500 mt-6">
                        By signing in, you agree to our Terms of Service and Privacy Policy
                    </p>
                </div>
            </div>
        </div>
    );
}