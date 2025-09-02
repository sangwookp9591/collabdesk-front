'use client';

import { useSocketStore } from '@/entities/message/model/socket.store';
import { useEffect } from 'react';
import { useWorkspaceStore } from '../stores/workspace-store';
import { EVENT_KEYS } from '@/entities/message/model/socket-event-keys';
import { Channel } from '../types/channel';
import { useQueryClient } from '@tanstack/react-query';
import { CHANNEL_QUERY_KEYS } from '@/entities/channel';

export const useRealtimeSubEvents = () => {
  const queryClient = useQueryClient();
  const { socket } = useSocketStore();
  const { addChannel, currentWorkspace } = useWorkspaceStore();

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

    // ADD Event Listener
    socket.on(EVENT_KEYS.SUB_CHANNEL_CREATED, handleChannelCreatedEvent);

    return () => {
      socket.off(EVENT_KEYS.SUB_CHANNEL_CREATED);
    };
  }, [socket, queryClient, currentWorkspace, addChannel]);

  return {};
};
