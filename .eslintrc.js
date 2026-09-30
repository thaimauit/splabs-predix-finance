module.exports = {
  root: true,
  extends: ['@react-native', 'prettier'],
  rules: {
    'react-native/no-inline-styles': 'warn',
    'react/no-unstable-nested-components': ['warn', {allowAsProps: true}],
    '@typescript-eslint/no-unused-vars': ['error', {argsIgnorePattern: '^_'}],
  },
};
