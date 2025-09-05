import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

// pdf.js worker path (comes from pdfjs-dist v5.x)
const pdfWorker = "pdfjs-dist/legacy/build/pdf.worker.min.mjs";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["react-pdf", "pdfjs-dist"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          pdfjs: [pdfWorker],
        },
      },
    },
  },
  worker: {
    format: "es",
  },
});
