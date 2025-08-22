import { Avatar } from '@/entities/workspace';
import * as styles from './info-card.css';
import Image from 'next/image';
import { WorkspaceCard } from '../model/type';
import { clsx } from 'clsx';

type InfoCardProps = {
  workspace: WorkspaceCard;
  onClick?: (id: string) => void;
  className?: string;
};

export function InfoCard({ workspace, onClick, className }: InfoCardProps) {
  return (
    <div
      className={clsx(styles.workspaceContainer, className)}
      onClick={onClick ? () => onClick(workspace?.id) : () => {}}
    >
      <Avatar url={workspace?.image} name={workspace?.name} size={50} />
      <div className={styles.workspaceInfo}>
        <div className={styles.workspaceName}>{workspace?.name}</div>
        <div className={styles.workspaceMemberCount}>
          <Image src={'/images/members-2.svg'} width={20} height={20} alt="" />
          {workspace?.memberCount}
        </div>
      </div>
    </div>
  );
}
