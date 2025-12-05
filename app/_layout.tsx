import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { AppointmentProvider } from '@/contexts/AppointmentContext';
import { CallProvider } from '@/contexts/CallContext';

function AuthNavigator() {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return null; // or loading screen
  }
  
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      ) : (
        <>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="booking/confirm" options={{ headerShown: false }} />
          <Stack.Screen name="booking/date" options={{ headerShown: false }} />
          <Stack.Screen name="booking/my-bookings" options={{ headerShown: false }} />
          <Stack.Screen name="booking/payment" options={{ headerShown: false }} />
          <Stack.Screen name="booking/schedule" options={{ headerShown: false }} />
          <Stack.Screen name="booking/success" options={{ headerShown: false }} />
          <Stack.Screen name="booking/symptoms" options={{ headerShown: false }} />
          <Stack.Screen name="booking/time" options={{ headerShown: false }} />
          <Stack.Screen name="booking/details/[id]" options={{ headerShown: false }} />
          <Stack.Screen name="call/index" options={{ headerShown: false }} />
          <Stack.Screen name="chat/index" options={{ headerShown: false }} />
          <Stack.Screen name="consultation/index" options={{ headerShown: false }} />
          <Stack.Screen name="doctor/[id]" options={{ headerShown: false }} />
          <Stack.Screen name="payment/index" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </>
      )}
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AppointmentProvider>
          <CallProvider>
            <StatusBar style="auto" />
            <AuthNavigator />
          </CallProvider>
        </AppointmentProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}