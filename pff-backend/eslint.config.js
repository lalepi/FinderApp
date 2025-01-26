import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'

export default tseslint.config(
    { ignores: ['node_modules', 'dist'] },
    {
        extends: [eslint.configs.recommended, ...tseslint.configs.recommended],
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
        },
    }
)
