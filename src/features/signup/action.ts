'use server';

import { apiFetch } from '@/shared/api/fetcher';

export async function signupAction(_: any, formData: FormData) {
  const email = formData.get('email')?.toString();
  const name = formData.get('name')?.toString();
  const password = formData.get('password')?.toString();
  const confirmPassword = formData.get('confirmPassword')?.toString();
  const profileImage = formData.get('profileImage') as File | null;

  // 이메일 체크
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return { state: false, el: 'email', error: '올바른 이메일을 입력해주세요.' };
  }

  // 비밀번호 체크
  if (!password) {
    return { state: false, el: 'password', error: '비밀번호를 입력해주세요.' };
  }

  // 비밀번호 규칙
  // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  // if (!passwordRegex.test(password)) {
  //   return {
  //     state: false,
  //     el: 'password',
  //     error: '비밀번호는 8자 이상, 대/소문자, 숫자, 특수문자를 포함해야 합니다.',
  //   };
  // }

  // 비밀번호 확인
  if (password !== confirmPassword) {
    return { state: false, el: 'confirmPassword', error: '비밀번호가 일치하지 않습니다.' };
  }

  // 닉네임 체크
  if (!name || name.length < 2) {
    return { state: false, el: 'nickname', error: '닉네임을 2자 이상 입력해주세요.' };
  }

  try {
    const res = await apiFetch('/auth/signup', {
      method: 'POST',
      body: formData,
    });

    if (res?.ok) {
      return { state: true, error: '' };
    }
  } catch (err: any) {
    return { status: false, error: '회원가입에 실패했습니다.' };
  }
}
