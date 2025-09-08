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
  refreshToken: string;
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
          const res = await apiFetch(`/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const data = await res.json();

          if (data) {
            return {
              id: data?.user?.id,
              email: data?.user?.email,
              name: data?.user?.name,
              profileImageUrl: data?.user?.profileImageUrl,
              status: data?.user?.status,
              accessToken: data?.accessToken,
              refreshToken: data?.refreshToken,
              // expiresIn: data?.expiresIn,
              expiresIn: Date.now() + 15 * 60 * 1000,
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
    // maxAge: 30 * 24 * 60 * 60, // 30일
    maxAge: 60 * 24 * 60 * 60, // 30일
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
        session.user.refreshToken = token.refreshToken as string;
        session.user.expiresIn = token.expiresIn as number;
      }
      return session;
    },
    async jwt({ token, user }: { token: any; user?: User }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.profileImageUrl = user.profileImageUrl ?? undefined;
        token.status = user.status;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.expiresIn = user.expiresIn;
      }

      // 토큰 만료 확인 및 리프레시
      if (token.accessToken) {
        try {
          if (Date.now() < (token.expiresIn as number)) {
            return token; // 토큰 만료시 null 반환
          }

          const refreshedTokens = await refreshAccessToken(token.refreshToken);

          console.log('refreshedTokens : ', refreshedTokens);
          if (refreshedTokens) {
            token.accessToken = refreshedTokens.accessToken;
            token.refreshToken = refreshedTokens.refreshToken;
            token.expiresIn = Date.now() + 15 * 60 * 1000;
          } else {
            // 리프레시 실패시 로그아웃
            await logout(token.email, token.refreshToken);
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
      await logout(
        message?.token?.email ?? '',
        (message.token?.refreshToken as string | undefined) ?? '',
      );
    },
  },
};
// 토큰 리프레시 함수
async function refreshAccessToken(refreshToken: string) {
  try {
    const res = await apiFetch('/auth/refresh', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken: refreshToken }),
    });

    console.log('refreshAccessToken res : ', res);
    if (!res.ok) return null;

    const data: AuthResponse = await res.json();

    return {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      expiresIn: data.expiresIn,
    };
  } catch (error) {
    console.error('Refresh token error:', error);
    return null;
  }
}

// 토큰 리프레시 함수
async function logout(email: string, refreshToken: string) {
  try {
    const res = await apiFetch('/auth/logout', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, refreshToken: refreshToken }),
    });
    console.log('logout res : ', res);
    if (!res.ok) return null;
  } catch (error) {
    console.error('Refresh token error:', error);
    return null;
  }
}
