'use client';

import { useWorkspaceStore } from '@/shared/stores';
import * as styles from './notification.css';
import { NotificationIcon, PositionModal } from '@/shared/ui';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import { useParams } from 'next/navigation';
import type { Notification as INotification } from '@/entities/notification';
export function Notification() {
  const params = useParams();
  const wsSlug = params?.wsSlug as string;
  const { notifications, getChannelSlug } = useWorkspaceStore();
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  console.log('notifications : ', notifications);

  return (
    <div>
      <div onClick={onOpen}>
        <NotificationIcon size={30} />
      </div>
      <PositionModal open={isOpen} onClose={onClose} hasClose={false} top="40px" right="30px">
        <div className={styles.notificationDropdown}>
          <div className={styles.header}>알림</div>
          <div className={styles.notificationList}>
            {notifications && notifications.length > 0 ? (
              notifications.map((nt: INotification, index) => (
                <div key={index}>
                  <div className={styles.line} />
                  <div className={styles.notificationItem}>
                    <Link
                      className={styles.notificationTitle}
                      href={
                        nt?.channelId
                          ? `/worksapce/${wsSlug}/channel/${getChannelSlug(nt?.channelId)}`
                          : `/worksapce/${wsSlug}/dm/${nt?.dmConversationId}`
                      }
                    >
                      {nt?.data ?? ''}
                    </Link>
                    <div className={styles.notificationMessage}>{nt?.message?.content ?? ''}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.empty}>최신 알림이 없습니다.</div>
            )}
          </div>
        </div>
      </PositionModal>
    </div>
  );
}
