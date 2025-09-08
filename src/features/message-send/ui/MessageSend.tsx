'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as styles from './message-send.css';
import { useSocketStore } from '@/entities/message';
import { useDebounce } from '@/shared/hooks';
import { MessageTyping } from '@/widgets/message/ui/MessageTyping';

type MessageInputProps = {
  onSend: (content: string) => void;
  roomType: 'channel' | 'dm';
};

export function MessageSend({ onSend, roomType }: MessageInputProps) {
  const { typing, currentChannel, currentDm } = useSocketStore();
  const [value, setValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>(null);
  const lastTypingEmitRef = useRef<number>(0);

  const roomId = useMemo(
    () => (roomType === 'channel' ? currentChannel : currentDm),
    [currentDm, currentChannel, roomType],
  );

  // 디바운스된 타이핑 중지
  const debouncedStopTyping = useDebounce(() => {
    if (isTyping && roomId) {
      console.log('디바운스 타이핑 중지!!');
      setIsTyping(false);
      typing(false, roomId, roomType);
    }
  }, 1000);

  // 타이핑 시작/중지 관리
  const handleTypingStart = useCallback(() => {
    if (!roomId) return;

    const now = Date.now();

    // 너무 자주 이벤트를 발생시키지 않도록 제한 (500ms)
    if (!isTyping && now - lastTypingEmitRef.current > 500) {
      setIsTyping(true);
      console.log('타이핑 시작!!!');

      typing(true, roomId, roomType);
      lastTypingEmitRef.current = now;
    }

    // 기존 타이머 클리어
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // 1초 후 타이핑 중지
    typingTimeoutRef.current = setTimeout(() => {
      if (isTyping) {
        console.log('1초후 타이핑 중지');
        setIsTyping(false);
        typing(false, roomId, roomType);
      }
    }, 1000);
  }, [roomId, roomType, isTyping, typing]);

  // 명시적 타이핑 중지
  const handleTypingStop = useCallback(() => {
    if (isTyping && roomId) {
      setIsTyping(false);
      typing(false, roomId, roomType);
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
  }, [isTyping, typing, roomId, roomType]);

  const handleSend = () => {
    if (!value.trim()) return;
    onSend(value.trim());
    handleTypingStop();
    setValue('');
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!value.trim()) return;
      onSend(value.trim());
      setValue('');
    }
  };

  // 메시지 입력 처리
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value);

    if (value.trim()) {
      handleTypingStart();
    } else {
      console.log('어디서 타이핑 메세지를 중지시킴?');
      handleTypingStop();
    }
  };

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      handleTypingStop();
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [handleTypingStop]);

  return (
    <div className={styles.sendMessageContainer}>
      <MessageTyping roomType={roomType} />
      <div className={styles.sendMessage}>
        <input
          ref={inputRef}
          type="text"
          placeholder="메시지를 입력하세요..."
          value={value}
          onChange={handleInputChange}
          onKeyUp={handleKeyUp}
          className={styles.inputBox}
        />
        <div onClick={handleSend} className={styles.sendButton}>
          전송
        </div>
      </div>
    </div>
  );
}
