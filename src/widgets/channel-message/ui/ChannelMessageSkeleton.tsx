import { MessageSendSkeleton } from '@/features/message-send';
import { MessageListSkeleton } from '@/widgets/message/ui/MessageListSkeleton';

export function ChannelMessageSkeleton() {
  return (
    <>
      <MessageListSkeleton />
      <MessageSendSkeleton />
    </>
  );
}
