type Patient = {
  id: number;
  name: string;
  email: string;
  phone: string;
  age: number;
  pregnancy_stage: string;
  medical_history: string;
  status?: string; 
};
export default Patient;