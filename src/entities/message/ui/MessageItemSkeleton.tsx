'use client';

import * as styles from './message-item.css';
import { Skeleton } from 'sw-skeleton';

export function MessageItemSkeleton() {
  return (
    <div className={styles.messageItem}>
      <div style={{ display: 'flex', gap: '10px' }}>
        <Skeleton width={52} height={48} borderRadius={'18px'} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Skeleton width={60} height={24} borderRadius={'5px'} />
            <Skeleton width={40} height={18} borderRadius={'5px'} />
          </div>
          <Skeleton width={300} height={22} borderRadius={'5px'} />
        </div>
      </div>
    </div>
  );
}
