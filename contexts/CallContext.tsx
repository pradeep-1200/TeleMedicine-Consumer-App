import React, { createContext, useContext, useState, useRef, ReactNode } from 'react';

interface CallContextType {
  isInCall: boolean;
  isMinimized: boolean;
  callDuration: number;
  isMuted: boolean;
  isCameraOn: boolean;
  startCall: () => void;
  endCall: () => void;
  minimizeCall: () => void;
  maximizeCall: () => void;
  toggleMute: () => void;
  toggleCamera: () => void;
  timerRef: React.MutableRefObject<ReturnType<typeof setInterval> | null>;
}

const CallContext = createContext<CallContextType | undefined>(undefined);

export const CallProvider = ({ children }: { children: ReactNode }) => {
  const [isInCall, setIsInCall] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startCall = () => {
    setIsInCall(true);
    setIsMinimized(false);
    setCallDuration(0);
    setIsCameraOn(true);
    
    timerRef.current = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);
  };

  const endCall = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsInCall(false);
    setIsMinimized(false);
    setCallDuration(0);
    setIsMuted(false);
    setIsCameraOn(true);
  };

  const minimizeCall = () => {
    setIsMinimized(true);
  };

  const maximizeCall = () => {
    setIsMinimized(false);
  };

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  const toggleCamera = () => {
    setIsCameraOn(prev => !prev);
  };

  return (
    <CallContext.Provider
      value={{
        isInCall,
        isMinimized,
        callDuration,
        isMuted,
        isCameraOn,
        startCall,
        endCall,
        minimizeCall,
        maximizeCall,
        toggleMute,
        toggleCamera,
        timerRef,
      }}
    >
      {children}
    </CallContext.Provider>
  );
};

export const useCall = () => {
  const context = useContext(CallContext);
  if (!context) {
    throw new Error('useCall must be used within CallProvider');
  }
  return context;
};
