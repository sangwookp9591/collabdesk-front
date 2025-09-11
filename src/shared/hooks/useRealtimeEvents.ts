'use client';

import { useSocketStore } from '@/entities/message/model/socket.store';
import { useEffect } from 'react';
import { useWorkspaceStore } from '../stores/workspace-store';
import { EVENT_KEYS } from '@/entities/message/model/socket-event-keys';
import { Channel } from '../types/channel';
import { useQueryClient } from '@tanstack/react-query';
import { CHANNEL_QUERY_KEYS } from '@/entities/channel';
import { DMConversation, DM_QUERY_KEYS } from '@/entities/dm';
import { UserStatus } from '../types/user';
import type { Notification } from '@/entities/notification';

export const useRealtimeSubEvents = () => {
  const queryClient = useQueryClient();
  const { socket } = useSocketStore();
  const {
    addChannel,
    currentWorkspace,
    deleteChannel,
    addDm,
    setUserStatuses,
    updateUserStatus,
    addNotification,
    markNotification,
    markLastMessage,
  } = useWorkspaceStore();

  useEffect(() => {
    console.log('socket realtime : ', currentWorkspace);
    if (!(socket && currentWorkspace)) return;

    const handleChannelCreatedEvent = (message: Channel) => {
      console.log('channel 체널생성 구독 수신 !!! :', message);
      queryClient.invalidateQueries({
        queryKey: [CHANNEL_QUERY_KEYS.allByWsId(currentWorkspace?.id)],
      });

      addChannel(message);
    };

    const handleChannelDeletedEvent = (message: {
      workspaceId: string;
      channelId: string;
      userId: string;
      message: string;
    }) => {
      console.log('channel 체널삭제구독 수신 !!! :', message);
      queryClient.invalidateQueries({
        queryKey: [CHANNEL_QUERY_KEYS.allByWsId(currentWorkspace?.id)],
      });

      deleteChannel(message?.channelId);
      console.log('message: ', message.message);
    };

    const handleChannelUpdateEvent = () => {};
    const handleDmRoomCreadtedEvent = (conversation: DMConversation) => {
      if (currentWorkspace?.id === conversation.workspaceId) {
        queryClient.invalidateQueries({
          queryKey: [DM_QUERY_KEYS.dms(conversation.workspace.slug)],
        });
      }
      addDm(conversation);
    };

    // ADD Event Listener
    socket.on(EVENT_KEYS.SUB_CHANNEL_CREATED, handleChannelCreatedEvent);
    socket.on(EVENT_KEYS.SUB_CHANNEL_DELETED, handleChannelDeletedEvent);
    socket.on(EVENT_KEYS.SUB_CHANNEL_UPDATED, handleChannelUpdateEvent);
    socket.on(EVENT_KEYS.SUB_DM_ROOM_CREATED, handleDmRoomCreadtedEvent);

    return () => {
      socket.off(EVENT_KEYS.SUB_CHANNEL_CREATED);
      socket.off(EVENT_KEYS.SUB_CHANNEL_DELETED);
      socket.off(EVENT_KEYS.SUB_CHANNEL_UPDATED);
      socket.off(EVENT_KEYS.SUB_DM_ROOM_CREATED);
    };
  }, [socket, queryClient, currentWorkspace, addChannel, deleteChannel, addDm]);

  useEffect(() => {
    if (!(socket && currentWorkspace)) return;
    const handleJoinedWorkspace = (message: { workspaceId: string; userStatuses: any }) => {
      console.log('handleJoinedWorkspace message : ', message);
      setUserStatuses(message.userStatuses);
    };

    const handleUpdateMemberStatus = (message: {
      userId: string;
      status: UserStatus;
      lastActiveAt: Date;
    }) => {
      console.log('handleUpdateMemberStatus ', message);
      if (message?.userId) {
        updateUserStatus(message);
      }
    };

    socket.on(EVENT_KEYS.SUB_JOIN_WORKSPACE, handleJoinedWorkspace);
    socket.on(EVENT_KEYS.SUB_UPDATE_STATUS, handleUpdateMemberStatus);

    return () => {
      socket.off(EVENT_KEYS.SUB_JOIN_WORKSPACE);
      socket.off(EVENT_KEYS.SUB_UPDATE_STATUS);
    };
  }, [socket, currentWorkspace, setUserStatuses, updateUserStatus]);

  useEffect(() => {
    if (!(socket && currentWorkspace)) return;

    const handleNoticeWorkspace = (message: { workspaceId: string; data: any }) => {
      if (currentWorkspace?.id === message.workspaceId) {
        const data: Notification = {
          id: '',
          userId: '',
          type: message.data.type,
          channelId: message.data?.roomId,
          dmConversationId: message.data?.roomId,
          messageId: message.data?.messageId,
          workspaceId: message.workspaceId,
          message: message?.data?.message,
          data: message?.data?.data,
          createdAt: message?.data?.message?.createdAt,
          user: undefined,
          workspace: undefined,
          channel: undefined,
          dmConversation: undefined,
          isRead: false,
        };
        addNotification(data);
      }
    };

    const handleMarkAsReadNotification = (message: {
      id: string | undefined;
      messageId: string;
      readAt?: Date;
    }) => {
      markNotification(message);
    };

    const handleMarkAsMessage = (message: {
      userId: string;
      roomId: string;
      roomType: 'channel' | 'dm';
      lastReadMessageId: string;
      readAt: Date;
    }) => {
      markLastMessage(message);
    };

    socket.on(EVENT_KEYS.SUB_NOTICE_WORKSPACE, handleNoticeWorkspace);
    socket.on(EVENT_KEYS.SUB_MARK_AS_READ_NOTIFICATION, handleMarkAsReadNotification);
    socket.on(EVENT_KEYS.SUB_MARK_AS_READ_MESSAGE, handleMarkAsMessage);
    return () => {
      socket.off(EVENT_KEYS.SUB_NOTICE_WORKSPACE);
      socket.off(EVENT_KEYS.SUB_MARK_AS_READ_NOTIFICATION);
      socket.off(EVENT_KEYS.SUB_MARK_AS_READ_MESSAGE);
    };
  }, [socket, currentWorkspace, addNotification, markNotification, markLastMessage]);

  return {};
};
