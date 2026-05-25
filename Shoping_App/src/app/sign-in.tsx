import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { CoveColors } from '@/constants/theme';

export default function SignInScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('hannah@example.com');
  const [password, setPassword] = useState('••••••••');

  const handleSignIn = () => {
    router.replace('/(tabs)/shop');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>C</Text>
          </View>
          <Text style={styles.heading}>Welcome back</Text>
          <Text style={styles.subtitle}>Sign in to pick up where you left off.</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>EMAIL</Text>
            <TextInput
              style={styles.input}
              placeholder="hannah@example.com"
              placeholderTextColor={CoveColors.textMuted}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.formGroup}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>PASSWORD</Text>
              <Pressable onPress={() => console.log('Forgot password')}>
                <Text style={styles.forgotLink}>Forgot?</Text>
              </Pressable>
            </View>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor={CoveColors.textMuted}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <Pressable style={styles.signInButton} onPress={handleSignIn}>
            <Text style={styles.signInButtonText}>Sign in</Text>
          </Pressable>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR CONTINUE WITH</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.socialContainer}>
            <Pressable style={styles.socialButton} onPress={() => console.log('Apple')}>
              <Text style={styles.socialButtonText}>🍎 Apple</Text>
            </Pressable>
            <Pressable style={styles.socialButton} onPress={() => console.log('Google')}>
              <Text style={styles.socialButtonText}>🔍 Google</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>New to Cove?</Text>
          <Pressable onPress={() => console.log('Create account')}>
            <Text style={styles.createAccountLink}>Create account</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CoveColors.background,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    gap: 12,
    marginBottom: 32,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: CoveColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  logoText: {
    fontSize: 36,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  heading: {
    fontSize: 28,
    fontWeight: '600',
    color: CoveColors.textPrimary,
  },
  subtitle: {
    fontSize: 14,
    color: CoveColors.textSecondary,
    textAlign: 'center',
  },
  form: {
    gap: 16,
  },
  formGroup: {
    gap: 8,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: CoveColors.textPrimary,
    textTransform: 'uppercase',
  },
  forgotLink: {
    fontSize: 12,
    color: CoveColors.primary,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: CoveColors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: CoveColors.textPrimary,
    backgroundColor: CoveColors.card,
  },
  signInButton: {
    backgroundColor: CoveColors.primary,
    borderRadius: 8,
    paddingVertical: 14,
    marginTop: 8,
  },
  signInButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: CoveColors.border,
  },
  dividerText: {
    fontSize: 12,
    color: CoveColors.textSecondary,
    fontWeight: '500',
  },
  socialContainer: {
    gap: 12,
  },
  socialButton: {
    borderWidth: 1,
    borderColor: CoveColors.border,
    borderRadius: 8,
    paddingVertical: 12,
    backgroundColor: CoveColors.card,
  },
  socialButtonText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    color: CoveColors.textPrimary,
  },
  footer: {
    alignItems: 'center',
    gap: 4,
  },
  footerText: {
    fontSize: 14,
    color: CoveColors.textSecondary,
  },
  createAccountLink: {
    fontSize: 14,
    color: CoveColors.primary,
    fontWeight: '600',
  },
});
