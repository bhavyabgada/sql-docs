import os
from typing import List, Dict, Any
from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
from dotenv import load_dotenv
import uvicorn

# LangChain imports
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import DirectoryLoader, TextLoader
from langchain_community.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings
from langchain.chains import RetrievalQA
from langchain_openai import ChatOpenAI

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(title="SQL Learning Path AI Assistant")

# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static")

# Setup Jinja2 templates
templates = Jinja2Templates(directory="templates")

# Check if OpenAI API key is set
if not os.getenv("OPENAI_API_KEY"):
    print("Warning: OPENAI_API_KEY environment variable not set. AI features will not work.")

# Define request and response models
class QueryRequest(BaseModel):
    query: str

class QueryResponse(BaseModel):
    answer: str
    sources: List[Dict[str, Any]]

# Global variable to store the QA chain
qa_chain = None

@app.on_event("startup")
async def startup_event():
    """Initialize the vector database and QA chain on startup."""
    global qa_chain
    
    try:
        # Path to the SQL content directory (the symbolic link to the parent repo)
        content_dir = "../sql-content"
        
        # Check if the vector store already exists
        if os.path.exists("vectorstore"):
            # Load existing vector store
            embeddings = OpenAIEmbeddings()
            vector_store = FAISS.load_local("vectorstore", embeddings)
            print("Loaded existing vector store.")
        else:
            print("Creating new vector store from content...")
            # Load documents from the content directory
            loaders = [
                DirectoryLoader(f"{content_dir}/1_basic_sql_commands", glob="**/*.md", loader_cls=TextLoader),
                DirectoryLoader(f"{content_dir}/2_advanced_query_techniques", glob="**/*.md", loader_cls=TextLoader),
                DirectoryLoader(f"{content_dir}/3_transactions_and_concurrency", glob="**/*.md", loader_cls=TextLoader),
                DirectoryLoader(f"{content_dir}/4_data_types_json_xml_arrays", glob="**/*.md", loader_cls=TextLoader),
                DirectoryLoader(f"{content_dir}/5_procedural_sql", glob="**/*.md", loader_cls=TextLoader),
                DirectoryLoader(f"{content_dir}/6_analytical_and_performance_features", glob="**/*.md", loader_cls=TextLoader),
                DirectoryLoader(f"{content_dir}/7_reporting_and_pivoting", glob="**/*.md", loader_cls=TextLoader),
                DirectoryLoader(f"{content_dir}/8_unique_sql_features", glob="**/*.md", loader_cls=TextLoader),
                TextLoader(f"{content_dir}/README.md"),
                TextLoader(f"{content_dir}/0_readme.md"),
                DirectoryLoader(f"{content_dir}", glob="**/*.sql", loader_cls=TextLoader),
            ]
            
            documents = []
            for loader in loaders:
                documents.extend(loader.load())
            
            # Split documents into chunks
            text_splitter = RecursiveCharacterTextSplitter(
                chunk_size=1000,
                chunk_overlap=200,
                separators=["\n\n", "\n", " ", ""]
            )
            chunks = text_splitter.split_documents(documents)
            
            # Create vector store
            embeddings = OpenAIEmbeddings()
            vector_store = FAISS.from_documents(chunks, embeddings)
            
            # Save vector store for future use
            vector_store.save_local("vectorstore")
            print(f"Created and saved vector store with {len(chunks)} chunks.")
        
        # Create QA chain
        retriever = vector_store.as_retriever(
            search_type="similarity",
            search_kwargs={"k": 5}
        )
        
        llm = ChatOpenAI(
            model_name="gpt-4",
            temperature=0,
        )
        
        qa_chain = RetrievalQA.from_chain_type(
            llm=llm,
            chain_type="stuff",
            retriever=retriever,
            return_source_documents=True,
        )
        
        print("AI Assistant is ready to answer questions!")
        
    except Exception as e:
        print(f"Error initializing QA chain: {e}")
        # Continue without QA functionality

@app.get("/", response_class=HTMLResponse)
async def get_home(request: Request):
    """Render the home page."""
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/api/query", response_model=QueryResponse)
async def query(request: QueryRequest):
    """Process a query and return the answer with sources."""
    if not qa_chain:
        raise HTTPException(status_code=503, detail="AI Assistant is not available. Check if OpenAI API key is set.")
    
    try:
        # Get answer from QA chain
        result = qa_chain({"query": request.query})
        
        # Extract answer and sources
        answer = result["result"]
        source_documents = result["source_documents"]
        
        # Format sources
        sources = []
        for doc in source_documents:
            sources.append({
                "content": doc.page_content[:200] + "...",  # Truncate for display
                "source": doc.metadata.get("source", "Unknown")
            })
        
        return QueryResponse(answer=answer, sources=sources)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing query: {str(e)}")

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True) 