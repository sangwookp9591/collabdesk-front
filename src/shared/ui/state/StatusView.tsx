// StateView.tsx
import { ReactNode } from 'react';
import * as styles from './statusView.css';

type StatusViewProps = {
  status: 'success' | 'error' | 'warning' | 'info';
  title: string;
  children: ReactNode;
};

const statusEmojiMap: Record<StatusViewProps['status'], string> = {
  success: '✅',
  error: '❌',
  warning: '⚠️',
  info: 'ℹ️',
};

export function StatusView({ status, title, children }: StatusViewProps) {
  return (
    <div className={styles.container}>
      <div className={styles.iconWrapper({ status })}>{statusEmojiMap[status]}</div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{children}</p>
    </div>
  );
}
