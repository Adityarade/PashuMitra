'use client';

import React, { useState } from 'react';
import { 
  HelpCircle, 
  Mic, 
  MicOff, 
  Send, 
  Sparkles, 
  Volume2, 
  Bookmark, 
  ShieldCheck, 
  AlertTriangle, 
  Loader2, 
  X 
} from 'lucide-react';
import { askDoubt } from '@/lib/api';
import { LanguageCode, ScriptMode } from '@bhashasetu/shared';
import TrustBadge from '../common/TrustBadge';
import { useLanguage } from '@/lib/LanguageContext';

interface DoubtDrawerProps {
  lessonId?: string;
  studentLanguage?: LanguageCode;
  scriptMode?: ScriptMode;
  onClose?: () => void;
}

export default function DoubtDrawer({
  lessonId = 'sci-grade5-photo-hi',
  studentLanguage,
  scriptMode = 'native',
  onClose,
}: DoubtDrawerProps) {
  const { language: activeGlobalLang, t } = useLanguage();
  const currentLang = studentLanguage || activeGlobalLang;

  const [queryText, setQueryText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [answerData, setAnswerData] = useState<any>(null);

  const suggestedDoubts: Record<string, string[]> = {
    hin_Deva: [
      'पत्तियों का रंग हरा क्यों होता है?',
      'पौधे दिन में कौन सी गैस छोड़ते हैं?',
      'क्या पौधे अंधेरे में भी भोजन बना सकते हैं?'
    ],
    sat_Olck: [
      'ᱫᱟᱨᱮ ᱥᱟᱠᱟᱢ ᱦᱟᱹᱨᱭᱟᱹᱲ ᱪᱮᱫᱟᱜ ᱛᱟᱦᱮᱸᱱᱟ?',
      'ᱫᱟᱨᱮ ᱠᱚ ᱪᱮᱫ ᱦᱚᱭ ᱠᱚ ᱟᱲᱟᱜᱟ?'
    ],
    tam_Taml: [
      'இலைகள் ஏன் பச்சை நிறமாக இருக்கின்றன?',
      'ஒளிச்சேர்க்கையின் போது தாவரங்கள் எந்த வாயுவை வெளியிடுகின்றன?'
    ],
    eng_Latn: [
      'Why are leaves green in colour?',
      'Which gas is released during photosynthesis?'
    ]
  };

  const currentSuggestions = suggestedDoubts[currentLang] || suggestedDoubts.hin_Deva;

  const handleSend = async (textToSend?: string) => {
    const q = textToSend || queryText;
    if (!q.trim()) return;

    setLoading(true);
    try {
      const response = await askDoubt(q, currentLang, lessonId, scriptMode);
      setAnswerData(response);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleVoiceInputMock = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      const randomPrompt = currentSuggestions[0];
      setQueryText(randomPrompt);
      handleSend(randomPrompt);
    }, 1500);
  };

  const handleSpeakAnswer = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center shadow-inner">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900">
              {t('doubt.title', 'AI Doubt-Solving Tutor (RAG)')}
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              {t('doubt.subtitle', 'Strictly grounded in your NCERT/State Board chapter')}
            </p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Suggested Quick Prompts */}
      <div className="mb-5">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
          {t('doubt.suggested', 'Suggested Doubts for this Lesson')}
        </span>
        <div className="flex flex-wrap gap-2">
          {currentSuggestions.map((prompt, i) => (
            <button
              key={i}
              onClick={() => {
                setQueryText(prompt);
                handleSend(prompt);
              }}
              className="text-xs bg-slate-50 hover:bg-orange-50 hover:text-orange-700 hover:border-orange-200 border border-slate-200 rounded-xl px-3 py-1.5 font-semibold text-slate-700 transition-all text-left"
            >
              💬 {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="relative mb-6">
        <div className="flex items-center gap-2 bg-slate-50 border-2 border-slate-200 rounded-2xl p-2 focus-within:border-orange-500 focus-within:bg-white transition-all shadow-inner">
          <input
            type="text"
            value={queryText}
            onChange={(e) => setQueryText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t('topbar.search_placeholder', 'Ask anything about this chapter in your mother tongue...')}
            className="flex-1 bg-transparent px-3 py-2 text-sm sm:text-base font-medium text-slate-800 focus:outline-none placeholder:text-slate-400"
          />

          {/* Voice input button */}
          <button
            type="button"
            onClick={handleVoiceInputMock}
            className={`p-3 rounded-xl transition-transform ${
              isRecording
                ? 'bg-red-500 text-white animate-pulse scale-110'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }`}
            title="Record your voice question in your dialect"
          >
            {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* Send button */}
          <button
            type="button"
            onClick={() => handleSend()}
            disabled={loading || !queryText.trim()}
            className="p-3 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white font-bold rounded-xl shadow-md transition-transform active:scale-95 flex items-center justify-center"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* RAG Answer Display Card */}
      {answerData && (
        <div className="bg-gradient-to-br from-amber-50/70 to-orange-50/50 rounded-2xl p-6 border border-orange-200/80 shadow-sm animate-in fade-in zoom-in-95 duration-200">
          
          <div className="flex items-center justify-between pb-3 border-b border-orange-200/60 mb-4">
            <div className="flex items-center gap-2">
              <TrustBadge status="Verified by Teacher" />
              {answerData.is_grounded ? (
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                  {t('common.verified', 'Syllabus Verified')}
                </span>
              ) : (
                <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded border border-amber-300 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> Out of Context
                </span>
              )}
            </div>

            <button
              onClick={() => handleSpeakAnswer(answerData.answer_text)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-orange-600 hover:bg-orange-100 border border-orange-200 rounded-xl text-xs font-bold shadow-2xs transition-colors"
              title="Listen to answer in native pronunciation"
            >
              <Volume2 className="w-4 h-4" />
              <span>{t('common.listen', 'Listen')}</span>
            </button>
          </div>

          <p className="text-base sm:text-lg font-semibold text-slate-900 leading-relaxed mb-4">
            {answerData.answer_text}
          </p>

          {/* Section & Page Citation */}
          {answerData.is_grounded && (
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-600 bg-white/80 p-3 rounded-xl border border-orange-200/50">
              <Bookmark className="w-4 h-4 text-orange-600" />
              <span>{t('doubt.grounded_in', 'Grounded in:')}</span>
              <span className="font-bold text-slate-800">{answerData.cited_section_title}</span>
              <span className="text-slate-400">•</span>
              <span className="font-semibold text-orange-700">{t('doubt.page', 'NCERT Page')} {answerData.cited_page_no}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
