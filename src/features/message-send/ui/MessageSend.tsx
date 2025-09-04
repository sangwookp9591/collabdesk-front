'use client';

import { useState } from 'react';
import * as styles from './message-send.css';

type MessageInputProps = {
  onSend: (content: string) => void;
};

export function MessageSend({ onSend }: MessageInputProps) {
  const [value, setValue] = useState('');

  const handleSend = () => {
    if (!value.trim()) return;
    onSend(value.trim());
    setValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={styles.sendMessage}>
      <input
        type="text"
        placeholder="메시지를 입력하세요..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className={styles.inputBox}
      />
      <div onClick={handleSend} className={styles.sendButton}>
        전송
      </div>
    </div>
  );
}
