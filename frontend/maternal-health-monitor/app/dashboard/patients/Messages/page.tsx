"use client";

import { useState, useEffect, useRef } from "react";
import io, { Socket } from "socket.io-client";
import PatientsLayout from "@/components/PatientsLayout";
import { Message, ChatProps } from "@/app/type/patients";
import { Button } from "@/components/ui/button";

const socket: Socket = io("http://localhost:4000", {
  transports: ["websocket"],
});

const Chat: React.FC<ChatProps> = ({ currentUser, receiver }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [content, setContent] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!currentUser) return;

    socket.emit("joinRoom", currentUser);

    socket.on("newMessage", (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("newMessage");
    };
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser || !receiver) return;

    const fetchMessages = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/api/messages?sender=${currentUser}&receiver=${receiver}`
        );
        const data: Message[] = await res.json();
        setMessages(data);
      } catch (error) {
        console.error("Failed to fetch messages", error);
      }
    };

    fetchMessages();
  }, [currentUser, receiver]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!content.trim() || !receiver) return;

    const newMessage: Message = {
      sender: currentUser,
      content,
      time: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setContent("");

    socket.emit("sendMessage", {
      sender: currentUser,
      receiver,
      content,
      time: newMessage.time,
    });

    try {
      await fetch("http://localhost:4000/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender: currentUser,
          receiver,
          content,
        }),
      });
    } catch (error) {
      console.error("Failed to save message", error);
    }
  };

  return (
    <PatientsLayout>
      <div className="h-full w-full flex flex-col bg-white">
        <div className="bg-yellow-600 text-white p-4 font-semibold">
          Chat with {receiver}
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
          {messages.map((m, i) => {
            const isMe = m.sender === currentUser;

            return (
              <div
                key={i}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${
                    isMe
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-gray-200 text-gray-800 rounded-bl-none"
                  }`}
                >
                  <p>{m.content}</p>
                  <span className="block text-xs opacity-60 mt-1 text-right">
                    {new Date(m.time).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex p-3 border-t bg-white">
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border rounded-full px-4 py-2 mr-2 focus:outline-none"
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <Button
            onClick={sendMessage}
            className="bg-yellow-600 text-white px-5 rounded-full cursor-pointer"
          >
            Send
          </Button>
        </div>
      </div>
    </PatientsLayout>
  );
};

export default Chat;
