import { createRequire } from 'module';

const rkulikPrettierConfig = createRequire(import.meta.url)('@rkulik/prettier-config/index.json');

// eslint-disable-next-line import/no-default-export
export default {
  ...rkulikPrettierConfig,
  plugins: ['prettier-plugin-astro'],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
};
