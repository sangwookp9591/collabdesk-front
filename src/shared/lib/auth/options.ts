import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { userApi } from '@/entities/user/api/userApi';
import { apiFetch } from '@/shared/api';

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

          const data = await res.json();
          console.log('user : ', data);

          if (data) {
            return {
              id: data?.id,
              email: data?.email,
              name: data?.name,
              profileImageUrl: data?.profileImageUrl,
              status: data?.status,
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
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;

        // OAuth 로그인 시 사용자 정보를 DB에 저장/업데이트
        if (account?.provider !== 'credentials') {
          try {
            const dbUser = await userApi.upsertUser({
              email: user.email!,
              name: user.name!,
              profileImgUrl: user.profileImgUrl!,
            });
            token.id = dbUser.id;
          } catch (error) {
            console.error('User upsert error:', error);
          }
        }
      }
      return token;
    },

    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },

  events: {
    async signIn(message) {
      console.log('User signed in:', message);
    },
    async signOut(message) {
      console.log('User signed out:', message);
    },
  },
};
