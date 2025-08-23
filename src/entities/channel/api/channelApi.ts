import { apiClient } from '@/shared/api/base';
import { Channel } from '../model/types';

export const channelApi = {
  getChannels: async (workspaceId: number): Promise<Channel[]> => {
    const response = await apiClient.get(`/workspace/${workspaceId}/channel`);
    return response.data;
  },

  getChannel: async (channelId: number): Promise<Channel> => {
    const response = await apiClient.get(`/channel/${channelId}`);
    return response.data;
  },
};
