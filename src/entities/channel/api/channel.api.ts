import { ApiBase } from '@/shared/api';

class ChannelApi extends ApiBase {
  async findMany(workspaceId: string) {
    return this.fetchWithAuth(`?workspaceId=${workspaceId}`, {
      method: 'GET',
      credentials: 'include',
    });
  }

  async create(formData: FormData) {
    return this.fetchWithAuth('', {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });
  }
}

export const channelApi = new ChannelApi('channel');
