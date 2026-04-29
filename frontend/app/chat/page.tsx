"use client";

import { useState } from "react";

export default function ChatPage() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [sources, setSources] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;

    setLoading(true);
    setAnswer("");
    setSources([]);

    try {
      const res = await fetch("/api/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();

      setAnswer(data.answer || "No answer found");
      setSources(data.sources || []);
    } catch (err) {
      console.error(err);
      setAnswer("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Ask Questions</h1>

      <div className="flex gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask something..."
          className="border px-2 py-1 w-80"
        />

        <button
          onClick={handleSearch}
          className="bg-green-500 text-white px-4 py-2"
        >
          {loading ? "Thinking..." : "Ask"}
        </button>
      </div>

      {/* ✅ Answer */}
      {answer && (
        <div className="mt-6 p-4 border rounded">
          <h2 className="font-semibold mb-2">Answer:</h2>
          <p>{answer}</p>
        </div>
      )}

      {/* ✅ Sources (optional) */}
      {sources.length > 0 && (
        <div className="mt-6">
          <h2 className="font-semibold mb-2">Sources:</h2>
          <div className="space-y-2">
            {sources.map((src, i) => (
              <div key={i} className="p-2 border rounded text-sm">
                {src}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
