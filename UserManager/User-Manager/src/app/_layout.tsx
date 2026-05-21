import { Stack } from 'expo-router';
import { UserProvider } from '@/context/UserContext';
import { CartProvider } from '@/context/CartContext';

export default function RootLayout() {
  return (
    <UserProvider>
      <CartProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="add-user"
            options={{
              title: 'Add New User',
              headerBackTitle: 'Back'
            }}
          />
          <Stack.Screen
            name="user-details"
            options={{
              title: 'User Details',
              headerBackTitle: 'Back'
            }}
          />
          <Stack.Screen
            name="product-details"
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="shopping-cart"
            options={{
              title: 'Shopping Cart',
              headerBackTitle: 'Back'
            }}
          />
        </Stack>
      </CartProvider>
    </UserProvider>
  );
}
