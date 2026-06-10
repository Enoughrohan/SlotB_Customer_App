import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: /^react-native$/, replacement: 'react-native-web' },
      { find: 'react-native/Libraries/Utilities/codegenNativeComponent', replacement: path.resolve(__dirname, 'src/mocks/codegenNativeComponent.js') },
      { find: 'react-native-gesture-handler', replacement: path.resolve(__dirname, 'src/mocks/gesture-handler.jsx') },
      { find: 'react-native-safe-area-context', replacement: path.resolve(__dirname, 'src/mocks/safe-area-context.tsx') },
      { find: 'react-native-screens', replacement: path.resolve(__dirname, 'src/mocks/screens.jsx') },
      { find: 'react-native-vector-icons/MaterialCommunityIcons', replacement: path.resolve(__dirname, 'src/mocks/vector-icons.tsx') }
    ],
    extensions: ['.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.tsx', '.ts', '.jsx', '.js'],
  },
  define: {
    global: 'window',
    __DEV__: 'true',
  },
});
