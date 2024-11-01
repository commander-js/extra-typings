const globals = require('globals');
const esLintjs = require('@eslint/js');
const jest = require('eslint-plugin-jest');
const tseslint = require('typescript-eslint');
const prettier = require('eslint-config-prettier');

// Simpler setup than in Commander as not running TypeScript over .js files.
const tsconfigTsFiles = ['**/*.{ts,mts}'];

// Using tseslint.config adds some type safety and `extends` to simplify customising config array.
module.exports = tseslint.config(
  // Add recommended rules.
  esLintjs.configs.recommended,
  jest.configs['flat/recommended'],
  {
    files: tsconfigTsFiles,
    extends: [...tseslint.configs.recommended],
  },
  prettier, // Do Prettier last so it can override previous configs.

  // Customise rules.
  {
    files: ['**/*.{js,mjs,cjs}', '**/*.{ts,mts,cts}'],
    rules: {
      'no-else-return': ['error', { allowElseIf: false }],
    },
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    files: ['tests/*.{js,mjs,cjs,ts,mts,cts}'],
    rules: {
      'no-unused-vars': 'off',
    },
  },
  {
    files: ['tests/*.test-d.ts'],
    rules: {
      'no-constant-condition': 'off', // using `if ('explanation')` for test blocks
    },
  },
  {
    files: [...tsconfigTsFiles],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-expect-error': 'allow-with-description',
          'ts-ignore': 'allow-with-description',
          'ts-nocheck': true,
          'ts-check': true,
        },
      ],
    },
  },
);
