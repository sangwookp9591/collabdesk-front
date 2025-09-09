import { Message } from '@/shared/types/message';
import { User } from '@/shared/types/user';

export type MentionType = 'USER' | 'HERE' | 'EVERYONE';
export interface Mention {
  id: string;
  messageId: string;
  userId: string;
  type: MentionType;
  isRead: string;
  readAt: Date;
  messages: Message;
  user: User;
  createdAt: Date;
}
export interface MentionUser {
  id: string;
  name: string;
  email: string;
  profileImageUrl?: string;
  type: MentionType;
}

export interface MentionedUserId {
  type: MentionType;
  userId: string;
}
