import { Lesson } from '../types';

export const SEEDED_LESSONS: Lesson[] = [
  // -------------------------------------------------------------
  // LESSON 1: Science - Photosynthesis (Hindi)
  // -------------------------------------------------------------
  {
    id: 'sci-grade5-photo-hi',
    language: 'hin_Deva',
    subject: 'Science',
    grade: 5,
    durationMinutes: 8,
    coverImage: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&auto=format&fit=crop&q=80',
    sourceCurriculum: 'NCERT',
    reviewStatus: 'Verified by Teacher',
    offlineAvailable: true,
    title: {
      native: 'पादपों में पोषण और प्रकाश संश्लेषण',
      devanagari: 'पादपों में पोषण और प्रकाश संश्लेषण',
      roman: 'Paadapon mein Poshan aur Prakash Sanshleshan',
    },
    overview: {
      native: 'इस पाठ में हम सीखेंगे कि हरे पौधे सूर्य के प्रकाश, जल और कार्बन डाइऑक्साइड से अपना भोजन कैसे बनाते हैं।',
      devanagari: 'इस पाठ में हम सीखेंगे कि हरे पौधे सूर्य के प्रकाश, जल और कार्बन डाइऑक्साइड से अपना भोजन कैसे बनाते हैं।',
      roman: 'Is path mein hum seekhenge ki hare paudhe surya ke prakash, jal aur carbon dioxide se apna bhojan kaise banate hain.',
    },
    sections: [
      {
        id: 'sec-1',
        title: {
          native: '1. पौधे अपना भोजन स्वयं बनाते हैं',
          devanagari: '1. पौधे अपना भोजन स्वयं बनाते हैं',
          roman: '1. Paudhe apna bhojan swayam banate hain',
        },
        content: {
          native: 'हरे पौधों की पत्तियों में एक हरा वर्णक होता है जिसे क्लोरोफिल कहते हैं। क्लोरोफिल सूर्य के प्रकाश की ऊर्जा को ग्रहण करता है। जड़ें मिट्टी से जल और खनिज लवण अवशोषित करती हैं।',
          devanagari: 'हरे पौधों की पत्तियों में एक हरा वर्णक होता है जिसे क्लोरोफिल कहते हैं। क्लोरोफिल सूर्य के प्रकाश की ऊर्जा को ग्रहण करता है। जड़ें मिट्टी से जल और खनिज लवण अवशोषित करती हैं।',
          roman: 'Hare paudhon ki pattiyon mein ek hara varnak hota hai jise Chlorophyll kehte hain. Chlorophyll surya ke prakash ki oorja ko grahan karta hai. Jaden mitti se jal aur khanij lavan avshoshit karti hain.',
        },
        keyConcepts: ['chlorophyll', 'photosynthesis', 'roots', 'absorption'],
        illustrationPrompt: 'Green leaf cell structure absorbing golden sunlight with water droplets',
        imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80',
        timedWords: [
          { id: 'w1', word: 'हरे', startTime: 0.0, endTime: 0.5 },
          { id: 'w2', word: 'पौधों', startTime: 0.5, endTime: 1.0 },
          { id: 'w3', word: 'की', startTime: 1.0, endTime: 1.3 },
          { id: 'w4', word: 'पत्तियों', startTime: 1.3, endTime: 2.0 },
          { id: 'w5', word: 'में', startTime: 2.0, endTime: 2.3 },
          { id: 'w6', word: 'एक', startTime: 2.3, endTime: 2.7 },
          { id: 'w7', word: 'हरा', startTime: 2.7, endTime: 3.2 },
          { id: 'w8', word: 'वर्णक', startTime: 3.2, endTime: 3.8 },
          { id: 'w9', word: 'होता', startTime: 3.8, endTime: 4.2 },
          { id: 'w10', word: 'है', startTime: 4.2, endTime: 4.5 },
          { id: 'w11', word: 'जिसे', startTime: 4.5, endTime: 5.0 },
          { id: 'w12', word: 'क्लोरोफिल', startTime: 5.0, endTime: 6.0 },
          { id: 'w13', word: 'कहते', startTime: 6.0, endTime: 6.5 },
          { id: 'w14', word: 'हैं।', startTime: 6.5, endTime: 7.0 },
          { id: 'w15', word: 'क्लोरोफिल', startTime: 7.2, endTime: 8.1 },
          { id: 'w16', word: 'सूर्य', startTime: 8.1, endTime: 8.7 },
          { id: 'w17', word: 'के', startTime: 8.7, endTime: 9.0 },
          { id: 'w18', word: 'प्रकाश', startTime: 9.0, endTime: 9.6 },
          { id: 'w19', word: 'की', startTime: 9.6, endTime: 9.9 },
          { id: 'w20', word: 'ऊर्जा', startTime: 9.9, endTime: 10.5 },
          { id: 'w21', word: 'को', startTime: 10.5, endTime: 10.8 },
          { id: 'w22', word: 'ग्रहण', startTime: 10.8, endTime: 11.4 },
          { id: 'w23', word: 'करता', startTime: 11.4, endTime: 11.9 },
          { id: 'w24', word: 'है।', startTime: 11.9, endTime: 12.3 },
        ],
      },
      {
        id: 'sec-2',
        title: {
          native: '2. प्रकाश संश्लेषण की रासायनिक क्रिया',
          devanagari: '2. प्रकाश संश्लेषण की रासायनिक क्रिया',
          roman: '2. Prakash Sanshleshan ki Rasayanik Kriya',
        },
        content: {
          native: 'पत्तियां वायु से कार्बन डाइऑक्साइड लेती हैं और सूर्य के प्रकाश की उपस्थिति में ग्लूकोज और ऑक्सीजन बनाती हैं। ऑक्सीजन गैस रंध्रों (स्टोमेटा) द्वारा वातावरण में छोड़ी जाती है।',
          devanagari: 'पत्तियां वायु से कार्बन डाइऑक्साइड लेती हैं और सूर्य के प्रकाश की उपस्थिति में ग्लूकोज और ऑक्सीजन बनाती हैं। ऑक्सीजन गैस रंध्रों (स्टोमेटा) द्वारा वातावरण में छोड़ी जाती है।',
          roman: 'Pattiyan vaayu se carbon dioxide leti hain aur surya ke prakash ki upasthiti mein glucose aur oxygen banati hain. Oxygen gas randhron (stomata) dwara vatavaran mein chhodi jaati hai.',
        },
        keyConcepts: ['carbon dioxide', 'glucose', 'oxygen', 'stomata'],
        illustrationPrompt: 'Diagram showing sunlight, CO2 entering leaf and Oxygen + Glucose produced',
        imageUrl: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?w=800&auto=format&fit=crop&q=80',
        timedWords: [
          { id: 's2_1', word: 'पत्तियां', startTime: 0.0, endTime: 0.8 },
          { id: 's2_2', word: 'वायु', startTime: 0.8, endTime: 1.3 },
          { id: 's2_3', word: 'से', startTime: 1.3, endTime: 1.6 },
          { id: 's2_4', word: 'कार्बन', startTime: 1.6, endTime: 2.2 },
          { id: 's2_5', word: 'डाइऑक्साइड', startTime: 2.2, endTime: 3.1 },
          { id: 's2_6', word: 'लेती', startTime: 3.1, endTime: 3.6 },
          { id: 's2_7', word: 'हैं', startTime: 3.6, endTime: 4.0 },
          { id: 's2_8', word: 'और', startTime: 4.0, endTime: 4.4 },
          { id: 's2_9', word: 'सूर्य', startTime: 4.4, endTime: 5.0 },
          { id: 's2_10', word: 'के', startTime: 5.0, endTime: 5.3 },
          { id: 's2_11', word: 'प्रकाश', startTime: 5.3, endTime: 6.0 },
          { id: 's2_12', word: 'में', startTime: 6.0, endTime: 6.3 },
          { id: 's2_13', word: 'ग्लूकोज', startTime: 6.3, endTime: 7.1 },
          { id: 's2_14', word: 'और', startTime: 7.1, endTime: 7.5 },
          { id: 's2_15', word: 'ऑक्सीजन', startTime: 7.5, endTime: 8.3 },
          { id: 's2_16', word: 'बनाती', startTime: 8.3, endTime: 8.9 },
          { id: 's2_17', word: 'हैं।', startTime: 8.9, endTime: 9.3 },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'q-hi-1',
        lessonId: 'sci-grade5-photo-hi',
        sectionId: 'sec-1',
        difficulty: 'easy',
        conceptTag: 'chlorophyll',
        question: {
          native: 'पत्तियों का हरा रंग किस वर्णक के कारण होता है?',
          devanagari: 'पत्तियों का हरा रंग किस वर्णक के कारण होता है?',
          roman: 'Pattiyon ka hara rang kis varnak ke kaaran hota hai?',
        },
        options: [
          {
            id: 'opt-1',
            text: { native: 'क्लोरोफिल (Chlorophyll)', devanagari: 'क्लोरोफिल', roman: 'Chlorophyll' },
            isCorrect: true,
            explanation: {
              native: 'सही! क्लोरोफिल पत्तियों को हरा रंग देता है और सौर ऊर्जा अवशोषित करता है।',
              devanagari: 'सही! क्लोरोफिल पत्तियों को हरा रंग देता है और सौर ऊर्जा अवशोषित करता है।',
              roman: 'Sahi! Chlorophyll pattiyon ko hara rang deta hai.',
            },
          },
          {
            id: 'opt-2',
            text: { native: 'हीमोग्लोबिन', devanagari: 'हीमोग्लोबिन', roman: 'Hemoglobin' },
            isCorrect: false,
            explanation: { native: 'गलत, हीमोग्लोबिन मानव रक्त में पाया जाता है।', devanagari: 'गलत', roman: 'Galat' },
          },
          {
            id: 'opt-3',
            text: { native: 'मेलेनिन', devanagari: 'मेलेनिन', roman: 'Melanin' },
            isCorrect: false,
            explanation: { native: 'गलत, मेलेनिन त्वचा का रंग निर्धारित करता है।', devanagari: 'गलत', roman: 'Galat' },
          },
        ],
      },
      {
        id: 'q-hi-2',
        lessonId: 'sci-grade5-photo-hi',
        sectionId: 'sec-2',
        difficulty: 'medium',
        conceptTag: 'photosynthesis-products',
        question: {
          native: 'प्रकाश संश्लेषण के दौरान पौधे कौन सी गैस वातावरण में छोड़ते हैं?',
          devanagari: 'प्रकाश संश्लेषण के दौरान पौधे कौन सी गैस वातावरण में छोड़ते हैं?',
          roman: 'Prakash sanshleshan ke dauran paudhe kaun si gas vatavaran mein chhodte hain?',
        },
        options: [
          {
            id: 'opt-21',
            text: { native: 'ऑक्सीजन (Oxygen)', devanagari: 'ऑक्सीजन', roman: 'Oxygen' },
            isCorrect: true,
            explanation: {
              native: 'शाबाश! पौधे प्रकाश संश्लेषण में ऑक्सीजन गैस छोड़ते हैं जो हमारे सांस लेने के काम आती है।',
              devanagari: 'शाबाश! पौधे प्रकाश संश्लेषण में ऑक्सीजन गैस छोड़ते हैं।',
              roman: 'Shabash! Paudhe oxygen gas chhodte hain.',
            },
          },
          {
            id: 'opt-22',
            text: { native: 'कार्बन डाइऑक्साइड', devanagari: 'कार्बन डाइऑक्साइड', roman: 'Carbon Dioxide' },
            isCorrect: false,
            explanation: { native: 'पौधे कार्बन डाइऑक्साइड ग्रहण करते हैं, छोड़ते नहीं।', devanagari: 'गलत', roman: 'Galat' },
          },
          {
            id: 'opt-23',
            text: { native: 'नाइट्रोजन', devanagari: 'नाइट्रोजन', roman: 'Nitrogen' },
            isCorrect: false,
            explanation: { native: 'गलत विकल्प।', devanagari: 'गलत', roman: 'Galat' },
          },
        ],
      },
    ],
  },

  // -------------------------------------------------------------
  // LESSON 2: Science - Photosynthesis (Santali - Ol Chiki & Roman)
  // -------------------------------------------------------------
  {
    id: 'sci-grade5-photo-sat',
    language: 'sat_Olck',
    subject: 'Science',
    grade: 5,
    durationMinutes: 8,
    coverImage: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&auto=format&fit=crop&q=80',
    sourceCurriculum: 'BhashaSetu Tribal Initiative',
    reviewStatus: 'Community Reviewed',
    offlineAvailable: true,
    title: {
      native: 'ᱫᱟᱨᱮ ᱨᱮ ᱡᱚᱢᱟᱜ ᱛᱮᱭᱟᱨ (ᱯᱷᱳᱴᱳᱥᱤᱱᱛᱷᱮᱥᱤᱥ)',
      devanagari: 'दारे रे जोमाग् तेयार् (फोटोसिंथेसिस)',
      roman: 'Dare re jomag teyar (Photosynthesis)',
    },
    overview: {
      native: 'ᱱᱚᱶᱟ ᱯᱟᱴᱷ ᱨᱮ ᱟᱵᱚ ᱵᱚᱱ ᱪᱮᱫᱚᱜᱼᱟ ᱡᱮ ᱦᱟᱹᱨᱭᱟᱹᱲ ᱫᱟᱨᱮ ᱠᱚ ᱥᱤᱧ ᱪᱟᱸᱫᱚ ᱨᱮᱭᱟᱜ ᱢᱟᱨᱥᱟᱞ, ᱫᱟᱜ ᱟᱨ ᱦᱚᱭ ᱛᱮ ᱪᱮᱫ ᱞᱮᱠᱟ ᱡᱚᱢᱟᱜ ᱠᱚ ᱛᱮᱭᱟᱨᱟ᱾',
      devanagari: 'नोवा पाठ रे आबो बोन चेदोग-आ जे हरियड़ दारे को सिंग चांदाे रेयाग मार्सल, दाग आर होय ते चेद लेका जोमाग को तेयारा।',
      roman: 'Nowa path re abo bon chedoga je hariyad dare ko sin chando reak marsal, dak ar hoy te ched leka jomag ko teyara.',
    },
    sections: [
      {
        id: 'sec-sat-1',
        title: {
          native: '᱑. ᱫᱟᱨᱮ ᱱᱤᱡᱮ ᱛᱮ ᱡᱚᱢᱟᱜ ᱠᱚ ᱛᱮᱭᱟᱨᱟ',
          devanagari: '१. दारे निजे ते जोमाग को तेयारा',
          roman: '1. Dare nije te jomag ko teyara',
        },
        content: {
          native: 'ᱦᱟᱹᱨᱭᱟᱹᱲ ᱥᱟᱠᱟᱢ ᱨᱮ ᱢᱤᱫ ᱦᱟᱹᱨᱭᱟᱹᱲ ᱨᱚᱝ ᱛᱟᱦᱮᱸᱱᱟ ᱡᱟᱦᱟᱸ ᱫᱚ ᱠᱞᱳᱨᱳᱯᱷᱤᱞ (Chlorophyll) ᱠᱚ ᱢᱮᱛᱟᱜᱼᱟ᱾ ᱱᱚᱶᱟ ᱠᱞᱳᱨᱳᱯᱷᱤᱞ ᱥᱤᱧ ᱪᱟᱸᱫᱚ ᱢᱟᱨᱥᱟᱞ ᱨᱮᱱᱟᱜ ᱫᱟᱲᱮ ᱟᱯᱱᱟᱨᱟᱭ᱾ ᱨᱮᱦᱮᱫ ᱠᱚ ᱦᱟᱥᱟ ᱠᱷᱚᱱ ᱫᱟᱜ ᱠᱚ ᱚᱨ ᱦᱟᱞᱟᱝ ᱮᱫᱟ᱾',
          devanagari: 'हरियड़ साकाम रे मिद हरियड़ रंग ताहेना जांहा दो क्लोरोफिल को मेतागा। नोवा क्लोरोफिल सिंग चांदाे मार्सल रेनाग दाड़े आपनाराय। रेहेद को हासा खोन दाग को ओर हालांग एदा।',
          roman: 'Hariyad sakam re mid hariyad rong tahena jaha do Chlorophyll ko metaga. Nowa Chlorophyll sin chando marsal renag dare apnaraya. Rehed ko hasa khon dak ko or halang eda.',
        },
        keyConcepts: ['chlorophyll', 'roots', 'sunlight', 'santali-tribal-pedagogy'],
        illustrationPrompt: 'Tribal forest setting with Sal trees absorbing natural sunlight in Jharkhand',
        imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80',
        timedWords: [
          { id: 'sw1', word: 'ᱦᱟᱹᱨᱭᱟᱹᱲ', startTime: 0.0, endTime: 0.7 },
          { id: 'sw2', word: 'ᱥᱟᱠᱟᱢ', startTime: 0.7, endTime: 1.3 },
          { id: 'sw3', word: 'ᱨᱮ', startTime: 1.3, endTime: 1.6 },
          { id: 'sw4', word: 'ᱢᱤᱫ', startTime: 1.6, endTime: 2.0 },
          { id: 'sw5', word: 'ᱦᱟᱹᱨᱭᱟᱹᱲ', startTime: 2.0, endTime: 2.6 },
          { id: 'sw6', word: 'ᱨᱚᱝ', startTime: 2.6, endTime: 3.0 },
          { id: 'sw7', word: 'ᱛᱟᱦᱮᱸᱱᱟ', startTime: 3.0, endTime: 3.6 },
          { id: 'sw8', word: 'ᱡᱟᱦᱟᱸ', startTime: 3.6, endTime: 4.1 },
          { id: 'sw9', word: 'ᱫᱚ', startTime: 4.1, endTime: 4.4 },
          { id: 'sw10', word: 'ᱠᱞᱳᱨᱳᱯᱷᱤᱞ', startTime: 4.4, endTime: 5.4 },
          { id: 'sw11', word: 'ᱠᱚ', startTime: 5.4, endTime: 5.7 },
          { id: 'sw12', word: 'ᱢᱮᱛᱟᱜᱼᱟ᱾', startTime: 5.7, endTime: 6.4 },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'q-sat-1',
        lessonId: 'sci-grade5-photo-sat',
        sectionId: 'sec-sat-1',
        difficulty: 'easy',
        conceptTag: 'chlorophyll',
        question: {
          native: 'ᱫᱟᱨᱮ ᱥᱟᱠᱟᱢ ᱨᱮ ᱦᱟᱹᱨᱭᱟᱹᱲ ᱨᱚᱝ ᱪᱮᱫ ᱠᱷᱟᱹᱛᱤᱨ ᱛᱟᱦᱮᱸᱱᱟ?',
          devanagari: 'दारे साकाम रे हरियड़ रंग चेद खातिर ताहेना?',
          roman: 'Dare sakam re hariyad rong ched khatir tahena?',
        },
        options: [
          {
            id: 'sopt-1',
            text: { native: 'ᱠᱞᱳᱨᱳᱯᱷᱤᱞ (Chlorophyll)', devanagari: 'क्लोरोफिल', roman: 'Chlorophyll' },
            isCorrect: true,
            explanation: {
              native: 'ᱥᱟᱹᱨᱤ ᱜᱮᱭᱟ! ᱠᱞᱳᱨᱳᱯᱷᱤᱞ ᱫᱟᱨᱮ ᱥᱟᱠᱟᱢ ᱦᱟᱹᱨᱭᱟᱹᱲ ᱮ ᱫᱚᱦᱚᱭᱟ ᱟᱨ ᱢᱟᱨᱥᱟᱞ ᱮ ᱦᱟᱛᱟᱣᱟ᱾',
              devanagari: 'सारी गेया! क्लोरोफिल दारे साकाम हरियड़ ए दोहोया।',
              roman: 'Sari geya! Chlorophyll dare sakam hariyad e dohoya.',
            },
          },
          {
            id: 'sopt-2',
            text: { native: 'ᱫᱟᱜ (Water)', devanagari: 'दाग', roman: 'Dak' },
            isCorrect: false,
            explanation: { native: 'ᱵᱟᱝ, ᱫᱟᱜ ᱫᱚ ᱨᱚᱝ ᱵᱟᱭ ᱮᱢᱟᱜᱼᱟ᱾', devanagari: 'गलत', roman: 'Bang' },
          },
        ],
      },
    ],
  },

  // -------------------------------------------------------------
  // LESSON 3: Science - Photosynthesis (Tamil)
  // -------------------------------------------------------------
  {
    id: 'sci-grade5-photo-ta',
    language: 'tam_Taml',
    subject: 'Science',
    grade: 5,
    durationMinutes: 8,
    coverImage: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&auto=format&fit=crop&q=80',
    sourceCurriculum: 'Tamil Nadu State Board',
    reviewStatus: 'Verified by Teacher',
    offlineAvailable: true,
    title: {
      native: 'தாவரங்களின் ஊட்டச்சத்து மற்றும் ஒளிச்சேர்க்கை',
      devanagari: 'तावरंगळिन् ऊट्टच्चत्तु मट्रुम् ओळिच्चेर्कै',
      roman: 'Thaavarangalin Oottachathu matrum Olicheerkkai',
    },
    overview: {
      native: 'பசுமையான தாவரங்கள் சூரிய ஒளி, நீர் மற்றும் கார்பன் டை ஆக்சைடு ஆகியவற்றைப் பயன்படுத்தி எவ்வாறு உணவு தயாரிக்கின்றன என்பதைப் பற்றி நாம் கற்போம்.',
      devanagari: 'पसुमैयान तावरंगळ् सूर्य ओळि, नीर् मट्रुम् कार्बन डाई ऑक्साइड...',
      roman: 'Pasumaiyaana thaavarangal sooriya oli, neer matrum carbon dioxide aagiyavatrai payanpaduthi evvaaru unavu thayarikkindrana enbathai patri naam karpom.',
    },
    sections: [
      {
        id: 'sec-ta-1',
        title: {
          native: '1. பச்சையம் மற்றும் சூரிய ஒளி',
          devanagari: '1. पच्चैयम् मट्रुम् सूर्य ओळि',
          roman: '1. Pachaiyam matrum Sooriya Oli',
        },
        content: {
          native: 'தாவர இலைகளில் பச்சையம் (Chlorophyll) என்ற நிறமி உள்ளது. இது சூரிய ஒளியின் ஆற்றலை உறிஞ்சுகிறது. வேர்கள் மண்ணிலிருந்து நீரையும் தாதுக்களையும் உறிஞ்சுகின்றன.',
          devanagari: 'तावर इलैगळिल् पच्चैयम् (Chlorophyll) एन्ड्रा निरमि उळ्ळदु...',
          roman: 'Thaavara ilaigalil pachaiyam (Chlorophyll) endra nirami ullathu. Ithu sooriya oliyin aatralai urinjugiradhu. Verkagal mannilirundhu neeraiyum thaadhukkalaiyum urinjugindrana.',
        },
        keyConcepts: ['chlorophyll', 'photosynthesis', 'roots'],
        illustrationPrompt: 'Green tropical leaf with sunlight ray highlighting chloroplasts',
        imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80',
        timedWords: [
          { id: 'tw1', word: 'தாவர', startTime: 0.0, endTime: 0.6 },
          { id: 'tw2', word: 'இலைகளில்', startTime: 0.6, endTime: 1.3 },
          { id: 'tw3', word: 'பச்சையம்', startTime: 1.3, endTime: 2.0 },
          { id: 'tw4', word: 'என்ற', startTime: 2.0, endTime: 2.4 },
          { id: 'tw5', word: 'நிறமி', startTime: 2.4, endTime: 2.9 },
          { id: 'tw6', word: 'உள்ளது.', startTime: 2.9, endTime: 3.5 },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'q-ta-1',
        lessonId: 'sci-grade5-photo-ta',
        sectionId: 'sec-ta-1',
        difficulty: 'easy',
        conceptTag: 'chlorophyll',
        question: {
          native: 'தாவர இலைகளுக்கு பச்சை நிறத்தை வழங்கும் நிறமி எது?',
          devanagari: 'तावर इलैगळुक्कु पच्चै निरत्तै वळंगुम् निरमि एदु?',
          roman: 'Thaavara ilaigalukku pachai nirathai vazhangum nirami ethu?',
        },
        options: [
          {
            id: 'topt-1',
            text: { native: 'பச்சையம் (Chlorophyll)', devanagari: 'पच्चैयम्', roman: 'Pachaiyam' },
            isCorrect: true,
            explanation: {
              native: 'சரி! பச்சையம் சூரிய ஒளியை உறிஞ்சி இலைகளுக்கு பச்சை நிறத்தை அளிக்கிறது.',
              devanagari: 'सरि! पच्चैयम् सूर्य ओळियै उरिंजुगिरदु.',
              roman: 'Sari! Pachaiyam sooriya oliyai urinji pachai nirathai alikkirathu.',
            },
          },
          {
            id: 'topt-2',
            text: { native: 'ஹீமோகுளோபின்', devanagari: 'हीमोग्लोबिन', roman: 'Hemoglobin' },
            isCorrect: false,
            explanation: { native: 'தவறு, இது மனித இரத்தத்தில் உள்ளது.', devanagari: 'तवरु', roman: 'Thavaru' },
          },
        ],
      },
    ],
  },

  // -------------------------------------------------------------
  // LESSON 4: Mathematics - Fractions (English & Hindi)
  // -------------------------------------------------------------
  {
    id: 'math-grade4-fractions-en',
    language: 'eng_Latn',
    subject: 'Mathematics',
    grade: 4,
    durationMinutes: 7,
    coverImage: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&auto=format&fit=crop&q=80',
    sourceCurriculum: 'NCERT',
    reviewStatus: 'Verified by Teacher',
    offlineAvailable: true,
    title: {
      native: 'Understanding Fractions: Equal Parts of a Whole',
      devanagari: 'अंडरस्टैंडिंग फ्रैक्शंस: इक्वल पार्ट्स ऑफ अ होल',
      roman: 'Understanding Fractions: Equal Parts of a Whole',
    },
    overview: {
      native: 'Learn how whole objects like rotis, pizzas, or shapes can be divided into equal pieces represented by numerators and denominators.',
      devanagari: 'सीखें कि कैसे पूरी वस्तुओं को बराबर भागों में बांटा जाता है...',
      roman: 'Learn how whole objects like rotis, pizzas, or shapes can be divided into equal pieces.',
    },
    sections: [
      {
        id: 'sec-en-1',
        title: {
          native: '1. What is a Fraction?',
          devanagari: '1. व्हाट इज अ फ्रैक्शन?',
          roman: '1. What is a Fraction?',
        },
        content: {
          native: 'A fraction represents a part of a whole. When a shape or object is divided into equal parts, each part is a fraction. For example, if a circular roti is cut into 4 equal pieces, each piece is 1/4 (one-fourth) of the roti.',
          devanagari: 'ए फ्रैक्शन रिप्रेजेंट्स अ पार्ट ऑफ अ होल...',
          roman: 'A fraction represents a part of a whole. When a shape is divided into equal parts, each part is a fraction.',
        },
        keyConcepts: ['numerator', 'denominator', 'equal parts', 'fractions'],
        illustrationPrompt: 'Circle cut into four equal quarters with one quarter highlighted brightly',
        imageUrl: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=800&auto=format&fit=crop&q=80',
        timedWords: [
          { id: 'ew1', word: 'A', startTime: 0.0, endTime: 0.2 },
          { id: 'ew2', word: 'fraction', startTime: 0.2, endTime: 0.7 },
          { id: 'ew3', word: 'represents', startTime: 0.7, endTime: 1.3 },
          { id: 'ew4', word: 'a', startTime: 1.3, endTime: 1.5 },
          { id: 'ew5', word: 'part', startTime: 1.5, endTime: 1.9 },
          { id: 'ew6', word: 'of', startTime: 1.9, endTime: 2.1 },
          { id: 'ew7', word: 'a', startTime: 2.1, endTime: 2.3 },
          { id: 'ew8', word: 'whole.', startTime: 2.3, endTime: 2.9 },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'q-en-1',
        lessonId: 'math-grade4-fractions-en',
        sectionId: 'sec-en-1',
        difficulty: 'easy',
        conceptTag: 'fractions-basic',
        question: {
          native: 'If a circle is divided into 4 equal slices and you eat 1 slice, what fraction of the circle did you eat?',
          devanagari: 'यदि एक वृत्त को 4 बराबर भागों में बांटा जाए और आप 1 भाग खाएं, तो आपने कितना भाग खाया?',
          roman: 'If a circle is divided into 4 equal slices and you eat 1 slice, what fraction did you eat?',
        },
        options: [
          {
            id: 'eopt-1',
            text: { native: '1/4', devanagari: '1/4', roman: '1/4' },
            isCorrect: true,
            explanation: {
              native: 'Correct! 1 is the numerator (parts eaten) and 4 is the denominator (total parts).',
              devanagari: 'सही! 1 अंश है और 4 हर है।',
              roman: 'Correct! 1/4 represents 1 part out of 4 total parts.',
            },
          },
          {
            id: 'eopt-2',
            text: { native: '3/4', devanagari: '3/4', roman: '3/4' },
            isCorrect: false,
            explanation: { native: '3/4 is the portion left over, not what you ate.', devanagari: 'गलत', roman: 'Incorrect' },
          },
        ],
      },
    ],
  },
];
