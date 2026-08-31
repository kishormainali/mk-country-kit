import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src'],
      exclude: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
      rollupTypes: false,
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ReactCountryKit',
      formats: ['es', 'cjs'],
      fileName: (format) => `mk-country-kit-react.${format === 'es' ? 'es' : 'cjs'}.js`,
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        '@radix-ui/react-popover',
        'cmdk',
        'class-variance-authority',
        'tailwind-merge',
        'clsx',
        '@mkishor/mk-country-kit-core',
        'libphonenumber-js',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'ReactJSXRuntime',
          '@radix-ui/react-popover': 'RadixPopover',
          cmdk: 'Command',
          'tailwind-merge': 'tailwindMerge',
          clsx: 'clsx',
          '@mkishor/mk-country-kit-core': 'ReactCountryKitCore',
          'libphonenumber-js': 'libphonenumber',
        },
      },
    },
    sourcemap: true,
    minify: 'esbuild',
  },
});
