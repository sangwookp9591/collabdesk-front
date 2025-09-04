import * as styles from './message-list.css';
import { MessageItemSkeleton } from '@/entities/message';

export function MessageListSkeleton({ length = 5 }: { length?: number }) {
  return (
    <div className={styles.messageList}>
      {Array.from({ length }).map((_, i) => (
        <MessageItemSkeleton key={i} />
      ))}
    </div>
  );
}
