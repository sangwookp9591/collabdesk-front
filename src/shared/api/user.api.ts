'use server';

import { userApi } from '@/entities/user';

export async function updateLastWorkspace(workspaceId: string) {
  return await userApi.updatelastworkspace(workspaceId);
}
