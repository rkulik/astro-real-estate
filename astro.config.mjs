// @ts-check
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, passthroughImageService } from 'astro/config';

// https://astro.build/config
// eslint-disable-next-line import/no-default-export
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    domains: ['picsum.photos'],
    service: passthroughImageService(),
  },
});
