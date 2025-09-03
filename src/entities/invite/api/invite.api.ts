import { ApiBase } from '@/shared/api';
import { ChannelRole } from '@/shared/types/channel';
import { WorkspaceRole } from '@/shared/types/workspace';

class InviteApi extends ApiBase {
  // 코드로 워크스페이스 조회
  async getWorkspaceByInvite(type: string, code: string) {
    return await this.fetchWithAuth(`/${type}?code=${code}`, {
      method: 'GET',
    });
  }

  //워크스페이스 초대
  async workspaceInvite(dto: { email: string; workspaceId: string; workspaceRole: WorkspaceRole }) {
    return await this.fetchWithAuth(`/workspace`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dto),
    });
  }

  // 채널 초대
  async channelInvite(dto: {
    email: string;
    workspaceId: string;
    channelId: string;
    channelRole: ChannelRole;
  }) {
    return await this.fetchWithAuth(`/channel`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dto),
    });
  }
}

export const inviteApi = new InviteApi('invite');
