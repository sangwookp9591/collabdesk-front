import { Message } from '@/shared/types/message';
import { User } from '@/shared/types/user';
import { Workspace } from '@/shared/types/workspace';

export interface DMConversation {
  id: string;
  user1Id: string;
  user2Id: string;
  workspaceId: string;
  createdAt: Date;
  updatedAt: Date;
  user1: User;
  user2: User;
  user1LastReadMessageId?: string;
  user2LastReadMessageId?: string;
  workspace: Workspace;
  messages: Message[];
}
