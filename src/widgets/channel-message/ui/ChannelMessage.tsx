'use client';

import { useChannelMessages, useSendMessage } from '@/entities/message/model/message.queries';
import { MessageSend } from '@/features/message-send';
import { Message } from '@/shared/types/message';
import { MessageList } from '@/widgets/message';
import { useCallback } from 'react';

export function ChannelMessage({
  wsSlug,
  chSlug,
  initData,
}: {
  wsSlug: string;
  chSlug: string;
  initData: { messages: Message[]; hasMore: boolean; total: number };
}) {
  const { data = initData, isLoading, error } = useChannelMessages(wsSlug, chSlug);

  const { mutate: sendMessage, isPending } = useSendMessage(wsSlug, chSlug);

  const handleSendMessaage = useCallback(
    (content: string) => {
      sendMessage({ wsSlug, chSlug, content });
    },
    [wsSlug, chSlug, sendMessage],
  );
  return (
    <>
      <MessageList messages={data?.messages || []} isLoading={isLoading} />
      <MessageSend onSend={handleSendMessaage} />
    </>
  );
}
