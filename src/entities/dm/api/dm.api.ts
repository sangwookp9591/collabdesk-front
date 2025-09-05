import { ApiBase } from '@/shared/api';
import { Message } from '@/shared/types/message';

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
    parentId?: string;
  }) {
    const { wsSlug, conversationId, content, parentId } = data;
    return await this.fetchWithAuth(
      `/workspaces/${wsSlug}/dm/conversations/${conversationId}/messages`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: content,
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
    page?: number,
    take?: number,
  ): Promise<{ messages: Message[]; hasMore: boolean; total: number }> {
    const params = new URLSearchParams({ page: String(page) });
    if (take) {
      params.append('take', String(take));
    }
    return await this.fetchWithAuth(
      `/workspaces/${wsSlug}/dm/conversations/${conversationId}/messages`,
      {
        method: 'GET',
      },
    );
  }
}

export const dmApi = new DirectMessageApi('');
