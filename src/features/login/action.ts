'use server';

import { fetchLogin } from './api/fetch-login';

export async function loginAction(_: any, formData: FormData) {
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();

  if (!email) {
    return {
      state: false,
      el: 'email',
      error: 'email을 입력해주세요.',
    };
  }

  if (!password) {
    return {
      state: false,
      el: 'password',
      error: 'PW를 입력해주세요.',
    };
  }
  // const res = await fetch(`${process.env}`,{})

  try {
    const res = await fetchLogin({ email, password });

    console.log('res : ', res);

    if (res?.ok) {
      return {
        state: true,
        error: '',
      };
    }
  } catch (err: any) {
    console.log('err : ', err);
    return {
      status: false,
      error: '로그인에 실패했습니다.',
    };
  }
}
