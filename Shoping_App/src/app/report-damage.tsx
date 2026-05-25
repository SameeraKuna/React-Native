import { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CoveColors } from '@/constants/theme';

export default function ReportDamageScreen() {
  const router = useRouter();
  const [cameraMode, setCameraMode] = useState<'video' | 'photo' | 'live'>('photo');
  const [capturedPhotos, setCapturedPhotos] = useState(['photo1', 'photo2']);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cameraViewContainer}>
        <View style={styles.cameraView}>
          {/* Dark background with diagonal stripes pattern */}
          <View style={styles.patternOverlay} />

          {/* Corner Guides */}
          <View style={styles.cornerTL} />
          <View style={styles.cornerTR} />
          <View style={styles.cornerBL} />
          <View style={styles.cornerBR} />

          {/* Center Circle Guide */}
          <View style={styles.circleGuide} />

          {/* Hint Text */}
          <View style={styles.hintContainer}>
            <Ionicons name="alert-circle" size={16} color="#FFFFFF" />
            <Text style={styles.hintText}>Frame the damage in good light</Text>
          </View>

          {/* Detected Chip Overlay */}
          <View style={styles.detectedChip}>
            <Ionicons name="checkmark-circle" size={14} color={CoveColors.primary} />
            <Text style={styles.chipText}>Damage detected</Text>
          </View>
        </View>

        {/* Camera Controls */}
        <View style={styles.controlsBottom}>
          {/* Mode Selector */}
          <View style={styles.modeContainer}>
            <Pressable
              style={[styles.modeButton, cameraMode === 'video' && styles.modeButtonActive]}
              onPress={() => setCameraMode('video')}
            >
              <Text style={styles.modeText}>Video</Text>
            </Pressable>
            <Pressable
              style={[styles.modeButton, cameraMode === 'photo' && styles.modeButtonActive]}
              onPress={() => setCameraMode('photo')}
            >
              <Text style={styles.modeText}>Photo</Text>
            </Pressable>
            <Pressable
              style={[styles.modeButton, cameraMode === 'live' && styles.modeButtonActive]}
              onPress={() => setCameraMode('live')}
            >
              <Text style={styles.modeText}>Live</Text>
            </Pressable>
          </View>

          {/* Shutter and Controls Row */}
          <View style={styles.shutterRow}>
            <Pressable style={styles.libraryButton}>
              <Ionicons name="image" size={24} color="#FFFFFF" />
            </Pressable>

            <Pressable style={styles.shutterButton} onPress={() => {}}>
              <View style={styles.shutterInner} />
            </Pressable>

            <Pressable style={styles.flipButton}>
              <Ionicons name="camera-reverse" size={24} color="#FFFFFF" />
            </Pressable>
          </View>

          {/* Thumbnails */}
          {capturedPhotos.length > 0 && (
            <View style={styles.thumbnailRow}>
              {capturedPhotos.map((photo, idx) => (
                <View key={idx} style={styles.thumbnail} />
              ))}
            </View>
          )}

          {/* Upload from Library */}
          <Pressable onPress={() => console.log('Upload from library')}>
            <Text style={styles.uploadLink}>📎 Upload from library instead</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  cameraViewContainer: {
    flex: 1,
  },
  cameraView: {
    flex: 1,
    backgroundColor: '#2a2a2a',
    position: 'relative',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  patternOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#1a1a1a',
    opacity: 0.5,
  },
  cornerTL: {
    position: 'absolute',
    top: 40,
    left: 40,
    width: 30,
    height: 30,
    borderColor: '#FFFFFF',
    borderTopWidth: 2,
    borderLeftWidth: 2,
  },
  cornerTR: {
    position: 'absolute',
    top: 40,
    right: 40,
    width: 30,
    height: 30,
    borderColor: '#FFFFFF',
    borderTopWidth: 2,
    borderRightWidth: 2,
  },
  cornerBL: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    width: 30,
    height: 30,
    borderColor: '#FFFFFF',
    borderBottomWidth: 2,
    borderLeftWidth: 2,
  },
  cornerBR: {
    position: 'absolute',
    bottom: 40,
    right: 40,
    width: 30,
    height: 30,
    borderColor: '#FFFFFF',
    borderBottomWidth: 2,
    borderRightWidth: 2,
  },
  circleGuide: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderColor: '#FFFFFF',
    borderWidth: 2,
    opacity: 0.6,
  },
  hintContainer: {
    position: 'absolute',
    top: 100,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  hintText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '500',
  },
  detectedChip: {
    position: 'absolute',
    top: 60,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  controlsBottom: {
    backgroundColor: '#000000',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 16,
  },
  modeContainer: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
  },
  modeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  modeButtonActive: {
    backgroundColor: CoveColors.primary,
    borderColor: CoveColors.primary,
  },
  modeText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  shutterRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 40,
  },
  libraryButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shutterButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shutterInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: CoveColors.primary,
  },
  flipButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnailRow: {
    flexDirection: 'row',
    gap: 8,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  uploadLink: {
    color: '#FFFFFF',
    fontSize: 13,
    textAlign: 'center',
    fontWeight: '500',
  },
});
