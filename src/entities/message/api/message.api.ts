import { getSession } from '@/shared/lib';
import { Message } from '@/shared/types/message';

class MessageApi {
  private baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/message`;

  private async fetchWithAuth(url: string, options: RequestInit = {}) {
    const session = await getSession();
    const token = session?.user?.accessToken;

    return fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    });
  }

  async getChannelMessages(slug: string) {
    const response = await this.fetchWithAuth(`${this.baseUrl}/channel/${slug}`, {
      method: 'GET',
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to fetch messages');
    return response.json();
  }

  async getMessagesByChannel(
    slug: string,
    page?: number,
    take?: number,
  ): Promise<{ messages: Message[]; hasMore: boolean; total: number }> {
    const params = new URLSearchParams({ page: String(page), take: String(take) });

    const res = await fetch(`${this.baseUrl}/channel/${slug}?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch messages');
    return res.json();
  }
}

export const messageApi = new MessageApi();
