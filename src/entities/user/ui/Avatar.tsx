'use client';

import Image from 'next/image';
import * as styles from './avatar.css';
import { useWorkspaceStore } from '@/shared/stores';
import { useMemo } from 'react';
import { NoNotificationIcon, SleepIcon } from '@/shared/ui';

type AvatarProps = {
  userId: string;
  profileImageUrl?: string;
  name: string;
  size: number;
  isActiveIcon?: boolean;
  borderRadius?: string;
};

export function Avatar({
  userId,
  profileImageUrl,
  name,
  size,
  isActiveIcon = true,
  borderRadius = '20px',
}: AvatarProps) {
  const userStatuses = useWorkspaceStore((state) => state.userStatuses);

  const status = useMemo(
    () => (Object.keys(userStatuses).length > 0 ? userStatuses[userId]?.status : 'OFFLINE'),
    [userStatuses, userId],
  );
  return (
    <div
      className={profileImageUrl ? styles.profileIcon : styles.userIcon}
      style={{ width: size, height: size, position: 'relative' }}
    >
      {profileImageUrl ? (
        <Image
          src={profileImageUrl}
          width={size}
          height={size}
          alt="user-profile"
          loading="lazy"
          quality={75}
          style={{ borderRadius: borderRadius }}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      ) : (
        <div className={styles.userIcon}>{name && name[0].toUpperCase()}</div>
      )}

      {/* 상태 표시 */}
      {isActiveIcon && (
        <div className={styles.status[status]}>
          {status === 'AWAY' && <SleepIcon size={10} color={'#6c757d'} />}
          {status === 'DO_NOT_DISTURB' && <NoNotificationIcon size={10} color={'#6c757d'} />}
        </div>
      )}
    </div>
  );
}
