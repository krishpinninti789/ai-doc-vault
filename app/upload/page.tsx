"use client";

import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");

  console.log(";;;", file);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setText(data.text);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Upload PDF</h1>

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 ml-2"
      >
        Upload
      </button>

      <div className="mt-6 whitespace-pre-wrap">{text}</div>
    </div>
  );
}
