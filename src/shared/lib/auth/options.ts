import type { NextAuthOptions, Session, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { authApi } from '@/shared/api';
import { cookies } from 'next/headers';

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
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const auth = await authApi.login({
            email: credentials.email,
            password: credentials.password,
          });

          if (auth) {
            (await cookies()).set('refreshToken', auth?.refreshToken);

            return {
              id: auth?.user?.id,
              email: auth?.user?.email,
              name: auth?.user?.name,
              profileImageUrl: auth?.user?.profileImageUrl,
              status: auth?.user?.status,
              accessToken: auth?.accessToken,
              refreshToken: auth?.refreshToken,
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

          const refreshedTokens = await authApi.tokenRefresh();

          console.log('refreshedTokens : ', refreshedTokens);
          if (refreshedTokens) {
            token.accessToken = refreshedTokens.accessToken;
            token.refreshToken = refreshedTokens.refreshToken;
            token.expiresIn = Date.now() + 15 * 60 * 1000;
          } else {
            // 리프레시 실패시 로그아웃
            await authApi.logout();
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
      await authApi.logout();
    },
  },
};
// 토큰 리프레시 함수
