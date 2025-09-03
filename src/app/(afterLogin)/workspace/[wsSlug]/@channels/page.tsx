import { Suspense } from 'react';
import { MyChannels } from '@/widgets/channels-my';
import { channelApi } from '@/entities/channel';

interface ChannelsPageProps {
  params: Promise<{ wsSlug: string }>;
}

async function ChannelsContent({ workspaceSlug }: { workspaceSlug: string }) {
  console.log('channelContent!!!!');
  const channels = await channelApi.getMyChannels(workspaceSlug);

  return <MyChannels channels={channels} workspaceSlug={workspaceSlug} />;
}

export default async function Page({ params }: ChannelsPageProps) {
  const { wsSlug } = await params;
  return (
    <Suspense fallback={<div>채널 로딩 중...</div>}>
      <ChannelsContent workspaceSlug={wsSlug} />
    </Suspense>
  );
}
