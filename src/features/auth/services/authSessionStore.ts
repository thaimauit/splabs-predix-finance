import * as Keychain from 'react-native-keychain';

const ACCESS_TOKEN_SERVICE = 'io.predix.finance.access-token';

export const authSessionStore = {
  async clear(): Promise<void> {
    await Keychain.resetGenericPassword({service: ACCESS_TOKEN_SERVICE});
  },

  async getAccessToken(): Promise<string | null> {
    const credentials = await Keychain.getGenericPassword({service: ACCESS_TOKEN_SERVICE});
    return credentials ? credentials.password : null;
  },

  async saveAccessToken(accessToken: string): Promise<void> {
    await Keychain.setGenericPassword('access-token', accessToken, {
      accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
      service: ACCESS_TOKEN_SERVICE,
    });
  },
};
