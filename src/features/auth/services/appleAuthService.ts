import {Platform} from 'react-native';
import 'react-native-get-random-values';

import {appleAuth, appleAuthAndroid} from '@invertase/react-native-apple-authentication';

import {env} from '../../../config/env';
import type {AuthSession} from '../types/auth';
import {authApi} from './authApi';

export const appleAuthService = {
  async signIn(): Promise<AuthSession> {
    if (Platform.OS === 'android') {
      if (!appleAuthAndroid.isSupported) {
        throw new Error('Sign in with Apple is not supported on this device.');
      }
      if (!env.appleServiceId || !env.appleRedirectUri) {
        throw new Error('Apple Service ID or redirect URI is not configured.');
      }
      const randomBytes = globalThis.crypto.getRandomValues(new Uint8Array(16));
      const state = Array.from(randomBytes, value => value.toString(16).padStart(2, '0')).join('');
      appleAuthAndroid.configure({
        clientId: env.appleServiceId,
        redirectUri: env.appleRedirectUri,
        responseType: appleAuthAndroid.ResponseType.ALL,
        scope: appleAuthAndroid.Scope.ALL,
        state,
      });
      const credential = await appleAuthAndroid.signIn();
      if (!credential.id_token) {
        throw new Error('Apple did not return an identity token.');
      }
      return authApi.loginWithAppleIdentityToken(credential.id_token);
    }
    if (!appleAuth.isSupported) {
      throw new Error('Sign in with Apple is not supported on this device.');
    }
    const credential = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });
    if (!credential.identityToken) {
      throw new Error('Apple did not return an identity token.');
    }
    return authApi.loginWithAppleIdentityToken(credential.identityToken);
  },
};
