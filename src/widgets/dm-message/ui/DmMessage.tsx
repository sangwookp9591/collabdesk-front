'use client';

import { useSendMessage } from '@/entities/dm';
import { useInfiniteDMMessages } from '@/entities/dm/model/dm.queries';
import { MentionedUserId } from '@/entities/metion';
import { MessageSend } from '@/features/message-send';
import { MessageResponse } from '@/shared/types/message';
import { MessageList } from '@/widgets/message';
import { useCallback } from 'react';

export function DmMessage({
  wsSlug,
  conversationId,
  messageId,
  initData,
}: {
  wsSlug: string;
  conversationId: string;
  messageId?: string;
  initData: MessageResponse;
}) {
  const {
    data,
    hasPreviousPage,
    hasNextPage,
    fetchPreviousPage,
    fetchNextPage,
    isFetchingPreviousPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteDMMessages({ wsSlug, conversationId, take: 10, direction: 'prev', initData });

  const { mutate: sendMessage, isPending } = useSendMessage(wsSlug, conversationId);

  const handleSendMessaage = useCallback(
    (content: string, mentions: MentionedUserId[]) => {
      sendMessage({ wsSlug, conversationId, content, mentions: mentions ?? [] });
    },
    [wsSlug, conversationId, sendMessage],
  );

  return (
    <>
      <MessageList
        roomType={'dm'}
        targetMessageId={messageId}
        messages={data.pages?.flatMap((page) => page.messages)}
        isLoading={isLoading}
        hasPreviousPage={hasPreviousPage}
        hasNextPage={hasNextPage}
        fetchPreviousPage={fetchPreviousPage}
        fetchNextPage={fetchNextPage}
        isFetchingPreviousPage={isFetchingPreviousPage}
        isFetchingNextPage={isFetchingNextPage}
      />
      <MessageSend onSend={handleSendMessaage} roomType={'dm'} />
    </>
  );
}
