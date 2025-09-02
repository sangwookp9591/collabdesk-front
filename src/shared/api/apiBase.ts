import { getSession } from '../lib';

export class ApiBase {
  protected baseUrl: string;

  constructor(target?: string) {
    this.baseUrl = target
      ? `${process.env.NEXT_PUBLIC_API_URL}/${target.replace(/^\/+/, '')}`
      : `${process.env.NEXT_PUBLIC_API_URL}`;
  }

  private async handleResponse(response: Response) {
    if (!response.ok) {
      let errorMessage = '에러 발생';
      try {
        const data = await response.json();
        errorMessage = data?.message || errorMessage;
      } catch (err) {
        console.error('서버 에러:', err);
      }
      throw new Error(errorMessage);
    }
    return response.json();
  }

  protected async fetchWithAuth(url: string, options: RequestInit = {}) {
    const session = await getSession();
    const token = session?.user?.accessToken;

    options.credentials = 'include';
    const response = await fetch(`${this.baseUrl}${url}`, {
      ...options,
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    });

    return this.handleResponse(response);
  }

  protected async fetchWithoutAuth(url: string, options: RequestInit = {}) {
    const response = await fetch(`${this.baseUrl}${url}`, {
      ...options,
    });

    return this.handleResponse(response);
  }
}

export const api = new ApiBase();
