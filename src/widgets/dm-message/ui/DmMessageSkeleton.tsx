import { MessageSendSkeleton } from '@/features/message-send';
import { MessageListSkeleton } from '@/widgets/message/ui/MessageListSkeleton';

export function DMMessageSkeleton() {
  return (
    <>
      <MessageListSkeleton />
      <MessageSendSkeleton />
    </>
  );
}
