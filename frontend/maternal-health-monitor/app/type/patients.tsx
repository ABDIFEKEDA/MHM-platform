export type Patients = {
  id: number;
  name: string;
  email: string;
  phone: string;
  age: number;
  pregnancy_stage: string;
  medical_history: string;
  status?: string;
};

export type Message = {
  id: number;
  conversation_id: number;
  sender_id: number;
  content: string;
  created_at: string;
  is_read: boolean;
  sender_name: string;
  is_me: boolean;
};

export type ChatProps = {
  currentUser: string;
  receiver: string;

};

export type Conversation = {
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

