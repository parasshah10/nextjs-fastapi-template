from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import google.generativeai as genai
from google.generativeai.types import GenerationConfig
from ..config import settings

router = APIRouter()

class GreetingRequest(BaseModel):
    name: str
    language: str = "English"

@router.post("/greet")
async def send_greeting(request: GreetingRequest):
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
    
    try:
        prompt = f"""
        Generate a friendly greeting for {request.name} entirely in {request.language}.
        The greeting should be warm and exciting. No translations.
        """
        
        response = model.generate_content(prompt, safety_settings=safety_settings)
        greeting = response.text.strip()
        
        return {"greeting": greeting}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
