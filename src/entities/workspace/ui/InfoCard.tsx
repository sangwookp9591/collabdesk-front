'use client';

import { Avatar } from '@/entities/workspace';
import * as styles from './info-card.css';
import Image from 'next/image';
import { clsx } from 'clsx';
import { Workspace } from '@/shared/types/workspace';

type InfoCardProps = {
  workspace: Workspace;
  onClick?: (workspace: Workspace, slug: string) => void;
  className?: string;
};

export function InfoCard({ workspace, onClick, className }: InfoCardProps) {
  return (
    <div
      className={clsx(styles.workspaceContainer, className)}
      onClick={onClick ? () => onClick(workspace, workspace?.slug) : () => {}}
    >
      <Avatar url={workspace?.imageUrl} name={workspace?.name} size={48} />
      <div className={styles.workspaceInfo}>
        <div className={styles.workspaceName}>{workspace?.name}</div>
        <div className={styles.workspaceMemberCount}>
          <Image src={'/images/members-2.svg'} width={20} height={20} alt="" />
          {workspace?.members?.length}
        </div>
      </div>
    </div>
  );
}
