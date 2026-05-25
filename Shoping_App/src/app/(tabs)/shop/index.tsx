import { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  SafeAreaView,
  TextInput,
  FlatList,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CoveColors } from '@/constants/theme';
import { Chip } from '@/components/chip';
import { ProductCard } from '@/components/product-card';

const CATEGORIES = ['All', 'Home', 'Apparel', 'Beauty', 'Tabletop'];

const PRODUCTS = [
  {
    id: '1',
    name: 'Linen Throw',
    price: 48,
    category: 'SOFT GOODS',
    rating: 4.8,
    reviewCount: 124,
    color: 'tan',
  },
  {
    id: '2',
    name: 'Stoneware Mug',
    price: 22,
    category: 'CERAMICS',
    rating: 4.8,
    reviewCount: 89,
    color: 'cream',
  },
  {
    id: '3',
    name: 'Cedar Candle',
    price: 32,
    category: 'CANDLES',
    rating: 4.9,
    reviewCount: 156,
    color: 'tan',
  },
  {
    id: '4',
    name: 'Bouclé Cushion',
    price: 64,
    category: 'SOFT GOODS',
    rating: 4.7,
    reviewCount: 203,
    color: 'sage',
  },
];

export default function ShopScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hi Hannah,</Text>
            <Text style={styles.title}>Discover</Text>
          </View>
          <Pressable>
            <Ionicons name="bag" size={24} color={CoveColors.primary} />
          </Pressable>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={18} color={CoveColors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search linen, ceramic, cedar..."
            placeholderTextColor={CoveColors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Categories */}
        <View style={styles.categoriesContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          >
            {CATEGORIES.map((cat) => (
              <Chip
                key={cat}
                label={cat}
                selected={selectedCategory === cat}
                onPress={() => setSelectedCategory(cat)}
                variant="default"
              />
            ))}
          </ScrollView>
        </View>

        {/* Spring Edit Banner */}
        <View style={styles.banner}>
          <Text style={styles.bannerLabel}>SPRING EDIT</Text>
          <Text style={styles.bannerText}>Up to 30% off</Text>
          <Text style={styles.bannerSubtext}>handpicked finds</Text>
          <Pressable style={styles.bannerButton}>
            <Text style={styles.bannerButtonText}>Shop now ↗</Text>
          </Pressable>
        </View>

        {/* Trending Now */}
        <View style={styles.trendingHeader}>
          <Text style={styles.trendingTitle}>Trending now</Text>
          <Pressable>
            <Text style={styles.seeAllLink}>See all</Text>
          </Pressable>
        </View>

        {/* Product Grid */}
        <View style={styles.gridContainer}>
          <FlatList
            data={PRODUCTS}
            keyExtractor={(item) => item.id}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={styles.gridRow}
            renderItem={({ item }) => (
              <ProductCard
                {...item}
                onPress={() => router.push(`/(tabs)/shop/${item.id}`)}
              />
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CoveColors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  greeting: {
    fontSize: 14,
    color: CoveColors.textSecondary,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: CoveColors.textPrimary,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: CoveColors.card,
    borderWidth: 1,
    borderColor: CoveColors.border,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 14,
    color: CoveColors.textPrimary,
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categoriesList: {
    paddingHorizontal: 20,
    gap: 8,
  },
  banner: {
    marginHorizontal: 20,
    marginBottom: 24,
    backgroundColor: CoveColors.primary,
    borderRadius: 8,
    padding: 20,
    justifyContent: 'center',
  },
  bannerLabel: {
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 4,
  },
  bannerText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  bannerSubtext: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 12,
  },
  bannerButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
  },
  bannerButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  trendingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  trendingTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: CoveColors.textPrimary,
  },
  seeAllLink: {
    fontSize: 13,
    color: CoveColors.primary,
    fontWeight: '600',
  },
  gridContainer: {
    paddingHorizontal: 12,
    paddingBottom: 24,
  },
  gridRow: {
    justifyContent: 'space-between',
  },
});
