import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Platform,
  Alert,
  Linking,
  ImageBackground,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Color';
import ZegoService from '@/services/ZegoService';
import { useAuth } from '@/contexts/AuthContext';
import { useCall } from '@/contexts/CallContext';

export default function CallScreen() {
  const params = useLocalSearchParams();
  const { user } = useAuth();
  const {
    isInCall,
    isMinimized,
    callDuration,
    isMuted,
    isCameraOn,
    startCall: startGlobalCall,
    endCall: endGlobalCall,
    minimizeCall,
    toggleMute: toggleGlobalMute,
    toggleCamera: toggleGlobalCamera,
  } = useCall();

  const [isCallActive, setIsCallActive] = useState(false);
  const [callType, setCallType] = useState<'video' | 'audio'>('video');
  const [doctorPhone] = useState('+91 98765 43210');

  useEffect(() => {
    if (!isInCall) {
      initiateCall();
    }

    return () => {
      if (!isMinimized) {
        handleEndCall();
      }
    };
  }, []);

  useEffect(() => {
    if (isMinimized) {
      router.push('/(tabs)/home');
    }
  }, [isMinimized]);

  const initiateCall = async () => {
    try {
      const roomID = `room_${Date.now()}`;
      const userID = user?.id || 'user_' + Date.now();
      const userName = user?.name || 'Patient';

      await ZegoService.startCall(roomID, userID, userName);
      setIsCallActive(true);
      startGlobalCall();
    } catch (error) {
      console.error('Failed to start call:', error);
    }
  };

  const toggleMute = async () => {
    try {
      await ZegoService.toggleMicrophone(!isMuted);
      toggleGlobalMute();
    } catch (error) {
      console.error('Failed to toggle microphone:', error);
    }
  };

  const toggleCamera = async () => {
    try {
      await ZegoService.toggleCamera(!isCameraOn);
      toggleGlobalCamera();
    } catch (error) {
      console.error('Failed to toggle camera:', error);
    }
  };

  const handleEndCall = async () => {
    try {
      await ZegoService.endCall('room123');
      endGlobalCall();
      router.back();
    } catch (error) {
      console.error('Failed to end call:', error);
      endGlobalCall();
      router.back();
    }
  };

  const makePhoneCall = () => {
    Alert.alert(
      'Call Doctor',
      `Call Dr. Prem at ${doctorPhone}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Call',
          onPress: () => {
            const phoneNumber = doctorPhone.replace(/\s/g, '');
            Linking.openURL(`tel:${phoneNumber}`);
          },
        },
      ],
    );
  };

  const switchToAudio = () => {
    setCallType('audio');
    toggleCamera();
    Alert.alert('Switched to Audio', 'Video call switched to audio only');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      {/* Doctor's Video Feed (Full Screen Background) */}
      <ImageBackground
        source={{
          uri: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg',
        }}
        style={styles.doctorVideoFeed}
        resizeMode="cover"
      >
        {/* Top Bar with Doctor Info */}
        <SafeAreaView style={styles.topBar}>
          <View style={styles.doctorInfoBar}>
            <Image
              source={{
                uri: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg',
              }}
              style={styles.doctorAvatarSmall}
            />
            <View style={styles.doctorDetails}>
              <Text style={styles.doctorNameSmall}>Dr. Prem</Text>
              <Text style={styles.callTimerSmall}>{formatTime(callDuration)}</Text>
            </View>
          </View>

          {/* Minimize Button */}
          <TouchableOpacity style={styles.minimizeButton} onPress={minimizeCall}>
            <Ionicons name="chevron-down" size={24} color={Colors.white} />
          </TouchableOpacity>
        </SafeAreaView>

        {/* Patient's Video (Small Floating Window - Top Right) */}
        <View style={styles.patientVideoContainer}>
          <ImageBackground
            source={{
              uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
            }}
            style={styles.patientVideo}
            imageStyle={styles.patientVideoImage}
          >
            <View style={styles.patientLabel}>
              <Text style={styles.patientLabelText}>You</Text>
            </View>
          </ImageBackground>
        </View>

        {/* Bottom Controls */}
        <View style={styles.bottomControls}>
          {/* Control Buttons */}
          <View style={styles.controlsRow}>
            <TouchableOpacity
              style={[styles.controlBtn, isMuted && styles.controlBtnActive]}
              onPress={toggleMute}
            >
              <Ionicons
                name={isMuted ? 'mic-off' : 'mic'}
                size={28}
                color={Colors.white}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.controlBtn, !isCameraOn && styles.controlBtnActive]}
              onPress={toggleCamera}
            >
              <Ionicons
                name={isCameraOn ? 'videocam' : 'videocam-off'}
                size={28}
                color={Colors.white}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.controlBtn}
              onPress={() => ZegoService.toggleSpeaker(true)}
            >
              <Ionicons name="volume-high" size={28} color={Colors.white} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.controlBtn} onPress={switchToAudio}>
              <Ionicons name="headset" size={28} color={Colors.white} />
            </TouchableOpacity>
          </View>

          {/* End Call Button */}
          <TouchableOpacity style={styles.endCallBtn} onPress={handleEndCall}>
            <Ionicons name="call" size={32} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  doctorVideoFeed: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 10 : 20,
    paddingBottom: 12,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  doctorInfoBar: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  doctorAvatarSmall: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 2,
    borderColor: Colors.white,
  },
  doctorDetails: {
    flex: 1,
  },
  doctorNameSmall: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  callTimerSmall: {
    color: Colors.white,
    fontSize: 14,
    opacity: 0.9,
  },
  minimizeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  patientVideoContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 100 : 90,
    right: 16,
    width: 120,
    height: 160,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  patientVideo: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  patientVideoImage: {
    borderRadius: 12,
  },
  patientLabel: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  patientLabelText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  bottomControls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 30,
    paddingTop: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
  controlBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlBtnActive: {
    backgroundColor: Colors.danger,
  },
  endCallBtn: {
    alignSelf: 'center',
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: Colors.danger,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
