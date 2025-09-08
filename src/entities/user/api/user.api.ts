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
      credentials: 'include',
    });
  }
  async updatelastworkspace(workspaceId: string) {
    return await this.fetchWithAuth('/lastworkspace', {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ workspaceId }),
    });
  }
}

export const userApi = new UserApi('user');
