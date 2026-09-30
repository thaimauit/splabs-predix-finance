declare module 'react-native-config' {
  interface NativeConfig {
    APP_ENV?: 'development' | 'production';
    API_URL?: string;
    OAUTH_CALLBACK_SCHEME?: string;
    REOWN_PROJECT_ID?: string;
    X_OAUTH_CLIENT_ID?: string;
    APPLE_REDIRECT_URI?: string;
    APPLE_SERVICE_ID?: string;
  }
  const Config: NativeConfig;
  export default Config;
}
