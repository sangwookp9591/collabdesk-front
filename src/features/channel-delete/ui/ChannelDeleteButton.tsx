'use client';

import { Modal, TrashIcon } from '@/shared/ui';
import * as styles from './channelDeleteButton.css';
import { useState } from 'react';
import { themeTokens } from '@/shared/styles';
import ChannelDeleteForm from './ChannelDeleteForm';

export function ChannelDeleteButton({ id, name }: { id: string; name: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button className={styles.deleteButton} onClick={() => setIsModalOpen(true)}>
        <TrashIcon size={20} color={themeTokens.colors.text} />
        <span>채널 삭제</span>
      </button>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ChannelDeleteForm id={id} name={name} onSuccess={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
}
