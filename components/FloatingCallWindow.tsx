import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ImageBackground } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCall } from '@/contexts/CallContext';
import Colors from '@/constants/Color';
import ZegoService from '@/services/ZegoService';

export default function FloatingCallWindow() {
  const { isInCall, isMinimized, callDuration, isMuted, maximizeCall, endCall, toggleMute } = useCall();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = async () => {
    try {
      await ZegoService.endCall('room123');
      endCall();
    } catch (error) {
      console.error('Failed to end call:', error);
      endCall();
    }
  };

  const handleToggleMute = async () => {
    try {
      await ZegoService.toggleMicrophone(!isMuted);
      toggleMute();
    } catch (error) {
      console.error('Failed to toggle mute:', error);
    }
  };

  const handleMaximize = () => {
    maximizeCall();
    router.push('/call');
  };

  if (!isInCall || !isMinimized) {
    return null;
  }

  return (
    <TouchableOpacity
      style={styles.floatingWindow}
      onPress={handleMaximize}
      activeOpacity={0.95}
    >
      <ImageBackground
        source={{
          uri: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg',
        }}
        style={styles.floatingBackground}
        imageStyle={styles.floatingBackgroundImage}
      >
        <View style={styles.overlay}>
          <View style={styles.floatingHeader}>
            <Image
              source={{
                uri: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg',
              }}
              style={styles.floatingAvatar}
            />
            <View style={styles.floatingInfo}>
              <Text style={styles.floatingName}>Dr. Prem</Text>
              <Text style={styles.floatingTimer}>{formatTime(callDuration)}</Text>
            </View>
          </View>

          <View style={styles.floatingControls}>
            <TouchableOpacity
              style={[styles.floatingButton, isMuted && styles.floatingButtonMuted]}
              onPress={(e) => {
                e.stopPropagation();
                handleToggleMute();
              }}
            >
              <Ionicons
                name={isMuted ? 'mic-off' : 'mic'}
                size={18}
                color={Colors.white}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.floatingEndButton}
              onPress={(e) => {
                e.stopPropagation();
                handleEndCall();
              }}
            >
              <Ionicons name="call" size={18} color={Colors.white} />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  floatingWindow: {
    position: 'absolute',
    top: 80,
    right: 16,
    width: 160,
    height: 100,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    zIndex: 100000,
  },
  floatingBackground: {
    width: '100%',
    height: '100%',
  },
  floatingBackgroundImage: {
    borderRadius: 12,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 10,
    justifyContent: 'space-between',
  },
  floatingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  floatingAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 8,
    borderWidth: 1.5,
    borderColor: Colors.white,
  },
  floatingInfo: {
    flex: 1,
  },
  floatingName: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 2,
  },
  floatingTimer: {
    color: Colors.white,
    fontSize: 11,
    opacity: 0.95,
  },
  floatingControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  floatingButton: {
    flex: 1,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingButtonMuted: {
    backgroundColor: Colors.danger,
  },
  floatingEndButton: {
    flex: 1,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.danger,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
