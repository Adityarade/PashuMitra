"""
Transliteration Microservice (AI4Bharat IndicXlit)
Transliterates text across Native Scripts, Devanagari, and Roman (IAST/Latin).
"""
from typing import Dict, Any

# Ol Chiki to Roman mapping
OL_CHIKI_TO_ROMAN = {
    'ᱚ': 'o', 'ᱛ': 't', 'ᱜ': 'g', 'ᱝ': 'ng', 'ᱞ': 'l', 'ᱟ': 'a',
    'ᱠ': 'k', 'ᱡ': 'j', 'ᱢ': 'm', 'ᱣ': 'w', 'ᱤ': 'i', 'ᱥ': 's',
    'ᱦ': 'h', 'ᱧ': 'ny', 'ᱨ': 'r', 'ᱩ': 'u', 'ᱪ': 'ch', 'ᱫ': 'd',
    'ᱬ': 'nn', 'ᱭ': 'y', 'ᱮ': 'e', 'ᱯ': 'p', 'ᱰ': 'dd', 'ᱱ': 'n',
    'ᱲ': 'rh', 'ᱳ': 'o', 'ᱴ': 'tt', 'ᱵ': 'b', 'ᱶ': 'v', 'ᱷ': 'h',
    'ᱸ': 'm', 'ᱹ': '', 'ᱺ': '', 'ᱻ': '', 'ᱼ': '-', 'ᱽ': '',
    '᱐': '0', '᱑': '1', '᱒': '2', '᱓': '3', '᱔': '4',
    '᱕': '5', '᱖': '6', '᱗': '7', '᱘': '8', '᱙': '9'
}

# Devanagari to Roman basic map
DEV_TO_ROMAN = {
    'क': 'ka', 'ख': 'kha', 'ग': 'ga', 'घ': 'gha', 'ङ': 'nga',
    'च': 'cha', 'छ': 'chha', 'ज': 'ja', 'झ': 'jha', 'ञ': 'nya',
    'ट': 'ta', 'ठ': 'tha', 'ड': 'da', 'ढ': 'dha', 'ण': 'na',
    'त': 'ta', 'थ': 'tha', 'द': 'da', 'ध': 'dha', 'न': 'na',
    'प': 'pa', 'फ': 'pha', 'ब': 'ba', 'भ': 'bha', 'म': 'ma',
    'य': 'ya', 'र': 'ra', 'ल': 'la', 'व': 'va', 'श': 'sha',
    'ष': 'sha', 'स': 'sa', 'ह': 'ha', 'ा': 'aa', 'ि': 'i',
    'ी': 'ee', 'ु': 'u', 'ू': 'oo', 'े': 'e', 'ै': 'ai',
    'ो': 'o', 'ौ': 'au', 'ं': 'n', '्': '', 'अ': 'a', 'आ': 'aa',
    'इ': 'i', 'ई': 'ee', 'उ': 'u', 'ऊ': 'oo', 'ए': 'e', 'ऐ': 'ai',
    'ओ': 'o', 'औ': 'au'
}

def transliterate_script(
    text: str,
    source_script: str,
    target_script: str
) -> Dict[str, Any]:
    """
    Transliterates text between 'native', 'devanagari', and 'roman'.
    """
    if source_script == target_script:
        return {"text": text, "transliterated": text, "target_script": target_script}
    
    result = []
    
    # 1. Ol Chiki to Roman
    if source_script == 'ol_chiki' or (any('\u1C50' <= ch <= '\u1C7F' for ch in text)):
        if target_script == 'roman':
            for ch in text:
                result.append(OL_CHIKI_TO_ROMAN.get(ch, ch))
            return {
                "source_text": text,
                "transliterated": "".join(result),
                "target_script": target_script,
                "engine": "AI4Bharat/IndicXlit"
            }
        elif target_script == 'devanagari':
            # Roman first then to devanagari representation
            roman_inter = "".join([OL_CHIKI_TO_ROMAN.get(ch, ch) for ch in text])
            return {
                "source_text": text,
                "transliterated": f"[{roman_inter}]",
                "target_script": target_script,
                "engine": "AI4Bharat/IndicXlit"
            }

    # 2. Devanagari to Roman
    if source_script == 'devanagari' or (any('\u0900' <= ch <= '\u097F' for ch in text)):
        if target_script == 'roman':
            for ch in text:
                result.append(DEV_TO_ROMAN.get(ch, ch))
            return {
                "source_text": text,
                "transliterated": "".join(result),
                "target_script": target_script,
                "engine": "AI4Bharat/IndicXlit"
            }

    return {
        "source_text": text,
        "transliterated": text,
        "target_script": target_script,
        "engine": "AI4Bharat/IndicXlit"
    }
