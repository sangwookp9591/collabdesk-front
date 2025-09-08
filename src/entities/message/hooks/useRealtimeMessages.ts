import { Message } from '@/shared/types/message';
import { useQueryClient } from '@tanstack/react-query';

export const useRealtimeMessages = () => {
  const queryClient = useQueryClient();

  const addNewMessage = (key: any, message: Message) => {
    queryClient.setQueryData(key, (oldData: any) => {
      if (!oldData) return oldData;

      // 이미 존재하는 메시지인지 확인
      const existsInCache = oldData.messages.some((m: Message) => m.id === message.id);
      if (existsInCache) return oldData;

      return {
        ...oldData,
        messages: [...oldData.messages, message],
        pages: oldData.pages.map((page: any, index: number) => {
          // 마지막 페이지에 새 메시지 추가
          if (index === oldData.pages.length - 1) {
            return {
              ...page,
              messages: [...page.messages, message],
              totalCount: page.totalCount + 1,
            };
          }
          return {
            ...page,
            totalCount: page.totalCount + 1,
          };
        }),
      };
    });
  };

  const updateMessage = (key: any, updatedMessage: Message) => {
    queryClient.setQueryData(key, (oldData: any) => {
      if (!oldData) return oldData;

      return {
        ...oldData,
        messages: oldData.messages.map((message: Message) =>
          message.id === updatedMessage.id ? updatedMessage : message,
        ),
        pages: oldData.pages.map((page: any) => ({
          ...page,
          messages: page.messages.map((message: Message) =>
            message.id === updatedMessage.id ? updatedMessage : message,
          ),
        })),
      };
    });
  };

  const deleteMessage = (key: any, messageId: string) => {
    queryClient.setQueryData(key, (oldData: any) => {
      if (!oldData) return oldData;

      return {
        ...oldData,
        messages: oldData.messages.filter((message: Message) => message.id !== messageId),
        totalCount: Math.max(0, oldData.totalCount - 1),
        pages: oldData.pages.map((page: any) => ({
          ...page,
          messages: page.messages.filter((message: Message) => message.id !== messageId),
          totalCount: Math.max(0, page.totalCount - 1),
        })),
      };
    });
  };

  return {
    addNewMessage,
    updateMessage,
    deleteMessage,
  };
};
