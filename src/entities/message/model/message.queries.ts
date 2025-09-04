'use client';

import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';
import { messageApi } from '../api/message.api';
import { messageKeys } from './message-keys';
import { useSocketStore } from './socket.store';
import { useEffect } from 'react';

export const useChannelMessages = (
  wsSlug: string,
  chSlug: string,
  page: number = 1,
  take?: number,
) => {
  const socket = useSocketStore((state) => state.socket);
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: messageKeys.channelMessages(wsSlug, chSlug, page),
    queryFn: () => messageApi.getMessagesByChannel(wsSlug, chSlug, page, take),
    staleTime: 1000 * 60, // 1분
    enabled: !!(wsSlug && chSlug),
    gcTime: 5 * 60 * 1000, // 5분
    refetchOnWindowFocus: false,
    refetchOnReconnect: 'always',
    retry: (failureCount, error: any) => {
      if (error.status === 404) return false;
      return failureCount < 3;
    },
    // 백그라운드 업데이트로 UX 개선
    refetchInterval: 30000, // 30초마다 백그라운드 업데이트
    refetchIntervalInBackground: false,
  });

  useEffect(() => {
    if (!socket) return;

    const handler = (message: any) => {
      // React Query cache 업데이트
      if (chSlug && message?.channel?.slug) {
        queryClient.setQueryData(messageKeys.channelMessages(wsSlug, chSlug, page), (old: any) => {
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
  }, [socket, wsSlug, chSlug, page, queryClient]);

  return query;
};

export const useInfiniteChannelMessages = (wsSlug: string, chSlug: string) => {
  return useInfiniteQuery({
    queryKey: messageKeys.channel(wsSlug, chSlug),
    queryFn: ({ pageParam = 1 }) => messageApi.getMessagesByChannel(wsSlug, chSlug, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasMore ? allPages.length + 1 : undefined;
    },
    enabled: !!(wsSlug && chSlug),
    staleTime: 60000,
  });
};
