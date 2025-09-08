import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { io, Socket } from 'socket.io-client';
import { EVENT_KEYS } from './socket-event-keys';
import { UserStatus } from '@/shared/types/user';

interface SocketState {
  socket: Socket | null;
  isConnected: boolean;
  currentChannel: string | null;
  currentWorkspace: string | null;
  currentDm: string | null;
  connectionStatus: 'disconnected' | 'connecting' | 'connected' | 'error';
  error: string | null;

  // Actions
  connect: (token: string) => void;
  disconnect: () => void;

  joinWorkspace: (workspaceId: string) => void;
  leaveWorkspace: () => void;
  changeWorkspace: (newWorkspaceId: string) => void;
  joinRoom: (roomId: string, roomType: 'channel' | 'dm') => void;
  joinChannel: (channelId: string) => void;
  leaveChannel: (channelId: string) => void;
  typing: (isTyping: boolean, roomId: string, roomType: 'channel' | 'dm') => void;
  updateUserStatus: (status: UserStatus) => void;
  getConnectionInfo: () => { isConnected: boolean; status: string; error: string | null };
}

export const useSocketStore = create<SocketState>()(
  subscribeWithSelector((set, get) => ({
    socket: null,
    isConnected: false,
    currentChannel: null,
    currentWorkspace: null,
    currentDm: null,
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

      socket.on(EVENT_KEYS.CONNECT, () => {
        console.log('✅ 소켓 연결 성공! Socket ID:', socket.id);
        set({
          isConnected: true,
          connectionStatus: 'connected',
          error: null,
        });
      });

      // 연결 성공 메시지 수신
      socket.on(EVENT_KEYS.CONNECTED, (data) => {
        console.log('🎉 서버에서 연결 확인:', data);
      });

      socket.on(EVENT_KEYS.DISCONNECTED, (reason) => {
        console.log('❌ 소켓 연결 끊김:', reason);
        set({
          isConnected: false,
          connectionStatus: 'disconnected',
          error: `연결 끊김: ${reason}`,
        });
      });

      socket.on(EVENT_KEYS.CONNECT_ERROR, (error) => {
        console.error('🔥 소켓 연결 오류:', error);
        set({
          isConnected: false,
          connectionStatus: 'error',
          error: `연결 오류: ${error.message}`,
        });
      });

      socket.on(EVENT_KEYS.ERROR, (error) => {
        console.error('🔥 소켓 에러:', error);
        set({ error: `소켓 에러: ${error.message}` });
      });
      socket.on('roomJoined', (message) => {
        console.log('roomJoined success:', message);
      });

      set({ socket });
    },

    disconnect: () => {
      const { socket } = get();
      // console.log('🔌 소켓 연결 해제 ');

      if (socket) {
        socket.disconnect();
        socket.removeAllListeners();
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
        socket.emit(EVENT_KEYS.PUB_JOIN_WORKSPACE, { workspaceId: workspaceId });
        set({ currentWorkspace: workspaceId });
      }
    },
    leaveWorkspace: () => {
      const { socket, currentWorkspace } = get();
      if (socket && currentWorkspace) {
        socket.emit(EVENT_KEYS.PUB_LEAVE_WORKSPACE);
        set({ currentWorkspace: null });
      }
    },

    changeWorkspace: (newWorkspaceId: string) => {
      const { socket, currentWorkspace } = get();
      if (socket && currentWorkspace) {
        socket.emit(EVENT_KEYS.PUB_CHANGE_WORKSPACE, { newWorkspaceId: newWorkspaceId });
        set({ currentWorkspace: newWorkspaceId });
      }
    },

    joinRoom: (roomId: string, roomType: 'channel' | 'dm') => {
      const { socket } = get();
      if (socket) {
        socket.emit(EVENT_KEYS.PUB_JOIN_ROOM, { roomId, roomType });
        if (roomType === 'channel') {
          set({ currentChannel: roomId, currentDm: null });
        } else {
          set({ currentChannel: null, currentDm: roomId });
        }
      }
    },
    joinChannel: (channelId: string) => {
      const { socket, currentWorkspace } = get();
      if (socket) {
        // 이전 채널에서 나가기
        // if (currentChannel) {
        //   socket.emit('leaveChannel', { channelId: currentChannel });
        // }

        // 새 채널 참가
        socket.emit(EVENT_KEYS.PUB_JOIN_CHANNEL, { channelId, workspaceId: currentWorkspace });
        set({ currentChannel: channelId });
      }
    },
    leaveChannel: (channelId: string) => {
      const { socket } = get();
      if (socket) {
        socket.emit(EVENT_KEYS.PUB_LEAVE_CHANNEL, { channelId });
        set({ currentChannel: null });
      }
    },
    typing: (isTyping: boolean, roomId: string, roomType: 'channel' | 'dm') => {
      const { socket } = get();
      if (socket) {
        socket.emit(isTyping ? EVENT_KEYS.PUB_START_TYPING : EVENT_KEYS.PUB_STOP_TYPING, {
          roomId: roomId,
          roomType: roomType,
        });
      }
    },
    updateUserStatus: (status: UserStatus) => {
      const { socket } = get();
      if (socket) {
        socket.emit(EVENT_KEYS.PUB_UPDATE_STATUS, {
          status: status,
        });
      }
    },
    getConnectionInfo: () => {
      const { isConnected, connectionStatus, error } = get();
      return { isConnected, status: connectionStatus, error };
    },
  })),
);
