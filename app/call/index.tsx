import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Platform,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Color';
import ZegoService from '@/services/ZegoService';
import { useAuth } from '@/contexts/AuthContext';

export default function CallScreen() {
  const params = useLocalSearchParams();
  const { user } = useAuth();
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    startCall();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      ZegoService.endCall('room123');
    };
  }, []);

  const startCall = async () => {
    try {
      const roomID = `room_${Date.now()}`;
      const userID = user?.id || 'user_' + Date.now();
      const userName = user?.name || 'Patient';

      await ZegoService.startCall(roomID, userID, userName);
      setIsCallActive(true);

      // Start timer
      timerRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } catch (error) {
      console.error('Failed to start call:', error);
    }
  };

  const toggleMute = async () => {
    try {
      await ZegoService.toggleMicrophone(!isMuted);
      setIsMuted(!isMuted);
    } catch (error) {
      console.error('Failed to toggle microphone:', error);
    }
  };

  const toggleCamera = async () => {
    try {
      await ZegoService.toggleCamera(!isCameraOn);
      setIsCameraOn(!isCameraOn);
    } catch (error) {
      console.error('Failed to toggle camera:', error);
    }
  };

  const endCall = async () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    await ZegoService.endCall('room123');
    router.back();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Call Header */}
      <View style={styles.header}>
        <Text style={styles.callStatus}>
          {isCallActive ? 'Call Connected' : 'Connecting...'}
        </Text>
        <Text style={styles.callTimer}>
          {formatTime(callDuration)}
        </Text>
      </View>

      {/* Doctor Info */}
      <View style={styles.doctorInfo}>
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
          style={styles.doctorImage}
        />
        <Text style={styles.doctorName}>Dr. Prem</Text>
        <Text style={styles.doctorSpecialty}>Gynecologist</Text>
      </View>

      {/* Call Controls */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity
          style={[styles.controlButton, isMuted && styles.controlButtonActive]}
          onPress={toggleMute}>
          <Ionicons
            name={isMuted ? 'mic-off' : 'mic'}
            size={24}
            color={isMuted ? Colors.white : Colors.black}
          />
          <Text style={styles.controlText}>{isMuted ? 'Unmute' : 'Mute'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.controlButton, !isCameraOn && styles.controlButtonActive]}
          onPress={toggleCamera}>
          <Ionicons
            name={isCameraOn ? 'videocam' : 'videocam-off'}
            size={24}
            color={isCameraOn ? Colors.black : Colors.white}
          />
          <Text style={styles.controlText}>
            {isCameraOn ? 'Camera Off' : 'Camera On'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.controlButton, styles.speakerButton]}
          onPress={() => ZegoService.toggleSpeaker(true)}>
          <Ionicons name="volume-high" size={24} color={Colors.black} />
          <Text style={styles.controlText}>Speaker</Text>
        </TouchableOpacity>
      </View>

      {/* End Call Button */}
      <TouchableOpacity style={styles.endCallButton} onPress={endCall}>
        <Ionicons name="call" size={24} color={Colors.white} style={{ transform: [{ rotate: '135deg' }] }} />
      </TouchableOpacity>

      {/* Minimize Button */}
      <TouchableOpacity
        style={styles.minimizeButton}
        onPress={() => router.push('/(tabs)/home')}>
        <Ionicons name="chevron-down" size={24} color={Colors.white} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  callStatus: {
    color: Colors.white,
    fontSize: 16,
    marginBottom: 8,
  },
  callTimer: {
    color: Colors.white,
    fontSize: 32,
    fontWeight: '300',
  },
  doctorInfo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doctorImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  doctorName: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  doctorSpecialty: {
    color: Colors.mediumGray,
    fontSize: 16,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  controlButton: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  controlButtonActive: {
    backgroundColor: Colors.danger,
  },
  controlText: {
    color: Colors.white,
    fontSize: 12,
    marginTop: 4,
  },
  speakerButton: {
    backgroundColor: Colors.white,
  },
  endCallButton: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: Colors.danger,
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  minimizeButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    right: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});