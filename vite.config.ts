import path from 'path';
import { defineConfig as viteDefineConfig } from 'vite';
import { defineConfig as vitestDefineConfig, mergeConfig } from 'vitest/config';
import mdx from '@mdx-js/rollup';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';

const viteConfig = viteDefineConfig({
  plugins: [
    { enforce: 'pre', ...mdx({ providerImportSource: '@mdx-js/react' }) },
    react(),
    svgr(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});

const vitestConfig = vitestDefineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['vitest.setup.ts'],
    include: ['src/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    coverage: {
      include: ['src/**'],
    },
  },
});

export default mergeConfig(viteConfig, vitestConfig);
