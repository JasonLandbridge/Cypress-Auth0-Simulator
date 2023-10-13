import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { builtinModules } from 'module';
import nodePolyfills from 'rollup-plugin-polyfill-node';

export const name = 'index';
// Source: https://onderonur.netlify.app/blog/creating-a-typescript-library-with-vite/
export default defineConfig({
  build: {
    target: 'ESNext',
    sourcemap: true,
    outDir: 'dist',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name,
      fileName: (format) => `${name}.${format}.js`,
    },
    // Source: https://github.com/vitejs/vite/issues/7821#issuecomment-1679416967
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
      external: [...builtinModules, /^node:/],
    },
  },

  plugins: [dts(), nodePolyfills()],
});
