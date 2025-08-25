import { apiFetch } from '@/shared/api';

export default async function fetchUserWorkspaces(accessToken: string | undefined) {
  const res = await apiFetch('/user/workspace', {
    method: 'GET',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return res;
}
