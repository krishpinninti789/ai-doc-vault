import { NextRequest, NextResponse } from "next/server";
import { generateEmbedding } from "../../../services/embeddings";
import { generateAnswer } from "../../../services/llm";

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    // 1. Convert query → embedding
    const queryEmbedding = await generateEmbedding(query);

    // 2. Fetch relevant chunks from Chroma
    const res = await fetch("http://127.0.0.1:8000/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        embedding: queryEmbedding,
      }),
    });

    const data = await res.json();

    const documents = data?.documents?.[0] || [];

    // 3. Build context
    const context = documents.join("\n");

    // 4. Generate final answer
    const answer = await generateAnswer(query, context);

    return NextResponse.json({
      answer,
      sources: documents, // optional
    });
  } catch (error: any) {
    console.error("QUERY ERROR:", error);

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
