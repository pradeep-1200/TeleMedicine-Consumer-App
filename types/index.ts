export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  languages: string[];
  experience: number;
  rating: number;
  pricePerMin: number;
  freeMinutes: number;
  image?: string;
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  type: 'phone' | 'video' | 'chat';
  status: 'upcoming' | 'completed' | 'cancelled';
  symptoms?: string;
  severity?: 'mild' | 'moderate' | 'severe';
  duration?: number;
  amount: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  walletBalance: number;
  gender?: string;
  age?: number;
  height?: number;
  weight?: number;
}

export interface CallState {
  isCalling: boolean;
  isReceivingCall: boolean;
  callType: 'audio' | 'video';
  caller?: User;
  roomID?: string;
}