'use client';

import { Avatar } from '@/entities/user';
import * as styles from './message-item.css';
import { format } from 'date-fns';
import { Message } from '@/shared/types/message';

type MessageItemProps = {
  message: Message;
  isSameUserWithinMinute: boolean;
};

export default function MessageItem({ message, isSameUserWithinMinute }: MessageItemProps) {
  const currentDate = new Date(message.createdAt);

  return (
    <div key={message.id} className={styles.messageItem}>
      {!isSameUserWithinMinute ? (
        <div style={{ display: 'flex', gap: '10px' }}>
          <Avatar
            isActive={message.user.status === 'ONLINE'}
            profileImageUrl={message.user.profileImageUrl ?? '/images/default_profile.png'}
            name={message?.user?.name || ''}
            size={48}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{message.user.name}</span>
              <span style={{ fontSize: '0.8rem', color: '#ADB5BD' }}>
                {format(currentDate, 'a h:mm')}
              </span>
            </div>
            {message.content}
          </div>
        </div>
      ) : (
        <div style={{ marginLeft: '58px', marginTop: '2px' }}>{message.content}</div>
      )}
    </div>
  );
}
