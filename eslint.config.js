import astroPlugin from 'eslint-plugin-astro';
import tseslint from 'typescript-eslint';

export default [
  ...tseslint.configs.recommended,
  ...astroPlugin.configs.recommended,
  {
    rules: {
      "astro/no-set-html-directive": "off", // microCMSで使うのでオフ
    }
  }
];
