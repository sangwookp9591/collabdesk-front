import { inviteApi } from '@/entities/invite';
import { Invite, WorkspaceJoinCard } from '@/features/onboarding-invite';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ type: string; code: string }>;
}) {
  const { type, code } = await searchParams;

  if (code?.length === 6 && type) {
    try {
      const workspace = await inviteApi.getWorkspaceByInvite(type, code);

      return (
        <div>
          <h1>초대된 워크스페이스</h1>
          <WorkspaceJoinCard workspace={workspace} code={code} />
        </div>
      );
    } catch (error: any) {
      return <Invite initialCode={''} error={error.message} />;
    }
  }

  return <Invite initialCode={code} />;
}
