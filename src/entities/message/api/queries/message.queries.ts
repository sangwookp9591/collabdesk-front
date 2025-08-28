import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { messageApi } from '../message.api';
import { messageKeys } from './message-keys';

export const useChannelMessages = (slug: string, page: number = 1, take?: number) => {
  return useQuery({
    queryKey: messageKeys.channelMessages(slug, page),
    queryFn: () => messageApi.getMessagesByChannel(slug, page, take),
    staleTime: 1000 * 60, // 1분
    enabled: !!slug,
  });
};

export const useInfiniteChannelMessages = (slug: string) => {
  return useInfiniteQuery({
    queryKey: messageKeys.channel(slug),
    queryFn: ({ pageParam = 1 }) => messageApi.getMessagesByChannel(slug, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasMore ? allPages.length + 1 : undefined;
    },
    enabled: !!slug,
  });
};
