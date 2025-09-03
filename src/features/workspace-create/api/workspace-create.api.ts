'use server';

import { workspaceApi } from '@/entities/workspace';

export async function createWorkspace(formData: FormData) {
  return await workspaceApi.create(formData);
}
