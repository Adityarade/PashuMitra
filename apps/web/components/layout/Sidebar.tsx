'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  GraduationCap, 
  BookOpen, 
  Radio, 
  Sparkles, 
  ShieldCheck, 
  Mic, 
  HelpCircle, 
  Award, 
  Layers, 
  Smartphone, 
  ChevronLeft, 
  ChevronRight,
  Flame,
  Star,
  FileText,
  Compass,
  Repeat,
  BookMarked
} from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
}

export default function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  const pathname = usePathname();
  const { t, language } = useLanguage();

  const navigationSections = [
    {
      title: t('nav.student_zone', 'Student Learning Zone'),
      items: [
        { href: '/student', label: t('nav.lessons', 'Lessons & Library'), icon: GraduationCap, badge: 'Grade 5' },
        { href: '/student/learn/sci-grade5-photo-hi', label: t('nav.karaoke', 'Karaoke Read-Along'), icon: BookOpen, badge: 'Live Sync' },
        { href: '/student/quiz/sci-grade5-photo-hi', label: t('nav.quiz', 'Adaptive Quiz (BKT)'), icon: Award, badge: 'AI Test' },
        { href: '/student/doubt', label: t('nav.doubt_tutor', 'Curriculum Doubt Tutor'), icon: Sparkles, badge: 'RAG' },
        { href: '/student/stories', label: t('nav.stories', 'Cultural Tale Weaver'), icon: BookMarked, badge: 'Illustrated' },
        { href: '/student/corpus', label: t('nav.corpus', 'Tribal Speech Corpus'), icon: Mic, badge: '+50 XP' },
      ],
    },
    {
      title: t('nav.teacher_zone', 'Teacher Console'),
      items: [
        { href: '/teacher', label: t('nav.teacher_dash', 'Teacher Dashboard'), icon: Compass, badge: 'Daily' },
        { href: '/teacher/live', label: t('nav.live_class', 'Live Classroom Stream'), icon: Radio, badge: 'LIVE' },
        { href: '/teacher/copilot', label: t('nav.content_copilot', 'Content Copilot & OCR'), icon: FileText, badge: 'Worksheets' },
        { href: '/teacher/review', label: t('nav.review_queue', 'Corpus Review Queue'), icon: ShieldCheck, badge: '3 Pending' },
      ],
    },
    {
      title: t('nav.admin_zone', 'Admin & Smart Tools'),
      items: [
        { href: '/admin', label: t('nav.heatmap', 'National Heatmap'), icon: ShieldCheck, badge: 'Policy' },
        { href: '/tools/code-switch', label: t('nav.code_switch', 'Code-Switching Mixer'), icon: Repeat, badge: 'Hinglish AI' },
        { href: '/tools/app-hub', label: t('nav.app_hub', 'Android App & Web Hub'), icon: Smartphone, badge: 'Web+App' },
      ],
    },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 z-40 bg-slate-900 text-slate-200 border-r border-slate-800 flex flex-col transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-72'
      }`}
    >
      {/* Indian Tricolor Stripe */}
      <div className="h-1.5 w-full flex shrink-0">
        <div className="flex-1 bg-orange-500" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-emerald-600" />
      </div>

      {/* Brand Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between shrink-0">
        <Link href="/" className="flex items-center gap-3 overflow-hidden group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white font-black text-xl shadow-md shrink-0 group-hover:scale-105 transition-transform">
            भा
          </div>
          {!collapsed && (
            <div className="leading-tight">
              <div className="flex items-center gap-1.5">
                <span className="font-black text-lg tracking-tight text-white">
                  Bhasha<span className="text-orange-500">Setu</span>
                </span>
                <span className="text-[9px] uppercase font-bold tracking-widest px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  NEP 2020
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">
                {t('platform.subtitle', 'AI Vernacular Pedagogy')}
              </p>
            </div>
          )}
        </Link>

        {/* Toggle Collapse Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        {navigationSections.map((section, sIdx) => (
          <div key={sIdx} className="space-y-1">
            {!collapsed && (
              <h4 className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                {section.title}
              </h4>
            )}
            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href !== '/' &&
                  pathname.startsWith(item.href) &&
                  item.href !== '/student' &&
                  item.href !== '/teacher');

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all group relative ${
                    isActive
                      ? 'bg-orange-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/70'
                  }`}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isActive ? 'text-white scale-110' : 'text-slate-400 group-hover:text-orange-400'
                    }`}
                  />
                  {!collapsed && (
                    <span className="flex-1 truncate">{item.label}</span>
                  )}
                  {!collapsed && item.badge && (
                    <span
                      className={`text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md shrink-0 ${
                        item.badge === 'LIVE'
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse'
                          : isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* Bottom Profile / Quick Stats */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/40 shrink-0">
        {!collapsed ? (
          <div className="flex items-center justify-between gap-3 p-2 rounded-xl bg-slate-800/60 border border-slate-700/60">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-base">
                🧒
              </div>
              <div className="leading-tight truncate">
                <div className="text-xs font-bold text-white truncate">Aarav Marandi</div>
                <div className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                  <Flame className="w-3 h-3 fill-orange-500 text-orange-500" />
                  <span>5 Day Streak • 350 XP</span>
                </div>
              </div>
            </div>
            <Link
              href="/tools/app-hub"
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg"
              title="Android Mobile & Web Sync"
            >
              <Smartphone className="w-4 h-4 text-emerald-400" />
            </Link>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-center flex items-center justify-center text-sm">
              🧒
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
