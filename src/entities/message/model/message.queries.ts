'use client';

import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { messageApi } from '../api/message.api';
import { messageKeys } from './message-keys';
import { useSocketStore } from './socket.store';
import { useEffect } from 'react';
import { MessageResponse } from '@/shared/types/message';

export const useChannelMessages = (
  wsSlug: string,
  chSlug: string,
  cursor: string,
  take?: number,
) => {
  const socket = useSocketStore((state) => state.socket);
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: messageKeys.channelMessages(wsSlug, chSlug, cursor),
    queryFn: async () =>
      await messageApi.getMessagesByChannel(wsSlug, chSlug, { cursor, take, direction: 'prev' }),
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

    const handler = (payload: any) => {
      const { message: newMessage } = payload;
      // React Query cache 업데이트
      if (chSlug && newMessage?.channel?.slug) {
        queryClient.setQueryData(
          messageKeys.channelMessages(wsSlug, chSlug, cursor),
          (old: any) => {
            console.log('old: ', old);
            // old가 배열인지 확인

            return {
              ...old,
              messages: [...old.messages, newMessage],
              total: Number(old.total) + 1,
            };
          },
        );
      }
    };

    socket.on('newMessage', handler);

    return () => {
      socket.off('newMessage', handler);
    };
  }, [socket, wsSlug, chSlug, cursor, queryClient]);

  return query;
};

type InfiniteMessageType = {
  wsSlug: string;
  chSlug: string;
  take?: number;
  direction: 'prev' | 'next';
  initData?: MessageResponse;
};

export const useInfiniteChannelMessages = ({
  wsSlug,
  chSlug,
  take = 20,
  direction,
  initData,
}: InfiniteMessageType) => {
  const socket = useSocketStore((state) => state.socket);
  const queryClient = useQueryClient();

  const query = useInfiniteQuery({
    queryKey: messageKeys.channelInfiniteMessages(wsSlug, chSlug),
    queryFn: async ({
      pageParam = { cursor: undefined, direction: 'next' as const },
    }: {
      pageParam: { cursor?: string; direction: 'prev' | 'next' };
    }) => {
      return await messageApi.getMessagesByChannel(wsSlug, chSlug, {
        cursor: pageParam.cursor,
        take,
        direction: pageParam.direction,
      });
    },
    enabled: !!(wsSlug && chSlug),
    initialPageParam: { cursor: undefined, direction: direction },
    initialData: initData
      ? {
          pages: [initData],
          pageParams: [
            {
              cursor: initData.direction === 'next' ? initData.nextCursor : initData.prevCursor,
              direction: initData.direction,
            },
          ],
        }
      : undefined,
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore && lastPage.nextCursor
        ? { cursor: lastPage.nextCursor, direction: 'next' as const }
        : undefined;
    },
    getPreviousPageParam: (firstPage) => {
      return firstPage.hasMore && firstPage.prevCursor
        ? { cursor: firstPage.prevCursor, direction: 'prev' as const }
        : undefined;
    },
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });

  useEffect(() => {
    if (!socket) return;

    const handler = (payload: any) => {
      const { message: newMessage } = payload;
      // React Query cache 업데이트
      if (chSlug && newMessage?.channel?.slug) {
        queryClient.setQueryData(
          messageKeys.channelInfiniteMessages(wsSlug, chSlug),
          (old: any) => {
            console.log('old: ', old);
            // old가 배열인지 확인

            return {
              ...old,
              messages: [...old.messages, newMessage],
              total: Number(old.total) + 1,
            };
          },
        );
      }
    };

    socket.on('newMessage', handler);

    return () => {
      socket.off('newMessage', handler);
    };
  }, [socket, wsSlug, chSlug, queryClient]);

  return query;
};

export function useSendMessage(wsSlug: string, chSlug: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      wsSlug: string;
      chSlug: string;
      content: string;
      parentId?: string;
    }) => await messageApi.createChannelMessage(data),
    onSuccess: (newMessage) => {
      console.log('newMessage : ', newMessage);
      queryClient.setQueryData(messageKeys.channelInfiniteMessages(wsSlug, chSlug), (old: any) => {
        if (!old) {
          return { messages: [newMessage], total: 1 };
        }
        return {
          ...old,
          messages: [...old.messages, newMessage],
          total: Number(old.total) + 1,
        };
      });
    },
  });
}
