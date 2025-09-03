import React from 'react';
import Link from 'next/link';
import * as styles from './messagePreview.css';
import { Message } from '@/shared/types/message';
import { BotIcon, SystemIcon, typographyStyle } from '@/shared/ui';
import { Avatar } from '@/entities/user';

interface MessagePreviewProps {
  message: Message;
  workspaceSlug: string;
}

export const MessagePreview: React.FC<MessagePreviewProps> = ({ message, workspaceSlug }) => {
  const getUserInitial = (name?: string) => {
    return name ? name.charAt(0).toUpperCase() : '?';
  };

  const color = message.messageType === 'BOT' ? '#bfdbfe' : '#fde68a';
  const background = message.messageType === 'BOT' ? '#eff6ff' : '#fffbeb';
  const textColor = message.messageType === 'BOT' ? '#1d4ed8' : '#b45309';
  return (
    <div className={styles.messagePreview}>
      {message.messageType === 'BOT' || message.messageType === 'SYSTEM' ? (
        <div>
          <div
            style={{
              display: 'flex',
              borderRadius: '12px',
              border: `1px solid ${textColor}`,
              backgroundColor: background,
            }}
          >
            {message.messageType === 'BOT' ? (
              <BotIcon size={30} color={color} />
            ) : (
              <SystemIcon size={30} color={color} />
            )}
          </div>
        </div>
      ) : (
        <Avatar
          isActive={message?.user?.status === 'ONLINE'}
          profileImageUrl={message?.user?.profileImageUrl}
          name={message?.user?.name || ''}
          size={30}
          isActiveIcon={false}
          borderRadius={'8px'}
        />
      )}
      <div className={styles.messageContent}>
        <div className={styles.messageHeader}>
          <span className={typographyStyle.body2}>
            {message?.user?.name || message.messageType}
          </span>
          <Link
            href={`/workspace/${workspaceSlug}/channel/${message?.channel?.slug || ''}`}
            className={styles.channelLink}
          >
            #{message?.channel?.name || ''}
          </Link>
          <span className={typographyStyle.caption}>
            {new Date(message.createdAt).toLocaleDateString()}
          </span>
        </div>
        <p className={`${typographyStyle.body2} ${styles.messageText}`}>{message.content}</p>
      </div>
    </div>
  );
};
