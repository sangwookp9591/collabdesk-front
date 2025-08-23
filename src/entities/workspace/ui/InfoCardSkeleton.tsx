import * as styles from './info-card.css';
import { Skeleton } from 'sw-skeleton';

export function InfoCardSkeleton() {
  return (
    <div className={styles.skeletonContainer}>
      <Skeleton width={50} height={50} style={{ borderRadius: '5px' }}></Skeleton>
      <div className={styles.workspaceInfo}>
        <div className={styles.workspaceName}>
          <Skeleton width={100} height={20} style={{ borderRadius: '5px' }}></Skeleton>
        </div>
        <div className={styles.workspaceMemberCount}>
          <Skeleton width={40} height={20} style={{ borderRadius: '5px' }}></Skeleton>
        </div>
      </div>
    </div>
  );
}
