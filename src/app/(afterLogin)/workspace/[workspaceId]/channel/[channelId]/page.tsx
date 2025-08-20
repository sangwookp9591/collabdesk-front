'use client';

import * as styles from './page.css';
import { ChannelIcon, PlusIcon } from '@/shared/ui/IconSvg';
import { useState } from 'react';

type Message = {
  id: number;
  user: string;
  content: string;
};

export default function Page() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, user: '홍길동', content: '안녕하세요!' },
    { id: 2, user: '상욱', content: '반가워요!' },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { id: Date.now(), user: '나', content: input }]);
    setInput('');
  };

  return (
    <div className={styles.chatPage}>
      {/* Top Bar */}
      <div className={styles.topBar}>
        <ChannelIcon />
        <span className={styles.channelName}>채널이름</span>
      </div>

      {/* Tab */}
      <div className={styles.tabBar}>
        <div className={styles.tabItem}>메시지</div>
        <div className={styles.tabItem}>캔버스 추가</div>
        <div className={styles.tabItem}>
          <PlusIcon size={24} />
        </div>
      </div>

      {/* Message List */}
      <div className={styles.messageList}>
        {messages.map((msg) => (
          <div key={msg.id} className={styles.messageItem}>
            <strong>{msg.user}:</strong> {msg.content}
          </div>
        ))}
      </div>

      {/* Send Message */}
      <div className={styles.sendMessage}>
        <input
          type="text"
          placeholder="메시지를 입력하세요..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={styles.inputBox}
        />
        <button onClick={sendMessage} className={styles.sendButton}>
          전송
        </button>
      </div>
    </div>
  );
}
