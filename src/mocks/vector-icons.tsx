import React from 'react';
import { Text } from 'react-native';

const ICON_MAP: Record<string, string> = {
  'map-marker': '📍',
  'chevron-down': '▼',
  'bell-outline': '🔔',
  'magnify': '🔍',
  'chevron-right': '▶',
  'home': '🏠',
  'compass-outline': '🧭',
  'qrcode-scan': '📷',
  'clipboard-list-outline': '📋',
  'account-outline': '👤',
  // Navigation / styling fallback symbol
};

export default function Icon({ name, size, color, style }: any) {
  const symbol = ICON_MAP[name] || '🔹';
  return (
    <Text style={[{ fontSize: size || 20, color: color || '#000' }, style]}>
      {symbol}
    </Text>
  );
}
