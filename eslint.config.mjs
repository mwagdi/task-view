import { dirname } from 'path';
import { fileURLToPath } from 'url';

import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

const eslintConfig = [
  ...compat.extends('eslint:recommended', 'next', 'next/core-web-vitals', 'next/typescript', 'prettier'),
  ...compat.plugins('prefer-arrow'),
  {
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'single', { avoidEscape: true }],
      'comma-dangle': ['error', 'always-multiline'],
      'object-curly-spacing': ['error', 'always'],
      'arrow-parens': ['error', 'always'],
      'prefer-const': 'error',
      'max-len': [
        'error',
        {
          code: 105,
          ignoreUrls: true,
          ignoreStrings: true, // often helpful
          ignoreTemplateLiterals: true, // if you use lots of templates
          ignoreComments: true, // optional
        },
      ],
      'no-debugger': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-unused-vars': 'off', // let TS handle this

      // TypeScript specific rules
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',

      'react/react-in-jsx-scope': 'off', // Next.js / new JSX transform
      'react/jsx-uses-react': 'off',

      // a11y tweaks
      'jsx-a11y/anchor-is-valid': 'warn',

      // import plugin examples
      'import/order': [
        'warn',
        {
          'newlines-between': 'always',
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
        },
      ],

      // Converts eligible callback functions to arrows
      'prefer-arrow-callback': ['error', { allowNamedFunctions: false }],

      // Converts many function *expressions* (and some declarations when safe)
      'prefer-arrow/prefer-arrow-functions': [
        'error',
        {
          disallowPrototype: true,
          singleReturnOnly: false,
          classPropertiesAllowed: false,
        },
      ],

      indent: 'off', // <-- disable the brittle core rule
      'react/jsx-indent': 'off', // let Prettier handle JSX spacing too
      'react/jsx-indent-props': 'off',
    },
  },
];

export default eslintConfig;
