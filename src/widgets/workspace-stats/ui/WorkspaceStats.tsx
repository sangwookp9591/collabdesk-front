import React from 'react';
import * as styles from './workspaceState.css';

interface WorkspaceStatsProps {
  stats: {
    totalChannels: number;
    totalMembers: number;
    totalMessages: number;
    onlineMembers: number;
  };
}

export const WorkspaceStats: React.FC<WorkspaceStatsProps> = ({ stats }) => {
  return (
    <div className={styles.statsGrid}>
      <div className={styles.statCard}>
        <div className={styles.statNumber}>{stats.totalChannels}</div>
        <div className={styles.statLabel}>채널</div>
      </div>
      <div className={styles.statCard}>
        <div className={styles.statNumber}>{stats.totalMembers}</div>
        <div className={styles.statLabel}>멤버</div>
      </div>
      <div className={styles.statCard}>
        <div className={styles.statNumber}>{stats.onlineMembers}</div>
        <div className={styles.statLabel}>온라인</div>
      </div>
      <div className={styles.statCard}>
        <div className={styles.statNumber}>{stats.totalMessages}</div>
        <div className={styles.statLabel}>메시지</div>
      </div>
    </div>
  );
};
