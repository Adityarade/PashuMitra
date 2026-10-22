import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, Mic, MicOff, Send, X, Bot, User, 
  Volume2, VolumeX, ShieldAlert, ArrowRight, RefreshCw, 
  ChevronDown, CheckCircle2, AlertTriangle, Stethoscope
} from 'lucide-react';
import { useLang } from '../context/LangContext';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  audioText?: string;
  timestamp: string;
  diseaseTag?: string;
  urgency?: 'critical' | 'high' | 'normal';
  actionRoute?: string;
  actionLabel?: string;
}

// Veterinary Clinical Knowledge Engine for offline-first AI
const CLINICAL_KNOWLEDGE: Array<{
  keywords: string[];
  disease: string;
  urgency: 'critical' | 'high' | 'normal';
  response: {
    en: string;
    hi: string;
    mr: string;
  };
  firstAid: {
    en: string[];
    hi: string[];
    mr: string[];
  };
}> = [
  {
    keywords: ['blister', 'ulcer', 'saliv', 'fever', 'mouth', 'hoof', 'drool', 'छाले', 'लार', 'मुंह', 'खुर', 'लाळ', 'तोंडात', 'फोड'],
    disease: 'Foot-and-Mouth Disease (FMD)',
    urgency: 'critical',
    response: {
      en: "Based on symptoms of oral/hoof ulcers, high pyrexia, and ropy salivation, this strongly matches Foot-and-Mouth Disease (FMD) Serotype O/A. Immediate biosecurity isolation is imperative.",
      hi: "मुंह और खुर में छाले, तेज बुखार और अत्यधिक लार टपकना खुरपका-मुंहपका (FMD) रोग का स्पष्ट संकेत है। इस पशु को तुरंत अन्य पशुओं से अलग करें।",
      mr: "तोंडात व खुरांमध्ये फोड, तीव्र ताप आणि लाळ गळणे हे खुरपका-मुखपका (FMD) रोगाचे लक्षण आहे. या जनावराला तात्काळ इतर जनावरांपासून वेगळे करा."
    },
    firstAid: {
      en: [
        "Isolate animal in closed paddock immediately; halt all inter-village grazing.",
        "Wash mouth ulcers gently with 1% Alum or 2% Sodium Bicarbonate solution.",
        "Apply 4% Sodium Carbonate antiseptic foot-bath at entry gates.",
        "Withhold milk from cooperative collection until paravet examination."
      ],
      hi: [
        "पशु को तुरंत अलग बाड़े में रखें; अन्य पशुओं के साथ चरने न भेजें।",
        "मुंह के छालों को 1% फिटकरी या 2% मीठा सोडा के घोल से धोएं।",
        "खुरों पर 4% धोने का सोडा (सोडियम कार्बोनेट) का घोल लगाएं।",
        "डॉक्टर की जांच तक दूध को डेयरी कलेक्शन में न भेजें।"
      ],
      mr: [
        "जनावराला तात्काळ वेगळ्या गोठ्यात ठेवा; चरायला नेणे बंद करा.",
        "तोंडातील फोड १% तुरटीच्या किंवा २% खाण्याच्या सोड्याच्या पाण्याने स्वच्छ करा.",
        "खुरांवर ४% वॉशिंग सोड्याच्या पाण्याचा वापर करा.",
        "पशुवैद्यकीय अधिकाऱ्यांच्या सल्ल्याशिवाय दूध डेअरीला घालू नका."
      ]
    }
  },
  {
    keywords: ['nodule', 'lump', 'skin', 'swelling', 'गांठ', 'त्वचा', 'गाठी', 'लंपी'],
    disease: 'Lumpy Skin Disease (LSD)',
    urgency: 'high',
    response: {
      en: "Circumscribed skin nodules (2-5cm) over the body and lymph node enlargement strongly suggest Lumpy Skin Disease (Capripoxvirus). Vector control is required.",
      hi: "शरीर पर 2-5 सेमी की गांठें और ग्रंथियों में सूजन लंपी स्किन रोग (LSD) की ओर संकेत करती हैं। मक्खी-मच्छर नियंत्रण तुरंत करें।",
      mr: "अंगावर २-५ सेंमी गाठी आणि लिम्फ नोड्स सुजणे हे लंपी त्वचा रोग (LSD) असल्याचे दर्शवते. डास व गोचीड नियंत्रण तात्काळ करा."
    },
    firstAid: {
      en: [
        "Spray cattle shed with Neem oil or repellent to control vectors (mosquitoes/ticks).",
        "Apply Methylene blue or Turmeric-Neem paste on burst skin nodules.",
        "Provide soft, easily digestible green fodder and clean electrolyte water."
      ],
      hi: [
        "मक्खी-मच्छरों से बचाव के लिए नीम के तेल का छिड़काव करें।",
        "फूटी हुई गांठों पर हल्दी और नीम का लेप या मिथाइलीन ब्लू लगाएं।",
        "पशु को सुपाच्य हरा चारा और स्वच्छ पानी दें।"
      ],
      mr: [
        "गोठ्यात डास व गोचीड नियंत्रणासाठी कडुनिंबाच्या तेलाची फवारणी करा.",
        "फुटलेल्या गाठींवर हळद व कडुनिंबाचा लेप किंवा मिथायलीन ब्लू लावा.",
        "जनावराला पचायला हलका हिरवा चारा आणि भरपूर पाणी द्या."
      ]
    }
  },
  {
    keywords: ['bloat', 'stomach', 'flank', 'gas', 'distended', 'पेट', 'अफारा', 'गैस', 'पोट फुगणे'],
    disease: 'Acute Bovine Tympanites (Bloat)',
    urgency: 'critical',
    response: {
      en: "Distension of the left flank indicates Acute Rumen Bloat. This is a medical emergency requiring rapid pressure relief before respiratory distress occurs.",
      hi: "बाईं तरफ पेट का असामान्य रूप से फूलना (अफारा/ब्लोट) है। यह एक आपातकालीन स्थिति है, तुरंत प्राथमिक उपचार करें।",
      mr: "डाव्या बाजूचे पोट असामान्य फुगणे (पोटफुगी) ही आणीबाणीची स्थिती आहे. त्वरित गॅस बाहेर काढण्यासाठी उपाय करा."
    },
    firstAid: {
      en: [
        "Drench animal with 250ml vegetable/mustard oil with 15ml Turpentine oil.",
        "Keep the animal standing with forequarters elevated to assist gas belching.",
        "Call the nearest paravet immediately if animal exhibits mouth breathing."
      ],
      hi: [
        "250 मिली सरसों का तेल और 15 मिली तारपीन का तेल मिलाकर नाल से दें।",
        "पशु को खड़ा रखें और आगे के पैरों को ऊंचाई पर रखें ताकि गैस निकले।",
        "मुंह से सांस लेने पर तुरंत नजदीकी पशुचिकित्सक को बुलाएं।"
      ],
      mr: [
        "२५० मिली गोडेतेल किंवा मोहरीच्या तेलात १५ मिली तारपीन तेल मिसळून पाजा.",
        "जनावराला उभे ठेवून पुढील पाय उंचवट्यावर ठेवा जेणेकरून ढेकर येईल.",
        "त्रास जास्त असल्यास त्वरित पशुवैद्यकीय मदत बोलवा."
      ]
    }
  },
  {
    keywords: ['mastitis', 'udder', 'teat', 'blood', 'clot', 'थन', 'दूध में खून', 'गाद', 'कास', 'कासदाह'],
    disease: 'Clinical Bovine Mastitis',
    urgency: 'high',
    response: {
      en: "Swelling, heat, or clots in milk indicate Clinical Mastitis (Udder Infection). Prompt intramammary care prevents permanent quarter blindness.",
      hi: "थन में सूजन, गर्माहट या दूध में थक्के/खून आना थनैला (मैस्टाइटिस) का लक्षण है। समय पर उपचार से थन खराब होने से बचाया जा सकता है।",
      mr: "कासेला सूज, उष्णता किंवा दुधात रक्ताच्या गुठळ्या येणे हे कासदाह (मॅस्टायटिस) रोगाचे लक्षण आहे. तातडीने उपचार करा."
    },
    firstAid: {
      en: [
        "Completely strip out infected milk every 2-3 hours and discard safely.",
        "Apply cold compress / ice pack on inflamed udder quarter.",
        "Do not allow raw infected milk to splash onto paddock bedding."
      ],
      hi: [
        "हर 2-3 घंटे में संक्रमित थन का सारा दूध निकाल कर सुरक्षित नष्ट करें।",
        "सूजे हुए थन पर बर्फ या ठंडे पानी की पट्टी लगाएं।",
        "संक्रमित दूध को फर्श पर न गिरने दें।"
      ],
      mr: [
        "दर २-३ तासांनी बाधित कासेचे दूध पूर्ण काढून नष्ट करा.",
        "सुजलेल्या कासेवर बर्फाचा किंवा थंड पाण्याचा शेक द्या.",
        "बाधित दूध गोठ्यात कुठेही सांडू देऊ नका."
      ]
    }
  }
];

