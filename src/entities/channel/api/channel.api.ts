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

  async update(data: { name?: string; description?: string; isPublic?: boolean }) {
    return this.fetchWithAuth('', {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  }

  async delete(id: string) {
    return this.fetchWithAuth(`/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
  }
}

export const channelApi = new ChannelApi('channel');
