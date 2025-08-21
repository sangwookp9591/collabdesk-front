import { apiClient } from '../../../shared/api/base';
import type { User, SignInData, UpsertUserData } from '../model/types';

export const userApi = {
  // 로그인 (Credentials용)
  signIn: async (credentials: SignInData): Promise<User> => {
    const response = await apiClient.post('/auth/signin', credentials);
    return response.data;
  },

  // 사용자 Upsert (OAuth용)
  upsertUser: async (userData: UpsertUserData): Promise<User> => {
    const response = await apiClient.post('/users/upsert', userData);
    return response.data;
  },

  // 현재 사용자 정보 조회
  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get('/users/me');
    return response.data;
  },

  // 프로필 업데이트
  updateProfile: async (userId: string, data: Partial<User>): Promise<User> => {
    const response = await apiClient.put(`/users/${userId}/profile`, data);
    return response.data;
  },
};
