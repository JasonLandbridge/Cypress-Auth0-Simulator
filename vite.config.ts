import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import nodeResolve from '@rollup/plugin-node-resolve';

export const name = 'index';
// Source: https://onderonur.netlify.app/blog/creating-a-typescript-library-with-vite/
export default defineConfig({
  build: {
    target: 'esnext',
    sourcemap: true,
    emptyOutDir: true,
    minify: false,
    lib: {
      entry: [
        resolve(__dirname, 'src/index.ts'),
        resolve(__dirname, 'src/commands/index.ts'),
      ],
      formats: ['es'],
      fileName: (format) => `${name}.${format}.js`,
    }, // Source: https://github.com/vitejs/vite/issues/7821#issuecomment-1679416967
    rollupOptions: {
      external: [
        // ...Object.keys(pkg.dependencies), // don't bundle dependencies
        //     '@effection/core',
        // '@simulacrum/auth0-simulator',
        /^node:.*/, // don't bundle built-in Node.js modules (use protocol imports!)
      ],
    },
  },
  resolve: {
    alias: {
      events: 'rollup-plugin-node-polyfills/polyfills/events',
    },
  },
  plugins: [
    dts(),
    nodeResolve(),
    nodePolyfills({
      include: ['events', 'crypto'],
    }),
  ],
});
