// vite.config.ts
import { defineConfig } from "file:///C:/Users/%D0%91%D0%BE%D0%B3%D0%B4%D0%B0%D0%BD/Desktop/react-web-messenger/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/%D0%91%D0%BE%D0%B3%D0%B4%D0%B0%D0%BD/Desktop/react-web-messenger/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "@components": "/src/components",
      "@pages": "/src/pages",
      "@routes": "/src/routes",
      "@myfirebase": "/src/myfirebase",
      "@zustand": "/src/zustand",
      "@utils": "/src/utils",
      // '@types': '/src/types',
      "@interfaces": "/src/interfaces",
      "@hooks": "/src/hooks"
    }
  },
  plugins: [react()],
  base: "/react-web-messenger",
  build: {
    outDir: "build"
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxcdTA0MTFcdTA0M0VcdTA0MzNcdTA0MzRcdTA0MzBcdTA0M0RcXFxcRGVza3RvcFxcXFxyZWFjdC13ZWItbWVzc2VuZ2VyXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxcdTA0MTFcdTA0M0VcdTA0MzNcdTA0MzRcdTA0MzBcdTA0M0RcXFxcRGVza3RvcFxcXFxyZWFjdC13ZWItbWVzc2VuZ2VyXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy8lRDAlOTElRDAlQkUlRDAlQjMlRDAlQjQlRDAlQjAlRDAlQkQvRGVza3RvcC9yZWFjdC13ZWItbWVzc2VuZ2VyL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgICdAY29tcG9uZW50cyc6ICcvc3JjL2NvbXBvbmVudHMnLFxyXG4gICAgICAnQHBhZ2VzJzogJy9zcmMvcGFnZXMnLFxyXG4gICAgICAnQHJvdXRlcyc6ICcvc3JjL3JvdXRlcycsXHJcbiAgICAgICdAbXlmaXJlYmFzZSc6ICcvc3JjL215ZmlyZWJhc2UnLFxyXG4gICAgICAnQHp1c3RhbmQnOiAnL3NyYy96dXN0YW5kJyxcclxuICAgICAgJ0B1dGlscyc6ICcvc3JjL3V0aWxzJyxcclxuICAgICAgLy8gJ0B0eXBlcyc6ICcvc3JjL3R5cGVzJyxcclxuICAgICAgJ0BpbnRlcmZhY2VzJzogJy9zcmMvaW50ZXJmYWNlcycsXHJcbiAgICAgICdAaG9va3MnOiAnL3NyYy9ob29rcycsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgcGx1Z2luczogW3JlYWN0KCldLFxyXG4gIGJhc2U6ICcvcmVhY3Qtd2ViLW1lc3NlbmdlcicsXHJcbiAgYnVpbGQ6IHtcclxuICAgIG91dERpcjogJ2J1aWxkJyxcclxuICB9LFxyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEyVixTQUFTLG9CQUFvQjtBQUN4WCxPQUFPLFdBQVc7QUFFbEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsZUFBZTtBQUFBLE1BQ2YsVUFBVTtBQUFBLE1BQ1YsV0FBVztBQUFBLE1BQ1gsZUFBZTtBQUFBLE1BQ2YsWUFBWTtBQUFBLE1BQ1osVUFBVTtBQUFBO0FBQUEsTUFFVixlQUFlO0FBQUEsTUFDZixVQUFVO0FBQUEsSUFDWjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQSxFQUNqQixNQUFNO0FBQUEsRUFDTixPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsRUFDVjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
