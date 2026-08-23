import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    minify: 'esbuild',
    chunkSizeWarningLimit: 3000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes('three') ||
            id.includes('three-stdlib') ||
            id.includes('three-mesh-bvh') ||
            id.includes('@react-three')
          ) {
            return 'three-vendor';
          }
        },
      },
    },
  },
  optimizeDeps: {
    include: ['three', 'three-stdlib', '@react-three/fiber', '@react-three/drei'],
  },
});