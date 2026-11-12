import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  // Node.js scripts (check-env.js, etc.) — use Node globals
  {
    files: ['scripts/**/*.{js,cjs,mjs}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.node,
      sourceType: 'commonjs',
    },
  },
  // Browser source files
  {
    files: ['**/*.{js,jsx}'],
    ignores: ['scripts/**'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]', destructuredArrayIgnorePattern: '^_' }],
      // react-hooks v7 set-state-in-effect: calling an async loader from useEffect
      // is a standard data-fetching pattern in this codebase — downgrade to warning.
      'react-hooks/set-state-in-effect': 'warn',
      // Context files export both a Provider component and a hook — standard pattern.
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
])
