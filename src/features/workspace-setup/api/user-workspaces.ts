import { apiFetch } from '@/shared/api';

export default async function fetchUserWorkspaces(accessToken: string | undefined) {
  const res = await apiFetch('/user/workspaces', {
    method: 'GET',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return res;
}
