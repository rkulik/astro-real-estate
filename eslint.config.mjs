import rkulik from '@rkulik/eslint-config';
import eslintPluginAstro from 'eslint-plugin-astro';

// eslint-disable-next-line import/no-default-export
export default rkulik({}, [
  { ignores: ['.astro', '.vscode', 'components.*.json', './src/types/component-types-sb.d.ts'] },
  ...eslintPluginAstro.configs.recommended,
]);
