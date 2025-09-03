import { Suspense } from 'react';
import { WorkspaceWelcome } from '@/widgets/workspace-welcome';
import { workspaceApi } from '@/entities/workspace';

interface WelcomePageProps {
  params: Promise<{ wsSlug: string }>;
}

async function WelcomeContent({ workspaceSlug }: { workspaceSlug: string }) {
  const [workspace, me] = await Promise.all([
    workspaceApi.bySlug(workspaceSlug),
    workspaceApi.myMemberShip(workspaceSlug),
  ]);

  return <WorkspaceWelcome workspace={workspace} user={me} />;
}

export default async function Page({ params }: WelcomePageProps) {
  const { wsSlug } = await params;
  return (
    <Suspense fallback={<div>워크스페이스 정보 로딩 중...</div>}>
      <WelcomeContent workspaceSlug={wsSlug} />
    </Suspense>
  );
}
