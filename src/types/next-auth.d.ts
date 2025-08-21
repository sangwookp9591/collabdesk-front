// 📁 types/next-auth.d.ts
import { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      profileImgUrl?: string; // 여기에 원하는 필드 추가
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    profileImgUrl?: string; // 여기에도 추가
  }
}
