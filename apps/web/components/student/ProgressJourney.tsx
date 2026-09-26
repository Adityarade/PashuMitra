'use client';

import React from 'react';
import { Flame, Award, Star, Compass, CheckCircle2, Lock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';

interface ProgressJourneyProps {
  completedLessons?: string[];
  streakDays?: number;
  xpPoints?: number;
}

export default function ProgressJourney({
  completedLessons = ['sci-grade5-photo-hi'],
  streakDays = 5,
  xpPoints = 350,
}: ProgressJourneyProps) {
  const { t, trans } = useLanguage();

  const chapters = [
    {
      id: 'sci-grade5-photo-hi',
      title: 'Photosynthesis & Plant Food',
      vernacularTitle: 'पादपों में पोषण / ᱫᱟᱨᱮ ᱡᱚᱢᱟᱜ',
      subject: 'Science',
      icon: '🌿',
      xp: 100,
      completed: true,
      href: '/student/learn/sci-grade5-photo-hi',
    },
    {
      id: 'math-grade4-fractions-en',
      title: 'Fractions: Equal Parts of Whole',
      vernacularTitle: 'भिन्न और उसके प्रकार / ᱵᱷᱤᱱ',
      subject: 'Mathematics',
      icon: '🍕',
      xp: 120,
      completed: false,
      current: true,
      href: '/student/learn/math-grade4-fractions-en',
    },
    {
      id: 'env-grade5-water',
      title: 'Water Cycle & Rain Conservation',
      vernacularTitle: 'जल संरक्षण और वर्षा चक्र / ᱫᱟᱜ ᱵᱟᱧᱪᱟᱣ',
      subject: 'EVS',
      icon: '💧',
      xp: 150,
      completed: false,
      current: false,
      href: '#',
    },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
      
      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-orange-50 border border-orange-200/80 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-orange-500 text-white flex items-center justify-center shadow-md">
            <Flame className="w-6 h-6 fill-white" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-slate-900">{streakDays} Days</div>
            <div className="text-xs font-bold text-orange-700 uppercase tracking-wider">{t('student.streak', 'Learning Streak')}</div>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-md">
            <Star className="w-6 h-6 fill-white" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-slate-900">{xpPoints} XP</div>
            <div className="text-xs font-bold text-amber-800 uppercase tracking-wider">{t('student.points', 'Knowledge Points')}</div>
          </div>
        </div>

        <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-slate-900">4 {t('student.badges', 'Badges')}</div>
            <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider">{t('student.badges', 'Achievements')}</div>
          </div>
        </div>
      </div>

      {/* Gamified Learning Journey Path */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <Compass className="w-5 h-5 text-orange-600" />
          <h3 className="text-lg font-black text-slate-900">
            {t('student.tab_journey', 'My Learning Journey Map (मेरा अध्ययन पथ)')}
          </h3>
        </div>

        <div className="relative border-l-4 border-orange-200 ml-6 pl-8 space-y-8">
          {chapters.map((ch) => (
            <div key={ch.id} className="relative group">
              {/* Node Bullet Icon */}
              <div
                className={`absolute -left-[46px] top-1.5 w-8 h-8 rounded-full border-4 flex items-center justify-center text-sm ${
                  ch.completed
                    ? 'bg-emerald-500 border-white text-white shadow-md'
                    : ch.current
                    ? 'bg-orange-500 border-orange-200 text-white animate-bounce shadow-md'
                    : 'bg-slate-200 border-white text-slate-500'
                }`}
              >
                {ch.completed ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : ch.current ? (
                  <Star className="w-4 h-4 fill-white" />
                ) : (
                  <Lock className="w-3.5 h-3.5" />
                )}
              </div>

              {/* Card Container */}
              <div
                className={`p-5 rounded-2xl border transition-all ${
                  ch.completed
                    ? 'bg-emerald-50/40 border-emerald-200 hover:border-emerald-300'
                    : ch.current
                    ? 'bg-orange-50/70 border-orange-300 shadow-md ring-2 ring-orange-400/30'
                    : 'bg-slate-50/50 border-slate-200 opacity-60'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl p-3 bg-white rounded-2xl shadow-2xs border border-slate-100">
                      {ch.icon}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-orange-700 bg-orange-100 px-2 py-0.5 rounded">
                          {ch.subject}
                        </span>
                        <span className="text-xs font-bold text-slate-500">+{ch.xp} XP</span>
                      </div>
                      <h4 className="text-base sm:text-lg font-black text-slate-900 mt-1">
                        {ch.title}
                      </h4>
                      <p className="text-xs font-medium text-slate-600">
                        {ch.vernacularTitle}
                      </p>
                    </div>
                  </div>

                  {ch.completed ? (
                    <Link
                      href={ch.href}
                      className="px-4 py-2 bg-white text-emerald-700 border border-emerald-200 font-bold text-xs rounded-xl shadow-2xs hover:bg-emerald-50 transition-colors self-start sm:self-auto"
                    >
                      {t('student.start_read_along', 'Review Chapter')}
                    </Link>
                  ) : ch.current ? (
                    <Link
                      href={ch.href}
                      className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-black text-xs rounded-xl shadow-md transition-transform hover:scale-105 flex items-center gap-1.5 self-start sm:self-auto"
                    >
                      <span>{t('student.start_read_along', 'Continue Chapter')}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  ) : (
                    <span className="text-xs font-semibold text-slate-400 self-start sm:self-auto flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5" /> Locked
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
