'use client';

import { useCallback, useEffect, useRef } from 'react';
import { Avatar } from '@/entities/user';
import * as styles from './mentionDropdown.css';
import { MentionUser } from '@/entities/metion/model/mention';

interface MentionDropdownProps {
  candidates: MentionUser[];
  activeIndex: number;
  position: { top: number; left: number };
  onSelectUser: (user: MentionUser) => void;
  onClose: () => void;
}

export function MentionDropdown({
  candidates,
  activeIndex,
  position,
  onSelectUser,
  onClose,
}: MentionDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const activeItemRef = useRef<HTMLDivElement>(null);

  // 활성 아이템 스크롤 처리
  useEffect(() => {
    if (activeItemRef.current) {
      activeItemRef.current.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      });
    }
  }, [activeIndex]);

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleUserSelect = useCallback(
    (user: MentionUser) => {
      onSelectUser(user);
    },
    [onSelectUser],
  );

  if (candidates.length === 0) {
    return (
      <div
        ref={dropdownRef}
        className={styles.mentionDropdown}
        style={{
          position: 'fixed',
          top: position.top,
          left: position.left,
          zIndex: 1000,
        }}
      >
        <div className={styles.noResults}>사용자를 찾을 수 없습니다</div>
      </div>
    );
  }

  return (
    <div
      ref={dropdownRef}
      className={styles.mentionDropdown}
      style={{
        position: 'fixed',
        top: position.top,
        left: position.left,
        zIndex: 1000,
      }}
    >
      <div className={styles.mentionHeader}>멤버</div>

      <div className={styles.mentionList}>
        {candidates.map((user, index) => (
          <div
            key={user.id}
            ref={index === activeIndex ? activeItemRef : null}
            className={`${styles.mentionItem} ${
              index === activeIndex ? styles.mentionItemActive : ''
            }`}
            onClick={() => handleUserSelect(user)}
            onMouseEnter={() => {
              // 마우스 호버 시 활성 인덱스 업데이트는 부모에서 처리
            }}
          >
            {user.type === 'USER' ? (
              <>
                <Avatar
                  userId={user.id}
                  name={user.name}
                  profileImageUrl={user.profileImageUrl}
                  size={32}
                  borderRadius="6px"
                  isActiveIcon={false}
                />
                <div className={styles.mentionUserInfo}>
                  <span className={styles.mentionUserName}>{user.name}</span>
                  <span className={styles.mentionUserEmail}>{user.email}</span>
                </div>
              </>
            ) : (
              <div>
                <div className={styles.mentionSpecialInfo}>
                  <span className={styles.mentionSpecial}>{`@${user.name}`}</span>
                  <span className={styles.mentionDesc}>
                    {user.type === 'HERE' ? '현재 방 사용자에게 알림' : '모든 사용자에게 알림'}
                  </span>
                </div>
              </div>
            )}
            {index === activeIndex && (
              <div className={styles.activeIndicator}>
                <kbd className={styles.keyboardShortcut}>Enter</kbd>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className={styles.mentionFooter}>
        <div className={styles.shortcutHints}>
          <span className={styles.shortcutSpan}>
            <kbd>↑</kbd>
            <kbd>↓</kbd> 탐색
          </span>
          <span className={styles.shortcutSpan}>
            <kbd>Enter</kbd> 선택
          </span>
          <span className={styles.shortcutSpan}>
            <kbd>Esc</kbd> 취소
          </span>
        </div>
      </div>
    </div>
  );
}
