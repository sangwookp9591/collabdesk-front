import { redirect } from 'next/navigation';
import { getSession } from 'next-auth/react';

export default async function HomePage() {
  const user = await getSession();

  if (!user) {
    redirect('/signin');
  }

  // 사용자의 마지막 워크스페이스나 기본 워크스페이스로 리다이렉트
  // const lastWorkspace = await getUserLastWorkspace(user.id);
  const lastWorkspace = { id: 1 };

  if (lastWorkspace) {
    redirect(`/workspace/${lastWorkspace.id}`);
  }

  // 워크스페이스가 없으면 온보딩으로
  redirect('/onboarding/workspace-setup');
}
