'use client';

import { useDmMessages, useSendMessage } from '@/entities/dm';
import { MessageSend } from '@/features/message-send';
import { Message } from '@/shared/types/message';
import { MessageList } from '@/widgets/message';
import { useCallback } from 'react';

export function DmMessage({
  wsSlug,
  conversationId,
  initData,
}: {
  wsSlug: string;
  conversationId: string;
  initData: { messages: Message[]; hasMore: boolean; total: number };
}) {
  const { data = initData, isLoading, error } = useDmMessages(wsSlug, conversationId);

  const { mutate: sendMessage, isPending } = useSendMessage(wsSlug, conversationId);

  const handleSendMessaage = useCallback(
    (content: string) => {
      sendMessage({ wsSlug, conversationId, content });
    },
    [wsSlug, conversationId, sendMessage],
  );
  return (
    <>
      <MessageList messages={data?.messages || []} isLoading={isLoading} />
      <MessageSend onSend={handleSendMessaage} />
    </>
  );
}
