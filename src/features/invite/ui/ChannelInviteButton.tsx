'use client';

import { Modal, PlusIcon } from '@/shared/ui';
import * as styles from './channelInviteButton.css';
import { useState } from 'react';
import ChannelInviteForm from './ChannelInviteForm';
import { themeTokens } from '@/shared/styles';

export function InviteMemberButton({ slug }: { slug?: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button className={styles.inviteButton} onClick={() => setIsModalOpen(true)}>
        <PlusIcon size={20} color={themeTokens.colors.text} />
        <span>맴버 초대</span>
      </button>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ChannelInviteForm channelSlug={slug} onSuccess={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
}
