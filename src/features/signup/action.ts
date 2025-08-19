'use server';

import { fetchSignup } from './api/fetch-signup';

export async function signupAction(_: any, formData: FormData) {
  const loginId = formData.get('loginId')?.toString();
  const loginPw = formData.get('loginPw')?.toString();
  const nickname = formData.get('nickname')?.toString();
  const email = formData.get('email')?.toString();
  const profileImage = formData.get('profileImage')?.toString();

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
  if (!nickname) {
    return {
      state: false,
      el: 'loginPw',
      error: 'nickname를 입력해주세요.',
    };
  }
  if (!email) {
    return {
      state: false,
      el: 'loginPw',
      error: 'email를 입력해주세요.',
    };
  }

  // const res = await fetch(`${process.env}`,{})

  try {
    const res = await fetchSignup({ loginId, loginPw, nickname, email, profileImage });
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
