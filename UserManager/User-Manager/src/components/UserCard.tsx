import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useUsers } from '@/context/UserContext';
import { COLORS } from '@/constants/colors';

interface UserCardProps {
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    createdDate: string;
    profilePicture?: string;
  };
}

export default function UserCard({ user }: UserCardProps) {
  const router = useRouter();
  const { deleteUser } = useUsers();

  const handleDelete = () => {
    Alert.alert(
      'Delete User',
      `Are you sure you want to delete ${user.name}?`,
      [
        { text: 'Cancel', onPress: () => {} },
        {
          text: 'Delete',
          onPress: async () => {
            await deleteUser(user.id);
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <View style={styles.card}>
      <View style={styles.profileSection}>
        <View style={styles.avatarFrame}>
          {user.profilePicture ? (
            <Image source={{ uri: user.profilePicture }} style={styles.avatar} />
          ) : (
            <MaterialIcons name="person" size={40} color={COLORS.primary} />
          )}
        </View>
        <Text style={styles.name}>{user.name}</Text>
      </View>

      <View style={styles.infoRow}>
        <MaterialIcons name="email" size={16} color={COLORS.accent_blue} />
        <Text style={styles.email}>{user.email}</Text>
      </View>

      <View style={styles.infoRow}>
        <MaterialIcons name="phone" size={16} color={COLORS.accent_green} />
        <Text style={styles.info}>{user.phone}</Text>
      </View>

      <View style={styles.infoRow}>
        <MaterialIcons name="location-on" size={16} color={COLORS.accent_orange} />
        <Text style={styles.info}>{user.address}</Text>
      </View>

      <View style={styles.buttonRow}>
        <LinearGradient
          colors={['#6BCB77', '#52A85A']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.viewButton}
        >
          <TouchableOpacity
            onPress={() => router.push(`/user-details?id=${user.id}`)}
          >
            <Text style={styles.viewButtonText}>View/Edit</Text>
          </TouchableOpacity>
        </LinearGradient>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDelete}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.background,
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarFrame: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  email: {
    marginLeft: 8,
    fontSize: 13,
    color: COLORS.accent_blue,
  },
  info: {
    marginLeft: 8,
    fontSize: 13,
    color: COLORS.textLight,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 8,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  viewButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
  },
  deleteButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: COLORS.danger,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
  },
});
