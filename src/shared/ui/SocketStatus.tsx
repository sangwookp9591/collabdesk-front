'use client';

import { useSocketStore } from '@/entities/message/model/socket.store';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useWorkspaceStore } from '../stores/workspace-store';
import { useRealtimeSubEvents } from '../hooks';

export function SocketStatus({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const {
    isConnected,
    connectionStatus,
    error,
    socket,
    connect,
    disconnect,
    getConnectionInfo,
    joinWorkspace,
  } = useSocketStore();

  const { currentWorkspace } = useWorkspaceStore();

  useEffect(() => {
    // console.log('socket connected : ', socket?.connected);

    if (status === 'loading') {
      return;
    }
    if (session?.user?.accessToken) {
      connect(session?.user?.accessToken);
    } else if (session?.user) {
      disconnect();
    }

    return () => {
      console.log('🧹 SocketProvider cleanup');
      disconnect();
    };
  }, [session?.user, status]);

  // useEffect(() => {
  //   if (process.env.NODE_ENV === 'development') {
  //     const interval = setInterval(() => {
  //       const info = getConnectionInfo();
  //       console.log('🔍 소켓 상태 체크:', info);
  //     }, 5000); // 5초마다 체크

  //     return () => clearInterval(interval);
  //   }
  // }, [getConnectionInfo]);

  useEffect(() => {
    if (isConnected && currentWorkspace) {
      joinWorkspace(currentWorkspace?.id);
    }
  }, [isConnected, currentWorkspace, joinWorkspace]);

  // 실시간 채널 알림
  useRealtimeSubEvents();

  return process.env.NODE_ENV === 'development' ? (
    <>
      <div
        style={{
          position: 'fixed',
          top: '10px',
          right: '150px',
          backgroundColor: isConnected ? '#10B981' : '#EF4444',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '6px',
          fontSize: '12px',
          zIndex: 9999,
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        }}
      >
        <div>소켓: {connectionStatus}</div>
        <div>ID: {socket?.id || 'None'}</div>
        {error && <div>오류: {error}</div>}
      </div>
      {children}
    </>
  ) : (
    <>{children}</>
  );
}
