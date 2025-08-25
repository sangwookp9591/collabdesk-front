'use server';

import { SignupDto } from './model/signup.dto';
import { fetchSignup } from './api/fetch-signup';
import { validateDto } from '@/shared/lib';

export async function signupAction(_: any, formData: FormData) {
  const dto = {
    email: formData.get('email')?.toString(),
    name: formData.get('name')?.toString(),
    password: formData.get('password')?.toString(),
    confirmPassword: formData.get('confirmPassword')?.toString(),
    profileImage: formData.get('profileImage') as File | null,
  };

  const validation = await validateDto(SignupDto, dto);

  if (!validation.status) {
    return validation;
  }

  if (dto.password !== dto.confirmPassword) {
    return { status: false, el: 'confirmPassword', error: '비밀번호가 일치하지 않습니다.' };
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

  try {
    const res = await fetchSignup(formData);

    if (res?.ok) {
      return { status: true, error: '' };
    }
  } catch (err: any) {
    return { status: false, error: '회원가입에 실패했습니다.' };
  }
}
