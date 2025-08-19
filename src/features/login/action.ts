'use server';

import { fetchLogin } from './api/fetch-login';

export async function loginAction(_: any, formData: FormData) {
  const loginId = formData.get('loginId')?.toString();
  const loginPw = formData.get('loginPw')?.toString();

  if (!loginId) {
    return {
      state: false,
      el: 'loginId',
      error: 'Id를 입력해주세요.',
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
    const res = await fetchLogin({ loginId, loginPw });
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
