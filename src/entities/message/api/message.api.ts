import { ApiBase } from '@/shared/api';
import { Message } from '@/shared/types/message';

class MessageApi extends ApiBase {
  async getChannelMessages(slug: string) {
    const response = await this.fetchWithAuth(`${this.baseUrl}/channel/${slug}`, {
      method: 'GET',
    });
    if (!response.ok) throw new Error('Failed to fetch messages');
    return response.json();
  }

  async getMessagesByChannel(
    slug: string,
    page?: number,
    take?: number,
  ): Promise<{ messages: Message[]; hasMore: boolean; total: number }> {
    const params = new URLSearchParams({ page: String(page) });
    if (take) {
      params.append('take', String(take));
    }

    const res = await this.fetchWithAuth(`${this.baseUrl}/channel/${slug}?${params.toString()}`, {
      method: 'GET',
    });
    if (!res.ok) throw new Error('Failed to fetch messages');
    return res.json();
  }
}

export const messageApi = new MessageApi('message');
