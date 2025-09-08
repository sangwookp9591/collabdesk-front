import * as styles from './message-send.css';

export function MessageSendSkeleton() {
  return (
    <div className={styles.sendMessage}>
      <input
        type="text"
        placeholder="메시지를 입력하세요..."
        className={styles.inputBox}
        readOnly
      />
      <div className={styles.sendButton}>전송</div>
    </div>
  );
}
