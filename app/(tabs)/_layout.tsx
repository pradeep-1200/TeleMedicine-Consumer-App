import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Color';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import FloatingCallWindow from '@/components/FloatingCallWindow';

export default function TabLayout() {
  const router = useRouter();
  const notificationCount = 2;

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: Colors.white,
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: Colors.mediumGray,
          headerLeft: () => (
            <View style={styles.headerLeftContainer}>
              <TouchableOpacity 
                style={styles.backButton}
                onPress={() => router.back()}
              >
                <Ionicons name="arrow-back" size={24} color={Colors.white} />
              </TouchableOpacity>
            </View>
          ),
          headerRight: () => (
            <View style={styles.headerIcons}>
              <TouchableOpacity 
                style={styles.iconButton}
                onPress={() => router.push('/(auth)/profile' as any)}
              >
                <Ionicons name="person-circle-outline" size={28} color={Colors.white} />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.iconButton}
                onPress={() => router.push('/notifications' as any)}
              >
                <View style={styles.notificationContainer}>
                  <Ionicons name="notifications-outline" size={28} color={Colors.white} />
                  {notificationCount > 0 && (
                    <View style={styles.notificationBadge}>
                      <Text style={styles.notificationText}>
                        {notificationCount > 9 ? '9+' : notificationCount}
                      </Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          ),
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => (
              <Ionicons name="home-outline" size={24} color={color} />
            ),
            headerTitle: () => (
              <View style={styles.headerTitleContainer}>
                <Ionicons name="home" size={24} color={Colors.white} style={styles.titleIcon} />
                <Text style={styles.headerTitle}>Home</Text>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="home"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="consult"
          options={{
            title: 'Consult',
            tabBarIcon: ({ color }) => (
              <Ionicons name="chatbubbles-outline" size={24} color={color} />
            ),
            headerTitle: () => (
              <View style={styles.headerTitleContainer}>
                <Ionicons name="chatbubbles" size={24} color={Colors.white} style={styles.titleIcon} />
                <Text style={styles.headerTitle}>Consult</Text>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="shop"
          options={{
            title: 'Shop',
            tabBarIcon: ({ color }) => (
              <Ionicons name="cart-outline" size={24} color={color} />
            ),
            headerTitle: () => (
              <View style={styles.headerTitleContainer}>
                <Ionicons name="cart" size={24} color={Colors.white} style={styles.titleIcon} />
                <Text style={styles.headerTitle}>Shop</Text>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color }) => (
              <Ionicons name="settings-outline" size={24} color={color} />
            ),
            headerTitle: () => (
              <View style={styles.headerTitleContainer}>
                <Ionicons name="settings" size={24} color={Colors.white} style={styles.titleIcon} />
                <Text style={styles.headerTitle}>Settings</Text>
              </View>
            ),
          }}
        />
      </Tabs>
      <FloatingCallWindow />
    </>
  );
}

const styles = StyleSheet.create({
  headerLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    marginLeft: 16,
  },
  spacer: {
    width: 20,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  titleIcon: {
    marginRight: 10,
  },
  headerTitle: {
    color: Colors.white,
    fontSize: 22,
    fontWeight: '600',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  iconButton: {
    marginLeft: 16,
    padding: 4,
    position: 'relative',
  },
  notificationContainer: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: Colors.danger,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  notificationText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
});
