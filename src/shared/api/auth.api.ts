import { ApiBase } from './apiBase';
import { getSession } from '../lib';

interface Tokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

interface AuthResponse extends Tokens {
  user: {
    id: string;
    email: string;
    name?: string;
    profileImageUrl?: string;
    status?: 'ONLINE' | 'AWAY' | 'OFFLINE' | 'DO_NOT_DISTURB';
  };
}

class AuthApi extends ApiBase {
  async login({ email, password }: { email: string; password: string }): Promise<AuthResponse> {
    return await this.fetchWithoutAuth('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
  }

  async logout() {
    const session = await getSession();
    await this.fetchWithAuth('/logout', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken: session?.user?.refreshToken }),
    });
    return null;
  }

  async tokenRefresh() {
    const session = await getSession();
    const res: Tokens = await this.fetchWithAuth('/refresh', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken: session?.user?.refreshToken }),
    });

    return {
      accessToken: res.accessToken,
      refreshToken: res.refreshToken,
      expiresIn: Date.now() + 15 * 60 * 1000,
    };
  }
}

export const authApi = new AuthApi('auth');
