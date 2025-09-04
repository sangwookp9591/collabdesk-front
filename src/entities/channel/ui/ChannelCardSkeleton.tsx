'use client';

import React from 'react';
import * as styles from './channelCard.css';
import { Skeleton } from 'sw-skeleton';

export const ChannelCardSkeleton = () => {
  return (
    <div className={styles.channelCard}>
      <div className={styles.channelHeader}>
        <div className={styles.channelName}>
          <div>
            <Skeleton width={11} height={20} />
            <Skeleton width={60} height={20} />
            <Skeleton width={20} height={20} />
          </div>
        </div>
        <Skeleton width={11} height={20} />
      </div>
      <Skeleton width={200} height={20} />
    </div>
  );
};
