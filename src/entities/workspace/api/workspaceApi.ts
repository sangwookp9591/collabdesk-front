import { apiClient } from '@/shared/api/base';
import { WorkspaceSidebar } from '../model/type';

export const workspaceApi = {
  fetchWorkspaceSidebar: async (workspaceId: string): Promise<WorkspaceSidebar> => {
    const response = await apiClient.get(`/workspace/sidebar/${workspaceId}`);
    return response.data;
  },
};
