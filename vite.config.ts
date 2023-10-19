import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  resolve: {
    alias: {
      '@assets': '/src/assets',
      '@components': '/src/components',
      '@pages': '/src/pages',
      '@routes': '/src/routes',
      '@myfirebase': '/src/myfirebase',
      '@zustand': '/src/zustand',
      '@utils': '/src/utils',
      // '@types': '/src/types',
      '@interfaces': '/src/interfaces',
      '@hooks': '/src/hooks',
    },
  },
  plugins: [react()],
  base: '/react-web-messenger',
  build: {
    outDir: 'build',
  },
});
