import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerContentScrollView, DrawerContentComponentProps } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { COLORS } from '@/constants/colors';
import UsersScreen from './users';
import ProductsScreen from './products';

// Types
type DrawerParamList = { MainTabs: undefined };

// Drawer and Tab instances
const Drawer = createDrawerNavigator<DrawerParamList>();
const Tab = createBottomTabNavigator();

// ------------------------------------------------------------------
// Custom Drawer Content
// ------------------------------------------------------------------
function AppDrawerContent(props: DrawerContentComponentProps) {
  const router = useRouter();
  const { navigation } = props;

  const closeDrawer = () => navigation.closeDrawer();

  const navigateTo = (screen: string, isTab: boolean = false) => {
    closeDrawer();

    if (isTab) {
      // For tab navigation, use the navigation API to switch tabs
      navigation.navigate('MainTabs', { screen } as any);
    } else {
      // For other screens (like shopping-cart), use router
      router.push(screen as any);
    }
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.drawerScrollContent}
    >
      {/* App header / branding area */}
      <View style={styles.drawerHeader}>
        <View style={styles.drawerLogoCircle}>
          <MaterialIcons name="people" size={32} color={COLORS.white} />
        </View>
        <Text style={styles.drawerAppName}>User Manager</Text>
        <Text style={styles.drawerAppSubtitle}>Manage users and products</Text>
      </View>

      {/* Divider */}
      <View style={styles.drawerDivider} />

      {/* Navigation items */}
      <View style={styles.drawerNav}>
        <DrawerNavItem
          icon="person"
          label="Users"
          onPress={() => navigateTo('users', true)}
        />
        <DrawerNavItem
          icon="shopping-bag"
          label="Products"
          onPress={() => navigateTo('products', true)}
        />
        <DrawerNavItem
          icon="shopping-cart"
          label="Shopping Cart"
          onPress={() => navigateTo('/shopping-cart', false)}
        />
      </View>

      {/* Footer */}
      <View style={styles.drawerFooter}>
        <Text style={styles.drawerFooterText}>v1.0.0</Text>
      </View>
    </DrawerContentScrollView>
  );
}

// ------------------------------------------------------------------
// Individual drawer nav item
// ------------------------------------------------------------------
interface DrawerNavItemProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  onPress: () => void;
}

function DrawerNavItem({ icon, label, onPress }: DrawerNavItemProps) {
  return (
    <TouchableOpacity style={styles.drawerNavItem} onPress={onPress} activeOpacity={0.7}>
      <MaterialIcons name={icon} size={22} color={COLORS.primary} />
      <Text style={styles.drawerNavLabel}>{label}</Text>
      <MaterialIcons name="chevron-right" size={18} color={COLORS.textLight} style={styles.drawerChevron} />
    </TouchableOpacity>
  );
}

// ------------------------------------------------------------------
// Hamburger button for tab header
// ------------------------------------------------------------------
function HamburgerButton() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => (navigation.getParent() as any)?.openDrawer()}
      style={styles.hamburger}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
    >
      <MaterialIcons name="menu" size={26} color={COLORS.text} />
    </TouchableOpacity>
  );
}

// ------------------------------------------------------------------
// Tab Navigator
// ------------------------------------------------------------------
function TabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof MaterialIcons.glyphMap = 'person';

          if (route.name === 'users') {
            iconName = 'person';
          } else if (route.name === 'products') {
            iconName = 'shopping-cart';
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textLight,
        headerShown: true,
        headerLeft: () => <HamburgerButton />,
        tabBarStyle: {
          backgroundColor: COLORS.white,
          borderTopColor: COLORS.border,
          borderTopWidth: 1,
        },
      } as BottomTabNavigationOptions)}
    >
      <Tab.Screen
        name="users"
        component={UsersScreen}
        options={{
          title: 'User Manager',
          tabBarLabel: 'Users',
        }}
      />
      <Tab.Screen
        name="products"
        component={ProductsScreen}
        options={{
          title: 'Product Manager',
          tabBarLabel: 'Products',
        }}
      />
    </Tab.Navigator>
  );
}

// ------------------------------------------------------------------
// Main export: Drawer wrapping Tabs
// ------------------------------------------------------------------
export default function TabsLayout() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <AppDrawerContent {...props} />}
      screenOptions={{
        drawerPosition: 'left',
        drawerType: 'front',
        drawerStyle: {
          width: 280,
          backgroundColor: COLORS.white,
        },
        headerShown: false,
        swipeEdgeWidth: 50,
      }}
    >
      <Drawer.Screen
        name="MainTabs"
        component={TabsNavigator}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
}

// ------------------------------------------------------------------
// Styles
// ------------------------------------------------------------------
const styles = StyleSheet.create({
  // Hamburger
  hamburger: {
    paddingLeft: 14,
    paddingRight: 6,
  },

  // Drawer scroll content
  drawerScrollContent: {
    flex: 1,
  },

  // Branding header
  drawerHeader: {
    paddingHorizontal: 20,
    paddingTop: 48,
    paddingBottom: 24,
    backgroundColor: COLORS.background,
    alignItems: 'center',
  },
  drawerLogoCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  drawerAppName: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  drawerAppSubtitle: {
    fontSize: 12,
    color: COLORS.textLight,
    textAlign: 'center',
  },

  // Divider
  drawerDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: 0,
  },

  // Nav section
  drawerNav: {
    paddingTop: 12,
    paddingBottom: 12,
  },
  drawerNavItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 0,
  },
  drawerNavLabel: {
    flex: 1,
    marginLeft: 16,
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.text,
  },
  drawerChevron: {
    marginLeft: 'auto',
  },

  // Footer
  drawerFooter: {
    marginTop: 'auto',
    paddingHorizontal: 20,
    paddingBottom: 32,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    alignItems: 'center',
  },
  drawerFooterText: {
    fontSize: 11,
    color: COLORS.textLight,
  },
});
