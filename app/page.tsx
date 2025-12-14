"use client";

import { useState } from "react";
import ChatBox from "./components/ChatBox";
import ChatInput from "./components/ChatInput";
import ImageEditor from "./components/ImageEditor";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [tab, setTab] = useState("chat"); // chat | image

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">AI Chat & Image Editor</h1>

      {/* Tabs */}
      <div className="flex justify-center mb-6 space-x-4">
        <button
          className={`px-4 py-2 rounded ${tab === "chat" ? "bg-blue-600" : "bg-gray-800"}`}
          onClick={() => setTab("chat")}
        >
          Chat
        </button>
        <button
          className={`px-4 py-2 rounded ${tab === "image" ? "bg-blue-600" : "bg-gray-800"}`}
          onClick={() => setTab("image")}
        >
          Image Edit
        </button>
      </div>

      {/* Content */}
      {tab === "chat" ? (
        <div className="max-w-3xl mx-auto">
          <ChatBox messages={messages} />
          <ChatInput messages={messages} setMessages={setMessages} />
        </div>
      ) : (
        <div className="max-w-3xl mx-auto">
          <ImageEditor />
        </div>
      )}
    </div>
  );
}
