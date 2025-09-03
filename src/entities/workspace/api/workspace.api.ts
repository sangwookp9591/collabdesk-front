import { ApiBase } from '@/shared/api';

export class WorkspaceApi extends ApiBase {
  async create(formData: FormData) {
    return await this.fetchWithAuth(``, {
      method: 'POST',
      body: formData,
    });
  }

  async all() {
    return await this.fetchWithAuth(``, {
      method: 'GET',
    });
  }

  async bySlug(wsSlug: string) {
    return await this.fetchWithAuth(`/${wsSlug}`, {
      method: 'GET',
    });
  }

  async membersBySlug(wsSlug: string) {
    return await this.fetchWithAuth(`/${wsSlug}/members`, {
      method: 'GET',
    });
  }

  async myMemberShip(wsSlug: string) {
    return await this.fetchWithAuth(`/${wsSlug}/members/me`, {
      method: 'GET',
    });
  }

  async userMemberShip(wsSlug: string, memberId: string) {
    return await this.fetchWithAuth(`/${wsSlug}/members/${memberId}`, {
      method: 'GET',
    });
  }

  async getWorkspaceStats(wsSlug: string) {
    return await this.fetchWithAuth(`/${wsSlug}/stats`, {
      method: 'GET',
    });
  }
}

export const workspaceApi = new WorkspaceApi('workspaces');
