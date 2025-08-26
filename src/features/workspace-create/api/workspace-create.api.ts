'use server';

import { apiFetch } from '@/shared/api';
import { getSession } from '@/shared/lib';

export async function createWorkspace(formData: FormData) {
  const session = await getSession();

  if (!session?.user) {
    throw new Error('Authentication required');
  }

  const response = await apiFetch(`/workspace`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${session.user?.accessToken}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error('워크스페이스 생성 실패');
  }

  return response.json();
}
