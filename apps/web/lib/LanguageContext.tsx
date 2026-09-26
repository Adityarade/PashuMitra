'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { LanguageCode, SUPPORTED_LANGUAGES } from '@bhashasetu/shared';

// Comprehensive dictionary for every screen element
export const DASHBOARD_TRANSLATIONS: Record<string, Record<string, string>> = {
  // Brand & Subtitles
  'platform.title': {
    hin_Deva: 'भाषासेतु — राष्ट्रीय बहुभाषी शिक्षा मंच',
    sat_Olck: 'ᱵᱷᱟᱥᱟᱥᱮᱛᱩ — ᱡᱟᱹᱛᱤᱭᱟᱹᱨᱤ ᱥᱟᱱᱟᱢ ᱯᱟᱹᱨᱥᱤ ᱥᱮᱪᱮᱫ ᱢᱟᱸᱪ',
    tam_Taml: 'பாஷாசேது — தேசிய பன்மொழி கல்வி தளம்',
    eng_Latn: 'BhashaSetu — National Multilingual Pedagogy Platform',
    ben_Beng: 'ভাষাসেতু — জাতীয় বহুভাষিক শিক্ষা মঞ্চ',
    tel_Telu: 'భాషాసేతు — జాతీయ బహుభాషా విద్యా వేదిక',
    mar_Deva: 'भाषासेतू — राष्ट्रीय बहुभाषिक शिक्षण मंच',
    guj_Gujr: 'ભાષા સેતુ — રાષ્ટ્રીય બહુભાષી શિક્ષણ મંચ',
    kan_Knda: 'ಭಾಷಾಸೇತು — ರಾಷ್ಟ್ರೀಯ ಬಹುಭಾಷಾ ಶಿಕ್ಷಣ ವೇದಿಕೆ',
    mal_Mlym: 'ഭാഷാസേതു — ദേശീയ ബഹുഭാഷാ വിദ്യാഭ്യാസ പ്ലാറ്റ്‌ഫോം',
    ori_Orya: 'ଭାଷାସେତୁ — ଜାତୀୟ ବହୁଭାଷୀ ଶିକ୍ଷା ମଞ୍ଚ',
    pan_Guru: 'ਭਾਸ਼ਾਸੇਤੂ — ਰਾਸ਼ਟਰੀ ਬਹੁਭਾਸ਼ਾਈ ਸਿੱਖਿਆ ਮੰਚ',
  },
  'platform.nep': {
    hin_Deva: 'राष्ट्रीय शिक्षा नीति २०२०',
    sat_Olck: 'ᱡᱟᱹᱛᱤᱭᱟᱹᱨᱤ ᱥᱮᱪᱮᱫ ᱱᱤᱛᱤ ᱒᱐᱒᱐',
    tam_Taml: 'தேசிய கல்விக் கொள்கை 2020',
    eng_Latn: 'National Education Policy (NEP 2020)',
    ben_Beng: 'জাতীয় শিক্ষানীতি ২০২০',
    tel_Telu: 'జాతీయ విద్యా విధానం 2020',
    mar_Deva: 'राष्ट्रीय शैक्षणिक धोरण २०२०',
  },
  'platform.subtitle': {
    hin_Deva: 'मातृभाषा और स्थानीय बोलियों में एआई शिक्षण एवं त्वरित अनुवाद',
    sat_Olck: 'ᱟᱭᱳ ᱟᱲᱟᱝ ᱟᱨ ᱡᱚᱛᱚ ᱯᱟᱹᱨᱥᱤ ᱨᱮ AI ᱥᱮᱪᱮᱫ ᱟᱨ ᱛᱚᱨᱡᱚᱢᱟ',
    tam_Taml: 'தாய்மொழி மற்றும் வட்டார வழக்குகளில் AI கற்பித்தல் மற்றும் நேரடி மொழிபெயர்ப்பு',
    eng_Latn: 'AI Vernacular Pedagogy & Real-Time Classroom Translation',
    ben_Beng: 'মাতৃভাষা এবং আঞ্চলিক ভাষায় এআই শিক্ষা ও অনুবাদ',
    tel_Telu: 'మాతృభాషలో AI బోధన మరియు నిజ-సమయ అనువాదం',
    mar_Deva: 'मातृभाषेत AI शिक्षण आणि रीअल-टाइम भाषांतर',
  },

  // Navigation Links
  'nav.student_zone': {
    hin_Deva: 'छात्र अधिगम क्षेत्र',
    sat_Olck: 'ᱪᱮᱪᱮᱫᱤᱭᱟᱹ ᱥᱮᱪᱮᱫ ᱡᱟᱭᱜᱟ',
    tam_Taml: 'மாணவர் கற்றல் பகுதி',
    eng_Latn: 'Student Learning Zone',
  },
  'nav.teacher_zone': {
    hin_Deva: 'शिक्षक कंसोल',
    sat_Olck: 'ᱢᱟᱪᱮᱫ ᱠᱚᱱᱥᱳᱞ',
    tam_Taml: 'ஆசிரியர் பணியகம்',
    eng_Latn: 'Teacher Console',
  },
  'nav.admin_zone': {
    hin_Deva: 'प्रशासन एवं स्मार्ट उपकरण',
    sat_Olck: 'ᱥᱟᱥᱚᱱ ᱟᱨ ᱥᱢᱟᱨᱴ ᱦᱟᱹᱛᱭᱟᱹᱨ',
    tam_Taml: 'நிர்வாகம் & கருவிகள்',
    eng_Latn: 'Admin & Smart Tools',
  },
  'nav.lessons': {
    hin_Deva: 'पाठ और ई-पुस्तकालय',
    sat_Olck: 'ᱯᱟᱴᱷ ᱟᱨ ᱯᱚᱛᱚᱵ ᱜᱟᱫᱟᱞ',
    tam_Taml: 'பாடங்கள் & நூலகம்',
    eng_Latn: 'Lessons & Library',
  },
  'nav.karaoke': {
    hin_Deva: 'कराओके स्वराघात पठन',
    sat_Olck: 'ᱥᱟᱰᱮ ᱥᱟᱶ ᱯᱟᱲᱦᱟᱣ (Karaoke)',
    tam_Taml: 'ஒலி நய வாசிப்பு (Karaoke)',
    eng_Latn: 'Karaoke Read-Along',
  },
  'nav.quiz': {
    hin_Deva: 'अनुकूली प्रश्नोत्तरी (BKT)',
    sat_Olck: 'ᱵᱤᱰᱟᱹᱣ ᱠᱩᱠᱞᱤ (BKT Quiz)',
    tam_Taml: 'தகவமைப்பு வினாடி வினா',
    eng_Latn: 'Adaptive Micro-Quiz (BKT)',
  },
  'nav.doubt_tutor': {
    hin_Deva: 'पाठ्यक्रम शंका निवारण',
    sat_Olck: 'ᱠᱩᱠᱞᱤ ᱥᱚᱞᱦᱮ ᱜᱚᱲᱚᱭᱤᱡ',
    tam_Taml: 'பாடத்திட்ட சந்தேக தீர்வு AI',
    eng_Latn: 'Curriculum Doubt Tutor',
  },
  'nav.stories': {
    hin_Deva: 'सांस्कृतिक कहानीकार',
    sat_Olck: 'ᱥᱟᱶᱛᱟ ᱠᱟᱹᱦᱱᱤ ᱜᱟᱵᱟᱱᱤᱡ',
    tam_Taml: 'கலாச்சார சிறார் கதைகள்',
    eng_Latn: 'Cultural Tale Weaver',
  },
  'nav.corpus': {
    hin_Deva: 'जनजातीय भाषा संग्रह',
    sat_Olck: 'ᱟᱹᱫᱤᱵᱟᱹᱥᱤ ᱯᱟᱹᱨᱥᱤ ᱡᱟᱣᱨᱟ',
    tam_Taml: 'பழங்குடி மொழி குரல் சேகரிப்பு',
    eng_Latn: 'Tribal Speech Corpus',
  },
  'nav.teacher_dash': {
    hin_Deva: 'शिक्षक मुख्य पृष्ठ',
    sat_Olck: 'ᱢᱟᱪᱮᱫ ᱢᱩᱬᱩᱛ ᱥᱟᱦᱴᱟ',
    tam_Taml: 'ஆசிரியர் முதன்மை பக்கம்',
    eng_Latn: 'Teacher Dashboard',
  },
  'nav.live_class': {
    hin_Deva: 'कक्षा सीधा प्रसारण अनुवाद',
    sat_Olck: 'ᱪᱟᱱᱟᱪ ᱥᱚᱡᱷᱮ ᱛᱚᱨᱡᱚᱢᱟ (Live)',
    tam_Taml: 'நேரடி வகுப்பறை மொழிபெயர்ப்பு',
    eng_Latn: 'Live Classroom Stream',
  },
  'nav.content_copilot': {
    hin_Deva: 'पाठ सामग्री सहायक एवं OCR',
    sat_Olck: 'ᱯᱟᱴᱷ ᱥᱟᱯᱲᱟᱣ ᱜᱚᱲᱚᱭᱤᱡ',
    tam_Taml: 'பாட உள்ளடக்க உதவியாளர் & OCR',
    eng_Latn: 'Content Copilot & OCR',
  },
  'nav.review_queue': {
    hin_Deva: 'भाषाई समीक्षा कतार',
    sat_Olck: 'ᱯᱟᱹᱨᱥᱤ ᱵᱤᱰᱟᱹᱣ ᱠᱟᱛᱷᱟ',
    tam_Taml: 'மொழி சரிபார்ப்பு வரிசை',
    eng_Latn: 'Corpus Review Queue',
  },
  'nav.heatmap': {
    hin_Deva: 'राष्ट्रीय भाषा अंतराल हीटमैप',
    sat_Olck: 'ᱡᱟᱹᱛᱤᱭᱟᱹᱨᱤ ᱯᱟᱹᱨᱥᱤ ᱦᱤᱴᱢᱮᱯ',
    tam_Taml: 'தேசிய மொழி இடைவெளி வரைபடம்',
    eng_Latn: 'National Language Heatmap',
  },
  'nav.code_switch': {
    hin_Deva: 'मिश्रित भाषा विश्लेषक',
    sat_Olck: 'ᱢᱮᱥᱟ ᱯᱟᱹᱨᱥᱤ ᱥᱚᱞᱦᱮ',
    tam_Taml: 'கலப்பு மொழி மாற்றி',
    eng_Latn: 'Code-Switching Mixer',
  },
  'nav.app_hub': {
    hin_Deva: 'एंड्रॉइड ऐप एवं वेब हब',
    sat_Olck: 'Android ᱮᱯ ᱟᱨ Web Hub',
    tam_Taml: 'Android செயலி & இணைய தளம்',
    eng_Latn: 'Android App & Web Hub',
  },

  // Topbar
  'topbar.search_placeholder': {
    hin_Deva: 'अपनी भाषा में कोई भी शंका पूछें या पाठ खोजें...',
    sat_Olck: 'ᱟᱢᱟᱜ ᱟᱲᱟᱝ ᱛᱮ ᱠᱩᱠᱞᱤ ᱠᱩᱞᱤ ᱢᱮ ᱥᱮ ᱯᱟᱴᱷ ᱥᱮᱸᱫᱽᱨᱟᱭ ᱢᱮ...',
    tam_Taml: 'உங்கள் தாய்மொழியில் சந்தேகங்களைக் கேட்கவும்...',
    eng_Latn: 'Ask any syllabus doubt or search lessons in your dialect...',
  },
  'topbar.device_preview': {
    hin_Deva: 'वेब + एंड्रॉइड पूर्वावलोकन',
    sat_Olck: 'Web + Android ᱧᱮᱞ',
    tam_Taml: 'இணையம் + Android முன்னோட்டம்',
    eng_Latn: 'Web + Android Preview',
  },
  'topbar.synced': {
    hin_Deva: 'क्लाउड सिंक सक्रिय',
    sat_Olck: 'ᱥᱤᱸᱠ ᱮᱠᱴᱤᱵᱷ',
    tam_Taml: 'இணைக்கப்பட்டது',
    eng_Latn: 'Cloud Synced',
  },
  'topbar.offline': {
    hin_Deva: 'ऑफलाइन मोड (डेक्सी)',
    sat_Olck: 'ᱚᱯᱷᱞᱟᱭᱤᱱ ᱢᱳᱰ (Dexie)',
    tam_Taml: 'ஆஃப்லைன் முறை',
    eng_Latn: 'Offline (Dexie)',
  },

  // Student Dashboard Page
  'student.welcome': {
    hin_Deva: 'स्वागत है, आरव!',
    sat_Olck: 'ᱡᱚᱦᱟᱨ, ᱟᱨᱚᱵᱽ!',
    tam_Taml: 'வணக்கம், ஆரவ்!',
    eng_Latn: 'Welcome, Aarav!',
  },
  'student.grade_info': {
    hin_Deva: 'कक्षा ५ • क्रमांक १४ • राजकीय उत्क्रमित मध्य विद्यालय, दुमका (झारखंड)',
    sat_Olck: 'ᱪᱟᱱᱟᱪ ᱕ • ᱨᱳᱞ ᱑᱔ • ᱥᱚᱨᱠᱟᱨᱤ ᱛᱟᱱᱟᱞᱟ ᱟᱥᱲᱟ, ᱫᱩᱢᱠᱟ (ᱡᱷᱟᱨᱠᱷᱚᱸᱰ)',
    tam_Taml: 'வகுப்பு 5 • எண் 14 • அரசு நடுநிலைப் பள்ளி, தும்கா (ஜார்கண்ட்)',
    eng_Latn: 'Class 5 • Roll #14 • Government Middle School, Dumka (Jharkhand)',
  },
  'student.ask_doubt_btn': {
    hin_Deva: 'शंका पूछें (AI RAG)',
    sat_Olck: 'ᱠᱩᱠᱞᱤ ᱠᱩᱞᱤ ᱢᱮ (RAG)',
    tam_Taml: 'சந்தேகம் கேள் (AI RAG)',
    eng_Latn: 'Ask a Doubt (RAG)',
  },
  'student.record_dialect_btn': {
    hin_Deva: 'बोली रिकॉर्ड करें (+५० XP)',
    sat_Olck: 'ᱟᱲᱟᱝ ᱨᱮᱠᱳᱨᱰ ᱢᱮ (+᱕᱐ XP)',
    tam_Taml: 'குரல் பதிவு செய் (+50 XP)',
    eng_Latn: 'Record Dialect (+50 XP)',
  },
  'student.my_language': {
    hin_Deva: 'मेरी अध्ययन भाषा (ध्वनि पुष्टि सुनने के लिए स्पर्श करें):',
    sat_Olck: 'ᱤᱧᱟᱜ ᱥᱮᱪᱮᱫ ᱯᱟᱹᱨᱥᱤ (ᱟᱸᱡᱚᱢ ᱞᱟᱹᱜᱤᱫ ᱡᱚᱴᱮᱫ ᱢᱮ):',
    tam_Taml: 'எனது கற்கும் மொழி (குரல் கேட்க தட்டவும்):',
    eng_Latn: 'My Learning Language (Tap flag to hear voice confirmation):',
  },
  'student.tab_lessons': {
    hin_Deva: 'इंटरैक्टिव मातृभाषा पाठ',
    sat_Olck: 'ᱟᱭᱳ ᱟᱲᱟᱝ ᱛᱮ ᱯᱟᱴᱷ ᱠᱚ',
    tam_Taml: 'தாய்மொழிப் பாடங்கள்',
    eng_Latn: 'Interactive Vernacular Lessons',
  },
  'student.tab_journey': {
    hin_Deva: 'अधिगम पथ एवं उपलब्धियां',
    sat_Olck: 'ᱥᱮᱪᱮᱫ ᱰᱟᱦᱟᱨ ᱟᱨ ᱢᱟᱹᱱ',
    tam_Taml: 'கற்றல் வரைபடம் & சாதனைகள்',
    eng_Latn: 'Learning Map & Achievements',
  },
  'student.start_read_along': {
    hin_Deva: 'स्वराघात पठन शुरू करें',
    sat_Olck: 'ᱯᱟᱲᱦᱟᱣ ᱮᱦᱚᱵ ᱢᱮ',
    tam_Taml: 'வாசிக்கத் தொடங்கு',
    eng_Latn: 'Start Read-Along',
  },
  'student.take_quiz': {
    hin_Deva: 'अभ्यास परीक्षा',
    sat_Olck: 'ᱵᱤᱰᱟᱹᱣ',
    tam_Taml: 'வினாடி வினா',
    eng_Latn: 'Take Quiz',
  },
  'student.offline_cached': {
    hin_Deva: 'ऑफलाइन उपलब्ध',
    sat_Olck: 'ᱚᱯᱷᱞᱟᱭᱤᱱ ᱨᱮ ᱢᱮᱱᱟᱜᱼᱟ',
    tam_Taml: 'ஆஃப்லைனில் உள்ளது',
    eng_Latn: 'Offline Cached',
  },
  'student.streak': {
    hin_Deva: 'अध्ययन निरंतरता',
    sat_Olck: 'ᱫᱤᱱᱟᱹᱢ ᱯᱟᱲᱦᱟᱣ',
    tam_Taml: 'தொடர் கற்றல்',
    eng_Latn: 'Learning Streak',
  },
  'student.points': {
    hin_Deva: 'ज्ञान अंक',
    sat_Olck: 'ᱥᱮᱪᱮᱫ ᱯᱚᱭᱮᱱᱴ',
    tam_Taml: 'அறிவு புள்ளிகள்',
    eng_Latn: 'Knowledge Points',
  },
  'student.badges': {
    hin_Deva: 'उपलब्धियां',
    sat_Olck: 'ᱢᱟᱹᱱ ᱥᱟᱠᱟᱢ',
    tam_Taml: 'சாதனைப் பதக்கங்கள்',
    eng_Latn: 'Achievements',
  },

  // Common UI Controls
  'common.play': { hin_Deva: 'चलाएं', sat_Olck: 'ᱮᱦᱚᱵ', tam_Taml: 'இயக்கு', eng_Latn: 'Play' },
  'common.pause': { hin_Deva: 'रोकें', sat_Olck: 'ᱛᱷᱟᱠᱮᱫ', tam_Taml: 'நிறுத்து', eng_Latn: 'Pause' },
  'common.replay': { hin_Deva: 'पुनः चलाएं', sat_Olck: 'ᱫᱚᱦᱲᱟ', tam_Taml: 'மீண்டும் இயக்கு', eng_Latn: 'Replay' },
  'common.speed': { hin_Deva: 'गति', sat_Olck: 'ᱥᱯᱤᱰ', tam_Taml: 'வேகம்', eng_Latn: 'Speed' },
  'common.listen': { hin_Deva: 'सुनें', sat_Olck: 'ᱟᱸᱡᱚᱢ', tam_Taml: 'கேட்க', eng_Latn: 'Listen' },
  'common.back': { hin_Deva: 'वापस जाएं', sat_Olck: 'ᱨᱩᱣᱟᱹᱲ', tam_Taml: 'பின்னே செல்', eng_Latn: 'Back' },
  'common.next': { hin_Deva: 'अगला', sat_Olck: 'ᱞᱟᱦᱟ', tam_Taml: 'அடுத்து', eng_Latn: 'Next' },
  'common.previous': { hin_Deva: 'पिछला', sat_Olck: 'ᱛᱟᱭᱚᱢ', tam_Taml: 'முந்தைய', eng_Latn: 'Previous' },
  'common.submit': { hin_Deva: 'जमा करें', sat_Olck: 'ᱡᱚᱢᱟ', tam_Taml: 'சமர்ப்பி', eng_Latn: 'Submit' },
  'common.print': { hin_Deva: 'प्रिंट करें', sat_Olck: 'ᱯᱨᱤᱱᱴ', tam_Taml: 'அச்சிடு', eng_Latn: 'Print' },
  'common.verified': { hin_Deva: 'शिक्षक सत्यापित', sat_Olck: 'ᱢᱟᱪᱮᱫ ᱵᱤᱰᱟᱹᱣ', tam_Taml: 'ஆசிரியர் சரிபார்த்தது', eng_Latn: 'Verified by Teacher' },
  'common.flag_issue': { hin_Deva: 'समस्या की शिकायत करें', sat_Olck: 'ᱵᱟᱹᱲᱤᱡ ᱞᱟᱹᱭ', tam_Taml: 'பிழை தெரிவி', eng_Latn: 'Flag an Issue' },
  'common.key_concepts': { hin_Deva: 'मुख्य वैज्ञानिक अवधारणाएं', sat_Olck: 'ᱢᱩᱬᱩᱛ ᱠᱟᱛᱷᱟ ᱠᱚ', tam_Taml: 'முக்கிய கருத்துக்கள்', eng_Latn: 'Key Concepts In This Section' },

  // Doubt Drawer
  'doubt.title': { hin_Deva: 'एआई शंका निवारण शिक्षक (RAG)', sat_Olck: 'AI ᱠᱩᱠᱞᱤ ᱥᱚᱞᱦᱮ ᱢᱟᱪᱮᱫ (RAG)', tam_Taml: 'AI சந்தேக தீர்வு ஆசிரியர்', eng_Latn: 'AI Doubt-Solving Tutor (RAG)' },
  'doubt.subtitle': { hin_Deva: 'कक्षा के पाठ्यक्रम और पाठ्यपुस्तक से सीधे प्रमाणित', sat_Olck: 'ᱯᱟᱴᱷ ᱯᱚᱛᱚᱵ ᱠᱷᱚᱱ ᱥᱟᱹᱨᱤ ᱛᱮᱞᱟ', tam_Taml: 'பாடப்புத்தகத்தின் நேரடி சான்றுகளுடன்', eng_Latn: 'Strictly grounded in your NCERT/State Board chapter' },
  'doubt.suggested': { hin_Deva: 'इस पाठ के लिए सुझाई गई शंकाएं:', sat_Olck: 'ᱱᱚᱶᱟ ᱯᱟᱴᱷ ᱨᱮᱱᱟᱜ ᱠᱩᱠᱞᱤ ᱠᱚ:', tam_Taml: 'பரிந்துரைக்கப்பட்ட கேள்விகள்:', eng_Latn: 'Suggested Doubts for this Lesson' },
  'doubt.grounded_in': { hin_Deva: 'प्रमाणित स्रोत:', sat_Olck: 'ᱥᱟᱹᱨᱤ ᱡᱟᱭᱜᱟ:', tam_Taml: 'ஆதார பகுதி:', eng_Latn: 'Grounded in:' },
  'doubt.page': { hin_Deva: 'पृष्ठ संख्या', sat_Olck: 'ᱥᱟᱦᱴᱟ ᱮᱞ', tam_Taml: 'பக்கம்', eng_Latn: 'Page' },

  // Teacher & Live Streaming
  'live.studio_title': { hin_Deva: 'कक्षा सीधा प्रसारण बहुभाषी अनुवादक', sat_Olck: 'ᱪᱟᱱᱟᱪ ᱥᱚᱡᱷᱮ ᱛᱚᱨᱡᱚᱢᱟ ᱥᱴᱩᱰᱤᱭᱳ', tam_Taml: 'நேரடி வகுப்பறை பன்மொழி மொழிபெயர்ப்பகம்', eng_Latn: 'Live Classroom Real-Time Translator' },
  'live.mic_start': { hin_Deva: 'माइक प्रसारण शुरू करें', sat_Olck: 'ᱢᱟᱭᱤᱠ ᱮᱦᱚᱵ', tam_Taml: 'மைக் தொடங்கு', eng_Latn: 'Start Mic Stream' },
  'live.mic_stop': { hin_Deva: 'प्रसारण रोकें', sat_Olck: 'ᱛᱷᱟᱠᱮᱫ ᱢᱮ', tam_Taml: 'நிறுத்து', eng_Latn: 'Stop Streaming' },
  'live.students_connected': { hin_Deva: '३४ छात्र जुड़े हुए हैं', sat_Olck: '᱓᱔ ᱪᱮᱪᱮᱫᱤᱭᱟᱹ ᱢᱮᱱᱟᱜ ᱠᱚᱣᱟ', tam_Taml: '34 மாணவர்கள் இணைக்கப்பட்டுள்ளனர்', eng_Latn: '34 Students Connected' },
  'live.quick_prompts': { hin_Deva: 'त्वरित शिक्षण वाक्य (क्लिक करके तुरंत प्रसारित करें):', sat_Olck: 'ᱞᱟᱹᱭ ᱞᱟᱹᱜᱤᱫ ᱠᱟᱛᱷᱟ ᱠᱚ:', tam_Taml: 'விரைவு கற்பித்தல் வாக்கியங்கள்:', eng_Latn: 'Quick Teaching Prompts (Click to Broadcast Instantly)' },
  'live.history': { hin_Deva: 'सत्र अनुवाद इतिहास', sat_Olck: 'ᱛᱚᱨᱡᱚᱢᱟ ᱱᱟᱜᱟᱢ', tam_Taml: 'மொழிபெயர்ப்பு வரலாறு', eng_Latn: 'Session Subtitle History' },

  // Teacher Copilot
  'copilot.title': { hin_Deva: 'शिक्षक पाठ सामग्री सहायक एवं कार्यपत्रक जनरेटर', sat_Olck: 'ᱢᱟᱪᱮᱫ ᱯᱟᱴᱷ ᱥᱟᱯᱲᱟᱣ ᱦᱟᱹᱛᱭᱟᱹᱨ', tam_Taml: 'பாட உள்ளடக்க உதவியாளர் & பணித்தாள் இயற்றி', eng_Latn: 'Teacher Content Copilot & Generator' },
  'copilot.worksheet_tab': { hin_Deva: 'कार्यपत्रक बनाएं', sat_Olck: 'ᱠᱟᱹᱢᱤ ᱥᱟᱠᱟᱢ', tam_Taml: 'பணித்தாள் உருவாக்கு', eng_Latn: 'Auto-Worksheet' },
  'copilot.story_tab': { hin_Deva: 'सचित्र कहानी बनाएं', sat_Olck: 'ᱥᱟᱶᱛᱟ ᱠᱟᱹᱦᱱᱤ', tam_Taml: 'படக் கதை உருவாக்கு', eng_Latn: 'Illustrated Story' },
  'copilot.publish_btn': { hin_Deva: 'स्वीकृत करें और कक्षा ५ को भेजें', sat_Olck: 'ᱥᱟᱨᱦᱟᱣ ᱟᱨ ᱪᱟᱱᱟᱪ ᱕ ᱠᱚ ᱮᱢᱟ', tam_Taml: 'அங்கீகரித்து மாணவர்களுக்கு அனுப்பு', eng_Latn: 'Approve & Publish to Class' },

  // Admin & Heatmap
  'admin.heatmap_title': {
    hin_Deva: 'राष्ट्रीय मातृभाषा अधिगम एवं एआई मॉडल कवरेज हीटमैप',
    sat_Olck: 'ᱡᱟᱹᱛᱤᱭᱟᱹᱨᱤ ᱯᱟᱹᱨᱥᱤ ᱟᱨ AI ᱢᱚᱰᱮᱞ ᱦᱤᱴᱢᱮᱯ',
    tam_Taml: 'தேசிய தாய்மொழி கற்றல் & AI மாதிரி இடைவெளி வரைபடம்',
    eng_Latn: 'National Vernacular Language-Gap Heatmap',
  },
  'admin.export_report': {
    hin_Deva: 'नीतिगत रिपोर्ट डाउनलोड करें',
    sat_Olck: 'ᱨᱤᱯᱳᱨᱴ ᱰᱟᱣᱩᱱᱞᱳᱰ ᱢᱮ',
    tam_Taml: 'அறிக்கையைப் பதிவிறக்கு',
    eng_Latn: 'Export Policy Report',
  },
  'admin.enrolled_students': {
    hin_Deva: 'कुल नामांकित बहुभाषी छात्र',
    sat_Olck: 'ᱞᱮᱠᱷᱟ ᱪᱮᱪᱮᱫᱤᱭᱟᱹ ᱠᱚ',
    tam_Taml: 'மொத்த மாணவர்கள்',
    eng_Latn: 'Enrolled Vernacular Students',
  },
  'admin.comprehension_gain': {
    hin_Deva: 'मातृभाषा में समझ वृद्धि',
    sat_Olck: 'ᱵᱩᱡᱷᱟᱹᱣ ᱨᱮᱱᱟᱜ ᱵᱟᱹᱲᱛᱤ',
    tam_Taml: 'புரிதல் வளர்ச்சி விகிதம்',
    eng_Latn: 'Comprehension Gain (NEP)',
  },
  'admin.tribal_hours': {
    hin_Deva: 'एकत्रित जनजातीय ध्वनि संग्रह',
    sat_Olck: 'ᱡᱟᱣᱨᱟ ᱟᱠᱟᱱ ᱟᱹᱫᱤᱵᱟᱹᱥᱤ ᱨᱟᱦᱟ',
    tam_Taml: 'சேகரிக்கப்பட்ட குரல் நேரம்',
    eng_Latn: 'Tribal Speech Corpus Hours',
  },
  'admin.connected_schools': {
    hin_Deva: 'संबद्ध ग्रामीण विद्यालय',
    sat_Olck: 'ᱡᱚᱲᱟᱣ ᱟᱥᱲᱟ ᱠᱚ',
    tam_Taml: 'இணைக்கப்பட்ட பள்ளிகள்',
    eng_Latn: 'Connected Rural Schools',
  },
  'admin.ai_accuracy': { hin_Deva: 'एआई मॉडल सटीकता', sat_Olck: 'AI ᱢᱚᱰᱮᱞ ᱥᱟᱹᱨᱤ', tam_Taml: 'AI மாதிரி துல்லியம்', eng_Latn: 'AI Model Accuracy' },
  'admin.content_depth': { hin_Deva: 'पाठ्यक्रम सामग्री गहराई', sat_Olck: 'ᱯᱟᱴᱷ ᱯᱚᱛᱚᱵ ᱜᱟᱹᱦᱤᱨ', tam_Taml: 'பாடத்திட்ட ஆழம்', eng_Latn: 'Curriculum Content Depth' },
  'admin.action_plan': { hin_Deva: 'जिला कार्य योजना', sat_Olck: 'ᱡᱤᱞᱟᱹ ᱠᱟᱹᱢᱤ ᱦᱚᱨᱟ', tam_Taml: 'மாவட்ட செயல் திட்டம்', eng_Latn: 'District Action Plan' },

  // Footer
  'footer.copyright': {
    hin_Deva: '© २०२६ भाषासेतु • राष्ट्रीय बहुभाषी शिक्षा मिशन',
    sat_Olck: '© ᱒᱐᱒᱖ ᱵᱷᱟᱥᱟᱥᱮᱛᱩ • ᱡᱟᱹᱛᱤᱭᱟᱹᱨᱤ ᱥᱮᱪᱮᱫ ᱢᱤᱥᱚᱱ',
    tam_Taml: '© 2026 பாஷாசேது • தேசிய பன்மொழி கல்வி இயக்கம்',
    eng_Latn: '© 2026 BhashaSetu • National Multilingual Pedagogy Platform',
  },
  'footer.tagline': {
    hin_Deva: 'भारत के हर बच्चे के लिए मातृभाषा में गुणवत्तापूर्ण शिक्षा।',
    sat_Olck: 'ᱵᱷᱟᱨᱚᱛ ᱨᱮᱱ ᱥᱟᱱᱟᱢ ᱜᱤᱫᱽᱨᱟᱹ ᱞᱟᱹᱜᱤᱫ ᱟᱭᱳ ᱟᱲᱟᱝ ᱛᱮ ᱥᱮᱪᱮᱫ᱾',
    tam_Taml: 'இந்தியாவின் ஒவ்வொரு குழந்தைக்கும் தாய்மொழியில் தரமான கல்வி.',
    eng_Latn: 'Quality mother-tongue education for every child across India.',
  },
};

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string, defaultVal?: string) => string;
  trans: (obj: Record<string, string> | string, defaultVal?: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'hin_Deva',
  setLanguage: () => {},
  t: (key, defaultVal) => defaultVal || key,
  trans: (obj, defaultVal) => (typeof obj === 'string' ? obj : defaultVal || ''),
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>('hin_Deva');

  // Sync from localStorage if available
  useEffect(() => {
    const saved = localStorage.getItem('bhashasetu_pref_lang') as LanguageCode;
    if (saved && SUPPORTED_LANGUAGES.some((l) => l.code === saved)) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (newLang: LanguageCode) => {
    setLanguageState(newLang);
    try {
      localStorage.setItem('bhashasetu_pref_lang', newLang);
    } catch (e) {}
  };

  // We add dynamic translations state
  const [dynamicTranslations, setDynamicTranslations] = useState<Record<string, Record<string, string>>>({});
  
  // Track ongoing translation requests to avoid duplicates
  const translatingKeys = React.useRef(new Set<string>());

  const t = (key: string, defaultVal?: string): string => {
    const entry = DASHBOARD_TRANSLATIONS[key];
    
    // 1. Direct match from static dictionary
    if (entry && entry[language]) return entry[language];
    
    // 2. Direct match from dynamic cache
    if (dynamicTranslations[key] && dynamicTranslations[key][language]) {
      return dynamicTranslations[key][language];
    }

    // 3. Determine fallback text to show while translating
    // If we have an entry, prefer hindi/english from it. Otherwise use the default value.
    const fallbackText = (entry && (entry.hin_Deva || entry.eng_Latn)) || defaultVal || key;
    
    // 4. Trigger dynamic translation
    if (!translatingKeys.current.has(`${key}-${language}`) && typeof window !== 'undefined') {
      translatingKeys.current.add(`${key}-${language}`);
      // Asynchronously fetch and update
      import('./api').then(({ translateText }) => {
        // If the source text is clearly english based on it being the defaultVal, we should tell the API the source is eng_Latn
        const sourceLang = (entry && entry.hin_Deva) ? 'hin_Deva' : 'eng_Latn';
        
        translateText(fallbackText, sourceLang, language).then(translated => {
          setDynamicTranslations(prev => ({
            ...prev,
            [key]: {
              ...(prev[key] || {}),
              [language]: translated
            }
          }));
        });
      });
    }

    // Return fallback while loading
    return fallbackText;
  };

  const trans = (obj: Record<string, string> | string, defaultVal: string = ''): string => {
    if (typeof obj === 'string') return obj;
    if (!obj) return defaultVal;

    // Check by language code
    if (obj[language]) return obj[language];

    // Check script keys (native, devanagari, roman)
    if (language === 'hin_Deva' && (obj.devanagari || obj.native)) return obj.devanagari || obj.native;
    if (language === 'eng_Latn' && (obj.roman || obj.native)) return obj.roman || obj.native;
    
    // We could make this dynamic too by generating a hash key, but for now we fallback
    if (obj.native) return obj.native;

    return defaultVal || Object.values(obj)[0] || '';
  };

  // Provide the current state as context value
  const contextValue = React.useMemo(() => ({
    language,
    setLanguage,
    t,
    trans
  }), [language, dynamicTranslations]);

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
