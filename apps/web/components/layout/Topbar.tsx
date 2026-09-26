'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Search, 
  Sparkles, 
  Languages, 
  Wifi, 
  WifiOff, 
  Smartphone, 
  Laptop, 
  Volume2, 
  Menu,
  Bell,
  HelpCircle
} from 'lucide-react';
import { SUPPORTED_LANGUAGES, LanguageCode } from '@bhashasetu/shared';
import { useLanguage } from '@/lib/LanguageContext';

interface TopbarProps {
  onToggleMobileSidebar: () => void;
  onOpenDeviceSimulator?: () => void;
}

export default function Topbar({ onToggleMobileSidebar, onOpenDeviceSimulator }: TopbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { language, setLanguage, t } = useLanguage();
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [authData, setAuthData] = useState<{role: string, loggedIn: boolean} | null>(null);

  useEffect(() => {
    // Check auth status
    try {
      const auth = localStorage.getItem('bhashasetu_auth');
      if (auth) setAuthData(JSON.parse(auth));
    } catch (e) {}

    setIsOnline(navigator.onLine);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const getPageTitle = () => {
    if (pathname.includes('/student/learn')) return t('nav.karaoke', 'Karaoke Read-Along (स्वराघात पठन)');
    if (pathname.includes('/student/quiz')) return t('nav.quiz', 'Adaptive Micro-Quiz (BKT Knowledge Tracing)');
    if (pathname.includes('/student/doubt')) return t('nav.doubt_tutor', 'Curriculum RAG Doubt Tutor');
    if (pathname.includes('/student/stories')) return t('nav.stories', 'AI Cultural Tale Weaver');
    if (pathname.includes('/student/corpus')) return t('nav.corpus', 'Gamified Tribal Speech Corpus');
    if (pathname.startsWith('/student')) return t('nav.student_zone', 'Student Vernacular Learning Portal');
    if (pathname.includes('/teacher/live')) return t('nav.live_class', 'Live Classroom Streaming Translator');
    if (pathname.includes('/teacher/copilot')) return t('nav.content_copilot', 'Teacher Content Copilot & Worksheets');
    if (pathname.includes('/teacher/review')) return t('nav.review_queue', 'Corpus Human-in-the-Loop Review Queue');
    if (pathname.startsWith('/teacher')) return t('nav.teacher_zone', 'Teacher Pedagogical Console');
    if (pathname.startsWith('/admin')) return t('nav.heatmap', 'National Language-Gap Heatmap');
    if (pathname.includes('/tools/code-switch')) return t('nav.code_switch', 'Code-Switching & Dialect Mixer Assistant');
    if (pathname.includes('/tools/app-hub')) return t('nav.app_hub', 'Android App & Web PWA Distribution Hub');
    return t('platform.title', 'National Multilingual Pedagogy Platform');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/student/doubt?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200 shadow-2xs">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Left: Mobile trigger & Page Title */}
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleMobileSidebar}
              className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <h1 className="text-base sm:text-lg font-black text-slate-900 tracking-tight line-clamp-1">
                {getPageTitle()}
              </h1>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-semibold">
                <span className="text-orange-600 font-bold">{t('platform.nep', 'NEP 2020')}</span>
                <span>•</span>
                <span>{t('platform.subtitle', 'Mother-Tongue Education System')}</span>
              </div>
            </div>
          </div>

          {/* Center: Quick AI Search / Ask Doubt */}
          <div className="hidden lg:flex flex-1 max-w-md mx-4">
            <form onSubmit={handleSearchSubmit} className="w-full relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('topbar.search_placeholder', 'Ask any syllabus doubt or search lessons in your dialect...')}
                className="w-full bg-slate-100/90 border border-slate-200 rounded-2xl py-2 pl-9 pr-4 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all shadow-inner"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </form>
          </div>

          {/* Right Tools: Language Picker, Device Switcher, Online Badge */}
          <div className="flex items-center gap-2.5">
            
            {/* Device Switcher (Web vs Android Phone Preview) */}
            <button
              onClick={onOpenDeviceSimulator}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all border border-slate-200"
              title="Switch to Android Phone & Tablet Preview Mode"
            >
              <Smartphone className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline">{t('topbar.device_preview', 'Web + Android Preview')}</span>
            </button>

            {/* Online/Offline Status */}
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${
                isOnline
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-amber-50 text-amber-800 border-amber-300'
              }`}
            >
              {isOnline ? (
                <>
                  <Wifi className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="hidden sm:inline">{t('topbar.synced', 'Synced')}</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-3.5 h-3.5 text-amber-600" />
                  <span className="hidden sm:inline">{t('topbar.offline', 'Offline')}</span>
                </>
              )}
            </div>

            {/* Language Selector */}
            <div className="flex items-center gap-1.5 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-xl">
              <Languages className="w-4 h-4 text-slate-500" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as LanguageCode)}
                className="bg-transparent text-xs font-bold text-slate-700 focus:outline-none cursor-pointer max-w-[120px] sm:max-w-none truncate"
              >
                {SUPPORTED_LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.flagEmoji} {l.nativeName} ({l.name})
                  </option>
                ))}
              </select>
            </div>
            {/* Auth Button */}
            {!authData ? (
              <button
                onClick={() => router.push('/login')}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition-all shadow-md shadow-orange-600/20"
              >
                <span>{t('topbar.login', 'Sign In')}</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  localStorage.removeItem('bhashasetu_auth');
                  setAuthData(null);
                  router.push('/');
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all border border-slate-200"
                title="Log out"
              >
                <span className="w-5 h-5 rounded-full bg-orange-500/20 text-orange-600 flex items-center justify-center text-[10px]">
                  {authData.role === 'student' ? '🧒' : '👩‍🏫'}
                </span>
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
