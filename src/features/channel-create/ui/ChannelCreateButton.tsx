'use client';

import { useState } from 'react';
import * as styles from './channelCreateButton.css';
import { Modal, PlusIcon } from '@/shared/ui';
import ChannelCreateForm from './ChannelCreateForm';

export function ChannelCreateButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div className={styles.createButton} onClick={() => setIsModalOpen(true)}>
        <div className={styles.plusBox}>
          <PlusIcon size={15} />
        </div>
        채널 추가
      </div>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ChannelCreateForm onSuccess={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
}
