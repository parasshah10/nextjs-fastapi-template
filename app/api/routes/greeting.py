from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
import google.generativeai as genai
from google.generativeai.types import GenerationConfig
from ..config import settings
import asyncio
import json
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter()

@router.get("/greet")
async def send_greeting(request: Request):
    name = request.query_params.get("name", "")
    language = request.query_params.get("language", "English")

    genai.configure(api_key=settings.GEMINI_API_KEY)
    
    safety_settings = {'HATE': 'BLOCK_NONE', 'SEXUAL': 'BLOCK_NONE', 'HARASSMENT': 'BLOCK_NONE', 'DANGEROUS': 'BLOCK_NONE'}
    generation_config = GenerationConfig(
        temperature=0.7,
        top_p=0.9,
        top_k=40,
        candidate_count=1,
        max_output_tokens=8000,
    )
    
    model = genai.GenerativeModel(model_name="gemini-1.5-flash-002", generation_config=generation_config)
    
    async def generate_greeting():
        try:
            prompt = f"""
            Generate a 4 paragraph friendly greeting for {name} entirely in {language}.
            The greeting should be warm and exciting. No translations.
            """
            
            response = model.generate_content(prompt, stream=True, safety_settings=safety_settings)
            for chunk in response:
                if chunk.text:
                    yield f"data: {json.dumps({'message': chunk.text})}\n\n"
            yield "event: done\ndata: Stream finished\n\n"
        except Exception as e:
            logger.error(f"Error during greeting generation: {str(e)}")
            yield f"data: {json.dumps({'error': str(e)})}\n\n"
    
    return StreamingResponse(generate_greeting(), media_type="text/event-stream")
