"use client";

import { useState } from "react";

export default function ImageEditor() {
  const [file, setFile] = useState(null);
  const [editedImage, setEditedImage] = useState(null);
  const [prompt, setPrompt] = useState("");

  const handleEdit = async () => {
    if (!file || !prompt) return;

    const formData = new FormData();
    formData.append("image", file);
    formData.append("prompt", prompt);

    const res = await fetch("/api/image", { method: "POST", body: formData });
    const data = await res.json();
    setEditedImage(data.url);
  };

  return (
    <div className="flex flex-col space-y-4">
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <input
        type="text"
        placeholder="Describe the edit..."
        className="p-2 rounded bg-gray-700 text-white"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        onClick={handleEdit}
        className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500 transition"
      >
        Edit Image
      </button>

      {file && !editedImage && (
        <img src={URL.createObjectURL(file)} alt="original" className="mt-4 rounded" />
      )}
      {editedImage && <img src={editedImage} alt="edited" className="mt-4 rounded" />}
    </div>
  );
}
