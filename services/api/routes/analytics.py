"""
National Language-Gap Heatmap & Administrative Analytics Router
Supplies policy-level data drilldown (State -> District -> Block -> School)
and AI model confidence metrics across India's language families.
"""
from fastapi import APIRouter, HTTPException, Query
from typing import List, Dict, Any, Optional

router = APIRouter(prefix="/analytics", tags=["Analytics & Heatmap"])

# National Summary
NATIONAL_OVERVIEW = {
    "total_students_served": 1284500,
    "active_weekly_students": 924000,
    "schools_onboarded": 14750,
    "languages_supported": 23,
    "tribal_languages_active": 6,
    "avg_bilingual_comprehension_boost_pct": 34.8,
    "total_audio_corpus_hours_collected": 18450,
    "verified_lessons_count": 3400,
    "key_policy_insight": "Deploying mother-tongue instruction in Grade 1-5 reduced conceptual dropouts by 42% in Santhal Pargana and Bodoland pilot blocks."
}

# State & District Language Data
DISTRICT_RECORDS: List[Dict[str, Any]] = [
    {
        "state": "Jharkhand",
        "district": "Dumka",
        "code": "JH-DU",
        "primary_languages": ["sat_Olck", "hin_Deva", "unr_Deva"],
        "tribal_languages": ["sat_Olck", "unr_Deva"],
        "total_schools": 1840,
        "enrolled_students": 142000,
        "active_weekly_students": 98000,
        "ai_model_confidence": 54,
        "content_completeness": 48,
        "low_resource_gap_score": 82,
        "priority_level": "Critical",
        "recommended_actions": [
            "Initiate Santali & Mundari voice corpus collection drive in 400 rural primary schools",
            "Deploy offline-cached PWA tablets with pre-loaded NCERT Grade 1-5 audio lessons",
            "Train local bilingual teachers on BhashaSetu Content Copilot for Ol Chiki lesson generation"
        ]
    },
    {
        "state": "Jharkhand",
        "district": "West Singhbhum",
        "code": "JH-WS",
        "primary_languages": ["hoc_Latn", "sat_Olck", "hin_Deva"],
        "tribal_languages": ["hoc_Latn", "sat_Olck", "unr_Deva"],
        "total_schools": 2150,
        "enrolled_students": 168000,
        "active_weekly_students": 104000,
        "ai_model_confidence": 49,
        "content_completeness": 41,
        "low_resource_gap_score": 88,
        "priority_level": "Critical",
        "recommended_actions": [
            "High priority: Ho (Varang Kshiti) language acoustic model data collection",
            "Roll out IVR missed-call audio bridge for remote forest villages without 4G",
            "Incentivize community proverb & story contributions with local cultural panchayat rewards"
        ]
    },
    {
        "state": "Jharkhand",
        "district": "Ranchi",
        "code": "JH-RA",
        "primary_languages": ["hin_Deva", "kru_Deva", "unr_Deva", "eng_Latn"],
        "tribal_languages": ["kru_Deva", "unr_Deva"],
        "total_schools": 2420,
        "enrolled_students": 290000,
        "active_weekly_students": 245000,
        "ai_model_confidence": 82,
        "content_completeness": 79,
        "low_resource_gap_score": 38,
        "priority_level": "Good",
        "recommended_actions": [
            "Expand Kurukh (Oraon) dialect coverage in urban fringe schools",
            "Conduct teacher workshops on Live Classroom Translation for mixed Hindi-Kurukh classes"
        ]
    },
    {
        "state": "Odisha",
        "district": "Mayurbhanj",
        "code": "OD-MB",
        "primary_languages": ["ori_Orya", "sat_Olck", "hoc_Latn"],
        "tribal_languages": ["sat_Olck", "hoc_Latn"],
        "total_schools": 3120,
        "enrolled_students": 240000,
        "active_weekly_students": 172000,
        "ai_model_confidence": 61,
        "content_completeness": 55,
        "low_resource_gap_score": 74,
        "priority_level": "Critical",
        "recommended_actions": [
            "Sync Odia-Santali bilingual dictionary with DIKSHA State curriculum",
            "Equip block resource centers with community voice contribution booths"
        ]
    },
    {
        "state": "Tamil Nadu",
        "district": "Madurai",
        "code": "TN-MA",
        "primary_languages": ["tam_Taml", "eng_Latn"],
        "tribal_languages": [],
        "total_schools": 2010,
        "enrolled_students": 275000,
        "active_weekly_students": 251000,
        "ai_model_confidence": 93,
        "content_completeness": 91,
        "low_resource_gap_score": 18,
        "priority_level": "Good",
        "recommended_actions": [
            "Maintain continuous model tuning with local regional idiom benchmarks",
            "Promote student peer-to-peer multilingual STEM question banks"
        ]
    },
    {
        "state": "Assam",
        "district": "Kokrajhar (Bodoland)",
        "code": "AS-KO",
        "primary_languages": ["bdo_Deva", "asm_Beng", "eng_Latn"],
        "tribal_languages": ["bdo_Deva"],
        "total_schools": 1650,
        "enrolled_students": 135000,
        "active_weekly_students": 92000,
        "ai_model_confidence": 64,
        "content_completeness": 59,
        "low_resource_gap_score": 71,
        "priority_level": "Critical",
        "recommended_actions": [
            "Scale Bodo language ASR fine-tuning with Bhashini repository speech data",
            "Deliver bilingual Bodo-English Science glossaries through BhashaSetu PWA"
        ]
    },
    {
        "state": "Maharashtra",
        "district": "Gadchiroli",
        "code": "MH-GA",
        "primary_languages": ["gon_Deva", "mar_Deva", "tel_Telu"],
        "tribal_languages": ["gon_Deva"],
        "total_schools": 1580,
        "enrolled_students": 110000,
        "active_weekly_students": 68000,
        "ai_model_confidence": 45,
        "content_completeness": 36,
        "low_resource_gap_score": 91,
        "priority_level": "Critical",
        "recommended_actions": [
            "Urgent tribal language initiative: Gondi acoustic dataset gathering",
            "Deploy offline-first solar powered school servers running quantized ONNX models"
        ]
    }
]

@router.get("/overview")
def get_national_overview():
    """
    Returns high-level national metrics for policy makers.
    """
    return NATIONAL_OVERVIEW

@router.get("/heatmap")
def get_heatmap_data(state: Optional[str] = None):
    """
    Returns district-wise language-gap heatmap metrics.
    """
    if state:
        return [d for d in DISTRICT_RECORDS if d["state"].lower() == state.lower()]
    return DISTRICT_RECORDS

@router.get("/district/{code}")
def get_district_detail(code: str):
    """
    Returns drill-down insights for a specific district.
    """
    for d in DISTRICT_RECORDS:
        if d["code"].lower() == code.lower():
            return d
    raise HTTPException(status_code=404, detail="District code not found")
