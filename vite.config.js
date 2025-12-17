import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => ({
  plugins: [
    react(),
    // Include bundle visualizer when ANALYZE=true
    process.env.ANALYZE === 'true' ? visualizer({ filename: 'dist/stats.html', gzipSize: true }) : null,
  ].filter(Boolean),
  base: '/', // Changed from '/Othello/' for portfolio site
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false, // Disable sourcemaps in production for smaller bundle
    minify: 'esbuild', // Use esbuild for fast minification
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        // Manual chunk splitting for better caching
        manualChunks: {
          react: ['react'],
          'react-dom': ['react-dom'],
          router: ['react-router-dom'],
        },
      },
    },
  },
  esbuild: {
    loader: 'tsx',
    include: /src\/.*\.[jt]sx?$/,
    exclude: [],
    drop: ['console', 'debugger'], // Remove console and debugger in production
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
        '.ts': 'tsx',
        '.tsx': 'tsx',
      },
    },
  },
  test: {
    globals: true,
    environment: 'happy-dom',
  },
}));
