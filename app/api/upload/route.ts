export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import PDFParser from "pdf2json";

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
            console.log(textItem);
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

    return NextResponse.json({ text });
  } catch (error: any) {
    console.error("PDF ERROR:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process PDF" },
      { status: 500 },
    );
  }
}
