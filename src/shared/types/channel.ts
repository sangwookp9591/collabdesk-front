import type { User } from './user';
import type { Workspace } from './workspace';

export type ChannelRole = 'ADMIN' | 'MEMBER';
export type TabType = 'CHAT' | 'BOARD' | 'DOCUMENT' | 'CANVAS';

export interface Channel {
  id: string;
  slug: string;
  name: string;
  description?: string;
  workspaceId: string;
  createdById: string;
  isPublic: boolean;
  isDefault: boolean;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
  workspace?: Workspace;
  createdBy?: User;
  members?: ChannelMember[];
  messages?: Message[];
  tabs?: ChannelTab[];
}

export interface ChannelMember {
  id: string;
  userId: string;
  channelId: string;
  role: ChannelRole;
  joinedAt: Date;
  lastReadAt: Date;
  user?: User;
  channel?: Channel;
}

export interface ChannelTab {
  id: string;
  name: string;
  type: TabType;
  channelId: string;
  order: number;
  data?: any;
  createdAt: Date;
  updatedAt: Date;
  channel?: Channel;
}

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
  user?: User;
  parent?: Message;
  replies?: Message[];
}
