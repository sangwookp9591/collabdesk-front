'use client';

import { useSendMessage } from '@/entities/dm';
import { useInfiniteDMMessages } from '@/entities/dm/model/dm.queries';
import { MessageSend } from '@/features/message-send';
import { MessageResponse } from '@/shared/types/message';
import { MessageList } from '@/widgets/message';
import { useCallback } from 'react';

export function DmMessage({
  wsSlug,
  conversationId,
  initData,
}: {
  wsSlug: string;
  conversationId: string;
  initData: MessageResponse;
}) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } =
    useInfiniteDMMessages({ wsSlug, conversationId, take: 10, direction: 'next', initData });

  const { mutate: sendMessage, isPending } = useSendMessage(wsSlug, conversationId);

  const handleSendMessaage = useCallback(
    (content: string) => {
      sendMessage({ wsSlug, conversationId, content });
    },
    [wsSlug, conversationId, sendMessage],
  );

  return (
    <>
      <MessageList
        messages={data.pages?.flatMap((page) => page.messages)}
        isLoading={isLoading}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
      <MessageSend onSend={handleSendMessaage} />
    </>
  );
}
