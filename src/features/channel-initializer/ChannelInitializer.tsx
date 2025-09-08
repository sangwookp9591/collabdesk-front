'use client';

import { queries } from '@/entities/channel';
import { useSocketStore } from '@/entities/message';
import { useWorkspaceStore } from '@/shared/stores/workspace-store';
import { useParams } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { useMentionStore } from '../mention-user';

export default function ChannelInitializer({ children }: { children: ReactNode }) {
  const params = useParams();
  const wsSlug = params?.wsSlug as string;
  const chSlug = params?.chSlug as string;

  const { channels, currentChannel, setCurrentChannel, setCurrentDm } = useWorkspaceStore();
  const { data: members, isLoading: isMemberLoading } = queries.useMembersBySlug(wsSlug, chSlug);
  const { joinRoom } = useSocketStore();
  const { setMembers } = useMentionStore();
  const targetChannel = channels.find((c) => c.slug === chSlug);

  useEffect(() => {
    if (targetChannel && (!currentChannel || currentChannel.id !== targetChannel.id)) {
      console.log('채널 초기화:', targetChannel.name);
      setCurrentChannel(targetChannel);
      setCurrentDm(null);
      // 채널 소켓 연결
      joinRoom(targetChannel.id, 'channel');
    }

    if (!isMemberLoading) {
      console.log('setMembers!!! ', members);
      const users = members?.map((member) => ({
        id: member.user?.id,
        name: member.user?.name || '',
        email: member.user?.email,
        profileImageUrl: member.user?.profileImageUrl,
      }));
      setMembers(users ?? []);
    }
  }, [
    targetChannel,
    currentChannel,
    setCurrentChannel,
    setCurrentDm,
    joinRoom,
    members,
    isMemberLoading,
    setMembers,
  ]);
  return <>{children}</>;
}
