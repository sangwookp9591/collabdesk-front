'use client';

import {
  useInfiniteChannelMessages,
  useSendMessage,
} from '@/entities/message/model/message.queries';
import { MentionedUserId } from '@/entities/metion';
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
  const { data, hasPreviousPage, fetchPreviousPage, isFetchingPreviousPage, isLoading, error } =
    useInfiniteChannelMessages({ wsSlug, chSlug, take: 10, direction: 'prev', initData });

  const { mutate: sendMessage, isPending } = useSendMessage(wsSlug, chSlug);

  const handleSendMessaage = useCallback(
    (content: string, mentions: MentionedUserId[]) => {
      sendMessage({ wsSlug, chSlug, content, mentions });
    },
    [wsSlug, chSlug, sendMessage],
  );

  return (
    <>
      <MessageList
        roomType={'channel'}
        messages={data.pages?.flatMap((page) => page.messages)}
        isLoading={isLoading}
        hasPreviousPage={hasPreviousPage}
        fetchPreviousPage={fetchPreviousPage}
        isFetchingPreviousPage={isFetchingPreviousPage}
      />
      <MessageSend onSend={handleSendMessaage} roomType={'channel'} />
    </>
  );
}
