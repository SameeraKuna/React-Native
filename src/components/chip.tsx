import { Pressable, Text, StyleSheet } from 'react-native';
import { CoveColors } from '@/constants/theme';

interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  variant?: 'default' | 'filled' | 'outline';
}

export function Chip({ label, selected = false, onPress, variant = 'default' }: ChipProps) {
  const styles = StyleSheet.create({
    default: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      backgroundColor: selected ? CoveColors.primaryLight : '#F5F5F5',
      borderWidth: 0,
    },
    filled: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      backgroundColor: selected ? CoveColors.primary : '#F5F5F5',
      borderWidth: 0,
    },
    outline: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      backgroundColor: '#FFFFFF',
      borderWidth: 1,
      borderColor: selected ? CoveColors.primary : CoveColors.border,
    },
  });

  const getTextColor = () => {
    if (variant === 'filled') {
      return selected ? '#FFFFFF' : CoveColors.textPrimary;
    }
    if (variant === 'outline') {
      return selected ? CoveColors.primary : CoveColors.textSecondary;
    }
    return selected ? CoveColors.primary : CoveColors.textSecondary;
  };

  return (
    <Pressable style={styles[variant]} onPress={onPress}>
      <Text style={{ color: getTextColor(), fontSize: 14, fontWeight: '500' }}>
        {label}
      </Text>
    </Pressable>
  );
}
