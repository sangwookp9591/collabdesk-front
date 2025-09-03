import { ApiBase } from '@/shared/api';

class ChannelApi extends ApiBase {
  async findMany(workspaceId: string) {
    return await this.fetchWithAuth(`?workspaceId=${workspaceId}`, {
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
    return await this.fetchWithAuth('', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  }

  async update(data: { name?: string; description?: string; isPublic?: boolean }) {
    return await this.fetchWithAuth('', {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  }

  async delete(id: string) {
    return await this.fetchWithAuth(`/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
  }

  async getMyChannels(workspaceSlug: string) {
    console.log('url : ', `/my?workspaceSlug=${workspaceSlug}`);
    return await this.fetchWithAuth(`/my?workspaceSlug=${workspaceSlug}`, {
      method: 'GET',
    });
  }
}

export const channelApi = new ChannelApi('channel');
