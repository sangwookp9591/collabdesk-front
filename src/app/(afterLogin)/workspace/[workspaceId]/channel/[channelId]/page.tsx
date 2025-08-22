'use client';

import { Avatar } from '@/entities/user';
import * as styles from './page.css';
import { useEffect, useRef, useState } from 'react';
import { format } from 'date-fns';

type Message = {
  id: number;
  user: string;
  content: string;
  createdAt: string | Date;
};

export default function Page() {
  const endRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, user: '홍길동', content: '안녕하세요!', createdAt: new Date() },
    { id: 2, user: '상욱', content: '반가워요!', createdAt: new Date() },
    { id: 3, user: '민수', content: '반가워요!', createdAt: new Date() },
    { id: 4, user: '철수', content: '반가워요!', createdAt: new Date() },
    { id: 5, user: '김수', content: '반가워요!', createdAt: new Date() },
    { id: 6, user: '양수', content: '반가워요!', createdAt: new Date() },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([
      ...messages,
      { id: Date.now(), user: '상욱', content: input, createdAt: new Date() },
    ]);
    setInput('');
  };

  useEffect(() => {
    if (endRef?.current) endRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      {/* Message List */}
      <div className={styles.messageList}>
        {messages.map((msg, index) => {
          const prevMsg = messages[index - 1];
          const currentDate = new Date(msg.createdAt);
          const prevDate = prevMsg?.createdAt ? new Date(prevMsg.createdAt) : null;
          const isSameUserWithinMinute =
            prevMsg?.user === msg.user &&
            prevDate &&
            currentDate.getMinutes() - prevDate.getMinutes() === 0; // 1분 이내

          return (
            <div key={msg.id} className={styles.messageItem}>
              {!isSameUserWithinMinute ? (
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Avatar
                    isActive={true}
                    profileImageUrl={'/images/default_profile.png'}
                    name={msg.user}
                    size={48}
                  />
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyItems: 'center',
                      alignItems: 'flex-start',
                      width: '100%',
                      gap: '5px',
                    }}
                  >
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{msg.user}</span>
                      <span style={{ fontSize: '0.8rem', color: '#ADB5BD' }}>
                        {format(currentDate, 'a h:mm')}
                      </span>
                    </div>
                    {msg.content}
                  </div>
                </div>
              ) : (
                <div style={{ marginLeft: '58px', marginTop: '2px' }}>{msg.content}</div>
              )}
            </div>
          );
        })}
        <div ref={endRef}></div>
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
        <div onClick={sendMessage} className={styles.sendButton}>
          전송
        </div>
      </div>
    </>
  );
}
