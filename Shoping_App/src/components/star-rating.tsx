import { View, Pressable, Text } from 'react-native';
import { CoveColors } from '@/constants/theme';

interface StarRatingProps {
  rating?: number;
  count?: number;
  onRate?: (rating: number) => void;
  interactive?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export function StarRating({
  rating = 0,
  count,
  onRate,
  interactive = false,
  size = 'medium',
}: StarRatingProps) {
  const starSize = size === 'small' ? 16 : size === 'large' ? 32 : 24;

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <View style={{ flexDirection: 'row', gap: 4 }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Pressable
            key={star}
            onPress={() => interactive && onRate?.(star)}
            disabled={!interactive}
          >
            <Text style={{ fontSize: starSize, opacity: star <= rating ? 1 : 0.3 }}>
              ★
            </Text>
          </Pressable>
        ))}
      </View>
      {count !== undefined && (
        <Text style={{ color: CoveColors.textSecondary, fontSize: 14 }}>
          {rating} · {count} reviews
        </Text>
      )}
    </View>
  );
}
