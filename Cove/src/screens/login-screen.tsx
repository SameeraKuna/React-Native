import { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';

export default function LoginScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      return;
    }
    setLoading(true);
    try {
      await login(email, password);
      // Navigation happens automatically via auth state change
      router.replace('/');
    } finally {
      setLoading(false);
    }
  };

  const handleAppleSignIn = async () => {
    setLoading(true);
    try {
      await login('apple@example.com', 'password');
      router.replace('/');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await login('google@example.com', 'password');
      router.replace('/');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Welcome back</Text>
          <Text style={[styles.subtitle, { color: colors.tabIconDefault }]}>
            Sign in to your Cove account
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: colors.text }]}>Email</Text>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor: colors.tabIconDefault,
                  color: colors.text,
                  backgroundColor: colors.backgroundElement,
                },
              ]}
              placeholder="you@example.com"
              placeholderTextColor={colors.tabIconDefault}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              editable={!loading}
            />
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.passwordHeader}>
              <Text style={[styles.label, { color: colors.text }]}>Password</Text>
              <TouchableOpacity>
                <Text style={[styles.forgot, { color: colors.tint }]}>Forgot?</Text>
              </TouchableOpacity>
            </View>
            <View
              style={[
                styles.passwordInput,
                {
                  borderColor: colors.tabIconDefault,
                  backgroundColor: colors.backgroundElement,
                },
              ]}>
              <TextInput
                style={[styles.input, { color: colors.text, flex: 1 }]}
                placeholder="••••••••"
                placeholderTextColor={colors.tabIconDefault}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                editable={!loading}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Text style={[styles.togglePassword, { color: colors.tint }]}>
                  {showPassword ? 'Hide' : 'Show'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.signInButton, { backgroundColor: colors.tint }]}
            onPress={handleSignIn}
            disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.signInButtonText}>Sign in</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.divider}>
          <View style={[styles.dividerLine, { backgroundColor: colors.tabIconDefault }]} />
          <Text style={[styles.dividerText, { color: colors.tabIconDefault }]}>or</Text>
          <View style={[styles.dividerLine, { backgroundColor: colors.tabIconDefault }]} />
        </View>

        <View style={styles.socialButtons}>
          <TouchableOpacity
            style={[
              styles.socialButton,
              { backgroundColor: colors.backgroundElement, borderColor: colors.tabIconDefault },
            ]}
            onPress={handleAppleSignIn}
            disabled={loading}>
            <Text style={[styles.socialButtonText, { color: colors.text }]}>🍎 Apple</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.socialButton,
              { backgroundColor: colors.backgroundElement, borderColor: colors.tabIconDefault },
            ]}
            onPress={handleGoogleSignIn}
            disabled={loading}>
            <Text style={[styles.socialButtonText, { color: colors.text }]}>🔍 Google</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.tabIconDefault }]}>
            New to Cove?{' '}
            <TouchableOpacity onPress={() => router.push('/')}>
              <Text style={[styles.footerLink, { color: colors.tint }]}>Create account</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
  },
  form: {
    gap: 20,
    marginBottom: 24,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
  },
  passwordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  passwordInput: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  togglePassword: {
    fontSize: 12,
    fontWeight: '600',
  },
  forgot: {
    fontSize: 12,
    fontWeight: '600',
  },
  signInButton: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  signInButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    fontSize: 12,
    fontWeight: '600',
  },
  socialButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  socialButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
  },
  socialButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    fontWeight: '400',
  },
  footerLink: {
    fontWeight: '700',
  },
});
