import react from '@vitejs/plugin-react';

import dotenv from 'dotenv';
import { defineConfig } from 'vite';

import swEnvPlugin from './src/serviceWorker/swEnvPlugin';

dotenv.config();

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
      '@serviceWorker': '/src/serviceWorker',
      '@i18n': '/src/i18n',
    },
  },
  plugins: [react(), swEnvPlugin()],
  build: {
    outDir: 'build',
  },
});
