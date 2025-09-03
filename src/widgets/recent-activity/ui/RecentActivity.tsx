import React from 'react';
import Link from 'next/link';
import * as styles from './recentActivity.css';
import { typographyStyle } from '@/shared/ui';
import { Message } from '@/shared/types/message';
import { card } from '@/shared/ui/card/card.css';
import { MessagePreview } from '@/entities/message';
import { customButton } from '@/shared/ui/button.css';

interface RecentActivityProps {
  messages: Message[];
  workspaceSlug: string;
  isLoading?: boolean;
}

export default function RecentActivity({
  messages,
  workspaceSlug,
  isLoading = false,
}: RecentActivityProps) {
  if (isLoading) {
    return (
      <div className={card}>
        <div className={styles.sectionHeader}>
          <h2 className={typographyStyle.heading2}>최근 활동</h2>
        </div>
        <div className={styles.loadingState}>로딩 중...</div>
      </div>
    );
  }

  return (
    <div className={card}>
      <div className={styles.sectionHeader}>
        <h2 className={typographyStyle.heading2}>최근 활동</h2>
        <Link href={`/workspace/${workspaceSlug}/activity`} className={customButton.ghost}>
          전체 보기
        </Link>
      </div>
      <div className={styles.messagesList}>
        {messages.length > 0 ? (
          messages.map((message) => (
            <MessagePreview key={message.id} message={message} workspaceSlug={workspaceSlug} />
          ))
        ) : (
          <div className={styles.emptyState}>
            <p>최근 활동이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}
