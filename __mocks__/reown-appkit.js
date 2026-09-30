const React = require('react');

module.exports = {
  AppKit: () => React.createElement('AppKit'),
  AppKitProvider: ({children}) => children,
  createAppKit: jest.fn(() => ({})),
  useAccount: () => ({isConnected: false}),
  useAppKit: () => ({close: jest.fn(), open: jest.fn()}),
  useProvider: () => ({}),
};
