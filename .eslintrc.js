module.exports = {
    root: true,
    env: {
      "node": true,
      "commonjs": true
    },
    extends: [
      'eslint:recommended',
      'plugin:vue/essential',
      'prettier',
      'plugin:prettier/recommended',
    ],
    plugins: ['prettier'],
    rules: {
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          semi: true,
          useTabs: true,
          tabWidth: 4,
          trailingComma: 'all',
          printWidth: 80,
          bracketSpacing: true,
          arrowParens: 'avoid',
          endOfLine: 'auto',
        },
      ],
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    },
    parserOptions: {
      'parser': 'babel-eslint',
    }
  };