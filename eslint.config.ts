import js from '@eslint/js';
import ts from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import unusedImports from 'eslint-plugin-unused-imports';

export default ts.config(
  js.configs.recommended,
  prettier,
  ...ts.configs.recommended,
  {
    plugins: {
      'unused-imports': unusedImports,
    },
  },
  {
    rules: {
      quotes: ['error', 'single', { allowTemplateLiterals: false }],
      'no-unused-vars': 'off',
      'no-useless-escape': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': 'error',
    },
  },
  {
    ignores: ['dist'],
  },
);
