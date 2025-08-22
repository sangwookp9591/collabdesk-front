'use client';

import { InfoCard } from '@/entities/workspace';
import { WorkspaceCard } from '@/entities/workspace/model/type';
import * as styles from './workspace-join-card.css';
import { useRouter } from 'next/navigation';

export function WorkspaceJoinCard({ workspace }: { workspace: WorkspaceCard }) {
  const router = useRouter();

  const joinWorkspace = () => {
    // 내 워크스페이스에 추가 후 , 최근 워크스페이스 아이디 저장

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
