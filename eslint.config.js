// @ts-check
import { defineConfig } from '@lobehub/eslint-config'

export default defineConfig(
  {
    react: 'vite',
    typescript: true,
  },
  {
    ignores: ['**/dist/**', '**/build/**', 'docs/public/**', 'templates/**'],
  },
  {
    rules: {
      'no-restricted-syntax': 'off',
      'react/jsx-sort-props': 'off',
      'unicorn/prefer-math-trunc': 'off',
      'unicorn/prefer-single-call': 'off',
      'unicorn/import-style': 'off',
      'unicorn/text-encoding-identifier-case': 'off',
      'unicorn/no-array-callback-reference': 'off',
      'unicorn/no-array-for-each': 'off',
      '@eslint-react/no-clone-element': 'off',
      '@eslint-react/no-context-provider': 'off',
      '@eslint-react/no-nested-component-definitions': 'off',
      '@eslint-react/no-array-index-key': 'off',
      '@eslint-react/jsx-no-comment-textnodes': 'off',
      '@eslint-react/naming-convention/ref-name': 'off',
      '@eslint-react/hooks-extra/no-direct-set-state-in-use-effect': 'off',
    },
  },
)
