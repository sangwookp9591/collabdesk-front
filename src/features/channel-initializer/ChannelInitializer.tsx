'use client';

import { useWorkspaceStore } from '@/shared/stores/workspace-store';
import { useParams } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

export default function ChannelInitializer({ children }: { children: ReactNode }) {
  const params = useParams();
  const chSlug = params?.chSlug as string;
  const wsSlug = params?.wsSlug as string;

  const { currentWorkspace, channels, currentChannel, setCurrentChannel } = useWorkspaceStore();
  const targetChannel = channels.find((c) => c.slug === chSlug);

  useEffect(() => {
    if (targetChannel && (!currentChannel || currentChannel.id !== targetChannel.id)) {
      console.log('채널 초기화:', targetChannel.name);
      setCurrentChannel(targetChannel);
      // joinChannel(targetChannel.id);

      if (currentWorkspace) {
        //   updateLastActive(currentWorkspace.id, targetChannel.id);
      }
    }
  }, [targetChannel, currentChannel, currentWorkspace]);
  return <>{children}</>;
}
