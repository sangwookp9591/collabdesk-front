import { dmApi } from '@/entities/dm';
import { DmMessage, DMMessageSkeleton } from '@/widgets/dm-message';
import { Suspense } from 'react';

interface PageProps {
  params: Promise<{ wsSlug: string; dmId: string }>;
}

export default async function Page({ params }: PageProps) {
  const { wsSlug, dmId } = await params;
  const result = await dmApi.getDmMessages(wsSlug, dmId, 1);
  return (
    <Suspense fallback={<DMMessageSkeleton />}>
      <DmMessage wsSlug={wsSlug} conversationId={dmId} initData={result} />
    </Suspense>
  );
}
