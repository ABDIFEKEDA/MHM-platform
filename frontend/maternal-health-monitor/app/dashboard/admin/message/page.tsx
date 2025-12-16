"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AdminLayout from "@/components/adminLayout";
import {
  Send,
  Search,
  Phone,
  Video,
  Loader2,
} from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Message, Conversation } from "@/app/type/patients";
import { messageService } from "@/app/services/messageService";
import { toast } from "sonner";

const Messages = function () {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [conversationMessages, setConversationMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  
  useEffect(() => {
    fetchConversations();
  }, []);

  
  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation.id);
      markAsRead(selectedConversation.id);
    }
  }, [selectedConversation]);

  const fetchConversations = async () => {
    try {
      setIsLoading(true);
      const data = await messageService.getConversations();
      setConversations(data);
      
      
      if (data.length > 0 && !selectedConversation) {
        setSelectedConversation(data[0]);
      }
    } catch (error) {
      toast.error("Failed to load conversations");
      console.error("Error fetching conversations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMessages = async (conversationId: number) => {
    try {
      setIsLoadingMessages(true);
      const messages = await messageService.getMessages(conversationId);
      setConversationMessages(messages);
    } catch (error) {
      toast.error("Failed to load messages");
      console.error("Error fetching messages:", error);
    } finally {
      setIsLoadingMessages(false);
    }
  };

  const markAsRead = async (conversationId: number) => {
    try {
      await messageService.markAsRead(conversationId);
      
      // Update local state
      setConversations(prev => 
        prev.map(conv => 
          conv.id === conversationId ? { ...conv, unread_count: 0 } : conv
        )
      );
    } catch (error) {
      console.error("Error marking as read:", error);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;

    try {
      setIsSending(true);
      
      // Send message to backend
      const sentMessage = await messageService.sendMessage({
        conversation_id: selectedConversation.id,
        content: newMessage.trim(),
      });

      // Add to local state immediately
      const newMsg: Message = {
        ...sentMessage,
        is_me: true,
        sender_name: "You"
      };

      setConversationMessages(prev => [...prev, newMsg]);
      setNewMessage("");

      // Update conversation in list with new last message
      setConversations(prev => 
        prev.map(conv => 
          conv.id === selectedConversation.id 
            ? { 
                ...conv, 
                last_message_content: newMessage,
                last_message_time: new Date().toISOString(),
                unread_count: 0
              } 
            : conv
        )
      );

      toast.success("Message sent");
    } catch (error) {
      toast.error("Failed to send message");
      console.error("Error sending message:", error);
    } finally {
      setIsSending(false);
    }
  };

  const handleConversationSelect = async (conversation: Conversation) => {
    setSelectedConversation(conversation);
    
    // Mark as read in backend
    try {
      await messageService.markAsRead(conversation.id);
    } catch (error) {
      console.error("Error marking conversation as read:", error);
    }
  };

  const handleSearch = async () => {
    if (!searchValue.trim()) {
      fetchConversations();
      return;
    }

    try {
      setIsLoading(true);
      const results = await messageService.searchConversations(searchValue);
      setConversations(results);
    } catch (error) {
      toast.error("Search failed");
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return date.toLocaleDateString();
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversationMessages]);

  return (
    <AdminLayout requiredRole="patient">
      <div className="space-y-6 bg-gray-50 min-h-screen">
        <div className="flex items-center justify-between">
          <div className="p-4">
            <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
            <p className="text-gray-600">
              Communicate with Doctors
            </p>
          </div>
        </div>

        <div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          style={{ minHeight: "calc(100vh - 220px)" }}
        >
          {/* Conversations List */}
          <Card className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow lg:col-span-1">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                {showSearch ? (
                  <div className="relative w-full pl-2">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      autoFocus
                      className="h-10 text-sm pl-10 rounded-md bg-white border border-gray-200"
                      placeholder="Search conversations..."
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                      onBlur={() => searchValue === "" && setShowSearch(false)}
                    />
                  </div>
                ) : (
                  <div className="p-4">
                    <CardTitle className="text-lg flex-1">
                      Conversations
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowSearch(true)}
                      >
                        <Search className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={fetchConversations}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="flex items-center justify-center h-64">
                  <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                </div>
              ) : (
                <div className="space-y-1 max-h-[calc(100vh-320px)] overflow-y-auto">
                  {conversations.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      No conversations yet
                    </div>
                  ) : (
                    conversations.map((conv) => (
                      <div
                        key={conv.id}
                        className={`flex items-center space-x-3 p-4 hover:bg-gray-50 cursor-pointer border-l-4 transition-all group ${
                          selectedConversation?.id === conv.id
                            ? "border-blue-500 bg-blue-50/30"
                            : "border-transparent hover:border-gray-200"
                        }`}
                        onClick={() => handleConversationSelect(conv)}
                      >
                        <div className="relative">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback>
                              {conv.participant_name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          {conv.is_online && (
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-sm truncate text-gray-900">
                              {conv.participant_name}
                            </h4>
                            <span className="text-xs text-gray-500">
                              {formatDate(conv.last_message_time)}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600">
                            {conv.participant_role} • {conv.participant_company}
                          </p>
                          <p className="text-sm text-gray-600 truncate mt-1">
                            {conv.last_message_content}
                          </p>
                        </div>
                        {conv.unread_count > 0 && (
                          <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-xs text-white">
                              {conv.unread_count}
                            </span>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Chat Area */}
          {selectedConversation ? (
            <Card className="lg:col-span-2">
              <CardHeader className="pb-3 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback>
                          {selectedConversation.participant_name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      {selectedConversation.is_online && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {selectedConversation.participant_name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {selectedConversation.participant_role} •{" "}
                        {selectedConversation.participant_company}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Video className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Chat Content */}
              <CardContent className="p-0 flex flex-col h-[450px]">
                {isLoadingMessages ? (
                  <div className="flex-1 flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                  </div>
                ) : (
                  <>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                      {conversationMessages.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                          No messages yet. Start the conversation!
                        </div>
                      ) : (
                        conversationMessages.map((msg) => (
                          <div
                            key={msg.id}
                            className={`flex ${
                              msg.is_me ? "justify-end" : "justify-start"
                            }`}
                          >
                            <div
                              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg shadow-sm ${
                                msg.is_me
                                  ? "bg-blue-600 text-white"
                                  : "bg-white border border-gray-200 text-gray-900"
                              }`}
                            >
                              {!msg.is_me && (
                                <span className="text-xs font-medium text-gray-600 block mb-1">
                                  {msg.sender_name}
                                </span>
                              )}
                              <p className="text-sm whitespace-pre-line break-words">
                                {msg.content}
                              </p>
                              <p
                                className={`text-xs mt-1 ${
                                  msg.is_me ? "text-blue-100" : "text-gray-500"
                                }`}
                              >
                                {formatTime(msg.created_at)}
                              </p>
                            </div>
                          </div>
                        ))
                      )}
                      <div ref={messagesEndRef} />
                    </div>

                    {/* Message Input */}
                    <div className="border-t p-4 bg-white">
                      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                        <Input
                          placeholder="Type your message..."
                          className="flex-1"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          disabled={isSending}
                        />
                        <Button
                          type="submit"
                          size="icon"
                          disabled={!newMessage.trim() || isSending}
                        >
                          {isSending ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                          ) : (
                            <Send className="h-5 w-5" />
                          )}
                        </Button>
                      </form>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="lg:col-span-2 flex items-center justify-center">
              <CardContent className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  Select a conversation
                </h3>
                <p className="text-gray-500">
                  Choose a conversation from the list to start messaging
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export default Messages;