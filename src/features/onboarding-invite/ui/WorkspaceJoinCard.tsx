'use client';

import { InfoCard } from '@/entities/workspace';
import * as styles from './workspace-join-card.css';
import { useRouter } from 'next/navigation';
import { Workspace } from '@/shared/types/workspace';
import { apiFetch } from '@/shared/api';
import { useSession } from 'next-auth/react';

export function WorkspaceJoinCard({ workspace, code }: { workspace: Workspace; code: string }) {
  const { data: session } = useSession();
  const router = useRouter();

  const joinWorkspace = async () => {
    // 내 워크스페이스에 추가 후 , 최근 워크스페이스 아이디 저장

    const res = await apiFetch(`/workspace/join`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ code }),
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
    });

    if (!res?.ok) {
      return;
    }
    router.replace(`/workspace/${workspace.id}`);
  };
  return (
    <div className={styles.boxStyle}>
      <div className={styles.workspaceStyle}>
        <InfoCard workspace={workspace} />
      </div>
      <div className={styles.buttonStyle} onClick={joinWorkspace}>
        합류하기
      </div>
    </div>
  );
}
