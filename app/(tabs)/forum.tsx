import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Color';

export default function ForumScreen() {
  const discussions = [
    { id: '1', title: 'Managing Diabetes Diet', author: 'Dr. Smith', replies: 12, time: '2h ago' },
    { id: '2', title: 'Exercise for Heart Health', author: 'Patient123', replies: 8, time: '4h ago' },
    { id: '3', title: 'Mental Health Support', author: 'Dr. Johnson', replies: 15, time: '1d ago' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Health Forum</Text>
        <TouchableOpacity style={styles.newPostButton}>
          <Ionicons name="add" size={20} color={Colors.white} />
          <Text style={styles.newPostText}>New Post</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content}>
        {discussions.map((item) => (
          <TouchableOpacity key={item.id} style={styles.discussionCard}>
            <Text style={styles.discussionTitle}>{item.title}</Text>
            <View style={styles.discussionMeta}>
              <Text style={styles.author}>By {item.author}</Text>
              <Text style={styles.replies}>{item.replies} replies</Text>
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
  newPostButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  newPostText: {
    color: Colors.white,
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  discussionCard: {
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
  discussionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 8,
  },
  discussionMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  author: {
    fontSize: 12,
    color: Colors.primary,
    flex: 1,
  },
  replies: {
    fontSize: 12,
    color: Colors.darkGray,
    marginHorizontal: 8,
  },
  time: {
    fontSize: 12,
    color: Colors.darkGray,
  },
});