export type RootStackParamList = {
  Intro: undefined;
  Onboarding: undefined;
  Login: undefined;
  EmailAuth: {mode: 'login' | 'signup'; registrationComplete?: boolean};
  Main: undefined;
  AccountDetail: {accountId: string};
};
export type MainTabParamList = {
  Challenges: undefined;
  Payouts: undefined;
  Trade: undefined;
  Billing: undefined;
  More: undefined;
};
