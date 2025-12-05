import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Colors from '@/constants/Color';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'doctor';
  timestamp: Date;
  type: 'text' | 'image' | 'file';
}

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m Dr. Prem. How can I help you today?',
      sender: 'doctor',
      timestamp: new Date(),
      type: 'text',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const sendMessage = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText.trim(),
        sender: 'user',
        timestamp: new Date(),
        type: 'text',
      };
      setMessages(prev => [...prev, newMessage]);
      setInputText('');
      
      // Simulate doctor typing
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          const doctorReply: Message = {
            id: (Date.now() + 1).toString(),
            text: 'Thank you for your message. I\'ll review your symptoms and get back to you shortly.',
            sender: 'doctor',
            timestamp: new Date(),
            type: 'text',
          };
          setMessages(prev => [...prev, doctorReply]);
          setIsTyping(false);
        }, 2000);
      }, 1000);
    }
  };

  const startVideoCall = () => {
    router.push('/call');
  };

  const startVoiceCall = () => {
    Alert.alert('Voice Call', 'Starting voice call with Dr. Prem...');
    router.push('/call');
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isUser = item.sender === 'user';
    return (
      <View style={[styles.messageContainer, isUser ? styles.userMessage : styles.doctorMessage]}>
        <Text style={[styles.messageText, isUser ? styles.userMessageText : styles.doctorMessageText]}>
          {item.text}
        </Text>
        <Text style={[styles.timestamp, isUser ? styles.userTimestamp : styles.doctorTimestamp]}>
          {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    );
  };

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.black} />
        </TouchableOpacity>
        <View style={styles.doctorInfo}>
          <Text style={styles.doctorName}>Dr. Prem</Text>
          <Text style={styles.doctorStatus}>Online</Text>
        </View>
        <View style={styles.callButtons}>
          <TouchableOpacity onPress={startVoiceCall} style={styles.callButton}>
            <Ionicons name="call" size={20} color={Colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={startVideoCall} style={styles.callButton}>
            <Ionicons name="videocam" size={20} color={Colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        style={styles.messagesList}
        contentContainerStyle={styles.messagesContent}
      />

      {/* Typing Indicator */}
      {isTyping && (
        <View style={styles.typingContainer}>
          <Text style={styles.typingText}>Dr. Prem is typing...</Text>
        </View>
      )}

      {/* Input */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputContainer}
      >
        <View style={styles.inputRow}>
          <TouchableOpacity style={styles.attachButton}>
            <Ionicons name="attach" size={24} color={Colors.darkGray} />
          </TouchableOpacity>
          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type a message..."
            multiline
            maxLength={500}
          />
          <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
            <Ionicons name="send" size={20} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.white,
    elevation: 3,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.black,
  },
  doctorStatus: {
    fontSize: 12,
    color: Colors.success,
  },
  callButtons: {
    flexDirection: 'row',
  },
  callButton: {
    padding: 8,
    marginLeft: 8,
  },
  messagesList: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  messagesContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  messageContainer: {
    maxWidth: '80%',
    marginVertical: 4,
    padding: 12,
    borderRadius: 16,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.primary,
  },
  doctorMessage: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  userMessageText: {
    color: Colors.white,
  },
  doctorMessageText: {
    color: Colors.black,
  },
  timestamp: {
    fontSize: 11,
    marginTop: 4,
  },
  userTimestamp: {
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'right',
  },
  doctorTimestamp: {
    color: Colors.darkGray,
  },
  typingContainer: {
    padding: 16,
    backgroundColor: '#F8F9FA',
  },
  typingText: {
    fontSize: 14,
    color: Colors.darkGray,
    fontStyle: 'italic',
  },
  inputContainer: {
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 16,
  },
  attachButton: {
    marginRight: 12,
    padding: 4,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    maxHeight: 100,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    padding: 8,
    marginLeft: 8,
  },
});