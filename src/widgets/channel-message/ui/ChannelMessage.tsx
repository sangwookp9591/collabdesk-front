'use client';

import {
  useInfiniteChannelMessages,
  useSendMessage,
} from '@/entities/message/model/message.queries';
import { MessageSend } from '@/features/message-send';
import { MessageResponse } from '@/shared/types/message';
import { MessageList } from '@/widgets/message';
import { useCallback } from 'react';

export function ChannelMessage({
  wsSlug,
  chSlug,
  initData,
}: {
  wsSlug: string;
  chSlug: string;
  initData: MessageResponse;
}) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } =
    useInfiniteChannelMessages({ wsSlug, chSlug, take: 10, direction: 'next', initData });

  const { mutate: sendMessage, isPending } = useSendMessage(wsSlug, chSlug);

  const handleSendMessaage = useCallback(
    (content: string) => {
      sendMessage({ wsSlug, chSlug, content });
    },
    [wsSlug, chSlug, sendMessage],
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
