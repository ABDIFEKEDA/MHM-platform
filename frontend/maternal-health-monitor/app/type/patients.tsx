export type Patient = {
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
  sender: string;
  content: string;
  time: string;
};
export type ChatProps = {
  currentUser: string;
  receiver: string;

};