'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Repeat, 
  Sparkles, 
  Volume2, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  HelpCircle,
  Lightbulb
} from 'lucide-react';
import TrustBadge from '@/components/common/TrustBadge';

export default function CodeSwitchingPage() {
  const [inputText, setInputText] = useState(
    'Sir ne explain kiya ki leaves me chlorophyll hota hai jo food banata hai.'
  );
  const [isTranslating, setIsTranslating] = useState(false);
  const [result, setResult] = useState<any>({
    original_mixed: 'Sir ne explain kiya ki leaves me chlorophyll hota hai jo food banata hai.',
    detected_mix: 'Hindi + English (Hinglish) with Scientific Terminology',
    pure_hindi: 'शिक्षक ने समझाया कि पत्तियों में क्लोरोफिल होता है जो भोजन बनाता है।',
    pure_santali: 'ᱢᱟᱪᱮᱫ ᱮ ᱞᱟᱹᱭ ᱠᱮᱫᱟ ᱡᱮ ᱥᱟᱠᱟᱢ ᱨᱮ ᱠᱞᱳᱨᱳᱯᱷᱤᱞ ᱛᱟᱦᱮᱸᱱᱟ ᱡᱟᱦᱟᱸ ᱫᱚ ᱡᱚᱢᱟᱜ ᱮ ᱛᱮᱭᱟᱨᱟ᱾',
    pure_tamil: 'இலைகளில் உணவு தயாரிக்கும் பச்சையம் (குளோரோபில்) இருப்பதாக ஆசிரியர் விளக்கினார்.',
    pure_english: 'The teacher explained that leaves contain chlorophyll which produces food.',
    key_extracted_concepts: ['leaves (पत्तियां)', 'chlorophyll (हरित लवक)', 'food synthesis (पोषण निर्माण)'],
  });

  const sampleMixedPhrases = [
    'Sir ne explain kiya ki leaves me chlorophyll hota hai jo food banata hai.',
    'Madam bol rahi thi ki fractions me numerator upar aur denominator niche rehta hai.',
    'Class me water cycle padhaya jisme evaporation se clouds bante hain.',
    'Dare re jomag prepare hoyok-a sunlight aur water se.',
  ];

  const handleRunTranslation = (phrase?: string) => {
    const textToUse = phrase || inputText;
    setInputText(textToUse);
    setIsTranslating(true);

    setTimeout(() => {
      setIsTranslating(false);
      if (textToUse.includes('fractions') || textToUse.includes('numerator')) {
        setResult({
          original_mixed: textToUse,
          detected_mix: 'Hindi + English Mathematical Code-Switching',
          pure_hindi: 'शिक्षिका ने बताया कि भिन्न में अंश ऊपर और हर नीचे रहता है।',
          pure_santali: 'ᱢᱟᱪᱮᱫ ᱮ ᱢᱮᱱ ᱠᱮᱫᱟ ᱡᱮ ᱵᱷᱤᱱ ᱨᱮ ᱪᱮᱛᱟᱱ ᱨᱮ ᱟᱝᱥ ᱟᱨ ᱞᱟᱛᱟᱨ ᱨᱮ ᱦᱚᱨ ᱛᱟᱦᱮᱸᱱᱟ᱾',
          pure_tamil: 'பின்னத்தில் தொகுதி மேலே இருக்கும் மற்றும் பகுதி கீழே இருக்கும் என்று ஆசிரியர் கூறினார்.',
          pure_english: 'The teacher explained that in fractions, the numerator is on top and the denominator is on the bottom.',
          key_extracted_concepts: ['fractions (भिन्न)', 'numerator (अंश)', 'denominator (हर)'],
        });
      } else {
        setResult({
          original_mixed: textToUse,
          detected_mix: 'Mixed Colloquial Indian Classroom Speech',
          pure_hindi: 'शिक्षक ने समझाया कि पत्तियों में क्लोरोफिल होता है जो भोजन बनाता है।',
          pure_santali: 'ᱢᱟᱪᱮᱫ ᱮ ᱞᱟᱹᱭ ᱠᱮᱫᱟ ᱡᱮ ᱥᱟᱠᱟᱢ ᱨᱮ ᱠᱞᱳᱨᱳᱯᱷᱤᱞ ᱛᱟᱦᱮᱸᱱᱟ ᱡᱟᱦᱟᱸ ᱫᱚ ᱡᱚᱢᱟᱜ ᱮ ᱛᱮᱭᱟᱨᱟ᱾',
          pure_tamil: 'இலைகளில் உணவு தயாரிக்கும் பச்சையம் இருப்பதாக ஆசிரியர் விளக்கினார்.',
          pure_english: 'The teacher explained that leaves contain chlorophyll which produces food.',
          key_extracted_concepts: ['leaves (पत्तियां)', 'chlorophyll (क्लोरोफिल)', 'food (भोजन)'],
        });
      }
    }, 600);
  };

  const playVoice = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Top Banner */}
      <div className="flex items-center justify-between">
        <Link
          href="/student"
          className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>
        <TrustBadge status="AI Generated" source="AI4Bharat IndicTrans2 Code-Switch Parser" />
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center text-2xl shadow-md">
              <Repeat className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-purple-600 uppercase tracking-wider block">
                Smart Indian Classroom NLP
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Code-Switching & Dialect Mixer Assistant
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Understands natural mixed Hinglish, Tanglish, and tribal colloquial speech used in daily Indian classrooms
              </p>
            </div>
          </div>
        </div>

        {/* Quick Sample Prompts */}
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Try Common Code-Switched Classroom Expressions:
          </span>
          <div className="flex flex-wrap gap-2">
            {sampleMixedPhrases.map((phrase, i) => (
              <button
                key={i}
                onClick={() => handleRunTranslation(phrase)}
                className="text-xs bg-slate-50 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-300 border border-slate-200 px-3.5 py-2 rounded-xl font-semibold text-slate-700 transition-all text-left"
              >
                💬 &ldquo;{phrase}&rdquo;
              </button>
            ))}
          </div>
        </div>

        {/* Text Input Area */}
        <div className="space-y-4">
          <label className="block text-xs font-bold text-slate-700">
            Enter or Speak Natural Mixed Code-Switched Sentence:
          </label>
          <textarea
            rows={3}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full text-base border border-slate-300 rounded-2xl p-4 font-medium focus:ring-2 focus:ring-purple-500 focus:outline-none leading-relaxed"
          />

          <div className="flex justify-end">
            <button
              onClick={() => handleRunTranslation()}
              disabled={isTranslating || !inputText.trim()}
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-black text-xs rounded-xl shadow-md transition-transform hover:scale-105"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isTranslating ? 'De-mixing & Disambiguating...' : 'Parse Code-Switched Speech'}</span>
            </button>
          </div>
        </div>

        {/* Output Grid */}
        {result && (
          <div className="space-y-6 pt-4 border-t border-slate-100 animate-in fade-in zoom-in-95 duration-200">
            
            <div className="flex items-center gap-2 bg-purple-50 text-purple-900 px-4 py-2.5 rounded-xl border border-purple-200 text-xs font-bold">
              <Lightbulb className="w-4 h-4 text-purple-600 shrink-0" />
              <span>Detected Pattern: {result.detected_mix}</span>
            </div>

            {/* 4 Standardized Mother Tongue Translations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Hindi */}
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    🇮🇳 Standard Hindi (मानक हिन्दी)
                  </span>
                  <button
                    onClick={() => playVoice(result.pure_hindi)}
                    className="p-1.5 text-slate-400 hover:text-orange-600"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-base font-bold text-slate-900 leading-relaxed">
                  {result.pure_hindi}
                </p>
              </div>

              {/* Santali (Ol Chiki) */}
              <div className="p-5 bg-orange-50/50 rounded-2xl border border-orange-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-orange-800 uppercase tracking-wider">
                    🏹 Santali (ᱥᱟᱱᱛᱟᱲᱤ - Ol Chiki)
                  </span>
                  <button
                    onClick={() => playVoice(result.pure_santali)}
                    className="p-1.5 text-slate-400 hover:text-orange-600"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-base font-bold text-slate-900 leading-relaxed">
                  {result.pure_santali}
                </p>
              </div>

              {/* Tamil */}
              <div className="p-5 bg-emerald-50/50 rounded-2xl border border-emerald-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                    🪔 Tamil (தமிழ்)
                  </span>
                  <button
                    onClick={() => playVoice(result.pure_tamil)}
                    className="p-1.5 text-slate-400 hover:text-emerald-700"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-base font-bold text-slate-900 leading-relaxed">
                  {result.pure_tamil}
                </p>
              </div>

              {/* English */}
              <div className="p-5 bg-sky-50/50 rounded-2xl border border-sky-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-sky-800 uppercase tracking-wider">
                    🌐 Standard English
                  </span>
                  <button
                    onClick={() => playVoice(result.pure_english)}
                    className="p-1.5 text-slate-400 hover:text-sky-700"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-base font-bold text-slate-900 leading-relaxed">
                  {result.pure_english}
                </p>
              </div>
            </div>

            {/* Extracted Academic Concepts */}
            <div className="p-4 bg-slate-900 text-white rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="font-bold text-slate-400">Extracted Curriculum Concepts:</span>
              <div className="flex flex-wrap gap-2">
                {result.key_extracted_concepts?.map((c: string, idx: number) => (
                  <span key={idx} className="px-2.5 py-1 bg-white/10 rounded-lg text-orange-400 font-bold border border-white/10">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
