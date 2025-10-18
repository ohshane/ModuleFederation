import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 2000,
    hmr: {
      protocol: "ws",
      host: "localhost",
      clientPort: 80,
      path: "/__vite/ws",
    },
  },
  build: {
    target: "chrome89",
  },
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: "remote",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App.tsx",
        "./Counter": "./src/components/Counter.tsx",
        "./store": "./src/store/index.ts",
      },
      remotes: {},
      shared: ["react", "react-dom", "react-router"],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: "/ui/v1/remote",
});
