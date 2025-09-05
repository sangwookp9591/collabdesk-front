'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useSocketStore } from '@/entities/message';
import { dmApi } from '../api/dm.api';
import { DM_QUERY_KEYS } from './dm-keys';

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
  page: number = 1,
  take?: number,
) => {
  const socket = useSocketStore((state) => state.socket);
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: DM_QUERY_KEYS.dmMessages(wsSlug, conversationId, page),
    queryFn: () => dmApi.getDmMessages(wsSlug, conversationId, page, take),
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

    const handler = (message: any) => {
      // React Query cache 업데이트
      if (conversationId && message?.channel?.slug) {
        queryClient.setQueryData(
          DM_QUERY_KEYS.dmMessages(wsSlug, conversationId, page),
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
  }, [socket, wsSlug, conversationId, page, queryClient]);

  return query;
};

export function useSendMessage(
  wsSlug: string,
  conversationId: string,
  page: number = 1,
  take?: number,
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      wsSlug: string;
      conversationId: string;
      content: string;
      parentId?: string;
    }) => dmApi.createDmMessage(data),
    onSuccess: (newMessage) => {
      queryClient.setQueryData(
        DM_QUERY_KEYS.dmMessages(wsSlug, conversationId, page),
        (old: any) => {
          if (!old) {
            return { messages: [newMessage], total: 1 };
          }
          return {
            ...old,
            messages: [...old.messages, newMessage],
            total: Number(old.total) + 1,
          };
        },
      );
    },
  });
}

// DM 대화방 생성
export const useCreateDMConversation = (wsSlug: string, onSuccess?: (result: any) => void) => {
  return useMutation({
    mutationFn: (otherUserId: string) =>
      dmApi.setWorkspaceSlug(wsSlug).createDmConversation(otherUserId),
    onSuccess: (result) => onSuccess?.(result),
  });
};
