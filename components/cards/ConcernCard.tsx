import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { router } from 'expo-router';
import Colors from '@/constants/Color';

interface ConcernCardProps {
  concern: {
    id: string;
    title: string;
    color: string;
    image?: any;
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
      {concern.image && (
        <Image source={concern.image} style={styles.image} />
      )}
      <Text style={styles.title}>{concern.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '31%',
    aspectRatio: 1.2,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: 40,
    height: 40,
    marginBottom: 8,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.white,
    textAlign: 'center',
    lineHeight: 16,
  },
});