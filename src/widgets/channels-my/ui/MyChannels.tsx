import React from 'react';
import Link from 'next/link';
import { heading2 } from '../../../shared/ui/typography/typography.css';
import * as styles from './myChannels.css';
import { card } from '@/shared/ui/card/card.css';
import { ChannelWithMemberCount } from '@/shared/types/channel';
import { ChannelCard } from '@/entities/channel';
import { customButton } from '@/shared/ui/button.css';

interface MyChannelsProps {
  channels: ChannelWithMemberCount[];
  workspaceSlug: string;
  isLoading?: boolean;
}

export default function MyChannels({
  channels,
  workspaceSlug,
  isLoading = false,
}: MyChannelsProps) {
  if (isLoading) {
    return (
      <div className={card}>
        <div className={styles.sectionHeader}>
          <h2 className={heading2}>내 채널</h2>
        </div>
        <div className={styles.loadingState}>로딩 중...</div>
      </div>
    );
  }

  return (
    <div className={card}>
      <div className={styles.sectionHeader}>
        <h2 className={heading2}>내 채널</h2>
        <Link href={`/workspace/${workspaceSlug}/channels`} className={customButton.ghost}>
          모든 채널 보기
        </Link>
      </div>
      <div className={styles.channelsList}>
        {channels.length > 0 ? (
          channels
            .slice(0, 5)
            .map((channel) => (
              <ChannelCard key={channel.id} channel={channel} workspaceSlug={workspaceSlug} />
            ))
        ) : (
          <div className={styles.emptyState}>
            <p>아직 참여한 채널이 없습니다.</p>
            <Link href={`/workspace/${workspaceSlug}/channels`} className={customButton.primary}>
              채널 둘러보기
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
