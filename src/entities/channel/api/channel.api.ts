import { ApiBase } from '@/shared/api';

class ChannelApi extends ApiBase {
  async findMany(workspaceId: string) {
    return this.fetchWithAuth(`${this.baseUrl}?workspaceId=${workspaceId}`, {
      method: 'GET',
      credentials: 'include',
    });
  }

  async create(formData: FormData) {
    return this.fetchWithAuth(`${this.baseUrl}`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });
  }
}

export const channelApi = new ChannelApi('channel');
