import { ApiBase } from '@/shared/api';
import { GetMessagesQueryDto } from '@/shared/types/message';
import { MessageResponse } from '../../../shared/types/message';

class MessageApi extends ApiBase {
  async createChannelMessage(data: {
    wsSlug: string;
    chSlug: string;
    content: string;
    mentionIds?: string[];
    parentId?: string;
  }) {
    const { wsSlug, chSlug, content, mentionIds, parentId } = data;

    console.log('wsSlug, chSlug, content, parentId  : ', wsSlug, chSlug, content, parentId);
    return await this.fetchWithAuth(`/workspaces/${wsSlug}/channels/${chSlug}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content,
        parentId,
        mentionIds: mentionIds ?? [],
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
    { cursor, take, direction }: GetMessagesQueryDto,
  ): Promise<MessageResponse> {
    const params = new URLSearchParams();
    params.append('cursor', cursor ?? '');
    if (take) {
      params.append('take', String(take));
    }
    if (direction) {
      params.append('direction', String(direction));
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
