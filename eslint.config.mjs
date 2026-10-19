import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypeScript from 'eslint-config-next/typescript';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

export default defineConfig([
    globalIgnores([
        '.next/**',
        'out/**',
        'build/**',
        'coverage/**',
        'public/**',
        'next-env.d.ts',
    ]),
    ...nextVitals,
    ...nextTypeScript,
    {
        ...prettierRecommended,
        files: ['**/*.{ts,tsx}'],
    },
    {
        files: ['**/*.{ts,tsx}'],
        rules: {
            // Keep legacy effect findings visible during the UI refactor.
            'react-hooks/set-state-in-effect': 'warn',
            '@typescript-eslint/no-explicit-any': 'off',
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    args: 'all',
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                    destructuredArrayIgnorePattern: '^_',
                    ignoreRestSiblings: true,
                },
            ],
        },
    },
]);
