import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi' | 'mr';

interface Translations {
  // Nav
  dashboard: string;
  surveillance: string;
  reportTriage: string;
  herdRecords: string;
  outbreakRadar: string;
  fieldModules: string;
  offlineReady: string;
  logout: string;
  // Hero
  welcomeTo: string;
  heroSubtitle: string;
  logSymptom: string;
  viewFeed: string;
  systemStatus: string;
  systemNominal: string;
  allNodesOnline: string;
  // Modules
  quickAccess: string;
  liveSurveillance: string;
  liveSurveillanceDesc: string;
  reportTriageLabel: string;
  reportTriageDesc: string;
  herdRecordsLabel: string;
  herdRecordsDesc: string;
  outbreakRadarLabel: string;
  outbreakRadarDesc: string;
  // Login
  loginTitle: string;
  signIn: string;
  newRegistration: string;
  authMethod: string;
  password: string;
  pinDigit: string;
  mobileLabel: string;
  passwordLabel: string;
  signInBtn: string;
  orContinue: string;
  signInGoogle: string;
  demoRoles: string;
  offlineKey: string;
  guestBypass: string;
  // Surveillance
  villageFeeed: string;
  offlineStorage: string;
  syncNow: string;
  monitored: string;
  suspectedFlags: string;
  quarantinedFarms: string;
  immunityCoverage: string;
}

