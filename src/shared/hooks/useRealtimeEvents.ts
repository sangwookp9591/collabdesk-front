'use client';

import { useSocketStore } from '@/entities/message/model/socket.store';
import { useEffect } from 'react';
import { useWorkspaceStore } from '../stores/workspace-store';
import { EVENT_KEYS } from '@/entities/message/model/socket-event-keys';
import { Channel } from '../types/channel';
import { useQueryClient } from '@tanstack/react-query';
import { CHANNEL_QUERY_KEYS } from '@/entities/channel';
import { DMConversation, DM_QUERY_KEYS } from '@/entities/dm';

export const useRealtimeSubEvents = () => {
  const queryClient = useQueryClient();
  const { socket } = useSocketStore();
  const { addChannel, currentWorkspace, deleteChannel, addDm } = useWorkspaceStore();

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

  return {};
};
