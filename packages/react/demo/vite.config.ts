import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@mkishor/mk-country-kit-ui': resolve(__dirname, '../../ui/src/index.ts'),
      '@mkishor/mk-country-kit-react': resolve(__dirname, '../src/index.ts'),
      '@mkishor/mk-country-kit-core': resolve(__dirname, '../../core/src/index.ts'),
      '@mkishor/mk-country-kit': resolve(__dirname, '../../data/src/index.ts'),
    },
    dedupe: ['react', 'react-dom'],
  },
});
