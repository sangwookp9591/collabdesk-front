import { useQuery } from '@tanstack/react-query';
import { workspaceApi } from '../api/workspace.api';
import { WORKSPACE_QUERY_KEYS } from './workspace-keys';

export const useUserWorkspaces = () => {
  return useQuery({
    queryKey: WORKSPACE_QUERY_KEYS.all,
    queryFn: () => workspaceApi.all(),
    staleTime: 5 * 60 * 1000,
  });
};

export const useWorkspaceMembers = (slug: string, q: string) => {
  return useQuery({
    queryKey: WORKSPACE_QUERY_KEYS.membersSearch(slug, q),
    queryFn: () => workspaceApi.membersBySlug(slug),
    enabled: !!slug && q.length >= 2,
    staleTime: 5 * 60 * 1000,
  });
};
