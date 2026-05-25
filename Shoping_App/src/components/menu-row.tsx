import { View, Pressable, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CoveColors } from '@/constants/theme';

interface MenuRowProps {
  icon: string;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  showChevron?: boolean;
}

export function MenuRow({
  icon,
  title,
  subtitle,
  onPress,
  showChevron = true,
}: MenuRowProps) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: CoveColors.border,
        gap: 12,
      }}
    >
      <Ionicons name={icon as any} size={24} color={CoveColors.primary} />
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, fontWeight: '500', color: CoveColors.textPrimary }}>
          {title}
        </Text>
        {subtitle && (
          <Text style={{ fontSize: 12, color: CoveColors.textSecondary, marginTop: 2 }}>
            {subtitle}
          </Text>
        )}
      </View>
      {showChevron && (
        <Ionicons name="chevron-forward" size={20} color={CoveColors.textSecondary} />
      )}
    </Pressable>
  );
}
