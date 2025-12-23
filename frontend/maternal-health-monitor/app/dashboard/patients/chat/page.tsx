"use client";
import PatientsLayout from "@/components/patientsLayout";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Message = { sender: "user" | "bot"; text: string };

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", text: "Hello Abdi 👋, how can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const newMessages = [...messages, { sender: "user", text }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:5001/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      if (!res.ok) throw new Error("Network error");
      const data = await res.json();

      setMessages([
        ...newMessages,
        { sender: "bot", text: data.reply ?? "..." },
      ]);
    } catch (err) {
      setMessages([
        ...newMessages,
        { sender: "bot", text: "Error contacting chatbot." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PatientsLayout className="flex h-screen flex-col bg-neutral-50">
      <div className="border-b bg-white px-4 py-3">
        <div className="text-lg font-semibold">Ask Me Any thing you need I stand Here to help You !</div>
        <div className="text-xs text-neutral-500">
          {loading ? "Bot is typing..." : "Online"}
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4">
        <div className="mx-auto flex max-w-2xl flex-col space-y-3">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${
                m.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`rounded-2xl px-3 py-2 text-sm shadow-sm ${
                  m.sender === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-neutral-200 text-neutral-900"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t bg-white p-3">
        <div className="mx-auto flex max-w-2xl gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your message..."
          />
          <Button onClick={sendMessage} disabled={loading}>
            {loading ? "Sending..." : "Send"}
          </Button>
        </div>
      </div>
    </PatientsLayout>
  );
}
