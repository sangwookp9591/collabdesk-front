'use client';

import { useWorkspaceStore } from '@/shared/stores';
import * as styles from './notification.css';
import { NotificationIcon, PositionModal } from '@/shared/ui';
import Link from 'next/link';
import { useCallback, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import type { Notification as INotification } from '@/entities/notification';
import { useSocketStore } from '@/entities/message';

export function Notification() {
  const params = useParams();
  const wsSlug = params?.wsSlug as string;
  const { notifications, getChannelSlug, isNewNoti, setIsNewNoti } = useWorkspaceStore();
  const { markAsReadNotification } = useSocketStore();
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = useCallback(() => {
    setIsOpen(true);
    setIsNewNoti(false);
  }, []);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleClick = useCallback(
    ({ messageId }: { messageId?: string }) => {
      console.log('markAsReadNotification : ', messageId);
      markAsReadNotification({ messageId });
    },
    [markAsReadNotification],
  );

  console.log('notifications : ', notifications);
  return (
    <div>
      <div
        onClick={onOpen}
        style={{
          position: 'relative',
        }}
      >
        <div>
          <NotificationIcon size={30} />
          {isNewNoti && <div className={styles.newNoti} />}
        </div>
      </div>
      <PositionModal open={isOpen} onClose={onClose} hasClose={false} top="40px" right="30px">
        <div className={styles.notificationDropdown}>
          <div className={styles.header}>알림</div>
          <div className={styles.notificationList}>
            {notifications && notifications.length > 0 ? (
              notifications.map((nt: INotification, index) => (
                <div key={index}>
                  <div className={styles.line} />
                  <div className={styles.notificationItem[nt.isRead ? 'read' : 'unread']}>
                    <Link
                      className={styles.notificationTitle}
                      href={
                        nt?.channelId
                          ? `/workspace/${wsSlug}/channel/${getChannelSlug(
                              nt?.channelId,
                            )}?messageId=${nt?.messageId}`
                          : `/workspace/${wsSlug}/dm/${nt?.dmConversationId}?messageId=${nt?.messageId}`
                      }
                      onClick={() =>
                        handleClick({
                          messageId: nt?.messageId,
                        })
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
