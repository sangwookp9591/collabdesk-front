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
  initData,
}: {
  wsSlug: string;
  conversationId: string;
  initData: MessageResponse;
}) {
  const { data, hasPreviousPage, fetchPreviousPage, isFetchingPreviousPage, isLoading, error } =
    useInfiniteDMMessages({ wsSlug, conversationId, take: 10, direction: 'prev', initData });

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
        messages={data.pages?.flatMap((page) => page.messages)}
        isLoading={isLoading}
        hasPreviousPage={hasPreviousPage}
        fetchPreviousPage={fetchPreviousPage}
        isFetchingPreviousPage={isFetchingPreviousPage}
      />
      <MessageSend onSend={handleSendMessaage} roomType={'dm'} />
    </>
  );
}
