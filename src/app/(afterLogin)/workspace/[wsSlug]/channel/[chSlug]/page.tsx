'use client';

import { useChannelMessages } from '@/entities/message/model/message.queries';
import { useSocketStore } from '@/entities/message/model/socket.store';
import MessageSend from '@/features/message-send/ui/MessageSend';
import MessageList from '@/widgets/message/ui/MessageList';
import { useParams } from 'next/navigation';
import { useWorkspaceStore } from '../../../../../../shared/stores/workspace-store';
import { useCallback } from 'react';

export default function Page() {
  const params = useParams();

  const chSlug = params?.chSlug as string;
  const { currentChannel } = useWorkspaceStore();
  const { data, isLoading, error } = useChannelMessages(chSlug, currentChannel?.id);

  const { sendMessage } = useSocketStore();
  // };

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
