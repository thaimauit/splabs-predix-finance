export const INTRO_DURATION_MS = 5000;

// This boundary is ready to be backed by persisted first-launch state.
export async function shouldShowOnboarding(): Promise<boolean> {
  const {onboardingStore} = await import('../services/onboardingStore');
  return !(await onboardingStore.isComplete());
}

// Replace with the persisted authentication/session state when the API is connected.
export async function isUserAuthenticated(): Promise<boolean> {
  const {authApi} = await import('../../auth/services/authApi');
  return authApi.restoreSession();
}
