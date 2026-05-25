import { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CoveColors } from '@/constants/theme';
import { StarRating } from '@/components/star-rating';
import { Chip } from '@/components/chip';

const COLORS = ['Oat', 'Sage', 'Taupe', 'Navy', 'Rose'];
const SIZES = ['50×60', '60×80', '80×100'];

const PRODUCT_DETAILS: Record<
  string,
  {
    name: string;
    price: number;
    category: string;
    breadcrumb: string;
    rating: number;
    reviewCount: number;
    description: string;
  }
> = {
  '1': {
    name: 'Stonewashed Linen Throw',
    price: 48,
    category: 'SOFT GOODS',
    breadcrumb: 'SOFT GOODS · THROWS',
    rating: 4.8,
    reviewCount: 124,
    description:
      'A heavyweight Belgian linen throw, stonewashed for that lived-in softness. Ethically woven by a small mill in Lithuania.',
  },
  '2': {
    name: 'Stoneware Mug',
    price: 22,
    category: 'CERAMICS',
    breadcrumb: 'TABLETOP · MUGS',
    rating: 4.8,
    reviewCount: 89,
    description: 'Hand-thrown ceramic mug with a glazed finish. Microwave and dishwasher safe.',
  },
};

export default function ProductDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const product = PRODUCT_DETAILS[id || '1'];

  const [selectedColor, setSelectedColor] = useState('Oat');
  const [selectedSize, setSelectedSize] = useState('50×60');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header with Back Button */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color={CoveColors.textPrimary} />
          </Pressable>
          <Pressable>
            <Ionicons name="share-social" size={20} color={CoveColors.primary} />
          </Pressable>
        </View>

        {/* Product Image */}
        <View style={styles.imageContainer}>
          <View style={styles.imagePlaceholder} />
        </View>

        {/* Breadcrumb */}
        <Text style={styles.breadcrumb}>{product.breadcrumb}</Text>

        {/* Product Info */}
        <View style={styles.infoContainer}>
          <View style={styles.titleRow}>
            <View style={styles.titleSection}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.price}>${product.price}</Text>
            </View>
            <Pressable style={styles.heartButton}>
              <Ionicons name="heart-outline" size={24} color={CoveColors.primary} />
            </Pressable>
          </View>

          {/* Rating */}
          <View style={styles.ratingContainer}>
            <StarRating rating={product.rating} count={product.reviewCount} size="small" />
          </View>

          {/* Colors */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Color</Text>
            <View style={styles.colorGrid}>
              {COLORS.map((color) => (
                <Pressable
                  key={color}
                  style={[
                    styles.colorSwatch,
                    selectedColor === color && styles.colorSwatchSelected,
                  ]}
                  onPress={() => setSelectedColor(color)}
                >
                  <View style={[styles.swatch, { backgroundColor: getColorValue(color) }]} />
                  {selectedColor === color && (
                    <Ionicons name="checkmark-circle" size={20} color={CoveColors.primary} />
                  )}
                </Pressable>
              ))}
            </View>
          </View>

          {/* Sizes */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Size</Text>
            <View style={styles.sizeGrid}>
              {SIZES.map((size) => (
                <Chip
                  key={size}
                  label={size}
                  selected={selectedSize === size}
                  onPress={() => setSelectedSize(size)}
                  variant="outline"
                />
              ))}
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Details</Text>
            <Text style={styles.description}>{product.description}</Text>
          </View>

          {/* Delivery Info */}
          <View style={styles.deliveryInfo}>
            <Ionicons name="checkmark-circle-outline" size={20} color={CoveColors.primary} />
            <View style={styles.deliveryText}>
              <Text style={styles.deliveryTitle}>Free delivery</Text>
              <Text style={styles.deliverySubtext}>Arrives Tue, May 25 — Fri, May 29</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Add to Bag Button */}
      <View style={styles.footer}>
        <Pressable style={styles.addButton}>
          <Text style={styles.addButtonText}>Add to bag — ${product.price}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function getColorValue(color: string): string {
  const colors: Record<string, string> = {
    Oat: '#D9C7AF',
    Sage: '#C5D9C0',
    Taupe: '#C0B5A5',
    Navy: '#4A5B7F',
    Rose: '#D9B5B0',
  };
  return colors[color] || '#D9C7AF';
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CoveColors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  imageContainer: {
    aspectRatio: 1,
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  imagePlaceholder: {
    flex: 1,
    backgroundColor: '#D9C7AF',
    opacity: 0.5,
  },
  breadcrumb: {
    paddingHorizontal: 20,
    fontSize: 11,
    color: CoveColors.textSecondary,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 16,
  },
  infoContainer: {
    paddingHorizontal: 20,
    gap: 16,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 16,
  },
  titleSection: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: '700',
    color: CoveColors.textPrimary,
    marginBottom: 4,
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: CoveColors.textPrimary,
  },
  heartButton: {
    padding: 8,
    marginRight: -8,
  },
  ratingContainer: {
    marginTop: 4,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: CoveColors.textPrimary,
    textTransform: 'uppercase',
  },
  colorGrid: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  colorSwatch: {
    width: 50,
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorSwatchSelected: {
    borderColor: CoveColors.primary,
  },
  swatch: {
    width: 40,
    height: 40,
    borderRadius: 6,
  },
  sizeGrid: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  description: {
    fontSize: 14,
    color: CoveColors.textSecondary,
    lineHeight: 20,
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: CoveColors.border,
  },
  deliveryText: {
    flex: 1,
  },
  deliveryTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: CoveColors.textPrimary,
  },
  deliverySubtext: {
    fontSize: 12,
    color: CoveColors.textSecondary,
    marginTop: 2,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: CoveColors.border,
    backgroundColor: CoveColors.card,
  },
  addButton: {
    backgroundColor: CoveColors.primary,
    borderRadius: 8,
    paddingVertical: 14,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
