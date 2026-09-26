export type LanguageCode =
  | 'hin_Deva' // Hindi
  | 'eng_Latn' // English
  | 'tam_Taml' // Tamil
  | 'sat_Olck' // Santali (Ol Chiki)
  | 'sat_Latn' // Santali (Roman)
  | 'ben_Beng' // Bengali
  | 'tel_Telu' // Telugu
  | 'mar_Deva' // Marathi
  | 'guj_Gujr' // Gujarati
  | 'kan_Knda' // Kannada
  | 'mal_Mlym' // Malayalam
  | 'ori_Orya' // Odia
  | 'pan_Guru' // Punjabi
  | 'asm_Beng' // Assamese
  | 'urd_Arab' // Urdu
  | 'san_Deva' // Sanskrit
  | 'mai_Deva' // Maithili
  | 'bdo_Deva' // Bodo
  | 'doi_Deva' // Dogri
  | 'kas_Arab' // Kashmiri
  | 'kok_Deva' // Konkani
  | 'mni_Mtei' // Manipuri (Meitei)
  | 'nep_Deva' // Nepali
  | 'snd_Arab' // Sindhi
  | 'unr_Deva' // Mundari (Tribal)
  | 'hoc_Latn' // Ho (Tribal)
  | 'kru_Deva' // Kurukh / Oraon (Tribal)
  | 'gon_Deva'; // Gondi (Tribal)

export type ScriptMode = 'native' | 'devanagari' | 'roman';

export interface LanguageMeta {
  code: LanguageCode;
  shortCode: string; // 'hi', 'en', 'ta', 'sat', etc.
  name: string; // 'Hindi', 'Tamil', 'Santali'
  nativeName: string; // 'हिन्दी', 'தமிழ்', 'ᱥᱟᱱᱛᱟᱲᱤ'
  family: 'Indo-Aryan' | 'Dravidian' | 'Austroasiatic' | 'Tibeto-Burman' | 'Germanic' | 'Language Isolate';
  script: string;
  isScheduled: boolean;
  isTribal: boolean;
  flagEmoji: string;
  stateOfOrigin: string;
  confidenceScore: number; // For admin heatmap (0-100)
  contentDepthHours: number;
}

export interface TimedWord {
  id: string;
  word: string;
  startTime: number; // in seconds
  endTime: number;   // in seconds
}

export interface LessonSection {
  id: string;
  title: Record<ScriptMode, string>;
  content: Record<ScriptMode, string>;
  timedWords: TimedWord[];
  audioUrl?: string;
  keyConcepts: string[];
  illustrationPrompt?: string;
  imageUrl?: string;
}

export interface QuizQuestion {
  id: string;
  lessonId: string;
  sectionId: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: Record<ScriptMode, string>;
  options: Array<{
    id: string;
    text: Record<ScriptMode, string>;
    isCorrect: boolean;
    explanation: Record<ScriptMode, string>;
  }>;
  conceptTag: string;
  audioPromptUrl?: string;
}

export interface Lesson {
  id: string;
  title: Record<ScriptMode, string>;
  subject: 'Science' | 'Mathematics' | 'Social Studies' | 'Environmental Studies' | 'Language Arts';
  grade: number;
  language: LanguageCode;
  coverImage: string;
  durationMinutes: number;
  overview: Record<ScriptMode, string>;
  sections: LessonSection[];
  quizQuestions: QuizQuestion[];
  offlineAvailable: boolean;
  sourceCurriculum: 'NCERT' | 'Jharkhand JCERT' | 'Tamil Nadu State Board' | 'BhashaSetu Tribal Initiative';
  reviewStatus: 'Verified by Teacher' | 'Community Reviewed' | 'AI Generated';
}

export interface DoubtQuery {
  id: string;
  studentId: string;
  lessonId: string;
  language: LanguageCode;
  queryText: string;
  queryAudioUrl?: string;
  detectedLanguage?: string;
  responseText: Record<ScriptMode, string>;
  responseAudioUrl?: string;
  citedSectionId: string;
  citedSectionTitle: string;
  citedPageNo: number;
  confidence: number;
  timestamp: string;
}

export interface LiveCaptionPacket {
  id: string;
  sessionId: string;
  teacherName: string;
  sourceText: string;
  sourceLanguage: LanguageCode;
  translations: Record<string, string>; // LanguageCode -> translated text
  timestamp: number;
  isFinal: boolean;
  confidence: number;
}

export interface CorpusItem {
  id: string;
  language: LanguageCode;
  dialect?: string;
  promptText: string;
  script: string;
  recordedBy: string;
  audioUrl: string;
  durationSeconds: number;
  status: 'pending' | 'approved' | 'rejected' | 'needs_work';
  confidenceScore: number;
  submittedAt: string;
  reviewedBy?: string;
  reviewerNotes?: string;
  pointsAwarded: number;
}

export interface StudentProfile {
  id: string;
  name: string;
  avatarIcon: string;
  grade: number;
  primaryLanguage: LanguageCode;
  preferredScript: ScriptMode;
  schoolId: string;
  schoolName: string;
  district: string;
  state: string;
  xpPoints: number;
  streakDays: number;
  completedLessons: string[];
  badges: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
    earnedDate: string;
  }>;
  masteryScores: Record<string, number>; // conceptTag -> mastery probability (0-1)
  voiceSummaryText: string; // Plain-language LLM generated summary
}

export interface DistrictHeatmapData {
  state: string;
  district: string;
  code: string;
  primaryLanguages: LanguageCode[];
  tribalLanguages: LanguageCode[];
  totalSchools: number;
  enrolledStudents: number;
  activeWeeklyStudents: number;
  aiModelConfidence: number; // percentage
  contentCompleteness: number; // percentage
  lowResourceGapScore: number; // 0-100 (high = urgent intervention needed)
  priorityLevel: 'Critical' | 'Moderate' | 'Good';
  recommendedActions: string[];
}
