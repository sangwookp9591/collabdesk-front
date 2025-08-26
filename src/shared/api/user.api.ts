'use server';

import { getSession } from '../lib';
import { apiFetch } from './fetcher';

export async function updateLastWorkspace(workspaceId: string) {
  const session = await getSession();

  if (!session?.user) {
    throw new Error('Authentication required');
  }

  const response = await apiFetch('/user/lastworkspace', {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${session?.user?.accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ workspaceId }),
  });

  if (!response.ok) {
    throw new Error('Failed to update last workspace');
  }

  return response.json();
}
