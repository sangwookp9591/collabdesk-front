'use client';

import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useSocketStore } from '@/entities/message';
import { dmApi } from '../api/dm.api';
import { DM_QUERY_KEYS } from './dm-keys';
import { User } from '@/shared/types/user';
import { Message, MessageResponse } from '@/shared/types/message';

export const useDMConversations = (wsSlug: string) => {
  return useQuery({
    queryKey: DM_QUERY_KEYS.dms(wsSlug),
    queryFn: () => dmApi.getUserDmConvensions(wsSlug),
    staleTime: 1000 * 60, // 1분
    enabled: !!wsSlug,
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
};

export const useDMConversationsRecent = (wsSlug: string) => {
  return useQuery({
    queryKey: DM_QUERY_KEYS.dmsRecent(wsSlug),
    queryFn: () => dmApi.getUserDmConvensionsRecent(wsSlug),
    staleTime: 1000 * 60, // 1분
    enabled: !!wsSlug,
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
};

export const useDMConversation = (wsSlug: string, conversationId: string) => {
  return useQuery({
    queryKey: DM_QUERY_KEYS.dm(wsSlug, conversationId),
    queryFn: () => dmApi.getDmConversation(wsSlug, conversationId),
    staleTime: 1000 * 60, // 1분
    enabled: !!wsSlug,
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
};

export const useDmMessages = (
  wsSlug: string,
  conversationId: string,
  cursor: string,
  direction: 'next' | 'prev',
  take?: number,
) => {
  const socket = useSocketStore((state) => state.socket);
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: DM_QUERY_KEYS.dmMessages(wsSlug, conversationId, cursor),
    queryFn: async () =>
      await dmApi.getDmMessages(wsSlug, conversationId, {
        cursor,
        take,
        direction,
      }),
    staleTime: 1000 * 60, // 1분
    enabled: !!(wsSlug && conversationId),
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
      const { message, isNew } = payload;
      // React Query cache 업데이트
      if (conversationId && message?.dmConversationId) {
        queryClient.setQueryData(
          DM_QUERY_KEYS.dmMessages(wsSlug, message?.dmConversationId, cursor),
          (old: any) => {
            console.log('old: ', old);
            // old가 배열인지 확인

            return { ...old, messages: [...old.messages, message], total: Number(old.total) + 1 };
          },
        );
      }
    };

    socket.on('newMessage', handler);

    return () => {
      socket.off('newMessage', handler);
    };
  }, [socket, wsSlug, conversationId, cursor, queryClient]);

  return query;
};

type InfiniteMessageType = {
  wsSlug: string;
  conversationId: string;
  take?: number;
  direction: 'prev' | 'next';
  initData?: MessageResponse;
};

export const useInfiniteDMMessages = ({
  wsSlug,
  conversationId,
  take = 20,
  initData,
}: InfiniteMessageType) => {
  const socket = useSocketStore((state) => state.socket);
  const queryClient = useQueryClient();

  const query = useInfiniteQuery({
    queryKey: DM_QUERY_KEYS.dmInfiniteMessages(wsSlug, conversationId),
    queryFn: async ({ pageParam }) => {
      return await dmApi.getDmMessages(wsSlug, conversationId, {
        cursor: pageParam?.cursor,
        take,
        direction: pageParam?.direction ?? 'prev',
      });
    },
    enabled: !!(wsSlug && conversationId),
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
      const { message: newMessage, isNew } = payload;
      // React Query cache 업데이트
      if (conversationId && newMessage?.dmConversationId) {
        queryClient.setQueryData(
          DM_QUERY_KEYS.dmInfiniteMessages(wsSlug, newMessage?.dmConversationId),
          (oldData: any) => {
            if (!oldData) return oldData;

            // 이미 존재하는 메시지인지 확인
            const existsInCache = oldData.messages.some((m: Message) => m.id === newMessage.id);
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
  }, [socket, wsSlug, conversationId, queryClient]);

  return query;
};

export function useSendMessage(wsSlug: string, conversationId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      wsSlug: string;
      conversationId: string;
      content: string;
      parentId?: string;
    }) => dmApi.createDmMessage(data),
    onSuccess: (newMessage: any) => {
      queryClient.setQueryData(
        DM_QUERY_KEYS.dmInfiniteMessages(wsSlug, conversationId),
        (oldData: any) => {
          if (!oldData) return oldData;
          const existsInCache = oldData.messages.some((m: Message) => m.id === newMessage.id);
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

type Response = {
  id: string;
  otherUser: User;
  lastMessage: Message;
  updatedAt: Date;
};
// DM 대화방 생성
export const useCreateDMConversation = (wsSlug: string, onSuccess?: (result: any) => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (otherUserId: string) =>
      dmApi.setWorkspaceSlug(wsSlug).createDmConversation(otherUserId),
    onSuccess: (result: Response) => {
      console.log('쿼리 클라이언트에 새로운 DM CONVERSATION추가 : ', result);
      queryClient.setQueryData(DM_QUERY_KEYS.dms(wsSlug), (old: any) => {
        if (!old) {
          return old;
        }
        return [...old, result];
      });
      onSuccess?.(result);
    },
  });
};
