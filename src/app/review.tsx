import { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CoveColors } from '@/constants/theme';
import { StarRating } from '@/components/star-rating';
import { Chip } from '@/components/chip';

const TAGS = ['Quality', 'Good value', 'As pictured', 'Quick delivery', 'Packaging'];

export default function ReviewScreen() {
  const router = useRouter();
  const [rating, setRating] = useState(4);
  const [reviewText, setReviewText] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Ionicons name="close" size={24} color={CoveColors.textPrimary} />
          </Pressable>
          <Text style={styles.headerTitle}>Add review</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Product Header */}
        <View style={styles.productCard}>
          <View style={styles.productImage} />
          <View style={styles.productInfo}>
            <Text style={styles.orderNumber}>ORDER #C-4421</Text>
            <Text style={styles.productName}>Stonewashed Mug</Text>
            <Text style={styles.deliveryDate}>Delivered May 10</Text>
          </View>
        </View>

        {/* Rating Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How was it?</Text>
          <Text style={styles.sectionSubtitle}>Tap a star to rate</Text>
          <View style={styles.ratingContainer}>
            <StarRating rating={rating} interactive onRate={setRating} size="large" />
          </View>
          <Text style={styles.ratingLabel}>
            {rating} stars · {['Poor', 'Fair', 'Good', 'Very good', 'Excellent'][rating - 1]}
          </Text>
        </View>

        {/* Review Text */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your review</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Honestly, the texture is gorgeous and it sits so well in the hand. The matte finish is exactly what was advertised."
            placeholderTextColor={CoveColors.textMuted}
            multiline
            numberOfLines={4}
            value={reviewText}
            onChangeText={setReviewText}
          />
        </View>

        {/* Photos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Photos</Text>
          <View style={styles.photoGrid}>
            <Pressable style={styles.photoButton}>
              <Ionicons name="camera" size={24} color={CoveColors.primary} />
            </Pressable>
            {/* Sample photos */}
            <View style={[styles.photoThumbnail, { backgroundColor: '#D9C7AF' }]} />
            <View style={[styles.photoThumbnail, { backgroundColor: '#C5D9C0' }]} />
          </View>
        </View>

        {/* Tags */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What stood out?</Text>
          <View style={styles.tagGrid}>
            {TAGS.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                selected={selectedTags.includes(tag)}
                onPress={() => toggleTag(tag)}
                variant="outline"
              />
            ))}
          </View>
        </View>

        <View style={styles.spacer} />
      </ScrollView>

      {/* Submit Button */}
      <View style={styles.footer}>
        <Pressable
          style={[styles.submitButton, { opacity: rating > 0 ? 1 : 0.5 }]}
          disabled={rating === 0}
        >
          <Ionicons name="checkmark" size={18} color="#FFFFFF" />
          <Text style={styles.submitButtonText}>Post review</Text>
        </Pressable>
      </View>
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
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: CoveColors.border,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: CoveColors.textPrimary,
  },
  placeholder: {
    width: 24,
  },
  productCard: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: CoveColors.card,
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: CoveColors.border,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 4,
    backgroundColor: '#D9C7AF',
  },
  productInfo: {
    flex: 1,
    justifyContent: 'center',
    gap: 2,
  },
  orderNumber: {
    fontSize: 11,
    color: CoveColors.textSecondary,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: CoveColors.textPrimary,
  },
  deliveryDate: {
    fontSize: 12,
    color: CoveColors.textSecondary,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: CoveColors.textPrimary,
    textTransform: 'uppercase',
  },
  sectionSubtitle: {
    fontSize: 12,
    color: CoveColors.textSecondary,
  },
  ratingContainer: {
    marginVertical: 8,
  },
  ratingLabel: {
    fontSize: 13,
    color: CoveColors.primary,
    fontWeight: '600',
  },
  textInput: {
    borderWidth: 1,
    borderColor: CoveColors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: CoveColors.textPrimary,
    backgroundColor: CoveColors.card,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  photoGrid: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  photoButton: {
    width: 80,
    height: 80,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: CoveColors.border,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CoveColors.card,
  },
  photoThumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  tagGrid: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  spacer: {
    height: 20,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: CoveColors.border,
    backgroundColor: CoveColors.card,
  },
  submitButton: {
    backgroundColor: CoveColors.primary,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 14,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
