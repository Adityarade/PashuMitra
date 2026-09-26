# 🇮🇳 BhashaSetu — AI Vernacular Pedagogy & Real-Time Translation Platform
### Smart India Hackathon 2026 • Problem Statement: **SIH26042**
> **A Nation-Scale, 100% Free & Open-Source Platform for NEP 2020 Mother-Tongue Education**

---

## 🌟 Executive Summary & Problem Reframe

India has **22 scheduled languages, 100+ non-scheduled languages, and thousands of dialects**, yet the vast majority of digital educational content is locked in English and Hindi. NEP 2020 mandates mother-tongue instruction through at least Grade 5, but state education departments face three critical bottlenecks:
1. **Low-Resource Language Neglect**: Tribal and regional languages (e.g., Santali, Mundari, Ho, Kurukh, Gondi) lack digital curriculum materials and training datasets.
2. **Linguistic Classroom Disconnect**: Teachers posted outside their native linguistic zone cannot communicate in real-time with students fluent only in local dialects.
3. **High Licensing & Cloud Lock-in Costs**: Proprietary cloud APIs cannot scale cost-effectively across India's 250 million students.

**BhashaSetu ("Language Bridge")** is an offline-first, full-stack pedagogy platform built **100% on Free & Open-Source Software (FOSS)**. It spans **Hindi, English, Tamil, and Santali (in Ol Chiki & Roman scripts)**, proving the architecture across Indo-Aryan, Global, Dravidian, and Austroasiatic tribal language families.

---

## 🏛️ System Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                      CLIENT LAYER (ANY DEVICE)                         │
│  Student / Teacher Web PWA (Next.js 14) · React Native Mobile App     │
│  IVR Audio Bridge & Feature Phone Access                               │
└───────────────────────────────────┬────────────────────────────────────┘
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   OFFLINE-FIRST PWA LAYER (DEXIE)                      │
│  Service Worker Cache · IndexedDB Local Storage · ONNX/WASM Inference  │
└───────────────────────────────────┬────────────────────────────────────┘
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   AI MICROSERVICES (100% FOSS MODELS)                  │
│  • ASR: AI4Bharat IndicWhisper & FastText Lang ID                      │
│  • Machine Translation: AI4Bharat IndicTrans2 (22+ Languages)          │
│  • Voice Synthesis: AI4Bharat Indic-Parler-TTS                         │
│  • Script Transliteration: AI4Bharat IndicXlit (Ol Chiki ↔ Devanagari) │
│  • Doubt Tutor: Curriculum RAG Vector DB (Qdrant) + Grounded Open LLM  │
│  • Adaptive Engine: Bayesian Knowledge Tracing (BKT)                   │
│  • Live Classroom: Sub-second Multi-Language WebSockets Streaming     │
└───────────────────────────────────┬────────────────────────────────────┘
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   DATA & ANALYTICS INFRASTRUCTURE                      │
│  PostgreSQL · Redis Cache · MinIO S3 · National Heatmap Analytics     │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Key Feature Breakdown

### 1. 🧒 Student Vernacular Experience
- **Voice-First Onboarding**: Students select their language by tapping an icon and hearing spoken voice confirmation without needing reading proficiency.
- **Karaoke Read-Along Player**: Word-by-word synchronized highlighting as audio plays, helping semi-literate learners connect spoken sounds with written script.
- **Multi-Script Switcher**: Instantly switch any lesson between Native Script (e.g. Ol Chiki, Tamil), Devanagari, or Roman script.
- **Curriculum-Grounded AI Doubt Tutor ("Ask a Doubt")**: Voice/text doubt solver strictly bounded by the chapter syllabus, always citing page numbers and section titles.
- **Adaptive Micro-Quizzes (BKT)**: Question difficulty auto-adjusts dynamically using Bayesian Knowledge Tracing based on accuracy and response time.
- **Gamified Tribal Corpus Contribution**: Students earn badges (e.g., *Bhasha Mitra*) by recording local proverbs and dialect phrases.
- **Plain-Language Voice Summary**: LLM converts raw quiz analytics into an encouraging spoken summary of strengths and areas for practice.

### 2. 👩‍🏫 Teacher Console & Content Copilot
- **Live Classroom Real-Time Translator**: Teacher speaks into a microphone $\rightarrow$ Sub-second subtitles broadcast simultaneously in Santali, Tamil, Hindi, and English across student screens over WebSockets.
- **Content Copilot & OCR**: Paste or scan any textbook text to generate simplified reading levels, bilingual practice worksheets, and 3-panel illustrated stories.
- **Human-in-the-Loop Review Queue**: Teachers and linguists review, edit, or approve community speech recordings before they feed into AI model fine-tuning.
- **Class Learning Gap Diagnostics**: Plain-language AI summaries highlighting concepts where the majority of the class is struggling.

### 3. 🏛️ Government / Admin Policy Dashboard
- **National Language-Gap Heatmap**: Interactive map and priority matrix across India's districts (e.g., Dumka, West Singhbhum, Mayurbhanj, Gadchiroli).
- **Acoustic Model vs Content Depth Analytics**: Guides state education departments on where to deploy dialect corpus collection drives and offline PWA solar tablets.

---

## 🛠️ Technology Stack (100% Free & Open Source)

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend Web & PWA** | Next.js 14 (App Router) + TypeScript + Tailwind CSS | Installable PWA with offline Service Worker support |
| **Mobile App** | React Native + Expo | Cross-platform student experience |
| **Offline Storage** | IndexedDB via Dexie.js | Full lesson playback and offline quiz storage |
| **AI Gateway** | FastAPI (Python 3.11) + WebSockets | Low-latency streaming and microservice coordination |
| **Speech-to-Text (ASR)** | AI4Bharat IndicWhisper / IndicConformer | Open weights Indian language speech recognition |
| **Machine Translation** | AI4Bharat IndicTrans2 | State-of-the-art 22 scheduled + tribal language translation |
| **Voice Synthesis (TTS)**| AI4Bharat Indic-Parler-TTS | Natural Indian accented speech synthesis |
| **Transliteration** | AI4Bharat IndicXlit | Native $\leftrightarrow$ Devanagari $\leftrightarrow$ Roman conversion |
| **Vector Database** | Qdrant OSS / Chroma | Syllabus grounding for RAG tutor |
| **Relational Database** | PostgreSQL 16 | Structured user profiles and quiz analytics |
| **Infrastructure** | Docker + Docker Compose | One-command local/demo orchestration |

---

## 🏃 Getting Started & Running Locally

### Prerequisites
- Node.js (v18+)
- Python (3.10+)
- npm or pnpm

### 1. Launch Next.js Web App
```bash
cd apps/web
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Launch FastAPI AI Gateway
```bash
cd services/api
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```
FastAPI Swagger documentation is accessible at [http://localhost:8000/docs](http://localhost:8000/docs).

### 3. Run Full Stack with Docker Compose
```bash
cd infra
docker-compose up -d
```

---

## 🏆 Why BhashaSetu Excels for Hackathon Evaluation

1. **National Scope, Honest Demo**: Ready-to-use coverage across **Hindi, English, Tamil, and Santali** (spanning 4 major linguistic families).
2. **Zero Licensing Cost**: Completely self-hostable with open weights, eliminating proprietary cloud API billing.
3. **Inclusive Offline Reach**: Works as an installable PWA on shared school laptops or low-end rural phones with zero connectivity.
4. **Policy-Grade Tooling**: The Language-Gap Heatmap transforms this from a standard classroom app into an administrative decision-making instrument for the Ministry of Education.
