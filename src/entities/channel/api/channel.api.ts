import { fetchWithAuth } from '@/shared/api';

class ChannelApi {
  private baseUrl = `/channel`;

  async getChannels(workspaceId: string) {
    return fetchWithAuth(`${this.baseUrl}?workspaceId=${workspaceId}`, {
      method: 'GET',
      credentials: 'include',
    });
  }

  async create(formData: FormData) {
    return fetchWithAuth(`${this.baseUrl}`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });
  }
}

export const channelApi = new ChannelApi();
