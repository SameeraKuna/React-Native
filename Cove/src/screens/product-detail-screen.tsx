import { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/theme';

const COLORS = ['Natural', 'Charcoal', 'Sage'];
const SIZES = ['50x60', '60x80', '80x100'];

export default function ProductDetailScreen({ productId }: { productId?: string } = {}) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];
  const router = useRouter();
  const [selectedColor, setSelectedColor] = useState('Natural');
  const [selectedSize, setSelectedSize] = useState('60x80');
  const [quantity, setQuantity] = useState(1);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header with Back Button */}
      <View style={[styles.headerBar, { borderBottomColor: colors.backgroundElement }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push(`/review/${productId || '1'}`)}>
          <Text style={styles.reviewsIcon}>💬</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <View
          style={[
            styles.imageContainer,
            { backgroundColor: colors.backgroundElement },
          ]}>
          <Text style={styles.productImageEmoji}>🧵</Text>
        </View>

        {/* Product Info */}
        <View style={styles.content}>
          <Text style={[styles.category, { color: colors.tabIconDefault }]}>
            SOFT GOODS - TEXTILES
          </Text>

          <View style={styles.header}>
            <Text style={[styles.productName, { color: colors.text }]}>
              Stoneswashed Linen Throw
            </Text>
            <TouchableOpacity>
              <Text style={styles.wishlistIcon}>🤍</Text>
            </TouchableOpacity>
          </View>

          <Text style={[styles.price, { color: colors.text }]}>$48</Text>

          <View style={styles.rating}>
            <Text style={[styles.ratingText, { color: colors.text }]}>⭐ 4.8</Text>
            <Text style={[styles.reviewCount, { color: colors.tabIconDefault }]}>
              (234 reviews)
            </Text>
          </View>

          {/* Color Selection */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Color</Text>
            <View style={styles.optionsContainer}>
              {COLORS.map((color) => (
                <TouchableOpacity
                  key={color}
                  style={[
                    styles.colorOption,
                    {
                      backgroundColor:
                        color === 'Natural'
                          ? '#D4C4B8'
                          : color === 'Charcoal'
                            ? '#404040'
                            : '#A8BFA8',
                      borderWidth: selectedColor === color ? 2 : 1,
                      borderColor: selectedColor === color ? colors.tint : colors.tabIconDefault,
                    },
                  ]}
                  onPress={() => setSelectedColor(color)}>
                  <Text style={styles.colorLabel}>{color}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Size Selection */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Size</Text>
            <View style={styles.optionsContainer}>
              {SIZES.map((size) => (
                <TouchableOpacity
                  key={size}
                  style={[
                    styles.sizeOption,
                    {
                      backgroundColor:
                        selectedSize === size ? colors.tint : colors.backgroundElement,
                      borderColor:
                        selectedSize === size ? colors.tint : colors.tabIconDefault,
                    },
                  ]}
                  onPress={() => setSelectedSize(size)}>
                  <Text
                    style={[
                      styles.sizeText,
                      {
                        color: selectedSize === size ? '#fff' : colors.text,
                        fontWeight: selectedSize === size ? '700' : '500',
                      },
                    ]}>
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Details */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Details</Text>
            <Text style={[styles.detailsText, { color: colors.tabIconDefault }]}>
              100% pure linen. Soft, breathable, and naturally sustainable. Perfect for sofas,
              beds, or draping. Machine washable.
            </Text>
          </View>

          {/* Delivery Info */}
          <View
            style={[
              styles.deliveryInfo,
              { backgroundColor: colors.backgroundElement },
            ]}>
            <Text style={styles.deliveryIcon}>🚚</Text>
            <View style={styles.deliveryText}>
              <Text style={[styles.deliveryTitle, { color: colors.text }]}>Free delivery</Text>
              <Text style={[styles.deliveryDesc, { color: colors.tabIconDefault }]}>
                On orders over $100
              </Text>
            </View>
          </View>

          {/* Quantity */}
          <View style={styles.quantityContainer}>
            <Text style={[styles.quantityLabel, { color: colors.text }]}>Quantity</Text>
            <View
              style={[
                styles.quantitySelector,
                { borderColor: colors.tabIconDefault },
              ]}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => quantity > 1 && setQuantity(quantity - 1)}>
                <Text style={[styles.quantityButtonText, { color: colors.text }]}>−</Text>
              </TouchableOpacity>
              <Text style={[styles.quantityValue, { color: colors.text }]}>{quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => setQuantity(quantity + 1)}>
                <Text style={[styles.quantityButtonText, { color: colors.text }]}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Add to Bag Button */}
      <View
        style={[
          styles.footer,
          { backgroundColor: colors.background, borderTopColor: colors.backgroundElement },
        ]}>
        <TouchableOpacity
          style={[styles.addToBagButton, { backgroundColor: colors.tint }]}
          onPress={() => router.push(`/damage/${productId || '1'}`)}>
          <Text style={styles.addToBagText}>Add to bag</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productImageEmoji: {
    fontSize: 120,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  category: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  productName: {
    fontSize: 22,
    fontWeight: '700',
    flex: 1,
  },
  wishlistIcon: {
    fontSize: 28,
  },
  price: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  rating: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
  },
  reviewCount: {
    fontSize: 14,
    fontWeight: '400',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 12,
  },
  optionsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  colorOption: {
    width: 60,
    height: 60,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
  },
  sizeOption: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
  },
  sizeText: {
    fontSize: 13,
  },
  detailsText: {
    fontSize: 13,
    lineHeight: 20,
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 24,
    gap: 12,
  },
  deliveryIcon: {
    fontSize: 24,
  },
  deliveryText: {
    flex: 1,
  },
  deliveryTitle: {
    fontSize: 13,
    fontWeight: '700',
  },
  deliveryDesc: {
    fontSize: 12,
    fontWeight: '400',
  },
  quantityContainer: {
    marginBottom: 24,
  },
  quantityLabel: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  quantityButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: '600',
  },
  quantityValue: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  addToBagButton: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  addToBagText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  backButton: {
    fontSize: 24,
    fontWeight: '700',
  },
  reviewsIcon: {
    fontSize: 24,
  },
});
