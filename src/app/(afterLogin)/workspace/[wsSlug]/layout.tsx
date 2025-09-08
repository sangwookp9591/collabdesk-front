'use client';

import React from 'react';
import * as styles from './layout.css';
import { usePathname } from 'next/navigation';

interface WorkspaceLayoutProps {
  children: React.ReactNode;
  stats: React.ReactNode;
  welcome: React.ReactNode;
  channels: React.ReactNode;
  activity: React.ReactNode;
}

export default function WorkspaceLayout({
  children,
  stats,
  welcome,
  channels,
  activity,
}: WorkspaceLayoutProps) {
  const pathname = usePathname();
  const isChannelDetail = /\/channel\/[^/]+$/.test(pathname);
  const isDm = /\/dm\/[^/]+$/.test(pathname);

  if (isChannelDetail || isDm) {
    // 채널 상세라면 그냥 children만 노출
    return <>{children}</>;
  }
  return (
    <div className={styles.workspaceOverview}>
      <div className={styles.container}>
        {/* Welcome Section */}
        {welcome}

        {/* Stats Section */}
        {stats}

        {/* Main Content Grid */}
        <div className={styles.sectionsGrid}>
          {/* Channels Section */}
          {channels}

          {/* Activity Section */}
          {activity}
        </div>

        {/* Additional Content */}
        {children}
      </div>
    </div>
  );
}
