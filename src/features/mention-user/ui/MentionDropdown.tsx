'use client';

import { Avatar } from '@/entities/user';
import * as styles from './mentionDropdown.css';

export interface MentionUser {
  id: string;
  name: string;
  email: string;
  profileImageUrl?: string;
}
interface MentionDropdownProps {
  candidates: MentionUser[];
  position: { top: number; left: number };
  onSelectUser: (user: any) => void;
}

export function MentionDropdown({ candidates, position, onSelectUser }: MentionDropdownProps) {
  console.log('candidates :', candidates);
  return (
    <div
      className={styles.mentionDropdown}
      style={{
        position: 'fixed',
        top: position.top,
        left: position.left,
        height: 'auto',
        width: 'auto',
      }}
    >
      {candidates.map((user) => (
        <div key={user.id} className={`${styles.mentionItem}`} onClick={() => onSelectUser(user)}>
          <Avatar
            userId={user?.id}
            name={user.name}
            profileImageUrl={user?.profileImageUrl}
            size={30}
            borderRadius="10px"
            isActiveIcon={false}
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
