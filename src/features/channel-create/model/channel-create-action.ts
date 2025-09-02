'use server';

import { getSession, validateDto } from '@/shared/lib';
import { ChannelCreateDto } from './channel-create.dto';
import { channelApi } from '@/entities/channel';

export async function channelCreateAction(_: any, formData: FormData) {
  const session = await getSession();

  if (!session?.user) {
    throw new Error('Authentication required');
  }
  const name = formData.get('name')?.toString();
  const workspaceId = formData.get('workspaceId')?.toString();
  const description = formData.get('description')?.toString();
  const isPublic = !!formData.get('isPublic');

  console.log('formData : ', name, workspaceId, description, isPublic);
  const validation = await validateDto(ChannelCreateDto, {
    name,
    workspaceId,
    description,
    isPublic,
  });

  if (!validation.status) {
    return validation;
  }
  try {
    const res = await channelApi.create({
      name: name!,
      workspaceId: workspaceId!,
      description,
      isPublic,
    });
    return { status: true, error: '', data: res };
  } catch (e: any) {
    return { status: false, error: `서버 Error :${e.message}` };
  }
}
