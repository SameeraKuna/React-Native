import { useRouter, useRootNavigationState } from 'expo-router';
import { useEffect } from 'react';

export default function IndexScreen() {
  const router = useRouter();
  const navigationState = useRootNavigationState();

  useEffect(() => {
    if (navigationState?.key) {
      router.replace('/splash');
    }
  }, [navigationState?.key, router]);

  return null;
}
