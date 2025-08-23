import { WorkspaceSetup } from '@/features/workspace-setup';
import { getSession } from '@/shared/lib';

export default async function Page() {
  const session = await getSession();
  if (!session?.user) {
    return (
      <div>
        <h1>워크스페이스 만들기</h1>
      </div>
    );
  }

  return <WorkspaceSetup session={session} />;
}
