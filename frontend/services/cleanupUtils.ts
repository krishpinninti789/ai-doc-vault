export function cleanText(text: string) {
  return text
    .replace(/\s+/g, " ") // remove extra spaces
    .replace(/\n+/g, "\n") // normalize newlines
    .replace(/[^\x00-\x7F]/g, "") // remove weird unicode (optional)
    .trim();
}
