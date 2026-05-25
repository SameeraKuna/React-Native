import { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  useColorScheme,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';

const CATEGORIES = ['All', 'Home', 'Apparel', 'Beauty', 'Tablets'];

const PRODUCTS = [
  {
    id: '1',
    name: 'Ceramic Vase',
    price: '$45',
    rating: 4.8,
    reviews: 124,
    image: '🏺',
  },
  {
    id: '2',
    name: 'Wooden Chair',
    price: '$120',
    rating: 4.9,
    reviews: 89,
    image: '🪑',
  },
  {
    id: '3',
    name: 'Plant Pot',
    price: '$28',
    rating: 4.7,
    reviews: 156,
    image: '🌿',
  },
  {
    id: '4',
    name: 'Table Lamp',
    price: '$65',
    rating: 4.8,
    reviews: 92,
    image: '💡',
  },
];

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];
  const router = useRouter();
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchText, setSearchText] = useState('');

  // Extract name from email (e.g., "john@example.com" -> "John")
  const emailName = user?.email?.split('@')[0] || 'Guest';
  const userName = emailName.charAt(0).toUpperCase() + emailName.slice(1);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Greeting Header */}
        <View style={styles.headerSection}>
          <Text style={[styles.greeting, { color: colors.text }]}>Hi {userName}</Text>
          <Text style={[styles.discoverText, { color: colors.tabIconDefault }]}>Discover</Text>
        </View>

        {/* Header with Search */}
        <View style={styles.searchContainer}>
          <View
            style={[
              styles.searchInput,
              { backgroundColor: colors.backgroundElement, borderColor: colors.tabIconDefault },
            ]}>
            <Text style={{ fontSize: 16 }}>🔍</Text>
            <TextInput
              style={[styles.input, { color: colors.text }]}
              placeholder="Search products..."
              placeholderTextColor={colors.tabIconDefault}
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
        </View>

        {/* Category Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}>
          {CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                {
                  backgroundColor:
                    selectedCategory === category ? colors.tint : colors.backgroundElement,
                },
              ]}
              onPress={() => setSelectedCategory(category)}>
              <Text
                style={[
                  styles.categoryText,
                  {
                    color: selectedCategory === category ? '#fff' : colors.text,
                    fontWeight: selectedCategory === category ? '700' : '500',
                  },
                ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Banner */}
        <View
          style={[
            styles.banner,
            { backgroundColor: colors.backgroundElement, borderColor: colors.tabIconDefault },
          ]}>
          <Text style={[styles.bannerText, { color: colors.text }]}>
            SPRING EDIT
          </Text>
          <Text style={[styles.bannerSubtext, { color: colors.tabIconDefault }]}>
            Up to 30% off handpicked finds
          </Text>
        </View>

        {/* Trending Now */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Trending now</Text>

          <View style={styles.productsGrid}>
            {PRODUCTS.map((product) => (
              <TouchableOpacity
                key={product.id}
                style={styles.productCard}
                onPress={() => router.push(`/product/${product.id}`)}>
                <View
                  style={[
                    styles.productImage,
                    { backgroundColor: colors.backgroundElement },
                  ]}>
                  <Text style={styles.emoji}>{product.image}</Text>
                </View>
                <Text style={[styles.productName, { color: colors.text }]}>
                  {product.name}
                </Text>
                <Text style={[styles.productPrice, { color: colors.text }]}>
                  {product.price}
                </Text>
                <View style={styles.ratingContainer}>
                  <Text style={[styles.rating, { color: colors.text }]}>⭐ {product.rating}</Text>
                  <Text style={[styles.reviews, { color: colors.tabIconDefault }]}>
                    ({product.reviews})
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
  },
  categoriesContent: {
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  categoryText: {
    fontSize: 13,
  },
  banner: {
    marginHorizontal: 16,
    marginVertical: 16,
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderRadius: 8,
    borderWidth: 1,
  },
  bannerText: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  bannerSubtext: {
    fontSize: 13,
    fontWeight: '500',
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  productCard: {
    width: '48%',
  },
  productImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  emoji: {
    fontSize: 48,
  },
  productName: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  rating: {
    fontSize: 12,
    fontWeight: '600',
  },
  reviews: {
    fontSize: 12,
    fontWeight: '400',
  },
  headerSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  discoverText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
