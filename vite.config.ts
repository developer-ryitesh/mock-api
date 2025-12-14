import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
   const env = loadEnv(mode, process.cwd());
   return {
      plugins: [react(), tailwindcss()],
      resolve: {
         alias: {
            "@": path.resolve(__dirname, "./src"),
         },
      },
      build: {
         outDir: path.resolve(__dirname, "build/views"),
      },
      server: {
         port: 3000,
         proxy: {
            "/api/v1": {
               target: env.VITE_LOCAL_BASE_URL,
               changeOrigin: true,
               secure: false,
            },
         },
      },
      preview: {
         port: 3000,
      },
   };
});
