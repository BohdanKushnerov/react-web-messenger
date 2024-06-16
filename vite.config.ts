import react from '@vitejs/plugin-react';

import { defineConfig } from 'vite';

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
      '@interfaces': '/src/interfaces',
      '@enums': '/src/enums',
      '@hooks': '/src/hooks',
      '@constants': '/src/constants',
      '@i18n': '/src/i18n',
    },
  },
  plugins: [react()],
  base: '/react-web-messenger',
  build: {
    outDir: 'build',
  },
});
