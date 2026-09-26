"""
Corpus & Active-Learning Community Speech Router
Allows students & community members to record and contribute phrases in low-resource/tribal languages.
Includes a human-in-the-loop review queue for teachers/linguists.
"""
from fastapi import APIRouter, HTTPException, Query
from typing import List, Dict, Any, Optional
import time

router = APIRouter(prefix="/corpus", tags=["Corpus"])

# In-memory corpus database
CORPUS_DB: List[Dict[str, Any]] = [
    {
        "id": "corp-sat-01",
        "language": "sat_Olck",
        "language_name": "Santali (Ol Chiki)",
        "dialect": "Mayurbhanj / Santhal Pargana",
        "prompt_text": "ᱡᱟᱹᱯᱤᱫ ᱠᱷᱚᱱ ᱵᱮᱨᱮᱫ ᱠᱟᱛᱮ ᱥᱮᱛᱟᱜ ᱨᱮ ᱯᱟᱲᱦᱟᱣ ᱢᱮ᱾",
        "english_meaning": "Wake up from sleep and study in the morning.",
        "script": "Ol Chiki",
        "recorded_by": "Soren Marandi (Class 7, Dumka)",
        "audio_url": "/api/audio/sample_sat_01.mp3",
        "duration_seconds": 4.2,
        "status": "pending",
        "confidence_score": 0.62,  # Low model confidence -> prioritized for active learning
        "submitted_at": "2026-08-28T14:20:00Z",
        "points_awarded": 50,
    },
    {
        "id": "corp-sat-02",
        "language": "sat_Olck",
        "language_name": "Santali (Ol Chiki)",
        "dialect": "East Singhbhum",
        "prompt_text": "ᱟᱵᱚ ᱨᱤᱱ ᱫᱟᱨᱮ ᱱᱟᱹᱲᱤ ᱫᱚ ᱟᱵᱚ ᱨᱮᱱ ᱡᱤᱣᱤ ᱠᱟᱱᱟ ᱠᱚ᱾",
        "english_meaning": "Our plants and creepers are our very life.",
        "script": "Ol Chiki",
        "recorded_by": "Anjali Hansda (Teacher, Ghatshila)",
        "audio_url": "/api/audio/sample_sat_02.mp3",
        "duration_seconds": 5.1,
        "status": "approved",
        "confidence_score": 0.94,
        "submitted_at": "2026-08-27T10:15:00Z",
        "reviewed_by": "Dr. B. Murmu (Linguist, Ranchi University)",
        "reviewer_notes": "Flawless pronunciation and standard Ol Chiki cadence. High training weight.",
        "points_awarded": 100,
    },
    {
        "id": "corp-unr-01",
        "language": "unr_Deva",
        "language_name": "Mundari (Tribal)",
        "dialect": "Khunti Mundari",
        "prompt_text": "सिंगी सांगीन रे मेनाय, ओड़ोः मार्सल एमाबोआ।",
        "english_meaning": "The sun is far away and gives us light.",
        "script": "Devanagari (Mundari)",
        "recorded_by": "Birsa Munda Academy (Community Drive)",
        "audio_url": "/api/audio/sample_unr_01.mp3",
        "duration_seconds": 4.8,
        "status": "pending",
        "confidence_score": 0.48,
        "submitted_at": "2026-08-28T16:45:00Z",
        "points_awarded": 75,
    },
    {
        "id": "corp-tam-01",
        "language": "tam_Taml",
        "language_name": "Tamil",
        "dialect": "Madurai Vernacular",
        "prompt_text": "கற்றது கைமண் அளவு, கல்லாதது உலகளவு.",
        "english_meaning": "What is learned is a handful of sand; what is unlearned is the size of the world.",
        "script": "Tamil",
        "recorded_by": "Kavitha R. (Class 8, Madurai)",
        "audio_url": "/api/audio/sample_tam_01.mp3",
        "duration_seconds": 6.0,
        "status": "approved",
        "confidence_score": 0.98,
        "submitted_at": "2026-08-26T09:30:00Z",
        "reviewed_by": "T. Sundaram (Teacher)",
        "reviewer_notes": "Classic Avvaiyar quote, great intonation.",
        "points_awarded": 50,
    }
]

