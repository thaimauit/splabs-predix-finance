import Config from 'react-native-config';

type AppEnvironment = 'development' | 'production';

export const env = {
  name: (Config.APP_ENV ?? 'development') as AppEnvironment,
  apiUrl: Config.API_URL ?? 'https://dev-api.predix.finance',
  oauthCallbackScheme: Config.OAUTH_CALLBACK_SCHEME ?? 'predixfinance',
  reownProjectId: Config.REOWN_PROJECT_ID ?? '',
  xOAuthClientId: Config.X_OAUTH_CLIENT_ID ?? '',
  appleRedirectUri: Config.APPLE_REDIRECT_URI ?? '',
  appleServiceId: Config.APPLE_SERVICE_ID ?? '',
  isProduction: Config.APP_ENV === 'production',
} as const;
