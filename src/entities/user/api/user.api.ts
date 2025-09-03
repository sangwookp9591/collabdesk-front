import { ApiBase } from '@/shared/api';

class UserApi extends ApiBase {
  async lastworkspace(): Promise<{
    success: boolean;
    message: string;
    data: {
      lastActiveWorkspaceId?: string;
      workspaceSlug?: string;
    };
  }> {
    return await this.fetchWithAuth('/lastworkspace', {
      method: 'GET',
    });
  }
}

export const userApi = new UserApi('user');
