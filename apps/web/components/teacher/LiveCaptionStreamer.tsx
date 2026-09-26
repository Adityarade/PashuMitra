'use client';

import React, { useState } from 'react';
import { 
  Mic, 
  MicOff, 
  Radio, 
  Volume2, 
  Users, 
  Sparkles, 
  Send, 
  Languages, 
  Layers,
  CheckCircle2,
  Share2
} from 'lucide-react';
import { SUPPORTED_LANGUAGES, LanguageCode } from '@bhashasetu/shared';
import { useLanguage } from '@/lib/LanguageContext';

export default function LiveCaptionStreamer() {
  const { t } = useLanguage();
  const [isStreaming, setIsStreaming] = useState(false);
  const [activeSpeechText, setActiveSpeechText] = useState('');
  const [targetLangs, setTargetLangs] = useState<LanguageCode[]>([
    'sat_Olck',
    'tam_Taml',
    'eng_Latn',
    'hin_Deva',
  ]);
  const [translations, setTranslations] = useState<Record<string, string>>({
    hin_Deva: 'गुड मॉर्निंग बच्चों! आज हम विज्ञान का पहला पाठ पढ़ेंगे।',
    sat_Olck: 'ᱥᱮᱛᱟᱜ ᱡᱚᱦᱟᱨ ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ! ᱛᱮᱦᱮᱧ ᱟᱵᱚ ᱥᱟᱬᱮᱥ ᱨᱮᱱᱟᱜ ᱯᱩᱭᱞᱩ ᱯᱟᱴᱷ ᱵᱚᱱ ᱯᱟᱲᱦᱟᱣᱟ᱾',
    tam_Taml: 'காலை வணக்கம் குழந்தைகளே! இன்று நாம் அறிவியலின் முதல் பாடத்தைப் படிப்போம்.',
    eng_Latn: 'Good morning children! Today we will study the first lesson of Science.',
  });
  const [streamHistory, setStreamHistory] = useState<Array<{
    source: string;
    translations: Record<string, string>;
    time: string;
  }>>([
    {
      source: 'गुड मॉर्निंग बच्चों! आज हम विज्ञान का पहला पाठ पढ़ेंगे।',
      translations: {
        hin_Deva: 'गुड मॉर्निंग बच्चों! आज हम विज्ञान का पहला पाठ पढ़ेंगे।',
        sat_Olck: 'ᱥᱮᱛᱟᱜ ᱡᱚᱦᱟᱨ ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ! ᱛᱮᱦᱮᱧ ᱟᱵᱚ ᱥᱟᱬᱮᱥ ᱨᱮᱱᱟᱜ ᱯᱩᱭᱞᱩ ᱯᱟᱴᱷ ᱵᱚᱱ ᱯᱟᱲᱦᱟᱣᱟ᱾',
        tam_Taml: 'காலை வணக்கம் குழந்தைகளே! இன்று நாம் அறிவியலின் முதல் பாடத்தைப் படிப்போம்.',
        eng_Latn: 'Good morning children! Today we will study the first lesson of Science.',
      },
      time: '10:02 AM',
    },
  ]);

  const teacherPhrases = [
    'गुड मॉर्निंग बच्चों! आज हम विज्ञान का पहला पाठ पढ़ेंगे।',
    'कृपया अपनी विज्ञान की किताब का पृष्ठ संख्या 12 खोलें।',
    'हरे पौधों की पत्तियों में क्लोरोफिल होता है।',
    'पौधे सूर्य के प्रकाश और जल से भोजन बनाते हैं।',
    'क्या किसी को पत्तियों के रंग के बारे में कोई संदेह है?',
  ];

  const handleBroadcast = (text: string) => {
    setActiveSpeechText(text);
    const mockTrans: Record<string, Record<string, string>> = {
      'कृपया अपनी विज्ञान की किताब का पृष्ठ संख्या 12 खोलें।': {
        hin_Deva: 'कृपया अपनी विज्ञान की किताब का पृष्ठ संख्या 12 खोलें।',
        sat_Olck: 'ᱫᱟᱭᱟ ᱠᱟᱛᱮ ᱟᱯᱮᱭᱟᱜ ᱥᱟᱬᱮᱥ ᱯᱚᱛᱚᱵ ᱨᱮᱱᱟᱜ ᱥᱟᱦᱴᱟ ᱑᱒ ᱡᱷᱤᱡᱽ ᱢᱮ᱾',
        tam_Taml: 'தயவுசெய்து உங்கள் அறிவியல் பாடப்புத்தகத்தின் பக்கம் 12 ஐத் திறக்கவும்.',
        eng_Latn: 'Please open page number 12 of your science textbook.',
      },
      'हरे पौधों की पत्तियों में क्लोरोफिल होता है।': {
        hin_Deva: 'हरे पौधों की पत्तियों में क्लोरोफिल होता है।',
        sat_Olck: 'ᱦᱟᱹᱨᱭᱟᱹᱲ ᱫᱟᱨᱮ ᱥᱟᱠᱟᱢ ᱨᱮ ᱠᱞᱳᱨᱳᱯᱷᱤᱞ ᱛᱟᱦᱮᱸᱱᱟ᱾',
        tam_Taml: 'தாவர இலைகளில் பச்சையம் (குளோரோபில்) உள்ளது.',
        eng_Latn: 'Green plants have chlorophyll in their leaves.',
      },
      'पौधे सूर्य के प्रकाश और जल से भोजन बनाते हैं।': {
        hin_Deva: 'पौधे सूर्य के प्रकाश और जल से भोजन बनाते हैं।',
        sat_Olck: 'ᱥᱟᱠᱟᱢ ᱠᱚ ᱥᱤᱧ ᱪᱟᱸᱫᱚ ᱢᱟᱨᱥᱟᱞ ᱟᱨ ᱫᱟᱜ ᱛᱮ ᱡᱚᱢᱟᱜ ᱠᱚ ᱛᱮᱭᱟᱨᱟ᱾',
        tam_Taml: 'இலைகள் சூரிய ஒளி மற்றும் நீரைப் பயன்படுத்தி உணவு தயாரிக்கின்றன.',
        eng_Latn: 'Leaves prepare food using sunlight and water.',
      },
      'क्या किसी को पत्तियों के रंग के बारे में कोई संदेह है?': {
        hin_Deva: 'क्या किसी को पत्तियों के रंग के बारे में कोई संदेह है?',
        sat_Olck: 'ᱥᱟᱠᱟᱢ ᱨᱚᱝ ᱵᱟᱵᱚᱛ ᱡᱟᱦᱟᱸᱭᱟᱜ ᱪᱮᱫ ᱦᱚᱸ ᱠᱩᱠᱞᱤ ᱢᱮᱱᱟᱜᱼᱟ ᱥᱮ?',
        tam_Taml: 'இலைகளின் நிறம் குறித்து யாருக்காவது சந்தேகம் உள்ளதா?',
        eng_Latn: 'Does anyone have a question about the color of leaves?',
      },
    };

    const newTranslations = mockTrans[text] || {
      hin_Deva: text,
      sat_Olck: `ᱥᱟᱱᱛᱟᱲᱤ ᱛᱮ: ${text}`,
      tam_Taml: `தமிழில்: ${text}`,
      eng_Latn: `English: ${text}`,
    };

    setTranslations(newTranslations);
    setStreamHistory((prev) => [
      {
        source: text,
        translations: newTranslations,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
      ...prev,
    ]);
  };

  const toggleMic = () => {
    if (!isStreaming) {
      setIsStreaming(true);
      const randomPhrase = teacherPhrases[(streamHistory.length + 1) % teacherPhrases.length];
      handleBroadcast(randomPhrase);
    } else {
      setIsStreaming(false);
    }
  };

  const playTTS = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Studio Header & Status */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-3 w-3 relative">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isStreaming ? 'bg-red-400' : 'bg-slate-300'} opacity-75`} />
                <span className={`relative inline-flex rounded-full h-3 w-3 ${isStreaming ? 'bg-red-500' : 'bg-slate-400'}`} />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                {isStreaming ? t('nav.live_class', 'LIVE CLASSROOM STREAMING') : 'STUDIO STANDBY'}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              {t('live.studio_title', 'Live Classroom Real-Time Translator')}
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Teacher speaks in one language $\rightarrow$ Sub-second fanout subtitles to every student&apos;s mother tongue
            </p>
          </div>

          {/* Quick Stats & Toggle */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 rounded-xl text-xs font-bold text-slate-700">
              <Users className="w-4 h-4 text-emerald-600" />
              <span>{t('live.students_connected', '34 Students Connected')}</span>
            </div>

            <button
              onClick={toggleMic}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-sm shadow-md transition-all ${
                isStreaming
                  ? 'bg-red-600 hover:bg-red-700 text-white animate-pulse'
                  : 'bg-orange-600 hover:bg-orange-700 text-white hover:scale-105'
              }`}
            >
              {isStreaming ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              <span>{isStreaming ? t('live.mic_stop', 'Stop Streaming') : t('live.mic_start', 'Start Mic Stream')}</span>
            </button>
          </div>
        </div>

        {/* Quick Teacher Prompt Triggers */}
        <div className="pt-6">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">
            {t('live.quick_prompts', 'Quick Teaching Prompts (Click to Broadcast Instantly)')}
          </span>
          <div className="flex flex-wrap gap-2">
            {teacherPhrases.map((phrase, i) => (
              <button
                key={i}
                onClick={() => handleBroadcast(phrase)}
                className="text-xs bg-slate-50 hover:bg-orange-50 hover:border-orange-300 border border-slate-200 px-3.5 py-2 rounded-xl font-semibold text-slate-700 transition-all text-left"
              >
                📢 {phrase}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Real-Time Multilingual Subtitle Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Language Box 1: Santali (Tribal / Low Resource) */}
        <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-3xl p-6 border-2 border-orange-300 shadow-sm relative">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🏹</span>
              <div>
                <h4 className="font-black text-slate-900 text-base sm:text-lg">
                  ᱥᱟᱱᱛᱟᱲᱤ (Santali - Ol Chiki)
                </h4>
                <span className="text-[10px] font-bold text-orange-800 uppercase tracking-wider bg-orange-100 px-2 py-0.5 rounded">
                  Jharkhand Tribal Channel
                </span>
              </div>
            </div>
            <button
              onClick={() => playTTS(translations.sat_Olck)}
              className="p-2.5 bg-white text-orange-600 hover:bg-orange-50 rounded-xl shadow-2xs border border-orange-200"
              title="Pronounce spoken Santali"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
          <div className="bg-white/90 rounded-2xl p-5 border border-orange-200 min-h-[100px] flex items-center">
            <p className="text-lg sm:text-xl font-bold text-slate-900 leading-relaxed font-sans">
              {translations.sat_Olck}
            </p>
          </div>
        </div>

        {/* Language Box 2: Tamil (Dravidian) */}
        <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-3xl p-6 border-2 border-emerald-300 shadow-sm relative">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🪔</span>
              <div>
                <h4 className="font-black text-slate-900 text-base sm:text-lg">
                  தமிழ் (Tamil)
                </h4>
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-100 px-2 py-0.5 rounded">
                  Dravidian Channel
                </span>
              </div>
            </div>
            <button
              onClick={() => playTTS(translations.tam_Taml)}
              className="p-2.5 bg-white text-emerald-700 hover:bg-emerald-50 rounded-xl shadow-2xs border border-emerald-200"
              title="Pronounce spoken Tamil"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
          <div className="bg-white/90 rounded-2xl p-5 border border-emerald-200 min-h-[100px] flex items-center">
            <p className="text-lg sm:text-xl font-bold text-slate-900 leading-relaxed">
              {translations.tam_Taml}
            </p>
          </div>
        </div>

        {/* Language Box 3: Hindi (Indo-Aryan) */}
        <div className="bg-gradient-to-br from-sky-500/10 to-blue-500/10 rounded-3xl p-6 border-2 border-sky-300 shadow-sm relative">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🇮🇳</span>
              <div>
                <h4 className="font-black text-slate-900 text-base sm:text-lg">
                  हिन्दी (Hindi)
                </h4>
                <span className="text-[10px] font-bold text-sky-800 uppercase tracking-wider bg-sky-100 px-2 py-0.5 rounded">
                  Major Language Channel
                </span>
              </div>
            </div>
            <button
              onClick={() => playTTS(translations.hin_Deva)}
              className="p-2.5 bg-white text-sky-700 hover:bg-sky-50 rounded-xl shadow-2xs border border-sky-200"
              title="Pronounce spoken Hindi"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
          <div className="bg-white/90 rounded-2xl p-5 border border-sky-200 min-h-[100px] flex items-center">
            <p className="text-lg sm:text-xl font-bold text-slate-900 leading-relaxed">
              {translations.hin_Deva}
            </p>
          </div>
        </div>

        {/* Language Box 4: English (Global / Link) */}
        <div className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 rounded-3xl p-6 border-2 border-purple-300 shadow-sm relative">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌐</span>
              <div>
                <h4 className="font-black text-slate-900 text-base sm:text-lg">
                  English
                </h4>
                <span className="text-[10px] font-bold text-purple-800 uppercase tracking-wider bg-purple-100 px-2 py-0.5 rounded">
                  Link Language Channel
                </span>
              </div>
            </div>
            <button
              onClick={() => playTTS(translations.eng_Latn)}
              className="p-2.5 bg-white text-purple-700 hover:bg-purple-50 rounded-xl shadow-2xs border border-purple-200"
              title="Pronounce spoken English"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
          <div className="bg-white/90 rounded-2xl p-5 border border-purple-200 min-h-[100px] flex items-center">
            <p className="text-lg sm:text-xl font-bold text-slate-900 leading-relaxed">
              {translations.eng_Latn}
            </p>
          </div>
        </div>
      </div>

      {/* Classroom Broadcast Log */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
        <h3 className="text-lg font-black text-slate-900 mb-4">
          {t('live.history', 'Session Subtitle History (सत्र अनुवाद इतिहास)')}
        </h3>
        <div className="space-y-3">
          {streamHistory.map((item, idx) => (
            <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm">
              <div>
                <span className="text-xs font-bold text-slate-400 block mb-1">Teacher @ {item.time}</span>
                <p className="font-bold text-slate-800">&ldquo;{item.source}&rdquo;</p>
              </div>
              <div className="text-xs text-orange-700 font-semibold bg-orange-100/70 px-3 py-1.5 rounded-xl border border-orange-200 self-start sm:self-auto">
                Santali: {item.translations.sat_Olck}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
