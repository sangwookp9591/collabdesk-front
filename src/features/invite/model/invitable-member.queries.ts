import { CHANNEL_QUERY_KEYS, channelApi } from '@/entities/channel';
import { WORKSPACE_QUERY_KEYS, workspaceApi } from '@/entities/workspace';
import { ChannelMember } from '@/shared/types/channel';
import { WorkspaceMember } from '@/shared/types/workspace';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export const useInvitableMembers = (wsSlug?: string, chSlug?: string) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['invitable-members', wsSlug, chSlug],
    queryFn: async () => {
      const [workspaceMembers, channelMembers] = await Promise.all([
        queryClient.fetchQuery({
          queryKey: [WORKSPACE_QUERY_KEYS.membersBySlug(wsSlug!)],
          queryFn: () => workspaceApi.membersBySlug(wsSlug!),
        }),
        queryClient.fetchQuery({
          queryKey: [CHANNEL_QUERY_KEYS.membersBySlug(wsSlug!, chSlug!)],
          queryFn: () => channelApi.setWorkspaceSlug(wsSlug!).membersBySlug(chSlug!),
        }),
      ]);
      const channelMemberIds = new Set(channelMembers.map((m: ChannelMember) => m.userId));

      console.log('channelMemberIds: ', channelMemberIds);
      return workspaceMembers.filter(
        (member: WorkspaceMember) => !channelMemberIds.has(member?.userId),
      );
    },
    enabled: !!(wsSlug && chSlug),
    staleTime: 2 * 60 * 1000, //
  });
};
