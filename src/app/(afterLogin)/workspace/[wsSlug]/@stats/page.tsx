import { Suspense } from 'react';
import { WorkspaceStats } from '@/widgets/workspace-stats';
import { workspaceApi } from '@/entities/workspace';

interface StatsPageProps {
  params: Promise<{ wsSlug: string }>;
}

async function StatsContent({ workspaceSlug }: { workspaceSlug: string }) {
  const stats = await workspaceApi.getWorkspaceStats(workspaceSlug);
  return <WorkspaceStats stats={stats} />;
}

export default async function Page({ params }: StatsPageProps) {
  const { wsSlug } = await params;
  return (
    <Suspense fallback={<div>통계 로딩 중...</div>}>
      <StatsContent workspaceSlug={wsSlug} />
    </Suspense>
  );
}
