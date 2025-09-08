import { DMConversation } from '@/entities/dm';
import { Channel } from './channel';
import { User } from './user';
export type messageType = 'USER' | 'DM' | 'SYSTEM' | 'BOT';
export interface Message {
  id: string;
  content: string;
  channelId?: string;
  dmConversationId?: string;
  userId?: string;
  parentId?: string;
  editedAt?: Date;
  isPinned: boolean;
  createdAt: Date;
  updatedAt: Date;
  channel?: Channel;
  dmConversation?: DMConversation;
  messageType: messageType;
  systemData?: any;
  user: Omit<
    User,
    | 'password'
    | 'profileImagePath'
    | 'lastActiveAt'
    | 'lastActiveWorkspaceId'
    | 'createdAt'
    | 'updatedAt'
    | 'accounts'
    | 'refreshTokens'
    | 'workspaceMembers'
    | 'ownedWorkspaces'
  >;
  parent?: Message;
  replies?: Message[];
}

export interface MessageResponse {
  messages: Message[];
  total: number;
  hasMore: boolean;
  prevCursor?: string;
  nextCursor?: string;
  direction: 'next' | 'prev';
}

export interface GetMessagesQueryDto {
  cursor?: string;
  direction?: 'next' | 'prev';
  take?: number;
}
