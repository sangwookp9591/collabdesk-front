import { ApiBase } from '@/shared/api';

class ChannelApi extends ApiBase {
  private workspaceSlug: string | null = null;

  // 워크스페이스 slug 설정
  setWorkspaceSlug(slug: string) {
    this.workspaceSlug = slug;
    return this;
  }
  async findMany() {
    return await this.fetchWithAuth(`/workspaces/${this.workspaceSlug}/channels`, {
      method: 'GET',
      credentials: 'include',
    });
  }

  async create(data: {
    name: string;
    workspaceId: string;
    description?: string;
    isPublic: boolean;
  }) {
    return await this.fetchWithAuth(`/workspaces/${this.workspaceSlug}/channels`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  }

  async update(data: { name?: string; description?: string; isPublic?: boolean }) {
    return await this.fetchWithAuth(`/workspaces/${this.workspaceSlug}/channels`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  }

  async delete(slug: string) {
    return await this.fetchWithAuth(`/workspaces/${this.workspaceSlug}/channels/${slug}`, {
      method: 'DELETE',
      credentials: 'include',
    });
  }

  async getMyChannels() {
    return await this.fetchWithAuth(`/workspaces/${this.workspaceSlug}/channels/my`, {
      method: 'GET',
    });
  }

  async membersBySlug(channelSlug: string) {
    return await this.fetchWithAuth(
      `/workspaces/${this.workspaceSlug}/channels/${channelSlug}/members`,
      {
        method: 'GET',
      },
    );
  }
}

export const channelApi = new ChannelApi('');
