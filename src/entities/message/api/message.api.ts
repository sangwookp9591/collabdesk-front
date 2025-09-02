import { ApiBase } from '@/shared/api';
import { Message } from '@/shared/types/message';

class MessageApi extends ApiBase {
  async getChannelMessages(slug: string) {
    return await this.fetchWithAuth(`/channel/${slug}`, {
      method: 'GET',
    });
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

    return await this.fetchWithAuth(`/channel/${slug}?${params.toString()}`, {
      method: 'GET',
    });
  }
}

export const messageApi = new MessageApi('message');
