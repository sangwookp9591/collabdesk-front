import React from 'react';
import { heading2 } from '../../../shared/ui/typography/typography.css';
import * as styles from './myChannels.css';
import { card } from '@/shared/ui/card/card.css';
import { ChannelCardSkeleton } from '@/entities/channel';

export default function MyChannelsSkeleton() {
  return (
    <div className={card}>
      <div className={styles.sectionHeader}>
        <h2 className={heading2}>내 채널</h2>
      </div>
      <div className={styles.channelsList}>
        <>
          {Array(3).map((_, i) => (
            <ChannelCardSkeleton key={i} />
          ))}
        </>
      </div>
    </div>
  );
}
