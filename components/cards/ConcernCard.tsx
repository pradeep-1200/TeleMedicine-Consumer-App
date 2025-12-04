import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import Colors from '@/constants/Color';

interface ConcernCardProps {
  concern: {
    id: string;
    title: string;
    color: string;
  };
}

export default function ConcernCard({ concern }: ConcernCardProps) {
  const handlePress = () => {
    router.push(`/consultation?concern=${concern.title}`);
  };

  return (
    <TouchableOpacity 
      style={[styles.card, { backgroundColor: concern.color }]} 
      onPress={handlePress}
    >
      <Text style={styles.title}>{concern.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    aspectRatio: 1.5,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    marginHorizontal: 6,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.white,
    textAlign: 'center',
    lineHeight: 18,
    flexShrink: 1,
  },
});