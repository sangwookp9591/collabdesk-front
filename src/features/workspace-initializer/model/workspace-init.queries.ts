import { useQuery } from '@tanstack/react-query';
import { workspaceInit } from '../api/workspace-init.api';
import { WORKSPACE_QUERY_KEYS } from '@/entities/workspace';

export const useWorkspaceInitBySlug = (slug: string) => {
  return useQuery({
    queryKey: WORKSPACE_QUERY_KEYS.initBySlug(slug),
    queryFn: () => workspaceInit.BySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
};
