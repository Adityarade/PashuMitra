'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Sparkles, 
  BookOpen, 
  FileText, 
  Image as ImageIcon, 
  CheckCircle2, 
  Download, 
  Edit3,
  Loader2,
  Printer
} from 'lucide-react';
import { generateWorksheet, generateStory } from '@/lib/api';
import { LanguageCode } from '@bhashasetu/shared';

export default function TeacherContentCopilotPage() {
  const [activeTab, setActiveTab] = useState<'worksheet' | 'story'>('worksheet');
  const [lessonTitle, setLessonTitle] = useState('Photosynthesis in Plants (पादपों में पोषण)');
  const [rawText, setRawText] = useState(
    'हरे पौधों की पत्तियों में क्लोरोफिल नामक हरा वर्णक होता है जो सूर्य के प्रकाश की ऊर्जा को ग्रहण करता है। पत्तियां कार्बन डाइऑक्साइड और जल से ग्लूकोज और ऑक्सीजन बनाती हैं।'
  );
  const [targetLang, setTargetLang] = useState<LanguageCode>('sat_Olck');
  const [loading, setLoading] = useState(false);
  const [generatedResult, setGeneratedResult] = useState<any>(null);
  const [isPublished, setIsPublished] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setIsPublished(false);
    try {
      if (activeTab === 'worksheet') {
        const res = await generateWorksheet(lessonTitle, rawText, targetLang);
        setGeneratedResult(res);
      } else {
        const res = await generateStory(lessonTitle, targetLang);
        setGeneratedResult(res);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/teacher"
          className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Teacher Console</span>
        </Link>
      </div>

      {/* Main Studio Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <span className="text-[11px] font-bold text-orange-600 uppercase tracking-wider block">
              AI Pedagogical Assistant
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-0.5">
              Teacher Content Copilot & Generator
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Convert any syllabus text into bilingual worksheets, simplified reading levels, and illustrated stories
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            <button
              onClick={() => {
                setActiveTab('worksheet');
                setGeneratedResult(null);
              }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'worksheet'
                  ? 'bg-white text-orange-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Auto-Worksheet</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('story');
                setGeneratedResult(null);
              }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'story'
                  ? 'bg-white text-orange-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Illustrated Story</span>
            </button>
          </div>
        </div>

        {/* Input Form */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Lesson / Topic Title
              </label>
              <input
                type="text"
                value={lessonTitle}
                onChange={(e) => setLessonTitle(e.target.value)}
                className="w-full text-sm border border-slate-300 rounded-xl px-4 py-2.5 font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Target Vernacular Language
              </label>
              <select
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value as LanguageCode)}
                className="w-full text-sm border border-slate-300 rounded-xl px-4 py-2.5 font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none"
              >
                <option value="sat_Olck">🏹 ᱥᱟᱱᱛᱟᱲᱤ (Santali - Ol Chiki)</option>
                <option value="tam_Taml">🪔 தமிழ் (Tamil)</option>
                <option value="hin_Deva">🇮🇳 हिन्दी (Hindi)</option>
                <option value="eng_Latn">🌐 English</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Source Textbook Text / OCR Paste
            </label>
            <textarea
              rows={4}
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              className="w-full text-sm border border-slate-300 rounded-xl p-4 font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none leading-relaxed"
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-black text-xs rounded-xl shadow-md transition-transform hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              <span>{loading ? 'Generating Pedagogical Content...' : `Generate ${activeTab === 'worksheet' ? 'Worksheet' : 'Story'}`}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Generated Content Preview & Review Step */}
      {generatedResult && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6 animate-in fade-in zoom-in-95 duration-200">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800 text-xs font-bold">
                Teacher Review Step
              </span>
              <h3 className="text-lg font-black text-slate-900">
                {generatedResult.title || generatedResult.story_title}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>

              <button
                onClick={() => setIsPublished(true)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black shadow-sm transition-all ${
                  isPublished
                    ? 'bg-emerald-600 text-white'
                    : 'bg-orange-600 hover:bg-orange-700 text-white hover:scale-105'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{isPublished ? 'Published to Class 5 Students!' : 'Approve & Publish to Class'}</span>
              </button>
            </div>
          </div>

          {/* Worksheet Mode Preview */}
          {activeTab === 'worksheet' && (
            <div className="space-y-6">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs font-medium text-slate-700">
                <span className="font-bold text-slate-900 block mb-1">Pedagogical Objective:</span>
                {generatedResult.summary}
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Generated Practice Questions:
                </h4>
                {generatedResult.questions?.map((q: any, idx: number) => (
                  <div key={idx} className="p-4 bg-amber-50/40 rounded-2xl border border-amber-200 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-orange-800">
                      <span>Q{idx + 1}. ({q.type.replace(/_/g, ' ')})</span>
                      <button className="text-slate-400 hover:text-slate-600 flex items-center gap-1">
                        <Edit3 className="w-3 h-3" /> Edit
                      </button>
                    </div>
                    <p className="font-bold text-slate-900 text-base">{q.question}</p>
                    {q.options && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {q.options.map((opt: string, oi: number) => (
                          <span
                            key={oi}
                            className={`px-3 py-1 text-xs font-semibold rounded-lg border ${
                              opt === q.correct_answer
                                ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                                : 'bg-white text-slate-700 border-slate-200'
                            }`}
                          >
                            {opt}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Illustrated Story Mode Preview */}
          {activeTab === 'story' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {generatedResult.panels?.map((panel: any) => (
                  <div key={panel.panel} className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 shadow-2xs flex flex-col justify-between">
                    <div>
                      <img
                        src={panel.image_url}
                        alt={`Panel ${panel.panel}`}
                        className="w-full h-44 object-cover"
                      />
                      <div className="p-4 space-y-2">
                        <span className="text-[10px] font-black uppercase tracking-wider text-orange-700 bg-orange-100 px-2 py-0.5 rounded">
                          Panel 0{panel.panel}
                        </span>
                        <p className="text-sm font-bold text-slate-900 leading-snug">
                          {panel.narration[targetLang] || panel.narration.sat_Olck || panel.narration.hin_Deva}
                        </p>
                      </div>
                    </div>
                    <div className="p-4 pt-0 text-[11px] text-slate-500 italic">
                      Prompt: {panel.image_prompt}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
