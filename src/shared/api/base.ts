import axios from 'axios';
import { getSession } from 'next-auth/react';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// NextAuth session을 자동으로 포함하는 인터셉터
apiClient.interceptors.request.use(async (config) => {
  const session: any = await getSession();

  if (session?.user) {
    // JWT 토큰이 있다면 헤더에 추가
    config.headers.Authorization = `Bearer ${session.user?.id}`;

    // 사용자 ID를 헤더에 추가 (MSW 핸들러에서 활용)
    config.headers['X-User-Id'] = session?.user?.id;
  }

  return config;
});
