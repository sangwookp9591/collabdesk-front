'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as styles from './message-list.css';
import { Message } from '@/shared/types/message';
import { MessageItem } from '@/entities/message';
import { MessageListSkeleton } from './MessageListSkeleton';
import { useDebounceCallback } from '@/shared/hooks';
import { DotLoading } from '@/shared/ui';

type MessageListProps = {
  roomType: 'channel' | 'dm';
  messages: Message[];
  targetMessageId?: string;
  isLoading: boolean;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  fetchPreviousPage: () => Promise<any>;
  fetchNextPage: () => Promise<any>;
  isFetchingPreviousPage: boolean;
  isFetchingNextPage: boolean;
};

export function MessageList({
  messages,
  targetMessageId,
  isLoading,
  hasPreviousPage,
  hasNextPage,
  fetchPreviousPage,
  fetchNextPage,
  isFetchingPreviousPage,
  isFetchingNextPage,
}: MessageListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const loadMoreTopRef = useRef<HTMLDivElement>(null);
  const loadMoreBottomRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement | null>(null);

  const lastMessage = useMemo(() => {
    return messages.length > 0
      ? { id: messages[messages.length - 1].id, message: messages[messages.length - 1] }
      : null;
  }, [messages]);

  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(true);
  const [isNearBottom, setIsNearBottom] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(true);

  // 새 메시지 알림 관련
  const [newMessageCount, setNewMessageCount] = useState(0);
  const [showNewMessageIndicator, setShowNewMessageIndicator] = useState(false);

  // 이전 메시지 로드 (상단)
  const debouncedFetchPrevious = useDebounceCallback(() => {
    if (isFetchingPreviousPage) return;

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
  }, 300);

  // 다음 메시지 로드 (하단)
  const debouncedFetchNext = useDebounceCallback(() => {
    if (isFetchingNextPage) return;
    fetchNextPage();
  }, 300);

  // 스크롤 위치 감지
  const handleScroll = useCallback(() => {
    if (isLoading) return;

    const container = containerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

    // 하단 근처 (100px 이내)
    const nearBottom = distanceFromBottom < 200;
    setIsNearBottom(nearBottom);

    // 정확히 하단 (5px 오차 허용)
    const atBottom = distanceFromBottom < 5;
    console.log('distanceFromBottom : ', distanceFromBottom);
    setIsAtBottom(atBottom);

    if (atBottom) {
      // 맨 아래라면 새 메시지 카운트 리셋
      setNewMessageCount(0);
      setShowNewMessageIndicator(false);
    }
  }, [containerRef, isLoading]);

  // 상단 무한스크롤 (이전 메시지)
  useEffect(() => {
    if (!hasPreviousPage || isFetchingPreviousPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          debouncedFetchPrevious();
        }
      },
      { threshold: 0.1 },
    );

    if (loadMoreTopRef.current) {
      observer.observe(loadMoreTopRef.current);
    }

    return () => observer.disconnect();
  }, [hasPreviousPage, isFetchingPreviousPage, debouncedFetchPrevious]);

  // 하단 무한스크롤 (다음 메시지)
  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && isNearBottom) {
          console.log('isNearBottom :', isNearBottom);
          debouncedFetchNext();
        }
      },
      { threshold: 1 },
    );

    if (endRef.current) {
      observer.observe(endRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, debouncedFetchNext, isNearBottom]);

  const handleClickNewMEssage = () => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
    setNewMessageCount(0);
    setShowNewMessageIndicator(false);
  };

  // 스크롤 이벤트 등록
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // 최초 로드시 하단 스크롤
  useEffect(() => {
    if (shouldScrollToBottom && containerRef.current && messages.length > 0 && !targetMessageId) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
      setShouldScrollToBottom(false);
    } else {
      if (!targetMessageId || !containerRef.current || shouldScrollToBottom) return;

      const targetEl = containerRef.current.querySelector<HTMLDivElement>(
        `[data-message-id="${targetMessageId}"]`,
      );

      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      setShouldScrollToBottom(false);
    }
  }, [messages, shouldScrollToBottom, targetMessageId]);

  // 새 메시지 자동 스크롤 (하단 근처에 있을 때만)
  useEffect(() => {
    if (isAtBottom && endRef?.current && !hasNextPage) {
      endRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [lastMessage?.id, isAtBottom, hasNextPage]);

  useEffect(() => {
    if (!isNearBottom && !hasNextPage) {
      setShowNewMessageIndicator(true);
    }
  }, [lastMessage?.id, isNearBottom, hasNextPage]);

  if (isLoading) {
    return <MessageListSkeleton />;
  }

  return (
    <div ref={containerRef} className={styles.messageList}>
      {/* 상단 로더 (이전 메시지) */}
      <div ref={loadMoreTopRef} className={styles.loadMoreTop}>
        {(isFetchingPreviousPage || hasPreviousPage) && <DotLoading size={10} />}
        {!hasPreviousPage && messages.length > 0 && (
          <div className={styles.lastMessage}>처음 메시지입니다.</div>
        )}
      </div>

      {/* 메시지 목록 */}
      {messages.map((message, idx) => {
        const prevMsg = messages[idx - 1];
        const isSameUserWithinMinute =
          prevMsg &&
          prevMsg.user.id === message.user.id &&
          Math.abs(+new Date(message.createdAt) - +new Date(prevMsg.createdAt)) < 60 * 1000;

        return (
          <div key={message.id} data-message-id={message.id}>
            <MessageItem message={message} isSameUserWithinMinute={!!isSameUserWithinMinute} />
          </div>
        );
      })}

      {/* 하단 로더 (다음 메시지) */}
      <div ref={loadMoreBottomRef} className={styles.loadMoreBottom}>
        {(isFetchingNextPage || hasNextPage) && <DotLoading size={10} />}
        {!hasNextPage && messages.length > 0 && (
          <div className={styles.lastMessage}>최신 메시지입니다.</div>
        )}
      </div>

      <div ref={endRef}></div>

      {/* 새 메시지 알림 버튼 */}
      {showNewMessageIndicator && lastMessage?.message && (
        <div className={styles.newMessageView} onClick={handleClickNewMEssage}>
          <MessageItem message={lastMessage?.message} isSameUserWithinMinute={false} size="sm" />

          <div className={styles.newMessageCount}>
            새 메시지 <span className={styles.count}>{newMessageCount}</span>개
          </div>
        </div>
      )}
    </div>
  );
}
