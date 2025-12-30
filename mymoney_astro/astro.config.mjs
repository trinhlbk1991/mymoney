import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.habitrotina.app',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto'
  },
  vite: {
    build: {
      cssMinify: true
    }
  }
});
