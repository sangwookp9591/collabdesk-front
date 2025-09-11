import { DMConversation } from '@/entities/dm';
import { Channel } from './channel';
import { User } from './user';
import { Mention } from '@/entities/metion';
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
  mentions?: Mention[];
}

export interface MessageResponse {
  messages: Message[];
  total: number;
  targetMessage?: Message;
  hasMore: boolean;
  hasPrev: boolean;
  hasNext: boolean;
  prevCursor?: string;
  nextCursor?: string;
  direction: 'next' | 'prev';
}

export interface GetMessagesQueryDto {
  cursor?: string;
  direction?: 'next' | 'prev';
  take?: number;
  messageId?: string;
}
