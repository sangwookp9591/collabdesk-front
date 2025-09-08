'use client';

import { useMentionStore } from '../model/useMentionStore';
import * as styles from './mentionDropdown.css';

interface MentionDropdownProps {
  position: { top: number; left: number };
  onSelectUser: (user: any) => void;
}

export function MentionDropdown({ position, onSelectUser }: MentionDropdownProps) {
  const { filteredUsers, selectedIndex } = useMentionStore();

  if (filteredUsers.length === 0) return null;

  console.log('position : ', position);
  return (
    <div
      className={styles.mentionDropdown}
      style={{
        position: 'fixed',
        top: position.top,
        left: position.left,
      }}
    >
      {filteredUsers.map((user, index) => (
        <div
          key={user.id}
          className={`${styles.mentionItem} ${
            index === selectedIndex ? styles.mentionItemSelected : ''
          }`}
          onClick={() => onSelectUser(user)}
        >
          <img
            src={user.profileImageUrl || '/images/default_profile.png'}
            alt={user.name}
            className={styles.mentionAvatar}
          />
          <div className={styles.mentionUserInfo}>
            <span className={styles.mentionUserName}>{user.name}</span>
            <span className={styles.mentionUserEmail}>{user.email}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
