'use server';

import { userApi } from '@/entities/user/api/userApi';
import { signIn } from 'next-auth/react';

export async function loginAction(_: any, formData: FormData) {
  const email = formData.get('email')?.toString();
  const loginPw = formData.get('loginPw')?.toString();

  if (!email) {
    return {
      state: false,
      el: 'email',
      error: 'email을 입력해주세요.',
    };
  }

  if (!loginPw) {
    return {
      state: false,
      el: 'loginPw',
      error: 'PW를 입력해주세요.',
    };
  }
  // const res = await fetch(`${process.env}`,{})

  try {
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });
    console.log('res : ', res);

    if (res?.ok) {
      return {
        state: true,
        error: '',
      };
    }
  } catch (err: any) {
    return {
      status: false,
      error: '로그인에 실패했습니다.',
    };
  }
}
