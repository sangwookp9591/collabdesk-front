import { redirect } from 'next/navigation';
import { getSession } from '@/shared/lib';

export default async function HomePage() {
  const session = await getSession();

  console.log('session : ', session);
  if (!session?.user) {
    redirect('/signin');
  }

  // 사용자의 마지막 워크스페이스나 기본 워크스페이스로 리다이렉트
  // const lastWorkspace = await getUserLastWorkspace(user.id);
  // const lastWorkspace = { id: 1 };
  const lastWorkspace = null;

  if (lastWorkspace) {
    redirect(`/workspace/${lastWorkspace.id}`);
  }

  // 워크스페이스가 없으면 온보딩으로
  redirect('/onboarding/workspace-setup');
}
