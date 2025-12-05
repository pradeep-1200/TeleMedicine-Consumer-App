import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Color';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginScreen() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const { login } = useAuth();

  const handleSendOtp = () => {
    if (phone.length !== 10) {
      Alert.alert('Error', 'Please enter a valid 10-digit phone number');
      return;
    }
    setShowOtp(true);
  };

  const handleLogin = async () => {
    if (otp !== '1234') {
      Alert.alert('Error', 'Invalid OTP. Use 1234 for demo');
      return;
    }
    
    const userData = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: `+91${phone}`,
      walletBalance: 660,
      gender: 'Male',
      age: 28,
      height: 171,
      weight: 63
    };
    
    await login(userData);
    router.replace('/(tabs)/home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Ionicons name="medical" size={60} color={Colors.primary} />
          <Text style={styles.title}>MediConnect</Text>
          <Text style={styles.subtitle}>Your Health, Our Priority</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.formTitle}>Login to Continue</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Phone Number</Text>
            <View style={styles.phoneInput}>
              <Text style={styles.countryCode}>+91</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter 10-digit number"
                value={phone}
                onChangeText={setPhone}
                keyboardType="numeric"
                maxLength={10}
                editable={!showOtp}
              />
            </View>
          </View>

          {showOtp && (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>OTP</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter OTP (1234 for demo)"
                value={otp}
                onChangeText={setOtp}
                keyboardType="numeric"
                maxLength={4}
              />
            </View>
          )}

          {!showOtp ? (
            <TouchableOpacity style={styles.button} onPress={handleSendOtp}>
              <Text style={styles.buttonText}>Send OTP</Text>
            </TouchableOpacity>
          ) : (
            <View>
              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Verify & Login</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.resendButton} onPress={() => setShowOtp(false)}>
                <Text style={styles.resendText}>Change Number</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/register')}>  
            <Text style={styles.registerLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            By continuing, you agree to our Terms & Conditions and Privacy Policy
          </Text>
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
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.primary,
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.darkGray,
    marginTop: 8,
  },
  form: {
    marginBottom: 40,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 24,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 8,
  },
  phoneInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.mediumGray,
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  countryCode: {
    fontSize: 16,
    color: Colors.black,
    marginRight: 8,
    paddingRight: 8,
    borderRightWidth: 1,
    borderRightColor: Colors.mediumGray,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: Colors.black,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  resendButton: {
    alignItems: 'center',
    marginTop: 16,
  },
  resendText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  registerText: {
    fontSize: 14,
    color: Colors.darkGray,
  },
  registerLink: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
  },
  footerText: {
    fontSize: 12,
    color: Colors.darkGray,
    textAlign: 'center',
    lineHeight: 18,
  },
});