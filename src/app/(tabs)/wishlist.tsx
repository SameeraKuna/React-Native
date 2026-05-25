import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { CoveColors } from '@/constants/theme';

export default function WishlistScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Wishlist</Text>
        <Text style={styles.subtitle}>Coming soon</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CoveColors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: CoveColors.textPrimary,
  },
  subtitle: {
    fontSize: 14,
    color: CoveColors.textSecondary,
  },
});
