import { ApiBase } from '@/shared/api';
import { Message } from '@/shared/types/message';

class MessageApi extends ApiBase {
  async createChannelMessage(data: {
    wsSlug: string;
    chSlug: string;
    content: string;
    parentId?: string;
  }) {
    const { wsSlug, chSlug, content, parentId } = data;

    console.log('wsSlug, chSlug, content, parentId  : ', wsSlug, chSlug, content, parentId);
    return await this.fetchWithAuth(`/workspaces/${wsSlug}/channels/${chSlug}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content,
        parentId,
      }),
    });
  }

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
      `/workspaces/${wsSlug}/channels/${chSlug}/messages?${params.toString()}`,
      {
        method: 'GET',
      },
    );
  }
}

export const messageApi = new MessageApi();
