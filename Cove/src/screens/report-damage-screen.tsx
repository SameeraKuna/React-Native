import { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/theme';

type CameraMode = 'video' | 'photo' | 'live';

export default function ReportDamageScreen({ orderId }: { orderId?: string } = {}) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];
  const router = useRouter();
  const [mode, setMode] = useState<CameraMode>('photo');
  const [isRecording, setIsRecording] = useState(false);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.backgroundElement }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>Report Damage</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Camera Preview Area */}
      <View
        style={[
          styles.cameraPreview,
          { backgroundColor: colors.backgroundElement },
        ]}>
        {/* Striped Overlay Pattern */}
        <View style={styles.stripedOverlay}>
          {Array.from({ length: 8 }).map((_, i) => (
            <View
              key={i}
              style={[
                styles.stripe,
                { opacity: i % 2 === 0 ? 0.3 : 0.1 },
              ]}
            />
          ))}
        </View>

        {/* Crosshair */}
        <View style={styles.crosshair}>
          <View style={[styles.crosshairLine, styles.horizontal, { backgroundColor: colors.tint }]} />
          <View style={[styles.crosshairLine, styles.vertical, { backgroundColor: colors.tint }]} />
          <View style={[styles.crosshairCenter, { backgroundColor: colors.tint }]} />
        </View>

        {/* Instruction Text */}
        <View style={styles.instructionContainer}>
          <Text style={[styles.instruction, { color: colors.text }]}>
            Frame the damage in good light
          </Text>
        </View>
      </View>

      {/* Mode Tabs */}
      <View style={styles.modesContainer}>
        {(['video', 'photo', 'live'] as const).map((m) => (
          <TouchableOpacity
            key={m}
            style={[
              styles.modeButton,
              {
                borderBottomWidth: mode === m ? 2 : 0,
                borderBottomColor: mode === m ? colors.tint : 'transparent',
              },
            ]}
            onPress={() => setMode(m)}>
            <Text
              style={[
                styles.modeText,
                {
                  color: mode === m ? colors.tint : colors.tabIconDefault,
                  fontWeight: mode === m ? '700' : '500',
                },
              ]}>
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Camera Controls */}
      <View style={styles.controlsContainer}>
        {/* Capture Button */}
        <View style={styles.captureButtonContainer}>
          <TouchableOpacity
            style={[
              styles.captureButton,
              {
                backgroundColor: isRecording ? colors.tint : '#fff',
                borderColor: colors.tint,
              },
            ]}
            onPress={() => setIsRecording(!isRecording)}>
            <View
              style={[
                styles.captureButtonInner,
                {
                  backgroundColor: isRecording ? '#fff' : colors.tint,
                  borderRadius: isRecording ? 4 : 16,
                },
              ]}
            />
          </TouchableOpacity>
        </View>

        {/* Upload Alternative */}
        <TouchableOpacity style={styles.uploadAlternative}>
          <Text style={[styles.uploadText, { color: colors.tint }]}>
            📁 Upload from library instead
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  backButton: {
    fontSize: 24,
    fontWeight: '700',
  },
  cameraPreview: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    margin: 16,
    borderRadius: 12,
  },
  stripedOverlay: {
    ...StyleSheet.absoluteFill,
    flexDirection: 'row',
  },
  stripe: {
    flex: 1,
    backgroundColor: '#000',
  },
  crosshair: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 10,
  },
  crosshairLine: {
    position: 'absolute',
    backgroundColor: '#fff',
  },
  horizontal: {
    width: 60,
    height: 2,
  },
  vertical: {
    width: 2,
    height: 60,
  },
  crosshairCenter: {
    width: 8,
    height: 8,
    borderRadius: 4,
    zIndex: 20,
  },
  instructionContainer: {
    position: 'absolute',
    bottom: 20,
    paddingHorizontal: 16,
  },
  instruction: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  modesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 32,
    borderTopWidth: 1,
    paddingVertical: 12,
  },
  modeButton: {
    paddingVertical: 8,
  },
  modeText: {
    fontSize: 13,
  },
  controlsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    alignItems: 'center',
    gap: 16,
  },
  captureButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureButtonInner: {
    width: 56,
    height: 56,
  },
  uploadAlternative: {
    paddingVertical: 8,
  },
  uploadText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
