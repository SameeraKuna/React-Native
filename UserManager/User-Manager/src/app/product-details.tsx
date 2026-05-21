import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { COLORS } from '@/constants/colors';
import { MaterialIcons } from '@expo/vector-icons';
import { useCart } from '@/context/CartContext';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  image: string;
}

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Smartphone',
    price: 29999,
    description: 'Latest smartphone with advanced features',
    icon: 'phone-android',
    image: 'https://loremflickr.com/200/200/smartphone',
  },
  {
    id: '2',
    name: 'Laptop',
    price: 79999,
    description: 'Powerful laptop for work and entertainment',
    icon: 'laptop',
    image: 'https://loremflickr.com/200/200/laptop',
  },
  {
    id: '3',
    name: 'Tablet',
    price: 39999,
    description: 'Portable tablet with high resolution display',
    icon: 'tablet',
    image: 'https://loremflickr.com/200/200/tablet',
  },
  {
    id: '4',
    name: 'Headphones',
    price: 9999,
    description: 'Premium quality wireless headphones',
    icon: 'headphones',
    image: 'https://loremflickr.com/200/200/headphones',
  },
  {
    id: '5',
    name: 'Smart Watch',
    price: 19999,
    description: 'Feature-rich smartwatch with fitness tracking',
    icon: 'watch',
    image: 'https://loremflickr.com/200/200/smartwatch',
  },
  {
    id: '6',
    name: 'Camera',
    price: 49999,
    description: 'Professional DSLR camera with 4K video',
    icon: 'camera-alt',
    image: 'https://loremflickr.com/200/200/camera',
  },
  {
    id: '7',
    name: 'Keyboard',
    price: 5999,
    description: 'Mechanical keyboard with RGB lighting',
    icon: 'keyboard',
    image: 'https://loremflickr.com/200/200/keyboard',
  },
  {
    id: '8',
    name: 'Mouse',
    price: 2999,
    description: 'Wireless ergonomic mouse with precision tracking',
    icon: 'touch-app',
    image: 'https://loremflickr.com/200/200/mouse',
  },
  {
    id: '9',
    name: 'Monitor',
    price: 24999,
    description: '27-inch 4K UHD display with HDR support',
    icon: 'desktop-mac',
    image: 'https://loremflickr.com/200/200/monitor',
  },
  {
    id: '10',
    name: 'USB Hub',
    price: 1499,
    description: 'Multi-port USB 3.0 hub for connectivity',
    icon: 'hub',
    image: 'https://loremflickr.com/200/200/usb-hub',
  },
  {
    id: '11',
    name: 'Power Bank',
    price: 3999,
    description: '20000mAh portable battery with fast charging',
    icon: 'battery-full',
    image: 'https://loremflickr.com/200/200/power-bank',
  },
  {
    id: '12',
    name: 'Phone Case',
    price: 799,
    description: 'Durable protective case with shock absorption',
    icon: 'shield',
    image: 'https://loremflickr.com/200/200/phone-case',
  },
  {
    id: '13',
    name: 'Charger',
    price: 1299,
    description: 'Fast charging adapter with multiple ports',
    icon: 'electrical-services',
    image: 'https://loremflickr.com/200/200/charger',
  },
  {
    id: '14',
    name: 'Screen Protector',
    price: 499,
    description: 'Tempered glass screen protection film',
    icon: 'privacy-tip',
    image: 'https://images.unsplash.com/photo-1706774792414-6601d607ff25?w=200&h=200&fit=crop',
  },
];

export default function ProductDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Product not found</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleAddToCart = async () => {
    try {
      await addToCart({
        productId: product.id,
        productName: product.name,
        price: product.price,
        quantity: quantity,
        icon: product.icon,
      });
      // Navigate to cart immediately
      router.push('/shopping-cart');
    } catch {
      Alert.alert('Error', 'Failed to add item to cart');
    }
  };

  const handleQuantityChange = (value: number) => {
    if (value > 0) {
      setQuantity(value);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Details</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.iconContainer}>
          <MaterialIcons
            name={product.icon}
            size={120}
            color={COLORS.primary}
          />
        </View>

        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.price}>₹{product.price.toLocaleString('en-IN')}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Product ID</Text>
          <Text style={styles.productId}>{product.id}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quantity</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => handleQuantityChange(quantity - 1)}
            >
              <MaterialIcons name="remove" size={24} color={COLORS.primary} />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => handleQuantityChange(quantity + 1)}
            >
              <MaterialIcons name="add" size={24} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>Total Price:</Text>
          <Text style={styles.totalPrice}>
            ₹{(product.price * quantity).toLocaleString('en-IN')}
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}
        >
          <MaterialIcons name="shopping-cart" size={24} color={COLORS.white} />
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  iconContainer: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    backgroundColor: COLORS.background,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  productName: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 8,
  },
  price: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: 24,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textLight,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  description: {
    fontSize: 16,
    color: COLORS.text,
    lineHeight: 24,
  },
  productId: {
    fontSize: 14,
    color: COLORS.text,
    fontFamily: 'monospace',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  quantityButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    minWidth: 40,
    textAlign: 'center',
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textLight,
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.primary,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  addToCartButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  addToCartButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
  },
  backButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    marginTop: 20,
  },
  backButtonText: {
    color: COLORS.white,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 16,
    color: COLORS.text,
    textAlign: 'center',
    marginTop: 20,
  },
});
