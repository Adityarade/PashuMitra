'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, User, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function LoginPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [isSignUp, setIsSignUp] = useState(false);
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  const [loading, setLoading] = useState(false);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate network delay
    setTimeout(() => {
      localStorage.setItem('bhashasetu_auth', JSON.stringify({ role, loggedIn: true }));
      setLoading(false);
      if (role === 'student') router.push('/student');
      else router.push('/teacher');
    }, 1200);
  };

  const handleGoogleAuth = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem('bhashasetu_auth', JSON.stringify({ role, loggedIn: true, provider: 'google' }));
      setLoading(false);
      if (role === 'student') router.push('/student');
      else router.push('/teacher');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-emerald-500/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden flex flex-col md:flex-row relative z-10">
        
        {/* Left Side: Brand & Value Prop */}
        <div className="md:w-5/12 bg-slate-900 text-white p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent" />
          
          <div className="relative z-10">
            <Link href="/" className="inline-flex items-center gap-3 group mb-12">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white font-black text-2xl shadow-lg">
                भा
              </div>
              <div className="leading-none">
                <span className="font-black text-2xl tracking-tight text-white">
                  Bhasha<span className="text-orange-500">Setu</span>
                </span>
                <p className="text-xs text-slate-400 font-medium mt-1">
                  NEP 2020 Learning Platform
                </p>
              </div>
            </Link>

            <div className="space-y-6">
              <h2 className="text-3xl font-black leading-tight">
                Empowering India&apos;s Next Generation
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Join thousands of students and teachers learning across 22+ regional Indian languages using state-of-the-art AI.
              </p>
            </div>
          </div>

          <div className="relative z-10 mt-12 space-y-4">
            <div className="flex items-center gap-3 text-sm text-slate-300 font-medium">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Real-time Class Translation</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-300 font-medium">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Syllabus AI Doubt Tutor</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-300 font-medium">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Free & Offline PWA Ready</span>
            </div>
          </div>
        </div>

        {/* Right Side: Auth Form */}
        <div className="md:w-7/12 p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto">
            
            <div className="text-center mb-8">
              <h1 className="text-2xl font-black text-slate-900 mb-2">
                {isSignUp ? 'Create your account' : 'Welcome back'}
              </h1>
              <p className="text-sm text-slate-500 font-medium">
                {isSignUp 
                  ? 'Start your multilingual learning journey today.' 
                  : 'Enter your details to access your dashboard.'}
              </p>
            </div>

            {/* Role Toggle */}
            <div className="flex p-1 bg-slate-100 rounded-xl mb-8">
              <button
                type="button"
                onClick={() => setRole('student')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  role === 'student' ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                I am a Student
              </button>
              <button
                type="button"
                onClick={() => setRole('teacher')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  role === 'teacher' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                I am an Educator
              </button>
            </div>

            <form onSubmit={handleAuth} className="space-y-4">
              {isSignUp && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 ml-1">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <User className="w-4 h-4 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      required
                      placeholder={role === 'student' ? "e.g. Aarav Marandi" : "e.g. Smt. Sunita Murmu"}
                      className="block w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 ml-1">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Mail className="w-4 h-4 text-slate-400" />
                  </div>
                  <input
                    type="email"
                    required
                    placeholder="you@school.edu.in"
                    className="block w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 ml-1">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Lock className="w-4 h-4 text-slate-400" />
                  </div>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    className="block w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
                  />
                </div>
                {!isSignUp && (
                  <div className="mt-2 text-right">
                    <button type="button" className="text-xs font-bold text-orange-600 hover:text-orange-700">
                      Forgot password?
                    </button>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3.5 rounded-xl font-black text-white text-sm transition-all flex items-center justify-center gap-2 mt-4 ${
                  loading ? 'opacity-70 cursor-wait' : 'hover:scale-[1.02] active:scale-[0.98]'
                } ${role === 'student' ? 'bg-orange-600 hover:bg-orange-700 shadow-orange-600/20 shadow-lg' : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20 shadow-lg'}`}
              >
                {loading ? 'Authenticating...' : (isSignUp ? 'Create Account' : 'Sign In')}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>

            <div className="mt-6 relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-sm font-medium">
                <span className="px-3 bg-white text-slate-500">Or continue with</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleAuth}
              disabled={loading}
              className="mt-6 w-full flex items-center justify-center gap-3 px-4 py-3 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 text-sm font-bold text-slate-700 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Google
            </button>

            <p className="mt-8 text-center text-xs font-medium text-slate-600">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button 
                onClick={() => setIsSignUp(!isSignUp)}
                className="font-bold text-orange-600 hover:text-orange-700 underline underline-offset-2"
              >
                {isSignUp ? 'Sign in instead' : 'Create one now'}
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Security Footer */}
      <div className="absolute bottom-4 flex items-center justify-center gap-2 text-slate-400 text-[10px] font-bold">
        <ShieldCheck className="w-3.5 h-3.5" />
        <span>Secured by Google Auth & Enterprise SSL</span>
      </div>
    </div>
  );
}
