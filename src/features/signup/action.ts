'use server';

import { userApi } from '@/entities/user/api/userApi';

export async function signupAction(_: any, formData: FormData) {
  const email = formData.get('email')?.toString();
  const loginPw = formData.get('loginPw')?.toString();
  const name = formData.get('name')?.toString();

  // FormData에서 프로필 이미지 파일 가져오기
  const profileFile = formData.get('profile') as File | null;

  if (!email) {
    return { state: false, el: 'loginId', error: 'ID를 입력해주세요.' };
  }

  if (!loginPw) {
    return { state: false, el: 'loginPw', error: 'PW를 입력해주세요.' };
  }

  if (!name) {
    return { state: false, el: 'nickname', error: 'Nickname을 입력해주세요.' };
  }

  try {
    // fetchSignup은 서버 API 호출 함수
    // 파일이 있다면 FormData 그대로 전달하거나 파일 업로드 로직을 구현
    const res = await userApi.upsertUser({
      email,
      name,
      profileImgUrl: profileFile ? URL.createObjectURL(profileFile) : undefined, // 간단하게 이미지 URL 처리
    });

    if (res?.ok) {
      return { state: true, error: '' };
    }
  } catch (err: any) {
    return { status: false, error: '회원가입에 실패했습니다.' };
  }
}
