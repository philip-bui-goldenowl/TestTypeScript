module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  globals: {
    __DEV__: 'readonly',
  },
  env: {
    jest: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'airbnb/hooks'],
  plugins: ['react', 'react-native', 'react-hooks'],
  rules: {
    semi: ['error', 'always'],
    'max-len': ['error', 120],
    'no-alert': 'off',
    'no-console': 'off',
    'no-debugger': 'off',
    'no-param-reassign': 'off',
    'prefer-promise-reject-errors': 'off',
    'implicit-arrow-linebreak': 'off',
    'jsx-quotes': ['error', 'prefer-single'],
    'import/prefer-default-export': 'off',
    'react/prop-types': [
      'error',
      {
        ignore: ['field', 'form', 'error'],
        skipUndeclared: true,
      },
    ],
    'react/forbid-prop-types': 'off',
    'react/require-default-props': 'off',
    'react/no-unescaped-entities': 'off',
    'react/jsx-filename-extension': ['warn', {extensions: ['.js', '.jsx']}],
    'react-hooks/rules-of-hooks': 0,
    'react-hooks/exhaustive-deps': 0,
    'key-spacing': [
      2,
      {
        singleLine: {
          beforeColon: false,
          afterColon: true,
        },
      },
    ],
  },
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
};
