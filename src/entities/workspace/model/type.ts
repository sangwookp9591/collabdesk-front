import { Channel } from '@/entities/channel';

export interface Workspace {
  id: string;
  name: string;
}
export interface WorkspaceCard {
  id: string;
  name: string;
  image: string;
  memberCount: number;
  ownerId: string;
}

export interface WorkspaceSidebar {
  id: string;
  name: string;
  channels: Channel[];
  dms: { id: string; name: string; email: string }[];
}
