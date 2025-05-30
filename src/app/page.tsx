"use client";
import { useState, useRef, useEffect, KeyboardEvent } from "react";

type ChatMessage = {
  sender: "user" | "bot";
  text: string;
};

export default function Home() {
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState<ChatMessage[]>([
    { sender: "bot", text: "Halo! Ada yang bisa saya bantu?" },
  ]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const chatboxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [chatLog]);

  async function sendMessage() {
    if (!input.trim()) return;

    setIsLoading(true);
    setError(null);

    const userMessage = input.trim();

    setChatLog((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data: { reply?: string; error?: string } = await res.json();

      if (!res.ok) {
        setError(data.error || "Terjadi kesalahan tidak diketahui.");
      } else if (data.reply) {
        // Update chat dengan balasan bot
        setChatLog((prev) => [...prev, { sender: "bot", text: data.reply! }]);
      } else {
        setError("Tidak ada jawaban dari server.");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Terjadi kesalahan saat mengirim permintaan.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !isLoading) {
      sendMessage();
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-8 px-4">
      <h1 className="text-2xl font-bold text-center mb-4">Simple AI Chatbot</h1>

      <div
        ref={chatboxRef}
        className="h-[400px] overflow-y-auto border border-gray-300 bg-white p-4 rounded-md flex flex-col gap-3 mb-4"
      >
        {chatLog.length === 0 && (
          <p className="text-center text-gray-400">
            Mulai chat dengan mengetik pesan...
          </p>
        )}
        {chatLog.map((chat, idx) => (
          <div
            key={idx}
            className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm leading-relaxed ${
              chat.sender === "user"
                ? "bg-green-100 text-green-800 self-end"
                : "bg-blue-100 text-blue-900 self-start"
            }`}
          >
            {chat.text}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          className="flex-grow border border-gray-300 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Ketik pesan..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        <button
          onClick={sendMessage}
          disabled={isLoading || !input.trim()}
          className="bg-green-700 text-white px-4 py-2 rounded-full font-semibold hover:bg-green-800 transition"
        >
          {isLoading ? "Mengirim..." : "Kirim"}
        </button>
      </div>

      {error && <p className="text-red-600 mt-2 text-center">{error}</p>}

      <p className="text-center text-gray-500 text-sm mt-4">
        © All rights reserved.{" "}
        <a
          href="https://abbasdev.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-700 underline hover:text-green-900"
        >
          Zidane Abbas
        </a>
      </p>
    </div>
  );
}
