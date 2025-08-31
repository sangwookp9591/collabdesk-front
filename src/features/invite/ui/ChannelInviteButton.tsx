'use client';

import { Modal, PlusIcon } from '@/shared/ui';
import * as styles from './channelInviteButton.css';
import { useState } from 'react';
import ChannelInviteForm from './ChannelInviteForm';

export function InviteMemberButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button className={styles.inviteButton} onClick={() => setIsModalOpen(true)}>
        <PlusIcon size={14} />
        <span>맴버 초대</span>
      </button>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ChannelInviteForm />
      </Modal>
    </>
  );
}
