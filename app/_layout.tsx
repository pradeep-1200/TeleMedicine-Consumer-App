import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from '@/contexts/AuthContext';
import { AppointmentProvider } from '@/contexts/AppointmentContext';
import { CallProvider } from '@/contexts/CallContext';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AppointmentProvider>
          <CallProvider>
            <StatusBar style="auto" />
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="booking" options={{ headerShown: false }} />
              <Stack.Screen name="call" options={{ headerShown: false }} />
              <Stack.Screen name="consultation" options={{ headerShown: false }} />
              <Stack.Screen name="doctor" options={{ headerShown: false }} />
              <Stack.Screen name="payment" options={{ headerShown: false }} />
              <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
            </Stack>
          </CallProvider>
        </AppointmentProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}