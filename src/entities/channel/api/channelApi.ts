import { Channel } from '../model/types';

export const channelApi = {
  getChannels: async (workspaceId: number): Promise<Channel[]> => {
    // API 호출 로직
  },
  createChannel: async (data: Omit<Channel, 'id' | 'createdAt'>): Promise<Channel> => {
    // 생성 로직
  },
  deleteChannel: async (id: number): Promise<void> => {
    // 삭제 로직
  },
};
