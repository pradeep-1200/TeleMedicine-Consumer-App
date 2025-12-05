import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Appointment } from '@/types';
import { storage, StorageKeys } from '@/utils/storage';

interface AppointmentContextType {
  appointments: Appointment[];
  addAppointment: (appointment: Appointment) => void;
  updateAppointment: (id: string, updates: Partial<Appointment>) => void;
  getAppointment: (id: string) => Appointment | undefined;
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

export const AppointmentProvider = ({ children }: { children: ReactNode }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    const stored = await storage.getItem<Appointment[]>(StorageKeys.APPOINTMENTS);
    if (stored) {
      setAppointments(stored);
    } else {
      const defaultAppointments = [
        {
          id: '1',
          doctorId: '1',
          doctorName: 'Dr. Prem',
          date: '2023-11-23',
          time: '17:28',
          type: 'phone' as const,
          status: 'completed' as const,
          amount: 50
        },
        {
          id: '2',
          doctorId: '1',
          doctorName: 'Dr. Prem',
          date: '2023-09-13',
          time: '10:30',
          type: 'video' as const,
          status: 'upcoming' as const,
          amount: 150
        }
      ];
      setAppointments(defaultAppointments);
      await storage.setItem(StorageKeys.APPOINTMENTS, defaultAppointments);
    }
  };

  const addAppointment = async (appointment: Appointment) => {
    const updated = [...appointments, appointment];
    setAppointments(updated);
    await storage.setItem(StorageKeys.APPOINTMENTS, updated);
  };

  const updateAppointment = async (id: string, updates: Partial<Appointment>) => {
    const updated = appointments.map(appt => (appt.id === id ? { ...appt, ...updates } : appt));
    setAppointments(updated);
    await storage.setItem(StorageKeys.APPOINTMENTS, updated);
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