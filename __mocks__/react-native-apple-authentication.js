module.exports = {
  appleAuth: {
    isSupported: false,
    Operation: {LOGIN: 1},
    performRequest: jest.fn(),
    Scope: {EMAIL: 0, FULL_NAME: 1},
  },
  appleAuthAndroid: {
    configure: jest.fn(),
    isSupported: false,
    ResponseType: {ALL: 'ALL'},
    Scope: {ALL: 'ALL'},
    signIn: jest.fn(),
  },
};
