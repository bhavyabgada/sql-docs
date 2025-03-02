# SQL Docs AI

This project extends the SQL Learning Path repository with a documentation website and an AI inference engine.

## Components

### 1. Documentation Website (`docs-site/`)

A searchable documentation website built with Docusaurus that provides:
- Organized access to all SQL learning materials
- Full-text search capabilities
- Mobile-friendly responsive design
- Dark/light mode support
- Easy navigation through SQL topics

### 2. AI Inference Engine (`ai-inference/`)

An AI-powered question-answering system that:
- Uses RAG (Retrieval Augmented Generation) to answer SQL-related questions
- Indexes all content from the SQL Learning Path repository
- Provides accurate, contextual answers based on the repository content
- Supports natural language queries about SQL concepts and techniques

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Git
- OpenAI API key (for the AI inference engine)

### Setup

1. Clone this repository with submodules:
   ```
   git clone --recurse-submodules https://github.com/bhavyabgada/sql-docs.git
   ```
   
   If you've already cloned the repository without submodules, run:
   ```
   git submodule update --init --recursive
   ```

2. Run the setup script to prepare the environment:
   ```
   ./setup.sh
   ```
3. Edit the `.env` file in the `ai-inference` directory to add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```
4. Run the documentation website:
   ```
   docker-compose -f docker-compose.docs.yml up
   ```
5. Run the AI inference engine:
   ```
   docker-compose -f docker-compose.ai.yml up
   ```
6. Or run both services together:
   ```
   docker-compose up
   ```

### Accessing the Services

- Documentation website: http://localhost:3000
- AI inference engine: http://localhost:8000

## Development

### Documentation Website

The documentation website is built with Docusaurus. To develop the site:

1. Navigate to the `docs-site` directory
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```

### AI Inference Engine

The AI inference engine is built with FastAPI and LangChain. To develop the engine:

1. Navigate to the `ai-inference` directory
2. Create a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```
4. Create a `.env` file with your OpenAI API key
5. Start the development server:
   ```
   uvicorn main:app --reload
   ```

## Architecture

This project uses the SQL Learning Path repository as a Git submodule (`sql-content`), ensuring that the documentation and AI inference engine always have access to the latest content while maintaining proper version control.

### Directory Structure

```
sql-docs-ai/
├── docs-site/              # Docusaurus website
├── ai-inference/           # AI inference engine
├── sql-content/            # Git submodule of the SQL Learning Path repository
├── docker-compose.yml      # Combined Docker Compose file
├── docker-compose.docs.yml # Docker Compose file for docs site
├── docker-compose.ai.yml   # Docker Compose file for AI inference
└── setup.sh                # Setup script
```

## Updating the SQL Content

To update the SQL content submodule to the latest version:

```
cd sql-content
git pull origin main
cd ..
git add sql-content
git commit -m "Update SQL content submodule"
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. 