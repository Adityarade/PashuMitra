'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  BookMarked, 
  Sparkles, 
  Volume2, 
  Play, 
  ChevronLeft, 
  ChevronRight,
  Share2,
  Download,
  Languages
} from 'lucide-react';
import { generateStory } from '@/lib/api';
import { LanguageCode } from '@bhashasetu/shared';
import ScriptSelector from '@/components/common/ScriptSelector';

export default function CulturalStoryStudioPage() {
  const [topic, setTopic] = useState('Saving the Sacred Sal Forest (ᱫᱟᱨᱮ ᱵᱟᱧᱪᱟᱣ)');
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>('sat_Olck');
  const [currentPanelIdx, setCurrentPanelIdx] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const [storyData, setStoryData] = useState<any>({
    story_title: 'ᱫᱟᱨᱮ ᱨᱮᱭᱟᱜ ᱡᱤᱣᱤ (The Spirit of the Sacred Forest)',
    character: 'ᱥᱤᱫᱳ ᱟᱨ ᱠᱟᱹᱱᱦᱩ (Sido & Kanhu)',
    panels: [
      {
        panel: 1,
        image_url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=80',
        narration: {
          sat_Olck: 'ᱥᱤᱫᱳ ᱫᱚ ᱫᱤᱱᱟᱹᱢ ᱦᱤᱞᱳᱜ ᱟᱡᱟᱜ ᱩᱞ ᱫᱟᱨᱮ ᱨᱮ ᱫᱟᱜ ᱮ ᱫᱩᱞᱟ᱾ ᱥᱤᱧ ᱪᱟᱸᱫᱚ ᱢᱟᱨᱥᱟᱞ ᱫᱟᱨᱮ ᱥᱟᱠᱟᱢ ᱨᱮ ᱯᱟᱲᱟᱣᱜᱼᱟ᱾',
          hin_Deva: 'सीदो रोज़ अपने आम और साल के वृक्षों में पानी डालता है। सूर्य की किरणें पत्तियों पर चमकती हैं।',
          eng_Latn: 'Sido waters the young Sal saplings every sunrise as golden sunlight washes over the forest.'
        },
        caption: 'Morning in the village: The awakening forest'
      },
      {
        panel: 2,
        image_url: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&auto=format&fit=crop&q=80',
        narration: {
          sat_Olck: 'ᱥᱟᱠᱟᱢ ᱨᱮ ᱢᱮᱱᱟᱜ ᱦᱟᱹᱨᱭᱟᱹᱲ ᱠᱞᱳᱨᱳᱯᱷᱤᱞ ᱫᱟᱜ ᱟᱨ ᱢᱟᱨᱥᱟᱞ ᱢᱮᱥᱟ ᱠᱟᱛᱮ ᱢᱤᱴᱷᱟᱹ ᱡᱚᱢᱟᱜ ᱮ ᱛᱮᱭᱟᱨᱟ᱾',
          hin_Deva: 'पत्तियों में उपस्थित हरा क्लोरोफिल सूर्य के प्रकाश और जल से वृक्ष के लिए भोजन तैयार करता है।',
          eng_Latn: 'The green chlorophyll in each leaf blends sunlight and water to nourish the whole forest ecosystem.'
        },
        caption: 'The Miracle of Leaves: Photosynthesis in action'
      },
      {
        panel: 3,
        image_url: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800&auto=format&fit=crop&q=80',
        narration: {
          sat_Olck: 'ᱫᱟᱨᱮ ᱠᱷᱚᱱ ᱯᱷᱩᱨᱪᱟᱹ ᱚᱠᱥᱤᱡᱮᱱ ᱦᱚᱭ ᱚᱰᱚᱠᱚᱜᱼᱟ, ᱡᱟᱦᱟᱸ ᱫᱚ ᱟᱵᱚ ᱥᱟᱱᱟᱢ ᱢᱟᱹᱱᱢᱤ ᱠᱚ ᱡᱤᱣᱤᱫ ᱮ ᱫᱚᱦᱚᱭᱮᱫ ᱵᱚᱱᱟ᱾',
          hin_Deva: 'घने वृक्षों से शुद्ध ऑक्सीजन गैस निकलती है, जिससे हमारा पूरा समुदाय स्वस्थ और सुरक्षित रहता है।',
          eng_Latn: 'From the green canopy, fresh pure oxygen breathes life into the entire village.'
        },
        caption: 'Harmony with Nature: Clean air for all'
      }
    ]
  });

  const currentPanel = storyData.panels[currentPanelIdx] || storyData.panels[0];

  const handleGenerateNewStory = async (customTopic: string) => {
    setLoading(true);
    setTopic(customTopic);
    try {
      const res = await generateStory(customTopic, selectedLanguage);
      setStoryData(res);
      setCurrentPanelIdx(0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const playNarration = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const text = currentPanel.narration[selectedLanguage] || currentPanel.narration.sat_Olck || currentPanel.narration.hin_Deva;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.onend = () => setIsPlayingAudio(false);
      setIsPlayingAudio(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      
      <div className="flex items-center justify-between">
        <Link
          href="/student"
          className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 text-white flex items-center justify-center text-2xl shadow-md">
              <BookMarked className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-orange-600 uppercase tracking-wider block">
                Vernacular Illustrated Stories
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                AI Cultural Tale Weaver (सचित्र बाल साहित्य)
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Generates culturally grounded bedtime and classroom stories in India&apos;s scheduled and tribal languages
              </p>
            </div>
          </div>

          {/* Language selector */}
          <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200 text-xs font-bold">
            <Languages className="w-4 h-4 text-orange-600 ml-1" />
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value as LanguageCode)}
              className="bg-transparent text-slate-800 focus:outline-none cursor-pointer"
            >
              <option value="sat_Olck">🏹 ᱥᱟᱱᱛᱟᱲᱤ (Santali - Ol Chiki)</option>
              <option value="hin_Deva">🇮🇳 हिन्दी (Hindi)</option>
              <option value="tam_Taml">🪔 தமிழ் (Tamil)</option>
              <option value="eng_Latn">🌐 English</option>
            </select>
          </div>
        </div>

        {/* Quick Topics */}
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Generate Tales from Indian Folklore & Science:
          </span>
          <div className="flex flex-wrap gap-2">
            {[
              'Saving the Sacred Sal Forest (ᱫᱟᱨᱮ ᱵᱟᱧᱪᱟᱣ)',
              'Birsa Munda & The Secret of Clean River Water',
              'Avvaiyar and the Wonder of Rainbow Reflections',
              'The Boy Who Counted Stars with Aryabhata',
            ].map((t, idx) => (
              <button
                key={idx}
                onClick={() => handleGenerateNewStory(t)}
                className="text-xs bg-slate-50 hover:bg-orange-50 hover:text-orange-700 hover:border-orange-300 border border-slate-200 px-3.5 py-2 rounded-xl font-semibold text-slate-700 transition-all text-left"
              >
                ✨ {t}
              </button>
            ))}
          </div>
        </div>

        {/* Story Reader Card */}
        <div className="bg-slate-900 text-white rounded-3xl overflow-hidden border border-slate-800 shadow-xl">
          
          {/* Main Visual Panel */}
          <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-slate-950">
            <img
              src={currentPanel.image_url}
              alt="Story illustration"
              className="w-full h-full object-cover transition-all duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-xs font-black border border-white/20 text-orange-400">
              Panel 0{currentPanel.panel} of 0{storyData.panels.length}
            </div>
            <div className="absolute bottom-4 left-4 right-4 text-xs font-medium text-slate-300 italic">
              {currentPanel.caption}
            </div>
          </div>

          {/* Story Narration Block */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {storyData.story_title}
              </h3>
              <button
                onClick={playNarration}
                className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold shadow-md transition-transform hover:scale-105"
              >
                <Volume2 className={`w-4 h-4 ${isPlayingAudio ? 'animate-bounce' : ''}`} />
                <span>{isPlayingAudio ? 'Speaking...' : 'Listen in Vernacular'}</span>
              </button>
            </div>

            <div className="bg-white/10 rounded-2xl p-6 border border-white/10 text-lg sm:text-xl font-medium text-slate-100 leading-relaxed font-sans">
              &ldquo;{currentPanel.narration[selectedLanguage] || currentPanel.narration.sat_Olck || currentPanel.narration.hin_Deva}&rdquo;
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <button
                onClick={() => setCurrentPanelIdx((c) => Math.max(0, c - 1))}
                disabled={currentPanelIdx === 0}
                className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 rounded-xl text-xs font-bold transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Panel</span>
              </button>

              <div className="flex items-center gap-1.5">
                {storyData.panels.map((_: any, i: number) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPanelIdx(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      currentPanelIdx === i ? 'bg-orange-500 w-6' : 'bg-slate-700'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => setCurrentPanelIdx((c) => Math.min(storyData.panels.length - 1, c + 1))}
                disabled={currentPanelIdx === storyData.panels.length - 1}
                className="flex items-center gap-1.5 px-4 py-2 bg-orange-600 hover:bg-orange-700 disabled:opacity-40 text-white rounded-xl text-xs font-bold transition-colors"
              >
                <span>Next Panel</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
