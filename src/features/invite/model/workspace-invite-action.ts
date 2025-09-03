'use server';

import { validateDto } from '@/shared/lib';
import { InviteDto } from './invite.dto';
import { WorkspaceRole } from '@/shared/types/workspace';
import { inviteApi } from '@/entities/invite';

export async function workspaceInviteAction(_: any, formData: FormData) {
  const email = formData.get('email')?.toString();
  const workspaceId = formData.get('workspaceId')?.toString();
  const workspaceRole = formData.get('workspaceRole') as WorkspaceRole;

  const validation = await validateDto(InviteDto, {
    email,
    workspaceId,
    workspaceRole,
  });

  if (!validation.status) {
    return validation;
  }

  try {
    const result = await inviteApi.workspaceInvite({
      email: email!,
      workspaceId: workspaceId!,
      workspaceRole,
    });
    return {
      status: true,
      error: '',
      data: result,
    };
  } catch (error: any) {
    return {
      status: false,
      error: error?.message,
    };
  }
}
