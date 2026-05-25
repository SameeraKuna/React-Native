import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';

const MENU_ITEMS = [
  { icon: '📦', label: 'My orders', id: 'orders' },
  { icon: '❤️', label: 'Wishlist', id: 'wishlist' },
  { icon: '📍', label: 'Addresses', id: 'addresses' },
  { icon: '💳', label: 'Payment methods', id: 'payment' },
  { icon: '⚠️', label: 'Report damage', id: 'damage' },
  { icon: '↩️', label: 'Returns', id: 'returns' },
  { icon: '🔔', label: 'Notifications', id: 'notifications' },
];

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];
  const router = useRouter();
  const { logout } = useAuth();

  const handleSignOut = () => {
    logout();
    router.replace('/login');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View
            style={[
              styles.avatar,
              { backgroundColor: colors.backgroundElement },
            ]}>
            <Text style={styles.avatarText}>HM</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={[styles.profileName, { color: colors.text }]}>Hannah Mercer</Text>
            <Text style={[styles.profileEmail, { color: colors.tabIconDefault }]}>
              hannah@example.com
            </Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.editIcon}>✏️</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.text }]}>15</Text>
            <Text style={[styles.statLabel, { color: colors.tabIconDefault }]}>Orders</Text>
          </View>
          <View
            style={[
              styles.statDivider,
              { backgroundColor: colors.backgroundElement },
            ]}
          />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.text }]}>8</Text>
            <Text style={[styles.statLabel, { color: colors.tabIconDefault }]}>Wishlist</Text>
          </View>
          <View
            style={[
              styles.statDivider,
              { backgroundColor: colors.backgroundElement },
            ]}
          />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.text }]}>6</Text>
            <Text style={[styles.statLabel, { color: colors.tabIconDefault }]}>Reviews</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {MENU_ITEMS.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.menuItem,
                { borderBottomColor: colors.backgroundElement },
              ]}
              onPress={() => {
                if (item.id === 'damage') {
                  router.push('/damage/1');
                } else if (item.id === 'orders') {
                  router.push('/');
                }
              }}>
              <View style={styles.menuItemContent}>
                <Text style={styles.menuIcon}>{item.icon}</Text>
                <Text style={[styles.menuLabel, { color: colors.text }]}>
                  {item.label}
                </Text>
              </View>
              <Text style={[styles.menuArrow, { color: colors.tabIconDefault }]}>
                →
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Sign Out Button */}
        <View style={styles.signOutContainer}>
          <TouchableOpacity
            style={[
              styles.signOutButton,
              { borderColor: colors.tint },
            ]}
            onPress={handleSignOut}>
            <Text style={[styles.signOutText, { color: colors.tint }]}>Sign out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 13,
    fontWeight: '400',
  },
  editIcon: {
    fontSize: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    height: 40,
  },
  menuContainer: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  menuIcon: {
    fontSize: 20,
  },
  menuLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  menuArrow: {
    fontSize: 16,
    fontWeight: '600',
  },
  signOutContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  signOutButton: {
    paddingVertical: 14,
    borderWidth: 2,
    borderRadius: 8,
    alignItems: 'center',
  },
  signOutText: {
    fontSize: 16,
    fontWeight: '700',
  },
});
