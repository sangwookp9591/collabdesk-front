'use client';

import { useChannelMessages } from '@/entities/message/api/queries/message.queries';
import MessageSend from '@/features/message-send/ui/MessageSend';
import MessageList from '@/widgets/message/ui/MessageList';
import { useParams } from 'next/navigation';

export default function Page() {
  const params = useParams();

  const chSlug = params?.chSlug as string;
  const { data, isLoading, error } = useChannelMessages(chSlug);
  return (
    <>
      <MessageList messages={data?.messages || []} isLoading={isLoading} />
      <MessageSend onSend={() => {}} />
    </>
  );
}
