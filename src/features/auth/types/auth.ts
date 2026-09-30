export type AuthMethod = 'email' | 'google' | 'x' | 'apple' | 'wallet';

export type AuthUser = {
  id: string;
  displayName?: string;
  email?: string;
};

export type AuthSession = {
  accessToken: string;
  refreshToken?: string;
  user?: AuthUser;
};

export type EmailChallenge = {
  challengeId: string;
  expiresAt: string;
};

export type WalletProvider = 'wallet' | 'metamask' | 'base-account' | 'rainbow' | 'walletconnect';
