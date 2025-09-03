import React from 'react';
import Link from 'next/link';
import * as styles from './channelCard.css';
import { ChannelWithMemberCount } from '@/shared/types/channel';
import { typographyStyle } from '@/shared/ui';

interface ChannelCardProps {
  channel: ChannelWithMemberCount;
  workspaceSlug: string;
}

export const ChannelCard: React.FC<ChannelCardProps> = ({ channel, workspaceSlug }) => {
  return (
    <Link
      href={`/workspace/${workspaceSlug}/channel/${channel.slug}`}
      className={styles.channelCard}
    >
      <div className={styles.channelHeader}>
        <div className={styles.channelName}>
          <span>{channel.isPublic ? '#' : '🔒'}</span>
          <span>{channel.name}</span>
          {channel.isDefault && <span className={styles.channelBadge}>기본</span>}
        </div>
        <span className={styles.memberCount}>{channel?.memberCount || 0}명</span>
      </div>
      {channel.description && <p className={typographyStyle.body2}>{channel.description}</p>}
    </Link>
  );
};
