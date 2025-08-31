'use client';

import { useState } from 'react';
import { SettingsIcon } from '@/shared/ui';
import * as styles from './memberManagementButton.css';

interface MemberManagementButtonProps {
  workspaceId?: string;
}

export function MemberManagementButton({ workspaceId }: MemberManagementButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button className={styles.managementButton} onClick={() => setIsModalOpen(true)}>
        <SettingsIcon size={14} />
        <span>멤버 관리</span>
      </button>
    </>
  );
}
