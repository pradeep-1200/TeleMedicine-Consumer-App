import React from 'react';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Colors from '@/constants/Color';

export default function NoAnswerScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg' }}
          style={styles.doctorImage}
        />
        
        <Text style={styles.doctorName}>Dr. Prem</Text>
        <Text style={styles.specialty}>Male-Female Infertility</Text>

        <View style={styles.statusContainer}>
          <Ionicons name="close-circle" size={64} color={Colors.danger} />
          <Text style={styles.statusText}>No Answer</Text>
        </View>

        <Text style={styles.message}>
          Tap on the bell icon to get notified when Dr. Prem is online
        </Text>

        <TouchableOpacity style={styles.notifyButton}>
          <Ionicons name="notifications-outline" size={24} color={Colors.white} />
          <Text style={styles.notifyButtonText}>Notify Me</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>or</Text>

        <TouchableOpacity style={styles.chatButton}>
          <Text style={styles.chatButtonText}>
            Start a <Text style={styles.bold}>Chat Consultation</Text> with Dr. Prem or consult another expert now.
          </Text>
        </TouchableOpacity>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.startChatButton}>
            <Text style={styles.startChatText}>Start Chat</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.seeMoreButton}
            onPress={() => router.push('/(tabs)/consult')}
          >
            <Text style={styles.seeMoreText}>See More Experts</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  doctorImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  doctorName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 4,
  },
  specialty: {
    fontSize: 16,
    color: Colors.darkGray,
    marginBottom: 32,
  },
  statusContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  statusText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.danger,
    marginTop: 12,
  },
  message: {
    fontSize: 14,
    color: Colors.darkGray,
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  notifyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 25,
    marginBottom: 20,
    gap: 8,
  },
  notifyButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  orText: {
    fontSize: 16,
    color: Colors.mediumGray,
    marginBottom: 20,
  },
  chatButton: {
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  chatButtonText: {
    fontSize: 14,
    color: Colors.darkGray,
    textAlign: 'center',
    lineHeight: 20,
  },
  bold: {
    fontWeight: 'bold',
    color: Colors.black,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  startChatButton: {
    flex: 1,
    backgroundColor: Colors.success,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  startChatText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  seeMoreButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  seeMoreText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
