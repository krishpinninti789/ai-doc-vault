export async function generateAnswer(query: string, context: string) {
  const res = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "mistral",
      prompt: `
You are an AI assistant.

Answer ONLY using the context below.
If the answer is not in the context, say "I don't know".

Context:
${context}

Question:
${query}

Answer:
      `,
      stream: false,
    }),
  });

  const data = await res.json();
  return data.response;
}
