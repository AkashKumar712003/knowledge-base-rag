<h1 align="center">📘 Knowledge-Base Search Engine (RAG System)</h1>

<p align="center">
  AI-powered PDF & TXT reader using <b>Retrieval-Augmented Generation (RAG)</b>
</p>

<p align="center">
  <b>Node.js</b> • <b>Gemini Embeddings</b> • <b>Groq LLM</b>
</p>

<hr/>

## 🎥 Demo Video

👉 **Watch the project demo here:**  
**Google Drive Video Demo** (add your link here)

> Upload a document → Ask a question → Get a document-grounded AI answer

---

## 📌 Project Overview

This project implements a **Knowledge-Base Search Engine** using  
**Retrieval-Augmented Generation (RAG)**.

The system allows users to upload **TXT or PDF documents**, ask natural language
questions, and receive **accurate answers grounded strictly in the uploaded
documents**.

Instead of relying only on an LLM’s internal knowledge, the system first
**retrieves relevant document content using embeddings**, then synthesizes the
final answer using an LLM.

---

## 🎯 Objectives

- Enable question answering over user-provided documents  
- Reduce hallucinations by grounding answers in document context  
- Demonstrate a complete **RAG pipeline with backend APIs**  
- Handle real-world document ingestion challenges (PDFs)

---

## 🧠 What is Retrieval-Augmented Generation (RAG)?

Retrieval-Augmented Generation (RAG) combines:

- **Information Retrieval** – finding relevant document chunks  
- **Language Generation** – generating answers using an LLM with retrieved context  

### Benefits:
- Improved accuracy  
- Higher reliability  
- Better explainability  
- Up-to-date responses  

---

## 🏗️ System Architecture

> Rendered inside a code block to keep GitHub formatting clean

User
│
├── Upload Document (PDF / TXT)
│
▼
Document Ingestion
├── Text Extraction
├── Cleaning & Chunking
├── Embedding Generation (Gemini)
│
▼
In-Memory Vector Store
│
User Query
│
├── Query Embedding (Gemini)
├── Cosine Similarity Search
│
▼
Top-K Relevant Chunks
│
▼
LLM Answer Generation (Groq – LLaMA)
│
▼
Final Answer


---

## 🛠️ Tech Stack

### Backend
- **Node.js**
- **Express.js**

### AI / ML
- **Google Gemini API** – Embeddings
- **Groq API (LLaMA-3.1)** – Answer generation

### Document Processing
- **pdf-parse** – PDF text extraction
- Custom text cleaning and validation

### Utilities
- **Multer** – File uploads
- **Cosine similarity** – Vector search

---

## 📂 Project Structure

knowledge-base-rag/
│
├── backend/
│ ├── server.js # Express server & routes
│ ├── ingest.js # Document ingestion logic
│ ├── embed.js # Gemini embedding generation
│ ├── query.js # Retrieval + Groq generation
│ ├── search.js # Cosine similarity
│
├── data/
│ └── documents/ # Uploaded files (temporary)
│
├── .env.example
├── package.json
└── README.md


---

## 🔄 API Endpoints

### 📤 Upload Document

- Content-Type: `multipart/form-data`
- Field name: `file`
- Supports: `.txt`, text-based `.pdf`

**Response**
```json
{
  "message": "Document ingested successfully"
}
POST /query
{
  "question": "What is Retrieval Augmented Generation?"
}
{
  "answer": "Retrieval Augmented Generation is a technique where relevant documents..."
}
🔍 How the System Works
1️⃣ Document Ingestion

User uploads a document

Text is extracted

Text is cleaned and validated

Content is split into chunks

Each chunk is converted into an embedding (Gemini)

2️⃣ Vector Storage

Embeddings stored in an in-memory vector store

Each entry contains { text, embedding }

3️⃣ Query Processing

User query → embedding (Gemini)

Cosine similarity used to retrieve relevant chunks

4️⃣ Answer Generation

Top-K chunks passed as context

Groq LLM generates an answer strictly from context

🤖 Why Gemini + Groq?
🔹 Gemini (Embeddings)

Free tier

High-quality semantic embeddings

Ideal for retrieval tasks

🔹 Groq (Generation)

Free and fast

Stable OpenAI-compatible API

Avoids Gemini SDK instability for text generation

The RAG architecture is provider-agnostic, allowing different providers for
retrieval and generation without changing the system design.

🚧 Challenges Faced & Solutions
❌ 1. PDF Text Extraction Issues

Problem:
Some PDFs returned binary garbage (/Font, endobj, symbols)

Cause:
Font-encoded or encrypted PDFs

Solution:

Strong text cleaning

Validation to reject unsupported PDFs

Recommendation to use text-based PDFs or OCR

❌ 2. Gemini Model Errors (404 / Unsupported)

Problem:
Gemini generation models returned errors

Solution:

Retained Gemini for embeddings

Switched to Groq for text generation

Improved reliability without changing architecture

❌ 3. Slow Ingestion Time

Problem:
Large PDFs caused slow embedding generation

Solution:

Limited chunk count for demo

Explained ingestion as an offline step

❌ 4. Data Loss on Server Restart

Problem:
Vector DB resets on restart

Cause:
In-memory storage

Solution:

Documented limitation

Suggested production alternatives:
FAISS, Chroma, MongoDB Atlas Vector Search

📄 PDF Support (Important Note)

✔ Supported:

Text-based PDFs (LibreOffice, research papers)

TXT files

❌ Not supported:

Scanned PDFs

Image-only PDFs

Font-encoded PDFs (Google Docs / Canva)

OCR can be integrated in future versions.

▶️ How to Run Locally
1️⃣ Clone Repository

git clone https://github.com/your-username/knowledge-base-rag.git
cd knowledge-base-rag

npm install

3️⃣ Setup Environment Variables

Create .env file:

GEMINI_API_KEY=your_gemini_key
GROQ_API_KEY=your_groq_key

node backend/server.js

http://localhost:3000

🧪 Demo Flow

Upload a TXT or text-based PDF

Wait for ingestion

Ask a question

Receive a grounded AI answer

🏁 Conclusion

This project demonstrates a complete, real-world RAG pipeline while handling
practical challenges such as PDF extraction, model instability, and vector
storage limitations.

The focus is on robust architecture, clarity, and explainability rather than
over-engineering.