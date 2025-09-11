import { messageApi } from '@/entities/message';
import { ChannelMessage, ChannelMessageSkeleton } from '@/widgets/channel-message';
import { Suspense } from 'react';

interface PageProps {
  params: Promise<{ wsSlug: string; chSlug: string }>;
  searchParams: Promise<{ messageId?: string }>;
}

export default async function Page({ params, searchParams }: PageProps) {
  const { wsSlug, chSlug } = await params;
  const { messageId } = await searchParams;
  let result;

  if (messageId) {
    result = await messageApi.getMessagesAround(wsSlug, chSlug, messageId, {
      take: 20,
    });
  } else {
    result = await messageApi.getMessagesByChannel(wsSlug, chSlug, {
      cursor: '',
      take: 10,
      direction: 'prev',
    });
  }
  return (
    <Suspense fallback={<ChannelMessageSkeleton />}>
      <ChannelMessage wsSlug={wsSlug} chSlug={chSlug} messageId={messageId} initData={result} />
    </Suspense>
  );
}
