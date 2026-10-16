import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@mui/icons-material/ArrowForwardIos": path.resolve(
        rootDir,
        "src/vendor/mui/ArrowForwardIos.jsx"
      ),
      "@mui/icons-material/ArrowBackIos": path.resolve(
        rootDir,
        "src/vendor/mui/ArrowBackIos.jsx"
      ),
    },
  },
  server: {
    host: "127.0.0.1",
    port: 5173,
    strictPort: true,
    open: true,
    watch: {
      ignored: ["**/tmp-screens/**", "**/extracted_assets/**", "**/*.pdf", "**/data/**"],
    },
    proxy: {
      "/api": "http://localhost:4000",
    },
  },
});
