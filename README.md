# Next.js + FastAPI Template

This project serves as a template for building applications that combine a Next.js frontend with a FastAPI backend. It demonstrates how to structure and connect these technologies, using a simple AI-powered greeting generator as an example feature.

## Features

- Next.js 14 frontend with App Router, demonstrating a modern React setup
- FastAPI backend, showing Python-based API development
- Integration example with Google's Gemini AI model
- shadcn/ui components for a sleek, customizable UI
- Tailwind CSS for styling
- Example of cross-stack functionality (AI-powered greeting generation)

## Tech Stack

- Frontend: Next.js 14 (React 18)
- Backend: FastAPI (Python)
- UI Components: shadcn/ui (based on Radix UI)
- Styling: Tailwind CSS
- AI Integration: Google Gemini AI (as an example)

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- Python (v3.8 or later)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/nextjs-fastapi-template.git
   cd nextjs-fastapi-template
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Install backend dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Add your Gemini API key to the `.env` file (for the example AI feature)

### Running the Application

There are two recommended ways to run the application:

1. Development mode (with hot-reloading):
   ```bash
   npm run dev
   ```

   This command will:
   - Start the Next.js dev server on port 3000
   - Start the FastAPI server on port 8000
   - Enable hot-reloading for both frontend and backend

2. Production mode:
   ```bash
   npm start
   ```

   This command will:
   - Build the Next.js application
   - Start the Next.js production server on port 3000
   - Start the FastAPI server on port 8000

For both options, you can access the application at http://localhost:3000 in your browser.

If you need to run the frontend and backend separately:

- Frontend only: 
  - Development: `npm run dev`
  - Production: `npm run build && npm run start`
- Backend only: `uvicorn app.api.main:app --host 0.0.0.0 --port 8000 --reload`

## Template Usage

This template provides a starting point for building applications with Next.js and FastAPI. The AI greeting generator is included as an example of how to integrate external services. You can:

1. Use this structure to build your own applications
2. Replace the AI greeting feature with your own API endpoints and frontend components
3. Extend the capabilities or integrate different services as needed

## Contributing

Contributions to improve this template are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
