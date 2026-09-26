'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  GraduationCap, 
  BookOpen, 
  Sparkles, 
  Volume2, 
  Flame, 
  Star, 
  Award, 
  HelpCircle, 
  Mic, 
  Play, 
  ArrowRight,
  Wifi,
  WifiOff,
  Languages,
  CheckCircle2,
  Lock,
  BookMarked
} from 'lucide-react';
import { SEEDED_LESSONS, SUPPORTED_LANGUAGES, LanguageCode, ScriptMode } from '@bhashasetu/shared';
import ProgressJourney from '@/components/student/ProgressJourney';
import VoiceSummaryCard from '@/components/student/VoiceSummaryCard';
import ScriptSelector from '@/components/common/ScriptSelector';
import { useLanguage } from '@/lib/LanguageContext';

export default function StudentDashboardPage() {
  const { language, setLanguage, t, trans } = useLanguage();
  const [scriptMode, setScriptMode] = useState<ScriptMode>('native');
  const [activeTab, setActiveTab] = useState<'lessons' | 'journey'>('lessons');

  // Filter lessons matching active language or link English
  const currentLessons = SEEDED_LESSONS.filter(
    (l) => l.language === language || l.language === 'eng_Latn'
  );

  const playVoiceGreeting = (langCode: string) => {
    const greetings: Record<string, string> = {
      hin_Deva: 'नमस्ते! आज आप क्या सीखना चाहते हैं?',
      sat_Olck: 'ᱡᱚᱦᱟᱨ! ᱛᱮᱦᱮᱧ ᱟᱢ ᱪᱮᱫ ᱪᱮᱫᱚᱜ ᱥᱟᱱᱟᱢ ᱠᱟᱱᱟ?',
      tam_Taml: 'வணக்கம்! இன்று நீங்கள் என்ன கற்க விரும்புகிறீர்கள்?',
      eng_Latn: 'Hello! What would you like to learn today?'
    };
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(greetings[langCode] || greetings.hin_Deva);
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleLanguagePick = (code: LanguageCode) => {
    setLanguage(code);
    playVoiceGreeting(code);
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Student Welcome & Voice-First Onboarding Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-orange-400 to-amber-500 flex items-center justify-center text-3xl shadow-md">
              🧒
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  {t('student.welcome', 'Welcome, Aarav!')}
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                  Class 5 • Roll #14
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {t('student.grade_info', 'Government Middle School, Dumka (Jharkhand)')}
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/student/doubt"
              className="flex items-center gap-2 px-5 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-2xl text-xs font-black shadow-md transition-transform hover:scale-105"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t('student.ask_doubt_btn', 'Ask a Doubt (RAG)')}</span>
            </Link>
            <Link
              href="/student/stories"
              className="flex items-center gap-2 px-4 py-3 bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 rounded-2xl text-xs font-bold transition-colors"
            >
              <BookMarked className="w-4 h-4 text-purple-600" />
              <span>{t('nav.stories', 'Cultural Stories')}</span>
            </Link>
            <Link
              href="/student/corpus"
              className="flex items-center gap-2 px-4 py-3 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 rounded-2xl text-xs font-bold transition-colors"
            >
              <Mic className="w-4 h-4 text-orange-600" />
              <span>{t('student.record_dialect_btn', 'Record Dialect (+50 XP)')}</span>
            </Link>
          </div>
        </div>

        {/* Voice-First Language Switcher */}
        <div className="pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <Languages className="w-4 h-4 text-orange-600" />
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                {t('student.my_language', 'My Learning Language (Tap flag to hear voice confirmation):')}
              </span>
            </div>
            <ScriptSelector
              currentScript={scriptMode}
              onScriptChange={setScriptMode}
            />
          </div>

          {/* Big Touch-Target Language Flags */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { code: 'hin_Deva', label: 'हिन्दी (Hindi)', emoji: '🇮🇳', family: 'Indo-Aryan' },
              { code: 'sat_Olck', label: 'ᱥᱟᱱᱛᱟᱲᱤ (Santali)', emoji: '🏹', family: 'Tribal Austroasiatic' },
              { code: 'tam_Taml', label: 'தமிழ் (Tamil)', emoji: '🪔', family: 'Dravidian' },
              { code: 'eng_Latn', label: 'English', emoji: '🌐', family: 'Global' },
            ].map((item) => (
              <button
                key={item.code}
                onClick={() => handleLanguagePick(item.code as LanguageCode)}
                className={`p-4 rounded-2xl border-2 flex items-center gap-3 transition-all text-left ${
                  language === item.code
                    ? 'border-orange-500 bg-orange-50/70 shadow-md ring-2 ring-orange-400/20'
                    : 'border-slate-200 bg-slate-50/50 hover:border-slate-300'
                }`}
              >
                <span className="text-3xl">{item.emoji}</span>
                <div>
                  <div className="font-black text-slate-900 text-sm">{item.label}</div>
                  <div className="text-[10px] text-slate-500 font-semibold">{item.family}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Voice Summary Card (Plain Language Strengths & Weaknesses) */}
      <VoiceSummaryCard />

      {/* Main Content Tabs (Lessons vs Journey) */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
          <button
            onClick={() => setActiveTab('lessons')}
            className={`flex items-center gap-2 pb-2 text-sm font-black transition-all ${
              activeTab === 'lessons'
                ? 'text-orange-600 border-b-2 border-orange-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{t('student.tab_lessons', 'Interactive Vernacular Lessons')} ({currentLessons.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('journey')}
            className={`flex items-center gap-2 pb-2 text-sm font-black transition-all ${
              activeTab === 'journey'
                ? 'text-orange-600 border-b-2 border-orange-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Star className="w-4 h-4" />
            <span>{t('student.tab_journey', 'Learning Map & Achievements')}</span>
          </button>
        </div>

        {activeTab === 'lessons' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentLessons.map((lesson) => (
              <div
                key={lesson.id}
                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 hover:border-orange-300 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Cover Image */}
                  <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                    <img
                      src={lesson.coverImage}
                      alt={trans(lesson.title)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/80 text-white text-[11px] font-bold backdrop-blur-sm">
                      <BookOpen className="w-3 h-3 text-orange-400" />
                      <span>{lesson.subject} • Grade {lesson.grade}</span>
                    </div>
                    <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[11px] font-black shadow-md">
                      <WifiOff className="w-3 h-3" />
                      <span>{t('student.offline_cached', 'Offline Cached')}</span>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-6 space-y-3">
                    <h3 className="text-lg font-black text-slate-900 leading-snug">
                      {lesson.title[scriptMode] || trans(lesson.title)}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {lesson.overview[scriptMode] || trans(lesson.overview)}
                    </p>

                    <div className="flex items-center gap-2 pt-2 text-xs font-semibold text-slate-500">
                      <span className="px-2 py-0.5 bg-slate-100 rounded-md text-slate-700">
                        {lesson.sourceCurriculum}
                      </span>
                      <span>•</span>
                      <span>{lesson.durationMinutes} min</span>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-6 pt-0 flex items-center gap-2">
                  <Link
                    href={`/student/learn/${lesson.id}`}
                    className="flex-1 py-3 bg-orange-600 hover:bg-orange-700 text-white font-black text-xs rounded-xl flex items-center justify-center gap-2 shadow-md transition-transform active:scale-95"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>{t('student.start_read_along', 'Start Read-Along')}</span>
                  </Link>

                  <Link
                    href={`/student/quiz/${lesson.id}`}
                    className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors"
                    title="Take adaptive quiz"
                  >
                    {t('student.take_quiz', 'Quiz')}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <ProgressJourney />
        )}
      </div>
    </div>
  );
}
