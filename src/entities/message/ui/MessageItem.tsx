'use client';

import { Avatar } from '@/entities/user';
import * as styles from './message-item.css';
import { format, differenceInCalendarDays } from 'date-fns';
import { Message } from '@/shared/types/message';
import { useCallback, useMemo } from 'react';

type MessageItemProps = {
  message: Message;
  isSameUserWithinMinute: boolean;
};

function formatMessageDate(date: Date) {
  const today = new Date();
  const diff = differenceInCalendarDays(today, date);

  if (diff === 0) {
    // 오늘
    return format(date, 'a h:mm');
  } else if (diff === 1) {
    // 어제
    return `1일 전 ${format(date, 'a h:mm')}`;
  } else if (diff < 7) {
    // 2~6일 전
    return `${diff}일 전 ${format(date, 'a h:mm')}`;
  } else {
    // 일주일 이상 → 날짜 표시
    return format(date, 'yyyy.MM.dd a h:mm');
  }
}

export function MessageItem({ message, isSameUserWithinMinute }: MessageItemProps) {
  const currentDate = new Date(message.createdAt);

  const mentions = useMemo(() => message.mentions ?? [], [message.mentions]);

  const renderHighlightedText = useCallback(() => {
    if (!message.content) return null;

    const elements: React.ReactNode[] = [];
    let cursor = 0; // 현재까지 처리한 인덱스

    mentions?.forEach((mention, idx) => {
      const name = mention.user?.name || '';
      const mentionText = `@${name}`;

      const startIdx = message.content.indexOf(mentionText, cursor);
      if (startIdx === -1) return; // mention 없으면 넘어감

      // mention 시작 전 일반 텍스트
      if (startIdx > cursor) {
        elements.push(<span>message.content.slice(cursor, startIdx)</span>);
      }

      // mention 하이라이트
      elements.push(
        <span key={`mention-${idx}`} className={styles.mentionHighlight}>
          {mentionText}
        </span>,
      );

      // cursor 이동
      cursor = startIdx + mentionText.length;
    });

    // 마지막 남은 일반 텍스트
    if (cursor < message.content.length) {
      elements.push(message.content.slice(cursor));
    }

    return elements;
  }, [mentions, message.content]);

  return message?.messageType === 'USER' || message?.messageType === 'DM' ? (
    <div key={message.id} className={styles.messageItem}>
      {!isSameUserWithinMinute ? (
        <div style={{ display: 'flex', gap: '10px' }}>
          <Avatar
            userId={message?.user?.id}
            profileImageUrl={message?.user?.profileImageUrl ?? '/images/default_profile.png'}
            name={message?.user?.name || ''}
            size={44}
            borderRadius="18px"
            isActiveIcon={true}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{message.user.name}</span>
              <span style={{ fontSize: '0.8rem', color: '#ADB5BD' }}>
                {formatMessageDate(currentDate)}
              </span>
            </div>
            <div>{mentions.length > 0 ? renderHighlightedText() : message.content}</div>
          </div>
        </div>
      ) : (
        <div style={{ marginLeft: '58px', marginTop: '2px' }}>
          {mentions.length > 0 ? renderHighlightedText() : message.content}
        </div>
      )}
    </div>
  ) : (
    <div key={message.id} className={styles.messageItem}>
      <div
        style={{
          display: 'flex',
          gap: '10px',
          backgroundColor: message.messageType === 'BOT' ? '#eff6ff' : '#fffbeb',
          border: `1px solid ${message.messageType === 'BOT' ? '#bfdbfe' : '#fde68a'}`,
          padding: '10px 10px',
          borderRadius: '15px',
          color: message.messageType === 'BOT' ? '#1d4ed8' : '#b45309',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%' }}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
              {message?.messageType === 'BOT' ? '알림 봇' : '시스템'}
            </span>
            <span style={{ fontSize: '0.8rem', color: '#ADB5BD' }}>
              {formatMessageDate(currentDate)}
            </span>
            <strong>- {message.content}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
