'use server';

import { apiFetch } from '@/shared/api';
import { validateDto } from '@/shared/lib';
import { InviteDto } from './invite.dto';

export async function workspaceInviteAction(_: any, formData: FormData) {
  const email = formData.get('email')?.toString();

  const validation = await validateDto(InviteDto, {
    email,
  });

  if (!validation.status) {
    return validation;
  }

  const res = await apiFetch(`/workspace/invite`, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  });

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
