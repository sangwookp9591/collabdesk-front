import { useQuery } from '@tanstack/react-query';
import { channelApi } from '../api/channel.api';
import { CHANNEL_QUERY_KEYS } from './channel-keys';

export const useChannels = (workspaceId: string) => {
  return useQuery({
    queryKey: CHANNEL_QUERY_KEYS.allByWsId(workspaceId),
    queryFn: () => channelApi.getChannels(workspaceId),
    enabled: !!workspaceId,
    staleTime: 5 * 60 * 1000,
  });
};
