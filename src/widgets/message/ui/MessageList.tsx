'use client';

import { useEffect, useRef } from 'react';
import * as styles from './message-list.css';
import MessageItem from '@/entities/message/ui/MessageItem';
import { Message } from '@/shared/types/message';

type MessageListProps = {
  messages: Message[];
  isLoading: boolean;
};

export default function MessageList({ messages, isLoading }: MessageListProps) {
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (endRef?.current) endRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={styles.messageList}>
      {messages.map((message, idx) => {
        const prevMsg = messages[idx - 1];
        const isSameUserWithinMinute =
          prevMsg &&
          prevMsg.user.id === message.user.id &&
          Math.abs(+new Date(message.createdAt) - +new Date(prevMsg.createdAt)) < 60 * 1000;

        return (
          <MessageItem
            key={message.id}
            message={message}
            isSameUserWithinMinute={!!isSameUserWithinMinute}
          />
        );
      })}

      <div ref={endRef}></div>
    </div>
  );
}
