import { redirect } from 'next/navigation';
import { getSession } from '@/shared/lib';
import { userApi } from '@/entities/user';

export default async function HomePage() {
  const session = await getSession();

  console.log('session : ', session);
  if (!session?.user) {
    redirect('/signin');
  }

  try {
    const result = await userApi.lastworkspace();
    if (result.data?.lastActiveWorkspaceId) {
      redirect(`/workspace/${result?.data?.workspaceSlug}`);
    } else {
      // 워크스페이스가 없으면 온보딩으로
      redirect('/onboarding/workspace-setup');
    }
  } catch (error) {
    redirect('/signin');
  }
}
