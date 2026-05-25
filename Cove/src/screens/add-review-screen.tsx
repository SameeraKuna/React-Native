import { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/theme';

const FEATURES = ['Quality', 'Good value', 'Packaged', 'Quick delivery'];

export default function AddReviewScreen({ productId }: { productId?: string } = {}) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const toggleFeature = (feature: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]
    );
  };

  const handlePostReview = () => {
    // Handle post review
    console.log({ rating, reviewText, selectedFeatures });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Back Button */}
      <View style={[styles.header, { borderBottomColor: colors.backgroundElement }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Your Review</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product Info */}
        <View style={styles.productPreview}>
          <View
            style={[
              styles.productImage,
              { backgroundColor: colors.backgroundElement },
            ]}>
            <Text style={styles.productEmoji}>🧵</Text>
          </View>
          <View style={styles.productInfo}>
            <Text style={[styles.productName, { color: colors.text }]}>
              Stoneswashed Linen Throw
            </Text>
            <Text style={[styles.productPrice, { color: colors.tabIconDefault }]}>
              $48
            </Text>
          </View>
        </View>

        <View style={styles.content}>
          {/* Rating Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>How was it?</Text>
            <View style={styles.ratingContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                  key={star}
                  onPress={() => setRating(star)}
                  style={styles.starButton}>
                  <Text style={[styles.star, { opacity: star <= rating ? 1 : 0.3 }]}>
                    ⭐
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Review Text */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Your review</Text>
            <TextInput
              style={[
                styles.reviewInput,
                {
                  borderColor: colors.tabIconDefault,
                  color: colors.text,
                  backgroundColor: colors.backgroundElement,
                },
              ]}
              placeholder="Tell us what you think..."
              placeholderTextColor={colors.tabIconDefault}
              value={reviewText}
              onChangeText={setReviewText}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          {/* Photo Gallery */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Photos (optional)</Text>
            <View style={styles.photoGrid}>
              {[1, 2, 3, 4].map((index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.photoPlaceholder,
                    { backgroundColor: colors.backgroundElement, borderColor: colors.tint },
                  ]}>
                  <Text style={styles.photoIcon}>📷</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Features */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              What stood out?
            </Text>
            <View style={styles.featuresContainer}>
              {FEATURES.map((feature) => (
                <TouchableOpacity
                  key={feature}
                  style={[
                    styles.featureButton,
                    {
                      backgroundColor: selectedFeatures.includes(feature)
                        ? colors.tint
                        : colors.backgroundElement,
                      borderColor: selectedFeatures.includes(feature)
                        ? colors.tint
                        : colors.tabIconDefault,
                    },
                  ]}
                  onPress={() => toggleFeature(feature)}>
                  <Text
                    style={[
                      styles.featureText,
                      {
                        color: selectedFeatures.includes(feature) ? '#fff' : colors.text,
                        fontWeight: selectedFeatures.includes(feature) ? '700' : '500',
                      },
                    ]}>
                    {feature}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Post Button */}
      <View
        style={[
          styles.footer,
          { backgroundColor: colors.background, borderTopColor: colors.backgroundElement },
        ]}>
        <TouchableOpacity
          style={[styles.postButton, { backgroundColor: colors.tint }]}
          onPress={handlePostReview}
          disabled={rating === 0 || !reviewText.trim()}>
          <Text style={styles.postButtonText}>Post review</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  productPreview: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  productImage: {
    width: 64,
    height: 64,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productEmoji: {
    fontSize: 32,
  },
  productInfo: {
    justifyContent: 'center',
    flex: 1,
  },
  productName: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 13,
    fontWeight: '600',
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  starButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  star: {
    fontSize: 32,
  },
  reviewInput: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    height: 100,
  },
  photoGrid: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  photoPlaceholder: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 8,
    borderWidth: 2,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoIcon: {
    fontSize: 32,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  featureButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  featureText: {
    fontSize: 13,
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  postButton: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  postButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  header: {
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
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
});