const translations: Record<Language, Translations> = {
  en: {
    dashboard: 'Dashboard',
    surveillance: 'Surveillance',
    reportTriage: 'Report & Triage',
    herdRecords: 'Herd Records',
    outbreakRadar: 'Outbreak Radar',
    fieldModules: 'Field Modules',
    offlineReady: 'Offline Ready',
    logout: 'Logout',
    welcomeTo: 'Welcome to',
    heroSubtitle: "Bharat Pashudhan's early-warning bio-defense network. Monitor epidemiological trends, log field outbreaks, and deploy rapid quarantine protocols across India.",
    logSymptom: 'Log Rapid Symptom',
    viewFeed: 'View Feed',
    systemStatus: 'System Status',
    systemNominal: 'Nominal',
    allNodesOnline: 'All telemetry nodes online',
    quickAccess: 'Quick Access Modules',
    liveSurveillance: 'Live Surveillance',
    liveSurveillanceDesc: 'Monitor village cluster metrics and active field telemetry data.',
    reportTriageLabel: 'Report & Triage',
    reportTriageDesc: 'Log field observations and utilize AI diagnostic vision models.',
    herdRecordsLabel: 'Herd Records',
    herdRecordsDesc: 'Access INAPH databases, vaccination logs, and live vitals.',
    outbreakRadarLabel: 'Outbreak Radar',
    outbreakRadarDesc: 'View spatial risk maps, epizootic indexing, and critical quarantines.',
    loginTitle: 'PASHURAKSHAK',
    signIn: 'Sign In',
    newRegistration: 'New Registration',
    authMethod: 'Authentication Method:',
    password: 'Password',
    pinDigit: '4-Digit PIN',
    mobileLabel: 'Mobile Number / Email / Officer ID',
    passwordLabel: 'Password',
    signInBtn: 'Sign In to Terminal',
    orContinue: 'Or continue with',
    signInGoogle: 'Sign in with Google',
    demoRoles: 'Instant Demo Roles (1-Click Login)',
    offlineKey: 'Credential cryptographic key cached offline for field disconnect resilience',
    guestBypass: 'Guest Bypass',
    villageFeeed: 'Village Bio-Surveillance Feed',
    offlineStorage: 'Offline Storage Active',
    syncNow: 'Sync Now',
    monitored: 'Monitored Clusters',
    suspectedFlags: 'Suspected Flags Today',
    quarantinedFarms: 'Quarantined Farms',
    immunityCoverage: 'Immunity Coverage',
  },
  hi: {
    dashboard: 'डैशबोर्ड',
    surveillance: 'निगरानी',
    reportTriage: 'रिपोर्ट और ट्राइएज',
    herdRecords: 'झुंड रिकॉर्ड',
    outbreakRadar: 'प्रकोप रडार',
    fieldModules: 'फ़ील्ड मॉड्यूल',
    offlineReady: 'ऑफलाइन तैयार',
    logout: 'लॉगआउट',
    welcomeTo: 'स्वागत है',
    heroSubtitle: 'भारत पशुधन का प्रारंभिक चेतावनी जैव-रक्षा नेटवर्क। महामारी संबंधी रुझानों की निगरानी करें, क्षेत्र प्रकोपों को लॉग करें और त्वरित संगरोध प्रोटोकॉल तैनात करें।',
    logSymptom: 'लक्षण दर्ज करें',
    viewFeed: 'फ़ीड देखें',
    systemStatus: 'सिस्टम स्थिति',
    systemNominal: 'सामान्य',
    allNodesOnline: 'सभी टेलीमेट्री नोड ऑनलाइन',
    quickAccess: 'त्वरित पहुंच मॉड्यूल',
    liveSurveillance: 'लाइव निगरानी',
    liveSurveillanceDesc: 'ग्राम क्लस्टर मेट्रिक्स और सक्रिय फ़ील्ड डेटा की निगरानी करें।',
    reportTriageLabel: 'रिपोर्ट और ट्राइएज',
    reportTriageDesc: 'फ़ील्ड अवलोकन लॉग करें और AI डायग्नोस्टिक मॉडल का उपयोग करें।',
    herdRecordsLabel: 'झुंड रिकॉर्ड',
    herdRecordsDesc: 'INAPH डेटाबेस, टीकाकरण लॉग और लाइव महत्वपूर्ण संकेत एक्सेस करें।',
    outbreakRadarLabel: 'प्रकोप रडार',
    outbreakRadarDesc: 'स्थानिक जोखिम मानचित्र, एपिज़ूटिक इंडेक्सिंग और संगरोध देखें।',
    loginTitle: 'पशुरक्षक',
    signIn: 'साइन इन करें',
    newRegistration: 'नया पंजीकरण',
    authMethod: 'प्रमाणीकरण विधि:',
    password: 'पासवर्ड',
    pinDigit: '4-अंकीय PIN',
    mobileLabel: 'मोबाइल नंबर / ईमेल / अधिकारी ID',
    passwordLabel: 'पासवर्ड',
    signInBtn: 'टर्मिनल में साइन इन',
    orContinue: 'या इससे जारी रखें',
    signInGoogle: 'Google से साइन इन करें',
    demoRoles: 'त्वरित डेमो भूमिकाएं (1-क्लिक लॉगिन)',
    offlineKey: 'क्रेडेंशियल कुंजी ऑफलाइन कैश की गई है',
    guestBypass: 'अतिथि प्रवेश',
    villageFeeed: 'ग्राम जैव-निगरानी फ़ीड',
    offlineStorage: 'ऑफलाइन भंडारण सक्रिय',
    syncNow: 'अभी सिंक करें',
    monitored: 'निगरानी क्लस्टर',
    suspectedFlags: 'आज संदिग्ध केस',
    quarantinedFarms: 'संगरोध फार्म',
    immunityCoverage: 'प्रतिरक्षा कवरेज',
  },
  mr: {
    dashboard: 'डॅशबोर्ड',
    surveillance: 'निगराणी',
    reportTriage: 'अहवाल आणि ट्रायज',
    herdRecords: 'कळप नोंदी',
    outbreakRadar: 'उद्रेक रडार',
    fieldModules: 'फील्ड मॉड्यूल',
    offlineReady: 'ऑफलाइन तयार',
    logout: 'लॉगआउट',
    welcomeTo: 'स्वागत आहे',
    heroSubtitle: 'भारत पशुधनचे प्रारंभिक चेतावणी जैव-संरक्षण नेटवर्क. साथीच्या ट्रेंडचे निरीक्षण करा, क्षेत्रीय उद्रेक नोंदवा आणि जलद अलगीकरण प्रोटोकॉल तैनात करा.',
    logSymptom: 'लक्षण नोंदवा',
    viewFeed: 'फीड पहा',
    systemStatus: 'प्रणाली स्थिती',
    systemNominal: 'सामान्य',
    allNodesOnline: 'सर्व टेलिमेट्री नोड ऑनलाइन',
    quickAccess: 'जलद प्रवेश मॉड्यूल',
    liveSurveillance: 'थेट निगराणी',
    liveSurveillanceDesc: 'गाव क्लस्टर मेट्रिक्स आणि सक्रिय फील्ड डेटाचे निरीक्षण करा.',
    reportTriageLabel: 'अहवाल आणि ट्रायज',
    reportTriageDesc: 'फील्ड निरीक्षणे नोंदवा आणि AI निदान मॉडेल वापरा.',
    herdRecordsLabel: 'कळप नोंदी',
    herdRecordsDesc: 'INAPH डेटाबेस, लसीकरण लॉग आणि थेट महत्वाची चिन्हे ऍक्सेस करा.',
    outbreakRadarLabel: 'उद्रेक रडार',
    outbreakRadarDesc: 'स्थानिक जोखीम नकाशे, एपिझूटिक इंडेक्सिंग आणि अलगीकरण पहा.',
    loginTitle: 'पशुरक्षक',
    signIn: 'साइन इन करा',
    newRegistration: 'नवीन नोंदणी',
    authMethod: 'प्रमाणीकरण पद्धत:',
    password: 'पासवर्ड',
    pinDigit: '4-अंकी PIN',
    mobileLabel: 'मोबाइल नंबर / ईमेल / अधिकारी ID',
    passwordLabel: 'पासवर्ड',
    signInBtn: 'टर्मिनलमध्ये साइन इन करा',
    orContinue: 'किंवा यासह सुरू ठेवा',
    signInGoogle: 'Google सह साइन इन करा',
    demoRoles: 'त्वरित डेमो भूमिका (1-क्लिक लॉगिन)',
    offlineKey: 'क्रेडेन्शियल की ऑफलाइन कॅश केली आहे',
    guestBypass: 'अतिथी प्रवेश',
    villageFeeed: 'ग्राम जैव-निगराणी फीड',
    offlineStorage: 'ऑफलाइन स्टोरेज सक्रिय',
    syncNow: 'आता सिंक करा',
    monitored: 'निरीक्षण क्लस्टर',
    suspectedFlags: 'आजचे संशयास्पद केसेस',
    quarantinedFarms: 'अलग केलेले शेत',
    immunityCoverage: 'प्रतिकारशक्ती कव्हरेज',
  },
};

interface LangContextType {
  lang: Language;
  setLang: (l: Language) => void;
  t: Translations;
}

const LangContext = createContext<LangContextType>({
  lang: 'en',
  setLang: () => {},
  t: translations.en,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('en');
  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
