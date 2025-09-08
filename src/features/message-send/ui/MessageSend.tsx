'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as styles from './message-send.css';
import { useSocketStore } from '@/entities/message';
import { useDebounce } from '@/shared/hooks';
import { MessageTyping } from '@/widgets/message/ui/MessageTyping';
import { MentionDropdown, useMentionStore } from '@/features/mention-user';

type MessageInputProps = {
  onSend: (content: string) => void;
  roomType: 'channel' | 'dm';
};
type MentionToken = {
  id: string;
  name: string;
  start: number;
  end: number;
}; // start/end in plain text token coords

export interface MentionUser {
  id: string;
  name: string;
  email: string;
  profileImageUrl?: string;
}
export function MessageSend({ onSend, roomType }: MessageInputProps) {
  const { typing, currentChannel, currentDm } = useSocketStore();
  const [value, setValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const cantainerRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>(null);
  const lastTypingEmitRef = useRef<number>(0);

  const [mentions, setMentions] = useState<MentionToken[]>([]); // 삽입된 mention 메타
  const [query, setQuery] = useState<string | null>(null); // 현재 '@' 뒤 검색어 (null -> 닫힘)
  const [candidates, setCandidates] = useState<MentionUser[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [triggerPos, setTriggerPos] = useState<number | null>(null); // '@'가 시작된 인덱스
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const { members } = useMentionStore();

  // helper: 현재 caret 위치
  const getCaret = () => {
    const t = textareaRef.current;
    return t ? t.selectionStart : 0;
  };

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

  const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!value.trim()) return;
      onSend(value.trim());
      setValue('');
    }
  };

  // 메시지 입력 처리
  const handletextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newVal = e.target.value;
    const caret = e.target.selectionStart;
    setValue(newVal);

    // detect '@' trigger: find nearest '@' before caret that's not followed by space/newline
    const upToCaret = newVal.slice(0, caret);
    const atIndex = upToCaret.lastIndexOf('@');
    console.log('atIndex : ', atIndex);
    if (atIndex >= 0) {
      const afterAt = upToCaret.slice(atIndex + 1);
      console.log('afterAt : ', afterAt);
      // 조건: 공백/줄바꿈 없고 길이 제한(예: 0..30)
      if (!afterAt.includes(' ') && afterAt.length >= 0) {
        console.log('setIsDropdownOpen : ');
        setQuery(afterAt);
        setTriggerPos(atIndex);
        setIsDropdownOpen(true);
        return;
      }
    }

    // 조건 안 맞으면 닫기
    setQuery(null);
    setTriggerPos(null);
    setCandidates([]);
    setIsDropdownOpen(false);

    // 타이핑
    if (newVal.trim()) {
      handleTypingStart();
    } else {
      console.log('어디서 타이핑 메세지를 중지시킴?');
      handleTypingStop();
    }
  };

  useEffect(() => {
    if (query === null) {
      setCandidates(members);
      setActiveIndex(0);
      return;
    }
    const q = query.toLowerCase();
    const filtered = members.filter((u) => u.name.toLowerCase().includes(q)).slice(0, 6);
    setCandidates(filtered);
    setActiveIndex(0);
  }, [query, members]);

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      handleTypingStop();
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [handleTypingStop]);

  // 키보드 핸들링 (추천창 내 이동/선택, Esc 닫기)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (query === null) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, Math.max(0, candidates.length - 1)));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      // Enter 시 mention 확정 (만약 메시지 전송을 막고 싶으면 e.preventDefault())
      e.preventDefault();
      if (candidates[activeIndex]) {
        insertMention(candidates[activeIndex]);
      }
    } else if (e.key === 'Escape') {
      setQuery(null);
      setTriggerPos(null);
      setCandidates([]);
    }
  };

  const getDropdownPosition = useCallback(() => {
    if (!cantainerRef.current) return { top: 0, left: 0, bttom: 0 };

    const input = cantainerRef.current;
    const rect = input.getBoundingClientRect();
    return {
      top: rect.top - rect.height,
      left: rect.left,
    };
  }, [cantainerRef]);

  // mention 삽입 함수: 토큰 포맷은 @[id:name]
  const insertMention = useCallback(
    (user: MentionUser) => {
      if (triggerPos === null) return;
      const t = textareaRef.current;
      const caret = getCaret();
      // before + token + after
      const before = value.slice(0, triggerPos);
      const after = value.slice(caret); // 기존 캐럿 이후 텍스트
      const tokenText = `@[${user.id}:${user.name}]`; // 저장 포맷
      const newValue = before + tokenText + after;

      // 새로운 mention 위치 계산
      const start = before.length;
      const end = start + tokenText.length;

      // 업데이트: 범위에서 중복된 멘션제거
      const filtered = mentions.filter((m) => m.end <= start || m.start >= caret); // keep those not overlapping
      const newMention: MentionToken = { id: user.id, name: user.name, start, end };
      //'caret' 뒤에 오는 언급을 길이 델타로 변경
      const delta = tokenText.length - (caret - triggerPos);
      const shifted = filtered.map((m) =>
        m.start >= caret ? { ...m, start: m.start + delta, end: m.end + delta } : m,
      );

      setValue(newValue);
      setMentions([...shifted, newMention].sort((a, b) => a.start - b.start));
      setQuery(null);
      setTriggerPos(null);
      setIsDropdownOpen(false);

      // set caret after inserted token
      requestAnimationFrame(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = end;
        }
      });
    },
    [triggerPos, value, mentions],
  );

  return (
    <div className={styles.sendMessageContainer}>
      <MessageTyping roomType={roomType} />

      <div ref={cantainerRef} className={styles.sendMessage}>
        {/* 하이라이트 오버레이 */}
        <textarea
          ref={textareaRef}
          className={styles.inputBox}
          placeholder="메시지를 입력하세요..."
          value={value}
          onChange={handletextAreaChange}
          onKeyUp={handleKeyUp}
          onKeyDown={handleKeyDown}
        />
        <div onClick={handleSend} className={styles.sendButton}>
          전송
        </div>
      </div>

      {isDropdownOpen && (
        <MentionDropdown
          candidates={candidates}
          position={getDropdownPosition()}
          onSelectUser={(user) => insertMention(user)}
        />
      )}
    </div>
  );
}
