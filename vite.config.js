import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import viteCompression from "vite-plugin-compression";

export default defineConfig({
  plugins: [
    react(),
    viteCompression({
      algorithm: "gzip",
      ext: ".gz",
      deleteOriginFile: false,
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
          if (id.includes("large-video") || id.includes("large-static-asset")) {
            return "large-assets";
          }
        },
      },
    },
    chunkSizeWarningLimit: 1500,
    minify: "esbuild",
  },
  optimizeDeps: {
    include: ["react", "react-dom", "some-large-library"],
    exclude: ["some-library-you-want-to-exclude"],
  },
  define: {
    "process.env": process.env,
  },
});
