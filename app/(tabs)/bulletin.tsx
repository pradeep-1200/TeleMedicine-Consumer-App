import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Color';

export default function BulletinScreen() {
  const news = [
    { id: '1', title: 'New COVID-19 Variant Updates', category: 'Health Alert', time: '1h ago', urgent: true },
    { id: '2', title: 'Seasonal Flu Vaccination Drive', category: 'Prevention', time: '3h ago', urgent: false },
    { id: '3', title: 'Mental Health Awareness Week', category: 'Awareness', time: '1d ago', urgent: false },
    { id: '4', title: 'Diabetes Management Tips', category: 'Health Tips', time: '2d ago', urgent: false },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Health Bulletin</Text>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content}>
        {news.map((item) => (
          <TouchableOpacity key={item.id} style={[styles.newsCard, item.urgent && styles.urgentCard]}>
            {item.urgent && (
              <View style={styles.urgentBadge}>
                <Text style={styles.urgentText}>URGENT</Text>
              </View>
            )}
            <Text style={styles.newsTitle}>{item.title}</Text>
            <View style={styles.newsMeta}>
              <Text style={styles.category}>{item.category}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGray,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.mediumGray,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.black,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  newsCard: {
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 1,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  urgentCard: {
    borderLeftWidth: 4,
    borderLeftColor: Colors.danger,
  },
  urgentBadge: {
    backgroundColor: Colors.danger,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  urgentText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 8,
    lineHeight: 22,
  },
  newsMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  category: {
    fontSize: 12,
    color: Colors.primary,
    backgroundColor: Colors.accent,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  time: {
    fontSize: 12,
    color: Colors.darkGray,
  },
});