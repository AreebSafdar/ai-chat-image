"use client";

import { useState } from "react";

export default function ChatInput({ messages, setMessages }) {
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", text: input };
    setMessages([...messages, userMsg]);
    setInput("");

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [...messages, userMsg] }),
    });

    const data = await res.json();
    setMessages((prev) => [...prev, { role: "ai", text: data.reply }]);
  };

  return (
    <div className="flex space-x-2">
      <input
        type="text"
        className="flex-1 p-2 rounded bg-gray-700 text-white"
        placeholder="Type a message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button
        className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500 transition"
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  );
}
