import AsyncStorage from '@react-native-async-storage/async-storage';

const ONBOARDING_COMPLETE_KEY = 'predix.finance.onboarding-complete';

export const onboardingStore = {
  async isComplete(): Promise<boolean> {
    return (await AsyncStorage.getItem(ONBOARDING_COMPLETE_KEY)) === 'true';
  },

  async markComplete(): Promise<void> {
    await AsyncStorage.setItem(ONBOARDING_COMPLETE_KEY, 'true');
  },
};
