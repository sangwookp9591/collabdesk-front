// 📁 shared/lib/msw/handlers/auth.ts
import { http, HttpResponse } from 'msw';
import { mockWorkspaces } from '../data/mockData';
export const userHandlers = [
  http.get('/api/user/workspaces/:userId', ({ request }) => {
    const authHeader = request.headers.get('authorization');

    if (!authHeader) {
      return HttpResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userWorkspaces = {
      workspaces: mockWorkspaces.map((ws) => ({
        id: ws.id,
        name: ws.name,
        slug: ws.slug,
        imageUrl: ws.image,
        memberCount: ws.memberCount,
      })),
      hasWorkspaces: mockWorkspaces.length > 0,
      lastActiveWorkspaceId: '1',
    };

    return HttpResponse.json(userWorkspaces);
  }),
];
