'use client';

import { ChannelIcon } from '@/shared/ui';
import * as styles from './channelTitle.css';
import { useWorkspaceStore } from '@/shared/stores/workspace-store';

export default function ChannelTitle() {
  const { currentChannel } = useWorkspaceStore();
  return (
    <div className={styles.titleContainer}>
      <ChannelIcon size={20} color="" />
      <span className={styles.channelName}>{currentChannel?.name || ''}</span>
    </div>
  );
}
