'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as styles from './message-send.css';
import { useSocketStore } from '@/entities/message';
import { useDebounce } from '@/shared/hooks';
import { MessageTyping } from '@/widgets/message/ui/MessageTyping';
import { MentionDropdown, useMentionStore } from '@/features/mention-user';
import { MentionedUserId, MentionType } from '@/entities/metion/model/mention';

type MessageInputProps = {
  onSend: (content: string, mentions: MentionedUserId[]) => void;
  roomType: 'channel' | 'dm';
};

export interface MentionUser {
  id: string;
  name: string;
  email: string;
  profileImageUrl?: string;
  type: MentionType;
}

export interface MentionData {
  id: string;
  name: string;
  start: number;
  end: number;
  displayText: string; // "@John Doe"
}

interface MentionRange {
  start: number;
  end: number;
  user: MentionUser;
  displayText: string;
}

// 캐럿 위치의 픽셀 좌표를 계산하는 유틸 함수
function getCaretCoordinates(element: HTMLTextAreaElement, position: number) {
  const div = document.createElement('div');
  const style = getComputedStyle(element);

  // 모든 스타일 복사
  const relevantStyles = [
    'font-family',
    'font-size',
    'font-weight',
    'font-style',
    'letter-spacing',
    'text-transform',
    'word-spacing',
    'text-indent',
    'line-height',
    'padding-top',
    'padding-left',
    'padding-right',
    'padding-bottom',
    'border-top-width',
    'border-left-width',
    'border-right-width',
    'border-bottom-width',
    'box-sizing',
    'white-space',
    'word-wrap',
    'word-break',
  ];

  relevantStyles.forEach((prop) => {
    div.style[prop as any] = style.getPropertyValue(prop);
  });

  div.style.position = 'absolute';
  div.style.visibility = 'hidden';
  div.style.height = 'auto';
  div.style.width = element.clientWidth + 'px';
  div.style.top = '-9999px';
  div.style.left = '-9999px';
  div.style.whiteSpace = 'pre-wrap';
  div.style.wordWrap = 'break-word';

  document.body.appendChild(div);

  const textBeforeCaret = element.value.substring(0, position);
  const textAfterCaret = element.value.substring(position);

  console.log('element.value : ', element.value, position);
  const span = document.createElement('span');
  span.textContent = textBeforeCaret;
  div.appendChild(span);

  const caretSpan = document.createElement('span');
  caretSpan.textContent = textAfterCaret || ' ';
  div.appendChild(caretSpan);

  console.log('span : ', span);
  console.log('caretSpan : ', caretSpan);
  const coordinates = {
    top: span.offsetHeight - element.scrollTop,
    left: span.offsetWidth + 16,
    height: parseFloat(style.lineHeight) || parseFloat(style.fontSize) || 16,
  };

  document.body.removeChild(div);
  return coordinates;
}

