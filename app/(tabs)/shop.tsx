import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Color';

export default function ShopScreen() {
  const categories = [
    { id: '1', name: 'Medicines', icon: 'medical-outline', color: '#FF6B6B' },
    { id: '2', name: 'Vitamins', icon: 'fitness-outline', color: '#4ECDC4' },
    { id: '3', name: 'First Aid', icon: 'bandage-outline', color: '#FFD166' },
    { id: '4', name: 'Personal Care', icon: 'heart-outline', color: '#06D6A0' },
  ];

  const products = [
    { id: '1', name: 'Paracetamol 500mg', price: 25, category: 'Medicine', rating: 4.5 },
    { id: '2', name: 'Vitamin D3 Tablets', price: 180, category: 'Vitamins', rating: 4.7 },
    { id: '3', name: 'Digital Thermometer', price: 350, category: 'First Aid', rating: 4.3 },
    { id: '4', name: 'Hand Sanitizer 500ml', price: 120, category: 'Personal Care', rating: 4.6 },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>


      <ScrollView style={styles.content}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={Colors.darkGray} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search medicines, vitamins..."
            placeholderTextColor={Colors.darkGray}
          />
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <View style={styles.categoriesGrid}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[styles.categoryCard, { backgroundColor: category.color }]}>
                <Ionicons name={category.icon as any} size={32} color={Colors.white} />
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Popular Products */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Products</Text>
          {products.map((product) => (
            <View key={product.id} style={styles.productCard}>
              <View style={styles.productImage}>
                <Ionicons name="medical-outline" size={30} color={Colors.primary} />
              </View>
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productCategory}>{product.category}</Text>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={14} color="#FFD700" />
                  <Text style={styles.rating}>{product.rating}</Text>
                </View>
              </View>
              <View style={styles.priceContainer}>
                <Text style={styles.price}>₹{product.price}</Text>
                <TouchableOpacity style={styles.addButton}>
                  <Text style={styles.addText}>Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGray,
  },
  appBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2E7D32',
    paddingHorizontal: 16,
    paddingVertical: 14,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  appBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appBarTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.white,
    marginLeft: 12,
  },
  content: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    marginVertical: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: Colors.black,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 16,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    aspectRatio: 1.2,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  categoryName: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 1,
    alignItems: 'center',
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: Colors.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 4,
  },
  productCategory: {
    fontSize: 12,
    color: Colors.darkGray,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 12,
    color: Colors.darkGray,
    marginLeft: 4,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
  },
  addText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
});
