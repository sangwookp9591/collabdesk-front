import { Channel } from './channel';
import { User } from './user';
type messageType = 'USER' | 'SYSTEM' | 'BOT';
export interface Message {
  id: string;
  content: string;
  channelId: string;
  userId: string;
  parentId?: string;
  editedAt?: Date;
  isPinned: boolean;
  createdAt: Date;
  updatedAt: Date;
  channel?: Channel;
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
