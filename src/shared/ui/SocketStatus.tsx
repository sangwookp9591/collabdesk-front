'use client';

import { useSocketStore } from '@/entities/message/model/socket.store';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export function SocketStatus() {
  const { data: session } = useSession();
  const { isConnected, connectionStatus, error, socket, connect } = useSocketStore();
  useEffect(() => {
    console.log('ocket?.connected : ', socket?.connected);
    if (session?.user?.accessToken) {
      connect(session?.user?.accessToken);
    }
  }, [session?.user]);

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
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
  );
}
