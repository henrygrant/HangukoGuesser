import { useColorScheme as useNativeColorScheme } from 'react-native';
import { useAppStore } from '@/stores/useAppStore';

export function useColorScheme() {
  const systemTheme = useNativeColorScheme();
  const { theme } = useAppStore();

  if (theme === 'system') {
    return systemTheme ?? 'light';
  }

  return theme;
}
