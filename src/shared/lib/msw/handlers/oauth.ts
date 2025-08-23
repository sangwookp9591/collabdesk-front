import { http, HttpResponse } from 'msw';

export const oauthHandlers = [
  // Google OAuth mock
  http.post('https://oauth2.googleapis.com/token', () => {
    return HttpResponse.json({
      access_token: 'mock-access-token',
      token_type: 'Bearer',
      expires_in: 3600,
      refresh_token: 'mock-refresh-token',
    });
  }),

  // Google 사용자 정보 mock
  http.get('https://www.googleapis.com/oauth2/v2/userinfo', () => {
    return HttpResponse.json({
      id: 'mock-google-user-id',
      email: 'testuser@gmail.com',
      name: 'Test Google User',
      picture: 'https://example.com/google-avatar.jpg',
      verified_email: true,
    });
  }),
];
