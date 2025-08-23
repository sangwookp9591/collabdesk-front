// 📁 shared/lib/msw/handlers/auth.ts
import { http, HttpResponse } from 'msw';
import { mockUsers, createMockUser } from '@/entities/user/api/__mocks__/fixtures';

export const authHandlers = [
  // 로그인 API (Credentials Provider용)
  http.post('/api/auth/signin', async ({ request }) => {
    const { email, password } = (await request.json()) as any;

    // Mock 로그인 로직
    const user = mockUsers.find((u) => u.email === email);

    if (user && password === 'password123') {
      return HttpResponse.json({
        id: user.id,
        email: user.email,
        name: user.name,
        profileImgUrl: user.profileImgUrl,
      });
    }

    return HttpResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }),

  // 사용자 정보 조회/생성 (OAuth Provider용)
  http.post('/api/users/upsert', async ({ request }) => {
    const userData = (await request.json()) as any;

    let user = mockUsers.find((u) => u.email === userData.email);

    if (!user) {
      // 새 사용자 생성
      user = createMockUser({
        email: userData.email,
        name: userData.name,
        profileImageUrl: userData.profileImageUrl,
      });
      mockUsers.push(user);
    } else {
      // 기존 사용자 업데이트
      Object.assign(user, {
        ...userData,
        updatedAt: new Date().toISOString(),
      });
    }

    return HttpResponse.json(user);
  }),

  // NextAuth 내부 API들을 mock (필요시)
  http.get('/api/auth/session', ({ request }) => {
    const authHeader = request.headers.get('authorization');

    if (!authHeader) {
      return HttpResponse.json(null);
    }

    // Mock session 반환
    const mockSession = {
      user: {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        image: 'https://example.com/avatar.jpg',
      },
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    };

    return HttpResponse.json(mockSession);
  }),
];
