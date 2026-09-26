'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Sparkles, 
  Award, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw,
  Gauge,
  HelpCircle,
  Volume2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SEEDED_LESSONS, ScriptMode, QuizQuestion } from '@bhashasetu/shared';
import { updateBKT } from '@/lib/api';
import ScriptSelector from '@/components/common/ScriptSelector';

export default function AdaptiveQuizPage() {
  const params = useParams();
  const router = useRouter();
  const lessonId = (params?.id as string) || 'sci-grade5-photo-hi';

  const lesson = SEEDED_LESSONS.find((l) => l.id === lessonId) || SEEDED_LESSONS[0];
  const questions: QuizQuestion[] = lesson.quizQuestions || [];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [masteryScore, setMasteryScore] = useState(0.35); // Initial prior mastery
  const [difficultyTier, setDifficultyTier] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [bktFeedback, setBktFeedback] = useState<string>('Adapting questions based on Bayesian Knowledge Tracing...');
  const [scriptMode, setScriptMode] = useState<ScriptMode>('native');
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQ = questions[currentIdx] || questions[0];

  const handleSelectOption = async (option: any) => {
    if (isAnswered) return;

    setSelectedOptionId(option.id);
    setIsAnswered(true);

    const isCorrect = option.isCorrect;
    if (isCorrect) {
      setScore((s) => s + 1);
    }

    // Call BKT adaptive engine
    try {
      const bktRes = await updateBKT('std-demo-01', currentQ.conceptTag, masteryScore, isCorrect);
      setMasteryScore(bktRes.updated_mastery);
      setDifficultyTier(bktRes.next_recommended_difficulty);
      setBktFeedback(bktRes.feedback);
    } catch (err) {
      console.error(err);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((c) => c + 1);
      setSelectedOptionId(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FF7722', '#138808', '#0284C7', '#FFD700'],
      });
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOptionId(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <Link
          href={`/student/learn/${lesson.id}`}
          className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Lesson</span>
        </Link>
        <ScriptSelector
          currentScript={scriptMode}
          onScriptChange={setScriptMode}
        />
      </div>

      {/* Adaptive Mastery Indicator Pill */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center font-black">
            <Gauge className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-orange-400">
                Bayesian Knowledge Mastery
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/30 text-emerald-300 text-[10px] font-bold border border-emerald-500/40 uppercase">
                {difficultyTier} Level
              </span>
            </div>
            <p className="text-xs text-slate-300 font-medium">{bktFeedback}</p>
          </div>
        </div>

        <div className="text-right self-start sm:self-auto">
          <div className="text-lg font-black text-emerald-400">
            {(masteryScore * 100).toFixed(0)}% Mastery
          </div>
          <div className="text-[10px] text-slate-400 font-semibold">P(L) Probability</div>
        </div>
      </div>

      {!quizFinished ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
          
          {/* Question Counter */}
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider pb-4 border-b border-slate-100">
            <span>Question {currentIdx + 1} of {questions.length}</span>
            <span className="text-orange-600 font-black">Concept: #{currentQ.conceptTag}</span>
          </div>

          {/* Question Text */}
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
              {currentQ.question[scriptMode] || currentQ.question.native}
            </h2>
            <button
              onClick={() => speakText(currentQ.question[scriptMode] || currentQ.question.native)}
              className="p-2 text-slate-400 hover:text-orange-600 rounded-xl hover:bg-orange-50 transition-colors"
              title="Hear question"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>

          {/* Options Grid */}
          <div className="space-y-3 pt-2">
            {currentQ.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              const showStatus = isAnswered;

              let optionStyle = 'border-slate-200 bg-white hover:border-slate-300';
              if (showStatus) {
                if (opt.isCorrect) {
                  optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-400/30';
                } else if (isSelected && !opt.isCorrect) {
                  optionStyle = 'border-red-500 bg-red-50 text-red-900 ring-2 ring-red-400/30';
                } else {
                  optionStyle = 'border-slate-200 bg-slate-50 opacity-60';
                }
              } else if (isSelected) {
                optionStyle = 'border-orange-500 bg-orange-50';
              }

              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt)}
                  disabled={isAnswered}
                  className={`w-full p-4 sm:p-5 rounded-2xl border-2 font-bold text-left text-base sm:text-lg transition-all flex items-center justify-between gap-4 ${optionStyle}`}
                >
                  <span>{opt.text[scriptMode] || opt.text.native}</span>
                  {showStatus && opt.isCorrect && (
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                  )}
                  {showStatus && isSelected && !opt.isCorrect && (
                    <XCircle className="w-6 h-6 text-red-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Vernacular Explanation Reveal */}
          {isAnswered && (
            <div className="bg-amber-50/70 rounded-2xl p-5 border border-amber-200 space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-800">
                <Sparkles className="w-4 h-4 text-orange-600" />
                <span>Pedagogical Explanation</span>
              </div>
              <p className="text-sm sm:text-base font-semibold text-slate-800 leading-relaxed">
                {currentQ.options.find((o) => o.id === selectedOptionId)?.explanation[scriptMode] ||
                  currentQ.options.find((o) => o.isCorrect)?.explanation[scriptMode] ||
                  'Very good effort!'}
              </p>
              <div className="flex justify-end">
                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-black text-xs rounded-xl shadow-md transition-transform hover:scale-105 flex items-center gap-1.5"
                >
                  <span>{currentIdx + 1 === questions.length ? 'See Results' : 'Next Question'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Quiz Complete Results Card */
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-200 text-center space-y-6 animate-in zoom-in-95 duration-200">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-orange-400 to-amber-500 text-white flex items-center justify-center mx-auto text-4xl shadow-lg animate-bounce">
            🏆
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Quiz Completed! (शानदार प्रदर्शन!)
            </h2>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              You scored <span className="font-bold text-orange-600">{score} out of {questions.length}</span>. Your concept mastery has been updated in your profile!
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
            <div className="p-4 bg-orange-50 rounded-2xl border border-orange-200">
              <div className="text-2xl font-black text-orange-600">+{score * 50} XP</div>
              <div className="text-[11px] font-bold text-slate-500 uppercase">Knowledge XP</div>
            </div>
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
              <div className="text-2xl font-black text-emerald-600">{(masteryScore * 100).toFixed(0)}%</div>
              <div className="text-[11px] font-bold text-slate-500 uppercase">BKT Mastery</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              onClick={handleRestart}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry Quiz</span>
            </button>

            <Link
              href="/student"
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-black text-xs shadow-md transition-transform hover:scale-105"
            >
              <span>Back to Student Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
