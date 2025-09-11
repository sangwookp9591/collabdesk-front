import { dmApi } from '@/entities/dm';
import { DmMessage, DMMessageSkeleton } from '@/widgets/dm-message';
import { Suspense } from 'react';

interface PageProps {
  params: Promise<{ wsSlug: string; dmId: string }>;
  searchParams: Promise<{ messageId?: string }>;
}

export default async function Page({ params, searchParams }: PageProps) {
  const { wsSlug, dmId } = await params;

  const { messageId } = await searchParams;
  let result;

  if (messageId) {
    result = await dmApi.getDmMessagesAround(wsSlug, dmId, messageId, {
      take: 20,
    });
  } else {
    result = await dmApi.getDmMessages(wsSlug, dmId, {
      cursor: '',
      take: 10,
      direction: 'next',
    });
  }

  return (
    <Suspense fallback={<DMMessageSkeleton />}>
      <DmMessage wsSlug={wsSlug} conversationId={dmId} messageId={messageId} initData={result} />
    </Suspense>
  );
}
