'use server';

import { apiFetch } from '@/shared/api';
import { getSession, validateDto } from '@/shared/lib';
import { InviteDto } from './invite.dto';
import { WorkspaceRole } from '@/shared/types/workspace';

export async function workspaceInviteAction(_: any, formData: FormData) {
  const session = await getSession();

  if (!session?.user) {
    throw new Error('Authentication required');
  }
  console.log('formData: ', formData);
  const email = formData.get('email')?.toString();
  const workspaceId = formData.get('workspaceId')?.toString();
  const workspaceRole = formData.get('workspaceRole') as WorkspaceRole;

  const validation = await validateDto(InviteDto, {
    email,
    workspaceId,
    workspaceRole,
  });

  console.log('validation : ', validation);
  if (!validation.status) {
    return validation;
  }

  console.log('요청');
  const res = await apiFetch(`/workspace/invite`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.user?.accessToken}`,
    },
    body: JSON.stringify({ email, workspaceId, workspaceRole }),
  });

  console.log('res : ', res);
  if (!res?.ok) {
    return {
      status: false,
      error: `${res.statusText}`,
    };
  }

  const result = await res.json();
  return {
    status: true,
    error: '',
    data: result,
  };
}
