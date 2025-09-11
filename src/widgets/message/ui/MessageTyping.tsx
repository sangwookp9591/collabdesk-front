'use client';

import * as styles from './messageTyping.css';
import { useSocketStore } from '@/entities/message';
import { EVENT_KEYS } from '@/entities/message/model/socket-event-keys';
import { Avatar } from '@/entities/user';
import { useWorkspaceStore } from '@/shared/stores';
import { themeTokens } from '@/shared/styles';
import { DotLoading } from '@/shared/ui';
import { useEffect, useMemo, useRef, useState } from 'react';

interface TypingUser {
  id: string;
  name: string;
  email: string;
  profileImageUrl?: string;
}

export function MessageTyping({ roomType }: { roomType: 'channel' | 'dm' }) {
  const { socket, currentChannel, currentDm } = useSocketStore();
  const { getMember } = useWorkspaceStore();
  const timeoutRef = useRef<Record<string, NodeJS.Timeout>>({});
  const [typingUsers, setTypingUsers] = useState<TypingUser[]>([]);

  const roomId = useMemo(
    () => (roomType === 'channel' ? currentChannel : currentDm),
    [currentDm, currentChannel, roomType],
  );

  useEffect(() => {
    if (!socket) return;

    // 타이핑 시작 이벤트
    const handleTypingStarted = (data: { roomId: string; roomType: string; userId: string }) => {
      if (data.roomId !== roomId || data.roomType !== roomType) return;

      console.log('new typing!!!!!');

      const user = getMember(data?.userId);

      if (!user) {
        return;
      }
      setTypingUsers((prev) => {
        const filtered = prev.filter((u) => u.id !== user.id);
        return [
          ...filtered,
          {
            id: user?.id,
            name: user?.name ?? '',
            email: user?.email ?? '',
            profileImageUrl: user?.profileImageUrl,
            startedAt: Date.now(),
          },
        ];
      });

      // 5초 후 자동 제거 (안전장치)
      if (timeoutRef.current[user.id]) {
        clearTimeout(timeoutRef.current[user.id]);
      }

      timeoutRef.current[user.id] = setTimeout(() => {
        setTypingUsers((prev) => prev.filter((u) => u.id !== user.id));
        delete timeoutRef.current[user.id];
      }, 10000);
    };

    // 타이핑 중지 이벤트
    const handleTypingStopped = (data: { roomId: string; roomType: string; userId: string }) => {
      if (data.roomId !== roomId || data.roomType !== roomType) return;

      setTypingUsers((prev) => prev.filter((u) => u.id !== data.userId));

      if (timeoutRef.current[data.userId]) {
        clearTimeout(timeoutRef.current[data.userId]);
        delete timeoutRef.current[data.userId];
      }
    };

    // 타이핑 사용자 목록 업데이트
    const handleTypingUsers = (data: { roomId: string; users: TypingUser[] }) => {
      if (data.roomId !== roomId) return;
      setTypingUsers(data.users);
    };

    socket.on(EVENT_KEYS.SUB_START_TYPING, handleTypingStarted);
    socket.on(EVENT_KEYS.SUB_STOP_TYPING, handleTypingStopped);

    return () => {
      socket.off(EVENT_KEYS.SUB_START_TYPING, handleTypingStarted);
      socket.off(EVENT_KEYS.SUB_STOP_TYPING, handleTypingStopped);

      // 타이머 정리
      Object.values(timeoutRef.current).forEach((timeout) => clearTimeout(timeout));
    };
  }, [socket, roomId, roomType, getMember]);

  useEffect(() => {
    console.log('typingUsers : ', typingUsers);
  }, [typingUsers]);
  if (typingUsers.length === 0) {
    return null;
  }

  const renderTypingText = () => {
    if (typingUsers.length === 1) {
      return `${typingUsers[0].name}님이 입력 중`;
    } else if (typingUsers.length === 2) {
      return `${typingUsers[0].name}님과 ${typingUsers[1].name}님이 입력 중`;
    } else {
      return `${typingUsers[0].name}님 외 ${typingUsers.length - 1}명이 입력 중`;
    }
  };
  return (
    <div className={`${styles.typingContainer[typingUsers ? 'in' : 'in']}`}>
      <div className={styles.typingAvatars}>
        {typingUsers.slice(0, 3).map((user) => (
          <Avatar
            userId={user?.id}
            key={user.id}
            size={25}
            profileImageUrl={user.profileImageUrl}
            name={user.name}
            isActiveIcon={false}
            borderRadius="2px"
          ></Avatar>
        ))}
      </div>
      <div className={styles.typingText}>{renderTypingText()}</div>
      <DotLoading size={4} backgroundColor={themeTokens.colors.backgroundSecondary} />
    </div>
  );
}
