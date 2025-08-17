// Server/eslint.config.mjs
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default [
  // ignore build artifacts
  { ignores: ['dist/**', 'node_modules/**'] },

  // Recommended presets
  ...tseslint.configs.recommended,
  js.configs.recommended,

  {
    languageOptions: {
      globals: {
        ...globals.node, // give ESLint Node globals like process, console
      },
    },
    rules: {
      // rely on the TS version of this rule
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }],

      // avoid false positives for Node globals
      'no-undef': 'off',

      // (optional) relax if you don’t want to type every error yet
      '@typescript-eslint/no-explicit-any': 'off'
    }
  }
];
