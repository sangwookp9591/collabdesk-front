// 📁 shared/lib/msw/handlers/auth.ts
import { http, HttpResponse } from 'msw';
import { mockChannels, mockWorkspaces } from '../data/mockData';

export const workspaceHandlers = [
  // 로그인 API (Credentials Provider용)

  http.get('/api/workspace/sidebar/:id', ({ params, request }) => {
    const authHeader = request.headers.get('authorization');
    const { id } = params;
    if (!authHeader) {
      return HttpResponse.json(null);
    }

    // Mock session 반환
    const mock = mockWorkspaces.find((item) => item?.id === id);
    const newMock = { ...mock, channels: mockChannels };

    return HttpResponse.json(newMock);
  }),
];
