from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import greeting  # Removed test_stream

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(greeting.router, prefix="/api")

@app.get("/")
async def root():
    return {"message": "Welcome to the NextJS FastAPI"}

