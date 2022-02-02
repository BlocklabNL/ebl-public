module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'prettier'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'prettier/@typescript-eslint',
        'prettier/standard',
    ],
    rules: {
        'prettier/prettier': ['error', { tabWidth: 4, singleQuote: true }],
    },
    env: {
        es6: true,
        node: true,
    },
};
