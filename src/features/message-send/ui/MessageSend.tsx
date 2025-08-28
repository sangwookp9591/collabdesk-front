import { useState } from 'react';
import * as styles from './message-send.css';

type MessageInputProps = {
  onSend: (content: string) => void;
};

export default function MessageSend({ onSend }: MessageInputProps) {
  const [input, setInput] = useState('');

  return (
    <div className={styles.sendMessage}>
      <input
        type="text"
        placeholder="메시지를 입력하세요..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className={styles.inputBox}
      />
      <div onClick={() => onSend(input)} className={styles.sendButton}>
        전송
      </div>
    </div>
  );
}
