'use client';

import { useChannelMessages } from '@/entities/message/model/message.queries';
import { useSocketStore } from '@/entities/message/model/socket.store';
import { MessageSend } from '@/features/message-send';
import { useWorkspaceStore } from '@/shared/stores';
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
  const { currentChannel } = useWorkspaceStore();
  const { data = initData, isLoading, error } = useChannelMessages(wsSlug, chSlug);

  const { sendMessage } = useSocketStore();

  const handleSendMessaage = useCallback(
    (content: string) => {
      if (currentChannel?.id) sendMessage({ channelId: currentChannel?.id, content: content });
    },
    [currentChannel?.id],
  );
  return (
    <>
      <MessageList messages={data?.messages || []} isLoading={isLoading} />
      <MessageSend onSend={handleSendMessaage} />
    </>
  );
}
