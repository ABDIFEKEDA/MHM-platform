"use client";

import { useState, useEffect, useRef } from "react";
import io, { Socket } from "socket.io-client";
import AdminLayout from "@/components/adminLayout";
import { Message, ChatProps } from "@/app/type/patients";

const socket: Socket = io("http://localhost:4000");

const Chat: React.FC<ChatProps> = ({ currentUser, receiver }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [content, setContent] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.emit("joinRoom", currentUser);

    socket.on("newMessage", (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });

    const fetchMessages = async () => {
      const res = await fetch(
        `http://localhost:4000/api/messages?sender=${currentUser}&receiver=${receiver}`
      );
      const data: Message[] = await res.json();
      setMessages(data);
    };
    fetchMessages();

    return () => {
      socket.off("newMessage");
      socket.disconnect();
    };
  }, [currentUser, receiver]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!content.trim()) return;
    await fetch("http://localhost:4000/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sender: currentUser, receiver, content })
    });
    setContent("");
  };

  return (
    <AdminLayout>
      <div className="flex flex-col h-screen max-w-lg mx-auto border rounded-lg shadow-xl bg-white">
        
        <div className="flex items-center justify-between bg-blue-600 text-white p-4 rounded-t-lg">
          <h2 className="text-lg font-semibold">Chat with {receiver}</h2>
          <span className="text-sm opacity-80">● Online</span>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${
                m.sender === currentUser ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-2xl shadow-md max-w-xs transition-transform hover:scale-105 ${
                  m.sender === currentUser
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                <p className="text-sm">{m.content}</p>
                <span className="block text-xs opacity-70 mt-1">
                  {new Date(m.time).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="flex items-center p-4 border-t bg-white">
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border rounded-full px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition-colors duration-200"
          >
            ➤
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Chat;
