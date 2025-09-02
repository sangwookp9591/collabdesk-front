import { ApiBase } from '@/shared/api';

export class WorkspaceApi extends ApiBase {
  async create() {}

  async bySlug() {}
}

export const workspaceApi = new WorkspaceApi();
