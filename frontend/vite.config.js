import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
    resolve: {
        alias: {
          "@": path.resolve(__dirname, "src"), // Alias for shorter imports
        },
      },
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      // You can remove 'external' unless you specifically need these as externals
      external: [],
    },
  },
});
