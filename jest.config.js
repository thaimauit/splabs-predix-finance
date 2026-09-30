module.exports = {
  preset: '@react-native/jest-preset',
  watchman: false,
  moduleNameMapper: {
    '^@react-native-async-storage/async-storage$': '<rootDir>/__mocks__/async-storage.js',
    '^@react-native-vector-icons/.*/static$': '<rootDir>/__mocks__/vector-icons.js',
    '^@react-native-vector-icons/[^/]+$': '<rootDir>/__mocks__/vector-icons.js',
    '^@reown/appkit-ethers-react-native$': '<rootDir>/__mocks__/reown-ethers.js',
    '^@reown/appkit-react-native$': '<rootDir>/__mocks__/reown-appkit.js',
    '^@walletconnect/react-native-compat$': '<rootDir>/__mocks__/walletconnect-compat.js',
    '^@invertase/react-native-apple-authentication$':
      '<rootDir>/__mocks__/react-native-apple-authentication.js',
    '^react-native-config$': '<rootDir>/__mocks__/react-native-config.js',
    '^react-native-keychain$': '<rootDir>/__mocks__/react-native-keychain.js',
    '^react-native-get-random-values$': '<rootDir>/__mocks__/react-native-get-random-values.js',
    '^react-native-flash-message$': '<rootDir>/__mocks__/react-native-flash-message.js',
    '^react-native-app-auth$': '<rootDir>/__mocks__/react-native-app-auth.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!((@)?react-native|@react-native(-community)?|@react-navigation)/)',
  ],
};
