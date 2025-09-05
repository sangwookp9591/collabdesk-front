'use client';

import * as styles from './dm-section.css';
import { useParams, useRouter } from 'next/navigation';
import { ArrowBottomIcon, ArrowRightIcon, MessageIcon, PlusIcon } from '@/shared/ui';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useDMConversations } from '@/entities/dm/model/dm.queries';
import { useState } from 'react';
import { StartDMModal } from '@/features/dm-start';

interface DMUser {
  id: string;
  name: string;
  email: string;
  profileImageUrl?: string;
  status: 'ONLINE' | 'AWAY' | 'OFFLINE' | 'DO_NOT_DISTURB';
}

interface DMConversation {
  id: string;
  workspace: {
    id: string;
    name: string;
    slug: string;
  };
  otherUser: DMUser;
  lastMessage?: {
    content: string;
    createdAt: string;
    user: { name: string };
  };
  unreadCount: number;
  updatedAt: string;
}

interface DMSectionProps {
  isOpen: boolean;
  onToggle: () => void;
  onStartDM?: (userId: string) => void;
}

export function DMSection({ isOpen, onToggle, onStartDM }: DMSectionProps) {
  const params = useParams();
  const router = useRouter();
  const wsSlug = params.wsSlug as string;
  const currentDMId = params.dmId as string;
  const [showStartDMModal, setShowStartDMModal] = useState(false);
  const { data: dmConversations = [], isLoading } = useDMConversations(wsSlug);
  const totalUnreadCount = 0;

  const handleDMClick = (conversationId: string) => {
    router.push(`/workspace/${wsSlug}/dm/${conversationId}`);
  };

  const handleAddDM = () => {
    setShowStartDMModal(true);
  };

  const getStatusStyle = (status: DMUser['status']) => {
    switch (status) {
      case 'ONLINE':
        return styles.statusOnline;
      case 'AWAY':
        return styles.statusAway;
      default:
        return styles.statusOffline;
    }
  };

  const formatLastMessageTime = (timestamp: string) => {
    return formatDistanceToNow(new Date(timestamp), {
      addSuffix: true,
      locale: ko,
    });
  };

  return (
    <div className={styles.dmSectionContainer}>
      <div className={styles.dmSectionHeader} onClick={onToggle}>
        <div className={styles.dmSectionTitle}>
          {isOpen ? <ArrowBottomIcon size={16} /> : <ArrowRightIcon size={16} />}
          <span>다이렉트 메시지</span>
          {totalUnreadCount > 0 && (
            <span className={styles.dmCounter}>
              {totalUnreadCount > 99 ? '99+' : totalUnreadCount}
            </span>
          )}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleAddDM();
          }}
          className={styles.addDMButton}
          title="새 메시지 시작"
        >
          <PlusIcon size={16} />
        </button>
      </div>

      {isOpen && (
        <div className={styles.dmListContainer}>
          {isLoading ? (
            <div style={{ padding: '16px', textAlign: 'center', fontSize: '12px' }}>로딩 중...</div>
          ) : dmConversations.length === 0 ? (
            <div className={styles.emptyState}>
              <MessageIcon size={24} color="red" />
              <div>아직 DM 대화가 없습니다</div>
              <div style={{ marginTop: '4px', fontSize: '11px' }}>
                팀원을 클릭하여 대화를 시작해보세요
              </div>
            </div>
          ) : (
            dmConversations.map((dm: any) => (
              <div
                key={dm.id}
                className={`${styles.dmItem} ${currentDMId === dm.id ? styles.dmItemActive : ''} ${
                  5 > 0 ? styles.dmItemUnread : ''
                }`}
                onClick={() => handleDMClick(dm.id)}
              >
                <div className={styles.userAvatar}>
                  <img
                    src={dm.otherUser.profileImageUrl || '/default-avatar.png'}
                    alt={dm.otherUser.name}
                    style={{ width: '100%', height: '100%', borderRadius: '4px' }}
                  />
                  <div
                    className={`${styles.statusIndicator} ${getStatusStyle(dm.otherUser.status)}`}
                  />
                </div>

                <div className={styles.dmUserInfo}>
                  <div className={styles.dmUserName}>
                    <span>{dm.otherUser.name}</span>
                    {dm.unreadCount > 0 && (
                      <span className={styles.dmUnreadBadge}>
                        {dm.unreadCount > 99 ? '99+' : dm.unreadCount}
                      </span>
                    )}
                  </div>

                  {dm.lastMessage && (
                    <div className={styles.dmLastMessage}>
                      {dm.lastMessage.user.name}: {dm.lastMessage.content}
                    </div>
                  )}
                </div>

                {dm.lastMessage && (
                  <div className={styles.dmTimestamp}>{formatLastMessageTime(dm.updatedAt)}</div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      <StartDMModal isOpen={showStartDMModal} onClose={() => setShowStartDMModal(false)} />
    </div>
  );
}
