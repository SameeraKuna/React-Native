import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '@/constants/colors';
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

export default function ProductsScreen() {
  const router = useRouter();
  const { addToCart } = useCart();
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  const getProductColor = (index: number) => {
    const colors = [COLORS.primary, COLORS.accent_orange, COLORS.secondary, COLORS.accent_green, COLORS.accent_blue, COLORS.accent_purple];
    return colors[index % colors.length];
  };

  const getQuantity = (productId: string) => quantities[productId] || 0;

  const setQuantity = (productId: string, quantity: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(0, quantity),
    }));
  };

  const handleAddToCart = async (product: Product) => {
    const quantity = getQuantity(product.id);
    if (quantity === 0) {
      setQuantity(product.id, 1);
      return;
    }

    try {
      await addToCart({
        productId: product.id,
        productName: product.name,
        price: product.price,
        quantity: quantity,
        icon: product.icon,
      });
      Alert.alert('Added to Cart', `${quantity} x ${product.name} added to your cart!`);
      setQuantity(product.id, 0);
    } catch {
      Alert.alert('Error', 'Failed to add item to cart');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Products</Text>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => router.push('/shopping-cart')}
        >
          <MaterialIcons name="shopping-cart" size={24} color={COLORS.primary} />
          <Text style={styles.cartButtonText}>Cart</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
        {PRODUCTS.map((product, index) => (
          <TouchableOpacity
            key={product.id}
            onPress={() => router.push(`/product-details?id=${product.id}`)}
            activeOpacity={0.7}
          >
            <View style={[styles.productCard, { borderLeftColor: getProductColor(index) }]}>
              <View style={styles.productImageContainer}>
                <MaterialIcons
                  name={product.icon}
                  size={64}
                  color={getProductColor(index)}
                />
              </View>

              <View style={styles.productInfo}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productDescription}>{product.description}</Text>
                <Text style={[styles.productPrice, { color: getProductColor(index) }]}>₹{product.price}</Text>
              </View>

              {getQuantity(product.id) === 0 ? (
                <TouchableOpacity
                  style={[styles.addButton, { backgroundColor: getProductColor(index) }]}
                  onPress={() => handleAddToCart(product)}
                >
                  <MaterialIcons name="add" size={24} color={COLORS.white} />
                </TouchableOpacity>
              ) : (
                <View style={styles.quantityControls}>
                  <TouchableOpacity
                    style={styles.quantityBtn}
                    onPress={() => setQuantity(product.id, getQuantity(product.id) - 1)}
                  >
                    <MaterialIcons name="remove" size={20} color={getProductColor(index)} />
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{getQuantity(product.id)}</Text>
                  <TouchableOpacity
                    style={styles.quantityBtn}
                    onPress={() => setQuantity(product.id, getQuantity(product.id) + 1)}
                  >
                    <MaterialIcons name="add" size={20} color={getProductColor(index)} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.confirmButton, { backgroundColor: getProductColor(index) }]}
                    onPress={() => handleAddToCart(product)}
                  >
                    <MaterialIcons name="check" size={20} color={COLORS.white} />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text,
  },
  cartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  cartButtonText: {
    color: COLORS.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.background,
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    borderLeftWidth: 4,
  },
  productImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 12,
    backgroundColor: COLORS.white,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 12,
    color: COLORS.textLight,
    marginBottom: 6,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.background,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  quantityBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
    minWidth: 20,
    textAlign: 'center',
  },
  confirmButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
  },
});
