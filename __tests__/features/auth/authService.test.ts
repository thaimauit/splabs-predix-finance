import {
  AuthConfigurationError,
  AuthService,
  type AuthAdapter,
} from '../../../src/features/auth/services/authService';

const session = {accessToken: 'token', user: {id: 'user-1'}};

function createAdapter(): jest.Mocked<AuthAdapter> {
  return {
    connectWallet: jest.fn().mockResolvedValue(session),
    requestEmailCode: jest.fn().mockResolvedValue({challengeId: 'challenge', expiresAt: 'soon'}),
    signInWithGoogle: jest.fn().mockResolvedValue(session),
    signInWithPasskey: jest.fn().mockResolvedValue(session),
    verifyEmailCode: jest.fn().mockResolvedValue(session),
  };
}

describe('AuthService', () => {
  it('normalizes email input before requesting an OTP', async () => {
    const adapter = createAdapter();
    const service = new AuthService(adapter);

    await service.requestEmailCode('  USER@Example.COM ');

    expect(adapter.requestEmailCode).toHaveBeenCalledWith('user@example.com');
  });

  it('selects MetaMask as the wallet provider', async () => {
    const adapter = createAdapter();
    const service = new AuthService(adapter);

    await service.connectMetaMask();

    expect(adapter.connectWallet).toHaveBeenCalledWith('metamask');
  });

  it('exposes a typed configuration error', () => {
    expect(new AuthConfigurationError('Google').message).toContain('Google');
  });
});