export default function AIPashuSahayak() {
  const navigate = useNavigate();
  const { lang, setLang } = useLang();
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Welcome Message
  useEffect(() => {
    const welcomeText = {
      en: "Namaste! I am AI Pashu Sahayak, your real-time veterinary bio-defense assistant. You can speak or type in English, Hindi, or Marathi to describe your animal's symptoms.",
      hi: "नमस्ते! मैं आपका एआई पशु सहायक हूँ। आप बोलकर या लिखकर अपने पशु के लक्षण बता सकते हैं (हिन्दी, मराठी या अंग्रेजी में)।",
      mr: "नमस्कार! मी तुमचा एआय पशु सहाय्यक आहे. तुम्ही बोलून किंवा लिहून तुमच्या जनावराची लक्षणे विचारू शकता."
    };

    setMessages([
      {
        id: 'msg-welcome',
        sender: 'ai',
        text: welcomeText[lang] || welcomeText.en,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [lang]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Speech Recognition Setup
  const handleToggleVoice = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. Please type your query!");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = lang === 'hi' ? 'hi-IN' : lang === 'mr' ? 'mr-IN' : 'en-IN';

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
      handleProcessQuery(transcript);
    };

    recognition.start();
  };

  // Process Clinical Query
  const handleProcessQuery = (query: string) => {
    const text = query.trim();
    if (!text) return;

    // Add user message
    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    // Simulate AI thinking and clinical diagnosis
    setTimeout(() => {
      const lower = text.toLowerCase();
      const matched = CLINICAL_KNOWLEDGE.find(item => 
        item.keywords.some(k => lower.includes(k.toLowerCase()))
      );

      let aiMsg: Message;

      if (matched) {
        const diagText = matched.response[lang] || matched.response.en;
        const aidList = matched.firstAid[lang] || matched.firstAid.en;
        const fullContent = `${diagText}\n\n🚨 Immediate First-Aid Protocol:\n${aidList.map((step, idx) => `${idx + 1}. ${step}`).join('\n')}`;

        aiMsg = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: fullContent,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          diseaseTag: matched.disease,
          urgency: matched.urgency,
          actionRoute: '/report',
          actionLabel: lang === 'hi' ? 'आपातकालीन रिपोर्ट दर्ज करें' : lang === 'mr' ? 'तातडीचा अहवाल नोंदवा' : 'Auto-Fill Triage Report'
        };
      } else {
        const defaultReply = {
          en: `I noted your symptoms: "${text}". While I analyze this, check the animal's temperature (normal is 101.5°F) and observe for mucosal ulcers or sudden milk drop. Would you like to log an official inspection case?`,
          hi: `मैंने आपके बताए लक्षण नोट किए: "${text}"। कृपया पशु का तापमान जांचें (सामान्य 101.5°F) और मुंह/खुर में छालों पर नजर रखें। क्या आप नजदीकी पशुचिकित्सक को अलर्ट भेजना चाहते हैं?`,
          mr: `मी तुमची लक्षणे नोंदवली आहेत: "${text}". कृपया जनावराचे तापमान तपासा (सामान्य १०१.५°F). तुम्हाला पशुवैद्यकीय अधिकाऱ्याला तात्काळ अलर्ट पाठवायचा आहे का?`
        };

        aiMsg = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: defaultReply[lang] || defaultReply.en,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actionRoute: '/report',
          actionLabel: lang === 'hi' ? 'रिपोर्ट फॉर्म खोलें' : lang === 'mr' ? 'अहवाल उघडा' : 'Launch Triage Form'
        };
      }

      setMessages(prev => [...prev, aiMsg]);
      speakResponse(aiMsg.text);
    }, 600);
  };

  const speakResponse = (textToSpeak: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    // Clean text of emojis for speech
    const cleanText = textToSpeak.replace(/[🚨•✓⚠]/g, '').slice(0, 200);
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = lang === 'hi' ? 'hi-IN' : lang === 'mr' ? 'mr-IN' : 'en-IN';

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const samplePrompts = [
    { label: 'Cow has mouth blisters & salivation', labelHi: 'गाय के मुंह में छाले और लार', labelMr: 'गायच्या तोंडात फोड आणि लाळ' },
    { label: 'Skin has nodular lumps (LSD suspect)', labelHi: 'त्वचा पर गांठें (लंपी का शक)', labelMr: 'अंगावर गाठी आल्या आहेत (लंपी)' },
    { label: 'Severe stomach bloat & distress', labelHi: 'पेट में गंभीर अफारा / गैस', labelMr: 'पोटात तीव्र गॅस / पोटफुगी' },
    { label: 'Swollen udder with blood in milk', labelHi: 'थन में सूजन और दूध में थक्के', labelMr: 'कासेला सूज व दुधात गुठळ्या' }
  ];

  return (
    <>
      {/* ── Floating Launcher Button ── */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
        {!isOpen && (
          <div className="hidden sm:flex items-center gap-1.5 bg-slate-900/90 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border border-slate-700 animate-pulse">
            <Sparkles size={13} className="text-emerald-400" />
            <span>AI Sahayak (Voice Ready)</span>
          </div>
        )}

        <button
          onClick={() => {
            if (isOpen && isSpeaking) stopSpeaking();
            setIsOpen(!isOpen);
          }}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all transform active:scale-90 ${
            isOpen 
              ? 'bg-slate-800 text-white rotate-90' 
              : 'bg-gradient-to-tr from-emerald-600 via-primary-700 to-teal-800 text-white hover:scale-105 ring-4 ring-emerald-400/30'
          }`}
          title="AI Pashu Sahayak"
        >
          {isOpen ? <X size={26} /> : <Bot size={28} className="animate-bounce" />}
        </button>
      </div>

      {/* ── Conversational AI Drawer ── */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[95vw] sm:w-[420px] max-h-[82vh] h-[640px] bg-white rounded-3xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-fade-in-up">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-900 via-primary-800 to-teal-800 p-4 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center border border-white/20">
                <Bot size={22} className="text-emerald-300" />
              </div>
              <div>
                <h3 className="font-black text-sm flex items-center gap-1.5">
                  AI Pashu Sahayak
                  <span className="bg-emerald-400/20 text-emerald-300 border border-emerald-400/40 text-[9px] px-1.5 py-0.2 rounded font-mono">v2.4</span>
                </h3>
                <p className="text-[10px] text-primary-200 font-semibold">Trilingual Voice Veterinary Assistant</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {isSpeaking && (
                <button 
                  onClick={stopSpeaking}
                  className="p-1.5 rounded-full bg-red-500/80 hover:bg-red-500 text-white"
                  title="Mute Speech"
                >
                  <VolumeX size={15} />
                </button>
              )}

              {/* Language Picker */}
              <div className="flex bg-black/30 rounded-lg p-0.5 border border-white/20 text-[10px] font-bold">
                {(['en', 'hi', 'mr'] as const).map(code => (
                  <button
                    key={code}
                    onClick={() => setLang(code)}
                    className={`px-1.5 py-0.5 rounded ${lang === code ? 'bg-emerald-500 text-white' : 'text-gray-300 hover:text-white'}`}
                  >
                    {code.toUpperCase()}
                  </button>
                ))}
              </div>

              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white p-1"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f8fafc]">
            {messages.map((msg) => {
              const isAi = msg.sender === 'ai';
              return (
                <div 
                  key={msg.id} 
                  className={`flex flex-col ${isAi ? 'items-start' : 'items-end'}`}
                >
                  <div className="flex items-center gap-1.5 mb-1 px-1">
                    {isAi ? (
                      <span className="text-[10px] font-bold text-primary-800 flex items-center gap-1">
                        <Sparkles size={11} className="text-emerald-600" /> AI Sahayak
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-gray-500">You</span>
                    )}
                    <span className="text-[9px] text-gray-400">{msg.timestamp}</span>
                  </div>

                  <div className={`p-4 rounded-3xl max-w-[90%] text-xs leading-relaxed shadow-sm whitespace-pre-line ${
                    isAi 
                      ? 'bg-white border border-gray-200 text-gray-800 rounded-tl-sm' 
                      : 'bg-primary-800 text-white rounded-tr-sm font-medium'
                  }`}>
                    {/* Disease Tag */}
                    {msg.diseaseTag && (
                      <div className="flex items-center gap-1.5 mb-2 pb-2 border-b border-gray-100">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                          msg.urgency === 'critical' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-900'
                        }`}>
                          {msg.urgency === 'critical' ? '⚠ CRITICAL SUSPECT' : 'OBSERVATION'}
                        </span>
                        <span className="font-bold text-gray-900 text-xs">{msg.diseaseTag}</span>
                      </div>
                    )}

                    {msg.text}

                    {/* Action Button inside AI message */}
                    {msg.actionRoute && (
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          navigate(msg.actionRoute!);
                        }}
                        className="mt-3 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-all text-xs"
                      >
                        <ShieldAlert size={14} />
                        {msg.actionLabel}
                        <ArrowRight size={14} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Carousel */}
          <div className="bg-white border-t border-gray-100 p-2 overflow-x-auto flex gap-1.5 hide-scrollbar flex-shrink-0">
            {samplePrompts.map((p, i) => {
              const display = lang === 'hi' ? p.labelHi : lang === 'mr' ? p.labelMr : p.label;
              return (
                <button
                  key={i}
                  onClick={() => handleProcessQuery(display)}
                  className="bg-gray-100 hover:bg-primary-50 text-gray-700 hover:text-primary-800 text-[11px] font-semibold px-2.5 py-1.5 rounded-full whitespace-nowrap transition-colors border border-gray-200 flex-shrink-0"
                >
                  {display}
                </button>
              );
            })}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-white border-t border-gray-200 flex items-center gap-2">
            <button
              onClick={handleToggleVoice}
              className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all flex-shrink-0 ${
                isListening 
                  ? 'bg-red-500 text-white animate-pulse ring-4 ring-red-200' 
                  : 'bg-primary-50 hover:bg-primary-100 text-primary-800 border border-primary-200'
              }`}
              title={isListening ? "Listening... Tap to stop" : "Speak your query"}
            >
              {isListening ? <MicOff size={20} /> : <Mic size={20} />}
            </button>

            <input
              type="text"
              placeholder={lang === 'hi' ? 'लक्षण लिखें या बोलें...' : lang === 'mr' ? 'लक्षणे लिहा किंवा बोला...' : 'Type or speak symptoms...'}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleProcessQuery(inputText)}
              className="flex-1 bg-gray-100 border border-gray-200 rounded-2xl px-4 py-2.5 text-xs font-semibold text-gray-900 outline-none focus:ring-2 focus:ring-primary-600 focus:bg-white"
            />

            <button
              onClick={() => handleProcessQuery(inputText)}
              disabled={!inputText.trim()}
              className="w-11 h-11 rounded-2xl bg-primary-800 hover:bg-primary-900 disabled:opacity-40 text-white flex items-center justify-center transition-colors flex-shrink-0 shadow-sm"
            >
              <Send size={18} />
            </button>
          </div>

        </div>
      )}
    </>
  );
}
