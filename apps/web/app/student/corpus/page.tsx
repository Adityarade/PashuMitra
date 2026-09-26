'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Mic, 
  MicOff, 
  Sparkles, 
  Award, 
  CheckCircle2, 
  ArrowLeft, 
  Volume2, 
  Play, 
  Square,
  Flame,
  Star,
  Users
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SEEDED_CORPUS_ITEMS, SUPPORTED_LANGUAGES, LanguageCode } from '@bhashasetu/shared';

export default function CorpusContributionPage() {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>('sat_Olck');
  const [activePromptIdx, setActivePromptIdx] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const prompts = [
    {
      id: 'p1',
      text: 'ᱡᱟᱹᱯᱤᱫ ᱠᱷᱚᱱ ᱵᱮᱨᱮᱫ ᱠᱟᱛᱮ ᱥᱮᱛᱟᱜ ᱨᱮ ᱯᱟᱲᱦᱟᱣ ᱢᱮ᱾',
      meaning: 'Wake up from sleep and study in the morning.',
      language: 'Santali (Ol Chiki)',
      category: 'Proverbs & Daily Routine',
      points: 50,
      confidenceGap: 'Low Model Confidence (48%) — Priority 1',
    },
    {
      id: 'p2',
      text: 'ᱟᱵᱚ ᱨᱤᱱ ᱫᱟᱨᱮ ᱱᱟᱹᱲᱤ ᱫᱚ ᱟᱵᱚ ᱨᱮᱱ ᱡᱤᱣᱤ ᱠᱟᱱᱟ ᱠᱚ᱾',
      meaning: 'Our plants and creepers are our very life.',
      language: 'Santali (Ol Chiki)',
      category: 'Forest & Ecology',
      points: 50,
      confidenceGap: 'Dialect Vocabulary Gap (52%) — Priority 2',
    },
    {
      id: 'p3',
      text: 'ᱫᱟᱨᱮ ᱡᱟᱝ ᱠᱷᱚᱱ ᱫᱟᱨᱮ ᱚᱢᱚᱱᱚᱜᱼᱟ᱾',
      meaning: 'From a seed, a tree sprouts.',
      language: 'Santali (Ol Chiki)',
      category: 'Science & Agriculture',
      points: 50,
      confidenceGap: 'Acoustic Model Training Need — Priority 1',
    },
  ];

  const currentPrompt = prompts[activePromptIdx] || prompts[0];

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordedAudio(false);
    setTimeout(() => {
      setIsRecording(false);
      setRecordedAudio(true);
    }, 3000);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedSuccess(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF7722', '#138808', '#FFD700'],
      });
    }, 1000);
  };

  const handleNextPrompt = () => {
    setActivePromptIdx((c) => (c + 1) % prompts.length);
    setRecordedAudio(false);
    setSubmittedSuccess(false);
  };

  const speakPrompt = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/student"
          className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>
        <div className="flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-black border border-amber-300">
          <Star className="w-3.5 h-3.5 fill-amber-600 text-amber-600" />
          <span>Earn 50 XP per Recording</span>
        </div>
      </div>

      {/* Main Contribution Studio */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
        
        {/* Banner */}
        <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 text-white flex items-center justify-center text-2xl shadow-md">
            🎙️
          </div>
          <div>
            <span className="text-[11px] font-bold text-orange-600 uppercase tracking-wider block">
              Active Learning Data Collection • NEP 2020
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Gamified Tribal Corpus Contribution
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Record vernacular phrases to train AI models for India&apos;s low-resource languages
            </p>
          </div>
        </div>

        {!submittedSuccess ? (
          <div className="space-y-6">
            
            {/* Urgency Badge */}
            <div className="flex items-center justify-between bg-red-50 text-red-800 p-3 rounded-2xl border border-red-200 text-xs font-bold">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-red-600" />
                <span>{currentPrompt.confidenceGap}</span>
              </span>
              <span>Category: {currentPrompt.category}</span>
            </div>

            {/* Phrase Card */}
            <div className="bg-amber-50/50 rounded-3xl p-6 sm:p-8 border-2 border-amber-200/80 text-center space-y-4">
              <div className="flex justify-end">
                <button
                  onClick={() => speakPrompt(currentPrompt.text)}
                  className="p-2 text-slate-400 hover:text-orange-600 rounded-xl hover:bg-white transition-colors"
                  title="Hear pronunciation helper"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug">
                {currentPrompt.text}
              </h3>

              <p className="text-sm font-medium text-slate-600 italic">
                &ldquo;{currentPrompt.meaning}&rdquo;
              </p>
            </div>

            {/* Recording Controls */}
            <div className="text-center py-4 space-y-4">
              {!recordedAudio ? (
                <div>
                  <button
                    onClick={handleStartRecording}
                    className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto text-white shadow-xl transition-all ${
                      isRecording
                        ? 'bg-red-500 animate-ping scale-110'
                        : 'bg-orange-600 hover:bg-orange-700 hover:scale-105 active:scale-95'
                    }`}
                  >
                    {isRecording ? <Square className="w-8 h-8 fill-white" /> : <Mic className="w-8 h-8" />}
                  </button>
                  <p className="text-xs font-bold text-slate-500 mt-3">
                    {isRecording ? 'Listening... Speak phrase clearly now' : 'Tap mic and read aloud in your native accent'}
                  </p>
                </div>
              ) : (
                <div className="space-y-4 animate-in fade-in zoom-in-95 duration-150">
                  <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 max-w-md mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span className="text-xs font-bold text-emerald-900">Audio Captured (3.2 seconds)</span>
                    </div>
                    <button
                      onClick={handleStartRecording}
                      className="text-xs font-bold text-slate-500 hover:text-slate-800"
                    >
                      Re-record
                    </button>
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="px-8 py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-black text-sm rounded-2xl shadow-lg transition-transform hover:scale-105"
                  >
                    {isSubmitting ? 'Verifying & Submitting...' : 'Submit Recording (+50 XP)'}
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Submission Complete Card */
          <div className="text-center py-8 space-y-6 animate-in zoom-in-95 duration-200">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-4xl shadow-inner">
              🎖️
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-900">
                Recording Submitted for Teacher Review!
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                You earned the <span className="font-bold text-orange-600">Bhasha Mitra (Language Friend)</span> badge and <span className="font-bold text-emerald-600">+50 XP</span>.
              </p>
            </div>

            <button
              onClick={handleNextPrompt}
              className="px-8 py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-black text-sm rounded-2xl shadow-md transition-transform hover:scale-105"
            >
              Record Next Phrase
            </button>
          </div>
        )}
      </div>

      {/* Community Contributor Leaderboard */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-5 h-5 text-amber-500" />
          <h3 className="text-base sm:text-lg font-black text-slate-900">
            Class 5 Contributor Badges
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-3">
            <span className="text-2xl">🏹</span>
            <div>
              <div className="font-bold text-slate-900 text-xs">Ol Chiki Champion</div>
              <div className="text-[10px] text-slate-500 font-semibold">12 phrases recorded</div>
            </div>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-3">
            <span className="text-2xl">🌱</span>
            <div>
              <div className="font-bold text-slate-900 text-xs">Tribal Heritage Voice</div>
              <div className="text-[10px] text-slate-500 font-semibold">Top 5% in Dumka</div>
            </div>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-3">
            <span className="text-2xl">💎</span>
            <div>
              <div className="font-bold text-slate-900 text-xs">Linguistic Pioneer</div>
              <div className="text-[10px] text-slate-500 font-semibold">500 XP Earned</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
