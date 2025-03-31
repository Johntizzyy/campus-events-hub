import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: '/campus-events-hub/', 
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
});
