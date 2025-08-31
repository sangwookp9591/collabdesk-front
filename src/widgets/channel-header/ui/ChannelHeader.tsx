'use client';

import { ChannelInviteMemberButton } from '@/features/invite';
import * as styles from './channelHeader.css';
import { ChannelTitle } from '@/entities/channel';

export function ChannelHeader() {
  return (
    <div className={styles.header}>
      <ChannelTitle />
      <ChannelInviteMemberButton />
    </div>
  );
}
