import {authorize} from 'react-native-app-auth';

import {env} from '../../../config/env';
import type {AuthSession} from '../types/auth';
import {authApi} from './authApi';

export const xAuthService = {
  async signIn(): Promise<AuthSession> {
    if (!env.xOAuthClientId) {
      throw new Error('X OAuth client ID is not configured.');
    }
    const result = await authorize({
      clientId: env.xOAuthClientId,
      redirectUrl: `${env.oauthCallbackScheme}://auth/x/callback`,
      scopes: ['tweet.read', 'users.read', 'offline.access'],
      serviceConfiguration: {
        authorizationEndpoint: 'https://twitter.com/i/oauth2/authorize',
        tokenEndpoint: 'https://api.twitter.com/2/oauth2/token',
      },
      usePKCE: true,
    });
    return authApi.loginWithXAccessToken(result.accessToken);
  },
};
