import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface CartItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  icon: string;
}

export const CartContext = createContext<{
  cartItems: CartItem[];
  addToCart: (item: CartItem) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getTotalPrice: () => number;
  getTotalItems: () => number;
} | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart items on mount
  useEffect(() => {
    loadCartItems();
  }, []);

  const loadCartItems = async () => {
    try {
      const data = await AsyncStorage.getItem('cartItems');
      if (data) {
        setCartItems(JSON.parse(data));
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error('Failed to load cart items:', error);
    }
  };

  const addToCart = async (item: CartItem) => {
    try {
      const existingItem = cartItems.find((ci) => ci.productId === item.productId);

      let updatedItems: CartItem[];
      if (existingItem) {
        // If product already exists, update quantity
        updatedItems = cartItems.map((ci) =>
          ci.productId === item.productId
            ? { ...ci, quantity: ci.quantity + item.quantity }
            : ci
        );
      } else {
        // Add new item to cart
        updatedItems = [...cartItems, item];
      }

      setCartItems(updatedItems);
      await AsyncStorage.setItem('cartItems', JSON.stringify(updatedItems));
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      const updatedItems = cartItems.filter((item) => item.productId !== productId);
      setCartItems(updatedItems);
      await AsyncStorage.setItem('cartItems', JSON.stringify(updatedItems));
    } catch (error) {
      console.error('Failed to remove from cart:', error);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    try {
      let updatedItems: CartItem[];

      if (quantity <= 0) {
        // Remove item if quantity is 0 or less
        updatedItems = cartItems.filter((item) => item.productId !== productId);
      } else {
        // Update quantity
        updatedItems = cartItems.map((item) =>
          item.productId === productId
            ? { ...item, quantity }
            : item
        );
      }

      setCartItems(updatedItems);
      await AsyncStorage.setItem('cartItems', JSON.stringify(updatedItems));
    } catch (error) {
      console.error('Failed to update quantity:', error);
    }
  };

  const clearCart = async () => {
    try {
      setCartItems([]);
      await AsyncStorage.removeItem('cartItems');
    } catch (error) {
      console.error('Failed to clear cart:', error);
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = React.useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
