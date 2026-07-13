// @ts-check
/// <reference types="vite/client" />
export default {
  build: {
    target: 'esnext',
    minify: 'esbuild',
  },
  css: {
    postcss: './postcss.config.js',
  },
}
