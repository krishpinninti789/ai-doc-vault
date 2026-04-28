export function chunkText(text: string, chunkSize = 500, overlap = 100) {
  const chunks: string[] = [];

  if (overlap >= chunkSize) {
    throw new Error("Overlap must be smaller than chunk size");
  }

  let start = 0;

  while (start < text.length) {
    const end = start + chunkSize;

    const chunk = text.slice(start, end);
    chunks.push(chunk);

    start += chunkSize - overlap;
  }

  return chunks;
}
