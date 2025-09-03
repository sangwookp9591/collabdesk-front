import React from 'react';
import Link from 'next/link';
import { heading1, body1 } from '../../../shared/ui/typography/typography.css';
import * as styles from './workspaceWelcome.css';
import { Workspace, WorkspaceMember } from '@/shared/types/workspace';
import { customButton } from '@/shared/ui/button.css';

interface WorkspaceWelcomeProps {
  workspace: Workspace;
  user: WorkspaceMember;
}

export const WorkspaceWelcome: React.FC<WorkspaceWelcomeProps> = ({ workspace, user }) => {
  return (
    <div className={styles.welcomeSection}>
      <h1 className={`${heading1} ${styles.workspaceName}`}>
        {workspace.name}에 오신 것을 환영합니다
      </h1>
      {workspace.description && (
        <p className={`${body1} ${styles.workspaceDescription}`}>{workspace.description}</p>
      )}
      <div className={styles.actionButtons}>
        {(user?.role === 'OWNER' || user?.role === 'ADMIN') && (
          <Link href={`/workspace/${workspace.slug}/settings`} className={customButton.secondary}>
            워크스페이스 설정
          </Link>
        )}
        <Link href={`/workspace/${workspace.slug}/members`} className={customButton.ghost}>
          멤버 보기
        </Link>
      </div>
    </div>
  );
};
