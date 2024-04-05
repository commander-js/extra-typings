const globals = require('globals');
const esLintjs = require('@eslint/js');
const jest = require('eslint-plugin-jest');
const tseslint = require('typescript-eslint');
const prettier = require('eslint-config-prettier');
//const jsdoc = require('eslint-plugin-jsdoc');

// Using tseslint config helper to customise its setup the tseslint way.
const tsconfigTsFiles = ['**/*.{ts,mts}'];
const tsconfigJsFiles = ['**.{js,mjs}'];
const tseslintConfigs = tseslint.config(
  {
    files: tsconfigJsFiles,
    extends: [...tseslint.configs.recommended],
    rules: {
      '@typescript-eslint/no-var-requires': 'off', // (tseslint does not autodetect commonjs context )
    },
  },
  {
    files: tsconfigTsFiles,
    extends: [...tseslint.configs.recommended],
  },
);

module.exports = [
  esLintjs.configs.recommended,
  // jsdoc.configs['flat/recommended'],
  jest.configs['flat/recommended'],
  ...tseslintConfigs,
  prettier, // Do Prettier last so it can override previous configs.

  // Customise rules.
  {
    files: ['**/*.{js,mjs,cjs}', '**/*.{ts,mts,cts}'],
    rules: {
      'no-else-return': ['error', { allowElseIf: false }],

      // 'jsdoc/tag-lines': 'off',
      // 'jsdoc/require-jsdoc': 'off',
      // 'jsdoc/require-param-description': 'off',
      // 'jsdoc/require-returns-description': 'off',
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
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  {
    files: ['tests/*.test-d.ts'],
    rules: {
      'no-constant-condition': 'off', // using `if ('explanation')` for test blocks
    },
  },
  {
    files: [...tsconfigTsFiles, ...tsconfigJsFiles],
    rules: {
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
];
