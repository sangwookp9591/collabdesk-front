import { ApiBase } from '@/shared/api';
import { GetMessagesQueryDto, MessageResponse } from '@/shared/types/message';

class DirectMessageApi extends ApiBase {
  //대화방생성
  private workspaceSlug: string | null = null;

  // 워크스페이스 slug 설정
  setWorkspaceSlug(slug: string) {
    this.workspaceSlug = slug;
    return this;
  }

  async createDmConversation(otherUserId: string) {
    return await this.fetchWithAuth(`/workspaces/${this.workspaceSlug}/dm/conversations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        otherUserId,
      }),
    });
  }

  async createDmMessage(data: {
    wsSlug: string;
    conversationId: string;
    content: string;
    mentionIds: string[];
    parentId?: string;
  }) {
    const { wsSlug, conversationId, content, mentionIds, parentId } = data;
    return await this.fetchWithAuth(
      `/workspaces/${wsSlug}/dm/conversations/${conversationId}/messages`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: content,
          mentionIds: mentionIds,
          parentId: parentId,
        }),
      },
    );
  }

  async getUserDmConvensions(wsSlug: string) {
    return await this.fetchWithAuth(`/workspaces/${wsSlug}/dm/conversations`, {
      method: 'GET',
    });
  }
  async getUserDmConvensionsRecent(wsSlug: string) {
    return await this.fetchWithAuth(`/workspaces/${wsSlug}/dm/conversations/recent`, {
      method: 'GET',
    });
  }
  async getDmConversation(wsSlug: string, conversationId: string) {
    return await this.fetchWithAuth(`/workspaces/${wsSlug}/dm/conversations/${conversationId}`, {
      method: 'GET',
    });
  }

  async getDm(wsSlug: string, conversationId: string) {
    return await this.fetchWithAuth(`/workspaces/${wsSlug}/dm/conversations/${conversationId}`, {
      method: 'GET',
    });
  }

  async getDmMessages(
    wsSlug: string,
    conversationId: string,
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
      `/workspaces/${wsSlug}/dm/conversations/${conversationId}/messages?${params.toString()}`,
      {
        method: 'GET',
      },
    );
  }
}

export const dmApi = new DirectMessageApi('');
