'use server';

import { updateLastWorkspace } from '@/shared/api';
import { getSession } from '@/shared/lib';
import { createWorkspace } from './api/workspace-create.api';

export async function createWorkspaceAction(_: any, formData: FormData) {
  const session = await getSession();
  console.log('session : ', session);
  try {
    const name = formData.get('name') as string;
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

    // FormData 다시 구성 (중요!)
    const submitFormData = new FormData();
    submitFormData.append('name', name);

    // 파일이 있고 유효한 경우에만 추가
    if (image && image.size > 0 && image.name !== 'undefined') {
      submitFormData.append('image', image);
    }

    console.log('formData :', formData);
    const result = await createWorkspace(submitFormData);

    console.log('workspace : ', result);
    const workspace = result?.data?.workspace;
    await updateLastWorkspace(workspace?.id);

    return { status: true, workspace };
  } catch (err) {
    console.error(err);
    return { status: false, error: '워크스페이스 생성 실패' };
  }
}