export function MessageSend({ onSend, roomType }: MessageInputProps) {
  const { typing, currentChannel, currentDm } = useSocketStore();
  const [value, setValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>(null);
  const lastTypingEmitRef = useRef<number>(0);
  const compositionRef = useRef(false); // IME 입력 상태 추적

  // 멘션 관련 상태
  const [mentions, setMentions] = useState<MentionRange[]>([]);
  const [mentionQuery, setMentionQuery] = useState<string>('');
  const [mentionTriggerPos, setMentionTriggerPos] = useState<number | null>(null);
  const [showMentionDropdown, setShowMentionDropdown] = useState(false);
  const [mentionCandidates, setMentionCandidates] = useState<MentionUser[]>([]);
  const [activeMentionIndex, setActiveMentionIndex] = useState(0);

  const { members } = useMentionStore();

  const roomId = useMemo(
    () => (roomType === 'channel' ? currentChannel : currentDm),
    [currentDm, currentChannel, roomType],
  );

  // 디바운스된 타이핑 중지
  const debouncedStopTyping = useDebounce(() => {
    if (isTyping && roomId) {
      setIsTyping(false);
      typing(false, roomId, roomType);
    }
  }, 1000);

  // 타이핑 시작/중지 관리
  const handleTypingStart = useCallback(() => {
    if (!roomId || compositionRef.current) return;

    const now = Date.now();
    if (!isTyping && now - lastTypingEmitRef.current > 500) {
      setIsTyping(true);
      typing(true, roomId, roomType);
      lastTypingEmitRef.current = now;
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      if (isTyping) {
        setIsTyping(false);
        typing(false, roomId, roomType);
      }
    }, 1000);
  }, [roomId, roomType, isTyping, typing]);

  const handleTypingStop = useCallback(() => {
    if (isTyping && roomId) {
      setIsTyping(false);
      typing(false, roomId, roomType);
    }
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
  }, [isTyping, typing, roomId, roomType]);

  // 멘션 파싱 및 데이터 추출
  const parseMentions = useCallback(
    (text: string): MentionData[] => {
      return mentions
        .map((mention) => {
          // mentions 배열 기준으로 항상 신뢰
          return {
            id: mention.user.id,
            name: mention.user.name,
            start: mention.start,
            end: mention.end,
            displayText: mention.displayText,
          };
        })
        .filter((mention) => {
          // 실제 value에도 존재하는 경우만
          return text.slice(mention.start, mention.end) === mention.displayText;
        });
    },
    [mentions],
  );

  // 메시지 전송
  const handleSend = useCallback(() => {
    if (!value.trim()) return;

    const mentionData = mentions.map((item) => ({
      type: item?.user?.type,
      userId: item?.user?.id || '',
    }));
    onSend(value.trim(), mentionData);

    // 상태 초기화
    setValue('');
    setMentions([]);
    setMentionQuery('');
    setMentionTriggerPos(null);
    setShowMentionDropdown(false);
    handleTypingStop();
  }, [value, parseMentions, onSend, handleTypingStop]);

  // 멘션 후보 필터링
  const filterMentionCandidates = useCallback(
    (query: string) => {
      if (!query) return members.slice(0, 8);

      const lowerQuery = query.toLowerCase();
      return members
        .filter(
          (user) =>
            user.name.toLowerCase().includes(lowerQuery) ||
            user.email.toLowerCase().includes(lowerQuery),
        )
        .sort((a, b) => {
          // 이름이 query로 시작하는 것을 우선순위로
          const aNameStarts = a.name.toLowerCase().startsWith(lowerQuery);
          const bNameStarts = b.name.toLowerCase().startsWith(lowerQuery);
          if (aNameStarts && !bNameStarts) return -1;
          if (!aNameStarts && bNameStarts) return 1;
          return a.name.localeCompare(b.name);
        })
        .slice(0, 8);
    },
    [members],
  );

  // 멘션 감지 및 처리
  const detectMention = useCallback((text: string, caretPos: number) => {
    // @ 뒤의 텍스트 추출
    const beforeCaret = text.slice(0, caretPos);
    const lastAtIndex = beforeCaret.lastIndexOf('@');

    if (lastAtIndex === -1) {
      setShowMentionDropdown(false);
      return;
    }

    const afterAt = beforeCaret.slice(lastAtIndex + 1);

    // @ 앞이 공백이거나 문자열 시작이어야 함 (단어 중간의 @는 무시)
    const beforeAt = beforeCaret.slice(0, lastAtIndex);
    const lastChar = beforeAt[beforeAt.length - 1];
    if (lastChar && !/\s/.test(lastChar)) {
      setShowMentionDropdown(false);
      return;
    }

    // 공백이나 줄바꿈이 없고, 적절한 길이인지 확인
    if (!/\s/.test(afterAt) && afterAt.length <= 50) {
      setMentionQuery(afterAt);
      setMentionTriggerPos(lastAtIndex);
      setShowMentionDropdown(true);
      setActiveMentionIndex(0);
    } else {
      setShowMentionDropdown(false);
    }
  }, []);

  // 기존 멘션과의 충돌 확인
  const checkMentionConflict = useCallback(
    (start: number, end: number): boolean => {
      return mentions.some(
        (mention) =>
          (start >= mention.start && start < mention.end) ||
          (end > mention.start && end <= mention.end) ||
          (start <= mention.start && end >= mention.end),
      );
    },
    [mentions],
  );

  // 멘션 삽입
  const insertMention = useCallback(
    (user: MentionUser) => {
      if (mentionTriggerPos === null) return;

      const textarea = textareaRef.current;
      if (!textarea) return;

      const caretPos = textarea.selectionStart;
      const displayText = `@${user.name}`;

      // 기존 텍스트 분할
      const beforeMention = value.slice(0, mentionTriggerPos);
      const afterMention = value.slice(caretPos);
      const newValue = beforeMention + displayText + afterMention;

      // 새 멘션 범위
      const newMentionStart = mentionTriggerPos;
      const newMentionEnd = mentionTriggerPos + displayText.length;

      // 충돌 확인
      if (checkMentionConflict(newMentionStart, newMentionEnd)) {
        setShowMentionDropdown(false);
        return;
      }

      // 기존 멘션들 중 영향받는 것들 업데이트
      const lengthDelta = displayText.length - (caretPos - mentionTriggerPos);
      const updatedMentions = mentions
        .filter((mention) => mention.end <= mentionTriggerPos || mention.start >= caretPos)
        .map((mention) =>
          mention.start >= caretPos
            ? { ...mention, start: mention.start + lengthDelta, end: mention.end + lengthDelta }
            : mention,
        );

      // 새 멘션 추가
      const newMention: MentionRange = {
        start: newMentionStart,
        end: newMentionEnd,
        user,
        displayText,
      };

      setValue(newValue);
      setMentions([...updatedMentions, newMention].sort((a, b) => a.start - b.start));
      setShowMentionDropdown(false);
      setMentionQuery('');
      setMentionTriggerPos(null);

      // 커서 위치 설정
      requestAnimationFrame(() => {
        if (textarea) {
          textarea.focus();
          const newCaretPos = newMentionEnd;
          textarea.setSelectionRange(newCaretPos, newCaretPos);
        }
      });
    },
    [mentionTriggerPos, value, mentions, checkMentionConflict],
  );

  // 텍스트 변경 처리
  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (compositionRef.current) return;

      const newValue = e.target.value;
      const caretPos = e.target.selectionStart;

      // 멘션 유효성 검사 및 정리
      const validMentions = mentions.filter((mention) => {
        if (mention.end > newValue.length) return false;
        const currentText = newValue.slice(mention.start, mention.end);
        return currentText === mention.displayText;
      });

      setValue(newValue);
      setMentions(validMentions);

      // 멘션 감지
      detectMention(newValue, caretPos);

      // 타이핑 이벤트
      if (newValue.trim()) {
        handleTypingStart();
      } else {
        handleTypingStop();
      }
    },
    [mentions, detectMention, handleTypingStart, handleTypingStop],
  );

  // 멘션 후보 업데이트
  useEffect(() => {
    const candidates = filterMentionCandidates(mentionQuery);
    setMentionCandidates(candidates);
    setActiveMentionIndex(0);
  }, [mentionQuery, filterMentionCandidates]);

  // 키보드 네비게이션
  const handleKeyUp = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (!showMentionDropdown) {
        switch (e.key) {
          case 'ArrowDown':
            e.preventDefault();
            setActiveMentionIndex((prev) => Math.min(prev + 1, mentionCandidates.length - 1));
            break;
          case 'ArrowUp':
            e.preventDefault();
            setActiveMentionIndex((prev) => Math.max(prev - 1, 0));
            break;
          case 'Escape':
            e.preventDefault();
            setShowMentionDropdown(false);
            setMentionQuery('');
            setMentionTriggerPos(null);
            break;
          case 'Tab':
            e.preventDefault();
            if (mentionCandidates[activeMentionIndex]) {
              insertMention(mentionCandidates[activeMentionIndex]);
            }
            break;
          case 'Enter':
            e.preventDefault();
            if (mentionCandidates[activeMentionIndex]) {
              insertMention(mentionCandidates[activeMentionIndex]);
            }
        }
      } else {
        if (e.key === 'Enter' && !e.shiftKey) {
          handleSend();
        }
      }
    },
    [showMentionDropdown, mentionCandidates, activeMentionIndex, handleSend, insertMention],
  );

  // IME 처리 - 개선된 버전
  const handleCompositionStart = useCallback(() => {
    console.log('IME 입력 시작');
    compositionRef.current = true;
  }, []);

  const handleCompositionEnd = useCallback(
    (e: React.CompositionEvent<HTMLTextAreaElement>) => {
      console.log('IME 입력 완료');
      compositionRef.current = false;

      // IME 입력 완료 후 약간의 지연을 두고 멘션 감지
      // 브라우저마다 compositionend 이벤트 타이밍이 다를 수 있음
      setTimeout(() => {
        const target = e.target as HTMLTextAreaElement;
        const newValue = target.value;
        const caretPos = target.selectionStart;

        // 멘션 유효성 검사 및 정리
        const validMentions = mentions.filter((mention) => {
          if (mention.end > newValue.length) return false;
          const currentText = newValue.slice(mention.start, mention.end);
          return currentText === mention.displayText;
        });

        setValue(newValue);
        setMentions(validMentions);

        // 멘션 감지
        detectMention(newValue, caretPos);
      }, 0);
    },
    [detectMention, mentions],
  );

  // 개선된 드롭다운 위치 계산 - textarea 위쪽에 배치
  const getDropdownPosition = useCallback(() => {
    if (!containerRef.current || !textareaRef.current || mentionTriggerPos === null) {
      return { top: 0, left: 0 };
    }

    const textarea = textareaRef.current;
    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();

    // @ 위치의 좌표 계산
    const caretCoords = getCaretCoordinates(textarea, mentionTriggerPos);

    // 드롭다운 예상 높이
    const dropdownHeight = Math.min(mentionCandidates.length * 60 + 80, 300);

    // textarea 위쪽에 배치
    const top = containerRect.top - dropdownHeight;
    const left = containerRect.left + caretCoords.left;

    return { top, left };
  }, [mentionTriggerPos, mentionCandidates.length]);

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      handleTypingStop();
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [handleTypingStop]);

  // 스크롤 시 하이라이트 위치 업데이트
  const handleScroll = useCallback(() => {
    // 스크롤 시 하이라이트 위치 재계산을 위해 강제 리렌더링
    if (mentions.length > 0) {
      setMentions([...mentions]);
    }
  }, [mentions]);

  const handleBeforeInput = useCallback((e: any) => {
    const nativeEvent = e.nativeEvent as InputEvent;

    // 브라우저 네이티브 IME 상태 확인
    if (nativeEvent.isComposing) {
      console.log('IME 입력 중...');
      return;
    }
  }, []);

  const renderHighlightedText = useCallback(() => {
    const elements: React.ReactNode[] = [];
    let lastIndex = 0;

    mentions.forEach((mention, idx) => {
      // mention 시작 전 일반 텍스트
      if (lastIndex < mention.start) {
        const normalText = value.slice(lastIndex, mention.start);
        elements.push(<span key={`text-${lastIndex}`}>{normalText}</span>);
      }

      // mention 부분
      const mentionText = value.slice(mention.start, mention.end);
      elements.push(
        <span key={`mention-${idx}`} className={styles.mentionHighlight}>
          {mentionText}
        </span>,
      );

      lastIndex = mention.end;
    });

    // 마지막 mention 뒤 일반 텍스트
    if (lastIndex < value.length) {
      elements.push(<span key={`text-${lastIndex}`}>{value.slice(lastIndex)}</span>);
    }

    return elements;
  }, [mentions, value]);

  return (
    <div className={styles.sendMessageContainer}>
      <MessageTyping roomType={roomType} />

      <div ref={containerRef} className={styles.sendMessage}>
        <div className={styles.textareaContainer}>
          <div className={styles.mentionOverlay}>{renderHighlightedText()}</div>
          <textarea
            ref={textareaRef}
            className={styles.inputBox}
            placeholder="메시지를 입력하세요..."
            value={value}
            onChange={handleTextChange}
            // onInput={handleInput}
            onBeforeInput={handleBeforeInput}
            onKeyUp={handleKeyUp}
            onScroll={handleScroll}
            rows={1}
            style={{
              minHeight: '40px',
              maxHeight: '120px',
              overflowY: value.split('\n').length > 3 ? 'scroll' : 'hidden',
            }}
          />
        </div>

        <button onClick={handleSend} className={styles.sendButton} disabled={!value.trim()}>
          전송
        </button>
      </div>

      {showMentionDropdown && mentionCandidates.length > 0 && (
        <MentionDropdown
          candidates={mentionCandidates}
          activeIndex={activeMentionIndex}
          position={getDropdownPosition()}
          onSelectUser={insertMention}
          onClose={() => setShowMentionDropdown(false)}
        />
      )}
    </div>
  );
}
