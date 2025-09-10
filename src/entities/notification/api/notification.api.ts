import { ApiBase } from '@/shared/api';
import { Notification } from '../model/notification';

type GetQuery = {
  workspaceId?: string;
  take?: number;
  isRead?: boolean;
};

class NotificaitonApi extends ApiBase {
  async getNotification(query: GetQuery): Promise<Notification[]> {
    const params = new URLSearchParams();
    if (query?.workspaceId) {
      params.append('workspaceId', String(query?.workspaceId));
    }
    if (query?.take) {
      params.append('take', String(query?.take));
    }
    if (query?.isRead !== undefined) {
      params.append('isRead', String(query?.isRead));
    }
    return await this.fetchWithAuth(`?${params.toString()}`, {
      method: 'GET',
      credentials: 'include',
    });
  }
  async updateMarkAsRead(notificationId: string) {
    return await this.fetchWithAuth('/mark', {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: notificationId }),
    });
  }
}

export const notificaitonApi = new NotificaitonApi('notification');
