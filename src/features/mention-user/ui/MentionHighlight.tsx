'use client';

import * as styles from './mentionHighlight.css';

interface MentionHighlightProps {
  userId: string;
  userName: string;
  onClick?: (userId: string) => void;
}

export function MentionHighlight({ userId, userName, onClick }: MentionHighlightProps) {
  const handleClick = () => {
    onClick?.(userId);
  };

  return (
    <span className={styles.mentionHighlight} onClick={handleClick}>
      @{userName}
    </span>
  );
}
