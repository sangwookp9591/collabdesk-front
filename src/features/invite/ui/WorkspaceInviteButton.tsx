'use client';

import { Modal, PlusIcon } from '@/shared/ui';
import * as styles from './workspaceInviteButton.css';
import { useState } from 'react';
import WorkspaceInviteForm from './WorkspaceInvite';

interface InviteMemberButtonProps {
  workspaceId?: string;
  onSuccess?: () => void;
}

export function InviteMemberButton({ workspaceId, onSuccess }: InviteMemberButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button className={styles.inviteButton} onClick={() => setIsModalOpen(true)}>
        <PlusIcon size={14} />
        <span>새 멤버 초대</span>
      </button>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <WorkspaceInviteForm workspaceId={workspaceId} />
      </Modal>
    </>
  );
}
