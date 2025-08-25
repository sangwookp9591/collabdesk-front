import type { NextAuthOptions, Session, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
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

          const result = await res.json();

          if (result?.data) {
            return {
              id: result?.data?.id,
              email: result?.data?.email,
              name: result?.data?.name,
              profileImageUrl: result?.data?.profileImageUrl,
              status: result?.data?.status,
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
      console.log('session, token, user', session, token, user);
      if (session.user) {
        session.user.id = user?.id ?? token.id ?? '';
        session.user.name = user?.name ?? token.name;
        session.user.email = user?.email ?? token.email;
        session.user.profileImageUrl = user?.profileImageUrl ?? token.profileImageUrl;
        session.user.status = user?.status ?? token.status;
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
      }
      return token;
    },
  },

  // events: {
  //   async signIn(message) {
  //     console.log('User signed in:', message);
  //   },
  //   async signOut(message) {
  //     console.log('User signed out:', message);
  //   },
  // },
};
