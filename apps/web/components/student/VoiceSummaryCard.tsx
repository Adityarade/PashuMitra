'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Volume2, CheckCircle2, TrendingUp, HelpCircle } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function VoiceSummaryCard() {
  const [isPlaying, setIsPlaying] = useState(false);
  const { language, t } = useLanguage();

  const summaryKey = 'student.voice_summary_text';
  // Use the translation hook for the core text, fallback to english
  const summaryText = t(summaryKey, "Hello! This week you have mastered Photosynthesis and Chlorophyll functions excellently! Practicing a few more Fraction problems will make your Math understanding equally strong. Keep up the brilliant effort!");

  const playVoice = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(summaryText);
      // For demonstration, map simple languages to standard speech synth locales if available
      if (language === 'hin_Deva') utterance.lang = 'hi-IN';
      else if (language === 'eng_Latn') utterance.lang = 'en-US';
      else if (language === 'tam_Taml') utterance.lang = 'ta-IN';
      
      utterance.rate = 0.95;
      utterance.onend = () => setIsPlaying(false);
      setIsPlaying(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
      <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-black">
              {t('student.voice_summary_title', 'Weekly Voice Summary')}
            </h3>
            <p className="text-xs text-orange-100 font-medium">
              {t('student.voice_summary_subtitle', 'AI-generated plain language feedback for parents & learners')}
            </p>
          </div>
        </div>

        <button
          onClick={playVoice}
          className="flex items-center gap-2 px-4 py-2.5 bg-white text-orange-600 hover:bg-orange-50 font-black text-xs rounded-xl shadow-md transition-transform hover:scale-105 active:scale-95 self-start sm:self-auto"
        >
          <Volume2 className={`w-4 h-4 ${isPlaying ? 'animate-bounce text-orange-600' : ''}`} />
          <span>{isPlaying ? t('common.speaking', 'Speaking...') : t('student.listen_summary', 'Listen to Summary')}</span>
        </button>
      </div>

      <div className="bg-black/15 backdrop-blur-sm rounded-2xl p-5 border border-white/20 mb-6 text-sm sm:text-base leading-relaxed font-medium">
        &ldquo;{summaryText}&rdquo;
      </div>

      {/* Strengths & Practice Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
        <div className="bg-emerald-950/40 rounded-xl p-3.5 border border-emerald-400/30 flex items-start gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <span className="text-emerald-300 font-bold block mb-0.5">{t('student.what_im_great_at', "What I'm Great At:")}</span>
            <span className="text-emerald-100">{t('student.strength_desc', 'Chlorophyll absorption & Oxygen release in Plants (98% mastery)')}</span>
          </div>
        </div>

        <div className="bg-amber-950/40 rounded-xl p-3.5 border border-amber-400/30 flex items-start gap-2.5">
          <TrendingUp className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
          <div>
            <span className="text-amber-300 font-bold block mb-0.5">{t('student.what_needs_practice', "What Needs Practice:")}</span>
            <span className="text-amber-100">{t('student.practice_desc', 'Dividing circles into equal fractions (3/4 vs 1/4)')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
