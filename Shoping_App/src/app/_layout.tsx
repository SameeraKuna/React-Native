import { DarkTheme, DefaultTheme, ThemeProvider, Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { CoveColors } from '@/constants/theme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: CoveColors.background },
        }}
      >
        <Stack.Screen name="splash" />
        <Stack.Screen name="sign-in" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="review" options={{ presentation: 'modal' }} />
        <Stack.Screen name="report-damage" options={{ presentation: 'modal' }} />
      </Stack>
    </ThemeProvider>
  );
}
