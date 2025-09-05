'use client';

import { useWorkspaceStore } from '@/shared/stores/workspace-store';
import { useParams } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { useSocketStore } from '../../entities/message/model/socket.store';

export default function DmInitializer({ children }: { children: ReactNode }) {
  const params = useParams();
  const dmId = params?.dmId as string;

  const { dms, currentDm, setCurrentChannel, setCurrentDm } = useWorkspaceStore();
  const { joinRoom } = useSocketStore();
  const targetDms = dms.find((c) => c.id === dmId);

  useEffect(() => {
    if (targetDms && (!currentDm || currentDm.id !== targetDms.id)) {
      console.log('DM 초기화:', targetDms?.id);
      setCurrentDm(targetDms);
      setCurrentChannel(null);
      // socket 룸 참여
      joinRoom(targetDms.id, 'dm');
    }
  }, [dms, currentDm, setCurrentChannel, setCurrentDm, targetDms, joinRoom]);
  return <>{children}</>;
}
