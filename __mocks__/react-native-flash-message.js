const React = require('react');

function FlashMessage() {
  return React.createElement('FlashMessage');
}

module.exports = {
  __esModule: true,
  default: FlashMessage,
  showMessage: jest.fn(),
};