# Active learning prompt bank (prioritizes low confidence domains)
ACTIVE_LEARNING_PROMPTS = [
    {
        "prompt_id": "alp-01",
        "language": "sat_Olck",
        "prompt_text": "ᱫᱟᱨᱮ ᱡᱟᱝ ᱠᱷᱚᱱ ᱫᱟᱨᱮ ᱚᱢᱚᱱᱚᱜᱼᱟ᱾ (From seed, a tree sprouts.)",
        "topic": "Botany & Nature",
        "urgency": "High - Model Accuracy Gap 38%"
    },
    {
        "prompt_id": "alp-02",
        "language": "unr_Deva",
        "prompt_text": "हातु रे जोतो होड़ो जुमीद काते ताहेन पे। (Live united in the village.)",
        "topic": "Community & Moral Science",
        "urgency": "Critical - Low Resource Acoustic Data"
    },
    {
        "prompt_id": "alp-03",
        "language": "hoc_Latn",
        "prompt_text": "Singbonga abuyen marang bonga kana. (Sun God is our prime deity.)",
        "topic": "Culture & Heritage",
        "urgency": "Critical - Ho Dialect Expansion"
    }
]

@router.get("/prompts")
def get_active_prompts(language: Optional[str] = None):
    """
    Returns prioritized speech recording prompts for students and community members.
    """
    if language:
        return [p for p in ACTIVE_LEARNING_PROMPTS if p["language"] == language]
    return ACTIVE_LEARNING_PROMPTS

@router.get("/queue")
def get_review_queue(status: Optional[str] = None):
    """
    Returns submissions for the teacher/linguist review queue.
    """
    if status:
        return [item for item in CORPUS_DB if item["status"] == status]
    return CORPUS_DB

@router.post("/submit")
def submit_corpus_recording(payload: Dict[str, Any]):
    """
    Submits a new community recording and assigns XP points/badges.
    """
    new_item = {
        "id": f"corp-{int(time.time()*1000)}",
        "language": payload.get("language", "sat_Olck"),
        "language_name": payload.get("language_name", "Santali"),
        "dialect": payload.get("dialect", "Standard"),
        "prompt_text": payload.get("prompt_text", ""),
        "english_meaning": payload.get("english_meaning", ""),
        "script": payload.get("script", "Native"),
        "recorded_by": payload.get("recorded_by", "Student Contributor"),
        "audio_url": payload.get("audio_url", "/api/audio/sample_upload.mp3"),
        "duration_seconds": payload.get("duration_seconds", 5.0),
        "status": "pending",
        "confidence_score": 0.70,
        "submitted_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "points_awarded": 50,
    }
    CORPUS_DB.insert(0, new_item)
    return {
        "success": True,
        "item": new_item,
        "badge_earned": "Bhasha Mitra (Language Friend)",
        "xp_awarded": 50,
        "message": "Recording submitted successfully! It is now in the review queue for teacher verification."
    }

@router.post("/review/{item_id}")
def review_submission(item_id: str, payload: Dict[str, Any]):
    """
    Human-in-the-loop review by teacher/linguist (Approve, Edit, Reject).
    """
    status = payload.get("status", "approved")
    reviewer = payload.get("reviewed_by", "Teacher Reviewer")
    notes = payload.get("reviewer_notes", "")

    for item in CORPUS_DB:
        if item["id"] == item_id:
            item["status"] = status
            item["reviewed_by"] = reviewer
            item["reviewer_notes"] = notes
            return {
                "success": True,
                "item": item,
                "message": f"Submission marked as {status}."
            }
            
    raise HTTPException(status_code=404, detail="Corpus item not found")
