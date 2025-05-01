// @ts-check
import { storyblok } from '@storyblok/astro';
import tailwindcss from '@tailwindcss/vite';
import basicSsl from '@vitejs/plugin-basic-ssl';
import { defineConfig, passthroughImageService } from 'astro/config';
import { loadEnv } from 'vite';

// eslint-disable-next-line no-undef
const env = loadEnv('', process.cwd(), 'STORYBLOK');

// https://astro.build/config
// eslint-disable-next-line import/no-default-export
export default defineConfig({
  vite: {
    plugins: [tailwindcss(), basicSsl()],
  },
  image: {
    domains: ['a.storyblok.com'],
    service: passthroughImageService(),
  },
  integrations: [
    storyblok({
      accessToken: env.STORYBLOK_TOKEN,
      components: {
        amenities: 'storyblok/amenities',
        banner: 'storyblok/banner',
        config: 'storyblok/config',
        'content-and-form': 'storyblok/content-and-form',
        description: 'storyblok/description',
        features: 'storyblok/features',
        gallery: 'storyblok/gallery',
        location: 'storyblok/location',
        neighborhood: 'storyblok/neighborhood',
        page: 'storyblok/page',
        'room-tour': 'storyblok/room-tour',
      },
    }),
  ],
});
