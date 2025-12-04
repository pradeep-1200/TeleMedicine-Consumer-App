import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Appointment } from '@/types';

interface AppointmentContextType {
  appointments: Appointment[];
  addAppointment: (appointment: Appointment) => void;
  updateAppointment: (id: string, updates: Partial<Appointment>) => void;
  getAppointment: (id: string) => Appointment | undefined;
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

export const AppointmentProvider = ({ children }: { children: ReactNode }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      doctorId: '1',
      doctorName: 'Dr. Prem',
      date: '2023-11-23',
      time: '17:28',
      type: 'phone',
      status: 'completed',
      amount: 50
    },
    {
      id: '2',
      doctorId: '1',
      doctorName: 'Dr. Prem',
      date: '2023-09-13',
      time: '10:30',
      type: 'video',
      status: 'upcoming',
      amount: 150
    }
  ]);

  const addAppointment = (appointment: Appointment) => {
    setAppointments(prev => [...prev, appointment]);
  };

  const updateAppointment = (id: string, updates: Partial<Appointment>) => {
    setAppointments(prev =>
      prev.map(appt => (appt.id === id ? { ...appt, ...updates } : appt))
    );
  };

  const getAppointment = (id: string) => {
    return appointments.find(appt => appt.id === id);
  };

  return (
    <AppointmentContext.Provider value={{ 
      appointments, 
      addAppointment, 
      updateAppointment, 
      getAppointment 
    }}>
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointments = () => {
  const context = useContext(AppointmentContext);
  if (context === undefined) {
    throw new Error('useAppointments must be used within an AppointmentProvider');
  }
  return context;
};