import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CoveColors } from '@/constants/theme';
import { StarRating } from './star-rating';

interface ProductCardProps {
  name: string;
  price: number;
  category: string;
  rating: number;
  reviewCount: number;
  onPress?: () => void;
  color?: string;
}

export function ProductCard({
  name,
  price,
  category,
  rating,
  reviewCount,
  onPress,
  color = 'tan',
}: ProductCardProps) {
  const stripeColor = getStripeColor(color);

  return (
    <Pressable onPress={onPress} style={styles.container}>
      {/* Striped placeholder image */}
      <View style={[styles.imageContainer, { backgroundColor: stripeColor }]}>
        <View style={styles.stripeOverlay} />
        <View
          style={[
            styles.badge,
            { position: 'absolute', top: 8, right: 8, backgroundColor: CoveColors.primary },
          ]}
        >
          <Ionicons name="heart-outline" size={14} color="#FFFFFF" />
        </View>
      </View>

      {/* Product info */}
      <View style={styles.info}>
        <Text style={styles.category}>{category}</Text>
        <Text style={styles.name} numberOfLines={2}>
          {name}
        </Text>
        <View style={styles.priceRating}>
          <Text style={styles.price}>${price}</Text>
          <StarRating rating={Math.round(rating)} size="small" />
        </View>
      </View>
    </Pressable>
  );
}

function getStripeColor(color: string) {
  const colors: Record<string, string> = {
    tan: '#D9C7AF',
    cream: '#E8D4BC',
    green: '#B8D4B0',
    sage: '#C5D9C0',
    navy: '#4A5B7F',
    rose: '#D9B5B0',
  };
  return colors[color] || colors.tan;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 6,
    marginBottom: 16,
  },
  imageContainer: {
    aspectRatio: 1,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 8,
    position: 'relative',
  },
  stripeOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backgroundImage:
      'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
  },
  badge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    gap: 4,
  },
  category: {
    fontSize: 12,
    color: CoveColors.textSecondary,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: CoveColors.textPrimary,
  },
  priceRating: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
    color: CoveColors.textPrimary,
  },
});
