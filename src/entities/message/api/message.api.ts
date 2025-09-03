import { ApiBase } from '@/shared/api';
import { Message } from '@/shared/types/message';

class MessageApi extends ApiBase {
  async getRecentMessages(wsSlug: string) {
    return await this.fetchWithAuth(`/workspaces/${wsSlug}/messages/recent`, {
      method: 'GET',
    });
  }

  async getMessagesByChannel(
    wsSlug: string,
    chSlug: string,
    page?: number,
    take?: number,
  ): Promise<{ messages: Message[]; hasMore: boolean; total: number }> {
    const params = new URLSearchParams({ page: String(page) });
    if (take) {
      params.append('take', String(take));
    }

    return await this.fetchWithAuth(
      `/workspaces/${wsSlug}/channel/${chSlug}/messages?${params.toString()}`,
      {
        method: 'GET',
      },
    );
  }
}

export const messageApi = new MessageApi();
