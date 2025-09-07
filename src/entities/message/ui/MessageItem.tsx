'use client';

import { Avatar } from '@/entities/user';
import * as styles from './message-item.css';
import { format, differenceInCalendarDays } from 'date-fns';
import { Message } from '@/shared/types/message';

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

  return message?.messageType === 'USER' || message?.messageType === 'DM' ? (
    <div key={message.id} className={styles.messageItem}>
      {!isSameUserWithinMinute ? (
        <div style={{ display: 'flex', gap: '10px' }}>
          <Avatar
            isActive={message?.user?.status === 'ONLINE'}
            profileImageUrl={message?.user?.profileImageUrl ?? '/images/default_profile.png'}
            name={message?.user?.name || ''}
            size={44}
            borderRadius="18px"
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{message.user.name}</span>
              <span style={{ fontSize: '0.8rem', color: '#ADB5BD' }}>
                {formatMessageDate(currentDate)}
              </span>
            </div>
            {message.content}
          </div>
        </div>
      ) : (
        <div style={{ marginLeft: '58px', marginTop: '2px' }}>{message.content}</div>
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
