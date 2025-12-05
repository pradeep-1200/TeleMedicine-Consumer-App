import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Color';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function TabLayout() {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.darkGray,
        tabBarStyle: {
          backgroundColor: Colors.white,
          borderTopColor: Colors.mediumGray,
        },
        headerStyle: {
          backgroundColor: Colors.primary,
          height: 70,
        },
        headerTintColor: Colors.white,
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 22,
        },
        headerLeft: () => (
          <View style={styles.headerLeftContainer}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={28} color={Colors.white} />
            </TouchableOpacity>
            {/* Spacer to create space between back button and title */}
            <View style={styles.spacer} />
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
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="notifications-outline" size={26} color={Colors.white} />
            </TouchableOpacity>
          </View>
        ),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
          headerTitle: () => (
            <View style={styles.headerTitleContainer}>
              <Ionicons name="home" size={28} color={Colors.white} style={styles.titleIcon} />
              <Text style={styles.headerTitle}>Home</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="consult"
        options={{
          title: 'Consult',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="medical-outline" size={size} color={color} />
          ),
          headerTitle: () => (
            <View style={styles.headerTitleContainer}>
              <Ionicons name="medical" size={28} color={Colors.white} style={styles.titleIcon} />
              <Text style={styles.headerTitle}>Consult</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="shop"
        options={{
          title: 'Shop',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart-outline" size={size} color={color} />
          ),
          headerTitle: () => (
            <View style={styles.headerTitleContainer}>
              <Ionicons name="cart" size={28} color={Colors.white} style={styles.titleIcon} />
              <Text style={styles.headerTitle}>Shop</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
          headerTitle: () => (
            <View style={styles.headerTitleContainer}>
              <Ionicons name="settings" size={28} color={Colors.white} style={styles.titleIcon} />
              <Text style={styles.headerTitle}>Settings</Text>
            </View>
          ),
        }}
      />
    </Tabs>
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
    width: 20, // Space between back button and title
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
  },
});