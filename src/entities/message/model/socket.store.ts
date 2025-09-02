import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { io, Socket } from 'socket.io-client';
type SendMessage = {
  channelId: string;
  content: string;
  parentId?: string;
};
interface SocketState {
  socket: Socket | null;
  isConnected: boolean;
  currentChannel: string | null;
  currentWorkspace: string | null;
  connectionStatus: 'disconnected' | 'connecting' | 'connected' | 'error';
  error: string | null;

  // Actions
  connect: (token: string) => void;
  disconnect: () => void;

  joinWorkspace: (workspaceId: string) => void;
  joinChannel: (channelId: string) => void;
  leaveChannel: (channelId: string) => void;
  sendMessage: (message: SendMessage) => void;
  getConnectionInfo: () => { isConnected: boolean; status: string; error: string | null };
}

export const useSocketStore = create<SocketState>()(
  subscribeWithSelector((set, get) => ({
    socket: null,
    isConnected: false,
    currentChannel: null,
    currentWorkspace: null,
    connectionStatus: 'disconnected',
    error: null,

    connect: (token: string) => {
      console.log('🚀 소켓 연결 시도:', { token: token ? 'Token exists' : 'No token' });

      set({ connectionStatus: 'connecting', error: null });

      const socket = io(`${process.env.NEXT_PUBLIC_BACKEND_URL}/wsg`, {
        auth: { token },
        transports: ['websocket'],
        forceNew: true, // 새 연결 강제
      });

      socket.on('connect', () => {
        console.log('✅ 소켓 연결 성공! Socket ID:', socket.id);
        set({
          isConnected: true,
          connectionStatus: 'connected',
          error: null,
        });
      });

      socket.on('disconnect', (reason) => {
        console.log('❌ 소켓 연결 끊김:', reason);
        set({
          isConnected: false,
          connectionStatus: 'disconnected',
          error: `연결 끊김: ${reason}`,
        });
      });

      socket.on('connect_error', (error) => {
        console.error('🔥 소켓 연결 오류:', error);
        set({
          isConnected: false,
          connectionStatus: 'error',
          error: `연결 오류: ${error.message}`,
        });
      });

      socket.on('error', (error) => {
        console.error('🔥 소켓 에러:', error);
        set({ error: `소켓 에러: ${error.message}` });
      });

      // 연결 성공 메시지 수신
      socket.on('connected', (data) => {
        console.log('🎉 서버에서 연결 확인:', data);
      });

      socket.on('newMessage', (data) => {
        console.log('data : ', data);
      });

      set({ socket });
    },

    disconnect: () => {
      const { socket } = get();
      console.log('🔌 소켓 연결 해제');

      if (socket) {
        socket.disconnect();
        set({
          socket: null,
          isConnected: false,
          connectionStatus: 'disconnected',
          error: null,
        });
      }
    },

    joinWorkspace: (workspaceId: string) => {
      const { socket } = get();
      if (socket) {
        socket.emit('joinWorkspace', { workspaceId });
        set({ currentWorkspace: workspaceId });
      }
    },
    joinChannel: (channelId: string) => {
      const { socket, currentChannel } = get();
      if (socket) {
        // 이전 채널에서 나가기
        if (currentChannel) {
          socket.emit('leaveChannel', { channelId: currentChannel });
        }

        // 새 채널 참가
        socket.emit('joinChannel', { channelId });
        set({ currentChannel: channelId });
      }
    },
    leaveChannel: (channelId: string) => {
      const { socket } = get();
      if (socket) {
        socket.emit('leaveChannel', { channelId });
        set({ currentChannel: null });
      }
    },
    sendMessage: (message) => {
      const { socket } = get();
      if (socket) {
        socket.emit('sendMessage', message);
      }
    },
    getConnectionInfo: () => {
      const { isConnected, connectionStatus, error } = get();
      return { isConnected, status: connectionStatus, error };
    },
  })),
);
