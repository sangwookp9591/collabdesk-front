import { ApiBase } from '@/shared/api';
import { Workspace } from '@/shared/types/workspace';

export class WorkspaceInit extends ApiBase {
  async BySlug(slug: string): Promise<{ workspaces: Workspace[]; currentWorkspace: Workspace }> {
    return await this.fetchWithAuth(`/${slug}/init`, {
      method: 'GET',
    });
  }
}

export const workspaceInit = new WorkspaceInit('workspaces');
