import type {AuthSession, EmailChallenge, WalletProvider} from '../types/auth';

export interface AuthAdapter {
  connectWallet(provider: WalletProvider): Promise<AuthSession>;
  requestEmailCode(email: string): Promise<EmailChallenge>;
  signInWithGoogle(): Promise<AuthSession>;
  signInWithPasskey(): Promise<AuthSession>;
  verifyEmailCode(challengeId: string, code: string): Promise<AuthSession>;
}

export class AuthConfigurationError extends Error {
  constructor(method: string) {
    super(`${method} authentication is not configured yet.`);
    this.name = 'AuthConfigurationError';
  }
}

const unavailableAdapter: AuthAdapter = {
  connectWallet: provider => Promise.reject(new AuthConfigurationError(provider)),
  requestEmailCode: () => Promise.reject(new AuthConfigurationError('Email')),
  signInWithGoogle: () => Promise.reject(new AuthConfigurationError('Google')),
  signInWithPasskey: () => Promise.reject(new AuthConfigurationError('Passkey')),
  verifyEmailCode: () => Promise.reject(new AuthConfigurationError('Email')),
};

export class AuthService {
  constructor(private readonly adapter: AuthAdapter) {}

  signInWithPasskey(): Promise<AuthSession> {
    return this.adapter.signInWithPasskey();
  }

  requestEmailCode(email: string): Promise<EmailChallenge> {
    return this.adapter.requestEmailCode(email.trim().toLowerCase());
  }

  verifyEmailCode(challengeId: string, code: string): Promise<AuthSession> {
    return this.adapter.verifyEmailCode(challengeId, code.trim());
  }

  signInWithGoogle(): Promise<AuthSession> {
    return this.adapter.signInWithGoogle();
  }

  connectWallet(): Promise<AuthSession> {
    return this.adapter.connectWallet('wallet');
  }

  connectMetaMask(): Promise<AuthSession> {
    return this.adapter.connectWallet('metamask');
  }
}

export const authService = new AuthService(unavailableAdapter);
