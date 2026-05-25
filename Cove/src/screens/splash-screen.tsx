import React, { useEffect } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import { useColorScheme } from 'react-native';

export default function SplashScreen({ onComplete }: { onComplete?: () => void }) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      onComplete?.();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.logo, { color: colors.text }]}>COVE</Text>
        <Text style={[styles.tagline, { color: colors.text }]}>SHOP SLOWLY. LIVE WELL.</Text>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.tint} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    gap: 16,
  },
  logo: {
    fontSize: 48,
    fontWeight: '700',
    letterSpacing: 2,
  },
  tagline: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  loaderContainer: {
    marginTop: 40,
  },
});
