import { Suspense } from 'react';
import { RecentActivity } from '@/widgets/recent-activity';
import { messageApi } from '@/entities/message';

interface ActivityPageProps {
  params: Promise<{ wsSlug: string }>;
}

async function ActivityContent({ workspaceSlug }: { workspaceSlug: string }) {
  const messages = await messageApi.getRecentMessages(workspaceSlug);
  return <RecentActivity messages={messages} workspaceSlug={workspaceSlug} />;
}

export default async function Page({ params }: ActivityPageProps) {
  const { wsSlug } = await params;
  return (
    <Suspense fallback={<div>활동 로딩 중...</div>}>
      <ActivityContent workspaceSlug={wsSlug} />
    </Suspense>
  );
}
