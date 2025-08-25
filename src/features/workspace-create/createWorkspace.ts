'use server';

import { apiFetch } from '@/shared/api';
import { getSession } from '@/shared/lib';

export async function createWorkspaceAction(_: any, formData: FormData) {
  const session = await getSession();
  console.log('session : ', session);
  try {
    const name = formData.get('name') as string;
    const slug = formData.get('slug') as string;
    const image = formData.get('image') as File | null;

    if (!name) {
      return {
        status: false,
        error: '워크스페이스 이름을 입력하세요',
      };
    }
    if (!session?.user) {
      return { status: false, error: '세션이 만료되었습니다.' };
    }

    // NestJS 백엔드 API 호출 (예: http://api.myapp.com/workspaces)
    const res = await apiFetch(`/workspace`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.user?.accessToken}`,
      },
      body: formData,
      // NestJS에서 multipart/form-data 받을 수 있도록 설정 필요
    });
    if (!res.ok) {
      throw new Error('워크스페이스 생성 실패');
    }
    const workspace = await res.json();

    // 가짜 워크스페이스 객체 (DB 대신 메모리에서 생성)

    return { status: true, workspace };
  } catch (err) {
    console.error(err);
    return { status: false, error: '워크스페이스 생성 실패' };
  }
}
