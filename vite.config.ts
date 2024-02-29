import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  resolve: {
    alias: {
      '@api': '/src/api',
      '@assets': '/src/assets',
      '@components': '/src/components',
      '@pages': '/src/pages',
      '@router': '/src/router',
      '@routes': '/src/routes',
      '@myfirebase': '/src/myfirebase',
      '@zustand': '/src/zustand',
      '@utils': '/src/utils',
      // '@myTypes': '/src/myTypes',
      '@interfaces': '/src/interfaces',
      '@hooks': '/src/hooks',
      '@i18n': '/i18n',
    },
  },
  plugins: [react()],
  base: '/react-web-messenger',
  build: {
    outDir: 'build',
  },
});
