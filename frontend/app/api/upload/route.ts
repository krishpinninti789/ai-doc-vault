export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import PDFParser from "pdf2json";
import { cleanText } from "../../../services/cleanupUtils";
import { chunkText } from "../../../services/chunkText";
import { generateEmbedding } from "../../../services/embeddings";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const pdfParser = new PDFParser();

    const text: string = await new Promise((resolve, reject) => {
      pdfParser.on("pdfParser_dataError", (errData: any) => {
        reject(errData.parserError);
      });

      pdfParser.on("pdfParser_dataReady", (pdfData: any) => {
        let extractedText = "";

        pdfData.Pages.forEach((page: any) => {
          page.Texts.forEach((textItem: any) => {
            textItem.R.forEach((r: any) => {
              extractedText += decodeURIComponent(r.T) + " ";
            });
          });
          extractedText += "\n";
        });

        resolve(extractedText);
      });

      pdfParser.parseBuffer(buffer);
    });

    const cleaned = cleanText(text);
    const chunks = chunkText(cleaned);

    const embeddedChunks = await Promise.all(
      chunks.map(async (chunk) => {
        const embedding = await generateEmbedding(chunk);
        return {
          text: chunk,
          embedding,
        };
      }),
    );

    await fetch("http://127.0.0.1:8000/store", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        texts: embeddedChunks.map((c) => c.text),
        embeddings: embeddedChunks.map((c) => c.embedding),
        ids: embeddedChunks.map((_, i) => `chunk-${i}-${Date.now()}`),
      }),
    });

    return NextResponse.json({
      text: cleaned,
      chunks: embeddedChunks.length,
    });
  } catch (error: any) {
    console.error("PDF ERROR:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process PDF" },
      { status: 500 },
    );
  }
}
