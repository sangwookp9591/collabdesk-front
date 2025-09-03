'use client';

import { InfoCard } from '@/entities/workspace';
import * as styles from './workspace-join-card.css';
import { useRouter } from 'next/navigation';
import { Workspace } from '@/shared/types/workspace';
import { useWorkspaceInviteJoin } from '@/entities/invite';

export function WorkspaceJoinCard({ workspace, code }: { workspace: Workspace; code: string }) {
  const router = useRouter();

  const { mutate: joinWorkspace, isPending } = useWorkspaceInviteJoin({ code }, () =>
    router.replace(`/workspace/${workspace.slug}`),
  );
  return (
    <div className={styles.boxStyle}>
      <div className={styles.workspaceStyle}>
        <InfoCard workspace={workspace} />
      </div>
      <button className={styles.buttonStyle} onClick={() => joinWorkspace()} disabled={isPending}>
        합류하기
      </button>
    </div>
  );
}
