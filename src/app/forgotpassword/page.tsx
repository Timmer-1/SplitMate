'use client'

import React, { useState } from 'react';
import { Calculator, Sparkles, Mail, ArrowLeft, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [emailSent, setEmailSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) {
            setError('Please enter your email address');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/auth/reset-password`,
            });

            if (error) throw error;

            setEmailSent(true);
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('An error occurred while sending the reset email');
            }
        } finally {
            setLoading(false);
        }
    };

    if (emailSent) {
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
                            <Link href='/'>
                                <h1 className="text-3xl font-black bg-gradient-to-r from-gray-800 to-green-700 bg-clip-text text-transparent">
                                    SplitMate
                                </h1>
                            </Link>
                        </div>
                        <div className="text-sm text-gray-600">
                            Remember your password?{' '}
                            <Link href="/login" className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors">
                                Sign in
                            </Link>
                        </div>
                    </div>
                </header >

                {/* Main Content - Success State */}
                < div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] px-4 py-12" >
                    <div className="w-full max-w-md">
                        <div className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-3xl p-8 shadow-2xl text-center">
                            <div className="mb-6">
                                <div className="flex justify-center mb-4">
                                    <div className="p-3 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full">
                                        <CheckCircle className="h-8 w-8 text-white" />
                                    </div>
                                </div>
                                <h2 className="text-3xl font-black text-gray-800 mb-3">
                                    Check Your Email
                                </h2>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    We've sent a password reset link to{' '}
                                    <span className="font-semibold text-emerald-600">{email}</span>
                                </p>
                            </div>

                            <div className="space-y-4">
                                <p className="text-sm text-gray-500">
                                    Didn't receive the email? Check your spam folder or try again.
                                </p>

                                <div className="flex flex-col gap-3">
                                    <Button
                                        onClick={() => {
                                            setEmailSent(false);
                                            setEmail('');
                                        }}
                                        variant="outline"
                                        className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 backdrop-blur-sm transition-all duration-300"
                                    >
                                        Try Different Email
                                    </Button>

                                    <Link href="/login">
                                        <Button className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 border-0 shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 text-white">
                                            Back to Login
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
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
                <div className="container mx-auto px-4 py-6 flex items-center justify-between">
                    <div className="flex items-center space-x-3 group">
                        <div className="relative">
                            <Calculator className="h-10 w-10 text-green-600 group-hover:text-green-700 transition-colors duration-300" />
                            <Sparkles className="h-4 w-4 text-amber-500 absolute -top-1 -right-1 animate-pulse" />
                        </div>
                        <h1 className="text-3xl font-black bg-gradient-to-r from-gray-800 to-green-700 bg-clip-text text-transparent">
                            SplitMate
                        </h1>
                    </div>
                    <div className="text-sm text-gray-600">
                        Remember your password?{' '}
                        <Link href="/login" className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors">
                            Sign in
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] px-4 py-12">
                <div className="w-full max-w-md">
                    {/* Forgot Password Card */}
                    <div className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-3xl p-8 shadow-2xl">
                        {/* Back Button */}
                        <div className="mb-6">
                            <Link href="/login">
                                <Button
                                    variant="ghost"
                                    className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-all duration-300"
                                >
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Back to Login
                                </Button>
                            </Link>
                        </div>

                        {/* Header */}
                        <div className="text-center mb-8">
                            <h2 className="text-4xl font-black text-gray-800 mb-3">
                                Reset Password
                            </h2>
                            <p className="text-gray-600 text-lg">
                                Enter your email and we'll send you a link to reset your password
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
                            {/* Email Field */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email address"
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 disabled:opacity-50"
                                        disabled={loading}
                                        required
                                    />
                                </div>
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
                                        Sending Reset Link...
                                    </div>
                                ) : (
                                    'Send Reset Link'
                                )}
                            </Button>
                        </form>

                        {/* Additional Info */}
                        <div className="text-center mt-6">
                            <p className="text-sm text-gray-500">
                                Don't have an account?{' '}
                                <Link href="/signup" className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors">
                                    Sign up →
                                </Link>
                            </p>
                        </div>
                    </div>

                    {/* Footer Note */}
                    <p className="text-center text-sm text-gray-500 mt-6">
                        Having trouble? Contact our support team for assistance
                    </p>
                </div>
            </div>
        </div>
    );
}