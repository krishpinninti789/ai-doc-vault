This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# 🧠 AI Document Vault (RAG System)

A full-stack AI-powered document system built with Next.js that allows users to upload PDFs, process them into semantic chunks, generate embeddings locally, and perform intelligent search using similarity matching.

---

## 🚀 Features (Implemented So Far)

### 📄 1. PDF Upload & Parsing

- Upload PDF files via UI
- Extract text using `pdf2json`
- Handles encoded text (`decodeURIComponent`)

---

### 🧹 2. Text Cleaning Pipeline

- Removes extra whitespace
- Normalizes formatting
- Prepares text for AI processing

---

### ✂️ 3. Chunking Strategy

- Splits large text into smaller chunks
- Uses **sliding window with overlap**
- Improves semantic understanding

---

### 🧠 4. Embedding Generation (Local AI)

- Uses **Ollama**
- Model: `nomic-embed-text`
- Converts chunks into vector representations

---

### 🔍 5. Semantic Search (Similarity Engine)

- Converts user query → embedding
- Uses **cosine similarity**
- Returns most relevant chunks

---

## 🏗️ Tech Stack

- **Frontend + Backend**: Next.js (App Router)
- **PDF Parsing**: pdf2json
- **AI Runtime**: Ollama
- **Embedding Model**: nomic-embed-text
- **Language**: TypeScript

---

## ⚙️ Project Structure

```
/app
  /upload
  /api
    /upload
    /query

/services
  cleanText.ts
  chunkText.ts
  embeddings.ts
  similarity.ts
```

---

## 🔄 System Flow

```
PDF Upload
   ↓
Text Extraction
   ↓
Cleaning
   ↓
Chunking
   ↓
Embeddings (Ollama)
   ↓
Store (in-memory for now)
   ↓
User Query
   ↓
Embedding
   ↓
Similarity Search
   ↓
Top Relevant Chunks
```

---

## 🧪 API Endpoints

### 1. Upload & Process Document

**POST** `/api/upload`

- Upload PDF file
- Extracts text
- Generates embeddings

**Response:**

```json
{
  "message": "Document processed successfully",
  "chunkCount": 12
}
```

---

### 2. Query Document

**POST** `/api/query`

**Request:**

```json
{
  "query": "What is AI?"
}
```

**Response:**

```json
{
  "results": [
    {
      "text": "AI is used in healthcare...",
      "score": 0.89
    }
  ]
}
```

---

## 🧠 Core Concepts Used

- Retrieval-Augmented Generation (RAG)
- Embeddings & Vector Similarity
- Cosine Similarity
- Sliding Window Chunking
- Local AI (no paid APIs)

---

## ⚠️ Current Limitations

- Embeddings stored **in-memory only**
- Data lost on server restart
- No persistent database yet
- No final LLM-generated answers (search only)

---

## 🛠️ Setup Instructions

### 1. Install dependencies

```bash
npm install
```

---

### 2. Install & Run Ollama

Download from: https://ollama.com

```bash
ollama serve
ollama pull nomic-embed-text
```

---

### 3. Environment Variables

Create `.env.local`:

```
OLLAMA_BASE_URL=http://localhost:11434
```

---

### 4. Run the app

```bash
npm run dev
```

---

## 📌 Upcoming Features

- Persistent vector storage (DB)
- Chat-based interface (LLM responses)
- Multi-document search
- Streaming responses
- Authentication & user-based documents

---

## 🧠 Learning Outcomes

This project demonstrates:

- Building a full RAG pipeline from scratch
- Running AI models locally
- Implementing semantic search
- Handling real-world backend issues (PDF parsing, embeddings, performance)

---

## 👨‍💻 Author

Built as part of deep learning into AI systems and modern fullstack development.

---
