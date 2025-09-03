'use server';

import { getSession, validateDto } from '@/shared/lib';
import { ChannelRole } from '@/shared/types/channel';
import { ChannelInviteDto } from './channel-invite.dto';
import { inviteApi } from '@/entities/invite';

export async function channelInviteAction(_: any, formData: FormData) {
  const session = await getSession();

  if (!session?.user) {
    throw new Error('Authentication required');
  }
  const email = formData.get('email')?.toString();
  const workspaceId = formData.get('workspaceId')?.toString();
  const channelId = formData.get('channelId')?.toString();
  const channelRole = formData.get('channelRole') as ChannelRole;

  const validation = await validateDto(ChannelInviteDto, {
    email,
    workspaceId,
    channelId,
    channelRole,
  });

  if (!validation.status) {
    return validation;
  }

  try {
    const result = await inviteApi.channelInvite({
      email: email!,
      workspaceId: workspaceId!,
      channelId: channelId!,
      channelRole,
    });
    return {
      status: true,
      error: '',
      data: result,
    };
  } catch (error: any) {
    return {
      status: false,
      error: error.message,
    };
  }
}
