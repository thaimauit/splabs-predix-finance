import {Linking} from 'react-native';

import {env} from '../../../config/env';
import {apiRequest} from '../../../services/apiClient';
import type {AuthSession, WalletProvider} from '../types/auth';
import {authSessionStore} from './authSessionStore';

type EmailCredentials = {email: string; password: string};
type WalletNonce = {message: string};

const normalizeEmail = (email: string) => email.trim().toLowerCase();

async function persistSession(request: Promise<AuthSession>): Promise<AuthSession> {
  const session = await request;
  await authSessionStore.saveAccessToken(session.accessToken);
  return session;
}

export const authApi = {
  async restoreSession(): Promise<boolean> {
    const accessToken = await authSessionStore.getAccessToken();
    if (!accessToken) {
      return false;
    }
    try {
      await apiRequest<unknown>('/api/users/profile', {accessToken});
      return true;
    } catch {
      try {
        await authApi.refresh();
        return true;
      } catch {
        await authSessionStore.clear();
        return false;
      }
    }
  },

  registerWithEmail(credentials: EmailCredentials) {
    return apiRequest<{email: string; id: string; role: number}>('/api/auth/email/register', {
      body: {...credentials, email: normalizeEmail(credentials.email)},
      method: 'POST',
    });
  },

  loginWithEmail(credentials: EmailCredentials) {
    return persistSession(
      apiRequest<AuthSession>('/api/auth/email/login', {
        body: {...credentials, email: normalizeEmail(credentials.email)},
        method: 'POST',
      }),
    );
  },

  resendVerificationEmail(email: string) {
    return apiRequest<unknown>('/api/auth/email/resend-verify-email', {
      body: {email: normalizeEmail(email)},
      method: 'POST',
    });
  },

  requestPasswordReset(email: string) {
    return apiRequest<unknown>('/api/auth/email/forgot-password', {
      body: {email: normalizeEmail(email)},
      method: 'POST',
    });
  },

  resetPassword(token: string, password: string) {
    return apiRequest<unknown>('/api/auth/email/reset-password', {
      body: {password, token},
      method: 'POST',
    });
  },

  refresh() {
    return persistSession(apiRequest<AuthSession>('/api/auth/refresh', {method: 'POST'}));
  },

  async startGoogleLogin(): Promise<void> {
    await Linking.openURL(`${env.apiUrl}/api/auth/google/login?platform=mobile`);
  },

  async completeGoogleLogin(callbackUrl: string): Promise<boolean> {
    const accessToken = callbackUrl.match(/[?&]accessToken=([^&#]+)/)?.[1];
    if (!accessToken) {
      return false;
    }
    await authSessionStore.saveAccessToken(decodeURIComponent(accessToken));
    return true;
  },

  loginWithAppleIdentityToken(idToken: string) {
    return persistSession(
      apiRequest<AuthSession>('/api/auth/apple/login', {
        body: {idToken},
        method: 'POST',
      }),
    );
  },

  loginWithXAccessToken(accessToken: string) {
    return persistSession(
      apiRequest<AuthSession>('/api/auth/x/login', {
        body: {accessToken},
        method: 'POST',
      }),
    );
  },

  createWalletNonce(address: string, chainId: number) {
    return apiRequest<WalletNonce>('/api/auth/wallet/nonce', {
      body: {address, chainId},
      method: 'POST',
    });
  },

  loginWithWallet(message: string, signature: string, provider: WalletProvider) {
    const providerPath = provider === 'wallet' ? 'wallet' : provider;
    return persistSession(
      apiRequest<AuthSession>(`/api/auth/${providerPath}/login`, {
        body: provider === 'wallet' ? {message, provider, signature} : {message, signature},
        method: 'POST',
      }),
    );
  },
};
