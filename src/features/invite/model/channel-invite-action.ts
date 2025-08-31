'use server';

import { apiFetch } from '@/shared/api';
import { getSession, validateDto } from '@/shared/lib';
import { InviteDto } from './invite.dto';
import { ChannelRole } from '@/shared/types/channel';

export async function channelInviteAction(_: any, formData: FormData) {
  const session = await getSession();

  if (!session?.user) {
    throw new Error('Authentication required');
  }
  const email = formData.get('email')?.toString();
  const channelId = formData.get('channelId')?.toString();
  const channelRole = formData.get('channelRole') as ChannelRole;

  const validation = await validateDto(InviteDto, {
    email,
    channelId,
    channelRole,
  });

  console.log('validation : ', validation);
  if (!validation.status) {
    return validation;
  }

  console.log('요청');
  const res = await apiFetch(`/channel/invite`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.user?.accessToken}`,
    },
    body: JSON.stringify({ email, channelId, channelRole }),
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
