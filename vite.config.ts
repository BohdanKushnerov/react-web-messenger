import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@components': '/src/components',
      '@pages': '/src/pages',
      '@myfirebase': '/src/myfirebase',
      '@zustand': '/src/zustand',
    },
  },
  plugins: [react()],
  base: '/react-web-messenger',
  build: {
    outDir: 'build', // Здесь указываем папку "build"
  },
});
