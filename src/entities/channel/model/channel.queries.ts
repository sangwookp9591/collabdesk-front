import { useMutation, useQuery } from '@tanstack/react-query';
import { channelApi } from '../api/channel.api';
import { CHANNEL_QUERY_KEYS } from './channel-keys';

export const useChannels = (wsSlug?: string) => {
  return useQuery({
    queryKey: CHANNEL_QUERY_KEYS.allByWsSlug(wsSlug!),
    queryFn: () => channelApi.setWorkspaceSlug(wsSlug!).findMany(),
    enabled: !!wsSlug,
    staleTime: 5 * 60 * 1000,
  });
};

export function useDeleteChannel(wsSlug: string, slug: string, onSuccess?: () => void) {
  return useMutation({
    mutationFn: () => channelApi.setWorkspaceSlug(wsSlug).delete(slug),
    onSuccess: () => onSuccess?.(),
  });
}
