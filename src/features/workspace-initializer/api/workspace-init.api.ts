import { ApiBase } from '@/shared/api';
import type { Workspace } from '@/shared/types/workspace';
import type { Notification } from '@/entities/notification';

export class WorkspaceInit extends ApiBase {
  async BySlug(slug: string): Promise<{
    workspaces: Workspace[];
    currentWorkspace: Workspace;
    notifications: Notification[];
  }> {
    return await this.fetchWithAuth(`/${slug}/init`, {
      method: 'GET',
    });
  }
}

export const workspaceInit = new WorkspaceInit('workspaces');
