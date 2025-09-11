'use client';

import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { messageApi } from '../api/message.api';
import { messageKeys } from './message-keys';
import { useSocketStore } from './socket.store';
import { useEffect } from 'react';
import { Message, MessageResponse } from '@/shared/types/message';
import { MentionedUserId } from '@/entities/metion';

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
  take = 10,
  initData,
}: InfiniteMessageType) => {
  const socket = useSocketStore((state) => state.socket);

  const queryClient = useQueryClient();

  const query = useInfiniteQuery({
    queryKey: messageKeys.channelInfiniteMessages(wsSlug, chSlug),
    queryFn: async ({ pageParam }) => {
      return await messageApi.getMessagesByChannel(wsSlug, chSlug, {
        cursor: pageParam?.cursor,
        take,
        direction: pageParam?.direction ?? 'prev',
      });
    },
    enabled: !!(wsSlug && chSlug),
    initialPageParam: null,
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
      return lastPage.hasNext && lastPage.nextCursor
        ? { cursor: lastPage.nextCursor, direction: 'next' as const }
        : undefined;
    },
    getPreviousPageParam: (firstPage) => {
      return firstPage.hasPrev && firstPage.prevCursor
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
          (oldData: any) => {
            if (!oldData) return oldData;

            // 이미 존재하는 메시지인지 확인
            const existsInCache = oldData.pages
              .flatMap((data: any) => data.messages)
              .some((m: Message) => m.id === newMessage.id);
            if (existsInCache) return oldData;
            const newPageData = oldData.pages.map((page: any, index: number) => {
              // 마지막 페이지에 새 메시지 추가
              if (index === oldData.pages.length - 1) {
                return {
                  ...page,
                  messages: [...page.messages, newMessage],
                  total: page.total + 1,
                  hasNext: true,
                  nextCursor: newMessage.id,
                };
              }
              return {
                ...page,
              };
            });

            return {
              ...oldData,
              pages: newPageData,
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
      mentions?: MentionedUserId[];
      parentId?: string;
    }) => await messageApi.createChannelMessage(data),
    onSuccess: (newMessage) => {
      console.log('newMessage : ', newMessage);
      queryClient.setQueryData(
        messageKeys.channelInfiniteMessages(wsSlug, chSlug),
        (oldData: any) => {
          if (!oldData) return oldData;
          const existsInCache = oldData.pages
            .flatMap((data: any) => data.messages)
            .some((m: Message) => m.id === newMessage.id);
          if (existsInCache) return oldData;
          const newPageData = oldData.pages.map((page: any, index: number) => {
            // 마지막 페이지에 새 메시지 추가
            if (index === oldData.pages.length - 1) {
              return {
                ...page,
                messages: [...page.messages, newMessage],
                total: page.total + 1,
              };
            }
            return {
              ...page,
            };
          });

          console.log('newPageData : ', newPageData);
          return {
            ...oldData,
            pages: newPageData,
          };
        },
      );
    },
  });
}

export const useMessageNavigation = () => {
  const queryClient = useQueryClient();

  // 특정 메시지로 점프
  const jumpToMessage = useMutation({
    mutationFn: async ({
      wsSlug,
      chSlug,
      messageId,
      take = 20,
    }: {
      wsSlug: string;
      chSlug: string;
      messageId: string;
      take?: number;
    }) => {
      return await messageApi.getMessagesAround(wsSlug, chSlug, messageId, { take });
    },
    onSuccess: (data, variables) => {
      // 기존 무한 쿼리 캐시를 업데이트
      queryClient.setQueryData(
        messageKeys.channelInfiniteMessages(variables.wsSlug, variables.chSlug),
        (oldData: any) => {
          // 새로운 페이지로 교체 (메시지 중심으로)
          return {
            pages: [
              {
                messages: data.messages,
                total: data.messages.length,
                hasMore: data.hasPrev || data.hasNext,
                prevCursor: data.prevCursor,
                nextCursor: data.nextCursor,
                direction: 'around' as const,
                targetMessageId: variables.messageId,
              },
            ],
            pageParams: [
              {
                cursor: variables.messageId,
                direction: 'around' as const,
              },
            ],
          };
        },
      );
    },
  });

  return { jumpToMessage };
};
