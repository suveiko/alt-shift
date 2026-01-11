import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import { defineConfig } from 'eslint/config';
import importPlugin from 'eslint-plugin-import';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unicorn from 'eslint-plugin-unicorn';
import tseslint from 'typescript-eslint';

export default defineConfig(
  {
    ignores: [
      'dist',
      'vite.config.ts',
      'src/shared/api/generated',
      'public/mockServiceWorker.js',
      'tests/**/*.spec.ts', // Test files can use kebab-case
      'tests/global-setup.ts',
      'tests/fixtures.ts', // Playwright fixture API uses "use" which conflicts with react-hooks
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  unicorn.configs.recommended,
  stylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    semi: true,
    jsx: true,
  }),
  reactHooks.configs.flat.recommended,
  {
    plugins: {
      'react-refresh': reactRefresh,
      'simple-import-sort': simpleImportSort,
      import: importPlugin,
    },
    rules: {
      'simple-import-sort/imports': 'off',
      'simple-import-sort/exports': 'error',
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling'],
            'index',
            'object',
            'type',
          ],
          pathGroups: [
            {
              pattern: '@app/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@pages/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@widgets/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@features/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@entities/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@shared/**',
              group: 'internal',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true, allowExportNames: ['useLocalStorageUpdate'] },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          disallowTypeAnnotations: true,
        },
      ],
      '@typescript-eslint/no-import-type-side-effects': 'error',
      'unicorn/filename-case': [
        'error',
        {
          cases: {
            kebabCase: true,
            pascalCase: true,
          },
        },
      ],
      'unicorn/no-null': 'off',
      'unicorn/prevent-abbreviations': [
        'error',
        {
          replacements: {
            props: false,
            ref: false,
            env: false,
          },
        },
      ],
      'unicorn/no-array-callback-reference': 'off',
      'unicorn/prefer-top-level-await': 'off',
      'unicorn/no-useless-undefined': 'off',
      'unicorn/no-array-reduce': 'off',
      '@stylistic/padding-line-between-statements': [
        'warn',
        {
          blankLine: 'always',
          prev: '*',
          next: [
            'return',
            'throw',
            'block-like',
            'enum',
            'interface',
            'type',
          ],
        },
        {
          blankLine: 'always',
          prev: ['const', 'let', 'var', 'block-like'],
          next: '*',
        },
        {
          blankLine: 'any',
          prev: ['const', 'let', 'var'],
          next: ['const', 'let', 'var'],
        },
        {
          blankLine: 'any',
          prev: 'export',
          next: 'export',
        },
        { blankLine: 'always', prev: ['case', 'default'], next: '*' },
        {
          blankLine: 'always',
          prev: '*',
          next: ['multiline-const', 'multiline-expression'],
        },
        {
          blankLine: 'always',
          prev: ['multiline-const', 'multiline-expression'],
          next: '*',
        },
      ],
      '@stylistic/jsx-newline': ['warn', { prevent: false }],
      '@stylistic/jsx-max-props-per-line': [
        'warn',
        { maximum: 1, when: 'multiline' },
      ],
      '@stylistic/jsx-first-prop-new-line': ['warn', 'multiline-multiprop'],
      '@stylistic/jsx-closing-bracket-location': ['warn', 'line-aligned'],
      '@stylistic/jsx-wrap-multilines': 'off',
      '@stylistic/arrow-parens': ['warn', 'always'],
      '@stylistic/brace-style': 'off',
      '@stylistic/operator-linebreak': 'off',
      '@stylistic/multiline-ternary': 'off',
      '@stylistic/indent': 'off',
      '@stylistic/jsx-child-element-spacing': 'off',
      '@stylistic/max-statements-per-line': 'off',
      '@stylistic/quotes': 'off',
      '@stylistic/quote-props': 'off',
      'react-hooks/static-components': 'off',
    },
  },
);
