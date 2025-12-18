import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface Conversation {
  id: number;
  user_id: number;
  participant_id: number;
  last_message_id: number;
  created_at: string;
  updated_at: string;
  participant_name: string;
  participant_role: string;
  participant_company: string;
  last_message_content: string;
  last_message_time: string;
  unread_count: number;
  is_online: boolean;
}

export interface Message {
  id: number;
  conversation_id: number;
  sender_id: number;
  content: string;
  created_at: string;
  is_read: boolean;
  sender_name: string;
  is_me: boolean;
}

export interface SendMessageDto {
  conversation_id?: number;
  receiver_id?: number;
  content: string;
}

export const messageService = {
 
  async getConversations(): Promise<Conversation[]> {
    const response = await api.get('/conversations');
    return response.data;
  },

  
  async getMessages(conversationId: number): Promise<Message[]> {
    const response = await api.get(`/conversations/${conversationId}/messages`);
    return response.data;
  },

 
  async sendMessage(data: SendMessageDto): Promise<Message> {
    const response = await api.post('/messages', data);
    return response.data;
  },

 
  async markAsRead(conversationId: number): Promise<void> {
    await api.patch(`/conversations/${conversationId}/read`);
  },

 
  async startConversation(participantId: number): Promise<Conversation> {
    const response = await api.post('/conversations/start', { participant_id: participantId });
    return response.data;
  },

  
  async searchConversations(query: string): Promise<Conversation[]> {
    const response = await api.get(`/conversations/search?q=${encodeURIComponent(query)}`);
    return response.data;
  },
};