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
      name: "host",
      filename: "remoteEntry.js",
      exposes: {},
      remotes: {
        remote: {
          type: "module",
          name: "remote",
          // entry: "http://remote:2000/remoteEntry.js",
          entry: "http://localhost/ui/v1/remote/remoteEntry.js",
        },
      },
      shared: ["react", "react-dom", "react-router"],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: "/ui/v1/host",
});
