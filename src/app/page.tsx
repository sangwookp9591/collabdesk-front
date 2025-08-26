import { redirect } from 'next/navigation';
import { getSession } from '@/shared/lib';
import { apiFetch } from '@/shared/api';

export default async function HomePage() {
  const session = await getSession();

  console.log('session : ', session);
  if (!session?.user) {
    redirect('/signin');
  }

  const res = await apiFetch('/user/lastworkspace', {
    method: 'GET',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${session.user?.accessToken}`,
    },
  });
  if (!res.ok) {
    redirect('/signin');
  }
  const result = await res.json();
  console.log('lastWorkspace : ', result);

  if (result.data?.lastActiveWorkspaceId) {
    redirect(`/workspace/${result?.data?.workspaceSlug}`);
  }

  // 워크스페이스가 없으면 온보딩으로
  redirect('/onboarding/workspace-setup');
}
