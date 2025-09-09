import { Message } from '@/shared/types/message';
import { User } from '@/shared/types/user';

export interface Mention {
  id: string;
  messageId: string;
  userId: string;
  isRead: string;
  readAt: Date;
  messages: Message;
  user: User;
  createdAt: Date;
}
