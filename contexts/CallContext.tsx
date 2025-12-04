import React, { createContext, useState, useContext, ReactNode } from 'react';
import { CallState } from '@/types';

interface CallContextType {
  callState: CallState;
  startCall: (roomID: string, callType: 'audio' | 'video') => void;
  endCall: () => void;
  toggleMute: () => void;
  toggleCamera: () => void;
  isMuted: boolean;
  isCameraOn: boolean;
}

const CallContext = createContext<CallContextType | undefined>(undefined);

export const CallProvider = ({ children }: { children: ReactNode }) => {
  const [callState, setCallState] = useState<CallState>({
    isCalling: false,
    isReceivingCall: false,
    callType: 'video',
    roomID: undefined,
  });
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);

  const startCall = (roomID: string, callType: 'audio' | 'video') => {
    setCallState({
      isCalling: true,
      isReceivingCall: false,
      callType,
      roomID,
    });
  };

  const endCall = () => {
    setCallState({
      isCalling: false,
      isReceivingCall: false,
      callType: 'video',
      roomID: undefined,
    });
    setIsMuted(false);
    setIsCameraOn(true);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleCamera = () => {
    setIsCameraOn(!isCameraOn);
  };

  return (
    <CallContext.Provider value={{
      callState,
      startCall,
      endCall,
      toggleMute,
      toggleCamera,
      isMuted,
      isCameraOn,
    }}>
      {children}
    </CallContext.Provider>
  );
};

export const useCall = () => {
  const context = useContext(CallContext);
  if (context === undefined) {
    throw new Error('useCall must be used within a CallProvider');
  }
  return context;
};