'use client';

import { ChannelInviteMemberButton } from '@/features/invite';
import * as styles from './channelHeader.css';
import { ChannelTitle } from '@/entities/channel';
import { ChannelDeleteButton } from '@/features/channel-delete';
import { useWorkspaceStore } from '@/shared/stores';

export function ChannelHeader() {
  const { currentChannel } = useWorkspaceStore();
  return (
    <div className={styles.header}>
      <ChannelTitle />
      <div className={styles.buttonArea}>
        <ChannelInviteMemberButton />
        <ChannelDeleteButton slug={currentChannel?.slug || ''} name={currentChannel?.name || ''} />
      </div>
    </div>
  );
}
