import type { NextAuthOptions, Session, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { apiFetch } from '@/shared/api';
interface AuthResponse {
  user: {
    id: string;
    email: string;
    name?: string;
    profileImageUrl?: string;
    status: string;
  };
  accessToken: string;
  expiresIn: number;
}

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/signin',
    error: '/auth/error',
  },
  providers: [
    // Credentials Provider (MSW로 mock 가능)
    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.log('credentials : ', credentials);
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        console.log('credentials : ', credentials);
        try {
          // MSW가 활성화되면 mock API 호출, 아니면 실제 API 호출

          const res = await apiFetch(`/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const result = await res.json();

          const data = result?.data;
          if (data) {
            return {
              id: data?.user?.id,
              email: data?.user?.email,
              name: data?.user?.name,
              profileImageUrl: data?.user?.profileImageUrl,
              status: data?.user?.status,
              accessToken: data?.accessToken,
              expiresIn: data?.expiresIn,
            };
          }
          return null;
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),

    // Google OAuth (MSW로 mock 가능)
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30일
  },

  callbacks: {
    async session({ session, token, user }: { session: Session; token: any; user?: User }) {
      if (session.user) {
        session.user.id = user?.id ?? token.id ?? '';
        session.user.name = user?.name ?? token.name;
        session.user.email = user?.email ?? token.email;
        session.user.profileImageUrl = user?.profileImageUrl ?? token.profileImageUrl;
        session.user.status = user?.status ?? token.status;
        session.user.accessToken = token.accessToken as string;
        session.user.expiresIn = token.expiresIn as number;
      }
      return session;
    },
    async jwt({ token, user }: { token: any; user?: User }) {
      console.log(' token, user', token, user);
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.profileImageUrl = user.profileImageUrl ?? undefined;
        token.status = user.status;
        token.accessToken = user.accessToken;
        token.expiresIn = user.expiresIn;
      }

      // 토큰 만료 확인 및 리프레시
      if (token.accessToken) {
        try {
          const payload = JSON.parse(atob((token.accessToken as string).split('.')[1]));
          const now = Math.floor(Date.now() / 1000);

          console.log('payload : ', payload, ' now : ', now);

          if (payload.exp > now) {
            return token;
          }

          const refreshedTokens = await refreshAccessToken();

          console.log('refreshedTokens : ', refreshedTokens);
          if (refreshedTokens) {
            token.accessToken = refreshedTokens.accessToken;
            token.expiresIn = refreshedTokens.expiresIn;
          } else {
            // 리프레시 실패시 로그아웃
            await logout();
            return null;
          }
        } catch (error) {
          console.error('Token refresh error:', error);
          return null;
        }
      }
      return token;
    },
  },

  events: {
    // async signIn(message) {
    //   console.log('User signed in:', message);
    // },
    async signOut(message) {
      console.log('User signed out:', message);
      await logout();
    },
  },
};
// 토큰 리프레시 함수
async function refreshAccessToken() {
  try {
    const res = await apiFetch('/auth/refresh', {
      method: 'POST',
      credentials: 'include',
    });

    console.log('refreshAccessToken res : ', res);
    if (!res.ok) return null;

    const data: AuthResponse = await res.json();

    return {
      accessToken: data.accessToken,
      expiresIn: data.expiresIn,
    };
  } catch (error) {
    console.error('Refresh token error:', error);
    return null;
  }
}

// 토큰 리프레시 함수
async function logout() {
  try {
    const res = await apiFetch('/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
    console.log('logout res : ', res);
    if (!res.ok) return null;
  } catch (error) {
    console.error('Refresh token error:', error);
    return null;
  }
}
