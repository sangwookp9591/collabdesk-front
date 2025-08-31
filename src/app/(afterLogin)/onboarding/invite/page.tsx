import { Invite, WorkspaceJoinCard } from '@/features/onboarding-invite';
import { apiFetch } from '@/shared/api';
import { getSession } from '@/shared/lib';
import { error } from 'console';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ type: string; code: string }>;
}) {
  const { type, code } = await searchParams;
  const session = await getSession();

  if (code?.length === 6 && type) {
    const res = await apiFetch(`/${type}/invite?code=${code}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
    });

    console.log('invite res  :', res);
    if (res?.ok) {
      const workspace = await res.json();
      console.log('invite workspace : ', workspace);
      return (
        <div>
          <h1>초대된 워크스페이스</h1>
          <WorkspaceJoinCard workspace={workspace} code={code} />
        </div>
      );
    } else {
      const errorData = await res.json();
      return (
        <>
          <Invite initialCode={''} error={errorData.message} />
        </>
      );
    }
  }

  return <Invite initialCode={code} />;
}
