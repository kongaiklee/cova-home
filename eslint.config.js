import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import betterTailwindcss from 'eslint-plugin-better-tailwindcss';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { ignores: ['dist', 'node_modules'] },

  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    ...betterTailwindcss.configs.recommended,
    rules: {
      ...betterTailwindcss.configs.recommended.rules,
      'better-tailwindcss/enforce-canonical-classes': [
        'warn',
        { entryPoint: 'src/index.css' },
      ],
      'better-tailwindcss/no-deprecated-classes': [
        'warn',
        { entryPoint: 'src/index.css' },
      ],
      'better-tailwindcss/enforce-consistent-class-order': 'off', // Handled by prettier-plugin-tailwindcss
      'better-tailwindcss/enforce-consistent-line-wrapping': 'off',
      'better-tailwindcss/no-unknown-classes': 'off',
    },
  },
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      parser: tseslint.parser,
      parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'unused-imports': unusedImports,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-hooks/exhaustive-deps': 'off', // Often intentionally omitted to prevent infinite loops
      'react-hooks/incompatible-library': 'off', // react-hook-form is incompatible with React Compiler; not using Compiler
      'react-refresh/only-export-components': 'off', // Context files need to export both provider and hook

      // remove unused stuff automatically
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
          destructuredArrayIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],

      'no-useless-escape': 'error',
      '@typescript-eslint/no-unused-expressions': 'off',
      'no-irregular-whitespace': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];
