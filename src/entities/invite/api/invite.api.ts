import { ApiBase } from '@/shared/api';
import { ChannelRole } from '@/shared/types/channel';

class InviteApi extends ApiBase {
  async getWorkspaceByInvite(type: string, code: string) {
    return await this.fetchWithAuth(`/${type}?code=${code}`, {
      method: 'GET',
    });
  }
  async channelInvite(dto: {
    email: string;
    workspaceId: string;
    channelId: string;
    channelRole: ChannelRole;
  }) {
    return await this.fetchWithAuth(`/channel`, {
      method: 'POST',
      body: JSON.stringify(dto),
    });
  }
}

export const inviteApi = new InviteApi('invite');
