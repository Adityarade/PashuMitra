"""
Live Classroom Translation WebSocket & REST Router
Enables teacher microphone/speech streaming and real-time multi-language subtitle broadcasting.
"""
from fastapi import APIRouter, WebSocket, WebSocketDisconnect, HTTPException
from typing import List, Dict, Any, Set
import json
import time
import asyncio
from ai.mt import batch_translate_for_classroom
from ai.asr import transcribe_audio

router = APIRouter(prefix="/classroom", tags=["Live Classroom"])

# Active WebSocket connections per room/classroom
class ConnectionManager:
    def __init__(self):
        self.active_rooms: Dict[str, Set[WebSocket]] = {}
        self.session_meta: Dict[str, Dict[str, Any]] = {}

    async def connect(self, room_id: str, websocket: WebSocket):
        await websocket.accept()
        if room_id not in self.active_rooms:
            self.active_rooms[room_id] = set()
            self.session_meta[room_id] = {
                "created_at": time.time(),
                "teacher": "Demo Teacher",
                "active_languages": ["hin_Deva", "sat_Olck", "tam_Taml", "eng_Latn"]
            }
        self.active_rooms[room_id].add(websocket)

    def disconnect(self, room_id: str, websocket: WebSocket):
        if room_id in self.active_rooms and websocket in self.active_rooms[room_id]:
            self.active_rooms[room_id].remove(websocket)
            if not self.active_rooms[room_id]:
                del self.active_rooms[room_id]

    async def broadcast_to_room(self, room_id: str, message: Dict[str, Any]):
        if room_id in self.active_rooms:
            dead_connections = set()
            for connection in self.active_rooms[room_id]:
                try:
                    await connection.send_text(json.dumps(message))
                except Exception:
                    dead_connections.add(connection)
            for dead in dead_connections:
                self.active_rooms[room_id].remove(dead)

manager = ConnectionManager()

@router.websocket("/ws/{room_id}")
async def classroom_websocket_endpoint(websocket: WebSocket, room_id: str):
    await manager.connect(room_id, websocket)
    try:
        # Send initial welcome & sync state
        await websocket.send_text(json.dumps({
            "type": "connection_established",
            "room_id": room_id,
            "server_time": time.time(),
            "target_languages": ["hin_Deva", "sat_Olck", "tam_Taml", "eng_Latn"]
        }))
        
        while True:
            data = await websocket.receive_text()
            payload = json.loads(data)
            msg_type = payload.get("type", "speech_chunk")
            
            if msg_type == "teacher_speech":
                source_text = payload.get("text", "")
                source_lang = payload.get("source_language", "hin_Deva")
                target_langs = payload.get("target_languages", ["sat_Olck", "tam_Taml", "eng_Latn", "hin_Deva"])
                
                # Real-time multi-target translation fanout
                translations = batch_translate_for_classroom(source_text, source_lang, target_langs)
                
                packet = {
                    "type": "live_caption",
                    "packet_id": f"pkt_{int(time.time() * 1000)}",
                    "room_id": room_id,
                    "teacher_name": payload.get("teacher_name", "Teacher"),
                    "source_text": source_text,
                    "source_language": source_lang,
                    "translations": translations,
                    "is_final": payload.get("is_final", True),
                    "timestamp": time.time(),
                    "confidence": 0.97
                }
                
                # Broadcast sub-second subtitle packet to all connected students in the room
                await manager.broadcast_to_room(room_id, packet)
                
    except WebSocketDisconnect:
        manager.disconnect(room_id, websocket)
    except Exception as e:
        manager.disconnect(room_id, websocket)

@router.post("/broadcast-speech")
async def broadcast_speech_rest(payload: Dict[str, Any]):
    """
    REST fallback for broadcasting teacher speech when WebSockets are unavailable.
    """
    room_id = payload.get("room_id", "demo-class-101")
    source_text = payload.get("text", "गुड मॉर्निंग बच्चों! आज हम विज्ञान का पहला पाठ पढ़ेंगे।")
    source_lang = payload.get("source_language", "hin_Deva")
    target_langs = payload.get("target_languages", ["sat_Olck", "tam_Taml", "eng_Latn", "hin_Deva"])
    
    translations = batch_translate_for_classroom(source_text, source_lang, target_langs)
    packet = {
        "type": "live_caption",
        "packet_id": f"pkt_{int(time.time() * 1000)}",
        "room_id": room_id,
        "source_text": source_text,
        "source_language": source_lang,
        "translations": translations,
        "timestamp": time.time(),
        "confidence": 0.97
    }
    await manager.broadcast_to_room(room_id, packet)
    return packet
