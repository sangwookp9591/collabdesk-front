import { ApiBase } from '@/shared/api';

class InviteApi extends ApiBase {
  async getWorkspaceByInvite(type: string, code: string) {
    return await this.fetchWithAuth(`/${type}?code=${code}`, {
      method: 'GET',
    });
  }
}

export const inviteApi = new InviteApi('invite');
