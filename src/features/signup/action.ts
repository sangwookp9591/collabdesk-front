'use server';

import { SignupDto } from './model/signup.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { fetchSignup } from './api/fetch-signup';

export async function signupAction(_: any, formData: FormData) {
  const dto = plainToInstance(SignupDto, {
    email: formData.get('email')?.toString(),
    name: formData.get('name')?.toString(),
    password: formData.get('password')?.toString(),
    confirmPassword: formData.get('confirmPassword')?.toString(),
    profileImage: formData.get('profileImage') as File | null,
  });

  const errors = await validate(dto);
  if (errors.length > 0) {
    // 첫 번째 에러 메시지만 반환
    const firstError = errors[0];
    const constraints = firstError.constraints || {};

    // 필드 이름(el) 포함
    const el = firstError.property;

    // 첫 번째 constraint 메시지
    const errorMessage = Object.values(constraints)[0];
    return { state: false, el: el, error: errorMessage };
  }

  if (dto.password !== dto.confirmPassword) {
    return { state: false, el: 'confirmPassword', error: '비밀번호가 일치하지 않습니다.' };
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
      return { state: true, error: '' };
    }
  } catch (err: any) {
    return { status: false, error: '회원가입에 실패했습니다.' };
  }
}
