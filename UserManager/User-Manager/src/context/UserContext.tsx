import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdDate: string;
  profilePicture?: string;
}

export const UserContext = createContext<{
  users: User[];
  addUser: (user: User) => Promise<void>;
  updateUser: (id: string, user: User) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  getUser: (id: string) => User | undefined;
} | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);

  // Load users on mount
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await AsyncStorage.getItem('users');
      if (data) {
        setUsers(JSON.parse(data));
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error('Failed to load users:', error);
    }
  };

  const addUser = async (user: User) => {
    try {
      const newUsers = [...users, user];
      setUsers(newUsers);
      await AsyncStorage.setItem('users', JSON.stringify(newUsers));
    } catch (error) {
      console.error('Failed to add user:', error);
      throw error;
    }
  };

  const updateUser = async (id: string, updatedUser: User) => {
    try {
      const newUsers = users.map(u => (u.id === id ? updatedUser : u));
      setUsers(newUsers);
      await AsyncStorage.setItem('users', JSON.stringify(newUsers));
    } catch (error) {
      console.error('Failed to update user:', error);
      throw error;
    }
  };

  const deleteUser = async (id: string) => {
    try {
      const newUsers = users.filter(u => u.id !== id);
      setUsers(newUsers);
      await AsyncStorage.setItem('users', JSON.stringify(newUsers));
    } catch (error) {
      console.error('Failed to delete user:', error);
      throw error;
    }
  };

  const getUser = (id: string) => users.find(u => u.id === id);

  return (
    <UserContext.Provider value={{ users, addUser, updateUser, deleteUser, getUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUsers() {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  return context;
}
