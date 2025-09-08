'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import * as styles from './message-list.css';
import { Message } from '@/shared/types/message';
import { MessageItem } from '@/entities/message';
import { MessageListSkeleton } from './MessageListSkeleton';
import { useDebounceCallback } from '@/shared/hooks';
import { DotLoading } from '@/shared/ui';

type MessageListProps = {
  roomType: 'channel' | 'dm';
  messages: Message[];
  isLoading: boolean;
  hasPreviousPage: boolean;
  fetchPreviousPage: () => Promise<any>;
  isFetchingPreviousPage: boolean;
};

export function MessageList({
  messages,
  isLoading,
  hasPreviousPage,
  fetchPreviousPage,
  isFetchingPreviousPage,
}: MessageListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement | null>(null);
  const lastMessageId = useMemo(() => {
    return messages.length > 0 ? messages[messages.length - 1].id : null;
  }, [messages]);

  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(true);

  const debouncedFetch = useDebounceCallback(() => {
    console.log('디바운스 패치');
    const container = containerRef.current;
    const prevScrollHeight = container?.scrollHeight || 0;

    fetchPreviousPage().then(() => {
      requestAnimationFrame(() => {
        if (container) {
          const newScrollHeight = container.scrollHeight;
          container.scrollTop = newScrollHeight - prevScrollHeight;
        }
      });
    });
  }, 500);

  useEffect(() => {
    if (!hasPreviousPage || isFetchingPreviousPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          debouncedFetch();
        }
      },
      { threshold: 1.0 },
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasPreviousPage, isFetchingPreviousPage, fetchPreviousPage]);

  // 최초 제일아래로
  useEffect(() => {
    if (shouldScrollToBottom && containerRef.current && messages) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
      setShouldScrollToBottom(false);
    }
  }, [messages, shouldScrollToBottom]);

  // 새로 메시지 있으면
  useEffect(() => {
    if (endRef?.current) endRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [lastMessageId]);

  if (isLoading) {
    return <MessageListSkeleton />;
  }

  return (
    <div ref={containerRef} className={styles.messageList}>
      <div ref={loadMoreRef} className={styles.loadMore}>
        {(isFetchingPreviousPage || hasPreviousPage) && <DotLoading size={10} />}
        {!hasPreviousPage && messages.length > 0 && (
          <div className={styles.lastMessage}>모든 메시지를 불러왔습니다.</div>
        )}
      </div>

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
