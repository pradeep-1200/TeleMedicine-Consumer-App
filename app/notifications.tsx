import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, useNavigation } from 'expo-router';
import Colors from '@/constants/Color';

const initialNotifications = [
  {
    id: 1,
    title: 'Appointment Reminder',
    message: 'Your appointment with Dr. Prem is scheduled for tomorrow at 2:00 PM',
    time: '2 hours ago',
    read: false,
  },
  {
    id: 2,
    title: 'Prescription Ready',
    message: 'Your prescription is ready for pickup at the pharmacy',
    time: '5 hours ago',
    read: false,
  },
  {
    id: 3,
    title: 'Health Tip',
    message: 'Remember to drink at least 8 glasses of water daily for better health',
    time: '1 day ago',
    read: true,
  },
  {
    id: 4,
    title: 'Payment Successful',
    message: 'Your payment of ₹500 has been processed successfully',
    time: '2 days ago',
    read: true,
  },
  {
    id: 5,
    title: 'New Doctor Available',
    message: 'Dr. Sarah Johnson is now available for consultations',
    time: '3 days ago',
    read: true,
  },
];

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const unreadCount = notifications.filter(n => !n.read).length;
  const navigation = useNavigation();

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const handleBack = () => {
    // Try multiple ways to go back
    if (router.canGoBack()) {
      router.back();
    } else {
      // Fallback: navigate to home tab
      router.replace('/(tabs)/home');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Custom Header matching other tabs */}
      <View style={styles.header}>
        <View style={styles.headerLeftContainer}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={handleBack}
          >
            <Ionicons name="arrow-back" size={28} color={Colors.white} />
          </TouchableOpacity>
          <View style={styles.spacer} />
        </View>

        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Notifications</Text>
        </View>

        <View style={styles.headerIcons}>
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={markAllAsRead}
            disabled={unreadCount === 0}
          >
            <Ionicons name="checkmark-done" size={24} color={unreadCount > 0 ? Colors.white : Colors.mediumGray} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={clearAll}
            disabled={notifications.length === 0}
          >
            <Ionicons name="trash-outline" size={24} color={notifications.length > 0 ? Colors.white : Colors.mediumGray} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* No notifications state */}
        {notifications.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="notifications-off" size={80} color={Colors.mediumGray} />
            <Text style={styles.emptyStateTitle}>No Notifications</Text>
            <Text style={styles.emptyStateMessage}>
              You&apos;re all caught up! Check back later for updates.
            </Text>
          </View>
        ) : (
          <>
            {/* Notifications header */}
            <View style={styles.notificationsHeader}>
              <Text style={styles.notificationsHeaderText}>
                {unreadCount > 0 ? `${unreadCount} Unread` : 'All Read'}
              </Text>
            </View>

            {/* Notifications list */}
            {notifications.map((notification) => (
              <TouchableOpacity 
                key={notification.id} 
                style={[
                  styles.notificationCard,
                  !notification.read && styles.unreadNotificationCard
                ]}
                onPress={() => markAsRead(notification.id)}
              >
                <View style={styles.notificationIcon}>
                  {notification.title.includes('Appointment') ? (
                    <Ionicons name="calendar" size={24} color={Colors.primary} />
                  ) : notification.title.includes('Prescription') ? (
                    <Ionicons name="medical" size={24} color={Colors.primary} />
                  ) : notification.title.includes('Payment') ? (
                    <Ionicons name="card" size={24} color={Colors.success} />
                  ) : (
                    <Ionicons name="information-circle" size={24} color={Colors.info} />
                  )}
                </View>
                <View style={styles.notificationContent}>
                  <View style={styles.notificationHeader}>
                    <Text style={styles.notificationTitle}>{notification.title}</Text>
                    {!notification.read && <View style={styles.unreadDot} />}
                  </View>
                  <Text style={styles.notificationMessage}>{notification.message}</Text>
                  <Text style={styles.notificationTime}>{notification.time}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGray,
  },
  // Header styles to match other tabs
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.primary,
    height: 70,
    paddingHorizontal: 16,
  },
  headerLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    marginLeft: 0,
  },
  spacer: {
    width: 20,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 2,
    position: 'relative',
  },
  titleIcon: {
    marginRight: 10,
  },
  headerTitle: {
    color: Colors.white,
    fontSize: 22,
    fontWeight: '600',
  },
  headerBadge: {
    position: 'absolute',
    top: -8,
    right: -10,
    backgroundColor: Colors.danger,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  headerBadgeText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  iconButton: {
    marginLeft: 16,
    padding: 4,
  },
  content: {
    flex: 1,
  },
  notificationsHeader: {
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  notificationsHeaderText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.darkGray,
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 12,
    padding: 16,
    elevation: 1,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  unreadNotificationCard: {
    backgroundColor: '#F0F9FF',
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  notificationIcon: {
    marginRight: 12,
    justifyContent: 'center',
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
    flex: 1,
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
    marginLeft: 8,
  },
  notificationMessage: {
    fontSize: 14,
    color: Colors.darkGray,
    lineHeight: 20,
    marginBottom: 8,
  },
  notificationTime: {
    fontSize: 12,
    color: Colors.mediumGray,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.darkGray,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateMessage: {
    fontSize: 14,
    color: Colors.mediumGray,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});