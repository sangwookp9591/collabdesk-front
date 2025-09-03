import { ApiBase } from '@/shared/api';

export class WorkspaceApi extends ApiBase {
  async create() {}

  async bySlug(wsSlug: string) {
    return await this.fetchWithAuth(`/workspaces/${wsSlug}`, {
      method: 'GET',
    });
  }

  async membersBySlug(wsSlug: string) {
    return await this.fetchWithAuth(`/workspaces/${wsSlug}/members`, {
      method: 'GET',
    });
  }

  async myMemberShip(wsSlug: string) {
    return await this.fetchWithAuth(`/workspaces/${wsSlug}/members/me`, {
      method: 'GET',
    });
  }

  async userMemberShip(wsSlug: string, userId: string) {
    return await this.fetchWithAuth(`/workspaces/${wsSlug}/members/${userId}`, {
      method: 'GET',
    });
  }

  async getWorkspaceStats(wsSlug: string) {
    return await this.fetchWithAuth(`/workspaces/${wsSlug}/stats`, {
      method: 'GET',
    });
  }
}

export const workspaceApi = new WorkspaceApi();
