import { messageApi } from '@/entities/message';
import { ChannelMessage, ChannelMessageSkeleton } from '@/widgets/channel-message';
import { Suspense } from 'react';

interface PageProps {
  params: Promise<{ wsSlug: string; chSlug: string }>;
}

export default async function Page({ params }: PageProps) {
  const { wsSlug, chSlug } = await params;
  const result = await messageApi.getMessagesByChannel(wsSlug, chSlug, {
    cursor: '',
    take: 10,
    direction: 'next',
  });
  return (
    <Suspense fallback={<ChannelMessageSkeleton />}>
      <ChannelMessage wsSlug={wsSlug} chSlug={chSlug} initData={result} />
    </Suspense>
  );
}
