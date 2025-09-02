import { ApiBase } from '@/shared/api';

class ChannelApi extends ApiBase {
  async findMany(workspaceId: string) {
    return this.fetchWithAuth(`?workspaceId=${workspaceId}`, {
      method: 'GET',
      credentials: 'include',
    });
  }

  async create(data: {
    name: string;
    workspaceId: string;
    description?: string;
    isPublic: boolean;
  }) {
    return this.fetchWithAuth('', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  }
}

export const channelApi = new ChannelApi('channel');
