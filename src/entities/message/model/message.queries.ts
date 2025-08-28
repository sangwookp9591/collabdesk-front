import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';
import { messageApi } from '../api/message.api';
import { messageKeys } from './message-keys';
import { useSocketStore } from './socket.store';
import { useEffect } from 'react';

export const useChannelMessages = (
  slug: string,
  channelId?: string,
  page: number = 1,
  take?: number,
) => {
  const socket = useSocketStore((state) => state.socket);
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: messageKeys.channelMessages(slug, page),
    queryFn: () => messageApi.getMessagesByChannel(slug, page, take),
    staleTime: 1000 * 60, // 1분
    enabled: !!slug,
  });

  useEffect(() => {
    if (!socket) return;

    const handler = (message: any) => {
      // React Query cache 업데이트
      if (channelId && message.channelId) {
        queryClient.setQueryData(messageKeys.channelMessages(slug, page), (old: any) => {
          console.log('old: ', old);
          // old가 배열인지 확인

          return { ...old, messages: [...old.messages, message], total: Number(old.total) + 1 };
        });
      }
    };

    socket.on('newMessage', handler);

    return () => {
      socket.off('newMessage', handler);
    };
  }, [socket, channelId, slug, page, queryClient]);

  return query;
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
