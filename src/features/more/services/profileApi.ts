import {ApiError, apiRequest} from '../../../services/apiClient';
import {authApi} from '../../auth/services/authApi';
import {authSessionStore} from '../../auth/services/authSessionStore';
import type {UserProfile} from '../types/profile';

async function requestProfile(accessToken: string): Promise<UserProfile> {
  return apiRequest<UserProfile>('/api/users/profile', {accessToken});
}

export const profileApi = {
  async getProfile(): Promise<UserProfile> {
    const accessToken = await authSessionStore.getAccessToken();
    if (!accessToken) {
      throw new ApiError('Your session has expired. Please log in again.', 401);
    }

    try {
      return await requestProfile(accessToken);
    } catch (requestError) {
      if (!(requestError instanceof ApiError) || requestError.status !== 401) {
        throw requestError;
      }

      const session = await authApi.refresh();
      return requestProfile(session.accessToken);
    }
  },
};
