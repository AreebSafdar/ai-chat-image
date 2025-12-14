"use client";

export default function ChatBox({ messages }) {
  return (
    <div className="h-96 overflow-y-auto bg-gray-800 rounded-lg p-4 mb-4">
      {messages.map((msg, i) => (
        <div key={i} className={`mb-2 ${msg.role === "ai" ? "text-blue-300" : "text-white"}`}>
          <strong>{msg.role === "ai" ? "AI:" : "You:"}</strong> {msg.text}
        </div>
      ))}
    </div>
  );
}
