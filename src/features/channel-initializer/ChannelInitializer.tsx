'use client';

import { useSocketStore } from '@/entities/message';
import { useWorkspaceStore } from '@/shared/stores/workspace-store';
import { useParams } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

export default function ChannelInitializer({ children }: { children: ReactNode }) {
  const params = useParams();
  const chSlug = params?.chSlug as string;

  const { channels, currentChannel, setCurrentChannel, setCurrentDm } = useWorkspaceStore();
  const { joinRoom } = useSocketStore();
  const targetChannel = channels.find((c) => c.slug === chSlug);

  useEffect(() => {
    if (targetChannel && (!currentChannel || currentChannel.id !== targetChannel.id)) {
      console.log('채널 초기화:', targetChannel.name);
      setCurrentChannel(targetChannel);
      setCurrentDm(null);
      // 채널 소켓 연결
      joinRoom(targetChannel.id, 'channel');
    }
  }, [targetChannel, currentChannel, setCurrentChannel, setCurrentDm, joinRoom]);
  return <>{children}</>;
}
