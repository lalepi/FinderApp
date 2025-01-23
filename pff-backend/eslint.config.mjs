import globals from 'globals'
import js from '@eslint/js'
import stylisticJs from '@stylistic/eslint-plugin-js'

/** @type {import('eslint').Linter.Config[]} */
export default [
    { files: ['**/*.{js,mjs,cjs,jsx}'] },
    {
        languageOptions: {
            sourceType: 'module',
            globals: {
                ...globals.node,
            },
            ecmaVersion: 'latest',
        },
    },
    js.configs.recommended,
    {
        rules: {
            'no-unused-vars': 'warn',
        },
    },
    {
        plugins: {
            '@stylistic/js': stylisticJs,
        },
        rules: {
            '@stylistic/js/indent': ['error', 4],
            '@stylistic/js/linebreak-style': ['error', 'unix'],
            '@stylistic/js/quotes': ['error', 'single'],
            '@stylistic/js/semi': ['error', 'never'],
            eqeqeq: 'error',
            'no-trailing-spaces': 'error',
            'object-curly-spacing': ['error', 'always'],
            'arrow-spacing': ['error', { before: true, after: true }],
        },
    },
    {
        ignores: ['dist/**'],
    },
]
