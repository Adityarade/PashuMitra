"""
BhashaSetu — AI Vernacular Pedagogy & Real-Time Translation Platform
Core FastAPI Gateway & AI Microservice Hub (SIH26042)
"""
from fastapi import FastAPI, HTTPException, WebSocket, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional
import json

from ai.asr import transcribe_audio, detect_language
from ai.mt import translate_text, batch_translate_for_classroom
from ai.tts import synthesize_speech
from ai.transliterate import transliterate_script
from ai.rag_tutor import answer_student_doubt, CURRICULUM_CHUNKS
from ai.content_copilot import generate_worksheet, generate_illustrated_story, analyze_class_learning_gaps
from ai.bkt import process_quiz_response
from routes.classroom import router as classroom_router
from routes.corpus import router as corpus_router
from routes.analytics import router as analytics_router

app = FastAPI(
    title="BhashaSetu AI Core Engine",
    description="FOSS AI Vernacular Pedagogy, Real-Time Translation & RAG Curriculum Services for NEP 2020",
    version="1.0.0"
)

# Enable CORS for Next.js PWA and Expo Mobile
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include sub-routers
app.include_router(classroom_router)
app.include_router(corpus_router)
app.include_router(analytics_router)

# -------------------------------------------------------------
# Request / Response Schemas
# -------------------------------------------------------------
class ASRRequest(BaseModel):
    audio_base64: Optional[str] = None
    mock_speech_text: Optional[str] = None
    target_language: Optional[str] = None

class MTRequest(BaseModel):
    text: str
    source_language: str = "hin_Deva"
    target_language: str = "sat_Olck"

class BatchMTRequest(BaseModel):
    text: str
    source_language: str = "hin_Deva"
    target_languages: List[str] = ["sat_Olck", "tam_Taml", "eng_Latn"]

class TTSRequest(BaseModel):
    text: str
    language: str = "hin_Deva"
    speed: float = 1.0

class TransliterateRequest(BaseModel):
    text: str
    source_script: str = "native"
    target_script: str = "roman"

class DoubtRequest(BaseModel):
    query: str
    student_language: str = "hin_Deva"
    lesson_id: Optional[str] = None
    student_id: Optional[str] = "std-demo-01"
    preferred_script: Optional[str] = "native"

class BKTRequest(BaseModel):
    student_id: str
    concept_tag: str
    prior_mastery: float = 0.3
    is_correct: bool
    response_time_seconds: float = 5.0

class WorksheetRequest(BaseModel):
    lesson_title: str
    raw_text: str
    target_language: str = "hin_Deva"
    grade_level: int = 5

class StoryRequest(BaseModel):
    topic: str
    target_language: str = "sat_Olck"
    character_name: str = "ᱥᱤᱫᱳ (Sido)"

# -------------------------------------------------------------
# Base AI Endpoints
# -------------------------------------------------------------
@app.get("/")
def root():
    return {
        "platform": "BhashaSetu (Language Bridge)",
        "problem_statement": "SIH26042 — AI Vernacular Pedagogy & Real-Time Translation",
        "status": "online",
        "open_source_stack": {
            "asr": "AI4Bharat IndicWhisper / FastText",
            "mt": "AI4Bharat IndicTrans2",
            "tts": "AI4Bharat Indic-Parler-TTS",
            "transliteration": "AI4Bharat IndicXlit",
            "rag": "Qdrant Vector DB + Grounded Open LLM",
            "adaptive_learning": "Bayesian Knowledge Tracing (BKT)"
        }
    }

@app.get("/health")
def healthcheck():
    return {"status": "healthy", "timestamp": "2026-08-30T00:00:00Z"}

@app.post("/api/asr/transcribe")
def transcribe_endpoint(req: ASRRequest):
    return transcribe_audio(
        audio_text_mock=req.mock_speech_text,
        target_language=req.target_language
    )

@app.post("/api/mt/translate")
def translate_endpoint(req: MTRequest):
    return translate_text(req.text, req.source_language, req.target_language)

@app.post("/api/mt/batch-translate")
def batch_translate_endpoint(req: BatchMTRequest):
    return batch_translate_for_classroom(req.text, req.source_language, req.target_languages)

@app.post("/api/tts/synthesize")
def tts_endpoint(req: TTSRequest):
    return synthesize_speech(req.text, req.language, req.speed)

@app.post("/api/transliterate")
def transliterate_endpoint(req: TransliterateRequest):
    return transliterate_script(req.text, req.source_script, req.target_script)

@app.post("/api/rag/ask")
def ask_doubt_endpoint(req: DoubtRequest):
    """
    RAG Doubt Tutor: answers only from syllabus with citations and trust badge.
    """
    answer = answer_student_doubt(
        query=req.query,
        student_language=req.student_language,
        lesson_id=req.lesson_id,
        preferred_script=req.preferred_script or "native"
    )
    return answer

@app.post("/api/bkt/update")
def bkt_update_endpoint(req: BKTRequest):
    """
    Adaptive Learning BKT state updater.
    """
    return process_quiz_response(
        student_id=req.student_id,
        concept_tag=req.concept_tag,
        prior_mastery=req.prior_mastery,
        is_correct=req.is_correct,
        response_time_seconds=req.response_time_seconds
    )

@app.post("/api/copilot/worksheet")
def copilot_worksheet_endpoint(req: WorksheetRequest):
    return generate_worksheet(
        lesson_title=req.lesson_title,
        raw_text=req.raw_text,
        target_language=req.target_language,
        grade_level=req.grade_level
    )

@app.post("/api/copilot/story")
def copilot_story_endpoint(req: StoryRequest):
    return generate_illustrated_story(
        topic=req.topic,
        target_language=req.target_language,
        character_name=req.character_name
    )

@app.post("/api/copilot/class-gaps")
def class_gaps_endpoint(quiz_results: List[Dict[str, Any]] = []):
    return analyze_class_learning_gaps(quiz_results)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
