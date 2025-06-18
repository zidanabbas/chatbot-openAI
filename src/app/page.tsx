"use client";
import { useState, useRef, useEffect, KeyboardEvent } from "react";
import Header from "./components/organims/Header";

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
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 p-2 sm:p-4 flex flex-col items-center">
      <Header />
      <div className="w-full max-w-4xl flex flex-col sm:flex-row mt-2 sm:mt-4">
        {/* <aside className="w-full sm:w-1/4 bg-white/80 p-2 sm:p-4 rounded-lg shadow-lg mr-0 sm:mr-4 mb-2 sm:mb-0">
          <div className="flex justify-between items-center mb-2 sm:mb-4">
            <h2 className="text-sm sm:text-lg font-semibold text-gray-700">
              Valerio.ai
            </h2>
            <select className="bg-transparent border-none text-purple-600 text-xs sm:text-base">
              <option>Valerio v1.2</option>
            </select>
          </div>
          <input
            type="text"
            placeholder="Search chat..."
            className="w-full p-1 sm:p-2 mb-2 sm:mb-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-300 text-xs sm:text-base"
          />
          <nav className="space-y-1 sm:space-y-2">
            <button className="w-full text-left p-1 sm:p-2 text-gray-700 hover:bg-purple-100 rounded text-xs sm:text-sm">
              Explore
            </button>
            <button className="w-full text-left p-1 sm:p-2 text-gray-700 hover:bg-purple-100 rounded text-xs sm:text-sm">
              Library
            </button>
            <button className="w-full text-left p-1 sm:p-2 text-gray-700 hover:bg-purple-100 rounded text-xs sm:text-sm">
              Files
            </button>
            <button className="w-full text-left p-1 sm:p-2 text-gray-700 hover:bg-purple-100 rounded text-xs sm:text-sm">
              History
            </button>
          </nav>
          <div className="mt-2 sm:mt-4">
            <h3 className="text-xs sm:text-sm font-medium text-gray-600">
              Recent Chats
            </h3>
            <ul className="mt-1 sm:mt-2 space-y-1">
              <li className="text-xs sm:text-sm text-gray-700 hover:bg-purple-100 p-1 rounded">
                Brainstorming small business...
              </li>
              <li className="text-xs sm:text-sm text-gray-700 hover:bg-purple-100 p-1 rounded">
                The history of roman empire
              </li>
              <li className="text-xs sm:text-sm text-gray-700 hover:bg-purple-100 p-1 rounded">
                Crypto investment suggest...
              </li>
            </ul>
          </div>
        </aside> */}
        <main className="w-full sm:w-3/4 bg-white/60 p-2 sm:p-6 rounded-lg shadow-lg flex-1">
          {/* <div className="text-center mb-2 sm:mb-6">
            <h1 className="text-xl sm:text-3xl font-bold text-purple-800">
              Hello Marcus
            </h1>
            <p className="text-sm sm:text-xl text-gray-500">
              How can I help you today?
            </p>
          </div> */}
          {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 mb-2 sm:mb-6">
            <div className="bg-purple-200/70 p-2 sm:p-4 rounded-lg shadow-md text-center">
              <div className="w-6 h-6 sm:w-10 sm:h-10 bg-purple-300 rounded-full mx-auto mb-1 sm:mb-2 flex items-center justify-center">
                <span className="text-white text-xs sm:text-base">🌐</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-700">
                What’s Happen in 24 hours?
              </p>
              <p className="text-xs sm:text-xs text-gray-500">
                See what’s been happening in the world over the last 24 hours
              </p>
            </div>
            <div className="bg-purple-200/70 p-2 sm:p-4 rounded-lg shadow-md text-center">
              <div className="w-6 h-6 sm:w-10 sm:h-10 bg-purple-300 rounded-full mx-auto mb-1 sm:mb-2 flex items-center justify-center">
                <span className="text-white text-xs sm:text-base">📈</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-700">
                Stock market update
              </p>
              <p className="text-xs sm:text-xs text-gray-500">
                See what’s happening in the stock market in real time
              </p>
            </div>
            <div className="bg-purple-200/70 p-2 sm:p-4 rounded-lg shadow-md text-center">
              <div className="w-6 h-6 sm:w-10 sm:h-10 bg-purple-300 rounded-full mx-auto mb-1 sm:mb-2 flex items-center justify-center">
                <span className="text-white text-xs sm:text-base">🔍</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-700">
                Deep economic research
              </p>
              <p className="text-xs sm:text-xs text-gray-500">
                See research from experts that we have simplified
              </p>
            </div>
          </div> */}
          <div
            ref={chatboxRef}
            className="h-[200px] sm:h-[400px] overflow-y-auto bg-white/80 p-2 sm:p-4 rounded-lg shadow-inner flex flex-col gap-1 sm:gap-3 mb-2 sm:mb-4"
          >
            {chatLog.length === 0 && (
              <p className="text-center text-gray-500 text-xs sm:text-base">
                Mulai chat dengan mengetik pesan...
              </p>
            )}
            {chatLog.map((chat, idx) => (
              <div
                key={idx}
                className={`max-w-[70%] px-2 sm:px-4 py-1 sm:py-2 rounded-xl text-xs sm:text-sm leading-relaxed ${
                  chat.sender === "user"
                    ? "bg-purple-100 text-purple-800 self-end"
                    : "bg-gray-100 text-gray-800 self-start"
                }`}
              >
                {chat.text}
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-2 items-center">
            <input
              type="text"
              className="flex-grow border border-gray-300 px-2 sm:px-4 py-1 sm:py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-300 bg-white text-gray-800 placeholder-gray-500 text-xs sm:text-base"
              placeholder="Ask something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="bg-purple-600 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 text-xs sm:text-base w-full sm:w-auto"
            >
              {isLoading ? "Mengirim..." : "Kirim"}
            </button>
          </div>
          {error && (
            <p className="text-red-600 mt-1 sm:mt-2 text-center text-xs sm:text-base">
              {error}
            </p>
          )}
          <p className="text-center text-gray-500 text-xs sm:text-sm mt-1 sm:mt-4">
            © All rights reserved.{" "}
            <a
              href="https://abbasdev.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-700 underline hover:text-purple-900"
            >
              Zidane Abbas
            </a>
          </p>
        </main>
      </div>
      {/* <div className="w-full max-w-4xl mt-2 sm:mt-4 text-right text-purple-600 text-xs sm:text-sm">
        Join the valerio community for more insights - Discord
      </div> */}
    </div>
  );
}
